const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");

exports.fetchPalette = (req) => {
  let kumquat = false;

  let {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy,
    questionLanguage,
    answerLanguage,
  } = req.body;

  let questionSentenceData = scUtils.processSentenceFormula(
    questionLanguage,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy,
    kumquat
  );

  sentenceFormulaId = questionSentenceData.sentenceFormulaId;
  sentenceFormulaSymbol = questionSentenceData.sentenceFormulaSymbol;

  console.log("palette.model > questionSentenceData", questionSentenceData);

  let questionResponseObj = scUtils.formatFinalSentence(
    questionSentenceData.arrayOfOutputArrays,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation,
    kumquat
  );

  let answerResponseObj;

  if (answerLanguage) {
    kumquat = true;

    let translations =
      questionSentenceData.sentenceFormula.translations[answerLanguage];

    if (!translations || !translations.length) {
      throw "palette.model > I was asked to give translations, but the question sentence formula did not have any translations listed.";
    }

    translations.forEach((translationSentenceFormulaId) => {
      let answerSentenceData = scUtils.processSentenceFormula(
        answerLanguage,
        translationSentenceFormulaId,
        sentenceFormulaSymbol,
        useDummy,
        kumquat,
        questionSentenceData.arrayOfOutputArrays[0],
        questionLanguage
      );

      if (!answerResponseObj) {
        answerResponseObj = scUtils.formatFinalSentence(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat
        );

        console.log(
          "#11 answerResponseObj.finalSentenceArr",
          answerResponseObj.finalSentenceArr
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.formatFinalSentence(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat
        );

        console.log(
          "#22 subsequentAnswerResponseObj.finalSentenceArr",
          subsequentAnswerResponseObj.finalSentenceArr
        );

        subsequentAnswerResponseObj.finalSentenceArr.forEach(
          (finalSentence) => {
            answerResponseObj.finalSentenceArr.push(finalSentence);
          }
        );
      }
    });
  }

  console.log("palette.model > answerResponseObj", answerResponseObj);

  let combinedResponseObj = {};

  let refs = [
    { responseObject: questionResponseObj, key: "question" },
    { responseObject: answerResponseObj, key: "answer" },
  ];

  refs.forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.key + "SentenceArr"] =
        ref.responseObject.finalSentenceArr || [];

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

  console.log("palette.model > combinedResponseObj", combinedResponseObj);

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};
