const scUtils = require("../utils/sentenceCreationUtils.js");
const { wordbank } = require("../utils/wordbank.js");
const { dummyWords } = require("../utils/dummyWords.js");
const { egSentences } = require("../utils/egSentences.js");

exports.fetchPalette = (req) => {
  let inflectionChain = ["number", "gcase"];
  let errorInSentenceCreation = false;
  let resultArr = [];

  let defaultSentenceNumber = 50;
  let egSentenceNumber = req.body.egSentenceNumber || defaultSentenceNumber;
  let sentenceSkeletonArray = egSentences[egSentenceNumber];

  let wordbankCopy = {};
  let wordbankKeys = Object.keys(wordbank);
  wordbankKeys.forEach((wordbankKey) => {
    wordbankCopy[wordbankKey] = {
      ...wordbank[wordbankKey],
    };
  });

  if (req.body.useDummyWords) {
    wordbankKeys.forEach((wordbankKey) => {
      wordbankCopy[wordbankKey] = {
        ...wordbankCopy[wordbankKey],
        ...dummyWords[wordbankKey],
      };
    });
  }

  // We take tags to be potentially multiple in both Source and Spec.
  // We take keys to be potentially multiple in Spec, but always singular in Source.

  sentenceSkeletonArray.forEach((spec) => {
    if (typeof spec === "string") {
      resultArr.push(spec);
    } else {
      let source = wordbankCopy[scUtils.giveSetKey(spec.type)];
      let matches = [];

      matches = scUtils.filterByTag(source, spec.manTags, true);
      matches = scUtils.filterByTag(matches, spec.optTags, false);
      matches = scUtils.filterByKey(matches, spec.gender, "gender");
      matches = scUtils.filterOutDefectiveInflections(
        matches,
        spec,
        inflectionChain
      );

      if (matches.length) {
        let selectedLemmaObj = scUtils.selectRandom(matches);
        console.log(
          "palette.model.js says selectedLemmaObj is " + selectedLemmaObj.lemma
        );

        let selectedWord = scUtils.filterWithinObjectByNestedKeys(
          selectedLemmaObj.inflections,
          spec,
          inflectionChain
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

  console.log("-------------------------------------------->" + finalSentence);

  let responseObj = { number: 1 };

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
