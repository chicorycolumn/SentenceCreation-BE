const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");

exports.getLemmaObjectsWithoutGivenKey = (wordsBank, wordtype, featureKey) => {
  return wordsBank[`${wordtype}Set`].filter((lObj) => !lObj[featureKey]);
};

exports.checkWords = (testing, currentLanguage) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  const wordsBank = exports.getWordsBank(currentLanguage, testing);

  Object.keys(wordsBank).forEach((wordtypeKey) => {
    let words = wordsBank[wordtypeKey];
    langUtils.preprocessLemmaObjectsMinor(words);
  });

  let nounsWithoutGender = exports.getLemmaObjectsWithoutGivenKey(
    wordsBank,
    "noun",
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
    console.log({ homographType });
    throw "findHomographs fxn: I don't know what type of homograph you want me to find. I've logged above what you gave me.";
  }

  const wordsBank = exports.getWordsBank(currentLanguage, testing);
  const langUtils = require(`../source/${currentLanguage}/langUtils.js`);

  let recordOfTerminalValuesAndPaths = [];
  let severallyAppearingTerminalValuesArr = [];
  let temporaryArr = [];
  let homographs = {};

  Object.keys(wordsBank).forEach((wordsetKey) => {
    let wordset = wordsBank[wordsetKey];

    let wordtype = wordsetKey.slice(0, -3);

    langUtils.preprocessLemmaObjectsMajor(wordset, { wordtype }, true);

    wordset.forEach((lObj) => {
      let terminalValuesAndPathsArr = otUtils.giveRoutesAndTerminalValuesFromObject(
        lObj.inflections
      );

      terminalValuesAndPathsArr.forEach((terminalValuesAndPathsUnit) => {
        terminalValuesAndPathsUnit.nestedRoute.unshift(lObj.id);
        recordOfTerminalValuesAndPaths.push(terminalValuesAndPathsUnit);
      });
    });
  });

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
      gpUtils.doesArrContainDifferentValues(
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
      gpUtils.doesArrContainDifferentValues(firstStepsOfRoute) //At least some are allohoms.
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
        !gpUtils.doesArrContainDifferentValues(firstStepsOfRoute) && //All are synhoms.
        gpUtils.doesArrHaveOnlyTheseMembers(secondStepsOfRoute, ["v2", "v3"])
      ) {
        return;
      }
    }
    resultObj[homographWord] = homographRoutes;
  }
};

exports.checkLemmaObjectIds = (testing, currentLanguage) => {
  const wordsBank = exports.getWordsBank(currentLanguage, testing);

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
  const sentenceFormulasBank = exports.getSentenceFormulasBank(
    currentLanguage,
    testing
  );

  let schematic = Object.keys(
    sentenceFormulasBank
  ).map((sentenceFormulaKey) => [
    sentenceFormulasBank[sentenceFormulaKey].sentenceFormulaId,
  ]);

  console.log("&");
  console.log("&");
  console.log(schematic);
  console.log("&");
  console.log("&");

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

exports.getWordsBank = (currentLanguage, testing) => {
  if (!testing) {
    const { wordsBank } = require(`../source/${currentLanguage}/words.js`);
    return wordsBank;
  } else {
    const { wordsBank } = require(`../source/TEST/${currentLanguage}/words.js`);
    return wordsBank;
  }
};

exports.getSentenceFormulasBank = (currentLanguage, testing) => {
  if (!testing) {
    const {
      sentenceFormulasBank,
    } = require(`../source/${currentLanguage}/sentenceFormulas.js`);
    return sentenceFormulasBank;
  } else {
    const {
      sentenceFormulasBank,
    } = require(`../source/TEST/${currentLanguage}/sentenceFormulas.js`);
    return sentenceFormulasBank;
  }
};
