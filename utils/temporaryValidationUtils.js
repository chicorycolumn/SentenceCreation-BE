const gpUtils = require("./generalPurposeUtils.js");

exports.validateSentenceFormula = (sentenceFormula) => {
  let arrayFeatures = [
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

  let stringFeatures = [
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
          `lnqk validateSentenceFormula #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId} with ${arrayFeature} NOT an array.`
        );
      }
    });

    stringFeatures.forEach((stringFeature) => {
      if (
        structureChunk[stringFeature] &&
        !(typeof structureChunk[stringFeature] === "string")
      ) {
        gpUtils.throw(
          `mhuk validateSentenceFormula #ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId}'s ***${stringFeature}*** NOT a string.`
        );
      }
    });
  });
};
