const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { generalTranslatedSentencesRef } = testingUtils;
const { runPaletteTest, promiseAllMultiplier, checkProportions } = testingUtils;

// MGN:            Multi-gender noun. Eg doctor in ENG can be either male or female.
// ProsMgn:        "My doctor and her book." Connected pronombre reveals gender of MGN. Doesn't need an annotation for doctor as clearly must be lekarka.
// EdusMgn:        "My doctor is a man."     Educator specifies MGN's gender. Sentence where educator knows that this MGN will need no clarifying.

describe("/api", function () {
  this.timeout(5000);

  gpUtils.fillOutWashburneRefObj(
    generalTranslatedSentencesRef,
    "POL->ENG",
    "ENG->POL",
    "POL",
    "ENG"
  );
  // after(() => {});
  // beforeEach(() => {});

  let originalCopies = require("./originalCopies.js");

  let langs = ["ENG", "POL"];

  langs.forEach((lang) => {
    originalCopies[lang] = uUtils.copyWithoutReference(
      scUtils.getWordsAndFormulas(lang)
    );
  });

  describe("/", () => {
    it("#api-01 GET 200 Serves up endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(res.body.endpoints).to.be.an("Object");
        });
    });
    it("#api-02 Responds 405 if any other methods are used at this endpoint", () => {
      const url = "/api";
      return Promise.all([
        request(app).del(url),
        request(app).patch(url),
        request(app).post(url),
      ]).then((resArr) => {
        resArr.forEach((response) => {
          expect(405);
        });
      });
    });
  });

  describe("/palette - Stage 1: Basics", () => {
    it("#pal01-01a GET 200 YES: Returns a sentence", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
        });
    });
    it("#pal01-02a GET 200 NO: Returns message to say no sentence can be created from specifications.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy01",
          useDummy: true,
          devSaysOmitStChValidation: true,
        })
        .expect(200)
        .then((res) => {
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-02b GET 200 NO: Returns message to say no sentence could possibly be created from specifications. This fails when in dev, as I put a throw. But in PROD the throw will be removed.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy02",
          devSaysOmitStChValidation: true,
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03a GET 200 NO: Returns message to say no sentence, if dummy noun was successfully filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy03",
          useDummy: true,
          devSaysOmitStChValidation: true,
        })
        .expect(200)
        .then((res) => {
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03b GET 200 NO: Returns message to say no sentence, if dummy noun was successfully filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy04",
          useDummy: true,
          devSaysOmitStChValidation: true,
        })
        .expect(200)
        .then((res) => {
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03c GET 200 YES: Returns sentence, as dummy noun did not need to be filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy05",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
        });
    });
    it("#pal01-03d GET 200 YES: Returns successful sentence 100% of the time, rather than 33%, as one of the dummy nouns should have been filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy06",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
        });
    });
    it("#pal01-03e GET 200 NO: Returns message to say no sentence, as dummy noun should have been filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy07",
          useDummy: true,
          devSaysOmitStChValidation: true,
        })
        .expect(200)
        .then((res) => {
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03f GET 200 YES: Returns successful sentence 100% of the time, even though I've tried to trick it, by asking for Singular and Loc, and including an object that does indeed have Singular (but Loc is not within), and has Plural (with Loc within).", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy08",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
        });
    });
    it("#pal01-03g GET 200 YES: Testing whether object traversing fxn can avoid getting stuck by going down dead-ends.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy19",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
        });
    });
    it("#pal01-04a GET 200 YES: Checking in console logs whether structureChunks have indeed been updated with the traitValues for eg number, gender, gcase of the finally selected word they structure for.", () => {
      return runPaletteTest("POL", null, "I have apple");
    });
    it("#pal01-05a GET 200 YES: Check order of words in final sentence, based on one specified order.", () => {
      return runPaletteTest("POL", null, "dummy09", [
        "Foobar-A foobar-C foobar-B.",
      ]);
    });
    it("#pal01-05b GET 200 YES: Check order of words in final sentence, based on multiple specified orders.", () => {
      return runPaletteTest("POL", null, "dummy10", [
        "Foobar-A foobar-B foobar-C.",
        "Foobar-A foobar-C foobar-B.",
        "Foobar-B foobar-A foobar-C.",
        "Foobar-B foobar-C foobar-A.",
      ]);
    });
    it("#pal01-06a GET 200 YES: Filter by specified lemma.", () => {
      return runPaletteTest("POL", null, "dummy I have APPLE", ["Mam jabłko."]);
    });
    it("#pal01-06b GET 200 YES: Filter by a selection of multiple specified lemmas.", () => {
      return runPaletteTest("POL", null, "dummy I have APPLE/SHIRT", [
        "Mam jabłka.",
        "Mam majtki.",
      ]);
    });
    it("#pal01-07 Responds 405 if any other methods are used at this endpoint", () => {
      const url = "/api/palette";
      return Promise.all([
        request(app).del(url),
        request(app).patch(url),
        request(app).post(url),
      ]).then((resArr) => {
        resArr.forEach((response) => {
          expect(405);
        });
      });
    });
  });

  describe("/palette - Stage 2: Nouns", () => {
    it("#pal02-01a GET 200 YES: Returns a sentence where a tantum plurale was allowed, as no particular grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl is wearing shirt",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
          expect(
            res.body.questionSentenceArr[0].split(" ").reverse()[0]
          ).to.equal("majtki.");
        });
    });
    it("#pal02-01b GET 200 NO: Disallows tantum plurale, as singular grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaSymbol: "shirt is in wardrobe",
          devSaysOmitStChValidation: true,
        })
        .expect(200)
        .then((res) => {
          expect([
            "No sentence could be created from the specifications in Q.",
            "No sentence could be created from the specifications in A.",
          ]).to.include(res.body.questionMessage);
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal02-01c GET 200 YES: Returns a sentence where a tantum plurale was allowed, as either singular or plural grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I often wear shirt",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          consol.log(res.body);
          expect(
            res.body.questionSentenceArr[0].split(" ").reverse()[0]
          ).to.equal("majtki.");
        });
    });
    it("#pal02-02a GET 200 YES: Returns a sentence where end of inflection chain could be array.", () => {
      return runPaletteTest("POL", null, "boys are male");
    });
  });

  describe("/palette - Stage 3: Adjectives", () => {
    it("#pal03-01a GET 200 YES: Returns a sentence where adjective agrees with noun in singular. Filtered by orTags.", () => {
      return runPaletteTest("POL", null, "red/blue apple", [
        "Czerwona cebula.",
        "Czerwone jabłko.",
        "Niebieska cebula.",
        "Niebieskie jabłko.",
      ]);
    });
    it("#pal03-02a GET 200 YES: Returns a sentence where adjective agrees with noun in singular. Filtered by andTags.", () => {
      return runPaletteTest("POL", null, "red apple", [
        "Czerwona cebula.",
        "Czerwone jabłko.",
      ]);
    });
    it("#pal03-02b GET 200 YES: Returns a sentence where adjective agrees with noun in nonvirile plural.", () => {
      return runPaletteTest("POL", null, "red apples", [
        "Czerwone cebule.",
        "Czerwone jabłka.",
      ]);
    });
    it("#pal03-02c GET 200 YES: Returns a sentence where adjective agrees with noun in virile or nonvirile plural.", () => {
      return runPaletteTest("POL", null, "red girls", [
        "Czerwoni chłopcy.",
        "Czerwoni chłopacy.",
        "Czerwoni chłopaki.",
        "Czerwone kobiety.",
      ]);
    });
  });

  describe("/palette - Stage 4: Verbs", () => {
    it("#pal04-01a GET 200 YES: Returns a sentence with a single verb, in present.", () => {
      return runPaletteTest("POL", null, "I am reading", [
        "Czytam.",
        "Czytasz.",
        "Czyta.",
        "Czytamy.",
        "Czytacie.",
        "Czytają.",
      ]);
    });
    it("#pal04-01b GET 200 YES: Returns a sentence with a single verb, with person specified.", () => {
      return runPaletteTest("POL", null, "dummy12a 2per", [
        "Czytasz.",
        "Czytacie.",
        "Czytałeś.",
        "Czytałaś.",
        "Czytaliście.",
        "Czytałyście.",
        "Będziesz czytał.",
        "Będziesz czytać.",
        "Będziesz czytała.",
        "Będziesz czytać.",
        "Będziecie czytali.",
        "Będziecie czytać.",
        "Będziecie czytały.",
        "Będziecie czytać.",
        "Czytałbyś.",
        "Czytałabyś.",
        "Czytalibyście.",
        "Czytałybyście.",
        "Czytaj.",
        "Czytajcie.",
      ]);
    });
    it("#pal04-01d GET 200 YES: Returns a sentence with a single verb, with tense number and gender specified.", () => {
      return runPaletteTest("POL", null, "dummy13b present 2per f", [
        "Czytasz.",
        "Czytacie.",
      ]);
    });
    it("#pal04-01e GET 200 YES: Returns a sentence with a single verb in infinitive.", () => {
      return runPaletteTest("POL", null, "dummy14 infinitive", ["Czytać."]);
    });
    it("#pal04-01f GET 200 YES: Returns a sentence with a single verb in impersonal.", () => {
      return runPaletteTest("POL", null, "dummy15 impersonal", [
        "Czyta się.",
        "Czytano.",
        "Będzie czytać się.",
        "Czytano by.",
      ]);
    });
    it("#pal04-01g GET 200 YES: Returns a sentence with a single verb in impersonal, even when plural is specified (returns just those impersonals that have plural use).", () => {
      return runPaletteTest("POL", null, "dummy15a impersonal plural", [
        "Czytano.",
        "Czytano by.",
        "Będzie czytać się.",
        "Czyta się.",
      ]);
    });
    it("#pal04-01h GET 200 YES: Returns a sentence with a single verb in impersonal, even when plural is specified (returns just those impersonals that have plural use).", () => {
      return runPaletteTest("POL", null, "dummy15b impersonal plural", [
        "Przeczyta się.",
        "Przeczytano.",
        "Przeczytano by.",
      ]);
    });
    it("#pal04-02a GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle.", () => {
      return runPaletteTest("POL", null, "dummy16 contemporaryAdverbial", [
        "Czytając.",
      ]);
    });
    it("#pal04-02b GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle, ignoring gender.", () => {
      return runPaletteTest(
        "POL",
        null,
        "dummy17 contemporaryAdverbial female",
        ["Czytając."]
      );
    });
    it("#pal04-02c GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle, ignoring gender and person.", () => {
      return runPaletteTest(
        "POL",
        null,
        "dummy18 contemporaryAdverbial n virile 2per",
        ["Czytając."]
      );
    });
    it("#pal04-02d GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle.", () => {
      return runPaletteTest("POL", null, "dummy16a anteriorAdverbial", [
        "Przeczytawszy.",
      ]);
    });
    it("#pal04-02e GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle, ignoring gender.", () => {
      return runPaletteTest("POL", null, "dummy17a anteriorAdverbial female", [
        "Przeczytawszy.",
      ]);
    });
    it("#pal04-02f GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle, ignoring gender and person.", () => {
      return runPaletteTest(
        "POL",
        null,
        "dummy18a anteriorAdverbial n virile 2per",
        ["Przeczytawszy."]
      );
    });
    it("#pal04-03a GET 200 YES: Returns a sentence with a single verb's verbalNoun.", () => {
      return runPaletteTest("POL", null, "dummy21 verbalNoun", ["Czytanie."]);
    });
    it("#pal04-04a GET 200 YES: Returns verb in virile when one gender option is given.", () => {
      return runPaletteTest("POL", null, "dummy23a past/cond 1per plural m1", [
        "Czytaliśmy.",
        "Czytaliście.",
        "Czytali.",
        "Czytalibyśmy.",
        "Czytalibyście.",
        "Czytaliby.",
      ]);
    });
    it("#pal04-04b GET 200 YES: Returns verb in nonvirile when one gender option is given.", () => {
      return runPaletteTest("POL", null, "dummy23b past/cond 1per plural m2", [
        "Czytałyśmy.",
        "Czytałyście.",
        "Czytały.",
        "Czytałybyśmy.",
        "Czytałybyście.",
        "Czytałyby.",
      ]);
    });
    it("#pal04-04c GET 200 YES: Returns verb in nonvirile when two gender options are given.", () => {
      return runPaletteTest("POL", null, "dummy23c past/cond 1per plural f/n", [
        "Czytałyśmy.",
        "Czytałyście.",
        "Czytały.",
        "Czytałybyśmy.",
        "Czytałybyście.",
        "Czytałyby.",
      ]);
    });
    it("#pal04-05a GET 200 YES: Conjugate verb (as virile or nonvirile) to agree with noun in plural.", () => {
      return runPaletteTest("POL", null, "girls were reading", [
        "Kobiety czytały.",
        "Chłopcy czytali.",
        "Chłopaki czytali.",
        "Chłopacy czytali.",
      ]);
    });
    it("#pal04-05b GET 200 YES: Conjugate verb to agree with noun in singular or plural.", () => {
      return runPaletteTest("POL", null, "girl is reading", [
        "Kobieta czyta.",
        "Kobiety czytają.",
      ]);
    });
    it("#pal04-06a GET 200 YES: Select a verb by the Aspect selector.", () => {
      return runPaletteTest("POL", null, "dummy20a girl is reading im", [
        "Kobieta czyta.",
        "Kobiety czytają.",
      ]);
    });
    it("#pal04-06b GET 200 YES: Select a verb by the Aspect selector.", () => {
      return runPaletteTest("POL", null, "dummy20b girl will read pf", [
        "Kobieta przeczyta.",
        "Kobiety przeczytają.",
      ]);
    });
    it("#pal04-07a GET 200 YES: Make two verbs agree.", () => {
      return runPaletteTest("POL", null, "dummy24a I read and research", [
        "Czytam i badam.",
      ]);
    });
    it("#pal04-07b GET 200 YES: Make two verbs agree when there is a choice of person.", () => {
      return runPaletteTest("POL", null, "dummy24b I/you read and research", [
        "Czytam i badam.",
        "Czytasz i badasz.",
      ]);
    });
    it("#pal04-07c GET 200 YES: Make two verbs agree when there is a choice of person, gender, and number.", () => {
      return runPaletteTest("POL", null, "dummy24c read and research", [
        "Czytam i badam.",
        "Czytasz i badasz.",

        "Czytałem i badałem.",
        "Czytałam i badałam.",
        "Czytałeś i badałeś.",
        "Czytałaś i badałaś.",

        "Czytamy i badamy.",
        "Czytacie i badacie.",

        "Czytałyśmy i badałyśmy.",
        "Czytaliśmy i badaliśmy.",
        "Czytałyście i badałyście.",
        "Czytaliście i badaliście.",
      ]);
    });
  });

  describe("/palette - Stage 5: Generate rich sentences (nouns adjectives and verbs).", () => {
    it("#pal05-01a GET 200 YES: Returns a sentence in present.", () => {
      return runPaletteTest("POL", null, "girl has red apple", [
        "Kobieta ma czerwone jabłko.",
        "Chłopiec ma czerwone jabłko.",
        "Chłopak ma czerwone jabłko.",

        "Kobieta ma czerwone jabłka.",
        "Chłopiec ma czerwone jabłka.",
        "Chłopak ma czerwone jabłka.",

        "Kobiety mają czerwone jabłko.",
        "Chłopcy mają czerwone jabłko.",
        "Chłopacy mają czerwone jabłko.",
        "Chłopaki mają czerwone jabłko.",

        "Kobiety mają czerwone jabłka.",
        "Chłopcy mają czerwone jabłka.",
        "Chłopacy mają czerwone jabłka.",
        "Chłopaki mają czerwone jabłka.",

        "Kobieta ma czerwoną cebulę.",
        "Chłopiec ma czerwoną cebulę.",
        "Chłopak ma czerwoną cebulę.",

        "Kobieta ma czerwone cebule.",
        "Chłopiec ma czerwone cebule.",
        "Chłopak ma czerwone cebule.",

        "Kobiety mają czerwoną cebulę.",
        "Chłopcy mają czerwoną cebulę.",
        "Chłopacy mają czerwoną cebulę.",
        "Chłopaki mają czerwoną cebulę.",

        "Kobiety mają czerwone cebule.",
        "Chłopcy mają czerwone cebule.",
        "Chłopacy mają czerwone cebule.",
        "Chłopaki mają czerwone cebule.",
      ]);
    });
    it("#pal05-01b GET 200 YES: Returns a negative sentence in past.", () => {
      return runPaletteTest("POL", null, "girl didn't have red apple", [
        "Kobieta nie miała czerwonego jabłka.",
        "Chłopiec nie miał czerwonego jabłka.",
        "Chłopak nie miał czerwonego jabłka.",

        "Kobieta nie miała czerwonych jabłek.",
        "Chłopiec nie miał czerwonych jabłek.",
        "Chłopak nie miał czerwonych jabłek.",

        "Kobiety nie miały czerwonego jabłka.",
        "Chłopcy nie mieli czerwonego jabłka.",
        "Chłopacy nie mieli czerwonego jabłka.",
        "Chłopaki nie mieli czerwonego jabłka.",

        "Kobiety nie miały czerwonych jabłek.",
        "Chłopcy nie mieli czerwonych jabłek.",
        "Chłopacy nie mieli czerwonych jabłek.",
        "Chłopaki nie mieli czerwonych jabłek.",

        "Kobieta nie miała czerwonej cebuli.",
        "Chłopiec nie miał czerwonej cebuli.",
        "Chłopak nie miał czerwonej cebuli.",

        "Kobieta nie miała czerwonych cebul.",
        "Chłopiec nie miał czerwonych cebul.",
        "Chłopak nie miał czerwonych cebul.",

        "Kobiety nie miały czerwonej cebuli.",
        "Chłopcy nie mieli czerwonej cebuli.",
        "Chłopacy nie mieli czerwonej cebuli.",
        "Chłopaki nie mieli czerwonej cebuli.",

        "Kobiety nie miały czerwonych cebul.",
        "Chłopcy nie mieli czerwonych cebul.",
        "Chłopacy nie mieli czerwonych cebul.",
        "Chłopaki nie mieli czerwonych cebul.",
      ]);
    });
    it("#pal05-01c GET 200 YES: Returns a negative sentence in past.", () => {
      return runPaletteTest("POL", null, "red girl didn't have red apple", [
        "Czerwona kobieta nie miała czerwonego jabłka.",
        "Czerwony chłopiec nie miał czerwonego jabłka.",
        "Czerwony chłopak nie miał czerwonego jabłka.",

        "Czerwona kobieta nie miała czerwonych jabłek.",
        "Czerwony chłopiec nie miał czerwonych jabłek.",
        "Czerwony chłopak nie miał czerwonych jabłek.",

        "Czerwone kobiety nie miały czerwonego jabłka.",
        "Czerwoni chłopcy nie mieli czerwonego jabłka.",
        "Czerwoni chłopacy nie mieli czerwonego jabłka.",
        "Czerwoni chłopaki nie mieli czerwonego jabłka.",

        "Czerwone kobiety nie miały czerwonych jabłek.",
        "Czerwoni chłopcy nie mieli czerwonych jabłek.",
        "Czerwoni chłopacy nie mieli czerwonych jabłek.",
        "Czerwoni chłopaki nie mieli czerwonych jabłek.",

        "Czerwona kobieta nie miała czerwonej cebuli.",
        "Czerwony chłopiec nie miał czerwonej cebuli.",
        "Czerwony chłopak nie miał czerwonej cebuli.",

        "Czerwona kobieta nie miała czerwonych cebul.",
        "Czerwony chłopiec nie miał czerwonych cebul.",
        "Czerwony chłopak nie miał czerwonych cebul.",

        "Czerwone kobiety nie miały czerwonej cebuli.",
        "Czerwoni chłopcy nie mieli czerwonej cebuli.",
        "Czerwoni chłopacy nie mieli czerwonej cebuli.",
        "Czerwoni chłopaki nie mieli czerwonej cebuli.",

        "Czerwone kobiety nie miały czerwonych cebul.",
        "Czerwoni chłopcy nie mieli czerwonych cebul.",
        "Czerwoni chłopacy nie mieli czerwonych cebul.",
        "Czerwoni chłopaki nie mieli czerwonych cebul.",
      ]);
    });
    it("#pal05-02a GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return runPaletteTest("POL", null, "girl reads present im", [
        "Kobieta czyta.",
        "Chłopiec czyta.",
        "Chłopak czyta.",

        "Kobiety czytają.",
        "Chłopcy czytają.",
        "Chłopacy czytają.",
        "Chłopaki czytają.",
      ]);
    });
    it("#pal05-02b GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return runPaletteTest("POL", null, "girl reads past pf", [
        "Kobieta przeczytała.",
        "Chłopiec przeczytał.",
        "Chłopak przeczytał.",

        "Kobiety przeczytały.",
        "Chłopcy przeczytali.",
        "Chłopacy przeczytali.",
        "Chłopaki przeczytali.",
      ]);
    });
    it("#pal05-02c GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return runPaletteTest("POL", null, "girl reads future im", [
        "Kobieta będzie czytała.",
        "Chłopiec będzie czytał.",
        "Chłopak będzie czytał.",

        "Kobiety będą czytały.",
        "Chłopcy będą czytali.",
        "Chłopacy będą czytali.",
        "Chłopaki będą czytali.",

        "Kobieta będzie czytać.",
        "Chłopiec będzie czytać.",
        "Chłopak będzie czytać.",

        "Kobiety będą czytać.",
        "Chłopcy będą czytać.",
        "Chłopacy będą czytać.",
        "Chłopaki będą czytać.",
      ]);
    });
    it("#pal05-03a GET 200 YES: Allow specification of multiple radically different tenseDescriptions, without unwanted cross pollination.", () => {
      return runPaletteTest("POL", null, "dummy26", [
        "Czytałam.",
        "Przeczytam.",
      ]);
      //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
    });
    it("#pal05-03b GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. Poleng", () => {
      //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
      let ref = [
        {
          ENG: ["I will read.", "I am going to read.", "I will have read."],
          POL: ["Przeczytam."],
        },
        { ENG: ["I was reading.", "I have read."], POL: ["Czytałam."] },
      ];
      return runPaletteTest("POL", "ENG", "dummy26", ref);
    });
    it("#pal05-03c GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. Engpol. Works for tenseDescription.", () => {
      //If "Będę pisał." or ERROR are returned, it's because the unwanted cross pollination is happening.
      let ref = [
        {
          POL: ["Piszę."],
          ENG: ["I am writing.", "I write."],
        },
        {
          POL: ["Napiszę."],
          ENG: ["I will write.", "I will have written."],
        },
      ];
      return runPaletteTest("ENG", "POL", "dummy27", ref);
    });
    it("#pal05-03d GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. Engpol. Works for tenseDescription and gender.", () => {
      //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
      let ref = [
        {
          POL: ["Czytałam.", "Czytałem."],
          ENG: ["I was reading."],
        },
        {
          POL: ["Przeczytam."],
          ENG: ["I will read.", "I will have read."],
        },
      ];
      return runPaletteTest("ENG", "POL", "dummy26", ref);
    });
    it("#pal05-04a GET 200 YES: It's okay to specify gender: f and number: plural, even though gender will technically be nonvirile. The f gender gets converted to nonvirile gender before drillPath, so the each drillPath does indeed come out correct.", () => {
      return runPaletteTest("POL", null, "dummy32", ["Czytają."]);
    });
  });

  describe("/palette - Stage 6: Translate rich sentences (nouns, adjectives, verbs).", () => {
    it("#pal06-01a GET 200 YES: Returns sentence with all equivalents (RSWAT).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "101a girl is reading",
        })
        .expect(200)
        .then((res) => {
          const translatedSentencesRef = {
            current: {
              "POL->ENG": [
                {
                  POL: "Kobieta czyta.",
                  ENG: [
                    "The woman reads.",
                    "The woman is reading.",
                    "The lady reads.",
                    "The lady is reading.",
                  ],
                },
                {
                  POL: "Kobiety czytają.",
                  ENG: [
                    "The women read.",
                    "The women are reading.",
                    "The ladies read.",
                    "The ladies are reading.",
                  ],
                },
                {
                  POL: "Chłopiec czyta.",
                  ENG: ["The boy reads.", "The boy is reading."],
                },
                {
                  POL: "Chłopcy czytają.",
                  ENG: ["The boys read.", "The boys are reading."],
                },
              ],
            },
          };

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "current",
            [
              "Kobieta czyta.",
              "Kobiety czytają.",
              "Chłopiec czyta.",
              "Chłopcy czytają.",
            ],
            translatedSentencesRef
          );
        });
    });
    it("#pal06-01b GET 200 YES: RSWAT with multiple orders.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "101b girl *reads quickly",
        })
        .expect(200)
        .then((res) => {
          const translatedSentencesRef = {
            current: {
              "POL->ENG": [
                {
                  POL: "Kobieta szybko czyta.",
                  ENG: [
                    "The woman reads quickly.",
                    "The woman is reading quickly.",
                    "Quickly the woman reads.",
                    "Quickly the woman is reading.",
                    "The lady reads quickly.",
                    "The lady is reading quickly.",
                    "Quickly the lady reads.",
                    "Quickly the lady is reading.",
                  ],
                },
                {
                  POL: "Kobiety szybko czytają.",
                  ENG: [
                    "The women read quickly.",
                    "The women are reading quickly.",
                    "Quickly the women read.",
                    "Quickly the women are reading.",
                    "The ladies read quickly.",
                    "The ladies are reading quickly.",
                    "Quickly the ladies read.",
                    "Quickly the ladies are reading.",
                  ],
                },
                {
                  POL: "Chłopiec szybko czyta.",
                  ENG: [
                    "The boy reads quickly.",
                    "The boy is reading quickly.",
                    "Quickly the boy reads.",
                    "Quickly the boy is reading.",
                  ],
                },
                {
                  POL: "Chłopcy szybko czytają.",
                  ENG: [
                    "The boys read quickly.",
                    "The boys are reading quickly.",
                    "Quickly the boys read.",
                    "Quickly the boys are reading.",
                  ],
                },
              ],
            },
          };

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "current",
            [
              "Kobieta szybko czyta.",
              "Kobiety szybko czytają.",
              "Chłopiec szybko czyta.",
              "Chłopcy szybko czytają.",
            ],
            translatedSentencesRef
          );
        });
    });
    it("#pal06-02a GET 200 YES: RSWAT Poleng, where there are two different sentenceFormulas as answers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy25a good day",
        })
        .expect(200)
        .then((res) => {
          const translatedSentencesRef = {
            current: {
              "POL->ENG": [
                {
                  POL: "Dzień dobry.",
                  ENG: ["Hello.", "Good day."],
                },
              ],
            },
          };

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "current",
            ["Dzień dobry."],
            translatedSentencesRef
          );
        });
    });
    it("#pal06-02b GET 200 YES: RSWAT Engpol, where there are two different sentenceFormulas as answers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy25a good day",
        })
        .expect(200)
        .then((res) => {
          const translatedSentencesRef = {
            current: {
              "ENG->POL": [
                {
                  ENG: "Good day.",
                  POL: ["Dzień dobry.", "Halo."],
                },
              ],
            },
          };

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "current",
            ["Good day."],
            translatedSentencesRef
          );
        });
    });
    it("#pal06-03a GET 200 YES: RSWAT Poleng, ensure a tenseDescription can be translated by multiple such.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "102a I'll read (pf fut)",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "read",
            ["Przeczytam."]
          );
        });
    });
    it("#pal06-03b GET 200 YES: RSWAT Engpol, ensure a tenseDescription can be translated by multiple such.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 103a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["I will write.", "I will be writing.", "I will have written."]
          );
        });
    });
    it("#pal06-03c GET 200 YES: RSWAT Engpol, ignoring tenseDescriptions specified in answer structure that are not translations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 103b",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["I will write.", "I will be writing.", "I will have written."]
          );
        });
    });
    it("#pal06-03d GET 200 YES: RSWAT Poleng, ignoring tenseDescriptions specified in answer structure that are not translations.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 103c",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["Napiszę."]
          );
        });
    });
    it("#pal06-04a GET 200 YES: Returns just the ENG sentence, where tenseDescriptions were left blank.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = null;

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy30",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect([
            "I will write.",
            "I will be writing.",
            "I will have written.",
            "I write.",
            "I am writing.",
            "I have written.",
            "I wrote.",
            "I was writing.",
            "I had written.",
          ]).to.contain(res.body.questionSentenceArr[0]);
          expect(res.body.questionSentenceArr).not.to.contain("I written.");
          expect(res.body.questionSentenceArr).not.to.contain("I writes.");
          expect(res.body.questionSentenceArr).not.to.contain("I writing.");
        });
    });
    it("#pal06-04b GET 200 YES: Returns just the POL sentence, where tenseDescriptions were left blank.", () => {
      const questionLanguage = "POL";
      const answerLanguage = null;

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy30",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          expect([
            "Piszę.",
            "Pisałem.",
            "Pisałam.",
            "Pisałabym.",
            "Pisałbym.",
            "Napiszę.",
            "Napisałem.",
            "Napisałam.",
            "Napisałabym.",
            "Napisałbym.",
            "Będę pisał.",
            "Będę pisała.",
            "Będę pisać.",
            "Niech napiszę.",
            "Niech piszę.",
          ]).to.contain(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal06-04c GET 200 YES: RSWAT Poleng, where POL tenseDescriptions are left blank.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 104a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            []
          );
        });
    });
    it("#pal06-04d GET 200 YES: RSWAT Engpol, where POL tenseDescriptions are left blank.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 104a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["I wrote.", "I was writing.", "I had written."]
          );
        });
    });
    it("#pal06-04e GET 200 YES: RSWAT Poleng, where ENG tenseDescriptions are left blank.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 104b",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["Napiszę.", "Pisałam.", "Pisałem."]
          );
        });
    });
    it("#pal06-04f GET 200 YES: RSWAT Engpol, where ENG tenseDescriptions are left blank.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I read *future 104b",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            []
          );
        });
    });
    it("#pal06-04g GET 200 YES: RSWAT Poleng, where tenseDescription is left blank in both question and answer structures.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy28",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            []
          );
        });
    });
    it("#pal06-04h GET 200 YES: RSWAT Poleng, where tenseDescription is left blank in both question and answer structures.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy28",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            []
          );
        });
    });
    xit("#pal06-04i GET 200 NEGATIVE IMPERATIVE. YES: RSWAT Poleng, where tenseDescription has one that will work and one that won't.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy28a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            []
          );
        });
    });
    it("#pal06-05a GET 200 YES: RSWAT Engpol. Ensure three masculine genders collapse to one for the verb.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "I was writing 105a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "write",
            ["I was writing."]
          );
        });
    });
    it("#pal06-06 GET 200 YES: Battery RSWAT Poleng. Ensure genderProportion masc and fem randomly selected at ~50/50 rate, despite there being thrice as many masculine genders as feminine.", () => {
      return Promise.all(
        promiseAllMultiplier(100, () => {
          return runPaletteTest(
            "POL",
            "ENG",
            "dummy31",
            [],
            { devSaysOmitStChValidation: true },
            1,
            true
          );
        })
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["♂ masculine", ["Pisałem."], 0.5],
          ["♀ feminine", ["Pisałam."], 0.5],
        ]);
      });
    });
  });

  describe("/palette - Stage 7: 'Be' ENG <-> POL.", () => {
    it("#pal07-01a GET 200 YES: Conjugate POL be correctly without translations.", () => {
      return runPaletteTest("POL", null, "dummy33", [
        "Jestem.",
        "Jesteś.",
        "Jest.",
        "Jesteśmy.",
        "Jesteście.",
        "Są.",
        "Byłem.",
        "Byłam.",
        "Byłeś.",
        "Byłaś.",
        "Był.",
        "Była.",
        "Było.",
        "Byłyśmy.",
        "Byliśmy.",
        "Byłyście.",
        "Byliście.",
        "Były.",
        "Byli.",
      ]);
    });
    it("#pal07-01b GET 200 YES: RSWAT Poleng 'be' - past im/pf (Type 2 Allohomograph), pres pf - I.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33b I am",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-01c GET 200 YES: RSWAT Poleng 'be' - past im/pf (Type 2 Allohomograph), pres pf - You (with clarifiers).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33c you are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres_withClarifiers_QlangPOL",
            []
          );
        });
    });
    it("#pal07-01d GET 200 YES: RSWAT Poleng 'be' - past im/pf (Type 2 Allohomograph), pres pf - She.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33d she is",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-01e GET 200 YES: RSWAT Poleng 'be' - past im/pf (Type 2 Allohomograph), pres pf - We.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33e we are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-01f GET 200 YES: RSWAT Poleng 'be' - past im/pf (Type 2 Allohomograph), pres pf - They.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33f they are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-02a GET 200 YES: Conjugate ENG be correctly without translations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          sentenceFormulaSymbol: "dummy33",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(["Am.", "Are.", "Is.", "Was.", "Were."]).to.include(
            res.body.questionSentenceArr[0]
          );
        });
    });
    it("#pal07-02b GET 200 YES: RSWAT Engpol 'be' - pres simp, past simp - I.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33b I am",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-02c GET 200 YES: RSWAT Engpol 'be' - pres simp, past simp - You (with clarifiers).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33c you are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres_withClarifiers_QlangENG",
            []
          );
        });
    });
    it("#pal07-02d GET 200 YES: RSWAT Engpol 'be' - pres simp, past simp - She.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33d she is",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-02e GET 200 YES: RSWAT Engpol 'be' - pres simp, past simp - We.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33e we are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-02f GET 200 YES: RSWAT Engpol 'be' - pres simp, past simp - They.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33f they are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-03a GET 200 YES: RSWAT Poleng 'be' correctly (without pronombres).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be",
            []
          );
        });
    });
    it("#pal07-03b GET 200 YES: Conjugate POL 'be' past pf, (should be treated as im and pf both). This related to Operation Ripplemin where we removed preprocessLemmaObjectsMinor which in POL adjusted imperfectiveOnly to have a duplicate lObj with aspect perfective, but instead we have solved this with a meta trait value for aspect for eg być and mieć.", () => {
      return runPaletteTest("POL", null, "dummy34", [
        "Byłem.",
        "Byłam.",
        "Byłeś.",
        "Byłaś.",
        "Był.",
        "Była.",
        "Było.",
        "Byłyśmy.",
        "Byliśmy.",
        "Byłyście.",
        "Byliście.",
        "Były.",
        "Byli.",
      ]);
    });
    it("#pal07-03c GET 200 YES: Conjugate ENG 'be' future, it should NOT give fut cont.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          sentenceFormulaSymbol: "dummy34c",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(["I will be.", "I will have been."]).to.include(
            res.body.questionSentenceArr[0]
          );
        });
    });
    it("#pal07-03d GET 200 YES: RSWAT Poleng 'be' future pf, (Clone Bee VNV issue: should NOT receive 'będę być', but instead just 'będę'.).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy34a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-03e GET 200 YES: RSWAT Poleng 'be' future im, (Clone Bee VNV issue: should NOT receive 'będę być', but instead just 'będę'.).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy34b",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronombres",
            []
          );
        });
    });
    it("#pal07-04a GET 200 YES: RSWAT Poleng 'be' (checking there's no Clone Bee Cross Pollination issue).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy34d",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be",
            []
          );
        });
    });
  });

  describe("/palette - Stage 8: 'Have' ENG <-> POL.", () => {
    it("#pal08-01a GET 200 YES: Conjugate POL have correctly without translations.", () => {
      return runPaletteTest("POL", null, "dummy53", [
        "Mam.",
        "Masz.",
        "Ma.",
        "Mamy.",
        "Macie.",
        "Mają.",
        "Miałem.",
        "Miałam.",
        "Miałeś.",
        "Miałaś.",
        "Miał.",
        "Miała.",
        "Miało.",
        "Miałyśmy.",
        "Mieliśmy.",
        "Miałyście.",
        "Mieliście.",
        "Miały.",
        "Mieli.",
      ]);
    });
    it("#pal08-01b GET 200 YES: RSWAT Poleng 'have' - past im/pf (Type 2 Allohomograph), pres pf - I.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53b I am",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-01c GET 200 YES: RSWAT Poleng 'have' - past im/pf (Type 2 Allohomograph), pres pf - You (with clarifiers).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53c you are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres_withClarifiers_QlangPOL",
            []
          );
        });
    });
    it("#pal08-01d GET 200 YES: RSWAT Poleng 'have' - past im/pf (Type 2 Allohomograph), pres pf - She.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53d she is",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-01e GET 200 YES: RSWAT Poleng 'have' - past im/pf (Type 2 Allohomograph), pres pf - We.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53e we are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-01f GET 200 YES: RSWAT Poleng 'have' - past im/pf (Type 2 Allohomograph), pres pf - They.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53f they are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-02a GET 200 YES: Conjugate ENG have correctly without translations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          sentenceFormulaSymbol: "dummy53",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);
          expect(["Have.", "Has.", "Had."]).to.include(
            res.body.questionSentenceArr[0]
          );
        });
    });
    it("#pal08-02b GET 200 YES: RSWAT Engpol 'have' - pres simp, past simp - I.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53b I am",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-02c GET 200 YES: RSWAT Engpol 'have' - pres simp, past simp - You (with clarifiers).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53c-2 you are (pres)",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres_withClarifiers_QlangENG",
            []
          );
        });
    });
    it("#pal08-02d GET 200 YES: RSWAT Engpol 'have' - pres simp, past simp - She.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53d she is",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-02e GET 200 YES: RSWAT Engpol 'have' - pres simp, past simp - We.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53e we are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-02f GET 200 YES: RSWAT Engpol 'have' - pres simp, past simp - They.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53f they are",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-03a GET 200 YES: RSWAT Poleng 'have' correctly (without pronombres).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy53a",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have",
            []
          );
        });
    });
    it("#pal08-03b GET 200 YES: Conjugate POL 'have' past pf, (should be treated as im and pf both).", () => {
      return runPaletteTest("POL", null, "dummy54", [
        "Miałem.",
        "Miałam.",
        "Miałeś.",
        "Miałaś.",
        "Miał.",
        "Miała.",
        "Miało.",
        "Miałyśmy.",
        "Mieliśmy.",
        "Miałyście.",
        "Mieliście.",
        "Miały.",
        "Mieli.",
      ]);
    });
    it("#pal08-03c GET 200 YES: Conjugate ENG 'have' future, it SHOULD give fut cont.", () => {
      return runPaletteTest("ENG", null, "dummy54c", [
        "I will have.",
        "I will be having.",
        "I am going to be having.",
        "I will have had.",
      ]);
    });
    it("#pal08-03d GET 200 YES: RSWAT Poleng 'have' future pf, (should indeed give 'będzie miał').", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy54a",
        })
        .expect(200)
        .then((res) => {
          consol.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-03e GET 200 YES: RSWAT Poleng 'have' future im, (should indeed give 'będzie miał').", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy54b",
        })
        .expect(200)
        .then((res) => {
          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
          );
        });
    });
    it("#pal08-03f GET 200 YES: RSWAT Engpol 'have' future im, (should indeed give 'będzie miał').", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy54a they are",
        })
        .expect(200)
        .then((res) => {
          consol.log("aaa", res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "have_withPronombres",
            []
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
