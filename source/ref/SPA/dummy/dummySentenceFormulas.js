exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "dummy72a",
    sentenceFormulaId: "SPA-dummy72a",
    equivalents: {
      ENG: ["ENG-dummy72a"],
      POL: ["POL-dummy72a"],
      SPA: ["SPA-dummy72a"],
    },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        specificIds: ["spa-nco-001-cebolla", "spa-nco-002-oso"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        specificIds: ["spa-adj-001-rojo"],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
    additionalOrders: [],
  },
];
