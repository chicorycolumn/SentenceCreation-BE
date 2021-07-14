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

  function makeLabelFromSitSchematic(sit) {
    let grandLabel = "";
    sit.chunkIds.forEach((chunkId) => {
      let label = `${chunkId} `;
      sit[chunkId].forEach((assignment) => {
        label += `${assignment.traitKey}=${assignment.traitValue} `;
      });
      label = label.slice(0, label.length - 1);
      grandLabel += `${label}, `;
    });
    return grandLabel.slice(0, grandLabel.length - 2);
  }

  explodedBetweenChunks.labels = [];
  explodedBetweenChunks.forEach((sit) => {
    let label = makeLabelFromSitSchematic(sit);
    sit.label = label;
    explodedBetweenChunks.labels.push(label);
  });

  return explodedBetweenChunks;
};

exports.listCounterfaxSituations2 = (questionOutputArr, languagesObj) => {
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

        //Adding original.
        addFaxSituation2(
          counterfaxSituations,
          questionOutputUnit.structureChunk.chunkId,
          annoTraitKey,
          originalAnnoTraitValue
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

        let tempStCh = uUtils.copyWithoutReference(
          questionOutputUnit.structureChunk
        );

        tempStCh[annoTraitKey] = counterfactualTraitValuesForThisTraitKey;

        //If "plural", remove "m", "f". If person, remove "n".
        counterfactualTraitValuesForThisTraitKey =
          refFxn.removeIncompatibleTraits(questionLanguage, tempStCh)[
            annoTraitKey
          ];

        function addFaxSituation2(
          counterfaxSituations,
          structureChunkId,
          traitKey,
          traitValue
        ) {
          let newCounterfaxSituation = {
            traitKey: traitKey,
            traitValue: traitValue,
          };

          if (
            counterfaxSituations.headsFirstSequenceChunkIds.includes(
              structureChunkId
            )
          ) {
            if (
              Object.keys(counterfaxSituations[structureChunkId]).includes(
                traitKey
              )
            ) {
              counterfaxSituations[structureChunkId][traitKey].push(
                newCounterfaxSituation
              );
            } else {
              counterfaxSituations[structureChunkId][traitKey] = [
                newCounterfaxSituation,
              ];
            }
          } else {
            counterfaxSituations.headsFirstSequenceChunkIds.push(
              structureChunkId
            );
            counterfaxSituations[structureChunkId] = {};
            counterfaxSituations[structureChunkId][traitKey] = [
              newCounterfaxSituation,
            ];
          }
        }

        counterfactualTraitValuesForThisTraitKey.forEach(
          (counterfactualTraitValueForThisTraitKey) => {
            addFaxSituation2(
              counterfaxSituations,
              questionOutputUnit.structureChunk.chunkId,
              annoTraitKey,
              counterfactualTraitValueForThisTraitKey
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

        //Adding original.
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
  explodedCounterfaxSituationsSchematics,
  questionOutputArr,
  languagesObj,
  answerSentenceData,
  rawQuestionSentenceFormula, //Alpha not really raw. As this is the counterfaxed sentence formula when on a counterfax run.
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  runsRecord,
  originalQuestionSentenceFormula //On a counterfax run this is null. Remove this variable everywhere.
) => {
  //Abortcuts for this fxn: Search ACX.

  let shouldConsoleLog = false;
  let questionLanguage = languagesObj.questionLanguage;

  let originalQuestionOutputArrays = [questionOutputArr];
  let originalAnswerOutputArrays = answerSentenceData.answerOutputArrays;

  let allCounterfactualResults = [];

  let updatedOriginalQuestionSentenceFormula = uUtils.copyWithoutReference(
    rawQuestionSentenceFormula
  );

  gpUtils.updateSentenceStructureWithNewStructureChunksFromOutputUnits(
    updatedOriginalQuestionSentenceFormula.sentenceStructure,
    questionOutputArr
  );

  //nownow
  //So now we have the sentenceFormula for the original (Factual) situation.
  //Now each run of the forEach sit, will make a deepcopy of it, and use that to counterfax run.

  explodedCounterfaxSituationsSchematics.forEach((sit, index) => {
    // let questionOutputUnitsThatHaveBeenCounterfaxedInThisSit = {}; //To delete in Iota2.

    consol.log("dfim The current counterfax sit is:", sit.label);

    if (!index) {
      consol.log("@@ This is the original (Factual) so returning here.");
      runsRecord.push(`${sit.label}(original)`);
      return;
    }
    runsRecord.push(sit.label);

    let counterfactualQuestionSentenceFormula = uUtils.copyWithoutReference(
      updatedOriginalQuestionSentenceFormula
    );

    //Now, inside this forEach chunk forEach assigment,
    //get those values and update counterfactualQuestionSentenceFormula with them.
    //Then exit both loops.
    //Then send off to fetchPalette.

    sit.chunkIds.forEach((chunkId) => {
      let stChToCounterfax =
        counterfactualQuestionSentenceFormula.sentenceStructure.find(
          (structureChunk) => structureChunk.chunkId === chunkId
        );

      if (!stChToCounterfax) {
        consol.throw("waow");
      }

      sit[chunkId].forEach((assignment) => {
        stChToCounterfax[assignment.traitKey] = [assignment.traitValue];
      });
    });

    counterfactualQuestionSentenceFormula.sentenceStructure.forEach((stCh) => {
      delete stCh.annotations;
    });

    let newReqBody = {
      allCounterfactualResults,
      counterfactualQuestionSentenceFormula,
      sit,

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

    palette.fetchPalette({ body: newReqBody });

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

    //(IOTA). Do we want to send updated question formula for counterfax run,
    //or originalQuestionSentenceFormula ?
  });

  console.log("SUCCESS!");
  console.log(allCounterfactualResults.length);
  throw 777;

  //Will use allCounterfactualResults not arrayOfCounterfactualResultsForThisAnnotation.
  //But will need to sort by "All other things being equal" for coppicing and inosculating.

  let counterfactualQuestionOutputArrays =
    arrayOfCounterfactualResultsForThisAnnotation.map(
      (counterfactual) => counterfactual.questionSentenceData.questionOutputArr
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
    //Remove annotation: INOSCULATE.
    delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
  } else if (
    !gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
      originalQuestionPseudoSentences,
      counterfactualQuestionPseudoSentences
    )
  ) {
    consol.log(
      "[1;35m " +
        `myxo-clauseB [tl;dr questiondifferent so deleting anno] removeAnnotationsByCounterfax END. 
        I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual 
        QUESTION selected words came back DIFFERENT original question selected words.\n
        This means that this trait has no impact, even if we flip it, so annotation is not needed. \n
        Deleting annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}" now.` +
        "[0m",
      {
        originalQuestionPseudoSentences,
        counterfactualQuestionPseudoSentences,
      }
    );
    //Remove annotation: COPPICE
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

    //Iota: So regarding pds diamond, that's clear. After Iota when you now have a result for each sit,
    //you take all the sits (if any) with the same Answer sentences as original Question sentence,
    //and agglomerate them.

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
        questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys = [
          annoTraitKey,
        ];
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
