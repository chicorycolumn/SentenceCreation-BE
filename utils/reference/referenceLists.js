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
  SPA: {
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
          _Genders: "_SingularGenders",
          _SingularGenders: "_SingularGenders",
          _PluralGenders: false,
          _PersonalGenders: "_PersonalSingularGenders",
          _PersonalSingularGenders: "_PersonalSingularGenders",
          _PersonalPluralGenders: false,
        },
      },
      {
        condition: { number: "plural" },
        changeRef: {
          _Genders: "_PluralGenders",
          _SingularGenders: false,
          _PluralGenders: "_PluralGenders",
          _PersonalGenders: "_PersonalPluralGenders",
          _PersonalSingularGenders: false,
          _PersonalPluralGenders: "_PersonalPluralGenders",
        },
      },
    ],
  },
  SPA: {
    gender: [
      {
        condition: { number: "singular" },
        changeRef: {
          _Genders: "_SingularGenders",
          _SingularGenders: "_SingularGenders",
          _PluralGenders: false,
          _PersonalGenders: "_PersonalSingularGenders",
          _PersonalSingularGenders: "_PersonalSingularGenders",
          _PersonalPluralGenders: false,
        },
      },
      {
        condition: { number: "plural" },
        changeRef: {
          _Genders: "_PluralGenders",
          _SingularGenders: false,
          _PluralGenders: "_PluralGenders",
          _PersonalGenders: "_PersonalPluralGenders",
          _PersonalSingularGenders: false,
          _PersonalPluralGenders: "_PersonalPluralGenders",
        },
      },
    ],
  },
  POL: {
    gender: [
      {
        condition: { number: "singular" },
        changeRef: {
          _Genders: "_SingularGenders",
          _SingularGenders: "_SingularGenders",
          _PluralGenders: false,

          _PersonalGenders: "_PersonalSingularGenders",
          _PersonalSingularGenders: "_PersonalSingularGenders",
          _PersonalPluralGenders: false,
        },
      },
      {
        condition: { number: "plural" },
        changeRef: {
          _Genders: "_PluralGenders",
          _SingularGenders: false,
          _PluralGenders: "_PluralGenders",

          _PersonalGenders: "_PersonalPluralGenders",
          _PersonalSingularGenders: false,
          _PersonalPluralGenders: "_PersonalPluralGenders",
        },
      },
    ],
  },
};

exports.metaTraitValues = {
  ENG: {
    gcase: {
      _Gcases: ["nom", "acc", "gen", "dat"],
    },
    number: {
      _Numbers: ["singular", "plural"],
    },
    person: {
      _Pers: ["1per", "2per", "3per", "impersonal"],
      _PersExludingImpersonal: ["1per", "2per", "3per"],
    },
    form: { _pronombreAndDeterminer: ["pronombre", "determiner"] },
    gender: {
      _Genders: ["m", "n", "f", "virile", "nonvirile"],
      _SingularGenders: ["m", "f", "n"],
      _PluralGenders: ["virile", "nonvirile"],

      _PersonalGenders: ["m", "f", "virile", "nonvirile"],
      _PersonalSingularGenders: ["m", "f"],
      _PersonalPluralGenders: ["virile", "nonvirile"],

      _NonpersonalGenders: ["n", "nonvirile"],
      // _NonpersonalSingularGenders: ["n"],
      _NonpersonalSingularGenders: ["m", "f", "n"], //Beta Is that right?
      _NonpersonalPluralGenders: ["nonvirile"],

      _SingularGendersExcludingNeuter: ["m", "f"],
      _MasculineSingularGenders: ["m"],
    },
  },
  SPA: {
    gcase: {
      _Gcases: ["nom", "acc", "gen", "dat"],
    },
    number: {
      _Numbers: ["singular", "plural"],
    },
    person: {
      _Pers: ["1per", "2per", "3per", "impersonal"],
      _PersExludingImpersonal: ["1per", "2per", "3per"],
    },
    form: { _pronombreAndDeterminer: ["pronombre", "determiner"] },
    gender: {
      _Genders: ["m", "f", "virile", "nonvirile"],
      _SingularGenders: ["m", "f"],
      _PluralGenders: ["virile", "nonvirile"],

      _PersonalGenders: ["m", "f", "virile", "nonvirile"],
      _PersonalSingularGenders: ["m", "f"],
      _PersonalPluralGenders: ["virile", "nonvirile"],

      _NonpersonalGenders: ["m", "f", "nonvirile"], //beta is that right?
      _NonpersonalSingularGenders: ["m", "f"],
      _NonpersonalPluralGenders: ["nonvirile"],

      _SingularGendersExcludingNeuter: ["m", "f"],
      _MasculineSingularGenders: ["m"],
    },
  },
  POL: {
    aspect: {
      _imOnly: ["imperfective", "perfective"],
    },
    gcase: {
      _Gcases: ["nom", "acc", "gen", "dat", "loc", "ins"],
    },
    number: {
      _Numbers: ["singular", "plural"],
    },
    person: {
      _Pers: ["1per", "2per", "3per", "impersonal"],
      _PersExludingImpersonal: ["1per", "2per", "3per"],
    },
    form: { _pronombreAndDeterminer: ["pronombre", "determiner"] },
    gender: {
      _Genders: [
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
      _SingularGenders: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"],
      _PluralGenders: ["virile", "nonvirile"],

      _PersonalGenders: ["m1", "f", "virile", "nonvirile"],
      _PersonalSingularGenders: ["m1", "f"],
      _PersonalPluralGenders: ["virile", "nonvirile"],

      _NonpersonalGenders: ["m2", "m3", "f", "n", "nonvirile"],
      _NonpersonalSingularGenders: ["m2", "m3", "f", "n"],
      _NonpersonalPluralGenders: ["nonvirile"],

      _SingularGendersExcludingNeuter: ["m1", "m2", "m3", "f", "f", "f"],
      _MasculineSingularGenders: ["m1", "m2", "m3"],
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
  SPA: {
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
      adjective: ["form", "number", "gender"],
      verb: ["form", "tense", "gender", "person", "number"], // "gender" will be _Genders for in all tenses except pastParticiple ie hechas, escritos.
      pronombre: ["form", "person", "number", "gender", "gcase"],
      article: ["form", "number", "gender"],
      preposition: ["form"],
    },
    inheritableInflectionKeys: {
      nounCommon: ["number", "gcase"],
      nounPerson: ["number", "gcase", "gender"],
      adjective: ["number", "gender"],
      verb: [
        "tense",
        "person",
        "number",
        "gender", // Los libros son escritos. --> "libros" gives gender and number to "escritos"
        // "tenseDescription" // epsilon add this, and to ENG too?
      ],
      pronombre: ["person", "number", "gender", "gcase"],
      article: ["number", "gender"],
    },
    allowableTransfersFromQuestionStructure: {
      nounCommon: ["number"],
      nounPerson: ["number"],
      adjective: ["form", "number", "gender"],
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
  SPA: [
    "present",
    "present simple",
    "past",
    "past simple",
    "future",
    "future simple",
  ], //epsilon to do
};

exports.structureChunkTraits = {
  //Some traits are lexical (isLexical: true), used to directly find word values, eg "gender", "gcase".
  //Others are functional (isLexical: false), eg "specificLemmas", "preventAddingFurtherClarifiers", "andTags".
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
    doNotUpdateSpecificIdsAsIsJustOneMGN: {
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
    isPerson: {
      expectedTypeOnStCh: "boolean",
      compatibleWordtypes: ["pronombre"],
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
        pronombre: ["pronombre", "_pronombreAndDeterminer", "determiner"],
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
        "n",
        "virile",
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
      possibleTraitValues: ["imperfective", "perfective", "_imOnly"],
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
  SPA: {
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
        adjective: ["simple", "comparative", "superlative", "adverb"],
        pronombre: ["pronombre", "_pronombreAndDeterminer", "determiner"],
        article: ["definite", "indefinite"],
        verb: ["verbal", "infinitive", "pastParticiple", "gerund"],
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
      possibleTraitValues: this._tenseDescriptions["SPA"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["verb"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["SPA"],
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
        "verb", // Las tortas estan hechas. --> "tortas" gives gender and number to "hechas".
        "adjective",
        "pronombre",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["m", "f", "virile", "nonvirile"],
    },
    number: {
      isLexical: true,
      compatibleWordtypes: [
        "nounPerson",
        "nounCommon",
        "verb",
        "pronombre",
        "adjective",
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
        "imperative", // epsilon to do
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
        adjective: ["simple", "comparative", "superlative", "adverb"],
        pronombre: ["pronombre", "_pronombreAndDeterminer", "determiner"],
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
  SPA: {
    verb: [],
  },
};

exports.adhocInflectionCategorys = {
  POL: {},
  SPA: {},
  ENG: { verb: ["tenseDescription"] }, // epsilon what is this for?
  // But Polish doesn't have tenseDesc as an adhoc category?
};

exports.adhocForms = {
  SPA: {},
  POL: {},
  ENG: {
    verb: [
      // epsilon these are english?
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
    nco: "_NonpersonalSingularGenders",
    npe: "_PersonalSingularGenders",
    ver: "_NonpersonalSingularGenders",
    adj: "_NonpersonalSingularGenders",
    adv: "_NonpersonalSingularGenders",
    pro: "_NonpersonalSingularGenders",
    art: "_NonpersonalSingularGenders",
    pre: "_NonpersonalSingularGenders",
    fix: "_NonpersonalSingularGenders",
  };

  return ref[wordtypeShorthand];
};

exports.malePersonsInThisLanguageHaveWhatGender = {
  POL: "m1",
  ENG: "m",
  SPA: "m",
};

exports.collapsibleMasculineGenders = {
  POL: { singular: { m: ["m1", "m2", "m3"] } },
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
  pronombre: {
    form: ["pronombre"],
    gcase: ["nom"],
    person: ["1per", "2per", "3per"],
    /** Have decided not to have default values for gender or number.
     *
     *  Was tempted {number: [singular]} but when number key left blank wo do want it to choose from both singular and plural.
     *
     *  Was tempted {gender: [m, f]} to avoid "Kim ona jest?" from randomly selecting "ono".
     *  So instead the educator would always remember to check all then uncheck n for pronombre chunk in sentences like these,
     *  but I have a better solution - an "isPerson" key on stCh which strips out n from gender array.
     */
  },
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

exports.punctuation = ["!", "?", ".", ",", ":", ";", "..."];
