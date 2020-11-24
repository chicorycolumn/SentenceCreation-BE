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
    omitAnswerSentence,
  } = req.body;

  let questionResponseObj;
  let answerResponseObj;

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

  questionResponseObj = formatFinalSentence(
    questionSentenceData.resultArr,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation
  );

  console.log(
    ">>End of palette.model>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> palette",
    questionResponseObj.questionSentence
  );

  if (!omitAnswerSentence) {
    // console.log(888);
    // console.log(questionSentenceData.resultArr);
    // return;

    questionSentenceData.resultArr.forEach((resArrItem) => {
      if (resArrItem.structureChunk.wordtype === "noun") {
        delete resArrItem.structureChunk.gender;
      }
    });

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

    answerResponseObj = formatFinalSentence(
      answerSentenceData.resultArr,
      answerSentenceData.sentenceFormula,
      answerSentenceData.errorInSentenceCreation
    );

    console.log("*******");
    console.log("***************");
    console.log("***********************");
    console.log(answerResponseObj.finalSentence);
  }

  // answerSentenceData.resultArr;
  // answerSentenceData.sentenceFormula;
  // answerSentenceData.sentenceNumber;
  // answerSentenceData.sentenceSymbol;
  // answerSentenceData.errorInSentenceCreation;

  console.log(questionResponseObj.finalSentence);
  console.log("***********************");
  console.log("***************");
  console.log("*******");

  console.log(questionResponseObj);

  let combinedResponseObj = {};

  [
    { responseObject: questionResponseObj, key: "question" },
    { responseObject: answerResponseObj, key: "answer" },
  ].forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.key + "Sentence"] =
        ref.responseObject.finalSentence;

      if (ref.responseObject.errorMessage) {
        combinedResponseObj[ref.key + "ErrorMessage"] =
          ref.responseObject.errorMessage;
      }
      if (ref.responseObject.message) {
        combinedResponseObj[ref.key + "Message"] = ref.responseObject.message;
      }
      if (ref.responseObject.fragment) {
        combinedResponseObj[ref.key + "Fragment"] = ref.responseObject.fragment;
      }
    }
  });

  console.log("....................v");
  console.log(combinedResponseObj);
  console.log("....................^");

  return Promise.all([combinedResponseObj]).then((array) => {
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
      finalSentence: null,
      errorMessage,
    };
  } else {
    questionResponseObj = {
      finalSentence,
    };
  }

  return questionResponseObj;
}
