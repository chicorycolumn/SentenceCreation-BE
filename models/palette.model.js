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
  let errorInSentenceCreation = false;
  let resultArr = [];

  let wordsCopy = {};
  let wordsKeys = Object.keys(words);
  wordsKeys.forEach((wordsKey) => {
    wordsCopy[wordsKey] = {
      ...words[wordsKey],
    };
  });

  let sentenceFormulasCopy = {};
  sentenceFormulasCopy[levelNumber] = {};
  let sentenceFormulasKeys = Object.keys(sentenceFormulas[levelNumber]);
  sentenceFormulasKeys.forEach((sentenceFormulasKey) => {
    sentenceFormulasCopy[levelNumber][sentenceFormulasKey] = {
      ...sentenceFormulas[levelNumber][sentenceFormulasKey],
    };
  });

  if (req.body.useDummy) {
    wordsKeys.forEach((wordsKey) => {
      wordsCopy[wordsKey] = {
        ...wordsCopy[wordsKey],
        ...dummyWords[wordsKey],
      };
    });

    // sentenceFormulasCopy[levelNumber] = {
    //   ...sentenceFormulasCopy[levelNumber],
    //   ...dummySentenceFormulas[levelNumber],
    // };
  }

  //Get the SF by filtering the SF list by req.body.sfsymbol

  //If req.body.useDummy, then do same as above but with dummySFlist to select from. No need to unite the SF lists.

  //If no req.body.sfsymbol, but yes req.body.snumber, then filter for that.

  //If neither, then use default snumber.

  //LATER: If a level is specified, and random is specified, pick a random SF from that level.

  let sentenceFormula = req.body.sentenceFormulaSymbol
    ? req.body.sentenceFormulaSymbol
    : sentenceFormulasCopy[levelNumber][sentenceNumber].formula;

  // We take tags to be potentially multiple in both Source and Spec.
  // We take keys to be potentially multiple in Spec, but always singular in Source.

  sentenceFormula.forEach((spec) => {
    if (typeof spec === "string") {
      resultArr.push(spec);
    } else {
      let source = wordsCopy[scUtils.giveSetKey(spec.wordtype)];
      let matches = [];

      matches = scUtils.filterByTag(source, spec.manTags, true);
      matches = scUtils.filterByTag(matches, spec.optTags, false);
      matches = scUtils.filterByKey(matches, spec.gender, "gender");
      matches = scUtils.filterOutDefectiveInflections(
        matches,
        spec,
        inflectionChainsPL
      );

      // console.log({ matches });

      if (matches.length) {
        let selectedLemmaObj = scUtils.selectRandom(matches);
        // console.log("Lemma: " + selectedLemmaObj.lemma);

        let selectedWord = scUtils.filterWithinObjectByNestedKeys(
          selectedLemmaObj.inflections,
          spec,
          inflectionChainsPL
        );

        if (!selectedWord) {
          errorInSentenceCreation = true;
          return false;
        } else {
          resultArr.push(selectedWord);
        }
      } else {
        errorInSentenceCreation = true;
        return false;
      }
    }
  });

  let finalSentence = scUtils.sentenceStringFromArray(resultArr);

  let responseObj = {};

  if (errorInSentenceCreation) {
    responseObj = {
      message: "No sentence could be created from the specifications.",
      fragment: finalSentence,
      palette: null,
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
