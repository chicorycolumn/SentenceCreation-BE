exports.tenseDescriptionTranslation = {
  //Note, this is NOT a Washburne style reference object. And that's okay.
  ENG: {
    POL: {
      "past simple": { regular: ["past pf"] },
      // "past going to": [""], //This would need to be translated by more elaborate, so should be handled within sentenceStructre.
      "past continuous": { regular: ["past im"] },
      "past perfect": { regular: ["past pf"] },
      "present simple": { regular: ["present im"] },
      "present continuous": { regular: ["present im"] },
      "present perfect": { regular: ["past im", "past pf"] },
      "future simple": { regular: ["future pf"] },
      "future goingto": { regular: ["future pf"] },
      "future continuous": { regular: ["future im"] },
      "future goingto continuous": { regular: ["future im"] },
      "future perfect": { regular: ["future pf"] },
      imperative: { regular: ["imperative"] },
      "negative imperative": { regular: ["negative imperative"] },
      "cond0 condition": { regular: ["cond0 condition"] },
      "cond0 outcome": { regular: ["cond0 outcome"] },
      "cond1 condition": { regular: ["cond1 condition"] },
      "cond1 outcome": { regular: ["cond1 outcome"] },
      "cond2 condition": { regular: ["cond2 condition"] },
      "cond2 outcome": { regular: ["cond2 outcome"] },
      "cond3 condition": { regular: ["cond3 condition"] },
      "cond3 outcome": { regular: ["cond3 outcome"] },
    },
  },
};

exports.pluralVirilityAndSingularConversionRef = {
  ENG: {
    singular: {
      m: ["m"],
      f: ["f"],
      n: ["n"],
      virile: ["m"],
      nonvirile: ["f", "n"],
      //Epsilon: So is this deletable?
      // allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      // allSingularGenders: ["m", "f", "n"],
      // allPersonalSingularGenders: ["m", "f"],
      // allPluralGenders: ["virile", "nonvirile"],
      // allGenders: ["m", "n", "f", "virile", "nonvirile"],
    },
    plural: {
      m: ["virile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
  },
  POL: {
    singular: {
      m: ["m"],
      m1: ["m1"],
      m2: ["m2"],
      m3: ["m3"],
      f: ["f"],
      n: ["n"],
      virile: ["m1"],
      nonvirile: ["m2", "m3", "f", "n"],
    },
    plural: {
      m: ["virile"],
      m1: ["virile"],
      m2: ["nonvirile"],
      m3: ["nonvirile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
  },
};

exports.featureValueTranslation = {
  POL: {
    ENG: {
      gender: {
        m1: ["m"],
        m2: ["n"],
        m3: ["n"],
        allSingularGendersExcludingNeuter: ["allPersonalSingularGenders"],
        allSingularGendersExcludingNeuterWithPadding: ["allSingularGenders"],
        allMasculineSingularGenders: ["m"],
      },
    },
  },
  ENG: {
    POL: {
      gender: {
        m: ["m1"],
      },
    },
  },
};

exports.annotationToPlainspeakRef = {
  gender: {
    m: "male",
    m1: "male",
    m2: "male",
    m3: "male",
    f: "female",
    n: "neuter",
    virile: ["mixed", "males"],
    nonvirile: "females",
  },
};
