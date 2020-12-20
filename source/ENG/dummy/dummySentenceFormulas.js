exports.dummySentenceFormulasBank = {
  dummy25a: {
    sentenceFormulaSymbol: "dummy25a good day",
    sentenceFormulaId: "ENG-dummy25a",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "good" },
      { chunkId: "fix-2", wordtype: "fixed", value: "day" },
    ],
    primaryOrders: [],
  },
  dummy25b: {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "ENG-dummy25b",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    structure: [{ chunkId: "fix-1", wordtype: "fixed", value: "hello" }],
    primaryOrders: [],
  },
  dummy26: {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "ENG-dummy26",
    translations: { POL: ["POL-dummy26"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic2"],
        tenseDescription: [
          "past continuous",
          "future simple",
          "future perfect",
        ],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy27: {
    sentenceFormulaSymbol: "dummy27",
    sentenceFormulaId: "ENG-dummy27",
    translations: { POL: ["POL-dummy27"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [
          "present simple",
          "present continuous",
          "future simple",
          "future perfect",
        ],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy28: {
    sentenceFormulaSymbol: "dummy28",
    sentenceFormulaId: "ENG-dummy28",
    translations: { POL: ["POL-dummy28"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy29: {
    sentenceFormulaSymbol: "dummy29",
    sentenceFormulaId: "ENG-dummy29",
    translations: { POL: ["POL-dummy29"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [
          "present simple",
          "present continuous",
          "present perfect",
        ],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy30: {
    sentenceFormulaSymbol: "dummy30",
    sentenceFormulaId: "ENG-dummy30",
    translations: { POL: ["POL-dummy30"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",

        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy31: {
    sentenceFormulaSymbol: "dummy31",
    sentenceFormulaId: "ENG-dummy31",
    translations: { POL: ["POL-dummy31"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: ["past continuous"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy33: {
    sentenceFormulaSymbol: "dummy33",
    sentenceFormulaId: "ENG-dummy33",
    translations: { POL: ["POL-dummy33"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        person: [],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  dummy33a: {
    sentenceFormulaSymbol: "dummy33a",
    sentenceFormulaId: "ENG-dummy33a",
    translations: { POL: ["POL-dummy33a"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple"],
        person: ["1per"],
        number: [],
      },
    ],
    primaryOrders: [],
  },
};
