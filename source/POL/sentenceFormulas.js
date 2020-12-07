exports.sentenceFormulasBank = {
  50: {
    symbol: "girl eats apple",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "je" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
  },
  51: {
    symbol: "girl is wearing shirt",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "ma na sobie" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["wearable"],

        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
  },
  52: {
    symbol: "shirt is in wardrobe",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["wearable"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "jest w szafie" },
    ],
  },
  53: {
    symbol: "I often wear shirt",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "często noszę" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["wearable"],

        gcase: ["acc"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
  },
  54: {
    symbol: "boys are male",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
        number: ["plural"],
        gender: ["m1"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "są męscy" },
    ],
  },
  55: {
    symbol: "red apple",
    structure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  "55a": {
    symbol: "red apples",
    structure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  56: {
    symbol: "red girls",
    structure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
    additionalOrders: [],
  },
  57: {
    symbol: "I have apple",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["acc"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  58: {
    symbol: "I am reading",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        tags: ["basic2"],
        form: ["verbal"],
        tenseDescription: ["present im"],
        person: ["1per", "2per", "3per"],
      },
    ],
  },
  59: {
    symbol: "girl is reading",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

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
        tags: ["basic2"],
      },
    ],
  },
  60: {
    symbol: "girls were reading",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
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
        tags: ["basic2"],
      },
    ],
  },
  61: {
    symbol: "girl has red apple",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["present im"],
        person: ["3per"],
        tags: [],

        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["acc"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  "61-neg1": {
    symbol: "girl didn't have red apple",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["past im"],
        person: ["3per"],
        tags: [],

        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["nou-1", "fix-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  "62-neg1": {
    symbol: "red girl didn't have red apple",
    structure: [
      {
        chunkId: "adj-0",
        agreeWith: "nou-1",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],

        gcase: ["nom"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["past im"],
        person: ["3per"],
        tags: [],

        specificLemmas: ["mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nou-2",
        wordtype: "adjective",
        tags: ["colour"],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["adj-0", "nou-1", "fix-1", "ver-1", "adj-1", "nou-2"]],
    additionalOrders: [],
  },
  "63a": {
    symbol: "girl reads present im",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  "63b": {
    symbol: "girl reads past pf",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  "63c": {
    symbol: "girl reads future im",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },
  "63d": {
    symbol: "girl reads f conditional im pf",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["conditional im", "conditional pf"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
    additionalOrders: [],
  },

  "101a": {
    symbol: "101a girl is reading",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["present im"],
        person: ["3per"],
        tags: ["basic2"],
      },
    ],
  },
  "101b": {
    symbol: "101b girl f is reading",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["present im"],
        person: ["3per"],
        tags: ["basic2"],
      },
    ],
  },
  "101c": {
    symbol: "101c girl f is reading",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["present im"],
        person: ["3per"],
        tags: ["basic2"],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "szybko" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
    additionalOrders: [],
  },
};
