const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");

exports.findTypeOneHomographs = (
  currentLanguage,
  homographType,
  ignoreVeeTwoVeeThreeAllohoms,
  ignoreAllohomsAlreadyWithClarifiers
) => {
  if (!["syn", "allo", "all"].includes(homographType)) {
    console.log({ homographType });
    throw "findTypeOneHomographs fxn: I don't know what type of homograph you want me to find. I've logged above what you gave me.";
  }

  const { wordsBank } = require(`../source/${currentLanguage}/words.js`);

  let foundThing = otUtils.findObjectInNestedObject(
    wordsBank,
    {
      id: "eng-ver-003",
    },
    false,
    true
  );
  console.log({ foundThing });

  return;

  let recordOfTerminalValuesAndPaths = [];
  let severallyAppearingTerminalValuesArr = [];
  let temporaryArr = [];
  let homographs = {};

  Object.keys(wordsBank).forEach((wordsetKey) => {
    let wordset = wordsBank[wordsetKey];

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
        allohomographs,
        homographWord,
        homographRoutes
      );
    }
  });

  function checkForIgnoringsAndAddToResult(
    resultObj,
    homographWord,
    homographRoutes
  ) {
    resultObj[homographWord] = homographRoutes;
  }

  if (homographType === "allo") {
    return allohomographs;
  } else if (homographType === "syn") {
    return synhomographs;
  } else if (homographType === "all") {
    return homographs;
  }
};
