const gpUtils = require("./generalPurposeUtils.js");
const clUtils = require("./zerothOrder/consoleLoggingUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const aaUtils = require("./auxiliaryAttributeUtils.js");
const allLangUtils = require("./allLangUtils.js");

exports.addSpecifiersToMGNs = (
  answerSentenceData,
  questionSentenceData,
  languagesObj
) => {
  let { questionOutputArr } = questionSentenceData;

  let { answerOutputArr } = answerSentenceData;

  let { questionLanguage, answerLanguage } = languagesObj;
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  let metaGenders = Object.keys(
    refObj.metaFeatures[questionLanguage]["gender"]
  );

  let questionMGNunits = questionOutputArr.filter((unit) => {
    return (
      unit.selectedLemmaObject &&
      unit.selectedLemmaObject.gender &&
      metaGenders
        .map((metaGender) => `${metaGender}_selector`)
        .includes(unit.selectedLemmaObject.gender)
    );
  });

  questionMGNunits.forEach((questionMGNunit) => {
    // let correspondingAnswerUnit = answerOutputArr.find(
    //   (unit) =>
    //     unit.structureChunk.chunkId === questionMGNunit.structureChunk.chunkId
    // );

    // if (!correspondingAnswerUnit) {
    //   console.log("tlae questionMGNunit", questionMGNunit);
    //   clUtils.throw(
    //     `tlae addSpecifiersToMGNs #ERR No correspondingAnswerUnit for questionMGNunit printed above.`
    //   );
    // }
    let metaGender = questionMGNunit.selectedLemmaObject.gender.split("_")[0];

    let selectedGenderForQuestionLanguage;
    let selectedGenderForAnswerLanguageArr;

    if (
      questionMGNunit.structureChunk.gender &&
      questionMGNunit.structureChunk.gender.length
    ) {
      selectedGenderForQuestionLanguage = gpUtils.selectRandom(
        questionMGNunit.structureChunk.gender
      );

      if (
        !refObj.metaFeatures[questionLanguage].gender[metaGender].includes(
          selectedGenderForQuestionLanguage
        )
      ) {
        console.log(
          "questionMGNunit.structureChunk.gender",
          questionMGNunit.structureChunk.gender
        );
        console.log(
          "refObj.metaFeatures[questionLanguage].gender[metaGender]",
          refObj.metaFeatures[questionLanguage].gender[metaGender]
        );
        clUtils.throw(
          "knmo addSpecifiersToMGNs #ERR I expected the question chunk's gender to be present in the translated genders array for the question lObj's metagender selector."
        );
      }
    } else {
      selectedGenderForQuestionLanguage = gpUtils.selectRandom(
        refObj.metaFeatures[questionLanguage].gender[metaGender]
      );
    }

    selectedGenderForAnswerLanguageArr = answerLangUtils.formatFeatureValue(
      "gender",
      selectedGenderForQuestionLanguage,
      "person"
    );

    console.log(
      "[1;35m " +
        `ksxy addSpecifiersToMGNs #NB: Am changing questionMGNunit.structureChunk.gender and correspondingAnswerUnit.structureChunk.gender` +
        "[0m"
    );
    console.log(`ksxy addSpecifiersToMGNs`, {
      selectedGenderForQuestionLanguage,
      selectedGenderForAnswerLanguageArr,
    });

    questionMGNunit.structureChunk.gender = [selectedGenderForQuestionLanguage];
    // correspondingAnswerUnit.structureChunk.gender = selectedGenderForAnswerLanguageArr;

    console.log("wdmi addSpecifiers. Will addAnnotation ");
    aaUtils.addAnnotation(
      questionMGNunit.structureChunk,
      "gender",
      selectedGenderForQuestionLanguage
    );
  });
};

exports.sortAnswerAndQuestionStructureChunks = (
  questionSentenceStructure,
  answerSentenceStructure
) => {
  console.log("bsat sortAnswerAndQuestionStructureChunks");

  let responseObj = {
    answerHeadChunks: null,
    answerDependentChunks: null,
    answerOtherChunks: null,
    questionHeadChunks: null,
    questionDependentChunks: null,
    questionOtherChunks: null,
  };

  let {
    headChunks,
    dependentChunks,
    otherChunks,
  } = scUtils.sortStructureChunks(answerSentenceStructure);

  responseObj.answerHeadChunks = headChunks;
  responseObj.answerDependentChunks = dependentChunks;
  responseObj.answerOtherChunks = otherChunks;

  if (true) {
    let {
      headChunks,
      dependentChunks,
      otherChunks,
    } = scUtils.sortStructureChunks(questionSentenceStructure);

    responseObj.questionHeadChunks = headChunks;
    responseObj.questionDependentChunks = dependentChunks;
    responseObj.questionOtherChunks = otherChunks;

    return responseObj;
  }
};

exports.specifyQuestionChunkAndChangeAnswerChunk = (
  chunksObj,
  actionKey,
  actionValueArr
) => {
  clUtils.throw("fjln specifyQuestionChunkAndChangeAnswerChunk Cease");

  if (actionValueArr.length !== 1) {
    console.log("ujrw specifyQuestionChunkAndChangeAnswerChunk", {
      actionValueArr,
    });
    clUtils.throw(
      "ujrw specifyQuestionChunkAndChangeAnswerChunk actionValueArr had length of not 1"
    );
  }

  let {
    answerHeadChunk,
    answerChunk,
    questionHeadChunk,
    questionChunk,
  } = chunksObj;

  if (answerHeadChunk) {
    console.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point A");
    answerHeadChunk[actionKey] = actionValueArr;
  } else {
    console.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point B");
    answerChunk[actionKey] = actionValueArr;
  }

  //...and note Specifier in Q headCh if exists, else Q depCh.

  if (questionHeadChunk) {
    console.log("tbji specifyQuestionChunkAndChangeAnswerChunk Point C");
    aaUtils.addAnnotation(questionHeadChunk, actionKey, actionValueArr[0]);
  } else {
    if (!questionChunk) {
      throw (
        "aaxj specifyQuestionChunkAndChangeAnswerChunk There was no corresponding questionChunk to add these Specifiers to: " +
        actionKey +
        " " +
        actionValueArr[0]
      );
    }
    console.log(
      "lskt specifyQuestionChunkAndChangeAnswerChunk specifyQuestionChunkAndChangeAnswerChunk Point D"
    );
    aaUtils.addAnnotation(questionChunk, actionKey, actionValueArr[0]);
  }
};

exports.addAnnotation = (chunk, key, value) => {
  if (!chunk.annotations) {
    chunk.annotations = {};
  }

  if (typeof value !== "string") {
    console.log("nrtn addAnnotation", { value });
    clUtils.throw("nrtn addAnnotation expected STRING for value");
  }

  console.log(
    "[1;35m " + "aggw addAnnotation Added annotation for " + chunk.chunkId + "[0m"
  );
  console.log("aggw addAnnotation", { key, value });

  chunk.annotations[key] = value;
};

exports.getFormattedAnnoObj = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr
) => {
  let { structureChunk } = questionOutputUnit;
  //Zeta: Change structureChunk all mentions to questionStructureChunk

  refFxn.removeAnnotationsByAOCs(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );

  refFxn.filterAnnotationsOnStCh(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );

  let annoObj = {};

  Object.keys(structureChunk.annotations).forEach((annoKey) => {
    let formattedAnnoValue = allLangUtils.translateAnnotationValue(
      annoKey,
      structureChunk,
      languagesObj
    );

    annoObj[annoKey] = formattedAnnoValue;
  });

  return aaUtils.trimAnnotations(annoObj);
};

exports.firstStageEvaluateAnnotations = (
  questionOutputArr,
  languagesObj,
  answerSentenceData
) => {
  if (!answerSentenceData) {
    console.log(
      "[1;31m " +
        "hhvv NB: NO ANSWER SENTENCE DATA IN aa.firstStageEvaluateAnnotations" +
        "[0m"
    );
  }

  questionOutputArr.forEach((outputUnit) => {
    let { structureChunk, selectedLemmaObject } = outputUnit;

    if (
      !structureChunk.annotations ||
      !Object.keys(structureChunk.annotations).length
    ) {
      console.log(
        `dhca firstStageEvaluateAnnotations "${structureChunk.chunkId}" has no annotations.`
      );
      return;
    }

    let formattedAnnoObj = aaUtils.getFormattedAnnoObj(
      outputUnit,
      languagesObj,
      answerSentenceData,
      questionOutputArr
    );

    if (!Object.values(formattedAnnoObj).length) {
      console.log(
        "[1;31m " +
          `dhce NB: firstStageEvaluateAnnotations. There were annotations on stCh, but none after formatting. "${structureChunk.chunkId}".` +
          "[0m"
      );
    }

    console.log(
      `dhci firstStageEvaluateAnnotations. Adding firstStageAnnotationsObj to "${structureChunk.chunkId}".`
    );

    outputUnit.firstStageAnnotationsObj = formattedAnnoObj;
  });
};

exports.trimAnnotations = (annotationObj) => {
  Object.keys(annotationObj).forEach((annoKey) => {
    let annoValue = annotationObj[annoKey];

    if (annoKey === "gender" && ["males", "females"].includes(annoValue)) {
      delete annotationObj.number;
    }

    if (!annoValue) {
      clUtils.throw("vmkp");
      delete annotationObj[annoKeyy];
    }
  });

  return annotationObj;
};

exports.addClarifiers = (arrayOfOutputUnits, languagesObj) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  if (!answerLanguage) {
    throw "OT:addClarifiers says Do you mean to call me? You don't give me an answerLanguage argument. I am only supposed to add clarifiers to the question sentence, and in order to do that I must know what the answerLanguage is going to be.";
  }

  const langUtils = require("../source/" + questionLanguage + "/langUtils.js");

  arrayOfOutputUnits.forEach((outputUnit) => {
    if (outputUnit.structureChunk.wordtype === "fixed") {
      return;
    }

    let {
      selectedLemmaObject,
      drillPath,
      structureChunk,
      selectedWord,
    } = outputUnit;

    if (!structureChunk.annotations) {
      structureChunk.annotations = {};
    }

    //STEP ONE: Type 1 Allohomographs (get clarifiers from lObj)
    //
    //  Textmoji Clarifiers
    //  Wordtype Clarifiers
    //
    //          STEP 1A: singleWordtype - Textmoji clarifiers

    let { allohomInfo } = selectedLemmaObject;

    if (allohomInfo && allohomInfo.singleWordtype) {
      if (!allohomInfo.emoji || !allohomInfo.text) {
        throw (
          "Lemma object '" +
          selectedLemmaObject.id +
          "' was marked as singleWordtype but not Textmoji Clarifiers were present!"
        );
      }

      let { emoji, text } = allohomInfo;

      console.log(
        "oozq addClarifiers------------------------------------------ADDED  CLARIFIER in Step 1a",
        emoji,
        text
      );
      structureChunk.annotations.emoji = emoji;
      structureChunk.annotations.text = text;
    }

    //          STEP 1B: multipleWordtype - Wordtype clarifiers

    if (allohomInfo && allohomInfo.multipleWordtype) {
      if (structureChunk.pleaseShowMultipleWordtypeAllohomClarifiers) {
        let annotationValue = gpUtils.getWordtypeFromLemmaObject(
          selectedLemmaObject
        );

        console.log(
          "wbvz addClarifiers------------------------------------------ADDED CLARIFIER in Step 1b",
          annotationValue
        );
        structureChunk.annotations.wordtype = annotationValue;
      }
    }

    //STEP TWO: Types 2-6 Synhomographs (language-specific)
    //
    //  Feature Clarifiers
    //
    //ie ENG has some verbs with v1-v2 synhomography.

    langUtils.addLanguageParticularClarifiers(
      structureChunk,
      questionLanguage,
      selectedLemmaObject
    );

    //STEP THREE: Type 1 Synhomographs (find synhoms in lobj programmatically)
    //
    //  Feature Clarifiers
    //
    //Find synhoms, add Feature Clarifiers if such clarifiers are allowed.
    let allowableClarifiers =
      refObj.lemmaObjectFeatures[answerLanguage]
        .allowableTransfersFromQuestionStructure[structureChunk.wordtype];

    let allowableExtraClarifiersInSingleWordSentences =
      refObj.lemmaObjectFeatures[answerLanguage]
        .allowableExtraClarifiersInSingleWordSentences[structureChunk.wordtype];

    console.log("qjho addClarifiers", languagesObj, {
      allowableClarifiers,
      allowableExtraClarifiersInSingleWordSentences,
    });

    //    allowableClarifiers. Any clarifiers not in here, don't bother adding them.
    //    We're looking ahead to the answerLanguage, and thinking, hmmmmm, well right now the questionLanguage
    //    is POL, and soon the answerLanguage will be ENG. And looking it up... ENG doesn't allow "gender" as a transfer.
    //    So from that, we can surmise that ENG doesn't care about gender, and thus, won't want it as a clarifer on the POL Q sentence.

    if (!structureChunk.preventAddingClarifiers) {
      let synhomographData = otUtils.findSynhomographs(
        selectedLemmaObject,
        structureChunk,
        questionLanguage
      );

      // if (!synhomographData) {
      //   console.log("[1;35m " + `uhqr addClarifiers No synhomographData` + "[0m");
      // } else {
      //   console.log(
      //     "[1;35m " + `uhqr addClarifiers Yes synhomographData.synhomographs` + "[0m",
      //     synhomographData.synhomographs
      //   );
      // }

      if (synhomographData) {
        synhomographData.synhomographs.forEach((synhomDataUnit) => {
          if (selectedWord === synhomDataUnit.terminalValue) {
            console.log(
              "[1;35m " +
                `qxqf addClarifiers YES enter filterDownClarifiers for selectedWord as "${selectedWord}"` +
                "[0m"
            );

            console.log("qxqf addClarifierssynhomDataUnit", synhomDataUnit);

            let labelsWhereTheyDiffer = filterDownClarifiers(
              synhomDataUnit,
              allowableClarifiers
            );

            function filterDownClarifiers(synhomDataUnit, allowableClarifiers) {
              console.log(
                "[1;35m " + `pjgg filterDownClarifiers---------------` + "[0m"
              );

              console.log(
                "pjgg filterDownClarifiers We start with these labels:",
                synhomDataUnit.labelsWhereTheyDiffer
              );

              let filteredLabels = synhomDataUnit.labelsWhereTheyDiffer.filter(
                (label) => {
                  if (
                    allowableClarifiers.includes(label) ||
                    (structureChunk.singleWordSentence &&
                      allowableExtraClarifiersInSingleWordSentences.includes(
                        label
                      ))
                  ) {
                    console.log(
                      "[1;32m " +
                        `jpnj filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage PASSING of "${label}" in allowableClarifiers` +
                        "[0m"
                    );
                    return true;
                  } else {
                    console.log(
                      "[1;30m " +
                        `lmza filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${label}" in allowableClarifiers` +
                        "[0m"
                    );
                    return false;
                  }
                }
              );

              console.log(
                "ahby filterDownClarifiers So now we have these labels:",
                filteredLabels
              );
              console.log(
                "ahby filterDownClarifiers, structureChunk",
                structureChunk
              );
              console.log(
                "ahby filterDownClarifiers, synhomDataUnit.inflectionLabelChain",
                synhomDataUnit.inflectionLabelChain
              );

              let currentValueArr = synhomDataUnit.inflectionLabelChain.map(
                (inflectionLabel) => {
                  console.log("vpzx filterDownClarifiers", { inflectionLabel });

                  if (
                    inflectionLabel === "tense" &&
                    (!structureChunk[inflectionLabel] ||
                      !structureChunk[inflectionLabel].length)
                  ) {
                    inflectionLabel = "tenseDescription";
                  }

                  if (
                    !structureChunk[inflectionLabel] ||
                    !structureChunk[inflectionLabel].length
                  ) {
                    console.log(
                      "[1;31m " +
                        `#WARN kxqz filterDownClarifiers. Adding null to currentValueArr for inflectionLabel "${inflectionLabel}".` +
                        "[0m"
                    );

                    return null;
                  }

                  if (structureChunk[inflectionLabel].length > 1) {
                    console.log(
                      "[1;31m " +
                        `#WARN wqzm filterDownClarifiers. structureChunk[inflectionLabel] "${structureChunk[inflectionLabel]}"` +
                        "[0m"
                    );
                    clUtils.throw(
                      "#ERR wqzm filterDownClarifiers. inflectionLabel: " +
                        inflectionLabel
                    );
                  }

                  return structureChunk[inflectionLabel][0];
                }
              );

              filteredLabels = filteredLabels.filter((label) => {
                if (
                  otUtils.findSinglePointMutationArray(
                    currentValueArr,
                    synhomDataUnit.inflectionPaths,
                    synhomDataUnit.inflectionLabelChain.indexOf(label),
                    (item1, item2) => {
                      let ref = {
                        virile: ["m", "m1", "f", "n"],
                        nonvirile: ["m2", "m3", "f", "n"],
                      };

                      let resultBool = false;

                      if (resultBool) {
                        return;
                      }

                      Object.keys(ref).forEach((pluralKey) => {
                        if (
                          (item1 === pluralKey &&
                            ref[pluralKey].includes(item2)) ||
                          (item2 === pluralKey &&
                            ref[pluralKey].includes(item1))
                        ) {
                          console.log(
                            "[1;33m " +
                              `hsan findSinglePointMutationArray WAHEY!` +
                              "[0m"
                          );
                          resultBool = true;
                        }
                      });

                      return resultBool;
                    }
                  )
                ) {
                  console.log(
                    "[1;32m " +
                      `xunf findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage PASSING of "${label}" in findSinglePointMutationArray` +
                      "[0m"
                  );
                  return true;
                } else {
                  console.log(
                    "[1;30m " +
                      `dhjc findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${label}" in findSinglePointMutationArray` +
                      "[0m"
                  );
                  return false;
                }
              });

              console.log(
                "cpkw filterDownClarifiers And now we have these labels:",
                filteredLabels
              );

              console.log("[1;35m " + `/filterDownClarifiers` + "[0m");

              return filteredLabels;
            }

            labelsWhereTheyDiffer.forEach((label) => {
              let clarifierValue = structureChunk[label];

              //Abort if a metaGender label is accidentally being made subject of a Clarifier.
              if (label === "gender") {
                if (
                  structureChunk[label].some(
                    (gender) => gender.slice(0, 3) === "all"
                  )
                ) {
                  return;
                }
              }

              if (Array.isArray(clarifierValue)) {
                if (clarifierValue.length === 1) {
                  clarifierValue = clarifierValue[0];
                } else {
                  console.log(
                    "rqfh addClarifiers clarifierValue",
                    clarifierValue
                  );
                  clUtils.throw(
                    "exej aa:addClarifiers --> clarifierValue had length of not 1."
                  );
                }
              }

              console.log(
                "sosu addClarifiers------------------------------------------ADDED CLARIFIER in Step 3: ",
                clarifierValue
              );
              structureChunk.annotations[label] = clarifierValue;
            });
          } else {
            console.log(
              "[1;35m " +
                `dhbb addClarifiers NOT enter filterDownClarifiers for selectedWord as "${selectedWord}"` +
                "[0m"
            );
          }
        });
      }
    } else {
      console.log(
        "wnvf addClarifiers I was told not to add any further clarifiers!"
      );
    }
  });
};
