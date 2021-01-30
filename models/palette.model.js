const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.fetchPalette = (req) => {
  let kumquat = false;

  let {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy,
    questionLanguage,
    answerLanguage,
    pleaseDontSpecify,
    pleaseDontDecantMGNs,
  } = req.body;

  let { sentenceFormula, words } = scUtils.getMaterials(
    questionLanguage,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy
  );

  let answerResponseObj;
  let firstAnswerSentenceFormula;
  let answerSentenceData;

  let questionResponseObj;
  let questionSentenceFormula = sentenceFormula;
  let questionSentenceData = scUtils.processSentenceFormula(
    { currentLanguage: questionLanguage },
    questionSentenceFormula,
    words,
    kumquat
  );

  if ("check") {
    if (!questionSentenceData) {
      console.log(
        "[1;31m " +
          `#ERR ---------------> In fetchPalette the question arrayOfOutputArrays came back NOTHING.` +
          "[0m"
      );

      let nullQuestionResponseObj = scUtils.giveFinalSentences(
        questionSentenceData,
        kumquat,
        questionLanguage,
        answerLanguage
      );

      return frUtils.finishAndSend(nullQuestionResponseObj, null);
    }

    if (
      !questionSentenceData.arrayOfOutputArrays ||
      !questionSentenceData.arrayOfOutputArrays.length
    ) {
      console.log(
        "[1;31m " +
          `#ERR ---------------> In fetchPalette the question arrayOfOutputArrays came back NONE.` +
          "[0m"
      );

      let nullQuestionResponseObj = scUtils.giveFinalSentences(
        questionSentenceData,
        kumquat,
        questionLanguage,
        answerLanguage
      );

      return frUtils.finishAndSend(nullQuestionResponseObj, null);
    }

    if (questionSentenceData.arrayOfOutputArrays.length > 1) {
      gpUtils.throw(
        "#ERR questionSentenceData.arrayOfOutputArrays.length had length more than 1. It was " +
          questionSentenceData.arrayOfOutputArrays.length
      );
    }

    //Decisive Decant
    questionSentenceData.questionOutputArr =
      questionSentenceData.arrayOfOutputArrays[0];
    delete questionSentenceData.arrayOfOutputArrays;
  }

  ///////////////////////////////////////////////kp Decisive Decant
  questionSentenceData.questionOutputArr.forEach((outputUnit, index) => {
    let { structureChunk, selectedLemmaObject } = outputUnit;

    console.log(
      "[1;35m " + `a10 stCh ${structureChunk.chunkId} at index ${index}` + "[0m"
    );
    console.log("[1;35m " + `a10 slObj ${selectedLemmaObject.lemma}` + "[0m");
    console.log(" ");

    if (selectedLemmaObject.gender === "allPersonalSingularGenders_selector") {
      console.log(
        "[1;35m " +
          `Blanking structureChunk.gender of ${structureChunk.chunkId} just before Midpoint, because slObj ${selectedLemmaObject.lemma} is multi gender.` +
          "[0m"
      );

      structureChunk.gender = [];
    }

    Object.keys(structureChunk).forEach((featureKey) => {
      let featureValue = structureChunk[featureKey];

      let obj = {};
      obj[featureKey] = featureValue;
      // console.log(obj);

      if (
        ![
          // "gender",
          "andTags",
          "orTags",
          "specificIds",
          "specificLemmas",
        ].includes(featureKey) &&
        Array.isArray(featureValue) &&
        featureValue.length > 1
      ) {
        console.log("[1;31m " + `#ERR a11 structureChunk is:` + "[0m", structureChunk);
        // gpUtils.throw("#ERR a11 featureKey: " + featureKey);
      }
    });
  });

  if (true && "console") {
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

  if (true && "console") {
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

  ///////////////////////////////////////////////kp Decant MGNs
  if (!pleaseDontDecantMGNs) {
    allLangUtils.specifyMGNs(
      questionSentenceData.questionOutputArr,
      questionLanguage
    );
  }

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

      ///////////////////////////////////////////////kp Conform
      scUtils.conformAnswerStructureToQuestionStructure(
        answerSentenceFormula,
        questionSentenceData.questionOutputArr,
        languagesObject,
        words
      );

      if (true && "console") {
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

      ///////////////////////////////////////////////kp Clarifiers
      aaUtils.addClarifiers(
        questionSentenceData.questionOutputArr,
        languagesObject
      );

      if (true && "console") {
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

      ///////////////////////////////////////////////kp Decisive Decant parallel
      answerSentenceData.answerOutputArrays =
        answerSentenceData.arrayOfOutputArrays;
      delete answerSentenceData.arrayOfOutputArrays;

      if (false && "console") {
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

    let languagesObj = {
      answerLanguage,
      questionLanguage,
    };

    ///////////////////////////////////////////////kp Specifiers
    if (!pleaseDontSpecify) {
      aaUtils.addSpecifiers(
        answerSentenceData.sentenceFormula,
        questionSentenceData.questionOutputArr,
        languagesObj
      );
    }

    if (true && "console") {
      console.log(
        "f18 fetchPalette, questionOutputArr AFTER CLARI AND SPECI",
        questionSentenceData.questionOutputArr.map(
          (unit) => unit.structureChunk.annotations
        )
      );
    }

    ///////////////////////////////////////////////kp Attach annotations
    aaUtils.attachAnnotations(
      questionSentenceData.questionOutputArr,
      languagesObj,
      answerSentenceData
    );
  }

  questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData,
    false,
    questionLanguage,
    answerLanguage
  );

  return frUtils.finishAndSend(questionResponseObj, answerResponseObj);
};
