exports.dummySentenceFormulasBank = [
  {
    sentenceFormulaSymbol: "dummy25a good day",
    sentenceFormulaId: "ENG-dummy25a",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "good" },
      { chunkId: "fix-2", wordtype: "fixed", value: "day" },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy25b hello",
    sentenceFormulaId: "ENG-dummy25b",
    translations: { POL: ["POL-dummy25a", "POL-dummy25b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "hello" },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy26",
    sentenceFormulaId: "ENG-dummy26",
    translations: { POL: ["POL-dummy26"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy27",
    sentenceFormulaId: "ENG-dummy27",
    translations: { POL: ["POL-dummy27"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy28",
    sentenceFormulaId: "ENG-dummy28",
    translations: { POL: ["POL-dummy28"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy29",
    sentenceFormulaId: "ENG-dummy29",
    translations: { POL: ["POL-dummy29"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy30",
    sentenceFormulaId: "ENG-dummy30",
    translations: { POL: ["POL-dummy30"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy31",
    sentenceFormulaId: "ENG-dummy31",
    translations: { POL: ["POL-dummy31"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy33",
    sentenceFormulaId: "ENG-dummy33",
    translations: { POL: ["POL-dummy33"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy33a",
    sentenceFormulaId: "ENG-dummy33a",
    translations: { POL: ["POL-dummy33a"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy33b I am",
    sentenceFormulaId: "ENG-dummy33b",
    translations: { POL: ["POL-dummy33b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy33c you are",
    sentenceFormulaId: "ENG-dummy33c",
    translations: { POL: ["POL-dummy33c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        // person: ["2per"],
        number: [],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy33d she is",
    sentenceFormulaId: "ENG-dummy33d",
    translations: { POL: ["POL-dummy33d"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "she" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy33e we are",
    sentenceFormulaId: "ENG-dummy33e",
    translations: { POL: ["POL-dummy33e"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "we" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy33f they are",
    sentenceFormulaId: "ENG-dummy33f",
    translations: { POL: ["POL-dummy33f"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "they" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy34a they are",
    sentenceFormulaId: "ENG-dummy34a",
    translations: { POL: ["POL-dummy34a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: ["future simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy34c",
    sentenceFormulaId: "ENG-dummy34c",
    translations: { POL: ["POL-dummy34c"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        number: [],
        tenseDescription: ["future"],
        person: ["1per"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy34d",
    sentenceFormulaId: "ENG-dummy34d",
    translations: { POL: ["POL-dummy34d"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["be"],
        tenseDescription: [],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy35",
    sentenceFormulaId: "ENG-dummy35",
    translations: { POL: ["POL-dummy35"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy36",
    sentenceFormulaId: "ENG-dummy36",
    translations: { POL: ["POL-dummy36"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy37",
    sentenceFormulaId: "ENG-dummy37",
    translations: { POL: ["POL-dummy37"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy38",
    sentenceFormulaId: "ENG-dummy38",
    translations: { POL: ["POL-dummy38"] },
    sentenceStructure: [
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
  {
    sentenceFormulaSymbol: "dummy39",
    sentenceFormulaId: "ENG-dummy39",
    translations: { POL: ["POL-dummy39"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        specificLemmas: ["be"],
        number: [],
        tenseDescription: ["present simple"],
        // person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy40",
    sentenceFormulaId: "ENG-dummy40",
    translations: { POL: ["POL-dummy40"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["present simple"],
        // person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy41",
    sentenceFormulaId: "ENG-dummy41",
    translations: { POL: ["POL-dummy41"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["past simple"],
        // person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy42",
    sentenceFormulaId: "ENG-dummy42",
    translations: { POL: ["POL-dummy42"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        andTags: ["basic3"],
        number: [],
        tenseDescription: ["future continuous"],
        // person: ["2per"],
        // nixedClarifiers: ["person"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy43",
    sentenceFormulaId: "ENG-dummy43",
    translations: { POL: ["POL-dummy43"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "a" },
      {
        chunkId: "adj-1",
        agreeWith: "nou-1",
        wordtype: "adjective",
        andTags: ["size"],
        form: ["simple"],
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        // specificLemmas: ["nut"],
        andTags: ["allohomTesting"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "adj-1", "nou-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy45a",
    sentenceFormulaId: "ENG-dummy45a",
    translations: { POL: ["POL-dummy45a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting2"],
        number: ["singular"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, //Because this is a sentence of only one word, so could be ambiguous.
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy45b",
    sentenceFormulaId: "ENG-dummy45b",
    translations: { POL: ["POL-dummy45b"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, //Because this is a sentence of only one word, so could be ambiguous.
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy45c",
    sentenceFormulaId: "ENG-dummy45c",
    translations: { POL: ["POL-dummy45b"] }, //Yes, this does point from c to b. It's fine...
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting2"],
        form: ["infinitive"],
        // pleaseShowMultipleWordtypeAllohomClarifiers: true, // ...because I'm checking I can unrequest this.
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46a",
    sentenceFormulaId: "ENG-dummy46a",
    translations: { POL: ["POL-dummy46a"] },
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting3"],
        number: ["singular"],
        // pleaseShowMultipleWordtypeAllohomClarifiers: true,
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46b",
    sentenceFormulaId: "ENG-dummy46b",
    translations: { POL: ["POL-dummy46a"] }, //Yes, this does indeed point from b to a...
    sentenceStructure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["allohomTesting3"],
        number: ["singular"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, // ...because I'm just testing this.
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46c",
    sentenceFormulaId: "ENG-dummy46c",
    translations: { POL: ["POL-dummy46c"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
        // pleaseShowMultipleWordtypeAllohomClarifiers: true,
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy46d",
    sentenceFormulaId: "ENG-dummy46d",
    translations: { POL: ["POL-dummy46c"] }, //Yes, this does indeed point from d to c...
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["allohomTesting3"],
        form: ["infinitive"],
        pleaseShowMultipleWordtypeAllohomClarifiers: true, // ...because I'm just testing this.
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy47",
    sentenceFormulaId: "ENG-dummy47",
    translations: { POL: ["POL-dummy47"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "the" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: ["person"], // You must specify this. I know we've specified 'woman' in another way,
        // but all the way left in fetchPalette->addSpecifiers, way before we enter processSF->findMatching,
        // which is where we'd find the lObjs, it is the case that all the way left there, we need to know
        // that this chunk is a PERSON.

        // We will use this data to ABORT addSpecifiers, and instead leave the gender to be inherited from 'kobieta' lObj in translation.
        specificLemmas: ["woman"],
        number: ["singular"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        specificLemmas: ["write"],
        tenseDescription: ["past"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "nou-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy48a",
    sentenceFormulaId: "ENG-dummy48a",
    translations: { POL: ["POL-dummy48a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m"],
        gcase: ["nom"],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy49a",
    sentenceFormulaId: "ENG-dummy49a",
    translations: { POL: ["POL-dummy49a"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        gender: ["m"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49b",
    sentenceFormulaId: "ENG-dummy49b",
    translations: { POL: ["POL-dummy49b"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49c",
    sentenceFormulaId: "ENG-dummy49c",
    translations: { POL: ["POL-dummy49c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        // gender: ["m"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49d",
    sentenceFormulaId: "ENG-dummy49d",
    translations: { POL: ["POL-dummy49d"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        // gender: ["f"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },

  {
    sentenceFormulaSymbol: "dummy49e",
    sentenceFormulaId: "ENG-dummy49e",
    translations: { POL: ["POL-dummy49e"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        number: ["singular"],
        // gender: ["allPersonalGenders"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy49f",
    sentenceFormulaId: "ENG-dummy49f",
    translations: { POL: ["POL-dummy49f"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
        // gender: ["allPersonalGenders"],
        number: ["plural"],
        gcase: ["nom"],
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        tenseDescription: ["past simple"],
        specificLemmas: ["write"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53",
    sentenceFormulaId: "ENG-dummy53",
    translations: { POL: ["POL-dummy53"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        person: [],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy53a",
    sentenceFormulaId: "ENG-dummy53a",
    translations: { POL: ["POL-dummy53a"] },
    sentenceStructure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple"],
        person: ["1per"],
        number: [],
      },
    ],
    primaryOrders: [],
  },
  {
    sentenceFormulaSymbol: "dummy53b I am",
    sentenceFormulaId: "ENG-dummy53b",
    translations: { POL: ["POL-dummy53b"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53c you are",
    sentenceFormulaId: "ENG-dummy53c",
    translations: { POL: ["POL-dummy53c"] },
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["2per"],
        // gender: ["allPersonalGenders"],
        // number: []
      },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        agreeWith: "pro-1",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        // person: ["2per"],
        number: [],
      },
    ],
    primaryOrders: [["pro-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53d she is",
    sentenceFormulaId: "ENG-dummy53d",
    translations: { POL: ["POL-dummy53d"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "she" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53e we are",
    sentenceFormulaId: "ENG-dummy53e",
    translations: { POL: ["POL-dummy53e"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "we" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["1per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy53f they are",
    sentenceFormulaId: "ENG-dummy53f",
    translations: { POL: ["POL-dummy53f"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "they" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple", "past simple"],
        person: ["3per"],
        number: ["plural"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy54a they are",
    sentenceFormulaId: "ENG-dummy54a",
    translations: { POL: ["POL-dummy54a"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["future simple"],
        person: ["1per"],
        number: ["singular"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },
  {
    sentenceFormulaSymbol: "dummy54c",
    sentenceFormulaId: "ENG-dummy54c",
    translations: { POL: ["POL-dummy54c"] },
    sentenceStructure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "I" },
      {
        chunkId: "ver-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        number: [],
        tenseDescription: ["future"],
        person: ["1per"],
      },
    ],
    primaryOrders: [["fix-1", "ver-1"]],
  },

  {
    sentenceFormulaSymbol: "dummy50a",
    sentenceFormulaId: "ENG-dummy50a",
    translations: { POL: ["POL-dummy50a"] }, //I have my apple.
    sentenceStructure: [
      {
        chunkId: "pro-1",
        wordtype: "pronoun",
        specificLemmas: ["PERSONAL"],
        person: ["1per"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "pro-1",
        wordtype: "verb",
        specificLemmas: ["have"],
        tenseDescription: ["present simple"],
      },
      {
        chunkId: "pro-2",
        wordtype: "pronoun",
        specificLemmas: ["POSSESSIVE"],
        postHocAgreeWithPrimary: "pro-1",
        postHocAgreeWithSecondary: "nou-1",
      },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        specificLemmas: ["onion"],
      },
    ],
    primaryOrders: [["pro-1", "ver-1", "pro-2", "nou-1"]],
  },
];
