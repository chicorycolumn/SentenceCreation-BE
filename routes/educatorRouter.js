const educatorRouter = require("express").Router();
const {
  getTags,
  getChunks,
  getWordsByCriteria,
  getFormulas,
  getFormulaIds,
  getTopics,
  getAvailableNexusId,
} = require("../controllers/info.controller");
const {
  getSentencesForEducator,
} = require("../controllers/sentences.controller");
const { handle405s } = require("../errors/errors");

educatorRouter.route("/tags*").get(getTags).all(handle405s);
educatorRouter.route("/formulatopics").get(getTopics).all(handle405s);
educatorRouter.route("/chunks*").get(getChunks).all(handle405s);
educatorRouter.route("/nexusid").get(getAvailableNexusId).all(handle405s);
educatorRouter.route("/formulas*").get(getFormulas).all(handle405s);
educatorRouter.route("/formulaids*").get(getFormulaIds).all(handle405s);
educatorRouter
  .route("/sentences*")
  .put(getSentencesForEducator)
  .all(handle405s);

educatorRouter.route("/words*").get(getWordsByCriteria).all(handle405s);

module.exports = educatorRouter;
