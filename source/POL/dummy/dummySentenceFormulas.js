exports.dummySentenceFormulasBank = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    sentenceFormulaSymbol: "dummy20a girl is reading im",
    sentenceFormulaId: "POL-dummy20a",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
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
  {
    sentenceFormulaSymbol: "dummy20b girl will read pf",
    sentenceFormulaId: "POL-dummy20b",
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person", "personTest1"],
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    sentenceFormulaSymbol: "dummy25a good day",
    sentenceFormulaId: "POL-dummy25a",
    translations: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "dzień" },
      { chunkId: "fix-2", wordtype: "fixed", value: "dobry" },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "POL-dummy25b",
    translations: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [{ chunkId: "fix-1", wordtype: "fixed", value: "halo" }],
    primaryOrders: [],
  },
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    sentenceFormulaSymbol: "dummy47c",
    sentenceFormulaId: "POL-dummy47c",
    translations: { ENG: ["ENG-dummy47c"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["kobieta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "nou-1",
        specificLemmas: ["pisać"],
        tenseDescription: ["past im"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["nou-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy47d",
    sentenceFormulaId: "POL-dummy47d",
    translations: { ENG: ["ENG-dummy47d"] },
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
  {
    sentenceFormulaSymbol: "dummy48a",
    sentenceFormulaId: "POL-dummy48a",
    translations: { ENG: ["ENG-dummy48a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        gcase: ["nom"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy49a",
    sentenceFormulaId: "POL-dummy49a",
    translations: { ENG: ["ENG-dummy49a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49b",
    sentenceFormulaId: "POL-dummy49b",
    translations: { ENG: ["ENG-dummy49b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49c",
    sentenceFormulaId: "POL-dummy49c",
    translations: { ENG: ["ENG-dummy49c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        number: ["singular"],
        // gender: ["m1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49d",
    sentenceFormulaId: "POL-dummy49d",
    translations: { ENG: ["ENG-dummy49d"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        // gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },

  {
    sentenceFormulaSymbol: "dummy49e",
    sentenceFormulaId: "POL-dummy49e",
    translations: { ENG: ["ENG-dummy49e"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        number: ["singular"],
        // gender: ["m1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49f",
    sentenceFormulaId: "POL-dummy49f",
    translations: { ENG: ["ENG-dummy49f"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        person: ["1per"],
        // gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificLemmas: ["napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },

  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];
