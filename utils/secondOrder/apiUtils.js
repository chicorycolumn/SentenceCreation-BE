const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../../utils/secondOrder/educatorUtils.js");
const scUtils = require("../../utils/sentenceCreatingUtils.js");
const aaUtils = require("../../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../utils/allLangUtils.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.getLObjsForLemma = (lang, lemma) => {
  console.log("jico", lang, lemma);
  matches = [];
  let { wordsBank } = scUtils.getWordsAndFormulas(lang, true);
  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    wordSet = wordsBank[wordtypeShorthand];
    wordSet.forEach((lObj) => {
      if (lObj.lemma === lemma) {
        matches.push(lObj);
      }
    });
  });
  console.log(">", matches);
  return matches;
};
