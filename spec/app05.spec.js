const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { generalTranslatedSentencesRef, runPaletteTest } = testingUtils;

// Delta here.
/**
 * Okay, currently SMP "padre" is basically working.
 * Only thing is, I think I want to make it so a SMP's counterparts (Co-SMPs)
 * (ie "rodzic" and "parent" are the SMP's counterparts, whereas "padre" is the SMP)
 * are not randomly selected as often.
 *
 * You know like... if I make a sentence with npe-0002
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
 * A word with £                    = Hypernym but not SMP      "parent", "rodzic"
 * A word with €                    = Hypernym and is SMP       "padre"
 * A word with neither but is in
 * nexus arr with a word which is £ = Hypon of a non-SMP        "mother" "father" "matka" "ojciec"
 * A word with neither but is in
 * nexus arr with a word which is € = Hypon of a SMP            "madre"
 *
 *
 * So when trait values are being filled where they have been left blank in sentence structure...
 *
 * Hypernym non-SMPs    get random(4/5) to be number["plural"]
 * Hypernym SMPs        get uninterfered, so number["singular", "plural"]
 * Hyponyms of non-SMP  get random(4/5) to be number["singular"]
 * Hyponyms of SMP      get random(4/5) to be number["singular"]
 *
 * So mother, father, matka, ojciec, and madre will be more likely to generate as singular.
 * While parent, rodzic will be more likely to generate as plural.
 * And padre will generate equally as either.
 */

const dummy73a = [
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
const dummy73bSpaPolBoth = [
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
const dummy73bSpaEng = [
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
const dummy73bEngSpa = [
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
const dummy73cRefPolSpa = [
  { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
  { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
  { POL: ["Czerwony ojciec."], SPA: ["Rojo padre."] },
  { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres."] },
  { POL: ["Czerwoni rodzice."], SPA: ["Rojos padres."] },
  { POL: ["Czerwony rodzic."], SPA: ["Rojo padre."] },
];
const dummy73cRefSpaPol = [
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
const dummy73cRefEngSpa = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father."], SPA: ["Rojo padre."] },
  { ENG: ["Red fathers."], SPA: ["Rojos padres."] },
  { ENG: ["Red parents."], SPA: ["Rojos padres."] },
  { ENG: ["Red parent."], SPA: ["Rojo padre."] },
];
const dummy73cRefSpaEng = [
  { ENG: ["Red mother."], SPA: ["Roja madre."] },
  { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
  { ENG: ["Red father.", "Red parent."], SPA: ["Rojo padre."] },
  { ENG: ["Red fathers.", "Red parents."], SPA: ["Rojos padres."] }, // delta hmmm
  { ENG: ["Red fathers."], SPA: ["Rojos padres (fathers)."] },
  { ENG: ["Red parents."], SPA: ["Rojos padres (mixed)."] },
];

describe("/api", function () {
  this.timeout(7000);

  describe("/palette - Stage 24-i: Spanish basic.", () => {
    it("#pal23-01a GET 200 YES: Polspa. Red onion (NORMAL).", () => {
      return runPaletteTest("POL", "SPA", "dummy73a", dummy73a);
    });
    it("#pal23-01b GET 200 YES: Spapol. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "POL", "dummy73a", dummy73a);
    });
    it("#pal23-01c GET 200 YES: Engspa. Red onion (NORMAL).", () => {
      return runPaletteTest("ENG", "SPA", "dummy73a", dummy73a);
    });
    it("#pal23-01d GET 200 YES: Spaeng. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "ENG", "dummy73a", dummy73a);
    });
  });

  describe("/palette - Stage 24-ii: Spanish basic.", () => {
    it("#pal23-02a GET 200 YES: Polspa. Red doctor (MGN).", () => {
      return runPaletteTest("POL", "SPA", "dummy73b", dummy73bSpaPolBoth);
    });
    it("#pal23-02b GET 200 YES: Spapol. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "POL", "dummy73b", dummy73bSpaPolBoth);
    });
    it("#pal23-02c GET 200 YES: Engspa. Red doctor (MGN).", () => {
      return runPaletteTest("ENG", "SPA", "dummy73b", dummy73bEngSpa);
    });
    it("#pal23-02d GET 200 YES: Spaeng. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "ENG", "dummy73b", dummy73bSpaEng);
    });
  });

  describe("/palette - Stage 24-i: Spanish basic.", () => {
    it("#pal23-03a GET 200 YES: Polspa. Red mother (SMP).", () => {
      return runPaletteTest("POL", "SPA", "dummy73c", dummy73cRefPolSpa);
    });
    it("#pal23-03b GET 200 YES: Spapol. Red mother (SMP).", () => {
      return runPaletteTest("SPA", "POL", "dummy73c", dummy73cRefSpaPol);
    });
    it("#pal23-03c GET 200 YES: Engspa. Red mother (SMP).", () => {
      return runPaletteTest("ENG", "SPA", "dummy73c", dummy73cRefEngSpa);
    });
    it("#pal23-03d GET 200 YES: Spaeng. Red mother (SMP).", () => {
      return runPaletteTest("SPA", "ENG", "dummy73c", dummy73cRefSpaEng);
    });
  });
});
