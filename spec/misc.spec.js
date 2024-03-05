const { expect } = require("chai");
const { it } = require("mocha");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const {
  splitLemmaObjectsFromBigJsonToIndividualJsons,
  addGuideSentenceToFormulaAndWriteAsJson,
} = require("../utils/secondOrder/educatorUtils.js");

xdescribe("Sandbox.", () => {
  it("Sandbox 1.", () => {
    //
  });
});

xdescribe("Sandbox.", () => {
  it("Just write this json.", () => {
    let d = [];

    Object.keys(d).forEach((wordtype) => {
      let data = d[wordtype];
      // let path = `source/ref/NEXUS/words/${wordtype}.json`;
      console.log(11, wordtype, data.length, path);
      uUtils.writeJSON(path, data);
      console.log("Done", wordtype);
    });
  });
});

xdescribe("Project Ophiucus: Bravo Wing: Task One.", () => {
  it("Take large json dicts of lobjs from Scraper and separate into individual files for BE", () => {
    let e = "prod";
    let l = "ENG";
    // let wordtypes = [];

    const suffixRef = {
      ENG: "TGT",
      POL: "SRC",
    };
    let suffix = `_batch_01_${suffixRef[l]}`;
    splitLemmaObjectsFromBigJsonToIndividualJsons(e, l, suffix);
  });
  it("Take formulas from Old Way of storing them", () => {
    // add guideSentence.
    let manuallySetEnvs = ["ref", "dev"];
    let langs = ["POL", "ENG", "SPA"];

    manuallySetEnvs.forEach((e) => {
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
    let manuallySetEnv = "ref";
    let BEs =
      require(`../source/${manuallySetEnv}/${lang}/sentenceFormulas.js`).sentenceFormulasBank;

    let beenThroughFEs = []; // Copypaste these yourself from Save Formula button in FE printing to console.

    beenThroughFEs.forEach((beenThroughFE, index) => {
      let BE = BEs.find((sf) => sf.id === beenThroughFE.id);
      if (!BE) {
        console.log("No BE found for:", beenThroughFE.id);
        expect(true).to.equal(false);
      }

      if (!BE.orders.additional || !BE.orders.additional.length) {
        BE.orders.additional = [];
      }
      it(`${index + 1}-${beenThroughFE.id}`, () => {
        expect(beenThroughFE).to.eql(BE);
      });
    });
  });
  it("POL ref", () => {
    let lang = "POL";
    let manuallySetEnv = "ref";
    let BEs =
      require(`../source/${manuallySetEnv}/${lang}/sentenceFormulas.js`).sentenceFormulasBank;

    let beenThroughFEs = []; // Copypaste these yourself from Save Formula button in FE printing to console.

    beenThroughFEs.forEach((beenThroughFE, index) => {
      let BE = BEs.find((sf) => sf.id === beenThroughFE.id);
      if (!BE) {
        console.log("No BE found for:", beenThroughFE.id);
        expect(true).to.equal(false);
      }

      if (!BE.orders.additional || !BE.orders.additional.length) {
        BE.orders.additional = [];
      }
      it(`${index + 1}-${beenThroughFE.id}`, () => {
        expect(beenThroughFE).to.eql(BE);
      });
    });
  });
});
