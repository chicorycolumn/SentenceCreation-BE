const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
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

exports.removeIncompatibleFeatures = (currentLanguage, structureChunk) => {
  //VITO-TEMP-removeIncompatibleFeatures

  consol.log(311, structureChunk);
  //(note, the two stChs in args are likely the same stCh, but best to do as their names suggest)

  //ACX3A: If npe then remove neuter from gender.
  if (gpUtils.getWorrdtypeStCh(structureChunk, true) === "noun-person") {
    consol.log(
      "vvvx removeIncompatibleFeatures. Removing 'n' if present as is noun-person."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (value) => value !== "n"
    );
  }

  //ACX3B: If 1per then remove neuter from gender.
  if (
    structureChunk.person &&
    !structureChunk.person.filter((value) => value !== "1per").length
  ) {
    consol.log(
      "vvvy removeIncompatibleFeatures. Removing 'n' if present as only person value is '1per'."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (value) => value !== "n"
    );
  }

  //ACX3C: If we're examining gender feature, check the "number" feature, and
  //if the number does not include "singular", then remove "m", "m1", "m2", "m3", "f", "n" from the gender array.

  let incompatibleFeaturesRef = refObj.incompatibleFeaturesRef[currentLanguage];

  consol.log({ currentLanguage });
  consol.log({ incompatibleFeaturesRef });

  Object.keys(structureChunk).forEach((traitKeyy) => {
    //eg traitKeyy = "gender"
    if (!incompatibleFeaturesRef[traitKeyy]) {
      return;
    }

    Object.keys(incompatibleFeaturesRef[traitKeyy]).forEach(
      (traitKeyyToCheckBy) => {
        //eg traitKeyyToCheckBy = "number"
        if (
          structureChunk[traitKeyyToCheckBy] &&
          structureChunk[traitKeyyToCheckBy].length
        ) {
          if (structureChunk[traitKeyyToCheckBy].length > 1) {
            consol.throw(
              `ckos Unsure how to handle multiple values for ${traitKeyyToCheckBy}`
            );
          }

          Object.keys(
            incompatibleFeaturesRef[traitKeyy][traitKeyyToCheckBy]
          ).forEach((traitValyyeToCheckBy) => {
            //eg traitValyyeToCheckBy = "plural"
            if (
              !structureChunk[traitKeyyToCheckBy].includes(traitValyyeToCheckBy)
            ) {
              let compatibleTraitValyyes =
                incompatibleFeaturesRef[traitKeyy][traitKeyyToCheckBy][
                  traitValyyeToCheckBy
                ];
              //eg compatibleTraitValyyes = ["virile", "nonvirile"]

              //eg structureChunk["number"] is ["plural"],
              //so remove any values from gender that don't fit with that.
              structureChunk[traitKeyy] = structureChunk[traitKeyy].filter(
                (value) => !compatibleTraitValyyes.includes(value)
              );
            }
          });
        }
      }
    );
  });

  consol.log(315, structureChunk);
  return structureChunk;
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
      featuresRef[featureType][gpUtils.getWorrdtypeStCh(structureChunk)];

    if (additionalValidFeatures) {
      if (!Array.isArray(additionalValidFeatures)) {
        consol.throw(
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
