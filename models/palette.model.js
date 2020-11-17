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

  let sentenceFormula = [...sentenceObject.formula];

  //Instead of forEach, which iterates through the chunks in order,
  //we should first select any chunk with an agreeId, and run the fxn for that.
  //Then we insert the finished result into the result arr, AT THE SAME INDEX.
  //So "My red shirt" where shirt is the head noun and thus has the agreeId, the shirt chunk
  //gets processed in this loop below. It was at index 2 in sentenceFormulas, and so
  //it gets put in at idnex 2 in res arr, so res arr looks like [undef, undef, "koszula"]
  //Then we go to any chunks which have that agreeId string as their agreeWith value, and do the same.
  //In the meantime, we'll need to have stored the gender number case data from shirt.

  let doneChunkIds = [];
  let headIds = [];
  sentenceFormula.forEach((chunk) => {
    if (typeof chunk === "object" && chunk.agreeWith) {
      headIds.push(chunk.agreeWith);
    }
  });
  headIds = Array.from(new Set(headIds));

  // //ALL STEPS (of old way)
  // sentenceFormula.forEach((formulaChunk) => {
  //   getSelectedWordAndPutInArray(formulaChunk, resultArr);
  // });

  //Okay, in all of these steps,
  //let's get the final selected features of the final selected word, each time.
  //and put them in resultArr

  //STEP ONE

  headIds.forEach((headId) => {
    let chunkId = headId;
    let headChunk = sentenceFormula.find(
      (formulaChunk) =>
        typeof formulaChunk === "object" && formulaChunk.chunkId === chunkId
    );
    doneChunkIds.push(chunkId);
    // let headSelectedWordFeatures = [];

    getSelectedWordAndPutInArray(
      headChunk,
      resultArr
      // headSelectedWordFeatures
    );

    console.log("STEP ONE", { headChunk, resultArr });
  });

  //STEP TWO
  headIds.forEach((headId) => {
    let dependentChunks = sentenceFormula.filter(
      (formulaChunk) =>
        typeof formulaChunk === "object" && formulaChunk.agreeWithId === headId
    );
    dependentChunks.forEach((dependentChunk) => {
      doneChunkIds.push(dependentChunk.chunkId);
      getSelectedWordAndPutInArray(dependentChunk, resultArr);
      console.log("STEP TWO", { dependentChunk, resultArr });
    });
  });

  //STEP THREE
  sentenceFormula.forEach((formulaChunk) => {
    if (
      typeof formulaChunk !== "object" ||
      !doneChunkIds.includes(formulaChunk.chunkId)
    ) {
      // doneChunkIds.push(formulaChunk.chunkId);
      getSelectedWordAndPutInArray(formulaChunk, resultArr);
    }

    console.log("STEP THREE", { formulaChunk, resultArr });
  });

  //Now, instead of the sentenceFormula.forEach above, we'll do this:
  //STEP 1 do all the chunks with each agreeWithId as their chunkId
  //STEP 2 do the chunks that have "agreeWith" as a key.
  //STEP 3 do all other chunks.

  function getSelectedWordAndPutInArray(
    formulaChunkOriginal,
    resultArr
    // recordOfSelectedRequirementsOutput
  ) {
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
      //And in here, we look for if this has an agreeWith key, in which case
      //we find its head word, and get the number gender case from that.

      let source = wordsCopy[scUtils.giveSetKey(formulaChunk.wordtype)];
      let matches = [];

      matches = scUtils.filterByTag(source, formulaChunk.manTags, true);
      matches = scUtils.filterByTag(matches, formulaChunk.optTags, false);

      if (formulaChunk.wordtype === "noun") {
        matches = scUtils.filterByKey(
          matches,
          formulaChunk["gender"],
          "gender"
        );
      }

      // If a dependent word, then here give it the case gender number from its head word.

      //Ah no, change the below. You wanna take number gender case from the final selected head word, not that word's specs.
      // if (typeof formulaChunk === "object" && formulaChunk.agreeWith) {
      //   let selectedWord = resultArr.find(
      //     (item) => item.selectedLemmaObject.chunkId === formulaChunk.agreeWith
      //   ).selectedWord;
      //   inflectionChainsPL[formulaChunk.wordtype].forEach((key) => {
      //     formulaChunk[key] = selectedWord[key];
      //   });
      // }

      matches = scUtils.filterOutDefectiveInflections(
        matches,
        formulaChunk,
        inflectionChainsPL
      );

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
            recordOfSelectedRequirements,
            modifiedFormulaChunk,
          } = filterNestedOutput;

          // if (recordOfSelectedRequirementsOutput) {
          //   recordOfSelectedRequirementsOutput = recordOfSelectedRequirements;
          // }

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

  resultArr.forEach((item) => {
    console.log("------------------", item.formulaChunk);
  });

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
