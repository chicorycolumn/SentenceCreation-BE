const { fetchPalette } = require("../models/palette.model");

exports.getPalette = (req, res, next) => {
  req.body.startTime = Date.now();

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
