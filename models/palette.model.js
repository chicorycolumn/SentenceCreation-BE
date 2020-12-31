const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");

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

  let { sentenceFormula, words } = scUtils.getMaterials(
    questionLanguage,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy
  );

  let questionSentenceData = scUtils.processSentenceFormula(
    { currentLanguage: questionLanguage },
    sentenceFormula,
    words,
    kumquat
  );

  console.log("palette.model > questionSentenceData.arrayOfOutputArrays");
  gpUtils.consoleLogObjectAtTwoLevels(questionSentenceData.arrayOfOutputArrays);

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
      let { sentenceFormula, words } = scUtils.getMaterials(
        answerLanguage,
        translationSentenceFormulaId,
        questionSentenceData.sentenceFormulaSymbol,
        useDummy
      );

      //addSpecifiers fxn
      //conformAtoQ fxn
      //and then put it through processSentenceFormula

      let languagesObject = {
        answerLanguage,
        questionLanguage,
      };

      let questionOutputArr = questionSentenceData.arrayOfOutputArrays[0];

      scUtils.conformAnswerStructureToQuestionStructure(
        sentenceFormula,
        questionOutputArr,
        languagesObject,
        words
      );

      if (!hideClarifiers) {
        aaUtils.addClarifiers(questionOutputArr, languagesObject);
      }

      if (!hideSpecifiers) {
        aaUtils.addSpecifiers(
          sentenceFormula,
          questionOutputArr,
          languagesObject
        );
      }

      aaUtils.attachAnnotations(questionOutputArr, languagesObject);

      let answerSentenceData = scUtils.processSentenceFormula(
        {
          currentLanguage: answerLanguage,
          previousQuestionLanguage: questionLanguage,
        },
        sentenceFormula,
        words,
        kumquat
      );

      if (!answerResponseObj) {
        answerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData,
          kumquat,
          answerLanguage,
          null
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData,
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

  let questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData,
    kumquat,
    questionLanguage,
    answerLanguage
  );

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
