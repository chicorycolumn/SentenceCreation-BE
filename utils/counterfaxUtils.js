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

  explodedBetweenChunks.labels = [];

  explodedBetweenChunks.forEach((wholeSit) => {
    let joinedLabel = [];

    wholeSit.chunkIds.forEach((chunkId) => {
      wholeSit[chunkId].forEach((individualSit) => {
        joinedLabel.push(individualSit.label);
      });
    });

    joinedLabel = joinedLabel.join(" ");
    explodedBetweenChunks.labels.push(joinedLabel);
    wholeSit.label = joinedLabel;
  });

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
  runsRecord,
  originalQuestionSentenceFormula
) => {
  //Abortcuts for this fxn: Search ACX.

  let shouldConsoleLog = false;
  let questionLanguage = languagesObj.questionLanguage;

  let originalQuestionOutputArrays = [questionOutputArr]; //Does this go here?
  let originalAnswerOutputArrays = answerSentenceData.answerOutputArrays; //Does this go here?

  explodedCounterfaxSituations.forEach((sit, index) => {
    let sitEXAMPLE = {
      label: "pro-1=gender=virile pro-2=gender=nonvirile",
      chunkIds: ["pro-1", "pro-2"],
      "pro-1": [
        {
          label: "pro-1=gender=virile",
          stCh: {
            chunkId: "pro-1",
            specificLemmas: ["PERSONAL"],
            gcase: ["nom"],
            number: ["plural"],
            person: ["1per"],
            dontSpecifyOnThisChunk: true,
            form: ["pronoun"],
            gender: ["virile"],
            andTags: [],
            annotations: {
              gender: "virile",
            },
          },
          questionOutputUnit: {
            selectedLemmaObject: {},
            selectedWord: "we",
            drillPath: [
              ["form", "pronoun"],
              ["person", "1per"],
              ["number", "plural"],
              ["gender", "virile"],
              ["gcase", "nom"],
            ],
            structureChunk: {
              chunkId: "pro-1",
              specificLemmas: ["PERSONAL"],
              gcase: ["nom"],
              number: ["plural"],
              person: ["1per"],
              dontSpecifyOnThisChunk: true,
              form: ["pronoun"],
              gender: ["virile"],
              andTags: [],
              annotations: {
                gender: "virile",
              },
            },
          },
          traitKey: "gender",
          traitValue: "virile",
        },
      ],
      "pro-2": [
        {
          label: "pro-2=gender=nonvirile",
          stCh: {
            chunkId: "pro-2",
            specificLemmas: ["PERSONAL"],
            gcase: ["acc"],
            number: ["plural"],
            person: ["3per"],
            dontSpecifyOnThisChunk: true,
            form: ["pronoun"],
            gender: ["nonvirile"],
            andTags: [],
            annotations: {
              gender: "nonvirile",
            },
          },
          questionOutputUnit: {
            selectedLemmaObject: {},
            selectedWord: "them",
            drillPath: [
              ["form", "pronoun"],
              ["person", "3per"],
              ["number", "plural"],
              ["gender", "nonvirile"],
              ["gcase", "acc"],
            ],
            structureChunk: {
              chunkId: "pro-2",
              specificLemmas: ["PERSONAL"],
              gcase: ["acc"],
              number: ["plural"],
              person: ["3per"],
              dontSpecifyOnThisChunk: true,
              form: ["pronoun"],
              gender: ["nonvirile"],
              andTags: [],
              annotations: {
                gender: "nonvirile",
              },
            },
          },
          traitKey: "gender",
          traitValue: "nonvirile",
        },
      ],
    };

    // let questionOutputUnitsThatHaveBeenCounterfaxedInThisSit = {};

    consol.log("dfim The current counterfax sit is:", sit.label);

    if (!index) {
      consol.log("@@ This is the original (Factual) so returning here.");
      runsRecord.push(`${sit.label}(original)`);
      return;
    } else {
      runsRecord.push(sit.label);
    }

    let moreDetailedRunRecordForThisSit = [];
    runsRecord.push(moreDetailedRunRecordForThisSit);

    sit.chunkIds.forEach((chunkId) => {
      let assignmentsForThisChunk = sit[chunkId];

      assignmentsForThisChunk.forEach((assignment) => {
        let { questionOutputUnit, traitKey, traitValue } = assignment;
        annoTraitKey = traitKey;
        annoTraitValue = traitValue;
        let counterfaxedStCh = assignment.stCh;

        consol.log(
          "dfim The current counterfax assignment is:",
          assignment.label
        );
        ////////////////

        // if (
        //   cfUtils.removeAnnotationsIfHeadChunkHasBeenCounterfaxed(
        //     questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
        //     questionOutputUnit
        //   )
        // ) {
        //   //ACX1: If this QstCh agrees with a stCh that we've already run through counterfaxing,
        //   //then remove that specific annotation from this QstCh, and return.
        //   consol.log("ioej");
        //   return;
        // }

        let arrayOfCounterfactualResultsForThisAnnotation = []; //Hmm....

        //(IOTA). Do we want to send updated question formula for counterfax run,
        //or originalQuestionSentenceFormula ?

        function createCounterfactualSentenceFormula(
          rawQuestionSentenceFormula,
          questionOutputArr,
          counterfaxedStCh
        ) {
          let counterfactualQuestionSentenceFormula =
            uUtils.copyWithoutReference(
              rawQuestionSentenceFormula //Hmm....
            );

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

          consol.consoleLogObjectAtOneLevel(
            counterfactualQuestionSentenceFormula,
            "counterfactualQuestionSentenceFormula",
            "RACX"
          );

          return counterfactualQuestionSentenceFormula;
        }

        let counterfactualQuestionSentenceFormula =
          createCounterfactualSentenceFormula(
            rawQuestionSentenceFormula,
            questionOutputArr,
            counterfaxedStCh
          );

        let counterfactualTrait = {};
        counterfactualTrait[annoTraitKey] =
          counterfactualTraitValueForThisTraitKey;

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
          devSaysThrowAfterAnnoSalvo: reqBody.devSaysThrowAfterAnnoSalvo,
        };

        moreDetailedRunRecordForThisSit.push(
          `${questionOutputUnit.structureChunk.chunkId} new ${annoTraitKey} "${counterfactualTraitValueForThisTraitKey}".`
        );

        palette.fetchPalette({ body: newReqBody });
      });
    });

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
        // const agglomerateAnswers = (
        //   questionOutputUnit,
        //   annoTraitKey,
        //   counterfactualTraitValues,
        //   answerSelectedWordsSetsHaveChanged,
        //   answerSentenceData,
        //   counterfactualAnswerOutputArrays,
        // ) => {};

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

    // uUtils.addToArrayAtKey(
    //   questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
    //   questionOutputUnit.structureChunk.chunkId,
    //   annoTraitKey
    // );
  });
};

exports.removeAnnotationsIfHeadChunkHasBeenCounterfaxed = (
  questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
  questionOutputUnit
) => {
  return (
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
      questionOutputUnit,
      "agreeWith"
    ) ||
    removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
      questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
      questionOutputUnit,
      "postHocAgreeWithPrimary"
    )
  );

  function removeAnnotationsIfHeadChunkHasBeenCounterfaxed_inner(
    questionOutputUnitsThatHaveBeenCounterfaxedInThisSit,
    questionOutputUnit,
    agreeKey
  ) {
    if (
      questionOutputUnitsThatHaveBeenCounterfaxedInThisSit[
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
            questionOutputUnitsThatHaveBeenCounterfaxedInThisSit[
              questionOutputUnit.structureChunk[agreeKey]
            ]
          }].` +
          "[0m"
      );

      questionOutputUnitsThatHaveBeenCounterfaxedInThisSit[
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
