const level01 = {
  dummy01: {
    symbol: "dummy01",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["nonexistent tag"],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: ["dummy"],
        optTags: [],
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
        manTags: ["dummy"],
        optTags: [],
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
        manTags: ["dummy"],
        optTags: [],
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
        manTags: ["dummy"],
        optTags: [],
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
        manTags: ["dummy2"],
        optTags: [],
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
        manTags: ["dummy3"],
        optTags: [],
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
        manTags: ["foobar-A"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["foobar-B"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        manTags: ["foobar-C"],
        optTags: [],
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
        manTags: ["foobar-A"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-2",
        wordtype: "noun",
        manTags: ["foobar-B"],
        optTags: [],
        gcase: ["nom"],
        number: ["singular"],
        gender: [],
      },
      {
        chunkId: "nou-3",
        wordtype: "noun",
        manTags: ["foobar-C"],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: ["wearable"],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
        form: ["verb"],
        person: ["impersonal"],
        number: ["plural"],
      },
    ],
  },
  dummy16: {
    symbol: "dummy16 participle",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        form: ["participle"],
      },
    ],
  },
  dummy17: {
    symbol: "dummy17 participle female",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        form: ["participle"],
        gender: ["f"],
      },
    ],
  },
  dummy18: {
    symbol: "dummy18",
    structure: [
      {
        chunkId: "nou-1",
        wordtype: "noun",
        manTags: ["dummy-nou-010"],
        optTags: [],
        number: ["singular", "plural"],
        gcase: ["acc"],
      },
    ],
  },
  dummy19: {
    symbol: "dummy19 participle f nonvirile",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        gender: ["f", "nonvirile"],
        form: ["participle"],
      },
    ],
  },
  dummy20: {
    symbol: "dummy20 participle n virile",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        gender: ["n", "virile"],
        form: ["participle"],
      },
    ],
  },
  dummy20a: {
    symbol: "dummy20a participle n virile 2per",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        gender: ["n", "virile"],
        person: ["2per"],
        form: ["participle"],
      },
    ],
  },
  dummy21: {
    symbol: "dummy21 verbalNoun",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
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
        manTags: [],
        optTags: [],
        form: ["verb"],
        tense: ["past", "conditional"],
        person: ["1per"],
        number: ["plural"],
        gender: ["n", "f"],
      },
    ],
  },
  dummy24a: {
    symbol: "dummy24a activeadjectival f",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        form: ["participle"],
        tense: ["activeAdjectival"],
        person: ["1per"],
        gender: ["f"],
        number: ["singular", "plural"],
      },
    ],
  },
  dummy24b: {
    symbol: "dummy24b activeadjectival m1",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        form: ["participle"],
        tense: ["passiveAdjectival"],
        person: ["2per"],
        gender: ["m1"],
        number: ["singular", "plural"],
      },
    ],
  },
  dummy24c: {
    symbol: "dummy24c contemporaryadverbial",
    structure: [
      {
        chunkId: "ver-1",
        wordtype: "verb",
        manTags: [],
        optTags: [],
        form: ["participle"],
        person: ["1per", "2per"],
        number: ["plural"],
        gender: ["n"],
        tense: ["contemporaryAdverbial"],
      },
    ],
  },
};

exports.dummySentenceFormulasBank = { level01 };
