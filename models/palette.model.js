const otUtils = require("../utils/objectTraversingUtils.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const refObj = require("../utils/referenceObjects.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");

exports.fetchPalette = (req) => {
  let kumquat = false;

  let {
    sentenceNumber,
    sentenceSymbol,
    useDummy,
    questionLanguage,
    answerLanguage,
  } = req.body;

  let questionSentenceData = scUtils.processSentenceFormula(
    questionLanguage,
    sentenceNumber,
    sentenceSymbol,
    useDummy,
    kumquat
  );

  sentenceNumber = questionSentenceData.sentenceNumber;
  sentenceSymbol = questionSentenceData.sentenceSymbol;

  // console.log(">");
  // console.log(">>>");
  // console.log(">>>>>");
  // console.log("questionSentenceData.arrayOfOutputArrays", questionSentenceData.arrayOfOutputArrays.map(x => x.map(y => y.selectedWord)));
  // console.log(">>>>>");
  // console.log(">>>");
  // console.log(">");

  // console.log("questionSentenceData", questionSentenceData);
  // throw "Cease.";

  console.log("----------------------------");
  console.log("questionSentenceData", questionSentenceData);
  console.log("----------------------------");

  let questionResponseObj = scUtils.formatFinalSentence(
    questionSentenceData.arrayOfOutputArrays,
    questionSentenceData.sentenceFormula,
    questionSentenceData.errorInSentenceCreation,
    kumquat
  );

  // throw "Now cease.";

  let answerResponseObj;

  if (answerLanguage) {
    kumquat = true;

    // outputArr.forEach((outputArrItem) => {
    // //This should now be unnec as we've told it in the refobj not to transfer gender from noun. Not allowable transfer.
    // if (outputArrItem.structureChunk.wordtype === "noun") {
    //   delete outputArrItem.structureChunk.gender;
    // }
    // /////
    // });

    let answerSentenceData = scUtils.processSentenceFormula(
      answerLanguage,
      sentenceNumber,
      sentenceSymbol,
      useDummy,
      kumquat,
      questionSentenceData.arrayOfOutputArrays[0],
      questionLanguage
    );

    answerResponseObj = scUtils.formatFinalSentence(
      answerSentenceData.arrayOfOutputArrays,
      answerSentenceData.sentenceFormula,
      answerSentenceData.errorInSentenceCreation,
      kumquat
    );
  }

  console.log("$$$$$$$$$$$$$$$$$");
  console.log("answerResponseObj", answerResponseObj);
  console.log("$$$$$$$$$$$$$$$$$");

  // throw "Now cease.";

  let combinedResponseObj = {};

  [
    { responseObject: questionResponseObj, key: "question" },
    { responseObject: answerResponseObj, key: "answer" },
  ].forEach((ref) => {
    if (ref.responseObject) {
      combinedResponseObj[ref.key + "SentenceArr"] =
        ref.responseObject.finalSentenceArr;

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

  console.log(".........v", combinedResponseObj, ".........^");

  return Promise.all([combinedResponseObj]).then((array) => {
    return array[0];
  });
};
