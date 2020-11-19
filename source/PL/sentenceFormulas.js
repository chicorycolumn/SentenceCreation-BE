const level01 = {
  50: {
    symbol: "girl eats apple",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "je" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["edible"],
        optTags: [],
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
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "ma na sobie" },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["wearable"],
        optTags: [],
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
        manTags: ["wearable"],
        optTags: [],
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
        manTags: ["wearable"],
        optTags: [],
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
        manTags: ["person"],
        optTags: [],
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
        manTags: ["colour"],
        optTags: [],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["edible"],
        optTags: [],
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
        manTags: ["colour"],
        optTags: [],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["edible"],
        optTags: [],
        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
  },
  56: {
    symbol: "red girls",
    structure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        manTags: ["colour"],
        optTags: [],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
  },
  57: {
    symbol: "I have apple",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["edible"],
        optTags: [],
        gcase: ["acc"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
};

exports.sentenceFormulasBank = { level01 };
