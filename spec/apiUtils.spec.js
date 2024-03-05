const apiUtils = require("../utils/secondOrder/apiUtils");
const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

const { getEnChsForLemma } = require("../utils/secondOrder/apiUtils.js");
const { fetchFormulas } = require("../models/formulas.model");

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

describe("/educator/formulas.", () => {
  const testEnv = "ref";
  apiUtils.setEnvir(
    { body: { envir: testEnv } },
    'describe("/educator/formulas'
  );

  it(`${testEnv}#san04a GET 200 YES: Check that numeric chunkIds are converted to guidewords.`, () => {
    let res = fetchFormulas({
      query: { id: "POL-101b", lang: "ENG" },
      body: { envir: testEnv },
    });
    return res.then((res) => {
      res.questionSentenceFormula =
        res.questionSentenceFormula.sentenceStructure.map(
          (fItem) => fItem.guideword
        );
      res.answerSentenceFormulas = res.answerSentenceFormulas.map((f) =>
        f.sentenceStructure.map((fItem) => fItem.guideword)
      );

      let desiredRes = {
        questionSentenceFormula: ["kobieta", "czyta", "szybko"],
        answerSentenceFormulas: [["the", "woman", "reads", "quickly"]],
      };

      expect(res).to.eql(desiredRes);
    });
  });
  it(`${testEnv}#san04b GET 200 YES: Check that numeric chunkIds are converted to guidewords.`, () => {
    let res = fetchFormulas({
      query: { id: "POL-112", lang: "ENG" },
      body: { envir: testEnv },
    });
    return res.then((res) => {
      res.questionSentenceFormula =
        res.questionSentenceFormula.sentenceStructure.map(
          (fItem) => fItem.guideword
        );
      res.answerSentenceFormulas = res.answerSentenceFormulas.map((f) =>
        f.sentenceStructure.map((fItem) => fItem.guideword)
      );

      let desiredRes = {
        questionSentenceFormula: ["ojciec", "dać", "mi", "jabłko"],
        answerSentenceFormulas: [["father", "give", "me", "book", "to"]],
      };

      expect(res).to.eql(desiredRes);
    });
  });
});

describe("/educator/sentences - Testing API.", () => {
  const testEnv = "ref";
  apiUtils.setEnvir(
    { body: { envir: testEnv } },
    'describe("/educator/sentences'
  );

  it(`${testEnv}#san03 GET 200 YES: Deduplicating specially treated imOnly verbs like 'być'.`, () => {
    const questionLanguage = "POL";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      id: `${questionLanguage}-${numberString}`,
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
      orders: { primary: [["npe-1", "ver-1"]] },
    };

    return runApiTest1(
      {
        questionLanguage,
        forceMultipleAndQuestionOnly: true,
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
  it(`${testEnv}#san02 GET 200 YES: Educator queries a sentence, Q only but still wants multiple mode.`, () => {
    const questionLanguage = "POL";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      id: `${questionLanguage}-${numberString}`,
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
      orders: { primary: [["adj-1", "npe-1"]] },
    };

    return runApiTest1(
      {
        questionLanguage,
        forceMultipleAndQuestionOnly: true,
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
          "Czerwoni ludzie.",
        ],
      }
    );
  });
  it(`${testEnv}#san01 GET 200 YES: Educator queries a single word, Q only but still wants multiple mode.`, () => {
    const questionLanguage = "ENG";

    let numberString = Date.now();

    const sentenceFormulaFromEducator = {
      id: `${questionLanguage}-${numberString}`,
      equivalents: {},
      orders: {},
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
        forceMultipleAndQuestionOnly: true,
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

xdescribe("getEnChsForLemma", () => {
  const testEnv = "ref";
  apiUtils.setEnvir(
    { body: { envir: testEnv } },
    'describe("getEnChsForLemma"'
  );

  it(`${testEnv}1`, () => {
    const actual = getEnChsForLemma("POL", "kobieta");
    console.log(actual);
    // expect(actual).to.eql(expected);
  });
});
