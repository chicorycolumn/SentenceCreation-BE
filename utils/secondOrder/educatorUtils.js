const gpUtils = require(".././generalPurposeUtils.js");
const uUtils = require(".././universalUtils.js");
const clUtils = require(".././zerothOrder/consoleLoggingUtils.js");
const otUtils = require(".././objectTraversingUtils.js");
const educatorUtils = require("./educatorUtils.js");

exports.checkOutputArrayForMissingUnits = (
  sentenceFormula,
  outputArray,
  currentLanguage,
  label,
  useDummy
) => {
  if (useDummy) {
    return;
  }

  let primaryOrders = sentenceFormula.primaryOrders;
  let outputChunkIds = outputArray.map((unit) => unit.structureChunk.chunkId);

  if (
    !primaryOrders.some((order) =>
      order.every((chunkId) => outputChunkIds.includes(chunkId))
    )
  ) {
    clUtils.log("dwke primaryOrders", primaryOrders);
    clUtils.log("dwke outputChunkIds", outputChunkIds);
    clUtils.throw(
      `dwke checkOutputArrayForMissingUnits. "${label}" "${currentLanguage}" outputArray didn't have all the requisite units. See above.`
    );
  }
};

exports.getLemmaObjectsWithoutGivenKey = (wordsBank, wordtype, featureKey) => {
  return wordsBank[`${wordtype}Set`].filter((lObj) => !lObj[featureKey]);
};

exports.checkWords = (testing, currentLanguage) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  const wordsBank = educatorUtils.getWordsBank(currentLanguage, testing);

  Object.keys(wordsBank).forEach((wordtypeKey) => {
    let words = wordsBank[wordtypeKey];
    langUtils.preprocessLemmaObjectsMinor(words);
  });

  let nounsWithoutGender = educatorUtils.getLemmaObjectsWithoutGivenKey(
    wordsBank,
    "noun", //bostonOK
    "gender"
  );

  return {
    nounsWithoutGender: nounsWithoutGender.map((lObj) => [lObj.lemma, lObj.id]),
  };
};

/**
 * Gives a list of homographs (allo or syn) to the educator, so that they may take action on these.
 * @param {boolean} testing - Should we use test wordsBank.
 * @param {string} currentLanguage
 * @param {string} homographType - "syn", "allo", or "all".
 * @param {object} ignore - What to ignore: "ignoreV2V3Synhoms", "ignoreClarifiedAllohoms"
 */
exports.findHomographs = (testing, currentLanguage, homographType, ignore) => {
  if (currentLanguage !== "ENG") {
    ignore.ignoreV2V3Synhoms = false;
  }

  if (!["syn", "allo", "all"].includes(homographType)) {
    clUtils.log("tvgz findHomographs", { homographType });
    throw "findHomographs fxn: I don't know what type of homograph you want me to find. I've logged above what you gave me.";
  }

  const wordsBank = educatorUtils.getWordsBank(currentLanguage, testing);
  const langUtils = require(`../../source/${currentLanguage}/langUtils.js`);

  let recordOfTerminalValuesAndPaths = [];
  let severallyAppearingTerminalValuesArr = [];
  let temporaryArr = [];
  let homographs = {};

  Object.keys(wordsBank).forEach((wordsetKey) => {
    let wordset = wordsBank[wordsetKey];

    let wordtype = wordsetKey.slice(0, -3);

    langUtils.preprocessLemmaObjectsMajor(
      wordset,
      { wordtype },
      true,
      currentLanguage
    );

    wordset.forEach((lObj) => {
      let terminalValuesAndPathsArr =
        otUtils.giveRoutesAndTerminalValuesFromObject(lObj.inflections);

      terminalValuesAndPathsArr.forEach((terminalValuesAndPathsUnit) => {
        terminalValuesAndPathsUnit.nestedRoute.unshift(lObj.id);
        recordOfTerminalValuesAndPaths.push(terminalValuesAndPathsUnit);
      });
    });
  });

  clUtils.log("recordOfTerminalValuesAndPaths", recordOfTerminalValuesAndPaths);

  recordOfTerminalValuesAndPaths.forEach((unit) => {
    let { terminalValue } = unit;
    if (
      temporaryArr.includes(terminalValue) &&
      !severallyAppearingTerminalValuesArr.includes(terminalValue)
    ) {
      severallyAppearingTerminalValuesArr.push(terminalValue);
    } else {
      temporaryArr.push(terminalValue);
    }
  });

  severallyAppearingTerminalValuesArr.forEach((terminalValue) => {
    homographs[terminalValue] = recordOfTerminalValuesAndPaths
      .filter((unit) => unit.terminalValue === terminalValue)
      .map((unit) => unit.nestedRoute);
  });

  let allohomographs = {};
  let synhomographs = {};

  Object.keys(homographs).forEach((homographWord) => {
    let homographRoutes = homographs[homographWord];

    if (
      uUtils.doesArrContainDifferentValues(
        homographRoutes.map((route) => route[0])
      )
    ) {
      checkForIgnoringsAndAddToResult(
        allohomographs,
        homographWord,
        homographRoutes
      );
    } else {
      checkForIgnoringsAndAddToResult(
        synhomographs,
        homographWord,
        homographRoutes
      );
    }
  });

  if (homographType === "allo") {
    return allohomographs;
  } else if (homographType === "syn") {
    return synhomographs;
  } else if (homographType === "all") {
    return homographs;
  }

  function checkForIgnoringsAndAddToResult(
    resultObj,
    homographWord,
    homographRoutes
  ) {
    let firstStepsOfRoute = homographRoutes.map((arr) => arr[0]);
    let secondStepsOfRoute = homographRoutes.map((arr) => arr[1]);

    if (
      ignore.ignoreClarifiedAllohoms &&
      uUtils.doesArrContainDifferentValues(firstStepsOfRoute) //At least some are allohoms.
    ) {
      let isEveryAllohomAlreadyClarified = firstStepsOfRoute.every(
        (lemmaObjectId) => {
          let lemmaObject = otUtils.findObjectInNestedObject(
            wordsBank,
            {
              id: lemmaObjectId,
            },
            false,
            true
          );

          if (!lemmaObject) {
            throw (
              "ED:checkForIgnoringsAndAddToResult - I couldn't find a lobj for this id:" +
              lemmaObjectId
            );
          }

          if (
            lemmaObject.allohomInfo &&
            lemmaObject.allohomInfo.emoji &&
            lemmaObject.allohomInfo.text
          ) {
            return true;
          }
        }
      );

      if (isEveryAllohomAlreadyClarified) {
        return;
      }
    } else if (ignore.ignoreV2V3Synhoms) {
      if (
        !uUtils.doesArrContainDifferentValues(firstStepsOfRoute) && //All are synhoms.
        uUtils.doesArrHaveOnlyTheseMembers(secondStepsOfRoute, ["v2", "v3"])
      ) {
        return;
      }
    }
    resultObj[homographWord] = homographRoutes;
  }
};

exports.checkLemmaObjectIds = (testing, currentLanguage) => {
  const wordsBank = educatorUtils.getWordsBank(currentLanguage, testing);

  let schematic = [];
  Object.keys(wordsBank).forEach((wordtypeKey) => {
    let wordsOfAType = wordsBank[wordtypeKey];
    schematic = [
      ...schematic,
      ...wordsOfAType.map((lObj) => [lObj.id, lObj.lemma]),
    ];
  });

  let tempArr = [];
  let duplicateIds = [];

  schematic.forEach((item) => {
    if (tempArr.includes(item[0])) {
      duplicateIds.push(item[0]);
    } else {
      tempArr.push(item[0]);
    }
  });

  return { schematic, duplicateIds };
};

exports.checkSentenceFormulaIds = (testing, currentLanguage) => {
  const sentenceFormulasBank = educatorUtils.getSentenceFormulasBank(
    currentLanguage,
    testing
  );

  let schematic = sentenceFormulasBank.map((senFor) => [
    senFor.sentenceFormulaId,
    senFor.sentenceFormulaSymbol,
  ]);

  function findDuplicates(index) {
    let tempArr = [];
    let duplicateIds = [];

    schematic.forEach((item) => {
      if (tempArr.includes(item[index])) {
        duplicateIds.push(item[index]);
      } else {
        tempArr.push(item[index]);
      }
    });

    return duplicateIds;
  }

  let duplicateIds = findDuplicates(0);
  let duplicateSymbols = findDuplicates(1);

  return { schematic, duplicateIds, duplicateSymbols };
};

exports.getWordsBank = (currentLanguage, testing) => {
  if (!testing) {
    const { wordsBank } = require(`../../source/${currentLanguage}/words.js`);
    return wordsBank;
  } else {
    const {
      wordsBank,
    } = require(`../../source/TEST/${currentLanguage}/words.js`);
    return wordsBank;
  }
};

exports.getSentenceFormulasBank = (currentLanguage, testing) => {
  if (!testing) {
    const {
      sentenceFormulasBank,
    } = require(`../../source/${currentLanguage}/sentenceFormulas.js`);
    return sentenceFormulasBank;
  } else {
    const {
      sentenceFormulasBank,
    } = require(`../../source/TEST/${currentLanguage}/sentenceFormulas.js`);
    return sentenceFormulasBank;
  }
};
