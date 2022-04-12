const { fetchTags } = require("../models/tags.model");

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
