const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
// chai.use(require("sams-chai-sorted"));
// const { myErrMsgs } = require("../errors/errors");
// const endpointsCopy = require("../endpoints.json");

const checkTranslationsOfGivenRef = (
  res,
  ref,
  questionLanguage,
  answerLanguage
) => {
  console.log(res.body);

  let { questionSentenceArr, answerSentenceArr } = res.body;

  expect(ref.map((item) => item[questionLanguage][0])).include(
    questionSentenceArr[0]
  );

  ref.forEach((item) => {
    if (item[questionLanguage] === questionSentenceArr[0]) {
      expect(item[answerLanguage]).to.have.members(answerSentenceArr);
    }
  });
};

//This is a Washburne style reference object.
const generalTranslatedSentencesRef = {
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
      { POL: "Piszesz.", ENG: ["You write (singular)."] },
      { POL: "Piszecie.", ENG: ["You write (plural)."] },
      ////
      { POL: "Napisałeś.", ENG: ["You wrote (singular)."] },
      { POL: "Napisałaś.", ENG: ["You wrote (singular)."] },
      { POL: "Napisaliście.", ENG: ["You wrote (plural)."] },
      { POL: "Napisałyście.", ENG: ["You wrote (plural)."] },
      ////
      { POL: "Będziesz pisał.", ENG: ["You will be writing (singular)."] },
      { POL: "Będziesz pisała.", ENG: ["You will be writing (singular)."] },
      { POL: "Będziesz pisać.", ENG: ["You will be writing (singular)."] },
      { POL: "Będziecie pisały.", ENG: ["You will be writing (plural)."] },
      { POL: "Będziecie pisali.", ENG: ["You will be writing (plural)."] },
      { POL: "Będziecie pisać.", ENG: ["You will be writing (plural)."] },
      {
        POL: "Będziesz pisał.",
        ENG: ["You are going to be writing (singular)."],
      },
      {
        POL: "Będziesz pisała.",
        ENG: ["You are going to be writing (singular)."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You are going to be writing (singular)."],
      },
      {
        POL: "Będziecie pisały.",
        ENG: ["You are going to be writing (plural)."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You are going to be writing (plural)."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You are going to be writing (plural)."],
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
  be_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Jesteś.", ENG: ["You are (singular)."] },
      { POL: "Jesteście.", ENG: ["You are (plural)."] },
    ],
  },
  be_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Jesteś.", ENG: ["You are.", "You are being."] },
      { POL: "Jesteście.", ENG: ["You are.", "You are being."] },
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
        ENG: ["You are (singular).", "You are being (singular)."],
      },
      {
        POL: "Jesteście.",
        ENG: ["You are (plural).", "You are being (plural)."],
      },
      {
        POL: "Byłeś.",
        ENG: [
          "You were (singular).",
          "You were being (singular).",
          "You have been (singular).",
          "You had been (singular).",
        ],
      },
      {
        POL: "Byłaś.",
        ENG: [
          "You were (singular).",
          "You were being (singular).",
          "You have been (singular).",
          "You had been (singular).",
        ],
      },
      {
        POL: "Byłyście.",
        ENG: [
          "You were (plural).",
          "You were being (plural).",
          "You have been (plural).",
          "You had been (plural).",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You were (plural).",
          "You were being (plural).",
          "You have been (plural).",
          "You had been (plural).",
        ],
      },
    ],
  },
  be_withPronouns: {
    "POL->ENG": [
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

gpUtils.fillOutWashburneRefObj(
  generalTranslatedSentencesRef,
  "POL->ENG",
  "ENG->POL",
  "POL",
  "ENG"
);

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

describe("/api", () => {
  // after(() => {});
  // beforeEach(() => {});

  xdescribe("/palette - Stage 10: Further linguistic features.", () => {
    it("#pal10-01a GET 200 YES: Tantum plurale in POL is allowed to be sing or plur in ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal10-01b GET 200 YES: RSWAT for ENG sing to POL tantum plurale.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal10-01c GET 200 YES: RSWAT for ENG to POL tantum plurale.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal10-02a GET 200 YES: RSWAT for First Conditional POL->ENG.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          // const translatedSentencesRef = {
          //   current: {
          //     "POL->ENG": [
          //       {
          //         POL: "Kobieta czyta.",
          //         ENG: ["The woman reads.", "The woman is reading."],
          //       },
          //       {
          //         POL: "Kobiety czytają.",
          //         ENG: ["The women read.", "The women are reading."],
          //       },
          //       {
          //         POL: "Chłopiec czyta.",
          //         ENG: ["The boy reads.", "The boy is reading."],
          //       },
          //       {
          //         POL: "Chłopcy czytają.",
          //         ENG: ["The boys read.", "The boys are reading."],
          //       },
          //     ],
          //   },
          // };

          // checkSentenceTranslations(
          //   res,
          //   questionLanguage,
          //   answerLanguage,
          //   "current",
          //   [
          //     "Kobieta czyta.",
          //     "Kobiety czytają.",
          //     "Chłopiec czyta.",
          //     "Chłopcy czytają.",
          //   ],
          //   translatedSentencesRef
          // );
        });
    });
    it("#pal10-02b GET 200 YES: RSWAT for First Conditional ENG->POL.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "first conditional 106a",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          // const translatedSentencesRef = {
          //   current: {
          //     "POL->ENG": [
          //       {
          //         POL: "Kobieta czyta.",
          //         ENG: ["The woman reads.", "The woman is reading."],
          //       },
          //       {
          //         POL: "Kobiety czytają.",
          //         ENG: ["The women read.", "The women are reading."],
          //       },
          //       {
          //         POL: "Chłopiec czyta.",
          //         ENG: ["The boy reads.", "The boy is reading."],
          //       },
          //       {
          //         POL: "Chłopcy czytają.",
          //         ENG: ["The boys read.", "The boys are reading."],
          //       },
          //     ],
          //   },
          // };

          // checkSentenceTranslations(
          //   res,
          //   questionLanguage,
          //   answerLanguage,
          //   "current",
          //   [
          //     "Kobieta czyta.",
          //     "Kobiety czytają.",
          //     "Chłopiec czyta.",
          //     "Chłopcy czytają.",
          //   ],
          //   translatedSentencesRef
          // );
        });
    });
  });

  describe("/palette - Stage 9: Allohomographs.", () => {
    it("#pal09-01a Type 1 Allohomographs: 'nut' ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            { ENG: ["A small nut (🥜 food)."], POL: ["Mały orzech."] },
            { ENG: ["A small nut (🔩 metal)."], POL: ["Mała nakrętka."] },
          ];

          checkTranslationsOfGivenRef(
            res,
            ref,
            questionLanguage,
            answerLanguage
          );
        });
    });
    it("#pal09-01b Type 1 Allohomographs: 'nut' POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            { ENG: ["A small nut."], POL: ["Mały orzech."] },
            { ENG: ["A small nut."], POL: ["Mała nakrętka."] },
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

  describe("/palette - Stage 8: Synhomographs.", () => {
    it("#pal08-01a (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-01b 'sheep': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-02a (Type 5 Synhomographs. Ad-PW: clarify Inflections (tenseDescription)) 'read': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-02b (Ad-PW: clarify Inflections (tenseDescription)) 'read': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-03a (Type 6 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            ["You write (singular).", "You write (plural)."]
          );
        });
    });
    it("#pal08-03b (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-03c (Type 6 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            ["You wrote (singular).", "You wrote (plural)."]
          );
        });
    });
    it("#pal08-03d (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-03e (Type 6 Synhomographs. Ad-PW: clarify Inflections) 'write': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            ["You will be writing (singular).", "You will be writing (plural)."]
          );
        });
    });
    it("#pal08-03f (Ad-PW: clarify Inflections) 'write': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
    it("#pal08-03g (Type 6 Synhomographs. Ad-PW: clarify Inflections) 'be': ENG to POL. Expect clarifiers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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
            ["You are (singular).", "You are (plural)."]
          );
        });
    });
    it("#pal08-03h (Ad-PW: clarify Inflections) 'be': POL to ENG. No clarifiers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: false,
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

  describe.only("/palette - Stage 7: 'Be'/'Być'.", () => {
    xit("#pal07-01a GET 200 YES: Conjugate ENG be correctly.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy33",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(["Am.", "Are.", "Is.", "Was.", "Were."]).to.include(
            res.body.questionSentenceArr[0]
          );
        });
    });
    xit("#pal07-01b GET 200 YES: Conjugate POL be correctly.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy33",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    xit("#pal07-01c GET 200 YES: Conjugate POL be correctly even though past pf was asked for, it should nevertheless be the case that past im of być is returned, as this verb lobj is marked as imperfectiveOnly.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          // answerLanguage,
          sentenceFormulaSymbol: "dummy34",
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
        });
    });
    xit("#pal07-01d GET 200 YES: RSWAT POL to ENG 'be' correctly..", () => {
      //Clone Bee issue: The issue here is that normally, ENG past simple gets translated to POL past pf.
      //But the verb być doesn't have a pf form, only im.
      //So in this case, ENG past simple should be translated to POL past >>im<< when dealing with
      //być, and mieć, and tbh, with any verbs that simply don't have a pf form.
      //So I suppose, at some point in processing, we should:
      //search for all connected verb lobjs, searching by lObj.id, pol-ver-001-im-01 look for pol-ver-001-pf-*
      //And if this verb is im, and has no pf forms,
      //then allow for ENG past simple to be translated by POL past im
      //Or... maybe actually just if it's deliberately marked on this lObj that it is imperfectiveOnly?

      //I have resolved the above by making a duplicate lobj for 'imperfectiveOnly's and making it perfective.

      //The issue I am on now, is that, here ENG to POL, the english be lobj is not being updated
      // with the person and number choices.

      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33a",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be",
            []
          );
        });
    });
    it("#pal07-02b GET 200 YES: RSWAT POL to ENG 'be' - I.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33b I am",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-02c GET 200 YES: RSWAT POL to ENG 'be' - You (with clarifiers).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33c you are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns_withClarifiers_QlangPOL",
            []
          );
        });
    });
    it("#pal07-02d GET 200 YES: RSWAT POL to ENG 'be' - She.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33d she is",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-02e GET 200 YES: RSWAT POL to ENG 'be' - We.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33e we are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-02f GET 200 YES: RSWAT POL to ENG 'be' - They.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33f they are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-03b GET 200 YES: RSWAT ENG to POL 'be' - I.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33b I am",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-03c GET 200 YES: RSWAT ENG to POL 'be' - You (with clarifiers).", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33c you are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns_withClarifiers_QlangENG",
            []
          );
        });
    });
    it("#pal07-03d GET 200 YES: RSWAT ENG to POL 'be' - She.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33d she is",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-03e GET 200 YES: RSWAT ENG to POL 'be' - We.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33e we are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
    it("#pal07-03f GET 200 YES: RSWAT ENG to POL 'be' - They.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          // hideClarifiers: true,
          useDummy: true,
          questionLanguage,
          answerLanguage,
          sentenceFormulaSymbol: "dummy33f they are",
        })
        .expect(200)
        .then((res) => {
          // console.log(res.body);

          checkSentenceTranslations(
            res,
            questionLanguage,
            answerLanguage,
            "be_withPronouns",
            []
          );
        });
    });
  });

  describe("/palette - Stage 6: Returning Polish with English translations of rich sentences (with nouns adjectives and verbs).", () => {
    it("#pal06-01a GET 200 YES: Returns sentence with all translations (RSWAT).", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
                  ENG: ["The woman reads.", "The woman is reading."],
                },
                {
                  POL: "Kobiety czytają.",
                  ENG: ["The women read.", "The women are reading."],
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
          hideClarifiers: true,
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
                  ],
                },
                {
                  POL: "Kobiety szybko czytają.",
                  ENG: [
                    "The women read quickly.",
                    "The women are reading quickly.",
                    "Quickly the women read.",
                    "Quickly the women are reading.",
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
    it("#pal06-02a GET 200 YES: RSWAT POL to ENG, where there are two different sentenceFormulas as answers.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-02b GET 200 YES: RSWAT ENG to POL, where there are two different sentenceFormulas as answers.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-03a GET 200 YES: RSWAT POL to ENG, ensure a tenseDescription can be translated by multiple such.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-03b GET 200 YES: RSWAT ENG to POL, ensure a tenseDescription can be translated by multiple such.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-03c GET 200 YES: RSWAT ENG to POL, ignoring tenseDescriptions specified in answer structure that are not translations.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-03d GET 200 YES: RSWAT POL to ENG, ignoring tenseDescriptions specified in answer structure that are not translations.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
          hideClarifiers: true,
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy30",
        })
        .expect(200)
        .then((res) => {
          console.log({ "RESULT: res.body:": res.body });
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
          hideClarifiers: true,
          questionLanguage,
          answerLanguage,
          useDummy: true,
          sentenceFormulaSymbol: "dummy30",
        })
        .expect(200)
        .then((res) => {
          console.log({ "RESULT: res.body:": res.body });

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
            "Niech napiszę.",
            "Niech piszę.",
          ]).to.contain(res.body.questionSentenceArr[0]);
        });
    });
    it("#pal06-04c GET 200 YES: RSWAT POL to ENG, where POL tenseDescriptions are left blank.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-04d GET 200 YES: RSWAT ENG to POL, where POL tenseDescriptions are left blank.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-04e GET 200 YES: RSWAT POL to ENG, where ENG tenseDescriptions are left blank.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-04f GET 200 YES: RSWAT ENG to POL, where ENG tenseDescriptions are left blank.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-04g GET 200 YES: RSWAT POL to ENG, where tenseDescription is left blank in both question and answer structures.", () => {
      const questionLanguage = "POL";
      const answerLanguage = "ENG";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-04h GET 200 YES: RSWAT POL to ENG, where tenseDescription is left blank in both question and answer structures.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-05a GET 200 YES: RSWAT ENG to POL. Ensure three masculine genders collapse to one for the verb.", () => {
      const questionLanguage = "ENG";
      const answerLanguage = "POL";

      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
    it("#pal06-06a GET 200 YES: RSWAT POL to ENG. Ensure feminine and masculine are randomly selected at ~50/50 rate, despite there being thrice as many masculine genders as feminine.", () => {
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
      ]).then((res) => {
        let masculineProportion =
          res.filter((str) => str === "Pisałem.").length / res.length;
        let feminineProportion =
          res.filter((str) => str === "Pisałam.").length / res.length;

        expect(res.length).to.equal(50);

        console.log({ masculineProportion, feminineProportion });

        expect(masculineProportion).to.be.at.least(0.39);
        expect(masculineProportion).to.be.below(0.61);

        expect(feminineProportion).to.be.at.least(0.39);
        expect(feminineProportion).to.be.below(0.61);
      });

      function testOnce() {
        const questionLanguage = "POL";
        const answerLanguage = "ENG";

        return request(app)
          .get("/api/palette")
          .send({
            hideClarifiers: true,
            useDummy: true,
            questionLanguage,
            answerLanguage,
            sentenceFormulaSymbol: "dummy31",
          })
          .expect(200)
          .then((res) => {
            return res.body.questionSentenceArr[0];
          });
      }
    });
  });

  describe("/palette - Stage 5: Rich sentences (with nouns adjectives and verbs).", () => {
    it("#pal05-01a GET 200 YES: Returns a sentence in present.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl has red apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-01b GET 200 YES: Returns a negative sentence in past.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl didn't have red apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-01c GET 200 YES: Returns a negative sentence in past.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "red girl didn't have red apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-02a GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl reads present im",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Kobieta czyta.",
            "Chłopiec czyta.",
            "Chłopak czyta.",

            "Kobiety czytają.",
            "Chłopcy czytają.",
            "Chłopacy czytają.",
            "Chłopaki czytają.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-02b GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl reads past pf",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Kobieta przeczytała.",
            "Chłopiec przeczytał.",
            "Chłopak przeczytał.",

            "Kobiety przeczytały.",
            "Chłopcy przeczytali.",
            "Chłopacy przeczytali.",
            "Chłopaki przeczytali.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-02c GET 200 YES: Returns a sentence when selected by tenseDescription.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl reads future im",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-02d GET 200 YES: Returns a sentence when selected by one from multiple tenseDescriptions.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-03a GET 200 YES: Allow specification of multiple radically different tenseDescriptions, without unwanted cross pollination.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy26",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytałam.", "Przeczytam."]).to.include(
            res.body.questionSentenceArr[0]
          );
          //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-03b GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. POL to ENG", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage: "POL",
          answerLanguage: "ENG",
          sentenceFormulaSymbol: "dummy26",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytałam.", "Przeczytam."]).to.include(
            res.body.questionSentenceArr[0]
          );

          if (res.body.questionSentenceArr[0] === "Czytałam.") {
            expect(res.body.answerSentenceArr).to.have.members([
              "I was reading.",
              "I have read.",
            ]);
          } else if (res.body.questionSentenceArr[0] === "Przeczytam.") {
            expect(res.body.answerSentenceArr).to.have.members([
              "I will read.",
              "I am going to read.",
              "I will have read.",
            ]);
          }
          //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-03c GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. ENG to POL. Works for tenseDescription.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage: "ENG",
          answerLanguage: "POL",
          sentenceFormulaSymbol: "dummy27",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "I am writing.",
            "I write.",
            "I will write.",
            "I will have written.",
          ]).to.include(res.body.questionSentenceArr[0]);

          if (res.body.questionSentenceArr[0] === "I am writing.") {
            expect(res.body.answerSentenceArr).to.have.members(["Piszę."]);
          } else if (
            res.body.questionSentenceArr[0] === "I will write." ||
            res.body.questionSentenceArr[0] === "I will have written."
          ) {
            expect(res.body.answerSentenceArr).to.have.members(["Napiszę."]);
          }

          //If "Będę pisał." or ERROR are returned, it's because the unwanted cross pollination is happening.
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-03d GET 200 YES: Allow specification of multiple radically different tenseDescriptions, and then translate them. ENG to POL. Works for tenseDescription and gender.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          useDummy: true,
          questionLanguage: "ENG",
          answerLanguage: "POL",
          sentenceFormulaSymbol: "dummy26",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "I was reading.",
            "I will read.",
            "I will have read.",
          ]).to.include(res.body.questionSentenceArr[0]);

          if (res.body.questionSentenceArr[0] === "I was reading.") {
            expect(res.body.answerSentenceArr).to.have.members([
              "Czytałam.",
              "Czytałem.",
            ]);
          } else if (
            res.body.questionSentenceArr[0] === "I will read." ||
            res.body.questionSentenceArr[0] === "I will have read."
          ) {
            expect(res.body.answerSentenceArr).to.have.members(["Przeczytam."]);
          }

          //If "Będę czytała." or "Przeczytałam." are returned, it's because the unwanted cross pollination is happening.
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal05-04a GET 200 YES: It's okay to specify gender: f and number: plural, even though gender will technically be nonvirile. The f gender gets converted to nonvirile gender before drillPath, so the each drillPath does indeed come out correct.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy32",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytają."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
  });

  describe("/palette - Stage 4: Verbs", () => {
    it("#pal04-01a GET 200 YES: Returns a sentence with a single verb, in present.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I am reading",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytam.",
            "Czytasz.",
            "Czyta.",
            "Czytamy.",
            "Czytacie.",
            "Czytają.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01b GET 200 YES: Returns a sentence with a single verb, with person specified.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy12a 2per",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01c GET 200 YES: Returns a sentence with a single verb, with tense and number specified.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
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
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01d GET 200 YES: Returns a sentence with a single verb, with tense number and gender specified.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy13b present 2per f",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytasz.", "Czytacie."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01e GET 200 YES: Returns a sentence with a single verb in infinitive.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy14 infinitive",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytać."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01f GET 200 YES: Returns a sentence with a single verb in impersonal.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy15 impersonal",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czyta się.",
            "Czytano.",
            "Będzie czytać się.",
            "Czytano by.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01g GET 200 YES: Returns a sentence with a single verb in impersonal, even when plural is specified (returns just those impersonals that have plural use).", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy15a impersonal plural",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytano.",
            "Czytano by.",
            "Będzie czytać się.",
            "Czyta się.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-01h GET 200 YES: Returns a sentence with a single verb in impersonal, even when plural is specified (returns just those impersonals that have plural use).", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy15b impersonal plural",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Przeczyta się.",
            "Przeczytano.",
            "Przeczytano by.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02a GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy16 contemporaryAdverbial",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytając."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02b GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle, ignoring gender.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy17 contemporaryAdverbial female",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytając."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02c GET 200 YES: Returns a sentence with a verb's contemporaryAdverbial participle, ignoring gender and person.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy18 contemporaryAdverbial n virile 2per",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytając."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02d GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy16a anteriorAdverbial",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Przeczytawszy."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02e GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle, ignoring gender.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy17a anteriorAdverbial female",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Przeczytawszy."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-02f GET 200 YES: Returns a sentence with a verb's anteriorAdverbial participle, ignoring gender and person.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy18a anteriorAdverbial n virile 2per",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Przeczytawszy."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-03a GET 200 YES: Returns a sentence with a single verb's verbalNoun.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy21 verbalNoun",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytanie."]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-04a GET 200 YES: Returns verb in virile when one gender option is given.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy23a past/cond 1per plural m1",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytaliśmy.",
            "Czytaliście.",
            "Czytali.",
            "Czytalibyśmy.",
            "Czytalibyście.",
            "Czytaliby.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-04b GET 200 YES: Returns verb in nonvirile when one gender option is given.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy23b past/cond 1per plural m2",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytałyśmy.",
            "Czytałyście.",
            "Czytały.",
            "Czytałybyśmy.",
            "Czytałybyście.",
            "Czytałyby.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-04c GET 200 YES: Returns verb in nonvirile when two gender options are given.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy23c past/cond 1per plural f/n",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czytałyśmy.",
            "Czytałyście.",
            "Czytały.",
            "Czytałybyśmy.",
            "Czytałybyście.",
            "Czytałyby.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-05a GET 200 YES: Conjugate verb (as virile or nonvirile) to agree with noun in plural.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girls were reading",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Kobiety czytały.",
            "Chłopcy czytali.",
            "Chłopaki czytali.",
            "Chłopacy czytali.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-05b GET 200 YES: Conjugate verb to agree with noun in singular or plural.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl is reading",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Kobieta czyta.", "Kobiety czytają."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-06a GET 200 YES: Select a verb by the Aspect selector.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy20a girl is reading im",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Kobieta czyta.", "Kobiety czytają."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-06b GET 200 YES: Select a verb by the Aspect selector.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy20b girl will read pf",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Kobieta przeczyta.", "Kobiety przeczytają."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-07a GET 200 YES: Make two verbs agree.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy24a I read and research",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytam i badam."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-07b GET 200 YES: Make two verbs agree when there is a choice of person.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy24b I/you read and research",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czytam i badam.", "Czytasz i badasz."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal04-07c GET 200 YES: Make two verbs agree when there is a choice of person, gender, and number.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy24c read and research",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
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
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
  });

  describe("/palette - Stage 3: Adjectives", () => {
    it("#pal03-01a GET 200 YES: Returns a sentence where adjective agrees with noun in singular. Filtered by orTags.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "red/blue apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czerwona cebula.",
            "Czerwone jabłko.",
            "Niebieska cebula.",
            "Niebieskie jabłko.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal03-02a GET 200 YES: Returns a sentence where adjective agrees with noun in singular. Filtered by andTags.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "red apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czerwona cebula.", "Czerwone jabłko."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal03-02b GET 200 YES: Returns a sentence where adjective agrees with noun in nonvirile plural.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "red apples",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Czerwone cebule.", "Czerwone jabłka."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal03-02c GET 200 YES: Returns a sentence where adjective agrees with noun in virile or nonvirile plural.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "red girls",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Czerwoni chłopcy.",
            "Czerwoni chłopacy.",
            "Czerwoni chłopaki.",
            "Czerwone kobiety.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
  });

  describe("/palette - Stage 2: Nouns", () => {
    it("#pal02-01a GET 200 YES: Returns a sentence where a tantum plurale was allowed, as no particular grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "girl is wearing shirt",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
          expect(
            res.body.questionSentenceArr[0].split(" ").reverse()[0]
          ).to.equal("majtki.");
        });
    });
    it("#pal02-01b GET 200 NO: Disallows tantum plurale, as singular grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "shirt is in wardrobe",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal02-01c GET 200 YES: Returns a sentence where a tantum plurale was allowed, as either singular or plural grammatical number was requested.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I often wear shirt",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
          expect(
            res.body.questionSentenceArr[0].split(" ").reverse()[0]
          ).to.equal("majtki.");
        });
    });
    it("#pal02-02a GET 200 YES: Returns a sentence where end of inflection chain could be array.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "boys are male",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
  });

  describe("/palette - Stage 1: Basics", () => {
    it("#pal01-01a GET 200 YES: Returns a sentence", () => {
      return request(app)
        .get("/api/palette")
        .send({ hideClarifiers: true, questionLanguage: "POL" })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-02a GET 200 NO: Returns message to say no sentence can be created from specifications.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy01",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-02b GET 200 NO: Returns message to say no sentence could possibly be created from specifications.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy02",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03a GET 200 NO: Returns message to say no sentence, if dummy noun was successfully filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy03",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03b GET 200 NO: Returns message to say no sentence, if dummy noun was successfully filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy04",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03c GET 200 YES: Returns sentence, as dummy noun did not need to be filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy05",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-03d GET 200 YES: Returns successful sentence 100% of the time, rather than 33%, as one of the dummy nouns should have been filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy06",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-03e GET 200 NO: Returns message to say no sentence, as dummy noun should have been filtered out.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy07",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionMessage).to.equal(
            "No sentence could be created from the specifications."
          );
          expect(res.body.questionSentenceArr.length).to.equal(0);
        });
    });
    it("#pal01-03f GET 200 YES: Returns successful sentence 100% of the time, even though I've tried to trick it, by asking for Singular and Loc, and including an object that does indeed have Singular (but Loc is not within), and has Plural (with Loc within).", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy08",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-03g GET 200 YES: Testing whether object traversing fxn can avoid getting stuck by going down dead-ends.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaId: "POL-dummy19",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-04a GET 200 YES: Checking in console logs whether structureChunks have indeed been updated with the features (number, gender, gcase) of the finally selected word they structure for.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I have apple",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-05a GET 200 YES: Check order of words in final sentence, based on one specified order.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy09",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Foobar-A foobar-C foobar-B."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-05b GET 200 YES: Check order of words in final sentence, based on multiple specified orders.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "dummy10",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect([
            "Foobar-A foobar-B foobar-C.",
            "Foobar-A foobar-C foobar-B.",
            "Foobar-B foobar-A foobar-C.",
            "Foobar-B foobar-C foobar-A.",
          ]).to.include(res.body.questionSentenceArr[0]);
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-06a GET 200 YES: Filter by specified lemma.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I have APPLE",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(res.body.questionSentenceArr[0]).to.equal("Mam jabłko.");
          console.log({ "RESULT: res.body:": res.body });
        });
    });
    it("#pal01-06b GET 200 YES: Filter by a selection of multiple specified lemmas.", () => {
      return request(app)
        .get("/api/palette")
        .send({
          hideClarifiers: true,
          questionLanguage: "POL",
          sentenceFormulaSymbol: "I have APPLE/SHIRT",
          useDummy: true,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.questionSentenceArr[0]).to.be.a("String");
          expect(["Mam jabłka.", "Mam majtki."]).to.include(
            res.body.questionSentenceArr[0]
          );
          console.log({ "RESULT: res.body:": res.body });
        });
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
});
