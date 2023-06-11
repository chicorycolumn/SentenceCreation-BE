const { expect } = require("chai");
const { it } = require("mocha");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const {
  splitLemmaObjectsAndWriteAsJson,
} = require("../utils/secondOrder/educatorUtils.js");

describe.only("Project Ophiucus: Bravo Wing: Task One.", () => {
  // Take lobjs from Old Way of storing them, and write as individual files with extra and inflections, plus skeletal lobjs arrays.
  let e = "ref";
  let l = "POL";

  let envs = ["dev", "ref"];
  let langs = ["POL", "ENG", "SPA"];
  envs.forEach((e) => {
    langs.forEach((l) => {
      if (e === "dev" && lang === "SPA") {
        return;
      }
      splitLemmaObjectsAndWriteAsJson(e, l);
    });
  });
});

xdescribe("Check FE does not mutate BE sentenceFormulas: ENG ref.", () => {
  let lang = "ENG";
  let env = "ref";
  let BEs =
    require(`../source/${env}/${lang}/sentenceFormulas.js`).sentenceFormulasBank;

  let beenThroughFEs = []; // Copypaste these yourself from Save Formula button in FE printing to console.

  beenThroughFEs.forEach((beenThroughFE, index) => {
    let BE = BEs.find(
      (sf) => sf.sentenceFormulaId === beenThroughFE.sentenceFormulaId
    );
    if (!BE) {
      console.log("No BE found for:", beenThroughFE.sentenceFormulaId);
      expect(true).to.equal(false);
    }

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

  let beenThroughFEs = []; // Copypaste these yourself from Save Formula button in FE printing to console.

  beenThroughFEs.forEach((beenThroughFE, index) => {
    let BE = BEs.find(
      (sf) => sf.sentenceFormulaId === beenThroughFE.sentenceFormulaId
    );
    if (!BE) {
      console.log("No BE found for:", beenThroughFE.sentenceFormulaId);
      expect(true).to.equal(false);
    }

    if (!BE.orders.additional || !BE.orders.additional.length) {
      BE.orders.additional = [];
    }
    it(`${index + 1}-${beenThroughFE.sentenceFormulaId}`, () => {
      expect(beenThroughFE).to.eql(BE);
    });
  });
});
