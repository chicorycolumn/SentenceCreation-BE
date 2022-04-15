const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getBaseWordtype = (wordtypeLonghand) => {
  let reg = /\w+(?=[A-Z])/;
  return (
    (wordtypeLonghand.match(reg) && wordtypeLonghand.match(reg)[0]) ||
    wordtypeLonghand
  );
};

exports.translateWordtypeShorthandLonghand = (
  str,
  label,
  returnBaseWordtype
) => {
  if (returnBaseWordtype) {
    consol.throw(
      "spqd You should not need to use this base word type. nounCommon and nounPerson are now two separare wordtypes and there ought to be no use-case for just noun."
    );
  }
  let res;
  Object.keys(refObj.wordtypeShorthandTranslation).forEach((shorthand) => {
    let longhand = refObj.wordtypeShorthandTranslation[shorthand];
    if (str == shorthand) {
      res = returnBaseWordtype ? refFxn.getBaseWordtype(longhand) : longhand;
    }
    if (str == longhand) {
      res = shorthand;
    }
  });
  if (res) {
    return res;
  }
  consol.throw(
    `fkat This is not a valid wordtype shorthand or longhand: "${str}". Further info: ${label}.`
  );
};

exports.isTraitCompatibleStCh = (trait, stCh, currentLanguage) => {
  const stChTraitsRef = refFxn.getStructureChunkTraits(currentLanguage);
  return stChTraitsRef[trait].compatibleWordtypes.includes(
    gpUtils.getWordtypeStCh(stCh)
  );
};

exports.isTraitCompatibleLObj = (trait, lObj, currentLanguage) => {
  const stChTraitsRef = refFxn.getStructureChunkTraits(currentLanguage);
  return stChTraitsRef[trait].compatibleWordtypes.includes(
    gpUtils.getWordtypeLObj(lObj)
  );
};

exports.getStructureChunkTraits = (currentLanguage) => {
  let stChTraitsRefByLang = refObj.structureChunkTraits[currentLanguage];
  let stChTraitsRefAll = refObj.structureChunkTraits["ALL"];

  return uUtils.combineTwoKeyValueObjectsCarefully(
    stChTraitsRefByLang,
    stChTraitsRefAll
  );
};

exports.removeIncompatibleTraitValues = (currentLanguage, structureChunk) => {
  let traitKeysChanged = [];

  //ACX3A: If npe or 1per then remove neuter from gender.
  if (
    gpUtils.stChIsNounPerson(structureChunk) ||
    (structureChunk.person &&
      !structureChunk.person.filter((traitValue) => traitValue !== "1per")
        .length)
  ) {
    consol.log(
      "vevx removeIncompatibleTraitValues. Removing 'n' if present as is nounPerson."
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
