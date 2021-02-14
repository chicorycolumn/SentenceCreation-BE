const gpUtils = require("../generalPurposeUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");

exports.validateSentenceFormula = (sentenceFormula, currentLanguage) => {
  let stChFeaturesRef = refObj.structureChunkFeatures[currentLanguage];

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    let wordtype = structureChunk.wordtype;
    let { chunkId } = structureChunk;

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      if (["fixed"].includes(wordtype) || ["wordtype"].includes(featureKey)) {
        return;
      }

      console.log("hsat validateSentenceFormula", {
        wordtype,
        featureKey,
        featureValue,
      });

      //1. Check if this featureValue is compatible with this wordtype
      let compatibleWordtypes = stChFeaturesRef[featureKey].compatibleWordtypes;
      if (compatibleWordtypes && !compatibleWordtypes.includes(wordtype)) {
        gpUtils.throw(
          `wghd validateSentenceFormula #ERR on ${chunkId}: wordtype ${wordtype} not present in compatibleWordtypes for featureKey ${featureKey}.`
        );
      }

      //2. Check if featureValue is string or array d'acc
      let expectedTypeOnStCh = stChFeaturesRef[featureKey].expectedTypeOnStCh;
      if (
        expectedTypeOnStCh &&
        expectedTypeOnStCh !== gpUtils.typeof(featureValue)
      ) {
        gpUtils.throw(
          `kchk validateSentenceFormula #ERR on ${chunkId}: Expected ${expectedTypeOnStCh} as ${featureKey} featureValue but got ${gpUtils.typeof(
            featureValue
          )}`
        );
      }

      //3. Check if all values in featureValue if arr or string, are in this arr:
      //   Remember to include metaFeatures.
      let possibleValues = stChFeaturesRef[featureKey].possibleValues;

      if (possibleValues) {
        if (gpUtils.typeof(featureValue) === "string") {
          if (!possibleValues.includes(featureValue)) {
            gpUtils.throw(
              `mkkf validateSentenceFormula #ERR on ${chunkId}: featureValue ${featureValue} not listed as possible for wordtype ${wordtype}.`
            );
          }
        } else if (gpUtils.typeof(featureValue) === "array") {
          featureValue.forEach((featureValueItem) => {
            if (!possibleValues.includes(featureValueItem)) {
              gpUtils.throw(
                `timm validateSentenceFormula #ERR on ${chunkId}: featureValue arr included ${featureValueItem} which was not listed as possible for wordtype ${wordtype}.`
              );
            }
          });
        }
      }
    });

    // arrayFeatures.forEach((arrayFeature) => {
    //   if (
    //     structureChunk[arrayFeature] &&
    //     !Array.isArray(structureChunk[arrayFeature])
    //   ) {
    //     gpUtils.throw(
    //       `lnqk validateType #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId} with ${arrayFeature} NOT an array.`
    //     );
    //   }
    // });

    // stringFeatures.forEach((stringFeature) => {
    //   if (
    //     structureChunk[stringFeature] &&
    //     !(typeof structureChunk[stringFeature] === "string")
    //   ) {
    //     gpUtils.throw(
    //       `mhuk validateType #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId}'s ***${stringFeature}*** NOT a string.`
    //     );
    //   }
    // });
  });
};
