const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.validateSentenceFormula = (sentenceFormula, currentLanguage) => {
  let stChTraits = refFxn.getstructureChunkTraits(currentLanguage);

  let allChunkIds = sentenceFormula.sentenceStructure.map(
    (stCh) => stCh.chunkId
  );

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    let { chunkId } = structureChunk;

    if (!gpUtils.getWordtypeStCh(structureChunk)) {
      consol.throw(
        `#ERR esxo validateSentenceFormula. stCh "${chunkId}" has falsy wordtype.`
      );
    }

    Object.keys(structureChunk).forEach((traitKey) => {
      let traitValue = structureChunk[traitKey];

      let reference =
        refObj.structureChunkTraits[currentLanguage][traitKey] ||
        refObj.structureChunkTraits["ALL"][traitKey];

      if (
        ["fixed"].includes(gpUtils.getWordtypeStCh(structureChunk)) ||
        reference.needsNoValidation
      ) {
        return;
      }

      //0. Check if this traitKey is expected at all.
      let allTraitKeys = Object.keys(stChTraits);

      if (!allTraitKeys.includes(traitKey)) {
        consol.log(
          "fneu validateSentenceFormula structureChunk",
          structureChunk
        );
        consol.throw(
          `#ERR fneu validateSentenceFormula. stCh "${chunkId}": traitKey "${traitKey}" not specified on reference object.`
        );
      }

      //1. Check if this traitValue is compatible with this wordtype
      let compatibleWordtypes = stChTraits[traitKey].compatibleWordtypes;

      if (
        compatibleWordtypes &&
        !compatibleWordtypes.includes(gpUtils.getWordtypeStCh(structureChunk))
      ) {
        consol.log(
          "wghd validateSentenceFormula structureChunk",
          structureChunk
        );
        consol.throw(
          `#ERR wghd validateSentenceFormula. stCh "${chunkId}": traitKey "${traitKey}" not expected to be present on "${gpUtils.getWordtypeStCh(
            structureChunk
          )}".`
        );
      }

      //2. Check if traitValue is string or array
      let expectedTypeOnStCh = stChTraits[traitKey].expectedTypeOnStCh;

      if (
        expectedTypeOnStCh &&
        expectedTypeOnStCh !== uUtils.typeof(traitValue)
      ) {
        consol.log(
          "kchk validateSentenceFormula structureChunk",
          structureChunk
        );
        consol.throw(
          `#ERR kchk validateSentenceFormula. stCh "${chunkId}": Expected "${expectedTypeOnStCh}" as "${traitKey}" traitValue but got "${uUtils.typeof(
            traitValue
          )}"`
        );
      }

      //3. Check if traitValues are acceptable
      let possibleTraitValues = stChTraits[traitKey].possibleTraitValues;

      if (possibleTraitValues) {
        if (uUtils.typeof(traitValue) === "string") {
          if (!possibleTraitValues.includes(traitValue)) {
            consol.log(
              "mkkf validateSentenceFormula structureChunk",
              structureChunk
            );
            consol.throw(
              `#ERR mkkf validateSentenceFormula. stCh "${chunkId}": traitValue "${traitValue}" not listed as possible for wordtype "${gpUtils.getWordtypeStCh(
                structureChunk
              )}".`
            );
          }
        } else if (uUtils.typeof(traitValue) === "array") {
          traitValue.forEach((traitValueItem) => {
            if (!possibleTraitValues.includes(traitValueItem)) {
              consol.log(
                "timm validateSentenceFormula structureChunk",
                structureChunk
              );
              consol.throw(
                `#ERR timm validateSentenceFormula. stCh "${chunkId}": traitValue arr included "${traitValueItem}" which was not listed as possible for wordtype "${gpUtils.getWordtypeStCh(
                  structureChunk
                )}".`
              );
            }
          });
        }
      }

      //4. Check if the traitValue of agreeKeys is an existing chunkId.
      if (stChTraits[traitKey].mustBeExistingChunkId) {
        if (!allChunkIds.includes(traitValue)) {
          consol.log(
            "cglp validateSentenceFormula structureChunk",
            structureChunk
          );
          consol.throw(
            `#ERR cglp validateSentenceFormula. stCh "${chunkId}": traitValue "${traitValue}" should have been a chunkId existing in sentenceStructure.`
          );
        }
      }
    });
  });
};
