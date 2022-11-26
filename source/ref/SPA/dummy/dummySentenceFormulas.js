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
  {
    sentenceFormulaSymbol: "dummy73b",
    sentenceFormulaId: "SPA-dummy73b",
    equivalents: {
      ENG: ["ENG-dummy73b"],
      POL: ["POL-dummy73b"],
      SPA: ["SPA-dummy73b"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["spa-npe-001-medico"],
        // number: ["singular"],
        gcase: ["nom"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["spa-adj-001-rojo"],
      },
    ],
    primaryOrders: [["adj-1", "npe-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy73c",
    sentenceFormulaId: "SPA-dummy73c",
    equivalents: {
      ENG: ["ENG-dummy73c"],
      POL: ["POL-dummy73c"],
      SPA: ["SPA-dummy73c"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["spa-npe-002-madre"],
        // number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["spa-adj-001-rojo"],
      },
    ],
    primaryOrders: [["adj-1", "npe-1"]],
    additionalOrders: [],
  },
];
