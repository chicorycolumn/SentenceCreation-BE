exports.tantumTypes = ["tantumPlurale", "tantumSingulare"];

exports.HY = {
  VY: "vypernym", // virile hypernyms eg "padre" means both "parent" and "father"
  VO: "vyponym", // "madre" is including in meaning of "padre"
  HY: "hypernym", // "parent" is non gender specific
  HO: "hyponym", // "mother" and "father" are included in meaning of "parent"
  AofQVY: "answerChunkOfAQuestionChunkVypernym",
};

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
          _VypernymGenders: "m",
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
          _VypernymGenders: "virile", //Garibaldi says this not "_PersonalPluralGenders"
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
          _VypernymGenders: "m",
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
          _VypernymGenders: "virile", //Garibaldi says this not "_PersonalPluralGenders"
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
          _VypernymGenders: "m1",
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
          _VypernymGenders: "virile", //Garibaldi says this not "_PersonalPluralGenders"
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
      _NonpersonalSingularGenders: ["n"], // In ENG nonpersons cannot be m or f. I realise pet animals sometimes, but these will always be "it" in this app, see FYIP102.
      _NonpersonalPluralGenders: ["nonvirile"],

      _SingularGendersExcludingNeuter: ["m", "f"],
      _MasculineSingularGenders: ["m"],
      _VypernymGenders: ["m", "virile"], //Garibaldi says not include "nonvirile"
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

      _NonpersonalGenders: ["m", "f", "nonvirile"],
      _NonpersonalSingularGenders: ["m", "f"],
      _NonpersonalPluralGenders: ["nonvirile"],

      _SingularGendersExcludingNeuter: ["m", "f"],
      _MasculineSingularGenders: ["m"],
      _VypernymGenders: ["m", "virile"], //Garibaldi says not include "nonvirile"
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
        // Don't put "m" here.
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
      _VypernymGenders: [
        "m1",
        "virile", //Garibaldi says not include "nonvirile"
      ],
    },
  },
};

exports.lemmaObjectTraitKeys = {
  POL: {
    selectors: {
      nco: ["gender"],
      npe: ["gender"],
      ver: ["aspect"],
    },
    hybridSelectors: {
      ver: ["tenseDescription"],
    },
    inflectionChains: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase"],
      adj: ["form", "number", "gender", "gcase"],
      ver: ["form", "tense", "person", "number", "gender"],
      pro: ["form", "person", "number", "gender", "gcase"],
      //MASSACHEUSETTS
      // pronombrePERSONAL: ["form", "person", "number", "gender", "gcase"],
      // pronombrePOSSESSIVE: ["form", "person", "number", "gender", "number", "gender", "gcase"],
      // art: NONE
      pre: ["form"],
    },
    inheritableInflectionKeys: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase", "gender"],
      adj: ["number", "gender", "gcase"],
      ver: [
        "tense",
        "person",
        "number",
        "gender",
        "aspect",
        "tenseDescription",
      ],
      pro: ["person", "number", "gender", "semanticGender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      nco: ["number"],
      npe: ["number", "semanticGender", "virilityDetail"],
      adj: ["form", "number", "gender", "semanticGender"],
      ver: ["tenseDescription", "person", "number", "gender", "semanticGender"],
      pro: ["person", "number", "gender"],
      pre: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      nco: ["gcase"],
      npe: ["gcase"],
      adj: [],
      ver: [],
      pro: [],
    },
  },
  SPA: {
    selectors: {
      nco: ["gender"],
      npe: ["gender"],
    },
    hybridSelectors: {
      ver: ["tenseDescription"],
    },
    inflectionChains: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase"],
      adj: ["form", "number", "gender"],
      ver: ["form", "tense", "gender", "person", "number"], // "gender" will be _Genders in all tenses except pastParticiple ie hechas, escritos.
      pro: ["form", "person", "number", "gender", "gcase"],
      art: ["form", "number", "gender"],
      pre: ["form"],
    },
    inheritableInflectionKeys: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase", "gender"],
      adj: ["number", "gender"],
      ver: [
        "tense",
        "person",
        "number",
        "gender", // Los libros son escritos. --> "libros" gives gender and number to "escritos"
        // "tenseDescription" // epsilon add this, and to ENG too?
      ],
      pro: ["person", "number", "gender", "semanticGender", "gcase"],
      art: ["number", "gender"],
    },
    allowableTransfersFromQuestionStructure: {
      nco: ["number"],
      npe: ["number", "semanticGender", "virilityDetail"],
      adj: ["form", "number", "gender", "semanticGender"],
      ver: ["tenseDescription", "person", "number", "gender", "semanticGender"],
      pro: ["form", "person", "number", "gender", "semanticGender"],
      art: [],
      pre: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      nco: [],
      npe: [],
      adj: [],
      ver: [],
      pro: [],
    },
  },
  ENG: {
    selectors: {
      nco: ["gender"],
      npe: ["gender"],
    },
    hybridSelectors: {
      ver: ["tenseDescription"],
    },
    inflectionChains: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase"],
      adj: ["form"],
      ver: ["form", "tense", "person", "number"],
      pro: ["form", "person", "number", "gender", "gcase"],
      art: ["form", "number"],
      pre: ["form"],
    },
    inheritableInflectionKeys: {
      nco: ["number", "gcase"],
      npe: ["number", "gcase", "gender"],
      adj: [],
      ver: ["tense", "person", "number"],
      pro: ["person", "number", "gender", "semanticGender", "gcase"],
      art: ["number"],
    },
    allowableTransfersFromQuestionStructure: {
      nco: ["number"],
      npe: ["number", "semanticGender", "virilityDetail"],
      adj: ["form"],
      ver: ["tenseDescription", "person", "number", "gender", "semanticGender"],
      pro: ["form", "person", "number", "gender", "semanticGender"],
      art: [],
      pre: [],
    },
    allowableExtraClarifiersInSingleWordSentences: {
      nco: [],
      npe: [],
      adj: [],
      ver: [],
      pro: [],
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
    "imperative im",
    "imperative pf",
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
    originalSitSelectedLObj: {
      expectedTypeOnStCh: "keyValueObject",
    },
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
    wordtype: {
      expectedTypeOnStCh: "string",
      possibleTraitValues: [
        "npe",
        "nco",
        "adj",
        "ver",
        "adv",
        "pro",
        "pre",
        "art",
        "fix",
      ],
    },
    agreeWith: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
    },
    agreeWith2: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pro"],
    },
    PHD_type: {
      expectedTypeOnStCh: "string",
    },
    postHocAgreeWithPrimary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pro"],
    },
    postHocAgreeWithSecondary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pro"],
    },
    postHocAgreeWithTertiary: {
      expectedTypeOnStCh: "string",
      mustBeExistingChunkId: true,
      compatibleWordtypes: ["pro"],
    },
    // connectedTo: {
    //   expectedTypeOnStCh: "string",
    //   mustBeExistingChunkId: true,
    // },
    chunkValue: {
      expectedTypeOnStCh: "string",
      compatibleWordtypes: ["fix"],
    },
    isPerson: {
      expectedTypeOnStCh: "boolean",
      compatibleWordtypes: ["pro"],
    },
    hypernymy: {
      expectedTypeOnStCh: "string",
      compatibleWordtypes: ["npe"],
      possibleTraitValuesPerWordtype: {
        npe: [Object.values(exports.HY)],
      },
    },
    virilityDetail: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["npe"],
      possibleTraitValuesPerWordtype: {
        npe: ["mixed", "males", "males!", "male", "male!"],
        // The "!" is stronger, so "males" could come out with no clarifier, but "males!" will have clarifier that it is men only.
      },
    },
    semanticGender: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["npe"],
      possibleTraitValuesPerWordtype: {
        npe: ["m", "m1", "m2", "m3", "f", "virile", "nonvirile"],
      },
    },
    giveMeTheseClarifiersOfMyHeadChunk: {
      expectedTypeOnStCh: "array",
      ultimatelyMultipleTraitValuesOkay: true,
      possibleTraitValues: [
        "number",
        "gender",
        "gcase",
        "form",
        "person",
        "aspect",
        "tense",
        "tenseDescription",
      ],
    },
    negative: {
      expectedTypeOnStCh: "boolean",
      compatibleWordtypes: ["ver"],
      // isLexical: true,
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
      compatibleWordtypes: ["adj", "pro", "ver", "pre"],
      possibleTraitValuesPerWordtype: {
        adj: ["simple", "comparative", "superlative", "adverb"],
        pro: ["pronombre", "_pronombreAndDeterminer", "determiner"],
        ver: [
          "verbal",
          "infinitive",
          "contemporaryAdverbial",
          "passiveAdjectival",
          "activeAdjectival",
          "anteriorAdverbial",
          "verbalNoun",
        ],
        pre: ["onlyForm"],
      },
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: this._tenseDescriptions["POL"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["ver"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["POL"],
    },
    person: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per", "impersonal"],
    },
    gender: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "adj", "pro"],
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
      compatibleWordtypes: ["npe", "nco", "ver", "adj", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "adj", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc", "ins", "loc"],
    },
    aspect: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["imperfective", "perfective", "_imOnly"],
    },
    tense: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
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
      compatibleWordtypes: ["adj", "pro", "art", "ver", "pre"],
      possibleTraitValuesPerWordtype: {
        adj: ["simple", "comparative", "superlative", "adverb"],
        pro: ["pronombre", "_pronombreAndDeterminer", "determiner"],
        art: ["definite", "indefinite"],
        ver: ["verbal", "infinitive", "pastParticiple", "gerund"],
        pre: ["onlyForm"],
      },
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: this._tenseDescriptions["SPA"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["ver"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["SPA"],
    },
    person: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per", "impersonal"],
    },
    gender: {
      isLexical: true,
      compatibleWordtypes: [
        "npe",
        "nco",
        "ver", // Las tortas estan hechas. --> "tortas" gives gender and number to "hechas".
        "adj",
        "pro",
      ],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["m", "f", "virile", "nonvirile"],
    },
    number: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "pro", "adj", "art"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc"],
    },
    tense: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
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
      compatibleWordtypes: ["adj", "pro", "art", "ver", "pre"],
      possibleTraitValuesPerWordtype: {
        adj: ["simple", "comparative", "superlative", "adverb"],
        pro: ["pronombre", "_pronombreAndDeterminer", "determiner"],
        art: ["definite", "indefinite"],
        ver: ["verbal", "infinitive", "v2", "v3", "thirdPS", "gerund"],
        pre: ["onlyForm"],
      },
    },
    //
    //
    //    These stCh traits get validation by their possibleTraitValues arr.
    //
    //
    tenseDescription: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: this._tenseDescriptions["ENG"],
    },
    blockedTenseDescriptions: {
      expectedTypeOnStCh: "array",
      compatibleWordtypes: ["ver"],
      ultimatelyMultipleTraitValuesOkay: true,
      needsNoValidation: true,
      possibleTraitValues: this._tenseDescriptions["ENG"],
    },
    person: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["1per", "2per", "3per"],
    },
    gender: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["m", "f", "n", "virile", "nonvirile"],
    },
    number: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "ver", "pro", "art"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["singular", "plural"],
    },
    gcase: {
      isLexical: true,
      compatibleWordtypes: ["npe", "nco", "pro"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: ["nom", "gen", "dat", "acc"],
    },
    tense: {
      isLexical: true,
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "array",
      possibleTraitValues: [
        "past",
        "present",
        "future",
        "conditional",
        "imperative",
      ],
    },
    stativeOverrideTrue: {
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "boolean",
    },
    stativeOverrideFalse: {
      compatibleWordtypes: ["ver"],
      expectedTypeOnStCh: "boolean",
    },
  },
};

exports.uninflectedForms = {
  POL: {
    ver: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      // "activeAdjectival", Would need to be conjugated as an adjective.
      // "passiveAdjectival", Would need to be conjugated as an adjective.
    ],
  },
  ENG: {
    ver: [],
  },
  SPA: {
    ver: [],
  },
};

exports.adhocInflectionCategorys = {
  POL: {},
  SPA: {},
  ENG: { ver: ["tenseDescription"] }, // ENG tenseDesc are created programmatically from ENG langUtils in "(Ad-PW-I): Pathway for Adhoc INFLECTIONS".
};

exports.adhocForms = {
  SPA: {},
  POL: {},
  ENG: {
    ver: [
      // epsilon these are english?
      "contemporaryAdverbial",
      "anteriorAdverbial",
      "activeAdjectival",
      "passiveAdjectival",
      "pastParticiple",
    ],
  },
};

exports.getNounGenderTraitValues = (wordtype) => {
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

  return ref[wordtype];
};

exports.malePersonsInThisLanguageHaveWhatGender = {
  POL: "m1",
  ENG: "m",
  SPA: "m",
};

exports.collapsibleMasculineGenders = {
  POL: { singular: { m: ["m1", "m2", "m3"] } },
};

exports.wordtypes = {
  nco: "common noun",
  npe: "person noun",
  ver: "verb",
  adj: "adjective",
  adv: "adverb",
  pro: "pronombre",
  art: "article",
  pre: "preposition",
  fix: "fixed",
};

exports.defaultTraitValues = {
  adj: { form: ["simple"] },
  pro: {
    form: ["pronombre"],
    gcase: ["nom"],
    person: ["1per", "2per", "3per"],
    /** Have decided not to have default values for gender or number.
     *
     *  Was tempted {number: [singular]}
     *  but instead, when number key left blank we do want it to choose from both singular and plural.
     *
     *  Was tempted {gender: [m, f]} to avoid "Kim ona jest?" from randomly selecting "ono"
     *  but instead, the isPerson key on stCh allows educator to strip out "n" from default-all gender array.
     */
  },
  nco: { gcase: ["nom"] },
  npe: { gcase: ["nom"] },
  ver: { form: ["verbal"] },
  pre: { form: ["onlyForm"] },
};

exports.agreementTraits = [
  "agreeWith",
  //"agreeWith2", not technically an agreeKey as gets removed and replaced by postHocAgreeWithSecondary.
  "postHocAgreeWithPrimary",
  "postHocAgreeWithSecondary",
  "postHocAgreeWithTertiary",
];

exports.punctuation = ["!", "?", ".", ",", ":", ";", "..."];

exports.acceptedLanguages = {
  ENG: "English",
  POL: "Polish",
  SPA: "Spanish",
};

exports.aspectReference = (str) => {
  const ref = { im: "imperfective", pf: "perfective" };
  if (ref[str]) {
    return ref[str];
  }
  let res;
  Object.keys(ref).forEach((k) => {
    let v = ref[k];
    if (v === str) {
      res = k;
    }
  });
  return res;
};

exports.preferredInitialChoicesForEnChs = {
  pro: { form: { _pronombreAndDeterminer: "determiner" } },
  ver: { form: { ALL: "verbal" } },
};

exports.contractions = {
  SPA: { mandatory: {}, group1: {}, group2: {}, group3: {} },
  POL: { mandatory: {}, group1: {}, group2: {}, group3: {} },
  ENG: {
    mandatory: {
      "can not": "cannot",
      "can not": "can't",
    },
    group1: {
      // Yes, even if ending a sentence: "I wasn't here.", "But I wasn't." both fine.
      // Mandatory if sentence is a question: "Aren't you here?" but never "Are not you here?", "Won't you come?", "Couldn't you hear it?", "Isn't it nice?"

      "is not": "isn't",
      "are not": "aren't",

      "was not": "wasn't",
      "were not": "weren't",

      "have not": "haven't",
      "has not": "hasn't",
      "had not": "hadn't",

      "do not": "don't",
      "did not": "didn't",

      "will not": "won't",
      "would not": "wouldn't",
      "should not": "shouldn't",
      "must not": "mustn't",
      "could not": "couldn't",
    },
    group2: {
      // No, if ending a sentence (as in comments below).

      // "I'm here." not "But I'm."
      "I am": "I'm",
      "you are": "you're",
      "he is": "he's",
      "she is": "she's",
      "it is": "it's",
      "we are": "we're",
      "they are": "they're",

      // "There's a dog." not "Five is all there's."
      "there is": "there's",
      "that is": "that's",
      "here is": "here's",
      "who is": "who's",
      "what is": "what's",
      "when is": "when's",
      "where is": "where's",
      "why is": "why's",
      "how is": "how's",

      // "I've seen." not "But I've."
      // And only if auxiliary, which is covered by auxiliary marker below.
      "I ªhave": "I've",
      "you ªhave": "you've",
      "he ªhas": "he's",
      "she ªhas": "she's",
      "it ªhas": "it's",
      "we ªhave": "we've",
      "they ªhave": "they've",

      // "I'd seen." not "But I'd."
      // And only if auxiliary, which is covered by auxiliary marker below.
      "I ªhad": "I'd",
      "you ªhad": "you'd",
      "he ªhad": "he'd",
      "she ªhad": "she'd",
      "it ªhad": "it'd",
      "we ªhad": "we'd",
      "they ªhad": "they'd",
    },
    group3: {
      //Like group 2, it's no if ending a sentence.
      //But also no if followed by "not"
      //"I will not" should become "I won't" but not "I'll not" in Q sentence. (In A sentence all permutations are allowed as we expand the contractions in the player's answer before marking.)

      // "I'll write." not "But I'll."
      "I will": "I'll",
      "you will": "you'll",
      "he will": "he'll",
      "she will": "she'll",
      "it will": "it'll",
      "we will": "we'll",
      "they will": "they'll",

      // "I'd write." not "But I'd."
      "I would": "I'd",
      "you would": "you'd",
      "he would": "he'd",
      "she would": "she'd",
      "it would": "it'd",
      "we would": "we'd",
      "they would": "they'd",

      "there had": "there'd",
      "that had": "that'd",
      "here had": "here'd",
      "who had": "who'd",
      "what had": "what'd",
      "when had": "when'd",
      "where had": "where'd",
      "why had": "why'd",
      "how had": "how'd",

      "there would": "there'd",
      "that would": "that'd",
      "here would": "here'd",
      "who would": "who'd",
      "what would": "what'd",
      "when would": "when'd",
      "where would": "where'd",
      "why would": "why'd",
      "how would": "how'd",

      "there will": "there'll",
      "that will": "that'll",
      "here will": "here'll",
      "who will": "who'll",
      "what will": "what'll",
      "when will": "when'll",
      "where will": "where'll",
      "why will": "why'll",
      "how will": "how'll",
    },
  },
};

exports.contractionsReverse = {
  SPA: {},
  POL: {},
  ENG: {
    //
    "can't": ["can't", "cannot"],
    "isn't": ["isn't", "is not"],
    "aren't": ["aren't", "are not"],
    "wasn't": ["wasn't", "was not"],
    "weren't": ["weren't", "were not"],
    "haven't": ["haven't", "have not"],
    "hasn't": ["hasn't", "has not"],
    "hadn't": ["hadn't", "had not"],
    "don't": ["don't", "do not"],
    "didn't": ["didn't", "did not"],
    "won't": ["won't", "will not"],
    "wouldn't": ["wouldn't", "would not"],
    "shouldn't": ["shouldn't", "should not"],
    "mustn't": ["mustn't", "must not"],
    "couldn't": ["couldn't", "could not"],
    //
    "i'm": ["i am"],
    "you're": ["you are"],
    "he's": ["he is", "he has"],
    "she's": ["she is", "she has"],
    "it's": ["it is", "it has"],
    "we're": ["we are"],
    "they're": ["they are"],
    "i'll": ["i will"],
    "you'll": ["you will"],
    "he'll": ["he will"],
    "she'll": ["she will"],
    "it'll": ["it will"],
    "we'll": ["we will"],
    "they'll": ["they will"],
    "i'd": ["i would", "i had"],
    "you'd": ["you would", "you had"],
    "he'd": ["he would", "he had"],
    "she'd": ["she would", "she had"],
    "it'd": ["it would", "it had"],
    "we'd": ["we would", "we had"],
    "they'd": ["they would", "they had"],
    "there's": ["there is"],
    "that's": ["that is"],
    "here's": ["here is"],
    "who's": ["who is"],
    "what's": ["what is"],
    "when's": ["when is"],
    "where's": ["where is"],
    "why's": ["why is"],
    "how's": ["how is"],
    "there'd": ["there had", "there would"],
    "that'd": ["that had", "that would"],
    "here'd": ["here had", "here would"],
    "who'd": ["who had", "who would"],
    "what'd": ["what had", "what would"],
    "when'd": ["when had", "when would"],
    "where'd": ["where had", "where would"],
    "why'd": ["why had", "why would"],
    "how'd": ["how had", "how would"],
    "there'll": ["there will"],
    "that'll": ["that will"],
    "here'll": ["here will"],
    "who'll": ["who will"],
    "what'll": ["what will"],
    "when'll": ["when will"],
    "where'll": ["where will"],
    "why'll": ["why will"],
    "how'll": ["how will"],
    "i've": ["i have"],
    "you've": ["you have"],
    "we've": ["we have"],
    "they've": ["they have"],
  },
};

exports.selectedWordMarkers = {
  "¤": "foo¤ Block this word from being used in contraction.",
  ª: "ªfoo This verb is an auxiliary verb.",
};

exports.formulaTopics = [
  "basics",
  "science",
  "school",
  "entertainment",
  "religion",
  "sports",
  "love",
];
