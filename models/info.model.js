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
const refFxn = require("./reference/referenceFunctions.js");

exports.fetchInfo = (req) => {
  console.log("msll", req);
  let responseObject = { info: "Info type requested not recognised." };
  let { language1, infoType } = req.query;

  if (infoType == "structureChunkTraits") {
    responseObject.info = refFxn.getWordtypeFromLemma(language1);
  }

  if (infoType == "structureWordtype") {
    responseObject.info = refFxn.getStructureChunkTraits(language1);
  }

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
