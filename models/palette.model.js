const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../utils/specificPolishUtils.js");
const refObj = require("../utils/referenceObjects.js");
const createSentence = require("../utils/createSentence.js");

exports.fetchPalette = (req) => {
  let { sentenceNumber, sentenceSymbol, useDummy } = req.body;

  let {
    resultArr,
    sentenceFormula,
    errorInSentenceCreation,
  } = createSentence.createSentence(
    "POL",
    sentenceNumber,
    sentenceSymbol,
    useDummy
  );

  console.log(">>End of palette.model resultArr", resultArr);

  let responseObj = formatFinalSentence(
    resultArr,
    sentenceFormula,
    errorInSentenceCreation
  );

  let createdSentenceData2 = createSentence.createSentence(
    "ENG",
    sentenceNumber,
    null,
    null,
    useDummy
  );

  // let resultArr2 = createdSentenceData2.resultArr;
  // let sentenceFormula2 = createdSentenceData2.sentenceFormula;
  // let errorInSentenceCreation2 = createdSentenceData2.errorInSentenceCreation;

  // sentenceStructure.forEach((chunk) => {
  // if (chunk.wordtype === "noun") {
  // delete chunk.gender;
  // }
  // });

  //Now bring the features from sentenceStructure (POL) and add them to the matching chunkId chunks from ENG structure.

  return Promise.all([responseObj]).then((array) => {
    return array[0];
  });
};

function formatFinalSentence(
  resultArr,
  sentenceFormula,
  errorInSentenceCreation
) {
  let finalSentence = scUtils.buildSentenceFromArray(
    resultArr,
    sentenceFormula
  );

  if (errorInSentenceCreation.errorMessage) {
    let errorMessage = {
      errorInSentenceCreation: errorInSentenceCreation.errorMessage,
    };

    responseObj = {
      message: "No sentence could be created from the specifications.",
      fragment: finalSentence,
      palette: null,
      errorMessage,
    };
  } else {
    responseObj = {
      palette: finalSentence,
    };
  }

  return responseObj;
}
