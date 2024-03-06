const apiUtils = require("../utils/secondOrder/apiUtils");
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
  const testEnv = "ref";
  apiUtils.setEnvir({ query: { envir: testEnv } }, 'describe("/nexusUtils"');

  describe("checkAllLObjsArePresentInNexus", () => {
    it(`${testEnv}#checkAllLObjsArePresentInNexus ENG`, () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("ENG");
    });
    it(`${testEnv}#checkAllLObjsArePresentInNexus POL`, () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("POL");
    });
    it(`${testEnv}#checkAllLObjsArePresentInNexus SPA`, () => {
      return nexusUtils.checkAllLObjsArePresentInNexus("SPA");
    });
  });
});
