const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

const { getStChsForLemma } = require("../utils/secondOrder/apiUtils.js");

const runApiTest1 = (req, expected) => {
  return request(app)
    .get("/api/palette")
    .send(req)
    .expect(200)
    .then((res) => {
      expect(Object.keys(res.body)).to.eql(Object.keys(expected));
      expect(res.body.questionSentenceArr.sort()).to.eql(
        expected.questionSentenceArr.sort()
      );
    });
};

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
          number: ["singular"],
        },
      ],
      primaryOrders: [["npe-1", "ver-1"]],
    };

    return runApiTest1(
      {
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      },
      {
        questionSentenceArr: [
          "Kobieta jest.",
          "Kobieta była.",
          "Kobieta będzie.",
          "Mężczyzna był.",
          "Mężczyzna będzie.",
          "Mężczyzna jest.",
          "Osoba była.",
          "Osoba będzie.",
          "Osoba jest.",
        ],
      }
    );
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
          number: ["singular", "plural"],
          gender: [],
        },
      ],
      primaryOrders: [["adj-1", "npe-1"]],
    };

    return runApiTest1(
      {
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      },
      {
        questionSentenceArr: [
          "Czerwona kobieta.",
          "Czerwone kobiety.",
          "Czerwony chłopiec.",
          "Czerwoni chłopcy.",
          "Czerwona dziewczyna.",
          "Czerwone dziewczyny.",
          "Czerwone dziecko.",
          "Czerwone dzieci.",
          "Czerwoni mężczyźni.",
          "Czerwony mężczyzna.",
          "Czerwona osoba.",
          "Czerwone osoby.",
        ],
      }
    );
  });
  it("#san01 GET 200 YES: Educator queries a single word, Q only but still wants multiple mode.", () => {
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
          number: ["singular", "plural"],
          gender: [],
        },
      ],
    };

    return runApiTest1(
      {
        questionLanguage,
        forceMultipleModeAndQuestionOnly: true,
        sentenceFormulaFromEducator,
      },
      {
        questionSentenceArr: [
          "Woman.",
          "Women.",
          "Lady.",
          "Ladies.",
          "Man.",
          "Men.",
          "Person.",
          "People.",
          "Boy.",
          "Boys.",
          "Girl.",
          "Girls.",
          "Child.",
          "Children.",
        ],
      }
    );
  });
});

xdescribe("getStChsForLemma", () => {
  it("1", () => {
    const actual = getStChsForLemma("POL", "kobieta");
    console.log(actual);
    // expect(actual).to.eql(expected);
  });
});
