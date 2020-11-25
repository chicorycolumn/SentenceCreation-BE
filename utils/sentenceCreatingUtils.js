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
  questionResultArray
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
  let resultArr = [];

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
      questionResultArray,
      words,
      currentLanguage
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
    doneChunkIds.push(chunkId);

    console.log(">>STEP ONE", headChunk);
    otUtils.findLemmaObjectThenWord(
      headChunk,
      resultArr,
      words,
      errorInSentenceCreation,
      currentLanguage
    );

    console.log("Finished step one.");
  });

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
        //   refObj.lemmaObjectCharacteristics[currentLanguage].inflectionChains[dependentChunk.wordtype]
        // );
        // console.log("dependentChunk", dependentChunk);
        // console.log("headChunk", headChunk);
        // console.log("---------------------");
        // console.log("--------------");
        // console.log("-------");

        refObj.lemmaObjectCharacteristics[currentLanguage].inflectionChains[
          dependentChunk.wordtype
        ].forEach((featureKey) => {
          if (headChunk[featureKey]) {
            dependentChunk[featureKey] = headChunk[featureKey];
          }
        });

        // console.log("bbb-------");
        // console.log("--------------");
        // console.log("---------------------");
        // console.log("dependentChunk", dependentChunk);
        // console.log("---------------------");
        // console.log("--------------");
        // console.log("-------");

        doneChunkIds.push(dependentChunk.chunkId);

        otUtils.findLemmaObjectThenWord(
          dependentChunk,
          resultArr,
          words,
          errorInSentenceCreation,
          currentLanguage
        );
      });
    }
  });

  //STEP THREE: Select all other words and add to result array.
  sentenceStructure.forEach((structureChunk) => {
    if (
      typeof structureChunk !== "object" ||
      !doneChunkIds.includes(structureChunk.chunkId)
    ) {
      otUtils.findLemmaObjectThenWord(
        structureChunk,
        resultArr,
        words,
        errorInSentenceCreation,
        currentLanguage
      );
    }
  });

  return {
    resultArr,
    sentenceFormula,
    sentenceNumber,
    sentenceSymbol,
    errorInSentenceCreation,
  };
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

exports.formatFinalSentence = (
  resultArr,
  sentenceFormula,
  errorInSentenceCreation
) => {
  let finalSentence = exports.buildSentenceFromArray(
    resultArr,
    sentenceFormula
  );

  if (errorInSentenceCreation.errorMessage) {
    let errorMessage = {
      errorInSentenceCreation: errorInSentenceCreation.errorMessage,
    };

    questionResponseObj = {
      message: "No sentence could be created from the specifications.",
      fragment: finalSentence,
      finalSentence: null,
      errorMessage,
    };
  } else {
    questionResponseObj = {
      finalSentence,
    };
  }

  return questionResponseObj;
};

exports.conformAnswerStructureToQuestionStructure = (
  sentenceStructure,
  questionResultArray,
  words,
  currentLanguage
) => {
  console.log(
    "conformAnswerStructureToQuestionStructure fxn, ENG-sentenceStructure",
    sentenceStructure
  );
  console.log(
    "conformAnswerStructureToQuestionStructure fxn, POL-questionResultArray",
    questionResultArray
  );

  questionResultArray.forEach((questionResArrItem) => {
    let answerStructureChunk = sentenceStructure.find((structureChunk) => {
      return (
        structureChunk.chunkId === questionResArrItem.structureChunk.chunkId
      );
    });

    if (!answerStructureChunk) {
      return;
    }

    let questionSelectedLemmaObject = questionResArrItem.selectedLemmaObject;
    let questionSelectedWord = questionResArrItem.selectedWord;
    let questionStructureChunk = questionResArrItem.structureChunk;

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

    refObj.lemmaObjectCharacteristics[
      currentLanguage
    ].inflectionChains.allowableTransfersFromQuestionStructure[
      answerStructureChunk.wordtype
    ] //alpha say for tantum plurales, make Number blank (all possible) in english noun chunk
      .forEach((featureKey) => {
        if (questionStructureChunk[featureKey]) {
          answerStructureChunk[featureKey] = questionStructureChunk[featureKey];
        }
      });

    console.log(
      "answerStructureChunk after the feature transfer",
      answerStructureChunk
    );
  });

  /*
   * 1) Take the lemma from lobj nail, and put that as specificLemmas key in english chunk that has same chunkid as polish chunk connected to gwø»d».
   *
   * 2) Then bring over particular features.
   *
   * The polish noun chunk should copy its Number onto the english noun chunk.
   *  although for tantum plurales, make Number blank (all possible) in english noun chunk.
   *
   * The polish adjective chunk should copy its Form onto the english adjective chunk.
   *
   * The polish verb chunk should copy its Form Tense Person Number all onto the english verb chunk.
   *
   * 3) Now allow processSentenceFormula to run, and the english translation of the polish sentence will be created.
   *
   * 4) Modify the recursive traverser, so that if(generateAnswers), it will not just select one happy route, but rather create sentences for all happy routes.
   */
};
