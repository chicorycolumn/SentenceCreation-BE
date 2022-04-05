const createRouter = require("express").Router();
const { getCreate } = require("../controllers/create.controller");
const { handle405s } = require("../errors/errors");

createRouter
  .route("/")
  .get(getCreate)
  //   .post(authorizeUser, postNewTopic)
  //   .patch(authorizeUser, patchTopic)
  .all(handle405s);

module.exports = createRouter;
