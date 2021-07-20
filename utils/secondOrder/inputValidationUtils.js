const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.validateSentenceFormula = (sentenceFormula, lang) => {
  let stChTraits = refFxn.getStructureChunkTraits(lang);

  let allChunkIds = sentenceFormula.sentenceStructure.map(
    (stCh) => stCh.chunkId
  );

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    let { chunkId } = structureChunk;

    if (!gpUtils.getWordtypeStCh(structureChunk)) {
      consol.throw(
        `#ERR esxo "${lang}" validateSentenceFormula. stCh "${chunkId}" has falsy wordtype.`
      );
    }

    Object.keys(structureChunk).forEach((traitKey) => {
      let traitValue = structureChunk[traitKey];

      let reference =
        refObj.structureChunkTraits[lang][traitKey] ||
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
          `fneu "${lang}" validateSentenceFormula structureChunk`,
          structureChunk
        );
        consol.throw(
          `#ERR fneu "${lang}" validateSentenceFormula. stCh "${chunkId}": traitKey "${traitKey}" not specified on reference object.`
        );
      }

      //1. Check if this traitValue is compatible with this wordtype
      let compatibleWordtypes = stChTraits[traitKey].compatibleWordtypes;

      if (
        compatibleWordtypes &&
        !compatibleWordtypes.includes(gpUtils.getWordtypeStCh(structureChunk))
      ) {
        consol.log(
          `wghd "${lang}" validateSentenceFormula structureChunk`,
          structureChunk
        );
        consol.throw(
          `#ERR wghd "${lang}" validateSentenceFormula. stCh "${chunkId}": traitKey "${traitKey}" not expected to be present on "${gpUtils.getWordtypeStCh(
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
          `kchk "${lang}" validateSentenceFormula structureChunk`,
          structureChunk
        );
        consol.throw(
          `#ERR kchk "${lang}" validateSentenceFormula. stCh "${chunkId}": Expected "${expectedTypeOnStCh}" as "${traitKey}" traitValue but got "${uUtils.typeof(
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
              `mkkf "${lang}" validateSentenceFormula structureChunk`,
              structureChunk
            );
            consol.throw(
              `#ERR mkkf "${lang}" validateSentenceFormula. stCh "${chunkId}": traitValue "${traitValue}" not listed as possible for wordtype "${gpUtils.getWordtypeStCh(
                structureChunk
              )}".`
            );
          }
        } else if (uUtils.typeof(traitValue) === "array") {
          traitValue.forEach((traitValueItem) => {
            if (
              !/^all/.test(traitValueItem) &&
              !possibleTraitValues.includes(traitValueItem)
            ) {
              consol.log(
                `timm "${lang}" validateSentenceFormula structureChunk`,
                structureChunk
              );
              consol.throw(
                `#ERR timm "${lang}" validateSentenceFormula. stCh "${chunkId}": traitValue arr included "${traitValueItem}" which was not listed as possible for wordtype "${gpUtils.getWordtypeStCh(
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
            `cglp "${lang}" validateSentenceFormula structureChunk`,
            structureChunk
          );
          consol.throw(
            `#ERR cglp "${lang}" validateSentenceFormula. stCh "${chunkId}": traitValue "${traitValue}" should have been a chunkId existing in sentenceStructure.`
          );
        }
      }
    });
  });
};
