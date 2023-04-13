exports.sentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "girl eats apple",
    sentenceFormulaId: "ENG-default",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest3"],
        number: ["singular"],
      },
      { chunkId: "fix-1", chunkValue: "eats" },
      {
        chunkId: "nco-2",
        andTags: ["edible"],
        gcase: ["acc"],
      },
    ],
    orders: { primary: [["npe-1", "fix-1", "nco-2"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "101a girl is reading",
    sentenceFormulaId: "ENG-101a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
        specificIds: ["^eng-npe-001-woman"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
    orders: { primary: [["fix-1", "npe-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "101b girl *reads quickly XYZ", // Doesn't matter that this sentenceFormulaSymbol is different from its POL counterpart.
    sentenceFormulaId: "ENG-101b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
        specificIds: ["^eng-npe-001-woman"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        person: ["3per"],
        tenseDescription: ["present"],
        andTags: ["basic2"],
      },
      { chunkId: "fix-2", chunkValue: "quickly" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "fix-2"]],
      additional: [["fix-2", "fix-1", "npe-1", "ver-1"]],
    },
  },
  {
    sentenceFormulaSymbol: "101c girl is reading",
    sentenceFormulaId: "ENG-101c",
    sentenceStructure: [
      { chunkId: "fix-1-the", chunkValue: "the" },
      {
        chunkId: "npe-1-woman",
        andTags: ["personTest1"],
        specificIds: ["^eng-npe-001-woman"],
        number: ["singular", "plural"],
      },
      {
        chunkId: "ver-1-reads",
        agreeWith: "npe-1-woman",
        person: ["3per"],
        andTags: ["basic2"],
      },
    ],
    orders: {
      primary: [["fix-1-the", "npe-1-woman", "ver-1-reads"]],
      additional: [],
    },
  },
  {
    sentenceFormulaSymbol: "102a I'll read (pf fut)",
    sentenceFormulaId: "ENG-102a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I read *future 103a",
    sentenceFormulaId: "ENG-103a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I read *future 103b",
    sentenceFormulaId: "ENG-103b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["future"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I read *future 103c",
    sentenceFormulaId: "ENG-103c",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I read *future 104a",
    sentenceFormulaId: "ENG-104a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I read *future 104b",
    sentenceFormulaId: "ENG-104b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "I was writing 105a",
    sentenceFormulaId: "ENG-105a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past continuous"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "first conditional 106a",
    sentenceFormulaId: "ENG-106a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "if" },
      { chunkId: "fix-2", chunkValue: "you" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["cond1 condition"],
        formulaImportantTraitKeys: ["tenseDescription"],
        person: ["2per"],
        number: ["singular"],
      },
      { chunkId: "fix-3", chunkValue: "a" },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-006-book"],
        number: ["singular"],
      },
      { chunkId: "fix-4", chunkValue: "," },
      { chunkId: "fix-5", chunkValue: "I" },
      {
        chunkId: "ver-2",
        specificIds: ["eng-ver-004-research"],
        tenseDescription: ["cond1 outcome"],
        formulaImportantTraitKeys: ["tenseDescription"],
        person: ["1per"],
        number: ["singular"],
      },
      { chunkId: "fix-6", chunkValue: "it" },
    ],
    orders: {
      primary: [
        [
          "fix-1",
          "fix-2",
          "ver-1",
          "fix-3",
          "nco-1",
          "fix-4",
          "fix-5",
          "ver-2",
          "fix-6",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "red door",
    sentenceFormulaId: "ENG-107",
    sentenceStructure: [
      { chunkId: "adj-1", agreeWith: "nco-1", andTags: ["colour"] },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-007-door"],
      },
    ],
    orders: { primary: [["adj-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "red door singular",
    sentenceFormulaId: "ENG-107a",
    sentenceStructure: [
      { chunkId: "adj-1", agreeWith: "nco-1", andTags: ["colour"] },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-007-door"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["adj-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "108 singular I am",
    sentenceFormulaId: "ENG-108",
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "109 doc wrote p",
    sentenceFormulaId: "ENG-109",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      { chunkId: "npe-1", number: ["singular"], andTags: ["job"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-2", chunkValue: "a" },
      { chunkId: "fix-3", chunkValue: "prescription" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "fix-2", "fix-3"]],
    },
  },
  {
    sentenceFormulaSymbol: "109a doc was writing p",
    sentenceFormulaId: "ENG-109a",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      { chunkId: "npe-1", number: ["singular"], andTags: ["job"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["past continuous"],
      },
      { chunkId: "fix-2", chunkValue: "a" },
      { chunkId: "fix-3", chunkValue: "prescription" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "fix-2", "fix-3"]],
    },
  },
  {
    sentenceFormulaSymbol: "109b docs wrote p",
    sentenceFormulaId: "ENG-109b",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      { chunkId: "npe-1", number: ["plural"], andTags: ["job"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-2", chunkValue: "a" },
      { chunkId: "fix-3", chunkValue: "prescription" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "fix-2", "fix-3"]],
    },
  },
  {
    sentenceFormulaSymbol: "109c docs were writing p",
    sentenceFormulaId: "ENG-109c",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      { chunkId: "npe-1", number: ["plural"], andTags: ["job"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["past continuous"],
      },
      { chunkId: "fix-2", chunkValue: "a" },
      { chunkId: "fix-3", chunkValue: "prescription" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "fix-2", "fix-3"]],
    },
  },
  {
    sentenceFormulaSymbol: "110 the woman read me a book",
    sentenceFormulaId: "ENG-110",
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      { chunkId: "npe-1", specificIds: ["^eng-npe-001-woman"] },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-003-read"],
        tenseDescription: ["past continuous"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      { chunkId: "fix-2", chunkValue: "a" },
      {
        chunkId: "nco-2",
        specificIds: ["eng-nco-006-book"],
        number: ["singular"],
      },
      { chunkId: "fix-3", chunkValue: "to" },
    ],
    orders: {
      primary: [["fix-1", "npe-1", "ver-1", "pro-1", "fix-2", "nco-2"]],
      additional: [
        ["fix-1", "npe-1", "ver-1", "fix-2", "nco-2", "fix-3", "pro-1"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "111a I am",
    sentenceFormulaId: "ENG-111a",
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "111b I was",
    sentenceFormulaId: "ENG-111b",
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "111c you were",
    sentenceFormulaId: "ENG-111c",
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "112 familymember gave me things",
    sentenceFormulaId: "ENG-112",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      {
        chunkId: "nco-2",
        specificIds: [
          "eng-nco-006-book",
          "eng-nco-005-mirror",
          "eng-nco-004-apple",
          "eng-nco-002-onion",
        ],
        number: ["plural"],
      },
      { chunkId: "fix-3", chunkValue: "to" },
    ],
    orders: {
      primary: [["npe-1", "ver-1", "pro-1", "nco-2"]],
      additional: [["npe-1", "ver-1", "nco-2", "fix-3", "pro-1"]],
    },
  },
  {
    sentenceFormulaSymbol: "112a familymember gave me thing",
    sentenceFormulaId: "ENG-112a",
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        gcase: ["dat"],
      },
      { chunkId: "fix-1", chunkValue: "one" },
      {
        chunkId: "nco-2",
        specificIds: [
          "eng-nco-006-book",
          "eng-nco-005-mirror",
          "eng-nco-004-apple",
          "eng-nco-002-onion",
        ],
        number: ["singular"],
      },
      { chunkId: "fix-3", chunkValue: "to" },
    ],
    orders: {
      primary: [["npe-1", "ver-1", "pro-1", "fix-1", "nco-2"]],
      // additional:  [["npe-1", "ver-1", "nco-2", "fix-3", "pro-1"]],
    },
  },
  {
    sentenceFormulaSymbol: "113 my father gave me a book",
    sentenceFormulaId: "ENG-113",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
        agreeWith2: "npe-1-father",
      },
      {
        chunkId: "npe-1-father",
        andTags: ["family"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-gave",
        agreeWith: "npe-1-father",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3-me",
        agreeWith: "pro-1-I",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["eng-pro-PERSONAL"],
      },
      { chunkId: "fix-1", chunkValue: "a" },
      {
        chunkId: "nco-2-book",
        specificIds: ["eng-nco-006-book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-2-my",
          "npe-1-father",
          "ver-1-gave",
          "pro-3-me",
          "fix-1",
          "nco-2-book",
        ],
      ],
      additional: [],
    },
  },
  {
    sentenceFormulaSymbol: "113a my father gave me his book",
    sentenceFormulaId: "ENG-113a",
    sentenceStructure: [
      {
        chunkId: "pro-1-We",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2-Our",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-We",
      },
      { chunkId: "npe-1-Father", andTags: ["family"] },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Father",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3-Us",
        agreeWith: "pro-1-We",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["eng-pro-PERSONAL"],
      },
      {
        chunkId: "pro-4-His",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-Father",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["eng-nco-006-book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-2-Our",
          "npe-1-Father",
          "ver-1-Gave",
          "pro-3-Us",
          "pro-4-His",
          "nco-2-Book",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "113b my child gave me his book",
    sentenceFormulaId: "ENG-113b",
    sentenceStructure: [
      {
        chunkId: "pro-1-We",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "pro-2-Our",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-We",
      },
      {
        chunkId: "npe-1-Father",
        specificIds: ["eng-npe-002-boy/girl/child"],
      },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Father",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3-Us",
        agreeWith: "pro-1-We",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["eng-pro-PERSONAL"],
      },
      {
        chunkId: "pro-4-His",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-Father",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["eng-nco-006-book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-2-Our",
          "npe-1-Father",
          "ver-1-Gave",
          "pro-3-Us",
          "pro-4-His",
          "nco-2-Book",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "113c my child gave me his book",
    sentenceFormulaId: "ENG-113c",
    sentenceStructure: [
      {
        chunkId: "pro-1-We",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-Our",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-We",
      },
      { chunkId: "npe-1-Father", specificIds: ["eng-npe-009-baby"] },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Father",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-3-Us",
        agreeWith: "pro-1-We",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["eng-pro-PERSONAL"],
      },
      {
        chunkId: "pro-4-His",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-Father",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["eng-nco-006-book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-2-Our",
          "npe-1-Father",
          "ver-1-Gave",
          "pro-3-Us",
          "pro-4-His",
          "nco-2-Book",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "114 doctor gave me her book",
    sentenceFormulaId: "ENG-114",
    sentenceStructure: [
      { chunkId: "fix-1a", chunkValue: "the" },
      { chunkId: "fix-1b", chunkValue: "a" },
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "npe-1-Doctor",
        specificIds: ["eng-npe-005-doctor"],
      },
      {
        chunkId: "ver-1-Gave",
        agreeWith: "npe-1-Doctor",
        specificIds: ["eng-ver-006-give"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-2-Me",
        agreeWith: "pro-1-I",
        gcase: ["dat"],
        formulaImportantTraitKeys: ["gcase"],
        specificIds: ["eng-pro-PERSONAL"],
      },
      {
        chunkId: "pro-3-Her",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-Doctor",
      },
      {
        chunkId: "nco-2-Book",
        specificIds: ["eng-nco-006-book"],
        gcase: ["acc"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [
        [
          "fix-1a",
          "npe-1-Doctor",
          "ver-1-Gave",
          "pro-2-Me",
          "pro-3-Her",
          "nco-2-Book",
        ],
      ],
      additional: [
        [
          "fix-1b",
          "npe-1-Doctor",
          "ver-1-Gave",
          "pro-2-Me",
          "pro-3-Her",
          "nco-2-Book",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
    sentenceFormulaId: "ENG-115",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-see",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
      },
      { chunkId: "fix-1-and", chunkValue: "and" },
      {
        chunkId: "pro-3-his",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-2-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-1-I",
          "ver-1-see",
          "pro-2-my",
          "npe-1-doctor",
          "fix-1-and",
          "pro-3-his",
          "npe-2-doctor",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "116b My doctor was a woman specifically",
    sentenceFormulaId: "ENG-116b",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
        // ▲ Because here the educator knows that context makes this MGN's gender unambiguous.
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-1-doctor",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-1-a", chunkValue: "a" },
      {
        chunkId: "npe-2-woman",
        agreeWith: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["^eng-npe-001-woman"],
      },
    ],
    orders: {
      primary: [
        ["pro-2-my", "npe-1-doctor", "ver-1-was", "fix-1-a", "npe-2-woman"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "116c My doctor was a woman/man/person",
    sentenceFormulaId: "ENG-116c",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-1-doctor",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "npe-2-woman",
      },
      {
        chunkId: "npe-2-woman",
        agreeWith: "npe-1-doctor",
        specificIds: ["eng-npe-001-woman"],
      },
    ],
    orders: {
      primary: [
        ["pro-2-my", "npe-1-doctor", "ver-1-was", "art-1-a", "npe-2-woman"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "116y My doctor",
    sentenceFormulaId: "ENG-116y",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        gender: ["f"],
      },
    ],
    orders: { primary: [["pro-2-my", "npe-1-doctor"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "116x My doctor was a woman",
    sentenceFormulaId: "ENG-116x",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
        // ▲ Because here the educator knows that context makes this MGN's gender unambiguous.
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-1-doctor",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-1-a", chunkValue: "a" },
      {
        chunkId: "npe-2-woman",
        agreeWith: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["^eng-npe-001-woman"],
      },
    ],
    orders: {
      primary: [
        ["pro-2-my", "npe-1-doctor", "ver-1-was", "fix-1-a", "npe-2-woman"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "116a My doctor's doctor was a woman specifically",
    sentenceFormulaId: "ENG-116a",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor's",
        gcase: ["gen"],
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
      },
      {
        chunkId: "npe-2-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        gender: ["f"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "npe-2-doctor",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-1-a", chunkValue: "a" },
      {
        chunkId: "npe-3-woman",
        agreeWith: "npe-2-doctor",
        specificIds: ["^eng-npe-001-woman"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-2-my",
          "npe-1-doctor's",
          "npe-2-doctor",
          "ver-1-was",
          "fix-1-a",
          "npe-3-woman",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "117 I was a doctor",
    sentenceFormulaId: "ENG-117",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        agreeWith: "pro-1-I",
      },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-was", "art-1-a", "npe-1-doctor"]],
    },
  },
  {
    sentenceFormulaSymbol: "117a I* was a doctor",
    sentenceFormulaId: "ENG-117a",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        agreeWith: "pro-1-I",
      },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-was", "art-1-a", "npe-1-doctor"]],
    },
  },
  {
    sentenceFormulaSymbol: "117aa I** was a doctor",
    sentenceFormulaId: "ENG-117aa",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "pro-1-I",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        agreeWith: "pro-1-I",
      },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-was", "art-1-a", "npe-1-doctor"]],
    },
  },
  {
    sentenceFormulaSymbol: "117b I was here",
    sentenceFormulaId: "ENG-117b",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      { chunkId: "fix-1-here", chunkValue: "here" },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-was", "fix-1-here"]],
    },
  },
  {
    sentenceFormulaSymbol: "117c I am here",
    sentenceFormulaId: "ENG-117c",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-am",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
      },
      { chunkId: "fix-1-here", chunkValue: "here" },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-am", "fix-1-here"]],
    },
  },
  {
    sentenceFormulaSymbol: "118 My doctor and his book",
    sentenceFormulaId: "ENG-118",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-0-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
        educatorBlocksAnnotationsForTheseTraitKeys: ["gender", "number"],
      },
      { chunkId: "fix-1-and", chunkValue: "and" },
      {
        chunkId: "pro-2-his",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "nco-2-book",
        number: ["singular"],
        specificIds: ["eng-nco-006-book"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-my", "npe-1-doctor", "fix-1-and", "pro-2-his", "nco-2-book"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "118a My doctor and my book",
    sentenceFormulaId: "ENG-118a",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-0-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
      },
      { chunkId: "fix-1-and", chunkValue: "and" },
      {
        chunkId: "pro-2-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-0-I",
      },
      {
        chunkId: "nco-2-book",
        number: ["singular"],
        specificIds: ["eng-nco-006-book"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-my", "npe-1-doctor", "fix-1-and", "pro-2-my", "nco-2-book"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "118b My doctor",
    sentenceFormulaId: "ENG-118b",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-0-I",
      },
      {
        chunkId: "npe-1-doctor",
        number: ["singular"],
        specificIds: ["eng-npe-005-doctor"],
      },
    ],
    orders: { primary: [["pro-1-my", "npe-1-doctor"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "118c My onion",
    sentenceFormulaId: "ENG-118c",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-1-my",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-0-I",
      },
      {
        chunkId: "nco-1-onion",
        number: ["singular"],
        specificIds: ["eng-nco-002-onion"],
      },
    ],
    orders: { primary: [["pro-1-my", "nco-1-onion"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "119 Woman saw me",
    sentenceFormulaId: "ENG-119",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      { chunkId: "art-1", agreeWith: "npe-1-woman" },
      { chunkId: "npe-1-woman", specificIds: ["^eng-npe-001-woman"] },
      {
        chunkId: "ver-1-see",
        specificIds: ["eng-ver-008-see"],
        agreeWith: "npe-1-woman",
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1-me",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "pro-0-I",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    orders: {
      primary: [["art-1", "npe-1-woman", "ver-1-see", "pro-1-me"]],
    },
  },
  {
    sentenceFormulaSymbol: "120 Doctor saw me",
    sentenceFormulaId: "ENG-120",
    sentenceStructure: [
      {
        chunkId: "pro-0-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      { chunkId: "art-1", agreeWith: "npe-1-doctor" },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-see",
        specificIds: ["eng-ver-008-see"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1-me",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "pro-0-I",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    orders: {
      primary: [["art-1", "npe-1-doctor", "ver-1-see", "pro-1-me"]],
    },
  },
  {
    sentenceFormulaSymbol: "121 I read* a book",
    sentenceFormulaId: "ENG-121",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-read",
        specificIds: ["eng-ver-003-read"],
        agreeWith: "pro-1-I",
        tenseDescription: [
          "past simple",
          "past continuous",
          "present simple",
          "present continuous",
          "future simple",
          "future continuous",
        ],
      },
      {
        chunkId: "art-1",
        form: ["indefinite"],
        agreeWith: "nco-1-book",
      },
      {
        chunkId: "nco-1-book",
        specificIds: ["eng-nco-006-book"],
        number: ["singular"],
        gcase: ["acc"],
      },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-read", "art-1", "nco-1-book"]],
    },
  },
  {
    sentenceFormulaSymbol: "122 The doctor writes",
    sentenceFormulaId: "ENG-122",
    sentenceStructure: [
      {
        chunkId: "art-1",
        form: ["definite"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
      },
      {
        chunkId: "ver-1-write",
        specificIds: ["eng-ver-005-write"],
        agreeWith: "npe-1-doctor",
        tenseDescription: ["present simple", "past simple"],
      },
    ],
    orders: {
      primary: [["art-1", "npe-1-doctor", "ver-1-write"]],
    },
  },
  {
    sentenceFormulaSymbol: "123 I am red",
    sentenceFormulaId: "ENG-123",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "pro-1-I",
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "adj-1-red",
        specificIds: ["eng-adj-001-red"],
        agreeWith: "pro-1-I",
      },
    ],
    orders: {
      primary: [["pro-1-I", "ver-1-am", "adj-1-red"]],
    },
  },
  {
    sentenceFormulaSymbol: "124a I was a good doctor",
    sentenceFormulaId: "ENG-124a",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        agreeWith: "npe-1-person",
        formulaImportantTraitKeys: ["person"],
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "pro-1-I",
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "adj-1-good",
        specificIds: ["eng-adj-001-red"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "npe-1-person",
        specificIds: ["eng-npe-005-doctor"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-I", "ver-1-am", "art-1-a", "adj-1-good", "npe-1-person"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "124b I was a good person",
    sentenceFormulaId: "ENG-124b",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        agreeWith: "npe-1-person",
        giveMeTheseClarifiersOfMyHeadChunk: ["gender", "number"],
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "pro-1-I",
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "adj-1-good",
        specificIds: ["eng-adj-004-good"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "npe-1-person",
        specificIds: ["^eng-npe-001-person-£"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-I", "ver-1-am", "art-1-a", "adj-1-good", "npe-1-person"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "124c I was a good man/woman/person",
    sentenceFormulaId: "ENG-124c",
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        agreeWith: "npe-1-person",
        giveMeTheseClarifiersOfMyHeadChunk: ["gender", "number"],
      },
      {
        chunkId: "ver-1-am",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "pro-1-I",
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "art-1-a",
        form: ["indefinite"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "adj-1-good",
        specificIds: ["eng-adj-004-good"],
        agreeWith: "npe-1-person",
      },
      {
        chunkId: "npe-1-person",
        specificIds: ["eng-npe-001-person-£"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-I", "ver-1-am", "art-1-a", "adj-1-good", "npe-1-person"],
      ],
    },
  },
];
