const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const cfUtils = require("./counterfaxUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");

exports.explodeCounterfaxSituations = (sits) => {
  let explodedWithinEachChunk = {};
  let sentence = [];
  let chunkIds = sits.headsFirstSequenceChunkIds;
  let resArray = [];

  chunkIds.forEach((chunkId) => {
    resArray = [];
    let traitKeys = Object.keys(sits[chunkId]);
    explodeWithinOneChunkId(sits[chunkId], traitKeys);
    explodedWithinEachChunk[chunkId] = uUtils.copyWithoutReference(resArray);
  });

  function explodeWithinOneChunkId(sitsOfOneChunkId, traitKeys) {
    if (!traitKeys.length) {
      resArray.push(sentence.slice(0));
      sentence.pop();
      return;
    }
    let currentTraitKey = traitKeys[0];
    let sitArr = sitsOfOneChunkId[currentTraitKey];
    sitArr.forEach((sit) => {
      sentence.push(sit);
      explodeWithinOneChunkId(sitsOfOneChunkId, traitKeys.slice(1));
    });
    sentence.pop();
  }

  let explodedBetweenChunks = [];

  sentence = { chunkIds: chunkIds.slice() };
  sentence.chunkIds.forEach((chunkId) => {
    sentence[chunkId] = [];
  });

  explodeBetweenChunks(explodedWithinEachChunk, chunkIds);

  function explodeBetweenChunks(obj, chunkIds) {
    if (!chunkIds.length) {
      explodedBetweenChunks.push(uUtils.copyWithoutReference(sentence));

      delete sentence[sentence.chunkIds[sentence.chunkIds.length - 1]];
      sentence.chunkIds.pop();
      return;
    }
    let currentChunkId = chunkIds[0];
    let sitArr = obj[currentChunkId];
    sitArr.forEach((sit) => {
      sentence[currentChunkId] = uUtils.copyWithoutReference(sit);
      if (!sentence.chunkIds.includes(currentChunkId)) {
        sentence.chunkIds.push(currentChunkId);
      }

      explodeBetweenChunks(obj, chunkIds.slice(1));
    });

    delete sentence[sentence.chunkIds[sentence.chunkIds.length - 1]];
    sentence.chunkIds.pop();
  }

  return explodedBetweenChunks;
};

exports.listCounterfaxSituations = (questionOutputArr, languagesObj) => {
  let { questionLanguage } = languagesObj;

  let counterfaxSituations = { headsFirstSequenceChunkIds: [] };

  let questionOutputArrOrderedHeadsFirst =
    reorderOutputArrWithHeadsFirst(questionOutputArr);

  function reorderOutputArrWithHeadsFirst(questionOutputArr) {
    let questionOutputArrOrderedHeadsFirst = [];
    let headChunkIds = [];

    let agreeKeys = [
      "agreeWith",
      "postHocAgreeWithPrimary",
      "postHocAgreeWithSecondary",
      "postHocAgreeWithTertiary",
      "connectedTo",
    ];

    questionOutputArr.forEach((questionOutputUnit) => {
      agreeKeys.forEach((agreeKey) => {
        if (questionOutputUnit.structureChunk[agreeKey]) {
          headChunkIds.push(questionOutputUnit.structureChunk[agreeKey]);
        }
      });
    });

    headChunkIds = Array.from(new Set(headChunkIds));

    headChunkIds.forEach((headChunkId) => {
      let headOutputUnit = questionOutputArr.find(
        (questionOutputUnit) =>
          questionOutputUnit.structureChunk.chunkId === headChunkId
      );

      if (!headOutputUnit) {
        consol.throw(
          `kozs Failure to find headChunk for headChunkId ${headChunkId}.`
        );
      }

      questionOutputArrOrderedHeadsFirst.push(headOutputUnit);
    });

    questionOutputArr.forEach((questionOutputUnit) => {
      if (!headChunkIds.includes(questionOutputUnit.structureChunk.chunkId)) {
        questionOutputArrOrderedHeadsFirst.push(questionOutputUnit);
      }
    });

    if (
      !uUtils.areTwoFlatArraysEqual(
        questionOutputArr.map(
          (outputUnit) => outputUnit.structureChunk.chunkId
        ),
        questionOutputArrOrderedHeadsFirst.map(
          (outputUnit) => outputUnit.structureChunk.chunkId
        )
      )
    ) {
      consol.log(
        "iwwo questionOutputArr.map",
        questionOutputArr.map((outputUnit) => outputUnit.structureChunk.chunkId)
      );
      consol.log(
        "iwwo questionOutputArrOrderedHeadsFirst.map",
        questionOutputArrOrderedHeadsFirst.map(
          (outputUnit) => outputUnit.structureChunk.chunkId
        )
      );
      consol.throw(
        `iwwo Failure in reordering the questionOutputArr. See printout comparison above.`
      );
    }
    return questionOutputArrOrderedHeadsFirst;
  }

  questionOutputArrOrderedHeadsFirst.forEach((questionOutputUnit) => {
    //Abortcuts for this fxn: Search ACX.

    if (uUtils.isEmpty(questionOutputUnit.structureChunk.annotations)) {
      return;
    }

    Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
      (annoTraitKey) => {
        //ACX2A: Don't bother running counterfactuals for wordtype/emoji/text annotations, as they'll always be needed.
        //ACX2B: Don't bother running counterfactuals for tenseDesc annotations, as they'll take so long, because there are so many alternate inflectionValues, and we can reasonably presume that the tenseDesc anno will be necessary.

        if (
          ["wordtype", "emoji", "text", "tenseDescription"].includes(
            annoTraitKey
          )
        ) {
          return;
        }

        ////////---------------/////
        ////////---------------//////////

        let originalAnnoTraitValue =
          questionOutputUnit.structureChunk.annotations[annoTraitKey];

        addFaxSituation(
          counterfaxSituations,
          uUtils.copyWithoutReference(questionOutputUnit.structureChunk),
          annoTraitKey,
          originalAnnoTraitValue,
          questionOutputUnit
        );

        let counterfactualTraitValuesForThisTraitKey = Array.from(
          new Set(
            refFxn
              .getStructureChunkTraits(questionLanguage)
              [annoTraitKey].possibleTraitValues.filter(
                (traitValue) => traitValue !== originalAnnoTraitValue
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

        counterfaxedStCh[annoTraitKey] =
          counterfactualTraitValuesForThisTraitKey;

        //If "plural", remove "m", "f". If person, remove "n".
        counterfactualTraitValuesForThisTraitKey =
          refFxn.removeIncompatibleTraits(questionLanguage, counterfaxedStCh)[
            annoTraitKey
          ];

        function addFaxSituation(
          counterfaxSituations,
          stCh,
          traitKey,
          traitValue,
          questionOutputUnit
        ) {
          let newCounterfaxSituation = {
            label: `${stCh.chunkId}=${traitKey}=${traitValue}`,
            stCh: stCh,
            questionOutputUnit,
            traitKey: traitKey,
            traitValue: traitValue,
          };

          if (
            counterfaxSituations.headsFirstSequenceChunkIds.includes(
              stCh.chunkId
            )
          ) {
            if (
              Object.keys(counterfaxSituations[stCh.chunkId]).includes(traitKey)
            ) {
              counterfaxSituations[stCh.chunkId][traitKey].push(
                newCounterfaxSituation
              );
            } else {
              counterfaxSituations[stCh.chunkId][traitKey] = [
                newCounterfaxSituation,
              ];
            }
          } else {
            counterfaxSituations.headsFirstSequenceChunkIds.push(stCh.chunkId);
            counterfaxSituations[stCh.chunkId] = {};
            counterfaxSituations[stCh.chunkId][traitKey] = [
              newCounterfaxSituation,
            ];
          }
        }

        counterfactualTraitValuesForThisTraitKey.forEach(
          (counterfactualTraitValueForThisTraitKey) => {
            let counterfaxedStChOneSituation =
              uUtils.copyWithoutReference(counterfaxedStCh);
            counterfaxedStChOneSituation[annoTraitKey] = [
              counterfactualTraitValueForThisTraitKey,
            ];

            addFaxSituation(
              counterfaxSituations,
              counterfaxedStChOneSituation,
              annoTraitKey,
              counterfactualTraitValueForThisTraitKey,
              questionOutputUnit
            );
          }
        );

        ////////---------------//////////
        ////////---------------/////
      }
    );
  });

  return counterfaxSituations;
};

exports.removeAnnotationsByCounterfactualAnswerSentences = (
  explodedCounterfaxSituations,
  questionOutputArr,
  languagesObj,
  answerSentenceData,
  rawQuestionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  questionOutputUnitsThatHaveBeenCounterfaxed,
  runsRecord,
  originalQuestionSentenceFormula
) => {
  //Abortcuts for this fxn: Search ACX.

  let shouldConsoleLog = false;
  let questionLanguage = languagesObj.questionLanguage;

  explodedCounterfaxSituations.forEach((explodedCounterfaxSituation, index) => {
    if (!index) {
      consol.log(
        "@@ This is the original (Factual) so returning here.",
        explodedCounterfaxSituation.label
      );
      runsRecord.push(`${explodedCounterfaxSituation.label}(original)`);
      return;
    }

    consol.log("@@", explodedCounterfaxSituation.label);

    let { questionOutputUnit, traitKey, traitValue } =
      explodedCounterfaxSituation;

    let counterfaxedStCh = explodedCounterfaxSituation.stCh;

    ////////Now to integrate the below into this new approach of a counterfax situation.

    let originalQuestionOutputArrays = [questionOutputArr]; //@
    let originalAnswerOutputArrays = answerSentenceData.answerOutputArrays; //@

    if (
      cfUtils.removeAnnotationsIfHeadChunkHasBeenCounterfaxed(
        questionOutputUnitsThatHaveBeenCounterfaxed,
        questionOutputUnit
      )
    ) {
      //ACX1: If this QstCh agrees with a stCh that we've already run through counterfaxing,
      //then remove that specific annotation from this QstCh, and return.
      consol.log("ioej");
      return;
    }

    // let annoTraitValue =
    //   questionOutputUnit.structureChunk.annotations[annoTraitKey];

    // let counterfactualTraitValuesForThisTraitKey = Array.from(
    //   new Set(
    //     refFxn
    //       .getStructureChunkTraits(questionLanguage)
    //       [annoTraitKey].possibleTraitValues.filter(
    //         (traitValue) => traitValue !== annoTraitValue
    //       )
    //   )
    // );

    // consol.log(
    //   "veem counterfactualTraitValuesForThisTraitKey",
    //   counterfactualTraitValuesForThisTraitKey
    // );

    // let counterfaxedStCh = uUtils.copyWithoutReference(
    //   questionOutputUnit.structureChunk
    // );

    // counterfaxedStCh[annoTraitKey] = counterfactualTraitValuesForThisTraitKey;

    // //If "plural", remove "m", "f". If person, remove "n".
    // counterfactualTraitValuesForThisTraitKey = refFxn.removeIncompatibleTraits(
    //   questionLanguage,
    //   counterfaxedStCh
    // )[annoTraitKey];

    runsRecord.push(explodedCounterfaxSituation.label);

    let counterfactualQuestionSentenceFormula = uUtils.copyWithoutReference(
      rawQuestionSentenceFormula //@
    );

    let arrayOfCounterfactualResultsForThisAnnotation = []; /////

    consol.log(
      `myxe removeAnnotationsByCounterfax FOREACH START. Examining ${questionOutputUnit.structureChunk.chunkId}'s annotation ${annoTraitKey} = ${annoTraitValue} so the counterfactual traitValues are [${counterfactualTraitValuesForThisTraitKey}].`
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

    arrayOfCounterfactualResultsForThisAnnotation.forEach((counterfactual) => {
      counterfactual.answerSentenceData.answerOutputArrays.forEach(
        (answerOutputArray) => {
          counterfactualAnswerOutputArrays.push(answerOutputArray);
        }
      );
    });

    let counterfactualTraitValues =
      arrayOfCounterfactualResultsForThisAnnotation.map((counterfactual) => {
        {
          if (Object.keys(counterfactual.counterfactualTrait).length !== 1) {
            consol.throw("iejr removeAnnotationsByCounterfax");
          }

          if (
            Object.keys(counterfactual.counterfactualTrait)[0] !== annoTraitKey
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

      //PDS-Diamond: Do if PDS true.
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

        newArr = [
          ...answerSentenceData.answerOutputArrays,
          ...counterfactualAnswerOutputArrays,
        ];

        consol.logSpecial1(
          ">>>>>>>>>>>>>>>>>>>>>>",
          newArr.forEach((x) => {
            consol.logSpecial1("");
            x.forEach((y) => {
              if (["pro-1", "pro-2"].includes(y.structureChunk.chunkId)) {
                consol.logSpecial1(
                  `${y.structureChunk.chunkId} = ${y.structureChunk.gender}`
                );
              }
            });
            consol.logSpecial1("");
          })
        );

        answerSentenceData.answerOutputArrays = [
          ...answerSentenceData.answerOutputArrays,
          ...counterfactualAnswerOutputArrays,
        ];

        consol.log(
          `PDS-Diamond. Agglomerating the answer output arrays and deleting annoTraitValue "${annoTraitValue}", and questionOutputUnit.structureChunk[${annoTraitKey}] is now [${combinedTraitValues}]`
        );

        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
        questionOutputUnit.structureChunk[annoTraitKey] = combinedTraitValues;

        if (
          !questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys
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
      questionOutputUnitsThatHaveBeenCounterfaxed,
      questionOutputUnit.structureChunk.chunkId,
      annoTraitKey
    );
  });
};

exports.removeAnnotationsIfHeadChunkHasBeenCounterfaxed = (
  questionOutputUnitsThatHaveBeenCounterfaxed,
  questionOutputUnit
) => {
  return (
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfaxed,
      questionOutputUnit,
      "agreeWith"
    ) ||
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfaxed,
      questionOutputUnit,
      "postHocAgreeWithPrimary"
    )
  );

  function removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
    questionOutputUnitsThatHaveBeenCounterfaxed,
    questionOutputUnit,
    agreeKey
  ) {
    if (
      questionOutputUnitsThatHaveBeenCounterfaxed[
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
            questionOutputUnitsThatHaveBeenCounterfaxed[
              questionOutputUnit.structureChunk[agreeKey]
            ]
          }].` +
          "[0m"
      );

      questionOutputUnitsThatHaveBeenCounterfaxed[
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
