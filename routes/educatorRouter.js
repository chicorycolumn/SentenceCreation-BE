const educatorRouter = require("express").Router();
const { getTags } = require("../controllers/tags.controller");
const { handle405s } = require("../errors/errors");

educatorRouter
  .route("/tags/:language1")
  .get(getTags)
  //   .post(authorizeUser, postNewTopic)
  //   .patch(authorizeUser, patchTopic)
  .all(handle405s);

module.exports = educatorRouter;
