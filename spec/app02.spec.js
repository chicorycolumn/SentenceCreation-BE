const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const { it } = require("mocha");
// chai.use(require("sams-chai-sorted"));
// const { myErrMsgs } = require("../errors/errors");
// const endpointsCopy = require("../endpoints.json");

//This is a Washburne style reference object.
const generalTranslatedSentencesRef = {
  have_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Masz.", ENG: ["You (singular) have."] },
      { POL: "Macie.", ENG: ["You (plural) have."] },
    ],
  },
  have_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Masz.", ENG: ["You have.", "You are having."] },
      { POL: "Macie.", ENG: ["You have.", "You are having."] },
    ],
  },
  have_withPronouns_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Masz.", ENG: ["You have.", "You are having."] },
      { POL: "Macie.", ENG: ["You have.", "You are having."] },
      {
        POL: "Miałeś.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Miałaś.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Miałyście.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Mieliście.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
    ],
  },
  have_withPronouns_withClarifiers_QlangENG: {
    "POL->ENG": [
      {
        POL: "Masz.",
        ENG: ["You (singular) have.", "You (singular) are having."],
      },
      {
        POL: "Macie.",
        ENG: ["You (plural) have.", "You (plural) are having."],
      },
      {
        POL: "Miałeś.",
        ENG: [
          "You (singular) had.",
          "You (singular) were having.",
          "You (singular) have had.",
          "You (singular) had had.",
        ],
      },
      {
        POL: "Miałaś.",
        ENG: [
          "You (singular) had.",
          "You (singular) were having.",
          "You (singular) have had.",
          "You (singular) had had.",
        ],
      },
      {
        POL: "Miałyście.",
        ENG: [
          "You (plural) had.",
          "You (plural) were having.",
          "You (plural) have had.",
          "You (plural) had had.",
        ],
      },
      {
        POL: "Mieliście.",
        ENG: [
          "You (plural) had.",
          "You (plural) were having.",
          "You (plural) have had.",
          "You (plural) had had.",
        ],
      },
    ],
  },
  have_withPronouns: {
    "POL->ENG": [
      {
        POL: "Będę miał.",
        ENG: [
          "I will have.",
          "I am going to have.",
          "I will have had.",
          "I will be having.",
          "I am going to be having.",
        ],
      },
      {
        POL: "Będę mieć.",
        ENG: [
          "I will have.",
          "I am going to have.",
          "I will have had.",
          "I will be having.",
          "I am going to be having.",
        ],
      },

      { POL: "Mam.", ENG: ["I have.", "I am having."] },
      { POL: "Masz.", ENG: ["You have.", "You are having."] },
      { POL: "Ma.", ENG: ["She has.", "She is having."] },
      { POL: "Mamy.", ENG: ["We have.", "We are having."] },
      { POL: "Macie.", ENG: ["You have.", "You are having."] },
      { POL: "Mają.", ENG: ["They have.", "They are having."] },
      {
        POL: "Miałem.",
        ENG: ["I had.", "I was having.", "I have had.", "I had had."],
      },
      {
        POL: "Miałam.",
        ENG: ["I had.", "I was having.", "I have had.", "I had had."],
      },
      {
        POL: "Miałeś.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Miałaś.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Miał.",
        ENG: ["He had.", "He was having.", "He has had.", "He had had."],
      },
      {
        POL: "Miała.",
        ENG: ["She had.", "She was having.", "She has had.", "She had had."],
      },
      {
        POL: "Miało.",
        ENG: ["It had.", "It was having.", "It has had.", "It had had."],
      },
      {
        POL: "Miałyśmy.",
        ENG: ["We had.", "We were having.", "We have had.", "We had had."],
      },
      {
        POL: "Mieliśmy.",
        ENG: ["We had.", "We were having.", "We have had.", "We had had."],
      },
      {
        POL: "Miałyście.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Mieliście.",
        ENG: ["You had.", "You were having.", "You have had.", "You had had."],
      },
      {
        POL: "Miały.",
        ENG: [
          "They had.",
          "They were having.",
          "They have had.",
          "They had had.",
        ],
      },
      {
        POL: "Mieli.",
        ENG: [
          "They had.",
          "They were having.",
          "They have had.",
          "They had had.",
        ],
      },
    ],
  },
  have: {
    "POL->ENG": [
      //
      //POL: present im
      // ENG: Present Simple
      // ENG: Present Continuous
      { POL: "Mam.", ENG: ["Have.", "Am having."] },
      { POL: "Masz.", ENG: ["Have.", "Are having."] },
      { POL: "Ma.", ENG: ["Has.", "Is having."] },
      { POL: "Mamy.", ENG: ["Have.", "Are having."] },
      { POL: "Macie.", ENG: ["Have.", "Are having."] },
      { POL: "Mają.", ENG: ["Have.", "Are having."] },
      { POL: "Miałem.", ENG: ["Had.", "Was having.", "Have had.", "Had had."] },
      { POL: "Miałam.", ENG: ["Had.", "Was having.", "Have had.", "Had had."] },
      {
        POL: "Miałeś.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Miałaś.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      { POL: "Miał.", ENG: ["Had.", "Was having.", "Have had.", "Had had."] },
      { POL: "Miała.", ENG: ["Had.", "Was having.", "Have had.", "Had had."] },
      { POL: "Miało.", ENG: ["Had.", "Was having.", "Have had.", "Had had."] },
      {
        POL: "Miałyśmy.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Mieliśmy.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Miałyście.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Mieliście.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Miały.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
      {
        POL: "Mieli.",
        ENG: ["Had.", "Were having.", "Have had.", "Had had."],
      },
    ],
  },
  be_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Jesteś.", ENG: ["You (singular) are."] },
      { POL: "Jesteście.", ENG: ["You (plural) are."] },
    ],
  },
  be_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Jesteś.", ENG: ["You are.", "You are being."] },
      { POL: "Jesteście.", ENG: ["You are.", "You are being."] },
    ],
  },
  be_withPronouns_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Jesteś.", ENG: ["You are.", "You are being."] },
      { POL: "Jesteście.", ENG: ["You are.", "You are being."] },
      {
        POL: "Byłeś.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Byłaś.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Byłyście.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
    ],
  },
  be_withPronouns_withClarifiers_QlangENG: {
    "POL->ENG": [
      {
        POL: "Jesteś.",
        ENG: ["You (singular) are.", "You (singular) are being."],
      },
      {
        POL: "Jesteście.",
        ENG: ["You (plural) are.", "You (plural) are being."],
      },
      {
        POL: "Byłeś.",
        ENG: [
          "You (singular) were.",
          "You (singular) were being.",
          "You (singular) have been.",
          "You (singular) had been.",
        ],
      },
      {
        POL: "Byłaś.",
        ENG: [
          "You (singular) were.",
          "You (singular) were being.",
          "You (singular) have been.",
          "You (singular) had been.",
        ],
      },
      {
        POL: "Byłyście.",
        ENG: [
          "You (plural) were.",
          "You (plural) were being.",
          "You (plural) have been.",
          "You (plural) had been.",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You (plural) were.",
          "You (plural) were being.",
          "You (plural) have been.",
          "You (plural) had been.",
        ],
      },
    ],
  },
  be_withPronouns: {
    "POL->ENG": [
      {
        POL: "Będę.",
        ENG: ["I will be.", "I am going to be.", "I will have been."],
      },

      { POL: "Jestem.", ENG: ["I am.", "I am being."] },
      { POL: "Jesteś.", ENG: ["You are.", "You are being."] },
      { POL: "Jest.", ENG: ["She is.", "She is being."] },
      { POL: "Jesteśmy.", ENG: ["We are.", "We are being."] },
      { POL: "Jesteście.", ENG: ["You are.", "You are being."] },
      { POL: "Są.", ENG: ["They are.", "They are being."] },
      {
        POL: "Byłem.",
        ENG: ["I was.", "I was being.", "I have been.", "I had been."],
      },
      {
        POL: "Byłam.",
        ENG: ["I was.", "I was being.", "I have been.", "I had been."],
      },
      {
        POL: "Byłeś.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Byłaś.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Był.",
        ENG: ["He was.", "He was being.", "He has been.", "He had been."],
      },
      {
        POL: "Była.",
        ENG: ["She was.", "She was being.", "She has been.", "She had been."],
      },
      {
        POL: "Było.",
        ENG: ["It was.", "It was being.", "It has been.", "It had been."],
      },
      {
        POL: "Byłyśmy.",
        ENG: ["We were.", "We were being.", "We have been.", "We had been."],
      },
      {
        POL: "Byliśmy.",
        ENG: ["We were.", "We were being.", "We have been.", "We had been."],
      },
      {
        POL: "Byłyście.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You were.",
          "You were being.",
          "You have been.",
          "You had been.",
        ],
      },
      {
        POL: "Były.",
        ENG: [
          "They were.",
          "They were being.",
          "They have been.",
          "They had been.",
        ],
      },
      {
        POL: "Byli.",
        ENG: [
          "They were.",
          "They were being.",
          "They have been.",
          "They had been.",
        ],
      },
    ],
  },
  be: {
    "POL->ENG": [
      //
      //POL: present im
      // ENG: Present Simple
      // ENG: Present Continuous
      {
        POL: "Będzie.",
        ENG: ["Will be.", "Is going to be.", "Will have been."],
      },
      {
        POL: "Będą.",
        ENG: ["Will be.", "Are going to be.", "Will have been."],
      },
      {
        POL: "Będziemy.",
        ENG: ["Will be.", "Are going to be.", "Will have been."],
      },
      {
        POL: "Będziecie.",
        ENG: ["Will be.", "Are going to be.", "Will have been."],
      },
      {
        POL: "Będziesz.",
        ENG: ["Will be.", "Are going to be.", "Will have been."],
      },
      { POL: "Będę.", ENG: ["Will be.", "Am going to be.", "Will have been."] },

      { POL: "Jestem.", ENG: ["Am.", "Am being."] },
      { POL: "Jesteś.", ENG: ["Are.", "Are being."] },
      { POL: "Jest.", ENG: ["Is.", "Is being."] },
      { POL: "Jesteśmy.", ENG: ["Are.", "Are being."] },
      { POL: "Jesteście.", ENG: ["Are.", "Are being."] },
      { POL: "Są.", ENG: ["Are.", "Are being."] },
      { POL: "Byłem.", ENG: ["Was.", "Was being.", "Have been.", "Had been."] },
      { POL: "Byłam.", ENG: ["Was.", "Was being.", "Have been.", "Had been."] },
      {
        POL: "Byłeś.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Byłaś.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      { POL: "Był.", ENG: ["Was.", "Was being.", "Have been.", "Had been."] },
      { POL: "Była.", ENG: ["Was.", "Was being.", "Have been.", "Had been."] },
      { POL: "Było.", ENG: ["Was.", "Was being.", "Have been.", "Had been."] },
      {
        POL: "Byłyśmy.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Byliśmy.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Byłyście.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Byliście.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Były.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
      {
        POL: "Byli.",
        ENG: ["Were.", "Were being.", "Have been.", "Had been."],
      },
    ],
  },
  sheep_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Owca.", ENG: ["Sheep (singular)."] },
      { POL: "Owce.", ENG: ["Sheep (plural)."] },
    ],
  },
  sheep_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Owca.", ENG: ["Sheep."] },
      { POL: "Owce.", ENG: ["Sheep."] },
    ],
  },
  read_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Przeczytałem.", ENG: ["I read (past)."] },
      { POL: "Przeczytałam.", ENG: ["I read (past)."] },
      { POL: "Czytam.", ENG: ["I read (present)."] },
    ],
  },
  read_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Przeczytałem.", ENG: ["I read.", "I had read.", "I have read."] },
      { POL: "Przeczytałam.", ENG: ["I read.", "I had read.", "I have read."] },
      { POL: "Czytam.", ENG: ["I read.", "I am reading."] },
    ],
  },
  write_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Piszesz.", ENG: ["You (singular) write."] },
      { POL: "Piszecie.", ENG: ["You (plural) write."] },
      ////
      { POL: "Napisałeś.", ENG: ["You (singular) wrote."] },
      { POL: "Napisałaś.", ENG: ["You (singular) wrote."] },
      { POL: "Napisaliście.", ENG: ["You (plural) wrote."] },
      { POL: "Napisałyście.", ENG: ["You (plural) wrote."] },
      ////
      { POL: "Będziesz pisał.", ENG: ["You (singular) will be writing."] },
      { POL: "Będziesz pisała.", ENG: ["You (singular) will be writing."] },
      { POL: "Będziesz pisać.", ENG: ["You (singular) will be writing."] },
      { POL: "Będziecie pisały.", ENG: ["You (plural) will be writing."] },
      { POL: "Będziecie pisali.", ENG: ["You (plural) will be writing."] },
      { POL: "Będziecie pisać.", ENG: ["You (plural) will be writing."] },
      {
        POL: "Będziesz pisał.",
        ENG: ["You (singular) are going to be writing."],
      },
      {
        POL: "Będziesz pisała.",
        ENG: ["You (singular) are going to be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You (singular) are going to be writing."],
      },
      {
        POL: "Będziecie pisały.",
        ENG: ["You (plural) are going to be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You (plural) are going to be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (plural) are going to be writing."],
      },
    ],
  },
  write_withClarifiers_QlangPOL: {
    "POL->ENG": [
      {
        POL: "Piszesz.",
        ENG: ["You write.", "You are writing."],
      },
      {
        POL: "Piszecie.",
        ENG: ["You write.", "You are writing."],
      },
      ////
      {
        POL: "Napisałeś.",
        ENG: ["You wrote.", "You had written.", "You have written."],
      },
      {
        POL: "Napisałaś.",
        ENG: ["You wrote.", "You had written.", "You have written."],
      },
      {
        POL: "Napisaliście.",
        ENG: ["You wrote.", "You had written.", "You have written."],
      },
      {
        POL: "Napisałyście.",
        ENG: ["You wrote.", "You had written.", "You have written."],
      },
      ////
      {
        POL: "Będziesz pisał.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
      {
        POL: "Będziesz pisała.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
      {
        POL: "Będziecie pisały.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You will be writing.", "You are going to be writing."],
      },
    ],
  },
  write: {
    "POL->ENG": [
      { POL: "Piszę.", ENG: ["I am writing.", "I write."] },
      {
        POL: "Pisałem.",
        ENG: ["I was writing.", "I have written."],
      },
      {
        POL: "Pisałam.",
        ENG: ["I was writing.", "I have written."],
      },
      {
        POL: "Napiszę.",
        ENG: ["I will write.", "I am going to write.", "I will have written."],
      },
      {
        POL: "Napisałem.",
        ENG: ["I wrote.", "I have written.", "I had written."],
      },
      {
        POL: "Napisałam.",
        ENG: ["I wrote.", "I have written.", "I had written."],
      },
      {
        POL: "Będę pisał.",
        ENG: ["I will be writing.", "I am going to be writing."],
      },
      {
        POL: "Będę pisała.",
        ENG: ["I will be writing.", "I am going to be writing."],
      },
      {
        POL: "Będę pisać.",
        ENG: ["I will be writing.", "I am going to be writing."],
      },
    ],
  },
  read: {
    "POL->ENG": [
      { POL: "Czytam.", ENG: ["I am reading.", "I read."] },
      {
        POL: "Czytałem.",
        ENG: ["I was reading.", "I have read."],
      },
      {
        POL: "Czytałam.",
        ENG: ["I was reading.", "I have read."],
      },
      {
        POL: "Przeczytam.",
        ENG: ["I will read.", "I am going to read.", "I will have read."],
      },
      {
        POL: "Przeczytałem.",
        ENG: ["I wrote.", "I have read.", "I had read."],
      },
      {
        POL: "Przeczytałam.",
        ENG: ["I wrote.", "I have read.", "I had read."],
      },
      {
        POL: "Będę czytał.",
        ENG: ["I will be reading.", "I am going to be reading."],
      },
      {
        POL: "Będę czytała.",
        ENG: ["I will be reading.", "I am going to be reading."],
      },
      {
        POL: "Będę czytać.",
        ENG: ["I will be reading.", "I am going to be reading."],
      },
    ],
  },
};

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
    it.only("#pal14-01a GET 200 YES: POL. I have my onion.", () => {
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
          checkTranslationsOfGivenRef(
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
          checkTranslationsOfGivenRef(
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
          checkTranslationsOfGivenRef(
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
          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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
    //Note, if you want an ENG Q sentence to have both gender Robił Robiła in POL A sentences,
    //then instead of setting no gender, you must set gender as allPersonalGenders.
    it("#pal13A-03b-a GET 200 YES: ENG to POL. (allPersonalGenders was specified.) Inherit features from pronoun to verb (m sing).", () => {
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
          sentenceFormulaSymbol: "dummy49e",
        })
        .expect(200)
        .then((res) => {
          let { questionSentenceArr, answerSentenceArr } = res.body;

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

          checkTranslationsOfGivenRef(
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
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
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
              ENG: "We wrote.",
              POL: [
                "Napisałyśmy.",
                "My napisałyśmy.",
                "Napisaliśmy.",
                "My napisaliśmy.",
              ],
            },
          ];

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

    //       checkTranslationsOfGivenRef(
    //         res,
    //         ref,
    //         questionLanguage,
    //         answerLanguage
    //       );
    //     });
    // });
  });

  describe("/palette - Stage 11: Adding Specifiers.", () => {
    it("#pal11-01a GET 200 YES: SPECIFIER EXPECTED. Multi Gender Noun. ENG to POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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
          doNotSpecify: true,
          hideClarifiersForTestingPurposes: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "111b I was",
        })
        .expect(200)
        .then((res) => {
          let ref = [
            {
              ENG: "I was.",
              POL: ["Byłem.", "Ja byłem.", "Byłam.", "Ja byłam."],
            },
            {
              ENG: "We were.",
              POL: ["Byliśmy.", "My byliśmy.", "Byłyśmy.", "My byłyśmy."],
            },
          ];

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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

          checkTranslationsOfGivenRef(
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
            ["You (singular) wrote.", "You (plural) wrote."]
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
            ["You (singular) will be writing.", "You (plural) will be writing."]
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

function checkTranslationsOfGivenRef(
  res,
  ref,
  questionLanguage,
  answerLanguage
) {
  //You have to specify a different ref for the different directions.
  // let ref = [
  //
  //    If the Qsent is THIS... then the Asent ARRAY must be exactly THIS.
  //    So you see, that's why this doesn't work bidirectionally.
  //
  //   { ENG: "I wrote (male).", POL: ["Napisałem."] },
  //   { ENG: "I was writing (male).", POL: ["Pisałem."] },
  //   { ENG: "I wrote (female).", POL: ["Napisałam."] },
  //   { ENG: "I was writing (female).", POL: ["Pisałam."] },
  // ];

  console.log(res.body);

  let { questionSentenceArr, answerSentenceArr } = res.body;

  let actualQuestionSentence = questionSentenceArr[0];

  let expectedQuestionSentences = ref.map((item) => item[questionLanguage]);

  expect(expectedQuestionSentences).to.include(actualQuestionSentence);

  let testActivated = false;

  ref.forEach((item) => {
    if (item[questionLanguage] === actualQuestionSentence) {
      expect(item[answerLanguage]).to.have.members(answerSentenceArr);
      testActivated = true;
    }
  });

  if (!testActivated) {
    throw "This test did not really pass, as no expect statement ran.";
  }
}
