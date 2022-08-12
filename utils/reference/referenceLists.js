exports.tantumTypes = ["tantumPlurale", "tantumSingulare"];

exports.incompatibleTraitsRef = {
  POL: {
    //If we're examining gender traitKey.
    gender: {
      //Check the "number" traitKey...
      number: {
        //...and if the number traitValues do not include "singular", remove these gender traitValues.
        singular: ["m", "m1", "m2", "m3", "f", "n"],
        //...and if the number does not include "plural", remove these gender traitValues.
        plural: ["virile", "nonvirile"],
      },
      //Check the "person" traitKey...
      person: {
        //...and if the person traitValues do not include "3per", remove these gender traitValues.
        "3per": ["m2", "m3", "n"],
      },
    },
  },
  ENG: {
    //If we're examining gender.
    gender: {
      //Check the number...
      number: {
        //...and if the number does not include singular, remove these gender traitValues.
        singular: ["m", "f", "n"],
        ///...and if the number does not include plural, remove these gender traitValues.
        plural: ["virile", "nonvirile"],
      },
    },
  },
};

exports.metaCorrectionRef = {
  ENG: {
    gender: [
      {
        condition: { number: "singular" },
        changeRef: {
          allGenders: "allSingularGenders",
          allSingularGenders: "allSingularGenders",
          allPluralGenders: false,
          allPersonalGenders: "allPersonalSingularGenders",
          allPersonalSingularGenders: "allPersonalSingularGenders",
          allPersonalPluralGenders: false,
        },
      },
      {
        condition: { number: "plural" },
        changeRef: {
          allGenders: "allPluralGenders",
          allSingularGenders: false,
          allPluralGenders: "allPluralGenders",
          allPersonalGenders: "allPersonalPluralGenders",
          allPersonalSingularGenders: false,
          allPersonalPluralGenders: "allPersonalPluralGenders",
        },
      },
    ],
  },
  POL: {
    gender: [
      {
        condition: { number: "singular" },
        changeRef: {
          allGenders: "allSingularGenders",
          allSingularGenders: "allSingularGenders",
          allPluralGenders: false,
          allPersonalGenders: "allPersonalSingularGenders",
          allPersonalSingularGenders: "allPersonalSingularGenders",
          allPersonalPluralGenders: false,
        },
      },
      {
        condition: { number: "plural" },
        changeRef: {
          allGenders: "allPluralGenders",
          allSingularGenders: false,
          allPluralGenders: "allPluralGenders",
          allPersonalGenders: "allPersonalPluralGenders",
          allPersonalSingularGenders: false,
          allPersonalPluralGenders: "allPersonalPluralGenders",
        },
      },
    ],
  },
};

// exports.gendersByNumber = {
//   singular: ["m", "n", "f", "m1", "m2", "m3"],
//   plural: ["virile", "nonvirile"],
// };

exports.metaTraitValues = {
  ENG: {
    gcase: {
      allGcases: ["nom", "acc", "gen", "dat"],
    },
    number: {
      allNumbers: ["singular", "plural"],
    },
    person: {
      allPers: ["1per", "2per", "3per"],
    },
    form: { pronombreAndDeterminer: ["pronombre", "determiner"] },
    gender: {
      allGenders: ["m", "n", "f", "virile", "nonvirile"],
      allSingularGenders: ["m", "f", "n"],
      allPluralGenders: ["virile", "nonvirile"],

      allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      allPersonalSingularGenders: ["m", "f"],
      allPersonalPluralGenders: ["virile", "nonvirile"],

      allNonpersonalGenders: ["n", "nonvirile"],
      // allNonpersonalSingularGenders: ["n"],
      allNonpersonalSingularGenders: ["m", "f", "n"], //Beta Is that right?
      allNonpersonalPluralGenders: ["nonvirile"],

      allSingularGendersExcludingNeuter: ["m", "f"],
      allMasculineSingularGenders: ["m"],
    },
  },
  POL: {
    gcase: {
      allGcases: ["nom", "acc", "gen", "dat", "loc", "ins"],
    },
    number: {
      allNumbers: ["singular", "plural"],
    },
    person: {
      allPers: ["1per", "2per", "3per"],
    },
    form: { pronombreAndDeterminer: ["pronombre", "determiner"] },
    gender: {
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
      allSingularGenders: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"],
      allPluralGenders: ["virile", "nonvirile"],

      allPersonalGenders: ["m1", "f", "virile", "nonvirile"],
      allPersonalSingularGenders: ["m1", "f"],
      allPersonalPluralGenders: ["virile", "nonvirile"],

      allNonpersonalGenders: ["m2", "m3", "f", "n", "nonvirile"],
      allNonpersonalSingularGenders: ["m2", "m3", "f", "n"],
      allNonpersonalPluralGenders: ["nonvirile"],

      allSingularGendersExcludingNeuter: ["m1", "m2", "m3", "f", "f", "f"],
      allMasculineSingularGenders: ["m1", "m2", "m3"],
    },
  },
};

exports.lemmaObjectTraitKeys = {
  POL: {
    selectors: {
      nounCommon: ["gender"],
      nounPerson: ["gender"],
      verb: ["aspect"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      nounCommon: ["number", "gcase"],
      nounPerson: ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
      pronombre: ["form", "person", "number", "gender", "gcase"],
      //MASSACHEUSETTS
      // pronombrePERSONAL: ["form", "person", "number", "gender", "gcase"],
      // pronombrePOSSESSIVE: ["form", "person", "number", "gender", "number", "gender", "gcase"],
      // article: NONE
      preposition: ["form"],
    },
    inheritableInflectionKeys: {
      nounCommon: ["number", "gcase"],
      nounPerson: ["number", "gcase", "gender"],
      adjective: ["number", "gender", "gcase"],
      verb: [
        "tense",
        "person",
        "number",
        "gender",
        "aspect",
        "tenseDescription",
      ],
      pronombre: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      nounCommon: ["number"],
      nounPerson: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronombre: ["person", "number", "gender"],
      preposition: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      nounCommon: ["gcase"],
      nounPerson: ["gcase"],
      adjective: [],
      verb: [],
      pronombre: [],
    },
  },
  ENG: {
    selectors: {
      nounCommon: ["gender"],
      nounPerson: ["gender"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      nounCommon: ["number", "gcase"],
      nounPerson: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
      pronombre: ["form", "person", "number", "gender", "gcase"],
      article: ["form", "number"],
      preposition: ["form"],
    },
    inheritableInflectionKeys: {
      nounCommon: ["number", "gcase"],
      nounPerson: ["number", "gcase", "gender"],
      adjective: [],
      verb: ["tense", "person", "number"],
      pronombre: ["person", "number", "gender", "gcase"],
      article: ["number"],
    },
    allowableTransfersFromQuestionStructure: {
      nounCommon: ["number"],
      nounPerson: ["number"],
      adjective: ["form"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronombre: ["form", "person", "number", "gender"],
      article: [],
      preposition: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      nounCommon: [],
      nounPerson: [],
      adjective: [],
      verb: [],
      pronombre: [],
    },
  },
};

exports._tenseDescriptions = {
  POL: [
    "past im",
    "present im",
    "future im",
    "past pf",
    "future pf",
    // "imperative",
    // "negative imperative",
    // "conditional im",
    // "conditional pf",
    // "cond0 condition",
    // "cond0 outcome",
    // "cond1 condition",
    // "cond1 outcome",
    // "cond2 condition",
    // "cond2 outcome",
    // "cond3 condition",
    // "cond3 outcome",
  ],
  ENG: [
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
};

exports.structureChunkTraits = {
  //Some trait are lexical (isLexical: true), used to directly find word values, eg "gender", "gcase".
  //Others are functional (isLexical: false), eg "specificalLemmas", "preventAddingFurtherClarifiers", "andTags".
  ALL: {
    //
    //
    //    These stCh traits require validation that given traitValues are okay.
    //
    //
    preventAddingFurtherClarifiers: { expectedTypeOnStCh: "boolean" },
    pleaseShowMultipleWordtypeAllohomClarifiers: {
      expectedTypeOnStCh: "boolean",
      needsNoValidation: true,
    },
    educatorBlocksAnnotationsForTheseTraitKeys: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
    },
    formulaImportantTraitKeys: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
    },
    blockedLemmaObjectTypes: {
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["tantumPlurale", "tantumSingulare"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
    },
    hiddenTraits: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
    },
    doNotUpdateSpecificIdsAsIsJustOneMDN: {
      expectedTypeOnStCh: "boolean",
      needsNoValidation: true,
    },
    // counterfactuallyImportantTraitKeys: {
    //   expectedTypeOnStCh: "array",
    //   ultimatelyMultipleTraitValuesOkay: true,
    // },
    dontSpecifyOnThisChunk: { expectedTypeOnStCh: "boolean" },
    specificIds: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    andTags: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    orTags: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    chunkId: { expectedTypeOnStCh: "string" },
    merelyPreferredChoicesForQuestionSentence: {
      expectedTypeOnStCh: "array",
    },
    // wordtype: {
    //   expectedTypeOnStCh: "string",
    //   possibleTraitValues: [
    //     "nounPerson","nounCommon",
    //     "adjective",
    //     "verb",
    //     "adverb",
    //     "pronombre",
    //     "preposition",
    //     "article",
    //     "fixed",
    //   ],
    // },
    agreeWith: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    agreeWith2: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pronombre"],
    },
    PHD_type: {
      expectedTypeOnStCh: "string",
    },
    postHocAgreeWithPrimary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pronombre"],
    },
    postHocAgreeWithSecondary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pronombre"],
    },
    postHocAgreeWithTertiary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pronombre"],
    },
    // connectedTo: {
    //   expectedTypeOnStCh: "string",
    //   mustBeExistingChunkId: true,
    // },
    chunkValue: {
      expectedTypeOnStCh: "string",
      compatibleWordtypes: ["fixed"],
    },
  },
  POL: {
    //
    //
    //    These stCh traits require validation that given traitValues are okay.
    //
    //
    form: {
      expectedTypeOnStCh: "array",
      isLexical: true,
      compatibleWordtypes: ["adjective", "pronombre", "verb", "preposition"],
      possibleTraitValuesPerWordtype: {
        adjective: ["simple", "comparative", "superlative", "adverb"],
        pronombre: ["pronombre", "pronombreAndDeterminer", "determiner"],
        verb: [
          "verbal",
          "infinitive",
          "contemporaryAdverbial",
          "passiveAdjectival",
          "activeAdjectival",
          "anteriorAdverbial",
          "verbalNoun",
        ],
        preposition: ["onlyForm"],
      },
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      isLexical: true,
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: this._tenseDescriptions["POL"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["verb"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["POL"],
    },
    person: {
      isLexical: true,
      compatibleWordtypes: ["nounPerson", "nounCommon", "verb", "pronombre"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per", "impersonal"],
    },
    gender: {
      isLexical: true,
      compatibleWordtypes: [
        "nounPerson",
        "nounCommon",
        "verb",
        "adjective",
        "pronombre",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
        "m",
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
      isLexical: true,
      compatibleWordtypes: [
        "nounPerson",
        "nounCommon",
        "verb",
        "adjective",
        "pronombre",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      isLexical: true,
      compatibleWordtypes: [
        "nounPerson",
        "nounCommon",
        "adjective",
        "pronombre",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc", "ins", "loc"],
    },
    aspect: {
      isLexical: true,
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["imperfective", "perfective"],
    },
    tense: {
      isLexical: true,
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
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
    //    These stCh traits require validation that given traitValues are okay.
    //
    //
    form: {
      expectedTypeOnStCh: "array",
      isLexical: true,
      compatibleWordtypes: [
        "adjective",
        "pronombre",
        "article",
        "verb",
        "preposition",
      ],
      possibleTraitValuesPerWordtype: {
        adjective: ["simple"],
        pronombre: ["pronombre", "determiner"],
        article: ["definite", "indefinite"],
        verb: ["verbal", "infinitive", "v2", "v3", "thirdPS", "gerund"],
        preposition: ["onlyForm"],
      },
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      isLexical: true,
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: this._tenseDescriptions["ENG"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["verb"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["ENG"],
    },
    person: {
      isLexical: true,
      compatibleWordtypes: ["nounPerson", "nounCommon", "verb", "pronombre"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per"],
    },
    gender: {
      isLexical: true,
      compatibleWordtypes: ["nounPerson", "nounCommon", "pronombre"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["m", "f", "n", "virile", "nonvirile"],
    },
    number: {
      isLexical: true,
      compatibleWordtypes: [
        "nounPerson",
        "nounCommon",
        "verb",
        "pronombre",
        "article",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      isLexical: true,
      compatibleWordtypes: ["nounPerson", "nounCommon", "pronombre"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc"],
    },
    tense: {
      isLexical: true,
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
        "past",
        "present",
        "future",
        "conditional",
        "imperative",
      ],
    },
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

exports.adhocInflectionCategorys = {
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

exports.getNounGenderTraitValues = (wordtypeShorthand) => {
  ref = {
    nco: "allNonpersonalSingularGenders",
    npe: "allPersonalSingularGenders",
    ver: "allNonpersonalSingularGenders",
    adj: "allNonpersonalSingularGenders",
    adv: "allNonpersonalSingularGenders",
    pro: "allNonpersonalSingularGenders",
    art: "allNonpersonalSingularGenders",
    pre: "allNonpersonalSingularGenders",
    fix: "allNonpersonalSingularGenders",
  };

  return ref[wordtypeShorthand];
};

exports.wordtypeShorthandTranslation = {
  nco: "nounCommon",
  npe: "nounPerson",
  ver: "verb",
  adj: "adjective",
  adv: "adverb",
  pro: "pronombre",
  art: "article",
  pre: "preposition",
  fix: "fixed",
};

exports.defaultTraitValues = {
  adjective: { form: ["simple"] },
  pronombre: { form: ["pronombre"], gcase: ["nom"] },
  nounCommon: { gcase: ["nom"] },
  nounPerson: { gcase: ["nom"] },
  verb: { form: ["verbal"] },
  preposition: { form: ["onlyForm"] },
};

exports.agreementTraits = [
  "agreeWith",
  //"agreeWith2", not technically an agreeKey as gets removed and replaced by postHocAgreeWithSecondary.
  "postHocAgreeWithPrimary",
  "postHocAgreeWithSecondary",
  "postHocAgreeWithTertiary",
];
