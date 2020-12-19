const gpUtils = require("./generalPurposeUtils.js");

exports.lemmaObjectFeatures = {
  POL: {
    selectors: {
      noun: ["gender"],
      verb: ["aspect"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
    },
  },
  ENG: {
    selectors: {},
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form"],
      verb: ["tenseDescription", "person", "number"],
    },
  },
};

exports.allFeatureValues = {
  ENG: {
    tenseDescription: [
      "past simple",
      "past continuous",
      "past perfect",
      "present simple",
      "present continuous",
      "present perfect",
      "future simple",
      "future continuous",
      "future perfect",
    ],
  },
  POL: {
    tenseDescription: [
      "past im",
      "present im",
      "future im",
      "past pf",
      "future pf",
    ],
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

exports.adhocInflectors = {
  POL: {},
  ENG: { verb: ["tenseDescription"] },
};

exports.tenseDescriptionTranslation = {
  ENG: {
    POL: {
      "past simple": ["past pf"],
      // "past going to": [""], //This would need to be translated by more elaborate, so should be handled within sentenceStructre.
      "past continuous": ["past im"],
      "past perfect": ["past pf"],
      "present simple": ["present im"],
      "present continuous": ["present im"],
      "present perfect": ["past im", "past pf"],
      "future simple": ["future pf"],
      "future goingto": ["future pf"],
      "future continuous": ["future im"],
      "future goingto continuous": ["future im"],
      "future perfect": ["future pf"],
      imperative: ["imperative"],
      "negative imperative": ["negative imperative"],
      "cond0 condition": ["cond0 condition"],
      "cond0 outcome": ["cond0 outcome"],
      "cond1 condition": ["cond1 condition"],
      "cond1 outcome": ["cond1 outcome"],
      "cond2 condition": ["cond2 condition"],
      "cond2 outcome": ["cond2 outcome"],
      "cond3 condition": ["cond3 condition"],
      "cond3 outcome": ["cond3 outcome"],
    },
  },
};

exports.getTranslatedTenseDescription = (
  sourceTenseDescription,
  sourceLanguage,
  targetLanguage
) => {
  let translatedTenseDescriptionsArr = [];
  if (
    Object.keys(exports.tenseDescriptionTranslation).includes(sourceLanguage)
  ) {
    translatedTenseDescriptionsArr =
      exports.tenseDescriptionTranslation[sourceLanguage][targetLanguage][
        sourceTenseDescription
      ];
  } else {
    let translations =
      exports.tenseDescriptionTranslation[targetLanguage][sourceLanguage];

    Object.keys(translations).forEach((key) => {
      let value = translations[key];

      if (
        value.includes(sourceTenseDescription) &&
        !translatedTenseDescriptionsArr.includes(key)
      ) {
        translatedTenseDescriptionsArr.push(key);
      }
    });
  }

  return translatedTenseDescriptionsArr;
};
