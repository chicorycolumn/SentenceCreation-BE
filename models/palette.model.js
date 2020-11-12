const scUtils = require("../utils/sentenceCreationUtils.js");
const { wordbank } = require("../utils/wordbank.js");
const { egSentences } = require("../utils/egSentences.js");

exports.fetchPalette = (req) => {
  let sentenceSkeletonArray = [];
  let egSentenceNumber = 50;
  let inflectionChain = ["number", "gcase"];
  let errorInSentenceCreation = false;

  if (req.body.egSentenceNumber) {
    egSentenceNumber = req.body.egSentenceNumber;
  }

  if (req.body.useDummyWords) {
    wordbank.nounSet = { ...wordbank.nounSet, ...wordbank.dummyNoun };
    wordbank.adjectiveSet = {
      ...wordbank.adjectiveSet,
      ...wordbank.dummyAdjective,
    };
    wordbank.adverbSet = { ...wordbank.adverbSet, ...wordbank.dummyAdverb };
    wordbank.verbSet = { ...wordbank.verbSet, ...wordbank.dummyVerb };
  }

  sentenceSkeletonArray = egSentences[egSentenceNumber];

  //Majtki should be avoided for spec "singular".
  //Majtki should be usable for spec [].
  //Majtki should be usable for spec "plural".

  //We take tags to be potentially multiple in both Source and Spec.
  //We take keys to be potentially multiple in Spec, but always singular in Source.

  let resultArr = [];
  sentenceSkeletonArray.forEach((spec) => {
    if (typeof spec === "string") {
      resultArr.push(spec);
    } else {
      let source = wordbank[scUtils.giveSetKey(spec.type)];
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
          "palette.model.js say selectedLemmaObj is " + selectedLemmaObj.lemma
        );

        let selectedWord = scUtils.filterWithinObjectByNestedKeys(
          selectedLemmaObj.inflections,
          spec,
          inflectionChain
        );
        resultArr.push(selectedWord);
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
