const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
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
  consol.log(questionOutputArr.map((unit) => unit.structureChunk));

  if (!answerSentenceData) {
    consol.log(
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
      return;
    }

    let formattedAnnoObj = aaUtils.whittleAnnotationsAndConvertToPlainspeak(
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
      consol.log(
        "[1;31m " +
          `dhce NB: firstStageEvaluateAnnotations. There were annotations on stCh, but none after formatting. "${structureChunk.chunkId}".` +
          "[0m"
      );
    }

    consol.log(
      `dhci firstStageEvaluateAnnotations. Adding firstStageAnnotationsObj to "${structureChunk.chunkId}".`
    );

    outputUnit.firstStageAnnotationsObj = formattedAnnoObj;
  });
};

exports.whittleAnnotationsAndConvertToPlainspeak = (
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
  //This fxn removes annotations and then translates into plainspeak.

  let questionStructureChunk = questionOutputUnit.structureChunk;

  consol.log("bbbc");
  aaUtils.removeAnnotationsByAOCs(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );
  consol.log("bbbd");

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
  consol.log("bbbe");

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
  let questionLanguage = languagesObj.questionLanguage;

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

  let originalQuestionOutputArrays = [questionOutputArr];
  let originalAnswerOutputArrays = [];
  answerSentenceData.answerOutputArrays.forEach((answerOutputArray) => {
    originalAnswerOutputArrays.push(answerOutputArray);
  });
  let arrayOfAnswerSelectedWords = answerSentenceData.answerOutputArrays.map(
    (outputArr) => outputArr.map((unit) => unit.selectedWord)
  );

  consol.log("myxz questionOutputUnit", questionOutputUnit);

  consol.log(
    "myxa questionOutputUnit.structureChunk.annotations",
    questionOutputUnit.structureChunk.annotations
  );

  consol.log(
    "[1;35m " +
      `\nmyxa removeAnnotationsByCounterfax START. "${questionOutputUnit.structureChunk.chunkId}" has the annotations shown above.` +
      "[0m"
  );

  let counterfactualQuestionSentenceFormula = uUtils.copyWithoutReference(
    rawQuestionSentenceFormula
  );

  Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
    (annoKey) => {
      //ACX2A: Don't bother running counterfactuals for wordtype/emoji/text annotations, as they'll always be needed.
      //ACX2B: Don't bother running counterfactuals for tenseDesc annotations, as they'll take so long, because there are so many alternate values, and we can reasonably presume that the tenseDesc anno will be necessary.
      if (["wordtype", "emoji", "text", "tenseDescription"].includes(annoKey)) {
        return;
      }

      let annoValue = questionOutputUnit.structureChunk.annotations[annoKey];

      let arrayOfCounterfactualResultsForThisAnnotation = [];

      let stChFeatures = refFxn.getStructureChunkFeatures(questionLanguage);

      let allPossibleValuesForThisFeature =
        stChFeatures[annoKey].possibleValues.slice(0);

      let counterfactualValuesForThisFeature = Array.from(
        new Set(
          allPossibleValuesForThisFeature.filter((value) => value !== annoValue)
        )
      );

      consol.log(
        "veem counterfactualValuesForThisFeature",
        counterfactualValuesForThisFeature
      );
      //ACX3: eg If plural then remove m, f. If person, remove n.
      let counterfaxedStCh = uUtils.copyWithoutReference(
        questionOutputUnit.structureChunk
      );

      counterfaxedStCh[annoKey] = counterfactualValuesForThisFeature;

      counterfactualValuesForThisFeature = refFxn.removeIncompatibleFeatures(
        questionLanguage,
        counterfaxedStCh
      )[annoKey];

      consol.log(
        `myxe removeAnnotationsByCounterfax FOREACH START. Examining ${questionOutputUnit.structureChunk.chunkId}'s annotation ${annoKey} = ${annoValue} so the counterfactual values are [${counterfactualValuesForThisFeature}].`
      );

      counterfactualValuesForThisFeature.forEach(
        (counterfactualValueForThisFeature) => {
          consol.log(
            `myxe removeAnnotationsByCounterfax FOREACH-2 START. Will do a run with counterfactual value "${counterfactualValueForThisFeature}".`
          );

          counterfaxedStCh[annoKey] = [counterfactualValueForThisFeature];

          //(IOTA). Do we want to send updated question formula for counterfax run,
          //or originalQuestionSentenceFormula ?

          gpUtils.updateSentenceStructureWithNewStructureChunksFromOutputUnits(
            counterfactualQuestionSentenceFormula.sentenceStructure,
            questionOutputArr
          );

          let indexOfStChToChange =
            counterfactualQuestionSentenceFormula.sentenceStructure.findIndex(
              (stCh) => stCh.chunkId === counterfaxedStCh.chunkId
            );

          if (indexOfStChToChange === -1) {
            consol.throw("mizd");
          }

          counterfactualQuestionSentenceFormula.sentenceStructure[
            indexOfStChToChange
          ] = counterfaxedStCh;

          counterfactualQuestionSentenceFormula.sentenceStructure.forEach(
            (stCh) => {
              delete stCh.annotations;
            }
          );

          let counterfactualFeature = {};
          counterfactualFeature[annoKey] = counterfactualValueForThisFeature;

          consol.consoleLogObjectAtOneLevel(
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

      if ("console") {
        consol.log(
          "[1;33m \n" +
            `myxi removeAnnotationsByCounterfax. \nRun where we changed "${
              questionOutputUnit.structureChunk.chunkId
            }" from counterfactual "${annoKey}=${annoValue}" and arrayOfCounterfactualResultsForThisAnnotation came back with "${
              arrayOfCounterfactualResultsForThisAnnotation.length
            }" results. \nTo be specific, here's how many counterfactual.answerSentenceData.answerOutputArrays there are in each counterfactual result: [${arrayOfCounterfactualResultsForThisAnnotation.map(
              (counterfactual) =>
                counterfactual.answerSentenceData.answerOutputArrays.length
            )}].` +
            "[0m"
        );

        let logToConsole = arrayOfCounterfactualResultsForThisAnnotation.map(
          (counterfactual, CFindex) =>
            counterfactual.answerSentenceData.answerOutputArrays.map(
              (outputArr, AOAindex) =>
                `\nanswerOutputArray ${CFindex}.${AOAindex} = [${outputArr.map(
                  (unit) => unit.selectedWord
                )}]`
            )
        );
        consol.log("[1;33m" + `${logToConsole}` + "[0m");
      }

      let counterfactualQuestionOutputArrays =
        arrayOfCounterfactualResultsForThisAnnotation.map(
          (counterfactual) =>
            counterfactual.questionSentenceData.questionOutputArr
        );
      let counterfactualAnswerOutputArrays = [];

      arrayOfCounterfactualResultsForThisAnnotation.forEach(
        (counterfactual) => {
          counterfactual.answerSentenceData.answerOutputArrays.forEach(
            (answerOutputArray) => {
              counterfactualAnswerOutputArrays.push(answerOutputArray);
            }
          );
        }
      );

      let counterfactualFeatures =
        arrayOfCounterfactualResultsForThisAnnotation.map((counterfactual) => {
          {
            if (
              Object.keys(counterfactual.counterfactualFeature).length !== 1
            ) {
              consol.throw("iejr removeAnnotationsByCounterfax");
            }

            if (
              Object.keys(counterfactual.counterfactualFeature)[0] !== annoKey
            ) {
              consol.throw("dckm removeAnnotationsByCounterfax");
            }

            return counterfactual.counterfactualFeature[annoKey];
          }
        });

      if (shouldConsoleLog) {
        consol.log(
          "\n klwe removeAnnotationsByCounterfax. questionOutputUnit.structureChunk.annotations",
          questionOutputUnit.structureChunk.annotations
        );
        consol.log(
          "[1;33m" +
            `klwe removeAnnotationsByCounterfax. We made counterfactuals for question stCh "${questionOutputUnit.structureChunk.chunkId}" based on its annotations, shown above.` +
            "[0m"
        );
        consol.log({ additionalRunsRecord });
        consol.log(
          "originalQuestionOutputArrays...selectedWords",
          originalQuestionOutputArrays.map((outputArr) =>
            outputArr.map((unit) => unit.selectedWord)
          )
        );
        consol.log(
          "originalAnswerOutputArrays...selectedWords",
          originalAnswerOutputArrays.map((outputArr) =>
            outputArr.map((unit) => unit.selectedWord)
          )
        );
        consol.log(
          "counterfactualQuestionOutputArrays...selectedWords",
          counterfactualQuestionOutputArrays.map((outputArr) =>
            outputArr.map((unit) => unit.selectedWord)
          )
        );
        consol.log(
          "counterfactualAnswerOutputArrays...selectedWords",
          counterfactualAnswerOutputArrays.map((outputArr) =>
            outputArr.map((unit) => unit.selectedWord)
          )
        );
      }

      //
      /** Okay, we're about to compare pseudosentences (ie the arrays of selectedWords).
       *  If answer pseudosentences are same, or question pseudosentences are different, we delete the anno.
       *
       *  However, we're just working with PSEUDOsentences. Why is this a potential issue?
       *
       *  Because the sentences are not finally formatting, so comparison may not be accurate in specific cases. Eg:
       *
       *  Q original: "On czyta."     Q counterfax: "Ona czyta."
       *
       *  This logic would say, ah, Qs are DIFFERENT, so delete the anno. But what it doesn't know, is that
       *  when these pseudosentences are actually formatted, they will be the SAME, because pro-1 is not included.
       *
       *  So...
       *
       *  One option is to actually convert all the pseudosentences to real sentences prior to the comparing below,
       *  in the normal way via scUtils.b'uildSentenceString.
       *
       *  However... this will involve extra processing time, so for now, let's just check the pseudosentences against
       *  primaryOrders, so that we at least catch the "On czyta." --> "Czyta." issue.
       */

      function makePseudoSentences(outputArrays, primaryOrders) {
        //This doesn't do the full processing, ie 'a' --> 'an'
        //but it does trim the list of selected words according to sentenceFormula.primaryOrders,
        //ie "On czyta." and "Ona czyta." both become "Czyta.".

        let orderAdjustedOutputArrs = [];

        if (!primaryOrders || !primaryOrders.length) {
          return outputArrays.map((outputArray) =>
            outputArray.map((unit) => unit.selectedWord)
          );
        }

        primaryOrders.forEach((primaryOrder) => {
          outputArrays.forEach((outputArray) => {
            let orderAdjustedOutputArr = [];
            primaryOrder.forEach((chunkId) => {
              let correspondingOutputUnit = outputArray.find(
                (unit) => unit.structureChunk.chunkId === chunkId
              );

              if (!correspondingOutputUnit) {
                consol.throw("ocii");
              }

              orderAdjustedOutputArr.push(correspondingOutputUnit);
            });

            orderAdjustedOutputArrs.push(orderAdjustedOutputArr);
          });
        });

        return orderAdjustedOutputArrs.map((outputArr) =>
          outputArr.map((unit) => unit.selectedWord)
        );
      }

      let originalAnswerPseudoSentences = makePseudoSentences(
        originalAnswerOutputArrays,
        answerSentenceData.sentenceFormula.primaryOrders
      );
      let counterfactualAnswerPseudoSentences = makePseudoSentences(
        counterfactualAnswerOutputArrays,
        answerSentenceData.sentenceFormula.primaryOrders
      );
      let originalQuestionPseudoSentences = makePseudoSentences(
        originalQuestionOutputArrays,
        rawQuestionSentenceFormula.primaryOrders
      );
      let counterfactualQuestionPseudoSentences = makePseudoSentences(
        counterfactualQuestionOutputArrays,
        rawQuestionSentenceFormula.primaryOrders
      );
      // consol.log("vnai", {
      //   originalAnswerPseudoSentences,
      //   counterfactualAnswerPseudoSentences,
      //   originalQuestionPseudoSentences,
      //   counterfactualQuestionPseudoSentences,
      // });

      if (
        gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
          originalAnswerPseudoSentences,
          counterfactualAnswerPseudoSentences
        )
      ) {
        consol.log(
          "[1;35m " +
            `myxo-clauseA [tl;dr answersame so deleting anno] removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual ANSWER selected words came back SAME as original answer selected words.\nThis means that this feature has no impact, even if we flip it, so annotation is not needed. \nDeleting annotation "${annoKey}" = "${questionOutputUnit.structureChunk.annotations[annoKey]}" now.` +
            "[0m",
          {
            originalAnswerPseudoSentences,
            counterfactualAnswerPseudoSentences,
          }
        );

        delete questionOutputUnit.structureChunk.annotations[annoKey];
      } else if (
        !gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
          originalQuestionPseudoSentences,
          counterfactualQuestionPseudoSentences
        )
      ) {
        consol.log(
          "[1;35m " +
            `myxo-clauseB [tl;dr questiondifferent so deleting anno] removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual QUESTION selected words came back DIFFERENT original question selected words.\nThis means that this feature has no impact, even if we flip it, so annotation is not needed. \nDeleting annotation "${annoKey}" = "${questionOutputUnit.structureChunk.annotations[annoKey]}" now.` +
            "[0m",
          {
            originalQuestionPseudoSentences,
            counterfactualQuestionPseudoSentences,
          }
        );

        delete questionOutputUnit.structureChunk.annotations[annoKey];
      } else {
        consol.log(
          "[1;35m " +
            `myxo-clauseC [tl;dr !answersame && !questiondifferent so keeping anno] removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual answer selected words came back DIFFERENT FROM original answer selected words.\nThis means I'll keep annotation "${annoKey}" = "${questionOutputUnit.structureChunk.annotations[annoKey]}".` +
            "[0m",
          {
            originalAnswerPseudoSentences,
            counterfactualAnswerPseudoSentences,
            originalQuestionPseudoSentences,
            counterfactualQuestionPseudoSentences,
          }
        );

        //PDSX4-orange-true
        if (questionOutputUnit.structureChunk.dontSpecifyOnThisChunk) {
          let combinedFeatures = [
            ...questionOutputUnit.structureChunk[annoKey],
            ...counterfactualFeatures,
          ];

          answerSelectedWordsSetsHaveChanged.value = true;

          answerSentenceData.answerOutputArrays = [
            ...answerSentenceData.answerOutputArrays,
            ...counterfactualAnswerOutputArrays,
          ];

          consol.log(
            `PDSX-orange. Agglomerating the answer output arrays and deleting annoValue "${annoValue}", and questionOutputUnit.structureChunk[${annoKey}] is now [${combinedFeatures}]`
          );

          delete questionOutputUnit.structureChunk.annotations[annoKey];
          questionOutputUnit.structureChunk[annoKey] = combinedFeatures;

          if (
            !questionOutputUnit.structureChunk.counterfactuallyImportantFeatures
          ) {
            questionOutputUnit.structureChunk.counterfactuallyImportantFeatures =
              [annoKey];
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
      consol.log(questionOutputUnit.structureChunk.annotations);
      consol.log(
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
        consol.log(
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
    gpUtils.getWorrdtypeStCh(questionOutputUnit.structureChunk) === headWordtype
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
            gpUtils.getWorrdtypeStCh(unit.structureChunk) ===
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
      (inflectionCategoryy) => {
        let annoValue =
          questionOutputUnit.structureChunk.annotations[inflectionCategoryy];

        //Imagine "Ja, moje jabłko."
        //drillPath reveals info about 'Ja'
        //drillPathSecondary reveals info about 'jabłko'
        //
        //So if we're looking at secondaryDeps, then we'll look in drillPathSecondary, and so on.
        deleteByAOC(primaryDepUnits, "drillPath");
        deleteByAOC(secondaryDepUnits, "drillPathSecondary");
        deleteByAOC(tertiaryDepUnits, "drillPathTertiary");

        function deleteByAOC(depUnits, drillPathKey) {
          depUnits.forEach((depUnit) => {
            if (
              !questionOutputUnit.structureChunk.annotations[
                inflectionCategoryy
              ] || //ie we've now deleted it so abort loop.
              !depUnit[drillPathKey]
            ) {
              return;
            }

            consol.log("meef", depUnit);

            /**If any dep unit holds a value at inflectionCategoryy that is unique in its lObj,
             * then this pronoun obviates the need for that specifier, so delete it from annotations.
             * and set featureHasBeenDeleted to true.
             */
            if (
              otUtils.isThisValueUniqueAtThisLevelInLemmaObject(
                depUnit.selectedLemmaObject,
                inflectionCategoryy,
                depUnit[drillPathKey]
              )
            ) {
              consol.log(
                "[1;30m " +
                  `kzia removeAnnotationsByAOCs "${questionOutputUnit.structureChunk.chunkId}" ABZ Late stage DELETION of annotation "${inflectionCategoryy}" which is "${questionOutputUnit.structureChunk.annotations[inflectionCategoryy]}"` +
                  "[0m"
              );

              delete questionOutputUnit.structureChunk.annotations[
                inflectionCategoryy
              ];
            }
          });
        }
      }
    );
  }
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
          "cjow The depCh and its headCh have different values as gender anno?"
        );
      }

      if (headLObj.gender && !gpUtils.traitValyyeIsMeta(headLObj.gender)) {
        consol.log({
          questionLanguage: languagesObj.questionLanguage,
          headLObjgender: headLObj.gender,
        });

        let virilityPaddedLObjGenderArr = [
          headLObj.gender,
          ...refObj.pluralVirilityAndSingularConversionRef[
            languagesObj.questionLanguage
          ]["plural"][headLObj.gender],
        ];

        if (
          !virilityPaddedLObjGenderArr.includes(
            structureChunk.annotations.gender
          )
        ) {
          consol.throw(
            `evjo The depCh gender anno "${structureChunk.annotations.gender}" should have matched its headCh's lObj gender "${headLObj.gender}"?`
          );
        }
        //Part 1-B: But if the headCh's lObj has a gender, then don't transfer the gender anno.
      } else {
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
    refObj.metaFeatures[questionLanguage]["gender"]
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
        !refObj.metaFeatures[questionLanguage].gender[metaGender].includes(
          selectedGenderForQuestionLanguage
        )
      ) {
        consol.log(
          "questionMGNunit.structureChunk.gender",
          questionMGNunit.structureChunk.gender
        );
        consol.log(
          "refObj.metaFeatures[questionLanguage].gender[metaGender]",
          refObj.metaFeatures[questionLanguage].gender[metaGender]
        );
        consol.throw(
          "knmo addSpecifiersToMGNs #ERR I expected the question chunk's gender to be present in the translated genders array for the question lObj's metagender selector."
        );
      }
    } else {
      selectedGenderForQuestionLanguage = uUtils.selectRandom(
        refObj.metaFeatures[questionLanguage].gender[metaGender]
      );
    }

    selectedGenderForAnswerLanguageArr = answerLangUtils.formatTraitValyye(
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
  actionKey,
  actionValueArr
) => {
  consol.throw("fjln specifyQuestionChunkAndChangeAnswerChunk Cease");

  if (actionValueArr.length !== 1) {
    consol.log("ujrw specifyQuestionChunkAndChangeAnswerChunk", {
      actionValueArr,
    });
    consol.throw(
      "ujrw specifyQuestionChunkAndChangeAnswerChunk actionValueArr had length of not 1"
    );
  }

  let { answerHeadChunk, answerChunk, questionHeadChunk, questionChunk } =
    chunksObj;

  if (answerHeadChunk) {
    consol.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point A");
    answerHeadChunk[actionKey] = actionValueArr;
  } else {
    consol.log("evuj specifyQuestionChunkAndChangeAnswerChunk Point B");
    answerChunk[actionKey] = actionValueArr;
  }

  //...and note Specifier in Q headCh if exists, else Q depCh.

  if (questionHeadChunk) {
    consol.log("tbji specifyQuestionChunkAndChangeAnswerChunk Point C");
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
    consol.log(
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
    consol.log("nrtn addAnnotation", { value });
    consol.throw("nrtn addAnnotation expected STRING for value");
  }

  consol.log(
    "[1;35m " + "aggw addAnnotation Added annotation for " + chunk.chunkId + "[0m"
  );
  consol.log("aggw addAnnotation", { key, value });

  chunk.annotations[key] = value;
};

exports.trimAnnotations = (annotationObj) => {
  Object.keys(annotationObj).forEach((annoKey) => {
    let annoValue = annotationObj[annoKey];

    if (annoKey === "gender" && ["males", "females"].includes(annoValue)) {
      delete annotationObj.number;
    }

    if (!annoValue) {
      consol.throw("vmkp");
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
    let { selectedLemmaObject, drillPath, structureChunk, selectedWord } =
      outputUnit;

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "fixed") {
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
        let annotationValue = gpUtils.getWorrdtypeLObj(selectedLemmaObject);

        consol.log(
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
      refObj.lemmaObjectTraitKeyys[answerLanguage]
        .allowableTransfersFromQuestionStructure[
        gpUtils.getWorrdtypeStCh(structureChunk)
      ];

    if (!allowableClarifiers) {
      consol.log(
        "[1;31m " + `cicw allowableClarifiers are`,
        allowableClarifiers,
        `because structureChunk=${
          structureChunk.chunkId
        } answerLanguage=${answerLanguage}, stChWordtype=${gpUtils.getWorrdtypeStCh(
          structureChunk
        )}.` + "[0m"
      );
      allowableClarifiers = [];
    }

    let allowableExtraClarifiersInSingleWordSentences =
      refObj.lemmaObjectTraitKeyys[answerLanguage]
        .allowableExtraClarifiersInSingleWordSentences[
        gpUtils.getWorrdtypeStCh(structureChunk)
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

            let labelsWhereTheyDiffer = filterDownClarifiers(
              synhomDataUnit,
              allowableClarifiers
            );

            function filterDownClarifiers(synhomDataUnit, allowableClarifiers) {
              consol.log("[1;35m " + `pjgg filterDownClarifiers---------------` + "[0m");

              consol.log(
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
                    consol.log(
                      "[1;32m " +
                        `jpnj filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage PASSING of "${label}" in allowableClarifiers` +
                        "[0m"
                    );
                    return true;
                  } else {
                    consol.log(
                      "[1;30m " +
                        `lmza filterDownClarifiers "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${label}" in allowableClarifiers` +
                        "[0m"
                    );
                    return false;
                  }
                }
              );

              consol.log(
                "ahby filterDownClarifiers So now we have these labels:",
                filteredLabels
              );
              consol.log(
                "ahby filterDownClarifiers, structureChunk",
                structureChunk
              );
              consol.log(
                "ahby filterDownClarifiers, synhomDataUnit.inflectionLabelChain",
                synhomDataUnit.inflectionLabelChain
              );

              let currentValueArr = synhomDataUnit.inflectionLabelChain.map(
                (inflectionLabel) => {
                  consol.log("vpzx filterDownClarifiers", { inflectionLabel });

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
                    consol.log(
                      "[1;31m " +
                        `#WARN kxqz filterDownClarifiers. Adding null to currentValueArr for inflectionLabel "${inflectionLabel}".` +
                        "[0m"
                    );

                    return null;
                  }

                  if (structureChunk[inflectionLabel].length > 1) {
                    consol.log(
                      "[1;31m " +
                        `#WARN wqzm filterDownClarifiers. structureChunk[inflectionLabel] "${structureChunk[inflectionLabel]}"` +
                        "[0m"
                    );
                    consol.throw(
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
                          consol.log(
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
                  consol.log(
                    "[1;32m " +
                      `xunf findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage PASSING of "${label}" in findSinglePointMutationArray` +
                      "[0m"
                  );
                  return true;
                } else {
                  consol.log(
                    "[1;30m " +
                      `dhjc findSinglePointMutationArray "${structureChunk.chunkId}" ABZ Early stage BLOCKING of "${label}" in findSinglePointMutationArray` +
                      "[0m"
                  );
                  return false;
                }
              });

              consol.log(
                "cpkw filterDownClarifiers And now we have these labels:",
                filteredLabels
              );

              consol.log("[1;35m " + `/filterDownClarifiers` + "[0m");

              return filteredLabels;
            }

            labelsWhereTheyDiffer.forEach((label) => {
              let clarifierValue = structureChunk[label];

              //Abort if a metaGender label is accidentally being made subject of a Clarifier.
              if (label === "gender") {
                if (
                  structureChunk[label].some((gender) =>
                    gpUtils.traitValyyeIsMeta(gender)
                  )
                ) {
                  return;
                }
              }

              if (Array.isArray(clarifierValue)) {
                if (clarifierValue.length === 1) {
                  clarifierValue = clarifierValue[0];
                } else {
                  consol.log(
                    "rqfh addClarifiers clarifierValue",
                    clarifierValue
                  );
                  consol.throw(
                    "exej aa:addClarifiers --> clarifierValue had length of not 1."
                  );
                }
              }

              consol.log(
                "sosu addClarifiers------------------------------------------ADDED CLARIFIER in Step 3: ",
                clarifierValue
              );
              structureChunk.annotations[label] = clarifierValue;
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
