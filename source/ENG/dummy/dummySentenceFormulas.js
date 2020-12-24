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
  dummy35: {
    sentenceFormulaSymbol: "dummy35",
    sentenceFormulaId: "ENG-dummy35",
    translations: { POL: ["POL-dummy35"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        // specificLemmas: [""],
        tenseDescription: ["past simple", "future perfect"],
        person: [],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  dummy36: {
    sentenceFormulaSymbol: "dummy36",
    sentenceFormulaId: "ENG-dummy36",
    translations: { POL: ["POL-dummy36"] },
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["farmyard"],
        // specificLemmas: [""],
        // number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy37: {
    sentenceFormulaSymbol: "dummy37",
    sentenceFormulaId: "ENG-dummy37",
    translations: { POL: ["POL-dummy37"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        // andTags: ["farmyard"],
        specificLemmas: ["be"],
        number: ["singular"],
        tenseDescription: ["present simple"],
        person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [],
  },
  dummy38: {
    sentenceFormulaSymbol: "dummy38",
    sentenceFormulaId: "ENG-dummy38",
    translations: { POL: ["POL-dummy38"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        // specificLemmas: ["read"],
        andTags: ["basic2"],
        number: ["singular"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy39: {
    sentenceFormulaSymbol: "dummy39",
    sentenceFormulaId: "ENG-dummy39",
    translations: { POL: ["POL-dummy39"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "you" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        number: [],
        tenseDescription: ["present simple"],
        person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  dummy40: {
    sentenceFormulaSymbol: "dummy40",
    sentenceFormulaId: "ENG-dummy40",
    translations: { POL: ["POL-dummy40"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "you" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["present simple"],
        person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
};
