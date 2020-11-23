exports.sentenceFormulasBank = {
  101: {
    symbol: "101 girl is reading",
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
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tense: [],
        person: ["3per"],
        manTags: ["basic2"],
        optTags: [],
      },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
    additionalOrders: [],
  },
};
