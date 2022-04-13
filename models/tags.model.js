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
const allLangUtils = require("../utils/allLangUtils.js");

exports.fetchTags = (req) => {
  console.log("mptl", req);
  let { language1 } = req.query;

  let { allTags, allTopics } = scUtils.getTagsAndTopics(language1);

  let responseObject = { tags: allTags, topics: allTopics };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};

exports.fetchWordsByCriteria = (req) => {
  console.log("psme", req);
  let { language1 } = req.query;
  delete req.query["language1"];

  let words = scUtils.getWordsByCriteria(language1, req.query);

  let responseObject = { words };

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
