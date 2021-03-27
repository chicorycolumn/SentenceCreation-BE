const gpUtils = require("../generalPurposeUtils.js");
const clUtils = require("../zerothOrder/consoleLoggingUtils.js");
const otUtils = require("../objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getTranslatedTenseDescription = (
  sourceTenseDescription,
  sourceLanguage,
  targetLanguage
) => {
  let translatedTenseDescriptionsArr = [];

  if (
    Object.keys(refObj.tenseDescriptionTranslation).includes(sourceLanguage)
  ) {
    translatedTenseDescriptionsArr =
      refObj.tenseDescriptionTranslation[sourceLanguage][targetLanguage][
        sourceTenseDescription
      ].regular;
  } else {
    let translations =
      refObj.tenseDescriptionTranslation[targetLanguage][sourceLanguage];

    Object.keys(translations).forEach((key) => {
      let value = translations[key].regular;

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

exports.skipThisStepInPreprocessStructureChunks = (
  currentLanguage,
  key,
  structureChunk
) => {
  if (currentLanguage === "POL") {
    if (key === "tenseDescription") {
      if (
        structureChunk.tense &&
        structureChunk.tense.length &&
        structureChunk.aspect &&
        structureChunk.aspect.length
      ) {
        return true;
      }
    }
  }
};

exports.validFeaturesOfStructureChunkWordtype = (
  currentLanguage,
  structureChunk,
  featureTypes
) => {
  if (!featureTypes || !featureTypes.length) {
    featureTypes = ["selectors", "hybridSelectors", "inflectionChains"];
  }

  let featuresRef = refObj.lemmaObjectFeatures[currentLanguage];

  let validFeatures = [];

  featureTypes.forEach((featureType) => {
    let additionalValidFeatures =
      featuresRef[featureType][structureChunk.wordtype];

    if (additionalValidFeatures) {
      if (!Array.isArray(additionalValidFeatures)) {
        clUtils.throw(
          "twnl additionalValidFeatures in isValidFeatureOfStructureChunkWordtype fxn should have been array."
        );
      }

      validFeatures = [...validFeatures, ...additionalValidFeatures];
    }
  });

  return validFeatures;
};

exports.giveAdjustedFeatureValue = (
  questionLanguage,
  answerLanguage,
  featureKey,
  featureValue
) => {
  if (
    refObj.featureValueTranslation[questionLanguage] &&
    refObj.featureValueTranslation[questionLanguage][answerLanguage]
  ) {
    let featureValueTranslationRef =
      refObj.featureValueTranslation[questionLanguage][answerLanguage][
        featureKey
      ];

    if (
      featureValueTranslationRef &&
      featureValueTranslationRef[featureValue]
    ) {
      return featureValueTranslationRef[featureValue].slice(0);
    }
  }
  return [featureValue];
};
