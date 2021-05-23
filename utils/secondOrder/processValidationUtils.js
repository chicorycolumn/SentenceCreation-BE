const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const pvUtils = require("./processValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.checkDecisiveDecant = (questionSentenceData) => {
  questionSentenceData.questionOutputArr.forEach((outputUnit, index) => {
    if (outputUnit.structureChunk.dontSpecifyOnThisChunk) {
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

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      if (
        ![
          "andTags",
          "orTags",
          "specificIds",
          "specificLemmas",
          "educatorBlocksAnnotationsForTheseFeatures",
        ].includes(featureKey) &&
        Array.isArray(featureValue) &&
        featureValue.length > 1
      ) {
        consol.log(
          "[1;31m " + `#WARN oyxp fetchPalette. structureChunk is:` + "[0m",
          structureChunk
        );
        consol.throw("#ERR oyxp fetchPalette. featureKey: " + featureKey);
      }
    });
  });
};
