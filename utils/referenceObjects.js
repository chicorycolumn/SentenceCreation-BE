exports.inflectionChains = {
  POL: {
    noun: ["number", "gcase"],
    adjective: ["form", "number", "gender", "gcase"],
    verb: ["form", "tense", "person", "number", "gender"],
  },
  ENG: {
    noun: ["number", "gcase"],
    adjective: ["form"],
    verb: ["form", "tense", "person", "number"],
    allowableIncomingTransfers: {
      noun: ["number"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
    },
  },
};

exports.tenseTranslations = {
  ENG: {
    POL: {
      "past simple": ["pf past"],
      "past continuous": ["im past"],
      "past perfect": ["pf past"],
      "present simple": ["im present"],
      "present continuous": ["im present"],
      "present perfect": ["im past"],
      "future simple": ["pf future"],
      "future continuous": ["compound future"],
      "future perfect": ["pf future"],
    },
  },
};
