const { fetchPalette } = require("../models/palette.model");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const gdUtils = require("../utils/grabDataUtils.js");

exports.getPalette = (req, res, next) => {
  apiUtils.setEnvir(req, "getPalette");

  const startTime = Date.now();
  req.body.startTime = startTime;

  Object.keys(req.query).forEach((queryKey) => {
    let queryValue = req.query[queryKey];
    req.body[queryKey] = queryValue;
  });

  if (!req.body.sentenceFormulaId) {
    let [sentenceFormulaId, sentenceFormulaEquivalents] =
      gdUtils.grabFormulaIdFromSpecifications(
        req.body.questionLanguage,
        req.body.answerLanguage,
        req.body.topics,
        req.body.difficulty
      );

    req.body.sentenceFormulaId = sentenceFormulaId;
    req.body.sentenceFormulaEquivalents = sentenceFormulaEquivalents;
    delete req.body.difficulty;
    delete req.body.topics;
  }

  fetchPalette(req)
    .then((responseObjArr) => {
      responseObjArr.forEach((x) => {
        x.startTime = startTime;
      });
      res.status(200).send(responseObjArr);
    })
    .catch((err) => next(err));
};
