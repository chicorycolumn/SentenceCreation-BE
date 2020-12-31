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
        currentLanguage: answerLanguage,
        previousQuestionLanguage: questionLanguage,
      };

      if (false) {
        console.log("+++++++++++++++++++++++++++++++++++fff");
        console.log("-----------------------------------");
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log(
          "|",
          "sentenceStructure BEFORE QA conform",
          sentenceStructure
        );

        console.log(
          "questionOutputArr.length ought to be 1",
          questionOutputArr.length
        );
        console.log(
          "questionOutputArr[0] which will be used to update the sentenceStructure",
          questionOutputArr[0]
        );
        console.log("+++++++++++++++++++++++++++++++++++");
        console.log("-----------------------------------");
        console.log("+++++++++++++++++++++++++++++++++++");
      }

      scUtils.conformAnswerStructureToQuestionStructure(
        sentenceFormula,
        questionSentenceData.arrayOfOutputArrays[0],
        languagesObject,
        words
      );

      if (!hideClarifiers) {
        otUtils.addClarifiers(
          questionSentenceData.arrayOfOutputArrays[0],
          languagesObject
        );
      }

      if (!hideSpecifiers) {
        otUtils.addSpecifiers(
          sentenceFormula,
          questionSentenceData.arrayOfOutputArrays[0],
          languagesObject
        );
      }

      otUtils.attachAnnotations(
        questionSentenceData.arrayOfOutputArrays[0],
        languagesObject
      );

      // console.log("sentenceStructure AFTER QA conform", sentenceStructure);

      let answerSentenceData = scUtils.processSentenceFormula(
        languagesObject,
        sentenceFormula,
        words,
        kumquat
      );

      if (!answerResponseObj) {
        answerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat,
          answerLanguage,
          null,
          hideClarifiers,
          hideSpecifiers
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData.arrayOfOutputArrays,
          answerSentenceData.sentenceFormula,
          answerSentenceData.errorInSentenceCreation,
          kumquat,
          answerLanguage,
          null,
          hideClarifiers,
          hideSpecifiers
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
    questionSentenceData.arrayOfOutputArrays,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation,
    kumquat,
    questionLanguage,
    answerLanguage,
    hideClarifiers,
    hideSpecifiers
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
