const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const {
  traitValueTranslation,
} = require("../utils/reference/referenceTranslations");
const { generalTranslatedSentencesRef, runPaletteTest } = testingUtils;

describe("/api", function () {
  this.timeout(7000);

  gpUtils.fillOutWashburneRefObj(
    generalTranslatedSentencesRef,
    "POL->ENG",
    "ENG->POL",
    "POL",
    "ENG"
  );

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
      return runPaletteTest("POL", "ENG", "dummy70a", ref);
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
      return runPaletteTest("ENG", "POL", "dummy71a", ref);
    });
    it("#pal23-01b GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["Small hole.", "Small pit."],
          POL: ["Mała dziura."],
        },
      ];
      return runPaletteTest("POL", "ENG", "dummy71a", ref);
    });
    it("#pal23-01c GET 200 YES: Engpol. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["In a small hole."],
          POL: ["W małej dziurze.", "W małym otworze."],
        },
      ];
      return runPaletteTest("ENG", "POL", "dummy71b", ref);
    });
    it("#pal23-01d GET 200 YES: Poleng. Word synonyms, two in ENG and two in POL.", () => {
      let ref = [
        {
          ENG: ["In a small hole.", "In a small pit."],
          POL: ["W małej dziurze."],
        },
      ];
      return runPaletteTest("POL", "ENG", "dummy71b", ref);
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
      return runPaletteTest("ENG", "POL", "dummy71c", ref);
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
      return runPaletteTest("POL", "ENG", "dummy71c", ref);
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
      return runPaletteTest("POL", "ENG", "dummy67b", ref);
    });
    it("#pal24-01b GET 200 YES: Engpol. I saw a rat, it was small.", () => {
      let ref = [
        {
          ENG: ["I see a rat, it was small."],
          POL: ["Widzę szczura, był mały."],
        },
      ];
      return runPaletteTest("ENG", "POL", "dummy67b", ref);
    });
  });
});

function checkSentenceTranslations(
  res,
  questionLanguage,
  answerLanguage,
  word,
  allExpectedQuestionSentences,
  translatedSentencesRef = generalTranslatedSentencesRef
) {
  let { body } = res;
  let direction = `${questionLanguage}->${answerLanguage}`;

  if (!allExpectedQuestionSentences.length) {
    allExpectedQuestionSentences = translatedSentencesRef[word][direction].map(
      (array) => array[questionLanguage]
    );
  }

  consol.logTestOutputSolely(res.body);

  let questionSentence = body.questionSentenceArr[0];
  let { answerSentenceArr } = body;

  expect(questionSentence).to.be.a("String");

  expect(allExpectedQuestionSentences).to.include(questionSentence);

  let translations = translatedSentencesRef[word][direction];

  expect(translations.map((refItem) => refItem[questionLanguage])).to.include(
    questionSentence
  );

  translations.forEach((refItem) => {
    let { POL, ENG } = refItem;

    if (questionSentence === POL) {
      expect(answerSentenceArr).to.have.members(ENG);
      consol.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      consol.log(
        "was translated by,-'-._,-' '-._,-' '-._,-'-._,",
        answerSentenceArr
      );
    }
    if (questionSentence === ENG) {
      expect(answerSentenceArr).to.have.members(POL);
      consol.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      consol.log(
        "  was translated by`-' '-._,-' '-._,-' '-._,-'",
        answerSentenceArr
      );
    }
  });
}
