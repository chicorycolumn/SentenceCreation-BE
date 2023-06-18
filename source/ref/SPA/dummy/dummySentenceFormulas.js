exports.dummySentenceFormulasBank = [
  {
    id: "SPA-dummy72a",
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
    orders: { primary: [["adj-1", "nco-1"]], additional: [] },
  },
  {
    id: "SPA-dummy72b",
    equivalents: {
      ENG: ["ENG-dummy72b"],
      POL: ["POL-dummy72b"],
      SPA: ["SPA-dummy72b"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["spa-npe-001-medico"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["spa-adj-001-rojo"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
  {
    id: "SPA-dummy72c",
    equivalents: {
      ENG: ["ENG-dummy72c"],
      POL: ["POL-dummy72c"],
      SPA: ["SPA-dummy72c"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["spa-npe-002-parentaroonie"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["spa-adj-001-rojo"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
];
