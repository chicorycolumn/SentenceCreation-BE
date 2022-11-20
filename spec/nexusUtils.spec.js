const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const nexusUtils = require("../utils/secondOrder/nexusUtils.js");
const {
  traitValueTranslation,
} = require("../utils/reference/referenceTranslations");

describe.only("/nexusUtils", function () {
  it("1", () => {
    nexusUtils.checkAllLObjsArePresentInNexus("ref", "ENG");
    nexusUtils.checkAllLObjsArePresentInNexus("ref", "POL");
  });
});
