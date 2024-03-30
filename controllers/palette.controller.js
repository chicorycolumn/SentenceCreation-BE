const { fetchPalette } = require("../models/palette.model");
const apiUtils = require("../utils/secondOrder/apiUtils");

exports.getPalette = (req, res, next) => {
  apiUtils.setEnvir(req, "getPalette");

  req.body.startTime = Date.now();

  Object.keys(req.query).forEach((queryKey) => {
    let queryValue = req.query[queryKey];
    req.body[queryKey] = queryValue;
  });

  if (!req.body.sentenceFormulaId) {
    let sentenceFormulaId = apiUtils.getFormulaIdFromSpecifications(
      req.body.difficulty,
      req.body.topics
    );
    req.body.sentenceFormulaId = sentenceFormulaId;
    delete req.body.difficulty;
    delete req.body.topics;
  }

  fetchPalette(req)
    .then((responseObj) => {
      if (responseObj.questionSentence) {
        res.status(200).send(responseObj);
      } else {
        res.status(200).send(responseObj);
      }
    })
    .catch((err) => next(err));
};
