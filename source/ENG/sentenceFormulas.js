exports.sentenceFormulasBank = {
  "101a": {
    symbol: "101a girl is reading",
    structure: [
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
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        person: ["3per"],
        tags: ["basic2"],
      },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
    additionalOrders: [],
  },
  "101b": {
    symbol: "101b girl f is reading",
    structure: [
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
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        person: ["3per"],
        tags: ["basic2"],
      },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
    additionalOrders: [],
  },
  "101c": {
    symbol: "101c girl f is reading quickly",
    structure: [
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
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        person: ["3per"],
        tags: ["basic2"],
      },
      { chunkId: "fix-2", wordtype: "fixed", value: "quickly" },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1", "fix-2"]],
    additionalOrders: [["fix-1", "nou-1", "fix-2", "ver-1"]],
  },
};
