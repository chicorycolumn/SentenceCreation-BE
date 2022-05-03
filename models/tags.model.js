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

exports.fetchTags = (req) => {
  console.log("mptl", req);
  let { lang } = req.query;

  let { allTags, allTopics } = apiUtils.getTagsAndTopics(lang);

  let responseObject = { tags: allTags, topics: allTopics };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};

exports.fetchWordsByCriteria = (req) => {
  let { lang } = req.query;
  delete req.query["lang"];

  let words = apiUtils.getWordsByCriteria(lang, req.query);

  let responseObject = { words };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
