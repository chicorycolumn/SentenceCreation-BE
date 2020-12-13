exports.dummySentenceFormulasBank = {
  dummy01: {
    symbol: "dummy01",
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
    symbol: "dummy02",
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
    symbol: "dummy03",
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
    symbol: "dummy04",
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
    symbol: "dummy05",
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
    symbol: "dummy06",
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
    symbol: "dummy07",
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
    symbol: "dummy08",
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
    symbol: "dummy09",
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
    symbol: "dummy10",
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
    symbol: "I have APPLE",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificLemmas: ["jabłko"], //This overrides andTags and selectRaandom, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy11b: {
    symbol: "I have APPLE/SHIRT",
    structure: [
      { chunkId: "fix-1", wordtype: "fixed", value: "mam" },
      {
        chunkId: "nou-1",
        wordtype: "noun",
        andTags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificLemmas: ["jabłko", "majtki"], //This overrides andTags and selectRaandom, and selectors. But requested inflections still work.
      },
    ],
    primaryOrders: [["fix-1", "nou-1"]],
    additionalOrders: [],
  },
  dummy12: {
    symbol: "shirt",
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
  dummy12: {
    symbol: "dummy12 2per",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["2per"],
      },
    ],
  },
  dummy13a: {
    symbol: "dummy13a conditional plural",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        form: ["verbal"],
        tenseDescription: ["conditional im"],
        number: ["plural"],
      },
    ],
  },
  dummy13b: {
    symbol: "dummy13b present 2per f",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        andTags: ["basic2"],
        form: ["verbal"],
        tenseDescription: ["present im"],
        person: ["2per"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
    ],
  },
  dummy14: {
    symbol: "dummy14 infinitive",
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
    symbol: "dummy15 impersonal",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["impersonal"],
      },
    ],
  },
  dummy15a: {
    symbol: "dummy15a impersonal plural",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
  },
  dummy16: {
    symbol: "dummy16 contemporaryAdverbial",
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
    symbol: "dummy17 contemporaryAdverbial female",
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
    symbol: "dummy18 contemporaryAdverbial n virile 2per",
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
    symbol: "dummy16a anteriorAdverbial",
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
    symbol: "dummy17a anteriorAdverbial female",
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
    symbol: "dummy18a anteriorAdverbial n virile 2per",
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
    symbol: "dummy19",
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
    symbol: "dummy20a girl is reading im",
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
    symbol: "dummy20b girl will read pf",
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
    symbol: "dummy21 verbalNoun",
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
    symbol: "dummy22 verbalNoun ~f",
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
    symbol: "dummy23a past/cond 1per plural m1",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["1per"],
        number: ["plural"],
        gender: ["m1"],
      },
    ],
  },
  dummy23b: {
    symbol: "dummy23b past/cond 1per plural m2",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["1per"],
        number: ["plural"],
        gender: ["m2"],
      },
    ],
  },
  dummy23c: {
    symbol: "dummy23c past/cond 1per plural f/n",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["past", "conditional"],
        andTags: ["basic2"],
        form: ["verbal"],
        person: ["1per"],
        number: ["plural"],
        gender: ["n", "f"],
      },
    ],
  },
  dummy24a: {
    symbol: "dummy24a I read and research",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],
        form: ["verbal"],
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
        form: ["verbal"],
        person: ["1per"],
        number: ["singular"],
        gender: [],
      },
    ],
  },
  dummy24b: {
    symbol: "dummy24b I/you read and research",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im"],
        andTags: ["basic2"],
        form: ["verbal"],
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
        form: ["verbal"],
        person: ["1per", "2per"],
        number: ["singular"],
        gender: [],
      },
    ],
    primaryOrders: [["ver-1", "fix-1", "ver-2"]],
  },
  dummy24c: {
    symbol: "dummy24c read and research",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tenseDescription: ["present im", "past im"],
        andTags: ["basic2"],
        form: ["verbal"],
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
        form: ["verbal"],
        person: ["1per", "2per"],
        number: ["singular", "plural"],
        gender: [],
      },
    ],
    primaryOrders: [["ver-1", "fix-1", "ver-2"]],
  },
  dummy25a: {
    symbol: "dummy25a good day",
    structure: [{ chunkId: "fix-1", wordtype: "fixed", value: "dzień" }],
    structure: [{ chunkId: "fix-2", wordtype: "fixed", value: "dobry" }],
    primaryOrders: [],
  },
  dummy25b: {
    symbol: "dummy25b hello",
    structure: [{ chunkId: "fix-1", wordtype: "fixed", value: "halo" }],
    primaryOrders: [],
  },
};
