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
  let { id, lang, env } = req.query;

  console.log("tnae", { id, lang, env });

  if (!env) {
    env = "ref";
  }

  let responseObject = apiUtils.getSentenceFormulas(id, lang, env);

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
