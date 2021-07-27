const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { generalTranslatedSentencesRef } = testingUtils;

// MGN:            Multi-gender noun. Eg doctor in ENG can be either male or female.
// ProsMgn:        "My doctor and her book." Connected pronoun reveals gender of MGN. Doesn't need an annotation for doctor as clearly must be lekarka.
// EdusMgn:        "My doctor is a man."     Educator specifies MGN's gender. Sentence where educator knows that this MGN will need no clarifying.

describe("/api", function () {
  this.timeout(7000);

  gpUtils.fillOutWashburneRefObj(
    generalTranslatedSentencesRef,
    "POL->ENG",
    "ENG->POL",
    "POL",
    "ENG"
  );

  describe.only("/palette - Stage 18b.", () => {
    it("#pal18-10a GET 200 YES: Engpol. 'The doctor writes.'", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "122 The doctor writes",
        })
        .expect(200)
        .then((res) => {
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
              ENG: "The doctors (males) write.",
              POL: ["Lekarze piszą."],
            },
            {
              ENG: "The doctors (mixed) write.",
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
              ENG: "The doctors (males) wrote.",
              POL: ["Lekarze napisali."],
            },
            {
              ENG: "The doctors (mixed) wrote.",
              POL: ["Lekarze napisali."],
            },
            {
              ENG: "The doctors (females) wrote.",
              POL: ["Lekarki napisały."],
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
    it("#pal18-10b GET 200 YES: Engpol. 'The doctor writes.' PDS", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "122 The doctor writes",
        })
        .expect(200)
        .then((res) => {
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
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal18-10c GET 200 YES: Poleng. 'The doctor writes.'", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "122 The doctor writes",
        })
        .expect(200)
        .then((res) => {
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
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal18-10d GET 200 YES: Poleng. 'The doctor writes.' PDS", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "122 The doctor writes",
        })
        .expect(200)
        .then((res) => {
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
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it.only("#pal18-10e GET 200 YES: Engpol. 'The doctor writes.' stCh specified male", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy63a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          let ref = [
            {
              ENG: "The doctor (male) writes.",
              POL: ["Lekarz pisze."],
            },
            {
              ENG: "The doctors (males) write.",
              POL: ["Lekarze piszą."],
            },
            {
              ENG: "The doctors (mixed) write.",
              POL: ["Lekarze piszą."],
            },
            {
              ENG: "The doctor (male) wrote.",
              POL: ["Lekarz napisał."],
            },
            {
              ENG: "The doctors (males) wrote.",
              POL: ["Lekarze napisali."],
            },
            {
              ENG: "The doctors (mixed) wrote.",
              POL: ["Lekarze napisali."],
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
    xit("#pal18-10f GET 200 YES: Poleng. 'The doctor writes.' stCh specified male", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy63a",
        })
        .expect(200)
        .then((res) => {
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
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
  });

  describe("/palette - Stage 18a.", () => {
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
              ENG: "I read (present) a book.",
              POL: ["Czytam książkę."],
            },
            {
              ENG: "I am reading a book.",
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
              ENG: "I read (present) a book.",
              POL: ["Czytam książkę."],
            },
            {
              ENG: "I am reading a book.",
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
              ENG: "They (males) are red.",
              POL: ["Są czerwoni.", "Oni są czerwoni."],
            },
            {
              ENG: "They (mixed) are red.",
              POL: ["Są czerwoni.", "Oni są czerwoni."],
            },
            {
              ENG: "They (females) are red.",
              POL: ["Są czerwone.", "One są czerwone."],
            },
            //Now technically, you'd need this. Because "koty" are masculine (m2) but that's "one" not "oni",
            //ie only m1 plural (and groups containing m1) are virile.
            //But practically, you can just teach this to the player in lesson text, rather than testing that
            //nitty gritty here. Because the real sentences encountered will be like, "Cats are black." "Kote sæ czarne."
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
  });

  describe("/palette - Stage 18: Further annotations.", () => {
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
              ENG: "A woman saw me.",
              POL: ["Kobieta mnie zobaczyła."],
            },
            {
              ENG: "The woman saw me.",
              POL: ["Kobieta mnie zobaczyła."],
            },
            {
              ENG: "Women saw me.",
              POL: ["Kobiety mnie zobaczyły."],
            },
            {
              ENG: "The women saw me.",
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
              ENG: "We see them (males).",
              POL: [
                "Widzimy ich.",
                "Ich widzimy.",
                "My ich widzimy.",
                "My widzimy ich.",
              ],
            },
            {
              ENG: "We see them (mixed).",
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
              POL: "Widzimy ich.",
            },
            {
              ENG: ["We see them.", "We are seeing them."],
              POL: "Widzimy je.",
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
              POL: "Widzimy ich.",
            },
            {
              ENG: ["We see them.", "We are seeing them."],
              POL: "Widzimy je.",
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
              ENG: "We (males) saw them (males).",
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
              ENG: "We (mixed) saw them (mixed).",
              POL: [
                "Zobaczyliśmy ich.",
                "Ich zobaczyliśmy.",
                "My ich zobaczyliśmy.",
                "My zobaczyliśmy ich.",
              ],
            },
            ///////////////////
            {
              ENG: "We (males) saw them (mixed).",
              POL: [
                "Zobaczyliśmy ich.",
                "Ich zobaczyliśmy.",
                "My ich zobaczyliśmy.",
                "My zobaczyliśmy ich.",
              ],
            },
            {
              ENG: "We (males) saw them (females).",
              POL: [
                "Zobaczyliśmy je.",
                "Je zobaczyliśmy.",
                "My je zobaczyliśmy.",
                "My zobaczyliśmy je.",
              ],
            },
            ////////////////////
            {
              ENG: "We (females) saw them (males).",
              POL: [
                "Zobaczyłyśmy ich.",
                "Ich zobaczyłyśmy.",
                "My ich zobaczyłyśmy.",
                "My zobaczyłyśmy ich.",
              ],
            },
            {
              ENG: "We (females) saw them (mixed).",
              POL: [
                "Zobaczyłyśmy ich.",
                "Ich zobaczyłyśmy.",
                "My ich zobaczyłyśmy.",
                "My zobaczyłyśmy ich.",
              ],
            },
            /////////////////////
            {
              ENG: "We (mixed) saw them (males).",
              POL: [
                "Zobaczyliśmy ich.",
                "Ich zobaczyliśmy.",
                "My ich zobaczyliśmy.",
                "My zobaczyliśmy ich.",
              ],
            },
            {
              ENG: "We (mixed) saw them (females).",
              POL: [
                "Zobaczyliśmy je.",
                "Je zobaczyliśmy.",
                "My je zobaczyliśmy.",
                "My zobaczyliśmy je.",
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
              POL: "Zobaczyliśmy ich.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyłyśmy ich.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyliśmy je.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyłyśmy je.",
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
              POL: "Zobaczyliśmy ich.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyłyśmy ich.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyliśmy je.",
            },
            {
              ENG: ["We saw them.", "We had seen them.", "We have seen them."],
              POL: "Zobaczyłyśmy je.",
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
              ENG: "A doctor (female) saw me.",
              POL: ["Lekarka mnie zobaczyła."],
            },
            {
              ENG: "The doctor (female) saw me.",
              POL: ["Lekarka mnie zobaczyła."],
            },
            {
              ENG: "A doctor (male) saw me.",
              POL: ["Lekarz mnie zobaczył."],
            },
            {
              ENG: "The doctor (male) saw me.",
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
              ENG: "A doctor saw me.",
              POL: ["Lekarka mnie zobaczyła.", "Lekarz mnie zobaczył."],
            },
            {
              ENG: "The doctor saw me.",
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
              POL: "Lekarka mnie zobaczyła.",
            },
            {
              ENG: [
                "The doctor saw me.",
                "The doctor had seen me.",
                "The doctor has seen me.",
                "A doctor saw me.",
                "A doctor had seen me.",
                "A doctor has seen me.",
              ],
              POL: "Lekarz mnie zobaczył.",
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
              POL: "Lekarka mnie zobaczyła.",
            },
            {
              ENG: [
                "The doctor saw me.",
                "The doctor had seen me.",
                "The doctor has seen me.",
                "A doctor saw me.",
                "A doctor had seen me.",
                "A doctor has seen me.",
              ],
              POL: "Lekarz mnie zobaczył.",
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

  describe("/palette - Stage 17-i: Possessive pronouns and MGNs. Pre-testing.", () => {
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
              ENG: "Doctors (males).",
              POL: ["Lekarze."],
            },
            {
              ENG: "Doctors (mixed).",
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
              POL: "Lekarka.",
            },
            {
              ENG: ["Doctor."],
              POL: "Lekarz.",
            },
            {
              ENG: ["Doctors."],
              POL: "Lekarki.",
            },
            {
              ENG: ["Doctors."],
              POL: "Lekarze.",
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
              POL: "Lekarka.",
            },
            {
              ENG: ["Doctor."],
              POL: "Lekarz.",
            },
            {
              ENG: ["Doctors."],
              POL: "Lekarki.",
            },
            {
              ENG: ["Doctors."],
              POL: "Lekarze.",
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
    it("#pal17-02a GET 200 YES: Engpol. Simple possessive pronoun sentence. Should not be broken by pleaseDontSpecify.", () => {
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
    it("#pal17-02b GET 200 YES: Poleng. Simple possessive pronoun sentence. Should not be broken by pleaseDontSpecify.", () => {
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
    it("#pal17-03a GET 200 YES: Engpol. Possessive pronoun above MGN. Annotation expected as this isn't actually a ProsMgn.", () => {
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
    it("#pal17-03b GET 200 YES: Engpol. Possessive pronoun above MGN. pleaseDontSpecify.", () => {
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
    it("#pal17-03c GET 200 YES: Poleng. Possessive pronoun above MGN. Annotation wouldn't appear anyway.", () => {
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
              POL: "Mój lekarz.",
            },
            {
              ENG: ["My doctor."],
              POL: "Moja lekarka.",
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
    it("#pal17-03d GET 200 YES: Poleng. Possessive pronoun above MGN. pleaseDontSpecify but annotation wouldn't appear anyway.", () => {
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
              POL: "Mój lekarz.",
            },
            {
              ENG: ["My doctor."],
              POL: "Moja lekarka.",
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

  describe("/palette - Stage 17-ii: Possessive pronouns and MGNs. PP below MGN. ProsMgn.", () => {
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
              POL: "Zobaczyłem mojego lekarza i jego lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłam mojego lekarza i jego lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłem mojego lekarza i jego lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłam mojego lekarza i jego lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłem moją lekarkę i jej lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłam moją lekarkę i jej lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłem moją lekarkę i jej lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłam moją lekarkę i jej lekarkę.",
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
              POL: "Zobaczyłem mojego lekarza i jego lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłam mojego lekarza i jego lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłem mojego lekarza i jego lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and his doctor.",
                "I had seen my doctor and his doctor.",
                "I have seen my doctor and his doctor.",
              ],
              POL: "Zobaczyłam mojego lekarza i jego lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłem moją lekarkę i jej lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłam moją lekarkę i jej lekarza.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłem moją lekarkę i jej lekarkę.",
            },
            {
              ENG: [
                "I saw my doctor and her doctor.",
                "I had seen my doctor and her doctor.",
                "I have seen my doctor and her doctor.",
              ],
              POL: "Zobaczyłam moją lekarkę i jej lekarkę.",
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
    it("#pal17-05a GET 200 YES: Engpol. Possessive pronoun below MGN. No annotation as ProsMgn.", () => {
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
    it("#pal17-05b GET 200 YES: Engpol. Possessive pronoun below MGN. pleaseDontSpecify should be BLOCKED for ProsMgn MGN.", () => {
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
    it("#pal17-05c GET 200 YES: Poleng. Possessive pronoun below MGN. Annotations wouldn't appear anyway.", () => {
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
    it("#pal17-05d GET 200 YES: Poleng. Possessive pronoun below MGN. pleaseDontSpecify but annotations wouldn't appear anyway.", () => {
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
              POL: "Mój lekarz i moja książka.",
            },
            {
              ENG: ["My doctor and my book."],
              POL: "Moja lekarka i moja książka.",
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
              POL: "Mój lekarz i moja książka.",
            },
            {
              ENG: ["My doctor and my book."],
              POL: "Moja lekarka i moja książka.",
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

  describe("/palette - Stage 17-iii: Possessive pronouns and MGNs. EdusMgn", () => {
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
              POL: "Lekarka mojego lekarza była kobietą.",
            },
            {
              ENG: [
                "My doctor's doctor was a woman.",
                "My doctor's doctor had been a woman.",
                "My doctor's doctor has been a woman.",
                "My doctor's doctor was being a woman.",
              ],
              POL: "Lekarka mojej lekarki była kobietą.",
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
              POL: "Lekarka mojego lekarza była kobietą.",
            },
            {
              ENG: [
                "My doctor's doctor was a woman.",
                "My doctor's doctor had been a woman.",
                "My doctor's doctor has been a woman.",
                "My doctor's doctor was being a woman.",
              ],
              POL: "Lekarka mojej lekarki była kobietą.",
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

  describe("/palette - Stage 17-iv: Possessive pronouns and MGNs. MGN to agree with pronoun.", () => {
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
              POL: "Byłem tutaj.",
            },
            {
              ENG: [
                "I was here.",
                "I had been here.",
                "I have been here.",
                "I was being here.",
              ],
              POL: "Byłam tutaj.",
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
              POL: "Byłem tutaj.",
            },
            {
              ENG: [
                "I was here.",
                "I had been here.",
                "I have been here.",
                "I was being here.",
              ],
              POL: "Byłam tutaj.",
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
    it("#pal17-11a GET 200 YES: Engpol. I was a doctor. MGN to agree with pronoun.", () => {
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
    it("#pal17-11b GET 200 YES: Engpol. I was a doctor. MGN to agree with pronoun. pleaseDontSpecify", () => {
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
    it("#pal17-11c GET 200 YES: Poleng. I was a doctor. MGN to agree with pronoun.", () => {
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
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal17-11d GET 200 YES: Poleng. I was a doctor. MGN to agree with pronoun. pleaseDontSpecify but with no effect expected.", () => {
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
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal17-11e GET 200 YES: Engpol. I* was a doctor. MGN to agree with pronoun.", () => {
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
              ENG: "We (males) were doctors.",
              POL: ["Byliśmy lekarzami."],
            },
            {
              ENG: "We (mixed) were doctors.",
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
    it("#pal17-11f GET 200 YES: Engpol. I* was a doctor. MGN to agree with pronoun. pleaseDontSpecify", () => {
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
    it("#pal17-11g GET 200 YES: Poleng. I* was a doctor. MGN to agree with pronoun.", () => {
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
              POL: "Byłyśmy lekarkami.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: "Byliśmy lekarzami.",
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
    it("#pal17-11h GET 200 YES: Poleng. I* was a doctor. MGN to agree with pronoun. pleaseDontSpecify but with no effect expected.", () => {
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
              POL: "Byłyśmy lekarkami.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: "Byliśmy lekarzami.",
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
    it("#pal17-11i GET 200 YES: Engpol. I** was a doctor. MGN to agree with pronoun.", () => {
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
              ENG: "We (males) were doctors.",
              POL: ["Byliśmy lekarzami."],
            },
            {
              ENG: "We (mixed) were doctors.",
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
    it("#pal17-11j GET 200 YES: Engpol. I** was a doctor. MGN to agree with pronoun. pleaseDontSpecify", () => {
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
    it("#pal17-11k GET 200 YES: Poleng. I** was a doctor. MGN to agree with pronoun.", () => {
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
              POL: "Byłyśmy lekarkami.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: "Byliśmy lekarzami.",
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
    it("#pal17-11l GET 200 YES: Poleng. I** was a doctor. MGN to agree with pronoun. pleaseDontSpecify but with no effect expected.", () => {
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
              POL: "Byłyśmy lekarkami.",
            },
            {
              ENG: [
                "We were doctors.",
                "We had been doctors.",
                "We have been doctors.",
                "We were being doctors.",
              ],
              POL: "Byliśmy lekarzami.",
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
              ],
              POL: "Kobieta będzie pisała.",
            },
            {
              ENG: [
                "The woman will be writing.",
                "The woman is going to be writing.",
              ],
              POL: "Kobieta będzie pisać.",
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

  consol.log(res.body);

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
