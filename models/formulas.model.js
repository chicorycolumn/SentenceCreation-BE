const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../utils/secondOrder/educatorUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const refObj = require("../utils/reference/referenceObjects.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.fetchFormulas = (req) => {
  let { id, env } = req.query;
  let answerLang = req.query.lang;
  let questionLang = gpUtils.getLanguageFromFormulaId(id);

  ivUtils.validateLang(questionLang, 17);
  ivUtils.validateLang(answerLang, 18);

  console.log("tnae", { id, answerLang, env });

  if (!env) {
    env = "ref";
  }

  let { questionSentenceFormula, answerSentenceFormulas } =
    apiUtils.getSentenceFormulas(id, answerLang, env);

  apiUtils.frontendifyFormula(questionLang, questionSentenceFormula);

  answerSentenceFormulas.forEach((answerSentenceFormula) => {
    apiUtils.frontendifyFormula(answerLang, answerSentenceFormula);
  });

  let responseObject = {
    questionSentenceFormula,
    answerSentenceFormulas,
  };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};

exports.fetchFormulaIds = (req) => {
  let { lang1, lang2, env } = req.query;

  ivUtils.validateLang(lang1, 19);
  ivUtils.validateLang(lang2, 20);

  if (!env) {
    env = "ref";
  }

  let formulasBank = scUtils.getWordsAndFormulas(
    lang1,
    false,
    true,
    env
  ).sentenceFormulasBank;

  let formulaIds = formulasBank
    .filter(
      (formulaObject) =>
        formulaObject.equivalents &&
        formulaObject.equivalents[lang2] &&
        formulaObject.equivalents[lang2].length
    )
    .map((formulaObject) => {
      let guidewords = formulaObject.sentenceStructure
        .map((chunk) => chunk.chunkId.split("-").slice(-1))
        .join(" ");
      guidewords = guidewords[0].toUpperCase() + guidewords.slice(1) + ".";

      return [formulaObject.sentenceFormulaId, guidewords];
    });

  let responseObject = {
    formulaIds,
  };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
