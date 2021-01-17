const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

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
    pleaseSpecifyMGNs,
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

  if ("check") {
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

    if (questionSentenceData.arrayOfOutputArrays.length > 1) {
      gpUtils.throw(
        "#ERR questionSentenceData.arrayOfOutputArrays.length had length more than 1. It was " +
          questionSentenceData.arrayOfOutputArrays.length
      );
    }
  }

  //Decisive Decant
  questionSentenceData.questionOutputArr =
    questionSentenceData.arrayOfOutputArrays[0];
  delete questionSentenceData.arrayOfOutputArrays;

  // Can we assume that NO featureKeys have multiple values from this point forwards, apart from gender?
  console.log("[1;35m " + "a10" + "[0m");

  questionSentenceData.questionOutputArr.forEach((outputUnit, index) => {
    let { structureChunk } = outputUnit;

    console.log("[1;35m " + `a11 stCh ${index}` + "[0m");

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      let obj = {};
      obj[featureKey] = featureValue;
      // console.log(obj);

      if (
        ![
          "gender",
          "andTags",
          "orTags",
          "specificIds",
          "specificLemmas",
        ].includes(featureKey) &&
        Array.isArray(featureValue) &&
        featureValue.length > 1
      ) {
        gpUtils.throw("#ERR a11 " + featureKey);
      }
    });
  });

  if (!"console") {
    console.log(
      "[1;36m " +
        "{{{ #SBS fetchPalette just after we get questionSentenceData back from SC:processSentenceFormula. Let's see the stChs in questionSentenceData.arrayOfOutputArrays:" +
        "[0m"
    );

    questionSentenceData.questionOutputArr
      .map((outputUnit) => outputUnit.structureChunk)
      .forEach((stCh) => {
        console.log(stCh);
      });

    console.log("[1;36m " + "}}}" + "[0m");
  }

  if ("console") {
    console.log(
      "[1;35m " +
        "{{{ #SBS fetchPalette just before midpoint. Let's see the selectedWordss" +
        "[0m"
    );

    console.log(
      questionSentenceData.questionOutputArr.map(
        (outputUnit) => outputUnit.selectedWord
      )
    );

    console.log("[1;35m " + "}}}" + "[0m");

    gpUtils.consoleLogAestheticBorder(4);
  }

  if ("check") {
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
  }

  ///////////////////////////////////////////////kp (key point)

  // console.log("f11 fetchPalette, questionSentenceData.questionOutputArr BEFORE pleaseSpecifyMGNs");
  // console.log(questionSentenceData.questionOutputArr.map((outputUnit) => outputUnit.structureChunk));

  if (pleaseSpecifyMGNs) {
    allLangUtils.specifyMGNs(
      questionSentenceData.questionOutputArr,
      questionLanguage
    );
  }

  // console.log("f13 fetchPalette, questionSentenceData.questionOutputArr AFTER pleaseSpecifyMGNs");
  // console.log(questionSentenceData.questionOutputArr.map((outputUnit) => outputUnit.structureChunk));

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

      let languagesObject = {
        answerLanguage,
        questionLanguage,
      };

      ///////////////////////////////////////////////kp
      scUtils.conformAnswerStructureToQuestionStructure(
        answerSentenceFormula,
        questionSentenceData.questionOutputArr,
        languagesObject,
        words
      );

      if ("console") {
        console.log(
          "f15 fetchPalette, answerSentenceFormula.sentenceStructure AFTER qaConform",
          answerSentenceFormula.sentenceStructure
        );

        console.log(
          "f16 fetchPalette, questionOutputArr BEFORE CLARI OR SPECI",
          questionSentenceData.questionOutputArr.map(
            (unit) => unit.structureChunk.annotations
          )
        );
      }

      if (!hideClarifiersForTestingPurposes) {
        ///////////////////////////////////////////////kp
        aaUtils.addClarifiers(
          questionSentenceData.questionOutputArr,
          languagesObject
        );
      }

      if ("console") {
        console.log(
          "f17 fetchPalette, questionOutputArr AFTER CLARI, BEFORE SPECI",
          questionSentenceData.questionOutputArr.map(
            (unit) => unit.structureChunk.annotations
          )
        );
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

      //Decisive Decant parallel
      answerSentenceData.answerOutputArrays =
        answerSentenceData.arrayOfOutputArrays;
      delete answerSentenceData.arrayOfOutputArrays;

      if (!"console") {
        console.log(
          "[1;33m " +
            "{{{ #SBS fetchPalette just after we get answerSentenceData back from SC:processSentenceFormula. Let's see the stChs in answerSentenceData.arrayOfOutputArrays:" +
            "[0m"
        );

        answerSentenceData.answerOutputArrays
          .map((outputArray) =>
            outputArray.map((outputUnit) => outputUnit.structureChunk)
          )
          .forEach((stCh) => {
            console.log(stCh);
          });

        console.log("[1;33m " + "}}}" + "[0m");
      }

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

  if (!doNotSpecify) {
    ///////////////////////////////////////////////kp
    aaUtils.addSpecifiers(
      answerSentenceData.sentenceFormula,
      questionSentenceData.questionOutputArr,
      languagesObj
    );
  }

  if ("console") {
    console.log(
      "f18 fetchPalette, questionOutputArr AFTER CLARI AND SPECI",
      questionSentenceData.questionOutputArr.map(
        (unit) => unit.structureChunk.annotations
      )
    );
  }

  ///////////////////////////////////////////////kp
  aaUtils.attachAnnotations(
    questionSentenceData.questionOutputArr,
    languagesObj,
    answerSentenceData
  );

  let questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData,
    false,
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
