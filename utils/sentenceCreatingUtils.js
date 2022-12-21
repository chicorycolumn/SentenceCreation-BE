const otUtils = require("./objectTraversingUtils.js");
const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const frUtils = require("./formattingResponseUtils.js");
const aaUtils = require("./auxiliaryAttributeUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const allLangUtils = require("../utils/allLangUtils.js");
const nexusUtils = require("./secondOrder/nexusUtils.js");

exports.getWordsAndFormulas = (currentLanguage, wordsOnly) => {
  let envir = "ref";

  const {
    wordsBank,
  } = require(`../source/${envir}/${currentLanguage}/words.js`);

  if (wordsOnly) {
    return { wordsBank };
  }

  const {
    dummyWordsBank,
  } = require(`../source/${envir}/${currentLanguage}/dummy/dummyWords.js`);
  const {
    sentenceFormulasBank,
  } = require(`../source/${envir}/${currentLanguage}/sentenceFormulas.js`);
  const {
    dummySentenceFormulasBank,
  } = require(`../source/${envir}/${currentLanguage}/dummy/dummySentenceFormulas.js`);

  return {
    wordsBank,
    dummyWordsBank,
    sentenceFormulasBank,
    dummySentenceFormulasBank,
  };
};

exports.getMaterialsCopies = (
  currentLanguage,
  sentenceFormulaId,
  sentenceFormulaSymbol,
  useDummy,
  sentenceFormulaFromEducator
) => {
  //STEP ZERO (A): Get necessary source materials.
  let wordsOnly = !!sentenceFormulaFromEducator;

  const {
    wordsBank,
    dummyWordsBank,
    sentenceFormulasBank,
    dummySentenceFormulasBank,
  } = scUtils.getWordsAndFormulas(currentLanguage, wordsOnly);

  if (wordsOnly) {
    return { words: wordsBank, sentenceFormula: sentenceFormulaFromEducator };
  }

  let sentenceFormula;
  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);
  let defaultSentenceFormulaId = "POL-00-50";

  let words = useDummy
    ? gpUtils.combineWordbanks(wordsBank, dummyWordsBank)
    : wordsBank;

  let sentenceFormulas = useDummy
    ? dummySentenceFormulasBank
    : sentenceFormulasBank;

  if (sentenceFormulaId) {
    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaId === sentenceFormulaId
    );

    if (!sentenceFormula) {
      consol.throw(
        `#ERR quky sc:getMaterialsCopies. No sentenceFormula for this sentenceFormulaId "${sentenceFormulaId}".`
      );
    }

    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  } else if (sentenceFormulaSymbol) {
    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaSymbol === sentenceFormulaSymbol
    );
  } else {
    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaId === defaultSentenceFormulaId
    );

    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  }

  if (!sentenceFormula) {
    consol.throw(
      `pcco No sentence formula found for "${
        sentenceFormulaSymbol || sentenceFormulaId
      }"`
    );
  }

  return {
    sentenceFormula: uUtils.copyWithoutReference(sentenceFormula),
    words,
  };
};

exports.processSentenceFormula = (
  useDummyWords,
  languagesObj,
  sentenceFormula,
  words,
  multipleModes,
  isCounterfax,
  questionOutputArr
) => {
  let { multipleMode, forceMultipleModeAndQuestionOnly } = multipleModes;

  consol.log("hbbhey START processSentenceFormula");
  let { currentLanguage, previousQuestionLanguage } = languagesObj;
  let errorInSentenceCreation = { errorMessage: null };
  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);
  let grandOutputArray = [];

  //STEP ZERO: Get and preprocess sentence structure.
  let { sentenceFormulaId, sentenceFormulaSymbol, sentenceStructure } =
    allLangUtils.getAndPreprocessStructureAndFormula(
      sentenceFormula,
      currentLanguage,
      multipleMode
    );

  //STEP ONE: Select HEAD words and add to result array.
  let { headChunks, dependentChunks, otherChunks } =
    scUtils.sortStructureChunks(sentenceStructure);

  let headOutputUnitArrays = [];

  if ("console") {
    consol.log(
      "iytd processSentenceFormula: headChunks",
      headChunks.map((chunk) => chunk.chunkId)
    );
    consol.log(
      "iytd processSentenceFormula: dependentChunks",
      dependentChunks.map((chunk) => chunk.chunkId)
    );
    consol.log(
      "iytd processSentenceFormula: otherChunks",
      otherChunks.map((chunk) => chunk.chunkId)
    );
  }

  delete errorInSentenceCreation.errorMessage;

  let nullResultObj;

  headChunks.forEach((headChunk) => {
    if (nullResultObj) {
      return;
    }

    consol.log("evga sc:processSentenceFormula STEP ONE", headChunk.chunkId);

    let allPossOutputUnits_head = otUtils.findMatchingLemmaObjectThenWord(
      useDummyWords,
      headChunk,
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      questionOutputArr,
      multipleModes,
      null
    );

    allPossOutputUnits_head.forEach((ou) => {
      // console.log("dddd", ou.structureChunk);
      uUtils.validateArrayQuasiEmpty(ou.structureChunk.semanticGender, 47);
    });

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_head ||
      !allPossOutputUnits_head.length
    ) {
      consol.log(
        "[1;31m " +
          `klya processSentenceFormula. This run has FAILED, due to headChunk: "${headChunk.chunkId}" failing in findMatchingLemmaObjectThenWord. \nThis happened in "STEP ONE: Select HEAD words and add to result array."` +
          +"[0m"
      );

      if (!errorInSentenceCreation.errorMessage) {
        errorInSentenceCreation.errorMessage = [];
      }
      let newErrMsgs = [
        `k'lya processSentenceFormula. This run has FAILED, due to headChunk: "${headChunk.chunkId}" failing in findMatchingLemmaObjectThenWord. \nThis happened in "STEP ONE: Select HEAD words and add to result array."`,
        `#ERR b'cka processSentenceFormula ${currentLanguage}. headOutputUnitArrays had no successful members. 'k'lya' only had to fail once, and it did.`,
      ];
      newErrMsgs.forEach((errMsg) => {
        errorInSentenceCreation.errorMessage.push(errMsg);
      });

      nullResultObj = {
        arrayOfOutputArrays: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    } else {
      headOutputUnitArrays.push(allPossOutputUnits_head);
    }
  });

  if (nullResultObj) {
    consol.log(
      "[1;31m \n" +
        `#ERR bcka processSentenceFormula ${currentLanguage}. headOutputUnitArrays had no successful members. 'klya' only had to fail once, and it did.` +
        "\n[0m"
    );

    return nullResultObj;
  }

  let explodedOutputArraysWithHeads = uUtils.copyWithoutReference(
    uUtils.arrayExploder(headOutputUnitArrays)
  );

  headOutputUnitArrays.forEach((houa) => {
    houa.forEach((ou) => {
      // console.log("eeee", ou.structureChunk);
      uUtils.validateArrayQuasiEmpty(ou.structureChunk.semanticGender, "47.1");
    });
  });

  //STEP TWO: Select DEPENDENT words and add to result array.
  explodedOutputArraysWithHeads.forEach(
    (headOutputArray, headOutputArrayIndex) => {
      let thisHeadOutputArrayIsDeleted;

      headOutputArray.forEach((headOutputUnit) => {
        if (thisHeadOutputArrayIsDeleted) {
          return;
        }

        // Now we update the head structure chunks with the details from their respective selectedWords.
        lfUtils.updateStructureChunk(
          headOutputUnit,
          currentLanguage,
          false,
          isCounterfax
        );

        let headChunk = headOutputUnit.structureChunk;

        // Step two begins here.
        let specificDependentChunks = dependentChunks
          .filter((chunk) => chunk.agreeWith === headChunk.chunkId)
          .map((chunk) => uUtils.copyWithoutReference(chunk));

        if (specificDependentChunks.length) {
          specificDependentChunks.forEach((dependentChunk) => {
            if (thisHeadOutputArrayIsDeleted) {
              return;
            }

            consol.log(
              "oiez sc:processSentenceFormula STEP TWO",
              dependentChunk.chunkId
            );

            scUtils.inheritFromHeadToDependentChunk(
              currentLanguage,
              headChunk,
              dependentChunk
            );

            consol.log(`weoe dependentChunk "${dependentChunk.chunkId}"`);
            let allPossOutputUnits_dependent =
              otUtils.findMatchingLemmaObjectThenWord(
                useDummyWords,
                dependentChunk,
                words,
                errorInSentenceCreation,
                currentLanguage,
                previousQuestionLanguage,
                questionOutputArr,
                multipleModes,
                null
              );

            if (
              errorInSentenceCreation.errorMessage ||
              !allPossOutputUnits_dependent ||
              !allPossOutputUnits_dependent.length
            ) {
              consol.log(
                "[1;31m " +
                  `klye trimArrayOfExplodedOutputArraysByFailures. explodedOutputArraysWithHeads has ${explodedOutputArraysWithHeads.length} members. Deleting headOutputArray at index ${headOutputArrayIndex} because no results were found for depCh "${dependentChunk.chunkId}" in this headOutputArray. \nThis happened in "STEP TWO: Select DEPENDENT words and add to result array."` +
                  "[0m"
              );

              explodedOutputArraysWithHeads =
                uUtils.returnArrayWithItemAtIndexRemoved(
                  explodedOutputArraysWithHeads,
                  headOutputArrayIndex
                );

              thisHeadOutputArrayIsDeleted = true;
            } else {
              if (!headOutputUnit.possibleDependentOutputArrays) {
                headOutputUnit.possibleDependentOutputArrays = [];
              }

              headOutputUnit.possibleDependentOutputArrays.push(
                allPossOutputUnits_dependent
              );
            }
          });
        } else {
          consol.log(
            "zvvs processSentenceFormula explodedOutputArraysWithHeads. specificDependentChunks had no length."
          );
        }
      });
    }
  );

  explodedOutputArraysWithHeads.forEach((houa) => {
    houa.forEach((ou) => {
      // console.log("ffff", ou.structureChunk);
      uUtils.validateArrayQuasiEmpty(ou.structureChunk.semanticGender, "47.2");
    });
  });

  if (headChunks.length && !explodedOutputArraysWithHeads.length) {
    consol.log(
      "[1;31m \n" +
        `#ERR bcke processSentenceFormula ${currentLanguage}. This run has FAILED due to explodedOutputArraysWithHeads having no successful members. 'klye' must have deleted all members of explodedOutputArraysWithHeads arr.` +
        "\n[0m"
    );

    if (!errorInSentenceCreation.errorMessage) {
      errorInSentenceCreation.errorMessage = [];
    }
    let newErrMsgs = [
      `#ERR b'cke processSentenceFormula ${currentLanguage}. This run has FAILED due to explodedOutputArraysWithHeads having no successful members. 'k'lye' must have deleted all members of explodedOutputArraysWithHeads arr.`,
      `k'lye trimArrayOfExplodedOutputArraysByFailures. explodedOutputArraysWithHeads has ${explodedOutputArraysWithHeads.length} members. Deleting a headOutputArray because no results were found for a depCh in this headOutputArray. \nThis happened in "STEP TWO: Select DEPENDENT words and add to result array."`,
    ];
    newErrMsgs.forEach((errMsg) => {
      errorInSentenceCreation.errorMessage.push(errMsg);
    });

    nullResultObj = {
      arrayOfOutputArrays: null,
      sentenceFormula,
      sentenceFormulaId,
      sentenceFormulaSymbol,
      errorInSentenceCreation,
    };
    return nullResultObj;
  }

  // consol.log(
  //   "wvmo explodedOutputArraysWithHeads",
  //   explodedOutputArraysWithHeads
  // );

  explodedOutputArraysWithHeads.forEach((arr) => {
    // consol.log(
    //   "mocu processSentenceFormula explodedOutputArraysWithHeads arr:",
    //   arr
    // );

    let result = gpUtils.explodeOutputArraysByHeadsAndDependents(arr);

    // consol.log("result of explodedOutputArraysWithHeads:", result);

    grandOutputArray.push(...result);
  });

  let grandAllPossOutputUnits_other = [];
  let grandAllPossOutputUnits_PHD = [];

  let postHocDependentChunks = otherChunks.filter((chunk) => chunk.PHD_type);

  postHocDependentChunks.forEach((stCh) => {
    if (!stCh.postHocAgreeWithPrimary) {
      consol.throw(
        `iayi ${currentLanguage} stCh "${stCh.chunkId}" is PHD_type "${stCh.PHD_type}" and yet no postHocAgreeWithPrimary?`
      );
    }
  });

  //STEP THREE: Select PHD words and add to result array.

  // consol.log("shia grandOutputArray before PHD processing", grandOutputArray);

  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
    let thisOutputArrayIsDeleted;

    let PHDoutputUnitsForThisParticularOutputArray = [];

    delete errorInSentenceCreation.errorMessage;

    consol.log("rhib grandOutputArray.length", grandOutputArray.length);
    consol.log(
      "rhic postHocDependentChunks.length",
      postHocDependentChunks.length
    );

    postHocDependentChunks.forEach((postHocDependentChunk) => {
      if (thisOutputArrayIsDeleted) {
        return;
      }

      consol.log(
        `weoo postHocDependentChunk "${postHocDependentChunk.chunkId}"`
      );

      let allPossOutputUnits_PHD = otUtils.findMatchingLemmaObjectThenWord(
        useDummyWords,
        postHocDependentChunk,
        words,
        errorInSentenceCreation,
        currentLanguage,
        previousQuestionLanguage,
        questionOutputArr,
        multipleModes,
        outputArray,
        true
      );

      consol.log("keph allPossOutputUnits_PHD", allPossOutputUnits_PHD);

      if (
        errorInSentenceCreation.errorMessage ||
        !allPossOutputUnits_PHD ||
        !allPossOutputUnits_PHD.length
      ) {
        consol.log(
          "[1;31m " +
            `klyi trimArrayOfExplodedOutputArraysByFailures. grandOutputArray has ${grandOutputArray.length} members. Deleting headOutputArray at index ${outputArrayIndex} because no results were found for PHDchunk "${postHocDependentChunk.chunkId}" in this outputArray. \nThis happened in "STEP THREE: Select PHD words and add to result array."` +
            "[0m"
        );

        grandOutputArray = returnArrayWithItemAtIndexRemoved(
          grandOutputArray,
          outputArrayIndex
        );

        thisOutputArrayIsDeleted = true;
      } else {
        //If multipleMode then allPossOutputUnits_other is array of outputUnit objects, else array of just one said object.
        PHDoutputUnitsForThisParticularOutputArray.push(allPossOutputUnits_PHD);
      }
    });

    if (
      !thisOutputArrayIsDeleted &&
      PHDoutputUnitsForThisParticularOutputArray.length
    ) {
      consol.log(
        "shiv PHDoutputUnitsForThisParticularOutputArray",
        PHDoutputUnitsForThisParticularOutputArray
      );

      PHDoutputUnitsForThisParticularOutputArray = uUtils.arrayExploder(
        PHDoutputUnitsForThisParticularOutputArray
      );

      consol.log(
        "shiw PHDoutputUnitsForThisParticularOutputArray",
        PHDoutputUnitsForThisParticularOutputArray
      );

      consol.log("shix outputArray", outputArray);

      thisParticularOutputArrayExplodedWithItsPHDs =
        gpUtils.combineAndExplodeTwoSuperArrays(
          [outputArray],
          PHDoutputUnitsForThisParticularOutputArray
        );

      consol.log(
        "shiy thisParticularOutputArrayExplodedWithItsPHDs",
        thisParticularOutputArrayExplodedWithItsPHDs
      );

      consol.log("shiz grandOutputArray", grandOutputArray);

      thisParticularOutputArrayExplodedWithItsPHDs.forEach(
        (individualOutputArrayExplodedWithItsPHDs, index) => {
          if (!index) {
            grandOutputArray[outputArrayIndex] =
              individualOutputArrayExplodedWithItsPHDs;
          } else {
            grandOutputArray.push(individualOutputArrayExplodedWithItsPHDs);
          }
        }
      );

      consol.log("shiz grandOutputArray", grandOutputArray);
    }
  });

  if ([...headChunks, ...dependentChunks].length && !grandOutputArray.length) {
    consol.log(
      "[1;31m \n" +
        `#ERR bcki processSentenceFormula ${currentLanguage}. grandOutputArray had no successful members. 'klyi' must have removed all members from grandOutputArray.` +
        "\n[0m"
    );

    if (!errorInSentenceCreation.errorMessage) {
      errorInSentenceCreation.errorMessage = [];
    }
    let newErrMsgs = [
      `#ERR b'cki processSentenceFormula ${currentLanguage}. grandOutputArray had no successful members. 'k'lyi' must have removed all members from grandOutputArray.`,
      `k'lyi trimArrayOfExplodedOutputArraysByFailures. grandOutputArray has ${grandOutputArray.length} members. Deleting a headOutputArray because no results were found for a PHDchunk in this outputArray. \nThis happened in "STEP THREE: Select PHD words and add to result array."`,
    ];
    newErrMsgs.forEach((errMsg) => {
      errorInSentenceCreation.errorMessage.push(errMsg);
    });

    nullResultObj = {
      arrayOfOutputArrays: null,
      sentenceFormula,
      sentenceFormulaId,
      sentenceFormulaSymbol,
      errorInSentenceCreation,
    };
    return nullResultObj;
  }

  // consol.log("shib grandOutputArray after PHD processing", grandOutputArray);

  //STEP FOUR: Select OTHER words and add to result array.
  otherChunks = otherChunks.filter(
    (chunk) =>
      !postHocDependentChunks
        .map((PHDchunk) => PHDchunk.chunkId)
        .includes(chunk.chunkId)
  );

  delete errorInSentenceCreation.errorMessage;

  otherChunks.forEach((otherChunk) => {
    if (nullResultObj) {
      return;
    }

    consol.log("qssh processSentenceFormula otherChunk", otherChunk);

    consol.log(`weoi otherChunk "${otherChunk.chunkId}"`);
    let allPossOutputUnits_other = otUtils.findMatchingLemmaObjectThenWord(
      useDummyWords,
      otherChunk,
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      questionOutputArr,
      multipleModes,
      null
    );

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_other ||
      !allPossOutputUnits_other.length
    ) {
      consol.log(
        "[1;31m " +
          `klyo processSentenceFormula. This run has FAILED, due to otherChunk: "${otherChunk.chunkId}" failing in findMatchingLemmaObjectThenWord. \nThis happened in "STEP FOUR: Select OTHER words and add to result array."` +
          +"[0m"
      );

      if (!errorInSentenceCreation.errorMessage) {
        errorInSentenceCreation.errorMessage = [];
      }
      let newErrMsgs = [
        `k'lyo processSentenceFormula. This run has FAILED, due to otherChunk: "${otherChunk.chunkId}" failing in findMatchingLemmaObjectThenWord. \nThis happened in "STEP FOUR: Select OTHER words and add to result array."`,
        `#ERR b'cko processSentenceFormula ${currentLanguage}. allPossOutputUnits_other had no successful members. 'k'lyo' only had to fail once, and it did.`,
      ];
      newErrMsgs.forEach((errMsg) => {
        errorInSentenceCreation.errorMessage.push(errMsg);
      });

      nullResultObj = {
        arrayOfOutputArrays: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    //If multipleMode then allPossOutputUnits_other is array of outputUnit objects, else array of just one said object.
    grandAllPossOutputUnits_other.push(allPossOutputUnits_other);
  });

  if (nullResultObj) {
    consol.log(
      "[1;31m \n" +
        `#ERR bcko processSentenceFormula ${currentLanguage}. allPossOutputUnits_other had no successful members. 'klyo' only had to fail once, and it did.` +
        "\n[0m"
    );

    return nullResultObj;
  }

  if (grandAllPossOutputUnits_other.length) {
    grandAllPossOutputUnits_other = uUtils.arrayExploder(
      grandAllPossOutputUnits_other
    );

    grandOutputArray = gpUtils.combineAndExplodeTwoSuperArrays(
      grandOutputArray,
      grandAllPossOutputUnits_other
    );
  }

  //If multipleMode then grandOutputArray is array of all possible arrays of outputUnit combinations,
  //else array of just one said possible array.

  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
    outputArray.forEach((outputUnit) => {
      let { structureChunk } = outputUnit;

      if (gpUtils.getWordtypeStCh(structureChunk) === "fixed") {
        return;
      }

      uUtils.validateArrayQuasiEmpty(
        outputUnit.structureChunk.semanticGender,
        "47b"
      );

      lfUtils.updateStructureChunk(
        outputUnit,
        currentLanguage,
        true,
        isCounterfax
      );
    });

    //Decanting otherChunks if they have multiple traitValues.
    let { headChunks, dependentChunks, otherChunks } =
      scUtils.sortStructureChunks(
        outputArray.map((outputUnit) => outputUnit.structureChunk)
      );
    otherChunks.forEach((otherChunk) => {
      let selectedLObj = outputArray.find(
        (outputUnit) => outputUnit.structureChunk.chunkId === otherChunk.chunkId
      ).selectedLemmaObject;

      if (otherChunk.dontSpecifyOnThisChunk) {
        return;
      }

      Object.keys(otherChunk).forEach((traitKey) => {
        let traitValue = otherChunk[traitKey];

        let reference =
          refObj.structureChunkTraits[currentLanguage][traitKey] ||
          refObj.structureChunkTraits["ALL"][traitKey];

        if (!reference) {
          consol.throw(
            `elsz I think "${traitKey}" is not a valid traitKey. currentLanguage:"${currentLanguage}".`
          );
        }

        if (
          reference.expectedTypeOnStCh === "array" &&
          !reference.ultimatelyMultipleTraitValuesOkay &&
          traitValue.length > 1
        ) {
          consol.log(`pqoi Decanting "${otherChunk.chunkId}" "${traitKey}".`);
          lfUtils.selectRandTraitValue(selectedLObj, otherChunk, traitKey);
        }
      });
    });
  });

  return {
    arrayOfOutputArrays: grandOutputArray,
    sentenceFormula,
    sentenceFormulaId,
    sentenceFormulaSymbol,
    errorInSentenceCreation,
  };
};

exports.giveFinalSentences = (
  sentenceData,
  multipleMode,
  currentLanguage,
  answerLanguage,
  answerSentenceData,
  questionSentenceFormula,
  reqBody,
  answerSelectedWordsSetsHaveChanged,
  runsRecord
) => {
  let {
    answerOutputArrays,
    questionOutputArr,
    sentenceFormula,
    errorInSentenceCreation,
  } = sentenceData;

  if ("check") {
    if (!multipleMode && answerOutputArrays && answerOutputArrays.length) {
      consol.throw(
        "#ERR ubrz giveFinalSentences. Well that's strange. We are in Question Mode, so SC:giveFinalSentences expected to be given questionOutputArr, not answerOutputArrays."
      );
    }

    if (errorInSentenceCreation.errorMessage) {
      let errorMessage = {
        errorInSentenceCreation: errorInSentenceCreation.errorMessage,
      };

      return {
        message: "No sentence could be created from the specifications in Q.",
        finalSentence: null,
        errorMessage,
      };
    }

    if (
      answerSentenceData &&
      answerSentenceData.errorInSentenceCreation.errorMessage
    ) {
      let errorMessage = {
        errorInSentenceCreation:
          answerSentenceData.errorInSentenceCreation.errorMessage,
      };

      return {
        message: "No sentence could be created from the specifications in A.",
        finalSentence: null,
        errorMessage,
      };
    }
  }

  let finalSentenceArr = [];

  if (!multipleMode) {
    if (answerLanguage) {
      aaUtils.firstStageEvaluateAnnotations(
        questionOutputArr,
        { answerLanguage, questionLanguage: currentLanguage },
        answerSentenceData,
        questionSentenceFormula,
        reqBody,
        answerSelectedWordsSetsHaveChanged,
        runsRecord
      );
    }

    // consol.log("jfuc questionOutputArr", questionOutputArr);

    let finalSentences = scUtils.buildSentenceString(
      questionOutputArr,
      sentenceFormula,
      multipleMode,
      currentLanguage,
      answerLanguage
    );

    finalSentences.forEach((finalSentence) => {
      finalSentenceArr.push(finalSentence);
    });
  } else {
    answerOutputArrays.forEach((outputArr) => {
      let finalSentences = scUtils.buildSentenceString(
        outputArr,
        sentenceFormula,
        multipleMode,
        currentLanguage,
        null
      );

      finalSentences.forEach((finalSentence) => {
        finalSentenceArr.push(finalSentence);
      });
    });
  }

  let responseObj = {
    finalSentenceArr,
  };

  return responseObj;
};

exports.buildSentenceString = (
  unorderedArr,
  sentenceFormula,
  multipleMode,
  currentLanguage,
  answerLanguage
) => {
  consol.log("[1;35m " + "cghk buildSentenceString" + "[0m");
  consol.log(
    "cghk buildSentenceString unorderedArr",
    unorderedArr.map((outputUnit) => outputUnit.selectedWord)
  );

  let outputArrays = [];
  let producedSentences = [];

  // STEP 0: Get orders.
  if (!sentenceFormula.primaryOrders || !sentenceFormula.primaryOrders.length) {
    consol.log(
      "[1;31m " +
        `npqq buildSentenceString No primaryOrders were specified for "${sentenceFormula.sentenceFormulaSymbol}" with ID "${sentenceFormula.sentenceFormulaId}". Using default order that structureChunks were defined in.` +
        "[0m"
    );
    consol.log("kfzo buildSentenceString c13 gonna push unorderedArr Clause 0");
    outputArrays.push(unorderedArr);
  } else {
    if (multipleMode) {
      let allOrders = [];
      if (sentenceFormula.primaryOrders) {
        allOrders = [...allOrders, ...sentenceFormula.primaryOrders];
      }
      if (sentenceFormula.additionalOrders) {
        allOrders = [...allOrders, ...sentenceFormula.additionalOrders];
      }

      allOrders.forEach((order) => {
        let orderedArr = [];
        order.forEach((chunkId) => {
          consol.log("gibo buildSentenceString", { chunkId });
          let foundChunk = unorderedArr.find(
            (item) => item.structureChunk.chunkId === chunkId
          );
          if (!foundChunk) {
            consol.log(
              "[1;31m " +
                "cyjk buildSentenceString: Could not find for " +
                chunkId +
                " [0m"
            );
          }
          orderedArr.push(foundChunk);
        });
        consol.log("qnob buildSentenceString Gonna push orderedArr Clause 1");
        outputArrays.push(orderedArr);
      });
    } else {
      let order = uUtils.selectRandom(sentenceFormula.primaryOrders);

      let orderedArr = [];
      order.forEach((chunkId) => {
        orderedArr.push(
          unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
        );
      });
      consol.log("xsqr buildSentenceString Gonna push orderedArr Clause 3");
      outputArrays.push(orderedArr);
    }
  }

  //STEP 1: In Q mode, for each outputArr, if there is a chunk with annos but that didn't make it in there, keep the annos.
  if (!multipleMode) {
    outputArrays.forEach((outputArr) => {
      unorderedArr.forEach((originalUnit) => {
        if (
          !outputArr.find(
            (unit) =>
              unit.structureChunk.chunkId ===
              originalUnit.structureChunk.chunkId
          ) &&
          originalUnit.firstStageAnnotationsObj &&
          Object.keys(originalUnit.firstStageAnnotationsObj).length
        ) {
          let skeletonOutputUnit = {
            isSkeleton: true,
            firstStageAnnotationsObj: originalUnit.firstStageAnnotationsObj,
            structureChunk: {
              chunkId: originalUnit.structureChunk.chunkId,
            },
          };

          outputArr.unshift(skeletonOutputUnit);
        }
      });
    });
  }

  // STEP 2: Select word versions for each.
  outputArrays.forEach((outputArr) => {
    let arrOfFinalSelectedWordsArr = scUtils.selectWordVersions(
      outputArr,
      currentLanguage,
      multipleMode
    );

    if (!multipleMode && arrOfFinalSelectedWordsArr.length > 1) {
      consol.log(
        "[1;31m " +
          `twwe buildSentenceString NB: Randomly selecting one for question sentence.` +
          "[0m"
      );
      arrOfFinalSelectedWordsArr = uUtils.selectRandom(
        arrOfFinalSelectedWordsArr
      );
    }

    arrOfFinalSelectedWordsArr.forEach((finalSelectedWordsArr) => {
      let producedSentence = finalSelectedWordsArr[0];
      finalSelectedWordsArr.slice(1).forEach((str) => {
        if (refObj.punctuation.includes(str)) {
          producedSentence += str;
        } else {
          producedSentence += ` ${str}`;
        }
      });
      if (
        !refObj.punctuation.includes(
          finalSelectedWordsArr[finalSelectedWordsArr.length - 1]
        )
      ) {
        producedSentence += ".";
      }

      producedSentences.push(uUtils.capitaliseFirst(producedSentence));
    });
  });

  return producedSentences;
};

exports.selectWordVersions = (
  orderedOutputArr,
  currentLanguage,
  multipleMode
) => {
  let shouldConsoleLog = false;
  let selectedWordsArr = [];
  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);

  //STEP 0: If in Q mode, bring annos in from skeleton units.
  if (!multipleMode) {
    orderedOutputArr.forEach((outputUnit, outputUnitIndex) => {
      if (outputUnit.isSkeleton) {
        let skeletonOutputUnit = outputUnit;

        let depUnits = [];

        let agreementTraits = ["agreeWith"];

        agreementTraits.forEach((agreeKey) => {
          orderedOutputArr.forEach((unit) => {
            //Skeleton Clause
            if (
              unit.structureChunk[agreeKey] ===
              skeletonOutputUnit.structureChunk.chunkId
            )
              depUnits.push(unit);
          });
        });

        let doneAnnoTraitKeys = [];

        Object.keys(skeletonOutputUnit.firstStageAnnotationsObj).forEach(
          (annoTraitKey) => {
            let annoTraitValue =
              skeletonOutputUnit.firstStageAnnotationsObj[annoTraitKey];

            let thisAnnoTraitKeyIsDone = false;

            depUnits.forEach((depUnit) => {
              if (thisAnnoTraitKeyIsDone) {
                return;
              }

              if (
                //If the annoTraitKey from the skeleton outputUnit's annos is an allowable transfer to this depCh,
                refObj.lemmaObjectTraitKeys[
                  currentLanguage
                ].inheritableInflectionKeys[
                  gpUtils.getWordtypeStCh(depUnit.structureChunk)
                ].includes(annoTraitKey)
              ) {
                if (!depUnit.firstStageAnnotationsObj) {
                  depUnit.firstStageAnnotationsObj = {};
                }

                if (
                  depUnit.firstStageAnnotationsObj[annoTraitKey] &&
                  depUnit.firstStageAnnotationsObj[annoTraitKey] !==
                    annoTraitValue
                ) {
                  consol.throw(
                    `ioev selectWordVersions Skeleton Clause. I'm trying to transfer in annos from an outputunit that didn't make it into this outputarr. But I'm looking at one of its depChs, and this depCh has an anno with a different annoTraitValue?\nFor annoTraitKey "${annoTraitKey}", skeleton "${skeletonOutputUnit.structureChunk.chunkId}" had "${annoTraitValue}" while depCh "${depCh.chunkId}" had "${depUnit.firstStageAnnotationsObj[annoTraitKey]}".`
                  );
                }

                //then transfer it to the depUnit.
                depUnit.firstStageAnnotationsObj[annoTraitKey] = annoTraitValue;
                doneAnnoTraitKeys.push(annoTraitKey);
                thisAnnoTraitKeyIsDone = true;
              }
            });
          }
        );

        let abandonedAnnoTraitKeys = Object.keys(
          skeletonOutputUnit.firstStageAnnotationsObj
        ).filter((annoTraitKey) => !doneAnnoTraitKeys.includes(annoTraitKey));

        if (abandonedAnnoTraitKeys.length) {
          consol.throw(
            `wtsu selectWordVersions Skeleton Clause. These annoTraitKeys from skeleton "${skeletonOutputUnit.structureChunk.chunkId}" did not make it into outputArr in any way! [${abandonedAnnoTraitKeys}].`
          );
        }

        //Removing skeleton unit.
        orderedOutputArr.splice(outputUnitIndex, 1);
        return;
      }
    });
  }

  //STEP 1: Select and push.

  orderedOutputArr.forEach((outputUnit, index) => {
    //Effectively delete any zeroType selectedWords, ie the zero article.
    if (outputUnit.selectedWord === "∅") {
      return;
    }

    //1A: If string, push to array.

    let previousOutputUnit = orderedOutputArr[index - 1];
    let subsequentOutputUnit = orderedOutputArr[index + 1];
    let {
      selectedWord,
      structureChunk,
      drillPath,
      selectedLemmaObject,
      firstStageAnnotationsObj,
    } = outputUnit;

    if (shouldConsoleLog) {
      consol.log("[1;33m " + `nilu selectWordVersions----------------` + "[0m");
      consol.log("[1;33m " + `selectedWord` + "[0m", selectedWord);
      consol.log("[1;33m " + `structureChunk` + "[0m", structureChunk);
      consol.log("[1;33m " + `drillPath` + "[0m", drillPath);
      consol.log("[1;33m " + `/nilu----------------` + "[0m");
    }

    if (typeof selectedWord === "string") {
      frUtils.pushSelectedWordToArray(
        "string",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return;
    }

    //1B: If tObj, push to array via language specific selectWordVersions.
    if (gpUtils.isTerminusObject(selectedWord)) {
      if (
        langUtils.selectWordVersions(
          structureChunk,
          subsequentOutputUnit,
          selectedWord,
          selectedWordsArr,
          firstStageAnnotationsObj,
          selectedLemmaObject,
          previousOutputUnit,
          multipleMode
        )
      ) {
        return;
      }
    } else {
      consol.throw(
        `#ERR oilf selectWordVersions. I expected either a string or a terminus object for this selectedWord but instead it is ${typeof selectedWord}.`
      );
    }

    consol.log("oadb selectWordVersions", { selectedWord });
    consol.throw(
      `oadb selectWordVersions didn't add any word from "${structureChunk.chunkId}" and see selectedWord above.`
    );
  });

  shouldConsoleLog &&
    consol.log("hjoz selectWordVersions selectedWordsArr", selectedWordsArr);

  let arrOfSelectedWordsArr = uUtils.arrayExploder(selectedWordsArr);

  shouldConsoleLog &&
    consol.log(
      "hjoz selectWordVersions arrOfSelectedWordsArr",
      arrOfSelectedWordsArr
    );

  return arrOfSelectedWordsArr;
};

exports.conformAnswerStructureToQuestionStructure = (
  sentenceFormula,
  questionOutputArr,
  languagesObj,
  words
) => {
  consol.logSpecial(
    8,
    "[1;33m " + `conformAnswerStructureToQuestionStructure START...` + "[0m"
  );
  questionOutputArr.forEach((outputUnit) => {
    consol.logSpecial(8, {
      "outputUnit.selectedWord": outputUnit.selectedWord,
      "outputUnit.selectedLemmaObject.id": outputUnit.selectedLemmaObject.id,
      "outputUnit.structureChunk.gender": outputUnit.structureChunk.gender,
      "outputUnit.structureChunk.semanticGender":
        outputUnit.structureChunk.semanticGender,
      "outputUnit.structureChunk.hypernymy":
        outputUnit.structureChunk.hypernymy,
    });
  });
  consol.logSpecial(
    8,
    "[1;33m " + `conformAnswerStructureToQuestionStructure START.` + "[0m"
  );

  let shouldConsoleLog = false;

  consol.log("[1;35m " + `(aegh sc:conformAnswerStructureToQuestionStructure)` + "[0m");

  let { sentenceStructure } = sentenceFormula;
  let { questionLanguage, answerLanguage } = languagesObj;
  const questionLangUtils = require(`../source/all/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/all/${answerLanguage}/langUtils.js`);

  questionOutputArr.forEach((questionOutputArrItem) => {
    //
    // STEP ZERO: Get necessary materials.
    //
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    if (gpUtils.getWordtypeStCh(questionStructureChunk) === "fixed") {
      return;
    }

    if (shouldConsoleLog) {
      consol.log(
        "rxez conformAnswerStructureToQuestionStructure questionStructureChunk",
        questionStructureChunk
      );
    }

    let questionSelectedLemmaObject = questionOutputArrItem.selectedLemmaObject;
    let questionSelectedWord = questionOutputArrItem.selectedWord;

    let answerStructureChunk = sentenceStructure.find(
      (structureChunk) =>
        structureChunk.chunkId === questionStructureChunk.chunkId
    );

    if (!answerStructureChunk) {
      consol.log(
        "dtph #NB sc:conformAnswerStructureToQuestionStructure couldn't find any answerStructureChunk for '" +
          questionStructureChunk.chunkId +
          "'."
      );
      return;
    }

    let matchingAnswerLemmaObjects = [];

    let lObjsToSearch = nexusUtils.getTraductions(
      questionSelectedLemmaObject,
      answerLanguage,
      false
    );

    let source = words[gpUtils.getWordtypeShorthandStCh(answerStructureChunk)];
    source = source.filter(
      //Resolve issue of multipleWordtype allohoms.
      (lObj) =>
        gpUtils.getWordtypeLObj(lObj) ===
        gpUtils.getWordtypeStCh(questionStructureChunk)
    );

    matchingAnswerLemmaObjects = lfUtils.getLObjAndSiblings(
      source,
      lObjsToSearch,
      false,
      "conformAtoQ",
      questionSelectedLemmaObject
    );

    let matchesLengthSnapshot = matchingAnswerLemmaObjects.length;

    matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
      (answerLemmaObject) =>
        uUtils.areTwoFlatArraysEqual(
          nexusUtils.getPapers(questionSelectedLemmaObject),
          nexusUtils.getPapers(answerLemmaObject)
        )
    );

    if (matchesLengthSnapshot && !matchingAnswerLemmaObjects.length) {
      consol.log(
        "[1;31m " +
          `wtlg conformAnswerStructureToQuestionStructure #NB: There were some lemma objects, but they were filtered out because they didn't have all tags matching.` +
          "[0m"
      );
    }

    if (!matchingAnswerLemmaObjects.length) {
      consol.log(
        "ltqf conformAnswerStructureToQuestionStructure #NB There were no matching answer lemma objects found in SC:conformAnswerStructureToQuestionStructure"
      );
      return;
    }

    //...and then for both pronombres and all other wordtypes, we get the ID and set it.
    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    //Do actually transfer gender, for person nouns.
    if (gpUtils.stChIsNounPerson(questionStructureChunk)) {
      scUtils.addTraitToAnswerChunkWithAdjustment(
        questionStructureChunk,
        answerStructureChunk,
        "gender",
        questionLanguage,
        answerLanguage
      );

      scUtils.addTraitToAnswerChunkWithAdjustment(
        questionStructureChunk,
        answerStructureChunk,
        "semanticGender",
        questionLanguage,
        answerLanguage
      );
    }

    // <Issue 205: Neon Approach>

    // scUtils.enforceMaxLObjStems(matchingAnswerLemmaObjects, 1);
    // let answerStructureChunkGenderCopy =
    //   answerStructureChunk.gender && answerStructureChunk.gender.slice();
    // let matchingAnswerLemmaObjectsCopy = matchingAnswerLemmaObjects.map(
    //   (l) => l.id
    // );

    // if (
    //   matchingAnswerLemmaObjects.some((l) => l.gender === "_VypernymGenders")
    // ) {
    //   let allLObjsForThisIdStem = nexusUtils.getTraductions(
    //     matchingAnswerLemmaObjects[0],
    //     answerLanguage,
    //     true,
    //     true
    //   );
    //   let nonFeminineLObjs = allLObjsForThisIdStem.filter(
    //     (l) => l.gender !== "f"
    //   );
    //   answerStructureChunk.demandedIds = nonFeminineLObjs.map(
    //     (lObj) => lObj.id
    //   );
    // }

    // </Issue 205: Neon Approach>

    /////////////////////////////////////////////////////////////////////////////

    /**
     * V/HYPERNYM CORRECTIONS, ISSUE 205
     *
     *
     *
     * Issue 205: Neon Approach
     *
     * So when filtering by gender, in all places where that happens,
     * check to see if the Q lobj and potential A lobj have semanticGender.
     * If so, use that instead of grammatical gender to filter.
     *
     * Also, in conformAtoQ?
     *
     * Q Eng "child" (female)
     * Q stCh gender: ["f"]
     * ->conformAtoQ->
     * A Pol "dziecko" {g: "n", sg: "_personal"}
     * A stCh gender: ["f"] // But filtering processes will allow "dziecko" lobj to be selected.
     *
     * Q Eng "children" (nv)
     * Q stCh gender: ["nv"]
     * ->conformAtoQ
     * A Spa "ninyo" {g: "m", sg: "_vypernym"}
     * A stCh gender ["nv"] // But filtering processes will allow "ninyo" to be selected.
     *
     * Q Spa "chica" (f)
     * Q stCh gender: ["f"]
     * ->conformAtoQ
     * A Eng "child" {g: "_personal"}
     * A stCh gender ["nv"] // But filtering processes will allow "ninyo" to be selected.
     *
     *
     *
     * English MGN lobjs: "doctor"
     *
     * gender: "_PersonalGenders"
     *
     *
     *
     * English Hypernym lobjs: "parent", "child"
     *
     * gender: "_PersonalGenders"
     * semanticGender: "_PersonalGenders" (although redundant)
     *
     *
     *
     * Polish Hypernym lobjs: "rodzic", "dziecko"
     *
     * gender: "m1" / "n"
     * semanticGender: "_PersonalGenders"
     *
     *
     *
     * Spanish MGN lobjs: "amante"
     *
     * gender: "_PersonalGenders"
     *
     *
     *
     * Spanish Vypernym lobjs: "padre", "chico"
     *
     * gender: "m"
     * semanticGender: "_VypernymGenders"           (["m","virile","nonvirile"] but not singular female)
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * THOUGHT 2:
     *
     * Okay yes, so, because of all this gender changing needed when Q->A re £ and €,
     * so it's in conformAtoQ where we need to put in a series of conditional logic, right?
     *
     * conformAtoQ
     *
     * English to Spanish
     *         f hypo    f hyper              m vyper                         f
     * If Q is "GIRL" or "CHILD", and A is "NINYO/A", then translate to "NINYA" only.
     *         m hypo    m hyper              m vyper                         m
     * If Q is "BOY" or "CHILD",  and A is "NINYO/A", then translate to "NINYO" only.
     *
     *         nv hypo    nv hyper           vi vyper                         nv
     * If Q is "GIRLS" or "CHILDS", and A is "NINYO/AS", then translate to "NINYAS" only.
     *         vi hypo    vi hyper           vi vyper                         vi
     * If Q is "BOYS" or "CHILDS",  and A is "NINYO/AS", then translate to "NINYOS" only.
     *
     * Spanish to English
     *         f vypo                       ? hyper                         f          f
     * If Q is "CHICA"             and A is "B/G/CHILD", then translate to "GIRL" and "CHILD".
     *         m vypo                       ? hyper                         m          ?
     * If Q is "CHICO"             and A is "B/G/CHILD", then translate to "BOY" and "CHILD".
     *
     *         nv vypo                      ? hyper                         nv          nv
     * If Q is "CHICAS"            and A is "B/G/CHILDS", then translate to "GIRLS" and "CHILDS".
     *         vi vypo                      ? hyper                         vi          ?
     * If Q is "CHICOS"            and A is "B/G/CHILDS", then translate to "BOYS" and "CHILDS".
     *
     *
     * o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o
     * 0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o
     * Here's a question: Q "Chicos." so A clearly ["Boys.", "Children."]
     * But what about Q: "Chicas." ? should A be ["Girls."] or ["Girls.", "Children."] ?
     * o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o
     * 0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o
     *
     *
     * English to Polish
     *          f hyper                     m1 hyper                        m1
     * If Q is  "PARENT",          and A is "RODZIC", then translate to "RODZIC" --but set PHDGender to 'f'--
     *         m hyper                      n hyper                         m1
     * If Q is  "PARENT",          and A is "RODZIC", then translate to "RODZIC" --and keep gender as 'm1'--
     *
     *         nv hyper                    vi hyper                         vi
     * If Q is  "PARENTS",         and A is "RODZICE", then translate to "RODZICE" --but set PHDGender to 'nv'--
     *         vi hyper                    vi hyper                         vi
     * If Q is  "PARENTS",         and A is "RODZICE", then translate to "RODZICE" --and keep gender as 'vi'--
     *
     * (And for "DZIECKO" both boy child and girl child will need a PHDGender as dziecko is neuter.)
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * Wait, so actually, instead of doing all these adjustments here,
     * why don't we adjust the filtering by gender, wherever that happens
     * so that £ and € allow for all genders?
     *
     * Okay, so there's lot of gender changing that needs to be done.
     *
     * Fundamentally this is because, while most of the time, gender is preserved for npe when Q to A:
     * lady -> kobieta, on -> he, chica -> girl
     *
     * But when it comes to £ and €, that goes out the window, see below.
     * "dziecko" is neuter but must translate with "child" male and "child" female.
     * "dziecko" is neuter but must translate with "chico" male and "chica" female.
     *
     *    £                               £
     * Q "parent"  f  should change to A "rodzic"n m1 (with semantic f for PHD)
     * Q "child"   f  should change to A "dziecko" n  (with semantic f for PHD)
     * Q "child"   m1 should change to A "dziecko" n  (with semantic m1 for PHD)
     * Q "parents" nv should change to A "rodzice" virile
     *
     *    £                               €
     * Q "parent"  f  should change to A "madre" f       Surely this already happens automatically? I see no barrier..
     * Q "child"   f  should change to A "ninya" f       "
     * Q "parents" nv should change to A "padres" virile
     *
     *
     * A further thought - "chico" should translate as both "boy" and "child"
     *                     "chica" should translate as both "girl" and "child"
     *
     *
     *
     *
     *
     * THOUGHT 1:
     *
     * Q ENG Hypernyms must be set to gender m1/virile for A POL Hypernyms
     * eg if Q lobj is "parent" and q stch gender is "f" or "nonvirile"
     * then we need to change this to masculine for A POL lobj "rodzic".
     *
     *         QUESTION                  ANSWER          CHANGE ANSWER TO
     * 205-i)  parent-£ gender:[f]       padre-€         madre
     * 205-ii) parent-£ gender:[f]       rodzic-£(m1)    gender[m/vir] but set semanticGender to f/nonv (for PHD inheritance ie possessives)
     *
     * So with ii) it should successfully generate:
     *
     *    Q: I gave the parent HER book.
     *    A: Di la MADRE su libro.
     *
     *    Q: I gave the parent HER book.
     *    A: Dałem rodzicowi JEJ ksiazke.
     *
     *    and likewise HIM...JEGO although that one was never in doubt.
     */

    // <Issue 205: Helium Approach>

    // scUtils.enforceMaxLObjStems(matchingAnswerLemmaObjects, 1);
    // let answerStructureChunkGenderCopy =
    //   answerStructureChunk.gender && answerStructureChunk.gender.slice();
    // let matchingAnswerLemmaObjectsCopy = matchingAnswerLemmaObjects.map(
    //   (l) => l.id
    // );

    // // 205-i)
    // if (
    //   lfUtils.checkHyper(questionSelectedLemmaObject, ["hypernym"]) &&
    //   questionStructureChunk.gender &&
    //   questionStructureChunk.gender.length &&
    //   questionStructureChunk.gender.every((el) =>
    //     ["f", "nonvirile"].includes(el)
    //   ) &&
    //   matchingAnswerLemmaObjects.some((l) =>
    //     lfUtils.checkHyper(l, ["vypernym"])
    //   )
    // ) {
    //   let allLObjsForThisIdStem = nexusUtils.getTraductions(
    //     matchingAnswerLemmaObjects[0],
    //     answerLanguage,
    //     true,
    //     true
    //   );
    //   let feminineLObjs = allLObjsForThisIdStem.filter((l) => l.gender === "f");
    //   if (feminineLObjs.length !== 1) {
    //     consol.throw(
    //       `wabh Unsure how to proceed. Expected feminineLObjs length 1 but got ${feminineLObjs.length}.`
    //     );
    //   }
    //   matchingAnswerLemmaObjects = feminineLObjs;
    //   consol.logSpecial(
    //     7,
    //     `lvdi matchingAnswerLemmaObjects for`,
    //     questionSelectedLemmaObject.id,
    //     `was`,
    //     matchingAnswerLemmaObjectsCopy,
    //     `is now only the feminine ones`,
    //     matchingAnswerLemmaObjects.map((l) => l.id)
    //   );
    // }

    // if (
    //   ["hypernym", "vypernym"].includes(
    //     lfUtils.assessHypernymy(matchingAnswerLemmaObjects[0])
    //   ) &&
    //   answerStructureChunk.gender &&
    //   ["f", "nonvirile"].some((el) => answerStructureChunk.gender.includes(el))
    // ) {
    //   if (
    //     !["hypernym"].includes(
    //       lfUtils.assessHypernymy(questionSelectedLemmaObject)
    //     )
    //   ) {
    //     consol.throw("mdwb How did we get here?");
    //   }
    //   answerStructureChunk.gender = answerStructureChunk.gender.map((el) => {
    //     if (el === "f") {
    //       return "m1";
    //     }
    //     if (el === "nonvirile") {
    //       return "virile";
    //     }
    //     return el;
    //   });
    //   consol.logSpecial(
    //     7,
    //     `mdwc Have set gender of this hypernym to masculine.`,
    //     {
    //       answerStructureChunkGenderPREVIOUSLY: answerStructureChunkGenderCopy,
    //       answerStructureChunkGenderNOW: answerStructureChunk.gender,
    //       questionLObj: questionSelectedLemmaObject.id,
    //       answerLObj: matchingAnswerLemmaObjects[0].id,
    //     }
    //   );
    // }

    // </Issue 205: Helium Approach>

    refObj.lemmaObjectTraitKeys[
      answerLanguage
    ].allowableTransfersFromQuestionStructure[
      gpUtils.getWordtypeStCh(answerStructureChunk)
    ].forEach((traitKey) => {
      //
      // STEP ONE: Update traits from list of allowable transfers.
      //

      consol.logSpecial(5, ">>>>>>>>>>>>>>>>>", questionStructureChunk.chunkId);
      consol.logSpecial(5, answerStructureChunk);

      if (traitKey === "number") {
        consol.logSpecial(5, "qqqa", questionStructureChunk.number);
      }

      //Step-T, dealing with hidden values.
      let nonhiddenTraitValue;
      if (
        questionStructureChunk.hiddenTraits &&
        questionStructureChunk.hiddenTraits[traitKey]
      ) {
        nonhiddenTraitValue = uUtils.copyWithoutReference(
          questionStructureChunk[traitKey]
        );
        questionStructureChunk[traitKey] = uUtils.copyWithoutReference(
          questionStructureChunk.hiddenTraits[traitKey]
        );
      }

      if (traitKey === "number") {
        consol.logSpecial(5, "qqqb", questionStructureChunk.number);
      }

      if (!questionStructureChunk[traitKey]) {
        return;
      }

      if (
        answerStructureChunk.formulaImportantTraitKeys &&
        answerStructureChunk.formulaImportantTraitKeys.includes(traitKey)
      ) {
        consol.log(
          "jngy conformAnswerStructureToQuestionStructure I will not transfer '" +
            traitKey +
            "' in SC:conformAtoQ step 1, as marked important in answerStCh."
        );
        return;
      }

      if (traitKey === "tenseDescription") {
        answerStructureChunk["tenseDescription"] = []; //Hard adjust.

        let tenseDescriptions = questionStructureChunk["tenseDescription"];

        questionLangUtils.adjustTenseDescriptionsBeforeTranslating(
          tenseDescriptions,
          questionSelectedLemmaObject
        );

        tenseDescriptions.forEach((tenseDesc) => {
          let translatedTenseDescArr = refFxn.getTranslatedTenseDescription(
            tenseDesc,
            questionLanguage,
            answerLanguage
          );

          consol.log(
            `poji conformAnswerStructureToQuestionStructure. ${questionLanguage} ${questionStructureChunk.chunkId}'s tenseDesc "${tenseDesc}" give these translatedTenseDescArr for ${answerLanguage}: [${translatedTenseDescArr}].`
          );

          if (!translatedTenseDescArr || !translatedTenseDescArr.length) {
            consol.throw(
              `poji. translatedTenseDescArr came back blank, see above.`
            );
          }

          answerStructureChunk["tenseDescription"] = [
            ...answerStructureChunk["tenseDescription"],
            ...translatedTenseDescArr,
          ];
        });

        if (answerStructureChunk.blockedTenseDescriptions) {
          answerStructureChunk.blockedTenseDescriptions.forEach(
            (blockedTenseDesc) => {
              answerStructureChunk["tenseDescription"] = answerStructureChunk[
                "tenseDescription"
              ].filter((tenseDesc) => tenseDesc !== blockedTenseDesc);
            }
          );
        }

        return;
      }

      scUtils.addTraitToAnswerChunkWithAdjustment(
        questionStructureChunk,
        answerStructureChunk,
        traitKey,
        questionLanguage,
        answerLanguage
      );

      consol.logSpecial(5, answerStructureChunk);

      //Step-T, dealing with hidden values.
      if (
        questionStructureChunk.hiddenTraits &&
        questionStructureChunk.hiddenTraits[traitKey]
      ) {
        questionStructureChunk[traitKey] = nonhiddenTraitValue;
      }
    });

    //
    //PART TWO: Blinding
    //

    //Check for traits-of-answer-lang-lobjs-that-aren't-traits-of-question-lang-lobjs.
    // So when going ENG to POL, that would be gender of nco.
    // And then, with that list of traits, we will blind the answer structureChunks to these traits.

    let possibleInflectionCategorysOfQuestionLobjs =
      refObj.lemmaObjectTraitKeys[questionLanguage].inflectionChains[
        gpUtils.getWordtypeStCh(answerStructureChunk)
      ];

    let possibleInflectionCategorysOfAnswerLobjs =
      refObj.lemmaObjectTraitKeys[answerLanguage].inflectionChains[
        gpUtils.getWordtypeStCh(answerStructureChunk)
      ];

    let possibleInflectionCategorysOfAnswerLobjsButNotQuestionLobjs =
      possibleInflectionCategorysOfAnswerLobjs.filter(
        (inflectionCategory) =>
          !possibleInflectionCategorysOfQuestionLobjs.includes(
            inflectionCategory
          )
      );

    possibleInflectionCategorysOfAnswerLobjsButNotQuestionLobjs.forEach(
      (inflectionCategory) => {
        if (
          !answerStructureChunk.formulaImportantTraitKeys ||
          !answerStructureChunk.formulaImportantTraitKeys.includes(
            inflectionCategory
          )
        ) {
          answerStructureChunk[inflectionCategory] = [];
        }
      }
    );

    allLangUtils.convertmetaTraitValues(
      [answerStructureChunk],
      answerLanguage,
      "stCh"
    );

    ["gender", "semanticGender"].forEach((genderTraitKey) => {
      if (answerStructureChunk[genderTraitKey]) {
        allLangUtils.enforceIsPerson(
          answerStructureChunk,
          true,
          null,
          genderTraitKey
        );
      }
    });
  });

  consol.logSpecial(
    8,
    "[1;35m " + `conformAnswerStructureToQuestionStructure END...` + "[0m"
  );
  sentenceStructure.forEach((answerStCh) => {
    consol.logSpecial(8, {
      "answerStCh.chunkId": answerStCh.chunkId,
      "answerStCh.specificIds": answerStCh.specificIds,
      "answerStCh.demandedIds": answerStCh.demandedIds,
      "answerStCh.gender": answerStCh.gender,
      "answerStCh.semanticGender": answerStCh.semanticGender,
      "answerStCh.hypernymy": answerStCh.hypernymy,
    });
  });
  consol.logSpecial(
    8,
    "[1;35m " + `conformAnswerStructureToQuestionStructure END.` + "[0m"
  );

  if (shouldConsoleLog) {
    consol.log("[1;35m " + "/conformAnswerStructureToQuestionStructure" + "[0m");
  }
};

exports.addTraitToAnswerChunkWithAdjustment = (
  questionStructureChunk,
  answerStructureChunk,
  traitKey,
  questionLanguage,
  answerLanguage
) => {
  let adjustedArr = [];

  if (!questionStructureChunk[traitKey]) {
    consol.log(
      `yasa questionStructureChunk "${questionStructureChunk.chunk}" had no "${traitKey}".`
    );
    return;
  }

  questionStructureChunk[traitKey].forEach((traitValue) => {
    let adjustedTraitValues = refFxn.giveAdjustedTraitValue(
      questionLanguage,
      answerLanguage,
      traitKey,
      traitValue
    );

    adjustedArr = [...adjustedArr, ...adjustedTraitValues];
  });

  answerStructureChunk[traitKey] = adjustedArr;
};

exports.removeDuplicatesFromResponseObject = (respObj) => {
  let trimmedFinalSentenceArr = [];

  respObj.finalSentenceArr.forEach((finalSentence) => {
    if (!trimmedFinalSentenceArr.includes(finalSentence)) {
      trimmedFinalSentenceArr.push(finalSentence);
    }
  });

  respObj.finalSentenceArr = trimmedFinalSentenceArr;
};

exports.inheritFromHeadToDependentChunk = (
  currentLanguage,
  headChunk,
  dependentChunk,
  sentenceStructure
) => {
  if (!headChunk) {
    headChunk = sentenceStructure.find(
      (stCh) => stCh.chunkId === dependentChunk.agreeWith
    );
  }

  consol.log(
    `wdil inheritFromHeadToDependentChunk: "${headChunk.chunkId}" to "${dependentChunk.chunkId}"`,
    "dependentChunk BEFOREHAND: ",
    dependentChunk
  );
  consol.log("w'dil inheritFromHeadToDependentChunk: headChunk", headChunk);

  let normalinheritableInflectionKeys =
    refObj.lemmaObjectTraitKeys[currentLanguage].inheritableInflectionKeys[
      gpUtils.getWordtypeStCh(dependentChunk)
    ];

  let hybridSelectors =
    refObj.lemmaObjectTraitKeys[currentLanguage].hybridSelectors[
      (gpUtils.getWordtypeStCh(dependentChunk), true)
    ] || [];

  let inheritableInflectionKeys = [
    ...normalinheritableInflectionKeys,
    ...hybridSelectors,
  ];

  inheritableInflectionKeys.forEach((traitKey) => {
    consol.log(
      `kwwm inheritFromHeadToDependentChunk: "${headChunk.chunkId}" to "${dependentChunk.chunkId}". traitKey "${traitKey}".`
    );
    //Hard change.
    if (
      headChunk[traitKey] &&
      !(
        dependentChunk.formulaImportantTraitKeys &&
        dependentChunk.formulaImportantTraitKeys.includes(traitKey)
      )
    ) {
      let traitValueArr = headChunk[traitKey].slice(0);

      dependentChunk[traitKey] = traitValueArr;
    }
  });

  consol.log(
    "ttez At the end of inheritFromHeadToDependentChunk, we must again a'djustVirility, which we also did in allLangUtils.preprocessStructureChunks earlier."
  );

  consol.log(
    "wdim inheritFromHeadToDependentChunk: dependentChunk AFTERWARDS of inheritFromHeadToDependentChunk: ",
    dependentChunk
  );
};

exports.sortStructureChunks = (
  sentenceStructure,
  separateDependentsAndPHDs
) => {
  let headIds = Array.from(
    new Set(sentenceStructure.map((chunk) => chunk.agreeWith).filter((x) => x))
  );

  let headChunks = [];

  let PHDheadIds = [];

  sentenceStructure.forEach((chunk) => {
    refObj.agreementTraits.forEach((agreeKey) => {
      if (chunk[agreeKey]) {
        PHDheadIds.push(chunk[agreeKey]);
      }
    });
  });

  PHDheadIds = Array.from(new Set(PHDheadIds));

  let uniqueCombinedHeadIds = Array.from(new Set([...headIds, ...PHDheadIds]));

  headChunks = uniqueCombinedHeadIds.map((headId) => {
    return sentenceStructure.find((chunk) => chunk.chunkId === headId);
  });

  let dependentChunks = sentenceStructure.filter(
    (structureChunk) => structureChunk.agreeWith
  );

  let PHDChunks = sentenceStructure.filter(
    (structureChunk) => structureChunk.PHD_type
  );

  let otherChunks = sentenceStructure.filter(
    (chunk) =>
      ![
        ...headChunks.map((chunk) => chunk.chunkId),
        ...dependentChunks.map((chunk) => chunk.chunkId),
        ...PHDChunks.map((chunk) => chunk.chunkId),
      ].includes(chunk.chunkId)
  );

  consol.log("fafo sortStructureChunks END", {
    headChunks,
    dependentChunks,
    PHDChunks,
    otherChunks,
  });

  if (separateDependentsAndPHDs) {
    return { headChunks, dependentChunks, PHDChunks, otherChunks };
  } else {
    otherChunks = [...otherChunks, ...PHDChunks];
    return { headChunks, dependentChunks, otherChunks };
  }
};

exports.enforceMaxLObjStems = (lObjs, max) => {
  let lObjIdStems = Array.from(
    new Set(lObjs.map((l) => l.id.split("-").slice(0, 3).join("-")))
  );
  if (lObjIdStems.length > max) {
    consol.throw(
      `rcmd Expected no more than 1 lObj stem (eg "pol-npe-002-matka" and "pol-npe-002-ojciec" count as 1) but found ${
        lObjIdStems.length
      }: [${"pol-npe-002-matka".join(",")}]`
    );
  }
};
