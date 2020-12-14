exports.dummySentenceFormulasBank = {
  dummy25a: {
    symbol: "dummy25a good day",
    sentenceFormulaId: "ENG-dummy25a",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "good" },
      { chunkId: "fix-2", wordtype: "fixed", value: "day" },
    ],
    primaryOrders: [],
  },
  dummy25b: {
    symbol: "dummy25b hello",
    sentenceFormulaId: "ENG-dummy25b",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    structure: [{ chunkId: "fix-1", wordtype: "fixed", value: "hello" }],
    primaryOrders: [],
  },
};
