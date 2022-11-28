const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const nexusUtils = require("../utils/secondOrder/nexusUtils.js");

describe("/nexusUtils", function () {
  it("checkAllLObjsArePresentInNexus", () => {
    nexusUtils.checkAllLObjsArePresentInNexus("ref", "ENG");
    nexusUtils.checkAllLObjsArePresentInNexus("ref", "POL");
  });
});
