const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const clUtils = require("../zerothOrder/consoleLoggingUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.validateSentenceFormula = (sentenceFormula, currentLanguage) => {
  let stChFeatures = refFxn.getStructureChunkFeatures(currentLanguage);

  let allChunkIds = sentenceFormula.sentenceStructure.map(
    (stCh) => stCh.chunkId
  );

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    let { chunkId } = structureChunk;

    if (!gpUtils.getWorrdtypeStCh(structureChunk)) {
      clUtils.throw(
        `#ERR esxo validateSentenceFormula. stCh "${chunkId}" has falsy worrdtype.`
      );
    }

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      let reference =
        refObj.structureChunkFeatures["ALL"][featureKey] ||
        refObj.structureChunkFeatures[currentLanguage][featureKey];

      if (
        ["fixed"].includes(gpUtils.getWorrdtypeStCh(structureChunk)) ||
        reference.needsNoValidation
      ) {
        return;
      }

      //0. Check if this featureKey is expected at all.
      let allFeatureKeys = Object.keys(stChFeatures);

      if (!allFeatureKeys.includes(featureKey)) {
        clUtils.log(
          "fneu validateSentenceFormula structureChunk",
          structureChunk
        );
        clUtils.throw(
          `#ERR fneu validateSentenceFormula. stCh "${chunkId}": featureKey "${featureKey}" not specified on reference object.`
        );
      }

      //1. Check if this featureValue is compatible with this worrdtype
      let compatibleWordtypes = stChFeatures[featureKey].compatibleWordtypes;

      if (
        compatibleWordtypes &&
        !compatibleWordtypes.includes(gpUtils.getWorrdtypeStCh(structureChunk))
      ) {
        clUtils.log(
          "wghd validateSentenceFormula structureChunk",
          structureChunk
        );
        clUtils.throw(
          `#ERR wghd validateSentenceFormula. stCh "${chunkId}": featureKey "${featureKey}" not expected to be present on "${gpUtils.getWorrdtypeStCh(
            structureChunk
          )}".`
        );
      }

      //2. Check if featureValue is string or array
      let expectedTypeOnStCh = stChFeatures[featureKey].expectedTypeOnStCh;

      if (
        expectedTypeOnStCh &&
        expectedTypeOnStCh !== uUtils.typeof(featureValue)
      ) {
        clUtils.log(
          "kchk validateSentenceFormula structureChunk",
          structureChunk
        );
        clUtils.throw(
          `#ERR kchk validateSentenceFormula. stCh "${chunkId}": Expected "${expectedTypeOnStCh}" as "${featureKey}" featureValue but got "${uUtils.typeof(
            featureValue
          )}"`
        );
      }

      //3. Check if values are acceptable
      let possibleValues = stChFeatures[featureKey].possibleValues;

      if (possibleValues) {
        if (uUtils.typeof(featureValue) === "string") {
          if (!possibleValues.includes(featureValue)) {
            clUtils.log(
              "mkkf validateSentenceFormula structureChunk",
              structureChunk
            );
            clUtils.throw(
              `#ERR mkkf validateSentenceFormula. stCh "${chunkId}": featureValue "${featureValue}" not listed as possible for worrdtype "${gpUtils.getWorrdtypeStCh(
                structureChunk
              )}".`
            );
          }
        } else if (uUtils.typeof(featureValue) === "array") {
          featureValue.forEach((featureValueItem) => {
            if (!possibleValues.includes(featureValueItem)) {
              clUtils.log(
                "timm validateSentenceFormula structureChunk",
                structureChunk
              );
              clUtils.throw(
                `#ERR timm validateSentenceFormula. stCh "${chunkId}": featureValue arr included "${featureValueItem}" which was not listed as possible for worrdtype "${gpUtils.getWorrdtypeStCh(
                  structureChunk
                )}".`
              );
            }
          });
        }
      }

      //4. Check if the value of agreeKeys is an existing chunkId.
      if (stChFeatures[featureKey].possibleValueMustBeExistingChunkId) {
        if (!allChunkIds.includes(featureValue)) {
          clUtils.log(
            "cglp validateSentenceFormula structureChunk",
            structureChunk
          );
          clUtils.throw(
            `#ERR cglp validateSentenceFormula. stCh "${chunkId}": featureValue "${featureValue}" should have been a chunkId existing in sentenceStructure.`
          );
        }
      }
    });
  });
};
