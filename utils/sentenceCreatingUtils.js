const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.processSentenceFormula = (
  currentLanguage,
  sentenceNumber,
  sentenceSymbol,
  useDummy,
  kumquat,
  questionOutputArr,
  questionLanguage
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  let grandOutputArray = [];

  // console.log("processSentenceFormula fxn was given these args", {
  //   currentLanguage,
  //   sentenceNumber,
  //   sentenceSymbol,
  //   useDummy,
  // });

  //STEP ZERO (A): Get necessary source materials.
  const { wordsBank } = require(`../source/${currentLanguage}/words.js`);
  const {
    dummyWordsBank,
  } = require(`../source/${currentLanguage}/dummy/dummyWords.js`);
  const {
    sentenceFormulasBank,
  } = require(`../source/${currentLanguage}/sentenceFormulas.js`);
  const {
    dummySentenceFormulasBank,
  } = require(`../source/${currentLanguage}/dummy/dummySentenceFormulas.js`);

  let defaultSentenceNumber = 50;
  let defaultSentenceSymbol = "";
  sentenceSymbol = sentenceSymbol || defaultSentenceSymbol;
  let errorInSentenceCreation = { errorMessage: null };

  let words = useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  if (sentenceNumber) {
    sentenceFormula = sentenceFormulas[sentenceNumber];
    sentenceSymbol = sentenceFormula.symbol;
  } else if (sentenceSymbol) {
    let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
      sentenceFormulas,
      {
        symbol: sentenceSymbol,
      },
      true
    );

    sentenceFormula = matchingSentenceFormulaData.value;
    sentenceNumber = matchingSentenceFormulaData.key;
  } else {
    sentenceFormula = sentenceFormulas[defaultSentenceNumber];
    sentenceSymbol = sentenceFormula.symbol;
  }

  //STEP ZERO (B)
  //Prepare chunkIds.
  //Optionally modify the answer's sentenceStructure to fit question's.
  //Preprocess sentence structure.

  let sentenceStructure = sentenceFormula.structure;

  if (kumquat && false) {
    //Betaman say remove this when moving to pal06 tests.
    exports.conformAnswerStructureToQuestionStructure(
      sentenceStructure,
      questionOutputArr,
      words,
      currentLanguage,
      questionLanguage
    );
  }

  allLangUtils.preprocessStructureChunks(sentenceStructure);
  langUtils.preprocessStructureChunks(sentenceStructure);

  let headIds = Array.from(
    new Set(
      sentenceStructure
        .map((chunk) => {
          if (typeof chunk === "object" && chunk.agreeWith) {
            return chunk.agreeWith;
          }
        })
        .filter((item) => item)
    )
  );

  let headOutputUnitArrays = [];

  //STEP ONE: Select headwords and add to result array.
  headIds.forEach((headId, headIdIndex) => {
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === headId
    );

    console.log(">>STEP ONE", headChunk.chunkId);

    let allPossOutputUnits_head = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(headChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      questionLanguage,
      kumquat
    );

    // console.log("**");
    // console.log("***********");
    // console.log("**************************");
    // console.log("headChunk", headChunk);
    // console.log("allPossOutputUnits_head", allPossOutputUnits_head);
    // console.log("*");

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_head ||
      !allPossOutputUnits_head.length
    ) {
      return {
        outputArr: null,
        sentenceFormula,
        sentenceNumber,
        sentenceSymbol,
        errorInSentenceCreation,
      };
    }

    // console.log(
    //   "This HEADCHUNK has been parsed to this output array:",
    //   allPossOutputUnits_head.map((outputUnit) => outputUnit.selectedWord)
    // );

    headOutputUnitArrays.push(allPossOutputUnits_head);

    // let outputUnit = gpUtils.selectRandom(allPossOutputUnits_head);

    // let currentOutputArray = [];
    // grandOutputArray.push(currentOutputArray);

    // allPossOutputUnits_head.forEach((outputUnit, outputUnitIndex) => {
    //   //NOTE: headIdIndex =       0: nou-1 (person)         1: nou-2 (food)          2: nou-3 (utensil)
    //   //NOTE: outputUnitIndex =   0: chłopiec, 1: kobieta    0: jabłko, 1: cebula     0: widelec, 1: łyz.ka
    //   let focusedOutputArray;
    //   if (headIdIndex === 0) {
    //     if (outputUnitIndex === 0) {
    //       focusedOutputArray = latestOutputArray;
    //       grandOutputArray.push(focusedOutputArray);
    //     } else if (outputUnitIndex > 0) {
    //       focusedOutputArray = gpUtils.copyWithoutReference(latestOutputArray);
    //       latestOutputArray = focusedOutputArray;
    //       grandOutputArray.push(focusedOutputArray);
    //     }
    //   } else if (headIdIndex > 0) {
    //     if (outputUnitIndex === 0) {
    //       focusedOutputArray = latestOutputArray;
    //     } else if (outputUnitIndex > 0) {
    //       focusedOutputArray = gpUtils.copyWithoutReference(latestOutputArray);
    //       latestOutputArray = focusedOutputArray;
    //       grandOutputArray.push(focusedOutputArray);
    //     }
    //   }
    //   console.log("BBB", { headIdIndex, outputUnitIndex, focusedOutputArray });

    // });
  });

  // console.log(">>>>>>>>>>>>>>headOutputUnitArrays", headOutputUnitArrays);

  let explodedOutputArraysWithHeads = gpUtils.copyWithoutReference(
    gpUtils.arrayExploder(headOutputUnitArrays)
  );

  // console.log(
  //   ">>>>>>>>>>>>>>explodedOutputArraysWithHeads",
  //   explodedOutputArraysWithHeads.map((arr) =>
  //     arr.map((item) => item.selectedWord)
  //   )
  // );

  explodedOutputArraysWithHeads.forEach((headOutputArray) => {
    headOutputArray.forEach((headOutputUnit) => {
      lfUtils.updateStructureChunkByTagsAndSelectors(
        headOutputUnit,
        currentLanguage
      );
      lfUtils.updateStructureChunkByInflections(
        headOutputUnit,
        currentLanguage
      );

      let headChunk = headOutputUnit.structureChunk;
      let headId = headChunk.chunkId;

      // focusedOutputArray.push(headOutputUnit);
      //STEP TWO NOW NESTED: Select dependent words and add to result array.
      let dependentChunks = sentenceStructure
        .filter(
          (structureChunk) =>
            typeof structureChunk === "object" &&
            structureChunk.agreeWith === headId
        )
        .map((item) => gpUtils.copyWithoutReference(item));

      if (dependentChunks.length) {
        dependentChunks.forEach((dependentChunk) => {
          console.log(">>STEP TWO", dependentChunk.chunkId);

          //Inherit from head chunk to dependent chunks.
          refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
            dependentChunk.wordtype
          ].forEach((inflectorKey) => {
            if (headChunk[inflectorKey]) {
              //Gammaman say should actually be this.
              // dependentChunk[inflectorKey] = gpUtils.copyWithoutReference(headChunk[inflectorKey]);
              dependentChunk[inflectorKey] = headChunk[inflectorKey];
            }
          });
          let allPossOutputUnits_dependent = otUtils.findMatchingLemmaObjectThenWord(
            gpUtils.copyWithoutReference(dependentChunk),
            words,
            errorInSentenceCreation,
            currentLanguage,
            questionLanguage,
            kumquat
          );
          // console.log("**");
          // console.log("***********");
          // console.log("**************************");
          // console.log("dependentChunk", dependentChunk);
          // console.log("allPossOutputUnits_dependent", allPossOutputUnits_dependent);
          // console.log("*");
          if (
            errorInSentenceCreation.errorMessage ||
            !allPossOutputUnits_dependent ||
            !allPossOutputUnits_dependent.length
          ) {
            return {
              outputArr: null,
              sentenceFormula,
              sentenceNumber,
              sentenceSymbol,
              errorInSentenceCreation,
            };
          }

          if ("dommy, delete this later") {
            let dommyUnit = gpUtils.copyWithoutReference(
              allPossOutputUnits_dependent[0]
            );
            dommyUnit.selectedWord = "moo" + dommyUnit.selectedWord;
            allPossOutputUnits_dependent.push(dommyUnit);
          }

          // console.log(
          //   "For this head output unit:",
          //   headOutputUnit,
          //   "This DEPENDENTCHUNK has been parsed to this output array:",
          //   allPossOutputUnits_dependent
          //   // .map(
          //   //   (outputUnit) => outputUnit.selectedWord
          //   // )
          // );

          if (!headOutputUnit.possibleDependentOutputArrays) {
            headOutputUnit.possibleDependentOutputArrays = [];
          }

          headOutputUnit.possibleDependentOutputArrays.push(
            allPossOutputUnits_dependent
          );

          // console.log(
          //   "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          // );
          // console.log(
          //   `::: ${dependentChunk.chunkId} depending on ${headId} :::`
          // );
          // console.log(
          //   "headOutputUnit.possibleDependentOutputArrays",
          //   headOutputUnit.possibleDependentOutputArrays.map((x) =>
          //     x.map((y) => y.selectedWord)
          //   )
          // );
          // console.log(
          //   "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
          // );

          //////////////////////////////////////////////

          // let outputUnit = gpUtils.selectRandom(allPossOutputUnits_dependent);
          // allPossOutputUnits_dependent.forEach(
          //   (outputUnit, dependentOutputUnitIndex) => {
          //     let kennedOutputArray;
          //     if (dependentOutputUnitIndex === 0) {
          //       kennedOutputArray = focusedOutputArray;
          //     } else {
          //       kennedOutputArray = gpUtils.copyWithoutReference(
          //         focusedOutputArray
          //       );
          //       grandOutputArray.push(kennedOutputArray);
          //     }
          //     lfUtils.updateStructureChunkByTagsAndSelectors(
          //       outputUnit,
          //       currentLanguage
          //     );
          //     lfUtils.updateStructureChunkByInflections(
          //       outputUnit,
          //       currentLanguage
          //     );
          //     kennedOutputArray.push(outputUnit);
          //   }
          // );
        });
      }
    });
  });

  // return;

  // console.log("%");
  // console.log("%%");
  // console.log("%%%");
  // // console.log("explodedOutputArraysWithHeads", explodedOutputArraysWithHeads);
  // explodedOutputArraysWithHeads.forEach((arr) => {
  //   console.log("--------------------------------");
  //   arr.forEach((item) => {
  //     console.log(item);
  //   });
  //   console.log("--------------------------------");
  // });
  // console.log("%%%");
  // console.log("%%");
  // console.log("%");

  explodedOutputArraysWithHeads.forEach((arr) => {
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~");
    // console.log("arr:", arr);
    // arr.forEach((unit) => {
    //   console.log(
    //     "unit.possibleDependentOutputArrays:",
    //     unit.possibleDependentOutputArrays
    //   );
    // });
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~");
    // return;

    let result = gpUtils.explodeOutputArraysByHeadsAndDependents(arr);

    // console.log("**************************************************");
    // console.log("result from explodedOutputArraysWithHeads", result);
    // console.log("**************************************************");

    grandOutputArray.push(...result);
  });

  console.log(
    "grandOutputArray",
    grandOutputArray.map((x) => x.map((y) => y.selectedWord))
  );

  // grandOutputArray.slice(0, 3).forEach((x) => {
  //   console.log("##############");
  //   // console.log(x.map((y) => y.selectedWord));
  //   console.log(x);
  //   console.log("##############");
  // });

  // return;

  // console.log("grandOutputArray:", grandOutputArray, "www");

  /**
   * [
   *  ["chłopiec", "jabłko"]
   *  ["chłopiec", "cebula"]
   *  ["kobieta", "jabłko"]
   *  ["kobeta", "cebula"]
   *
   *  ["chłopcy", "jabłka"]
   *  ["chłopcy", "cebule"]
   *  ["kobiety", "jabłka"]
   *  ["kobety", "cebule"]
   * ]
   */

  // return;

  let otherChunksRecord = [];

  grandOutputArray.forEach((outputArr, index) => {
    let otherChunks = sentenceStructure
      .filter((structureChunk) => {
        let doneChunkIds = outputArr.map((outputUnit) => {
          return outputUnit.structureChunk.chunkId;
        });

        return !doneChunkIds.includes(structureChunk.chunkId);
      })
      .map((chunk) => chunk.chunkId);

    if (index === 0) {
      otherChunksRecord = otherChunks;
    } else {
      if (!gpUtils.areTwoFlatArraysEqual(otherChunksRecord, otherChunks)) {
        throw "Error. There is a difference, in the grandOutputArray, between which chunks have or haven't been used yet. It should be the case that every array in the grand one have the same head ids and dep ids used, and thus the same other ids yet to be used. But this was not the case and so I have halted the process.";
      }
    }
  });

  console.log("}}}}}}}}}", otherChunksRecord);

  // return;

  let grandAllPossOutputUnits_other = [];

  //Alphaman say: Remember, we are still old way selectRandom for the other chunk output units. Need change.
  otherChunksRecord.forEach((otherChunkId) => {
    console.log(">>STEP THREE", otherChunkId);

    // console.log("sentenceStructure", sentenceStructure);

    let otherChunk = sentenceStructure.find((structureChunk) => {
      return structureChunk.chunkId === otherChunkId;
    });

    let allPossOutputUnits_other = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(otherChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      questionLanguage,
      kumquat
    );

    // console.log("**");
    // console.log("***********");
    // console.log("**************************");
    // console.log("otherChunk", otherChunk);
    // console.log("allPossOutputUnits_other", allPossOutputUnits_other);
    // console.log("*");

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_other ||
      !allPossOutputUnits_other.length
    ) {
      return {
        outputArr: null,
        sentenceFormula,
        sentenceNumber,
        sentenceSymbol,
        errorInSentenceCreation,
      };
    }

    if ("dommy, delete this later") {
      let dommyUnit = gpUtils.copyWithoutReference(allPossOutputUnits_other[0]);
      dommyUnit.selectedWord = "moo" + dommyUnit.selectedWord;
      allPossOutputUnits_other.push(dommyUnit);
    }

    console.log(
      "This OTHERCHUNK has been parsed to this output array:",
      allPossOutputUnits_other.map((outputUnit) => outputUnit.selectedWord)
    );

    grandAllPossOutputUnits_other.push(allPossOutputUnits_other);

    // let outputUnit = gpUtils.selectRandom(allPossOutputUnits_other);

    //No need to updateStructureChunkByTagsAndSelectors as these chunks are neither heads nor dependents.
    // lfUtils.updateStructureChunkByTagsAndSelectors(outputUnit, currentLanguage);
    // lfUtils.updateStructureChunkByInflections(outputUnit, currentLanguage);
    // outputArr.push(outputUnit);
  });

  grandAllPossOutputUnits_other = gpUtils.arrayExploder(
    grandAllPossOutputUnits_other
  );

  grandOutputArray = gpUtils.combineAndExplodeTwoSuperArrays(
    grandOutputArray,
    grandAllPossOutputUnits_other
  );

  console.log(
    "qq",
    "£ £ £ £ £ £ £ £ £ £ £ £",
    grandOutputArray.map((outputArray) => {
      return outputArray.map((outputItem) => outputItem.selectedWord);
    }),
    "£ £ £ £ £ £ £ £ £ £ £ £"
  );

  // return;
  let selectedOutputArr = gpUtils.selectRandom(grandOutputArray);

  return {
    outputArr: selectedOutputArr,
    sentenceFormula,
    sentenceNumber,
    sentenceSymbol,
    errorInSentenceCreation,
  };
};

exports.formatFinalSentence = (
  outputArr,
  sentenceFormula,
  errorInSentenceCreation,
  kumquat,
  questionLanguage
) => {
  console.log("SC:formatFinalSentence fxn was given these arguments:", {
    outputArr,
    sentenceFormula,
    errorInSentenceCreation,
    kumquat,
    questionLanguage,
  });

  if (errorInSentenceCreation.errorMessage) {
    let errorMessage = {
      errorInSentenceCreation: errorInSentenceCreation.errorMessage,
    };

    return {
      message: "No sentence could be created from the specifications.",
      finalSentence: null,
      errorMessage,
    };
  }

  if (kumquat) {
    // console.log(
    //   "formatFinalSentence fxn says THIS IS UNFINISHED. we should go through every permutation and make a sentence for each one."
    // );
    // console.log("outputArr", outputArr);
    // console.log("sentenceFormula", sentenceFormula);

    let finalSentence = exports.buildSentenceFromArray(
      outputArr,
      sentenceFormula
    );

    let responseObj = {
      finalSentence,
    };

    return responseObj;
  } else {
    let finalSentence = exports.buildSentenceFromArray(
      outputArr,
      sentenceFormula
    );

    let responseObj = {
      finalSentence,
    };

    return responseObj;
  }
};

exports.buildSentenceFromArray = (unorderedArr, sentenceFormula) => {
  console.log("SC:buildSentenceFromArray fxn was given these arguments:", {
    unorderedArr,
    sentenceFormula,
  });

  let selectedWords = [];

  if (sentenceFormula.primaryOrders) {
    let order =
      sentenceFormula.primaryOrders.length === 1
        ? sentenceFormula.primaryOrders[0]
        : gpUtils.selectRandom(sentenceFormula.primaryOrders);

    let orderedArr = [];
    order.forEach((chunkId) => {
      orderedArr.push(
        unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
      );
    });

    selectedWords = orderedArr.map((obj) => obj.selectedWord);
  } else {
    selectedWords = unorderedArr.map((obj) => obj.selectedWord);
  }

  let producedSentence = gpUtils.capitaliseFirst(selectedWords.join(" ") + ".");
  return producedSentence;
};

exports.conformAnswerStructureToQuestionStructure = (
  sentenceStructure,
  questionOutputArr,
  words,
  answerLanguage,
  questionLanguage
) => {
  // console.log(
  //   "conformAnswerStructureToQuestionStructure fxn, ENG-sentenceStructure",
  //   sentenceStructure
  // );
  // console.log(
  //   "conformAnswerStructureToQuestionStructure fxn, POL-questionOutputArr",
  //   questionOutputArr
  // );

  questionOutputArr.forEach((questionOutputArrItem) => {
    let answerStructureChunk = sentenceStructure.find((structureChunk) => {
      return (
        structureChunk.chunkId === questionOutputArrItem.structureChunk.chunkId
      );
    });

    if (!answerStructureChunk) {
      return;
    }

    let questionSelectedLemmaObject = questionOutputArrItem.selectedLemmaObject;
    let questionSelectedWord = questionOutputArrItem.selectedWord;
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    // console.log(
    //   "So, the Polish lemma chosen was",
    //   questionSelectedLemmaObject.lemma
    // );

    let lemmasToSearch = questionSelectedLemmaObject.translations.ENG;

    // console.log(
    //   "Going to search for all ENG lobjs with these lemmas:",
    //   lemmasToSearch
    // );

    let source = words[gpUtils.giveSetKey(answerStructureChunk.wordtype)];

    let matchingAnswerLemmaObjects = source.filter((lObj) => {
      return lemmasToSearch.includes(lObj.lemma);
    });

    matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
      (answerLemmaObject) => {
        return gpUtils.areTwoFlatArraysEqual(
          questionSelectedLemmaObject.tags,
          answerLemmaObject.tags
        );
      }
    );

    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    // console.log("I found these matches:", answerStructureChunk.specificIds);
    // console.log("answerStructureChunk", answerStructureChunk);

    refObj.lemmaObjectFeatures[
      answerLanguage
    ].inflectionChains.allowableTransfersFromQuestionStructure[
      answerStructureChunk.wordtype
    ] //Omegaman say for tantum plurales, make Number blank (all possible) in english noun chunk
      .forEach((inflectorKey) => {
        if (questionStructureChunk[inflectorKey]) {
          if (inflectorKey === "tenseDescription") {
            answerStructureChunk["tenseDescription"] = [];

            questionStructureChunk["tenseDescription"].forEach((tenseDesc) => {
              let translatedTenseDescArr = refObj.getTranslatedTenseDescription(
                tenseDesc,
                questionLanguage,
                answerLanguage
              );

              answerStructureChunk["tenseDescription"] = [
                ...answerStructureChunk["tenseDescription"],
                ...translatedTenseDescArr,
              ];
            });
          } else {
            answerStructureChunk[inflectorKey] =
              questionStructureChunk[inflectorKey];
          }
        }
      });

    // console.log(
    //   "answerStructureChunk after the feature transfer",
    //   answerStructureChunk
    // );
  });
};
