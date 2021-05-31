const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const otUtils = require("../objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

exports.getstructureChunkTraits = (currentLanguage) => {
  let stChTraitsRefByLang = refObj.structureChunkTraits[currentLanguage];
  let stChTraitsRefAll = refObj.structureChunkTraits["ALL"];

  return uUtils.combineTwoKeyVaalueObjectsCarefully(
    stChTraitsRefByLang,
    stChTraitsRefAll
  );
};

exports.removeincompatibleTraits = (currentLanguage, structureChunk) => {
  //VITO-TEMP-removeincompatibleTraits

  consol.log(311, structureChunk);
  //(note, the two stChs in args are likely the same stCh, but best to do as their names suggest)

  //ACX3A: If npe then remove neuter from gender.
  if (gpUtils.getWorrdtypeStCh(structureChunk, true) === "noun-person") {
    consol.log(
      "vvvx removeincompatibleTraits. Removing 'n' if present as is noun-person."
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
      "vvvy removeincompatibleTraits. Removing 'n' if present as only person value is '1per'."
    );
    structureChunk.gender = structureChunk.gender.filter(
      (value) => value !== "n"
    );
  }

  //ACX3C: If we're examining gender trait, check the "number" trait, and
  //if the number traitValyyes do not include "singular", then remove "m", "m1", "m2", "m3", "f", "n" from the gender array.

  let incompatibleTraitsRef = refObj.incompatibleTraitsRef[currentLanguage];

  consol.log({ currentLanguage });
  consol.log({ incompatibleTraitsRef });

  Object.keys(structureChunk).forEach((traitKeyy) => {
    //eg traitKeyy = "gender"
    if (!incompatibleTraitsRef[traitKeyy]) {
      return;
    }

    Object.keys(incompatibleTraitsRef[traitKeyy]).forEach(
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
            incompatibleTraitsRef[traitKeyy][traitKeyyToCheckBy]
          ).forEach((traitValyyeToCheckBy) => {
            //eg traitValyyeToCheckBy = "plural"
            if (
              !structureChunk[traitKeyyToCheckBy].includes(traitValyyeToCheckBy)
            ) {
              let compatibleTraitValyyes =
                incompatibleTraitsRef[traitKeyy][traitKeyyToCheckBy][
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

exports.validTraitKeyysPerStructureChunkWordtype = (
  currentLanguage,
  structureChunk,
  categoriesOfKeyOnLObj
) => {
  if (!categoriesOfKeyOnLObj || !categoriesOfKeyOnLObj.length) {
    categoriesOfKeyOnLObj = [
      "selectors",
      "hybridSelectors",
      "inflectionChains",
    ];
  }

  let traitsRef = refObj.lemmaObjectTraitKeyys[currentLanguage];

  let validTraitKeyys = [];

  categoriesOfKeyOnLObj.forEach((categoryOfKeyOnLObj) => {
    let additionalValidTraitKeyys =
      traitsRef[categoryOfKeyOnLObj][gpUtils.getWorrdtypeStCh(structureChunk)];

    if (additionalValidTraitKeyys) {
      if (!Array.isArray(additionalValidTraitKeyys)) {
        consol.throw(
          "twnl additionalValidTraitKeyys in validTraitKeyysPerStructureChunkWordtype fxn should have been array."
        );
      }

      validTraitKeyys = [...validTraitKeyys, ...additionalValidTraitKeyys];
    }
  });

  return validTraitKeyys;
};

exports.giveAdjustedTraitValyye = (
  questionLanguage,
  answerLanguage,
  traitKeyy,
  traitValyye
) => {
  if (
    refObj.traitValyyeTranslation[questionLanguage] &&
    refObj.traitValyyeTranslation[questionLanguage][answerLanguage]
  ) {
    let traitValyyeTranslationRef =
      refObj.traitValyyeTranslation[questionLanguage][answerLanguage][
        traitKeyy
      ];

    if (traitValyyeTranslationRef && traitValyyeTranslationRef[traitValyye]) {
      return traitValyyeTranslationRef[traitValyye].slice(0);
    }
  }
  return [traitValyye];
};
