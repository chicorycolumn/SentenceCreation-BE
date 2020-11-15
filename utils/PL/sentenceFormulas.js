const level01 = {
  50: {
    symbol: "girl eats apple",
    formula: [
      {
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "je",
      {
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
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "ma na sobie",
      {
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
        wordtype: "adjective",
        manTags: ["colour"],
        optTags: [],
        agreeWith: "nou-1",
      },
      {
        agreeId: "nou-1",
        wordtype: "noun",
        manTags: ["edible"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  56: {
    symbol: "red girls",
    formula: [
      {
        wordtype: "adjective",
        manTags: ["colour"],
        optTags: [],
        agreeWith: "nou-1",
      },
      {
        agreeId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["plural"],
        gender: [],
      },
    ],
  },
};

exports.sentenceFormulas = { level01 };
