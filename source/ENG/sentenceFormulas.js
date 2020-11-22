const level01 = {
  101: {
    symbol: "101 girl is reading",
    structure: [
      {
        chunkId: "art-1",
        wordtype: "article",
        agreeWith: "nou-1",
        definiteness: ["definite", "indefinite", "zero"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["person"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tense: ["present"],
        person: ["3per"],
        manTags: ["basic2"],
        optTags: [],
      },
    ],
  },
};

exports.sentenceFormulasBank = { level01 };
