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
// ProsMgn:        "My doctor and her book." Connected pronombre reveals gender of MGN. Doesn't need an annotation for doctor as clearly must be lekarka.
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

  describe("/palette - Stage 9: Synhomographs (adding Clarifiers).", () => {
    it("#pal09-01a (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheep_withClarifiers_Qlang" + questionLanguage,
            ["Sheep (singular).", "Sheep (plural)."]
          );
        });
    });
    it("#pal09-01b 'sheep': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheep_withClarifiers_Qlang" + questionLanguage,
            ["Owce.", "Owca."]
          );
        });
    });
    it("#pal09-01c (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Expect clarifiers. PDS makes it agnostic between singular and plural.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheep_withoutClarifiers_Qlang" + questionLanguage,
            ["Sheep."]
          );
        });
    });
    it("#pal09-01d 'sheep': Poleng. No clarifiers. PDS should have no effect.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheep_withClarifiers_Qlang" + questionLanguage,
            ["Owce.", "Owca."]
          );
        });
    });
    it("#pal09-01e (Type 1 Synhomographs. If-PW: clarify Inflections) 'Sheep are* here.': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheeps_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-01f 'Sheep are* here.': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheeps_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-01g (Type 1 Synhomographs. If-PW: clarify Inflections) 'Sheep are* here.': Engpol. Expect clarifiers. PDS makes it agnostic between singular and plural.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheeps_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-01h 'Sheep are* here.': Poleng. No clarifiers. PDS should have no effect.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "sheeps_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-01i (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Two primaryOrders, only one needing clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy36b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Sheep (singular).", "Sheep is."],
              POL: ["Owca.", "Owca jest."],
            },
            {
              ENG: ["Sheep (plural).", "Sheep are."],
              POL: ["Owce.", "Owce są."],
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
    it("#pal09-02a (Type 2 Synhomographs. Ad-PW: clarify Inflections (tenseDescription)) 'read': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy38",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "read_withClarifiers_Qlang" + questionLanguage,
            ["I read (present).", "I read (past)."]
          );
        });
    });
    it("#pal09-02b (Ad-PW: clarify Inflections (tenseDescription)) 'read': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy38",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "read_withClarifiers_Qlang" + questionLanguage,
            ["Czytam.", "Przeczytałem.", "Przeczytałam."]
          );
        });
    });
    it("#pal09-03a (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy40",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            ["You (singular) write.", "You (plural) write."]
          );
        });
    });
    it("#pal09-03b (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy40",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            ["Piszesz.", "Piszecie."]
          );
        });
    });
    it("#pal09-03c (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy41",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-03d (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy41",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            ["Napisałeś.", "Napisałaś.", "Napisaliście.", "Napisałyście."]
          );
        });
    });
    it("#pal09-03e (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy42",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            []
          );
        });
    });
    it("#pal09-03f (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy42",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write_withClarifiers_Qlang" + questionLanguage,
            [
              "Będziesz pisał.",
              "Będziesz pisała.",
              "Będziesz pisać.",
              "Będziecie pisały.",
              "Będziecie pisali.",
              "Będziecie pisać.",
            ]
          );
        });
    });
    it("#pal09-03g (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'be': Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy39",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withClarifiers_Qlang" + questionLanguage,
            ["You (singular) are.", "You (plural) are."]
          );
        });
    });
    it("#pal09-03h (Ad-PW: clarify Inflections) 'be': Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy39",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withClarifiers_Qlang" + questionLanguage,
            ["Jesteś.", "Jesteście."]
          );
        });
    });
    it("#pal09-04a-i (pal09-02a Engpol, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I see.", "I am seeing."],
              POL: ["Widzę.", "Ja widzę."],
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
    it("#pal09-04a-ii (pal09-02a Engpol, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) saw.",
              POL: ["Zobaczyłem.", "Ja zobaczyłem."],
            },
            {
              ENG: "I (female) saw.",
              POL: ["Zobaczyłam.", "Ja zobaczyłam."],
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
    it("#pal09-04a-iii (pal09-02a Engpol, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) read (past).",
              POL: ["Przeczytałem.", "Ja przeczytałem."],
            },
            {
              ENG: "I (female) read (past).",
              POL: ["Przeczytałam.", "Ja przeczytałam."],
            },
            {
              ENG: ["I am reading.", "I read (present)."],
              POL: ["Czytam.", "Ja czytam."],
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
    it("#pal09-04a-iv (pal09-02a Engpol PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I see.", "I am seeing."],
              POL: ["Widzę.", "Ja widzę."],
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
    it("#pal09-04a-v (pal09-02a Engpol PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I saw.",
              POL: [
                "Zobaczyłem.",
                "Ja zobaczyłem.",
                "Zobaczyłam.",
                "Ja zobaczyłam.",
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
    it("#pal09-04a-vi (pal09-02a Engpol PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I read (past).",
              POL: [
                "Przeczytałem.",
                "Ja przeczytałem.",
                "Przeczytałam.",
                "Ja przeczytałam.",
              ],
            },
            {
              ENG: ["I am reading.", "I read (present)."],
              POL: ["Czytam.", "Ja czytam."],
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
    it("#pal09-04b-i (pal09-02a Poleng, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I see.", "I am seeing."],
              POL: "Widzę.",
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
    it("#pal09-04b-ii (pal09-02a Poleng, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I saw.", "I have seen.", "I had seen."],
              POL: ["Zobaczyłem.", "Zobaczyłam."],
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
    it("#pal09-04b-iii (pal09-02a Poleng, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I read.", "I have read.", "I had read."],
              POL: ["Przeczytałem.", "Przeczytałam."],
            },
            {
              ENG: ["I read.", "I am reading."],
              POL: "Czytam.",
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
    it("#pal09-04b-iv (pal09-02a Poleng PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I see.", "I am seeing."],
              POL: "Widzę.",
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
    it("#pal09-04b-v (pal09-02a Poleng PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I saw.", "I have seen.", "I had seen."],
              POL: ["Zobaczyłem.", "Zobaczyłam."],
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
    it("#pal09-04b-vi (pal09-02a Poleng PDS, two clarifiers potentially expected.)", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";
      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy60b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I read.", "I have read.", "I had read."],
              POL: ["Przeczytałem.", "Przeczytałam."],
            },
            {
              ENG: ["I read.", "I am reading."],
              POL: "Czytam.",
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

  describe("/palette - Stage 10: Allohomographs (adding Clarifiers).", () => {
    it("#pal10-01a Type 1 Allohomographs of SingleWordtype: 'nut' Engpol. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy43",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [
            { ENG: "A small nut (🥜, food).", POL: ["Mały orzech."] },
            { ENG: "A small nut (🔩, metal).", POL: ["Mała nakrętka."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-01b Type 1 Allohomographs of SingleWordtype: 'nut' Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy43",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [
            { POL: ["Mały orzech.", "Mała nakrętka."], ENG: ["A small nut."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02a Type 1 Allohomographs of MultipleWordtype: 'bear (noun)' Engpol. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy45a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ ENG: "Bear (nounCommon).", POL: ["Niedźwiedź."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02b Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' Engpol. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy45b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ ENG: "Bear (verb).", POL: ["Znieść."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02c Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' Engpol. Did NOT request allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy45c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ ENG: "Bear.", POL: ["Znieść."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02d Type 1 Allohomographs of MultipleWordtype: 'bear (noun)' Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy45a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ POL: "Niedźwiedź.", ENG: ["Bear."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02e Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy45b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ POL: "Znieść.", ENG: ["Bear."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03a Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier not requested.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [
            { ENG: "Tie (⚽, score).", POL: ["Remis."] },
            { ENG: "Tie (👔, clothes).", POL: ["Krawat."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03b Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [
            { ENG: "Tie (⚽, score, nounCommon).", POL: ["Remis."] },
            { ENG: "Tie (👔, clothes, nounCommon).", POL: ["Krawat."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03c Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier not requested.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ ENG: "Tie (🧵, with string eg).", POL: ["Wiązać."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03d Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46d",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [
            { ENG: "Tie (🧵, with string eg, verb).", POL: ["Wiązać."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03e Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ POL: ["Remis.", "Krawat."], ENG: ["Tie."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03f Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' Poleng. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy46c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          expect(questionSentenceArr.length).to.equal(1);
          expect(answerSentenceArr.length).to.equal(1);

          let ref = [{ POL: "Wiązać.", ENG: ["Tie."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
  });

  describe("/palette - Stage 11A: Adding Specifiers.", () => {
    it("#pal11A-01a GET 200 YES: SPECIFIER EXPECTED. Multi Gender Noun. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109a doc was writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctor (male) was writing a prescription.",
              POL: ["Lekarz pisał receptę."],
            },
            {
              ENG: "The doctor (female) was writing a prescription.",
              POL: ["Lekarka pisała receptę."],
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
    it("#pal11A-01b GET 200 YES: SPECIFIER EXPECTED Multi Gender Noun PLURAL. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109c docs were writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctors (males) were writing a prescription.",
              POL: ["Lekarze pisali receptę."],
            },
            {
              ENG: "The doctors (mixed) were writing a prescription.",
              POL: ["Lekarze pisali receptę."],
            },
            {
              ENG: "The doctors (females) were writing a prescription.",
              POL: ["Lekarki pisały receptę."],
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
    it("#pal11A-02a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR. Pronombre I/WE. {pres im} needs no gender. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111a I am",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
            { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal11A-02b GET 200 YES: SPECIFIER EXPECTED. Pronombre I/WE. {past im} does indeed need gender. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111b I was",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I (male) was.", POL: ["Byłem.", "Ja byłem."] },
            { ENG: "I (female) was.", POL: ["Byłam.", "Ja byłam."] },
            {
              ENG: ["We (males) were.", "We (mixed) were."],
              POL: ["Byliśmy.", "My byliśmy."],
            },
            { ENG: "We (females) were.", POL: ["Byłyśmy.", "My byłyśmy."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal11A-03a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR if noun already has gender.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy47",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["The woman wrote.", "The woman had written."],
              POL: ["Kobieta napisała."],
            },
            { ENG: "The woman was writing.", POL: ["Kobieta pisała."] },
            {
              ENG: "The woman has written.",
              POL: ["Kobieta napisała.", "Kobieta pisała."],
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
    it("#pal11A-04a GET 200 YES: GIVE MULTIPLE ANSWER OPTIONS WHEN SPECIFIERS NOT REQUESTED. Pronombre I/WE. {past im} does indeed need gender. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111b I was",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I (male) was.",
              POL: ["Byłem.", "Ja byłem."],
            },
            {
              ENG: "I (female) was.",
              POL: ["Byłam.", "Ja byłam."],
            },
            {
              ENG: ["We (mixed) were.", "We (males) were."],
              POL: ["Byliśmy.", "My byliśmy."],
            },
            {
              ENG: "We (females) were.",
              POL: ["Byłyśmy.", "My byłyśmy."],
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
    it("#pal11A-05a GET 200 YES: Gives clarifiers and specifiers. Pronombre YOU. Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111c you were",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "You (singular, male) were.",
              POL: ["Byłeś.", "Ty byłeś."],
            },
            {
              ENG: "You (singular, female) were.",
              POL: ["Byłaś.", "Ty byłaś."],
            },
            {
              ENG: ["You (plural, mixed) were.", "You (males) were."],
              POL: ["Byliście.", "Wy byliście."],
            },
            {
              ENG: "You (females) were.",
              POL: ["Byłyście.", "Wy byłyście."],
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

  describe("/palette - Stage 11B Not adding Specifiers.", () => {
    it("#pal11B-01a GET 200 YES: Poleng. CHOOSE ONE. Singular. male or female versions of same person.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109 doc wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: ["Lekarka napisała receptę.", "Lekarz napisał receptę."],
              ENG: [
                "The doctor wrote a prescription.",
                "The doctor had written a prescription.",
                "The doctor has written a prescription.",
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
    it("#pal11B-01b GET 200 YES: Poleng. CHOOSE ONE. Plural. male or female versions of same person.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109b docs wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: ["Lekarze napisali receptę.", "Lekarki napisały receptę."],
              ENG: [
                "The doctors wrote a prescription.",
                "The doctors had written a prescription.",
                "The doctors have written a prescription.",
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
    it("#pal11B-01c GET 200 YES: Poleng. AGNOSTIC has no effect. Singular. male or female versions of same person.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109 doc wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: ["Lekarz napisał receptę.", "Lekarka napisała receptę."],
              ENG: [
                "The doctor wrote a prescription.",
                "The doctor had written a prescription.",
                "The doctor has written a prescription.",
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
    it("#pal11B-01d GET 200 YES: Poleng. AGNOSTIC has no effect. Plural. male or female versions of same person.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109b docs wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: ["Lekarze napisali receptę.", "Lekarki napisały receptę."],
              ENG: [
                "The doctors wrote a prescription.",
                "The doctors had written a prescription.",
                "The doctors have written a prescription.",
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
    it("#pal11B-02a GET 200 YES: Engpol. CHOOSE ONE. Singular. male or female versions of same person.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109a doc was writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctor (male) was writing a prescription.",
              POL: ["Lekarz pisał receptę."],
            },
            {
              ENG: "The doctor (female) was writing a prescription.",
              POL: ["Lekarka pisała receptę."],
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
    it("#pal11B-02b GET 200 YES: Engpol. CHOOSE ONE. Plural. male or female versions of same person.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109c docs were writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctors (females) were writing a prescription.",
              POL: ["Lekarki pisały receptę."],
            },
            {
              ENG: [
                "The doctors (mixed) were writing a prescription.",
                "The doctors (males) were writing a prescription.",
              ],
              POL: ["Lekarze pisali receptę."],
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
    it("#pal11B-02c GET 200 YES: Engpol. AGNOSTIC. Singular. male or female versions of same person.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109a doc was writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctor was writing a prescription.",
              POL: ["Lekarz pisał receptę.", "Lekarka pisała receptę."],
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
    it("#pal11B-02d GET 200 YES: Engpol. AGNOSTIC. Plural. male or female versions of same person.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109c docs were writing p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctors were writing a prescription.",
              POL: ["Lekarze pisali receptę.", "Lekarki pisały receptę."],
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
    it("#pal11B-03a GET 200 YES: Engpol. AGNOSTIC. Give both pronombre singular gender options in answer.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          pleaseDontSpecify: true,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I wrote.",
              POL: [
                "Napisałem.",
                "Ja napisałem.",
                "Napisałam.",
                "Ja napisałam.",
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
    it("#pal11B-03b GET 200 YES: Engpol. AGNOSTIC. Give both pronombre plural gender options in answer.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          pleaseDontSpecify: true,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49d",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "We wrote.",
              POL: [
                "Napisaliśmy.",
                "My napisaliśmy.",
                "Napisałyśmy.",
                "My napisałyśmy.",
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

  xdescribe("/palette - Stage 12: Conditionals.", () => {
    it("#pal12-01a (04-01c) GET 200 YES: CONDITIONAL Returns a sentence with a single verb, with tense and number specified.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy13a conditional plural",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytano by.",
            "Czytalibyśmy.",
            "Czytałybyśmy.",
            "Czytalibyście.",
            "Czytałybyście.",
            "Czytaliby.",
            "Czytałyby.",
          ]).to.include(res.body.questionSentenceArr[0]);
          consol.log(res.body);
        });
    });
    it("#pal12-02a (05-02d) GET 200 YES: CONDITIONAL Returns a sentence when selected by one from multiple tenseDescriptions.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl reads f conditional im pf",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Kobieta czytałaby.",
            "Kobiety czytałyby.",
            "Kobieta przeczytałaby.",
            "Kobiety przeczytałyby.",
          ]).to.include(res.body.questionSentenceArr[0]);
          consol.log(res.body);
        });
    });
    it("#pal12-03a GET 200 YES: RSWAT for First Conditional POL->ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: [
                "Jeśli będziesz pisać książkę , ją zbadam.",
                "Jeśli napiszesz książkę , ją zbadam.",
              ],
              ENG: ["If you write a book , I will research it."],
            },
            {
              POL: "Jeśli będziesz pisał książkę , ją zbadam.",
              ENG: ["If you write (male) a book , I will research it."],
            },
            {
              POL: "Jeśli będziesz pisała książkę , ją zbadam.",
              ENG: ["If you write (female) a book , I will research it."],
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
    it("#pal12-03b GET 200 YES: RSWAT for First Conditional ENG->POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          let ref = [
            {
              ENG: "If you write a book , I will research it.",
              POL: [
                "Jeśli napiszesz książkę , ją zbadam.",
                "Jeśli będziesz pisać książkę , ją zbadam.",
              ],
            },
            {
              ENG: "If you write (male) a book , I will research it.",
              POL: ["Jeśli będziesz pisał książkę , ją zbadam."],
            },
            {
              ENG: "If you write (female) a book , I will research it.",
              POL: ["Jeśli będziesz pisała książkę , ją zbadam."],
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

  describe("/palette - Stage 13A: Pronombres and other Multi Gender Nouns: Basic tests.", () => {
    it("#pal13A-01a GET 200 YES: Give a pronombre in ENG.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("I.");
        });
    });
    it("#pal13A-01b GET 200 YES: Give a pronombre in POL.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("Ja.");
        });
    });
    it("#pal13A-01c GET 200 YES: Give a pronombre in Poleng.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("Ja.");
          expect(res.body.answerSentenceArr).to.have.members(["I."]);
        });
    });
    it("#pal13A-01d GET 200 YES: Give a pronombre in Engpol.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("I.");
          expect(res.body.answerSentenceArr).to.have.members(["Ja."]);
        });
    });
    it("#pal13A-02a GET 200 YES: Engpol. Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I (male) wrote.", POL: ["Napisałem.", "Ja napisałem."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-02b GET 200 YES: Engpol. Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "We (females) wrote.",
              POL: ["Napisałyśmy.", "My napisałyśmy."],
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
    it("#pal13A-02c GET 200 YES: Engpol. WITH SPECIFIERS Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I (male) wrote.", POL: ["Napisałem.", "Ja napisałem."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-02d GET 200 YES: Engpol. WITH SPECIFIERS Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "We (females) wrote.",
              POL: ["Napisałyśmy.", "My napisałyśmy."],
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
    it("#pal13A-04a GET 200 YES: Poleng. Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: ["Napisałem.", "Ja napisałem."],
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
    it("#pal13A-04b GET 200 YES: Poleng. Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: ["Napisałyśmy.", "My napisałyśmy."],
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
    it("#pal13A-04c GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: ["Napisałem.", "Ja napisałem."],
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
    it("#pal13A-04d GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: ["Napisałyśmy.", "My napisałyśmy."],
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
    it("#pal13A-05a GET 200 YES: Poleng. Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: [
                "Napisałem.",
                "Ja napisałem.",
                "Napisałam.",
                "Ja napisałam.",
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
    it("#pal13A-05b GET 200 YES: Poleng. Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49d",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: [
                "Napisałyśmy.",
                "My napisałyśmy.",
                "Napisaliśmy.",
                "My napisaliśmy.",
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
    it("#pal13A-05c GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: [
                "Napisałem.",
                "Ja napisałem.",
                "Napisałam.",
                "Ja napisałam.",
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
    it("#pal13A-05d GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: [
                "Napisałyśmy.",
                "My napisałyśmy.",
                "Napisaliśmy.",
                "My napisaliśmy.",
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
    it("#pal13A-06a GET 200 YES: Engpol. No gender specified in stCh for MGN.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy51a",
          pleaseDontSpecify: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctor wrote.",
              POL: ["Lekarz napisał.", "Lekarka napisała."],
            },
            {
              ENG: "The doctor read (past).",
              POL: ["Lekarz przeczytał.", "Lekarka przeczytała."],
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
    it("#pal13A-7a GET 200 YES: Singular pronombres: Verb person and number is inherited from pronombre headChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "108 singular I am",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
            { ENG: "You (singular) are.", POL: ["Jesteś.", "Ty jesteś."] },
            { ENG: "He is.", POL: ["Jest.", "On jest."] },
            { ENG: "She is.", POL: ["Jest.", "Ona jest."] },
            { ENG: "It is.", POL: ["Jest.", "Ono jest."] },
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

  describe("/palette - Stage 13B: Pronombres and other Multi Gender Nouns: Further tests.", () => {
    it("#pal13B-01a GET 200 YES: Specifiers not requested. Engpol. I am.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111a I am",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
            { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13B-01b GET 200 YES: Specifiers requested but should not appear. Engpol. I am.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111a I am",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
            { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13B-02a GET 200 YES: Engpol. A more interesting sentence with Pronombres.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "110 the woman read me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The woman was reading me a book.",
                "The woman was reading a book to me.",
              ],
              POL: [
                "Kobieta czytała mi książkę.",
                "Kobieta czytała mnie książkę.",
              ],
            },
            {
              ENG: [
                "The women were reading a book to me.",
                "The women were reading me a book.",
              ],
              POL: [
                "Kobiety czytały mi książkę.",
                "Kobiety czytały mnie książkę.",
              ],
            },
            {
              ENG: [
                "The woman was reading a book to us.",
                "The woman was reading us a book.",
              ],
              POL: ["Kobieta czytała nam książkę."],
            },
            {
              ENG: [
                "The women were reading a book to us.",
                "The women were reading us a book.",
              ],
              POL: ["Kobiety czytały nam książkę."],
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
    it("#pal13B-02b GET 200 YES: Poleng. A more interesting sentence with Pronombres.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "110 the woman read me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: [
                "The woman was reading me a book.",
                "The woman was reading a book to me.",
                "The woman has read me a book.",
                "The woman has read a book to me.",
              ],
              POL: "Kobieta czytała mi książkę.",
            },
            {
              ENG: [
                "The women were reading me a book.",
                "The women were reading a book to me.",
                "The women have read me a book.",
                "The women have read a book to me.",
              ],
              POL: "Kobiety czytały mi książkę.",
            },
            {
              ENG: [
                "The woman was reading us a book.",
                "The woman was reading a book to us.",
                "The woman has read us a book.",
                "The woman has read a book to us.",
              ],
              POL: "Kobieta czytała nam książkę.",
            },
            {
              ENG: [
                "The women were reading us a book.",
                "The women were reading a book to us.",
                "The women have read us a book.",
                "The women have read a book to us.",
              ],
              POL: "Kobiety czytały nam książkę.",
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
    it("#pal13B-03a GET 200 YES: Engpol. Another more interesting sentence with Pronombres.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "112 familymember gave me things",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["Father gave me apples.", "Father gave apples to me."],
              POL: ["Ojciec dał mi jabłka.", "Ojciec dał mnie jabłka."],
            },
            {
              ENG: ["Father gave me books.", "Father gave books to me."],
              POL: ["Ojciec dał mi książki.", "Ojciec dał mnie książki."],
            },
            {
              ENG: ["Father gave me onions.", "Father gave onions to me."],
              POL: ["Ojciec dał mi cebule.", "Ojciec dał mnie cebule."],
            },
            {
              ENG: ["Father gave me mirrors.", "Father gave mirrors to me."],
              POL: [
                "Ojciec dał mi zwierciadła.",
                "Ojciec dał mi lustra.",

                "Ojciec dał mnie zwierciadła.",
                "Ojciec dał mnie lustra.",
              ],
            },
            {
              ENG: ["Father gave us apples.", "Father gave apples to us."],
              POL: ["Ojciec dał nam jabłka."],
            },
            {
              ENG: ["Father gave us books.", "Father gave books to us."],
              POL: ["Ojciec dał nam książki."],
            },
            {
              ENG: ["Father gave us onions.", "Father gave onions to us."],
              POL: ["Ojciec dał nam cebule."],
            },
            {
              ENG: ["Father gave us mirrors.", "Father gave mirrors to us."],
              POL: ["Ojciec dał nam zwierciadła.", "Ojciec dał nam lustra."],
            },
            {
              ENG: ["Mother gave me apples.", "Mother gave apples to me."],
              POL: ["Matka dała mi jabłka.", "Matka dała mnie jabłka."],
            },
            {
              ENG: ["Mother gave me books.", "Mother gave books to me."],
              POL: ["Matka dała mi książki.", "Matka dała mnie książki."],
            },
            {
              ENG: ["Mother gave me onions.", "Mother gave onions to me."],
              POL: ["Matka dała mi cebule.", "Matka dała mnie cebule."],
            },
            {
              ENG: ["Mother gave me mirrors.", "Mother gave mirrors to me."],
              POL: [
                "Matka dała mi zwierciadła.",
                "Matka dała mi lustra.",
                "Matka dała mnie zwierciadła.",
                "Matka dała mnie lustra.",
              ],
            },
            {
              ENG: ["Mother gave us apples.", "Mother gave apples to us."],
              POL: ["Matka dała nam jabłka."],
            },
            {
              ENG: ["Mother gave us books.", "Mother gave books to us."],
              POL: ["Matka dała nam książki."],
            },
            {
              ENG: ["Mother gave us onions.", "Mother gave onions to us."],
              POL: ["Matka dała nam cebule."],
            },
            {
              ENG: ["Mother gave us mirrors.", "Mother gave mirrors to us."],
              POL: ["Matka dała nam zwierciadła.", "Matka dała nam lustra."],
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
    it("#pal13B-03b GET 200 YES: Poleng. Another more interesting sentence with Pronombres.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "112 familymember gave me things",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Ojciec dał mi jabłka.",
              ENG: [
                "Father gave me apples.",
                "Father had given me apples.",
                "Father has given me apples.",
                "Father gave apples to me.",
                "Father had given apples to me.",
                "Father has given apples to me.",
              ],
            },
            {
              POL: "Ojciec dał mi książki.",
              ENG: [
                "Father gave me books.",
                "Father had given me books.",
                "Father has given me books.",
                "Father gave books to me.",
                "Father had given books to me.",
                "Father has given books to me.",
              ],
            },
            {
              POL: "Ojciec dał mi cebule.",
              ENG: [
                "Father gave me onions.",
                "Father had given me onions.",
                "Father has given me onions.",
                "Father gave onions to me.",
                "Father had given onions to me.",
                "Father has given onions to me.",
              ],
            },
            {
              POL: ["Ojciec dał mi zwierciadła.", "Ojciec dał mi lustra."],
              ENG: [
                "Father gave me mirrors.",
                "Father had given me mirrors.",
                "Father has given me mirrors.",
                "Father gave mirrors to me.",
                "Father had given mirrors to me.",
                "Father has given mirrors to me.",
              ],
            },
            {
              POL: "Ojciec dał nam jabłka.",
              ENG: [
                "Father gave us apples.",
                "Father had given us apples.",
                "Father has given us apples.",
                "Father gave apples to us.",
                "Father had given apples to us.",
                "Father has given apples to us.",
              ],
            },
            {
              POL: "Ojciec dał nam książki.",
              ENG: [
                "Father gave us books.",
                "Father had given us books.",
                "Father has given us books.",
                "Father gave books to us.",
                "Father had given books to us.",
                "Father has given books to us.",
              ],
            },
            {
              POL: "Ojciec dał nam cebule.",
              ENG: [
                "Father gave us onions.",
                "Father had given us onions.",
                "Father has given us onions.",
                "Father gave onions to us.",
                "Father had given onions to us.",
                "Father has given onions to us.",
              ],
            },
            {
              POL: ["Ojciec dał nam zwierciadła.", "Ojciec dał nam lustra."],
              ENG: [
                "Father gave us mirrors.",
                "Father had given us mirrors.",
                "Father has given us mirrors.",
                "Father gave mirrors to us.",
                "Father had given mirrors to us.",
                "Father has given mirrors to us.",
              ],
            },
            {
              POL: "Matka dała mi jabłka.",
              ENG: [
                "Mother gave me apples.",
                "Mother had given me apples.",
                "Mother has given me apples.",
                "Mother gave apples to me.",
                "Mother had given apples to me.",
                "Mother has given apples to me.",
              ],
            },
            {
              POL: "Matka dała mi książki.",
              ENG: [
                "Mother gave me books.",
                "Mother had given me books.",
                "Mother has given me books.",
                "Mother gave books to me.",
                "Mother had given books to me.",
                "Mother has given books to me.",
              ],
            },
            {
              POL: "Matka dała mi cebule.",
              ENG: [
                "Mother gave me onions.",
                "Mother had given me onions.",
                "Mother has given me onions.",
                "Mother gave onions to me.",
                "Mother had given onions to me.",
                "Mother has given onions to me.",
              ],
            },
            {
              POL: ["Matka dała mi zwierciadła.", "Matka dała mi lustra."],
              ENG: [
                "Mother gave me mirrors.",
                "Mother had given me mirrors.",
                "Mother has given me mirrors.",
                "Mother gave mirrors to me.",
                "Mother had given mirrors to me.",
                "Mother has given mirrors to me.",
              ],
            },
            {
              POL: "Matka dała nam jabłka.",
              ENG: [
                "Mother gave us apples.",
                "Mother had given us apples.",
                "Mother has given us apples.",
                "Mother gave apples to us.",
                "Mother had given apples to us.",
                "Mother has given apples to us.",
              ],
            },
            {
              POL: "Matka dała nam książki.",
              ENG: [
                "Mother gave us books.",
                "Mother had given us books.",
                "Mother has given us books.",
                "Mother gave books to us.",
                "Mother had given books to us.",
                "Mother has given books to us.",
              ],
            },
            {
              POL: "Matka dała nam cebule.",
              ENG: [
                "Mother gave us onions.",
                "Mother had given us onions.",
                "Mother has given us onions.",
                "Mother gave onions to us.",
                "Mother had given onions to us.",
                "Mother has given onions to us.",
              ],
            },
            {
              POL: ["Matka dała nam lustra.", "Matka dała nam zwierciadła."],
              ENG: [
                "Mother gave us mirrors.",
                "Mother had given us mirrors.",
                "Mother has given us mirrors.",
                "Mother gave mirrors to us.",
                "Mother had given mirrors to us.",
                "Mother has given mirrors to us.",
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
    it("#pal13B-03c GET 200 YES: Poleng. Another more interesting sentence with Pronombres.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "112a familymember gave me thing",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Ojciec dał mi jabłko.",
              ENG: [
                "Father gave me one apple.",
                "Father had given me one apple.",
                "Father has given me one apple.",
              ],
            },
            {
              POL: "Ojciec dał mi książkę.",
              ENG: [
                "Father gave me one book.",
                "Father had given me one book.",
                "Father has given me one book.",
              ],
            },
            {
              POL: "Ojciec dał mi cebulę.",
              ENG: [
                "Father gave me one onion.",
                "Father had given me one onion.",
                "Father has given me one onion.",
              ],
            },
            {
              POL: ["Ojciec dał mi zwierciadło.", "Ojciec dał mi lustro."],
              ENG: [
                "Father gave me one mirror.",
                "Father had given me one mirror.",
                "Father has given me one mirror.",
              ],
            },
            {
              POL: "Ojciec dał nam jabłko.",
              ENG: [
                "Father gave us one apple.",
                "Father had given us one apple.",
                "Father has given us one apple.",
              ],
            },
            {
              POL: "Ojciec dał nam książkę.",
              ENG: [
                "Father gave us one book.",
                "Father had given us one book.",
                "Father has given us one book.",
              ],
            },
            {
              POL: "Ojciec dał nam cebulę.",
              ENG: [
                "Father gave us one onion.",
                "Father had given us one onion.",
                "Father has given us one onion.",
              ],
            },
            {
              POL: ["Ojciec dał nam zwierciadło.", "Ojciec dał nam lustro."],
              ENG: [
                "Father gave us one mirror.",
                "Father had given us one mirror.",
                "Father has given us one mirror.",
              ],
            },
            {
              POL: "Matka dała mi jabłko.",
              ENG: [
                "Mother gave me one apple.",
                "Mother had given me one apple.",
                "Mother has given me one apple.",
              ],
            },
            {
              POL: "Matka dała mi książkę.",
              ENG: [
                "Mother gave me one book.",
                "Mother had given me one book.",
                "Mother has given me one book.",
              ],
            },
            {
              POL: "Matka dała mi cebulę.",
              ENG: [
                "Mother gave me one onion.",
                "Mother had given me one onion.",
                "Mother has given me one onion.",
              ],
            },
            {
              POL: ["Matka dała mi zwierciadło.", "Matka dała mi lustro."],
              ENG: [
                "Mother gave me one mirror.",
                "Mother had given me one mirror.",
                "Mother has given me one mirror.",
              ],
            },
            {
              POL: "Matka dała nam jabłko.",
              ENG: [
                "Mother gave us one apple.",
                "Mother had given us one apple.",
                "Mother has given us one apple.",
              ],
            },
            {
              POL: "Matka dała nam książkę.",
              ENG: [
                "Mother gave us one book.",
                "Mother had given us one book.",
                "Mother has given us one book.",
              ],
            },
            {
              POL: "Matka dała nam cebulę.",
              ENG: [
                "Mother gave us one onion.",
                "Mother had given us one onion.",
                "Mother has given us one onion.",
              ],
            },
            {
              POL: ["Matka dała nam zwierciadło.", "Matka dała nam lustro."],
              ENG: [
                "Mother gave us one mirror.",
                "Mother had given us one mirror.",
                "Mother has given us one mirror.",
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
    it("#pal13B-04a GET 200 YES: Engpol. Another more interesting sentence with Pronombres. Terminal object used.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          devSaysOmitStChValidation: true,
          sentenceFormulaSymbol: "dummy57",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Women saw you (singular).",
              POL: ["Kobiety zobaczyły cię.", "Kobiety zobaczyły ciebie."],
            },
            {
              ENG: "Women saw you (plural).",
              POL: ["Kobiety zobaczyły was."],
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

  describe("/palette - Stage 14: Possessive pronombres.", () => {
    it("#pal14-01a GET 200 YES: POL. I have my onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          expect([
            "Ja mam moją cebulę.",
            "My mamy naszą cebulę.",
            "Ja mam moje cebule.",
            "My mamy nasze cebule.",
            "Mam moją cebulę.",
            "Mamy naszą cebulę.",
            "Mam moje cebule.",
            "Mamy nasze cebule.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-01b GET 200 YES: ENG. I have my onion.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          expect([
            "I have my onion.",
            "I have my onions.",
            "We have our onion.",
            "We have our onions.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-01c GET 200 YES: Engpol. I have my onion. Clarifier for 'my' should NOT be present.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I have my onion.",
              POL: ["Ja mam moją cebulę.", "Mam moją cebulę."],
            },
            {
              ENG: "We have our onion.",
              POL: ["My mamy naszą cebulę.", "Mamy naszą cebulę."],
            },
            {
              ENG: "I have my onions.",
              POL: ["Ja mam moje cebule.", "Mam moje cebule."],
            },
            {
              ENG: "We have our onions.",
              POL: ["My mamy nasze cebule.", "Mamy nasze cebule."],
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
    it("#pal14-01d GET 200 YES: Poleng. I have my onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["I have my onion.", "I am having my onion."],
              POL: "Ja mam moją cebulę.",
            },
            {
              ENG: ["We have our onion.", "We are having our onion."],
              POL: "My mamy naszą cebulę.",
            },
            {
              ENG: ["I have my onions.", "I am having my onions."],
              POL: "Ja mam moje cebule.",
            },
            {
              ENG: ["We have our onions.", "We are having our onions."],
              POL: "My mamy nasze cebule.",
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
    it("#pal14-01e GET 200 YES: Engpol. My onion.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy50b",
          useDummy: true,
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
    it("#pal14-01f GET 200 YES: Poleng. My onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy50b",
          useDummy: true,
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
    it("#pal14-02a GET 200 YES: Engpol. My father gave me a book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113 my father gave me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My father gave me a book.",
              POL: [
                "Mój ojciec dał mi książkę.",
                "Mój ojciec dał mnie książkę.",
              ],
            },
            {
              ENG: "My mother gave me a book.",
              POL: [
                "Moja matka dała mi książkę.",
                "Moja matka dała mnie książkę.",
              ],
            },
            {
              ENG: "Our father gave us a book.",
              POL: ["Nasz ojciec dał nam książkę."],
            },
            {
              ENG: "Our mother gave us a book.",
              POL: ["Nasza matka dała nam książkę."],
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
    it("#pal14-02b GET 200 YES: Poleng. My father gave me a book.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113 my father gave me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Mój ojciec dał mi książkę.",
              ENG: [
                "My father gave me a book.",
                "My father had given me a book.",
                "My father has given me a book.",
              ],
            },
            {
              POL: "Moja matka dała mi książkę.",
              ENG: [
                "My mother gave me a book.",
                "My mother had given me a book.",
                "My mother has given me a book.",
              ],
            },
            {
              POL: "Nasz ojciec dał nam książkę.",
              ENG: [
                "Our father gave us a book.",
                "Our father had given us a book.",
                "Our father has given us a book.",
              ],
            },
            {
              POL: "Nasza matka dała nam książkę.",
              ENG: [
                "Our mother gave us a book.",
                "Our mother had given us a book.",
                "Our mother has given us a book.",
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
    it("#pal14-03a GET 200 YES: POL. My father gave me his book.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          sentenceFormulaSymbol: "113a my father gave me his book",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          expect([
            "Mój ojciec dał mi jego książkę.",
            "Moja matka dała mi jej książkę.",
            "Nasz ojciec dał nam jego książkę.",
            "Nasza matka dała nam jej książkę.",
            "Moi ojcowie dali mi ich książkę.",
            "Moje matki dały mi ich książkę.",
            "Nasi ojcowie dali nam ich książkę.",
            "Nasze matki dały nam ich książkę.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-03b GET 200 YES: ENG. My father gave me his book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          sentenceFormulaSymbol: "113a my father gave me his book",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          expect([
            "My father gave me his book.",
            "My mother gave me her book.",
            "Our father gave us his book.",
            "Our mother gave us her book.",
            "My fathers gave me their book.",
            "My mothers gave me their book.",
            "Our fathers gave us their book.",
            "Our mothers gave us their book.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-03c GET 200 YES: Engpol. My father gave me his book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113a my father gave me his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My father gave me his book.",
              POL: [
                "Mój ojciec dał mi jego książkę.",
                "Mój ojciec dał mnie jego książkę.",
              ],
            },
            {
              ENG: "My mother gave me her book.",
              POL: [
                "Moja matka dała mi jej książkę.",
                "Moja matka dała mnie jej książkę.",
              ],
            },
            {
              ENG: "My fathers gave me their book.",
              POL: [
                "Moi ojcowie dali mi ich książkę.",
                "Moi ojcowie dali mnie ich książkę.",
              ],
            },
            {
              ENG: "My mothers gave me their book.",
              POL: [
                "Moje matki dały mi ich książkę.",
                "Moje matki dały mnie ich książkę.",
              ],
            },
            {
              ENG: "Our father gave us his book.",
              POL: ["Nasz ojciec dał nam jego książkę."],
            },
            {
              ENG: "Our mother gave us her book.",
              POL: ["Nasza matka dała nam jej książkę."],
            },
            {
              ENG: "Our fathers gave us their book.",
              POL: ["Nasi ojcowie dali nam ich książkę."],
            },
            {
              ENG: "Our mothers gave us their book.",
              POL: ["Nasze matki dały nam ich książkę."],
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
    it("#pal14-03d GET 200 YES: Poleng. My father gave me his book.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113a my father gave me his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Mój ojciec dał mi jego książkę.",
              ENG: [
                "My father gave me his book.",
                "My father had given me his book.",
                "My father has given me his book.",
              ],
            },
            {
              POL: "Moja matka dała mi jej książkę.",
              ENG: [
                "My mother gave me her book.",
                "My mother had given me her book.",
                "My mother has given me her book.",
              ],
            },
            {
              POL: "Nasz ojciec dał nam jego książkę.",
              ENG: [
                "Our father gave us his book.",
                "Our father had given us his book.",
                "Our father has given us his book.",
              ],
            },
            {
              POL: "Nasza matka dała nam jej książkę.",
              ENG: [
                "Our mother gave us her book.",
                "Our mother had given us her book.",
                "Our mother has given us her book.",
              ],
            },
            {
              POL: "Moi ojcowie dali mi ich książkę.",
              ENG: [
                "My fathers gave me their book.",
                "My fathers had given me their book.",
                "My fathers have given me their book.",
              ],
            },
            {
              POL: "Moje matki dały mi ich książkę.",
              ENG: [
                "My mothers gave me their book.",
                "My mothers had given me their book.",
                "My mothers have given me their book.",
              ],
            },
            {
              POL: "Nasi ojcowie dali nam ich książkę.",
              ENG: [
                "Our fathers gave us their book.",
                "Our fathers had given us their book.",
                "Our fathers have given us their book.",
              ],
            },
            {
              POL: "Nasze matki dały nam ich książkę.",
              ENG: [
                "Our mothers gave us their book.",
                "Our mothers had given us their book.",
                "Our mothers have given us their book.",
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
    it("#pal14-04a GET 200 YES: Engpol. The doctor gave me her book. Gender annotation is added when there's no AOC, because pronombre is 'their' so doesn't reveal gender. However in singular, the pronombres 'her' and 'his' reveal the gender (are AOCs) so no gender annotation.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "114 doctor gave me her book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The doctor gave me her book.",
              POL: [
                "Lekarka dała mi jej książkę.",
                "Lekarka dała mnie jej książkę.",
              ],
            },
            {
              ENG: "The doctor gave me his book.",
              POL: [
                "Lekarz dał mi jego książkę.",
                "Lekarz dał mnie jego książkę.",
              ],
            },
            {
              ENG: [
                "The doctors (mixed) gave me their book.",
                "The doctors (males) gave me their book.",
              ],
              POL: [
                "Lekarze dali mi ich książkę.",
                "Lekarze dali mnie ich książkę.",
              ],
            },
            {
              ENG: "The doctors (females) gave me their book.",
              POL: [
                "Lekarki dały mi ich książkę.",
                "Lekarki dały mnie ich książkę.",
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
    it("#pal14-04b GET 200 YES: Engpol. (not allowed to be unspecified, should be identical result to previous test). The doctor gave me her book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseDontSpecify: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "114 doctor gave me her book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              // ENG: "The doctor (female) gave me her book.",
              ENG: "The doctor gave me her book.",
              POL: [
                "Lekarka dała mi jej książkę.",
                "Lekarka dała mnie jej książkę.",
              ],
            },
            {
              // ENG: "The doctor (male) gave me his book.",
              ENG: "The doctor gave me his book.",
              POL: [
                "Lekarz dał mi jego książkę.",
                "Lekarz dał mnie jego książkę.",
              ],
            },
            {
              ENG: [
                "The doctors (mixed) gave me their book.",
                "The doctors (males) gave me their book.",
              ],
              POL: [
                "Lekarze dali mi ich książkę.",
                "Lekarze dali mnie ich książkę.",
              ],
            },
            {
              ENG: "The doctors (females) gave me their book.",
              POL: [
                "Lekarki dały mi ich książkę.",
                "Lekarki dały mnie ich książkę.",
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

  describe("/palette - Stage 15: Prepositions and Articles.", () => {
    it("#pal15-01a GET 200 YES: Poleng. Indefinite article.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy56",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["A tomato."],
              POL: "Pomidor.",
            },
            {
              ENG: ["An onion."],
              POL: "Cebula.",
            },
            {
              ENG: ["An apple."],
              POL: "Jabłko.",
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
    it("#pal15-01b GET 200 YES: Engpol. Indefinite article.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy56",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "A tomato.",
              POL: ["Pomidor."],
            },
            {
              ENG: "An onion.",
              POL: ["Cebula."],
            },
            {
              ENG: "An apple.",
              POL: ["Jabłko."],
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
    it("#pal15-02a GET 200 YES: Poleng. Either article.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy56a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["A woman.", "The woman."],
              POL: "Kobieta.",
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
    it("#pal15-02b GET 200 YES: Engpol. Either article.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy56a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "A woman.",
              POL: ["Kobieta."],
            },
            {
              ENG: "The woman.",
              POL: ["Kobieta."],
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
    it("#pal15-03a GET 200 YES: Poleng. Preposition 'with'. SHEEP (checking clarifiers) Articles for singular. Checking POL protective preposition form.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55c",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With a sheep.", "With the sheep."],
              POL: "Z owcą.",
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
    it("#pal15-03b GET 200 YES: Engpol. Preposition 'with'. SHEEP (checking clarifiers) Articles for singular. Checking POL protective preposition form.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55c",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With the sheep (singular).", "With a sheep."],
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
    it("#pal15-03c GET 200 YES: Poleng. Preposition 'with'. SHEEP (checking clarifiers) Articles for plural.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55d",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With sheep.", "With the sheep."],
              POL: "Z owcami.",
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
    it("#pal15-03d GET 200 YES: Engpol. Preposition 'with'. SHEEP (checking clarifiers) Articles for plural.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55d",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With the sheep (plural).", "With sheep."],
              POL: ["Z owcami."],
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
    it("#pal15-04a GET 200 YES: Poleng. Preposition 'with'. Articles for singular. Checking POL protective preposition form.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With a sheep.", "With the sheep."],
              POL: "Z owcą.",
            },
            {
              ENG: ["With a rat.", "With the rat."],
              POL: "Ze szczurem.",
            },
            {
              ENG: ["With a bear.", "With the bear."],
              POL: "Z niedźwiedziem.",
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
    it("#pal15-04b GET 200 YES: Engpol. Preposition 'with'. Articles for singular. Checking POL protective preposition form.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With the sheep.", "With a sheep."],
              POL: ["Z owcą."],
            },
            {
              ENG: ["With the rat.", "With a rat."],
              POL: ["Ze szczurem."],
            },
            {
              ENG: ["With the bear.", "With a bear."],
              POL: ["Z niedźwiedziem."],
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
    it("#pal15-04c GET 200 YES: Poleng. Preposition 'with'. Articles for plural.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55b",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With sheep.", "With the sheep."],
              POL: "Z owcami.",
            },
            {
              ENG: ["With rats.", "With the rats."],
              POL: "Ze szczurami.",
            },
            {
              ENG: ["With bears.", "With the bears."],
              POL: "Z niedźwiedziami.",
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
    it("#pal15-04d GET 200 YES: Engpol. Preposition 'with'. Articles for plural.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55b",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With the sheep.", "With sheep."],
              POL: ["Z owcami."],
            },
            {
              ENG: ["With the rats.", "With rats."],
              POL: ["Ze szczurami."],
            },
            {
              ENG: ["With the bears.", "With bears."],
              POL: ["Z niedźwiedziami."],
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
    it("#pal15-04e GET 200 YES: Poleng. Preposition 'with'. Articles for singular. merelyPreferredChoicesForQuestionSentence", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: ["With an apple.", "With the apple."],
              POL: "Z jabłkiem.",
            },
            {
              ENG: ["With a tomato.", "With the tomato."],
              POL: "Z pomidorem.",
            },
            {
              ENG: ["With an onion.", "With the onion."],
              POL: "Z cebulą.",
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
    it("#pal15-04f GET 200 YES: Engpol. Preposition 'with'. Articles for singular. merelyPreferredChoicesForQuestionSentence", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy55",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "With an apple.",
              POL: ["Z jabłkiem."],
            },
            {
              ENG: "With a tomato.",
              POL: ["Z pomidorem."],
            },
            {
              ENG: "With an onion.",
              POL: ["Z cebulą."],
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

  consol.logSpecialTestOutput(res.body);

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
