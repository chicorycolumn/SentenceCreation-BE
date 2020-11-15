const level01 = {
  dummy01: [
    {
      wordtype: "noun",
      manTags: ["nonexistent tag"],
      optTags: [],
      gcase: ["nom"],
      number: ["singular"],
      gender: [],
    },
    "must surely be impossible",
  ],
  dummy02: [
    {
      wordtype: "noun",
      manTags: [],
      optTags: [],
      gcase: ["nonexistent gcase"],
      number: [],
      gender: [],
    },
    "must surely be impossible",
  ],
  dummy03: [
    {
      wordtype: "noun",
      manTags: ["dummy"],
      optTags: [],
      gcase: ["nom"],
      number: [],
      gender: [],
    },
    "must be impossible when using dummy noun",
  ],
  dummy04: [
    {
      wordtype: "noun",
      manTags: ["dummy"],
      optTags: [],
      gcase: ["nom"],
      number: ["singular", "plural"],
      gender: [],
    },
    "must be impossible when using dummy noun",
  ],
  dummy05: [
    {
      wordtype: "noun",
      manTags: ["dummy"],
      optTags: [],
      gcase: ["nom", "loc"],
      number: [],
      gender: [],
    },
    "should be possible even using dummy noun",
  ],
  dummy06: [
    {
      wordtype: "noun",
      manTags: ["dummy"],
      optTags: [],
      gcase: ["ins"],
      number: [],
      gender: [],
    },
    "should be possible 100% of the time",
  ],
  dummy07: [
    {
      wordtype: "noun",
      manTags: ["dummy2"],
      optTags: [],
      gcase: ["loc"],
      number: ["singular"],
      gender: [],
    },
    "must surely be impossible",
  ],
  dummy08: [
    {
      wordtype: "noun",
      manTags: ["dummy3"],
      optTags: [],
      gcase: ["loc"],
      number: ["singular"],
      gender: [],
    },
    "should be possible 100% of the time",
  ],
};

exports.dummySentenceFormulas = { level01 };
