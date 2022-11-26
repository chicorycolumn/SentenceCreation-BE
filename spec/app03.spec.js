const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");

// MGN:            Multi-gender noun. Eg doctor in ENG can be either male or female.
// ProsMgn:        "My doctor and her book." Connected pronombre reveals gender of MGN. Doesn't need an annotation for doctor as clearly must be lekarka.
// EdusMgn:        "My doctor is a man."     Educator specifies MGN's gender. Sentence where educator knows that this MGN will need no clarifying.

const go = (
  questionLanguage,
  answerLanguage,
  sentenceFormulaSymbol,
  ref,
  useDummy,
  args
) => {
  return request(app)
    .get("/api/palette")
    .send({
      questionLanguage,
      answerLanguage,
      useDummy,
      sentenceFormulaSymbol,
      ...args,
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

  describe("/palette - Stage 21: Step-T: Tantum Nouns.", () => {
    it("#pal21-01a GET 200 YES: Poleng. Plurale Tantum in POL is allowed to be sing or plur in ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Czerwone drzwi."]).to.include(questionSentenceArr[0]);
          expect(answerSentenceArr).to.have.members([
            "Red door.",
            "Red doors.",
          ]);
        });
    });
    it("#pal21-01b GET 200 YES: Engpol. RSWAT for ENG sing to POL Plurale Tantum.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door singular",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Red door."]).to.include(questionSentenceArr[0]);
          expect(answerSentenceArr).to.have.members(["Czerwone drzwi."]);
        });
    });
    it("#pal21-01c GET 200 YES: Engpol. RSWAT for Engpol Plurale Tantum.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Red door.", "Red doors."]).to.includes(
            questionSentenceArr[0]
          );
          expect(answerSentenceArr).to.have.members(["Czerwone drzwi."]);
        });
    });
    it("#pal21-02a GET 200 YES: Engpol. A POL Plurale Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: "One door.",
          POL: ["Jedne drzwi."],
        },
      ];
      return go("ENG", "POL", "dummy68a", ref, true);
    });
    it("#pal21-02b GET 200 YES: Poleng. A POL Plurale Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: ["One door."],
          POL: "Jedne drzwi.",
        },
      ];
      return go("POL", "ENG", "dummy68a", ref, true);
    });
    it("#pal21-02c GET 200 YES: Engpol. A POL Plurale Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: "Two doors.",
          POL: ["Dwoje drzwi."],
        },
      ];
      return go("ENG", "POL", "dummy68b", ref, true);
    });
    it("#pal21-02d GET 200 YES: Poleng. A POL Plurale Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: ["Two doors."],
          POL: "Dwoje drzwi.",
        },
      ];
      return go("POL", "ENG", "dummy68b", ref, true);
    });
    it("#pal21-03a GET 200 YES: Engpol. An ENG Plurale Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: "Tweezers are.",
          POL: ["Pinceta jest."],
        },
      ];
      return go("ENG", "POL", "dummy68c", ref, true);
    });
    it("#pal21-03b GET 200 YES: Poleng. An ENG Plurale Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: ["Tweezers are."],
          POL: "Pinceta jest.",
        },
      ];
      return go("POL", "ENG", "dummy68c", ref, true);
    });
    it("#pal21-03c GET 200 YES: Engpol. An ENG Plurale Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: "Tweezers are.",
          POL: ["Pincety są."],
        },
      ];
      return go("ENG", "POL", "dummy68d", ref, true);
    });
    it("#pal21-03d GET 200 YES: Poleng. An ENG Plurale Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: ["Tweezers are."],
          POL: "Pincety są.",
        },
      ];
      return go("POL", "ENG", "dummy68d", ref, true);
    });
    it("#pal21-04a GET 200 YES: Engpol. An ENG Singulare Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: "Dust is.",
          POL: ["Pył jest."],
        },
      ];
      return go("ENG", "POL", "dummy68e", ref, true);
    });
    it("#pal21-04b GET 200 YES: Poleng. An ENG Singulare Tantum is actually Singular.", () => {
      let ref = [
        {
          ENG: ["Dust is."],
          POL: "Pył jest.",
        },
      ];
      return go("POL", "ENG", "dummy68e", ref, true);
    });
    it("#pal21-04c GET 200 YES: Engpol. An ENG Singulare Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: "Dust is.",
          POL: ["Pyły są."],
        },
      ];
      return go("ENG", "POL", "dummy68f", ref, true);
    });
    it("#pal21-04d GET 200 YES: Poleng. An ENG Singulare Tantum is actually Plural.", () => {
      let ref = [
        {
          ENG: ["Dust is."],
          POL: "Pyły są.",
        },
      ];
      return go("POL", "ENG", "dummy68f", ref, true);
    });
  });

  describe("/palette - Stage 20: Step-O: Omit particular traitValues from being a valid translation.", () => {
    it("#pal20-01a GET 200 YES: Engpol. 'I see a rat.'", () => {
      let ref = [
        {
          ENG: ["I can see a rat.", "I see a rat."],
          POL: ["Widzę szczura."],
        },
      ];
      return go("ENG", "POL", "dummy67a", ref, true);
    });
    it("#pal20-01c GET 200 YES: Poleng. 'I see a rat.'", () => {
      let ref = [
        {
          ENG: ["I see a rat.", "I can see a rat."],
          POL: "Widzę szczura.",
        },
      ];
      return go("POL", "ENG", "dummy67a", ref, true);
    });
  });

  describe("/palette - Stage 19: Step-L: Pronombre translation of gendered objects eg Pomidor/Cebula.", () => {
    //#pal19-00 alias #pal18-09, yes indeed   "It is red." <-> "Ono jest czerwone."
    it("#pal19-01a GET 200 YES: Engpol. 'There's a woman and I see her.'", () => {
      let ref = [
        {
          ENG: "There's a woman and I see her.",
          POL: ["Jest kobieta i widzę ją."],
        },
        {
          ENG: "There's a boy and I see him.",
          POL: ["Jest chłopiec i widzę go.", "Jest chłopiec i widzę jego."],
        },
      ];
      return go("ENG", "POL", "dummy64a", ref, true);
    });
    it("#pal19-01c GET 200 YES: Poleng. 'There's a woman and I see her.'", () => {
      let ref = [
        {
          ENG: [
            "There's a woman and I see her.",
            "There's a woman and I am seeing her.",
            "There's a lady and I see her.",
            "There's a lady and I am seeing her.",
          ],
          POL: "Jest kobieta i widzę ją.",
        },
        {
          ENG: [
            "There's a boy and I see him.",
            "There's a boy and I am seeing him.",
          ],
          POL: "Jest chłopiec i widzę go.",
        },
      ];
      return go("POL", "ENG", "dummy64a", ref, true);
    });
    it("#pal19-02a GET 200 YES: Engpol. 'There's an apple and I see it.'", () => {
      let ref = [
        {
          ENG: "There's an apple and I see it.",
          POL: ["Jest jabłko i widzę je."],
        },
        {
          ENG: "There's an onion and I see it.",
          POL: ["Jest cebula i widzę ją."],
        },
        {
          ENG: "There's a tomato and I see it.",
          POL: ["Jest pomidor i widzę go.", "Jest pomidor i widzę jego."],
        },
      ];
      return go("ENG", "POL", "dummy64b", ref, true);
    });
    it("#pal19-02c GET 200 YES: Poleng. 'There's an apple and I see it.'", () => {
      let ref = [
        {
          ENG: [
            "There's an apple and I see it.",
            "There's an apple and I am seeing it.",
          ],
          POL: "Jest jabłko i widzę je.",
        },
        {
          ENG: [
            "There's an onion and I see it.",
            "There's an onion and I am seeing it.",
          ],
          POL: "Jest cebula i widzę ją.",
        },
        {
          ENG: [
            "There's a tomato and I see it.",
            "There's a tomato and I am seeing it.",
          ],
          POL: "Jest pomidor i widzę go.",
        },
      ];
      return go("POL", "ENG", "dummy64b", ref, true);
    });
    it("#pal19-03a GET 200 YES: Engpol. 'There's a rat and I see him/her/it.'", () => {
      let ref = [
        {
          ENG: "There's a rat and I see it.",
          POL: ["Jest szczur i widzę go.", "Jest szczur i widzę jego."],
        },
      ];
      return go("ENG", "POL", "dummy65a", ref, true);
    });
    it("#pal19-03c GET 200 YES: Poleng. 'There's a rat and I see him/her/it.'", () => {
      let ref = [
        {
          ENG: [
            "There's a rat and I see it.",
            "There's a rat and I am seeing it.",
            "There's a rat and I see him.",
            "There's a rat and I am seeing him.",
            "There's a rat and I see her.",
            "There's a rat and I am seeing her.",
          ],
          POL: "Jest szczur i widzę go.",
        },
      ];
      return go("POL", "ENG", "dummy65a", ref, true);
    });
  });

  // describe.only("/palette - Stage 18C: Annotations: MGNs and metagenders - king queen", () => {
  //   it("#pal18-15a GET 200 YES: Engpol. 'The king writes.'", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "122a The king writes",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: "The king writes.",
  //             POL: ["Król pisze."],
  //           },
  //           {
  //             ENG: "The queen writes.",
  //             POL: ["Dama pisze."],
  //           },
  //           {
  //             ENG: [
  //               "The kings write.",
  //               // "The kings (mixed) write."
  //             ],
  //             POL: ["Królowie piszą."],
  //           },
  //           {
  //             ENG: "The queens write.",
  //             POL: ["Damy piszą."],
  //           },
  //           {
  //             ENG: "The king wrote.",
  //             POL: ["Król napisał."],
  //           },
  //           {
  //             ENG: "The queen wrote.",
  //             POL: ["Dama napisała."],
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               // "The kings (mixed) wrote."
  //             ],
  //             POL: ["Królowie napisali."],
  //           },
  //           {
  //             ENG: "The queens wrote.",
  //             POL: ["Damy napisały."],
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it.only("#pal18-15b GET 200 YES: Engpol. 'The king writes.' PDS", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         pleaseDontSpecify: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "122a The king writes",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: "The king writes.",
  //             POL: ["Król pisze."],
  //           },
  //           {
  //             ENG: "The kings write.",
  //             POL: ["Królowie piszą."],
  //           },
  //           {
  //             ENG: "The king wrote.",
  //             POL: ["Król napisał."],
  //           },
  //           {
  //             ENG: "The kings wrote.",
  //             POL: ["Królowie napisali."],
  //           },
  //           {
  //             ENG: "The queen writes.",
  //             POL: ["Dama pisze."],
  //           },
  //           {
  //             ENG: "The queens write.",
  //             POL: ["Damy piszą."],
  //           },
  //           {
  //             ENG: "The queen wrote.",
  //             POL: ["Dama napisała."],
  //           },
  //           {
  //             ENG: "The queens wrote.",
  //             POL: ["Damy napisały."],
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-15c GET 200 YES: Poleng. 'The king writes.'", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "122a The king writes",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The king writes.", "The king is writing."],
  //             POL: "Król pisze.",
  //           },
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Królowie piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The king wrote.",
  //               "The king has written.",
  //               "The king had written.",
  //             ],
  //             POL: "Król napisał.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Królowie napisali.",
  //           },
  //           {
  //             ENG: ["The queen writes.", "The queen is writing."],
  //             POL: "Dama pisze.",
  //           },
  //           {
  //             ENG: ["The queens write.", "The queens are writing."],
  //             POL: "Damy piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The queen wrote.",
  //               "The queen has written.",
  //               "The queen had written.",
  //             ],
  //             POL: "Dama napisał.",
  //           },
  //           {
  //             ENG: [
  //               "The queens wrote.",
  //               "The queens have written.",
  //               "The queens had written.",
  //             ],
  //             POL: "Damy napisali.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-15d GET 200 YES: Poleng. 'The king writes.' PDS", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         pleaseDontSpecify: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "122a The king writes",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The king writes.", "The king is writing."],
  //             POL: "Król pisze.",
  //           },
  //           {
  //             ENG: ["The king writes.", "The king is writing."],
  //             POL: "Dama pisze.",
  //           },
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Królowie piszą.",
  //           },
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Damy piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The king wrote.",
  //               "The king has written.",
  //               "The king had written.",
  //             ],
  //             POL: "Król napisał.",
  //           },
  //           {
  //             ENG: [
  //               "The king wrote.",
  //               "The king has written.",
  //               "The king had written.",
  //             ],
  //             POL: "Dama napisała.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Królowie napisali.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Damy napisały.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-16a GET 200 YES: Engpol. 'The king writes.' stCh specified male", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63e",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: "The king writes.",
  //             POL: ["Król pisze."],
  //           },
  //           {
  //             ENG: [
  //               "The kings write.",
  //               // "The kings (mixed) write."
  //             ],
  //             POL: ["Królowie piszą."],
  //           },
  //           {
  //             ENG: "The king wrote.",
  //             POL: ["Król napisał."],
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               // "The kings (mixed) wrote."
  //             ],
  //             POL: ["Królowie napisali."],
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-16c GET 200 YES: Poleng. 'The king writes.' stCh specified male", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63e",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The king writes.", "The king is writing."],
  //             POL: "Król pisze.",
  //           },
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Królowie piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The king wrote.",
  //               "The king has written.",
  //               "The king had written.",
  //             ],
  //             POL: "Król napisał.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Królowie napisali.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-17a GET 200 YES: Engpol. 'The king writes.' stCh specified nonvirile", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63f",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: "The queens write.",
  //             POL: ["Damy piszą."],
  //           },
  //           {
  //             ENG: "The queens wrote.",
  //             POL: ["Damy napisały."],
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-17c GET 200 YES: Poleng. 'The king writes.' stCh specified nonvirile", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63f",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Damy piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Damy napisały.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-18a GET 200 YES: Engpol. 'The king writes.' stCh specified female", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63g",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: "The queen writes.",
  //             POL: ["Dama pisze."],
  //           },
  //           {
  //             ENG: "The queens write.",
  //             POL: ["Damy piszą."],
  //           },
  //           // {
  //           //   ENG: "The kings (mixed) write.",
  //           //   POL: ["Królowie piszą."],
  //           // },
  //           {
  //             ENG: "The queen wrote.",
  //             POL: ["Dama napisała."],
  //           },
  //           {
  //             ENG: "The queens wrote.",
  //             POL: ["Damy napisały."],
  //           },
  //           // {
  //           //   ENG: "The kings (mixed) wrote.",
  //           //   POL: ["Królowie napisali."],
  //           // },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-18c GET 200 YES: Poleng. 'The king writes.' stCh specified female", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63g",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The king writes.", "The king is writing."],
  //             POL: "Dama pisze.",
  //           },
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Damy piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The king wrote.",
  //               "The king has written.",
  //               "The king had written.",
  //             ],
  //             POL: "Dama napisała.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Damy napisały.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Królowie napisali.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-19a GET 200 YES: Engpol. 'The king writes.' stCh specified virile", () => {
  //     const questionLanguage = "ENG";
  //     const answerLanguage = "POL";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63h",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: [
  //               "The kings write.",
  //               // "The kings (mixed) write."
  //             ],
  //             POL: ["Królowie piszą."],
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               // "The kings (mixed) wrote."
  //             ],
  //             POL: ["Królowie napisali."],
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  //   it("#pal18-19c GET 200 YES: Poleng. 'The king writes.' stCh specified virile", () => {
  //     const questionLanguage = "POL";
  //     const answerLanguage = "ENG";

  //     return request(app)
  //       .get("/api/palette")
  //       .send({
  //         useDummy: true,
  //         questionLanguage,
  //         answerLanguage,
  //         sentenceFormulaSymbol: "dummy63h",
  //       })
  //       .expect(200)
  //       .then((res) => {
  //         let ref = [
  //           {
  //             ENG: ["The kings write.", "The kings are writing."],
  //             POL: "Królowie piszą.",
  //           },
  //           {
  //             ENG: [
  //               "The kings wrote.",
  //               "The kings have written.",
  //               "The kings had written.",
  //             ],
  //             POL: "Królowie napisali.",
  //           },
  //         ];
  //         testingUtils.checkTranslationsOfGivenRef(
  //           res,
  //           ref,
  //           questionLanguage,
  //           answerLanguage
  //         );
  //       });
  //   });
  // });

  describe("/palette - Stage 18B: Annotations: MGNs and metagenders", () => {
    it("#pal18-10a GET 200 YES: Engpol. 'The doctor writes.'", () => {
      let ref = [
        {
          ENG: "The doctor (male) writes.",
          POL: ["Lekarz pisze."],
        },
        {
          ENG: "The doctor (female) writes.",
          POL: ["Lekarka pisze."],
        },
        {
          ENG: ["The doctors (males) write.", "The doctors (mixed) write."],
          POL: ["Lekarze piszą."],
        },
        {
          ENG: "The doctors (females) write.",
          POL: ["Lekarki piszą."],
        },
        {
          ENG: "The doctor (male) wrote.",
          POL: ["Lekarz napisał."],
        },
        {
          ENG: "The doctor (female) wrote.",
          POL: ["Lekarka napisała."],
        },
        {
          ENG: ["The doctors (males) wrote.", "The doctors (mixed) wrote."],
          POL: ["Lekarze napisali."],
        },
        {
          ENG: "The doctors (females) wrote.",
          POL: ["Lekarki napisały."],
        },
      ];
      return go("ENG", "POL", "122 The doctor writes", ref);
    });
    it("#pal18-10b GET 200 YES: Engpol. 'The doctor writes.' PDS", () => {
      let ref = [
        {
          ENG: "The doctor writes.",
          POL: ["Lekarz pisze.", "Lekarka pisze."],
        },
        {
          ENG: "The doctors write.",
          POL: ["Lekarze piszą.", "Lekarki piszą."],
        },
        {
          ENG: "The doctor wrote.",
          POL: ["Lekarz napisał.", "Lekarka napisała."],
        },
        {
          ENG: "The doctors wrote.",
          POL: ["Lekarze napisali.", "Lekarki napisały."],
        },
      ];
      return go("ENG", "POL", "122 The doctor writes", ref, false, {
        pleaseDontSpecify: true,
      });
    });
    it("#pal18-10c GET 200 YES: Poleng. 'The doctor writes.'", () => {
      let ref = [
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarz pisze.",
        },
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarka pisze.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarze piszą.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarki piszą.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarz napisał.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarka napisała.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarze napisali.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarki napisały.",
        },
      ];
      return go("POL", "ENG", "122 The doctor writes", ref);
    });
    it("#pal18-10d GET 200 YES: Poleng. 'The doctor writes.' PDS", () => {
      let ref = [
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarz pisze.",
        },
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarka pisze.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarze piszą.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarki piszą.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarz napisał.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarka napisała.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarze napisali.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarki napisały.",
        },
      ];
      return go("POL", "ENG", "122 The doctor writes", ref, false, {
        pleaseDontSpecify: true,
      });
    });
    it("#pal18-11a GET 200 YES: Engpol. 'The doctor writes.' stCh specified male", () => {
      let ref = [
        {
          ENG: "The doctor (male) writes.",
          POL: ["Lekarz pisze."],
        },
        {
          ENG: ["The doctors (males) write.", "The doctors (mixed) write."],
          POL: ["Lekarze piszą."],
        },
        {
          ENG: "The doctor (male) wrote.",
          POL: ["Lekarz napisał."],
        },
        {
          ENG: ["The doctors (males) wrote.", "The doctors (mixed) wrote."],
          POL: ["Lekarze napisali."],
        },
      ];
      return go("ENG", "POL", "dummy63a", ref, true);
    });
    it("#pal18-11c GET 200 YES: Poleng. 'The doctor writes.' stCh specified male", () => {
      let ref = [
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarz pisze.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarze piszą.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarz napisał.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarze napisali.",
        },
      ];
      return go("POL", "ENG", "dummy63a", ref, true);
    });
    it("#pal18-12a GET 200 YES: Engpol. 'The doctor writes.' stCh specified nonvirile", () => {
      let ref = [
        {
          ENG: "The doctors (females) write.",
          POL: ["Lekarki piszą."],
        },
        {
          ENG: "The doctors (females) wrote.",
          POL: ["Lekarki napisały."],
        },
      ];
      return go("ENG", "POL", "dummy63b", ref, true);
    });
    it("#pal18-12c GET 200 YES: Poleng. 'The doctor writes.' stCh specified nonvirile", () => {
      let ref = [
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarki piszą.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarki napisały.",
        },
      ];
      return go("POL", "ENG", "dummy63b", ref, true);
    });
    it("#pal18-13a GET 200 YES: Engpol. 'The doctor writes.' stCh specified female", () => {
      let ref = [
        {
          ENG: "The doctor (female) writes.",
          POL: ["Lekarka pisze."],
        },
        {
          ENG: "The doctors (females) write.",
          POL: ["Lekarki piszą."],
        },
        {
          ENG: "The doctors (mixed) write.",
          POL: ["Lekarze piszą."],
        },
        {
          ENG: "The doctor (female) wrote.",
          POL: ["Lekarka napisała."],
        },
        {
          ENG: "The doctors (females) wrote.",
          POL: ["Lekarki napisały."],
        },
        {
          ENG: "The doctors (mixed) wrote.",
          POL: ["Lekarze napisali."],
        },
      ];
      return go("ENG", "POL", "dummy63c", ref, true);
    });
    it("#pal18-13c GET 200 YES: Poleng. 'The doctor writes.' stCh specified female", () => {
      let ref = [
        {
          ENG: ["The doctor writes.", "The doctor is writing."],
          POL: "Lekarka pisze.",
        },
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarki piszą.",
        },
        {
          ENG: [
            "The doctor wrote.",
            "The doctor has written.",
            "The doctor had written.",
          ],
          POL: "Lekarka napisała.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarki napisały.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarze napisali.",
        },
      ];
      return go("POL", "ENG", "dummy63c", ref, true);
    });
    it("#pal18-14a GET 200 YES: Engpol. 'The doctor writes.' stCh specified virile", () => {
      let ref = [
        {
          ENG: ["The doctors (males) write.", "The doctors (mixed) write."],
          POL: ["Lekarze piszą."],
        },
        {
          ENG: ["The doctors (males) wrote.", "The doctors (mixed) wrote."],
          POL: ["Lekarze napisali."],
        },
      ];
      return go("ENG", "POL", "dummy63d", ref, true);
    });
    it("#pal18-14c GET 200 YES: Poleng. 'The doctor writes.' stCh specified virile", () => {
      let ref = [
        {
          ENG: ["The doctors write.", "The doctors are writing."],
          POL: "Lekarze piszą.",
        },
        {
          ENG: [
            "The doctors wrote.",
            "The doctors have written.",
            "The doctors had written.",
          ],
          POL: "Lekarze napisali.",
        },
      ];
      return go("POL", "ENG", "dummy63d", ref, true);
    });
  });

  describe("/palette - Stage 18A: Annotations: Miscellaneous", () => {
    it("#pal18-01a GET 200 YES: Engpol. 'she reads' tenseDesc anno should be removed by conditionsOnWhichToBlockAnnotations.", () => {
      //Originally failed as removeAnnotationsByCounterfax lets tenseDesc annos through, would be too many alternate values to check.
      //So this situation, where the anno should be kept, is hardcoded in refObj conditionsOnWhichToBlockAnnotations.
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "She reads.",
              POL: ["Czyta.", "Ona czyta."],
            },
            {
              ENG: "He reads.",
              POL: ["Czyta.", "On czyta."],
            },
            {
              ENG: "It reads.",
              POL: ["Czyta.", "Ono czyta."],
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
    it("#pal18-01b GET 200 YES: Poleng annotations. 'she reads' tenseDesc anno should be kept via skeleton. Relates to ACX2?", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["She reads.", "She is reading."],
              POL: "Czyta (female).",
            },
            {
              ENG: ["He reads.", "He is reading."],
              POL: "Czyta (male).",
            },
            {
              ENG: ["It reads.", "It is reading."],
              POL: "Czyta (neuter).",
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
    it("#pal18-01c GET 200 YES: Poleng PDS. 'she reads'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "She reads.",
                "He reads.",
                "It reads.",
                "She is reading.",
                "He is reading.",
                "It is reading.",
              ],
              POL: "Czyta.",
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
    it("#pal18-02a GET 200 YES: Engpol. 'she writes'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "She writes.",
              POL: ["Pisze.", "Ona pisze."],
            },
            {
              ENG: "He writes.",
              POL: ["Pisze.", "On pisze."],
            },
            {
              ENG: "It writes.",
              POL: ["Pisze.", "Ono pisze."],
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
    it("#pal18-02b GET 200 YES: Poleng annotations. 'she writes'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["She writes.", "She is writing."],
              POL: "Pisze (female).",
            },
            {
              ENG: ["He writes.", "He is writing."],
              POL: "Pisze (male).",
            },
            {
              ENG: ["It writes.", "It is writing."],
              POL: "Pisze (neuter).",
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
    it("#pal18-02c GET 200 YES: Poleng PDS. 'she writes'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy61a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "She writes.",
                "He writes.",
                "It writes.",
                "She is writing.",
                "He is writing.",
                "It is writing.",
              ],
              POL: "Pisze.",
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
    it("#pal18-03a GET 200 YES: Engpol. Sentence with 'sheep' should not be disrupted by PDS.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55c",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "With the sheep.",
              POL: ["Z owcą.", "Z owcami."],
            },
            {
              ENG: "With a sheep.",
              POL: ["Z owcą."],
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
    it("#pal18-04a GET 200 YES: Engpol. 'A woman saw me.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "119 Woman saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["The woman saw me.", "A woman saw me."],
              POL: ["Kobieta mnie zobaczyła."],
            },
            {
              ENG: ["The women saw me.", "Women saw me."],
              POL: ["Kobiety mnie zobaczyły."],
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
    it("#pal18-04b GET 200 YES: Poleng. 'A woman saw me.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "119 Woman saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The woman saw me.",
                "The woman had seen me.",
                "The woman has seen me.",
                "A woman saw me.",
                "A woman had seen me.",
                "A woman has seen me.",
                "The lady saw me.",
                "The lady had seen me.",
                "The lady has seen me.",
                "A lady saw me.",
                "A lady had seen me.",
                "A lady has seen me.",
              ],
              POL: "Kobieta mnie zobaczyła.",
            },
            {
              ENG: [
                "The women saw me.",
                "The women had seen me.",
                "The women have seen me.",
                "Women saw me.",
                "Women had seen me.",
                "Women have seen me.",
                "The ladies saw me.",
                "The ladies had seen me.",
                "The ladies have seen me.",
                "Ladies saw me.",
                "Ladies had seen me.",
                "Ladies have seen me.",
              ],
              POL: "Kobiety mnie zobaczyły.",
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
    it("#pal18-05a GET 200 YES: Engpol. 'We see them.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We see them (males).", "We see them (mixed)."],
              POL: [
                "Widzimy ich.",
                "Ich widzimy.",
                "My ich widzimy.",
                "My widzimy ich.",
              ],
            },
            {
              ENG: "We see them (females).",
              POL: [
                "Widzimy je.",
                "Je widzimy.",
                "My je widzimy.",
                "My widzimy je.",
              ],
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
    it("#pal18-05b GET 200 YES: Engpol. 'We see them.' PDS", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "We see them.",
              POL: [
                "Widzimy je.",
                "Je widzimy.",
                "My je widzimy.",
                "My widzimy je.",
                "Widzimy ich.",
                "Ich widzimy.",
                "My ich widzimy.",
                "My widzimy ich.",
              ],
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
    it("#pal18-05c GET 200 YES: Poleng. 'We see them.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We see them.", "We are seeing them."],
              POL: ["Widzimy ich.", "Widzimy je."],
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
    it("#pal18-05d GET 200 YES: Poleng. 'We see them.' PDS should have no effect.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We see them.", "We are seeing them."],
              POL: ["Widzimy ich.", "Widzimy je."],
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
    it("#pal18-06a GET 200 YES: Engpol. 'We saw them.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "We (males) saw them (males).",
                "We (males) saw them (mixed).",
                "We (mixed) saw them (males).",
                "We (mixed) saw them (mixed).",
              ],
              POL: [
                "Zobaczyliśmy ich.",
                "Ich zobaczyliśmy.",
                "My ich zobaczyliśmy.",
                "My zobaczyliśmy ich.",
              ],
            },
            {
              ENG: "We (females) saw them (females).",
              POL: [
                "Zobaczyłyśmy je.",
                "Je zobaczyłyśmy.",
                "My je zobaczyłyśmy.",
                "My zobaczyłyśmy je.",
              ],
            },
            {
              ENG: [
                "We (males) saw them (females).",
                "We (mixed) saw them (females).",
              ],
              POL: [
                "Zobaczyliśmy je.",
                "Je zobaczyliśmy.",
                "My je zobaczyliśmy.",
                "My zobaczyliśmy je.",
              ],
            },
            {
              ENG: [
                "We (females) saw them (mixed).",
                "We (females) saw them (males).",
              ],
              POL: [
                "Zobaczyłyśmy ich.",
                "Ich zobaczyłyśmy.",
                "My ich zobaczyłyśmy.",
                "My zobaczyłyśmy ich.",
              ],
            },
            /////////////////////
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal18-06b GET 200 YES: Engpol. 'We saw them.' PDS. *Step-Iota re PDS Diamond*", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "We saw them.",
              POL: [
                /////////M-M
                "Zobaczyliśmy ich.",
                "My zobaczyliśmy ich.",
                "My ich zobaczyliśmy.",
                "Ich zobaczyliśmy.",
                /////////F-F
                "Zobaczyłyśmy je.",
                "My zobaczyłyśmy je.",
                "My je zobaczyłyśmy.",
                "Je zobaczyłyśmy.",
                /////////F-M
                "Zobaczyłyśmy ich.",
                "My zobaczyłyśmy ich.",
                "My ich zobaczyłyśmy.",
                "Ich zobaczyłyśmy.",
                /////////M-F
                "Zobaczyliśmy je.",
                "My zobaczyliśmy je.",
                "My je zobaczyliśmy.",
                "Je zobaczyliśmy.",
              ],
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
    it("#pal18-06c GET 200 YES: Poleng. 'We saw them.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: [
                "Zobaczyliśmy ich.",
                "Zobaczyłyśmy ich.",
                "Zobaczyliśmy je.",
                "Zobaczyłyśmy je.",
              ],
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
    it("#pal18-06d GET 200 YES: Poleng. 'We see them.' PDS should have no effect.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy62a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: [
                "Zobaczyliśmy ich.",
                "Zobaczyłyśmy ich.",
                "Zobaczyliśmy je.",
                "Zobaczyłyśmy je.",
              ],
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
    it("#pal18-07a GET 200 YES: Engpol. 'A doctor saw me.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "120 Doctor saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["The doctor (female) saw me.", "A doctor (female) saw me."],
              POL: ["Lekarka mnie zobaczyła."],
            },
            {
              ENG: ["The doctor (male) saw me.", "A doctor (male) saw me."],
              POL: ["Lekarz mnie zobaczył."],
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
    it("#pal18-07b GET 200 YES: Engpol. 'A doctor saw me. PDS'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "120 Doctor saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["The doctor saw me.", "A doctor saw me."],
              POL: ["Lekarka mnie zobaczyła.", "Lekarz mnie zobaczył."],
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
    it("#pal18-07c GET 200 YES: Poleng. 'A doctor saw me.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "120 Doctor saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The doctor saw me.",
                "The doctor had seen me.",
                "The doctor has seen me.",
                "A doctor saw me.",
                "A doctor had seen me.",
                "A doctor has seen me.",
              ],
              POL: ["Lekarka mnie zobaczyła.", "Lekarz mnie zobaczył."],
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
    it("#pal18-07d GET 200 YES: Poleng. 'A doctor saw me.' PDS", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "120 Doctor saw me",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The doctor saw me.",
                "The doctor had seen me.",
                "The doctor has seen me.",
                "A doctor saw me.",
                "A doctor had seen me.",
                "A doctor has seen me.",
              ],
              POL: ["Lekarka mnie zobaczyła.", "Lekarz mnie zobaczył."],
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
    it("#pal18-08a GET 200 YES: Engpol. 'I read* a book.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "121 I read* a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I read (present) a book.", "I am reading a book."],
              POL: ["Czytam książkę."],
            },
            {
              ENG: "I will read a book.",
              POL: ["Przeczytam książkę."],
            },
            //
            {
              ENG: "I (male) read (past) a book.",
              POL: ["Przeczytałem książkę."],
            },
            {
              ENG: "I (male) will be reading a book.",
              POL: ["Będę czytał książkę.", "Będę czytać książkę."],
            },
            {
              ENG: "I (male) was reading a book.",
              POL: ["Czytałem książkę."],
            },
            //
            {
              ENG: "I (female) read (past) a book.",
              POL: ["Przeczytałam książkę."],
            },
            {
              ENG: "I (female) will be reading a book.",
              POL: ["Będę czytała książkę.", "Będę czytać książkę."],
            },
            {
              ENG: "I (female) was reading a book.",
              POL: ["Czytałam książkę."],
            },
            //
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal18-08b GET 200 YES: Engpol. 'I read* a book.' PDS", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "121 I read* a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I am reading a book.", "I read (present) a book."],
              POL: ["Czytam książkę."],
            },
            {
              ENG: "I will read a book.",
              POL: ["Przeczytam książkę."],
            },
            //
            {
              ENG: "I read (past) a book.",
              POL: ["Przeczytałem książkę.", "Przeczytałam książkę."],
            },
            {
              ENG: "I will be reading a book.",
              POL: [
                "Będę czytał książkę.",
                "Będę czytała książkę.",
                "Będę czytać książkę.",
              ],
            },
            {
              ENG: "I was reading a book.",
              POL: ["Czytałem książkę.", "Czytałam książkę."],
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
    it("#pal18-08c GET 200 YES: Poleng. 'I read* a book.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "121 I read* a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I read a book.", "I am reading a book."],
              POL: "Czytam książkę.",
            },
            {
              ENG: [
                "I will read a book.",
                "I am going to read a book.",
                "I will have read a book.",
              ],
              POL: "Przeczytam książkę.",
            },
            //
            {
              ENG: [
                "I read a book.",
                "I have read a book.",
                "I had read a book.",
              ],
              POL: "Przeczytałem książkę.",
            },
            {
              ENG: [
                "I read a book.",
                "I have read a book.",
                "I had read a book.",
              ],
              POL: "Przeczytałam książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytał książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytała książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytać książkę.",
            },
            {
              ENG: ["I was reading a book.", "I have read a book."],
              POL: "Czytałem książkę.",
            },
            {
              ENG: ["I was reading a book.", "I have read a book."],
              POL: "Czytałam książkę.",
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
    it("#pal18-08d GET 200 YES: Poleng. 'I read* a book.' PDS", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "121 I read* a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I read a book.", "I am reading a book."],
              POL: "Czytam książkę.",
            },
            {
              ENG: [
                "I will read a book.",
                "I am going to read a book.",
                "I will have read a book.",
              ],
              POL: "Przeczytam książkę.",
            },
            //
            {
              ENG: [
                "I read a book.",
                "I have read a book.",
                "I had read a book.",
              ],
              POL: "Przeczytałem książkę.",
            },
            {
              ENG: [
                "I read a book.",
                "I have read a book.",
                "I had read a book.",
              ],
              POL: "Przeczytałam książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytał książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytała książkę.",
            },
            {
              ENG: [
                "I will be reading a book.",
                "I am going to be reading a book.",
              ],
              POL: "Będę czytać książkę.",
            },
            {
              ENG: ["I was reading a book.", "I have read a book."],
              POL: "Czytałem książkę.",
            },
            {
              ENG: ["I was reading a book.", "I have read a book."],
              POL: "Czytałam książkę.",
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
    it("#pal18-09a GET 200 YES: Engpol. 'They are red.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "123 I am red",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "He is red.",
              POL: ["Jest czerwony.", "On jest czerwony."],
            },
            {
              ENG: "She is red.",
              POL: ["Jest czerwona.", "Ona jest czerwona."],
            },
            {
              ENG: "It is red.",
              POL: ["Jest czerwone.", "Ono jest czerwone."],
            },
            {
              ENG: ["They (mixed) are red.", "They (males) are red."],
              POL: ["Są czerwoni.", "Oni są czerwoni."],
            },
            {
              ENG: "They (females) are red.",
              POL: ["Są czerwone.", "One są czerwone."],
            },
            //Now technically, you'd need this. Because "koty" are masculine (m2) but that's "one" not "oni",
            //ie only m1 plural (and groups containing m1) are virile.
            //But practically, you can just teach this to the player in lesson text, rather than testing that
            //nitty gritty here. Because the real sentences encountered will be like, "Cats are black." "Kote są czarne."
            //so that plural-m2-is-nonvirile is taught there. You don't need to worry about it for single contextless
            //barebones sentence like this one.
            // {
            //   ENG: "They (non-persons) are red.",
            //   POL: ["Są czerwone.", "One są czerwone."],
            // },
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal18-09b GET 200 YES: Engpol. 'They are red.' PDS", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "123 I am red",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "He is red.",
              POL: ["Jest czerwony.", "On jest czerwony."],
            },
            {
              ENG: "She is red.",
              POL: ["Jest czerwona.", "Ona jest czerwona."],
            },
            {
              ENG: "It is red.",
              POL: ["Jest czerwone.", "Ono jest czerwone."],
            },
            {
              ENG: "They are red.",
              POL: [
                "Są czerwoni.",
                "Oni są czerwoni.",
                "Są czerwone.",
                "One są czerwone.",
              ],
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
    it("#pal18-09c GET 200 YES: Poleng. 'They are red.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "123 I am red",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["He is red.", "He is being red."],
              POL: "Jest czerwony.",
            },
            {
              ENG: ["She is red.", "She is being red."],
              POL: "Jest czerwona.",
            },
            {
              ENG: ["It is red.", "It is being red."],
              POL: "Jest czerwone.",
            },
            {
              ENG: ["They are red.", "They are being red."],
              POL: "Są czerwoni.",
            },
            {
              ENG: ["They are red.", "They are being red."],
              POL: "Są czerwone.",
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
    it("#pal18-09d GET 200 YES: Poleng. 'They are red.' PDS", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "123 I am red",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["He is red.", "He is being red."],
              POL: "Jest czerwony.",
            },
            {
              ENG: ["She is red.", "She is being red."],
              POL: "Jest czerwona.",
            },
            {
              ENG: ["It is red.", "It is being red."],
              POL: "Jest czerwone.",
            },
            {
              ENG: ["They are red.", "They are being red."],
              POL: "Są czerwoni.",
            },
            {
              ENG: ["They are red.", "They are being red."],
              POL: "Są czerwone.",
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
    it("#pal18-09w GET 200 YES: Engpol. 'Rats are red.' Pluralised m2 should be nonvirile", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy66",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Rats are red.",
              POL: ["Szczury są czerwone."],
            },
            {
              ENG: "Boys are red.",
              POL: ["Chłopcy są czerwoni."],
            },
            {
              ENG: "Women are red.",
              POL: ["Kobiety są czerwone."],
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
    it("#pal18-09y GET 200 YES: Poleng. 'Rats are red.' Pluralised m2 should be nonvirile", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy66",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Rats are red.", "Rats are being red."],
              POL: "Szczury są czerwone.",
            },
            {
              ENG: ["Boys are red.", "Boys are being red."],
              POL: "Chłopcy są czerwoni.",
            },
            {
              ENG: ["Women are red.", "Women are being red."],
              POL: "Kobiety są czerwone.",
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

  describe("/palette - Stage 17D: Possessive pronombres and MGNs. MGN to agree with pronombre.", () => {
    it("#pal17-10a GET 200 YES: Engpol. I was here. Testing annotations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117b I was here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) was here.",
              POL: ["Byłem tutaj."],
            },
            {
              ENG: "I (female) was here.",
              POL: ["Byłam tutaj."],
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
    it("#pal17-10b GET 200 YES: Engpol. I was here. Testing annotations. pleaseDontSpecify", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117b I was here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I was here.",
              POL: ["Byłem tutaj.", "Byłam tutaj."],
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
    it("#pal17-10c GET 200 YES: Poleng. I was here. Testing annotations.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117b I was here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was here.",
                "I had been here.",
                "I have been here.",
                "I was being here.",
              ],
              POL: ["Byłem tutaj.", "Byłam tutaj."],
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
    it("#pal17-10d GET 200 YES: Poleng. I was here. Testing annotations. pleaseDontSpecify but with no effect expected.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117b I was here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was here.",
                "I had been here.",
                "I have been here.",
                "I was being here.",
              ],
              POL: ["Byłem tutaj.", "Byłam tutaj."],
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
    it("#pal17-10e GET 200 YES: Engpol. I am here. Testing annotations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117c I am here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I am here.",
              POL: ["Jestem tutaj."],
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
    it("#pal17-10f GET 200 YES: Engpol. I am here. Testing annotations. pleaseDontSpecify", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117c I am here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I am here.",
              POL: ["Jestem tutaj."],
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
    it("#pal17-10g GET 200 YES: Poleng. I am here. Testing annotations.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117c I am here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I am here.", "I am being here."],
              POL: "Jestem tutaj.",
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
    it("#pal17-10h GET 200 YES: Poleng. I am here. Testing annotations. pleaseDontSpecify but with no effect expected.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117c I am here",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I am here.", "I am being here."],
              POL: "Jestem tutaj.",
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
    it("#pal17-11a GET 200 YES: Engpol. I was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117 I was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) was a doctor.",
              POL: ["Byłem lekarzem."],
            },
            {
              ENG: "I (female) was a doctor.",
              POL: ["Byłam lekarką."],
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
    it("#pal17-11b GET 200 YES: Engpol. I was a doctor. MGN to agree with pronombre. pleaseDontSpecify", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117 I was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I was a doctor.",
              POL: ["Byłam lekarką.", "Byłem lekarzem."],
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
    it("#pal17-11c GET 200 YES: Poleng. I was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117 I was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: ["Byłem lekarzem.", "Byłam lekarką."],
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
    it("#pal17-11d GET 200 YES: Poleng. I was a doctor. MGN to agree with pronombre. pleaseDontSpecify but with no effect expected.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117 I was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: ["Byłem lekarzem.", "Byłam lekarką."],
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
    it("#pal17-11e GET 200 YES: Engpol. I* was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117a I* was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) was a doctor.",
              POL: ["Byłem lekarzem."],
            },
            {
              ENG: "I (female) was a doctor.",
              POL: ["Byłam lekarką."],
            },
            {
              ENG: "We (females) were doctors.",
              POL: ["Byłyśmy lekarkami."],
            },
            {
              ENG: ["We (males) were doctors.", "We (mixed) were doctors."],
              POL: ["Byliśmy lekarzami."],
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
    it("#pal17-11f GET 200 YES: Engpol. I* was a doctor. MGN to agree with pronombre. pleaseDontSpecify", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117a I* was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I was a doctor.",
              POL: ["Byłem lekarzem.", "Byłam lekarką."],
            },
            {
              ENG: "We were doctors.",
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    it("#pal17-11g GET 200 YES: Poleng. I* was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117a I* was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłem lekarzem.",
            },
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłam lekarką.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    it("#pal17-11h GET 200 YES: Poleng. I* was a doctor. MGN to agree with pronombre. pleaseDontSpecify but with no effect expected.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117a I* was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłem lekarzem.",
            },
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłam lekarką.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    it("#pal17-11i GET 200 YES: Engpol. I** was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117aa I** was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) was a doctor.",
              POL: ["Byłem lekarzem."],
            },
            {
              ENG: "I (female) was a doctor.",
              POL: ["Byłam lekarką."],
            },
            {
              ENG: "We (females) were doctors.",
              POL: ["Byłyśmy lekarkami."],
            },
            {
              ENG: ["We (mixed) were doctors.", "We (males) were doctors."],
              POL: ["Byliśmy lekarzami."],
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
    it("#pal17-11j GET 200 YES: Engpol. I** was a doctor. MGN to agree with pronombre. pleaseDontSpecify", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117aa I** was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I was a doctor.",
              POL: ["Byłem lekarzem.", "Byłam lekarką."],
            },
            {
              ENG: "We were doctors.",
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    it("#pal17-11k GET 200 YES: Poleng. I** was a doctor. MGN to agree with pronombre.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117aa I** was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłem lekarzem.",
            },
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłam lekarką.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    it("#pal17-11l GET 200 YES: Poleng. I** was a doctor. MGN to agree with pronombre. pleaseDontSpecify but with no effect expected.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "117aa I** was a doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłem lekarzem.",
            },
            {
              ENG: [
                "I was a doctor.",
                "I had been a doctor.",
                "I have been a doctor.",
                "I was being a doctor.",
              ],
              POL: "Byłam lekarką.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: ["Byłyśmy lekarkami.", "Byliśmy lekarzami."],
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
    //Add "The doctor was here." sentence with tests.
  });

  describe("/palette - Stage 17C: Possessive pronombres and MGNs. EdusMgn", () => {
    it("#pal17-07a GET 200 YES: Engpol. Hard-specify an MGN's gender (EdusMgn dummy run).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58a doctor f",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Doctor.",
              POL: ["Lekarka."],
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
    it("#pal17-07b GET 200 YES: Poleng. Hard-specify an MGN's gender (EdusMgn dummy run).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58a doctor f",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Doctor."],
              POL: "Lekarka.",
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
    it("#pal17-08y GET 200 YES: Engpol. pleaseDontSpecify shouldn't override sentenceStructure that wants f solely. And further, we need an annotation, so PDS should be ignored here also.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true, //Should be ignored.
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116y My doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor (female).",
              POL: ["Moja lekarka."],
            },
            {
              ENG: "My doctor (male).",
              POL: ["Moja lekarz."],
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
    it("#pal17-08x GET 200 YES: Engpol. pleaseDontSpecify shouldn't override sentenceStructure that wants f solely.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116x My doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor was a woman.",
              POL: ["Moja lekarka była kobietą."],
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
    it("#pal17-08a GET 200 YES: Engpol. No annotations as EdusMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116 My doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor was a woman.",
              POL: ["Moja lekarka była kobietą."],
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
    it("#pal17-08b GET 200 YES: Engpol. pleaseDontSpecify but no annotations anyway as EdusMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116 My doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor was a woman.",
              POL: ["Moja lekarka była kobietą."],
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
    it("#pal17-08c GET 200 YES: Poleng. No annotations anyway, aside from this being EdusMgn.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116 My doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "My doctor was a woman.",
                "My doctor had been a woman.",
                "My doctor has been a woman.",
                "My doctor was being a woman.",
                "My doctor was a lady.",
                "My doctor had been a lady.",
                "My doctor has been a lady.",
                "My doctor was being a lady.",
              ],
              POL: "Moja lekarka była kobietą.",
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
    it("#pal17-08d GET 200 YES: Poleng. pleaseDontSpecify but no annotations anyway, aside from this being EdusMgn.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116 My doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "My doctor was a woman.",
                "My doctor had been a woman.",
                "My doctor has been a woman.",
                "My doctor was being a woman.",
                "My doctor was a lady.",
                "My doctor had been a lady.",
                "My doctor has been a lady.",
                "My doctor was being a lady.",
              ],
              POL: "Moja lekarka była kobietą.",
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
    it("#pal17-09a GET 200 YES: Engpol. One annotation absent as EdusMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116a My doctor's doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor's (male) doctor was a woman.",
              POL: ["Lekarka mojego lekarza była kobietą."],
            },
            {
              ENG: "My doctor's (female) doctor was a woman.",
              POL: ["Lekarka mojej lekarki była kobietą."],
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
    it("#pal17-09b GET 200 YES: Engpol. pleaseDontSpecify. EdusMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116a My doctor's doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor's doctor was a woman.",
              POL: [
                "Lekarka mojego lekarza była kobietą.",
                "Lekarka mojej lekarki była kobietą.",
              ],
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
    it("#pal17-09c GET 200 YES: Poleng. No annotations anyway, aside from this being EdusMgn.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116a My doctor's doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "My doctor's doctor was a woman.",
                "My doctor's doctor had been a woman.",
                "My doctor's doctor has been a woman.",
                "My doctor's doctor was being a woman.",
              ],
              POL: [
                "Lekarka mojego lekarza była kobietą.",
                "Lekarka mojej lekarki była kobietą.",
              ],
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
    it("#pal17-09d GET 200 YES: Poleng. pleaseDontSpecify but no annotations anyway, aside from this being EdusMgn.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "116a My doctor's doctor was a woman",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "My doctor's doctor was a woman.",
                "My doctor's doctor had been a woman.",
                "My doctor's doctor has been a woman.",
                "My doctor's doctor was being a woman.",
              ],
              POL: [
                "Lekarka mojego lekarza była kobietą.",
                "Lekarka mojej lekarki była kobietą.",
              ],
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

  describe("/palette - Stage 17B: Possessive pronombres and MGNs. PP below MGN. ProsMgn.", () => {
    it("#pal17-04b GET 200 YES: Engpol. Sentence with 2 of same MGN. Some annotations expected. But eventually, this should succeed, as ProsMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) saw my doctor and his doctor (male).",
              POL: ["Zobaczyłem mojego lekarza i jego lekarza."],
            },
            {
              ENG: "I (female) saw my doctor and his doctor (male).",
              POL: ["Zobaczyłam mojego lekarza i jego lekarza."],
            },
            //
            {
              ENG: "I (male) saw my doctor and his doctor (female).",
              POL: ["Zobaczyłem mojego lekarza i jego lekarkę."],
            },
            {
              ENG: "I (female) saw my doctor and his doctor (female).",
              POL: ["Zobaczyłam mojego lekarza i jego lekarkę."],
            },
            //
            {
              ENG: "I (male) saw my doctor and her doctor (male).",
              POL: ["Zobaczyłem moją lekarkę i jej lekarza."],
            },
            {
              ENG: "I (female) saw my doctor and her doctor (male).",
              POL: ["Zobaczyłam moją lekarkę i jej lekarza."],
            },
            //
            {
              ENG: "I (male) saw my doctor and her doctor (female).",
              POL: ["Zobaczyłem moją lekarkę i jej lekarkę."],
            },
            {
              ENG: "I (female) saw my doctor and her doctor (female).",
              POL: ["Zobaczyłam moją lekarkę i jej lekarkę."],
            },
            //
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal17-04c GET 200 YES: Engpol. Sentence with 2 of same MGN. pleaseDontSpecify should be blocked for ProsMgn MGN but not for other MGN. This tests the change where pleaseDontSpecify is done per stCh and not as a broader variable.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I saw my doctor and his doctor.",
              POL: [
                "Zobaczyłem mojego lekarza i jego lekarza.",
                "Zobaczyłem mojego lekarza i jego lekarkę.",
                "Zobaczyłam mojego lekarza i jego lekarza.",
                "Zobaczyłam mojego lekarza i jego lekarkę.",
              ],
            },
            {
              ENG: "I saw my doctor and her doctor.",
              POL: [
                "Zobaczyłem moją lekarkę i jej lekarza.",
                "Zobaczyłem moją lekarkę i jej lekarkę.",
                "Zobaczyłam moją lekarkę i jej lekarza.",
                "Zobaczyłam moją lekarkę i jej lekarkę.",
              ],
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
    it("#pal17-04d GET 200 YES: Poleng. Sentence with 2 of same MGN. Annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: [
                "Zobaczyłem mojego lekarza i jego lekarza.",
                "Zobaczyłam mojego lekarza i jego lekarkę.",
                "Zobaczyłem mojego lekarza i jego lekarkę.",
                "Zobaczyłam mojego lekarza i jego lekarza.",
              ],
            },

            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: [
                "Zobaczyłam moją lekarkę i jej lekarkę.",
                "Zobaczyłem moją lekarkę i jej lekarkę.",
                "Zobaczyłam moją lekarkę i jej lekarza.",
                "Zobaczyłem moją lekarkę i jej lekarza.",
              ],
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
    it("#pal17-04e GET 200 YES: Poleng. Sentence with 2 of same MGN. pleaseDontSpecify but annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "115 I saw my doctor and her doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: [
                "Zobaczyłem mojego lekarza i jego lekarza.",
                "Zobaczyłam mojego lekarza i jego lekarkę.",
                "Zobaczyłem mojego lekarza i jego lekarkę.",
                "Zobaczyłam mojego lekarza i jego lekarza.",
              ],
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: [
                "Zobaczyłam moją lekarkę i jej lekarkę.",
                "Zobaczyłem moją lekarkę i jej lekarkę.",
                "Zobaczyłam moją lekarkę i jej lekarza.",
                "Zobaczyłem moją lekarkę i jej lekarza.",
              ],
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
    it("#pal17-05a GET 200 YES: Engpol. Possessive pronombre below MGN. No annotation as ProsMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118 My doctor and his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor and his book.",
              POL: ["Mój lekarz i jego książka."],
            },
            {
              ENG: "My doctor and her book.",
              POL: ["Moja lekarka i jej książka."],
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
    it("#pal17-05b GET 200 YES: Engpol. Possessive pronombre below MGN. pleaseDontSpecify should be BLOCKED for ProsMgn MGN.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118 My doctor and his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor and his book.",
              POL: ["Mój lekarz i jego książka."],
            },
            {
              ENG: "My doctor and her book.",
              POL: ["Moja lekarka i jej książka."],
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
    it("#pal17-05c GET 200 YES: Poleng. Possessive pronombre below MGN. Annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118 My doctor and his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor and his book."],
              POL: "Mój lekarz i jego książka.",
            },
            {
              ENG: ["My doctor and her book."],
              POL: "Moja lekarka i jej książka.",
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
    it("#pal17-05d GET 200 YES: Poleng. Possessive pronombre below MGN. pleaseDontSpecify but annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118 My doctor and his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor and his book."],
              POL: "Mój lekarz i jego książka.",
            },
            {
              ENG: ["My doctor and her book."],
              POL: "Moja lekarka i jej książka.",
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
    it("#pal17-06a GET 200 YES: Engpol. Annotation expected as this isn't actually a ProsMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118a My doctor and my book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor (male) and my book.",
              POL: ["Mój lekarz i moja książka."],
            },
            {
              ENG: "My doctor (female) and my book.",
              POL: ["Moja lekarka i moja książka."],
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
    it("#pal17-06b GET 200 YES: Engpol. pleaseDontSpecify.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118a My doctor and my book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor and my book.",
              POL: [
                "Mój lekarz i moja książka.",
                "Moja lekarka i moja książka.",
              ],
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
    it("#pal17-06c GET 200 YES: Poleng. Annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118a My doctor and my book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor and my book."],
              POL: [
                "Mój lekarz i moja książka.",
                "Moja lekarka i moja książka.",
              ],
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
    it("#pal17-06c GET 200 YES: Poleng. pleaseDontSpecify but annotations wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118a My doctor and my book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor and my book."],
              POL: [
                "Mój lekarz i moja książka.",
                "Moja lekarka i moja książka.",
              ],
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

  describe("/palette - Stage 17A: Possessive pronombres and MGNs. Pre-testing.", () => {
    it("#pal17-01a GET 200 YES: Engpol. MGN as sole word, annotation expected.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58 doctor",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Doctor (female).",
              POL: ["Lekarka."],
            },
            {
              ENG: "Doctor (male).",
              POL: ["Lekarz."],
            },
            {
              ENG: "Doctors (females).",
              POL: ["Lekarki."],
            },
            {
              ENG: ["Doctors (males).", "Doctors (mixed)."],
              POL: ["Lekarze."],
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
    it("#pal17-01b GET 200 YES: Engpol. MGN as sole word, pleaseDontSpecify.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58 doctor",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Doctor.",
              POL: ["Lekarka.", "Lekarz."],
            },
            {
              ENG: "Doctors.",
              POL: ["Lekarki.", "Lekarze."],
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
    it("#pal17-01c GET 200 YES: Poleng. MGN as sole word, annotation wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58 doctor",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Doctor."],
              POL: ["Lekarka.", "Lekarz."],
            },
            {
              ENG: ["Doctors."],
              POL: ["Lekarki.", "Lekarze."],
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
    it("#pal17-01d GET 200 YES: Poleng. MGN as sole word, pleaseDontSpecify but annotation wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy58 doctor",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Doctor."],
              POL: ["Lekarka.", "Lekarz."],
            },
            {
              ENG: ["Doctors."],
              POL: ["Lekarki.", "Lekarze."],
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
    it("#pal17-02a GET 200 YES: Engpol. Simple possessive pronombre sentence. Should not be broken by pleaseDontSpecify.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118c My onion",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My onion.",
              POL: ["Moja cebula."],
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
    it("#pal17-02b GET 200 YES: Poleng. Simple possessive pronombre sentence. Should not be broken by pleaseDontSpecify.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118c My onion",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My onion."],
              POL: "Moja cebula.",
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
    it("#pal17-03a GET 200 YES: Engpol. Possessive pronombre above MGN. Annotation expected as this isn't actually a ProsMgn.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118b My doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor (male).",
              POL: ["Mój lekarz."],
            },
            {
              ENG: "My doctor (female).",
              POL: ["Moja lekarka."],
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
    it("#pal17-03b GET 200 YES: Engpol. Possessive pronombre above MGN. pleaseDontSpecify.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118b My doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My doctor.",
              POL: ["Mój lekarz.", "Moja lekarka."],
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
    it("#pal17-03c GET 200 YES: Poleng. Possessive pronombre above MGN. Annotation wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118b My doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor."],
              POL: ["Mój lekarz.", "Moja lekarka."],
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
    it("#pal17-03d GET 200 YES: Poleng. Possessive pronombre above MGN. pleaseDontSpecify but annotation wouldn't appear anyway.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "118b My doctor",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["My doctor."],
              POL: ["Mój lekarz.", "Moja lekarka."],
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

  describe("/palette - Stage 16: NATASHA T. Checking how arrays as terminal points are handled. +extra", () => {
    it("#pal16-01a GET 200 YES: NATASHA T. Are correct members of an array returned as possible ANSWER, as they should be?", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy52",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The woman will be writing.",
              POL: ["Kobieta będzie pisała.", "Kobieta będzie pisać."],
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
    it("#pal16-01b GET 200 YES: NATASHA T. Battery: Are EITHER members of an array returned as possible QUESTION, as they should be?", () => {
      return Promise.all([
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
      ]).then((allQuestionSentencesArr) => {
        consol.log({ allQuestionSentencesArr });
        expect(allQuestionSentencesArr).to.have.length(10);
        expect(allQuestionSentencesArr).to.include("Kobieta będzie pisała.");
        expect(allQuestionSentencesArr).to.include("Kobieta będzie pisać.");
      });

      function testOnce() {
        const questionLanguage = "POL";
        const answerLanguage = "ENG";

        return request(app)
          .get("/api/palette")
          .send({
            questionLanguage,
            answerLanguage,
            sentenceFormulaSymbol: "dummy52",
            useDummy: true,
          })
          .expect(200)
          .then((res) => {
            if (res.body.questionSentenceArr.length > 1) {
              consol.throw("res.body.questionSentenceArr had length over 1.");
            }

            return res.body.questionSentenceArr[0];
          });
      }
    });
    it("#pal16-01c GET 200 YES: NATASHA T. Are correct answer sentences given for each of those question sentences.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy52",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The woman will be writing.",
                "The woman is going to be writing.",
                "The lady will be writing.",
                "The lady is going to be writing.",
              ],
              POL: ["Kobieta będzie pisała.", "Kobieta będzie pisać."],
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
    it("#pal16-02a GET 200 YES: MGN re stCh. Engpol. PDS.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy59a doctor",
          useDummy: true,
          pleaseDontSpecify: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Doctor.",
              POL: ["Lekarka.", "Lekarz."],
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
    it("#pal16-02b GET 200 YES: MGN re stCh. Engpol. PDS.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy59b doctor",
          useDummy: true,
          pleaseDontSpecify: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Doctor.",
              POL: ["Lekarka.", "Lekarz."],
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
});
