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

/**
 * HYPERNYMS AND VYPERNYMS
 *
 * 1. Terms
 *
 * "parent"    Hypernym of mother/father
 * "rodzic"    Hypernym
 * "padre"     Vypernym (virile hypernym)
 *
 * "medico"    Vypernym of "medico"/"medica".
 * "lekarz"    Vypernym of "lekarz"/"lekarka".
 * "doctor"    MGN, ie both male and female, whether singular or plural.
 *
 * 3. Issue 205: Gender of singular hypernym
 *
 * "My parent gave me his book." has been generated. That's not right.
 *
 * So let's think through the scenarios:
 *
 * SPA->ENG
 *
 * Vypernyms in singular only ever mean the male vyponym.
 *
 * Vyponym: "Mi padre y la mujer que LE ama." -> "My FATHER and the woman who loves HIM."
 * Vyponym: "Mi madre y la mujer que LA ama." -> "My MOTHER and the woman who loves HER."
 *
 * But hypernyms in singular can technically be either gender.
 *
 * Hyponym: "Matka i kobieta ktøra JÆ kocha." -> "My MOTHER and the woman who loves HER."
 * Hyponym: "Ojciec i kobieta ktøra GO kocha." -> "My FATHER and the woman who loves HIM."
 * Hypernym: "Rodzic...GO." "Rodzic...JÆ." -> "My parent...HIM." "My parent...HER." "My parent...THEM."
 *
 * And we have this extra knot that in English, singular they can be used for...
 *  hypernyms "The parent and their book."
 *  MGNs      "The doctor and their book."
 *
 * Okay... I will steer well clear of generating singular "they" in QUESTION sentences.
 *
 * Note that in Polish, "She's a good kid." is "Ona jest dobrYM dzieckIEM."
 *
 * Okay, so actually we don't need to worry about singular "they".
 * Because a sentence with an MGN like "doctor" or "parent" in ENG will generate as
 * Q: Small child (female). <--> A: Pequenya ninya.
 * Q: The doctor and HER bag. <--> A: Lekarka i jej/swoja torba.
 * Q: El chico y su bolsa. <--> A: The boy and HIS bag.
 *
 *
 *
 *
 * 2. Issue 204: Adjust proportions (solved)
 *
 * "spa-npe-001-padre€"     euro symbol indicates vypernym
 * "spa-npe-001-madre"
 *
 * "eng-npe-029-parent£"    pound symbol indicates hypernym
 * "eng-npe-029-mother"
 * "eng-npe-029-father"
 *
 * "pol-npe-007-rodzic£"    pound symbol indicates hypernym
 * "pol-npe-007-ojciec"
 * "pol-npe-007-matka"
 *
 * So when trait values are being filled where they have been left blank in sentence structure...
 *
 *    Hypernyms  get random(4/5) to be number["plural"]           "parent", "rodzic"
 *    Vypernyms  get uninterfered, number["singular","plural"]    "padre"
 *    Hyponyms   get random(4/5) to be number["singular"]         "mother" "father" "matka" "ojciec"
 *    Vyponyms   get random(4/5) to be number["singular"]         "madre"
 *
 */

const dummy72a = [
  {
    ENG: ["Red bear."],
    SPA: ["Rojo oso."],
    POL: ["Czerwony niedźwiedź."],
  },
  {
    ENG: ["Red onion."],
    SPA: ["Roja cebolla."],
    POL: ["Czerwona cebula."],
  },
  {
    ENG: ["Red bears."],
    SPA: ["Rojos osos."],
    POL: ["Czerwone niedźwiedzie."],
  },
  {
    ENG: ["Red onions."],
    SPA: ["Rojas cebollas."],
    POL: ["Czerwone cebule."],
  },
];
const dummy72bSpaPol = [
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
    SPA: ["Rojos medicos (males)."],
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
const dummy72bPolSpa = [
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
    POL: ["Czerwoni lekarze (mixed)."],
    SPA: ["Rojos medicos."],
  },
  {
    POL: ["Czerwoni lekarze (males)."],
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
  { POL: ["Czerwoni rodzice (males)."], SPA: ["Rojos padres."] },
  { POL: ["Czerwoni rodzice (mixed)."], SPA: ["Rojos padres."] },
  { POL: ["Czerwoni rodzice (females)."], SPA: ["Rojas madres."] },
  { POL: ["Czerwony rodzic (male)."], SPA: ["Rojo padre."] },
  { POL: ["Czerwony rodzic (female)."], SPA: ["Roja madre."] },
];
const dummy72cRefSpaPol = [
  { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
  { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
  { POL: ["Czerwony ojciec.", "Czerwony rodzic."], SPA: ["Rojo padre."] },
  { POL: ["Czerwony ojciec."], SPA: ["Rojo padre (male)."] },
  {
    POL: ["Czerwoni ojcowie.", "Czerwoni rodzice."],
    SPA: ["Rojos padres."],
  },
  { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres (males)."] },
  { POL: ["Czerwoni rodzice."], SPA: ["Rojos padres (mixed)."] },
];
const dummy72cRefEngPol = [
  { ENG: ["Red mother."], POL: ["Czerwona matka."] },
  { ENG: ["Red mothers."], POL: ["Czerwone matki."] },
  { ENG: ["Red father."], POL: ["Czerwony ojciec."] },
  { ENG: ["Red fathers."], POL: ["Czerwoni ojcowie."] },
  { ENG: ["Red parents."], POL: ["Czerwoni rodzice."] },
  { ENG: ["Red parent."], POL: ["Czerwony rodzic."] },
];
const dummy72cRefPolEng = [
  { ENG: ["Red mother."], POL: ["Czerwona matka."] },
  { ENG: ["Red mothers."], POL: ["Czerwone matki."] },
  { ENG: ["Red father."], POL: ["Czerwony ojciec."] },
  { ENG: ["Red fathers."], POL: ["Czerwoni ojcowie."] },
  { ENG: ["Red parents."], POL: ["Czerwoni rodzice."] },
  { ENG: ["Red parent."], POL: ["Czerwony rodzic."] },
];
const dummy72cRefEngSpa = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father."], SPA: ["Rojo padre."] },
  { ENG: ["Red fathers."], SPA: ["Rojos padres."] },
  { ENG: ["Red parents (mixed)."], SPA: ["Rojos padres."] },
  { ENG: ["Red parents (males)."], SPA: ["Rojos padres."] },
  { ENG: ["Red parents (females)."], SPA: ["Rojas madres."] },
  { ENG: ["Red parent (male)."], SPA: ["Rojo padre."] },
  { ENG: ["Red parent (female)."], SPA: ["Roja madre."] },
];

const dummy72cRefSpaEng = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father.", "Red parent."], SPA: ["Rojo padre."] },
  { ENG: ["Red father."], SPA: ["Rojo padre (male)."] },
  { ENG: ["Red fathers.", "Red parents."], SPA: ["Rojos padres."] },
  { ENG: ["Red fathers."], SPA: ["Rojos padres (males)."] },
  { ENG: ["Red parents."], SPA: ["Rojos padres (mixed)."] },
];

describe("/api", function () {
  this.timeout(7000);

  describe("/palette - Stage 24-i: Spanish basic. Normal nouns.", () => {
    it("#pal24-01a GET 200 YES: Polspa. Red onion (NORMAL).", () => {
      return runPaletteTest("POL", "SPA", "dummy72a", dummy72a);
    });
    it("#pal24-01b GET 200 YES: Spapol. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "POL", "dummy72a", dummy72a);
    });
    it("#pal24-01c GET 200 YES: Engspa. Red onion (NORMAL).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72a", dummy72a);
    });
    it("#pal24-01d GET 200 YES: Spaeng. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72a", dummy72a);
    });
  });

  describe("/palette - Stage 24-ii: Spanish basic. Hypernyms and Vypernyms", () => {
    it("#pal24-02a GET 200 YES: Polspa. Red doctor (MGN).", () => {
      return runPaletteTest("POL", "SPA", "dummy72b", dummy72bPolSpa);
    });
    it("#pal24-02b GET 200 YES: Spapol. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "POL", "dummy72b", dummy72bSpaPol);
    });
    it("#pal24-02c GET 200 YES: Engspa. Red doctor (MGN).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72b", dummy72bEngSpa);
    });
    it("#pal24-02d GET 200 YES: Spaeng. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72b", dummy72bSpaEng);
    });
  });

  describe("/palette - Stage 24-iii: Spanish basic. Hypernyms and Vypernyms", () => {
    it("#pal24-03a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return runPaletteTest("POL", "SPA", "dummy72c", dummy72cRefPolSpa);
    });
    it("#pal24-03b GET 200 YES: Spapol. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "POL", "dummy72c", dummy72cRefSpaPol);
    });
    it("#pal24-03c GET 200 YES: Engspa. Red mother (Vypernym).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72c", dummy72cRefEngSpa);
    });
    it("#pal24-03d GET 200 YES: Spaeng. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72c", dummy72cRefSpaEng);
    });
    it("#pal24-03e GET 200 YES: Enpol. Red mother (Vypernym).", () => {
      return runPaletteTest("ENG", "POL", "dummy72c", dummy72cRefEngPol);
    });
    it("#pal24-03f GET 200 YES: Poleng. Red mother (Vypernym).", () => {
      return runPaletteTest("POL", "ENG", "dummy72c", dummy72cRefPolEng);
    });
  });

  describe("/palette - Stage 24-iv: Spanish basic. Vypernym Hyponym Vyponym hypernymyProportion.", () => {
    it("#pal24-04a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("POL", "SPA", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          // V/Hypernyms in plural
          // V/Hyponyms in singular
          // should be higher proportion. (1/4 each)
          ["matka", ["Czerwona matka."], 0.265, 0.35],
          ["ojciec", ["Czerwony ojciec."], 0.265, 0.35],
          ["rodzice", ["Czerwoni rodzice."], 0.265, 0.35],

          // V/Hypernyms in singular
          // V/Hyponyms in plural
          // should be lower proportion. (1/16 each)
          ["matki", ["Czerwone matki."], 0.065, 0.65],
          ["ojcowie", ["Czerwoni ojcowie."], 0.065, 0.65],
          ["rodzic", ["Czerwony rodzic."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal24-04b GET 200 YES: Poleng. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("POL", "ENG", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          // V/Hypernyms in plural
          // V/Hyponyms in singular
          // should be higher proportion. (1/4 each)
          ["matka", ["Czerwona matka."], 0.265, 0.35],
          ["ojciec", ["Czerwony ojciec."], 0.265, 0.35],
          ["rodzice", ["Czerwoni rodzice."], 0.265, 0.35],

          // V/Hypernyms in singular
          // V/Hyponyms in plural
          // should be lower proportion. (1/16 each)
          ["matki", ["Czerwone matki."], 0.065, 0.65],
          ["ojcowie", ["Czerwoni ojcowie."], 0.065, 0.65],
          ["rodzic", ["Czerwony rodzic."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal24-04c GET 200 YES: Spapol. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("SPA", "POL", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["madre", ["Roja madre."], 0.3, 0.55],
          ["padre", ["Rojo padre."], 0.3, 0.55],
          ["padres", ["Rojos padres."], 0.3, 0.55],

          ["madres", ["Rojas madres."], 0.1, 0.65],
        ]);
      });
    });
    it("#pal24-04d GET 200 YES: Spaeng. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("SPA", "ENG", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["madre", ["Roja madre."], 0.3, 0.55],
          ["padre", ["Rojo padre."], 0.3, 0.55],
          ["padres", ["Rojos padres."], 0.3, 0.55],

          ["madres", ["Rojas madres."], 0.1, 0.65],
        ]);
      });
    });
    it("#pal24-04e GET 200 YES: Engpol. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("ENG", "POL", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["mother", ["Red mother."], 0.265, 0.35],
          ["father", ["Red father."], 0.265, 0.35],
          ["parents", ["Red parents."], 0.265, 0.35],

          ["parent", ["Red parent."], 0.065, 0.65],
          ["mothers", ["Red mothers."], 0.065, 0.65],
          ["fathers", ["Red fathers."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal24-04f GET 200 YES: Engspa. Red mother (Vypernym).", () => {
      return Promise.all(
        promiseAllMultiplier(250, () => {
          return runPaletteTest("ENG", "SPA", "dummy72c", [], {}, 1, true);
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["mother", ["Red mother."], 0.265, 0.35],
          ["father", ["Red father."], 0.265, 0.35],
          ["parents", ["Red parents."], 0.265, 0.35],

          ["parent", ["Red parent."], 0.065, 0.65],
          ["mothers", ["Red mothers."], 0.065, 0.65],
          ["fathers", ["Red fathers."], 0.065, 0.65],
        ]);
      });
    });
  });
});
