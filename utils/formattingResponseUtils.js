const frUtils = require("./formattingResponseUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const gpUtils = require("./generalPurposeUtils.js");
const idUtils = require("./identityUtils.js");

exports.sendResponseForSingleWord = (returnDirectly, questionSentenceData) => {
  let arr = questionSentenceData.arrayOfOutputArrays.map((arr) => {
    return {
      selectedWord: arr
        .map((obj) => {
          if (idUtils.isTerminusObject(obj.selectedWord)) {
            let allWords = gpUtils.getWordsFromTerminusObject(obj.selectedWord);
            return allWords[0];
          }
          return obj.selectedWord;
        })
        .join(" "),
      lObjId: arr
        .map((obj) => {
          return obj.selectedLemmaObject ? obj.selectedLemmaObject.id : "";
        })
        .join(" "),
    };
  });

  let deduplicatedArrForEducatorInterface = [];

  arr.forEach((obj) => {
    if (
      !deduplicatedArrForEducatorInterface
        .map((ob) => ob.selectedWord)
        .includes(obj.selectedWord)
    ) {
      deduplicatedArrForEducatorInterface.push(obj);
    }
  });

  return frUtils.finishAndSend(returnDirectly, {
    finalSentenceArr: deduplicatedArrForEducatorInterface,
  });
};

exports.finishAndSend = (
  returnDirectly,
  questionResponseObj,
  answerResponseObj,
  runsRecord
) => {
  let combinedResponseObj = {};

  if (runsRecord && runsRecord.length) {
    combinedResponseObj.originalRun = runsRecord.shift();
    combinedResponseObj.runsRecord = runsRecord;
  }

  let refs = [
    { responseObject: questionResponseObj, mode: "question" },
    { responseObject: answerResponseObj, mode: "answer" },
  ];

  refs.forEach((ref) => {
    if (ref.responseObject) {
      if (ref.responseObject.FYIPs) {
        if (!combinedResponseObj.FYIPs) {
          combinedResponseObj.FYIPs = [];
        }
        combinedResponseObj.FYIPs.push(...ref.responseObject.FYIPs);
      }

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

  if (returnDirectly) {
    return combinedResponseObj;
  }

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};

exports.returnNullQuestionResponseObj = (
  formattingOptions,
  startTime,
  returnDirectly,
  questionSentenceData,
  maqModes,
  questionLanguage,
  answerLanguage
) => {
  let nullQuestionResponseObj = scUtils.giveFinalSentences(
    formattingOptions,
    startTime,
    questionSentenceData,
    maqModes,
    { questionLanguage, answerLanguage }
  );
  return frUtils.finishAndSend(returnDirectly, nullQuestionResponseObj, null);
};

exports.createOutputUnit = (
  currentLanguage,
  dependenceType,
  errorInSentenceCreation,
  errorInDrilling,
  selectedWord,
  structureChunk,
  selectedLemmaObject,
  drillPath,
  drillPathSecondary,
  drillPathTertiary
) => {
  if (currentLanguage === "POL") {
    if (
      idUtils.getWordtypeStCh(structureChunk) === "ver" &&
      structureChunk.negative
    ) {
      selectedWord = "nie " + selectedWord;
    }
  }

  if (errorInDrilling || !selectedWord) {
    consol.log(
      `acsm, Returning false because ${
        errorInDrilling ? "errorInDrilling true" : "selectWord false"
      }`
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
    dependenceType,
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

exports.addAnnotationsAndPush = (
  wordInOwnArr,
  selectedWordsArr,
  annoObj,
  structureChunk
) => {
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
        `vpri addAnnotationsAndPush ⭕ Will not add clarifiers [${Object.values(
          annoObj
        )}] as "educatorBlocksAnnotationsForTheseTraitKeys" true.`
      );
    } else {
      consol.log(
        "vpro pushSelectedWordToArray addAnnotationsAndPush. 🉑 Adding these annotations:" +
          Object.values(annoObj).join(", ")
      );

      wordInOwnArr[0] += ` (${Object.values(annoObj).join(", ")})`;
    }
  } else {
    consol.log("vpru addAnnotationsAndPush. No annoObj");
  }

  selectedWordsArr.push(wordInOwnArr);
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

  if (pushKey === "string") {
    consol.log(
      "[1;30m " + `uufy pushSelectedWordToArray Pushing "${selectedWord}"` + "[0m"
    );

    frUtils.addAnnotationsAndPush(
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
    frUtils.addAnnotationsAndPush(
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
  frUtils.addAnnotationsAndPush(
    selectedWord[pushKey],
    selectedWordsArr,
    annoObj,
    structureChunk
  );
};

exports.getAestheticGuideword = (chunk, formulaObject) => {
  if (chunk.guideword && chunk.guideword.traitValue) {
    let res = chunk.guideword.traitValue;
    delete chunk.guideword;
    return res;
  }

  let guideword =
    typeof chunk.chunkId === "string"
      ? chunk.chunkId.split("-").slice(-1)[0]
      : chunk.chunkId.traitValue.split("-").slice(-1)[0];

  if (/^\d+$/.test(guideword)) {
    if (idUtils.getWordtypeStCh(chunk) === "fix") {
      guideword =
        typeof chunk.chunkValue === "string"
          ? chunk.chunkValue
          : chunk.chunkValue.traitValue;
    } else if (
      chunk.specificIds &&
      chunk.specificIds.traitValue &&
      chunk.specificIds.traitValue.length
    ) {
      guideword = chunk.specificIds.traitValue[0].split("-")[3];
    } else if (chunk.specificIds && chunk.specificIds.length) {
      guideword = chunk.specificIds[0].split("-")[3];
    }
  }

  let isGhostChunk; // If chunk is ghost then aesthetically modify guideword, just for display in formulaId selector on FE.

  if (formulaObject) {
    let orders = [];
    if (formulaObject.orders.primary) {
      orders.push(...formulaObject.orders.primary);
    }
    if (formulaObject.orders.additional) {
      orders.push(...formulaObject.orders.additional);
    }
    if (orders.length) {
      isGhostChunk = !orders.some((order) => order.includes(chunk.chunkId));
    }
  }

  return isGhostChunk ? `[${guideword}]` : guideword;
};
