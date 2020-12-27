const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.processSentenceFormula = (
  currentLanguage,
  sentenceFormulaId,
  sentenceFormulaSymbol,
  useDummy,
  kumquat,
  questionOutputArr,
  questionLanguage
) => {
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
    if (false) {
      console.log("+++++++++++++++++++++++++++++++++++fff");
      console.log("-----------------------------------");
      console.log("+++++++++++++++++++++++++++++++++++");
      console.log(
        "|",
        "sentenceStructure BEFORE QA conform",
        sentenceStructure
      );

      console.log(
        "questionOutputArr.length ought to be 1",
        questionOutputArr.length
      );
      console.log(
        "questionOutputArr[0] which will be used to update the sentenceStructure",
        questionOutputArr[0]
      );
      console.log("+++++++++++++++++++++++++++++++++++");
      console.log("-----------------------------------");
      console.log("+++++++++++++++++++++++++++++++++++");
    }

    exports.conformAnswerStructureToQuestionStructure(
      sentenceStructure,
      questionOutputArr,
      words,
      currentLanguage,
      questionLanguage
    );

    console.log("sentenceStructure AFTER QA conform", sentenceStructure);
  }

  // console.log("----");
  // console.log("--------");
  // console.log("sentenceStructure BEFORE preprocessing", sentenceStructure);
  // console.log("--------");
  // console.log("----");

  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);
  langUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

  // console.log("~~~~");
  // console.log("~~~~~~~~");
  // console.log("sentenceStructure AFTER preprocessing", sentenceStructure);
  // console.log("~~~~~~~~");
  // console.log("~~~~");

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

    console.log("~~ SC:processSentenceFormula STEP ONE", headChunk);

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
      console.log("smang it");
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

      // console.log("headChunk", headChunk);

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
            "~~ SC:processSentenceFormula STEP TWO",
            dependentChunk.chunkId
          );

          //Inherit from head chunk to dependent chunks.

          exports.inheritFromHeadToDependentChunk(
            currentLanguage,
            headChunk,
            dependentChunk
          );

          // console.log("dependentChunk", dependentChunk);

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

  let otherChunkIds = [];

  if (grandOutputArray.length) {
    grandOutputArray.forEach((outputArr, index) => {
      let currentOtherChunkIds = sentenceStructure
        .filter((structureChunk) => {
          let doneChunkIds = outputArr.map(
            (outputUnit) => outputUnit.structureChunk.chunkId
          );

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

  //Everything has passed inspection in this whole fxn, as of 11/12/20.
  //If kumquat is true, then grandOutputArray is array of all possible arrays of outputUnit combinations.
  //And if kumquat false, then grandOutputArray is array of just one said possible array.

  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
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
  kumquat,
  currentLanguage,
  answerLanguage,
  hideClarifiers
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
        kumquat,
        currentLanguage,
        null,
        hideClarifiers
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
      kumquat,
      currentLanguage,
      answerLanguage,
      hideClarifiers
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

exports.buildSentenceString = (
  unorderedArr,
  sentenceFormula,
  kumquat,
  currentLanguage,
  answerLanguage,
  hideClarifiers
) => {
  let arrayOfSelectedWordsArrays = [];
  let producedSentences = [];

  if (!kumquat && !hideClarifiers) {
    otUtils.addClarifiers(unorderedArr, currentLanguage, answerLanguage);
  }

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
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  questionOutputArr.forEach((questionOutputArrItem) => {
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    if (questionStructureChunk.wordtype === "fixed") {
      return;
    }

    let questionSelectedLemmaObject = questionOutputArrItem.selectedLemmaObject;
    let questionSelectedWord = questionOutputArrItem.selectedWord;

    let answerStructureChunk = sentenceStructure.find((structureChunk) => {
      return structureChunk.chunkId === questionStructureChunk.chunkId;
    });

    if (!answerStructureChunk) {
      console.log("Ah shucks");
      return;
    }

    // console.log("***********");
    // console.log("conformAtoQ fxn: questionStructureChunk", questionStructureChunk);
    // console.log("conformAtoQ fxn: answerStructureChunk", answerStructureChunk);
    // console.log("***********");

    // console.log(
    //   "So, the Polish lemma chosen was",
    //   questionSelectedLemmaObject.lemma
    // );

    let lemmasToSearch =
      questionSelectedLemmaObject.translations[answerLanguage];

    // console.log("qqq matchingAnswerLemmaObjects", matchingAnswerLemmaObjects);

    // console.log(
    //   "Going to search for all ENG lobjs with these lemmas:",
    //   lemmasToSearch
    // );

    let source = words[gpUtils.giveSetKey(answerStructureChunk.wordtype)];
    lfUtils.adjustImOnlyLemmaObjects(source);

    let matchingAnswerLemmaObjects = source.filter(
      (lObj) =>
        lemmasToSearch.includes(lObj.lemma) &&
        //Sorts out translation of multipleWordtype allohoms.
        gpUtils.getWordtypeFromLemmaObject(lObj) ===
          questionStructureChunk.wordtype
    );

    //Should this really be for every single tags to match, otherwise it won't match them?
    matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
      (answerLemmaObject) =>
        gpUtils.areTwoFlatArraysEqual(
          questionSelectedLemmaObject.tags,
          answerLemmaObject.tags
        )
    );

    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    // console.log("I found these matches:", answerStructureChunk.specificIds);
    // console.log("answerStructureChunk", answerStructureChunk);

    refObj.lemmaObjectFeatures[
      answerLanguage
    ].allowableTransfersFromQuestionStructure[
      answerStructureChunk.wordtype
    ].forEach((inflectorKey) => {
      if (!questionStructureChunk[inflectorKey]) {
        return;
      }

      if (inflectorKey === "number") {
        if (
          questionSelectedLemmaObject.tantumPlurale ||
          matchingAnswerLemmaObjects.every(
            (answerLemmaObject) => answerLemmaObject.tantumPlurale
          )
        ) {
          console.log("TANTUM DETECTED");
          // return;
        }
      }

      if (inflectorKey === "tenseDescription") {
        answerStructureChunk["tenseDescription"] = [];

        let tenseDescriptions = questionStructureChunk["tenseDescription"];

        console.log("ppp BEFORE ADJUST", { tenseDescriptions });

        answerStructureChunk["tenseDescription"] = []; //hard adjust

        questionLangUtils.adjustTenseDescriptionsWhenTranslating(
          tenseDescriptions,
          questionSelectedLemmaObject
        );

        console.log("qqq AFTER ADJUST", { tenseDescriptions });

        tenseDescriptions.forEach((tenseDesc) => {
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
        answerStructureChunk[inflectorKey] = gpUtils.copyWithoutReference(
          questionStructureChunk[inflectorKey]
        );
      }
    });

    //Check for features-of-answer-lang-lobjs-that-aren't-features-of-question-lang-lobjs.
    // So when going ENG to POL, that would be gender.
    // And then, with that list of features, we will blind the answer structureChunks to these features.

    let possibleInflectionsOfQuestionLobjs =
      refObj.lemmaObjectFeatures[questionLanguage].inflectionChains[
        answerStructureChunk.wordtype
      ];

    let possibleInflectionsOfAnswerLobjs =
      refObj.lemmaObjectFeatures[answerLanguage].inflectionChains[
        answerStructureChunk.wordtype
      ];

    let possibleInflectionsOfAnswerLobjsButNotQuestionLobjs = possibleInflectionsOfAnswerLobjs.filter(
      (inflector) => !possibleInflectionsOfQuestionLobjs.includes(inflector)
    );

    possibleInflectionsOfAnswerLobjsButNotQuestionLobjs.forEach((inflector) => {
      answerStructureChunk[inflector] = [];
    });

    console.log("yyy UPDATED answerStructureChunk", answerStructureChunk);
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

exports.inheritFromHeadToDependentChunk = (
  currentLanguage,
  headChunk,
  dependentChunk
) => {
  // console.log("SC:inheritFromHeadToDependentChunk was given:", {
  //   currentLanguage,
  //   headChunk,
  //   dependentChunk,
  // });

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
      let inflectorValueArr = gpUtils.copyWithoutReference(
        headChunk[inflectorKey]
      );

      dependentChunk[inflectorKey] = inflectorValueArr;
    }
  });

  // console.log(
  //   "SC:inheritFromHeadToDependentChunk should have now changed this dep chunk:",
  //   {
  //     dependentChunk,
  //   }
  // );
};
