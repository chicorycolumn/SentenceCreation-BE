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
  describe("checkAllLObjsArePresentInNexus", () => {
    it("checkAllLObjsArePresentInNexus ENG", () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("ref", "ENG");
    });
    it("checkAllLObjsArePresentInNexus POL", () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("ref", "POL");
    });
    it("checkAllLObjsArePresentInNexus SPA", () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("ref", "SPA");
    });
  });
});
