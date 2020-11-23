exports.inflectionChainsReference = {
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
