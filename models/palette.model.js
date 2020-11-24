const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const POLUtils = require("../source/POL/polishUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");

exports.fetchPalette = (req) => {
  let {
    sentenceNumber,
    sentenceSymbol,
    useDummy,
    questionLanguage,
    answerLanguage,
  } = req.body;

  let questionSentenceData = scUtils.processSentenceFormula(
    questionLanguage,
    sentenceNumber,
    sentenceSymbol,
    useDummy
  );

  let questionResponseObj = scUtils.formatFinalSentence(
    questionSentenceData.resultArr,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation
  );

  let answerResponseObj;

  if (answerLanguage) {
    questionSentenceData.resultArr.forEach((resArrItem) => {
      if (resArrItem.structureChunk.wordtype === "noun") {
        delete resArrItem.structureChunk.gender;
      }
    });

    let answerSentenceData = scUtils.processSentenceFormula(
      answerLanguage,
      questionSentenceData.sentenceNumber,
      questionSentenceData.sentenceSymbol,
      useDummy,
      true,
      questionSentenceData.resultArr
    );

    answerResponseObj = scUtils.formatFinalSentence(
      answerSentenceData.resultArr,
      answerSentenceData.sentenceFormula,
      answerSentenceData.errorInSentenceCreation
    );
  }

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

  console.log(".........v", combinedResponseObj, ".........^");

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};
