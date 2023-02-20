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

exports.selectDependentChunkWordsAndAddToOutputArray = (
  etiquette,
  explodedOutputArraysWithHeads,
  grandOutputArray,
  headChunks,
  dependentChunks,
  currentLanguage,
  isCounterfax,
  useDummyWords,
  words,
  errorInSentenceCreation,
  previousQuestionLanguage,
  questionOutputArr,
  multipleModes,
  potentialNullResultObject
) => {
  let filteredExplodedOutputArraysWithHeads = [];

  explodedOutputArraysWithHeads.forEach(
    (headOutputArray, headOutputArrayIndex) => {
      let thisHeadOutputArrayIsDeleted;

      headOutputArray.forEach((headOutputUnit) => {
        if (thisHeadOutputArrayIsDeleted) {
          return;
        }

        if (headOutputUnit.etiquette === etiquette) {
          // Now we update the head structure chunks with the details from their respective selectedWords.
          lfUtils.updateStructureChunk(
            headOutputUnit,
            currentLanguage,
            false,
            isCounterfax
          );
        }

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
                "dependent",
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

              thisHeadOutputArrayIsDeleted = true; // effectively deleting this headOutputArray.
            } else {
              uUtils.addToArrayAtKey(
                headOutputUnit,
                "possibleDependentOutputArrays",
                allPossOutputUnits_dependent
              );
            }
          });
        }
      });
      if (!thisHeadOutputArrayIsDeleted) {
        filteredExplodedOutputArraysWithHeads.push(headOutputArray);
      }
    }
  );

  if (headChunks.length && !filteredExplodedOutputArraysWithHeads.length) {
    consol.log(
      "[1;31m \n" +
        `#ERR bcke processSentenceFormula ${currentLanguage}. This run has FAILED due to filteredExplodedOutputArraysWithHeads having no successful members. 'klye' must have deleted all members of filteredExplodedOutputArraysWithHeads arr.` +
        "\n[0m"
    );

    if (!errorInSentenceCreation.errorMessage) {
      errorInSentenceCreation.errorMessage = [];
    }
    let newErrMsgs = [
      `#ERR b'cke processSentenceFormula ${currentLanguage}. This run has FAILED due to filteredExplodedOutputArraysWithHeads having no successful members. 'k'lye' must have deleted all members of filteredExplodedOutputArraysWithHeads arr.`,
      `k'lye trimArrayOfExplodedOutputArraysByFailures. filteredExplodedOutputArraysWithHeads has ${filteredExplodedOutputArraysWithHeads.length} members. Deleting a headOutputArray because no results were found for a depCh in this headOutputArray. \nThis happened in "STEP TWO: Select DEPENDENT words and add to result array."`,
    ];
    newErrMsgs.forEach((errMsg) => {
      errorInSentenceCreation.errorMessage.push(errMsg);
    });

    potentialNullResultObject.arrayOfOutputArrays = null;
    potentialNullResultObject.errorInSentenceCreation = errorInSentenceCreation;
    return potentialNullResultObject;
  }

  filteredExplodedOutputArraysWithHeads.forEach((arr) => {
    let result = gpUtils.explodeOutputArraysByHeadsAndDependents(arr);
    grandOutputArray.push(...result);
  });
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
  let { headChunks, dependentHeadChunks, dependentChunks, otherChunks } =
    scUtils.sortStructureChunks(sentenceStructure);

  let headOutputUnitArrays = [];

  if ("console") {
    consol.log(
      "iytd processSentenceFormula: headChunks",
      headChunks.map((chunk) => chunk.chunkId)
    );
    consol.log(
      "iytd processSentenceFormula: dependentHeadChunks",
      dependentHeadChunks.map((chunk) => chunk.chunkId)
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
      "head",
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

  let potentialNullResultObject = {
    sentenceFormula,
    sentenceFormulaId,
    sentenceFormulaSymbol,
  };

  const _selectDependentChunkWordsAndAddToOutputArray = (
    etiquette,
    explodedOutputArraysWithHeads,
    grandOutputArray,
    headChunks,
    dependentChunks
  ) => {
    return scUtils.selectDependentChunkWordsAndAddToOutputArray(
      etiquette,
      explodedOutputArraysWithHeads,
      grandOutputArray,
      headChunks,
      dependentChunks,
      currentLanguage,
      isCounterfax,
      useDummyWords,
      words,
      errorInSentenceCreation,
      previousQuestionLanguage,
      questionOutputArr,
      multipleModes,
      potentialNullResultObject
    );
  };

  //STEP TWO: Select DEPENDENT words and add to result array.

  if (dependentHeadChunks.length) {
    // If there are head chunks that agreeWith other head chunks, do these first.
    let halfwayGrandOutputArray = [];
    _selectDependentChunkWordsAndAddToOutputArray(
      "head",
      explodedOutputArraysWithHeads,
      halfwayGrandOutputArray,
      headChunks,
      dependentHeadChunks
    );

    // Now that all head chunks are done, do the dependentChunks.
    _selectDependentChunkWordsAndAddToOutputArray(
      "dependent",
      halfwayGrandOutputArray,
      grandOutputArray,
      [...headChunks, dependentHeadChunks],
      dependentChunks
    );
  } else {
    // There are no head chunks which depend on other head chunk, so just do depependentChunks as normal.
    _selectDependentChunkWordsAndAddToOutputArray(
      "head",
      explodedOutputArraysWithHeads,
      grandOutputArray,
      headChunks,
      dependentChunks
    );
  }

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
        "PHD",
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
      "other",
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

      lfUtils.updateStructureChunk(
        outputUnit,
        currentLanguage,
        true,
        isCounterfax
      );
    });

    //Decanting otherChunks if they have multiple traitValues.
    let { otherChunks } = scUtils.sortStructureChunks(
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
  if ("logging") {
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
  }

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

    matchingAnswerLemmaObjects = source.filter(
      (lObj) =>
        lObjsToSearch.includes(lObj.id) &&
        //Resolve issue of multipleWordtype allohoms.
        gpUtils.getWordtypeLObj(lObj) ===
          gpUtils.getWordtypeStCh(questionStructureChunk)
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
    }

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
  });

  if ("logging") {
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
  }

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
    (structureChunk) =>
      structureChunk.agreeWith &&
      !headChunks.map((ch) => ch.chunkId).includes(structureChunk.chunkId)
  );

  let dependentHeadChunks = [];
  let filteredHeadChunks = [];
  headChunks.forEach((ch) => {
    if (ch.agreeWith) {
      dependentHeadChunks.push(ch);
    } else {
      filteredHeadChunks.push(ch);
    }
  });
  headChunks = filteredHeadChunks;

  let PHDChunks = sentenceStructure.filter(
    (structureChunk) => structureChunk.PHD_type
  );

  let doneIds = [
    ...headChunks.map((chunk) => chunk.chunkId),
    ...dependentHeadChunks.map((chunk) => chunk.chunkId),
    ...dependentChunks.map((chunk) => chunk.chunkId),
    ...PHDChunks.map((chunk) => chunk.chunkId),
  ];
  let otherChunks = sentenceStructure.filter(
    (chunk) => !doneIds.includes(chunk.chunkId)
  );

  consol.log("fafo sortStructureChunks END", {
    headChunks,
    dependentHeadChunks,
    dependentChunks,
    PHDChunks,
    otherChunks,
  });

  let res = {
    headChunks,
    dependentHeadChunks,
    dependentChunks,
    otherChunks,
  };

  if (separateDependentsAndPHDs) {
    res.PHDChunks = PHDChunks;
  } else {
    res.otherChunks = [...res.otherChunks, ...PHDChunks];
  }

  return res;
};
