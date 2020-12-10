const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");

exports.fetchPalette = (req) => {
  let kumquat = true;

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
    useDummy,
    kumquat
  );

  let questionResponseObj = scUtils.formatFinalSentence(
    questionSentenceData.outputArr,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation,
    kumquat
  );

  console.log("$$$$$$$$$$$$$$$$$");
  console.log("questionResponseObj", questionResponseObj);
  console.log("$$$$$$$$$$$$$$$$$");

  let answerResponseObj;

  if (answerLanguage) {
    kumquat = true;

    questionSentenceData.outputArr.forEach((outputArrItem) => {
      //This should now be unnec as we've told it in the refobj not to transfer gender from noun. Not allowable transfer.
      if (outputArrItem.structureChunk.wordtype === "noun") {
        delete outputArrItem.structureChunk.gender;
      }
      /////
    });

    let answerSentenceData = scUtils.processSentenceFormula(
      answerLanguage,
      questionSentenceData.sentenceNumber,
      questionSentenceData.sentenceSymbol,
      useDummy,
      kumquat,
      questionSentenceData.outputArr,
      questionLanguage
    );

    answerResponseObj = scUtils.formatFinalSentence(
      answerSentenceData.outputArr,
      answerSentenceData.sentenceFormula,
      answerSentenceData.errorInSentenceCreation,
      kumquat,
      questionLanguage
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

  // console.log(".........v", combinedResponseObj, ".........^");

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};
