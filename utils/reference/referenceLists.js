exports.metaFeatures = {
  ENG: {
    gender: {
      allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      allSingularGenders: ["m", "f", "n"],
      allPersonalSingularGenders: ["m", "f"],
      allPluralGenders: ["virile", "nonvirile"],
      allGenders: ["m", "n", "f", "virile", "nonvirile"],
    },
    // form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
  POL: {
    gender: {
      allPersonalGenders: ["m1", "f", "virile", "nonvirile"],
      allSingularGenders: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"],
      allPersonalSingularGenders: ["m1", "f"],
      allPluralGenders: ["virile", "nonvirile"],
      allGenders: [
        "m1",
        "m2",
        "m3",
        "n",
        "n",
        "n",
        "f",
        "f",
        "f",
        "virile",
        "virile",
        "virile",
        "nonvirile",
        "nonvirile",
        "nonvirile",
      ],
      //
      allSingularGendersExcludingNeuter: ["m1", "m2", "m3", "f", "f", "f"],
      allMasculineSingularGenders: ["m1", "m2", "m3"],
    },
    form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
};

exports.lemmaObjectFeatures = {
  POL: {
    selectors: {
      noun: ["gender"],
      verb: ["aspect"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
      // article: NONE
      preposition: ["form"],
    },
    inheritableInflectorKeys: {
      noun: ["number", "gcase"],
      adjective: ["number", "gender", "gcase"],
      verb: ["tense", "person", "number", "gender"],
      pronoun: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronoun: ["person", "number", "gender"],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      noun: ["gcase"],
      adjective: [],
      verb: [],
      pronoun: [],
    },
  },
  ENG: {
    selectors: { noun: ["gender"] },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
      article: ["form"],
      preposition: ["form"],
    },
    inheritableInflectorKeys: {
      noun: ["number", "gcase"],
      adjective: [],
      verb: ["tense", "person", "number"],
      pronoun: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form"],
      verb: ["tenseDescription", "person", "number"],
      pronoun: ["form", "person", "number", "gender"],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      noun: [],
      adjective: [],
      verb: [],
      pronoun: [],
    },
  },
};

exports.structureChunkFeatures = {
  POL: {
    //
    //
    //    These stCh features require validation that given values are okay.
    //
    //
    specificLemmas: { expectedTypeOnStCh: "array" },
    specificIds: { expectedTypeOnStCh: "array" },
    andTags: { expectedTypeOnStCh: "array" },
    orTags: { expectedTypeOnStCh: "array" },
    form: { expectedTypeOnStCh: "array" },
    chunkId: { expectedTypeOnStCh: "string" },
    // wordtype: { expectedTypeOnStCh: "string", possibleValues: ["noun", "adjective"] },
    agreeWith: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    connectedTo: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    postHocAgreeWithPrimary: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    postHocAgreeWithSecondary: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    postHocAgreeWithTertiary: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    value: { expectedTypeOnStCh: "string" },
    //
    //
    //    These stCh features get validation by their possibleValues arr.
    //
    //
    tenseDescription: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleValues: [
        "past im",
        "present im",
        "future im",
        "past pf",
        "future pf",
        "imperative",
        "negative imperative",
        "conditional im",
        "conditional pf",
        "cond0 condition",
        "cond0 outcome",
        "cond1 condition",
        "cond1 outcome",
        "cond2 condition",
        "cond2 outcome",
        "cond3 condition",
        "cond3 outcome",
      ],
    },
    person: {
      compatibleWordtypes: ["noun", "verb", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["1per", "2per", "3per", "impersonal"],
    },
    gender: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: [
        "m1",
        "m2",
        "m3",
        "f",
        "f",
        "f",
        "n",
        "n",
        "n",
        "virile",
        "virile",
        "virile",
        "nonvirile",
        "nonvirile",
        "nonvirile",
      ],
    },
    number: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["singular", "plural"],
    },
    gcase: {
      compatibleWordtypes: ["noun", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["nom", "gen", "dat", "acc", "ins", "loc"],
    },
    aspect: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleValues: ["imperfective", "perfective"],
    },
    tense: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleValues: [
        "past",
        "present",
        "future",
        "conditional",
        "imperative",
      ],
    },
  },
  ENG: {
    //
    //
    //    These stCh features require validation that given values are okay.
    //
    //
    specificLemmas: { expectedTypeOnStCh: "array" },
    specificIds: { expectedTypeOnStCh: "array" },
    andTags: { expectedTypeOnStCh: "array" },
    orTags: { expectedTypeOnStCh: "array" },
    form: { expectedTypeOnStCh: "array" },
    chunkId: { expectedTypeOnStCh: "string" },
    // wordtype: { expectedTypeOnStCh: "string", possibleValues: ["noun", "adjective"] },
    agreeWith: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    connectedTo: {
      expectedTypeOnStCh: "string",
      possibleValueMustBeExistingChunkId: true,
    },
    // postHocAgreeWithPrimary: {
    //   expectedTypeOnStCh: "string",possibleValueMustBeExistingChunkId: true,
    //
    // },
    // postHocAgreeWithSecondary: {
    //   expectedTypeOnStCh: "string",possibleValueMustBeExistingChunkId: true,
    //
    // },
    // postHocAgreeWithTertiary: {
    //   expectedTypeOnStCh: "string",possibleValueMustBeExistingChunkId: true,
    //
    // },
    value: { expectedTypeOnStCh: "string" },
    //
    //
    //    These stCh features get validation by their possibleValues arr.
    //
    //
    tenseDescription: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleValues: [
        "past",
        "present",
        "future",
        "past simple",
        "past continuous",
        "past perfect",
        "present simple",
        "present continuous",
        "present perfect",
        "future simple",
        "future continuous",
        "future perfect",
      ],
    },
    person: {
      compatibleWordtypes: ["noun", "verb", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["1per", "2per", "3per"],
    },
    gender: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["m", "f", "n", "virile", "nonvirile"],
    },
    number: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["singular", "plural"],
    },
    gcase: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleValues: ["nom", "gen", "dat", "acc"],
    },
    // aspect: {
    //   expectedTypeOnStCh: "array",
    //   possibleValues: ["imperfective", "perfective"],
    // },
    tense: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleValues: [
        "past",
        "present",
        "future",
        "conditional",
        "imperative",
      ],
    },
  },
};

exports.allFeatureValues = {
  ENG: {
    tenseDescription: [
      "past simple",
      "past continuous",
      "past perfect",
      "present simple",
      "present continuous",
      "present perfect",
      "future simple",
      "future continuous",
      "future perfect",
    ],
    gender: [
      "m",
      "f",
      "n",
      "virile",
      "nonvirile",
      // "allPersonalGenders",
      // "allSingularGenders",
    ],
  },
  POL: {
    tenseDescription: [
      "past im",
      "present im",
      "future im",
      "past pf",
      "future pf",
      "imperative",
      "negative imperative",
      "cond0 condition",
      "cond0 outcome",
      "cond1 condition",
      "cond1 outcome",
      "cond2 condition",
      "cond2 outcome",
      "cond3 condition",
      "cond3 outcome",
    ],
    gender: [
      "m1",
      "m2",
      "m3",
      "f",
      "f",
      "f",
      "n",
      "n",
      "n",
      "virile",
      "virile",
      "virile",
      "nonvirile",
      "nonvirile",
      "nonvirile",
    ],
  },
};

exports.uninflectedForms = {
  POL: {
    verb: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      // "activeAdjectival", Would need to be conjugated as an adjective.
      // "passiveAdjectival", Would need to be conjugated as an adjective.
    ],
  },
  ENG: {
    verb: [],
  },
};

exports.adhocInflectors = {
  POL: {},
  ENG: { verb: ["tenseDescription"] },
};

exports.adhocForms = {
  POL: {},
  ENG: {
    verb: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      "activeAdjectival",
      "passiveAdjectival",
      "pastParticiple",
    ],
  },
};

exports.wordtypeShorthandTranslation = {
  nou: "noun",
  ver: "verb",
  adj: "adjective",
  adv: "adverb",
  pro: "pronoun",
  art: "article",
  pre: "preposition",
  fix: "fixed",
};
