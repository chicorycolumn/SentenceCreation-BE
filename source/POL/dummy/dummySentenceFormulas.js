exports.dummySentenceFormulasBank = {
  dummy01: {
    symbol: "dummy01",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["nonexistent tag"],
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
        tags: [],
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
        tags: ["dummy"],
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
        tags: ["dummy"],
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
        tags: ["dummy"],
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
        tags: ["dummy"],
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
        tags: ["dummy2"],
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
        tags: ["dummy3"],
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
        tags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        tags: ["foobar-C"],
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
        tags: ["foobar-A"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        tags: ["foobar-B"],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        tags: ["foobar-C"],
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
        tags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
        specificLemmas: ["jabłko"], //This overrides tags and selectRandom. But still conjugates for features.
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
        tags: [],
        gcase: ["acc"],
        number: ["plural"],
        gender: [],
        specificLemmas: ["jabłko", "majtki"], //This overrides tags and selectRandom. But still conjugates for features.
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
        tags: ["wearable"],
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
        tags: ["basic2"],
        form: ["verb"],
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
        aspect: ["imperfective"],
        tags: ["basic2"],
        form: ["verb"],
        tense: ["conditional"],
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
        aspect: ["imperfective"],
        tags: ["basic2"],
        form: ["verb"],
        tense: ["present"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
        form: ["verb"],
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
        tags: ["basic2"],
        form: ["verb"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["dummy-nou-010"],
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
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        aspect: ["imperfective"],
        tense: ["present"],
        person: ["3per"],
        tags: ["basic2"],
      },
    ],
  },
  dummy20b: {
    symbol: "dummy20b girl will read pf",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        tags: ["person"],
        gcase: ["nom"],
        number: ["singular", "plural"],
        gender: ["f"],
      },
      {
        chunkId: "ver-1",
        agreeWith: "nou-1",
        wordtype: "verb",
        aspect: ["perfective"],
        tense: ["future"],
        person: ["3per"],
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
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
        tags: ["basic2"],
        form: ["verb"],
        tense: ["past", "conditional"],
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
        tags: ["basic2"],
        form: ["verb"],
        tense: ["past", "conditional"],
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
        tags: ["basic2"],
        form: ["verb"],
        tense: ["past", "conditional"],
        person: ["1per"],
        number: ["plural"],
        gender: ["n", "f"],
      },
    ],
  },
};
