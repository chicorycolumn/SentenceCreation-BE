const { fetchPalette } = require("../models/palette.model");

exports.getWordByExplicitChunk = (req, res, next) => {
  let { questionLanguage, chunk } = req.body;

  let numberString = Date.now();

  const sentenceFormulaFromEducator = {
    sentenceFormulaSymbol: numberString,
    sentenceFormulaId: `${questionLanguage}-${numberString}`,
    translations: {},
    sentenceStructure: [chunk],
  };

  let data = {
    body: {
      sentenceFormulaFromEducator,
      questionLanguage,
      forceMultipleModeQuestionOnlySingleChunk: true,
    },
  };

  fetchPalette(data)
    .then((responseObj) => {
      if (responseObj.questionSentenceArr) {
        let respo = { wordsAndIDs: responseObj.questionSentenceArr };
        res.status(200).send(respo);
      } else {
        res.status(200).send({ wordsAndIDs: [] });
      }
    })
    .catch((err) => next(err));
};
