const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../utils/specificPolishUtils.js");
const refObj = require("../utils/referenceObjects.js");
const createSentence = require("../utils/createSentence.js");

exports.fetchPalette = (req) => {
  let { sentenceNumber, sentenceSymbol, useDummy } = req.body;

  let questionSentenceData = createSentence.createSentence(
    "POL",
    sentenceNumber,
    sentenceSymbol,
    useDummy
  );

  // questionSentenceData.resultArr;
  // questionSentenceData.sentenceFormula;
  // questionSentenceData.sentenceNumber;
  // questionSentenceData.sentenceSymbol;
  // questionSentenceData.errorInSentenceCreation;

  console.log(
    ">>End of palette.model>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> resultArr",
    questionSentenceData.resultArr
  );

  let questionResponseObj = formatFinalSentence(
    questionSentenceData.resultArr,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation
  );

  console.log(
    ">>End of palette.model>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> palette",
    questionResponseObj.palette
  );

  let answerSentenceData = createSentence.createSentence(
    "ENG",
    questionSentenceData.sentenceNumber,
    questionSentenceData.sentenceSymbol,
    useDummy,
    true,
    questionSentenceData.resultArr
  );

  console.log("Did it work??");
  console.log("answerSentenceData", answerSentenceData);

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

  return Promise.all([questionResponseObj]).then((array) => {
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

    questionResponseObj = {
      message: "No sentence could be created from the specifications.",
      fragment: finalSentence,
      palette: null,
      errorMessage,
    };
  } else {
    questionResponseObj = {
      palette: finalSentence,
    };
  }

  return questionResponseObj;
}
