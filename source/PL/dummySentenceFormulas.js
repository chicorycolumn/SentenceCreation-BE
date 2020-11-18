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
    ],
  },
  dummy09: {
    symbol: "dummy09",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["foobar-A"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["foobar-B"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        manTags: ["foobar-C"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["nou-1", "nou-3", "nou-2"]],
    additionalOrders: [
      ["nou-1", "nou-2", "nou-3"],
      ["nou-2", "nou-1", "nou-3"],
      ["nou-2", "nou-3", "nou-1"],
    ],
  },
  dummy10: {
    symbol: "dummy10",
    formula: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["foobar-A"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["foobar-B"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        manTags: ["foobar-C"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [
      ["nou-1", "nou-3", "nou-2"],
      ["nou-1", "nou-2", "nou-3"],
      ["nou-2", "nou-1", "nou-3"],
      ["nou-2", "nou-3", "nou-1"],
    ],
    additionalOrders: [],
  },
};

exports.dummySentenceFormulasBank = { level01 };
