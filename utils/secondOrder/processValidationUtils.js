const gpUtils = require("../generalPurposeUtils.js");
const idUtils = require("../identityUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const pvUtils = require("./processValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.checkDecisiveDecant = (questionSentenceData, questionLanguage) => {
  questionSentenceData.questionOutputArr.forEach((outputUnit, index) => {
    if (
      outputUnit.structureChunk.dontSpecifyOnThisChunk ||
      idUtils.getWordtypeStCh(outputUnit.structureChunk) === "fix"
    ) {
      return;
    }

    let { structureChunk, selectedLemmaObject } = outputUnit;

    if ("console") {
      consol.log(
        "[1;35m " +
          `vmfg-fetchPalette stCh "${structureChunk.chunkId}" at index "${index}"` +
          "[0m"
      );
      consol.log(
        "[1;35m " + `vmfg-fetchPalette slObj "${selectedLemmaObject.lemma}"` + "[0m"
      );
      consol.log(" ");
    }

    Object.keys(structureChunk).forEach((traitKey) => {
      let traitValue = structureChunk[traitKey];
      consol.logSpecial(
        4,
        `oyxp to check "${structureChunk.chunkId}" for "${traitKey}": [${traitValue}]`
      );

      let traitsAllowedToHaveMultipleValues = Object.keys(
        refObj.structureChunkTraits.ALL
      ).filter(
        (traitKey) =>
          refObj.structureChunkTraits.ALL[traitKey]
            .ultimatelyMultipleTraitValuesOkay
      );

      if (
        !traitsAllowedToHaveMultipleValues.includes(traitKey) &&
        Array.isArray(traitValue) &&
        traitValue.length > 1
      ) {
        consol.log(
          "[1;31m " + `#WARN oyxp checkDecisiveDecant. structureChunk is:` + "[0m",
          structureChunk
        );
        consol.throw(
          `#ERR oyxp checkDecisiveDecant. traitKey: "${traitKey}" not in traitsAllowedToHaveMultipleValues, was given traitValue: "${traitValue}"`
        );
      }
    });
  });
};
