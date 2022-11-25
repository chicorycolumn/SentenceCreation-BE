exports.tenseDescriptionTranslations = [
  // "past compound": [""], //This would need to be translated by more elaborate, so should be handled within sentenceStructre.
  { ENG: ["past simple"], POL: ["past pf"], SPA: ["past preterite"] },
  { ENG: ["past continuous"], POL: ["past im"], SPA: ["past imperfect"] },
  { ENG: ["past perfect"], POL: ["past pf"], SPA: ["past perfect"] },
  {
    ENG: ["present simple"],
    POL: ["present im"],
    SPA: ["present simple"],
  },
  {
    ENG: ["present continuous"],
    POL: ["present im"],
    SPA: ["present continuous"],
  },
  {
    ENG: ["present perfect"],
    POL: ["past im", "past pf"],
    SPA: ["present perfect"],
  },
  { ENG: ["future simple"], POL: ["future pf"], SPA: ["future simple"] },
  {
    ENG: ["future compound"],
    POL: ["future pf"],
    SPA: ["future compound"],
  },
  {
    ENG: ["future continuous"],
    POL: ["future im"],
    SPA: ["future simple"], // According to corpus, "I'll be sleeping" is just "DormirE", not "EstarE durmiendo"
  },
  {
    ENG: ["future compound continuous"],
    POL: ["future im"],
    SPA: ["future simple"],
  },
  { ENG: ["future perfect"], POL: ["future pf"], SPA: ["future perfect"] },
  { ENG: ["imperative"], POL: ["imperative"], SPA: ["imperative"] },
  {
    ENG: ["negative imperative"],
    POL: ["negative imperative"],
    SPA: ["negative imperative"],
  },
  {
    ENG: ["cond0 condition"],
    POL: ["cond0 condition"],
    SPA: ["cond0 condition"],
  },
  {
    ENG: ["cond0 outcome"],
    POL: ["cond0 outcome"],
    SPA: ["cond0 outcome"],
  },
  {
    ENG: ["cond1 condition"],
    POL: ["cond1 condition"],
    SPA: ["cond1 condition"],
  },
  {
    ENG: ["cond1 outcome"],
    POL: ["cond1 outcome"],
    SPA: ["cond1 outcome"],
  },
  {
    ENG: ["cond2 condition"],
    POL: ["cond2 condition"],
    SPA: ["cond2 condition"],
  },
  {
    ENG: ["cond2 outcome"],
    POL: ["cond2 outcome"],
    SPA: ["cond2 outcome"],
  },
  {
    ENG: ["cond3 condition"],
    POL: ["cond3 condition"],
    SPA: ["cond3 condition"],
  },
  {
    ENG: ["cond3 outcome"],
    POL: ["cond3 outcome"],
    SPA: ["cond3 outcome"],
  },
];

exports.virilityConversionRef = {
  ENG: {
    singular: {
      allValues: ["m", "f", "n"],
      m: ["m"],
      f: ["f"],
      n: ["n"],
      virile: ["m"],
      nonvirile: ["f", "n"],
    },
    plural: {
      allValues: ["virile", "nonvirile"],
      m: ["virile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
    matches: {
      m: ["m", "virile"],
      f: ["f", "nonvirile"],
      n: ["n", "nonvirile"],
      virile: ["virile", "m"],
      nonvirile: ["nonvirile", "f", "n"],
    },
    justOneGenderValue: {
      singular: {
        m: "m",
        f: "f",
        n: "n",
        virile: "_PersonalSingularGenders",
        nonvirile: "_SingularGenders",
      },
      plural: {
        m: "virile",
        f: "nonvirile",
        n: "nonvirile",
        virile: "virile",
        nonvirile: "nonvirile",
      },
    },
  },
  SPA: {
    singular: {
      allValues: ["m", "f"],
      m: ["m"],
      f: ["f"],
      virile: ["m"],
      nonvirile: ["f"],
    },
    plural: {
      allValues: ["virile", "nonvirile"],
      m: ["virile"],
      f: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
    matches: {
      m: ["m", "virile"],
      f: ["f", "nonvirile"],
      virile: ["virile", "m"],
      nonvirile: ["nonvirile", "f"],
    },
    justOneGenderValue: {
      singular: {
        m: "m",
        f: "f",
        virile: "_PersonalSingularGenders",
        nonvirile: "_SingularGenders",
      },
      plural: {
        m: "virile",
        f: "nonvirile",
        virile: "virile",
        nonvirile: "nonvirile",
      },
    },
  },
  POL: {
    singular: {
      allValues: ["m", "m1", "m2", "m3", "f", "n"],
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
      allValues: ["virile", "nonvirile"],
      m: ["virile"],
      m1: ["virile"],
      m2: ["nonvirile"],
      m3: ["nonvirile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
    matches: {
      m: ["m", "virile"],
      m1: ["m1", "virile"],
      m2: ["m2", "nonvirile"],
      m3: ["m3", "nonvirile"],
      f: ["f", "nonvirile"],
      n: ["n", "nonvirile"],
      virile: ["virile", "m", "m1"],
      nonvirile: ["nonvirile", "f", "n", "m2", "m3"],
    },
    justOneGenderValue: {
      singular: {
        m: "m",
        m1: "m1",
        m2: "m2",
        m3: "m3",
        f: "f",
        n: "n",
        virile: "_PersonalSingularGenders",
        nonvirile: "_SingularGenders",
      },
      plural: {
        m: "virile",
        m1: "virile",
        m2: "nonvirile",
        m3: "nonvirile",
        f: "nonvirile",
        n: "nonvirile",
        virile: "virile",
        nonvirile: "nonvirile",
      },
    },
  },
};

exports.traitValueTranslation = {
  //Delta here.
  POL: {
    ENG: {
      gender: {
        m1: ["m"],
        m2: ["m"],
        m3: ["m"],
        _SingularGendersExcludingNeuter: ["_PersonalSingularGenders"],
        _SingularGendersExcludingNeuterWithPadding: ["_SingularGenders"],
        _MasculineSingularGenders: ["m"],
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
