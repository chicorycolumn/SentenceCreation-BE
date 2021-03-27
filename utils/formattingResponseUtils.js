const frUtils = require("./formattingResponseUtils.js");
const uUtils = require("./universalUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.finishAndSend = (questionResponseObj, answerResponseObj) => {
  let combinedResponseObj = {};

  let refs = [
    { responseObject: questionResponseObj, key: "question" },
    { responseObject: answerResponseObj, key: "answer" },
  ];

  refs.forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.key + "SentenceArr"] =
        ref.responseObject.finalSentenceArr || [];

      if (ref.responseObject.errorMessage) {
        combinedResponseObj[ref.key + "ErrorMessage"] =
          ref.responseObject.errorMessage;
      }
      if (ref.responseObject.message) {
        combinedResponseObj[ref.key + "Message"] = ref.responseObject.message;
      }
      if (ref.responseObject.fragment) {
        combinedResponseObj[ref.key + "Fragment"] = ref.responseObject.fragment;
      }
    }
  });

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};

exports.createMergedGenderOutputUnit = (
  subArrayOfOutputUnits,
  currentLanguage
) => {
  let mergedOutputUnit = uUtils.copyWithoutReference(subArrayOfOutputUnits[0]);

  let newGenderArr = [
    mergedOutputUnit.drillPath.find((pathArr) => pathArr[0] === "gender")[1],
  ];

  subArrayOfOutputUnits.slice(1).forEach((outputUnit) => {
    let genderValue = outputUnit.drillPath.find(
      (pathArr) => pathArr[0] === "gender"
    )[1];

    newGenderArr.push(genderValue);
  });

  console.log(
    "dznt ot:findMatchingLemmaObjectThenWord newGenderArr",
    newGenderArr
  );

  let metaGenderRef = refObj.metaFeatures[currentLanguage]["gender"];

  let metaGenderResult;

  Object.keys(metaGenderRef).forEach((metaGenderKey) => {
    if (metaGenderResult) {
      return;
    }

    let metaGenderTranslatedArr = metaGenderRef[metaGenderKey];

    if (uUtils.areTwoFlatArraysEqual(newGenderArr, metaGenderTranslatedArr)) {
      metaGenderResult = metaGenderKey;
    }
  });

  console.log(
    `zdxc ot:findMatchingLemmaObjectThenWord metaGenderResult: "${metaGenderResult}"`
  );

  mergedOutputUnit.drillPath.find(
    (pathArr) => pathArr[0] === "gender"
  )[1] = metaGenderResult;

  return mergedOutputUnit;
};

exports.createOutputUnit = (
  errorInSentenceCreation,
  errorInDrilling,
  selectedWord,
  structureChunk,
  selectedLemmaObject,
  drillPath,
  drillPathSecondary,
  drillPathTertiary
) => {
  if (errorInDrilling || !selectedWord) {
    console.log(
      "acsm createOutputUnit errorInSentenceCreation.errorMessage: A lemma object was indeed selected, but no word was found at the end of the give inflection chain."
    );
    errorInSentenceCreation.errorMessage =
      "acsm createOutputUnit A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
    return false;
  }

  let resultingOutputUnit = {
    selectedLemmaObject,
    selectedWord,
    drillPath,
    structureChunk: structureChunk,
  };

  if (drillPathSecondary) {
    resultingOutputUnit.drillPathSecondary = drillPathSecondary;
  }

  if (drillPathTertiary) {
    resultingOutputUnit.drillPathTertiary = drillPathTertiary;
  }

  return resultingOutputUnit;
};
