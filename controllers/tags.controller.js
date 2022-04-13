const { fetchTags, fetchWordsByCriteria } = require("../models/tags.model");

exports.getTags = (req, res, next) => {
  fetchTags(req)
    .then((responseObj) => {
      if (responseObj.tags) {
        res.status(200).send(responseObj);
      } else {
      }
    })
    .catch((err) => next(err));
};

exports.getWordsByCriteria = (req, res, next) => {
  fetchWordsByCriteria(req)
    .then((responseObj) => {
      if (responseObj.words) {
        res.status(200).send(responseObj);
      } else {
      }
    })
    .catch((err) => next(err));
};
