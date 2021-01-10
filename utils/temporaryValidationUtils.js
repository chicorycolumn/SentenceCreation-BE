exports.validateSentenceFormula = (sentenceFormula) => {
  // console.log("d22");

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
    // console.log("e22", structureChunk);

    arrayFeatures.forEach((arrayFeature) => {
      if (
        structureChunk[arrayFeature] &&
        !Array.isArray(structureChunk[arrayFeature])
      ) {
        throw `#ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId} with ${arrayFeature} NOT an array.`;
      }
    });

    stringFeatures.forEach((stringFeature) => {
      if (
        structureChunk[stringFeature] &&
        !(typeof structureChunk[stringFeature] === "string")
      ) {
        throw `#ERR ----------------------------------------------------------------------> ${sentenceFormula.sentenceFormulaId} had ${structureChunk.chunkId}'s ***${stringFeature}*** NOT a string.`;
      }
    });
  });
};
