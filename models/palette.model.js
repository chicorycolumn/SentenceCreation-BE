const scUtils = require("../utils/sentenceCreationUtils.js");
const { words } = require("../utils/PL/words.js");
const { dummyWords } = require("../utils/PL/dummyWords.js");
const { sentenceFormulas } = require("../utils/PL/sentenceFormulas.js");
const {
  dummySentenceFormulas,
} = require("../utils/PL/dummySentenceFormulas.js");

exports.fetchPalette = (req) => {
  let defaultSentenceNumber = 50;
  let sentenceNumber = req.body.sentenceNumber || defaultSentenceNumber;
  let defaultLevelNumber = "level01";
  let levelNumber = req.body.levelNumber || defaultLevelNumber;

  let inflectionChainsPL = {
    noun: ["number", "gcase"],
    adjective: ["number", "gender", "gcase"],
  };
  let errorInSentenceCreation = null;
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

    getSelectedWordAndPutInArray(headChunk, resultArr);
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

        getSelectedWordAndPutInArray(dependentChunk, resultArr);
      });
    }
  });

  //STEP THREE
  sentenceFormula.forEach((formulaChunk) => {
    if (
      typeof formulaChunk !== "object" ||
      !doneChunkIds.includes(formulaChunk.chunkId)
    ) {
      getSelectedWordAndPutInArray(formulaChunk, resultArr);
    }
  });

  function getSelectedWordAndPutInArray(formulaChunkOriginal, resultArr) {
    let formulaChunk = formulaChunkOriginal;

    if (Array.isArray(formulaChunkOriginal)) {
      formulaChunk = [...formulaChunkOriginal];
    }

    if (typeof formulaChunk === "string") {
      resultArr.push({
        selectedLemmaObj: {},
        selectedWord: formulaChunk,
        formulaChunk,
      });
    } else {
      let source = wordsCopy[scUtils.giveSetKey(formulaChunk.wordtype)];
      let matches = [];

      matches = scUtils.filterByTag(source, formulaChunk.manTags, true);
      matches = scUtils.filterByTag(matches, formulaChunk.optTags, false);

      // Do this for nouns because we're filtering the different noun lobjs by gender, as each noun is a diff gender.
      // Don't do this for adjs, as gender is a key inside each individual adj lobj.
      if (["noun"].includes(formulaChunk.wordtype)) {
        matches = scUtils.filterByKey(
          matches,
          formulaChunk["gender"],
          "gender"
        );

        matches = scUtils.filterOutDefectiveInflections(
          matches,
          formulaChunk,
          inflectionChainsPL
        );
      }

      if (matches.length) {
        let selectedLemmaObj = { ...scUtils.selectRandom(matches) };

        let filterNestedOutput = scUtils.filterWithinLemmaObjectByNestedKeys(
          selectedLemmaObj,
          formulaChunk,
          inflectionChainsPL
        );

        if (!filterNestedOutput || !filterNestedOutput.selectedWord) {
          errorInSentenceCreation = {
            errorMessage:
              "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.",
          };
          return false;
        } else {
          let {
            selectedWord,

            modifiedFormulaChunk,
          } = filterNestedOutput;

          resultArr.push({
            selectedLemmaObj,
            selectedWord,
            formulaChunk: modifiedFormulaChunk,
          });
        }
      } else {
        errorInSentenceCreation = {
          errorMessage: "No matching lemma objects were found.",
        };
        return false;
      }
    }
  }

  let finalSentence = scUtils.buildSentenceFromArray(resultArr);
  let responseObj = {};

  if (errorInSentenceCreation) {
    let errorMessage = { errorInSentenceCreation };

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
