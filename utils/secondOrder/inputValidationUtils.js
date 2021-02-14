const gpUtils = require("../generalPurposeUtils.js");
const ivUtils = require("./inputValidationUtils.js");
const refObj = require("../reference/referenceObjects.js");

exports.validateSentenceFormula = (sentenceFormula, currentLanguage) => {
  let stChFeaturesRef = refObj.structureChunkFeatures[currentLanguage];
  let allChunkIds = sentenceFormula.sentenceStructure.map(
    (stCh) => stCh.chunkId
  );

  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    let wordtype = structureChunk.wordtype;
    let { chunkId } = structureChunk;

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      if (
        ["fixed"].includes(wordtype) ||
        [
          "wordtype",
          "importantFeatures",
          "pleaseShowMultipleWordtypeAllohomClarifiers",
        ].includes(featureKey)
      ) {
        return;
      }

      console.log("hsat validateSentenceFormula", {
        currentLanguage,
        wordtype,
        featureKey,
        featureValue,
      });

      //0. Check if this featureKey is expected at all.
      let allFeatureKeys = Object.keys(stChFeaturesRef);
      if (!allFeatureKeys.includes(featureKey)) {
        console.log(
          "fneu validateSentenceFormula structureChunk",
          structureChunk
        );
        gpUtils.throw(
          `fneu validateSentenceFormula #ERR on "${chunkId}": featureKey "${featureKey}" not specified on reference object.`
        );
      }

      //1. Check if this featureValue is compatible with this wordtype
      let compatibleWordtypes = stChFeaturesRef[featureKey].compatibleWordtypes;
      if (compatibleWordtypes && !compatibleWordtypes.includes(wordtype)) {
        console.log(
          "wghd validateSentenceFormula structureChunk",
          structureChunk
        );
        gpUtils.throw(
          `wghd validateSentenceFormula #ERR on "${chunkId}": featureKey "${featureKey}" not expected to be present on "${wordtype}".`
        );
      }

      //2. Check if featureValue is string or array d'acc
      let expectedTypeOnStCh = stChFeaturesRef[featureKey].expectedTypeOnStCh;
      if (
        expectedTypeOnStCh &&
        expectedTypeOnStCh !== gpUtils.typeof(featureValue)
      ) {
        console.log(
          "kchk validateSentenceFormula structureChunk",
          structureChunk
        );
        gpUtils.throw(
          `kchk validateSentenceFormula #ERR on "${chunkId}": Expected "${expectedTypeOnStCh}" as "${featureKey}" featureValue but got "${gpUtils.typeof(
            featureValue
          )}"`
        );
      }

      //3. Check if all values in featureValue if arr or string, are in this arr:
      //   Zeta: Interesting that even though it will throw error if a metafeature is present in the array, it doesn't throw.
      let possibleValues = stChFeaturesRef[featureKey].possibleValues;

      if (possibleValues) {
        if (gpUtils.typeof(featureValue) === "string") {
          if (!possibleValues.includes(featureValue)) {
            console.log(
              "mkkf validateSentenceFormula structureChunk",
              structureChunk
            );
            gpUtils.throw(
              `mkkf validateSentenceFormula #ERR on "${chunkId}": featureValue "${featureValue}" not listed as possible for wordtype "${wordtype}".`
            );
          }
        } else if (gpUtils.typeof(featureValue) === "array") {
          featureValue.forEach((featureValueItem) => {
            if (!possibleValues.includes(featureValueItem)) {
              console.log(
                "timm validateSentenceFormula structureChunk",
                structureChunk
              );
              gpUtils.throw(
                `timm validateSentenceFormula #ERR on "${chunkId}": featureValue arr included "${featureValueItem}" which was not listed as possible for wordtype "${wordtype}".`
              );
            }
          });
        }
      }

      //4. Check if the value of agreeWith kind of features is actually a structureChunk chunkId.
      if (stChFeaturesRef[featureKey].possibleValueMustBeExistingChunkId) {
        if (!allChunkIds.includes(featureValue)) {
          console.log(
            "cglp validateSentenceFormula structureChunk",
            structureChunk
          );
          gpUtils.throw(
            `cglp validateSentenceFormula #ERR on ${chunkId}: featureValue ${featureValue} should have been a chunkId existing in sentenceStructure.`
          );
        }
      }
    });
  });
};
