const { lObjIsMGN, getWordtypeStCh } = require("../generalPurposeUtils");

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

exports.metaTraitValues = {
  ENG: {
    gender: {
      allGenders: ["m", "n", "f", "virile", "nonvirile"],
      allSingularGenders: ["m", "f", "n"],
      allPluralGenders: ["virile", "nonvirile"],

      allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      allPersonalSingularGenders: ["m", "f"],
      allPersonalPluralGenders: ["virile", "nonvirile"],

      allNonpersonalGenders: ["n", "nonvirile"],
      // allNonpersonalSingularGenders: ["n"],
      allNonpersonalSingularGenders: ["m", "f", "n"],
      allNonpersonalPluralGenders: ["nonvirile"],

      allSingularGendersExcludingNeuter: ["m", "f"],
      allMasculineSingularGenders: ["m"],
    },
    // form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
  POL: {
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
    form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
};

exports.lemmaObjectTraitKeys = {
  POL: {
    selectors: {
      noun: ["gender"],
      "noun-common": ["gender"],
      "noun-common-proper": ["gender"],
      "noun-person": ["gender"],
      "noun-person-proper": ["gender"],
      verb: ["aspect"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      "noun-common": ["number", "gcase"],
      "noun-common-proper": ["number", "gcase"],
      "noun-person": ["number", "gcase"],
      "noun-person-proper": ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
      //MASSACHEUSETTS
      // pronounPERSONAL: ["form", "person", "number", "gender", "gcase"],
      // pronounPOSSESSIVE: ["form", "person", "number", "gender", "number", "gender", "gcase"],
      // article: NONE
      preposition: ["form"],
    },
    inheritableInflectionKeys: {
      "noun-common": ["number", "gcase"],
      "noun-common-proper": ["number", "gcase"],
      "noun-person": ["number", "gcase", "gender"],
      "noun-person-proper": ["number", "gcase", "gender"],
      adjective: ["number", "gender", "gcase"],
      verb: [
        "tense",
        "person",
        "number",
        "gender",
        "aspect",
        "tenseDescription",
      ],
      pronoun: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronoun: ["person", "number", "gender"],
      preposition: [],
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
      article: ["form", "number"],
      preposition: ["form"],
    },
    inheritableInflectionKeys: {
      "noun-common": ["number", "gcase"],
      "noun-common-proper": ["number", "gcase"],
      "noun-person": ["number", "gcase", "gender"],
      "noun-person-proper": ["number", "gcase", "gender"],
      adjective: [],
      verb: ["tense", "person", "number"],
      pronoun: ["person", "number", "gender", "gcase"],
      article: ["number"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronoun: ["form", "person", "number", "gender"],
      article: [],
      preposition: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      noun: [],
      adjective: [],
      verb: [],
      pronoun: [],
    },
  },
};

exports.structureChunkTraits = {
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
    counterfactuallyImportantTraitKeys: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    dontSpecifyOnThisChunk: { expectedTypeOnStCh: "boolean" },
    specificLemmas: { expectedTypeOnStCh: "array" },
    specificIds: { expectedTypeOnStCh: "array" },
    andTags: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    orTags: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
    },
    form: { expectedTypeOnStCh: "array" },
    chunkId: { expectedTypeOnStCh: "string" },
    preferredChoicesForQuestionSentence: {
      expectedTypeOnStCh: "keyValueObject",
    },
    // wordtype: {
    //   expectedTypeOnStCh: "string",
    //   possibleTraitValues: [
    //     "noun",
    //     "adjective",
    //     "verb",
    //     "adverb",
    //     "pronoun",
    //     "preposition",
    //     "article",
    //     "fixed",
    //   ],
    // },
    agreeWith: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    connectedTo: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    chunkValue: { expectedTypeOnStCh: "string" },
  },
  POL: {
    //
    //
    //    These stCh traits require validation that given traitValues are okay.
    //
    //
    postHocAgreeWithPrimary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    postHocAgreeWithSecondary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    postHocAgreeWithTertiary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
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
    },
    person: {
      compatibleWordtypes: ["noun", "verb", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per", "impersonal"],
    },
    gender: {
      compatibleWordtypes: ["noun", "verb", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
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
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      compatibleWordtypes: ["noun", "adjective", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc", "ins", "loc"],
    },
    aspect: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["imperfective", "perfective"],
    },
    tense: {
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
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      compatibleWordtypes: ["verb"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
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
      possibleTraitValues: ["1per", "2per", "3per"],
    },
    gender: {
      compatibleWordtypes: ["noun", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["m", "f", "n", "virile", "nonvirile"],
    },
    number: {
      compatibleWordtypes: ["noun", "verb", "pronoun", "article"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      compatibleWordtypes: ["noun", "pronoun"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc"],
    },
    tense: {
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

exports.nounGenderTraitValues = {
  nco: "allNonpersonalSingularGenders",
  ncp: "allNonpersonalSingularGenders",

  npe: "allPersonalSingularGenders",
  npp: "allPersonalSingularGenders",

  ver: "allNonpersonalSingularGenders",
  adj: "allNonpersonalSingularGenders",
  adv: "allNonpersonalSingularGenders",
  pro: "allNonpersonalSingularGenders",
  art: "allNonpersonalSingularGenders",
  pre: "allNonpersonalSingularGenders",
  fix: "allNonpersonalSingularGenders",
};

exports.wordtypeShorthandTranslation = {
  nco: "noun-common",
  ncp: "noun-common-proper",

  npe: "noun-person",
  npp: "noun-person-proper",

  ver: "verb",
  adj: "adjective",
  adv: "adverb",
  pro: "pronoun",
  art: "article",
  pre: "preposition",
  fix: "fixed",
};

exports.defaultTraitValues = {
  adjective: { form: ["simple"] },
  pronoun: { form: ["pronoun"], gcase: ["nom"] },
  noun: { gcase: ["nom"] },
  verb: { form: ["verbal"] },
  preposition: { form: ["onlyForm"] },
};
