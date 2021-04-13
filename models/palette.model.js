const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const clUtils = require("../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../utils/secondOrder/educatorUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../utils/secondOrder/inputValidationUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.fetchPalette = (req) => {
  let multipleMode = false;

  let {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    useDummy,
    questionLanguage,
    answerLanguage,
    pleaseDontSpecify,
    devSaysThrowAtMidpoint,
    devSaysOmitStChValidation,
    devSaysThrowAfterAnnoSalvo,
    arrayOfCounterfactualResultsForThisAnnotation,
    counterfactualQuestionSentenceFormula,
    counterfactualFeature,
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
  let questionSentenceFormula = counterfactualQuestionSentenceFormula
    ? counterfactualQuestionSentenceFormula
    : sentenceFormula;

  allLangUtils.initiallyAdjustSentenceFormula(questionSentenceFormula);

  let originalQuestionSentenceFormula = counterfactualQuestionSentenceFormula
    ? null
    : uUtils.copyWithoutReference(questionSentenceFormula);

  //Omega: Ultimately this needn't be done here, but rather, after creating a new sentenceFormula.
  //       Once it passes that, we know it's fine, so don't need to validate it every time down here.
  //       Although could be worth running this validation here during multipleMode.
  if (!devSaysOmitStChValidation) {
    ivUtils.validateSentenceFormula(questionSentenceFormula, questionLanguage);
  }

  if (pleaseDontSpecify) {
    console.log(
      "[1;30m " +
        `-----------------------------------------------------------------------------------------------------------------------------------PDSyellow` +
        "[0m"
    );

    //PDSX1-yellow-set
    //
    //If PDS from req, then add PDS:true to each Q stCh.
    //Unless stCh is 'person' noun and headNoun of pronoun stCh. 'The doctor gave me his book.' must specify MGN doctor.
    //
    //But if qChunk.gender holds all the poss gender values for this lang>worrdtype
    //(bearing in mind if person andTag)
    //then do allow it to be qChunk.dontSpecifyOnThisChunk = true.
    questionSentenceFormula.sentenceStructure.forEach((qChunk) => {
      qChunk.dontSpecifyOnThisChunk = true;

      if (
        //bostonX
        gpUtils.getWorrdtypeStCh(qChunk, true) === "noun-person" &&
        questionSentenceFormula.sentenceStructure.find(
          (potentialDepChunk) =>
            gpUtils.getWorrdtypeStCh(potentialDepChunk) === "pronoun" &&
            potentialDepChunk.agreeWith === qChunk.chunkId
        )
      ) {
        console.log(qChunk.chunkId + " shep1");
        qChunk.dontSpecifyOnThisChunk = false;
      } else if (qChunk.gender && qChunk.gender.length) {
        //BOSTON
        let allGenderValuesForPersonNouns = {
          POL: ["m1", "f"],
          ENG: ["m", "f"],
        };
        let allGenderValuesForPlainNouns = {
          POL: ["m2", "m3", "f", "n"],
          ENG: ["m", "f", "n"],
        };

        if (gpUtils.getWorrdtypeStCh(qChunk, true) === "noun-person") {
          //bostonX
          if (
            !allGenderValuesForPersonNouns[questionLanguage].every((value) =>
              qChunk.gender.includes(value)
            )
          ) {
            console.log(qChunk.chunkId + " shep2a");
            qChunk.dontSpecifyOnThisChunk = false;
          }
        } else {
          if (
            !allGenderValuesForPlainNouns[questionLanguage].every((value) =>
              qChunk.gender.includes(value)
            )
          ) {
            console.log(qChunk.chunkId + " shep2b");
            qChunk.dontSpecifyOnThisChunk = false;
          }
        }
      }

      console.log(
        `PDSyellow qChunk.dontSpecifyOnThisChunk for "${qChunk.chunkId}=${qChunk.dontSpecifyOnThisChunk}"`
      );
    });
  }

  console.log(
    "veva questionSentenceFormula.sentenceStructure",
    questionSentenceFormula.sentenceStructure.map((stCh) => stCh.chunkId)
  );

  let questionSentenceData = scUtils.processSentenceFormula(
    { currentLanguage: questionLanguage },
    questionSentenceFormula,
    words,
    multipleMode
  );

  console.log("questionSentenceData", questionSentenceData);
  if ("check") {
    if (
      !questionSentenceData ||
      !questionSentenceData.arrayOfOutputArrays ||
      !questionSentenceData.arrayOfOutputArrays.length
    ) {
      console.log(
        "[1;31m " +
          `#WARN cdqk fetchPalette. The question arrayOfOutputArrays came back NOTHING.` +
          "[0m"
      );

      if (arrayOfCounterfactualResultsForThisAnnotation) {
        return;
      } else {
        let nullQuestionResponseObj = scUtils.giveFinalSentences(
          questionSentenceData,
          multipleMode,
          questionLanguage,
          answerLanguage
        );

        return frUtils.finishAndSend(nullQuestionResponseObj, null);
      }
    }

    console.log(
      "veve questionSentenceData.arrayOfOutputArrays",
      questionSentenceData.arrayOfOutputArrays.map((arr) =>
        arr.map((unit) => unit.structureChunk.chunkId)
      )
    );

    if (questionSentenceData.arrayOfOutputArrays.length > 1) {
      console.log(
        "pipr-fetchPalette. questionSentenceData.arrayOfOutputArrays",
        questionSentenceData.arrayOfOutputArrays
      );
      clUtils.throw(
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
  if (false) {
    questionSentenceData.questionOutputArr.forEach((outputUnit, index) => {
      let { structureChunk, selectedLemmaObject } = outputUnit;

      if ("console") {
        console.log(
          "[1;35m " +
            `vmfg-fetchPalette stCh "${structureChunk.chunkId}" at index "${index}"` +
            "[0m"
        );
        console.log(
          "[1;35m " + `vmfg-fetchPalette slObj "${selectedLemmaObject.lemma}"` + "[0m"
        );
        console.log(" ");
      }

      Object.keys(structureChunk).forEach((featureKey) => {
        let featureValue = structureChunk[featureKey];

        if (
          ![
            "andTags",
            "orTags",
            "specificIds",
            "specificLemmas",
            "educatorBlocksAnnotationsForTheseFeatures",
          ].includes(featureKey) &&
          Array.isArray(featureValue) &&
          featureValue.length > 1
        ) {
          console.log(
            "[1;31m " + `#WARN oyxp fetchPalette. structureChunk is:` + "[0m",
            structureChunk
          );
          clUtils.throw("#ERR oyxp fetchPalette. featureKey: " + featureKey);
        }
      });
    });
  }

  if (true && "console") {
    console.log(
      "[1;36m " +
        "{{{ zuwv-fetchPalette just after we get questionSentenceData back from SC:processSentenceFormula. Let's see the stChs in questionSentenceData.arrayOfOutputArrays:" +
        "[0m"
    );

    questionSentenceData.questionOutputArr
      .map((outputUnit) => outputUnit.structureChunk)
      .forEach((stCh) => {
        console.log("niwt-fetchPalette -fetchPalette", stCh);
      });

    console.log("[1;36m " + "}}}" + "[0m");
  }

  if (true && "console") {
    console.log(
      "[1;35m " +
        "{{{ cjae-fetchPalette just before midpoint. Let's see the selectedWordss" +
        "[0m"
    );

    console.log(
      "odej-fetchPalette questionSentenceData.questionOutputArr.map((outputUnit) => outputUnit.selectedWord)",
      questionSentenceData.questionOutputArr.map(
        (outputUnit) => outputUnit.selectedWord
      )
    );

    // clUtils.consoleLogObjectAtTwoLevels(
    //   questionSentenceData.questionOutputArr,
    //   "questionSentenceData.questionOutputArr",
    //   "odek-fetchPalette."
    // );

    console.log("[1;35m " + "}}}" + "[0m");

    clUtils.consoleLogAestheticBorder(4);
  }

  if (devSaysThrowAtMidpoint) {
    clUtils.throw("Midpoint cease.");
  }

  if (answerLanguage) {
    multipleMode = true;

    let translations =
      questionSentenceData.sentenceFormula.translations[answerLanguage];

    if (!translations || !translations.length) {
      throw "palette.model > I was asked to give translations, but the question sentence formula did not have any translations listed.";
    }

    console.log(
      "[1;36m " + `znuj fetchPalette. questionOutputArr BEFORE CLARI OR SPECI` + "[0m\n",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${unit.selectedLemmaObject.lemma}-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    ///////////////////////////////////////////////kp Clarifiers
    aaUtils.addClarifiers(questionSentenceData.questionOutputArr, {
      answerLanguage,
      questionLanguage,
    });

    console.log(
      "[1;36m " +
        `znuk-fetchPalette, questionOutputArr AFTER CLARI, BEFORE SPECI` +
        "[0m\n",
      questionSentenceData.questionOutputArr.map(
        (unit) => unit.structureChunk.annotations
      )
    );

    ///////////////////////////////////////////////kp Specifiers
    //PDSX3-purple-false
    //
    //Add specifiers to MGNs if their stCh has PDS:false.
    //
    aaUtils.addSpecifiersToMGNs(questionSentenceData, {
      answerLanguage,
      questionLanguage,
    });

    console.log(
      "[1;36m " + `znul-fetchPalette, questionOutputArr AFTER CLARI AND SPECI` + "[0m\n",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${unit.selectedLemmaObject.lemma}-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    aaUtils.specialAdjustmentToAnnotations(questionSentenceData, {
      answerLanguage,
      questionLanguage,
    });

    console.log(
      "[1;36m " + `znul-fetchPalette, questionOutputArr AFTER SPECIALADJUST\n` + "[0m",
      questionSentenceData.questionOutputArr.map((unit) => [
        `${unit.selectedLemmaObject.lemma}-->${unit.selectedWord}`,
        unit.structureChunk.annotations,
      ])
    );

    if (devSaysThrowAfterAnnoSalvo) {
      clUtils.throw("mhji devSaysThrowAfterAnnoSalvo");
    }

    translations.forEach((translationSentenceFormulaId, index) => {
      let { sentenceFormula, words } = scUtils.getMaterials(
        answerLanguage,
        translationSentenceFormulaId,
        questionSentenceData.sentenceFormulaSymbol,
        useDummy
      );

      let answerSentenceFormula = sentenceFormula;

      allLangUtils.initiallyAdjustSentenceFormula(answerSentenceFormula);

      //Omega: Ultimately this needn't be done here, but rather, after creating a new sentenceFormula.
      //       Once it passes that, we know it's fine, so don't need to validate it every time down here.
      //       Although could be worth running this validation here during multipleMode.
      if (!devSaysOmitStChValidation) {
        ivUtils.validateSentenceFormula(answerSentenceFormula, answerLanguage);
      }

      if (index === 0) {
        firstAnswerSentenceFormula = answerSentenceFormula;
      }

      if ("console") {
        console.log(
          `pjeg fetchPalette. Just BEFORE qaConform, let's see the Q and A structures:`
        );
        console.log(
          "p'jeg answerSentenceFormula.sentenceStructure",
          answerSentenceFormula.sentenceStructure
        );
        console.log(
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

      console.log(
        "pjeh fetchPalette. answerSentenceFormula.sentenceStructure AFTER qaConform",
        answerSentenceFormula.sentenceStructure
      );

      answerSentenceData = scUtils.processSentenceFormula(
        {
          currentLanguage: answerLanguage,
          previousQuestionLanguage: questionLanguage,
        },
        answerSentenceFormula,
        words,
        multipleMode
      );

      if ("check") {
        if (
          !answerSentenceData ||
          !answerSentenceData.arrayOfOutputArrays ||
          !answerSentenceData.arrayOfOutputArrays.length
        ) {
          console.log(
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
          answerSentenceData,
          multipleMode,
          answerLanguage,
          null
        );
      } else {
        let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
          answerSentenceData,
          multipleMode,
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

  if (arrayOfCounterfactualResultsForThisAnnotation) {
    arrayOfCounterfactualResultsForThisAnnotation.push({
      counterfactualFeature,
      questionSentenceData,
      answerSentenceData,
    });
    return;
  }

  let answerSelectedWordsSetsHaveChanged = { value: false };
  let additionalRunsRecord = [];

  console.log(
    `csej fetchPalette. questionSentenceData`,
    questionSentenceData.questionOutputArr.map((unit) => unit.structureChunk)
  );

  questionResponseObj = scUtils.giveFinalSentences(
    questionSentenceData,
    false,
    questionLanguage,
    answerLanguage,
    answerSentenceData,
    questionSentenceFormula,
    req.body,
    answerSelectedWordsSetsHaveChanged,
    additionalRunsRecord,
    originalQuestionSentenceFormula
  );

  if (answerSelectedWordsSetsHaveChanged.value) {
    if (!answerResponseObj) {
      answerResponseObj = scUtils.giveFinalSentences(
        answerSentenceData,
        true,
        answerLanguage,
        null
      );
    } else {
      let subsequentAnswerResponseObj = scUtils.giveFinalSentences(
        answerSentenceData,
        true,
        answerLanguage,
        null
      );

      subsequentAnswerResponseObj.finalSentenceArr.forEach((finalSentence) => {
        answerResponseObj.finalSentenceArr.push(finalSentence);
      });
    }

    scUtils.removeDuplicatesFromResponseObject(answerResponseObj);
  }

  return frUtils.finishAndSend(
    questionResponseObj,
    answerResponseObj,
    additionalRunsRecord
  );
};
