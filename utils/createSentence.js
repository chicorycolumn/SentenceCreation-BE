const scUtils = require("./sentenceCreationUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const POLUtils = require("./specificPolishUtils.js");
const refObj = require("./referenceObjects.js");

const { wordsBank } = require("../source/POL/words.js");
const { dummyWordsBank } = require("../source/POL/dummyWords.js");
const { sentenceFormulasBank } = require("../source/POL/sentenceFormulas.js");
const {
  dummySentenceFormulasBank,
} = require("../source/POL/dummySentenceFormulas.js");

exports.createSentence = (
  sentenceNumber,
  levelNumber,
  sentenceSymbol,
  useDummy
) => {
  //////////
  let currentLanguage = "POL";
  //////////

  //STEP ZERO: Get necessary components.
  let defaultSentenceNumber = 50;
  sentenceNumber = sentenceNumber || defaultSentenceNumber;
  let defaultLevelNumber = "level01";
  levelNumber = levelNumber || defaultLevelNumber;
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

  let sentenceFormula = sentenceSymbol
    ? scUtils.findObjectInNestedObject(sentenceFormulas, {
        symbol: sentenceSymbol,
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
      refObj.inflectionChainsReference[currentLanguage],
      errorInSentenceCreation,
      currentLanguage
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

        refObj.inflectionChainsReference[currentLanguage]["adjective"].forEach(
          (featureKey) => {
            dependentChunk[featureKey] = headChunk[featureKey];
          }
        );

        doneChunkIds.push(dependentChunk.chunkId);

        // console.log(">>STEP TWO", dependentChunk);
        scUtils.findMatchingWordThenAddToResultArray(
          dependentChunk,
          resultArr,
          words,
          refObj.inflectionChainsReference[currentLanguage],
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
      // console.log(">>STEP THREE", structureChunk);
      scUtils.findMatchingWordThenAddToResultArray(
        structureChunk,
        resultArr,
        words,
        refObj.inflectionChainsReference[currentLanguage],
        errorInSentenceCreation,
        currentLanguage
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

  return { responseObj, sentenceStructure };
};
