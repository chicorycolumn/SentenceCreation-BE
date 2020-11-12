const paletteRouter = require("express").Router();
const { getPalette } = require("../controllers/palette.controller");
const { handle405s } = require("../errors/errors");

paletteRouter
  .route("/")
  .get(getPalette)
  //   .post(authorizeUser, postNewTopic)
  //   .patch(authorizeUser, patchTopic)
  .all(handle405s);

module.exports = paletteRouter;
