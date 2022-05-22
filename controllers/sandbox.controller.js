const { fetchPalette } = require("../models/palette.model");

exports.getSentencesAsQuestionOnly = (req, res, next) => {
  let questionLanguage = req.query.lang;

  let { sentenceFormula } = req.body;

  let numberString = Date.now();

  sentenceFormula.sentenceFormulaSymbol = numberString;
  sentenceFormula.sentenceFormulaId = `${questionLanguage}-${numberString}`;
  sentenceFormula.translations = {};

  let data = {
    body: {
      sentenceFormulaFromEducator: sentenceFormula,
      questionLanguage,
      forceMultipleModeAndQuestionOnly: true,
    },
  };

  fetchPalette(data)
    .then((responseObj) => {
      if (responseObj.questionSentenceArr) {
        let respo = { wordsAndIDs: responseObj.questionSentenceArr };
        res.status(200).send(respo);
      } else {
        res.status(200).send({ message: "Nothing was made." });
      }
    })
    .catch((err) => next(err));
};
