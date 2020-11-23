const scUtils = require("../utils/sentenceCreationUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../utils/specificPolishUtils.js");
const refObj = require("../utils/referenceObjects.js");
const createSentence = require("../utils/createSentence.js");

exports.fetchPalette = (req) => {
  let {
    sentenceNumber,
    sentenceSymbol,
    useDummy,
    onlyGenerateQuestionSentence,
  } = req.body;

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
    questionResponseObj.questionSentence
  );

  // questionSentenceData.resultArr.sentenceStructure.forEach((chunk) => {
  // if (chunk.wordtype === "noun") {
  // delete chunk.gender;
  // }
  // });
  if (!onlyGenerateQuestionSentence) {
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

    let answerResponseObj = formatFinalSentence(
      answerSentenceData.resultArr,
      answerSentenceData.sentenceFormula,
      answerSentenceData.errorInSentenceCreation
    );

    console.log("*******");
    console.log("***************");
    console.log("***********************");
    console.log(answerResponseObj.questionSentence);
  }

  // answerSentenceData.resultArr;
  // answerSentenceData.sentenceFormula;
  // answerSentenceData.sentenceNumber;
  // answerSentenceData.sentenceSymbol;
  // answerSentenceData.errorInSentenceCreation;

  console.log(questionResponseObj.questionSentence);
  console.log("***********************");
  console.log("***************");
  console.log("*******");

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
      questionSentence: null,
      errorMessage,
    };
  } else {
    questionResponseObj = {
      questionSentence: finalSentence,
    };
  }

  return questionResponseObj;
}
