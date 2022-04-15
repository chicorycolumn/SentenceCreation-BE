const educatorRouter = require("express").Router();
const {
  getTags,
  getInfo,
  getWordsByCriteria,
} = require("../controllers/info.controller");
const { handle405s } = require("../errors/errors");

educatorRouter.route("/tags*").get(getTags).all(handle405s);
educatorRouter.route("/info*").get(getInfo).all(handle405s);

educatorRouter.route("/words*").get(getWordsByCriteria).all(handle405s);

module.exports = educatorRouter;
