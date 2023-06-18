const { expect } = require("chai");
const { it } = require("mocha");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const {
  splitLemmaObjectsAndWriteAsJson,
  addGuideSentenceToFormulaAndWriteAsJson,
} = require("../utils/secondOrder/educatorUtils.js");

xdescribe("Sandbox.", () => {
  it("Sandbox 1.", () => {
    //
  });
});

xdescribe("Project Ophiucus: Bravo Wing: Task One.", () => {
  it("Take lobjs from Old Way of storing them", () => {
    // write as individual files with extra and inflections, plus skeletal lobjs arrays.
    let envs = ["dev", "ref"];
    let langs = ["POL", "ENG", "SPA"];

    envs.forEach((e) => {
      langs.forEach((l) => {
        if (e === "dev" && l === "SPA") {
          return;
        }
        splitLemmaObjectsAndWriteAsJson(e, l);
      });
    });
  });
  it("Take formulas from Old Way of storing them", () => {
    // add guideSentence.
    let envs = ["ref", "dev"];
    let langs = ["POL", "ENG", "SPA"];

    envs.forEach((e) => {
      langs.forEach((l) => {
        if (e === "dev" && l === "SPA") {
          return;
        }
        addGuideSentenceToFormulaAndWriteAsJson(e, l);
      });
    });
  });
});

xdescribe("Check FE does not mutate BE sentenceFormulas.", () => {
  it("ENG ref", () => {
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
  it("POL ref", () => {
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
});
