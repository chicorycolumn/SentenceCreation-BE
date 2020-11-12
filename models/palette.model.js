const scUtils = require("../utils/sentenceCreationUtils.js");
const { wordbank } = require("../utils/wordbank.js");
const { egSentences } = require("../utils/egSentences.js");

exports.fetchPalette = (req) => {
  console.log(req.body);
  let sentenceSkeletonArray = [];
  let egSentenceNumber = 50;
  let inflectionChain = ["number", "gcase"];

  if (req.body.egSentenceNumber) {
    egSentenceNumber = req.body.egSentenceNumber;
  }

  sentenceSkeletonArray = egSentences[req.body.egSentenceNumber];

  console.log(sentenceSkeletonArray);

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

      let lemmaObj = scUtils.selectRandom(matches);
      // console.log(lemmaObj)

      try {
        let result = scUtils.filterWithinObjectByNestedKeys(
          lemmaObj.inflections,
          spec,
          inflectionChain
        );
        resultArr.push(result);
      } catch {
        console.log("eerrrroorr");
      }
    }
  });

  return Promise.all([result]).then((array) => {
    return array[0];
  });
};
