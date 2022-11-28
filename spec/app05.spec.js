const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { runPaletteTest, promiseAllMultiplier, checkProportions } = testingUtils;

// Delta here.
/**
 * Okay, currently vypernym "padre" is basically working.
 *
 * But like... if I make a sentence with npe-0002
 * I don't want it coming out equal probability in ENG Q sentence:
 * "My parent gave me a book."
 * "My mother gave me a book."
 * "My father gave me a book."
 *
 * I want to downgrade the likelihood of it generating the first sentence, in singular.
 *
 * But I suppose in plural, I want to upgrade its likelihood, so that "My parents gave me a book." is
 * more likely to generate than "My mothers gave me a book."
 *
 * Okay, so, you could put a marker symbol in the lobj id of the Hypernym,
 * "spa-npe-001-padre€"
 * "spa-npe-001-madre"
 *
 * "eng-npe-029-parent£"
 * "eng-npe-029-mother"
 * "eng-npe-029-father"
 *
 * "pol-npe-007-rodzic£"
 * "pol-npe-007-ojciec"
 * "pol-npe-007-matka"
 *
 * So when trait values are being filled where they have been left blank in sentence structure...
 *
 * £  Hypernyms  get random(4/5) to be number["plural"]           "parent", "rodzic"
 * €  Vypernyms  get uninterfered, number["singular","plural"]    "padre"
 *    Hyponyms   get random(4/5) to be number["singular"]         "mother" "father" "matka" "ojciec"
 *    Vyponyms   get random(4/5) to be number["singular"]         "madre"
 *
 * So mother, father, matka, ojciec, and madre will be more likely to generate as singular.
 * While parent, rodzic will be more likely to generate as plural.
 * And padre will generate equally as either.
 */

const dummy72a = [
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
const dummy72bSpaPolBoth = [
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
const dummy72bSpaEng = [
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
const dummy72bEngSpa = [
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
const dummy72cRefPolSpa = [
  { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
  { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
  { POL: ["Czerwony ojciec."], SPA: ["Rojo padre."] },
  { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres."] },
  { POL: ["Czerwoni rodzice."], SPA: ["Rojos padres."] },
  { POL: ["Czerwony rodzic."], SPA: ["Rojo padre."] },
];
const dummy72cRefSpaPol = [
  { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
  { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
  { POL: ["Czerwony ojciec.", "Czerwony rodzic."], SPA: ["Rojo padre."] },
  {
    POL: ["Czerwoni ojcowie.", "Czerwoni rodzice."],
    SPA: ["Rojos padres."],
  }, // delta hmmm
  { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres (males)."] },
  { POL: ["Czerwoni rodzice."], SPA: ["Rojos padres (mixed)."] },
];
const dummy72cRefEngSpa = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father."], SPA: ["Rojo padre."] },
  { ENG: ["Red fathers."], SPA: ["Rojos padres."] },
  { ENG: ["Red parents."], SPA: ["Rojos padres."] },
  { ENG: ["Red parent."], SPA: ["Rojo padre."] },
];
const dummy72cRefSpaEng = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father.", "Red parent."], SPA: ["Rojo padre."] },
  { ENG: ["Red fathers.", "Red parents."], SPA: ["Rojos padres."] }, // delta hmmm
  { ENG: ["Red fathers."], SPA: ["Rojos padres (fathers)."] },
  { ENG: ["Red parents."], SPA: ["Rojos padres (mixed)."] },
];

describe("/api", function () {
  this.timeout(7000);

  describe("/palette - Stage 24-i: Spanish basic. Normal nouns.", () => {
    it("#pal23-01a GET 200 YES: Polspa. Red onion (NORMAL).", () => {
      return runPaletteTest("POL", "SPA", "dummy72a", dummy72a);
    });
    it("#pal23-01b GET 200 YES: Spapol. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "POL", "dummy72a", dummy72a);
    });
    it("#pal23-01c GET 200 YES: Engspa. Red onion (NORMAL).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72a", dummy72a);
    });
    it("#pal23-01d GET 200 YES: Spaeng. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72a", dummy72a);
    });
  });

  describe("/palette - Stage 24-ii: Spanish basic. Hypernyms and Vypernyms", () => {
    // "medico"    Vypernym of "medico"/"medica".
    // "lekarz"    Vypernym of "lekarz"/"lekarka".
    // "doctor"    MGN, ie both male and female, whether singular or plural.
    it("#pal23-02a GET 200 YES: Polspa. Red doctor (MGN).", () => {
      return runPaletteTest("POL", "SPA", "dummy72b", dummy72bSpaPolBoth);
    });
    it("#pal23-02b GET 200 YES: Spapol. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "POL", "dummy72b", dummy72bSpaPolBoth);
    });
    it("#pal23-02c GET 200 YES: Engspa. Red doctor (MGN).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72b", dummy72bEngSpa);
    });
    it("#pal23-02d GET 200 YES: Spaeng. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72b", dummy72bSpaEng);
    });
  });

  describe("/palette - Stage 24-iii: Spanish basic. Hypernyms and Vypernyms", () => {
    // "parent"    Hypernym of "mother"/"father".
    // "rodzic"    Hypernym of "matka"/"ojciec".
    // "padre"     Vypernym of "madre"/"padre".
    it("#pal23-03a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return runPaletteTest("POL", "SPA", "dummy72c", dummy72cRefPolSpa);
    });
    it("#pal23-03b GET 200 YES: Spapol. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "POL", "dummy72c", dummy72cRefSpaPol);
    });
    it("#pal23-03c GET 200 YES: Engspa. Red mother (Vypernym).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72c", dummy72cRefEngSpa);
    });
    it("#pal23-03d GET 200 YES: Spaeng. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72c", dummy72cRefSpaEng);
    });
  });

  describe("/palette - Stage 24-iv: Spanish basic. Test Hypernym Vypernym Hyponym Vyponym probabilities.", () => {
    it("#pal23-03a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(300, () => {
          return runPaletteTest("POL", "SPA", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["matka", ["Czerwona matka."], 0.17, 0.4],
          ["matki", ["Czerwone matki."], 0.17, 0.4],
          ["ojciec", ["Czerwony ojciec."], 0.17, 0.4],
          ["ojcowie", ["Czerwoni ojcowie."], 0.17, 0.4],
          ["rodzic", ["Czerwony rodzic."], 0.17, 0.4],
          ["rodzice", ["Czerwoni rodzice."], 0.17, 0.4],
        ]);
      });
    });
  });
});
