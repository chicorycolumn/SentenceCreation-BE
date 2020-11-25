exports.lemmaObjectCharacteristics = {
  POL: {
    selectors: {
      noun: ["gender"],
      verb: ["aspect"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
    },
  },
  ENG: {
    selectors: {},
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
      allowableTransfersFromQuestionStructure: {
        noun: ["number"],
        adjective: ["form"],
        verb: ["form", "tense", "person", "number"],
      },
    },
  },
};

exports.uninflectedForms = {
  POL: { verb: ["contemporaryAdverbial", "anteriorAdverbial"] },
  ENG: {
    verb: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      "activeAdjectival",
      "passiveAdjectival",
    ],
  },
};

exports.adhocForms = {
  POL: {},
  ENG: { verb: ["verb"] },
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
