exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "dummy01",
    sentenceFormulaId: "POL-dummy01",
    sentenceStructure: [
      {
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

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
        chunkId: "nco-1",

        andTags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-2",

        andTags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-3",

        andTags: ["foobar-C"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["nco-1", "nco-3", "nco-2"]],
    additionalOrders: [
      ["nco-1", "nco-2", "nco-3"],
      ["nco-2", "nco-1", "nco-3"],
      ["nco-2", "nco-3", "nco-1"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy10",
    sentenceFormulaId: "POL-dummy10",
    sentenceStructure: [
      {
        chunkId: "nco-1",

        andTags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-2",

        andTags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-3",

        andTags: ["foobar-C"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [
      ["nco-1", "nco-3", "nco-2"],
      ["nco-1", "nco-2", "nco-3"],
      ["nco-2", "nco-1", "nco-3"],
      ["nco-2", "nco-3", "nco-1"],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I have APPLE",
    sentenceFormulaId: "POL-dummy11a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "mam" },
      {
        chunkId: "nco-1",

        andTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificIds: ["pol-nco-004-jabłko"],
      },
    ],
    primaryOrders: [["fix-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I have APPLE/SHIRT",
    sentenceFormulaId: "POL-dummy11b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "mam" },
      {
        chunkId: "nco-1",

        andTags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificIds: ["pol-nco-004-jabłko", "pol-nco-010-majtki"],
      },
    ],
    primaryOrders: [["fix-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "shirt",
    sentenceFormulaId: "POL-dummy12",
    sentenceStructure: [
      {
        chunkId: "nco-1",

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
        chunkId: "nco-1",

        andTags: ["dummy-nco-010"],
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
        chunkId: "npe-1",

        andTags: ["personTest1"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",

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
        chunkId: "npe-1",

        andTags: ["personTest1"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",

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

        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],

        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "i" },
      {
        chunkId: "ver-2",

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

        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],

        person: ["1per", "2per"],
        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "i" },
      {
        chunkId: "ver-2",
        agreeWith: "ver-1",

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
        aspect: ["imperfective"],
        tenseDescription: ["present im", "past im"],
        andTags: ["basic2"],
        person: ["1per", "2per"],
        number: ["singular", "plural"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "i" },
      {
        chunkId: "ver-2",
        agreeWith: "ver-1",
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
    equivalents: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "dzień" },
      { chunkId: "fix-2", chunkValue: "dobry" },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "POL-dummy25b",
    equivalents: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [{ chunkId: "fix-1", chunkValue: "halo" }],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "POL-dummy26",
    equivalents: { ENG: ["ENG-dummy26"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy27"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy28"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy28a",
    sentenceFormulaId: "POL-dummy28a",
    equivalents: { ENG: ["ENG-dummy28"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        andTags: ["basic3"],
        tenseDescription: ["negative imperative", "present im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy29",
    sentenceFormulaId: "POL-dummy29",
    equivalents: { ENG: ["ENG-dummy29"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy30"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy31"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy33"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy33a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy33b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy33c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im", "past pf"],
        number: [],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy33d she is",
    sentenceFormulaId: "POL-dummy33d",
    equivalents: { ENG: ["ENG-dummy33d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy33e we are",
    sentenceFormulaId: "POL-dummy33e",
    equivalents: { ENG: ["ENG-dummy33e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy33f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy34a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
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
    equivalents: { ENG: ["ENG-dummy34a"] }, //Yes, this does indeed point from b to a.
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["future im"],
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
    equivalents: { ENG: ["ENG-dummy34c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy34d",
    sentenceFormulaId: "POL-dummy34d",
    equivalents: { ENG: ["ENG-dummy34d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["future im", "present im"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy36",
    sentenceFormulaId: "POL-dummy36",
    equivalents: { ENG: ["ENG-dummy36"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",

        andTags: ["farmyard"],
      },
    ],
    primaryOrders: [],
  },
  {
    //nowww
    sentenceFormulaSymbol: "dummy36a",
    sentenceFormulaId: "POL-dummy36a",
    equivalents: { ENG: ["ENG-dummy36a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-sheep",
        andTags: ["farmyard"],
      },
      {
        chunkId: "ver-1-is",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-sheep",
      },
      { chunkId: "fix-1-here", chunkValue: "tutaj" },
    ],
    primaryOrders: [["nco-1-sheep", "ver-1-is", "fix-1-here"]],
  },
  {
    sentenceFormulaSymbol: "dummy36b",
    sentenceFormulaId: "POL-dummy36b",
    equivalents: { ENG: ["ENG-dummy36b"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["farmyard"],
      },
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1",
      },
    ],
    primaryOrders: [["nco-1", "ver-1"], ["nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy37",
    sentenceFormulaId: "POL-dummy37",
    equivalents: { ENG: ["ENG-dummy37"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-001-być"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy38",
    sentenceFormulaId: "POL-dummy38",
    equivalents: { ENG: ["ENG-dummy38"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

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
    equivalents: { ENG: ["ENG-dummy39"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy40",
    sentenceFormulaId: "POL-dummy40",
    equivalents: { ENG: ["ENG-dummy40"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        andTags: ["basic3"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy41",
    sentenceFormulaId: "POL-dummy41",
    equivalents: { ENG: ["ENG-dummy41"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        andTags: ["basic3"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy42",
    sentenceFormulaId: "POL-dummy42",
    equivalents: { ENG: ["ENG-dummy42"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        andTags: ["basic3"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy43",
    sentenceFormulaId: "POL-dummy43",
    equivalents: { ENG: ["ENG-dummy43"] },
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        andTags: ["size"],
      },
      {
        chunkId: "nco-1",

        andTags: ["allohomTesting"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy45a",
    sentenceFormulaId: "POL-dummy45a",
    equivalents: { ENG: ["ENG-dummy45a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",

        andTags: ["allohomTesting2"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy45b",
    sentenceFormulaId: "POL-dummy45b",
    equivalents: { ENG: ["ENG-dummy45b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        andTags: ["allohomTesting2"],
        form: ["infinitive"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46a",
    sentenceFormulaId: "POL-dummy46a",
    equivalents: { ENG: ["ENG-dummy46a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",

        andTags: ["allohomTesting3"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46c",
    sentenceFormulaId: "POL-dummy46c",
    equivalents: { ENG: ["ENG-dummy46c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        andTags: ["allohomTesting3"],
        form: ["infinitive"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy47",
    sentenceFormulaId: "POL-dummy47",
    equivalents: { ENG: ["ENG-dummy47"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        specificIds: ["pol-npe-001-kobieta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "npe-1",
        specificIds: ["pol-ver-005-pisać"],
        tenseDescription: ["past im"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy48a",
    sentenceFormulaId: "POL-dummy48a",
    equivalents: { ENG: ["ENG-dummy48a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
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
    equivalents: { ENG: ["ENG-dummy49a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49b",
    sentenceFormulaId: "POL-dummy49b",
    equivalents: { ENG: ["ENG-dummy49b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49c",
    sentenceFormulaId: "POL-dummy49c",
    equivalents: { ENG: ["ENG-dummy49c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49d",
    sentenceFormulaId: "POL-dummy49d",
    equivalents: { ENG: ["ENG-dummy49d"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },

  {
    sentenceFormulaSymbol: "dummy49e",
    sentenceFormulaId: "POL-dummy49e",
    equivalents: { ENG: ["ENG-dummy49e"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gcase: ["nom"],
        gender: [],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49f",
    sentenceFormulaId: "POL-dummy49f",
    equivalents: { ENG: ["ENG-dummy49f"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy50a",
    sentenceFormulaId: "POL-dummy50a",
    equivalents: { ENG: ["ENG-dummy50a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        // gender: ["m1"],
        // number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",

        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "pro-2",

        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1",
        agreeWith2: "nco-1",
      },
      {
        chunkId: "nco-1",

        specificIds: ["pol-nco-002-cebula"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1", "pro-2", "nco-1"]],
    additionalOrders: [["ver-1", "pro-2", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy50b",
    sentenceFormulaId: "POL-dummy50b",
    equivalents: { ENG: ["ENG-dummy50b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2",

        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1",
        agreeWith2: "nco-1",
      },
      {
        chunkId: "nco-1",

        specificIds: ["pol-nco-002-cebula"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pro-2", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy51a",
    sentenceFormulaId: "POL-dummy51a",
    equivalents: { ENG: ["ENG-dummy51a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        andTags: ["job"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "npe-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-005-napisać", "pol-ver-003-przeczytać"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy52",
    sentenceFormulaId: "POL-dummy52",
    equivalents: { ENG: ["ENG-dummy52"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        specificIds: ["pol-npe-001-kobieta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "npe-1",
        tenseDescription: ["future im"],
        specificIds: ["pol-ver-005-napisać", "pol-ver-005-pisać"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy53",
    sentenceFormulaId: "POL-dummy53",
    equivalents: { ENG: ["ENG-dummy53"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: { ENG: ["ENG-dummy53a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: { ENG: ["ENG-dummy53b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: { ENG: ["ENG-dummy53c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["present im", "past pf"],
        number: [],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53c-2 you are (pres)",
    sentenceFormulaId: "POL-dummy53c-2",
    equivalents: { ENG: ["ENG-dummy53c-2"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "pro-1",
        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["present im"],
        number: [],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53d she is",
    sentenceFormulaId: "POL-dummy53d",
    equivalents: { ENG: ["ENG-dummy53d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy53e we are",
    sentenceFormulaId: "POL-dummy53e",
    equivalents: { ENG: ["ENG-dummy53e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: { ENG: ["ENG-dummy53f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
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
    equivalents: { ENG: ["ENG-dummy54a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy54b",
    sentenceFormulaId: "POL-dummy54b",
    equivalents: { ENG: ["ENG-dummy54a"] }, //Yes, this does indeed point from b to a.
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
        tenseDescription: ["future im"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy54c",
    sentenceFormulaId: "POL-dummy54c",
    equivalents: { ENG: ["ENG-dummy54c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",

        specificIds: ["pol-ver-002-mieć"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy55",
    sentenceFormulaId: "POL-dummy55",
    equivalents: { ENG: ["ENG-dummy55"] },
    sentenceStructure: [
      {
        chunkId: "pre-1",

        specificIds: ["pol-pre-001-z"],
        // connectedTo: "nco-1",
      },
      {
        chunkId: "nco-1",

        orTags: ["edible", "edible0"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pre-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy55a",
    sentenceFormulaId: "POL-dummy55a",
    equivalents: { ENG: ["ENG-dummy55a"] },
    sentenceStructure: [
      {
        chunkId: "pre-1",

        specificIds: ["pol-pre-001-z"],
        // connectedTo: "nco-1",
      },
      {
        chunkId: "nco-1",

        orTags: ["animal"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pre-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy55b",
    sentenceFormulaId: "POL-dummy55b",
    equivalents: { ENG: ["ENG-dummy55b"] },
    sentenceStructure: [
      {
        chunkId: "pre-1",

        specificIds: ["pol-pre-001-z"],
        // connectedTo: "nco-1",
      },
      {
        chunkId: "nco-1",

        orTags: ["animal"],
        gcase: ["ins"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["pre-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy55c",
    sentenceFormulaId: "POL-dummy55c",
    equivalents: { ENG: ["ENG-dummy55c"] },
    sentenceStructure: [
      {
        chunkId: "pre-1",

        specificIds: ["pol-pre-001-z"],
        // connectedTo: "nco-1",
      },
      {
        chunkId: "nco-1",

        specificIds: ["pol-nco-008-owca"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pre-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy55d",
    sentenceFormulaId: "POL-dummy55d",
    equivalents: { ENG: ["ENG-dummy55d"] },
    sentenceStructure: [
      {
        chunkId: "pre-1",

        specificIds: ["pol-pre-001-z"],
        // connectedTo: "nco-1",
      },
      {
        chunkId: "nco-1",

        specificIds: ["pol-nco-008-owca"],
        gcase: ["ins"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["pre-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy56",
    sentenceFormulaId: "POL-dummy56",
    equivalents: { ENG: ["ENG-dummy56"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",

        orTags: ["edible", "edible0"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy56a",
    sentenceFormulaId: "POL-dummy56a",
    equivalents: { ENG: ["ENG-dummy56a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        specificIds: ["pol-npe-001-kobieta"],
        number: ["singular"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy57",
    sentenceFormulaId: "POL-dummy57",
    equivalents: { ENG: ["ENG-dummy57"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        number: ["plural"],
        specificIds: ["pol-npe-001-kobieta"],
      },
      {
        chunkId: "ver-1",

        agreeWith: "npe-1",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1",

        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "pro-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy58 doctor",
    sentenceFormulaId: "POL-dummy58",
    equivalents: { ENG: ["ENG-dummy58"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        andTags: ["job"],
        // number: ["singular"],
        // gender: ["f"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy58a doctor f",
    sentenceFormulaId: "POL-dummy58a",
    equivalents: { ENG: ["ENG-dummy58a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        andTags: ["job"],
        number: ["singular"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy59a doctor",
    sentenceFormulaId: "POL-dummy59a",
    equivalents: { ENG: ["ENG-dummy59a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        andTags: ["job"],
        number: ["singular"],
        // gender: ["f"],
        // formulaImportantTraitKeys: ["gender"],
        // educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy59b doctor",
    sentenceFormulaId: "POL-dummy59b",
    equivalents: { ENG: ["ENG-dummy59b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",

        andTags: ["job"],
        number: ["singular"],
        gender: ["m1", "f"],
        // formulaImportantTraitKeys: ["gender"],
        // educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy60",
    sentenceFormulaId: "POL-dummy60",
    equivalents: { ENG: ["ENG-dummy60"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic1"],
        tenseDescription: [
          "present im",
          // "past simple"
        ],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy60a",
    sentenceFormulaId: "POL-dummy60a",
    equivalents: { ENG: ["ENG-dummy60a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic1"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy60b",
    sentenceFormulaId: "POL-dummy60b",
    equivalents: { ENG: ["ENG-dummy60b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic2"],
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy61",
    sentenceFormulaId: "POL-dummy61",
    equivalents: { ENG: ["ENG-dummy61"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["singular"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic2"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy61a",
    sentenceFormulaId: "POL-dummy61a",
    equivalents: { ENG: ["ENG-dummy61a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["singular"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy62",
    sentenceFormulaId: "POL-dummy62",
    equivalents: { ENG: ["ENG-dummy62"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "pro-2",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["acc"],
        number: ["plural"],
        person: ["3per"],
      },
    ],
    primaryOrders: [["ver-1", "pro-2"]],
    additionalOrders: [
      ["pro-1", "ver-1", "pro-2"],
      ["pro-1", "pro-2", "ver-1"],
      ["pro-2", "ver-1"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy62a",
    sentenceFormulaId: "POL-dummy62a",
    equivalents: { ENG: ["ENG-dummy62a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["nom"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-2",
        specificIds: ["pol-pro-PERSONAL"],
        gcase: ["acc"],
        number: ["plural"],
        person: ["3per"],
      },
    ],
    primaryOrders: [["ver-1", "pro-2"]],
    additionalOrders: [
      ["pro-1", "ver-1", "pro-2"],
      ["pro-1", "pro-2", "ver-1"],
      ["pro-2", "ver-1"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy63a",
    sentenceFormulaId: "POL-dummy63a",
    equivalents: { ENG: ["ENG-dummy63a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "ver-1-write"]],
  },
  {
    sentenceFormulaSymbol: "dummy63b",
    sentenceFormulaId: "POL-dummy63b",
    equivalents: { ENG: ["ENG-dummy63b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
        gender: ["nonvirile"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "ver-1-write"]],
  },
  {
    sentenceFormulaSymbol: "dummy63c",
    sentenceFormulaId: "POL-dummy63c",
    equivalents: { ENG: ["ENG-dummy63c"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "ver-1-write"]],
  },
  {
    sentenceFormulaSymbol: "dummy63d",
    sentenceFormulaId: "POL-dummy63d",
    equivalents: { ENG: ["ENG-dummy63d"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
        gender: ["virile"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "ver-1-write"]],
  },
  {
    sentenceFormulaSymbol: "dummy64a",
    sentenceFormulaId: "POL-dummy64a",
    equivalents: { ENG: ["ENG-dummy64a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
        agreeWith: "npe-1-Woman",
      },
      {
        chunkId: "npe-1-Woman",
        specificIds: ["pol-npe-001-kobieta", "pol-npe-002-chłopiec"],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "i" },
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "pro-2-Her",
        specificIds: ["pol-pro-PERSONAL"],
        agreeWith: "npe-1-Woman",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [
      ["ver-1-Is", "npe-1-Woman", "fix-2-And", "ver-1-See", "pro-2-Her"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy64b",
    sentenceFormulaId: "POL-dummy64b",
    equivalents: { ENG: ["ENG-dummy64b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-Apple",
      },
      {
        chunkId: "nco-1-Apple",
        specificIds: [
          "pol-nco-004-jabłko",
          "pol-nco-003-pomidor",
          "pol-nco-002-cebula",
        ],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "i" },
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "pro-2-It",
        specificIds: ["pol-pro-PERSONAL"],
        agreeWith: "nco-1-Apple",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [
      ["ver-1-Is", "nco-1-Apple", "fix-2-And", "ver-1-See", "pro-2-It"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy65a",
    sentenceFormulaId: "POL-dummy65a",
    equivalents: { ENG: ["ENG-dummy65a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-Rat",
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-011-szczur"],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "i" },
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "pro-2-It",
        specificIds: ["pol-pro-PERSONAL"],
        agreeWith: "nco-1-Rat",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [
      ["ver-1-Is", "nco-1-Rat", "fix-2-And", "ver-1-See", "pro-2-It"],
    ],
  },
  {
    sentenceFormulaSymbol: "dummy66",
    sentenceFormulaId: "POL-dummy66",
    equivalents: { ENG: ["ENG-dummy66"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Rats",
        specificIds: [
          "pol-nco-011-szczur",
          "pol-npe-001-kobieta",
          "pol-npe-002-chłopiec",
        ],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Are",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "nco-1-Rats",
        tenseDescription: ["present im"],
      },
      {
        chunkId: "adj-1-Red",
        specificIds: ["pol-adj-001-czerwony"],
        agreeWith: "nco-1-Rats",
      },
    ],
    primaryOrders: [["nco-1-Rats", "ver-1-Are", "adj-1-Red"]],
  },
  {
    sentenceFormulaSymbol: "dummy67a",
    sentenceFormulaId: "POL-dummy67a",
    equivalents: { ENG: ["ENG-dummy67a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-011-szczur"],
        number: ["singular"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["ver-1-See", "nco-1-Rat"]],
  },
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  {
    sentenceFormulaSymbol: "dummy67b",
    sentenceFormulaId: "POL-dummy67b",
    equivalents: { ENG: ["ENG-dummy67b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-011-szczur"],
        number: ["singular"],
        gcase: ["acc"],
      },
      { chunkId: "fix-1-Comma", chunkValue: "," },
      {
        chunkId: "ver-2-Be",
        agreeWith: "nco-1-Rat",
        specificIds: ["pol-ver-001-być"],
        tenseDescription: ["past im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "adj-1-Small",
        agreeWith: "nco-1-Rat",
        specificIds: ["pol-adj-002-mały"],
        gcase: ["nom"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [
      ["ver-1-See", "nco-1-Rat", "fix-1-Comma", "ver-2-Be", "adj-1-Small"],
    ],
  },
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  {
    sentenceFormulaSymbol: "dummy68a",
    sentenceFormulaId: "POL-dummy68a",
    equivalents: { ENG: ["ENG-dummy68a"] },
    sentenceStructure: [
      { chunkId: "fix-1-One", chunkValue: "jedne" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["pol-nco-007-drzwi"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1-One", "nco-1-Door"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy68b",
    sentenceFormulaId: "POL-dummy68b",
    equivalents: { ENG: ["ENG-dummy68b"] },
    sentenceStructure: [
      { chunkId: "fix-1-Two", chunkValue: "dwoje" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["pol-nco-007-drzwi"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["fix-1-Two", "nco-1-Door"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy68c",
    sentenceFormulaId: "POL-dummy68c",
    equivalents: { ENG: ["ENG-dummy68c"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["pol-nco-012-pinceta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    primaryOrders: [["nco-1-Tweezers", "ver-1-Be"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy68d",
    sentenceFormulaId: "POL-dummy68d",
    equivalents: { ENG: ["ENG-dummy68d"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["pol-nco-012-pinceta"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    primaryOrders: [["nco-1-Tweezers", "ver-1-Be"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy68e",
    sentenceFormulaId: "POL-dummy68e",
    equivalents: { ENG: ["ENG-dummy68e"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["pol-nco-009-pył"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    primaryOrders: [["nco-1-Dust", "ver-1-Be"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy68f",
    sentenceFormulaId: "POL-dummy68f",
    equivalents: { ENG: ["ENG-dummy68f"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["pol-nco-009-pył"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    primaryOrders: [["nco-1-Dust", "ver-1-Be"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy70a",
    sentenceFormulaId: "POL-dummy70a",
    equivalents: { ENG: ["ENG-dummy70a"], POL: ["POL-dummy70a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-Who",
        specificIds: ["pol-pro-ITG_G"],
        gcase: ["ins"],
        formulaImportantTraitKeys: ["gcase"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-001-być"],
        agreeWith: "pro-2-She",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "pro-2-She",
        specificIds: ["pol-pro-PERSONAL"],
        isPerson: true,
      },
      {
        chunkId: "fix-1-QM",
        chunkValue: "?",
      },
    ],
    primaryOrders: [
      ["pro-1-Who", "ver-1-Be", "fix-1-QM"],
      ["pro-1-Who", "pro-2-She", "ver-1-Be", "fix-1-QM"],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy71a",
    sentenceFormulaId: "POL-dummy71a",
    equivalents: { ENG: ["ENG-dummy71a"], POL: ["POL-dummy71a"] },
    sentenceStructure: [
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-002-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["adj-1-Small", "nco-1-Hole"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy71b",
    sentenceFormulaId: "POL-dummy71b",
    equivalents: { ENG: ["ENG-dummy71b"], POL: ["POL-dummy71b"] },
    sentenceStructure: [
      {
        chunkId: "fix-1-W",
        chunkValue: "w",
      },
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-002-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
        gcase: ["loc"],
      },
    ],
    primaryOrders: [["fix-1-W", "adj-1-Small", "nco-1-Hole"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy71c",
    sentenceFormulaId: "POL-dummy71c",
    equivalents: {
      ENG: ["ENG-dummy71c", "ENG-dummy71a"],
      POL: ["POL-dummy71c", "POL-dummy71a"],
    },
    sentenceStructure: [
      {
        chunkId: "fix-1-W",
        chunkValue: "w",
      },
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-002-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
        gcase: ["loc"],
      },
    ],
    primaryOrders: [["fix-1-W", "adj-1-Small", "nco-1-Hole"]],
    additionalOrders: [],
  },
];
