const { fetchTags, fetchWordsByCriteria } = require("../models/tags.model");
const { fetchInfo } = require("../models/info.model");

exports.getInfo = (req, res, next) => {
  fetchInfo(req)
    .then((responseObj) => {
      if (responseObj.info) {
        res.status(200).send(responseObj);
      } else {
      }
    })
    .catch((err) => next(err));
};

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