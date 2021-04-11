const frUtils = require("./formattingResponseUtils.js");
const uUtils = require("./universalUtils.js");
const clUtils = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.finishAndSend = (
  questionResponseObj,
  answerResponseObj,
  additionalRunsRecord
) => {
  let combinedResponseObj = { additionalRunsRecord };

  let refs = [
    { responseObject: questionResponseObj, key: "question" },
    { responseObject: answerResponseObj, key: "answer" },
  ];

  refs.forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.key + "SentenceArr"] =
        ref.responseObject.finalSentenceArr || [];

      if (ref.responseObject.errorMessage) {
        combinedResponseObj[ref.key + "ErrorMessage"] = [
          ref.responseObject.errorMessage,
        ];
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
    errorInSentenceCreation.errorMessage = [
      "acsm createOutputUnit A lemma object was indeed selected, but no word was found at the end of the give inflection chain.",
    ];
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

exports.pushSelectedWordToArray = (
  key,
  selectedWord,
  selectedWordsArr,
  annoObj,
  structureChunk
) => {
  console.log(
    "[1;30m " + `esbq pushSelectedWordToArray-----------------with args:` + "[0m",
    {
      key,
      selectedWord,
      selectedWordsArr,
      annoObj,
    }
  );

  function addAnnotationsAndPush(
    wordInOwnArr,
    selectedWordsArr,
    annoObj,
    structureChunk
  ) {
    console.log("vprr addAnnotationsAndPush " + wordInOwnArr);
    if (annoObj && Object.values(annoObj).length) {
      if (wordInOwnArr.length !== 1) {
        clUtils.throw(
          `vpra #ERR addAnnotationsAndPush. To add annotation from [${Object.values(
            annoObj
          )}] but there are multiple/none selected words: [${wordInOwnArr}].`
        );
      }

      console.log("vpre addAnnotationsAndPush. annoObj is " + annoObj);

      if (structureChunk.educatorBlocksAnnotationsForTheseFeatures) {
        console.log(
          `vpri addAnnotationsAndPush will not add clarifiers [${Object.values(
            annoObj
          )}] as "educatorBlocksAnnotationsForTheseFeatures" true.`
        );
      } else {
        console.log(
          "vpro pushSelectedWordToArray addAnnotationsAndPush. Adding these annotations:" +
            Object.values(annoObj).join(", ")
        );

        wordInOwnArr[0] += ` (${Object.values(annoObj).join(", ")})`;
      }
    } else {
      console.log("vpru addAnnotationsAndPush. No annoObj");
    }

    selectedWordsArr.push(wordInOwnArr);
  }

  if (key === "string") {
    console.log(
      "[1;30m " + `uufy pushSelectedWordToArray Pushing "${selectedWord}"` + "[0m"
    );

    addAnnotationsAndPush(
      [selectedWord],
      selectedWordsArr,
      annoObj,
      structureChunk
    );
    return;
  }

  if (key === "array") {
    console.log(
      "[1;30m " + `uufy pushSelectedWordToArray Pushing "${selectedWord}"` + "[0m"
    );
    addAnnotationsAndPush(
      selectedWord,
      selectedWordsArr,
      annoObj,
      structureChunk
    );
    return;
  }

  if (!selectedWord[key]) {
    clUtils.throw(
      `#ERR rgxc selectWordVersions. Could not find key "${key}" on selectedWord.`
    );
  }

  if (!Array.isArray(selectedWord[key])) {
    console.log("vcxx selectWordVersions", {
      selectedWord,
      "selectedWord[key]": selectedWord[key],
    });
    clUtils.throw(
      "vcxx selectWordVersions Value inside tobj should have been array."
    );
  }

  if (!selectedWord[key]) {
    clUtils.throw("#ERR ztgp selectWordVersions. selectedWord[key] was falsy.");
  }

  console.log(
    "[1;30m " + `oqij selectWordVersions Pushing arr "${selectedWord[key]}"` + "[0m"
  );
  addAnnotationsAndPush(
    selectedWord[key],
    selectedWordsArr,
    annoObj,
    structureChunk
  );
};
