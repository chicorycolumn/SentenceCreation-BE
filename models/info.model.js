const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../utils/secondOrder/educatorUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const aaUtils = require("../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../utils/formattingResponseUtils.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const refObj = require("../utils/reference/referenceObjects.js");
const allLangUtils = require("../utils/allLangUtils.js");
const refFxn = require("../utils/reference/referenceFunctions.js");

exports.fetchInfo = (req) => {
  let { language1, infoType } = req.query;

  let responseObject = {
    info: infoType
      ? `Info type "${infoType}" requested not recognised.`
      : "No info type was specified.",
  };

  if (infoType == "lObjs") {
    responseObject.info = apiUtils.getStChsForLemma(
      language1,
      req.query.lemma.toLowerCase()
    );
  }

  if (infoType == "structureWordtype") {
    responseObject.info = refFxn.getStructureChunkTraits(language1);
  }

  return Promise.all([responseObject]).then((array) => {
    return array[0];
  });
};
