const { fetchEndpoints } = require("../models/educator.model");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((endpoints) => res.send({ endpoints }))
    .catch((err) => next(err));
};
