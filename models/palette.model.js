exports.fetchPalette = () => {
  let result = "Hello from fetchPalette in model.";

  return Promise.all([result]).then((array) => {
    return array[0];
  });

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
      let source = dict[giveSetKey(spec.type)];
      let matches = [];

      matches = filterByTag(source, spec.manTags, true);
      matches = filterByTag(matches, spec.optTags, false);
      matches = filterByKey(matches, spec.gender, "gender");
      matches = filterOutDefectiveInflections(matches, spec, inflectionChain);

      let lemmaObj = selectRandom(matches);
      // console.log(lemmaObj)

      try {
        let result = filterWithinObjectByNestedKeys(
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
};
