const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/testingUtils.js");
const { generalTranslatedSentencesRef } = testingUtils;
// chai.use(require("sams-chai-sorted"));
// const { myErrMsgs } = require("../errors/errors");
// const endpointsCopy = require("../endpoints.json");

//This is a Washburne style reference object.

describe("/api", () => {
  gpUtils.fillOutWashburneRefObj(
    generalTranslatedSentencesRef,
    "POL->ENG",
    "ENG->POL",
    "POL",
    "ENG"
  );
  // after(() => {});
  // beforeEach(() => {});

  describe("/palette - Stage 14: Possessive pronouns.", () => {
    it("#pal14-01a GET 200 YES: POL. I have my onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);

          expect([
            "Ja mam moją cebulę.",
            "My mamy naszą cebulę.",
            "Ja mam moje cebule.",
            "My mamy nasze cebule.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-01b GET 200 YES: ENG. I have my onion.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);

          expect([
            "I have my onion.",
            "I have my onions.",
            "We have our onion.",
            "We have our onions.",
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal14-01c GET 200 YES: ENG to POL. I have my onion.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy50a",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I have my onion.", POL: ["Ja mam moją cebulę."] },
            { ENG: "We have our onion.", POL: ["My mamy naszą cebulę."] },
            { ENG: "I have my onions.", POL: ["Ja mam moje cebule."] },
            { ENG: "We have our onions.", POL: ["My mamy nasze cebule."] },
          ];
          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal14-01d GET 200 YES: POL to ENG. I have my onion.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
    it("#pal14-02a GET 200 YES: ENG to POL. My father gave me a book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113 my father gave me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My father gave me a book.",
              POL: ["Mój ojciec dał mi książkę."],
            },
            {
              ENG: "My mother gave me a book.",
              POL: ["Moja matka dała mi książkę."],
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
    it("#pal14-02b GET 200 YES: POL to ENG. My father gave me a book.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
    it("#pal14-03a GET 200 YES: ENG to POL. My father gave me his book.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "113a my father gave me his book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "My father gave me his book.",
              POL: ["Mój ojciec dał mi jego książkę."],
            },
            {
              ENG: "My mother gave me her book.",
              POL: ["Moja matka dała mi jej książkę."],
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
              ENG: "My fathers gave me their book.",
              POL: ["Moi ojcowie dali mi ich książkę."],
            },
            {
              ENG: "My mothers gave me their book.",
              POL: ["Moje matki dały mi ich książkę."],
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
    it("#pal14-03b GET 200 YES: POL to ENG. My father gave me his book.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
  });

  describe("/palette - Stage 13B: Pronouns and other Multi Gender Nouns: Further tests.", () => {
    it("#pal13B-01a GET 200 YES: Specifiers not requested. ENG to POL. I am.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
    it("#pal13B-01b GET 200 YES: Specifiers requested but should not appear. ENG to POL. I am.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
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
    it("#pal13B-02a GET 200 YES: ENG to POL. A more interesting sentence with Pronouns.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "110 the woman read me a book",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "The woman was reading me a book.",
              POL: ["Kobieta czytała mi książkę."],
            },
            {
              ENG: "The women were reading me a book.",
              POL: ["Kobiety czytały mi książkę."],
            },
            {
              ENG: "The woman was reading a book to me.",
              POL: ["Kobieta czytała mi książkę."],
            },
            {
              ENG: "The women were reading a book to me.",
              POL: ["Kobiety czytały mi książkę."],
            },
            {
              ENG: "The woman was reading us a book.",
              POL: ["Kobieta czytała nam książkę."],
            },
            {
              ENG: "The women were reading us a book.",
              POL: ["Kobiety czytały nam książkę."],
            },
            {
              ENG: "The woman was reading a book to us.",
              POL: ["Kobieta czytała nam książkę."],
            },
            {
              ENG: "The women were reading a book to us.",
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
    it("#pal13B-02b GET 200 YES: POL to ENG. A more interesting sentence with Pronouns.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
    it("#pal13B-03a GET 200 YES: ENG to POL. Another more interesting sentence with Pronouns.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "112 familymember gave me things",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "Father gave me apples.",
              POL: ["Ojciec dał mi jabłka."],
            },
            {
              ENG: "Father gave me books.",
              POL: ["Ojciec dał mi książki."],
            },
            {
              ENG: "Father gave me onions.",
              POL: ["Ojciec dał mi cebule."],
            },
            {
              ENG: "Father gave me mirrors.",
              POL: ["Ojciec dał mi zwierciadła.", "Ojciec dał mi lustra."],
            },
            {
              ENG: "Father gave us apples.",
              POL: ["Ojciec dał nam jabłka."],
            },
            {
              ENG: "Father gave us books.",
              POL: ["Ojciec dał nam książki."],
            },
            {
              ENG: "Father gave us onions.",
              POL: ["Ojciec dał nam cebule."],
            },
            {
              ENG: "Father gave us mirrors.",
              POL: ["Ojciec dał nam zwierciadła.", "Ojciec dał nam lustra."],
            },
            {
              ENG: "Mother gave me apples.",
              POL: ["Matka dała mi jabłka."],
            },
            {
              ENG: "Mother gave me books.",
              POL: ["Matka dała mi książki."],
            },
            {
              ENG: "Mother gave me onions.",
              POL: ["Matka dała mi cebule."],
            },
            {
              ENG: "Mother gave me mirrors.",
              POL: ["Matka dała mi zwierciadła.", "Matka dała mi lustra."],
            },
            {
              ENG: "Mother gave us apples.",
              POL: ["Matka dała nam jabłka."],
            },
            {
              ENG: "Mother gave us books.",
              POL: ["Matka dała nam książki."],
            },
            {
              ENG: "Mother gave us onions.",
              POL: ["Matka dała nam cebule."],
            },
            {
              ENG: "Mother gave us mirrors.",
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
    it("#pal13B-03b GET 200 YES: POL to ENG. Another more interesting sentence with Pronouns.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
              ],
            },
            {
              POL: "Ojciec dał mi książki.",
              ENG: [
                "Father gave me books.",
                "Father had given me books.",
                "Father has given me books.",
              ],
            },
            {
              POL: "Ojciec dał mi cebule.",
              ENG: [
                "Father gave me onions.",
                "Father had given me onions.",
                "Father has given me onions.",
              ],
            },
            {
              POL: "Ojciec dał mi zwierciadła.",
              ENG: [
                "Father gave me mirrors.",
                "Father had given me mirrors.",
                "Father has given me mirrors.",
              ],
            },
            {
              POL: "Ojciec dał mi lustra.",
              ENG: [
                "Father gave me mirrors.",
                "Father had given me mirrors.",
                "Father has given me mirrors.",
              ],
            },
            {
              POL: "Ojciec dał nam jabłka.",
              ENG: [
                "Father gave us apples.",
                "Father had given us apples.",
                "Father has given us apples.",
              ],
            },
            {
              POL: "Ojciec dał nam książki.",
              ENG: [
                "Father gave us books.",
                "Father had given us books.",
                "Father has given us books.",
              ],
            },
            {
              POL: "Ojciec dał nam cebule.",
              ENG: [
                "Father gave us onions.",
                "Father had given us onions.",
                "Father has given us onions.",
              ],
            },
            {
              POL: "Ojciec dał nam zwierciadła.",
              ENG: [
                "Father gave us mirrors.",
                "Father had given us mirrors.",
                "Father has given us mirrors.",
              ],
            },
            {
              POL: "Ojciec dał nam lustra.",
              ENG: [
                "Father gave us mirrors.",
                "Father had given us mirrors.",
                "Father has given us mirrors.",
              ],
            },
            {
              POL: "Matka dała mi jabłka.",
              ENG: [
                "Mother gave me apples.",
                "Mother had given me apples.",
                "Mother has given me apples.",
              ],
            },
            {
              POL: "Matka dała mi książki.",
              ENG: [
                "Mother gave me books.",
                "Mother had given me books.",
                "Mother has given me books.",
              ],
            },
            {
              POL: "Matka dała mi cebule.",
              ENG: [
                "Mother gave me onions.",
                "Mother had given me onions.",
                "Mother has given me onions.",
              ],
            },
            {
              POL: "Matka dała mi zwierciadła.",
              ENG: [
                "Mother gave me mirrors.",
                "Mother had given me mirrors.",
                "Mother has given me mirrors.",
              ],
            },
            {
              POL: "Matka dała mi lustra.",
              ENG: [
                "Mother gave me mirrors.",
                "Mother had given me mirrors.",
                "Mother has given me mirrors.",
              ],
            },
            {
              POL: "Matka dała nam jabłka.",
              ENG: [
                "Mother gave us apples.",
                "Mother had given us apples.",
                "Mother has given us apples.",
              ],
            },
            {
              POL: "Matka dała nam książki.",
              ENG: [
                "Mother gave us books.",
                "Mother had given us books.",
                "Mother has given us books.",
              ],
            },
            {
              POL: "Matka dała nam cebule.",
              ENG: [
                "Mother gave us onions.",
                "Mother had given us onions.",
                "Mother has given us onions.",
              ],
            },
            {
              POL: "Matka dała nam zwierciadła.",
              ENG: [
                "Mother gave us mirrors.",
                "Mother had given us mirrors.",
                "Mother has given us mirrors.",
              ],
            },
            {
              POL: "Matka dała nam lustra.",
              ENG: [
                "Mother gave us mirrors.",
                "Mother had given us mirrors.",
                "Mother has given us mirrors.",
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

  describe("/palette - Stage 13A: Pronouns and other Multi Gender Nouns: Basic tests.", () => {
    it("#pal13A-01a GET 200 YES: doNotSpecify. Selection of either male or female versions of same person POL to ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109 doc wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Lekarz napisał receptę.",
              ENG: [
                "The doctor wrote a prescription.",
                "The doctor had written a prescription.",
                "The doctor has written a prescription.",
              ],
            },
            {
              POL: "Lekarka napisała receptę.",
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
    it("#pal13A-01b GET 200 YES: doNotSpecify. Selection of either male or female versions of same person ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
            // {
            //   ENG: "The doctor (male) was writing a prescription.",
            //   POL: ["Lekarz pisał receptę."],
            // },
            // {
            //   ENG: "The doctor (female) was writing a prescription.",
            //   POL: ["Lekarka pisała receptę."],
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
    it("#pal13A-01c GET 200 YES: PLURAL doNotSpecify. Selection of either male or female versions of same person POL to ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "109b docs wrote p",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Lekarze napisali receptę.",
              ENG: [
                "The doctors wrote a prescription.",
                "The doctors had written a prescription.",
                "The doctors have written a prescription.",
              ],
            },
            {
              POL: "Lekarki napisały receptę.",
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
    it("#pal13A-01d GET 200 YES: PLURAL doNotSpecify. Selection of either male or female versions of same person ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
            // {
            //   ENG: "The doctor (male) was writing a prescription.",
            //   POL: ["Lekarz pisał receptę."],
            // },
            // {
            //   ENG: "The doctor (female) was writing a prescription.",
            //   POL: ["Lekarka pisała receptę."],
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
    //
    //
    //
    it("#pal13A-02a GET 200 YES: Give a pronoun in ENG.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("I.");
        });
    });
    it("#pal13A-02b GET 200 YES: Give a pronoun in POL.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("Ja.");
        });
    });
    it("#pal13A-02c GET 200 YES: Give a pronoun in POL to ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("Ja.");
          expect(res.body.answerSentenceArr).to.have.members(["I."]);
        });
    });
    it("#pal13A-02d GET 200 YES: Give a pronoun in ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy48a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.questionSentenceArr).to.have.length(1);
          expect(res.body.questionSentenceArr[0]).to.equal("I.");
          expect(res.body.answerSentenceArr).to.have.members(["Ja."]);
        });
    });
    //
    //
    //
    it("#pal13A-03a-a GET 200 YES: ENG to POL. Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [{ ENG: "I wrote.", POL: ["Napisałem.", "Ja napisałem."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-03a-b GET 200 YES: ENG to POL. Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            { ENG: "We wrote.", POL: ["Napisałyśmy.", "My napisałyśmy."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-03a-c GET 200 YES: ENG to POL. WITH SPECIFIERS Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

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
    it("#pal13A-03a-d GET 200 YES: ENG to POL. WITH SPECIFIERS Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

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
    //
    //
    //
    //NOTA BENE: if you want an ENG Q sentence to have both gender Robił Robiła in POL A sentences,
    //then instead of setting no gender, you must set gender as allPersonalGenders.
    it("#pal13A-03b-a GET 200 YES: ENG to POL. (allPersonalGenders was specified.) Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49e",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: "I (female) wrote.",
              POL: ["Napisałam.", "Ja napisałam."],
            },
            {
              ENG: "I (male) wrote.",
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
    it("#pal13A-03b-b GET 200 YES: ENG to POL. (allPersonalGenders was specified.) Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49f",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: "We (males) wrote.",
              POL: ["Napisaliśmy.", "My napisaliśmy."],
            },
            {
              ENG: "We (mixed) wrote.",
              POL: ["Napisaliśmy.", "My napisaliśmy."],
            },
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
    it("#pal13A-03b-c GET 200 YES: ENG to POL. (No gender was specified.) WITH CLARIFIERS Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            { ENG: "I (male) wrote.", POL: ["Napisałem.", "Ja napisałem."] },
            { ENG: "I (female) wrote.", POL: ["Napisałam.", "Ja napisałam."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-03b-d GET 200 YES: ENG to POL. (No gender was specified.) WITH CLARIFIERS Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49d",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: "We (males) wrote.",
              POL: ["Napisaliśmy.", "My napisaliśmy."],
            },
            {
              ENG: "We (mixed) wrote.",
              POL: ["Napisaliśmy.", "My napisaliśmy."],
            },
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
    //
    //
    //
    it("#pal13A-04a-a GET 200 YES: POL to ENG. Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałem.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04a-b GET 200 YES: POL to ENG. Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisałyśmy.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04a-c GET 200 YES: POL to ENG. NO CLARIFIERS Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałem.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04a-d GET 200 YES: POL to ENG. NO CLARIFIERS Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisałyśmy.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    //
    //
    //
    it("#pal13A-04b-a GET 200 YES: POL to ENG. Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałam.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałam.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04b-b GET 200 YES: POL to ENG. Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49d",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisaliśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisaliśmy.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04b-c GET 200 YES: POL to ENG. NO CLARIFIERS Inherit features from pronoun to verb (m sing).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49c",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałem.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Napisałam.",
            },
            {
              ENG: ["I wrote.", "I had written.", "I have written."],
              POL: "Ja napisałam.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal13A-04b-d GET 200 YES: POL to ENG. NO CLARIFIERS Inherit features from pronoun to verb (nonvir plur).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy49b",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisałyśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "Napisaliśmy.",
            },
            {
              ENG: ["We wrote.", "We had written.", "We have written."],
              POL: "My napisaliśmy.",
            },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    //
    //
    //
    xit("#pal13A-05a GET 200 YES: ENG to POL. No gender specified in stCh for MGN.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          useDummy: true,
          answerLanguage,
          sentenceFormulaSymbol: "dummy51a",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

          let ref = [
            {
              ENG: "The doctor wrote.",
              POL: ["Lekarz napisał.", "Lekarka napisała."],
            },
            {
              ENG: "The doctor read.",
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
    // xit("#pal13A-##a GET 200 YES: Singular pronouns: Verb person and number is inherited from pronoun headChunk.", () => {
    //   const questionLanguage = "ENG";
    //   const answerLanguage = "POL";

    //   return request(app)
    //     .get("/api/palette")
    //     .send({
    //       doNotSpecify: true,
    //       hideClarifiersForTestingPurposes: true,
    //       questionLanguage,
    //       answerLanguage,
    //       sentenceFormulaSymbol: "108 singular I am",
    //     })
    //     .expect(200)
    //     .then((res) => {
    //       let ref = [
    //         { ENG: "I am.", POL: ["Jestem."] },
    //         { ENG: "You are.", POL: ["Jesteś."] },
    //         { ENG: "He is.", POL: ["Jest."] },
    //         { ENG: "She is.", POL: ["Jest."] },
    //         { ENG: "It is.", POL: ["Jest."] },
    //       ];

    //       testingUtils.checkTranslationsOfGivenRef(
    //         res,
    //         ref,
    //         questionLanguage,
    //         answerLanguage
    //       );
    //     });
    // });
  });

  describe("/palette - Stage 12: Further linguistic features.", () => {
    it("#pal12-01a GET 200 YES: Tantum plurale in POL is allowed to be sing or plur in ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Czerwone drzwi."]).to.include(questionSentenceArr[0]);
          expect(answerSentenceArr).to.have.members([
            "Red door.",
            "Red doors.",
          ]);
        });
    });
    it("#pal12-01b GET 200 YES: RSWAT for ENG sing to POL tantum plurale.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door singular",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Red door."]).to.include(questionSentenceArr[0]);
          expect(answerSentenceArr).to.have.members(["Czerwone drzwi."]);
        });
    });
    it("#pal12-01c GET 200 YES: RSWAT for ENG to POL tantum plurale.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "red door",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          let { questionSentenceArr, answerSentenceArr } = res.body;
          expect(["Red door.", "Red doors."]).to.includes(
            questionSentenceArr[0]
          );
          expect(answerSentenceArr).to.have.members(["Czerwone drzwi."]);
        });
    });
    xit("#pal12-##a GET 200 YES: RSWAT for First Conditional POL->ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              POL: "Jeśli napiszesz książkę , ją zbadam.",
              ENG: ["If you write a book , I will research it."],
            },
            {
              POL: "Jeśli będziesz pisać książkę , ją zbadam.",
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
    xit("#pal12-##b GET 200 YES: RSWAT for First Conditional ENG->POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          let ref = [
            {
              ENG: "If you write a book , I will research it.",
              POL: ["Jeśli napiszesz książkę , ją zbadam."],
            },
            {
              ENG: "If you write a book , I will research it.",
              POL: ["Jeśli będziesz pisać książkę , ją zbadam."],
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

  describe("/palette - Stage 11: Adding Specifiers.", () => {
    it("#pal11-01a GET 200 YES: SPECIFIER EXPECTED. Multi Gender Noun. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          pleaseSpecifyMGNs: true,
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
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
    it("#pal11-01b GET 200 YES: SPECIFIER EXPECTED Multi Gender Noun PLURAL. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          pleaseSpecifyMGNs: true,
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
    it("#pal11-02a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR. Pronoun I/WE. {pres im} needs no gender. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
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
    it("#pal11-02b GET 200 YES: SPECIFIER EXPECTED. Pronoun I/WE. {past im} does indeed need gender. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111b I was",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "I (male) was.", POL: ["Byłem.", "Ja byłem."] },
            { ENG: "I (female) was.", POL: ["Byłam.", "Ja byłam."] },
            { ENG: "We (males) were.", POL: ["Byliśmy.", "My byliśmy."] },
            { ENG: "We (mixed) were.", POL: ["Byliśmy.", "My byliśmy."] },
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
    it("#pal11-03a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR if noun already has gender.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy47",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            { ENG: "The woman wrote.", POL: ["Kobieta napisała."] },
            { ENG: "The woman was writing.", POL: ["Kobieta pisała."] },
            {
              ENG: "The woman has written.",
              POL: ["Kobieta napisała.", "Kobieta pisała."],
            },
            { ENG: "The woman had written.", POL: ["Kobieta napisała."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal11-04a GET 200 YES: GIVE MULTIPLE ANSWER OPTIONS WHEN SPECIFIERS NOT REQUESTED. Pronoun I/WE. {past im} does indeed need gender. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
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
              ENG: "We (males) were.",
              POL: ["Byliśmy.", "My byliśmy."],
            },
            {
              ENG: "We (mixed) were.",
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
    it("#pal11-05a GET 200 YES: Gives clarifiers and specifiers. Pronoun YOU. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // doNotSpecify: true,
          // hideClarifiersForTestingPurposes: true,
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
              ENG: "You (plural, males) were.",
              POL: ["Byliście.", "Wy byliście."],
            },
            {
              ENG: "You (plural, mixed) were.",
              POL: ["Byliście.", "Wy byliście."],
            },
            {
              ENG: "You (plural, females) were.",
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

  describe("/palette - Stage 10: Allohomographs (adding Clarifiers).", () => {
    it("#pal10-01a Type 1 Allohomographs of SingleWordtype: 'nut' ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-01b Type 1 Allohomographs of SingleWordtype: 'nut' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
            { POL: "Mały orzech.", ENG: ["A small nut."] },
            { POL: "Mała nakrętka.", ENG: ["A small nut."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02a Type 1 Allohomographs of MultipleWordtype: 'bear (noun)' ENG to POL. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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

          let ref = [{ ENG: "Bear (noun).", POL: ["Niedźwiedź."] }];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-02b Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' ENG to POL. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-02c Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' ENG to POL. Did NOT request allo-multi-clarifiers in structureChunk.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-02d Type 1 Allohomographs of MultipleWordtype: 'bear (noun)' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-02e Type 1 Allohomographs of MultipleWordtype: 'bear (verb)' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-03a Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' ENG to POL. Textmoji Clarifier expected. Wordtype Clarifier not requested.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-03b Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' ENG to POL. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
            { ENG: "Tie (⚽, score, noun).", POL: ["Remis."] },
            { ENG: "Tie (👔, clothes, noun).", POL: ["Krawat."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03c Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' ENG to POL. Textmoji Clarifier expected. Wordtype Clarifier not requested.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-03d Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' ENG to POL. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal10-03e Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (noun)' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
            { POL: "Remis.", ENG: ["Tie."] },
            { POL: "Krawat.", ENG: ["Tie."] },
          ];

          testingUtils.checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal10-03f Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (verb)' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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

  describe("/palette - Stage 9: Synhomographs (adding Clarifiers).", () => {
    it("#pal09-01a (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-01b 'sheep': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-02a (Type 2 Synhomographs. Ad-PW: clarify Inflections (tenseDescription)) 'read': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-02b (Ad-PW: clarify Inflections (tenseDescription)) 'read': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03a (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03b (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03c (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03d (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03e (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03f (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
              "Będziecie pisały.",
              "Będziecie pisali.",
            ]
          );
        });
    });
    it("#pal09-03g (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'be': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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
    it("#pal09-03h (Ad-PW: clarify Inflections) 'be': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: false,
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

  console.log({ "RESULT: res.body:": body });

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
