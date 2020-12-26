const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");

exports.findTypeOneHomographs = (
  currentLanguage,
  homographType,
  showAllEvenIfAllohomClarifierAdded
) => {
  if (!["syn", "allo"].includes(homographType)) {
    console.log({ homographType });
    throw "findTypeOneHomographs fxn: I don't know what type of homograph you want me to find. I've logged above what you gave me.";
  }

  const { wordsBank } = require(`../source/${currentLanguage}/words.js`);

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

  if (homographType === "allo") {
    let allohomographs = {};

    Object.keys(homographs).forEach((homographWord) => {
      let homographRoutes = homographs[homographWord];

      if (
        gpUtils.doesArrContainDifferentValues(
          homographRoutes.map((route) => route[0])
        )
      ) {
        allohomographs[homographWord] = homographRoutes;
      }
    });

    return allohomographs;
  } else if (homographType === "syn") {
    return homographs;
  }
};
