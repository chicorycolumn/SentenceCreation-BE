exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "dummy25a good day",
    sentenceFormulaId: "ENG-dummy25a",
    equivalents: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "good" },
      { chunkId: "fix-2", chunkValue: "day" },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "ENG-dummy25b",
    equivalents: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    sentenceStructure: [{ chunkId: "fix-1", chunkValue: "hello" }],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "ENG-dummy26",
    equivalents: { POL: ["POL-dummy26"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
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
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy27",
    sentenceFormulaId: "ENG-dummy27",
    equivalents: { POL: ["POL-dummy27"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
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
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy28",
    sentenceFormulaId: "ENG-dummy28",
    equivalents: { POL: ["POL-dummy28"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy29",
    sentenceFormulaId: "ENG-dummy29",
    equivalents: { POL: ["POL-dummy29"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
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
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy30",
    sentenceFormulaId: "ENG-dummy30",
    equivalents: { POL: ["POL-dummy30"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: [],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy31",
    sentenceFormulaId: "ENG-dummy31",
    equivalents: { POL: ["POL-dummy31"] },
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
    sentenceFormulaSymbol: "dummy33",
    sentenceFormulaId: "ENG-dummy33",
    equivalents: { POL: ["POL-dummy33"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple", "past simple"],
        person: [],
        number: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33a",
    sentenceFormulaId: "ENG-dummy33a",
    equivalents: { POL: ["POL-dummy33a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
        person: ["1per"],
        number: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33b I am",
    sentenceFormulaId: "ENG-dummy33b",
    equivalents: { POL: ["POL-dummy33b"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33c you are",
    sentenceFormulaId: "ENG-dummy33c",
    equivalents: { POL: ["POL-dummy33c"] },
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
        tenseDescription: ["present simple", "past simple"],
        number: [],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33d she is",
    sentenceFormulaId: "ENG-dummy33d",
    equivalents: { POL: ["POL-dummy33d"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "she" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33e we are",
    sentenceFormulaId: "ENG-dummy33e",
    equivalents: { POL: ["POL-dummy33e"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "we" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy33f they are",
    sentenceFormulaId: "ENG-dummy33f",
    equivalents: { POL: ["POL-dummy33f"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "they" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy34a they are",
    sentenceFormulaId: "ENG-dummy34a",
    equivalents: { POL: ["POL-dummy34a"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["future simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy34c",
    sentenceFormulaId: "ENG-dummy34c",
    equivalents: { POL: ["POL-dummy34c"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        number: [],
        tenseDescription: ["future"],
        person: ["1per"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy34d",
    sentenceFormulaId: "ENG-dummy34d",
    equivalents: { POL: ["POL-dummy34d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy35",
    sentenceFormulaId: "ENG-dummy35",
    equivalents: { POL: ["POL-dummy35"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["basic3"],
        tenseDescription: ["past simple", "future perfect"],
        person: [],
        number: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy36",
    sentenceFormulaId: "ENG-dummy36",
    equivalents: { POL: ["POL-dummy36"] },
    sentenceStructure: [{ chunkId: "nco-1", andTags: ["farmyard"] }],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy36a",
    sentenceFormulaId: "ENG-dummy36a",
    equivalents: { POL: ["POL-dummy36a"] },
    sentenceStructure: [
      {
        chunkId: "art-1-the",
        form: ["definite"],
        agreeWith: "nco-1-sheep",
      },
      { chunkId: "nco-1-sheep", andTags: ["farmyard"] },
      {
        chunkId: "ver-1-is",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
        agreeWith: "nco-1-sheep",
      },
      { chunkId: "fix-1-here", chunkValue: "here" },
    ],
    orders: {
      primary: [["art-1-the", "nco-1-sheep", "ver-1-is", "fix-1-here"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy36b",
    sentenceFormulaId: "ENG-dummy36b",
    equivalents: { POL: ["POL-dummy36b"] },
    sentenceStructure: [
      { chunkId: "nco-1", andTags: ["farmyard"] },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["present simple"],
        agreeWith: "nco-1",
      },
    ],
    orders: { primary: [["nco-1", "ver-1"], ["nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy37",
    sentenceFormulaId: "ENG-dummy37",
    equivalents: { POL: ["POL-dummy37"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-001-be"],
        number: ["singular"],
        tenseDescription: ["present simple"],
        person: ["2per"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy38",
    sentenceFormulaId: "ENG-dummy38",
    equivalents: { POL: ["POL-dummy38"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        andTags: ["basic2"],
        number: ["singular"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy39",
    sentenceFormulaId: "ENG-dummy39",
    equivalents: { POL: ["POL-dummy39"] },
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
        number: [],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy40",
    sentenceFormulaId: "ENG-dummy40",
    equivalents: { POL: ["POL-dummy40"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy41",
    sentenceFormulaId: "ENG-dummy41",
    equivalents: { POL: ["POL-dummy41"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["past simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy42",
    sentenceFormulaId: "ENG-dummy42",
    equivalents: { POL: ["POL-dummy42"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["future continuous"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy43",
    sentenceFormulaId: "ENG-dummy43",
    equivalents: { POL: ["POL-dummy43"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "a" },
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        andTags: ["size"],
        form: ["simple"],
      },
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "adj-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy45a",
    sentenceFormulaId: "ENG-dummy45a",
    equivalents: { POL: ["POL-dummy45a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting2"],
        number: ["singular"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, //Because this is a sentence of only one word, so could be ambiguous.
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy45b",
    sentenceFormulaId: "ENG-dummy45b",
    equivalents: { POL: ["POL-dummy45b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, //Because this is a sentence of only one word, so could be ambiguous.
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy45c",
    sentenceFormulaId: "ENG-dummy45c",
    equivalents: { POL: ["POL-dummy45b"] }, //Yes, this does point from c to b.
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy46a",
    sentenceFormulaId: "ENG-dummy46a",
    equivalents: { POL: ["POL-dummy46a"] },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting3"],
        number: ["singular"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy46b",
    sentenceFormulaId: "ENG-dummy46b",
    equivalents: { POL: ["POL-dummy46a"] }, //Yes, this does indeed point from b to a.
    sentenceStructure: [
      {
        chunkId: "nco-1",
        andTags: ["allohomTesting3"],
        number: ["singular"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true,
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy46c",
    sentenceFormulaId: "ENG-dummy46c",
    equivalents: { POL: ["POL-dummy46c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy46d",
    sentenceFormulaId: "ENG-dummy46d",
    equivalents: { POL: ["POL-dummy46c"] }, //Yes, this does indeed point from d to c.
    sentenceStructure: [
      {
        chunkId: "ver-1",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true,
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy47",
    sentenceFormulaId: "ENG-dummy47",
    equivalents: { POL: ["POL-dummy47"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      {
        chunkId: "npe-1", // It being npe aborts addSpecifiers, instead leaving gender to be inherited from 'kobieta' lObj in translation.
        specificIds: ["eng-npe-001-woman"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-005-write"],
        tenseDescription: ["past"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "npe-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy48a",
    sentenceFormulaId: "ENG-dummy48a",
    equivalents: { POL: ["POL-dummy48a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49a",
    sentenceFormulaId: "ENG-dummy49a",
    equivalents: { POL: ["POL-dummy49a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49b",
    sentenceFormulaId: "ENG-dummy49b",
    equivalents: { POL: ["POL-dummy49b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        gender: ["f"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49c",
    sentenceFormulaId: "ENG-dummy49c",
    equivalents: { POL: ["POL-dummy49c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49d",
    sentenceFormulaId: "ENG-dummy49d",
    equivalents: { POL: ["POL-dummy49d"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49e",
    sentenceFormulaId: "ENG-dummy49e",
    equivalents: { POL: ["POL-dummy49e"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy49f",
    sentenceFormulaId: "ENG-dummy49f",
    equivalents: { POL: ["POL-dummy49f"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy50a",
    sentenceFormulaId: "ENG-dummy50a",
    equivalents: { POL: ["POL-dummy50a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1",
      },
      { chunkId: "nco-1", specificIds: ["eng-nco-002-onion"] },
    ],
    orders: {
      primary: [["pro-1", "ver-1", "pro-2", "nco-1"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy50b",
    sentenceFormulaId: "ENG-dummy50b",
    equivalents: { POL: ["POL-dummy50b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "pro-2",
        form: ["determiner"],
        specificIds: ["eng-pro-POSSESSIVE"],
        agreeWith: "pro-1",
      },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-002-onion"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pro-2", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy51a",
    sentenceFormulaId: "ENG-dummy51a",
    equivalents: { POL: ["POL-dummy51a"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      {
        chunkId: "npe-1",
        andTags: ["job"],
        gender: [],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["past simple"],
        specificIds: ["eng-ver-005-write", "eng-ver-003-read"],
      },
    ],
    orders: { primary: [["fix-1", "npe-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy52",
    sentenceFormulaId: "ENG-dummy52",
    equivalents: { POL: ["POL-dummy52"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "the" },
      {
        chunkId: "npe-1",
        specificIds: ["^eng-npe-001-woman"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        tenseDescription: ["future continuous"],
        specificIds: ["eng-ver-005-write"],
      },
    ],
    orders: { primary: [["fix-1", "npe-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53",
    sentenceFormulaId: "ENG-dummy53",
    equivalents: { POL: ["POL-dummy53"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        person: [],
        number: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53a",
    sentenceFormulaId: "ENG-dummy53a",
    equivalents: { POL: ["POL-dummy53a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple"],
        person: ["1per"],
        number: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53b I am",
    sentenceFormulaId: "ENG-dummy53b",
    equivalents: { POL: ["POL-dummy53b"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53c you are",
    sentenceFormulaId: "ENG-dummy53c",
    equivalents: { POL: ["POL-dummy53c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        number: [],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53ca you are (pres)",
    sentenceFormulaId: "ENG-dummy53ca",
    equivalents: { POL: ["POL-dummy53ca"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple"],
        number: [],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53d she is",
    sentenceFormulaId: "ENG-dummy53d",
    equivalents: { POL: ["POL-dummy53d"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "she" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53e we are",
    sentenceFormulaId: "ENG-dummy53e",
    equivalents: { POL: ["POL-dummy53e"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "we" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy53f they are",
    sentenceFormulaId: "ENG-dummy53f",
    equivalents: { POL: ["POL-dummy53f"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "they" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy54a they are",
    sentenceFormulaId: "ENG-dummy54a",
    equivalents: { POL: ["POL-dummy54a"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        tenseDescription: ["future simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy54c",
    sentenceFormulaId: "ENG-dummy54c",
    equivalents: { POL: ["POL-dummy54c"] },
    sentenceStructure: [
      { chunkId: "fix-1", chunkValue: "I" },
      {
        chunkId: "ver-1",
        specificIds: ["eng-ver-002-have"],
        number: [],
        tenseDescription: ["future"],
        person: ["1per"],
      },
    ],
    orders: { primary: [["fix-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy55",
    sentenceFormulaId: "ENG-dummy55",
    equivalents: { POL: ["POL-dummy55"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["eng-pre-001-with"] },
      {
        chunkId: "art-1",
        form: ["indefinite"],
        merelyPreferredChoicesForQuestionSentence: ["form"],
        agreeWith: "nco-1",
      },
      {
        chunkId: "nco-1",
        orTags: ["edible", "edible0"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy55a",
    sentenceFormulaId: "ENG-dummy55a",
    equivalents: { POL: ["POL-dummy55a"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["eng-pre-001-with"] },
      { chunkId: "art-1", agreeWith: "nco-1" },
      {
        chunkId: "nco-1",
        orTags: ["animal"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy55b",
    sentenceFormulaId: "ENG-dummy55b",
    equivalents: { POL: ["POL-dummy55b"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["eng-pre-001-with"] },
      { chunkId: "art-1", agreeWith: "nco-1" },
      { chunkId: "nco-1", orTags: ["animal"], number: ["plural"] },
    ],
    orders: { primary: [["pre-1", "art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy55c",
    sentenceFormulaId: "ENG-dummy55c",
    equivalents: { POL: ["POL-dummy55c"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["eng-pre-001-with"] },
      { chunkId: "art-1", agreeWith: "nco-1" },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-008-sheep"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["pre-1", "art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy55d",
    sentenceFormulaId: "ENG-dummy55d",
    equivalents: { POL: ["POL-dummy55d"] },
    sentenceStructure: [
      { chunkId: "pre-1", specificIds: ["eng-pre-001-with"] },
      { chunkId: "art-1", agreeWith: "nco-1" },
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-008-sheep"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["pre-1", "art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy56",
    sentenceFormulaId: "ENG-dummy56",
    equivalents: { POL: ["POL-dummy56"] },
    sentenceStructure: [
      { chunkId: "art-1", form: ["indefinite"], agreeWith: "nco-1" },
      {
        chunkId: "nco-1",
        orTags: ["edible", "edible0"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["art-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy56a",
    sentenceFormulaId: "ENG-dummy56a",
    equivalents: { POL: ["POL-dummy56a"] },
    sentenceStructure: [
      { chunkId: "art-1", agreeWith: "npe-1" },
      {
        chunkId: "npe-1",
        specificIds: ["^eng-npe-001-woman"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["art-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy57",
    sentenceFormulaId: "ENG-dummy57",
    equivalents: { POL: ["POL-dummy57"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        number: ["plural"],
        specificIds: ["eng-npe-001-woman"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "npe-1",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["2per"],
        gcase: ["acc"],
      },
    ],
    orders: { primary: [["npe-1", "ver-1", "pro-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy58 doctor",
    sentenceFormulaId: "ENG-dummy58",
    equivalents: { POL: ["POL-dummy58"] },
    sentenceStructure: [{ chunkId: "npe-1", andTags: ["job"] }],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy58a doctor f",
    sentenceFormulaId: "ENG-dummy58a",
    equivalents: { POL: ["POL-dummy58a"] },
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
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy59a doctor",
    sentenceFormulaId: "ENG-dummy59a",
    equivalents: { POL: ["POL-dummy59a"] },
    sentenceStructure: [
      { chunkId: "npe-1", andTags: ["job"], number: ["singular"] },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy59b doctor",
    sentenceFormulaId: "ENG-dummy59b",
    equivalents: { POL: ["POL-dummy59b"] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["job"],
        number: ["singular"],
        gender: ["m", "f"],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy60",
    sentenceFormulaId: "ENG-dummy60",
    equivalents: { POL: ["POL-dummy60"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic1"],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy60a",
    sentenceFormulaId: "ENG-dummy60a",
    equivalents: { POL: ["POL-dummy60a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic1"],
        tenseDescription: ["past simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy60b",
    sentenceFormulaId: "ENG-dummy60b",
    equivalents: { POL: ["POL-dummy60b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic2"],
        tenseDescription: ["present simple", "past simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy61",
    sentenceFormulaId: "ENG-dummy61",
    equivalents: { POL: ["POL-dummy61"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic2"],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy61a",
    sentenceFormulaId: "ENG-dummy61a",
    equivalents: { POL: ["POL-dummy61a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["singular"],
        person: ["3per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        tenseDescription: ["present simple"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy62",
    sentenceFormulaId: "ENG-dummy62",
    equivalents: { POL: ["POL-dummy62"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2",
        specificIds: ["eng-pro-PERSONAL"],
        gcase: ["acc"],
        number: ["plural"],
        person: ["3per"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1", "pro-2"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy62a",
    sentenceFormulaId: "ENG-dummy62a",
    equivalents: { POL: ["POL-dummy62a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        specificIds: ["eng-pro-PERSONAL"],
        number: ["plural"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "pro-2",
        specificIds: ["eng-pro-PERSONAL"],
        gcase: ["acc"],
        number: ["plural"],
        person: ["3per"],
      },
    ],
    orders: { primary: [["pro-1", "ver-1", "pro-2"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy63a",
    sentenceFormulaId: "ENG-dummy63a",
    equivalents: { POL: ["POL-dummy63a"] },
    sentenceStructure: [
      {
        chunkId: "art-1",
        form: ["definite"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        gender: ["m"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
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
    sentenceFormulaSymbol: "dummy63b",
    sentenceFormulaId: "ENG-dummy63b",
    equivalents: { POL: ["POL-dummy63b"] },
    sentenceStructure: [
      {
        chunkId: "art-1",
        form: ["definite"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        gender: ["nonvirile"],
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
    sentenceFormulaSymbol: "dummy63c",
    sentenceFormulaId: "ENG-dummy63c",
    equivalents: { POL: ["POL-dummy63c"] },
    sentenceStructure: [
      {
        chunkId: "art-1",
        form: ["definite"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gender"],
        number: ["plural"],
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
    sentenceFormulaSymbol: "dummy63d",
    sentenceFormulaId: "ENG-dummy63d",
    equivalents: { POL: ["POL-dummy63d"] },
    sentenceStructure: [
      {
        chunkId: "art-1",
        form: ["definite"],
        agreeWith: "npe-1-doctor",
      },
      {
        chunkId: "npe-1-doctor",
        specificIds: ["eng-npe-005-doctor"],
        gender: ["virile"],
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
    sentenceFormulaSymbol: "dummy64a",
    sentenceFormulaId: "ENG-dummy64a",
    equivalents: { POL: ["POL-dummy64a"] },
    sentenceStructure: [
      { chunkId: "fix-1-There's", chunkValue: "there's" },
      {
        chunkId: "art-1-A",
        form: ["indefinite"],
        agreeWith: "npe-1-Woman",
      },
      {
        chunkId: "npe-1-Woman",
        specificIds: ["eng-npe-003-parentarooni"],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "and" },
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2-Her",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "npe-1-Woman",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    orders: {
      primary: [
        [
          "fix-1-There's",
          "art-1-A",
          "npe-1-Woman",
          "fix-2-And",
          "pro-1-I",
          "ver-1-See",
          "pro-2-Her",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "dummy64b",
    sentenceFormulaId: "ENG-dummy64b",
    equivalents: { POL: ["POL-dummy64b"] },
    sentenceStructure: [
      { chunkId: "fix-1-There's", chunkValue: "there's" },
      {
        chunkId: "art-1-A",
        form: ["indefinite"],
        agreeWith: "nco-1-Apple",
      },
      {
        chunkId: "nco-1-Apple",
        specificIds: [
          "eng-nco-004-apple",
          "eng-nco-002-onion",
          "eng-nco-003-tomato",
        ],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "and" },
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2-It",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "nco-1-Apple",
        gcase: ["acc"],
        formulaImportantTraitKeys: ["gcase"],
      },
    ],
    orders: {
      primary: [
        [
          "fix-1-There's",
          "art-1-A",
          "nco-1-Apple",
          "fix-2-And",
          "pro-1-I",
          "ver-1-See",
          "pro-2-It",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "dummy65a",
    sentenceFormulaId: "ENG-dummy65a",
    equivalents: { POL: ["POL-dummy65a"] },
    sentenceStructure: [
      { chunkId: "fix-1-There's", chunkValue: "there's" },
      {
        chunkId: "art-1-A",
        form: ["indefinite"],
        agreeWith: "nco-1-Rat",
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["eng-nco-011-rat"],
        number: ["singular"],
      },
      { chunkId: "fix-2-And", chunkValue: "and" },
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2-It",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "nco-1-Rat",
        gcase: ["acc"],
        gender: ["n"],
        formulaImportantTraitKeys: ["gcase", "gender"],
      },
      {
        chunkId: "pro-2-Him",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "nco-1-Rat",
        gcase: ["acc"],
        gender: ["m"],
        formulaImportantTraitKeys: ["gcase", "gender"],
      },
      {
        chunkId: "pro-2-Her",
        specificIds: ["eng-pro-PERSONAL"],
        agreeWith: "nco-1-Rat",
        gcase: ["acc"],
        gender: ["f"],
        formulaImportantTraitKeys: ["gcase", "gender"],
      },
    ],
    orders: {
      primary: [
        [
          "fix-1-There's",
          "art-1-A",
          "nco-1-Rat",
          "fix-2-And",
          "pro-1-I",
          "ver-1-See",
          "pro-2-It",
        ],
      ],
      additional: [
        [
          "fix-1-There's",
          "art-1-A",
          "nco-1-Rat",
          "fix-2-And",
          "pro-1-I",
          "ver-1-See",
          "pro-2-Her",
        ],
        [
          "fix-1-There's",
          "art-1-A",
          "nco-1-Rat",
          "fix-2-And",
          "pro-1-I",
          "ver-1-See",
          "pro-2-Him",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "dummy66",
    sentenceFormulaId: "ENG-dummy66",
    equivalents: { POL: ["POL-dummy66"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Rats",
        specificIds: [
          "eng-nco-011-rat",
          "eng-npe-001-woman",
          "eng-npe-002-boy",
        ],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Are",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "nco-1-Rats",
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "adj-1-Red",
        specificIds: ["eng-adj-001-red"],
        agreeWith: "nco-1-Rats",
      },
    ],
    orders: {
      primary: [["nco-1-Rats", "ver-1-Are", "adj-1-Red"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy67a",
    sentenceFormulaId: "ENG-dummy67a",
    equivalents: { POL: ["POL-dummy67a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"], //Either of these work for Step-O. But this preferable,
        //as you don't need to block every erroneous tense that might come from each language's translation of their Q tenseDesc.
        // blockedTenseDescriptions: ["present continuous"], //Either of these work for Step-O.
      },
      {
        chunkId: "art-1-A",
        form: ["indefinite"],
        agreeWith: "nco-1-Rat",
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["eng-nco-011-rat"],
        number: ["singular"],
        gcase: ["acc"],
      },
      { chunkId: "fix-1-Can", chunkValue: "can" },
      {
        chunkId: "ver-2-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        form: ["infinitive"],
      },
    ],
    orders: {
      primary: [
        ["pro-1-I", "ver-1-See", "art-1-A", "nco-1-Rat"],
        ["pro-1-I", "fix-1-Can", "ver-2-See", "art-1-A", "nco-1-Rat"],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "dummy67b",
    sentenceFormulaId: "ENG-dummy67b",
    equivalents: { POL: ["POL-dummy67b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-I",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["1per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-See",
        agreeWith: "pro-1-I",
        specificIds: ["eng-ver-008-see"],
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "art-1-A",
        form: ["indefinite"],
        agreeWith: "nco-1-Rat",
      },
      {
        chunkId: "nco-1-Rat",
        specificIds: ["eng-nco-011-rat"],
        number: ["singular"],
        gcase: ["acc"],
      },
      { chunkId: "fix-1-Comma", chunkValue: "," },
      {
        chunkId: "pro-2-It",
        agreeWith: "nco-1-Rat",
        specificIds: ["eng-pro-PERSONAL"],
        person: ["3per"],
        number: ["singular"],
      },
      {
        chunkId: "ver-2-Be",
        agreeWith: "nco-1-Rat",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "adj-1-Small",
        agreeWith: "nco-1-Rat",
        specificIds: ["eng-adj-002-small"],
      },
    ],
    orders: {
      primary: [
        [
          "pro-1-I",
          "ver-1-See",
          "art-1-A",
          "nco-1-Rat",
          "fix-1-Comma",
          "pro-2-It",
          "ver-2-Be",
          "adj-1-Small",
        ],
      ],
    },
  },
  {
    sentenceFormulaSymbol: "dummy68a",
    sentenceFormulaId: "ENG-dummy68a",
    equivalents: { POL: ["POL-dummy68a"] },
    sentenceStructure: [
      { chunkId: "fix-1-One", chunkValue: "one" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["eng-nco-007-door"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1-One", "nco-1-Door"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy68b",
    sentenceFormulaId: "ENG-dummy68b",
    equivalents: { POL: ["POL-dummy68b"] },
    sentenceStructure: [
      { chunkId: "fix-1-Two", chunkValue: "two" },
      {
        chunkId: "nco-1-Door",
        specificIds: ["eng-nco-007-door"],
        number: ["plural"],
      },
    ],
    orders: { primary: [["fix-1-Two", "nco-1-Door"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy68c",
    sentenceFormulaId: "ENG-dummy68c",
    equivalents: { POL: ["POL-dummy68c"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["eng-nco-012-tweezers"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Tweezers", "ver-1-Be"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy68d",
    sentenceFormulaId: "ENG-dummy68d",
    equivalents: { POL: ["POL-dummy68d"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Tweezers",
        specificIds: ["eng-nco-012-tweezers"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "nco-1-Tweezers",
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Tweezers", "ver-1-Be"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy68e",
    sentenceFormulaId: "ENG-dummy68e",
    equivalents: { POL: ["POL-dummy68e"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["eng-nco-009-dust"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Dust", "ver-1-Be"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy68f",
    sentenceFormulaId: "ENG-dummy68f",
    equivalents: { POL: ["POL-dummy68f"] },
    sentenceStructure: [
      {
        chunkId: "nco-1-Dust",
        specificIds: ["eng-nco-009-dust"],
        number: ["plural"],
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "nco-1-Dust",
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
    ],
    orders: { primary: [["nco-1-Dust", "ver-1-Be"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy69singleword",
    sentenceFormulaId: "ENG-dummy69singleword",
    equivalents: { POL: [] },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        andTags: ["personTest1"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
    orders: { primary: [], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy70a",
    sentenceFormulaId: "ENG-dummy70a",
    equivalents: { ENG: ["ENG-dummy70a"], POL: ["POL-dummy70a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1-Who",
        specificIds: ["eng-pro-ITG_G"],
        agreeWith: "pro-2-She",
      },
      {
        chunkId: "ver-1-Be",
        specificIds: ["eng-ver-001-be"],
        agreeWith: "pro-2-She",
        tenseDescription: ["present simple"],
        formulaImportantTraitKeys: ["tenseDescription"],
      },
      {
        chunkId: "pro-2-She",
        specificIds: ["eng-pro-PERSONAL"],
        isPerson: true,
      },
      { chunkId: "fix-1-QM", chunkValue: "?" },
    ],
    orders: {
      primary: [["pro-1-Who", "ver-1-Be", "pro-2-She", "fix-1-QM"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy71a",
    sentenceFormulaId: "ENG-dummy71a",
    equivalents: { ENG: ["ENG-dummy71a"], POL: ["POL-dummy71a"] },
    sentenceStructure: [
      {
        chunkId: "adj-1-Small",
        specificIds: ["eng-adj-002-small"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["eng-nco-Dhole"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["adj-1-Small", "nco-1-Hole"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy71b",
    sentenceFormulaId: "ENG-dummy71b",
    equivalents: { ENG: ["ENG-dummy71b"], POL: ["POL-dummy71b"] },
    sentenceStructure: [
      { chunkId: "fix-1-In", chunkValue: "in" },
      { chunkId: "fix-2-A", chunkValue: "a" },
      {
        chunkId: "adj-1-Small",
        specificIds: ["eng-adj-002-small"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["eng-nco-Dhole"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [["fix-1-In", "fix-2-A", "adj-1-Small", "nco-1-Hole"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy71c",
    sentenceFormulaId: "ENG-dummy71c",
    equivalents: {
      ENG: ["ENG-dummy71c", "ENG-dummy71a"],
      POL: ["POL-dummy71c", "POL-dummy71a"],
    },
    sentenceStructure: [
      { chunkId: "fix-1-In", chunkValue: "in" },
      { chunkId: "fix-2-A", chunkValue: "a" },
      {
        chunkId: "adj-1-Small",
        specificIds: ["eng-adj-002-small"],
        agreeWith: "nco-1-Hole",
      },
      {
        chunkId: "nco-1-Hole",
        specificIds: ["eng-nco-Dhole"],
        number: ["singular"],
      },
    ],
    orders: {
      primary: [["fix-1-In", "fix-2-A", "adj-1-Small", "nco-1-Hole"]],
    },
  },
  {
    sentenceFormulaSymbol: "dummy72a",
    sentenceFormulaId: "ENG-dummy72a",
    equivalents: {
      ENG: ["ENG-dummy72a"],
      POL: ["POL-dummy72a"],
      SPA: ["SPA-dummy72a"],
    },
    sentenceStructure: [
      {
        chunkId: "nco-1",
        specificIds: ["eng-nco-002-onion", "pol-nco-001-bear"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "nco-1",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: { primary: [["adj-1", "nco-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy72b",
    sentenceFormulaId: "ENG-dummy72b",
    equivalents: {
      ENG: ["ENG-dummy72b"],
      POL: ["POL-dummy72b"],
      SPA: ["SPA-dummy72b"],
    },
    sentenceStructure: [
      { chunkId: "npe-1", specificIds: ["eng-npe-005-doctor"] },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy72c",
    sentenceFormulaId: "ENG-dummy72c",
    equivalents: {
      ENG: ["ENG-dummy72c"],
      POL: ["POL-dummy72c"],
      SPA: ["SPA-dummy72c"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["eng-npe-003-parentaroonie"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy73a",
    sentenceFormulaId: "ENG-dummy73a",
    equivalents: {
      ENG: ["ENG-dummy73a"],
      POL: ["POL-dummy73a"],
      SPA: ["SPA-dummy73a"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["eng-npe-009-baby"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy73b",
    sentenceFormulaId: "ENG-dummy73b",
    equivalents: {
      ENG: ["ENG-dummy73b"],
      POL: ["POL-dummy73b"],
      SPA: ["SPA-dummy73b"],
    },
    sentenceStructure: [
      {
        chunkId: "npe-1",
        specificIds: ["eng-npe-002-child"],
        gender: ["f"],
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: { primary: [["adj-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy74",
    sentenceFormulaId: "ENG-dummy74",
    equivalents: {
      ENG: ["ENG-dummy74"],
      POL: ["POL-dummy74"],
    },
    sentenceStructure: [
      {
        chunkId: "fix-1",
        chunkValue: "one",
      },
      {
        chunkId: "adj-1",
        agreeWith: "npe-1",
        specificIds: ["eng-adj-001-red"],
      },
      {
        chunkId: "npe-1",
        specificIds: ["^eng-npe-001-person-£"],
        number: ["singular"],
      },
    ],
    orders: { primary: [["fix-1", "adj-1", "npe-1"]], additional: [] },
  },
  {
    sentenceFormulaSymbol: "dummy75",
    sentenceFormulaId: "ENG-dummy75",
    equivalents: {
      ENG: ["ENG-dummy75"],
      POL: ["POL-dummy75"],
    },
    sentenceStructure: [
      {
        chunkId: "nco-1-rat",
        specificIds: ["^eng-nco-011-rat"],
      },
      {
        chunkId: "ver-1-was",
        agreeWith: "nco-1-rat",
        specificIds: ["eng-ver-001-be"],
        tenseDescription: ["past simple"],
      },
      {
        chunkId: "adj-1-red",
        agreeWith: "nco-1-rat",
        specificIds: ["eng-adj-001-red"],
      },
    ],
    orders: {
      primary: [["nco-1-rat", "ver-1-was", "adj-1-red"]],
    },
  },
];
