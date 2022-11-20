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

describe("/educator/sandbox - Testing API.", () => {
  it("#san03 GET 200 YES: Deduplicating specially treated imOnly verbs like 'być'.", () => {
    const questionLanguage = "POL";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      sentenceFormulaSymbol: numberString,
      sentenceFormulaId: `${questionLanguage}-${numberString}`,
      equivalents: {},
      sentenceStructure: [
        {
          chunkId: "ver-1",
          agreeWith: "npe-1",
          specificIds: ["pol-ver-011-być"],
        },
        {
          chunkId: "npe-1",
          specificIds: ["pol-npe-011-kobieta"],
          gcase: ["nom"],
          number: ["singular"],
        },
      ],
      primaryOrders: [["npe-1", "ver-1"]],
    };

    const expected = {
      questionSentenceArr: [
        "Kobieta jest.",
        "Kobieta była.",
        "Kobieta będzie.",
      ],
    };

    return request(app)
      .get("/api/palette")
      .send({
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      })
      .expect(200)
      .then((res) => {
        res.body.questionSentenceArr = res.body.questionSentenceArr.sort();
        expected.questionSentenceArr = expected.questionSentenceArr.sort();

        expect(res.body).to.eql(expected);
      });
  });
  it("#san02 GET 200 YES: Educator queries a sentence, Q only but still wants multiple mode.", () => {
    const questionLanguage = "POL";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      sentenceFormulaSymbol: numberString,
      sentenceFormulaId: `${questionLanguage}-${numberString}`,
      equivalents: {},
      sentenceStructure: [
        {
          chunkId: "adj-1",
          andTags: ["colour"],
          agreeWith: "npe-1",
        },
        {
          chunkId: "npe-1",
          andTags: ["personTest1"],
          gcase: ["nom"],
          number: ["singular", "plural"],
          gender: [],
        },
      ],
      primaryOrders: [["adj-1", "npe-1"]],
    };

    const expected = {
      questionSentenceArr: [
        "Czerwona kobieta.",
        "Czerwone kobiety.",
        "Czerwony chłopiec.",
        "Czerwoni chłopcy.",
      ],
    };

    return request(app)
      .get("/api/palette")
      .send({
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.eql(expected);
      });
  });
  it("#san01 GET 200 YES: Educator queries a single word, Q only but still wants multiple mode.", () => {
    //beta
    const questionLanguage = "ENG";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      sentenceFormulaSymbol: numberString,
      sentenceFormulaId: `${questionLanguage}-${numberString}`,
      equivalents: {},
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

    const expected = {
      questionSentenceArr: [
        "Woman.",
        "Women.",
        "Boy.",
        "Boys.",
        "Lady.",
        "Ladies.",
      ],
    };

    return request(app)
      .get("/api/palette")
      .send({
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.eql(expected);
      });
  });
});

xdescribe("getStChsForLemma", () => {
  it("1", () => {
    const actual = getStChsForLemma("POL", "kobieta");
    console.log(actual);
    // expect(actual).to.eql(expected);
  });
});
