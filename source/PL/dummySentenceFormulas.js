const level01 = {
  dummy01: {
    symbol: "dummy01",
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
    structure: [
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
  dummy11: {
    symbol: "I have APPLE",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: [],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificLemmas: ["jabłko"], //This overrides tags and selectRandom. But still conjugates for features.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
};

exports.dummySentenceFormulasBank = { level01 };
