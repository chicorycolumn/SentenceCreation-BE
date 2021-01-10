exports.sentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "101a girl is reading",
    sentenceFormulaId: "ENG-00-101a",
    translations: { POL: ["POL-00-101a"] },
    sentenceStructure: [
      // {
      //   chunkId: "art-1",
      //   wordtype: "article",
      //   agreeWith: "nou-1",
      //   definiteness: ["definite", "indefinite", "zero"],
      // },
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol:
      "101b girl *reads quickly IT WON'T MATTER THAT THIS sentenceFormulaSymbol IS DIFFERENT FROM ITS POL COUNTERPART",
    sentenceFormulaId: "ENG-00-101b",
    translations: { POL: ["POL-00-101b"] },
    sentenceStructure: [
      // {
      //   chunkId: "art-1",
      //   wordtype: "article",
      //   agreeWith: "nou-1",
      //   definiteness: ["definite", "indefinite", "zero"],
      // },
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        person: ["3per"],
        tenseDescription: ["present"],
        andTags: ["basic2"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "quickly" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2"]],
    additionalOrders: [["fix-2", "fix-1", "nou-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "102a I'll read (pf fut)",
    sentenceFormulaId: "ENG-00-102a",
    translations: { POL: ["POL-00-102a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic2"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103a",
    sentenceFormulaId: "ENG-00-103a",
    translations: { POL: ["POL-00-103a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103b",
    sentenceFormulaId: "ENG-00-103b",
    translations: { POL: ["POL-00-103b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103c",
    sentenceFormulaId: "ENG-00-103c",
    translations: { POL: ["POL-00-103c"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["past"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104a",
    sentenceFormulaId: "ENG-00-104a",
    translations: { POL: ["POL-00-104a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["past"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104b",
    sentenceFormulaId: "ENG-00-104b",
    translations: { POL: ["POL-00-104b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I was writing 105a",
    sentenceFormulaId: "ENG-00-105a",
    translations: { POL: ["POL-00-105a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: ["past continuous"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "first conditional 106a",
    sentenceFormulaId: "ENG-00-106a",
    translations: { POL: ["POL-00-106a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "if" },
      { chunkId: "fix-2", wordtype: "fixed", value: "you" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["write"],
        tenseDescription: ["cond1 condition"],
        importantFeatures: ["tenseDescription"],
        person: ["2per"],
        number: ["singular"],
      },
      { chunkId: "fix-3", wordtype: "fixed", value: "a" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["book"],
        number: ["singular"],
        gcase: ["nom"],
      },
      { chunkId: "fix-4", wordtype: "fixed", value: "," },
      { chunkId: "fix-5", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-2",
        wordtype: "verb",
        specificLemmas: ["research"],
        tenseDescription: ["cond1 outcome"],
        importantFeatures: ["tenseDescription"],
        person: ["1per"],
        number: ["singular"],
      },
      { chunkId: "fix-6", wordtype: "fixed", value: "it" },
    ],
    primaryOrders: [
      [
        "fix-1",
        "fix-2",
        "ver-1",
        "fix-3",
        "nou-1",
        "fix-4",
        "fix-5",
        "ver-2",
        "fix-6",
      ],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red door",
    sentenceFormulaId: "ENG-00-107",
    translations: { POL: ["POL-00-107"] },
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["door"],
        number: [],
        gcase: ["nom"],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red door singular",
    sentenceFormulaId: "ENG-00-107a",
    translations: { POL: ["POL-00-107"] }, //Yes, this 107a should go to 107.
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["door"],
        number: ["singular"],
        gcase: ["nom"],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "108 singular I am",
    sentenceFormulaId: "ENG-00-108",
    translations: { POL: ["POL-00-108"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        gcase: ["nom"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        specificLemmas: ["be"],
        tenseDescription: ["present simple"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109 doc wrote p",
    sentenceFormulaId: "ENG-00-109",
    translations: { POL: ["POL-00-109"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        number: ["singular"],
        andTags: ["job"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "nou-1",
        specificLemmas: ["write"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "a" },
      { chunkId: "fix-3", wordtype: "fixed", value: "prescription" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2", "fix-3"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109a doc was writing p",
    sentenceFormulaId: "ENG-00-109a",
    translations: { POL: ["POL-00-109a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        number: ["singular"],
        andTags: ["job"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "nou-1",
        specificLemmas: ["write"],
        tenseDescription: ["past continuous"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "a" },
      { chunkId: "fix-3", wordtype: "fixed", value: "prescription" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2", "fix-3"]],
    additionalOrders: [],
  },

  {
    sentenceFormulaSymbol: "109b docs wrote p",
    sentenceFormulaId: "ENG-00-109b",
    translations: { POL: ["POL-00-109b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        number: ["plural"],
        andTags: ["job"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "nou-1",
        specificLemmas: ["write"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "a" },
      { chunkId: "fix-3", wordtype: "fixed", value: "prescription" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2", "fix-3"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109c docs were writing p",
    sentenceFormulaId: "ENG-00-109c",
    translations: { POL: ["POL-00-109c"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        number: ["plural"],
        andTags: ["job"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "nou-1",
        specificLemmas: ["write"],
        tenseDescription: ["past continuous"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "a" },
      { chunkId: "fix-3", wordtype: "fixed", value: "prescription" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2", "fix-3"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "110 the woman read me a book",
    sentenceFormulaId: "ENG-00-110",
    translations: { POL: ["POL-00-110"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["woman"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["read"],
        tenseDescription: ["past continuous"],
      },
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "a" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        specificLemmas: ["book"], //Change to BOOK. NB: What error to throw if no?
        // gcase: ["acc"],
        number: ["singular"],
      },
      { chunkId: "fix-3", wordtype: "fixed", value: "to" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "pro-1", "fix-2", "nou-2"]],
    additionalOrders: [
      ["fix-1", "nou-1", "ver-1", "fix-2", "nou-2", "fix-3", "pro-1"],
    ],
  },
  {
    sentenceFormulaSymbol: "111a I am",
    sentenceFormulaId: "ENG-00-111a",
    translations: { POL: ["POL-00-111a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "111b I was",
    sentenceFormulaId: "ENG-00-111b",
    translations: { POL: ["POL-00-111b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["past simple"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "111c you were",
    sentenceFormulaId: "ENG-00-111c",
    translations: { POL: ["POL-00-111c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["past simple"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "112 familymember gave me things",
    sentenceFormulaId: "ENG-00-112",
    translations: { POL: ["POL-00-112"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        specificLemmas: ["book", "mirror", "apple", "onion"],
        // gcase: ["acc"],
        number: ["plural"],
      },
      { chunkId: "fix-3", wordtype: "fixed", value: "to" },
    ],
    primaryOrders: [["nou-1", "ver-1", "pro-1", "nou-2"]],
    additionalOrders: [
      // ["nou-1", "ver-1", "nou-2", "fix-3", "pro-1"]
    ],
  },
  {
    sentenceFormulaSymbol: "113 my father gave me a book",
    sentenceFormulaId: "ENG-00-113",
    translations: { POL: ["POL-00-113"] },
    sentenceStructure: [
      //I, my father, gave me his book.
      {
        chunkId: "pro-1-invisible",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2",
        wordtype: "pronoun",
        form: ["determiner"],
        specificLemmas: ["POSSESSIVE"],
        agreeWith: "pro-1-invisible",
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "family"],
        gcase: ["nom"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3",
        wordtype: "pronoun",
        agreeWith: "pro-1-invisible",
        gcase: ["dat"],
        importantFeatures: ["gcase"],
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "a" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        specificLemmas: ["book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pro-2", "nou-1", "ver-1", "pro-3", "fix-1", "nou-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "113a my father gave me his book",
    sentenceFormulaId: "ENG-00-113a",
    translations: { POL: ["POL-00-113a"] },
    sentenceStructure: [
      //I, my father, gave me his book.
      {
        chunkId: "pro-1-invisible",
        wordtype: "pronoun",
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2",
        wordtype: "pronoun",
        form: ["determiner"],
        specificLemmas: ["POSSESSIVE"],
        agreeWith: "pro-1-invisible",
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "family"],
        gcase: ["nom"],
        // number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3",
        wordtype: "pronoun",
        agreeWith: "pro-1-invisible",
        gcase: ["dat"],
        importantFeatures: ["gcase"],
        // form: ["pronoun"],
        specificLemmas: ["PERSONAL"],
      },
      {
        chunkId: "pro-4",
        wordtype: "pronoun",
        form: ["determiner"],
        specificLemmas: ["POSSESSIVE"],
        agreeWith: "nou-1",
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        specificLemmas: ["book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pro-2", "nou-1", "ver-1", "pro-3", "pro-4", "nou-2"]],
    additionalOrders: [],
  },
];
