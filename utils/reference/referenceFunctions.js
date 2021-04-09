const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const clUtils = require("../zerothOrder/consoleLoggingUtils.js");
const otUtils = require("../objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getStructureChunkFeatures = (currentLanguage) => {
  let stChFeaturesRefByLang = refObj.structureChunkFeatures[currentLanguage];
  let stChFeaturesRefAll = refObj.structureChunkFeatures["ALL"];

  return uUtils.combineTwoKeyValueObjectsCarefully(
    stChFeaturesRefByLang,
    stChFeaturesRefAll
  );
};

exports.removeIncompatibleFeatures = (
  currentLanguage,
  stChToCheckBy,
  stChToChange
) => {
  console.log(311, stChToCheckBy);
  //(note, the two stChs in args are likely the same stCh, but best to do as their names suggest)

  //Eg We're examining gender feature, so check the "number" feature, and
  //if the number does not include "singular", then remove "m", "m1", "m2", "m3", "f", "n" from the gender array.

  let incompatibleFeaturesRef = refObj.incompatibleFeaturesRef[currentLanguage];

  console.log({ currentLanguage });
  console.log({ incompatibleFeaturesRef });

  Object.keys(stChToChange).forEach((traitKeyy) => {
    //eg traitKeyy = "gender"
    if (!incompatibleFeaturesRef[traitKeyy]) {
      return;
    }

    Object.keys(incompatibleFeaturesRef[traitKeyy]).forEach(
      (traitKeyyToCheckBy) => {
        //eg traitKeyyToCheckBy = "number"
        if (
          stChToCheckBy[traitKeyyToCheckBy] &&
          stChToCheckBy[traitKeyyToCheckBy].length
        ) {
          Object.keys(
            incompatibleFeaturesRef[traitKeyy][traitKeyyToCheckBy]
          ).forEach((traitValyyeToCheckBy) => {
            if (
              !stChToCheckBy[traitKeyyToCheckBy].includes(traitValyyeToCheckBy)
            ) {
              let compatibleTraitValyyes =
                incompatibleFeaturesRef[traitKeyy][traitKeyyToCheckBy][
                  traitValyyeToCheckBy
                ];
              //eg compatibleTraitValyyes = ["virile", "nonvirile"]

              stChToChange[traitKeyy] = stChToChange[traitKeyy].filter(
                (value) => !compatibleTraitValyyes.includes(value)
              );
            }
          });
          //eg traitValyyeToCheckBy = "plural"
        }
      }
    );
  });
  console.log(315, stChToChange);
  return stChToChange;
};

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
