const {
  fetchTags,
  fetchWordsByCriteria,
  fetchTopics,
  fetchFormulaTopics,
} = require("../models/tags.model");
const { fetchAvailableNexusId } = require("../models/info.model");
const { fetchChunks } = require("../models/chunks.model");
const { fetchFormulas, fetchFormulaIds } = require("../models/formulas.model");

exports.getAvailableNexusId = (req, res, next) => {
  fetchAvailableNexusId(req)
    .then((responseObj) => {
      if (responseObj.info) {
        res.status(200).send(responseObj);
      } else {
        //Beta else what?
      }
    })
    .catch((err) => next(err));
};

exports.getChunks = (req, res, next) => {
  fetchChunks(req)
    .then((responseObj) => {
      if (responseObj.info) {
        res.status(200).send(responseObj);
      } else {
        //Beta else what?
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
        //Beta else what?
      }
    })
    .catch((err) => next(err));
};

exports.getTopics = (req, res, next) => {
  fetchTopics(req)
    .then((responseObj) => {
      if (responseObj.topics) {
        res.status(200).send(responseObj);
      } else {
        //Beta else what?
      }
    })
    .catch((err) => next(err));
};

exports.getFormulaTopics = (req, res, next) => {
  fetchFormulaTopics()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => next(err));
};

exports.getFormulas = (req, res, next) => {
  fetchFormulas(req)
    .then((responseObj) => {
      res.status(200).send(responseObj);
    })
    .catch((err) => next(err));
};

exports.getFormulaIds = (req, res, next) => {
  fetchFormulaIds(req)
    .then((responseObj) => {
      res.status(200).send(responseObj);
    })
    .catch((err) => next(err));
};

exports.getWordsByCriteria = (req, res, next) => {
  fetchWordsByCriteria(req)
    .then((responseObj) => {
      if (responseObj.words) {
        res.status(200).send(responseObj);
      } else {
        //Beta else what?
      }
    })
    .catch((err) => next(err));
};
