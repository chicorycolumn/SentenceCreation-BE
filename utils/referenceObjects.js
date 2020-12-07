const gpUtils = require("./generalPurposeUtils.js");

exports.lemmaObjectFeatures = {
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
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
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
        verb: ["tenseDescription", "person", "number"],
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

exports.adhocInflectors = {
  POL: {},
  ENG: { verb: ["tenseDescription"] },
};

exports.tenseDescriptionTranslation = {
  ENG: {
    POL: {
      "past simple": ["past pf"],
      "past continuous": ["past im"],
      "past perfect": ["past pf"],
      "present simple": ["present im"],
      "present continuous": ["present im"],
      "present perfect": ["past im"],
      "future simple": ["future pf"],
      "future continuous": ["future im"],
      "future perfect": ["future pf"],
      //Betaman say Add conditionals and any other tenses.
    },
  },
};

exports.getTranslatedTenseDescription = (
  sourceTenseDescription,
  sourceLanguage,
  targetLanguage
) => {
  console.log("getTranslatedTenseDescription fxn was given these arguments:", {
    sourceTenseDescription,
    sourceLanguage,
    targetLanguage,
  });

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
  console.log("getTranslatedTenseDescription fxn will return this value", {
    translatedTenseDescriptionsArr,
  });
  return translatedTenseDescriptionsArr;
};
