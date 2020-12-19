exports.dummySentenceFormulasBank = {
  dummy01: {
    sentenceFormulaSymbol: "dummy01",
    sentenceFormulaId: "POL-dummy01",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["nonexistent tag"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  dummy02: {
    sentenceFormulaSymbol: "dummy02",
    sentenceFormulaId: "POL-dummy02",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["nonexistent gcase"],
        number: [],
        gender: [],
      },
    ],
  },
  dummy03: {
    sentenceFormulaSymbol: "dummy03",
    sentenceFormulaId: "POL-dummy03",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy"],
        gcase: ["nom"],
        number: [],
        gender: [],
      },
    ],
  },
  dummy04: {
    sentenceFormulaSymbol: "dummy04",
    sentenceFormulaId: "POL-dummy04",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
  },
  dummy05: {
    sentenceFormulaSymbol: "dummy05",
    sentenceFormulaId: "POL-dummy05",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy"],
        gcase: ["nom", "loc"],
        number: [],
        gender: [],
      },
    ],
  },
  dummy06: {
    sentenceFormulaSymbol: "dummy06",
    sentenceFormulaId: "POL-dummy06",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy"],
        gcase: ["ins"],
        number: [],
        gender: [],
      },
    ],
  },
  dummy07: {
    sentenceFormulaSymbol: "dummy07",
    sentenceFormulaId: "POL-dummy07",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy2"],
        gcase: ["loc"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  dummy08: {
    sentenceFormulaSymbol: "dummy08",
    sentenceFormulaId: "POL-dummy08",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy3"],
        gcase: ["loc"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  dummy09: {
    sentenceFormulaSymbol: "dummy09",
    sentenceFormulaId: "POL-dummy09",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        andTags: ["foobar-C"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["nou-1", "nou-3", "nou-2"]],
    additionalOrders: [
      ["nou-1", "nou-2", "nou-3"],
      ["nou-2", "nou-1", "nou-3"],
      ["nou-2", "nou-3", "nou-1"],
    ],
  },
  dummy10: {
    sentenceFormulaSymbol: "dummy10",
    sentenceFormulaId: "POL-dummy10",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        andTags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        andTags: ["foobar-C"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [
      ["nou-1", "nou-3", "nou-2"],
      ["nou-1", "nou-2", "nou-3"],
      ["nou-2", "nou-1", "nou-3"],
      ["nou-2", "nou-3", "nou-1"],
    ],
    additionalOrders: [],
  },
  dummy11a: {
    sentenceFormulaSymbol: "I have APPLE",
    sentenceFormulaId: "POL-dummy11a",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificLemmas: ["jabłko"], //This overrides andTags and selectRandom, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy11b: {
    sentenceFormulaSymbol: "I have APPLE/SHIRT",
    sentenceFormulaId: "POL-dummy11b",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificLemmas: ["jabłko", "majtki"], //This overrides andTags and selectRandom, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy12: {
    sentenceFormulaSymbol: "shirt",
    sentenceFormulaId: "POL-dummy12",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["wearable"],
        gcase: ["nom"],
        number: [],
        gender: [],
      },
    ],
  },
  dummy12a: {
    sentenceFormulaSymbol: "dummy12a 2per",
    sentenceFormulaId: "POL-dummy12a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],

        person: ["2per"],
      },
    ],
  },
  dummy13a: {
    sentenceFormulaSymbol: "dummy13a conditional plural",
    sentenceFormulaId: "POL-dummy13a",
    sentenceFormulaId: "POL-dummy",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        tenseDescription: ["conditional im"],
        number: ["plural"],
      },
    ],
  },
  dummy13b: {
    sentenceFormulaSymbol: "dummy13b present 2per f",
    sentenceFormulaId: "POL-dummy13b",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],

        tenseDescription: ["present im"],
        person: ["2per"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
    ],
  },
  dummy14: {
    sentenceFormulaSymbol: "dummy14 infinitive",
    sentenceFormulaId: "POL-dummy14",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["infinitive"],
      },
    ],
  },
  dummy15: {
    sentenceFormulaSymbol: "dummy15 impersonal",
    sentenceFormulaId: "POL-dummy15",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],

        person: ["impersonal"],
      },
    ],
  },
  dummy15a: {
    sentenceFormulaSymbol: "dummy15a impersonal plural",
    sentenceFormulaId: "POL-dummy15a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
  },
  dummy15b: {
    sentenceFormulaSymbol: "dummy15b impersonal plural",
    sentenceFormulaId: "POL-dummy15b",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["perfective"],
        andTags: ["basic2"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
  },
  dummy16: {
    sentenceFormulaSymbol: "dummy16 contemporaryAdverbial",
    sentenceFormulaId: "POL-dummy16",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["contemporaryAdverbial"],
      },
    ],
  },
  dummy17: {
    sentenceFormulaSymbol: "dummy17 contemporaryAdverbial female",
    sentenceFormulaId: "POL-dummy17",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["contemporaryAdverbial"],
        gender: ["f"],
      },
    ],
  },
  dummy18: {
    sentenceFormulaSymbol: "dummy18 contemporaryAdverbial n virile 2per",
    sentenceFormulaId: "POL-dummy18",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        gender: ["n", "virile"],
        person: ["2per"],
        form: ["contemporaryAdverbial"],
      },
    ],
  },
  dummy16a: {
    sentenceFormulaSymbol: "dummy16a anteriorAdverbial",
    sentenceFormulaId: "POL-dummy16a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb", ///////////////
        // aspect: ["perfective"],
        andTags: ["basic2"],
        form: ["anteriorAdverbial"],
      },
    ],
  },
  dummy17a: {
    sentenceFormulaSymbol: "dummy17a anteriorAdverbial female",
    sentenceFormulaId: "POL-dummy17a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb", ///////////////
        // aspect: ["perfective"],
        andTags: ["basic2"],
        form: ["anteriorAdverbial"],
        gender: ["f"],
      },
    ],
  },
  dummy18a: {
    sentenceFormulaSymbol: "dummy18a anteriorAdverbial n virile 2per",
    sentenceFormulaId: "POL-dummy18a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb", /////////////
        // aspect: ["perfective"],
        andTags: ["basic2"],
        gender: ["n", "virile"],
        person: ["2per"],
        form: ["anteriorAdverbial"],
      },
    ],
  },
  dummy19: {
    sentenceFormulaSymbol: "dummy19",
    sentenceFormulaId: "POL-dummy19",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["dummy-nou-010"],
        number: ["singular", "plural"],
        gcase: ["acc"],
      },
    ],
  },
  dummy20a: {
    sentenceFormulaSymbol: "dummy20a girl is reading im",
    sentenceFormulaId: "POL-dummy20a",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
  },
  dummy20b: {
    sentenceFormulaSymbol: "dummy20b girl will read pf",
    sentenceFormulaId: "POL-dummy20b",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        tenseDescription: ["future pf"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
  },
  dummy21: {
    sentenceFormulaSymbol: "dummy21 verbalNoun",
    sentenceFormulaId: "POL-dummy21",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbalNoun"],
      },
    ],
  },
  dummy22: {
    sentenceFormulaSymbol: "dummy22 verbalNoun ~f",
    sentenceFormulaId: "POL-dummy22",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbalNoun"],
        gender: ["f"],
      },
    ],
  },
  dummy23a: {
    sentenceFormulaSymbol: "dummy23a past/cond 1per plural m1",
    sentenceFormulaId: "POL-dummy23a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],
        person: ["1per"],
        number: ["plural"],
        gender: ["m1"],
      },
    ],
  },
  dummy23b: {
    sentenceFormulaSymbol: "dummy23b past/cond 1per plural m2",
    sentenceFormulaId: "POL-dummy23b",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],

        person: ["1per"],
        number: ["plural"],
        gender: ["m2"],
      },
    ],
  },
  dummy23c: {
    sentenceFormulaSymbol: "dummy23c past/cond 1per plural f/n",
    sentenceFormulaId: "POL-dummy23c",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],

        person: ["1per"],
        number: ["plural"],
        gender: ["n", "f"],
      },
    ],
  },
  dummy24a: {
    sentenceFormulaSymbol: "dummy24a I read and research",
    sentenceFormulaId: "POL-dummy24a",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],

        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "i" },
      {
        chunkId: "ver-2",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["science"],

        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  dummy24b: {
    sentenceFormulaSymbol: "dummy24b I/you read and research",
    sentenceFormulaId: "POL-dummy24b",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],

        person: ["1per", "2per"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "i" },
      {
        chunkId: "ver-2",
        agreeWith: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["science"],

        person: ["1per", "2per"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["ver-1", "fix-1", "ver-2"]],
  },
  dummy24c: {
    sentenceFormulaSymbol: "dummy24c read and research",
    sentenceFormulaId: "POL-dummy24c",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im", "past im"],
        andTags: ["basic2"],
        person: ["1per", "2per"],
        number: ["singular", "plural"],
        gender: [],
      },
      { chunkId: "fix-1", wordtype: "fixed", value: "i" },
      {
        chunkId: "ver-2",
        agreeWith: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im", "past im"],
        andTags: ["science"],
        person: ["1per", "2per"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
    primaryOrders: [["ver-1", "fix-1", "ver-2"]],
  },
  dummy25a: {
    sentenceFormulaSymbol: "dummy25a good day",
    sentenceFormulaId: "POL-dummy25a",
    translations: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "dzień" },
      { chunkId: "fix-2", wordtype: "fixed", value: "dobry" },
    ],
    primaryOrders: [],
  },
  dummy25b: {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "POL-dummy25b",
    translations: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    structure: [{ chunkId: "fix-1", wordtype: "fixed", value: "halo" }],
    primaryOrders: [],
  },
  dummy26: {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "POL-dummy26",
    translations: { ENG: ["ENG-dummy26"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        tenseDescription: ["past im", "future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: ["f"],
      },
    ],
    primaryOrders: [],
  },
  dummy27: {
    sentenceFormulaSymbol: "dummy27",
    sentenceFormulaId: "POL-dummy27",
    translations: { ENG: ["ENG-dummy27"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: ["present im", "future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: ["f"],
      },
    ],
    primaryOrders: [],
  },
  dummy28: {
    sentenceFormulaSymbol: "dummy28",
    sentenceFormulaId: "POL-dummy28",
    translations: { ENG: ["ENG-dummy28"] },
    structure: [
      {
        chunkId: "ver-1",

        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy29: {
    sentenceFormulaSymbol: "dummy29",
    sentenceFormulaId: "POL-dummy29",
    translations: { ENG: ["ENG-dummy29"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy30: {
    sentenceFormulaSymbol: "dummy30",
    sentenceFormulaId: "POL-dummy30",
    translations: { ENG: ["ENG-dummy30"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy31: {
    sentenceFormulaSymbol: "dummy31",
    sentenceFormulaId: "POL-dummy31",
    translations: { ENG: ["ENG-dummy31"] },
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy32: {
    sentenceFormulaSymbol: "dummy32",
    sentenceFormulaId: "POL-dummy32",
    translations: {},
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        tenseDescription: ["present im"],
        person: ["3per"],
        number: ["plural"],
        gender: ["f"],
      },
    ],
    primaryOrders: [],
  },
  dummy33: {
    sentenceFormulaSymbol: "dummy33",
    sentenceFormulaId: "POL-dummy33",
    translations: {},
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past im"],
        person: [],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy34: {
    sentenceFormulaSymbol: "dummy34",
    sentenceFormulaId: "POL-dummy34",
    translations: {},
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["past pf"],
        person: [],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
};
