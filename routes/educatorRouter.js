const educatorRouter = require("express").Router();
const {
  getTags,
  getWordsByCriteria,
} = require("../controllers/tags.controller");
const { handle405s } = require("../errors/errors");

educatorRouter.route("/tags*").get(getTags).all(handle405s);

educatorRouter.route("/words*").get(getWordsByCriteria).all(handle405s);

module.exports = educatorRouter;
