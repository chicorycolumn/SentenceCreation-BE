exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "dummy73a",
    sentenceFormulaId: "SPA-dummy73a",
    equivalents: {
      ENG: ["ENG-dummy73a"],
      POL: ["POL-dummy73a"],
      SPA: ["SPA-dummy73a"],
    },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        specificIds: ["spa-nco-001-cebolla", "spa-nco-002-oso"],
        // number: ["singular"],
        gcase: ["nom"],
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
