const gpUtils = require("./generalPurposeUtils.js");

// exports.

//All feature values must be correct types.
exports.validateType = (sentenceFormula) => {
  const arrayFeatures = [
    "specificLemmas",
    "specificIds",
    "tenseDescription",
    "person",
    "gender",
    "number",
    "andTags",
    "gcase",
    "aspect",
    "form",
    "tense",
  ];

  const stringFeatures = [
    "chunkId",
    "wordtype",
    "agreeWith",
    "postHocAgreeWithPrimary",
    "postHocAgreeWithSecondary",
    "postHocAgreeWithTertiary",
    "value",
  ];

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    arrayFeatures.forEach((arrayFeature) => {
      if (
        structureChunk[arrayFeature] &&
        !Array.isArray(structureChunk[arrayFeature])
      ) {
        gpUtils.throw(
          `lnqk validateType #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId} with ${arrayFeature} NOT an array.`
        );
      }
    });

    stringFeatures.forEach((stringFeature) => {
      if (
        structureChunk[stringFeature] &&
        !(typeof structureChunk[stringFeature] === "string")
      ) {
        gpUtils.throw(
          `mhuk validateType #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId}'s ***${stringFeature}*** NOT a string.`
        );
      }
    });
  });
};
