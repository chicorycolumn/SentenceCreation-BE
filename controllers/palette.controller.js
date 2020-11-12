const { fetchPalette } = require("../models/palette.model");

exports.getPalette = (req, res, next) => {
  fetchPalette()
    .then((palette) => res.send({ palette }))
    .catch((err) => next(err));
};
