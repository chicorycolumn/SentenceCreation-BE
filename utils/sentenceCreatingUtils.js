const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");
const allLangUtils = require("../utils/allLangUtils.js");
const { head } = require("../app.js");

exports.processSentenceFormula = (
  currentLanguage,
  sentenceFormulaId,
  sentenceFormulaSymbol,
  useDummy,
  kumquat,
  questionOutputArr,
  questionLanguage
) => {
  console.log("SC:processSentenceFormula was given these args:", {
    currentLanguage,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy,
    kumquat,
    questionOutputArr,
    questionLanguage,
  });

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  let grandOutputArray = [];

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

  let defaultSentenceFormulaId = "POL-00-50";
  let defaultsentenceFormulaSymbol = "";
  sentenceFormulaSymbol = sentenceFormulaSymbol || defaultsentenceFormulaSymbol;
  let errorInSentenceCreation = { errorMessage: null };

  let words = useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  if (sentenceFormulaId) {
    let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
      sentenceFormulas,
      {
        sentenceFormulaId: sentenceFormulaId,
      },
      true
    );

    sentenceFormula = matchingSentenceFormulaData.value;
    sentenceFormulaId = sentenceFormula.sentenceFormulaId;
    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  } else if (sentenceFormulaSymbol) {
    let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
      sentenceFormulas,
      {
        sentenceFormulaSymbol: sentenceFormulaSymbol,
      },
      true
    );

    sentenceFormula = matchingSentenceFormulaData.value;
    sentenceFormulaId = sentenceFormula.sentenceFormulaId;
    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  } else {
    let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
      sentenceFormulas,
      {
        sentenceFormulaId: defaultSentenceFormulaId,
      },
      true
    );

    sentenceFormula = matchingSentenceFormulaData.value;
    sentenceFormulaId = sentenceFormula.sentenceFormulaId;
    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  }

  //STEP ZERO (B)
  //Prepare chunkIds.
  //Optionally modify the answer's sentenceStructure to fit question's.
  //Preprocess sentence structure.

  let sentenceStructure = sentenceFormula.structure;

  if (kumquat) {
    console.log("@j");
    exports.conformAnswerStructureToQuestionStructure(
      sentenceStructure,
      questionOutputArr,
      words,
      currentLanguage,
      questionLanguage
    );
    console.log("@k");
  }

  console.log("@l sentenceStructure", sentenceStructure);

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

  console.log({ headIds });

  console.log(
    "@p grandOutputArray.length before headChunk processing",
    grandOutputArray.length
  );

  //STEP ONE: Select headwords and add to result array.
  headIds.forEach((headId, headIdIndex) => {
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === headId
    );

    console.log("* SC:processSentenceFormula STEP ONE", headChunk.chunkId);

    //The below functions correctly with regard to:
    //Give kumquat as true, it returns multiple outputUnit objects in allPossOutputUnits_head array.
    //Give kumquat as false, it returns just one outputUnit object in said array.

    let allPossOutputUnits_head = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(headChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      questionLanguage,
      kumquat
    );

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_head ||
      !allPossOutputUnits_head.length
    ) {
      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    // console.log(
    //   "This HEADCHUNK has been parsed to this output array:",
    //   allPossOutputUnits_head.map((outputUnit) => outputUnit.selectedWord)
    // );

    headOutputUnitArrays.push(allPossOutputUnits_head);
  });

  //The below functions correctly with regard to:
  //If kumquat was true, then explodedOutputArraysWithHeads array now contains all possible arrays (of multiplied out head options).
  // ie [ [{chłopiec}, {jabłko}], [{chłopiec}, {jabłka}], [{kobieta}, {jabłko}], [{kobieta}, {jabłka}] ]
  //If kumquat was false, said array now contains just the one array, eg explodedOutputArraysWithHeads = [ [{chłopiec}, {jabłko}] ].
  let explodedOutputArraysWithHeads = gpUtils.copyWithoutReference(
    gpUtils.arrayExploder(headOutputUnitArrays)
  );

  // Now we update the head structure chunks with the details from their respective selectedWords.
  explodedOutputArraysWithHeads.forEach((headOutputArray) => {
    headOutputArray.forEach((headOutputUnit) => {
      lfUtils.updateStructureChunkByAndTagsAndSelectors(
        headOutputUnit,
        currentLanguage
      );
      lfUtils.updateStructureChunkByInflections(
        headOutputUnit,
        currentLanguage
      );

      let headChunk = headOutputUnit.structureChunk;
      let headId = headChunk.chunkId;

      console.log("headChunk", headChunk);

      //STEP TWO (NOW NESTED): Select dependent words and add to result array.
      let dependentChunks = sentenceStructure
        .filter(
          (structureChunk) =>
            typeof structureChunk === "object" &&
            structureChunk.agreeWith === headId
        )
        .map((item) => gpUtils.copyWithoutReference(item));

      if (dependentChunks.length) {
        dependentChunks.forEach((dependentChunk) => {
          console.log(
            "* SC:processSentenceFormula STEP TWO",
            dependentChunk.chunkId
          );

          //Inherit from head chunk to dependent chunks.
          let inflectorKeys =
            refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
              dependentChunk.wordtype
            ];

          let hybridSelectors =
            refObj.lemmaObjectFeatures[currentLanguage].hybridSelectors[
              dependentChunk.wordtype
            ];

          if (hybridSelectors) {
            inflectorKeys = [...inflectorKeys, ...hybridSelectors];
          }

          inflectorKeys.forEach((inflectorKey) => {
            //HARD CHANGE
            if (headChunk[inflectorKey]) {
              dependentChunk[inflectorKey] = gpUtils.copyWithoutReference(
                headChunk[inflectorKey]
              );
            }
          });

          console.log("dependentChunk", dependentChunk);
          // throw "Cease.";

          let allPossOutputUnits_dependent = otUtils.findMatchingLemmaObjectThenWord(
            gpUtils.copyWithoutReference(dependentChunk),
            words,
            errorInSentenceCreation,
            currentLanguage,
            questionLanguage,
            kumquat
          );

          if (
            errorInSentenceCreation.errorMessage ||
            !allPossOutputUnits_dependent ||
            !allPossOutputUnits_dependent.length
          ) {
            return {
              outputArr: null,
              sentenceFormula,
              sentenceFormulaId,
              sentenceFormulaSymbol,
              errorInSentenceCreation,
            };
          }

          //The above functions correctly with regard to:
          //Give kumquat as true, it returns multiple outputUnit objects in allPossOutputUnits_dependent array.
          //Give kumquat as false, it returns just one outputUnit object in said array.

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
        });
      }
    });
  });

  explodedOutputArraysWithHeads.forEach((arr) => {
    let result = gpUtils.explodeOutputArraysByHeadsAndDependents(arr);
    grandOutputArray.push(...result);
  });

  //It all functions correctly up til here at least.
  //If kumquat was false, then grandOutputArray = [ [ 'kobieta', 'ma', 'jabłko', 'czerwone' ] ]
  //If kumquat was true, then grandOutputArray =  [
  //                                                [ 'kobieta', 'ma', 'cebulę', 'niebieską' ],
  //                                                [ 'kobieta', 'ma', 'cebulę', 'czerwoną' ],
  //                                                [ 'kobieta', 'ma', 'jabłko', 'niebieskie' ],
  //                                                [ 'kobieta', 'ma', 'jabłko', 'czerwone' ],
  //                                                [ 'chłopiec', 'ma', 'cebulę', 'niebieską' ],
  //                                                [ 'chłopiec', 'ma', 'cebulę', 'czerwoną' ],
  //                                                [ 'chłopiec', 'ma', 'jabłko', 'niebieskie' ],
  //                                                [ 'chłopiec', 'ma', 'jabłko', 'czerwone' ]
  //                                             ]

  // console.log("grandOutputArray", grandOutputArray.map((x) => x.map((y) => y.selectedWord)));

  console.log(
    "@p grandOutputArray.length after head+dep processing",
    grandOutputArray.length
  );

  let otherChunkIds = [];

  if (grandOutputArray.length) {
    grandOutputArray.forEach((outputArr, index) => {
      let currentOtherChunkIds = sentenceStructure
        .filter((structureChunk) => {
          let doneChunkIds = outputArr.map((outputUnit) => {
            return outputUnit.structureChunk.chunkId;
          });

          return !doneChunkIds.includes(structureChunk.chunkId);
        })
        .map((chunk) => chunk.chunkId);

      if (index === 0) {
        otherChunkIds = currentOtherChunkIds;
      } else {
        if (
          !gpUtils.areTwoFlatArraysEqual(otherChunkIds, currentOtherChunkIds)
        ) {
          throw "Error. There is a difference, in the grandOutputArray, between which chunks have or haven't been used yet. It should be the case that every array in the grand one have the same head ids and dep ids used, and thus the same other ids yet to be used. But this was not the case and so I have halted the process.";
        }
      }
    });
  } else {
    otherChunkIds = sentenceStructure.map(
      (structureChunk) => structureChunk.chunkId
    );
  }

  // console.log("@o", { otherChunkIds });

  let grandAllPossOutputUnits_other = [];

  otherChunkIds.forEach((otherChunkId) => {
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

    //This allPossOutputUnits_other has four duplicate items, just from one pass.
    console.log("@q", { allPossOutputUnits_other });

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_other ||
      !allPossOutputUnits_other.length
    ) {
      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    // console.log(
    //   "This OTHERCHUNK has been parsed to this output array:",
    //   allPossOutputUnits_other.map((outputUnit) => outputUnit.selectedWord)
    // );

    //The above functions correctly.
    //If kumquat is true, then allPossOutputUnits_other is array of outputUnit objects, while if false, array of just one said object.

    grandAllPossOutputUnits_other.push(allPossOutputUnits_other);
  });

  if (grandAllPossOutputUnits_other.length) {
    grandAllPossOutputUnits_other = gpUtils.arrayExploder(
      grandAllPossOutputUnits_other
    );

    grandOutputArray = gpUtils.combineAndExplodeTwoSuperArrays(
      grandOutputArray,
      grandAllPossOutputUnits_other
    );
  }

  console.log(
    "@p grandOutputArray.length after all otherChunk processing",
    grandOutputArray.length
  );

  //Epsilon: On test #pal05-03c the grandOutputArray right here
  //has four outputArrays, each one the same.
  //This generates a final answerSentenceArray of ["Pisz€", "Pisz€", "Pisz€", "Pisz€"]
  //when that array should only be ["Pisz€"].

  //Everything has passed inspection in this whole fxn, as of 11/12/20.
  //If kumquat is true, then grandOutputArray is array of all possible arrays of outputUnit combinations.
  //And if kumquat false, then grandOutputArray is array of just one said possible array.

  console.log("grandOutputArray.length", grandOutputArray.length);
  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
    console.log("+");
    console.log("+++");
    console.log("++++++");
    console.log("outputArray.length", outputArray.length);
    console.log("++++++");
    console.log("+++");
    console.log("+");

    outputArray.forEach((outputUnit) => {
      if (outputUnit.structureChunk.wordtype === "fixed") {
        return;
      }

      lfUtils.updateStructureChunkByAndTagsAndSelectors(
        outputUnit,
        currentLanguage
      );
      lfUtils.updateStructureChunkByInflections(outputUnit, currentLanguage);
    });

    console.log(
      "These structureChunks in these outputUnits should be updated now."
    );
    console.log({ outputArrayIndex });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~v");
    outputArray.forEach((outputUnit) => {
      console.log(outputUnit);
    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^");
  });

  return {
    arrayOfOutputArrays: grandOutputArray,
    sentenceFormula,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    errorInSentenceCreation,
  };
};

exports.giveFinalSentences = (
  arrayOfOutputArrays,
  sentenceFormula,
  errorInSentenceCreation,
  kumquat
) => {
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

  if (!kumquat && arrayOfOutputArrays.length !== 1) {
    console.log("arrayOfOutputArrays", arrayOfOutputArrays);
    throw "That's strange. We are in Question Mode, so SC:giveFinalSentences expected to be given arrayOfOutputArrays with length of 1, but it didn't.";
    let x = gpUtils.selectRandom(arrayOfOutputArrays);
  }

  let finalSentenceArr = [];

  if (kumquat) {
    arrayOfOutputArrays.forEach((outputArr) => {
      let finalSentences = exports.buildSentenceString(
        outputArr,
        sentenceFormula,
        kumquat
      );

      finalSentences.forEach((finalSentence) => {
        finalSentenceArr.push(finalSentence);
      });
    });
  } else {
    let outputArr = gpUtils.selectRandom(arrayOfOutputArrays);

    let finalSentences = exports.buildSentenceString(
      outputArr,
      sentenceFormula,
      kumquat
    );

    finalSentences.forEach((finalSentence) => {
      finalSentenceArr.push(finalSentence);
    });
  }

  let answerResponseObj = {
    finalSentenceArr,
  };

  return answerResponseObj;
};

exports.buildSentenceString = (unorderedArr, sentenceFormula, kumquat) => {
  let arrayOfSelectedWordsArrays = [];
  let producedSentences = [];

  if (!sentenceFormula.primaryOrders || !sentenceFormula.primaryOrders.length) {
    let selectedWordsArr = unorderedArr.map((obj) => obj.selectedWord);
    arrayOfSelectedWordsArrays.push(selectedWordsArr);
  } else {
    if (kumquat) {
      let allOrders = [];
      if (sentenceFormula.primaryOrders) {
        allOrders = [...allOrders, ...sentenceFormula.primaryOrders];
      }
      if (sentenceFormula.additionalOrders) {
        allOrders = [...allOrders, ...sentenceFormula.additionalOrders];
      }

      allOrders.forEach((order) => {
        let orderedArr = [];
        order.forEach((chunkId) => {
          orderedArr.push(
            unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
          );
        });

        let selectedWordsArr = orderedArr.map((obj) => obj.selectedWord);
        arrayOfSelectedWordsArrays.push(selectedWordsArr);
      });
    } else {
      let order = gpUtils.selectRandom(sentenceFormula.primaryOrders);

      let orderedArr = [];
      order.forEach((chunkId) => {
        orderedArr.push(
          unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
        );
      });

      let selectedWordsArr = orderedArr.map((obj) => obj.selectedWord);
      arrayOfSelectedWordsArrays.push(selectedWordsArr);
    }
  }

  arrayOfSelectedWordsArrays.forEach((selectedWordsArr) => {
    let producedSentence = gpUtils.capitaliseFirst(
      selectedWordsArr.join(" ") + "."
    );
    producedSentences.push(producedSentence);
  });

  return producedSentences;
};

exports.conformAnswerStructureToQuestionStructure = (
  sentenceStructure,
  questionOutputArr,
  words,
  answerLanguage,
  questionLanguage
) => {
  console.log("@@conformAnswerStructureToQuestionStructure start");
  console.log("questionOutputArr", questionOutputArr);
  // throw "Oi";

  questionOutputArr.forEach((questionOutputArrItem) => {
    let answerStructureChunk = sentenceStructure.find((structureChunk) => {
      return (
        structureChunk.chunkId === questionOutputArrItem.structureChunk.chunkId
      );
    });

    if (!answerStructureChunk) {
      return;
    }

    console.log(
      "-----------------questionOutputArrItem",
      questionOutputArrItem
    );
    console.log("-----------------answerStructureChunk", answerStructureChunk);

    if (questionOutputArrItem.structureChunk.wordtype === "fixed") {
      return;
    }

    let questionSelectedLemmaObject = questionOutputArrItem.selectedLemmaObject;
    let questionSelectedWord = questionOutputArrItem.selectedWord;
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    console.log(
      "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$questionStructureChunk",
      questionStructureChunk
    );

    /**
     * This ENG questionStructureChunk has not updated, even though it decanted itself into "past continuous". 
     * 
     * {
  chunkId: 'ver-1',
  wordtype: 'verb',
  andTags: [],
  tenseDescription: [ 'past continuous', 'future simple', 'future perfect' ],
  person: [ '1per' ],
  number: [ 'singular' ],
  form: [ 'verbal' ]
}
     */

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
    ].allowableTransfersFromQuestionStructure[answerStructureChunk.wordtype] //Alphaman say for tantum plurales, make Number blank (all possible) in english noun chunk
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

              let shouldHardChange = true;

              if (shouldHardChange) {
                //HARD CHANGE
                answerStructureChunk["tenseDescription"] = [
                  // ...answerStructureChunk["tenseDescription"],
                  ...translatedTenseDescArr,
                ];
              } else {
                //SOFT CHANGE
                answerStructureChunk["tenseDescription"] = [
                  ...answerStructureChunk["tenseDescription"],
                  ...translatedTenseDescArr,
                ];
              }
            });
          } else {
            answerStructureChunk[inflectorKey] =
              //Epsilon say should be this:
              // gpUtils.copyWithoutReference(questionStructureChunk[inflectorKey]);
              questionStructureChunk[inflectorKey];
          }
          console.log(
            "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$answerStructureChunk",
            answerStructureChunk
          );
        }
      });
  });
};

exports.removeDuplicatesFromResponseObject = (respObj) => {
  let trimmedFinalSentenceArr = [];

  respObj.finalSentenceArr.forEach((finalSentence) => {
    if (!trimmedFinalSentenceArr.includes(finalSentence)) {
      trimmedFinalSentenceArr.push(finalSentence);
    }
  });

  respObj.finalSentenceArr = trimmedFinalSentenceArr;
};
