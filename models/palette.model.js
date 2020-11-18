const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const { words } = require("../source/PL/words.js");
const { dummyWords } = require("../source/PL/dummyWords.js");
const { sentenceFormulas } = require("../source/PL/sentenceFormulas.js");
const {
  dummySentenceFormulas,
} = require("../source/PL/dummySentenceFormulas.js");

exports.fetchPalette = (req) => {
  let defaultSentenceNumber = 50;
  let sentenceNumber = req.body.sentenceNumber || defaultSentenceNumber;
  let defaultLevelNumber = "level01";
  let levelNumber = req.body.levelNumber || defaultLevelNumber;

  let inflectionChainsPL = {
    noun: ["number", "gcase"],
    adjective: ["number", "gender", "gcase"],
  };
  let errorInSentenceCreation = {};
  let resultArr = [];

  let wordsCopy = {};
  let wordsetKeys = Object.keys(words);
  wordsetKeys.forEach((wordsetKey) => {
    wordsCopy[wordsetKey] = [...words[wordsetKey]];
    // This so that /words nounSet can be merged with /dummyWords nounSet, without changing the former.
  });

  let sentenceFormulasList = sentenceFormulas;

  if (req.body.useDummy) {
    wordsetKeys.forEach((wordsetKey) => {
      wordsCopy[wordsetKey] = {
        ...wordsCopy[wordsetKey],
        ...dummyWords[wordsetKey],
      };
    });

    sentenceFormulasList = dummySentenceFormulas;
  }

  //LATER: If a level is specified, and random is specified, pick a random SF from that level.

  let sentenceObject = req.body.sentenceFormulaSymbol
    ? scUtils.findObjectInNestedObject(sentenceFormulasList, {
        symbol: req.body.sentenceFormulaSymbol,
      })
    : sentenceFormulasList[levelNumber][sentenceNumber];

  let sentenceFormula = [...sentenceObject.formula];

  //Instead of forEach, insert each finished result into the result arr, AT THE SAME INDEX.

  let doneChunkIds = [];
  let headIds = [];
  sentenceFormula.forEach((chunk) => {
    if (typeof chunk === "object" && chunk.agreeWith) {
      headIds.push(chunk.agreeWith);
    }
  });
  headIds = Array.from(new Set(headIds));

  //STEP ONE
  headIds.forEach((headId) => {
    let chunkId = headId;
    let headChunk = sentenceFormula.find(
      (formulaChunk) =>
        typeof formulaChunk === "object" && formulaChunk.chunkId === chunkId
    );
    doneChunkIds.push(chunkId);

    scUtils.getSelectedWordAndPutInArray(
      headChunk,
      resultArr,
      wordsCopy,
      inflectionChainsPL,
      errorInSentenceCreation
    );
  });

  //STEP TWO

  headIds.forEach((headId) => {
    let dependentChunks = sentenceFormula.filter(
      (formulaChunk) =>
        typeof formulaChunk === "object" && formulaChunk.agreeWith === headId
    );

    if (dependentChunks.length) {
      dependentChunks.forEach((dependentChunk) => {
        let headChunk = sentenceFormula.find(
          (formulaChunk) =>
            typeof formulaChunk === "object" && formulaChunk.chunkId === headId
        );

        inflectionChainsPL["adjective"].forEach((featureKey) => {
          dependentChunk[featureKey] = headChunk[featureKey];
        });

        doneChunkIds.push(dependentChunk.chunkId);

        scUtils.getSelectedWordAndPutInArray(
          dependentChunk,
          resultArr,
          wordsCopy,
          inflectionChainsPL,
          errorInSentenceCreation
        );
      });
    }
  });

  //STEP THREE
  sentenceFormula.forEach((formulaChunk) => {
    if (
      typeof formulaChunk !== "object" ||
      !doneChunkIds.includes(formulaChunk.chunkId)
    ) {
      scUtils.getSelectedWordAndPutInArray(
        formulaChunk,
        resultArr,
        wordsCopy,
        inflectionChainsPL,
        errorInSentenceCreation
      );
    }
  });

  let finalSentence = scUtils.buildSentenceFromArray(resultArr);
  let responseObj = {};

  if (errorInSentenceCreation.errorMessage) {
    let errorMessage = {
      errorInSentenceCreation: errorInSentenceCreation.errorMessage,
    };

    responseObj = {
      message: "No sentence could be created from the specifications.",
      fragment: finalSentence,
      palette: null,
      errorMessage,
    };
  } else {
    responseObj = {
      palette: finalSentence,
    };
  }

  return Promise.all([responseObj]).then((array) => {
    return array[0];
  });
};
