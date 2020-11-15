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
  // let sentenceFormulasCopy = {};
  // sentenceFormulasCopy[levelNumber] = {};
  // let sentenceFormulasKeys = Object.keys(sentenceFormulas[levelNumber]);
  // sentenceFormulasKeys.forEach((sentenceFormulasKey) => {
  //   sentenceFormulasCopy[levelNumber][sentenceFormulasKey] = {
  //     ...sentenceFormulas[levelNumber][sentenceFormulasKey],
  //   };
  // });

  if (req.body.useDummy) {
    wordsetKeys.forEach((wordsetKey) => {
      wordsCopy[wordsetKey] = {
        ...wordsCopy[wordsetKey],
        ...dummyWords[wordsetKey],
      };
    });

    sentenceFormulasList = dummySentenceFormulas;
  }

  //LATER: If a level is specified, and random is specyified, pick a random SF from that level.

  let sentenceObject = req.body.sentenceFormulaSymbol
    ? scUtils.findObjectInNestedObject(sentenceFormulasList, {
        symbol: req.body.sentenceFormulaSymbol,
      })
    : sentenceFormulasList[levelNumber][sentenceNumber];

  let sentenceFormula = sentenceObject.formula;

  sentenceFormula.forEach((formulaChunk) => {
    if (typeof formulaChunk === "string") {
      resultArr.push({
        selectedLemmaObj: null,
        selectedWord: formulaChunk,
        formulaChunk,
      });
    } else {
      let source = wordsCopy[scUtils.giveSetKey(formulaChunk.wordtype)];
      let matches = [];

      matches = scUtils.filterByTag(source, formulaChunk.manTags, true);
      matches = scUtils.filterByTag(matches, formulaChunk.optTags, false);
      matches = scUtils.filterByKey(matches, formulaChunk.gender, "gender");
      matches = scUtils.filterOutDefectiveInflections(
        matches,
        formulaChunk,
        inflectionChainsPL
      );

      if (matches.length) {
        let selectedLemmaObj = { ...scUtils.selectRandom(matches) };

        let selectedWord = scUtils.filterWithinObjectByNestedKeys(
          selectedLemmaObj.inflections,
          formulaChunk,
          inflectionChainsPL
        );

        if (!selectedWord) {
          errorInSentenceCreation = {
            errorMessage:
              "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.",
          };
          return false;
        } else {
          resultArr.push({ selectedLemmaObj, selectedWord, formulaChunk });
        }
      } else {
        errorInSentenceCreation = {
          errorMessage: "No matching lemma objects were found.",
        };
        return false;
      }
    }
  });

  let finalSentence = scUtils.buildSentenceFromArray(resultArr);

  console.log({ finalSentence });

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
