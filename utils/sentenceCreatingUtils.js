const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.getMaterials = (
  currentLanguage,
  sentenceFormulaId,
  sentenceFormulaSymbol,
  useDummy
) => {
  let sentenceFormula;
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

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

  Object.keys(words).forEach((wordtypeKey) => {
    langUtils.preprocessLemmaObjectsMinor(words[wordtypeKey]);
  });

  return { sentenceFormula, words };
};

exports.processSentenceFormula = (
  languagesObj,
  sentenceFormula,
  words,
  kumquat
) => {
  let { currentLanguage, previousQuestionLanguage } = languagesObj;
  let {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    sentenceStructure,
  } = sentenceFormula;
  let errorInSentenceCreation = { errorMessage: null };
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let grandOutputArray = [];

  //STEP ZERO
  //Preprocess sentence structure.

  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);
  langUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

  //STEP ONE: Select headwords and add to result array.

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

  headIds.forEach((headId, headIdIndex) => {
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === headId
    );

    console.log("~~ SC:processSentenceFormula STEP ONE", headChunk.chunkId);

    //The below functions correctly with regard to:
    //Give kumquat as true, it returns multiple outputUnit objects in allPossOutputUnits_head array.
    //Give kumquat as false, it returns just one outputUnit object in said array.

    let allPossOutputUnits_head = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(headChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      kumquat
    );

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_head ||
      !allPossOutputUnits_head.length
    ) {
      console.log("An error arose in SC:processSentenceFormula.");
      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

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

          let allPossOutputUnits_dependent = otUtils.findMatchingLemmaObjectThenWord(
            gpUtils.copyWithoutReference(dependentChunk),
            words,
            errorInSentenceCreation,
            currentLanguage,
            previousQuestionLanguage,
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
      previousQuestionLanguage,
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
  sentenceData,
  kumquat,
  currentLanguage,
  answerLanguage
) => {
  let {
    arrayOfOutputArrays,
    sentenceFormula,
    errorInSentenceCreation,
  } = sentenceData;

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
        null
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
      answerLanguage
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
  answerLanguage
) => {
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
  sentenceFormula,
  questionOutputArr,
  languagesObj,
  words
) => {
  let { sentenceStructure } = sentenceFormula;
  let { questionLanguage, answerLanguage } = languagesObj;
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  questionOutputArr.forEach((questionOutputArrItem) => {
    //
    // STEP ZERO: Get necessary materials.
    //
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    if (questionStructureChunk.wordtype === "fixed") {
      return;
    }

    let questionSelectedLemmaObject = questionOutputArrItem.selectedLemmaObject;
    let questionSelectedWord = questionOutputArrItem.selectedWord;

    let answerStructureChunk = sentenceStructure.find(
      (structureChunk) =>
        structureChunk.chunkId === questionStructureChunk.chunkId
    );

    if (!answerStructureChunk) {
      console.log(
        "SC:conformAnswerStructureToQuestionStructure couldn't find any answerStructureChunk for '" +
          questionStructureChunk.chunkId +
          "'."
      );
      return;
    }

    let lemmasToSearch =
      questionSelectedLemmaObject.translations[answerLanguage];

    let source = words[gpUtils.giveSetKey(answerStructureChunk.wordtype)];
    // answerLangUtils.preprocessLemmaObjectsMinor(source);

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

    if (!matchingAnswerLemmaObjects.length) {
      console.log(
        "There were no matching answer lemma objects found in SC:conformAnswerStructureToQuestionStructure"
      );
      return;
    }

    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    refObj.lemmaObjectFeatures[
      answerLanguage
    ].allowableTransfersFromQuestionStructure[
      answerStructureChunk.wordtype
    ].forEach((inflectorKey) => {
      //
      // STEP ONE: Update inflectors from list of allowable transfers.
      //
      if (!questionStructureChunk[inflectorKey]) {
        return;
      }

      if (
        answerStructureChunk.importantFeatures &&
        answerStructureChunk.importantFeatures.includes(inflectorKey)
      ) {
        console.log(
          "I will not transfer '" +
            inflectorKey +
            "' in SC:conformAtoQ step 1, as marked important in answerStCh."
        );
        return;
      }

      //Don't transfer Number if Q is Tantum Plurale.     eg if Q is "skrzypce" we'd want A to include both "violin" and "violins".
      if (
        inflectorKey === "number" &&
        questionSelectedLemmaObject.tantumPlurale
      ) {
        console.log(
          "Question lobj is a tantum, so we won't transfer Number feature."
        );
        return;
      }

      //Don't transfer Number, if all A lObjs are Tantum Plurale.     eg if Q is "violin" we don't want to specify that A must be singular, as "skrzypce" can't be singular.

      if (
        inflectorKey === "number" &&
        matchingAnswerLemmaObjects.length &&
        matchingAnswerLemmaObjects.every(
          (answerLemmaObject) => answerLemmaObject.tantumPlurale
        )
      ) {
        console.log(
          "All answer lobjs are tantum, so we won't transfer Number feature."
        );
        return;
      }

      if (inflectorKey === "tenseDescription") {
        answerStructureChunk["tenseDescription"] = []; //hard adjust

        let tenseDescriptions = questionStructureChunk["tenseDescription"];

        questionLangUtils.adjustTenseDescriptionsBeforeTranslating(
          tenseDescriptions,
          questionSelectedLemmaObject
        );

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

        return;
      }

      answerStructureChunk[inflectorKey] = gpUtils.copyWithoutReference(
        questionStructureChunk[inflectorKey]
      );
    });

    //
    //PART TWO: Blinding
    //

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
      if (
        !answerStructureChunk.importantFeatures ||
        !answerStructureChunk.importantFeatures.includes(inflector)
      ) {
        //Refrain from the blinding if this inflector has been marked as important in the answer structure.
        answerStructureChunk[inflector] = [];
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

exports.inheritFromHeadToDependentChunk = (
  currentLanguage,
  headChunk,
  dependentChunk
) => {
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
};
