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

exports.getMaterials = (
  currentLanguage,
  sentenceFormulaId,
  sentenceFormulaSymbol,
  useDummy
) => {
  let sentenceFormula;
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  //STEP ZERO (A): Get necessary source materials.
  const { wordsBank } = require(`../source/${currentLanguage}/words.js`);
  const {
    dummyWordsBank,
  } = require(`../source/${currentLanguage}/dummy/dummyWords.js`);
  const {
    sentenceFormulasBank,
  } = require(`../source/${currentLanguage}/sentenceFormulas.js`);
  const {
    dummySentenceFormulasBank,
  } = require(`../source/${currentLanguage}/dummy/dummySentenceFormulas.js`);

  let defaultSentenceFormulaId = "POL-00-50";

  let words = useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : uUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = useDummy
    ? uUtils.copyWithoutReference(dummySentenceFormulasBank)
    : uUtils.copyWithoutReference(sentenceFormulasBank);

  if (sentenceFormulaId) {
    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaId === sentenceFormulaId
    );

    if (!sentenceFormula) {
      consol.throw(
        `#ERR quky sc:getMaterials. No sentenceFormula for this sentenceFormulaId "${sentenceFormulaId}".`
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

  Object.keys(words).forEach((wordtypeKey) => {
    langUtils.preprocessLemmaObjectsMinor(words[wordtypeKey]);
  });

  return { sentenceFormula, words };
};

exports.processSentenceFormula = (
  languagesObj,
  sentenceFormula,
  words,
  multipleMode
) => {
  consol.log("hbbhey START processSentenceFormula");
  let { currentLanguage, previousQuestionLanguage } = languagesObj;
  let { sentenceFormulaId, sentenceFormulaSymbol, sentenceStructure } =
    sentenceFormula;
  let errorInSentenceCreation = { errorMessage: null };
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let grandOutputArray = [];

  //STEP ZERO: Preprocess sentence structure.
  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);
  langUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

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
      uUtils.copyWithoutReference(headChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      multipleMode,
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

  //STEP TWO: Select DEPENDENT words and add to result array.
  explodedOutputArraysWithHeads.forEach(
    (headOutputArray, headOutputArrayIndex) => {
      let thisHeadOutputArrayIsDeleted;

      headOutputArray.forEach((headOutputUnit) => {
        if (thisHeadOutputArrayIsDeleted) {
          return;
        }

        // Now we update the head structure chunks with the details from their respective selectedWords.
        lfUtils.updateStructureChunk(headOutputUnit, currentLanguage);

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
                uUtils.copyWithoutReference(dependentChunk),
                words,
                errorInSentenceCreation,
                currentLanguage,
                previousQuestionLanguage,
                multipleMode,
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

  let postHocDependentChunks = otherChunks.filter((chunk) =>
    [
      "postHocAgreeWithPrimary",
      "postHocAgreeWithSecondary",
      "postHocAgreeWithTertiary",
    ].some((postHocAgreeWithKey) => chunk[postHocAgreeWithKey])
  );

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
        uUtils.copyWithoutReference(postHocDependentChunk),
        words,
        errorInSentenceCreation,
        currentLanguage,
        previousQuestionLanguage,
        multipleMode,
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
        //If multipleMode is true, then allPossOutputUnits_other is array of outputUnit objects, while if false, array of just one said object.
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
      uUtils.copyWithoutReference(otherChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      multipleMode,
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

    //If multipleMode is true, then allPossOutputUnits_other is array of outputUnit objects, while if false, array of just one said object.
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

  //If multipleMode is true, then grandOutputArray is array of all possible arrays of outputUnit combinations.
  //And if multipleMode false, then grandOutputArray is array of just one said possible array.

  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
    outputArray.forEach((outputUnit) => {
      let { structureChunk } = outputUnit;

      if (gpUtils.getWorrdtypeStCh(structureChunk) === "fixed") {
        return;
      }
      lfUtils.updateStructureChunk(outputUnit, currentLanguage);
    });

    //Decanting otherChunks if they have multiple values.
    let { headChunks, dependentChunks, otherChunks } =
      scUtils.sortStructureChunks(
        outputArray.map((outputUnit) => outputUnit.structureChunk)
      );
    otherChunks.forEach((otherChunk) => {
      if (otherChunk.dontSpecifyOnThisChunk) {
        return;
      }

      Object.keys(otherChunk).forEach((traitKeyy) => {
        let traitValyye = otherChunk[traitKeyy];

        let reference =
          refObj.structureChunkFeatures[currentLanguage][traitKeyy] ||
          refObj.structureChunkFeatures["ALL"][traitKeyy];

        if (
          reference.expectedTypeOnStCh === "array" &&
          !reference.ultimatelyMultipleValuesOkay &&
          traitValyye.length > 1
        ) {
          consol.log(`pqoi Decanting "${otherChunk.chunkId}" "${traitKeyy}".`);
          otherChunk[traitKeyy] = [uUtils.selectRandom(otherChunk[traitKeyy])];
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
  additionalRunsRecord,
  originalQuestionSentenceFormula
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
        additionalRunsRecord,
        originalQuestionSentenceFormula
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

      //nownow: How to keep annotations from stChs that won't be present.

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

  //STEP 0.5: In Q mode, for each outputArr, if there is a chunk with annos but that didn't make it in there, keep the annos.

  if (!multipleMode) {
    consol.log("outputArrays", outputArrays);
    consol.log("unorderedArr", unorderedArr);
    // consol.throw(431);

    outputArrays.forEach((outputArr) => {
      unorderedArr.forEach((originalUnit) => {
        if (
          !outputArr.find(
            (unit) =>
              unit.structureChunk.chunkId ===
              originalUnit.structureChunk.chunkId
          )
        ) {
          if (
            originalUnit.structureChunk.annotations &&
            Object.keys(originalUnit.structureChunk.annotations).length
          ) {
            let skeletonOutputUnit = {
              isSkeleton: true,
              structureChunk: {
                annotations: originalUnit.structureChunk.annotations,
                chunkId: originalUnit.structureChunk.chunkId,
              },
            };

            // consol.throw(131);
            outputArr.unshift(skeletonOutputUnit);
          }
        }
      });
    });
  }

  // STEP 1: Select word versions for each.
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
      let producedSentence = uUtils.capitaliseFirst(
        finalSelectedWordsArr.join(" ") + "."
      );

      producedSentences.push(producedSentence);
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

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  // consol.log("efsj selectWordVersions. orderedOutputArr", orderedOutputArr);

  //In Q mode, bring annos in from skeleton units.
  if (!multipleMode) {
    orderedOutputArr.forEach((outputUnit, outputUnitIndex) => {
      if (outputUnit.isSkeleton) {
        let skeletonOutputUnit = outputUnit;

        let depUnits = [];

        let agreeKeys = [
          "agreeWith",
          "agreeWithSecondary",
          "agreeWithTertiary",
          "connectedTo",
        ];

        agreeKeys.forEach((agreeKey) => {
          orderedOutputArr.forEach((unit) => {
            //Skeleton Clause
            if (
              unit.structureChunk[agreeKey] ===
              skeletonOutputUnit.structureChunk.chunkId
            )
              depUnits.push(unit);
          });
        });

        let doneAnnoKeys = [];

        Object.keys(skeletonOutputUnit.structureChunk.annotations).forEach(
          (annoKey) => {
            let annoValue =
              skeletonOutputUnit.structureChunk.annotations[annoKey];

            let thisAnnoKeyIsDone = false;

            depUnits.forEach((depUnit) => {
              if (thisAnnoKeyIsDone) {
                return;
              }

              if (
                //If the annoKey from the skeleton outputUnit's annos is an allowable transfer to this depCh,
                refObj.lemmaObjectFeatures[
                  currentLanguage
                ].inheritableInflectorKeys[
                  gpUtils.getWorrdtypeStCh(depUnit.structureChunk, true)
                ].includes(annoKey)
              ) {
                if (!depUnit.firstStageAnnotationsObj) {
                  depUnit.firstStageAnnotationsObj = {};
                }

                if (
                  depUnit.firstStageAnnotationsObj[annoKey] &&
                  depUnit.firstStageAnnotationsObj[annoKey] !== annoValue
                ) {
                  consol.throw(
                    `ioev selectWordVersions Skeleton Clause. I'm trying to transfer in annos from an outputunit that didn't make it into this outputarr. But I'm looking at one of its depChs, and this depCh has an anno with a different value?\nFor annoKey "${annoKey}", skeleton "${skeletonOutputUnit.structureChunk.chunkId}" had "${annoValue}" while depCh "${depCh.chunkId}" had "${depCh.annotations[annoKey]}".`
                  );
                }

                //then transfer it to the depUnit.
                depUnit.firstStageAnnotationsObj[annoKey] = annoValue;
                doneAnnoKeys.push(annoKey);
                thisAnnoKeyIsDone = true;
              }
            });
          }
        );

        let abandonedAnnoKeys = Object.keys(
          skeletonOutputUnit.structureChunk.annotations
        ).filter((annoKey) => !doneAnnoKeys.includes(annoKey));

        if (abandonedAnnoKeys.length) {
          consol.throw(
            `wtsu selectWordVersions Skeleton Clause. These annoKeys from skeleton "${skeletonOutputUnit.structureChunk.chunkId}" did not make it into outputArr in any way! [${abandonedAnnoKeys}].`
          );
        }

        //Removing skeleton unit.
        orderedOutputArr.splice(outputUnitIndex, 1);
        return;
      }
    });
  }

  orderedOutputArr.forEach((outputUnit, index) => {
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
        "#ERR oilf selectWordVersions. I expected either a string or a terminus object for this selectedWord."
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
  let shouldConsoleLog = false;
  if (shouldConsoleLog) {
    consol.log(
      "[1;35m " +
        "dxft sc:conformAnswerStructureToQuestionStructure-------------------" +
        "[0m"
    );
  } else {
    consol.log(
      "[1;35m " + `(aegh sc:conformAnswerStructureToQuestionStructure)` + "[0m"
    );
  }

  let { sentenceStructure } = sentenceFormula;
  let { questionLanguage, answerLanguage } = languagesObj;
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);

  questionOutputArr.forEach((questionOutputArrItem) => {
    //
    // STEP ZERO: Get necessary materials.
    //
    let questionStructureChunk = questionOutputArrItem.structureChunk;

    if (gpUtils.getWorrdtypeStCh(questionStructureChunk) === "fixed") {
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

    let lemmasToSearch =
      questionSelectedLemmaObject.translations[answerLanguage];

    let source =
      words[gpUtils.giveSetKey(gpUtils.getWorrdtypeStCh(answerStructureChunk))];
    // answerLangUtils.preprocessLemmaObjectsMinor(source);

    matchingAnswerLemmaObjects = source.filter(
      (lObj) =>
        lemmasToSearch.includes(lObj.lemma) &&
        //Resolve issue of multipleWordtype allohoms.
        gpUtils.getWorrdtypeLObj(lObj) ===
          gpUtils.getWorrdtypeStCh(questionStructureChunk)
    );

    let matchesLengthSnapshot = matchingAnswerLemmaObjects.length;

    matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
      (answerLemmaObject) =>
        uUtils.areTwoFlatArraysEqual(
          questionSelectedLemmaObject.tags,
          answerLemmaObject.tags
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

    //...and then for both pronouns and all other worrdtypes, we get the id and set it.
    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    //Do actually transfer gender, for person nouns.
    if (
      gpUtils.getWorrdtypeStCh(questionStructureChunk) === "noun" &&
      gpUtils.getWorrdtypeStCh(questionStructureChunk, true) === "noun-person"
    ) {
      adjustAndAddFeaturesToAnswerChunk(
        questionStructureChunk,
        answerStructureChunk,
        "gender",
        questionLanguage,
        answerLanguage
      );
    }

    refObj.lemmaObjectFeatures[
      answerLanguage
    ].allowableTransfersFromQuestionStructure[
      gpUtils.getWorrdtypeStCh(answerStructureChunk)
    ].forEach((inflectorKey) => {
      //
      // STEP ONE: Update inflectors from list of allowable transfers.
      //
      if (!questionStructureChunk[inflectorKey]) {
        return;
      }

      if (
        answerStructureChunk.formulaImportantFeatures &&
        answerStructureChunk.formulaImportantFeatures.includes(inflectorKey)
      ) {
        consol.log(
          "jngy conformAnswerStructureToQuestionStructure I will not transfer '" +
            inflectorKey +
            "' in SC:conformAtoQ step 1, as marked important in answerStCh."
        );
        return;
      }

      //Don't transfer Number if Q is Tantum Plurale.     eg if Q is "skrzypce" we'd want A to include both "violin" and "violins".
      if (
        inflectorKey === "number" &&
        questionSelectedLemmaObject.tantumPlurale
      ) {
        consol.log(
          "yurw conformAnswerStructureToQuestionStructure Question lobj is a tantum, so we won't transfer Number feature."
        );
        return;
      }

      //Don't transfer Number, if all A lObjs are Tantum Plurale.     eg if Q is "violin" we don't want to specify that A must be singular, as "skrzypce" can't be singular.
      if (
        inflectorKey === "number" &&
        matchingAnswerLemmaObjects.length &&
        matchingAnswerLemmaObjects.every(
          (answerLemmaObject) => answerLemmaObject.tantumPlurale
        )
      ) {
        consol.log(
          "kozn conformAnswerStructureToQuestionStructure All answer lobjs are tantum, so we won't transfer Number feature."
        );
        return;
      }

      if (inflectorKey === "tenseDescription") {
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

        return;
      }

      adjustAndAddFeaturesToAnswerChunk(
        questionStructureChunk,
        answerStructureChunk,
        inflectorKey,
        questionLanguage,
        answerLanguage
      );
    });

    function adjustAndAddFeaturesToAnswerChunk(
      questionStructureChunk,
      answerStructureChunk,
      inflectorKey,
      questionLanguage,
      answerLanguage
    ) {
      let adjustedArr = [];

      questionStructureChunk[inflectorKey].forEach((inflectorValue) => {
        let adjustedValues = refFxn.giveAdjustedFeatureValue(
          questionLanguage,
          answerLanguage,
          inflectorKey,
          inflectorValue
        );

        adjustedArr = [...adjustedArr, ...adjustedValues];
      });

      answerStructureChunk[inflectorKey] = adjustedArr;
    }

    //
    //PART TWO: Blinding
    //

    //Check for features-of-answer-lang-lobjs-that-aren't-features-of-question-lang-lobjs.
    // So when going ENG to POL, that would be gender.
    // And then, with that list of features, we will blind the answer structureChunks to these features.

    let possibleInflectionsOfQuestionLobjs =
      refObj.lemmaObjectFeatures[questionLanguage].inflectionChains[
        gpUtils.getWorrdtypeStCh(answerStructureChunk)
      ];

    let possibleInflectionsOfAnswerLobjs =
      refObj.lemmaObjectFeatures[answerLanguage].inflectionChains[
        gpUtils.getWorrdtypeStCh(answerStructureChunk)
      ];

    let possibleInflectionsOfAnswerLobjsButNotQuestionLobjs =
      possibleInflectionsOfAnswerLobjs.filter(
        (inflector) => !possibleInflectionsOfQuestionLobjs.includes(inflector)
      );

    possibleInflectionsOfAnswerLobjsButNotQuestionLobjs.forEach((inflector) => {
      if (
        !answerStructureChunk.formulaImportantFeatures ||
        !answerStructureChunk.formulaImportantFeatures.includes(inflector)
      ) {
        answerStructureChunk[inflector] = [];
      }
    });

    allLangUtils.convertMetaFeatures(
      [answerStructureChunk],
      answerLanguage,
      "stCh"
    );
  });

  if (shouldConsoleLog) {
    consol.log("[1;35m " + "/conformAnswerStructureToQuestionStructure" + "[0m");
  }
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

  let normalinheritableInflectorKeys =
    refObj.lemmaObjectFeatures[currentLanguage].inheritableInflectorKeys[
      gpUtils.getWorrdtypeStCh(dependentChunk, true)
    ];

  let hybridSelectors =
    refObj.lemmaObjectFeatures[currentLanguage].hybridSelectors[
      (gpUtils.getWorrdtypeStCh(dependentChunk), true)
    ] || [];

  let inheritableInflectorKeys = [
    ...normalinheritableInflectorKeys,
    ...hybridSelectors,
  ];

  inheritableInflectorKeys.forEach((inflectorKey) => {
    consol.log(
      `kwwm inheritFromHeadToDependentChunk: "${headChunk.chunkId}" to "${dependentChunk.chunkId}". inflectorKey "${inflectorKey}".`
    );
    //Hard change.
    if (
      headChunk[inflectorKey] &&
      !(
        dependentChunk.formulaImportantFeatures &&
        dependentChunk.formulaImportantFeatures.includes(inflectorKey)
      )
    ) {
      let inflectorValueArr = uUtils.copyWithoutReference(
        headChunk[inflectorKey]
      );

      dependentChunk[inflectorKey] = inflectorValueArr;
    }
  });

  consol.log(
    "ttez At the end of inheritFromHeadToDependentChunk, we must again adjustVirility, which we also did in allLangUtils.preprocessStructureChunks earlier."
  );

  allLangUtils.adjustVirilityOfStructureChunk(
    currentLanguage,
    headChunk,
    "headChunk from SC:inheritFromHeadToDependentChunk"
  );
  allLangUtils.adjustVirilityOfStructureChunk(
    currentLanguage,
    dependentChunk,
    "dependentChunk from SC:inheritFromHeadToDependentChunk"
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
    new Set(
      sentenceStructure
        .map((chunk) => {
          if (typeof chunk === "object" && chunk.agreeWith) {
            return chunk.agreeWith;
          }
        })
        .filter((item) => item)
    )
  );

  let headChunks = [];

  let PHDheadIds = [];

  sentenceStructure.forEach((chunk) => {
    if (typeof chunk === "object") {
      [
        "agreeWith",
        "postHocAgreeWithPrimary",
        "postHocAgreeWithSecondary",
        "postHocAgreeWithTertiary",
      ].forEach((agreeKey) => {
        if (chunk[agreeKey]) {
          PHDheadIds.push(chunk[agreeKey]);
        }
      });
    }
  });

  PHDheadIds = Array.from(new Set(PHDheadIds));

  let uniqueCombinedHeadIds = Array.from(new Set([...headIds, ...PHDheadIds]));

  headChunks = uniqueCombinedHeadIds.map((headId) => {
    return sentenceStructure.find((chunk) => chunk.chunkId === headId);
  });

  let dependentChunks = sentenceStructure.filter(
    (structureChunk) =>
      typeof structureChunk === "object" && structureChunk.agreeWith
  );

  let PHDChunks = sentenceStructure.filter(
    (structureChunk) =>
      typeof structureChunk === "object" &&
      [
        "postHocAgreeWithPrimary",
        "postHocAgreeWithSecondary",
        "postHocAgreeWithTertiary",
      ].some((agreeKey) => structureChunk[agreeKey])
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
