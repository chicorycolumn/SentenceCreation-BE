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
  let { id } = req.query;

  apiUtils.setEnvir(req);

  let answerLang = req.query.lang;
  let questionLang = idUtils.getLanguageFromFormulaId(id);

  ivUtils.validateLang(questionLang, 17);
  ivUtils.validateLang(answerLang, 18);

  console.log("tnae fetchFormulas invoked with:", { id, answerLang });

  let { questionSentenceFormula, answerSentenceFormulas } =
    apiUtils.getSentenceFormulas(id, answerLang);

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
  let { lang1, lang2 } = req.query;

  apiUtils.setEnvir(req);

  ivUtils.validateLang(lang1, 19);
  ivUtils.validateLang(lang2, 20);

  let skeletonFormulas = gdUtils.grabSkeletonFormulas(lang1);

  let responseObject = {
    formulaIds: skeletonFormulas,
  };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
