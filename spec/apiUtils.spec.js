const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

const { getStChsForLemma } = require("../utils/secondOrder/apiUtils.js");

describe.only("/educator/sandbox - Testing API.", () => {
  it("#san01 GET 200 YES: Single word sentence.", () => {
    const questionLanguage = "ENG";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      sentenceFormulaSymbol: numberString,
      sentenceFormulaId: `${questionLanguage}-${numberString}`,
      translations: {},
      sentenceStructure: [
        {
          chunkId: "npe-1",
          andTags: ["personTest1"],
          gcase: ["nom"],
          number: ["singular", "plural"],
          gender: [],
        },
      ],
    };

    return request(app)
      .get("/api/palette")
      .send({
        questionLanguage,
        forceMultipleModeQuestionOnlySingleChunk: true,
        sentenceFormulaFromEducator,
      })
      .expect(200)
      .then((res) => {
        console.log(res.body);
        // let { questionSentenceArr, answerSentenceArr } = res.body;
        // expect(["Czerwone drzwi."]).to.include(questionSentenceArr[0]);
        // expect(answerSentenceArr).to.have.members(["Red door.", "Red doors."]);
      });
  });
});

describe("getStChsForLemma", () => {
  it("1", () => {
    const actual = getStChsForLemma("POL", "kobieta");
    console.log(actual);
    // expect(actual).to.eql(expected);
  });
});
