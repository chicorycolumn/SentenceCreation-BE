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

exports.fetchTopics = (req) => {
  let { lang } = req.query;

  apiUtils.setEnvir(req, "fetchTopics");

  let { allTopics } = apiUtils.getTopics(lang);

  let responseObject = { topics: allTopics };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};

exports.fetchFormulaTopics = () => {
  let response = refObj.formulaTopics;

  return Promise.all([response]).then((array) => {
    return array[0];
  });
};

exports.fetchTags = (req) => {
  let { lang } = req.query;

  apiUtils.setEnvir(req, "fetchTags");

  let { allTags } = apiUtils.getAllTags(lang);

  allTags.push("_NO_TAGS");

  let responseObject = { tags: allTags };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};

exports.fetchWordsByCriteria = (req) => {
  let { lang } = req.query;

  apiUtils.setEnvir(req, "fetchWordsByCriteria");

  delete req.query["lang"];

  let words = apiUtils.getLemmasByCriteria(lang, req.query);

  let responseObject = { words };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
