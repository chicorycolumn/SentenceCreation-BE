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
    hideClarifiersForTestingPurposes,
    doNotSpecify,
  } = req.body;

  let { sentenceFormula, words } = scUtils.getMaterials(
    questionLanguage,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy
  );

  let questionSentenceFormula = sentenceFormula;

  let questionSentenceData = scUtils.processSentenceFormula(
    { currentLanguage: questionLanguage },
    questionSentenceFormula,
    words,
    kumquat
  );

  if (!questionSentenceData) {
    console.log(
      "#ERR ---------------> In fetchPalette the question arrayOfOutputArrays came back NOTHING."
    );

    let questionResponseObj = scUtils.giveFinalSentences(
      questionSentenceData,
      kumquat,
      questionLanguage,
      answerLanguage
    );

    return finishAndSend(questionResponseObj, null);
  }

  if (
    !questionSentenceData.arrayOfOutputArrays ||
    !questionSentenceData.arrayOfOutputArrays.length
  ) {
    console.log(
      "#ERR ---------------> In fetchPalette the question arrayOfOutputArrays came back NONE."
    );

    let questionResponseObj = scUtils.giveFinalSentences(
      questionSentenceData,
      kumquat,
      questionLanguage,
      answerLanguage
    );

    return finishAndSend(questionResponseObj, null);
  }

  console.log(
    "selectedWordsss",
    questionSentenceData.arrayOfOutputArrays[0].map(
      (outputUnit) => outputUnit.selectedWord
    )
  );
  gpUtils.consoleLogAestheticBorder(4);

  let questionOutputArr = questionSentenceData.arrayOfOutputArrays[0];

  let answerSentenceData;
  let answerResponseObj;
  let firstAnswerSentenceFormula;

  if (answerLanguage) {
    kumquat = true;

    let translations =
      questionSentenceData.sentenceFormula.translations[answerLanguage];

    if (!translations || !translations.length) {
      throw "palette.model > I was asked to give translations, but the question sentence formula did not have any translations listed.";
    }

    translations.forEach((translationSentenceFormulaId, index) => {
      let { sentenceFormula, words } = scUtils.getMaterials(
        answerLanguage,
        translationSentenceFormulaId,
        questionSentenceData.sentenceFormulaSymbol,
        useDummy
      );

      let answerSentenceFormula = sentenceFormula;

      if (index === 0) {
        firstAnswerSentenceFormula = answerSentenceFormula;
      }

      //addSpecifiers fxn
      //conformAtoQ fxn
      //and then put it through processSentenceFormula

      let languagesObject = {
        answerLanguage,
        questionLanguage,
      };

      scUtils.conformAnswerStructureToQuestionStructure(
        answerSentenceFormula,
        questionOutputArr,
        languagesObject,
        words
      );

      console.log(
        "bb22 answerSentenceFormula.sentenceStructure AFTER qaConform",
        answerSentenceFormula.sentenceStructure
      );

      if (true) {
        console.log(
          "a22a questionOutputArr BEFORE CLARI OR SPECI",
          questionOutputArr.map((unit) => unit.structureChunk.annotations)
        );

        if (true) {
          if (!hideClarifiersForTestingPurposes) {
            aaUtils.addClarifiers(questionOutputArr, languagesObject);
          }

          console.log(
            "a22b questionOutputArr AFTER CLARI, BEFORE SPECI",
            questionOutputArr.map((unit) => unit.structureChunk.annotations)
          );
        }
      }
      answerSentenceData = scUtils.processSentenceFormula(
        {
          currentLanguage: answerLanguage,
          previousQuestionLanguage: questionLanguage,
        },
        answerSentenceFormula,
        words,
        kumquat
      );

      console.log(
        "bb23 answerSentenceFormula.sentenceStructure AFTER SC:process",
        answerSentenceFormula.sentenceStructure
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

  let languagesObj = {
    answerLanguage,
    questionLanguage,
  };
  questionOutputArr = questionSentenceData.arrayOfOutputArrays[0];

  if (true) {
    if (!doNotSpecify) {
      aaUtils.addSpecifiers(
        questionSentenceFormula,
        questionOutputArr,
        languagesObject
      );
    }

    console.log(
      "a22c questionOutputArr AFTER CLARI AND SPECI",
      questionOutputArr.map((unit) => unit.structureChunk.annotations)
    );
  }

  aaUtils.attachAnnotations(
    questionOutputArr,
    languagesObj,
    answerSentenceData
  );

  let questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData,
    kumquat,
    questionLanguage,
    answerLanguage
  );

  return finishAndSend(questionResponseObj, answerResponseObj);

  function finishAndSend(questionResponseObj, answerResponseObj) {
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
          combinedResponseObj[ref.key + "Fragment"] =
            ref.responseObject.fragment;
        }
      }
    });

    return Promise.all([combinedResponseObj]).then((array) => {
      return array[0];
    });
  }
};
