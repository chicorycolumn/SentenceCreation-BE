const { fetchPalette } = require("../models/palette.model");
const uUtils = require("../utils/universalUtils");

exports.getErrors = (responseObj) => {
  let errors = {};

  let errorKeys = [
    "errorInSentenceCreation",
    "questionErrorMessage",
    "questionMessage",
    "answerErrorMessage",
    "answerMessage",
  ];

  errorKeys.forEach((errorKey) => {
    if (responseObj[errorKey]) {
      if (typeof responseObj[errorKey] === "string") {
        uUtils.addToArrayAtKey(errors, errorKey, responseObj[errorKey]);
      } else if (
        Array.isArray(responseObj[errorKey]) ||
        uUtils.isKeyValueTypeObject(responseObj[errorKey])
      ) {
        Object.keys(responseObj[errorKey]).forEach((subkey) => {
          let value = responseObj[errorKey][subkey];
          if (typeof value === "string") {
            uUtils.addToArrayAtKey(errors, `${errorKey}-${subkey}`, value);
            errorsArr.push(value);
          } else if (Array.isArray(value)) {
            uUtils.addToArrayAtKey(errors, `${errorKey}-${subkey}`, subvalue);
          } else if (uUtils.isKeyValueTypeObject(value)) {
            Object.keys(value).forEach((subsubkey) => {
              let subsubvalue = value[subsubkey];
              if (typeof subsubvalue === "string") {
                uUtils.addToArrayAtKey(
                  errors,
                  `${errorKey}-${subkey}-${subsubkey}`,
                  subsubvalue
                );
              } else if (Array.isArray(subsubvalue)) {
                subsubvalue.forEach((v) => {
                  uUtils.addToArrayAtKey(
                    errors,
                    `${errorKey}-${subkey}-${subsubkey}`,
                    v
                  );
                });
              }
            });
          }
        });
      }
    }
  });

  if (Object.keys(errors).length) {
    return errors;
  }
};

exports.getSentencesAsQuestionOnly = (req, res, next) => {
  let questionLanguage = req.query.lang;

  let { sentenceFormula, requestingSingleWordOnly } = req.body;

  let numberString = Date.now();

  sentenceFormula.sentenceFormulaSymbol = numberString;
  sentenceFormula.sentenceFormulaId = `${questionLanguage}-${numberString}`;
  sentenceFormula.equivalents = {};

  let data = {
    body: {
      sentenceFormulaFromEducator: sentenceFormula,
      questionLanguage,
      forceMultipleModeAndQuestionOnly: true,
      requestingSingleWordOnly,
    },
  };

  fetchPalette(data)
    .then((responseObj) => {
      let status = 200;
      let errors = exports.getErrors(responseObj);
      let respo = { payload: responseObj.questionSentenceArr };

      if (errors || !responseObj.questionSentenceArr) {
        respo = {
          messages: errors,
        };
        // status = 500;
      }

      res.status(status).send(respo);
    })
    .catch((err) => next(err));
};
