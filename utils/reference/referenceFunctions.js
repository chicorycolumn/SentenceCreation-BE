const gpUtils = require("../generalPurposeUtils.js");
const idUtils = require("../identityUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getBaseWordtype = (wordtype) => {
  return ["nco", "npe"].includes(wordtype) ? "nou" : wordtype;
};

exports.isTraitCompatibleStCh = (trait, stCh, currentLanguage) => {
  const stChTraitsRef = refFxn.getStructureChunkTraits(currentLanguage);
  return stChTraitsRef[trait].compatibleWordtypes.includes(
    idUtils.getWordtypeStCh(stCh)
  );
};

exports.isTraitCompatibleLObj = (trait, lObj, currentLanguage) => {
  const stChTraitsRef = refFxn.getStructureChunkTraits(currentLanguage);
  return stChTraitsRef[trait].compatibleWordtypes.includes(
    idUtils.getWordtypeLObj(lObj)
  );
};

exports.duplicateTraitKeys = (obj) => {
  let duplications = { gender: ["semanticGender"] };

  Object.keys(duplications).forEach((duplicatorSource) => {
    duplications[duplicatorSource].forEach((duplicatorTarget) => {
      obj[duplicatorTarget] = uUtils.copyWithoutReference(
        obj[duplicatorSource]
      );
    });
  });
};

exports.getAnnotationToPlainspeakRef = () => {
  let annotationToPlainspeakRef = refObj.annotationToPlainspeakRef;
  refFxn.duplicateTraitKeys(annotationToPlainspeakRef);
  return annotationToPlainspeakRef;
};

exports.getStructureChunkTraits = (currentLanguage, lexicalOnly) => {
  let stChTraitsRefByLang = refObj.structureChunkTraits[currentLanguage];
  let stChTraitsRefAll = refObj.structureChunkTraits["ALL"];

  let res = uUtils.combineTwoKeyValueObjectsCarefully(
    stChTraitsRefByLang,
    stChTraitsRefAll
  );

  refFxn.duplicateTraitKeys(res);

  if (lexicalOnly) {
    let trimmedRes = {};
    Object.keys(res).forEach((key) => {
      let value = res[key];
      if (value.isLexical) {
        trimmedRes[key] = value;
      }
    });
    return trimmedRes;
  }

  return res;
};

exports.assignDefaultTraitValuesOrPossibleTraitValues = (
  stCh,
  currentLanguage,
  traitKey,
  alsoUseStChTraitsFromAll
) => {
  let wordtype = idUtils.getWordtypeStCh(stCh);

  let defaultTraitValuesOrPossibleTraitValues =
    this.getDefaultTraitValuesOrPossibleTraitValues(
      currentLanguage,
      wordtype,
      traitKey,
      alsoUseStChTraitsFromAll
    );
  consol.logSpecial(
    1,
    `kmrb assignDefaultTraitValuesOrPossibleTraitValues Now "${stCh.chunkId}"'s "${traitKey}" is`,
    defaultTraitValuesOrPossibleTraitValues
  );
  stCh[traitKey] = defaultTraitValuesOrPossibleTraitValues;
};

exports.getDefaultTraitValuesOrPossibleTraitValues = (
  currentLanguage,
  wordtype,
  traitKey,
  alsoUseStChTraitsFromAll
) => {
  let stChTraitsRefByLang = refObj.structureChunkTraits[currentLanguage];
  let ref;

  if (alsoUseStChTraitsFromAll) {
    let stChTraitsRefAll = refObj.structureChunkTraits["ALL"];

    ref = uUtils.combineTwoKeyValueObjectsCarefully(
      stChTraitsRefByLang,
      stChTraitsRefAll
    );
  } else {
    ref = stChTraitsRefByLang;
  }

  let possibleTraitValues = ref[traitKey].possibleTraitValues.slice(0);
  let defaultTraitValues;

  if (
    refObj.defaultTraitValues[wordtype] &&
    refObj.defaultTraitValues[wordtype][traitKey]
  ) {
    defaultTraitValues = refObj.defaultTraitValues[wordtype][traitKey].slice(0);
  }

  if (defaultTraitValues && defaultTraitValues.length) {
    return defaultTraitValues;
  }
  return possibleTraitValues;
};

exports.removeIncompatibleTraitValues = (currentLanguage, structureChunk) => {
  let traitKeysChanged = [];

  //ACX3A: If npe or 1per then remove neuter from gender.
  if (
    idUtils.stChIsNounPerson(structureChunk) ||
    (structureChunk.person &&
      !structureChunk.person.filter((traitValue) => traitValue !== "1per")
        .length)
  ) {
    consol.log(
      "vevx removeIncompatibleTraitValues. Removing 'n' if present as is npe."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (traitValue) => traitValue !== "n"
    );
    if (!traitKeysChanged.includes("gender")) {
      traitKeysChanged.push("gender");
    }
  }

  //ACX3B: If we're examining gender trait, check the number trait, and
  //if the number traitValues do not include "singular", then remove "m", "m1", "m2", "m3", "f", "n" from the gender array.

  //This is effectively Vito-Reverse
  let incompatibleTraitsRef = refObj.incompatibleTraitsRef[currentLanguage];

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
              if (!traitKeysChanged.includes(traitKey)) {
                traitKeysChanged.push(traitKey);
              }
            }
          });
        }
      }
    );
  });
  return { structureChunk, traitKeysChanged };
};

exports.getTranslatedTenseDescription = (
  sourceTenseDescription,
  sourceLanguage,
  targetLanguage
) => {
  let translatedTenseDescriptionsArr = [];

  refObj.tenseDescriptionTranslations.forEach((refItem) => {
    if (refItem[sourceLanguage].includes(sourceTenseDescription)) {
      translatedTenseDescriptionsArr = [
        ...translatedTenseDescriptionsArr,
        ...refItem[targetLanguage],
      ];
    }
  });

  return Array.from(new Set(translatedTenseDescriptionsArr));
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
      traitsRef[kindOfKeyOnLObj][idUtils.getWordtypeStCh(structureChunk)];

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
  if (traitKey === "semanticGender") {
    traitKey = "gender";
  }

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
