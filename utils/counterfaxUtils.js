const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const cfUtils = require("./counterfaxUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const palette = require("../models/palette.model.js");
const allLangUtils = require("./allLangUtils.js");

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

  explodedBetweenChunks.cfLabels = [];
  explodedBetweenChunks.forEach((sit) => {
    let cfLabel = cfUtils.makeCfLabelFromSitSchematic(sit);
    sit.cfLabel = cfLabel;
    explodedBetweenChunks.cfLabels.push(cfLabel);
  });

  return explodedBetweenChunks;
};

exports.makeCfLabelFromSitSchematic = (sit) => {
  let grandCfLabel = "";
  sit.chunkIds.forEach((chunkId) => {
    let cfLabel = `${chunkId} `;
    sit[chunkId].forEach((assignment) => {
      cfLabel += `${assignment.traitKey}=${assignment.traitValue} `;
    });
    cfLabel = cfLabel.slice(0, cfLabel.length - 1);
    grandCfLabel += `${cfLabel}, `;
  });
  return grandCfLabel.slice(0, grandCfLabel.length - 2);
};

exports.listCounterfaxSituations = (questionOutputArr, languagesObj) => {
  let { questionLanguage } = languagesObj;

  let counterfaxSituations = { headsFirstSequenceChunkIds: [] };

  let annotationsToCounterfaxAndTheirChunkIds = [];

  let questionOutputArrOrderedHeadsFirst =
    reorderOutputArrWithHeadsFirst(questionOutputArr);

  function reorderOutputArrWithHeadsFirst(questionOutputArr) {
    let questionOutputArrOrderedHeadsFirst = [];
    let headChunkIds = [];

    questionOutputArr.forEach((questionOutputUnit) => {
      refObj.agreementTraits.forEach((agreeKey) => {
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

        annotationsToCounterfaxAndTheirChunkIds.push({
          chunkId: questionOutputUnit.structureChunk.chunkId,
          annoTraitKey,
          originalAnnoTraitValue,
        });

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
      }
    );
  });

  return { counterfaxSituations, annotationsToCounterfaxAndTheirChunkIds };
};

exports.removeAnnotationsByCounterfactualAnswerSentences = (
  explodedCounterfaxSituationsSchematics,
  questionOutputArr,
  annotationsToCounterfaxAndTheirChunkIds,
  languagesObj,
  answerSentenceData,
  counterfaxedSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  runsRecord
) => {
  if (!"console") {
    consol.logSpecial3("");
    consol.logSpecial3("*");
    consol.logSpecial3("removeAnnotationsByCounterfactualAnswerSentences");
    consol.logSpecial3(
      `There are ${explodedCounterfaxSituationsSchematics.length} schematics.`
    );
    explodedCounterfaxSituationsSchematics.forEach((x, index) => {
      consol.logSpecial3(x);
      if (!index) {
        consol.logSpecial3("^^^ ORIGINAL ^^^");
      }
      consol.logSpecial3("-");
    });
  }

  //Abortcuts for this fxn: Search ACX.

  let questionLanguage = languagesObj.questionLanguage;

  let questionOutputArrObj = {
    arr: questionOutputArr,
    cfLabel: explodedCounterfaxSituationsSchematics[0].cfLabel,
  };
  let originalQuestionOutputArrObjs = [questionOutputArrObj];

  let originalAnswerOutputArrObjs = answerSentenceData.answerOutputArrays.map(
    (answerOutputArr) => {
      return {
        arr: answerOutputArr,
        cfLabel: explodedCounterfaxSituationsSchematics[0].cfLabel,
      };
    }
  );

  let allCounterfactualResults = [];

  let updatedCounterfaxedQuestionSentenceFormula = uUtils.copyWithoutReference(
    counterfaxedSentenceFormula
  );

  gpUtils.updateSentenceStructureWithNewStructureChunksFromOutputUnits(
    updatedCounterfaxedQuestionSentenceFormula.sentenceStructure,
    questionOutputArr
  );

  let originalSitSchematic;

  //So now we have the sentenceFormula for the original (Factual) situation.
  //Now each run of the forEach sit, will make a deepcopy of it, and use that to counterfax run.

  //Nownow Need to make a such object for the original factual, and put it in here too.

  //In fact, we should modify the counterfax sit schematics directly when virility adjustments are made, including remaking the label.
  //Then we'n compare the lables, rather that making a new record object and putting it in recordOfCounterfaxedStChsForEachCF.

  explodedCounterfaxSituationsSchematics.forEach(
    (counterfactualSitSchematic, index) => {
      if (!index) {
        counterfactualSitSchematic.chunkIds.forEach((chunkId) => {
          let assignments = counterfactualSitSchematic[chunkId];
          assignments.forEach((assignment) => {
            if (
              assignment.traitKey === "gender" &&
              ["m1", "m2", "m3"].includes(assignment.traitValue)
            ) {
              let stCh = questionOutputArr.find(
                (unit) => unit.structureChunk.chunkId === chunkId
              ).structureChunk;

              if (stCh.number) {
                if (stCh.number.length !== 1) {
                  consol.throw("dhua");
                }
                if (stCh.number[0] === "singular") {
                  assignment.traitValue = "m";
                }
              }
            }
          });
        });

        //Make cfLabel again now that counterfactualSitSchematic assignments may have changed.
        let newCfLabel = cfUtils.makeCfLabelFromSitSchematic(
          counterfactualSitSchematic
        );
        if (counterfactualSitSchematic.cfLabel !== newCfLabel) {
          consol.logSpecial3(
            `ncui Changing cfLabel of ORIGINAL from "${counterfactualSitSchematic.cfLabel}" to "${newCfLabel}"`
          );
          counterfactualSitSchematic.cfLabel = newCfLabel;
        }

        runsRecord.push(counterfactualSitSchematic.cfLabel);
        originalSitSchematic = counterfactualSitSchematic;
        return;
      }

      let counterfactualQuestionSentenceFormula = uUtils.copyWithoutReference(
        updatedCounterfaxedQuestionSentenceFormula
      );

      //Now, inside this forEach chunk forEach assigment,
      //get those values and update counterfactualQuestionSentenceFormula with them.
      //Then exit both loops.
      //Then send off to fetchPalette.

      let shouldDrop;

      counterfactualSitSchematic.chunkIds.forEach((chunkId) => {
        if (shouldDrop) {
          return;
        }

        let stChToCounterfax =
          counterfactualQuestionSentenceFormula.sentenceStructure.find(
            (structureChunk) => structureChunk.chunkId === chunkId
          );

        if (!stChToCounterfax) {
          consol.throw("waow");
        }

        delete stChToCounterfax.annotations; //No longer necessary to do this.

        let tempCopySchematicForThisChunk = uUtils.copyWithoutReference(
          counterfactualSitSchematic[chunkId]
        );

        counterfactualSitSchematic[chunkId].forEach((assignment) => {
          stChToCounterfax[assignment.traitKey] = [assignment.traitValue];
        });

        //Drop if bad virility combination.
        counterfactualSitSchematic[chunkId].forEach((assignment) => {
          if (
            assignment.traitKey === "gender" &&
            stChToCounterfax.number &&
            stChToCounterfax.number.length
          ) {
            if (stChToCounterfax.number.length > 1) {
              consol.throw("mkdo");
            }

            let incompatibleTraitsRef =
              refObj.incompatibleTraitsRef[questionLanguage].gender.number;

            if (
              !incompatibleTraitsRef[stChToCounterfax.number[0]].includes(
                stChToCounterfax.gender[0]
              )
            ) {
              // consol.logSpecial3(
              consol.logSpecial3(
                `kcaq Dropping current counterfax sit: "${counterfactualSitSchematic.cfLabel}" ie not send to fetchPalette, 
                as it has gender [${stChToCounterfax.number}] and number [${stChToCounterfax.gender[0]}].`
              );
              shouldDrop = true;
            }
          }
        });

        if (shouldDrop) {
          return;
        }

        consol.logSpecial3("--------eggd--------");

        consol.logSpecial3("number", stChToCounterfax.number);
        consol.logSpecial3("gender", stChToCounterfax.gender);

        allLangUtils.adjustVirilityOfStructureChunk(
          questionLanguage,
          stChToCounterfax,
          true,
          true
        );

        //Okay, if questionLang is POL, and number: singular, and gender is a masculine one,
        //then change gender to just "m".
        //But you will have to do this to original, too, which you don't deal with right here.
        collapseMasculineGenders(questionLanguage, stChToCounterfax);

        function collapseMasculineGenders(questionLanguage, stChToCounterfax) {
          if (["POL"].includes(questionLanguage)) {
            if (
              stChToCounterfax.number &&
              stChToCounterfax.number.length !== 1
            ) {
              consol.throw("nbii");
            }
            if (
              stChToCounterfax.gender &&
              stChToCounterfax.gender.length !== 1
            ) {
              consol.throw("nbij");
            }

            if (
              stChToCounterfax.number &&
              stChToCounterfax.number[0] === "singular" &&
              stChToCounterfax.number &&
              ["m1", "m2", "m3"].includes(stChToCounterfax.gender[0])
            ) {
              stChToCounterfax.gender = ["m"];
            }
          }
        }

        consol.logSpecial3("↓");
        consol.logSpecial3("gender", stChToCounterfax.gender);

        consol.logSpecial3("~~~~~~~~~~~~~~~~~~~~");

        //Update the counterfactualSitSchematic assignments now that they may have changed from adjust virility.
        tempCopySchematicForThisChunk.forEach((assignment) => {
          let traitKey = assignment.traitKey;
          let traitValueBeforeAdjust = assignment.traitValue;
          let traitValuesAfterAdjust = stChToCounterfax[traitKey];

          if (traitValuesAfterAdjust.length !== 1) {
            consol.throw(
              `idwp These should only contain one value, as this is counterfax sit. After listing and exploding, 
              we should always be dealing with just one traitValue for the counterfaxed traitKeys.
              traitValuesAfterAdjust: [${traitValuesAfterAdjust}] 
              `
            );
          }

          let traitValueAfterAdjust = traitValuesAfterAdjust[0];

          if (traitValueBeforeAdjust !== traitValueAfterAdjust) {
            consol.logSpecial3(`klnn For sit "${counterfactualSitSchematic.cfLabel}", structure chunk "${chunkId}" has changed from
            "${traitKey}" = "${traitValueBeforeAdjust}" to "${traitValueAfterAdjust}". The former value is from counterfax listing
            and exploding, but that process naturally creates bad virility combinations like number singular gender nonvirile. So
            that has now been adjusted in this sit. The cfLabel will be updated accordingly. And this sit may even be stopped here 
            (ie not be sent to fetchPalette) because an identical (now after virility adjustment) sit may have already been through.`);

            counterfactualSitSchematic[chunkId].find(
              (assig) => assig.traitKey === traitKey
            ).traitValue = traitValueAfterAdjust;
          }
        });
      });

      if (shouldDrop) {
        return;
      }

      //Make cfLabel again now that counterfactualSitSchematic assignments may have changed.
      let newCfLabel = cfUtils.makeCfLabelFromSitSchematic(
        counterfactualSitSchematic
      );
      if (counterfactualSitSchematic.cfLabel !== newCfLabel) {
        consol.logSpecial3(
          `ncuo Changing cfLabel from "${counterfactualSitSchematic.cfLabel}" to "${newCfLabel}"`
        );
        counterfactualSitSchematic.cfLabel = newCfLabel;
      }

      if (runsRecord.includes(counterfactualSitSchematic.cfLabel)) {
        consol.logSpecial3(
          `dssb Dropping current counterfax sit: "${counterfactualSitSchematic.cfLabel}" ie not send to fetchPalette, 
          because after adjusting virility, it turns out an identical one has already been done.`
        );
        return;
      }
      runsRecord.push(counterfactualSitSchematic.cfLabel);

      counterfactualQuestionSentenceFormula.sentenceStructure.forEach(
        (stCh) => {
          delete stCh.annotations;
        }
      );

      let newReqBody = {
        allCounterfactualResults,
        counterfactualQuestionSentenceFormula,
        counterfactualSitSchematic,

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

      consol.logSpecial3(
        `> > > Sending counterfax sit "${counterfactualSitSchematic.cfLabel}" to fetchPalette.`
      );

      palette.fetchPalette({ body: newReqBody });
    }
  );

  consol.logSpecial3(
    "ewcc allCounterfactualResults.length",
    allCounterfactualResults.length
  );

  if (!allCounterfactualResults.length) {
    consol.throw("THROW: allCounterfactualResults was empty.");
  }

  function makePseudoSentenceObjs(outputArrObjs, primaryOrders) {
    //This doesn't do the full processing, ie 'a' --> 'an'
    //but it does trim the list of selected words according to sentenceFormula.primaryOrders,
    //ie "On czyta." and "Ona czyta." both become "Czyta.".

    let orderAdjustedOutputArrObjs = [];

    if (!primaryOrders || !primaryOrders.length) {
      return outputArrObjs.map((outputArrObj) => {
        return {
          pseudoSentence: outputArrObj.arr.map((unit) => unit.selectedWord),
          cfLabel: outputArrObj.cfLabel,
        };
      });
    }

    primaryOrders.forEach((primaryOrder) => {
      outputArrObjs.forEach((outputArrObj) => {
        let orderAdjustedOutputArrObj = {
          cfLabel: outputArrObj.cfLabel,
          arr: [],
        };
        primaryOrder.forEach((chunkId) => {
          let correspondingOutputUnit = outputArrObj.arr.find(
            (unit) => unit.structureChunk.chunkId === chunkId
          );

          if (!correspondingOutputUnit) {
            consol.throw("ocii");
          }

          orderAdjustedOutputArrObj.arr.push(correspondingOutputUnit);
        });

        orderAdjustedOutputArrObjs.push(orderAdjustedOutputArrObj);
      });
    });

    return orderAdjustedOutputArrObjs.map((outputArrObj) => {
      return {
        pseudoSentence: outputArrObj.arr.map((unit) => unit.selectedWord),
        cfLabel: outputArrObj.cfLabel,
      };
    });
  }

  function findCFResultsWhenAllOtherThingsBeingEqual(
    allCR,
    originalSit,
    chunkIdToExamine,
    traitKeyToExamine,
    questionLanguage
  ) {
    //Issue here that "all other things being equal" doesn't account for how "You (m sing)" compared "You (vir plur)"
    //is actually only one change, so discounts it for looking like two changes.

    //f nonvir
    //m vir (but I guess also f can be included in vir?)

    //Okay, so if traitKey is gender, then instead of comparing the two traitValues directly,
    //compare the traitValues processed through refObj.virilityConversionRef.

    function areTraitValuesEqual(
      traitKey,
      traitValue1,
      traitValue2,
      questionLanguage
    ) {
      if (!(traitKey && traitValue1 && traitValue2)) {
        consol.throw("ocsj");
      }

      if (traitKey === "gender") {
        let virilityRefWithMetas = uUtils.combineTwoKeyValueObjectsCarefully(
          refObj.virilityConversionRef[questionLanguage].matches,

          refObj.metaTraitValues[questionLanguage].gender
        );

        return virilityRefWithMetas[traitValue1].includes(traitValue2);
      }

      return traitValue1 === traitValue2;
    }

    let resArr = allCR.filter((CR) => {
      let Cschem = CR.counterfactualSitSchematic;

      //We only want counterfax results where the chunk to be coppiced/inosculated has a DIFFERENT value to what it has in original.
      if (
        Cschem[chunkIdToExamine].find(
          (assig) =>
            assig.traitKey === traitKeyToExamine &&
            areTraitValuesEqual(
              assig.traitKey,
              assig.traitValue,
              originalSit[chunkIdToExamine].find(
                (assignment) => assignment.traitKey === traitKeyToExamine
              ).traitValue,
              questionLanguage
            )
        )
      ) {
        return false;
      }

      //And if chunk to be cop/ino does have a different value to original, all values in all other parts of this counterfax result must be same as original.

      if (
        originalSit.chunkIds.some((chunkId) =>
          Cschem[chunkId].some(
            (assig) =>
              !(
                assig.traitKey === traitKeyToExamine &&
                chunkId === chunkIdToExamine
              ) &&
              !areTraitValuesEqual(
                assig.traitKey,
                assig.traitValue,
                originalSit[chunkId].find(
                  (assignment) => assignment.traitKey === assig.traitKey
                ).traitValue,
                questionLanguage
              )
          )
        )
      ) {
        return false;
      }
      return true;
    });

    if (!resArr.length) {
      consol.throw(
        `#ERR zprr "${questionLanguage}"
          \nOkay look, I'm running findCFResultsWhenAllOtherThingsBeingEqual for chunk "${chunkIdToExamine}", trait "${traitKeyToExamine}".
          \nThe original sit is    "${originalSit.cfLabel}"    and there are ${allCR.length} counterfax results total.
          \nSo I'm filtering that array to just the counterfactual results where
          \na) The chunk to be coppiced/inosculated has a DIFFERENT value to what it has in original, and
          \nb) If chunk to be cop/ino does have a different value to original, all values in all other parts of this counterfax result must be same as original.
          \nBut not one of the counterfax results fulfilled both criteria, and if resArr has length 0 I've been told to error.
          \nHowever, it's not necessarily the case that something's terribly wrong. Maybe this particular lObj only has singular inflection, say.
          `
      );
    }

    return resArr;
  }

  consol.logSpecial3(
    "wkop annotationsToCounterfaxAndTheirChunkIds",
    annotationsToCounterfaxAndTheirChunkIds
  );

  //Nownow
  //So here, if all chunks are PDS true, and if coppice condition doesn't hold,
  //then do PDS Diamond using allCounterfax results.
  //Then skip the following stage of Coppice-Inosculate-Agglomerate that goes anno by anno.

  if (
    questionOutputArr.every(
      (unit) => unit.structureChunk.dontSpecifyOnThisChunk
    )
  ) {
    if (
      agglomerateUsingAllCounterfaxResults(
        allCounterfactualResults,
        annotationsToCounterfaxAndTheirChunkIds,
        questionLanguage
      )
    ) {
      //This entire QA has been globally agglomerated, ie all annotations removed and all answer arrays added.
      //So no need to coppice or agglomerate any of them, so return here.
      return;
    }

    function agglomerateUsingAllCounterfaxResults(
      allCounterfactualResults,
      annotationsToCounterfaxAndTheirChunkIds,
      annoTraitKey,
      questionLanguage
    ) {
      //Only perform this agglomeration if for all anno+chunkIds, the condition where if true you would coppice,
      //is false for all. Ie if question sentences are different for any anno+chunkId, we cannot do this global agglomeration.
      let coppiceConditionBooleans = [];

      annotationsToCounterfaxAndTheirChunkIds.forEach(
        (annoDataObj, annoDataObjIndex) => {
          // if (coppiceConditionBooleans.includes(true)) {
          //   return;
          // }

          let { chunkId, annoTraitKey, originalAnnoTraitValue } = annoDataObj;

          let questionOutputUnit = questionOutputArr.find(
            (unit) => unit.structureChunk.chunkId === chunkId
          );

          let {
            originalAnswerPseudoSentenceObjs,
            counterfactualAnswerPseudoSentenceObjs,
            originalQuestionPseudoSentenceObjs,
            counterfactualQuestionPseudoSentenceObjs,
            counterfactualTraitValuesForThisTraitKeyOnThisStCh,
            counterfactualAnswerOutputArrObjs,
          } = getPseudoSentencesFromAnnotationSpecificResults(
            allCounterfactualResults,
            chunkId,
            annoTraitKey,
            questionLanguage
          );

          // annoDataObj.originalAnswerPseudoSentenceObjs = originalAnswerPseudoSentenceObjs
          // annoDataObj.counterfactualAnswerPseudoSentenceObjs = counterfactualAnswerPseudoSentenceObjs
          annoDataObj.originalQuestionPseudoSentenceObjs =
            originalQuestionPseudoSentenceObjs;
          annoDataObj.counterfactualQuestionPseudoSentenceObjs =
            counterfactualQuestionPseudoSentenceObjs;
          annoDataObj.counterfactualTraitValuesForThisTraitKeyOnThisStCh =
            counterfactualTraitValuesForThisTraitKeyOnThisStCh;
          annoDataObj.counterfactualAnswerOutputArrObjs =
            counterfactualAnswerOutputArrObjs;
          annoDataObj.questionOutputUnit = questionOutputUnit;

          //The condition under which this should be coppiced, and thus not agglomerated.
          let coppiceConditionBoolean =
            !gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
              originalQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
              counterfactualQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              )
            );

          coppiceConditionBooleans.push(coppiceConditionBoolean);
        }
      );

      if (
        coppiceConditionBooleans.length ===
          annotationsToCounterfaxAndTheirChunkIds.length &&
        !coppiceConditionBooleans.includes(true)
      ) {
        //Globally agglomerate if for all annos, they don't need to be coppiced instead.
        annotationsToCounterfaxAndTheirChunkIds.forEach(
          (annoDataObj, annoDataObjIndex) => {
            let {
              chunkId,
              annoTraitKey,
              originalAnnoTraitValue,
              questionOutputUnit,
              originalAnswerPseudoSentenceObjs,
              counterfactualAnswerPseudoSentenceObjs,
              originalQuestionPseudoSentenceObjs,
              counterfactualQuestionPseudoSentenceObjs,
              counterfactualTraitValuesForThisTraitKeyOnThisStCh,
              counterfactualAnswerOutputArrObjs,
            } = annoDataObj;

            cfUtils.agglomerateAndRemoveAnnosIfSameResults(
              questionOutputUnit,
              counterfactualTraitValuesForThisTraitKeyOnThisStCh,
              answerSelectedWordsSetsHaveChanged,
              annoTraitKey,
              answerSentenceData,
              counterfactualAnswerOutputArrObjs,
              originalAnnoTraitValue
            );
          }
        );

        return true;
      }
    }
  }

  function getPseudoSentencesFromAnnotationSpecificResults(
    cfResults,
    chunkId,
    annoTraitKey,
    questionLanguage,
    questionDataOnly
  ) {
    let counterfactualTraitValuesForThisTraitKeyOnThisStCh = cfResults.map(
      (counterfactual) =>
        counterfactual.counterfactualSitSchematic[chunkId].find(
          (assig) => assig.traitKey === annoTraitKey
        ).traitValue
    );

    let counterfactualQuestionOutputArrObjs = cfResults.map(
      (counterfactual) => {
        return {
          arr: counterfactual.questionSentenceData.questionOutputArr,
          cfLabel: counterfactual.counterfactualSitSchematic.cfLabel,
        };
      }
    );

    let counterfactualAnswerOutputArrObjs = [];

    cfResults.forEach((counterfactual) => {
      counterfactual.answerSentenceData.answerOutputArrays.forEach(
        (answerOutputArray) => {
          counterfactualAnswerOutputArrObjs.push({
            arr: answerOutputArray,
            cfLabel: counterfactual.counterfactualSitSchematic.cfLabel,
          });
        }
      );
    });

    let originalAnswerPseudoSentenceObjs = makePseudoSentenceObjs(
      originalAnswerOutputArrObjs,
      answerSentenceData.sentenceFormula.primaryOrders
    );
    let counterfactualAnswerPseudoSentenceObjs = makePseudoSentenceObjs(
      counterfactualAnswerOutputArrObjs,
      answerSentenceData.sentenceFormula.primaryOrders
    );
    let originalQuestionPseudoSentenceObjs = makePseudoSentenceObjs(
      originalQuestionOutputArrObjs,
      counterfaxedSentenceFormula.primaryOrders
    );
    let counterfactualQuestionPseudoSentenceObjs = makePseudoSentenceObjs(
      counterfactualQuestionOutputArrObjs,
      counterfaxedSentenceFormula.primaryOrders
    );

    return {
      originalAnswerPseudoSentenceObjs,
      counterfactualAnswerPseudoSentenceObjs,
      originalQuestionPseudoSentenceObjs,
      counterfactualQuestionPseudoSentenceObjs,
      counterfactualTraitValuesForThisTraitKeyOnThisStCh,
      counterfactualAnswerOutputArrObjs,
    };
  }

  annotationsToCounterfaxAndTheirChunkIds.forEach(
    (annoDataObj, annoDataObjIndex) => {
      let { chunkId, annoTraitKey, originalAnnoTraitValue } = annoDataObj;

      let questionOutputUnit = questionOutputArr.find(
        (unit) => unit.structureChunk.chunkId === chunkId
      );

      let specificCounterfactualResultsForThisOneAnnotationOnThisStCh =
        findCFResultsWhenAllOtherThingsBeingEqual(
          allCounterfactualResults,
          originalSitSchematic,
          chunkId,
          annoTraitKey,
          questionLanguage
        );

      let {
        originalAnswerPseudoSentenceObjs,
        counterfactualAnswerPseudoSentenceObjs,
        originalQuestionPseudoSentenceObjs,
        counterfactualQuestionPseudoSentenceObjs,
        counterfactualTraitValuesForThisTraitKeyOnThisStCh,
        counterfactualAnswerOutputArrObjs,
      } = getPseudoSentencesFromAnnotationSpecificResults(
        specificCounterfactualResultsForThisOneAnnotationOnThisStCh,
        chunkId,
        annoTraitKey,
        questionLanguage
      );

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

      if (
        gpUtils.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
          originalAnswerPseudoSentenceObjs.map((obj) => obj.pseudoSentence),
          counterfactualAnswerPseudoSentenceObjs.map(
            (obj) => obj.pseudoSentence
          )
        )
      ) {
        //Remove annotation: INOSCULATE.
        consol.logSpecial3(
          "[1;35m " +
            `myxo-clauseA [Inosculate: answersame so deleting anno] removeAnnotationsByCounterfax END. 
              I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" 
              and the counterfactual ANSWER selected words came back SAME as original answer selected words.\n
              This means that this trait has no impact, even if we flip it, so annotation is not needed. \n
              Deleting annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}".` +
            "[0m",
          {
            originalAnswerPseudoSentences: originalAnswerPseudoSentenceObjs.map(
              (obj) => obj.pseudoSentence
            ),
            counterfactualAnswerPseudoSentences:
              counterfactualAnswerPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
          }
        );
        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
        annotationsToCounterfaxAndTheirChunkIds =
          uUtils.returnArrayWithItemAtIndexRemoved(
            annotationsToCounterfaxAndTheirChunkIds,
            annoDataObjIndex
          );
      } else if (
        !uUtils.isArraySubsetOfArray(
          originalQuestionPseudoSentenceObjs.map((obj) => obj.pseudoSentence),
          counterfactualQuestionPseudoSentenceObjs.map(
            (obj) => obj.pseudoSentence
          )
        )
      ) {
        //Remove annotation: COPPICE
        consol.logSpecial3(
          "[1;35m " +
            `myxo-clauseB [Coppice: questiondifferent so deleting anno] removeAnnotationsByCounterfax END. 
          I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual 
          QUESTION selected words came back DIFFERENT original question selected words.\n
          This means that this trait has no impact, even if we flip it, so annotation is not needed. \n
          Deleting annotation "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}" now.` +
            "[0m",
          {
            originalQuestionPseudoSentences:
              originalQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
            counterfactualQuestionPseudoSentences:
              counterfactualQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
          }
        );
        delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
        annotationsToCounterfaxAndTheirChunkIds =
          uUtils.returnArrayWithItemAtIndexRemoved(
            annotationsToCounterfaxAndTheirChunkIds,
            annoDataObjIndex
          );
      } else {
        consol.logSpecial3(
          "[1;35m " +
            `myxo-clauseC [tl;dr !answersame && !questiondifferent so keeping anno] removeAnnotationsByCounterfax END. 
          I ran counterfactuals for "${questionOutputUnit.structureChunk.chunkId}" and the counterfactual answer 
          selected words came back DIFFERENT FROM original answer selected words.\nThis means I'll keep annotation 
          "${annoTraitKey}" = "${questionOutputUnit.structureChunk.annotations[annoTraitKey]}".` +
            "[0m",
          {
            originalAnswerPseudoSentences: originalAnswerPseudoSentenceObjs.map(
              (obj) => obj.pseudoSentence
            ),
            counterfactualAnswerPseudoSentences:
              counterfactualAnswerPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
            originalQuestionPseudoSentences:
              originalQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
            counterfactualQuestionPseudoSentences:
              counterfactualQuestionPseudoSentenceObjs.map(
                (obj) => obj.pseudoSentence
              ),
          }
        );

        ////////////////////////////////
        //The answer sentences are different but the question sentences are the same, for this counterfaxed anno on this stCh.

        //PDS-Diamond: Do if PDS true.
        //
        //Eg    Q: "With the sheep.",    A: ["Z owcą."]
        //This fxn determined that the Q would be same sentence whether singular or plural,
        //so let's agglomerate the answer array to be ["Z owcą.", "Z owcami."]
        //And the same for "I saw." --> ["Zobaczyłem.", "Zobaczyłam."]
        //

        cfUtils.agglomerateAndRemoveAnnosIfSameResults(
          questionOutputUnit,
          counterfactualTraitValuesForThisTraitKeyOnThisStCh,
          answerSelectedWordsSetsHaveChanged,
          annoTraitKey,
          answerSentenceData,
          counterfactualAnswerOutputArrObjs,
          originalAnnoTraitValue
        );
      }
    }
  );
};

exports.agglomerateAndRemoveAnnosIfSameResults = (
  questionOutputUnit,
  counterfactualTraitValuesForThisTraitKeyOnThisStCh,
  answerSelectedWordsSetsHaveChanged,
  annoTraitKey,
  answerSentenceData,
  counterfactualAnswerOutputArrObjs,
  originalAnnoTraitValue
) => {
  if (questionOutputUnit.structureChunk.dontSpecifyOnThisChunk) {
    let combinedTraitValues = [
      ...questionOutputUnit.structureChunk[annoTraitKey],
      ...counterfactualTraitValuesForThisTraitKeyOnThisStCh,
    ];

    answerSelectedWordsSetsHaveChanged.bool = true;

    answerSentenceData.answerOutputArrays = [
      ...answerSentenceData.answerOutputArrays,
      ...counterfactualAnswerOutputArrObjs.map((obj) => obj.arr),
    ];

    consol.logSpecial3(
      `PDS-Diamond. Agglomerating the answer output arrays and deleting originalAnnoTraitValue "${originalAnnoTraitValue}", and questionOutputUnit.structureChunk[${annoTraitKey}] is now [${combinedTraitValues}]`
    );

    delete questionOutputUnit.structureChunk.annotations[annoTraitKey];
    questionOutputUnit.structureChunk[annoTraitKey] = combinedTraitValues;

    //Last checked 30th July 2022, this if else is never run. counterfactuallyImportantTraitKeys never used.
    // if (!questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys) {
    //   questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys = [
    //     annoTraitKey,
    //   ];
    // } else {
    //   questionOutputUnit.structureChunk.counterfactuallyImportantTraitKeys.push(
    //     annoTraitKey
    //   );
    // }
  }
};
