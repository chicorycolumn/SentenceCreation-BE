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
  generateAnswers,
  questionOutputArr,
  questionLanguage
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  console.log("processSentenceFormula fxn was given these args", {
    currentLanguage,
    sentenceNumber,
    sentenceSymbol,
    useDummy,
  });

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
  let errorInSentenceCreation = {};
  let outputArr = [];

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

  if (generateAnswers) {
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

  console.log(
    "processSentenceFormula fxn just before step one says sentenceStructure is",
    sentenceStructure
  );

  let doneChunkIds = [];
  let headIds = [];

  sentenceStructure.forEach((chunk) => {
    if (typeof chunk === "object" && chunk.agreeWith) {
      headIds.push(chunk.agreeWith);
    }
  });
  headIds = Array.from(new Set(headIds));

  console.log({ headIds });

  //STEP ONE: Select headwords and add to result array.
  headIds.forEach((headId) => {
    let chunkId = headId;
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === chunkId
    );

    console.log(">>STEP ONE", headChunk);
    let outputUnit = otUtils.findMatchingLemmaObjectThenWord(
      headChunk,
      words,
      errorInSentenceCreation,
      currentLanguage,
      questionLanguage
    );

    // This updates structureChunk with tags, and selectors (ie 'gender' for nouns and 'aspect' for verbs).
    lfUtils.updateTagsAndSelectorsOfStructureChunk(outputUnit, currentLanguage);
    outputArr.push(outputUnit);

    doneChunkIds.push(chunkId);

    console.log("Finished step one.", headChunk);
  });

  //Make a copy of:
  //  sentenceStructure
  //  doneChunkIds
  //  outputArr

  //STEP TWO: Select dependent words and add to result array.
  headIds.forEach((headId) => {
    let dependentChunks = sentenceStructure.filter(
      (structureChunk) =>
        typeof structureChunk === "object" &&
        structureChunk.agreeWith === headId
    );

    if (dependentChunks.length) {
      dependentChunks.forEach((dependentChunk) => {
        console.log(">>STEP TWO", dependentChunk);
        let headChunk = sentenceStructure.find(
          (structureChunk) =>
            typeof structureChunk === "object" &&
            structureChunk.chunkId === headId
        );

        // console.log("aaa-------");
        // console.log("--------------");
        // console.log("---------------------");
        // console.log("wordtype", dependentChunk.wordtype);
        // console.log(
        //   refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[dependentChunk.wordtype]
        // );
        // console.log("dependentChunk", dependentChunk);
        // console.log("headChunk", headChunk);
        // console.log("---------------------");
        // console.log("--------------");
        // console.log("-------");

        //Inherit from headchunks to dependent chunks.
        refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
          dependentChunk.wordtype
        ].forEach((inflectorKey) => {
          if (headChunk[inflectorKey]) {
            dependentChunk[inflectorKey] = headChunk[inflectorKey];
          }
        });

        // console.log("bbb-------");
        // console.log("--------------");
        // console.log("---------------------");
        // console.log("dependentChunk", dependentChunk);
        // console.log("---------------------");
        // console.log("--------------");
        // console.log("-------");

        let outputUnit = otUtils.findMatchingLemmaObjectThenWord(
          dependentChunk,
          words,
          errorInSentenceCreation,
          currentLanguage,
          questionLanguage
        );

        doneChunkIds.push(dependentChunk.chunkId);

        lfUtils.updateTagsAndSelectorsOfStructureChunk(
          outputUnit,
          currentLanguage
        );
        outputArr.push(outputUnit);
      });
    }
  });

  //STEP THREE: Select all other words and add to result array.
  sentenceStructure.forEach((structureChunk) => {
    if (
      typeof structureChunk !== "object" ||
      !doneChunkIds.includes(structureChunk.chunkId)
    ) {
      let outputUnit = otUtils.findMatchingLemmaObjectThenWord(
        structureChunk,
        words,
        errorInSentenceCreation,
        currentLanguage,
        questionLanguage
      );

      doneChunkIds.push(structureChunk.chunkId);

      //No need to updateTagsAndSelectorsOfStructureChunk as these chunks are neither heads nor dependents.
      outputArr.push(outputUnit);
    }
  });

  return {
    outputArr,
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
  questionLanguage
) => {
  if (questionLanguage) {
    console.log(
      "formatFinalSentence fxn says Now we should go through every permutation and make a sentence for each one."
    );
    console.log("outputArr", outputArr);
    console.log("sentenceFormula", sentenceFormula);
  } else {
    if (errorInSentenceCreation.errorMessage) {
      let errorMessage = {
        errorInSentenceCreation: errorInSentenceCreation.errorMessage,
      };

      questionResponseObj = {
        message: "No sentence could be created from the specifications.",
        finalSentence: null,
        errorMessage,
      };
    } else {
      let finalSentence = exports.buildSentenceFromArray(
        outputArr,
        sentenceFormula
      );

      questionResponseObj = {
        finalSentence,
      };
    }

    return questionResponseObj;
  }
};

exports.buildSentenceFromArray = (unorderedArr, sentenceFormula) => {
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
  console.log(
    "conformAnswerStructureToQuestionStructure fxn, ENG-sentenceStructure",
    sentenceStructure
  );
  console.log(
    "conformAnswerStructureToQuestionStructure fxn, POL-questionOutputArr",
    questionOutputArr
  );

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

    console.log(
      "So, the Polish lemma chosen was",
      questionSelectedLemmaObject.lemma
    );

    let lemmasToSearch = questionSelectedLemmaObject.translations.ENG;

    console.log(
      "Going to search for all ENG lobjs with these lemmas:",
      lemmasToSearch
    );

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

    console.log("I found these matches:", answerStructureChunk.specificIds);
    console.log("answerStructureChunk", answerStructureChunk);

    refObj.lemmaObjectFeatures[
      answerLanguage
    ].inflectionChains.allowableTransfersFromQuestionStructure[
      answerStructureChunk.wordtype
    ] //Alphaman say for tantum plurales, make Number blank (all possible) in english noun chunk
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

    console.log(
      "answerStructureChunk after the feature transfer",
      answerStructureChunk
    );
  });
};
