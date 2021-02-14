const gpUtils = require("../generalPurposeUtils.js");
const ivUtils = require("./inputValidationUtils.js");

exports.validateSentenceFormula = (sentenceFormula, currentLanguage) => {
  ivUtils.validateValueType(sentenceFormula, currentLanguage);
};

//All feature values must be correct types.
exports.validateValueType = (sentenceFormula, currentLanguage) => {
  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    console.log("hsat");
    Object.keys(structureChunk).forEach((featureKey) => {
      console.log(featureKey);
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
