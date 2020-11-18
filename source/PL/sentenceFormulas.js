const level01 = {
  50: {
    symbol: "girl eats apple",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "je",
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
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "ma na sobie",
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
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["wearable"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "jest w szafie",
    ],
  },
  53: {
    symbol: "I often wear shirt",
    formula: [
      "Często noszę",
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
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["plural"],
        gender: ["m1"],
      },
      "są męscy",
    ],
  },
  55: {
    symbol: "red apple",
    formula: [
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
  },
  "55a": {
    symbol: "red apples",
    formula: [
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
    formula: [
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
    formula: [
      "mam",
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
