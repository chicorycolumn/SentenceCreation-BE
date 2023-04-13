const { expect } = require("chai");
const { it } = require("mocha");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");

xdescribe("Check FE does not mutate BE sentenceFormulas: ENG ref.", () => {
  let lang = "ENG";
  let env = "ref";
  let BEs =
    require(`../source/${env}/${lang}/sentenceFormulas.js`).sentenceFormulasBank;

  let beenThroughFEs = [];

  beenThroughFEs.forEach((beenThroughFE, index) => {
    let BE = BEs.find(
      (sf) => sf.sentenceFormulaId === beenThroughFE.sentenceFormulaId
    );
    if (!BE) {
      console.log("No BE found for:", beenThroughFE.sentenceFormulaId);
      expect(true).to.equal(false);
    }

    delete BE.sentenceFormulaSymbol;
    if (!BE.orders.additional || !BE.orders.additional.length) {
      BE.orders.additional = [];
    }
    it(`${index + 1}-${beenThroughFE.sentenceFormulaId}`, () => {
      expect(beenThroughFE).to.eql(BE);
    });
  });
});

xdescribe("Check FE does not mutate BE sentenceFormulas: POL ref.", () => {
  let lang = "POL";
  let env = "ref";
  let BEs =
    require(`../source/${env}/${lang}/sentenceFormulas.js`).sentenceFormulasBank;

  let beenThroughFEs = [];

  beenThroughFEs.forEach((beenThroughFE, index) => {
    let BE = BEs.find(
      (sf) => sf.sentenceFormulaId === beenThroughFE.sentenceFormulaId
    );
    if (!BE) {
      console.log("No BE found for:", beenThroughFE.sentenceFormulaId);
      expect(true).to.equal(false);
    }

    delete BE.sentenceFormulaSymbol;
    if (!BE.orders.additional || !BE.orders.additional.length) {
      BE.orders.additional = [];
    }
    it(`${index + 1}-${beenThroughFE.sentenceFormulaId}`, () => {
      expect(beenThroughFE).to.eql(BE);
    });
  });
});
