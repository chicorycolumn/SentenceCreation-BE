exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaId: "POL-dummy01",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["nonexistent tag"],
        number: ["singular"],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy03",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["dummy"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy04",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["dummy"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy09",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["foobar-A"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-2",
        andTags: ["foobar-B"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-3",
        andTags: ["foobar-C"],
        number: ["singular"],
        gender: [],
      },
    ],
    orders: {
      primary: [["nco-1", "nco-3", "nco-2"]],
      additional: [
        ["nco-1", "nco-2", "nco-3"],
        ["nco-2", "nco-1", "nco-3"],
        ["nco-2", "nco-3", "nco-1"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy10",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["foobar-A"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-2",
        andTags: ["foobar-B"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nco-3",
        andTags: ["foobar-C"],
        number: ["singular"],
        gender: [],
      },
    ],
    orders: {
      primary: [
        ["nco-1", "nco-3", "nco-2"],
        ["nco-1", "nco-2", "nco-3"],
        ["nco-2", "nco-1", "nco-3"],
        ["nco-2", "nco-3", "nco-1"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy11a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "mam" },
      {
        chunkId: "nco-1",
        andTags: [],
        number: ["singular"],
        gender: [],
        specificIds: ["pol-nco-014-jabłko"],
      },
    ],
    orders: { primary: [["fix-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy11b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "mam" },
      {
        chunkId: "nco-1",
        andTags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificIds: ["pol-nco-014-jabłko", "pol-nco-010-majtki"],
      },
    ],
    orders: { primary: [["fix-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy12",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["wearable"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy12a",
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        person: ["2per"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy13a", // conditional plural
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        tenseDescription: ["conditional im"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy13b", // present 2per f
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy14", // infinitive
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["infinitive"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy15", // impersonal
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        person: ["impersonal"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy15a", // impersonal plural
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy15b", // impersonal plural
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["perfective"],
        andTags: ["basic2"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy16", // contemporaryAdverbial
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["contemporaryAdverbial"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy17", // contemporaryAdverbial female
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["contemporaryAdverbial"],
        gender: ["f"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy18", // contemporaryAdverbial n virile 2per
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy16a", // anteriorAdverbial
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        form: ["anteriorAdverbial"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy17a", // anteriorAdverbial female
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        form: ["anteriorAdverbial"],
        gender: ["f"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy18a", // anteriorAdverbial n virile 2per
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        gender: ["n", "virile"],
        person: ["2per"],
        form: ["anteriorAdverbial"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy19",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["dummy-nco-010"],
        number: ["singular", "plural"],
        gcase: ["acc"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy20a",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
        specificIds: ["^pol-npe-011-kobieta"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy20b",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
        specificIds: ["^pol-npe-011-kobieta"],
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy21", // verbalNoun
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbalNoun"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy22", // verbalNoun ~f
    sentenceStructure: [
      {
        chunkId: "ver-1",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbalNoun"],
        gender: ["f"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy23a", // past/cond 1per plural m1
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy23b", // past/cond 1per plural m2
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy23c", // past/cond 1per plural f/n
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [["ver-1", "fix-1", "ver-2"]] },
  },
  {
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
    orders: { primary: [["ver-1", "fix-1", "ver-2"]] },
  },
  {
    sentenceFormulaId: "POL-dummy25a",
    equivalents: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "dzień" },
      { chunkId: "fix-2", chunkValue: "dobry" },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy25b",
    equivalents: { ENG: ["ENG-dummy25a", "ENG-dummy25b"] },
    sentenceStructure: [{ chunkId: "fix-1", chunkValue: "halo" }],
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy33",
    equivalents: { ENG: ["ENG-dummy33"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        person: [],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy33a",
    equivalents: { ENG: ["ENG-dummy33a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        person: ["1per"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy33b",
    equivalents: { ENG: ["ENG-dummy33b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
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
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        number: [],
      },
    ],
    orders: { primary: [["ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy33ca",
    equivalents: { ENG: ["ENG-dummy33ca"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        number: [],
      },
    ],
    orders: { primary: [["ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy33d",
    equivalents: { ENG: ["ENG-dummy33d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy33e",
    equivalents: { ENG: ["ENG-dummy33e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy33f",
    equivalents: { ENG: ["ENG-dummy33f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy34",
    equivalents: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
        person: [],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy34a",
    equivalents: { ENG: ["ENG-dummy34a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy34b",
    equivalents: { ENG: ["ENG-dummy34a"] }, //Yes, this does indeed point from b to a.
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["future im"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy34c",
    equivalents: { ENG: ["ENG-dummy34c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy34d",
    equivalents: { ENG: ["ENG-dummy34d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["future im", "present im"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy36",
    equivalents: { ENG: ["ENG-dummy36"] },
    sentenceStructure: [{ chunkId: "nco-1", andTags: ["farmyard"] }],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy36a",
    equivalents: { ENG: ["ENG-dummy36a"] },
    sentenceStructure: [
      { chunkId: "nco-1-sheep", andTags: ["farmyard"] },
      {
        chunkId: "ver-1-is",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-sheep",
      },
      { chunkId: "fix-1-here", chunkValue: "tutaj" },
    ],
    orders: { primary: [["nco-1-sheep", "ver-1-is", "fix-1-here"]] },
  },
  {
    sentenceFormulaId: "POL-dummy36b",
    equivalents: { ENG: ["ENG-dummy36b"] },
    sentenceStructure: [
      { chunkId: "nco-1", andTags: ["farmyard"] },
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1",
      },
    ],
    orders: { primary: [["nco-1", "ver-1"], ["nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy37",
    equivalents: { ENG: ["ENG-dummy37"] },
    sentenceStructure: [{ chunkId: "ver-1", specificIds: ["pol-ver-011-być"] }],
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
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
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
      },
    ],
    orders: { primary: [["ver-1"]] },
  },
  {
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
    orders: { primary: [["ver-1"]] },
  },
  {
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
    orders: { primary: [["ver-1"]] },
  },
  {
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
    orders: { primary: [["ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy43",
    equivalents: { ENG: ["ENG-dummy43"] },
    sentenceStructure: [
      { chunkId: "adj-1", agreeWith: "nco-1", andTags: ["size"] },
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["adj-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy45a",
    equivalents: { ENG: ["ENG-dummy45a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting2"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy45b",
    equivalents: { ENG: ["ENG-dummy45b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy46a",
    equivalents: { ENG: ["ENG-dummy46a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting3"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy46c",
    equivalents: { ENG: ["ENG-dummy46c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy47",
    equivalents: { ENG: ["ENG-dummy47"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["pol-npe-011-kobieta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["past im"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["npe-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy48a",
    equivalents: { ENG: ["ENG-dummy48a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy49a",
    equivalents: { ENG: ["ENG-dummy49a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy49b",
    equivalents: { ENG: ["ENG-dummy49b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gender: ["f"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy49c",
    equivalents: { ENG: ["ENG-dummy49c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy49d",
    equivalents: { ENG: ["ENG-dummy49d"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy49e",
    equivalents: { ENG: ["ENG-dummy49e"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy49f",
    equivalents: { ENG: ["ENG-dummy49f"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy50a",
    equivalents: { ENG: ["ENG-dummy50a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-012-mieć"],
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
        specificIds: ["pol-nco-012-cebula"],
        gcase: ["acc"],
      },
    ],
    orders: {
      primary: [["pro-1", "ver-1", "pro-2", "nco-1"]],
      additional: [["ver-1", "pro-2", "nco-1"]],
    },
  },
  {
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
        specificIds: ["pol-nco-012-cebula"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pro-2", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy51a",
    equivalents: { ENG: ["ENG-dummy51a"] },
    sentenceStructure: [
      { chunkId: "npe-1", andTags: ["job"], number: ["singular"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["past pf"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["npe-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy52",
    equivalents: { ENG: ["ENG-dummy52"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["^pol-npe-011-kobieta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["future im"],
        specificIds: ["pol-ver-015-napisać"],
      },
    ],
    orders: { primary: [["npe-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy53",
    equivalents: { ENG: ["ENG-dummy53"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per", "2per", "3per"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy53a",
    equivalents: { ENG: ["ENG-dummy53a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im"],
        person: ["1per"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy53b",
    equivalents: { ENG: ["ENG-dummy53b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
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
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        number: [],
      },
    ],
    orders: { primary: [["ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy53ca",
    equivalents: { ENG: ["ENG-dummy53ca"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im"],
        number: [],
      },
    ],
    orders: { primary: [["ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy53d",
    equivalents: { ENG: ["ENG-dummy53d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["singular"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy53e",
    equivalents: { ENG: ["ENG-dummy53e"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy53f",
    equivalents: { ENG: ["ENG-dummy53f"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["present im", "past pf"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy54",
    equivalents: {},
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["past pf"],
        person: ["1per", "2per", "3per"],
        number: [],
        gender: [],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy54a",
    equivalents: { ENG: ["ENG-dummy54a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy54b",
    equivalents: { ENG: ["ENG-dummy54a"] }, //Yes, this does indeed point from b to a.
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        tenseDescription: ["future im"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy54c",
    equivalents: { ENG: ["ENG-dummy54c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-012-mieć"],
        person: ["1per"],
        tenseDescription: ["future im"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy55",
    equivalents: { ENG: ["ENG-dummy55"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["pol-pre-001-z"] },
      {
        chunkId: "nco-1",
        orTags: ["edible", "edible0"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy55a",
    equivalents: { ENG: ["ENG-dummy55a"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["pol-pre-001-z"] },
      {
        chunkId: "nco-1",
        orTags: ["animal"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy55b",
    equivalents: { ENG: ["ENG-dummy55b"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["pol-pre-001-z"] },
      {
        chunkId: "nco-1",
        orTags: ["animal"],
        gcase: ["ins"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["pre-1", "nco-1"]] },
  },

  {
    sentenceFormulaId: "POL-dummy55c",
    equivalents: { ENG: ["ENG-dummy55c"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["pol-pre-001-z"] },
      {
        chunkId: "nco-1",
        specificIds: ["pol-nco-018-owca"],
        gcase: ["ins"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy55d",
    equivalents: { ENG: ["ENG-dummy55d"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["pol-pre-001-z"] },
      {
        chunkId: "nco-1",
        specificIds: ["pol-nco-018-owca"],
        gcase: ["ins"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["pre-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy56",
    equivalents: { ENG: ["ENG-dummy56"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        orTags: ["edible", "edible0"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy56a",
    equivalents: { ENG: ["ENG-dummy56a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["^pol-npe-011-kobieta"],
        number: ["singular"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy57",
    equivalents: { ENG: ["ENG-dummy57"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        number: ["plural"],
        specificIds: ["pol-npe-011-kobieta"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-018-widzieć"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["2per"],
        gcase: ["acc"],
      },
    ],
    orders: { primary: [["npe-1", "ver-1", "pro-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy58",
    equivalents: { ENG: ["ENG-dummy58"] },
    sentenceStructure: [{ chunkId: "npe-1", andTags: ["job"] }],
    orders: { primary: [] },
  },
  {
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
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy59a",
    equivalents: { ENG: ["ENG-dummy59a"] },
    sentenceStructure: [
      { chunkId: "npe-1", andTags: ["job"], number: ["singular"] },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy59b",
    equivalents: { ENG: ["ENG-dummy59b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["singular"],
        gender: ["m1", "f"],
      },
    ],
    orders: { primary: [] },
  },
  {
    sentenceFormulaId: "POL-dummy60",
    equivalents: { ENG: ["ENG-dummy60"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic1"],
        tenseDescription: ["present im"],
      },
    ],
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy60a",
    equivalents: { ENG: ["ENG-dummy60a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
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
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy60b",
    equivalents: { ENG: ["ENG-dummy60b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
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
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy61",
    equivalents: { ENG: ["ENG-dummy61"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
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
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy61a",
    equivalents: { ENG: ["ENG-dummy61a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
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
    orders: { primary: [["ver-1"]], additional: [["pro-1", "ver-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy62",
    equivalents: { ENG: ["ENG-dummy62"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-018-widzieć"],
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
    orders: {
      primary: [["ver-1", "pro-2"]],
      additional: [
        ["pro-1", "ver-1", "pro-2"],
        ["pro-1", "pro-2", "ver-1"],
        ["pro-2", "ver-1"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy62a",
    equivalents: { ENG: ["ENG-dummy62a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-018-widzieć"],
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
    orders: {
      primary: [["ver-1", "pro-2"]],
      additional: [
        ["pro-1", "ver-1", "pro-2"],
        ["pro-1", "pro-2", "ver-1"],
        ["pro-2", "ver-1"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy63a",
    equivalents: { ENG: ["ENG-dummy63a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
        gender: ["m1"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-015-pisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    orders: { primary: [["npe-1-doctor", "ver-1-write"]] },
  },
  {
    sentenceFormulaId: "POL-dummy63b",
    equivalents: { ENG: ["ENG-dummy63b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
        gender: ["nonvirile"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-015-pisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    orders: { primary: [["npe-1-doctor", "ver-1-write"]] },
  },
  {
    sentenceFormulaId: "POL-dummy63c",
    equivalents: { ENG: ["ENG-dummy63c"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-015-pisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    orders: { primary: [["npe-1-doctor", "ver-1-write"]] },
  },
  {
    sentenceFormulaId: "POL-dummy63d",
    equivalents: { ENG: ["ENG-dummy63d"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
        gender: ["virile"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-015-pisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    orders: { primary: [["npe-1-doctor", "ver-1-write"]] },
  },
  {
    sentenceFormulaId: "POL-dummy64a",
    equivalents: { ENG: ["ENG-dummy64a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        agreeWith: "npe-1-Woman",
      },
      {
        chunkId: "npe-1-Woman",
        specificIds: ["pol-npe-013-parentarooni"],
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
        specificIds: ["pol-ver-018-widzieć"],
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
    orders: {
      primary: [
        ["ver-1-Is", "npe-1-Woman", "fix-2-And", "ver-1-See", "pro-2-Her"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy64b",
    equivalents: { ENG: ["ENG-dummy64b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-Apple",
      },
      {
        chunkId: "nco-1-Apple",
        specificIds: [
          "pol-nco-014-jabłko",
          "pol-nco-013-pomidor",
          "pol-nco-012-cebula",
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
        specificIds: ["pol-ver-018-widzieć"],
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
    orders: {
      primary: [
        ["ver-1-Is", "nco-1-Apple", "fix-2-And", "ver-1-See", "pro-2-It"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy65a",
    equivalents: { ENG: ["ENG-dummy65a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1-Is",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
        agreeWith: "nco-1-Rat",
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-001-szczur"],
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
        specificIds: ["pol-ver-018-widzieć"],
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
    orders: {
      primary: [
        ["ver-1-Is", "nco-1-Rat", "fix-2-And", "ver-1-See", "pro-2-It"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy66",
    equivalents: { ENG: ["ENG-dummy66"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Rats",
        specificIds: [
          "^pol-nco-001-szczur",
          "^pol-npe-011-kobieta",
          "^pol-npe-012-chłopiec",
        ],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Are",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "nco-1-Rats",
        tenseDescription: ["present im"],
      },
      {
        chunkId: "adj-1-Red",
        specificIds: ["pol-adj-011-czerwony"],
        agreeWith: "nco-1-Rats",
      },
    ],
    orders: { primary: [["nco-1-Rats", "ver-1-Are", "adj-1-Red"]] },
  },
  {
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
        specificIds: ["pol-ver-018-widzieć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-001-szczur"],
        number: ["singular"],
        gcase: ["acc"],
      },
    ],
    orders: { primary: [["ver-1-See", "nco-1-Rat"]] },
  },
  {
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
        specificIds: ["pol-ver-018-widzieć"],
        tenseDescription: ["present im"],
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["pol-nco-001-szczur"],
        number: ["singular"],
        gcase: ["acc"],
      },
      { chunkId: "fix-1-Comma", chunkValue: "," },
      {
        chunkId: "ver-2-Be",
        agreeWith: "nco-1-Rat",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "adj-1-Small",
        agreeWith: "nco-1-Rat",
        specificIds: ["pol-adj-012-mały"],
        gcase: ["nom"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    orders: {
      primary: [
        ["ver-1-See", "nco-1-Rat", "fix-1-Comma", "ver-2-Be", "adj-1-Small"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy68a",
    equivalents: { ENG: ["ENG-dummy68a"] },
    sentenceStructure: [
      { chunkId: "fix-1-One", chunkValue: "jedne" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["pol-nco-017-drzwi"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1-One", "nco-1-Door"]] },
  },
  {
    sentenceFormulaId: "POL-dummy68b",
    equivalents: { ENG: ["ENG-dummy68b"] },
    sentenceStructure: [
      { chunkId: "fix-1-Two", chunkValue: "dwoje" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["pol-nco-017-drzwi"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1-Two", "nco-1-Door"]] },
  },
  {
    sentenceFormulaId: "POL-dummy68c",
    equivalents: { ENG: ["ENG-dummy68c"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["pol-nco-002-pinceta"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Tweezers", "ver-1-Be"]] },
  },
  {
    sentenceFormulaId: "POL-dummy68d",
    equivalents: { ENG: ["ENG-dummy68d"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["pol-nco-002-pinceta"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Tweezers", "ver-1-Be"]] },
  },
  {
    sentenceFormulaId: "POL-dummy68e",
    equivalents: { ENG: ["ENG-dummy68e"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["pol-nco-019-pył"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Dust", "ver-1-Be"]] },
  },
  {
    sentenceFormulaId: "POL-dummy68f",
    equivalents: { ENG: ["ENG-dummy68f"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["pol-nco-019-pył"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Dust", "ver-1-Be"]] },
  },
  {
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
        specificIds: ["pol-ver-011-być"],
        agreeWith: "pro-2-She",
        tenseDescription: ["present im"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "pro-2-She",
        specificIds: ["pol-pro-PERSONAL"],
        isPerson: true,
      },
      { chunkId: "fix-1-QM", chunkValue: "?" },
    ],
    orders: {
      primary: [
        ["pro-1-Who", "ver-1-Be", "fix-1-QM"],
        ["pro-1-Who", "pro-2-She", "ver-1-Be", "fix-1-QM"],
      ],
    },
  },
  {
    sentenceFormulaId: "POL-dummy71a",
    equivalents: { ENG: ["ENG-dummy71a"], POL: ["POL-dummy71a"] },
    sentenceStructure: [
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-012-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["adj-1-Small", "nco-1-Hole"]] },
  },
  {
    sentenceFormulaId: "POL-dummy71b",
    equivalents: { ENG: ["ENG-dummy71b"], POL: ["POL-dummy71b"] },
    sentenceStructure: [
      { chunkId: "fix-1-W", chunkValue: "w" },
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-012-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
        gcase: ["loc"],
      },
    ],
    orders: { primary: [["fix-1-W", "adj-1-Small", "nco-1-Hole"]] },
  },
  {
    sentenceFormulaId: "POL-dummy71c",
    equivalents: {
      ENG: ["ENG-dummy71c", "ENG-dummy71a"],
      POL: ["POL-dummy71c", "POL-dummy71a"],
    },
    sentenceStructure: [
      { chunkId: "fix-1-W", chunkValue: "w" },
      {
        chunkId: "adj-1-Small",
        specificIds: ["pol-adj-012-mały"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["pol-nco-Ddziura"],
        number: ["singular"],
        gcase: ["loc"],
      },
    ],
    orders: { primary: [["fix-1-W", "adj-1-Small", "nco-1-Hole"]] },
  },
  {
    sentenceFormulaId: "POL-dummy72a",
    equivalents: {
      ENG: ["ENG-dummy72a"],
      POL: ["POL-dummy72a"],
      SPA: ["SPA-dummy72a"],
    },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        specificIds: ["pol-nco-012-cebula", "pol-nco-011-niedźwiedź"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["adj-1", "nco-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy72b",
    equivalents: {
      ENG: ["ENG-dummy72b"],
      POL: ["POL-dummy72b"],
      SPA: ["SPA-dummy72b"],
    },
    sentenceStructure: [
      { chunkId: "npe-1", specificIds: ["pol-npe-015-lekarz"] },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy72c",
    equivalents: {
      ENG: ["ENG-dummy72c"],
      POL: ["POL-dummy72c"],
      SPA: ["SPA-dummy72c"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["pol-npe-013-parentaroonie"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy73a",
    equivalents: {
      ENG: ["ENG-dummy73a"],
      POL: ["POL-dummy73a"],
      SPA: ["SPA-dummy73a"],
    },
    sentenceStructure: [
      { chunkId: "npe-1", specificIds: ["^pol-npe-012-dziecko-£"] },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy73b",
    equivalents: {
      ENG: ["ENG-dummy73b"],
      POL: ["POL-dummy73b"],
      SPA: ["SPA-dummy73b"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["pol-npe-012-boy"],
        gender: ["f"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy74",
    equivalents: { ENG: ["ENG-dummy74"], POL: ["POL-dummy74"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "jedna" },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["pol-adj-011-czerwony"],
      },
      {
        chunkId: "npe-1",
        specificIds: ["^pol-npe-011-osoba-£"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "adj-1", "npe-1"]] },
  },
  {
    sentenceFormulaId: "POL-dummy75",
    equivalents: { ENG: ["ENG-dummy75"], POL: ["POL-dummy75"] },
    sentenceStructure: [
      { chunkId: "nco-1-rat", specificIds: ["^pol-nco-001-szczur"] },
      {
        chunkId: "ver-1-was",
        agreeWith: "nco-1-rat",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past im"],
      },
      {
        chunkId: "adj-1-red",
        agreeWith: "nco-1-rat",
        specificIds: ["pol-adj-011-czerwony"],
      },
    ],
    orders: { primary: [["nco-1-rat", "ver-1-was", "adj-1-red"]] },
  },
  {
    sentenceFormulaId: "POL-52",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["wearable"],
        number: ["singular"],
        blockedLemmaObjectTypes: ["tantumPlurale"],
      },
      { chunkId: "fix-1", chunkValue: "jest w szafie" },
    ],
    orders: { primary: [["nco-1", "fix-1"]], additional: [] },
  },
];
