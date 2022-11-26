const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

const go = (questionLanguage, answerLanguage, sentenceFormulaSymbol, ref) => {
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
      consol.log(res.body);
      testingUtils.checkTranslationsOfGivenRef(
        res,
        ref,
        questionLanguage,
        answerLanguage
      );
    });
};

describe("/api", function () {
  this.timeout(7000);

  describe.only("/palette - Stage 24: Spanish basic.", () => {
    const dummy73aRef = [
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
    const dummy73bRefSpaPolBothWays = [
      {
        POL: ["Czerwony lekarz."],
        SPA: ["Rojo medico."],
      },
      {
        POL: ["Czerwona lekarka."],
        SPA: ["Roja medica."],
      },
      {
        POL: ["Czerwoni lekarze."],
        SPA: ["Rojos medicos."],
      },
      {
        POL: ["Czerwone lekarki."],
        SPA: ["Rojas medicas."],
      },
    ];
    const dummy73bRefSpaEng = [
      {
        SPA: ["Rojo medico."],
        ENG: ["Red doctor."],
      },
      {
        SPA: ["Roja medica."],
        ENG: ["Red doctor."],
      },
      {
        SPA: ["Rojos medicos."],
        ENG: ["Red doctors."],
      },
      {
        SPA: ["Rojas medicas."],
        ENG: ["Red doctors."],
      },
    ];
    const dummy73bRefEngSpa = [
      {
        ENG: ["Red doctor (male)."],
        SPA: ["Rojo medico."],
      },
      {
        ENG: ["Red doctor (female)."],
        SPA: ["Roja medica."],
      },
      {
        ENG: ["Red doctors (males)."],
        SPA: ["Rojos medicos."],
      },
      {
        ENG: ["Red doctors (mixed)."],
        SPA: ["Rojos medicos."],
      },
      {
        ENG: ["Red doctors (females)."],
        SPA: ["Rojas medicas."],
      },
    ];
    it("#pal23-01a GET 200 YES: Polspa. Red bear/onion.", () => {
      return go("POL", "SPA", "dummy73a", dummy73aRef);
    });
    it("#pal23-01b GET 200 YES: Spapol. Red bear/onion.", () => {
      return go("SPA", "POL", "dummy73a", dummy73aRef);
    });
    it("#pal23-01c GET 200 YES: Engspa. Red bear/onion.", () => {
      return go("ENG", "SPA", "dummy73a", dummy73aRef);
    });
    it("#pal23-01d GET 200 YES: Spaeng. Red bear/onion.", () => {
      return go("SPA", "ENG", "dummy73a", dummy73aRef);
    });
    it("#pal23-02a GET 200 YES: Polspa. Red doctor.", () => {
      return go("POL", "SPA", "dummy73b", dummy73bRefSpaPolBothWays);
    });
    it("#pal23-02b GET 200 YES: Spapol. Red doctor.", () => {
      return go("SPA", "POL", "dummy73b", dummy73bRefSpaPolBothWays);
    });
    it("#pal23-02c GET 200 YES: Engspa. Red doctor.", () => {
      return go("ENG", "SPA", "dummy73b", dummy73bRefEngSpa);
    });
    it("#pal23-02d GET 200 YES: Spaeng. Red doctor.", () => {
      return go("SPA", "ENG", "dummy73b", dummy73bRefSpaEng);
    });
  });
});
