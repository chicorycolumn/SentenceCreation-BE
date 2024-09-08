const apiUtils = require("../utils/secondOrder/apiUtils");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const {
  runPaletteTest1,
  runPaletteTest2,
  runPaletteTest1Multiple,
  runPaletteTestExpectingNoSentence,
  checkProportions,
} = testingUtils;

describe.only("/api", function () {
  this.timeout(7000);
  const testEnv = "prod*ref";

  describe("/palette - Stage 32: Prod test of coordinate terms having same lobj number.", () => {
    describe("#pal32-01 Woman vs Man vs Person.", () => {
      it(`${testEnv}#pal32-01a GET 200 YES: Engpol.`, () => {
        apiUtils.setEnvir({ query: { envir: testEnv } }, "app06.spec");
        return runPaletteTest2("ENG", "POL", "127a", [
          {
            ENG: ["The mother reads."],
            POL: ["Matka czyta.", "Matka czytuje."],
          },
          {
            ENG: ["The father reads."],
            POL: ["Ojciec czyta.", "Ojciec czytuje."],
          },
          {
            ENG: ["The parent reads."],
            POL: ["Rodzic czyta.", "Rodzic czytuje."],
          },
          {
            ENG: ["The mothers read (present)."],
            POL: ["Matki czytają.", "Matki czytują."],
          },
          {
            ENG: ["The fathers read (present)."],
            POL: ["Ojcowie czytają.", "Ojcowie czytują."],
          },
          {
            ENG: ["The parents read (present)."],
            POL: ["Rodzice czytają.", "Rodzice czytują."],
          },
        ]);
      });
    });
  });
});
