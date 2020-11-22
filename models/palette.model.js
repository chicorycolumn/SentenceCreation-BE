const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../utils/specificPolishUtils.js");

const { wordsBank } = require("../source/POL/words.js");
const { dummyWordsBank } = require("../source/POL/dummyWords.js");
const { sentenceFormulasBank } = require("../source/POL/sentenceFormulas.js");
const {
  dummySentenceFormulasBank,
} = require("../source/POL/dummySentenceFormulas.js");

exports.fetchPalette = (req) => {
  //STEP ZERO: Get necessary components.
  let defaultSentenceNumber = 50;
  let sentenceNumber = req.body.sentenceNumber || defaultSentenceNumber;
  let defaultLevelNumber = "level01";
  let levelNumber = req.body.levelNumber || defaultLevelNumber;

  let inflectionChainsPOL = {
    noun: ["number", "gcase"],
    adjective: ["number", "gender", "gcase"],
    verb: ["form", "tense", "person", "number", "gender"],
  };
  let errorInSentenceCreation = {};
  let resultArr = [];

  let words = req.body.useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = req.body.useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  //If a level is specified, and random is specified, enable to pick a random SF from that level.

  let sentenceFormula = req.body.sentenceFormulaSymbol
    ? scUtils.findObjectInNestedObject(sentenceFormulas, {
        symbol: req.body.sentenceFormulaSymbol,
      })
    : sentenceFormulas[levelNumber][sentenceNumber];

  let sentenceStructure = sentenceFormula.structure;

  let doneChunkIds = [];
  let headIds = [];

  sentenceStructure.forEach((chunk) => {
    if (typeof chunk === "object" && chunk.agreeWith) {
      headIds.push(chunk.agreeWith);
    }
  });
  headIds = Array.from(new Set(headIds));

  //STEP ONE: Select headwords and add to result array.
  headIds.forEach((headId) => {
    let chunkId = headId;
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === chunkId
    );
    doneChunkIds.push(chunkId);

    // console.log(">>STEP ONE", headChunk);
    scUtils.findMatchingWordThenAddToResultArray(
      headChunk,
      resultArr,
      words,
      inflectionChainsPOL,
      errorInSentenceCreation
    );
  });

  //STEP TWO: Select dependent words and add to result array.
  headIds.forEach((headId) => {
    let dependentChunks = sentenceStructure.filter(
      (structureChunk) =>
        typeof structureChunk === "object" &&
        structureChunk.agreeWith === headId
    );

    // console.log(">>dependentChunks", dependentChunks);

    if (dependentChunks.length) {
      dependentChunks.forEach((dependentChunk) => {
        let headChunk = sentenceStructure.find(
          (structureChunk) =>
            typeof structureChunk === "object" &&
            structureChunk.chunkId === headId
        );

        // console.log(">>The headchunk of that dependent chunk is:", headChunk);

        inflectionChainsPOL["adjective"].forEach((featureKey) => {
          dependentChunk[featureKey] = headChunk[featureKey];
        });

        doneChunkIds.push(dependentChunk.chunkId);

        // console.log(">>STEP TWO", dependentChunk);
        scUtils.findMatchingWordThenAddToResultArray(
          dependentChunk,
          resultArr,
          words,
          inflectionChainsPOL,
          errorInSentenceCreation
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
      // console.log(">>STEP THREE", structureChunk);
      scUtils.findMatchingWordThenAddToResultArray(
        structureChunk,
        resultArr,
        words,
        inflectionChainsPOL,
        errorInSentenceCreation
      );
    }
  });

  //STEP FOUR: Format and return result.
  console.log(">>End of palette.model resultArr", resultArr);

  let responseObj = {};

  let finalSentence = scUtils.buildSentenceFromArray(
    resultArr,
    sentenceFormula
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
