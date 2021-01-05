exports.sentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "girl eats apple",
    sentenceFormulaId: "POL-00-50",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "je" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["edible"],
        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "girl is wearing shirt",
    sentenceFormulaId: "POL-00-51",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "ma na sobie" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["wearable"],
        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "shirt is in wardrobe",
    sentenceFormulaId: "POL-00-52",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["wearable"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "jest w szafie" },
    ],
  },
  {
    sentenceFormulaSymbol: "I often wear shirt",
    sentenceFormulaId: "POL-00-53",
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "często noszę" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["wearable"],

        gcase: ["acc"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "boys are male",
    sentenceFormulaId: "POL-00-54",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],

        gcase: ["nom"],
        number: ["plural"],
        gender: ["m1"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "są męscy" },
    ],
  },
  {
    sentenceFormulaSymbol: "red apple",
    sentenceFormulaId: "POL-00-55",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red apples",
    sentenceFormulaId: "POL-00-55a",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red/blue apple",
    sentenceFormulaId: "POL-00-55b",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        form: ["simple"],
        orTags: ["colour", "colour2"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red girls",
    sentenceFormulaId: "POL-00-56",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],

        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I have apple",
    sentenceFormulaId: "POL-00-57",
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["acc"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "I am reading",
    sentenceFormulaId: "POL-00-58",
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic2"],
        tenseDescription: ["present im"],
        person: ["1per", "2per", "3per"],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "girl is reading",
    sentenceFormulaId: "POL-00-59",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "girls were reading",
    sentenceFormulaId: "POL-00-60",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "* girl has red apple",
    sentenceFormulaId: "POL-00-61-z",
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "nie," },
      { chunkId: "fix-2", wordtype: "fixed", value: "chyba" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: [],
        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["edible"],
        gcase: ["acc"],
        number: ["singular"],
      },
      {
        chunkId: "ver-2",
        wordtype: "verb",
        form: ["infinitive"],
        andTags: [],
      },
    ],
    primaryOrders: [
      ["fix-1", "fix-2", "nou-1", "ver-1", "adj-1", "nou-2", "ver-2"],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl has red apple",
    sentenceFormulaId: "POL-00-61",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: [],
        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["edible"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl didn't have red apple",
    sentenceFormulaId: "POL-00-61-neg1",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],

        gcase: ["nom"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: [],

        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["nou-1", "fix-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red girl didn't have red apple",
    sentenceFormulaId: "POL-00-62-neg1",
    sentenceStructure: [
      {
        chunkId: "adj-0",
        agreeWith: "nou-1",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],

        gcase: ["nom"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: [],

        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["adj-0", "nou-1", "fix-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads present im",
    sentenceFormulaId: "POL-00-63a",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads past pf",
    sentenceFormulaId: "POL-00-63b",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads future im",
    sentenceFormulaId: "POL-00-63c",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads f conditional im pf",
    sentenceFormulaId: "POL-00-63d",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
        gcase: ["nom"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",

        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["conditional im", "conditional pf"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "101a girl is reading",
    sentenceFormulaId: "POL-00-101a",
    translations: { ENG: ["ENG-00-101a"] },
    sentenceStructure: [
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
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
  },
  {
    sentenceFormulaSymbol: "101b girl *reads quickly",
    sentenceFormulaId: "POL-00-101b",
    translations: { ENG: ["ENG-00-101b"] },
    sentenceStructure: [
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

        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "szybko" },
    ],
    primaryOrders: [["nou-1", "fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "102a I'll read (pf fut)",
    sentenceFormulaId: "POL-00-102a",
    translations: { ENG: ["ENG-00-102a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic2"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103a",
    sentenceFormulaId: "POL-00-103a",
    translations: { ENG: ["ENG-00-103a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["future pf", "future im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103b",
    sentenceFormulaId: "POL-00-103b",
    translations: { ENG: ["ENG-00-103b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103c",
    sentenceFormulaId: "POL-00-103c",
    translations: { ENG: ["ENG-00-103c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104a",
    sentenceFormulaId: "POL-00-104a",
    translations: { ENG: ["ENG-00-104a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104b",
    sentenceFormulaId: "POL-00-104b",
    translations: { ENG: ["ENG-00-104b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: ["future pf", "past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I was writing 105a",
    sentenceFormulaId: "POL-00-105a",
    translations: { ENG: ["ENG-00-105a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "first conditional 106a",
    sentenceFormulaId: "POL-00-106a",
    translations: { ENG: ["ENG-00-106a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "jeśli" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["pisać", "napisać"],
        tenseDescription: ["cond1 condition"],
        importantFeatures: ["tenseDescription"],
        person: ["2per"],
        number: ["singular"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "," },
      { chunkId: "fix-3", wordtype: "fixed", value: "ją" },
      {
        chunkId: "ver-2",
        wordtype: "verb",
        specificLemmas: ["badać", "zbadać"],
        tenseDescription: ["cond1 outcome"],
        importantFeatures: ["tenseDescription"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1", "nou-1", "fix-2", "fix-3", "ver-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red door",
    sentenceFormulaId: "POL-00-107",
    translations: { ENG: ["ENG-00-107"] },
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
        specificLemmas: ["drzwi"],
        gcase: ["nom"],
        number: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "108 singular I am",
    sentenceFormulaId: "POL-00-108",
    translations: { ENG: ["ENG-00-108"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "noun",
        specificLemmas: ["być"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [["ver-1"]], //See how here we're showing the pronoun is optional.
  },
  {
    sentenceFormulaSymbol: "109 doc wrote p",
    sentenceFormulaId: "POL-00-109",
    translations: { ENG: ["ENG-00-109"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["job"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["pisać", "napisać"],
        tenseDescription: ["past pf"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "receptę" },
    ],
    primaryOrders: [["nou-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109a doc was writing p",
    sentenceFormulaId: "POL-00-109a",
    translations: { ENG: ["ENG-00-109a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["job"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["pisać", "napisać"],
        tenseDescription: ["past im"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "receptę" },
    ],
    primaryOrders: [["nou-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },

  {
    sentenceFormulaSymbol: "109b docs wrote p",
    sentenceFormulaId: "POL-00-109b",
    translations: { ENG: ["ENG-00-109b"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["job"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["pisać", "napisać"],
        tenseDescription: ["past pf"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "receptę" },
    ],
    primaryOrders: [["nou-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109c docs were writing p",
    sentenceFormulaId: "POL-00-109c",
    translations: { ENG: ["ENG-00-109c"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["job"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["pisać", "napisać"],
        tenseDescription: ["past im"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "receptę" },
    ],
    primaryOrders: [["nou-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "110 the woman read me a book",
    sentenceFormulaId: "POL-00-110",
    translations: { ENG: ["ENG-00-110"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["kobieta"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["czytała"],
        tenseDescription: ["past im"],
      },
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        specificLemmas: ["książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1", "pro-1", "nou-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "111a I am",
    sentenceFormulaId: "POL-00-111a",
    translations: { ENG: ["ENG-00-111a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // gender: [],
        // number: []
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "111b I was",
    sentenceFormulaId: "POL-00-111b",
    translations: { ENG: ["ENG-00-111b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        // gender: [],
        // number: []
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["past im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
];
