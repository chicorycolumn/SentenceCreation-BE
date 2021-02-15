const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const ivUtils = require("./secondOrder/inputValidationUtils.js");
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
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  if (sentenceFormulaId) {
    // let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
    //   sentenceFormulas,
    //   {
    //     sentenceFormulaId: sentenceFormulaId,
    //   },
    //   true
    // );

    // sentenceFormula = matchingSentenceFormulaData.value;

    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaId === sentenceFormulaId
    );

    if (!sentenceFormula) {
      gpUtils.throw(
        `quky getMaterials #ERR SC:getMaterials, no sentenceFormula for this sentenceFormulaId ${sentenceFormulaId}.`
      );
    }

    // sentenceFormulaId = sentenceFormula.sentenceFormulaId;
    sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  } else if (sentenceFormulaSymbol) {
    // let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
    //   sentenceFormulas,
    //   {
    //     sentenceFormulaSymbol: sentenceFormulaSymbol,
    //   },
    //   true
    // );

    // sentenceFormula = matchingSentenceFormulaData.value;

    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaSymbol === sentenceFormulaSymbol
    );

    // sentenceFormulaId = sentenceFormula.sentenceFormulaId;
    // sentenceFormulaSymbol = sentenceFormula.sentenceFormulaSymbol;
  } else {
    // let matchingSentenceFormulaData = otUtils.findObjectInNestedObject(
    //   sentenceFormulas,
    //   {
    //     sentenceFormulaId: defaultSentenceFormulaId,
    //   },
    //   true
    // );

    // sentenceFormula = matchingSentenceFormulaData.value;

    sentenceFormula = sentenceFormulas.find(
      (senFor) => senFor.sentenceFormulaId === defaultSentenceFormulaId
    );

    // sentenceFormulaId = sentenceFormula.sentenceFormulaId;
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
  multipleMode,
  pleaseDontSpecify,
  pleaseDontSpecifyPronounGender
) => {
  let { currentLanguage, previousQuestionLanguage } = languagesObj;
  let {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    sentenceStructure,
  } = sentenceFormula;
  let errorInSentenceCreation = { errorMessage: null };
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let grandOutputArray = [];

  //STEP ZERO
  //Preprocess sentence structure.

  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);
  langUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

  //STEP ONE: Select headwords and add to result array.

  let {
    headChunks,
    dependentChunks,
    otherChunks,
  } = scUtils.sortStructureChunks(sentenceStructure);

  let headOutputUnitArrays = [];

  console.log(
    "iytd processSentenceFormula: headChunks",
    headChunks.map((chunk) => chunk.chunkId)
  );
  console.log(
    "iytd processSentenceFormula: dependentChunks",
    dependentChunks.map((chunk) => chunk.chunkId)
  );
  console.log(
    "iytd processSentenceFormula: otherChunks",
    otherChunks.map((chunk) => chunk.chunkId)
  );

  delete errorInSentenceCreation.errorMessage;

  headChunks.forEach((headChunk) => {
    console.log("evga sc:processSentenceFormula STEP ONE", headChunk.chunkId);

    //The below functions correctly with regard to:
    //Give multipleMode as true, it returns multiple outputUnit objects in allPossOutputUnits_head array.
    //Give multipleMode as false, it returns just one outputUnit object in said array.

    let allPossOutputUnits_head = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(headChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      multipleMode,
      null,
      pleaseDontSpecify,
      pleaseDontSpecifyPronounGender
    );

    if (errorInSentenceCreation.errorMessage) {
      console.log(
        "[1;31m " +
          `bzck processSentenceFormula #ERR -------------------------> An error arose in SC:processSentenceFormula. Returning outputArr null for headChunk: ${headChunk.chunkId}` +
          "[0m"
      );

      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    if (!allPossOutputUnits_head || !allPossOutputUnits_head.length) {
      console.log(
        "[1;31m " +
          `ewio processSentenceFormula #ERR -------------------------> An error has arisen in SC:processSentenceFormula. Returning outputArr null for headChunk: ${headChunk.chunkId}` +
          "[0m"
      );

      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    headOutputUnitArrays.push(allPossOutputUnits_head);
  });

  //The below functions correctly with regard to:
  //If multipleMode was true, then explodedOutputArraysWithHeads array now contains all possible arrays (of multiplied out head options).
  // ie [ [{chłopiec}, {jabłko}], [{chłopiec}, {jabłka}], [{kobieta}, {jabłko}], [{kobieta}, {jabłka}] ]
  //If multipleMode was false, said array now contains just the one array, eg explodedOutputArraysWithHeads = [ [{chłopiec}, {jabłko}] ].
  let explodedOutputArraysWithHeads = gpUtils.copyWithoutReference(
    gpUtils.arrayExploder(headOutputUnitArrays)
  );

  // Now we update the head structure chunks with the details from their respective selectedWords.
  explodedOutputArraysWithHeads.forEach((headOutputArray) => {
    headOutputArray.forEach((headOutputUnit) => {
      lfUtils.updateStructureChunk(headOutputUnit, currentLanguage);

      let headChunk = headOutputUnit.structureChunk;

      //STEP TWO (NOW NESTED): Select dependent words and add to result array.
      let specificDependentChunks = dependentChunks
        .filter((chunk) => chunk.agreeWith === headChunk.chunkId)
        .map((chunk) => gpUtils.copyWithoutReference(chunk));

      if (specificDependentChunks.length) {
        specificDependentChunks.forEach((dependentChunk) => {
          console.log(
            "oiez sc:processSentenceFormula STEP TWO",
            dependentChunk.chunkId
          );

          //Inherit from head chunk to dependent chunks.

          scUtils.inheritFromHeadToDependentChunk(
            currentLanguage,
            headChunk,
            dependentChunk
          );

          let allPossOutputUnits_dependent = otUtils.findMatchingLemmaObjectThenWord(
            gpUtils.copyWithoutReference(dependentChunk),
            words,
            errorInSentenceCreation,
            currentLanguage,
            previousQuestionLanguage,
            multipleMode,
            null,
            pleaseDontSpecify,
            pleaseDontSpecifyPronounGender
          );

          if (
            errorInSentenceCreation.errorMessage ||
            !allPossOutputUnits_dependent ||
            !allPossOutputUnits_dependent.length
          ) {
            console.log(
              "[1;31m " +
                `fvqy #ERR -------------------------> An error reared up in SC:processSentenceFormula. Returning outputArr null for dependentChunk:  ${dependentChunk.chunkId}` +
                "[0m"
            );

            return {
              outputArr: null,
              sentenceFormula,
              sentenceFormulaId,
              sentenceFormulaSymbol,
              errorInSentenceCreation,
            };
          }

          //The above functions correctly with regard to:
          //Give multipleMode as true, it returns multiple outputUnit objects in allPossOutputUnits_dependent array.
          //Give multipleMode as false, it returns just one outputUnit object in said array.

          if (!headOutputUnit.possibleDependentOutputArrays) {
            headOutputUnit.possibleDependentOutputArrays = [];
          }

          headOutputUnit.possibleDependentOutputArrays.push(
            allPossOutputUnits_dependent
          );
        });
      }
    });
  });

  explodedOutputArraysWithHeads.forEach((arr) => {
    let result = gpUtils.explodeOutputArraysByHeadsAndDependents(arr);
    grandOutputArray.push(...result);
  });

  //If multipleMode was false, then grandOutputArray = [ [ 'kobieta', 'ma', 'jabłko', 'czerwone' ] ]
  //If multipleMode was true, then grandOutputArray =  [
  //                                                [ 'kobieta', 'ma', 'cebulę', 'niebieską' ],
  //                                                [ 'kobieta', 'ma', 'cebulę', 'czerwoną' ],
  //                                                [ 'kobieta', 'ma', 'jabłko', 'niebieskie' ],
  //                                                [ 'kobieta', 'ma', 'jabłko', 'czerwone' ],
  //                                                [ 'chłopiec', 'ma', 'cebulę', 'niebieską' ],
  //                                                [ 'chłopiec', 'ma', 'cebulę', 'czerwoną' ],
  //                                                [ 'chłopiec', 'ma', 'jabłko', 'niebieskie' ],
  //                                                [ 'chłopiec', 'ma', 'jabłko', 'czerwone' ]
  //                                             ]

  let grandAllPossOutputUnits_other = [];
  let grandAllPossOutputUnits_PHD = [];

  let postHocDependentChunks = otherChunks.filter((chunk) =>
    [
      "postHocAgreeWithPrimary",
      "postHocAgreeWithSecondary",
      "postHocAgreeWithTertiary",
    ].some((postHocAgreeWithKey) => chunk[postHocAgreeWithKey])
  );

  otherChunks = otherChunks.filter(
    (chunk) =>
      !postHocDependentChunks
        .map((PHDchunk) => PHDchunk.chunkId)
        .includes(chunk.chunkId)
  );

  delete errorInSentenceCreation.errorMessage;

  otherChunks.forEach((otherChunk) => {
    console.log("qssh processSentenceFormula otherChunk", otherChunk);

    let allPossOutputUnits_other = otUtils.findMatchingLemmaObjectThenWord(
      gpUtils.copyWithoutReference(otherChunk),
      words,
      errorInSentenceCreation,
      currentLanguage,
      previousQuestionLanguage,
      multipleMode,
      null,
      pleaseDontSpecify,
      pleaseDontSpecifyPronounGender
    );

    if (
      errorInSentenceCreation.errorMessage ||
      !allPossOutputUnits_other ||
      !allPossOutputUnits_other.length
    ) {
      console.log(
        "[1;31m " +
          `hyuh #ERR -------------------------> An error has loomed in SC:processSentenceFormula. Returning outputArr null for otherChunk: ${otherChunk.chunkId}` +
          "[0m"
      );

      return {
        outputArr: null,
        sentenceFormula,
        sentenceFormulaId,
        sentenceFormulaSymbol,
        errorInSentenceCreation,
      };
    }

    //If multipleMode is true, then allPossOutputUnits_other is array of outputUnit objects, while if false, array of just one said object.
    grandAllPossOutputUnits_other.push(allPossOutputUnits_other);
  });

  if (grandAllPossOutputUnits_other.length) {
    grandAllPossOutputUnits_other = gpUtils.arrayExploder(
      grandAllPossOutputUnits_other
    );

    grandOutputArray = gpUtils.combineAndExplodeTwoSuperArrays(
      grandOutputArray,
      grandAllPossOutputUnits_other
    );
  }

  grandOutputArray.forEach((outputArray) => {
    delete errorInSentenceCreation.errorMessage;

    postHocDependentChunks.forEach((postHocDependentChunk) => {
      let allPossOutputUnits_PHD = otUtils.findMatchingLemmaObjectThenWord(
        gpUtils.copyWithoutReference(postHocDependentChunk),
        words,
        errorInSentenceCreation,
        currentLanguage,
        previousQuestionLanguage,
        multipleMode,
        outputArray,
        pleaseDontSpecify,
        pleaseDontSpecifyPronounGender
      );

      if (
        errorInSentenceCreation.errorMessage ||
        !allPossOutputUnits_PHD ||
        !allPossOutputUnits_PHD.length
      ) {
        console.log(
          "[1;31m " +
            `quek #ERR -------------------------> An error loomed in SC:processSentenceFormula. Returning outputArr null for postHocDependentChunk: ${postHocDependentChunk.chunkId}` +
            "[0m"
        );

        return {
          outputArr: null,
          sentenceFormula,
          sentenceFormulaId,
          sentenceFormulaSymbol,
          errorInSentenceCreation,
        };
      }

      //If multipleMode is true, then allPossOutputUnits_other is array of outputUnit objects, while if false, array of just one said object.

      grandAllPossOutputUnits_PHD.push(allPossOutputUnits_PHD);
    });
  });

  if (grandAllPossOutputUnits_PHD.length) {
    grandAllPossOutputUnits_PHD = gpUtils.arrayExploder(
      grandAllPossOutputUnits_PHD
    );

    grandOutputArray = gpUtils.combineAndExplodeTwoSuperArrays(
      grandOutputArray,
      grandAllPossOutputUnits_PHD
    );
  }

  //If multipleMode is true, then grandOutputArray is array of all possible arrays of outputUnit combinations.
  //And if multipleMode false, then grandOutputArray is array of just one said possible array.

  grandOutputArray.forEach((outputArray, outputArrayIndex) => {
    outputArray.forEach((outputUnit) => {
      if (outputUnit.structureChunk.wordtype === "fixed") {
        return;
      }
      lfUtils.updateStructureChunk(outputUnit, currentLanguage);
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
  answerLanguage
) => {
  let {
    answerOutputArrays,
    questionOutputArr,
    sentenceFormula,
    errorInSentenceCreation,
  } = sentenceData;

  if ("check") {
    if (errorInSentenceCreation.errorMessage) {
      let errorMessage = {
        errorInSentenceCreation: errorInSentenceCreation.errorMessage,
      };

      return {
        message: "No sentence could be created from the specifications.",
        finalSentence: null,
        errorMessage,
      };
    }

    if (!multipleMode && answerOutputArrays && answerOutputArrays.length) {
      gpUtils.throw(
        "ubrz giveFinalSentences #ERR Well that's strange. We are in Question Mode, so SC:giveFinalSentences expected to be given questionOutputArr, not answerOutputArrays."
      );
    }
  }

  let finalSentenceArr = [];

  if (multipleMode) {
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
  } else {
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
  }

  let answerResponseObj = {
    finalSentenceArr,
  };

  return answerResponseObj;
};

exports.buildSentenceString = (
  unorderedArr,
  sentenceFormula,
  multipleMode,
  currentLanguage,
  answerLanguage
) => {
  console.log("[1;35m " + "cghk buildSentenceString" + "[0m");
  console.log(
    "cghk buildSentenceString unorderedArr",
    unorderedArr.map((outputUnit) => outputUnit.selectedWord)
  );

  let outputArrays = [];
  let producedSentences = [];

  if (!sentenceFormula.primaryOrders || !sentenceFormula.primaryOrders.length) {
    console.log(
      "[1;31m " +
        `npqq buildSentenceString No primaryOrders were specified for ${sentenceFormula.sentenceFormulaSymbol} with ID ${sentenceFormula.sentenceFormulaId}. Using default order that structureChunks were defined in.` +
        "[0m"
    );
    console.log(
      "kfzo buildSentenceString c13 gonna push unorderedArr Clause 0"
    );
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
          console.log("gibo buildSentenceString", { chunkId });
          let foundChunk = unorderedArr.find(
            (item) => item.structureChunk.chunkId === chunkId
          );
          if (!foundChunk) {
            console.log(
              "[1;31m " +
                "cyjk buildSentenceString: Could not find for " +
                chunkId +
                " [0m"
            );
          }
          orderedArr.push(foundChunk);
        });
        console.log("qnob buildSentenceString Gonna push orderedArr Clause 1");
        outputArrays.push(orderedArr);
      });
    } else {
      let order = gpUtils.selectRandom(sentenceFormula.primaryOrders);

      let orderedArr = [];
      order.forEach((chunkId) => {
        orderedArr.push(
          unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
        );
      });
      console.log("xsqr buildSentenceString Gonna push orderedArr Clause 3");
      outputArrays.push(orderedArr);
    }
  }

  outputArrays.forEach((outputArr) => {
    let arrOfFinalSelectedWordsArr = scUtils.selectWordVersions(
      outputArr,
      currentLanguage,
      multipleMode
    );

    if (!multipleMode && arrOfFinalSelectedWordsArr.length > 1) {
      console.log(
        "[1;31m " +
          `twwe buildSentenceString NB: Randomly selecting one for question sentence.` +
          "[0m"
      );
      arrOfFinalSelectedWordsArr = gpUtils.selectRandom(
        arrOfFinalSelectedWordsArr
      );
    }

    arrOfFinalSelectedWordsArr.forEach((finalSelectedWordsArr) => {
      let producedSentence = gpUtils.capitaliseFirst(
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
  console.log("ofoc selectWordVersions orderedOutputArr");

  let selectedWordsArr = [];

  orderedOutputArr.forEach((outputUnit, index) => {
    let previousOutputUnit = orderedOutputArr[index - 1];
    let subsequentOutputUnit = orderedOutputArr[index + 1];
    let {
      selectedWord,
      structureChunk,
      drillPath,
      selectedLemmaObject,
    } = outputUnit;

    console.log("[1;30m " + `nilu selectWordVersions----------------` + "[0m");
    console.log("[1;30m " + `selectedWord` + "[0m", selectedWord);
    console.log("[1;30m " + `drillPath` + "[0m", drillPath);
    console.log("[1;30m " + `/nilu----------------` + "[0m");

    if (typeof selectedWord === "string") {
      pushSelectedWordToArray("string", selectedWord, selectedWordsArr);
      return;
    }

    if (gpUtils.isTerminusObject(selectedWord)) {
      //Move to engUtils.selectWordVersions()
      if (currentLanguage === "ENG") {
        // >>>
        // >>> Indefinite Article
        // >>>
        if (
          structureChunk.wordtype === "article" &&
          structureChunk.form.includes("indefinite")
        ) {
          if (!subsequentOutputUnit) {
            gpUtils.throw(
              "aqrz selectWordVersions Shouldn't there be an outputUnit subsequent to this ENG indefinite article?"
            );
          }

          console.log(
            "nbra selectWordVersions subsequentOutputUnit.selectedWord",
            subsequentOutputUnit.selectedWord
          );
          if (
            !subsequentOutputUnit.selectedWord
              .surprisinglyStartsWithConsonantSound &&
            (subsequentOutputUnit.selectedWord
              .surprisinglyStartsWithVowelSound ||
              (typeof subsequentOutputUnit.selectedWord === "string" &&
                /^[aeiou]/.test(subsequentOutputUnit.selectedWord[0])))
          ) {
            pushSelectedWordToArray(
              "protective",
              selectedWord,
              selectedWordsArr
            );
            return;
          } else {
            pushSelectedWordToArray(
              "nonprotective",
              selectedWord,
              selectedWordsArr
            );
            return;
          }
        }
      }

      //Move to polUtils.selectWordVersions()
      if (currentLanguage === "POL") {
        if (
          gpUtils.getWordtypeFromLemmaObject(selectedLemmaObject) === "pronoun"
        ) {
          // >>>
          // >>> Pronoun: post-prepositional
          // >>>
          if (
            previousOutputUnit &&
            gpUtils.getWordtypeFromLemmaObject(
              previousOutputUnit.selectedLemmaObject
            ) === "preposition"
          ) {
            pushSelectedWordToArray(
              "postPreposition",
              selectedWord,
              selectedWordsArr
            );
            return;
          } else {
            // >>>
            // >>> Pronoun: stressed or unstressed
            // >>>

            let combinedSelectedWordsArr = [];

            if (multipleMode) {
              combinedSelectedWordsArr = [
                ...combinedSelectedWordsArr,
                ...selectedWord.unstressed,
              ];
              combinedSelectedWordsArr = [
                ...combinedSelectedWordsArr,
                ...selectedWord.stressed,
              ];
            } else {
              combinedSelectedWordsArr = [
                ...combinedSelectedWordsArr,
                ...selectedWord.unstressed,
              ];
            }

            pushSelectedWordToArray(
              "array",
              combinedSelectedWordsArr,
              selectedWordsArr
            );
            return;
          }
        }

        if (
          gpUtils.getWordtypeFromLemmaObject(selectedLemmaObject) ===
          "preposition"
        ) {
          if (!subsequentOutputUnit) {
            gpUtils.throw(
              "mcob selectWordVersions Shouldn't there be an outputUnit subsequent to this POL preposition?"
            );
          }

          if (
            selectedLemmaObject.protectIfSubsequentStartsWithTheseRegexes &&
            selectedLemmaObject.protectIfSubsequentStartsWithTheseRegexes.some(
              (prefix) => {
                let prefixRegex = RegExp("^" + prefix);
                return prefixRegex.test(subsequentOutputUnit.selectedWord);
              }
            )
          ) {
            pushSelectedWordToArray(
              "protective",
              selectedWord,
              selectedWordsArr
            );
            return;
          } else {
            pushSelectedWordToArray(
              "nonprotective",
              selectedWord,
              selectedWordsArr
            );
            return;
          }
        }

        pushSelectedWordToArray("normal", selectedWord, selectedWordsArr);
      }
    } else {
      gpUtils.throw(
        "oilf selectWordVersions #ERR --------------------------------------> I expected either a string or a terminus object for this selectedWord."
      );
    }

    function pushSelectedWordToArray(key, selectedWord, selectedWordsArr) {
      console.log(
        "[1;30m " + `esbq pushSelectedWordToArray-----------------with args:` + "[0m"
      );
      console.log("esbq pushSelectedWordToArray", {
        key,
        selectedWord,
        selectedWordsArr,
      });

      if (key === "string") {
        console.log(
          "[1;30m " + `uufy pushSelectedWordToArray Pushing ${selectedWord}` + "[0m"
        );
        selectedWordsArr.push([selectedWord]);
        return;
      }

      if (key === "array") {
        console.log(
          "[1;30m " + `uufy pushSelectedWordToArray Pushing ${selectedWord}` + "[0m"
        );
        selectedWordsArr.push(selectedWord);
        return;
      }

      if (!selectedWord[key]) {
        gpUtils.throw(
          `rgxc selectWordVersions #ERR Could not find key ${key} on selectedWord.`
        );
      }

      if (!Array.isArray(selectedWord[key])) {
        console.log("vcxx selectWordVersions", {
          selectedWord,
          "selectedWord[key]": selectedWord[key],
        });
        gpUtils.throw(
          "vcxx selectWordVersions Value inside tobj should have been array."
        );
      }

      console.log(
        "[1;30m " + `oqij selectWordVersions Pushing arr ${selectedWord[key]}` + "[0m"
      );
      selectedWordsArr.push(selectedWord[key]);
    }

    console.log("oadb selectWordVersions", { selectedWord });
    gpUtils.throw(
      `oadb selectWordVersions didn't add any word from ${structureChunk.chunkId} and see selectedWord above.`
    );
  });

  console.log("hjoz selectWordVersions selectedWordsArr", selectedWordsArr);

  let arrOfSelectedWordsArr = gpUtils.arrayExploder(selectedWordsArr);

  console.log(
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
    console.log(
      "[1;35m " +
        "dxft sc:conformAnswerStructureToQuestionStructure-------------------" +
        "[0m"
    );
  } else {
    console.log(
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

    if (questionStructureChunk.wordtype === "fixed") {
      return;
    }

    if (shouldConsoleLog) {
      console.log(
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
      console.log(
        "dtph #NB sc:conformAnswerStructureToQuestionStructure couldn't find any answerStructureChunk for '" +
          questionStructureChunk.chunkId +
          "'."
      );
      return;
    }

    let matchingAnswerLemmaObjects = [];

    let lemmasToSearch =
      questionSelectedLemmaObject.translations[answerLanguage];

    let source = words[gpUtils.giveSetKey(answerStructureChunk.wordtype)];
    // answerLangUtils.preprocessLemmaObjectsMinor(source);

    matchingAnswerLemmaObjects = source.filter(
      (lObj) =>
        lemmasToSearch.includes(lObj.lemma) &&
        //Resolve issue of multipleWordtype allohoms.
        gpUtils.getWordtypeFromLemmaObject(lObj) ===
          questionStructureChunk.wordtype
    );

    let matchesLengthSnapshot = matchingAnswerLemmaObjects.length;

    matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
      (answerLemmaObject) =>
        gpUtils.areTwoFlatArraysEqual(
          questionSelectedLemmaObject.tags,
          answerLemmaObject.tags
        )
    );

    if (matchesLengthSnapshot && !matchingAnswerLemmaObjects.length) {
      console.log(
        "[1;31m " +
          `wtlg conformAnswerStructureToQuestionStructure #NB: There were some lemma objects, but they were filtered out because they didn't have all tags matching.` +
          "[0m"
      );
    }

    if (!matchingAnswerLemmaObjects.length) {
      console.log(
        "ltqf conformAnswerStructureToQuestionStructure #NB There were no matching answer lemma objects found in SC:conformAnswerStructureToQuestionStructure"
      );
      return;
    }

    //...and then for both pronouns and all other wordtypes, we get the id and set it.
    answerStructureChunk.specificIds = matchingAnswerLemmaObjects.map(
      (lObj) => lObj.id
    );

    //Do actually transfer gender, for person nouns.
    if (
      questionStructureChunk.wordtype === "noun" &&
      questionStructureChunk.andTags &&
      questionStructureChunk.andTags.includes("person")
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
      answerStructureChunk.wordtype
    ].forEach((inflectorKey) => {
      //
      // STEP ONE: Update inflectors from list of allowable transfers.
      //
      if (!questionStructureChunk[inflectorKey]) {
        return;
      }

      if (
        answerStructureChunk.importantFeatures &&
        answerStructureChunk.importantFeatures.includes(inflectorKey)
      ) {
        console.log(
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
        console.log(
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
        console.log(
          "kozn conformAnswerStructureToQuestionStructure All answer lobjs are tantum, so we won't transfer Number feature."
        );
        return;
      }

      if (inflectorKey === "tenseDescription") {
        answerStructureChunk["tenseDescription"] = []; //hard adjust

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
        answerStructureChunk.wordtype
      ];

    let possibleInflectionsOfAnswerLobjs =
      refObj.lemmaObjectFeatures[answerLanguage].inflectionChains[
        answerStructureChunk.wordtype
      ];

    let possibleInflectionsOfAnswerLobjsButNotQuestionLobjs = possibleInflectionsOfAnswerLobjs.filter(
      (inflector) => !possibleInflectionsOfQuestionLobjs.includes(inflector)
    );

    possibleInflectionsOfAnswerLobjsButNotQuestionLobjs.forEach((inflector) => {
      if (
        !answerStructureChunk.importantFeatures ||
        !answerStructureChunk.importantFeatures.includes(inflector)
      ) {
        //Refrain from the blinding if this inflector has been marked as important in the answer structure.
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
    console.log("[1;35m " + "/conformAnswerStructureToQuestionStructure" + "[0m");
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
  dependentChunk
) => {
  console.log(
    `cmpr inheritFromHeadToDependentChunk: from ${headChunk.chunkId} to ${dependentChunk.chunkId}`,
    "dependentChunk BEFOREHAND: ",
    dependentChunk
  );
  console.log("cmpr inheritFromHeadToDependentChunk: headChunk", headChunk);

  let inheritableInflectorKeys =
    refObj.lemmaObjectFeatures[currentLanguage].inheritableInflectorKeys[
      dependentChunk.wordtype
    ];

  let hybridSelectors =
    refObj.lemmaObjectFeatures[currentLanguage].hybridSelectors[
      dependentChunk.wordtype
    ];

  if (hybridSelectors) {
    inheritableInflectorKeys = [
      ...inheritableInflectorKeys,
      ...hybridSelectors,
    ];
  }

  inheritableInflectorKeys.forEach((inflectorKey) => {
    console.log("kwwm inheritFromHeadToDependentChunk: inflectorKey", {
      inflectorKey,
    });
    //HARD CHANGE
    if (
      headChunk[inflectorKey] &&
      !(
        dependentChunk.importantFeatures &&
        dependentChunk.importantFeatures.includes(inflectorKey)
      )
    ) {
      let inflectorValueArr = gpUtils.copyWithoutReference(
        headChunk[inflectorKey]
      );

      dependentChunk[inflectorKey] = inflectorValueArr;
    }
  });

  console.log(
    "ttez At the end of inheritFromHeadToDependentChunk, we must again adjustVirility, which we also did in allLangUtils.preprocessStructureChunks earlier."
  );

  allLangUtils.adjustVirilityOfStructureChunk(
    currentLanguage,
    headChunk,
    true,
    "headChunk from SC:inheritFromHeadToDependentChunk"
  );
  allLangUtils.adjustVirilityOfStructureChunk(
    currentLanguage,
    dependentChunk,
    true,
    "dependentChunk from SC:inheritFromHeadToDependentChunk"
  );

  console.log(
    "wdim inheritFromHeadToDependentChunk: dependentChunk AFTERWARDS of inheritFromHeadToDependentChunk: ",
    dependentChunk
  );
};

exports.sortStructureChunks = (sentenceStructure) => {
  let headChunks = Array.from(
    new Set(
      sentenceStructure
        .map((chunk) => {
          if (typeof chunk === "object" && chunk.agreeWith) {
            return chunk.agreeWith;
          }
        })
        .filter((item) => item)
    )
  ).map((headId) => {
    return sentenceStructure.find((chunk) => chunk.chunkId === headId);
  });

  let dependentChunks = sentenceStructure.filter(
    (structureChunk) =>
      typeof structureChunk === "object" && structureChunk.agreeWith
  );

  let otherChunks = sentenceStructure.filter(
    (chunk) =>
      ![
        ...headChunks.map((chunk) => chunk.chunkId),
        ...dependentChunks.map((chunk) => chunk.chunkId),
      ].includes(chunk.chunkId)
  );

  return { headChunks, dependentChunks, otherChunks };
};
