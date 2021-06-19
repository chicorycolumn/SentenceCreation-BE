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
  runsRecord,
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
      runsRecord,
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

exports.removeAnnotationsByRef = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr
) => {
  let { structureChunk } = questionOutputUnit;
  let headChunk =
    structureChunk.agreeWith &&
    questionOutputArr.find(
      (outputUnit) =>
        outputUnit.structureChunk.chunkId === structureChunk.agreeWith
    ).structureChunk;

  let stChs = headChunk ? [structureChunk, headChunk] : [structureChunk];

  if (!uUtils.doesObjectExistAndNonEmpty(structureChunk.annotations)) {
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
  runsRecord,
  originalQuestionSentenceFormula
) => {
  //This fxn removes annotations and then translates into plainspeak.

  let questionStructureChunk = questionOutputUnit.structureChunk;

  aaUtils.removeAnnotationsByRef(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );

  aaUtils.removeAnnotationsByAOCs(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr
  );

  aaUtils.removeAnnotationsByCounterfactualAnswerSentences(
    questionOutputUnit,
    languagesObj,
    answerSentenceData,
    questionOutputArr,
    questionSentenceFormula,
    reqBody,
    answerSelectedWordsSetsHaveChanged,
    questionOutputUnitsThatHaveBeenCounterfactualed,
    runsRecord,
    originalQuestionSentenceFormula
  );

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

exports.removeAnnotationsByCounterfactualAnswerSentences = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr,
  rawQuestionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  questionOutputUnitsThatHaveBeenCounterfactualed,
  runsRecord,
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
    (annoTraitKey) => {
      //ACX2A: Don't bother running counterfactuals for wordtype/emoji/text annotations, as they'll always be needed.
      //ACX2B: Don't bother running counterfactuals for tenseDesc annotations, as they'll take so long, because there are so many alternate inflectionValues, and we can reasonably presume that the tenseDesc anno will be necessary.

      if (
        ["wordtype", "emoji", "text", "tenseDescription"].includes(annoTraitKey)
      ) {
        return;
      }

      let annoTraitValue =
        questionOutputUnit.structureChunk.annotations[annoTraitKey];

      let arrayOfCounterfactualResultsForThisAnnotation = [];

      let counterfactualTraitValuesForThisTraitKey = Array.from(
        new Set(
          refFxn
            .getStructureChunkTraits(questionLanguage)
            [annoTraitKey].possibleTraitValues.filter(
              (traitValue) => traitValue !== annoTraitValue
            )
        )
      );

      consol.log(
        "veem counterfactualTraitValuesForThisTraitKey",
        counterfactualTraitValuesForThisTraitKey
      );

      let counterfaxedStCh = uUtils.copyWithoutReference(
        questionOutputUnit.structureChunk
      );

      counterfaxedStCh[annoTraitKey] = counterfactualTraitValuesForThisTraitKey;

      //If "plural", remove "m", "f". If person, remove "n".
      counterfactualTraitValuesForThisTraitKey =
        refFxn.removeIncompatibleTraits(questionLanguage, counterfaxedStCh)[
          annoTraitKey
        ];

      consol.log(
        `myxe removeAnnotationsByCounterfax FOREACH START. Examining ${questionOutputUnit.structureChunk.chunkId}'s annotation ${annoTraitKey} = ${annoTraitValue} so the counterfactual traitValues are [${counterfactualTraitValuesForThisTraitKey}].`
      );

      runsRecord.push(
        `${questionOutputUnit.structureChunk.chunkId} had ${annoTraitKey} "${annoTraitValue}".`
      );

      counterfactualTraitValuesForThisTraitKey.forEach(
        (counterfactualTraitValueForThisTraitKey) => {
          consol.log(
            `myxe removeAnnotationsByCounterfax FOREACH-2 START. Will do a run with counterfactual traitValue "${counterfactualTraitValueForThisTraitKey}".`
          );

          counterfaxedStCh[annoTraitKey] = [
            counterfactualTraitValueForThisTraitKey,
          ];

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

          let counterfactualTrait = {};
          counterfactualTrait[annoTraitKey] =
            counterfactualTraitValueForThisTraitKey;

          consol.consoleLogObjectAtOneLevel(
            counterfactualQuestionSentenceFormula,
            "counterfactualQuestionSentenceFormula",
            "RACX"
          );

          let newReqBody = {
            arrayOfCounterfactualResultsForThisAnnotation,
            counterfactualQuestionSentenceFormula,
            counterfactualTrait,

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

          runsRecord.push(
            `${questionOutputUnit.structureChunk.chunkId} new ${annoTraitKey} "${counterfactualTraitValueForThisTraitKey}".`
          );

          consol.log(
            "\n--------------------------------COUNTERFAX RUN BEGINNING\n"
          );
          palette.fetchPalette({ body: newReqBody });
        }
      );

      if ("console") {
        consol.log(
          "[1;33m \n" +
            `myxi removeAnnotationsByCounterfax. \nRun where we changed "${
              questionOutputUnit.structureChunk.chunkId
            }" from counterfactual "${annoTraitKey}=${annoTraitValue}" and arrayOfCounterfactualResultsForThisAnnotation came back with "${
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

      let counterfactualTraitValues =
        arrayOfCounterfactualResultsForThisAnnotation.map((counterfactual) => {
          {
            if (Object.keys(counterfactual.counterfactualTrait).length !== 1) {
              consol.throw("iejr removeAnnotationsByCounterfax");
            }

            if (
              Object.keys(counterfactual.counterfactualTrait)[0] !==
              annoTraitKey
            ) {
              consol.throw("dckm removeAnnotationsByCounterfax");
            }

            return counterfactual.counterfactualTrait[annoTraitKey];
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
        consol.log({ "additional runs": runsRecord });
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
            `myxo-clauseA [tl;dr answersame so deleting anno] removeAnnotationsByCounterfax END. 
            I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" 
            and the counterfactual ANSWER selected words came back SAME as original answer selected words.\n
            This means that this trait has no impact, even if we flip it, so annotation is not needed. \n
            Deleting annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}".` +
            "[0m",
          {
            originalAnswerPseudoSentences,
            counterfactualAnswerPseudoSentences,
          }
        );

        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
      } else if (
        !gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
          originalQuestionPseudoSentences,
          counterfactualQuestionPseudoSentences
        )
      ) {
        consol.log(
          "[1;35m " +
            `myxo-clauseB [tl;dr questiondifferent so deleting anno] removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual QUESTION selected words came back DIFFERENT original question selected words.\nThis means that this trait has no impact, even if we flip it, so annotation is not needed. \nDeleting annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}" now.` +
            "[0m",
          {
            originalQuestionPseudoSentences,
            counterfactualQuestionPseudoSentences,
          }
        );

        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
      } else {
        consol.log(
          "[1;35m " +
            `myxo-clauseC [tl;dr !answersame && !questiondifferent so keeping anno] removeAnnotationsByCounterfax END. I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual answer selected words came back DIFFERENT FROM original answer selected words.\nThis means I'll keep annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}".` +
            "[0m",
          {
            originalAnswerPseudoSentences,
            counterfactualAnswerPseudoSentences,
            originalQuestionPseudoSentences,
            counterfactualQuestionPseudoSentences,
          }
        );

        //PDSX4-orange-true
        //
        //Eg    Q: "With the sheep.",    A: ["Z owcą."]
        //This fxn determined that the Q would be same sentence whether singular or plural,
        //so let's agglomerate the answer array to be ["Z owcą.", "Z owcami."]
        //And the same for "I saw." --> ["Zobaczyłem.", "Zobaczyłam."]
        //
        if (questionOutputUnit.structureChunk.dontSpecifyOnThisChunk) {
          let combinedTraitValues = [
            ...questionOutputUnit.structureChunk[annoTraitKey],
            ...counterfactualTraitValues,
          ];

          answerSelectedWordsSetsHaveChanged.bool = true;

          answerSentenceData.answerOutputArrays = [
            ...answerSentenceData.answerOutputArrays,
            ...counterfactualAnswerOutputArrays,
          ];

          consol.log(
            `PDSX-orange. Agglomerating the answer output arrays and deleting annoTraitValue "${annoTraitValue}", and questionOutputUnit.structureChunk[${annoTraitKey}] is now [${combinedTraitValues}]`
          );

          delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
          questionOutputUnit.structureChunk[annoTraitKey] = combinedTraitValues;

          if (
            !questionOutputUnit.structureChunk
              .counterfactuallyImportantTraitKeys
          ) {
            questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys =
              [annoTraitKey];
          } else {
            questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys.push(
              annoTraitKey
            );
          }
        }
      }

      uUtils.addToArrayAtKey(
        questionOutputUnitsThatHaveBeenCounterfactualed,
        questionOutputUnit.structureChunk.chunkId,
        annoTraitKey
      );
    }
  );
};

exports.removeAnnotationsIfHeadChunkHasBeenCounterfaxed = (
  questionOutputUnitsThatHaveBeenCounterfactualed,
  questionOutputUnit
) => {
  return (
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfactualed,
      questionOutputUnit,
      "agreeWith"
    ) ||
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfactualed,
      questionOutputUnit,
      "postHocAgreeWithPrimary"
    )
  );

  function removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
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
      ].forEach((annoTraitKey) => {
        consol.log(
          "[1;33m " +
            `mioc So I'm deleting "${annoTraitKey}" from "${questionOutputUnit.structureChunk.chunkId}"'s annotations.` +
            "[0m"
        );

        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
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
  //   (eg "his" is unique as no other gender traitKey holds this inflectionValue, whereas "their" is not unique as two genders traitKeys hold it)
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
    gpUtils.getWordtypeStCh(questionOutputUnit.structureChunk) === headWordtype
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
             * then this pronoun obviates the need for that specifier, so delete it from annotations.
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
