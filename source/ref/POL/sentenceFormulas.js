exports.sentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "girl eats apple",
    sentenceFormulaId: "POL-00-50",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "je" },
      {
        chunkId: "nco-2",
        andTags: ["edible"],
        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [["npe-1", "fix-1", "nco-2"]],
  },
  {
    sentenceFormulaSymbol: "girl is wearing shirt",
    sentenceFormulaId: "POL-00-51",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["singular"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "ma na sobie" },
      {
        chunkId: "nco-2",
        andTags: ["wearable"],
        gcase: ["acc"],
        number: [],
        gender: [],
      },
    ],
    primaryOrders: [["npe-1", "fix-1", "nco-2"]],
  },
  {
    sentenceFormulaSymbol: "shirt is in wardrobe",
    sentenceFormulaId: "POL-00-52",
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["wearable"],

        number: ["singular"],
        blockedLemmaObjectTypes: ["tantumPlurale"],
        gender: [],
      },
      { chunkId: "fix-1", chunkValue: "jest w szafie" },
    ],
    primaryOrders: [["nco-1", "fix-1"]],
  },
  {
    sentenceFormulaSymbol: "I often wear shirt",
    sentenceFormulaId: "POL-00-53",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "często noszę" },
      {
        chunkId: "nco-1",
        andTags: ["wearable"],
        gcase: ["acc"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
    primaryOrders: [["fix-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "boys are male",
    sentenceFormulaId: "POL-00-54",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["plural"],
        gender: ["m1"],
      },
      { chunkId: "fix-1", chunkValue: "są męscy" },
    ],
    primaryOrders: [["npe-1", "fix-1"]],
  },
  {
    sentenceFormulaSymbol: "red apple",
    sentenceFormulaId: "POL-00-55",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-1",
        andTags: ["edible"],

        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red apples",
    sentenceFormulaId: "POL-00-55a",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-1",
        andTags: ["edible"],

        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red/blue apple",
    sentenceFormulaId: "POL-00-55b",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        form: ["simple"],
        orTags: ["colour", "colour2"],
      },
      {
        chunkId: "nco-1",
        andTags: ["edible"],

        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red girls",
    sentenceFormulaId: "POL-00-56",
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["plural"],
        gender: [],
      },
    ],
    primaryOrders: [["adj-1", "npe-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I have apple",
    sentenceFormulaId: "POL-00-57",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "mam" },
      {
        chunkId: "nco-1",
        andTags: ["edible"],
        gcase: ["acc"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["fix-1", "nco-1"]],
  },
  {
    sentenceFormulaSymbol: "I am reading",
    sentenceFormulaId: "POL-00-58",
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        tenseDescription: ["present im"],
        person: ["1per", "2per", "3per"],
      },
    ],
    primaryOrders: [["ver-1"]],
  },
  {
    sentenceFormulaSymbol: "girl is reading",
    sentenceFormulaId: "POL-00-59",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

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
    primaryOrders: [["npe-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "girls were reading",
    sentenceFormulaId: "POL-00-60",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["plural"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "* girl has red apple",
    sentenceFormulaId: "POL-00-61-z",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "nie," },
      { chunkId: "fix-2", chunkValue: "chyba" },
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: [],
        specificIds: ["pol-ver-012-mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-2",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-2",
        andTags: ["edible"],
        gcase: ["acc"],
        number: ["singular"],
      },
      {
        chunkId: "ver-2",
        form: ["infinitive"],
        andTags: [],
      },
    ],
    primaryOrders: [
      ["fix-1", "fix-2", "npe-1", "ver-1", "adj-1", "nco-2", "ver-2"],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl has red apple",
    sentenceFormulaId: "POL-00-61",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: [],
        specificIds: ["pol-ver-012-mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-2",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-2",
        andTags: ["edible"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "adj-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl didn't have red apple",
    sentenceFormulaId: "POL-00-61-neg1",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      { chunkId: "fix-1", chunkValue: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: [],

        specificIds: ["pol-ver-012-mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-2",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-2",
        andTags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["npe-1", "fix-1", "ver-1", "adj-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red girl didn't have red apple",
    sentenceFormulaId: "POL-00-62-neg1",
    sentenceStructure: [
      {
        chunkId: "adj-0",
        agreeWith: "npe-1",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      { chunkId: "fix-1", chunkValue: "nie" },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["past im"],
        person: ["3per"],
        andTags: [],

        specificIds: ["pol-ver-012-mieć"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-2",
        form: ["simple"],
        andTags: ["colour"],
      },
      {
        chunkId: "nco-2",
        andTags: ["edible"],

        gcase: ["gen"],
      },
    ],
    primaryOrders: [["adj-0", "npe-1", "fix-1", "ver-1", "adj-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads present im",
    sentenceFormulaId: "POL-00-63a",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads past pf",
    sentenceFormulaId: "POL-00-63b",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["past pf"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads future im",
    sentenceFormulaId: "POL-00-63c",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["future im"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "girl reads f conditional im pf",
    sentenceFormulaId: "POL-00-63d",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: [],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        andTags: ["basic2"],
        person: ["3per"],
        tenseDescription: ["conditional im", "conditional pf"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "101a girl is reading",
    sentenceFormulaId: "POL-00-101a",
    equivalents: { ENG: ["ENG-00-101a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

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
    primaryOrders: [["npe-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "101b girl *reads quickly",
    sentenceFormulaId: "POL-00-101b",
    equivalents: { ENG: ["ENG-00-101b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],

        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["present im"],
        person: ["3per"],
        andTags: ["basic2"],
      },
      { chunkId: "fix-1", chunkValue: "szybko" },
    ],
    primaryOrders: [["npe-1", "fix-1", "ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "102a I'll read (pf fut)",
    sentenceFormulaId: "POL-00-102a",
    equivalents: { ENG: ["ENG-00-102a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103a",
    sentenceFormulaId: "POL-00-103a",
    equivalents: { ENG: ["ENG-00-103a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["future pf", "future im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103b",
    sentenceFormulaId: "POL-00-103b",
    equivalents: { ENG: ["ENG-00-103b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 103c",
    sentenceFormulaId: "POL-00-103c",
    equivalents: { ENG: ["ENG-00-103c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["future pf"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104a",
    sentenceFormulaId: "POL-00-104a",
    equivalents: { ENG: ["ENG-00-104a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I read *future 104b",
    sentenceFormulaId: "POL-00-104b",
    equivalents: { ENG: ["ENG-00-104b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["future pf", "past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "I was writing 105a",
    sentenceFormulaId: "POL-00-105a",
    equivalents: { ENG: ["ENG-00-105a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past im"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "first conditional 106a",
    sentenceFormulaId: "POL-00-106a",
    equivalents: { ENG: ["ENG-00-106a"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "jeśli" },
      {
        chunkId: "ver-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["cond1 condition"],
        formulaImportantTraitKeys: ["tenseDescription"],
        person: ["2per"],
        number: ["singular"],
      },
      {
        chunkId: "nco-1",
        specificIds: ["pol-nco-016-książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
      { chunkId: "fix-2", chunkValue: "," },
      { chunkId: "fix-3", chunkValue: "ją" },
      {
        chunkId: "ver-2",
        specificIds: ["pol-ver-014-badać"],
        tenseDescription: ["cond1 outcome"],
        formulaImportantTraitKeys: ["tenseDescription"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1", "nco-1", "fix-2", "fix-3", "ver-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "red door",
    sentenceFormulaId: "POL-00-107",
    equivalents: { ENG: ["ENG-00-107"] },
    sentenceStructure: [
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        andTags: ["colour"],
      },
      {
        chunkId: "nco-1",
        specificIds: ["pol-nco-017-drzwi"],

        number: [],
      },
    ],
    primaryOrders: [["adj-1", "nco-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "108 singular I am",
    sentenceFormulaId: "POL-00-108",
    equivalents: { ENG: ["ENG-00-108"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
    additionalOrders: [["ver-1"]], //See how here we're showing the pronombre is optional.
  },
  {
    sentenceFormulaSymbol: "109 doc wrote p",
    sentenceFormulaId: "POL-00-109",
    equivalents: { ENG: ["ENG-00-109"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["past pf"],
      },
      { chunkId: "fix-1", chunkValue: "receptę" },
    ],
    primaryOrders: [["npe-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109a doc was writing p",
    sentenceFormulaId: "POL-00-109a",
    equivalents: { ENG: ["ENG-00-109a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["past im"],
      },
      {
        chunkId: "fix-1",
        chunkValue: "receptę",
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },

  {
    sentenceFormulaSymbol: "109b docs wrote p",
    sentenceFormulaId: "POL-00-109b",
    equivalents: { ENG: ["ENG-00-109b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["past pf"],
      },
      { chunkId: "fix-1", chunkValue: "receptę" },
    ],
    primaryOrders: [["npe-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "109c docs were writing p",
    sentenceFormulaId: "POL-00-109c",
    equivalents: { ENG: ["ENG-00-109c"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-015-pisać"],
        tenseDescription: ["past im"],
      },
      { chunkId: "fix-1", chunkValue: "receptę" },
    ],
    primaryOrders: [["npe-1", "ver-1", "fix-1"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "110 the woman read me a book",
    sentenceFormulaId: "POL-00-110",
    equivalents: { ENG: ["ENG-00-110"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["pol-npe-011-kobieta"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-013-czytać"],
        tenseDescription: ["past im"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nco-2",
        specificIds: ["pol-nco-016-książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "pro-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "111a I am",
    sentenceFormulaId: "POL-00-111a",
    equivalents: { ENG: ["ENG-00-111a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "111b I was",
    sentenceFormulaId: "POL-00-111b",
    equivalents: { ENG: ["ENG-00-111b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "111c you were",
    sentenceFormulaId: "POL-00-111c",
    equivalents: { ENG: ["ENG-00-111c"] },
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
        tenseDescription: ["past im"],
      },
    ],
    primaryOrders: [["ver-1"]],
    additionalOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "112 familymember gave me things",
    sentenceFormulaId: "POL-00-112",
    equivalents: { ENG: ["ENG-00-112"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-016-dać"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nco-2",
        specificIds: [
          "pol-nco-014-jabłko",
          "pol-nco-012-cebula",
          "pol-nco-015-lustro",
          "pol-nco-016-książka",
        ],
        gcase: ["acc"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "pro-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "112a familymember gave me thing",
    sentenceFormulaId: "POL-00-112a",
    equivalents: { ENG: ["ENG-00-112a"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-016-dać"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nco-2",
        specificIds: [
          "pol-nco-014-jabłko",
          "pol-nco-012-cebula",
          "pol-nco-015-lustro",
          "pol-nco-016-książka",
        ],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["npe-1", "ver-1", "pro-1", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "113 my father gave me a book",
    sentenceFormulaId: "POL-00-113",
    equivalents: { ENG: ["ENG-00-113"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-invisible",
        agreeWith2: "npe-1",
      },
      {
        chunkId: "npe-1",
        andTags: ["family"],

        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["pol-ver-016-dać"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-3",
        agreeWith: "pro-1-invisible",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["pol-pro-PERSONAL"],
      },
      {
        chunkId: "nco-2",
        specificIds: ["pol-nco-016-książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["pro-2", "npe-1", "ver-1", "pro-3", "nco-2"]],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "113a my father gave me his book",
    sentenceFormulaId: "POL-00-113a",
    equivalents: { ENG: ["ENG-00-113a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-invisible-We",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2-Our",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-invisible-We",
        agreeWith2: "npe-1-Father",
      },
      {
        chunkId: "npe-1-Father",
        andTags: ["family"],
      },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Father",
        specificIds: ["pol-ver-016-dać"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-3-Us",
        agreeWith: "pro-1-invisible-We",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["pol-pro-PERSONAL"],
      },
      {
        chunkId: "pro-4-His",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "npe-1-Father",
        agreeWith2: "nco-2-Book",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["pol-nco-016-książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [
      [
        "pro-2-Our",
        "npe-1-Father",
        "ver-1-Gave",
        "pro-3-Us",
        "pro-4-His",
        "nco-2-Book",
      ],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "114 doctor gave me her book",
    sentenceFormulaId: "POL-00-114",
    equivalents: { ENG: ["ENG-00-114"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-invisible-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "npe-1-Doctor",

        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
      },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Doctor",
        specificIds: ["pol-ver-016-dać"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-2-Me",
        agreeWith: "pro-1-invisible-I",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["pol-pro-PERSONAL"],
      },
      {
        chunkId: "pro-3-Her",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "npe-1-Doctor",
        agreeWith2: "nco-2-Book",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["pol-nco-016-książka"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    primaryOrders: [
      ["npe-1-Doctor", "ver-1-Gave", "pro-2-Me", "pro-3-Her", "nco-2-Book"],
    ],
    additionalOrders: [],
  },
  {
    sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
    sentenceFormulaId: "POL-115",
    equivalents: { ENG: ["ENG-115"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-see",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-018-widzieć"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        gcase: ["acc"],
      },
      { chunkId: "fix-1-and", chunkValue: "i" },
      {
        chunkId: "pro-3-his",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "npe-1-doctor",
        agreeWith2: "npe-2-doctor",
      },
      {
        chunkId: "npe-2-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        gcase: ["acc"],
      },
    ],
    primaryOrders: [
      [
        "ver-1-see",
        "pro-2-my",
        "npe-1-doctor",
        "fix-1-and",
        "pro-3-his",
        "npe-2-doctor",
      ],
    ],
  },
  {
    sentenceFormulaSymbol: "116 My doctor was a woman",
    sentenceFormulaId: "POL-116",
    equivalents: { ENG: ["ENG-116"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,

        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"], //Just for symmetry and so I know it doesn't break anything.
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-1-doctor",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-2-woman",
        gcase: ["ins"],
        number: ["singular"],
        specificIds: ["pol-npe-011-kobieta"],
      },
    ],
    primaryOrders: [["pro-2-my", "npe-1-doctor", "ver-1-was", "npe-2-woman"]],
  },
  {
    sentenceFormulaSymbol: "116y My doctor",
    sentenceFormulaId: "POL-116y",
    equivalents: { ENG: ["ENG-116y"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,

        gender: ["f"],
      },
    ],
    primaryOrders: [["pro-2-my", "npe-1-doctor"]],
  },
  {
    sentenceFormulaSymbol: "116x My doctor was a woman",
    sentenceFormulaId: "POL-116x",
    equivalents: { ENG: ["ENG-116x"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,

        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"], //Just for symmetry and so I know it doesn't break anything.
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-1-doctor",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-2-woman",

        gcase: ["ins"],
        number: ["singular"],
        specificIds: ["pol-npe-011-kobieta"],
      },
    ],
    primaryOrders: [["pro-2-my", "npe-1-doctor", "ver-1-was", "npe-2-woman"]],
  },
  {
    sentenceFormulaSymbol: "116a My doctor's doctor was a woman",
    sentenceFormulaId: "POL-116a",
    equivalents: { ENG: ["ENG-116a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-doctor's",
      },
      {
        chunkId: "npe-1-doctor's",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        gcase: ["gen"],
      },
      {
        chunkId: "npe-2-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"], //Just for symmetry and so I know it doesn't break anything.
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-2-doctor",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-3-woman",

        gcase: ["ins"],
        number: ["singular"],
        specificIds: ["pol-npe-011-kobieta"],
      },
    ],
    primaryOrders: [
      [
        "npe-2-doctor",
        "pro-2-my",
        "npe-1-doctor's",
        "ver-1-was",
        "npe-3-woman",
      ],
    ],
  },
  {
    sentenceFormulaSymbol: "117 I was a doctor",
    sentenceFormulaId: "POL-117",
    equivalents: { ENG: ["ENG-117"], POL: ["POL-117"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-1-doctor",
        gcase: ["ins"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        agreeWith: "pro-1-I",
      },
    ],
    primaryOrders: [["ver-1-was", "npe-1-doctor"]],
  },
  {
    sentenceFormulaSymbol: "117a I* was a doctor",
    sentenceFormulaId: "POL-117a",
    equivalents: { ENG: ["ENG-117a"], POL: ["POL-117a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-1-doctor",

        gcase: ["ins"],
        formulaImportantTraitKeys: ["gcase"],
        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        agreeWith: "pro-1-I",
      },
    ],
    primaryOrders: [["ver-1-was", "npe-1-doctor"]],
  },
  {
    sentenceFormulaSymbol: "117aa I** was a doctor",
    sentenceFormulaId: "POL-117aa",
    equivalents: { ENG: ["ENG-117aa"], POL: ["POL-117aa"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "npe-1-doctor",

        gcase: ["ins"],
        formulaImportantTraitKeys: ["gcase"],
        // number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
        agreeWith: "pro-1-I",
      },
    ],
    primaryOrders: [["ver-1-was", "npe-1-doctor"]],
  },
  {
    sentenceFormulaSymbol: "117b I was here",
    sentenceFormulaId: "POL-117b",
    equivalents: { ENG: ["ENG-117b"], POL: ["POL-117b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["past pf"],
      },
      { chunkId: "fix-1-here", chunkValue: "tutaj" },
    ],
    primaryOrders: [["ver-1-was", "fix-1-here"]],
  },
  {
    sentenceFormulaSymbol: "117c I am here",
    sentenceFormulaId: "POL-117c",
    equivalents: { ENG: ["ENG-117c"], POL: ["POL-117c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-am",
        agreeWith: "pro-1-I",
        specificIds: ["pol-ver-011-być"],
        tenseDescription: ["present im"],
      },
      { chunkId: "fix-1-here", chunkValue: "tutaj" },
    ],
    primaryOrders: [["ver-1-am", "fix-1-here"]],
  },
  {
    sentenceFormulaSymbol: "118 My doctor and his book",
    sentenceFormulaId: "POL-118",
    equivalents: { ENG: ["ENG-118"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-0-I-invisible",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,

        educatorBlocksAnnotationsForTheseTraitKeys: ["gender", "number"],
      },
      { chunkId: "fix-1-and", chunkValue: "i" },
      {
        chunkId: "pro-2-his",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "npe-1-doctor",
        agreeWith2: "nco-2-book",
      },
      {
        chunkId: "nco-2-book",

        number: ["singular"],
        specificIds: ["pol-nco-016-książka"],
      },
    ],
    primaryOrders: [
      ["pro-1-my", "npe-1-doctor", "fix-1-and", "pro-2-his", "nco-2-book"],
    ],
  },
  {
    sentenceFormulaSymbol: "118a My doctor and my book",
    sentenceFormulaId: "POL-118a",
    equivalents: { ENG: ["ENG-118a"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-0-I-invisible",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,
      },
      { chunkId: "fix-1-and", chunkValue: "i" },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-0-I-invisible",
        agreeWith2: "nco-2-book",
      },
      {
        chunkId: "nco-2-book",

        number: ["singular"],
        specificIds: ["pol-nco-016-książka"],
      },
    ],
    primaryOrders: [
      ["pro-1-my", "npe-1-doctor", "fix-1-and", "pro-2-my", "nco-2-book"],
    ],
  },
  {
    sentenceFormulaSymbol: "118b My doctor",
    sentenceFormulaId: "POL-118b",
    equivalents: { ENG: ["ENG-118b"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-0-I-invisible",
        agreeWith2: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",

        number: ["singular"],
        specificIds: ["pol-npe-015-lekarz"],
        doNotUpdateSpecificIdsAsIsJustOneMGN: true,

        // gender: ["f"],
      },
    ],
    primaryOrders: [["pro-1-my", "npe-1-doctor"]],
  },
  {
    sentenceFormulaSymbol: "118c My onion",
    sentenceFormulaId: "POL-118c",
    equivalents: { ENG: ["ENG-118c"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["pol-pro-POSSESSIVE"],
        agreeWith: "pro-0-I-invisible",
        agreeWith2: "nco-1-onion",
      },
      {
        chunkId: "nco-1-onion",
        //
        //
        number: ["singular"],
        specificIds: ["pol-nco-012-cebula"],
        //
        // gender: ["f"],
      },
    ],
    primaryOrders: [["pro-1-my", "nco-1-onion"]],
  },
  {
    sentenceFormulaSymbol: "119 Woman saw me",
    sentenceFormulaId: "POL-119",
    equivalents: { ENG: ["ENG-119"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "npe-1-woman",
        specificIds: ["pol-npe-011-kobieta"],
      },
      {
        chunkId: "ver-1-see",
        specificIds: ["pol-ver-018-widzieć"],
        agreeWith: "npe-1-woman",
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1-me",
        specificIds: ["pol-pro-PERSONAL"],
        agreeWith: "pro-0-I-invisible",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [["npe-1-woman", "pro-1-me", "ver-1-see"]],
  },
  {
    sentenceFormulaSymbol: "120 Doctor saw me",
    sentenceFormulaId: "POL-120",
    equivalents: { ENG: ["ENG-120"] },
    sentenceStructure: [
      {
        chunkId: "pro-0-I-invisible",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-see",
        specificIds: ["pol-ver-018-widzieć"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["past pf"],
      },
      {
        chunkId: "pro-1-me",
        specificIds: ["pol-pro-PERSONAL"],
        agreeWith: "pro-0-I-invisible",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "pro-1-me", "ver-1-see"]],
  },
  {
    sentenceFormulaSymbol: "121 I read* a book",
    sentenceFormulaId: "POL-121",
    equivalents: { ENG: ["ENG-121"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-read",
        specificIds: ["pol-ver-013-czytać"],
        agreeWith: "pro-1-I",
        tenseDescription: [
          "past pf",
          "past im",
          "present im",
          "future im",
          "future pf",
        ],
      },
      {
        chunkId: "nco-1-book",
        specificIds: ["pol-nco-016-książka"],
        number: ["singular"],
        gcase: ["acc"],
      },
    ],
    primaryOrders: [["ver-1-read", "nco-1-book"]],
    // additionalOrders: [["pro-1-I", "ver-1-read", "nco-1-book"]],
  },
  {
    sentenceFormulaSymbol: "122 The doctor writes",
    sentenceFormulaId: "POL-122",
    equivalents: { ENG: ["ENG-122"] },
    sentenceStructure: [
      {
        chunkId: "npe-1-doctor",
        specificIds: ["pol-npe-015-lekarz"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["pol-ver-015-pisać"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present im", "past pf"],
      },
    ],
    primaryOrders: [["npe-1-doctor", "ver-1-write"]],
  },
  {
    sentenceFormulaSymbol: "123 I am red",
    sentenceFormulaId: "POL-123",
    equivalents: { ENG: ["ENG-123"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "pro-1-I",
        tenseDescription: ["present im"],
      },
      {
        chunkId: "adj-1-red",
        specificIds: ["pol-adj-011-czerwony"],
        agreeWith: "pro-1-I",
      },
    ],
    primaryOrders: [["ver-1-am", "adj-1-red"]],
    additionalOrders: [["pro-1-I", "ver-1-am", "adj-1-red"]],
  },
  {
    sentenceFormulaSymbol: "124a I was a good doctor",
    sentenceFormulaId: "POL-124a",
    equivalents: { ENG: ["ENG-124a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["pol-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["nom"],
        formulaImportantTraitKeys: ["person", "gcase"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["pol-ver-011-być"],
        agreeWith: "pro-1-I",
        tenseDescription: ["past im"],
      },
      {
        chunkId: "adj-1-good",
        specificIds: ["pol-adj-011-czerwony"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "npe-1-person",
        specificIds: ["pol-npe-015-lekarz"],
        gcase: ["ins"],
      },
    ],
    primaryOrders: [["ver-1-am", "adj-1-good", "npe-1-person"]],
  },
];
