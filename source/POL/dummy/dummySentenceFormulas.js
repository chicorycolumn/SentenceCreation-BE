exports.dummySentenceFormulasBank = {
  dummy01: {
    sentenceFormulaSymbol: "dummy01",
    sentenceFormulaId: "POL-dummy01",
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificLemmas: ["jabłko"], //This overrides andTags and select Random, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy11b: {
    sentenceFormulaSymbol: "I have APPLE/SHIRT",
    sentenceFormulaId: "POL-dummy11b",
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificLemmas: ["jabłko", "majtki"], //This overrides andTags and select Random, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy12: {
    sentenceFormulaSymbol: "shirt",
    sentenceFormulaId: "POL-dummy12",
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "dzień" },
      { chunkId: "fix-2", wordtype: "fixed", value: "dobry" },
    ],
    primaryOrders: [],
  },
  dummy25b: {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "POL-dummy25b",
    translations: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [{ chunkId: "fix-1", wordtype: "fixed", value: "halo" }],
    primaryOrders: [],
  },
  dummy26: {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "POL-dummy26",
    translations: { ENG: ["ENG-dummy26"] },
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    sentenceStructure: [
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
    translations: { ENG: ["ENG-dummy33"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: [],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy33a: {
    sentenceFormulaSymbol: "dummy33a",
    sentenceFormulaId: "POL-dummy33a",
    translations: { ENG: ["ENG-dummy33a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im"],
        person: ["1per"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy33b: {
    sentenceFormulaSymbol: "dummy33b I am",
    sentenceFormulaId: "POL-dummy33b",
    translations: { ENG: ["ENG-dummy33b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy33c: {
    sentenceFormulaSymbol: "dummy33c you are",
    sentenceFormulaId: "POL-dummy33c",
    translations: { ENG: ["ENG-dummy33c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: ["2per"],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  dummy33d: {
    sentenceFormulaSymbol: "dummy33d she is",
    sentenceFormulaId: "POL-dummy33d",
    translations: { ENG: ["ENG-dummy33d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        importantFeatures: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  dummy33e: {
    sentenceFormulaSymbol: "dummy33e we are",
    sentenceFormulaId: "POL-dummy33e",
    translations: { ENG: ["ENG-dummy33e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [],
  },
  dummy33f: {
    sentenceFormulaSymbol: "dummy33f they are",
    sentenceFormulaId: "POL-dummy33f",
    translations: { ENG: ["ENG-dummy33f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [],
  },
  dummy34: {
    sentenceFormulaSymbol: "dummy34",
    sentenceFormulaId: "POL-dummy34",
    translations: {},
    sentenceStructure: [
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
  dummy34a: {
    sentenceFormulaSymbol: "dummy34a",
    sentenceFormulaId: "POL-dummy34a",
    translations: { ENG: ["ENG-dummy34a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy34b: {
    sentenceFormulaSymbol: "dummy34b",
    sentenceFormulaId: "POL-dummy34b",
    translations: { ENG: ["ENG-dummy34a"] }, //Yes, this does indeed point from b to a...
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["future im"], // ...because I am just testing this.
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy34c: {
    sentenceFormulaSymbol: "dummy34c",
    sentenceFormulaId: "POL-dummy34c",
    translations: { ENG: ["ENG-dummy34c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [],
  },
  dummy34d: {
    sentenceFormulaSymbol: "dummy34d",
    sentenceFormulaId: "POL-dummy34d",
    translations: { ENG: ["ENG-dummy34d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        tenseDescription: ["future im", "present im"],
      },
    ],
    primaryOrders: [],
  },
  dummy36: {
    sentenceFormulaSymbol: "dummy36",
    sentenceFormulaId: "POL-dummy36",
    translations: { ENG: ["ENG-dummy36"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["farmyard"],
        // specificLemmas: [],
        // gcase: ["nom"]
      },
    ],
    primaryOrders: [],
  },
  dummy37: {
    sentenceFormulaSymbol: "dummy37",
    sentenceFormulaId: "POL-dummy37",
    translations: { ENG: ["ENG-dummy37"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        // andTags: ["farmyard"],
        specificLemmas: ["być"],
        // gcase: ["nom"]
      },
    ],
    primaryOrders: [],
  },
  dummy38: {
    sentenceFormulaSymbol: "dummy38",
    sentenceFormulaId: "POL-dummy38",
    translations: { ENG: ["ENG-dummy38"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        person: ["1per"],
        number: ["singular"],
        tenseDescription: ["past pf", "present im"],
      },
    ],
    primaryOrders: [],
  },
  dummy39: {
    sentenceFormulaSymbol: "dummy39",
    sentenceFormulaId: "POL-dummy39",
    translations: { ENG: ["ENG-dummy39"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["być"],
        person: ["2per"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [],
  },
  dummy40: {
    sentenceFormulaSymbol: "dummy40",
    sentenceFormulaId: "POL-dummy40",
    translations: { ENG: ["ENG-dummy40"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        person: ["2per"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [],
  },
  dummy41: {
    sentenceFormulaSymbol: "dummy41",
    sentenceFormulaId: "POL-dummy41",
    translations: { ENG: ["ENG-dummy41"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        person: ["2per"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [],
  },
  dummy42: {
    sentenceFormulaSymbol: "dummy42",
    sentenceFormulaId: "POL-dummy42",
    translations: { ENG: ["ENG-dummy42"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic3"],
        person: ["2per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [],
  },
  dummy43: {
    sentenceFormulaSymbol: "dummy43",
    sentenceFormulaId: "POL-dummy43",
    translations: { ENG: ["ENG-dummy43"] },
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        andTags: ["size"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["adj-1", "nou-1"]],
  },
  dummy45a: {
    sentenceFormulaSymbol: "dummy45a",
    sentenceFormulaId: "POL-dummy45a",
    translations: { ENG: ["ENG-dummy45a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting2"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy45b: {
    sentenceFormulaSymbol: "dummy45b",
    sentenceFormulaId: "POL-dummy45b",
    translations: { ENG: ["ENG-dummy45b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
      },
    ],
    primaryOrders: [],
  },
  dummy46a: {
    sentenceFormulaSymbol: "dummy46a",
    sentenceFormulaId: "POL-dummy46a",
    translations: { ENG: ["ENG-dummy46a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting3"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy46c: {
    sentenceFormulaSymbol: "dummy46c",
    sentenceFormulaId: "POL-dummy46c",
    translations: { ENG: ["ENG-dummy46c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
      },
    ],
    primaryOrders: [],
  },
  dummy47a: {
    sentenceFormulaSymbol: "dummy47a",
    sentenceFormulaId: "POL-dummy47a",
    translations: { ENG: ["ENG-dummy47a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["pisać"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy47b: {
    sentenceFormulaSymbol: "dummy47b",
    sentenceFormulaId: "POL-dummy47b",
    translations: { ENG: ["ENG-dummy47b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["pisać"],
        tenseDescription: ["past im", "past pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy53: {
    sentenceFormulaSymbol: "dummy53",
    sentenceFormulaId: "POL-dummy53",
    translations: { ENG: ["ENG-dummy53"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per", "2per", "3per"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy53a: {
    sentenceFormulaSymbol: "dummy53a",
    sentenceFormulaId: "POL-dummy53a",
    translations: { ENG: ["ENG-dummy53a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im"],
        person: ["1per"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy53b: {
    sentenceFormulaSymbol: "dummy53b I am",
    sentenceFormulaId: "POL-dummy53b",
    translations: { ENG: ["ENG-dummy53b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  dummy53c: {
    sentenceFormulaSymbol: "dummy53c you are",
    sentenceFormulaId: "POL-dummy53c",
    translations: { ENG: ["ENG-dummy53c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["2per"],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  dummy53d: {
    sentenceFormulaSymbol: "dummy53d she is",
    sentenceFormulaId: "POL-dummy53d",
    translations: { ENG: ["ENG-dummy53d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        importantFeatures: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  dummy53e: {
    sentenceFormulaSymbol: "dummy53e we are",
    sentenceFormulaId: "POL-dummy53e",
    translations: { ENG: ["ENG-dummy53e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [],
  },
  dummy53f: {
    sentenceFormulaSymbol: "dummy53f they are",
    sentenceFormulaId: "POL-dummy53f",
    translations: { ENG: ["ENG-dummy53f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [],
  },
  dummy54: {
    sentenceFormulaSymbol: "dummy54",
    sentenceFormulaId: "POL-dummy54",
    translations: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["past pf"],
        person: ["1per", "2per", "3per"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [],
  },
  dummy54a: {
    sentenceFormulaSymbol: "dummy54a",
    sentenceFormulaId: "POL-dummy54a",
    translations: { ENG: ["ENG-dummy54a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        importantFeatures: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  dummy54b: {
    sentenceFormulaSymbol: "dummy54b",
    sentenceFormulaId: "POL-dummy54b",
    translations: { ENG: ["ENG-dummy54a"] }, //Yes, this does indeed point from b to a...
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        tenseDescription: ["future im"], // ...because I am just testing this.
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        importantFeatures: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  dummy54c: {
    sentenceFormulaSymbol: "dummy54c",
    sentenceFormulaId: "POL-dummy54c",
    translations: { ENG: ["ENG-dummy54c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["mieć"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [],
  },
};
