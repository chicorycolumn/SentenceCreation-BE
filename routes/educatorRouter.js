const educatorRouter = require("express").Router();
const {
  getTags,
  getChunks,
  getWordsByCriteria,
  getFormulas,
} = require("../controllers/info.controller");
const {
  getSentencesAsQuestionOnly,
} = require("../controllers/sentences.controller");
const { handle405s } = require("../errors/errors");

educatorRouter.route("/tags*").get(getTags).all(handle405s);
educatorRouter.route("/chunks*").get(getChunks).all(handle405s);
educatorRouter.route("/formulas*").get(getFormulas).all(handle405s);
educatorRouter
  .route("/sentences*")
  .put(getSentencesAsQuestionOnly)
  .all(handle405s);

educatorRouter.route("/words*").get(getWordsByCriteria).all(handle405s);

module.exports = educatorRouter;
