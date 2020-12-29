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
    hideClarifiers,
    hideSpecifiers,
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

  console.log("palette.model > questionSentenceData.arrayOfOutputArrays");
  gpUtils.consoleLogObjectAtTwoLevels(questionSentenceData.arrayOfOutputArrays);

  let questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData.arrayOfOutputArrays,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation,
    kumquat,
    questionLanguage,
    answerLanguage,
    hideClarifiers,
    hideSpecifiers
  );

  console.log(
    "palette.model > questionResponseObj before answer is sought",
    questionResponseObj
  );

  if (true) {
    console.log(
      "▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │"
    );
    console.log(
      "║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║"
    );
    console.log(
      "█ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌"
    );
    console.log(
      "║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │"
    );
  }

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
        answerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat,
          answerLanguage,
          null
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat,
          answerLanguage,
          null
        );

        subsequentAnswerResponseObj.finalSentenceArr.forEach(
          (finalSentence) => {
            answerResponseObj.finalSentenceArr.push(finalSentence);
          }
        );
      }
    });

    scUtils.removeDuplicatesFromResponseObject(answerResponseObj);
  }

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

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};
