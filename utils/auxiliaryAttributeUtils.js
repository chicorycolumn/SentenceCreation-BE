const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const cfUtils = require("./counterfaxUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const aaUtils = require("./auxiliaryAttributeUtils.js");
const allLangUtils = require("./allLangUtils.js");
const palette = require("../models/palette.model.js");

exports.firstStageEvaluateAnnotations = (
  questionOutputArr,
  languagesObj,
  answerSentenceData,
  questionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  runsRecord
) => {
  consol.log(questionOutputArr.map((unit) => unit.structureChunk));

  if (!answerSentenceData) {
    consol.log(
      "[1;31m " +
        "hhvv NB: NO ANSWER SENTENCE DATA IN aa.firstStageEvaluateAnnotations" +
        "[0m"
    );
  }

  aaUtils.removeAnnotationsByRef(
    questionOutputArr,
    languagesObj,
    answerSentenceData
  );

  aaUtils.removeAnnotationsByAOCs(
    questionOutputArr,
    languagesObj,
    answerSentenceData
  );

  if (
    questionOutputArr.every((outputUnit) =>
      uUtils.isEmpty(outputUnit.structureChunk.annotations)
    )
  ) {
    return;
  }

  let { counterfaxSituations, annotationsToCounterfaxAndTheirChunkIds } =
    cfUtils.listCounterfaxSituations(questionOutputArr, languagesObj);

  if (annotationsToCounterfaxAndTheirChunkIds.length) {
    let explodedCounterfaxSituationsSchematics =
      cfUtils.explodeCounterfaxSituations(counterfaxSituations);

    cfUtils.removeAnnotationsByCounterfactualAnswerSentences(
      explodedCounterfaxSituationsSchematics,
      questionOutputArr,
      annotationsToCounterfaxAndTheirChunkIds,
      languagesObj,
      answerSentenceData,
      questionSentenceFormula,
      reqBody,
      answerSelectedWordsSetsHaveChanged,
      runsRecord
    );
  }

  questionOutputArr.forEach((outputUnit) => {
    if (uUtils.isEmpty(outputUnit.structureChunk.annotations)) {
      return;
    }

    let formattedAnnoObj = aaUtils.convertAnnotationsToPlainspeak(
      outputUnit,
      languagesObj
    );

    if (!Object.values(formattedAnnoObj).length) {
      consol.log(
        "[1;31m " +
          `dhce NB: firstStageEvaluateAnnotations. There were annotations on stCh, but none after formatting. "${outputUnit.structureChunk.chunkId}".` +
          "[0m"
      );
    }

    consol.log(
      `dhci firstStageEvaluateAnnotations. Adding firstStageAnnotationsObj to "${outputUnit.structureChunk.chunkId}".`
    );

    outputUnit.firstStageAnnotationsObj = formattedAnnoObj;
  });
};

exports.convertAnnotationsToPlainspeak = (questionOutputUnit, languagesObj) => {
  let questionStructureChunk = questionOutputUnit.structureChunk;

  let annoObj = {};

  Object.keys(questionStructureChunk.annotations).forEach((annoTraitKey) => {
    let formattedAnnoTraitValue = allLangUtils.translateAnnoTraitValue(
      annoTraitKey,
      questionStructureChunk,
      languagesObj
    );

    annoObj[annoTraitKey] = formattedAnnoTraitValue;
  });

  let result = aaUtils.trimAnnotations(annoObj);

  return result;
};

exports.removeAnnotationsByAOCs = (
  questionOutputArr,
  languagesObj,
  answerSentenceData
) => {
  questionOutputArr.forEach((questionOutputUnit) => {
    if (uUtils.isEmpty(questionOutputUnit.structureChunk.annotations)) {
      return;
    }

    //AOC = Annotation-obviating connected (allDependent) word.

    //The doctor (f) and her book.    --> 'doctor' has an allDependent 'her' which obviates its gender annotation.
    //The sheep (sing.) and its grass. --> 'sheep' has an allDependent 'its' which obviates its number annotation.

    //prosMGN
    //1. For this stCh, get all q output units that are Dependent/PHD of this.
    //2. Filter to just the ones with wordtype pronombre.
    //3. If the selectedWord in any of those units is unique between genders in its lemma object
    //   (eg "his" is unique as no other gender traitKey holds this inflectionValue, whereas "their" is not unique as two genders traitKeys hold it)
    //   then delete/block the gender annotation.
    let allDependentWordtype = "pronombre";

    if (uUtils.isEmpty(questionOutputUnit.structureChunk.annotations)) {
      return;
    }

    if (
      ["nounCommon", "nounPerson"].includes(
        gpUtils.getWordtypeStCh(questionOutputUnit.structureChunk)
      )
    ) {
      let headChunkId = questionOutputUnit.structureChunk.chunkId;

      let primaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
        "agreeWith",
        "postHocAgreeWithPrimary",
      ]);

      let secondaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
        "postHocAgreeWithSeconday",
      ]);

      let tertiaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
        "postHocAgreeWithTertiary",
      ]);

      function getDepUnits(questionOutputArr, headChunkId, agreeKeys) {
        return questionOutputArr
          .filter((unit) =>
            agreeKeys.some(
              (agreeKey) => unit.structureChunk[agreeKey] === headChunkId
            )
          )
          .filter(
            (unit) =>
              gpUtils.getWordtypeStCh(unit.structureChunk) ===
              allDependentWordtype
          );
      }

      if ("console") {
        consol.log(
          "ttta questionOutputUnit.structureChunk.annotations",
          questionOutputUnit.structureChunk.annotations
        );
        consol.log(
          "tttb primaryDepUnits",
          primaryDepUnits.map((unit) => unit.drillPath)
        );
        consol.log(
          "tttb secondaryDepUnits",
          secondaryDepUnits.map((unit) => unit.drillPath)
        );
        consol.log(
          "tttb tertiaryDepUnits",
          tertiaryDepUnits.map((unit) => unit.drillPath)
        );
      }

      Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
        (inflectionCategory) => {
          let annoTraitValue =
            questionOutputUnit.structureChunk.annotations[inflectionCategory];

          //Imagine "Ja, moje jabłko."
          //drillPath reveals info about 'Ja'
          //drillPathSecondary reveals info about 'jabłko'
          //
          //So if we're looking at secondaryDeps, then we'll look in drillPathSecondary, and so on.
          deleteByAOC(primaryDepUnits, "drillPath");
          deleteByAOC(secondaryDepUnits, "drillPathSecondary");
          deleteByAOC(tertiaryDepUnits, "drillPathTertiary");

          function deleteByAOC(depUnits, drillPathType) {
            depUnits.forEach((depUnit) => {
              if (
                !questionOutputUnit.structureChunk.annotations[
                  inflectionCategory
                ] || //ie we've now deleted it so abort loop.
                !depUnit[drillPathType]
              ) {
                return;
              }

              consol.log("meef", depUnit);

              /**If any dep unit holds an inflectionValue at inflectionCategory that is unique in its lObj,
               * then this pronombre obviates the need for that specifier, so delete it from annotations.
               */
              if (
                otUtils.doesThisInflectionKeyHoldUniqueInflectionValueInLObj(
                  depUnit.selectedLemmaObject,
                  inflectionCategory,
                  depUnit[drillPathType]
                )
              ) {
                consol.log(
                  "[1;30m " +
                    `kzia removeAnnotationsByAOCs "${questionOutputUnit.structureChunk.chunkId}" ABZ Late stage DELETION of annotation "${inflectionCategory}" which is "${questionOutputUnit.structureChunk.annotations[inflectionCategory]}"` +
                    "[0m"
                );

                delete questionOutputUnit.structureChunk.annotations[
                  inflectionCategory
                ];
              }
            });
          }
        }
      );
    }
  });
};

exports.removeAnnotationsByRef = (
  questionOutputArr,
  languagesObj,
  answerSentenceData
) => {
  questionOutputArr.forEach((questionOutputUnit) => {
    let { structureChunk } = questionOutputUnit;

    if (
      !questionOutputUnit.structureChunk.annotations ||
      !Object.keys(questionOutputUnit.structureChunk.annotations).length
    ) {
      return;
    }

    let headChunk =
      structureChunk.agreeWith &&
      questionOutputArr.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId === structureChunk.agreeWith
      ).structureChunk;

    let stChs = headChunk ? [structureChunk, headChunk] : [structureChunk];

    if (uUtils.isEmpty(structureChunk.annotations)) {
      return;
    }

    let ref =
      refObj.conditionsOnWhichToBlockAnnotations[languagesObj.questionLanguage];

    ref = ref && ref[gpUtils.getWordtypeStCh(structureChunk)];

    if (!ref) {
      return;
    }

    Object.keys(ref).forEach((annoTraitKey) => {
      if (structureChunk.annotations[annoTraitKey]) {
        let conditionsOnWhichToBlockThisAnno = ref[annoTraitKey];
        if (
          conditionsOnWhichToBlockThisAnno.some(
            (conditionOnWhichToBlockThisAnno) => {
              return Object.keys(conditionOnWhichToBlockThisAnno).every(
                (traitKey) => {
                  let traitValues = conditionOnWhichToBlockThisAnno[traitKey];

                  return stChs.some((stCh) => {
                    if (stCh[traitKey] && stCh[traitKey].length) {
                      if (stCh[traitKey].length > 1) {
                        consol.throw(
                          "vjpp Unsure how to check this condition for blocking anno when the stCh has more than one traitValue here."
                        );
                      }
                      return traitValues.includes(stCh[traitKey][0]);
                    }
                  });
                }
              );
            }
          )
        ) {
          consol.log(
            `prri removeAnnotationsByRef for "${structureChunk.chunkId}" is removing "${annoTraitKey}" anno as it fit the conditions.`
          );
          delete structureChunk.annotations[annoTraitKey];
        }
      }
    });
  });
};

exports.specialAdjustmentToAnnotations = (
  questionSentenceData,
  languagesObj
) => {
  const questionLangUtils = require(`../source/${languagesObj.questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${languagesObj.answerLanguage}/langUtils.js`);

  //Part 1-A: If a stCh has a gender anno, and this stCh is a depCh,
  //then transfer the gender anno to its headCh, and remove the anno from this depCh.
  questionSentenceData.questionOutputArr.forEach((outputUnit) => {
    trimAnnoIfGenderRevealedByGenderedNoun(outputUnit, languagesObj);
  });

  function trimAnnoIfGenderRevealedByGenderedNoun(outputUnit, languagesObj) {
    let { structureChunk } = outputUnit;

    if (
      structureChunk.annotations &&
      Object.keys(structureChunk.annotations).includes("gender") &&
      structureChunk.agreeWith
    ) {
      let headOutputUnit = questionSentenceData.questionOutputArr.find(
        (unit) => unit.structureChunk.chunkId === structureChunk.agreeWith
      );

      let headChunk = headOutputUnit.structureChunk;
      let headLObj = headOutputUnit.selectedLemmaObject;

      if (!headChunk) {
        consol.throw("ojiq");
      }

      if (
        headChunk.annotations &&
        headChunk.annotations.gender &&
        headChunk.annotations.gender !== structureChunk.annotations.gender
      ) {
        consol.throw(
          "cjow The depCh and its headCh have different annoTraitValues for gender?"
        );
      }

      if (!(headLObj.gender && !gpUtils.traitValueIsMeta(headLObj.gender))) {
        headChunk.annotations.gender = structureChunk.annotations.gender;
      }
      delete structureChunk.annotations.gender;
    }
  }
};

exports.addSpecifiersToMGNs = (questionSentenceData, languagesObj) => {
  let { questionOutputArr } = questionSentenceData;
  let { questionLanguage, answerLanguage } = languagesObj;
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  let metaGenders = Object.keys(
    refObj.metaTraitValues[questionLanguage]["gender"]
  );

  let questionUnitsToSpecify = questionOutputArr.filter(
    (qUnit) => !qUnit.structureChunk.dontSpecifyOnThisChunk
  );

  let questionMGNunits = questionUnitsToSpecify.filter((unit) => {
    return (
      unit.selectedLemmaObject &&
      unit.selectedLemmaObject.gender &&
      metaGenders.includes(unit.selectedLemmaObject.gender)
    );
  });

  questionMGNunits.forEach((questionMGNunit) => {
    let metaGender = questionMGNunit.selectedLemmaObject.gender;

    let selectedGenderForQuestionLanguage;
    let selectedGenderForAnswerLanguageArr;

    if (
      questionMGNunit.structureChunk.gender &&
      questionMGNunit.structureChunk.gender.length
    ) {
      selectedGenderForQuestionLanguage = uUtils.selectRandom(
        questionMGNunit.structureChunk.gender
      );

      if (
        !refObj.metaTraitValues[questionLanguage].gender[metaGender].includes(
          selectedGenderForQuestionLanguage
        )
      ) {
        consol.log(
          "questionMGNunit.structureChunk.gender",
          questionMGNunit.structureChunk.gender
        );
        consol.log(
          "refObj.metaTraitValues[questionLanguage].gender[metaGender]",
          refObj.metaTraitValues[questionLanguage].gender[metaGender]
        );
        consol.throw(
          "knmo addSpecifiersToMGNs #ERR I expected the question chunk's gender to be present in the translated genders array for the question lObj's metagender selector."
        );
      }
    } else {
      selectedGenderForQuestionLanguage = uUtils.selectRandom(
        refObj.metaTraitValues[questionLanguage].gender[metaGender]
      );
    }

    selectedGenderForAnswerLanguageArr = answerLangUtils.formatTraitValue(
      "gender",
      selectedGenderForQuestionLanguage,
      "person"
    );

    consol.log(
      "[1;35m " +
        `ksxy addSpecifiersToMGNs #NB: Am changing questionMGNunit.structureChunk.gender and correspondingAnswerUnit.structureChunk.gender` +
        "[0m"
    );
    consol.log(`ksxy addSpecifiersToMGNs`, {
      selectedGenderForQuestionLanguage,
      selectedGenderForAnswerLanguageArr,
    });

    questionMGNunit.structureChunk.gender = [selectedGenderForQuestionLanguage];
    // correspondingAnswerUnit.structureChunk.gender = selectedGenderForAnswerLanguageArr;

    consol.log("wdmi addSpecifiers. Will addAnnotation ");
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
  consol.log("bsat sortAnswerAndQuestionStructureChunks");

  let responseObj = {
    answerHeadChunks: null,
    answerDependentChunks: null,
    answerOtherChunks: null,
    questionHeadChunks: null,
    questionDependentChunks: null,
    questionOtherChunks: null,
  };

  let { headChunks, dependentChunks, otherChunks } =
    scUtils.sortStructureChunks(answerSentenceStructure);

  responseObj.answerHeadChunks = headChunks;
  responseObj.answerDependentChunks = dependentChunks;
  responseObj.answerOtherChunks = otherChunks;

  if (true) {
    let { headChunks, dependentChunks, otherChunks } =
      scUtils.sortStructureChunks(questionSentenceStructure);

    responseObj.questionHeadChunks = headChunks;
    responseObj.questionDependentChunks = dependentChunks;
    responseObj.questionOtherChunks = otherChunks;

    return responseObj;
  }
};

exports.specifyQuestionChunkAndChangeAnswerChunk = (
  chunksObj,
  traitKey,
  traitValueArr
) => {
  consol.throw(
    "fjln specifyQuestionChunkAndChangeAnswerChunk Oh so we do use this."
  );

  if (traitValueArr.length !== 1) {
    consol.log("ujrw specifyQuestionChunkAndChangeAnswerChunk", {
      traitValueArr,
    });
    consol.throw(
      "ujrw specifyQuestionChunkAndChangeAnswerChunk traitValueArr had length of not 1"
    );
  }

  let { answerHeadChunk, answerChunk, questionHeadChunk, questionChunk } =
    chunksObj;

  if (answerHeadChunk) {
    consol.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point A");
    answerHeadChunk[traitKey] = traitValueArr;
  } else {
    consol.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point B");
    answerChunk[traitKey] = traitValueArr;
  }

  //...and note Specifier in Q headCh if exists, else Q depCh.

  if (questionHeadChunk) {
    consol.log("tbji specifyQuestionChunkAndChangeAnswerChunk Point C");
    aaUtils.addAnnotation(questionHeadChunk, traitKey, traitValueArr[0]);
  } else {
    if (!questionChunk) {
      throw (
        "aaxj specifyQuestionChunkAndChangeAnswerChunk There was no corresponding questionChunk to add these Specifiers to: " +
        traitKey +
        " " +
        traitValueArr[0]
      );
    }
    consol.log(
      "lskt specifyQuestionChunkAndChangeAnswerChunk specifyQuestionChunkAndChangeAnswerChunk Point D"
    );
    aaUtils.addAnnotation(questionChunk, traitKey, traitValueArr[0]);
  }
};

exports.addAnnotation = (chunk, traitKey, traitValue) => {
  if (!chunk.annotations) {
    chunk.annotations = {};
  }

  if (typeof traitValue !== "string") {
    consol.log("nrtn addAnnotation", { traitValue });
    consol.throw("nrtn addAnnotation expected STRING for traitValue");
  }

  consol.log(
    "[1;35m " + "aggw addAnnotation Added annotation for " + chunk.chunkId + "[0m"
  );
  consol.log("aggw addAnnotation", { traitKey, traitValue });

  chunk.annotations[traitKey] = traitValue;
};

exports.trimAnnotations = (annotationObj) => {
  Object.keys(annotationObj).forEach((annoTraitKey) => {
    let annoTraitValue = annotationObj[annoTraitKey];

    if (
      annoTraitKey === "gender" &&
      ["males", "females"].includes(annoTraitValue)
    ) {
      delete annotationObj.number;
    }

    if (!annoTraitValue) {
      consol.throw("vmkp");
      delete annotationObj[annoTraitKeyy];
    }
  });

  return annotationObj;
};

exports.addClarifiers = (arrayOfOutputUnits, languagesObj) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  if (!answerLanguage) {
    throw "OT:addClarifiers says Do you mean to call me? You don't give me an answerLanguage argument. I am only supposed to add clarifiers to the question sentence, and in order to do that I must know what the answerLanguage is going to be.";
  }

  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  arrayOfOutputUnits.forEach((outputUnit) => {
    let { selectedLemmaObject, drillPath, structureChunk, selectedWord } =
      outputUnit;

    if (gpUtils.getWordtypeStCh(structureChunk) === "fixed") {
      return;
    }

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

      consol.log(
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
        let annoTraitValue = gpUtils.getWordtypeLObj(selectedLemmaObject);

        consol.log(
          "wbvz addClarifiers------------------------------------------ADDED CLARIFIER in Step 1b",
          annoTraitValue
        );
        structureChunk.annotations.wordtype = annoTraitValue;
      }
    }

    //STEP TWO: Types 2-6 Synhomographs (language-specific)
    //
    //  Trait Clarifiers
    //
    //ie ENG has some verbs with v1-v2 synhomography.

    questionLangUtils.addLanguageParticularClarifiers(
      structureChunk,
      questionLanguage,
      selectedLemmaObject
    );

    //STEP THREE: Type 1 Synhomographs (find synhoms in lobj programmatically)
    //
    //  Trait Clarifiers
    //
    //Find synhoms, add Trait Clarifiers if such clarifiers are allowed.
    let allowableClarifiers =
      refObj.lemmaObjectTraitKeys[answerLanguage]
        .allowableTransfersFromQuestionStructure[
        gpUtils.getWordtypeStCh(structureChunk)
      ];

    if (!allowableClarifiers) {
      consol.log(
        "[1;31m " + `cicw allowableClarifiers are`,
        allowableClarifiers,
        `because structureChunk=${
          structureChunk.chunkId
        } answerLanguage=${answerLanguage}, stChWordtype=${gpUtils.getWordtypeStCh(
          structureChunk
        )}.` + "[0m"
      );
      allowableClarifiers = [];
    }

    let allowableExtraClarifiersInSingleWordSentences =
      refObj.lemmaObjectTraitKeys[answerLanguage]
        .allowableExtraClarifiersInSingleWordSentences[
        gpUtils.getWordtypeStCh(structureChunk)
      ];

    consol.log("qjho addClarifiers", languagesObj, {
      allowableClarifiers,
      allowableExtraClarifiersInSingleWordSentences,
    });

    //    allowableClarifiers. Any clarifiers not in here, don't bother adding them.
    //    We're looking ahead to the answerLanguage, and thinking, hmmmmm, well right now the questionLanguage
    //    is POL, and soon the answerLanguage will be ENG. And looking it up... ENG doesn't allow "gender" as a transfer.
    //    So from that, we can surmise that ENG doesn't care about gender, and thus, won't want it as a clarifer on the POL Q sentence.

    if (!structureChunk.preventAddingFurtherClarifiers) {
      let synhomographData = otUtils.findSynhomographs(
        selectedLemmaObject,
        structureChunk,
        questionLanguage
      );

      if (synhomographData) {
        synhomographData.synhomographs.forEach((synhomDataUnit) => {
          if (selectedWord === synhomDataUnit.terminalValue) {
            consol.log(
              "[1;35m " +
                `qxqf addClarifiers YES enter filterDownClarifiers for selectedWord as "${selectedWord}"` +
                "[0m"
            );

            consol.log("qxqf addClarifierssynhomDataUnit", synhomDataUnit);

            let inflectionCategorysWhereTheyDiffer = filterDownClarifiers(
              synhomDataUnit,
              allowableClarifiers
            );

            function filterDownClarifiers(synhomDataUnit, allowableClarifiers) {
              consol.log("[1;35m " + `pjgg filterDownClarifiers---------------` + "[0m");

              consol.log(
                "pjgg filterDownClarifiers We start with these inflectionCategory:",
                synhomDataUnit.inflectionCategorysWhereTheyDiffer
              );

              let filteredInflectionCategorys =
                synhomDataUnit.inflectionCategorysWhereTheyDiffer.filter(
                  (inflectionCategory) => {
                    if (
                      allowableClarifiers.includes(inflectionCategory) ||
                      (structureChunk.singleWordSentence &&
                        allowableExtraClarifiersInSingleWordSentences.includes(
                          inflectionCategory
                        ))
                    ) {
                      consol.log(
                        "[1;32m " +
                          `jpnj filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage PASSING of "${inflectionCategory}" in allowableClarifiers` +
                          "[0m"
                      );
                      return true;
                    } else {
                      consol.log(
                        "[1;30m " +
                          `lmza filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${inflectionCategory}" in allowableClarifiers` +
                          "[0m"
                      );
                      return false;
                    }
                  }
                );

              consol.log(
                "ahby filterDownClarifiers So now we have these inflectionCategorys:",
                filteredInflectionCategorys
              );
              consol.log(
                "ahby filterDownClarifiers, structureChunk",
                structureChunk
              );
              consol.log(
                "ahby filterDownClarifiers, synhomDataUnit.inflectionCategoryChain",
                synhomDataUnit.inflectionCategoryChain
              );

              let currentTraitValues =
                synhomDataUnit.inflectionCategoryChain.map(
                  (inflectionCategory) => {
                    consol.log("vpzx filterDownClarifiers", {
                      inflectionCategory,
                    });

                    if (
                      inflectionCategory === "tense" &&
                      (!structureChunk[inflectionCategory] ||
                        !structureChunk[inflectionCategory].length)
                    ) {
                      inflectionCategory = "tenseDescription";
                    }

                    if (
                      !structureChunk[inflectionCategory] ||
                      !structureChunk[inflectionCategory].length
                    ) {
                      consol.log(
                        "[1;31m " +
                          `#WARN kxqz filterDownClarifiers. Adding null to currentTraitValues for inflectionCategory "${inflectionCategory}".` +
                          "[0m"
                      );

                      return null;
                    }

                    if (structureChunk[inflectionCategory].length > 1) {
                      consol.log(
                        "[1;31m " +
                          `#WARN wqzm filterDownClarifiers. structureChunk[inflectionCategory] "${structureChunk[inflectionCategory]}"` +
                          "[0m"
                      );
                      consol.throw(
                        "#ERR wqzm filterDownClarifiers. inflectionCategory: " +
                          inflectionCategory
                      );
                    }

                    return structureChunk[inflectionCategory][0];
                  }
                );

              filteredInflectionCategorys = filteredInflectionCategorys.filter(
                (inflectionCategory) => {
                  let specialComparisonCallback =
                    answerLangUtils.filterDownClarifiersSpecialComparisonCallback;

                  if (
                    otUtils.findSinglePointMutationArray(
                      currentTraitValues,
                      synhomDataUnit.inflectionPaths,
                      synhomDataUnit.inflectionCategoryChain.indexOf(
                        inflectionCategory
                      ),
                      specialComparisonCallback
                    )
                  ) {
                    consol.log(
                      "[1;32m " +
                        `xunf findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage PASSING of "${inflectionCategory}" in findSinglePointMutationArray` +
                        "[0m"
                    );
                    return true;
                  } else {
                    consol.log(
                      "[1;30m " +
                        `dhjc findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${inflectionCategory}" in findSinglePointMutationArray` +
                        "[0m"
                    );
                  }
                }
              );

              consol.log(
                "cpkw filterDownClarifiers And now we have these inflectionCategorys:",
                filteredInflectionCategorys
              );

              consol.log("[1;35m " + `/filterDownClarifiers` + "[0m");

              return filteredInflectionCategorys;
            }

            inflectionCategorysWhereTheyDiffer.forEach((inflectionCategory) => {
              let inflectionKey = structureChunk[inflectionCategory];

              //Abort if a metaGender inflectionCategory is accidentally being made subject of a Clarifier.
              if (inflectionCategory === "gender") {
                if (
                  structureChunk[inflectionCategory].some((gender) =>
                    gpUtils.traitValueIsMeta(gender)
                  )
                ) {
                  return;
                }
              }

              if (Array.isArray(inflectionKey)) {
                if (inflectionKey.length === 1) {
                  inflectionKey = inflectionKey[0];
                } else {
                  consol.log("rqfh addClarifiers inflectionKey", inflectionKey);
                  consol.throw(
                    "exej aa:addClarifiers --> inflectionKey had length of not 1."
                  );
                }
              }

              consol.log(
                "sosu addClarifiers------------------------------------------ADDED CLARIFIER in Step 3: ",
                inflectionKey
              );
              structureChunk.annotations[inflectionCategory] = inflectionKey;
            });
          }
        });
      }
    } else {
      consol.log(
        "wnvf addClarifiers I was told not to add any further clarifiers!"
      );
    }
  });
};

exports.setPDSValues = (questionSentenceFormula, questionLanguage) => {
  //If PDS from req, then add PDS:true to each Q stCh.
  //Unless stCh has wordtype nounPerson and is headNoun of pronombre stCh. 'The doctor gave me his book.' must specify MGN doctor.
  //
  //But if qChunk.gender holds all the poss gender traitValues for this lang>wordtype (bearing in mind if isPerson)
  //then do allow it to be qChunk.dontSpecifyOnThisChunk = true.

  questionSentenceFormula.sentenceStructure.forEach((qChunk) => {
    if (!gpUtils.stChIsNounPerson(qChunk)) {
      qChunk.dontSpecifyOnThisChunk = true;
    } else {
      if (
        questionSentenceFormula.sentenceStructure.find(
          (potentialDepChunk) =>
            gpUtils.getWordtypeStCh(potentialDepChunk) === "pronombre" &&
            potentialDepChunk.agreeWith === qChunk.chunkId
        )
      ) {
        if (
          qChunk.gender &&
          qChunk.gender.length &&
          refObj.metaTraitValues[questionLanguage]["gender"][
            refObj.getNounGenderTraitValues(
              gpUtils.getWordtypeShorthandStCh(qChunk)
            )
          ].every((traitValue) => qChunk.gender.includes(traitValue))
        ) {
          qChunk.dontSpecifyOnThisChunk = true;
        } else {
          qChunk.dontSpecifyOnThisChunk = false;
        }
      } else {
        if (
          qChunk.gender &&
          qChunk.gender.length &&
          !refObj.metaTraitValues[questionLanguage]["gender"][
            refObj.getNounGenderTraitValues(
              gpUtils.getWordtypeShorthandStCh(qChunk)
            )
          ].every((traitValue) => qChunk.gender.includes(traitValue))
        ) {
          qChunk.dontSpecifyOnThisChunk = false;
        } else {
          qChunk.dontSpecifyOnThisChunk = true;
        }
      }
    }

    consol.log(
      `PDSyellow qChunk.dontSpecifyOnThisChunk for "${qChunk.chunkId}=${qChunk.dontSpecifyOnThisChunk}"`
    );
  });
};
