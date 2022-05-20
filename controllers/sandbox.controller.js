const { fetchPalette } = require("../models/palette.model");

exports.getWordByExplicitChunk = (req, res, next) => {
  console.log("swde", req.body);
  //   fetchPalette(req)
  //     .then((responseObj) => {
  //       if (responseObj.questionSentence) {
  //         res.status(200).send(responseObj);
  //       } else {
  //         res.status(200).send(responseObj);
  //       }
  //     })
  //     .catch((err) => next(err));
};
