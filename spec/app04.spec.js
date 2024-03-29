const apiUtils = require("../utils/secondOrder/apiUtils");
const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { runPaletteTest1 } = testingUtils;

describe("/api", function () {
  this.timeout(7000);

  const testEnv = apiUtils.getEnvir("app04.spec");

  describe("/palette - Stage 22: Pronombres, Interrogatives.", () => {
    it(`${testEnv}#pal22-01a GET 200 YES: Poleng. ITG_G. Who is she?`, () => {
      let ref = [
        {
          ENG: ["Who is she?"],
          POL: ["Kim ona jest?", "Kim jest (female)?"],
        },
        {
          ENG: ["Who is he?"],
          POL: ["Kim on jest?", "Kim jest (male)?"],
        },
        {
          ENG: ["Who are you?"],
          POL: ["Kim ty jesteś?", "Kim jesteś?"],
        },
        {
          ENG: ["Who are you?"],
          POL: ["Kim wy jesteście?", "Kim jesteście?"],
        },
        {
          ENG: ["Who are we?"],
          POL: ["Kim my jesteśmy?", "Kim jesteśmy?"],
        },
        {
          ENG: ["Who are they?"],
          POL: ["Kim oni są?", "Kim one są?", "Kim są?"],
        },
        {
          ENG: ["Who am I?"],
          POL: ["Kim ja jestem?", "Kim jestem?"],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy70a", ref);
    });
  });

  describe("/palette - Stage 23: Synonyms.", () => {
    it(`${testEnv}#pal23-01a GET 200 YES: Engpol. Word synonyms, two in ENG and two in POL.`, () => {
      let ref = [
        {
          ENG: ["Small hole."],
          POL: ["Mała dziura.", "Mały otwór."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy71a", ref, {
        useDummyWords: true,
      });
    });
    it(`${testEnv}#pal23-01b GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.`, () => {
      let ref = [
        {
          ENG: ["Small hole.", "Small pit."],
          POL: ["Mała dziura."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy71a", ref, {
        useDummyWords: true,
      });
    });
    it(`${testEnv}#pal23-01c GET 200 YES: Engpol. Word synonyms, two in ENG and two in POL.`, () => {
      let ref = [
        {
          ENG: ["In a small hole."],
          POL: ["W małej dziurze.", "W małym otworze."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy71b", ref, {
        useDummyWords: true,
      });
    });
    it(`${testEnv}#pal23-01d GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.`, () => {
      let ref = [
        {
          ENG: ["In a small hole.", "In a small pit."],
          POL: ["W małej dziurze."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy71b", ref, {
        useDummyWords: true,
      });
    });
    it(`${testEnv}#pal23-01e GET 200 YES: Engpol. Sentences synonyms.`, () => {
      let ref = [
        {
          ENG: ["In a small hole."],
          POL: [
            "W małej dziurze.",
            "W małym otworze.",
            "Mała dziura.",
            "Mały otwór.",
          ],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy71c", ref, {
        useDummyWords: true,
      });
    });
    it(`${testEnv}#pal23-01f GET 200 YES: Poleng. Sentences synonyms.`, () => {
      let ref = [
        {
          ENG: [
            "In a small hole.",
            "In a small pit.",
            "Small hole.",
            "Small pit.",
          ],
          POL: ["W małej dziurze."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy71c", ref, {
        useDummyWords: true,
      });
    });
  });

  describe("/palette - Stage 24: Gender of animals is neuter in ENG (see FYIP102).", () => {
    it(`${testEnv}#pal24-01a GET 200 YES: Poleng. I saw a rat, it was small.`, () => {
      let ref = [
        {
          ENG: [
            "I see a rat, it was small.",
            "I see a rat, it had been small.",
            "I see a rat, it has been small.",
          ],
          POL: ["Widzę szczura, był mały."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy67b", ref);
    });
    it(`${testEnv}#pal24-01b GET 200 YES: Engpol. I saw a rat, it was small.`, () => {
      let ref = [
        {
          ENG: ["I see a rat, it was small."],
          POL: ["Widzę szczura, był mały."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy67b", ref);
    });
  });

  describe("/palette - Stage 25: Two levels of dependent chunks.", () => {
    it(`${testEnv}#pal25-01a GET 200 YES: Poleng. I was a good doctor.`, () => {
      return runPaletteTest1("POL", "ENG", "124a", [
        {
          ENG: [
            "I have been a red doctor.",
            "I was a red doctor.",
            "I had been a red doctor.",
          ],
          POL: ["Byłem czerwonym lekarzem.", "Byłam czerwoną lekarką."],
        },
        {
          ENG: [
            "We have been red doctors.",
            "We were red doctors.",
            "We had been red doctors.",
          ],
          POL: [
            "Byłyśmy czerwonymi lekarkami.",
            "Byliśmy czerwonymi lekarzami.",
          ],
        },
      ]);
    });
    it(`${testEnv}#pal25-01b GET 200 YES: Engpol. I was a good doctor.`, () => {
      return runPaletteTest1("ENG", "POL", "124a", [
        {
          ENG: ["I was a red doctor (male)."],
          POL: ["Byłem czerwonym lekarzem."],
        },
        {
          ENG: ["I was a red doctor (female)."],
          POL: ["Byłam czerwoną lekarką."],
        },
        {
          ENG: ["We were red doctors (mixed).", "We were red doctors (males)."],
          POL: ["Byliśmy czerwonymi lekarzami."],
        },
        {
          ENG: ["We were red doctors (females)."],
          POL: ["Byłyśmy czerwonymi lekarkami."],
        },
      ]);
    });
  });
});
