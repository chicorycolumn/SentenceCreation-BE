const apiRouter = require("express").Router();
const paletteRouter = require("./paletteRouter");
const educatorRouter = require("./educatorRouter");

const { getEndpoints } = require("../controllers/api.controller");
const { handle405s } = require("../errors/errors");

apiRouter.use("/palette", paletteRouter);
apiRouter.use("/educator", educatorRouter);

apiRouter.route("/").get(getEndpoints).all(handle405s);

module.exports = apiRouter;
