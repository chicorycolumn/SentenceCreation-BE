const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../utils/specificPolishUtils.js");
const refObj = require("../utils/referenceObjects.js");
const createSentence = require("../utils/createSentence.js");

exports.fetchPalette = (req) => {
  let { sentenceNumber, sentenceSymbol, useDummy } = req.body;

  let createdSentenceData1 = createSentence.createSentence(
    "POL",
    sentenceNumber,
    sentenceSymbol,
    useDummy
  );

  let resultArr1 = createdSentenceData1.resultArr;
  let sentenceFormula1 = createdSentenceData1.sentenceFormula;
  let sentenceNumber1 = createdSentenceData1.sentenceNumber;
  let sentenceSymbol1 = createdSentenceData1.sentenceSymbol;
  let errorInSentenceCreation1 = createdSentenceData1.errorInSentenceCreation;

  console.log(
    ">>End of palette.model>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> resultArr",
    resultArr1
  );

  let responseObj = formatFinalSentence(
    resultArr1,
    sentenceFormula1,
    errorInSentenceCreation1
  );

  console.log(
    ">>End of palette.model>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> palette",
    responseObj.palette
  );

  let createdSentenceData2 = createSentence.createSentence(
    "ENG",
    sentenceNumber1,
    sentenceSymbol1,
    useDummy,
    true
  );

  // sentenceStructure.forEach((chunk) => {
  // if (chunk.wordtype === "noun") {
  // delete chunk.gender;
  // }
  // });

  // let resultArr2 = createdSentenceData2.resultArr;
  // let sentenceFormula2 = createdSentenceData2.sentenceFormula;
  // let sentenceNumber2 = createdSentenceData2.sentenceNumber;
  // let sentenceSymbol2 = createdSentenceData2.sentenceSymbol;
  // let errorInSentenceCreation2 = createdSentenceData2.errorInSentenceCreation;

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
