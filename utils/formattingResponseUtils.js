const frUtils = require("./formattingResponseUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.finishAndSend = (
  questionResponseObj,
  answerResponseObj,
  additionalRunsRecord
) => {
  let combinedResponseObj = { additionalRunsRecord };

  let refs = [
    { responseObject: questionResponseObj, mode: "question" },
    { responseObject: answerResponseObj, mode: "answer" },
  ];

  refs.forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.mode + "SentenceArr"] =
        ref.responseObject.finalSentenceArr || [];

      if (ref.responseObject.errorMessage) {
        combinedResponseObj[ref.mode + "ErrorMessage"] = [
          ref.responseObject.errorMessage,
        ];
      }
      if (ref.responseObject.message) {
        combinedResponseObj[ref.mode + "Message"] = ref.responseObject.message;
      }
      if (ref.responseObject.fragment) {
        combinedResponseObj[ref.mode + "Fragment"] =
          ref.responseObject.fragment;
      }
    }
  });

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
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
    consol.log(
      `acsm, errorInDrilling:${!!errorInDrilling}, selectedWord:${!!selectedWord}, `
    );
    consol.log(
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
  pushKey,
  selectedWord,
  selectedWordsArr,
  annoObj,
  structureChunk
) => {
  consol.log(
    "[1;30m " + `esbq pushSelectedWordToArray-----------------with args:` + "[0m",
    {
      pushKey,
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
    consol.log(`vprr addAnnotationsAndPush "${wordInOwnArr}"`);
    if (annoObj && Object.values(annoObj).length) {
      if (wordInOwnArr.length !== 1) {
        consol.throw(
          `vpra #ERR addAnnotationsAndPush. To add annotation from [${Object.values(
            annoObj
          )}] but there are multiple/none selected words: [${wordInOwnArr}].`
        );
      }

      consol.log("vpre addAnnotationsAndPush. annoObj is " + annoObj);

      if (structureChunk.educatorBlocksAnnotationsForTheseTraitKeys) {
        consol.log(
          `vpri addAnnotationsAndPush will not add clarifiers [${Object.values(
            annoObj
          )}] as "educatorBlocksAnnotationsForTheseTraitKeys" true.`
        );
      } else {
        consol.log(
          "vpro pushSelectedWordToArray addAnnotationsAndPush. Adding these annotations:" +
            Object.values(annoObj).join(", ")
        );

        wordInOwnArr[0] += ` (${Object.values(annoObj).join(", ")})`;
      }
    } else {
      consol.log("vpru addAnnotationsAndPush. No annoObj");
    }

    selectedWordsArr.push(wordInOwnArr);
  }

  if (pushKey === "string") {
    consol.log(
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

  if (pushKey === "array") {
    consol.log(
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

  if (!selectedWord[pushKey]) {
    consol.throw(
      `#ERR rgxc selectWordVersions. Could not find pushKey "${pushKey}" on selectedWord.`
    );
  }

  if (!Array.isArray(selectedWord[pushKey])) {
    consol.throw(
      `vcxx selectWordVersions value inside tobj at pushKey "${pushKey}" should have been array but instead it was ${selectedWord[pushKey]}.`
    );
  }

  if (!selectedWord[pushKey]) {
    consol.throw(
      "#ERR ztgp selectWordVersions. selectedWord[pushKey] was falsy."
    );
  }

  consol.log(
    "[1;30m " + `oqij selectWordVersions Pushing arr "${selectedWord[pushKey]}"` + "[0m"
  );
  addAnnotationsAndPush(
    selectedWord[pushKey],
    selectedWordsArr,
    annoObj,
    structureChunk
  );
};
