const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

const go = (
  questionLanguage,
  answerLanguage,
  sentenceFormulaSymbol,
  ref,
  useDummy
) => {
  return request(app)
    .get("/api/palette")
    .send({
      questionLanguage,
      answerLanguage,
      useDummy,
      sentenceFormulaSymbol,
    })
    .expect(200)
    .then((res) => {
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

  describe("/palette - Stage 23: SMPs: Special Mixed Plurals.", () => {
    it("#pal23-01a GET 200 YES: Poleng. Boys were here.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy72a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Red brother."],
              POL: ["Czerwony brat."],
            },
            {
              ENG: ["Red brothers."],
              POL: ["Czerwoni bracia."],
            },
            {
              ENG: ["Red sister."],
              POL: ["Czerwona siostra."],
            },
            {
              ENG: ["Red sisters."],
              POL: ["Czerwone siostry."],
            },
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
  });

  describe("/palette - Stage 22: Pronouns, Interrogatives.", () => {
    it("#pal22-01a GET 200 YES: Poleng. ITG_G. Who is she?", () => {
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
      return go("POL", "ENG", "dummy70a", ref, true);
    });
  });

  describe("/palette - Stage 23: Synonyms.", () => {
    it("#pal23-01a GET 200 YES: Engpol. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["Small hole."],
          POL: ["Mała dziura.", "Mały otwór."],
        },
      ];
      return go("ENG", "POL", "dummy71a", ref, true);
    });
    it("#pal23-01b GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["Small hole.", "Small pit."],
          POL: ["Mała dziura."],
        },
      ];
      return go("POL", "ENG", "dummy71a", ref, true);
    });
    it("#pal23-01c GET 200 YES: Engpol. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["In a small hole."],
          POL: ["W małej dziurze.", "W małym otworze."],
        },
      ];
      return go("ENG", "POL", "dummy71b", ref, true);
    });
    it("#pal23-01d GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["In a small hole.", "In a small pit."],
          POL: ["W małej dziurze."],
        },
      ];
      return go("POL", "ENG", "dummy71b", ref, true);
    });
    it("#pal23-01e GET 200 YES: Engpol. Sentences synonyms.", () => {
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
      return go("ENG", "POL", "dummy71c", ref, true);
    });
    it("#pal23-01f GET 200 YES: Poleng. Sentences synonyms.", () => {
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
      return go("POL", "ENG", "dummy71c", ref, true);
    });
  });

  describe("/palette - Stage 24: Gender of animals is neuter in ENG.", () => {
    it("#pal24-01a GET 200 YES: Poleng. I saw a rat, it was small.", () => {
      let ref = [
        {
          ENG: [
            "I see a rat, it was small.",
            "I see a rat, it had been small.",
            "I see a rat, it has been small.",
            "I see a rat, it was being small.",
          ],
          POL: ["Widzę szczura, był mały."],
        },
      ];
      return go("POL", "ENG", "dummy67b", ref, true);
    });
    it("#pal24-01b GET 200 YES: Engpol. I saw a rat, it was small.", () => {
      let ref = [
        {
          ENG: ["I see a rat, it was small."],
          POL: ["Widzę szczura, był mały."],
        },
      ];
      return go("ENG", "POL", "dummy67b", ref, true);
    });
  });
});
