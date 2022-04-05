const express = require("express");
const educatorRouter = require("express").Router();

educatorRouter.use(express.static("build"));

educatorRouter.use("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/build/index.html"));
});

module.exports = educatorRouter;
