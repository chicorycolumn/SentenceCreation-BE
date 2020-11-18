const level01 = {
  dummy01: {
    symbol: "dummy01",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["nonexistent tag"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      "must surely be impossible",
    ],
  },
  dummy02: {
    symbol: "dummy02",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: [],
        optTags: [],
        gcase: ["nonexistent gcase"],
        number: [],
        gender: [],
      },
      "must surely be impossible",
    ],
  },
  dummy03: {
    symbol: "dummy03",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy"],
        optTags: [],
        gcase: ["nom"],
        number: [],
        gender: [],
      },
      "must be impossible when using dummy noun",
    ],
  },
  dummy04: {
    symbol: "dummy04",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: [],
      },
      "must be impossible when using dummy noun",
    ],
  },
  dummy05: {
    symbol: "dummy05",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy"],
        optTags: [],
        gcase: ["nom", "loc"],
        number: [],
        gender: [],
      },
      "should be possible even using dummy noun",
    ],
  },
  dummy06: {
    symbol: "dummy06",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy"],
        optTags: [],
        gcase: ["ins"],
        number: [],
        gender: [],
      },
      "should be possible 100% of the time",
    ],
  },
  dummy07: {
    symbol: "dummy07",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy2"],
        optTags: [],
        gcase: ["loc"],
        number: ["singular"],
        gender: [],
      },
      "must surely be impossible",
    ],
  },
  dummy08: {
    symbol: "dummy08",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy3"],
        optTags: [],
        gcase: ["loc"],
        number: ["singular"],
        gender: [],
      },
      "should be possible 100% of the time",
    ],
  },
};

exports.dummySentenceFormulas = { level01 };
