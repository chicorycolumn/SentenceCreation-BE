const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const clUtils = require("./zerothOrder/consoleLoggingUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
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
  additionalRunsRecord,
  originalQuestionSentenceFormula
) => {
  if (!answerSentenceData) {
    console.log(
      "[1;31m " +
        "hhvv NB: NO ANSWER SENTENCE DATA IN aa.firstStageEvaluateAnnotations" +
        "[0m"
    );
  }

  let questionOutputUnitsThatHaveBeenCounterfactualed = {};

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
      questionOutputArr,
      questionSentenceFormula,
      reqBody,
      answerSelectedWordsSetsHaveChanged,
      questionOutputUnitsThatHaveBeenCounterfactualed,
      additionalRunsRecord,
      originalQuestionSentenceFormula
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

exports.getFormattedAnnoObj = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr,
  questionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  questionOutputUnitsThatHaveBeenCounterfactualed,
  additionalRunsRecord,
  originalQuestionSentenceFormula
) => {
  let questionStructureChunk = questionOutputUnit.structureChunk;
  //Zeta: Change structureChunk all mentions to questionStructureChunk

  console.log("bbbc");
  aaUtils.removeAnnotationsByAOCs(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );
  console.log("bbbd");

  aaUtils.removeAnnotationsByCounterfactualAnswerSentences(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr,
    questionSentenceFormula,
    reqBody,
    answerSelectedWordsSetsHaveChanged,
    questionOutputUnitsThatHaveBeenCounterfactualed,
    additionalRunsRecord,
    originalQuestionSentenceFormula
  );
  console.log("bbbe");

  let annoObj = {};

  Object.keys(questionStructureChunk.annotations).forEach((annoKey) => {
    let formattedAnnoValue = allLangUtils.translateAnnotationValue(
      annoKey,
      questionStructureChunk,
      languagesObj
    );

    annoObj[annoKey] = formattedAnnoValue;
  });

  return aaUtils.trimAnnotations(annoObj);
};

exports.removeAnnotationsByCounterfactualAnswerSentences = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr,
  rawQuestionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  questionOutputUnitsThatHaveBeenCounterfactualed,
  additionalRunsRecord,
  originalQuestionSentenceFormula
) => {
  // clUtils.consoleLogObjectAtOneLevel(
  //   questionOutputArr,
  //   "questionOutputArr",
  //   "removeAnnotationsByCounterfactualAnswerSentences"
  // );
  // clUtils.throw(112);

  //Abortcuts for this fxn: Search ACX.

  if (
    aaUtils.removeAnnotationsIfHeadChunkHasBeenCounterfaxed(
      questionOutputUnitsThatHaveBeenCounterfactualed,
      questionOutputUnit
    )
  ) {
    //ACX1: If this QstCh agrees with a stCh that we've already run through counterfaxing,
    //then remove that specific annotation from this QstCh, and return.
    return;
  }

  let shouldConsoleLog = false;

  let questionSentenceStructure = questionOutputArr.map(
    (unit) => unit.structureChunk
  );
  let originalQuestionSelectedWords = questionOutputArr.map(
    (unit) => unit.selectedWord
  );
  let originalAnswerSelectedWords = [];
  answerSentenceData.answerOutputArrays.forEach((answerOutputArray) => {
    originalAnswerSelectedWords.push(
      answerOutputArray.map((outputUnit) => outputUnit.selectedWord)
    );
  });
  let arrayOfAnswerSelectedWords = answerSentenceData.answerOutputArrays.map(
    (outputArr) => outputArr.map((unit) => unit.selectedWord)
  );

  console.log("myxz questionOutputUnit", questionOutputUnit);

  console.log(
    "myxa questionOutputUnit.structureChunk.annotations",
    questionOutputUnit.structureChunk.annotations
  );

  console.log(
    "[1;35m " +
      `\nmyxa removeAnnotationsByCounterfax START. "${questionOutputUnit.structureChunk.chunkId}" has the annotations shown above.` +
      "[0m"
  );

  Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
    (annoKey) => {
      //ACX2A: Don't bother running counterfactuals for wordtype/emoji/text annotations, as they'll always be needed.
      //ACX2B: Don't bother running counterfactuals for tenseDes annotations, as they'll take so long, because there are so many alternate values, and we can reasonably presume that the tenseDesc anno will be necessary.
      if (["wordtype", "emoji", "text", "tenseDescription"].includes(annoKey)) {
        return;
      }

      let annoValue = questionOutputUnit.structureChunk.annotations[annoKey];

      let arrayOfCounterfactualResultsForThisAnnotation = [];

      let stChFeatures = uUtils.combineTwoKeyValueObjectsCarefully(
        refObj.structureChunkFeatures[languagesObj.questionLanguage],
        refObj.structureChunkFeatures["ALL"]
      );

      let allPossibleValuesForThisFeature = stChFeatures[
        annoKey
      ].possibleValues.slice(0);

      let counterfactualValuesForThisFeature = Array.from(
        new Set(
          allPossibleValuesForThisFeature.filter((value) => value !== annoValue)
        )
      );

      let pseudoStCh = {};
      pseudoStCh[annoKey] = counterfactualValuesForThisFeature;
      counterfactualValuesForThisFeature = refFxn.removeIncompatibleFeatures(
        languagesObj.questionLanguage,
        questionOutputUnit.structureChunk,
        pseudoStCh
      )[annoKey];

      console.log(
        `myxe removeAnnotationsByCounterfax FOREACH START. Examining ${questionOutputUnit.structureChunk.chunkId}'s annotation ${annoKey} = ${annoValue} so the counterfactual values are [${counterfactualValuesForThisFeature}].`
      );

      counterfactualValuesForThisFeature.forEach(
        (counterfactualValueForThisFeature) => {
          console.log(
            `myxe removeAnnotationsByCounterfax FOREACH-2 START. Will do a run with counterfactual value "${counterfactualValueForThisFeature}".`
          );

          let counterfactualQuestionSentenceFormula = uUtils.copyWithoutReference(
            rawQuestionSentenceFormula
          );

          //Nownow. Do we want to send updated question formula for counterfax run,
          //or originalQuestionSentenceFormula ?

          gpUtils.updateSentenceFormulaWithNewStructureChunksFromOutputUnits(
            counterfactualQuestionSentenceFormula,
            questionOutputArr
          );

          let stChToChange = counterfactualQuestionSentenceFormula.sentenceStructure.find(
            (stCh) => stCh.chunkId === questionOutputUnit.structureChunk.chunkId
          );

          if (!stChToChange) {
            clUtils.throw(
              "sopx removeAnnotationsByCounterfactualAnswerSentences. Couldn't find a stCh to change for counterfactual."
            );
          }

          stChToChange[annoKey] = [counterfactualValueForThisFeature];

          counterfactualQuestionSentenceFormula.sentenceStructure.forEach(
            (stCh) => {
              delete stCh.annotations;
            }
          );

          let counterfactualFeature = {};
          counterfactualFeature[annoKey] = counterfactualValueForThisFeature;

          clUtils.consoleLogObjectAtOneLevel(
            counterfactualQuestionSentenceFormula,
            "counterfactualQuestionSentenceFormula",
            "RACX"
          );

          let newReqBody = {
            arrayOfCounterfactualResultsForThisAnnotation,
            counterfactualQuestionSentenceFormula,
            counterfactualFeature,

            sentenceFormulaId:
              counterfactualQuestionSentenceFormula.sentenceFormulaId,
            sentenceFormulaSymbol:
              counterfactualQuestionSentenceFormula.sentenceFormulaSymbol,

            useDummy: reqBody.useDummy,
            questionLanguage: reqBody.questionLanguage,
            answerLanguage: reqBody.answerLanguage,
            pleaseDontSpecify: reqBody.pleaseDontSpecify,
            devSaysThrowAtMidpoint: reqBody.devSaysThrowAtMidpoint,
            devSaysOmitStChValidation: reqBody.devSaysOmitStChValidation,
          };

          additionalRunsRecord.push([
            questionOutputUnit.structureChunk.chunkId,
            annoKey,
            counterfactualValueForThisFeature,
          ]);

          palette.fetchPalette({ body: newReqBody });
        }
      );

      console.log(
        "[1;33m \n" +
          `myxi removeAnnotationsByCounterfax. \nRun where we changed "${
            questionOutputUnit.structureChunk.chunkId
          }" to counterfactual "${annoKey}=${annoValue}" and arrayOfCounterfactualResultsForThisAnnotation came back with "${
            arrayOfCounterfactualResultsForThisAnnotation.length
          }" results. \nTo be specific, here's how many counterfactual.answerSentenceData.answerOutputArrays there are in each counterfactual result: [${arrayOfCounterfactualResultsForThisAnnotation.map(
            (counterfactual) =>
              counterfactual.answerSentenceData.answerOutputArrays.length
          )}].` +
          "[0m"
      );
      console.log(
        "[1;33m" +
          `${arrayOfCounterfactualResultsForThisAnnotation.map(
            (counterfactual, CFindex) =>
              counterfactual.answerSentenceData.answerOutputArrays.map(
                (outputArr, AOAindex) =>
                  `\nanswerOutputArray ${CFindex}.${AOAindex} = [${outputArr.map(
                    (unit) => unit.selectedWord
                  )}]`
              )
          )}` +
          "[0m"
      );

      let counterfactualQuestionSelectedWordsSets = arrayOfCounterfactualResultsForThisAnnotation.map(
        (counterfactual) =>
          counterfactual.questionSentenceData.questionOutputArr.map(
            (outputUnit) => outputUnit.selectedWord
          )
      );
      let counterfactualAnswerSelectedWordsSets = [];
      let counterfactualAnswerOutputArrays = [];

      arrayOfCounterfactualResultsForThisAnnotation.forEach(
        (counterfactual) => {
          counterfactual.answerSentenceData.answerOutputArrays.forEach(
            (answerOutputArray) => {
              counterfactualAnswerOutputArrays.push(answerOutputArray);

              counterfactualAnswerSelectedWordsSets.push(
                answerOutputArray.map((outputUnit) => outputUnit.selectedWord)
              );
            }
          );
        }
      );

      let counterfactualFeatures = arrayOfCounterfactualResultsForThisAnnotation.map(
        (counterfactual) => {
          {
            if (
              Object.keys(counterfactual.counterfactualFeature).length !== 1
            ) {
              clUtils.throw("iejr removeAnnotationsByCounterfax");
            }

            if (
              Object.keys(counterfactual.counterfactualFeature)[0] !== annoKey
            ) {
              clUtils.throw("dckm removeAnnotationsByCounterfax");
            }

            return counterfactual.counterfactualFeature[annoKey];
          }
        }
      );

      if (shouldConsoleLog) {
        console.log(
          "\n klwe removeAnnotationsByCounterfax. questionOutputUnit.structureChunk.annotations",
          questionOutputUnit.structureChunk.annotations
        );
        console.log(
          "[1;33m" +
            `klwe removeAnnotationsByCounterfax. We made counterfactuals for question stCh "${questionOutputUnit.structureChunk.chunkId}" based on its annotations, shown above.` +
            "[0m"
        );
        console.log(
          "originalQuestionSelectedWords",
          originalQuestionSelectedWords
        );
        console.log("originalAnswerSelectedWords", originalAnswerSelectedWords);
        console.log(
          "counterfactualQuestionSelectedWordsSets",
          counterfactualQuestionSelectedWordsSets
        );
        console.log(
          "counterfactualAnswerSelectedWordsSets",
          counterfactualAnswerSelectedWordsSets
        );
      }

      console.log("originalAnswerSelectedWords", originalAnswerSelectedWords);
      console.log(
        "counterfactualAnswerSelectedWordsSets",
        counterfactualAnswerSelectedWordsSets
      );

      if (
        gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
          originalAnswerSelectedWords,
          counterfactualAnswerSelectedWordsSets
        )
      ) {
        console.log(
          "[1;35m " +
            `myxo removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual answer selected words came back THE SAME AS original answer selected words.\nThis means that this feature has no impact, even if we flip it, so annotation is not needed. \nDeleting annotation "${annoKey}" = "${questionOutputUnit.structureChunk.annotations[annoKey]}" now.` +
            "[0m"
        );

        delete questionOutputUnit.structureChunk.annotations[annoKey];
      } else {
        console.log(
          "[1;35m " +
            `myxo removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual answer selected words came back DIFFERENT FROM original answer selected words.\nThis means I'll keep annotation "${annoKey}" = "${questionOutputUnit.structureChunk.annotations[annoKey]}".` +
            "[0m"
        );

        if (questionOutputUnit.structureChunk.dontSpecifyOnThisChunk) {
          let combinedAnswerSelectedWordsSets = [
            ...originalAnswerSelectedWords,
            ...counterfactualAnswerSelectedWordsSets,
          ];

          let combinedFeatures = [
            ...questionOutputUnit.structureChunk[annoKey],
            ...counterfactualFeatures,
          ];

          console.log({ annoValue });
          console.log(
            "combinedAnswerSelectedWordsSets",
            combinedAnswerSelectedWordsSets
          );
          console.log("combinedFeatures", combinedFeatures);

          answerSelectedWordsSetsHaveChanged.value = true;

          answerSentenceData.answerOutputArrays = [
            ...answerSentenceData.answerOutputArrays,
            ...counterfactualAnswerOutputArrays,
          ];

          delete questionOutputUnit.structureChunk.annotations[annoKey];
          questionOutputUnit.structureChunk[annoKey] = combinedFeatures;

          if (
            !questionOutputUnit.structureChunk.counterfactuallyImportantFeatures
          ) {
            questionOutputUnit.structureChunk.counterfactuallyImportantFeatures = [
              annoKey,
            ];
          } else {
            questionOutputUnit.structureChunk.counterfactuallyImportantFeatures.push(
              annoKey
            );
          }
        }
      }

      uUtils.addToArrayAtKey(
        questionOutputUnitsThatHaveBeenCounterfactualed,
        questionOutputUnit.structureChunk.chunkId,
        annoKey
      );
    }
  );
  // clUtils.throw(465);
};

exports.removeAnnotationsIfHeadChunkHasBeenCounterfaxed = (
  questionOutputUnitsThatHaveBeenCounterfactualed,
  questionOutputUnit
) => {
  return (
    innerRemoveAnnotationsIfHeadChunkHasBeenCounterfaxed(
      questionOutputUnitsThatHaveBeenCounterfactualed,
      questionOutputUnit,
      "agreeWith"
    ) ||
    innerRemoveAnnotationsIfHeadChunkHasBeenCounterfaxed(
      questionOutputUnitsThatHaveBeenCounterfactualed,
      questionOutputUnit,
      "postHocAgreeWithPrimary"
    )
  );

  function innerRemoveAnnotationsIfHeadChunkHasBeenCounterfaxed(
    questionOutputUnitsThatHaveBeenCounterfactualed,
    questionOutputUnit,
    agreeKey
  ) {
    if (
      questionOutputUnitsThatHaveBeenCounterfactualed[
        questionOutputUnit.structureChunk[agreeKey]
      ]
    ) {
      console.log(questionOutputUnit.structureChunk.annotations);
      console.log(
        "[1;33m " +
          `mioc removeAnnotationsByCounterfax. Aha! We are examining "${
            questionOutputUnit.structureChunk.chunkId
          }" which has the annotations shown above. But this chunk agrees with "${
            questionOutputUnit.structureChunk[agreeKey]
          }" which has already been processed by counterfax, re these annotations: [${
            questionOutputUnitsThatHaveBeenCounterfactualed[
              questionOutputUnit.structureChunk[agreeKey]
            ]
          }].` +
          "[0m"
      );

      questionOutputUnitsThatHaveBeenCounterfactualed[
        questionOutputUnit.structureChunk[agreeKey]
      ].forEach((annoKey) => {
        console.log(
          "[1;33m " +
            `mioc So I'm deleting "${annoKey}" from "${questionOutputUnit.structureChunk.chunkId}"'s annotations.` +
            "[0m"
        );

        delete questionOutputUnit.structureChunk.annotations[annoKey];
      });
      return true;
    }
  }
};

exports.removeAnnotationsByAOCs = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr
) => {
  //AOC = Annotation-obviating connected (allDependent) word.

  //The doctor (f) and her book.    --> 'doctor' has an allDependent 'her' which obviates its gender annotation.
  //The sheep (sing.) and its grass. --> 'sheep' has an allDependent 'its' which obviates its number annotation.

  //prosMGN
  //1. For this stCh, get all q output units that are Dependent/PHD of this.
  //2. Filter to just the ones with wordtype pronoun.
  //3. If the selectedWord in any of those units is unique between genders in its lemma object
  //   (eg "his" is unique as no other gender key holds this value, whereas "their" is not unique as two genders keys hold it)
  //   then delete/block the gender annotation.
  let headWordtype = "noun";
  let allDependentWordtype = "pronoun";

  if (
    !uUtils.doesObjectExistAndNonEmpty(
      questionOutputUnit.structureChunk.annotations
    )
  ) {
    return;
  }

  if (
    gpUtils.getWordtypeFromStructureChunk(questionOutputUnit.structureChunk) ===
    headWordtype
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
            (agreeWithKey) => unit.structureChunk[agreeWithKey] === headChunkId
          )
        )
        .filter(
          (unit) =>
            gpUtils.getWordtypeFromStructureChunk(unit.structureChunk) ===
            allDependentWordtype
        );
    }

    if ("console") {
      console.log(
        "ttta questionOutputUnit.structureChunk.annotations",
        questionOutputUnit.structureChunk.annotations
      );
      console.log(
        "tttb primaryDepUnits",
        primaryDepUnits.map((unit) => unit.drillPath)
      );
      console.log(
        "tttb secondaryDepUnits",
        secondaryDepUnits.map((unit) => unit.drillPath)
      );
      console.log(
        "tttb tertiaryDepUnits",
        tertiaryDepUnits.map((unit) => unit.drillPath)
      );
    }

    Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
      (inflectionTyype) => {
        let annoValue =
          questionOutputUnit.structureChunk.annotations[inflectionTyype];

        //Imagine "Ja, moje jabłko."
        //drillPath reveals info about 'Ja'
        //drillPathSecondary reveals info about 'jabłko'
        //
        //So if we're looking at secondaryDeps, then we'll look in drillPathSecondary, and so on.
        lemon(primaryDepUnits, "drillPath");
        lemon(secondaryDepUnits, "drillPathSecondary");
        lemon(tertiaryDepUnits, "drillPathTertiary");

        function lemon(depUnits, drillPathKey) {
          depUnits.forEach((depUnit) => {
            if (
              !questionOutputUnit.structureChunk.annotations[inflectionTyype] || //ie we've now deleted it so abort loop.
              !depUnit[drillPathKey]
            ) {
              return;
            }

            console.log("meef", depUnit);

            /**If any dep unit holds a value at inflectionTyype that is unique in its lObj,
             * then this pronoun obviates the need for that specifier, so delete it from annotations.
             * and set featureHasBeenDeleted to true.
             */
            if (
              otUtils.isThisValueUniqueAtThisLevelInLemmaObject(
                depUnit.selectedLemmaObject,
                inflectionTyype,
                depUnit[drillPathKey]
              )
            ) {
              console.log(
                "[1;30m " +
                  `kzia removeAnnotationsByAOCs "${questionOutputUnit.structureChunk.chunkId}" ABZ Late stage DELETION of annotation "${inflectionTyype}" which is "${questionOutputUnit.structureChunk.annotations[inflectionTyype]}"` +
                  "[0m"
              );

              delete questionOutputUnit.structureChunk.annotations[
                inflectionTyype
              ];
            }
          });
        }
      }
    );
  }
};

exports.addSpecifiersToMGNs = (
  questionSentenceData,
  answerSentenceData,
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

  let questionUnitsToSpecify = questionOutputArr.filter(
    (qUnit) => !qUnit.structureChunk.dontSpecifyOnThisChunk
  );

  let questionMGNunits = questionUnitsToSpecify.filter((unit) => {
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
      selectedGenderForQuestionLanguage = uUtils.selectRandom(
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
      selectedGenderForQuestionLanguage = uUtils.selectRandom(
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

    if (!structureChunk.preventAddingFurtherClarifiers) {
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
