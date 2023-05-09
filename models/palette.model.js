const gpUtils = require("../utils/generalPurposeUtils.js");
const idUtils = require("../utils/identityUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../utils/secondOrder/educatorUtils.js");
const efUtils = require("../utils/secondOrder/efficiencyUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const allLangUtils = require("../utils/allLangUtils.js");
const nexusUtils = require("../utils/secondOrder/nexusUtils.js");

exports.fetchPalette = (req) => {
  let {
    sentenceFormulaId,
    useDummy,
    useDummyWords,
    questionLanguage,
    answerLanguage,
    pleaseDontSpecify,
    devSaysThrowAtMidpoint,
    devSaysOmitStChValidation,
    devSaysThrowAfterAnnoSalvo,
    allCounterfactualResults,
    counterfactualQuestionSentenceFormula,
    counterfactualSitSchematic,
    forceMultipleAndQuestionOnly,
    sentenceFormulaFromEducator,
    requestingSingleWordOnly,
    returnDirectly,
    startTime,
    timeLimit,
    env = "ref",
    formattingOptions = {},
  } = req.body;

  let multipleMode = !!forceMultipleAndQuestionOnly;
  let isQuestion = true;
  let maqModes = { multipleMode, isQuestion };

  if (!startTime) {
    throw "arkd You must set a startTime with Date.now() from outside fetchPalette before calling fetchPalette.";
  }
  let timeOutCheck;
  if (!timeLimit) {
    timeLimit = 8000;
  }

  const finishAndSendErrorMessages = (errorMessage, sentenceData, isAnswer) => {
    if (errorMessage) {
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((e) => {
          consol.logRedString(e);
        });
        errorMessage = errorMessage.join(",  ");
      } else {
        consol.logRedString(errorMessage);
      }
    }

    if (!sentenceData) {
      sentenceData = {
        errorInSentenceCreation: {
          errorMessage,
        },
      };
    }

    let lang1 = isAnswer ? answerLanguage : questionLanguage;
    let lang2 = !isAnswer ? answerLanguage : questionLanguage;

    return frUtils.returnNullQuestionResponseObj(
      formattingOptions,
      startTime,
      returnDirectly,
      sentenceData,
      maqModes,
      lang1,
      lang2
    );
  };

  const checkTimeout = efUtils.curryCheckTimeout(
    startTime,
    timeLimit,
    (label) => {
      return finishAndSendErrorMessages(
        `Processing on BE took on too long, exceeded ${
          timeLimit / 1000
        } seconds, so was aborted. Label "${label}".`
      );
    }
  );

  timeOutCheck = checkTimeout("fp1");
  if (timeOutCheck) {
    return timeOutCheck;
  }

  let { sentenceFormula, words } = scUtils.getMaterialsCopies(
    env,
    questionLanguage,
    sentenceFormulaId,
    useDummy,
    sentenceFormulaFromEducator
  );

  if (!words || !Object.keys(words).length) {
    return finishAndSendErrorMessages("Error kpas: No words found.");
  }

  let answerResponseObj;
  let firstAnswerSentenceFormula;
  let answerSentenceData;

  let questionResponseObj;
  let questionSentenceFormula =
    counterfactualQuestionSentenceFormula || sentenceFormula;

  //Omega: Ultimately this needn't be done here, but rather, after creating a new sentenceFormula.
  //       Once it passes that, we know it's fine, so don't need to validate it every time down here.
  //       Although could be worth running this validation here during multipleMode.
  if (!devSaysOmitStChValidation) {
    let failedValidationMessages = ivUtils.validateSentenceFormula(
      questionSentenceFormula,
      questionLanguage,
      "question"
    );

    if (failedValidationMessages) {
      return finishAndSendErrorMessages(failedValidationMessages);
    }
  }

  if (pleaseDontSpecify) {
    consol.log(
      "[1;30m " +
        `-----------------------------------------------------------------------------------------------------------------------------------PDSyellow` +
        "[0m"
    );

    //PDS-Amethyst: Set the values
    aaUtils.setPDSValues(questionSentenceFormula, questionLanguage);
  }

  consol.log(
    "veva questionSentenceFormula.sentenceStructure",
    questionSentenceFormula.sentenceStructure.map((stCh) => stCh.chunkId)
  );

  let questionSentenceData = scUtils.processSentenceFormula(
    useDummyWords,
    { currentLanguage: questionLanguage },
    questionSentenceFormula,
    words,
    maqModes,
    !!allCounterfactualResults
  );

  timeOutCheck = checkTimeout("fp2");
  if (timeOutCheck) {
    return timeOutCheck;
  }

  consol.log("smdv questionSentenceData", questionSentenceData);

  if (
    !questionSentenceData ||
    !questionSentenceData.arrayOfOutputArrays ||
    !questionSentenceData.arrayOfOutputArrays.length
  ) {
    consol.log(
      "[1;31m " +
        `#WARN cdqk fetchPalette. The question arrayOfOutputArrays came back NOTHING.` +
        "[0m"
    );

    if (allCounterfactualResults) {
      return;
    } else {
      return finishAndSendErrorMessages(null, questionSentenceData);
    }
  }

  if (forceMultipleAndQuestionOnly) {
    if (requestingSingleWordOnly) {
      return frUtils.sendResponseForSingleWord(
        returnDirectly,
        questionSentenceData
      );
    } else {
      let arr = questionSentenceData.arrayOfOutputArrays.map((outputArray) => {
        let sentence = scUtils.buildSentenceString(
          outputArray,
          sentenceFormula,
          maqModes,
          questionLanguage,
          answerLanguage,
          formattingOptions
        );

        return sentence;
      });

      let deduplicatedArrForEducatorInterface = Array.from(
        new Set(uUtils.flatten(arr))
      );

      return frUtils.finishAndSend(returnDirectly, {
        finalSentenceArr: deduplicatedArrForEducatorInterface,
      });
    }
  } else {
    consol.log(
      "veve questionSentenceData.arrayOfOutputArrays",
      questionSentenceData.arrayOfOutputArrays.map((arr) =>
        arr.map((unit) => unit.structureChunk.chunkId)
      )
    );

    if (questionSentenceData.arrayOfOutputArrays.length > 1) {
      consol.log(
        "pipr-fetchPalette. questionSentenceData.arrayOfOutputArrays",
        questionSentenceData.arrayOfOutputArrays
      );
      return finishAndSendErrorMessages(
        "#ERR tbvr fetchPalette. questionSentenceData.arrayOfOutputArrays.length had length more than 1. It was " +
          questionSentenceData.arrayOfOutputArrays.length
      );
    }
  }

  //Decisive Decant
  questionSentenceData.questionOutputArr =
    questionSentenceData.arrayOfOutputArrays[0];
  delete questionSentenceData.arrayOfOutputArrays;

  edUtils.checkOutputArrayForMissingUnits(
    questionSentenceData.sentenceFormula,
    questionSentenceData.questionOutputArr,
    questionLanguage,
    "question",
    useDummy
  );

  ///////////////////////////////////////////////kp Decisive Decant Check
  pvUtils.checkDecisiveDecant(questionSentenceData, questionLanguage);

  if (devSaysThrowAtMidpoint) {
    console.log(
      "[1;35m " +
        "{{{ cjae-fetchPalette just before midpoint. Let's see the selectedWordss" +
        "[0m",
      "\n odej-fetchPalette questionSentenceData.questionOutputArr.map((outputUnit) => outputUnit.selectedWord)",
      questionSentenceData.questionOutputArr.map(
        (outputUnit) => outputUnit.selectedWord
      ),
      "\n",
      "[1;35m " + "}}}" + "[0m"
    );
    consol.logAestheticBorder(4);
    consol.throw("Midpoint cease.");
  }

  if (answerLanguage) {
    multipleMode = true;
    isQuestion = false;
    maqModes = { multipleMode, isQuestion };

    let equivalents;
    if (
      questionSentenceData.sentenceFormula.equivalents &&
      questionSentenceData.sentenceFormula.equivalents[answerLanguage]
    ) {
      // dummy formulas and dev environment formulas have equivalents on the sentence formula objects themselves, rather than properly in nexus.
      equivalents =
        questionSentenceData.sentenceFormula.equivalents[answerLanguage];
    } else if (
      questionSentenceData.sentenceFormula.equivalentsFormulas &&
      questionSentenceData.sentenceFormula.equivalentsFormulas[answerLanguage]
    ) {
      // equivalents supplied by educator in dual formula being built on FE.
      equivalents =
        questionSentenceData.sentenceFormula.equivalentsFormulas[
          answerLanguage
        ];
    } else {
      equivalents = nexusUtils.getEquivalents(
        questionSentenceData.sentenceFormula.sentenceFormulaId,
        answerLanguage,
        env
      );
    }

    if (!equivalents || !equivalents.length) {
      return finishAndSendErrorMessages(
        "lafw palette.model > I was asked to give equivalents, but the question sentence formula did not have any equivalents listed."
      );
    }

    consol.log(
      questionSentenceData.questionOutputArr.map((unit) => unit.structureChunk)
    );

    //Check that all chunks are appropriately decanted. //gamma tidy this into own fxn pvUtils.checkDecant
    questionSentenceData.questionOutputArr.forEach((unit) => {
      if (unit.structureChunk.dontSpecifyOnThisChunk) {
        return;
      }

      Object.keys(unit.structureChunk).forEach((traitKey) => {
        let traitValue = unit.structureChunk[traitKey];

        const reference =
          refFxn.getStructureChunkTraits(questionLanguage)[traitKey];

        if (
          reference.expectedTypeOnStCh === "array" &&
          !reference.ultimatelyMultipleTraitValuesOkay &&
          traitValue.length > 1
        ) {
          consol.log(">>", unit);
          return finishAndSendErrorMessages(
            `oije. (>> unit above) questionLanguage=${questionLanguage} "${unit.structureChunk.chunkId}" with "${traitKey}" of "${traitValue}". This should have been streamlined down to one traitValue, eg in updateStCh fxn.`
          );
        }
      });
    });

    consol.log(
      "[1;36m " + `znuj fetchPalette. questionOutputArr BEFORE CLARI OR SPECI` + "[0m\n",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${
          idUtils.getWordtypeStCh(unit.structureChunk) === "fix"
            ? "FIXED"
            : unit.selectedLemmaObject.lemma
        }-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    timeOutCheck = checkTimeout("fp3");
    if (timeOutCheck) {
      return timeOutCheck;
    }

    ///////////////////////////////////////////////kp Clarifiers
    aaUtils.addClarifiers(questionSentenceData.questionOutputArr, {
      answerLanguage,
      questionLanguage,
    });

    timeOutCheck = checkTimeout("fp4");
    if (timeOutCheck) {
      return timeOutCheck;
    }

    consol.log(
      "[1;36m " +
        `znuk-fetchPalette, questionOutputArr AFTER CLARI, BEFORE SPECI` +
        "[0m\n",
      questionSentenceData.questionOutputArr.map(
        (unit) => unit.structureChunk.annotations
      )
    );

    ///////////////////////////////////////////////kp Specifiers
    //PDS-Chalcedony: Do if PDS false.
    //
    //Add specifiers to MGNs if their stCh has PDS:false.
    //
    aaUtils.addSpecifiersToMGNs(questionSentenceData, {
      answerLanguage,
      questionLanguage,
    });

    consol.log(
      "[1;36m " + `znul-fetchPalette, questionOutputArr AFTER CLARI AND SPECI` + "[0m\n",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${
          idUtils.getWordtypeStCh(unit.structureChunk) === "fix"
            ? "FIXED"
            : unit.selectedLemmaObject.lemma
        }-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    aaUtils.specialAdjustmentToAnnotations(questionSentenceData, {
      answerLanguage,
      questionLanguage,
    });

    consol.log(
      "[1;36m " + `znum-fetchPalette, questionOutputArr AFTER SPECIALADJUST\n` + "[0m",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${
          idUtils.getWordtypeStCh(unit.structureChunk) === "fix"
            ? "FIXED"
            : unit.selectedLemmaObject.lemma
        }-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    if (devSaysThrowAfterAnnoSalvo) {
      consol.throw("mhji devSaysThrowAfterAnnoSalvo");
    }

    equivalents.forEach((formulaIdOrFormula, index) => {
      let { sentenceFormula, words } = scUtils.getMaterialsCopies(
        env,
        answerLanguage,
        formulaIdOrFormula,
        useDummy,
        uUtils.isKeyValueTypeObject(formulaIdOrFormula)
          ? formulaIdOrFormula
          : null
      );

      let answerSentenceFormula = sentenceFormula;

      //Omega: Ultimately this needn't be done here, but rather, after creating a new sentenceFormula.
      //       Once it passes that, we know it's fine, so don't need to validate it every time down here.
      //       Although could be worth running this validation here during multipleMode.
      if (!devSaysOmitStChValidation) {
        let failedValidationMessages = ivUtils.validateSentenceFormula(
          answerSentenceFormula,
          answerLanguage,
          counterfactualSitSchematic
            ? counterfactualSitSchematic.cfLabel
            : "answer"
        );
        if (failedValidationMessages) {
          return finishAndSendErrorMessages(
            failedValidationMessages,
            null,
            true
          );
        }
      }

      if (index === 0) {
        firstAnswerSentenceFormula = answerSentenceFormula;
      }

      if ("console") {
        consol.log(
          `\n pjeg fetchPalette. Just BEFORE qaConform, let's see the Q and A structures:`
        );
        consol.log(
          "p'jeg answerSentenceFormula.sentenceStructure",
          answerSentenceFormula.sentenceStructure
        );
        consol.log(
          "p'jeg questionSentenceData...{sentenceStructure}",
          questionSentenceData.questionOutputArr.map(
            (outputUnit) => outputUnit.structureChunk
          )
        );
      }

      ///////////////////////////////////////////////kp Conform
      scUtils.conformAnswerStructureToQuestionStructure(
        answerSentenceFormula,
        questionSentenceData.questionOutputArr,
        {
          answerLanguage,
          questionLanguage,
        },
        words
      );

      consol.log(
        "pjeh fetchPalette. answerSentenceFormula.sentenceStructure AFTER qaConform",
        answerSentenceFormula.sentenceStructure
      );

      timeOutCheck = checkTimeout("fp5");
      if (timeOutCheck) {
        return timeOutCheck;
      }

      answerSentenceData = scUtils.processSentenceFormula(
        useDummyWords,
        {
          currentLanguage: answerLanguage,
          previousQuestionLanguage: questionLanguage,
        },
        answerSentenceFormula,
        words,
        maqModes,
        !!allCounterfactualResults,
        questionSentenceData.questionOutputArr
      );

      timeOutCheck = checkTimeout("fp6");
      if (timeOutCheck) {
        return timeOutCheck;
      }

      if ("check") {
        if (
          !answerSentenceData ||
          !answerSentenceData.arrayOfOutputArrays ||
          !answerSentenceData.arrayOfOutputArrays.length
        ) {
          consol.log(
            "[1;31m " +
              `#WARN cdqk fetchPalette. The answer arrayOfOutputArrays came back NOTHING.` +
              "[0m"
          );

          return;
        }
      }

      ///////////////////////////////////////////////kp Decisive Decant parallel
      answerSentenceData.answerOutputArrays =
        answerSentenceData.arrayOfOutputArrays;
      delete answerSentenceData.arrayOfOutputArrays;

      answerSentenceData.answerOutputArrays.forEach((answerOutputArray) => {
        edUtils.checkOutputArrayForMissingUnits(
          answerSentenceData.sentenceFormula,
          answerOutputArray,
          answerLanguage,
          "answer",
          useDummy
        );
      });

      if (!answerResponseObj) {
        answerResponseObj = scUtils.giveFinalSentences(
          formattingOptions,
          startTime,
          answerSentenceData,
          maqModes,
          { questionLanguage, answerLanguage }
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
          formattingOptions,
          startTime,
          answerSentenceData,
          maqModes,
          { questionLanguage, answerLanguage }
        );

        subsequentAnswerResponseObj.finalSentenceArr.forEach(
          (finalSentence) => {
            answerResponseObj.finalSentenceArr.push(finalSentence);
          }
        );
      }
    });

    if (!answerResponseObj) {
      return finishAndSendErrorMessages(
        "ennm answerResponseObj is falsy",
        null,
        true
      );
    }

    scUtils.removeDuplicatesFromResponseObject(answerResponseObj);
  }

  if (allCounterfactualResults) {
    consol.logSpecial(
      3,
      "[1;33m " + `kcaw Counterfactual got QUESTION` + "[0m",
      questionSentenceData.questionOutputArr.map((ou) => ou.selectedWord),
      "[1;33m " + `and ANSWER` + "[0m",
      answerSentenceData.answerOutputArrays.map((oarray) =>
        oarray.map((ou) => ou.selectedWord)
      )
    );
    allCounterfactualResults.push({
      counterfactualSitSchematic,
      questionSentenceData,
      answerSentenceData,
    });
    return;
  }

  let answerSelectedWordsSetsHaveChanged = { bool: false };
  let runsRecord = [];

  consol.log(
    `csej fetchPalette. questionSentenceData`,
    questionSentenceData.questionOutputArr.map((unit) => unit.structureChunk)
  );

  //giveFinalSentences in question mode, will evaluate annotations, involving counterfaxing,
  //ie a nested set of calls to this fetchPalette fxn.
  let maqModesOverride = {
    multipleMode: false,
    isQuestion: true,
  };

  questionResponseObj = scUtils.giveFinalSentences(
    formattingOptions,
    startTime,
    questionSentenceData,
    maqModesOverride,
    { questionLanguage, answerLanguage },
    answerSentenceData,
    questionSentenceFormula,
    req.body,
    answerSelectedWordsSetsHaveChanged,
    runsRecord
  );

  //And now if any changes from counterfaxing down annotations, they will be integrated here.
  if (answerSelectedWordsSetsHaveChanged.bool) {
    if (!answerResponseObj) {
      answerResponseObj = scUtils.giveFinalSentences(
        formattingOptions,
        startTime,
        answerSentenceData,
        maqModes,
        { questionLanguage, answerLanguage }
      );
    } else {
      let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
        formattingOptions,
        startTime,
        answerSentenceData,
        maqModes,
        { questionLanguage, answerLanguage }
      );

      subsequentAnswerResponseObj.finalSentenceArr.forEach((finalSentence) => {
        answerResponseObj.finalSentenceArr.push(finalSentence);
      });
    }

    scUtils.removeDuplicatesFromResponseObject(answerResponseObj);
  }

  return frUtils.finishAndSend(
    returnDirectly,
    questionResponseObj,
    answerResponseObj,
    runsRecord
  );
};
