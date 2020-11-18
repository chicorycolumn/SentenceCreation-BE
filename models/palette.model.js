const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const { wordsBank } = require("../source/PL/words.js");
const { dummyWordsBank } = require("../source/PL/dummyWords.js");
const { sentenceFormulasBank } = require("../source/PL/sentenceFormulas.js");
const {
  dummySentenceFormulasBank,
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

  let words = req.body.useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = req.body.useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  //LATER: If a level is specified, and random is specified, pick a random SF from that level.

  console.log("&&&", req.body.sentenceFormulaSymbol);

  let sentenceBigObject = req.body.sentenceFormulaSymbol
    ? scUtils.findObjectInNestedObject(sentenceFormulas, {
        symbol: req.body.sentenceFormulaSymbol,
      })
    : sentenceFormulas[levelNumber][sentenceNumber];

  let sentenceFormula = sentenceBigObject.formula;

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

    console.log(">>STEP ONE", headChunk);
    scUtils.getSelectedWordAndPutInArray(
      headChunk,
      resultArr,
      words,
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

    console.log(">>dependentChunks", dependentChunks);

    if (dependentChunks.length) {
      dependentChunks.forEach((dependentChunk) => {
        let headChunk = sentenceFormula.find(
          (formulaChunk) =>
            typeof formulaChunk === "object" && formulaChunk.chunkId === headId
        );

        console.log(">>The headchunk of that dependent chunk is:", headChunk);

        inflectionChainsPL["adjective"].forEach((featureKey) => {
          dependentChunk[featureKey] = headChunk[featureKey];
        });

        doneChunkIds.push(dependentChunk.chunkId);

        console.log(">>STEP TWO", dependentChunk);
        scUtils.getSelectedWordAndPutInArray(
          dependentChunk,
          resultArr,
          words,
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
      console.log(">>STEP THREE", formulaChunk);
      scUtils.getSelectedWordAndPutInArray(
        formulaChunk,
        resultArr,
        words,
        inflectionChainsPL,
        errorInSentenceCreation
      );
    }
  });

  console.log(">>End of palette.model resultArr", resultArr);

  let responseObj = {};

  let finalSentence = scUtils.buildSentenceFromArray(
    resultArr,
    sentenceBigObject
  );

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
