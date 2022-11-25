const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

describe("/api", function () {
  this.timeout(7000);

  describe.only("/palette - Stage 24: Spanish basic!", () => {
    let dummy73aRef = [
      {
        ENG: ["Red bear."],
        SPA: ["Rojo oso."],
        POL: ["Czerwony nedved."],
      },
      {
        ENG: ["Red onion."],
        SPA: ["Roja cebolla."],
        POL: ["Czerwona cebula."],
      },
      {
        ENG: ["Red bears."],
        SPA: ["Rojos osos."],
        POL: ["Czerwone nedvedy."],
      },
      {
        ENG: ["Red onions."],
        SPA: ["Rojas cebollas."],
        POL: ["Czerwone cebule."],
      },
    ];
    it("#pal23-01a GET 200 YES: Polspa. Red bear/onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "SPA";
      const sentenceFormulaSymbol = "dummy73a";
      const go = () => {
        return request(app)
          .get("/api/palette")
          .send({
            questionLanguage,
            answerLanguage,
            useDummy: true,
            sentenceFormulaSymbol,
          })
          .expect(200)
          .then((res) => {
            testingUtils.checkTranslationsOfGivenRef(
              res,
              dummy73aRef,
              questionLanguage,
              answerLanguage
            );
          });
      };
      return go();
    });
    it("#pal23-01b GET 200 YES: Spapol. Red bear/onion.", () => {
      const questionLanguage = "SPA";
      const answerLanguage = "POL";
      const sentenceFormulaSymbol = "dummy73a";
      const go = () => {
        return request(app)
          .get("/api/palette")
          .send({
            questionLanguage,
            answerLanguage,
            useDummy: true,
            sentenceFormulaSymbol,
          })
          .expect(200)
          .then((res) => {
            testingUtils.checkTranslationsOfGivenRef(
              res,
              dummy73aRef,
              questionLanguage,
              answerLanguage
            );
          });
      };
      return go();
    });
    it("#pal23-01c GET 200 YES: Engspa. Red bear/onion.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "SPA";
      const sentenceFormulaSymbol = "dummy73a";
      const go = () => {
        return request(app)
          .get("/api/palette")
          .send({
            questionLanguage,
            answerLanguage,
            useDummy: true,
            sentenceFormulaSymbol,
          })
          .expect(200)
          .then((res) => {
            testingUtils.checkTranslationsOfGivenRef(
              res,
              dummy73aRef,
              questionLanguage,
              answerLanguage
            );
          });
      };
      return go();
    });
    it("#pal23-01d GET 200 YES: Spaeng. Red bear/onion.", () => {
      const questionLanguage = "SPA";
      const answerLanguage = "ENG";
      const sentenceFormulaSymbol = "dummy73a";
      const go = () => {
        return request(app)
          .get("/api/palette")
          .send({
            questionLanguage,
            answerLanguage,
            useDummy: true,
            sentenceFormulaSymbol,
          })
          .expect(200)
          .then((res) => {
            testingUtils.checkTranslationsOfGivenRef(
              res,
              dummy73aRef,
              questionLanguage,
              answerLanguage
            );
          });
      };
      return go();
    });
  });
});
