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

    let structureChunkTraitsRef = refFxn.getStructureChunkTraits(lang);

    Object.keys(structureChunk).forEach((traitKey) => {
      let traitValue = structureChunk[traitKey];

      let reference = structureChunkTraitsRef[traitKey];

      try {
        reference.needsNoValidation;
      } catch (err) {
        consol.throw(
          `\n\nmzod traitKey: "${traitKey}" not found on refObj.structureChunkTraits\n\n`,
          err
        );
      }

      if (
        ["fix"].includes(gpUtils.getWordtypeStCh(structureChunk)) ||
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
          `#ERR kchk "${lang}" validateSentenceFormula. : Expected the value of traitKey "${traitKey}" on stCh "${chunkId}" to be type ${expectedTypeOnStCh} but got type ${uUtils.typeof(
            traitValue
          )}.`
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
              !/^_/.test(traitValueItem) &&
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

      //4. Check if the traitValue of agreementTraits is an existing chunkId.
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

  //5 Ensure agreeWith chains are no more than 3 members. ie Z can agree with Y which agrees with X, but no more levels allowed.
  let agreeRecords = sentenceFormula.sentenceStructure
    .map((stCh) => {
      return { chunkId: stCh.chunkId, agreeWith: stCh.agreeWith };
    })
    .filter((agreeRecord) => agreeRecord.agreeWith);

  let doubleAgreeRecords = agreeRecords.filter((agreeRecord) =>
    agreeRecords.some((singleAR) => singleAR.chunkId === agreeRecord.agreeWith)
  );

  let tripleAgreeRecords = agreeRecords.filter((agreeRecord) =>
    doubleAgreeRecords.some(
      (doubleAR) => doubleAR.chunkId === agreeRecord.agreeWith
    )
  );

  if (tripleAgreeRecords.length) {
    console.log(">>", tripleAgreeRecords);
    consol.throw(
      `shgs An agreeWith chain of more than 3 members (or a circular one?) was found, find in printout >> above.`
    );
  }
};

exports.validateLang = (langCode, label) => {
  if (!Object.keys(refObj.acceptedLanguages).includes(langCode)) {
    consol.throw(
      `lmgt${label} Not an accepted language code:`,
      questionLanguage
    );
  }
};
