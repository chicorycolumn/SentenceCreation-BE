const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const clUtils = require("../utils/zerothOrder/consoleLoggingUtils.js");
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
  // after(() => {});
  // beforeEach(() => {});

  xdescribe("/palette - Stage 18: Further annotations.", () => {
    it("#pal18-01a GET 200 YES: Engpol. 'she reads'", () => {
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
    it("#pal18-01b GET 200 YES: Poleng annotations. 'she reads'", () => {
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
          // devSaysThrowAtMidpoint: true,
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
          // devSaysThrowAtMidpoint: true,
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
          // devSaysThrowAtMidpoint: true,
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
    it.only("#pal16-01b GET 200 YES: NATASHA T. Battery: Are EITHER members of an array returned as possible QUESTION, as they should be?", () => {
      return Promise.all([
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
        testOnce(),
      ]).then((allQuestionSentencesArr) => {
        console.log({ allQuestionSentencesArr });
        expect(allQuestionSentencesArr).to.have.length(8);
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
              clUtils.throw("res.body.questionSentenceArr had length over 1.");
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

  console.log(res.body);

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
      console.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      console.log(
        "was translated by,-'-._,-' '-._,-' '-._,-'-._,",
        answerSentenceArr
      );
    }
    if (questionSentence === ENG) {
      expect(answerSentenceArr).to.have.members(POL);
      console.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      console.log(
        "  was translated by`-' '-._,-' '-._,-' '-._,-'",
        answerSentenceArr
      );
    }
  });
}
