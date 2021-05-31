const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const otUtils = require("../objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getstructureChunkTraits = (currentLanguage) => {
  let stChTraitsRefByLang = refObj.structureChunkTraits[currentLanguage];
  let stChTraitsRefAll = refObj.structureChunkTraits["ALL"];

  return uUtils.combineTwoKeyValueObjectsCarefully(
    stChTraitsRefByLang,
    stChTraitsRefAll
  );
};

exports.removeincompatibleTraits = (currentLanguage, structureChunk) => {
  //VITO-TEMP-removeincompatibleTraits

  consol.log(311, structureChunk);
  //(note, the two stChs in args are likely the same stCh, but best to do as their names suggest)

  //ACX3A: If npe then remove neuter from gender.
  if (gpUtils.getWordtypeStCh(structureChunk, true) === "noun-person") {
    consol.log(
      "vvvx removeincompatibleTraits. Removing 'n' if present as is noun-person."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (traitValue) => traitValue !== "n"
    );
  }

  //ACX3B: If 1per then remove neuter from gender.
  if (
    structureChunk.person &&
    !structureChunk.person.filter((traitValue) => traitValue !== "1per").length
  ) {
    consol.log(
      "vvvy removeincompatibleTraits. Removing 'n' if present as only person traitValue is '1per'."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (traitValue) => traitValue !== "n"
    );
  }

  //ACX3C: If we're examining gender trait, check the "number" trait, and
  //if the number traitValues do not include "singular", then remove "m", "m1", "m2", "m3", "f", "n" from the gender array.

  let incompatibleTraitsRef = refObj.incompatibleTraitsRef[currentLanguage];

  consol.log({ currentLanguage });
  consol.log({ incompatibleTraitsRef });

  Object.keys(structureChunk).forEach((traitKey) => {
    //eg traitKey = "gender"
    if (!incompatibleTraitsRef[traitKey]) {
      return;
    }

    Object.keys(incompatibleTraitsRef[traitKey]).forEach(
      (traitKeyToCheckBy) => {
        //eg traitKeyToCheckBy = "number"
        if (
          structureChunk[traitKeyToCheckBy] &&
          structureChunk[traitKeyToCheckBy].length
        ) {
          if (structureChunk[traitKeyToCheckBy].length > 1) {
            consol.throw(
              `ckos Unsure how to handle multiple traitValues for ${traitKeyToCheckBy}`
            );
          }

          Object.keys(
            incompatibleTraitsRef[traitKey][traitKeyToCheckBy]
          ).forEach((traitValueToCheckBy) => {
            //eg traitValueToCheckBy = "plural"
            if (
              !structureChunk[traitKeyToCheckBy].includes(traitValueToCheckBy)
            ) {
              let compatibleTraitValues =
                incompatibleTraitsRef[traitKey][traitKeyToCheckBy][
                  traitValueToCheckBy
                ];
              //eg compatibleTraitValues = ["virile", "nonvirile"]

              //eg structureChunk["number"] is ["plural"],
              //so remove any gender traitValue that don't fit with that.
              structureChunk[traitKey] = structureChunk[traitKey].filter(
                (traitValue) => !compatibleTraitValues.includes(traitValue)
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
    let tenseDescTranslationObj =
      refObj.tenseDescriptionTranslation[targetLanguage][sourceLanguage];

    Object.keys(tenseDescTranslationObj).forEach((tenseDesc) => {
      let arrayOfTranslatedTenseDescriptions =
        tenseDescTranslationObj[tenseDesc].regular;

      if (
        arrayOfTranslatedTenseDescriptions.includes(sourceTenseDescription) &&
        !translatedTenseDescriptionsArr.includes(tenseDesc)
      ) {
        translatedTenseDescriptionsArr.push(tenseDesc);
      }
    });
  }

  return translatedTenseDescriptionsArr;
};

exports.skipThisStepInPreprocessStructureChunks = (
  currentLanguage,
  featureValue,
  structureChunk
) => {
  if (currentLanguage === "POL") {
    if (featureValue === "tenseDescription") {
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

exports.validTraitKeysPerStructureChunkWordtype = (
  currentLanguage,
  structureChunk,
  kindsOfKeyOnLObj
) => {
  if (!kindsOfKeyOnLObj || !kindsOfKeyOnLObj.length) {
    kindsOfKeyOnLObj = ["selectors", "hybridSelectors", "inflectionChains"];
  }

  let traitsRef = refObj.lemmaObjectTraitKeys[currentLanguage];

  let validTraitKeys = [];

  kindsOfKeyOnLObj.forEach((kindOfKeyOnLObj) => {
    let additionalValidTraitKeys =
      traitsRef[kindOfKeyOnLObj][gpUtils.getWordtypeStCh(structureChunk)];

    if (additionalValidTraitKeys) {
      if (!Array.isArray(additionalValidTraitKeys)) {
        consol.throw(
          "twnl additionalValidTraitKeys in validTraitKeysPerStructureChunkWordtype fxn should have been array."
        );
      }

      validTraitKeys = [...validTraitKeys, ...additionalValidTraitKeys];
    }
  });

  return validTraitKeys;
};

exports.giveAdjustedTraitValue = (
  questionLanguage,
  answerLanguage,
  traitKey,
  traitValue
) => {
  if (
    refObj.traitValueTranslation[questionLanguage] &&
    refObj.traitValueTranslation[questionLanguage][answerLanguage]
  ) {
    let traitValueTranslationRef =
      refObj.traitValueTranslation[questionLanguage][answerLanguage][traitKey];

    if (traitValueTranslationRef && traitValueTranslationRef[traitValue]) {
      return traitValueTranslationRef[traitValue].slice(0);
    }
  }
  return [traitValue];
};
