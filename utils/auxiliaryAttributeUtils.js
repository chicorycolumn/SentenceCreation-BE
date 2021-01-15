const gpUtils = require("./generalPurposeUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const aaUtils = require("./auxiliaryAttributeUtils.js");
const allLangUtils = require("./allLangUtils.js");

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
        "------------------------------------------ADDED  CLARIFIER in Step 1a",
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
          "------------------------------------------ADDED CLARIFIER in Step 1b",
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

    console.log(
      { allowableClarifiers },
      answerLanguage,
      structureChunk.wordtype
    );
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

      // console.log("synhomographData");
      // console.log(synhomographData.lemmaObjectId);
      // console.log(synhomographData.inflectionLabelChain);
      // synhomographData.synhomographs.forEach((item) => {
      //   console.log(item);
      // });

      if (synhomographData) {
        synhomographData.synhomographs.forEach((synhomDataUnit) => {
          //Zeta: Think how this will interact with the Terminus Objects.
          if (selectedWord === synhomDataUnit.terminalValue) {
            console.log("synhomDataUnit", synhomDataUnit);
            let labelsWhereTheyDiffer = synhomDataUnit.labelsWhereTheyDiffer.filter(
              (label) => allowableClarifiers.includes(label)
            );

            console.log({ labelsWhereTheyDiffer });

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
                  console.log("clarifierValue", clarifierValue);
                  gpUtils.throw(
                    "aa.addClarifiers --> clarifierValue had length of not 1."
                  );
                }
              }

              console.log(
                "------------------------------------------ADDED CLARIFIER in Step 3: ",
                clarifierValue
              );
              structureChunk.annotations[label] = clarifierValue;
            });
          }
        });
      }
    } else {
      console.log("I was told not to add any further clarifiers!");
    }
  });
};

exports.addSpecifiers = (
  answerSentenceFormula,
  questionOutputArr,
  languagesObj
) => {
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("----addSpecifiers------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("questionOutputArr");
  questionOutputArr.forEach((outputUnit) => {
    console.log(outputUnit);
  });
  console.log(
    "answerSentenceFormula.sentenceStructure",
    answerSentenceFormula.sentenceStructure
  );

  //STEP ZERO: Getting materials

  let answerSentenceStructure = answerSentenceFormula.sentenceStructure;
  let questionSentenceStructure = questionOutputArr.map(
    (outputUnit) => outputUnit.structureChunk
  );

  let { answerLanguage, questionLanguage } = languagesObj;
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);

  let {
    answerHeadChunks,
    answerDependentChunks,
    answerOtherChunks,
    questionHeadChunks,
    questionDependentChunks,
    questionOtherChunks,
  } = aaUtils.sortAnswerAndQuestionStructureChunks(
    questionSentenceStructure,
    answerSentenceStructure
  );

  function getMaterialsToAddSpecifiers(
    answerChunk,
    answerSentenceStructure,
    questionSentenceStructure
  ) {
    let answerHeadChunk = answerSentenceStructure.find(
      (chunk) => chunk.chunkId === answerChunk.agreeWith
    );

    let questionChunk = questionSentenceStructure.find(
      (chunk) => chunk.chunkId === answerChunk.chunkId
    );

    let questionHeadChunk = questionSentenceStructure.find(
      (chunk) => chunk.chunkId === questionChunk.agreeWith
    );

    let questionLemmaObject;
    let questionHeadLemmaObject;

    if (questionHeadChunk) {
      let outputUnit = questionOutputArr.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId === questionHeadChunk.chunkId
      );
      if (outputUnit) {
        questionHeadLemmaObject = outputUnit.selectedLemmaObject;
      }
    }

    if (questionChunk) {
      let outputUnit = questionOutputArr.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId === questionChunk.chunkId
      );
      if (outputUnit) {
        questionLemmaObject = outputUnit.selectedLemmaObject;
      }
    }

    let res = {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    };

    return res;
  }

  function addRequiredSpecifiersToAnswerChunkOrHeadChunk(
    materials,
    answerLanguage,
    consoleLogLabel
  ) {
    let {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    } = materials;

    let requestedSpecifierInstructionsArr =
      refObj.requestedSpecifiersNew[answerLanguage][answerChunk.wordtype];

    if (!requestedSpecifierInstructionsArr) {
      console.log("RETURN! No requestedSpecifierInstructionsArr.");
      return;
    }

    requestedSpecifierInstructionsArr.forEach((reqSpecInstr) => {
      if (
        //If EACH condition of this reqSpecInstr is fulfilled...

        Object.keys(reqSpecInstr.condition).every((reqFeatureKey) => {
          let reqFeatureValue = reqSpecInstr.condition[reqFeatureKey];
          return (
            //by the A depCh or its headCh...

            gpUtils.doesKeyContainValueOnChunk(
              answerChunk,
              reqFeatureKey,
              reqFeatureValue
            ) ||
            gpUtils.doesKeyContainValueOnChunk(
              answerHeadChunk,
              reqFeatureKey,
              reqFeatureValue
            )
          );
        })
      ) {
        console.log("Pass 1");
        //then for each action key in the reqSpecInstr...

        Object.keys(reqSpecInstr.action).forEach((actionKey) => {
          //Gamma: Move this not-condition to the reqSpecInstructions in refObj.

          //   ( Btw, if actionKey is gender, and the A stCh we're looking at is PERSON,
          //     then abort. Gender does not need to be selected randomly here, instead
          //     it will be agreeWith-inherited from corresponding lObj after translation. )
          if (actionKey === "gender") {
            if (
              questionHeadChunk &&
              gpUtils.doesKeyContainValueOnChunk(questionHeadChunk, "andTags", [
                "person",
              ])
            ) {
              console.log("abort1");
              return;
            }

            if (
              questionChunk &&
              gpUtils.doesKeyContainValueOnChunk(questionChunk, "andTags", [
                "person",
              ])
            ) {
              console.log("abort2");
              return;
            }

            if (
              !questionHeadChunk &&
              !questionChunk &&
              answerHeadChunk &&
              gpUtils.doesKeyContainValueOnChunk(answerHeadChunk, "andTags", [
                "person",
              ])
            ) {
              console.log("abort3");
              return;
            }

            if (
              !questionHeadChunk &&
              !questionChunk &&
              answerChunk &&
              gpUtils.doesKeyContainValueOnChunk(answerChunk, "andTags", [
                "person",
              ])
            ) {
              console.log("abort4");
              return;
            }
          }

          if (
            //...if not truthy in A depCh, nor its headCh, nor corresp Q depCh, nor that one's headCh...
            //Alpha say - but what about overwriting, shouldn't that be allowed, nay, needed?

            gpUtils.keyShouldBeSpecified(answerChunk, actionKey, true) &&
            gpUtils.keyShouldBeSpecified(answerHeadChunk, actionKey, true) &&
            gpUtils.keyShouldBeSpecified(questionChunk, actionKey) &&
            gpUtils.keyShouldBeSpecified(questionHeadChunk, actionKey)
          ) {
            console.log("Pass 2");
            let actionValueArr = [
              gpUtils.selectRandom(reqSpecInstr.action[actionKey]),
            ];

            //...then fill the action key with action value in A headCh if exists, else A depCh...

            console.log(
              "-----------------------------------ADDED SPECIFIER in " +
                consoleLogLabel +
                " " +
                actionValueArr
            );
            aaUtils.specifyQuestionChunkAndChangeAnswerChunk(
              {
                answerHeadChunk,
                answerChunk,
                questionHeadChunk,
                questionChunk,
              },
              actionKey,
              actionValueArr
            );
          }
        });
      }
    });
  }

  //STEP ONE: For every A depCh and its headCh, check by requested Specifiers and if so, add them.

  //Now you might ask - why not run this process for first the headCh, then the depCh, then the otherCh?

  //Well, it's because we only want to Specify when there will actually be a difference.
  //Our approach is to hardcode specific depCh situations, in which we want the headCh to be Specified.

  //eg if depCh is POL verb past tense, in that case, we want gender of headCh Specified,
  //but if depCh is POL verb present tense, then no reason to Specify headCh's gender.
  answerDependentChunks.forEach((answerDependentChunk) => {
    let materials = getMaterialsToAddSpecifiers(
      answerDependentChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    addRequiredSpecifiersToAnswerChunkOrHeadChunk(
      materials,
      answerLanguage,
      "Step 1"
    );
  });

  //STEP TWO: Do this for the otherChunks as well.
  answerOtherChunks.forEach((answerOtherChunk) => {
    let materials = getMaterialsToAddSpecifiers(
      answerOtherChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    addRequiredSpecifiersToAnswerChunkOrHeadChunk(
      materials,
      answerLanguage,
      "Step 2"
    );
  });

  //STEP THREE: Do a special thing for Multi Gender Nouns - that's lObjs with {gender: "allPersonalSingularGenders_selector"}.
  answerDependentChunks.forEach((answerDependentChunk) => {
    let materials = getMaterialsToAddSpecifiers(
      answerDependentChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    let {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    } = materials;

    let selectedGenderForQuestionLanguage;

    if (
      questionHeadLemmaObject &&
      questionHeadLemmaObject.gender === "allPersonalSingularGenders_selector"
    ) {
      if (questionHeadChunk.gender && questionHeadChunk.gender.length) {
        selectedGenderForQuestionLanguage = gpUtils.selectRandom(
          questionHeadChunk.gender
        );
      } else {
        selectedGenderForQuestionLanguage = gpUtils.selectRandom(
          refObj.metaFeatures[questionLanguage].gender[
            "allPersonalSingularGenders"
          ]
        );
      }

      selectedGenderForAnswerLanguage = answerLangUtils.formatFeatureValue(
        "gender",
        selectedGenderForQuestionLanguage,
        "person"
      );

      // questionHeadLemmaObject.gender = selectedGenderForQuestionLanguage;
      questionHeadChunk.gender = [selectedGenderForQuestionLanguage];
      answerHeadChunk.gender = [selectedGenderForAnswerLanguage];

      aaUtils.addAnnotation(
        questionHeadChunk,
        "gender",
        selectedGenderForQuestionLanguage
      );
    }

    if (
      questionLemmaObject &&
      questionLemmaObject.gender === "allPersonalSingularGenders_selector"
    ) {
      if (questionChunk.gender && questionChunk.gender.length) {
        selectedGenderForQuestionLanguage = gpUtils.selectRandom(
          questionChunk.gender
        );
      } else {
        selectedGenderForQuestionLanguage = gpUtils.selectRandom(
          refObj.metaFeatures[questionLanguage].gender[
            "allPersonalSingularGenders"
          ]
        );
      }

      selectedGenderForAnswerLanguage = answerLangUtils.formatFeatureValue(
        "gender",
        selectedGenderForQuestionLanguage,
        "person"
      );

      // questionLemmaObject.gender = selectedGenderForQuestionLanguage;
      questionChunk.gender = [selectedGenderForQuestionLanguage];
      answerChunk.gender = [selectedGenderForAnswerLanguage];

      aaUtils.addAnnotation(
        questionChunk,
        "gender",
        selectedGenderForQuestionLanguage
      );
    }
  });

  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("----addSpecifiers------");
  console.log("---------END-----------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("questionOutputArr");
  questionOutputArr.forEach((item) => {
    console.log(item);
  });
  console.log(
    "answerSentenceFormula.sentenceStructure",
    answerSentenceFormula.sentenceStructure
  );
};

exports.sortAnswerAndQuestionStructureChunks = (
  questionSentenceStructure,
  answerSentenceStructure
) => {
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
  if (actionValueArr.length !== 1) {
    console.log({ actionValueArr });
    gpUtils.throw("actionValueArr had length of not 1");
  }

  let {
    answerHeadChunk,
    answerChunk,
    questionHeadChunk,
    questionChunk,
  } = chunksObj;

  if (answerHeadChunk) {
    console.log("Point A");
    answerHeadChunk[actionKey] = actionValueArr;
  } else {
    console.log("Point B");
    answerChunk[actionKey] = actionValueArr;
  }

  //...and note Specifier in Q headCh if exists, else Q depCh.

  if (questionHeadChunk) {
    console.log("Point C");
    aaUtils.addAnnotation(questionHeadChunk, actionKey, actionValueArr[0]);
  } else {
    if (!questionChunk) {
      throw (
        "There was no corresponding questionChunk to add these Specifiers to: " +
        actionKey +
        " " +
        actionValueArr[0]
      );
    }
    console.log("Point D");
    aaUtils.addAnnotation(questionChunk, actionKey, actionValueArr[0]);
  }
};

exports.addAnnotation = (chunk, key, value) => {
  if (!chunk.annotations) {
    chunk.annotations = {};
  }

  if (typeof value !== "string") {
    console.log({ value });
    gpUtils.throw("aa.addAnnotation expected STRING for value");
  }

  chunk.annotations[key] = value;
};

exports.attachAnnotations = (
  arrayOfOutputUnits,
  languagesObj,
  answerSentenceData
) => {
  if (!answerSentenceData) {
    console.log("[1;31m " + "NO ANSWER SENTENCE DATA IN aa.attachAnnotations" + "[0m");
  }

  if ("console" && answerSentenceData) {
    console.log("c22 answerSentenceData");
    // gpUtils.consoleLogObjectAtTwoLevels(answerSentenceData.arrayOfOutputArrays);
  }
  let { answerLanguage, questionLanguage } = languagesObj;

  if (answerSentenceData) {
    console.log("}}0");
    arrayOfOutputUnits.forEach((outputUnit) => {
      let { structureChunk, selectedLemmaObject } = outputUnit;

      console.log("}}1, structureChunk", structureChunk);

      let { chunkId } = structureChunk;

      let correspondingAnswerChunks = [];

      answerSentenceData.arrayOfOutputArrays.forEach((outputArray) => {
        outputArray.forEach((outputUnit) => {
          if (
            outputUnit.structureChunk &&
            outputUnit.structureChunk.chunkId === chunkId
          ) {
            let answerChunk = outputUnit.structureChunk;
            let dependentAnswerChunks = outputArray
              .map((outputUnit) => outputUnit.structureChunk)
              .filter(
                (structureChunk) =>
                  structureChunk.agreeWith === answerChunk.chunkId
              );

            correspondingAnswerChunks.push({
              answerChunk,
              dependentAnswerChunks,
            });
          }
        });
      });
      console.log(
        "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      );
      console.log("structureChunk");
      console.log(structureChunk);
      console.log("correspondingAnswerChunks");
      console.log(correspondingAnswerChunks);

      if (
        structureChunk.annotations &&
        Object.keys(structureChunk.annotations).length
      ) {
        if ("console") {
          console.log("b22-----------------------------------------");
          console.log("--------------------------------------------");
          console.log(
            "[1;35m " + outputUnit.selectedWord + "[0m",
            structureChunk.annotations
          );
          console.log("--------------------------------------------");
          console.log("--------------------------------------------");
        }

        refObj.filterAnnotations(
          structureChunk,
          languagesObj,
          correspondingAnswerChunks
        );

        let formattedAnnotationArr = Object.keys(
          structureChunk.annotations
        ).map((annotationKey) =>
          allLangUtils.translateAnnotationValue(
            annotationKey,
            structureChunk,
            languagesObj
          )
        );

        if (formattedAnnotationArr.length) {
          outputUnit.selectedWord += ` (${formattedAnnotationArr
            .filter((item) => item)
            .join(", ")})`;
        }
      }
    });
  } else {
    console.log("}}2");
    arrayOfOutputUnits.forEach((outputUnit) => {
      let { structureChunk, selectedLemmaObject } = outputUnit;

      if (
        structureChunk.annotations &&
        Object.keys(structureChunk.annotations).length
      ) {
        if ("console") {
          console.log("b22-----------------------------------------");
          console.log("--------------------------------------------");
          console.log(
            "[1;35m " + outputUnit.selectedWord + "[0m",
            structureChunk.annotations
          );
          console.log("--------------------------------------------");
          console.log("--------------------------------------------");
        }

        let formattedAnnotationArr = Object.keys(
          structureChunk.annotations
        ).map((annotationKey) =>
          allLangUtils.translateAnnotationValue(
            annotationKey,
            structureChunk,
            languagesObj
          )
        );

        outputUnit.selectedWord += ` (${formattedAnnotationArr
          .filter((item) => item)
          .join(", ")})`;
      }
    });
  }
};
