const scUtils = require("../utils/sentenceCreationUtils.js");
const { wordbank } = require("../utils/wordbank.js");

exports.fetchPalette = () => {
  let result = "No sentence created yet.";
  let giveDummyResponse = true;

  if (!giveDummyResponse) {
    let word1 = {
      type: "noun",
      manTags: ["person"],
      optTags: [],
      gcase: ["nom"],
      number: ["singular"],
      gender: ["n"],
    };
    let word2 = "ma na sobie";
    let word3 = {
      type: "noun",
      manTags: ["wearable"],
      optTags: [],
      gcase: ["acc"],
      number: [],
      gender: [],
    };

    let sentence50array = [word1, word2, word3];

    //Majtki should be avoided for spec "singular".
    //Majtki should be usable for spec [].
    //Majtki should be usable for spec "plural".

    //We take tags to be potentially multiple in both Source and Spec.
    //We take keys to be potentially multiple in Spec, but always singular in Source.

    let resultArr = [];
    sentence50array.forEach((spec) => {
      let inflectionChain = ["number", "gcase"];

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
  }

  return Promise.all([result]).then((array) => {
    return array[0];
  });
};
