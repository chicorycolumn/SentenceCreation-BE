exports.sentenceFormulasBank = {
  50: {
    sentenceFormulaSymbol: "girl eats apple",
    sentenceFormulaId: "POL-00-50",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  51: {
    sentenceFormulaSymbol: "girl is wearing shirt",
    sentenceFormulaId: "POL-00-51",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  52: {
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
  53: {
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
  54: {
    sentenceFormulaSymbol: "boys are male",
    sentenceFormulaId: "POL-00-54",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],

        gcase: ["nom"],
        number: ["plural"],
        gender: ["m1"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "są męscy" },
    ],
  },
  55: {
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
  "55a": {
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
  "55b": {
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
  56: {
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
        andTags: ["person"],

        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  57: {
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
  58: {
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
  59: {
    sentenceFormulaSymbol: "girl is reading",
    sentenceFormulaId: "POL-00-59",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  60: {
    sentenceFormulaSymbol: "girls were reading",
    sentenceFormulaId: "POL-00-60",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "61-z": {
    sentenceFormulaSymbol: "* girl has red apple",
    sentenceFormulaId: "POL-00-61-z",
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "nie," },
      { chunkId: "fix-2", wordtype: "fixed", value: "chyba" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  61: {
    sentenceFormulaSymbol: "girl has red apple",
    sentenceFormulaId: "POL-00-61",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "61-neg1": {
    sentenceFormulaSymbol: "girl didn't have red apple",
    sentenceFormulaId: "POL-00-61-neg1",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],

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
  "62-neg1": {
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
        andTags: ["person"],

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
  "63a": {
    sentenceFormulaSymbol: "girl reads present im",
    sentenceFormulaId: "POL-00-63a",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "63b": {
    sentenceFormulaSymbol: "girl reads past pf",
    sentenceFormulaId: "POL-00-63b",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "63c": {
    sentenceFormulaSymbol: "girl reads future im",
    sentenceFormulaId: "POL-00-63c",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "63d": {
    sentenceFormulaSymbol: "girl reads f conditional im pf",
    sentenceFormulaId: "POL-00-63d",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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

  "101a": {
    sentenceFormulaSymbol: "101a girl is reading",
    sentenceFormulaId: "POL-00-101a",
    translations: { ENG: ["ENG-00-101a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "101b": {
    sentenceFormulaSymbol: "101b girl *reads quickly",
    sentenceFormulaId: "POL-00-101b",
    translations: { ENG: ["ENG-00-101b"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
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
  "102a": {
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
  "103a": {
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
  "103b": {
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
  "103c": {
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
  "104a": {
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
  "104b": {
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
  "105a": {
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
  "106a": {
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
  107: {
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
};
