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

    let allPossibleOutputUnitsArray = otUtils.findMatchingLemmaObjectThenWord(
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
    // console.log("allPossibleOutputUnitsArray", allPossibleOutputUnitsArray);
    // console.log("*");

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossibleOutputUnitsArray ||
      !allPossibleOutputUnitsArray.length
    ) {
      return {
        outputArr: null,
        sentenceFormula,
        sentenceNumber,
        sentenceSymbol,
        errorInSentenceCreation,
      };
    }

    console.log(
      "This HEADCHUNK has been parsed to this output array:",
      allPossibleOutputUnitsArray.map((outputUnit) => outputUnit.selectedWord)
    );

    headOutputUnitArrays.push(allPossibleOutputUnitsArray);

    // let outputUnit = gpUtils.selectRandom(allPossibleOutputUnitsArray);

    // let currentOutputArray = [];
    // grandOutputArray.push(currentOutputArray);

    // allPossibleOutputUnitsArray.forEach((outputUnit, outputUnitIndex) => {
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

  let explodedOutputArraysWithHeads = gpUtils.arrayExploder(
    headOutputUnitArrays
  );

  console.log(
    ">>>>>>>>>>>>>>explodedOutputArraysWithHeads",
    explodedOutputArraysWithHeads.map((arr) =>
      arr.map((item) => item.selectedWord)
    )
  );

  explodedOutputArraysWithHeads.forEach((outputArray) => {
    outputArray.forEach((outputUnit) => {
      lfUtils.updateStructureChunkByTagsAndSelectors(
        outputUnit,
        currentLanguage
      );
      lfUtils.updateStructureChunkByInflections(outputUnit, currentLanguage);

      let headChunk = outputUnit.structureChunk;
      let headId = headChunk.chunkId;

      // focusedOutputArray.push(outputUnit);
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
          let allPossibleOutputUnitsArray = otUtils.findMatchingLemmaObjectThenWord(
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
          // console.log("allPossibleOutputUnitsArray", allPossibleOutputUnitsArray);
          // console.log("*");
          if (
            errorInSentenceCreation.errorMessage ||
            !allPossibleOutputUnitsArray ||
            !allPossibleOutputUnitsArray.length
          ) {
            return {
              outputArr: null,
              sentenceFormula,
              sentenceNumber,
              sentenceSymbol,
              errorInSentenceCreation,
            };
          }
          console.log(
            "This DEPENDENTCHUNK has been parsed to this output array:",
            allPossibleOutputUnitsArray.map(
              (outputUnit) => outputUnit.selectedWord
            )
          );
          // let outputUnit = gpUtils.selectRandom(allPossibleOutputUnitsArray);
          allPossibleOutputUnitsArray.forEach(
            (outputUnit, dependentOutputUnitIndex) => {
              let kennedOutputArray;
              if (dependentOutputUnitIndex === 0) {
                kennedOutputArray = focusedOutputArray;
              } else {
                kennedOutputArray = gpUtils.copyWithoutReference(
                  focusedOutputArray
                );
                grandOutputArray.push(kennedOutputArray);
              }
              lfUtils.updateStructureChunkByTagsAndSelectors(
                outputUnit,
                currentLanguage
              );
              lfUtils.updateStructureChunkByInflections(
                outputUnit,
                currentLanguage
              );
              kennedOutputArray.push(outputUnit);
            }
          );
        });
      }
    });
  });

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

  return;

  //Alphaman say: Remember, we are still old way selectRandom for the other chunk output units. Need change.
  grandOutputArray.forEach((outputArr) => {
    console.log("0000000000000000000000");
    console.log(outputArr);
    console.log("0000000000000000000000");

    //STEP THREE: Select all other words and add to result array.
    let otherChunks = sentenceStructure.filter((structureChunk) => {
      let doneChunkIds = outputArr.map((outputUnit) => {
        return outputUnit.structureChunk.chunkId;
      });

      return !doneChunkIds.includes(structureChunk.chunkId);
    });

    console.log("!");
    console.log("!");
    console.log(otherChunks);
    console.log("!");
    console.log("!");

    //Filter just the ones that aren't chunkId already in
    otherChunks.forEach((otherChunk) => {
      console.log(">>STEP THREE", otherChunk.chunkId);

      let allPossibleOutputUnitsArray = otUtils.findMatchingLemmaObjectThenWord(
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
      // console.log("allPossibleOutputUnitsArray", allPossibleOutputUnitsArray);
      // console.log("*");

      if (
        errorInSentenceCreation.errorMessage ||
        !allPossibleOutputUnitsArray ||
        !allPossibleOutputUnitsArray.length
      ) {
        return {
          outputArr: null,
          sentenceFormula,
          sentenceNumber,
          sentenceSymbol,
          errorInSentenceCreation,
        };
      }

      console.log(
        "This OTHERCHUNK has been parsed to this output array:",
        allPossibleOutputUnitsArray.map((outputUnit) => outputUnit.selectedWord)
      );

      let outputUnit = gpUtils.selectRandom(allPossibleOutputUnitsArray);

      //No need to updateStructureChunkByTagsAndSelectors as these chunks are neither heads nor dependents.
      // lfUtils.updateStructureChunkByTagsAndSelectors(outputUnit, currentLanguage);
      // lfUtils.updateStructureChunkByInflections(outputUnit, currentLanguage);
      outputArr.push(outputUnit);
    });
  });

  let selectedOutputArr = gpUtils.selectRandom(grandOutputArray);

  console.log(
    "qq",
    "£ £ £ £ £ £ £ £ £ £ £ £",
    grandOutputArray.map((outputArray) => {
      return outputArray.map((outputItem) => outputItem.selectedWord);
    }),
    "£ £ £ £ £ £ £ £ £ £ £ £"
  );

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
