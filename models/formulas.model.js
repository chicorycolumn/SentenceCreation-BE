const gpUtils = require("../utils/generalPurposeUtils.js");
const idUtils = require("../utils/identityUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../utils/secondOrder/educatorUtils.js");
const gdUtils = require("../utils/grabDataUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const refObj = require("../utils/reference/referenceObjects.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");
const nexusUtils = require("../utils/secondOrder/nexusUtils.js");

exports.fetchFormulas = (req) => {
  let { id, env } = req.query;
  let answerLang = req.query.lang;
  let questionLang = idUtils.getLanguageFromFormulaId(id);

  ivUtils.validateLang(questionLang, 17);
  ivUtils.validateLang(answerLang, 18);

  console.log("tnae fetchFormulas invoked with:", { id, answerLang, env });

  if (!env) {
    env = "ref";
  }

  let { questionSentenceFormula, answerSentenceFormulas } =
    apiUtils.getSentenceFormulas(id, answerLang, env);

  apiUtils.frontendifyFormula(questionLang, questionSentenceFormula, env);

  answerSentenceFormulas.forEach((answerSentenceFormula) => {
    apiUtils.frontendifyFormula(answerLang, answerSentenceFormula, env);
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

  let formulasBank = gdUtils.grabFormulas(
    lang1,
    false,
    env
  ).sentenceFormulasBank;

  let formulaIds = formulasBank.map((formulaObject) => {
    let guideSentence = formulaObject.sentenceStructure
      .map((chunk) => apiUtils.getAestheticGuideword(chunk, formulaObject))
      .join(" ");
    guideSentence =
      guideSentence[0].toUpperCase() + guideSentence.slice(1) + ".";

    return [
      formulaObject.sentenceFormulaId,
      guideSentence,
      nexusUtils.getLanguagesOfEquivalents(
        formulaObject.sentenceFormulaId,
        env
      ),
    ];
  });

  let responseObject = {
    formulaIds,
  };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
