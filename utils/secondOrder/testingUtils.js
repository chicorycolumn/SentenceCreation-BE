const app = require("../../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("./testingUtils.js");

exports.checkProportions = (res, ref, strictAboutAnnotations) => {
  let printoutGood = {};
  let printoutBad = {};
  let rec = {};

  ref.forEach((refArr) => {
    let name = refArr[0];
    let valuesRaw = refArr[1];
    let target = refArr[2];
    let variance = refArr[3] || 0.22;

    let values = [];
    valuesRaw.forEach((value) => {
      let expandedValues = exports.expandTestShorthands(value);
      values.push(...expandedValues);
    });
    values = Array.from(new Set(values));

    let upperBound = target + target * variance;
    let lowerBound = target - target * variance;
    let actual =
      res.filter((str) => {
        if (!strictAboutAnnotations) {
          let strWithoutAnnotations = "";
          let cease;
          str.split("").forEach((char) => {
            if (!cease && char !== "(") {
              strWithoutAnnotations += char;
            } else {
              cease = true;
            }
          });

          if (cease) {
            strWithoutAnnotations = strWithoutAnnotations.slice(0, -1) + ".";
          }

          str = strWithoutAnnotations;
        }

        return values.includes(str);
      }).length / res.length;

    rec[name] = {
      actual,
      upperBound,
      lowerBound,
    };
    let bool = lowerBound <= actual && actual <= upperBound;
    let str = bool ? "" : " not";
    let toPrint = `${uUtils.round(actual)}${str} in ${uUtils.round(
      lowerBound
    )}-${uUtils.round(upperBound)}`;

    if (bool) {
      printoutGood[name] = toPrint;
    } else {
      printoutBad[name] = toPrint;
    }
  });

  const printOutput = (printout, tag) => {
    if (Object.keys(printout).length) {
      Object.keys(printout).forEach((k) => {
        let v = printout[k];
        consol.logTestOutputSolely(tag, k, " ", v);
      });
    }
  };

  consol.logTestOutputSolely("\ncheckProportions:");
  printOutput(printoutBad, "🥵");
  printOutput(printoutGood, "😀");

  Object.keys(rec).forEach((name) => {
    let { actual, upperBound, lowerBound } = rec[name];
    expect(actual).to.be.at.least(lowerBound);
    expect(actual).to.be.at.most(upperBound);
  });
};

exports.promiseAllMultiplier = (iterations = 10, callback) => {
  let res = [];
  for (let i = 0; i < iterations; i++) {
    res.push(callback());
  }
  return res;
};

exports.runPaletteTestMultiple = (iterations = 10, ...args) => {
  return Promise.all(
    testingUtils.promiseAllMultiplier(iterations, () => {
      return testingUtils.runPaletteTest(...args);
    })
  );
};

exports.runPaletteTest = (
  questionLanguage,
  answerLanguage,
  sentenceFormulaSymbol,
  expected,
  args = {},
  expectedLength,
  returnRes,
  useDummy = sentenceFormulaSymbol.includes("dummy"),
  skipConsoleLog
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
      if (!skipConsoleLog) {
        consol.logTestOutputSolely("\n\nHere's res.body:", res.body);
      }

      if (!answerLanguage) {
        expect(res.body.questionSentenceArr).to.have.length(1);
        expect(res.body.questionSentenceArr[0]).to.be.a("String");
        if (expected) {
          expect(expected).to.include(res.body.questionSentenceArr[0]);
        }
      } else {
        if (expectedLength) {
          expect(res.body.questionSentenceArr.length).to.equal(expectedLength);
        }

        if (returnRes) {
          return res.body.questionSentenceArr[0];
        }

        testingUtils.checkTranslationsOfGivenRef(
          res,
          expected,
          questionLanguage,
          answerLanguage,
          true
        );
      }
    });
};

exports.generalTranslatedSentencesRef = {
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
  have_withPronombres_withClarifiers_QlangPOL: {
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
  have_withPronombres_withClarifiers_QlangENG: {
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
  have_withPronombres: {
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
  be_withPronombres_withClarifiers_QlangPOL: {
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
  be_withPronombres_withClarifiers_QlangENG: {
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
          "You (singular, male) were.",
          "You (singular, male) were being.",
          "You (singular, male) have been.",
          "You (singular, male) had been.",
        ],
      },
      {
        POL: "Byłaś.",
        ENG: [
          "You (singular, female) were.",
          "You (singular, female) were being.",
          "You (singular, female) have been.",
          "You (singular, female) had been.",
        ],
      },
      {
        POL: "Byłyście.",
        ENG: [
          "You (females) were.",
          "You (females) were being.",
          "You (females) have been.",
          "You (females) had been.",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You (males) were.",
          "You (males) were being.",
          "You (males) have been.",
          "You (males) had been.",
        ],
      },
      {
        POL: "Byliście.",
        ENG: [
          "You (plural, mixed) were.",
          "You (plural, mixed) were being.",
          "You (plural, mixed) have been.",
          "You (plural, mixed) had been.",
        ],
      },
    ],
  },
  be_withPronombres: {
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
  sheep_withoutClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Owca.", ENG: ["Sheep."] },
      { POL: "Owce.", ENG: ["Sheep."] },
    ],
  },
  sheep_withClarifiers_QlangPOL: {
    "POL->ENG": [
      { POL: "Owca.", ENG: ["Sheep."] },
      { POL: "Owce.", ENG: ["Sheep."] },
    ],
  },
  sheeps_withClarifiers_QlangPOL: {
    "POL->ENG": [
      {
        POL: "Owce są tutaj.",
        ENG: ["The sheep are here.", "The sheep are being here."],
      },
      {
        POL: "Owca jest tutaj.",
        ENG: ["The sheep is here.", "The sheep is being here."],
      },
    ],
  },
  sheeps_withClarifiers_QlangENG: {
    "POL->ENG": [
      { POL: "Owce są tutaj.", ENG: ["The sheep are here."] },
      { POL: "Owca jest tutaj.", ENG: ["The sheep is here."] },
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
      { POL: "Napisałeś.", ENG: ["You (singular, male) wrote."] },
      { POL: "Napisałaś.", ENG: ["You (singular, female) wrote."] },
      { POL: "Napisaliście.", ENG: ["You (males) wrote."] },
      { POL: "Napisaliście.", ENG: ["You (plural, mixed) wrote."] },
      { POL: "Napisałyście.", ENG: ["You (females) wrote."] },
      ////
      {
        POL: "Będziesz pisał.",
        ENG: ["You (singular, male) will be writing."],
      },
      {
        POL: "Będziesz pisała.",
        ENG: ["You (singular, female) will be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You (singular, female) will be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You (singular, male) will be writing."],
      },
      {
        POL: "Będziecie pisały.",
        ENG: ["You (females) will be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You (males) will be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You (plural, mixed) will be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (males) will be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (females) will be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (plural, mixed) will be writing."],
      },
      {
        POL: "Będziesz pisał.",
        ENG: ["You (singular, male) are going to be writing."],
      },
      {
        POL: "Będziesz pisała.",
        ENG: ["You (singular, female) are going to be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You (singular, female) are going to be writing."],
      },
      {
        POL: "Będziesz pisać.",
        ENG: ["You (singular, male) are going to be writing."],
      },
      {
        POL: "Będziecie pisały.",
        ENG: ["You (females) are going to be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You (males) are going to be writing."],
      },
      {
        POL: "Będziecie pisali.",
        ENG: ["You (plural, mixed) are going to be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (males) are going to be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (females) are going to be writing."],
      },
      {
        POL: "Będziecie pisać.",
        ENG: ["You (plural, mixed) are going to be writing."],
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

exports.checkRunsRecord = (res) => {
  let throwLimit = 10;
  if (res.body.runsRecord && res.body.runsRecord.length >= throwLimit) {
    consol.throw(`Runs record too high: ${res.body.runsRecord.length}.`);
  }
};

exports.checkTranslationsOfGivenRef = (
  res,
  originalRef,
  questionLanguage,
  answerLanguage,
  alreadyLogged
) => {
  let testActivated = false;
  if (!alreadyLogged) {
    consol.logTestOutputSolely("\n\nIt's res.body:", res.body);
  }
  if (res.body.runsRecord) {
    consol.logTestOutputSolely(
      "\n\n",
      "[1;35m " + `Runs record was ${res.body.runsRecord.length}.` + "[0m"
    );
  }
  testingUtils.checkRunsRecord(res);

  //Expand testing shorthands.
  let expandedRef = originalRef.map((refItem) => {
    let refItemQuestionSentence = refItem[questionLanguage];
    let refItemAnswerSentence = refItem[answerLanguage];

    if (!Array.isArray(refItemQuestionSentence)) {
      refItemQuestionSentence = [refItemQuestionSentence];
    }
    if (!Array.isArray(refItemAnswerSentence)) {
      refItemAnswerSentence = [refItemAnswerSentence];
    }

    let refItemQuestionSentences = exports.expandTestShorthands(
      refItemQuestionSentence
    );
    let refItemAnswerSentences = exports.expandTestShorthands(
      refItemAnswerSentence
    );

    let expandedRefItem = {};
    expandedRefItem[questionLanguage] = refItemQuestionSentences;
    expandedRefItem[answerLanguage] = refItemAnswerSentences;

    Object.keys(refItem).forEach((k) => {
      if (![questionLanguage, answerLanguage].includes(k)) {
        expandedRefItem[k] = refItem[k];
      }
    });

    return expandedRefItem;
  });

  //Unpack expandedRef so questionLanguage is just one string per refItem.
  let refItemsWithQuestionString = [];
  let refItemsWithQuestionArray = [];

  expandedRef.forEach((refItem) => {
    if (Array.isArray(refItem[questionLanguage])) {
      refItemsWithQuestionArray.push(refItem);
    } else {
      refItemsWithQuestionString.push(refItem);
    }
  });

  let newRefItemsWithQuestionString = [];

  refItemsWithQuestionArray.forEach((refItem) => {
    refItem[questionLanguage].forEach((questionString) => {
      let refItemCopy = uUtils.copyWithoutReference(refItem);
      refItemCopy[questionLanguage] = questionString;
      newRefItemsWithQuestionString.push(refItemCopy);
    });
  });

  let ref = [...refItemsWithQuestionString, ...newRefItemsWithQuestionString];

  //Begin testing.

  let { questionSentenceArr, answerSentenceArr } = res.body;

  if (questionSentenceArr.length > 1) {
    consol.throw(
      "scey testingutils > checkTranslationsOfGivenRef says questionSentenceArr length over 1"
    );
  }

  questionSentenceArr.forEach((actualQuestionSentence, index) => {
    let expectedQuestionSentences = ref.map(
      (refItem) => refItem[questionLanguage]
    );

    expect(expectedQuestionSentences).to.include(actualQuestionSentence);

    ref.forEach((refItem) => {
      if (
        (!refItem.originalRun ||
          refItem.originalRun === res.body.originalRun) &&
        refItem[questionLanguage] === actualQuestionSentence
      ) {
        expect(answerSentenceArr).to.have.members(refItem[answerLanguage]);
        testActivated = true;

        if (refItem.extra) {
          testingUtils.testAllSubValues(refItem.extra, res.body);
        }

        expect(
          Object.keys(res.body).filter((k) => {
            if (
              testingUtils.dataToOnlyAppearWhenExplicitlyExpected.includes(k)
            ) {
              if (refItem.optionalExtra) {
                testingUtils.testAllSubValues(
                  refItem.optionalExtra,
                  res.body,
                  true
                );
                if (Object.keys(refItem.optionalExtra).includes(k)) {
                  return false;
                }
              }

              if (!refItem.extra || !Object.keys(refItem.extra).includes(k)) {
                return true;
              }
            }
          })
        ).to.have.length(0);
      }
    });
  });

  if (!testActivated) {
    throw "This test did not really pass, as no expect statement ran.";
  }
};

exports.expandTestShorthands = (arr) => {
  if (!Array.isArray(arr)) {
    arr = [arr];
  }

  const ref = {
    "osobami/ludźmi": ["osobami", "ludźmi"],
    "osoby/ludzie": ["osoby", "ludzie"],
    "woman/lady": ["woman", "lady"],
    "women/ladies": ["women", "ladies"],
    "mi/mnie": ["mi", "mnie"],
    "cie/ciebie": ["cię", "ciebie"],
    "was/": ["was", "has been", "had been", "was being"],
    "was/i": ["was", "have been", "had been", "was being"],
    "were/": ["were", "have been", "had been", "were being"],
  };

  let totalRes = [];
  arr.forEach((sentence) => {
    let tempRes = expandTestingShorthands(sentence);
    totalRes.push(...tempRes);
  });
  return totalRes;

  function expandTestingShorthands(str) {
    let grandRes = [];
    _expandTestingShorthands(str, grandRes);
    return grandRes;

    function _expandTestingShorthands(a, resArr) {
      let arr = a.split(" ");
      let superArr = [];
      let shorthanders = [];
      let reg = /^[\p{L}\/]*$/u;
      arr.forEach((el, index) => {
        if (el.includes("/")) {
          let trimmedEl = el
            .split("")
            .filter((char) => reg.test(char))
            .join("");

          let capitalCase = trimmedEl[0].toUpperCase() === trimmedEl[0];
          trimmedEl = trimmedEl.toLowerCase();

          let shorthand = { el: trimmedEl, index, capitalCase };
          if (!reg.test(el[el.length - 1])) {
            shorthand.lastChar = el[el.length - 1];
          }
          shorthanders.push(shorthand);
        }
      });
      if (!shorthanders.length) {
        resArr.push(a);
        return;
      }
      let shorthander = shorthanders[0];
      if (!Object.keys(ref).includes(shorthander.el)) {
        throw `vfkl expandTestingShorthands "${shorthander.el}" not a recognised shorthand.`;
      }
      ref[shorthander.el].forEach((longhand) => {
        let longhanded = `${longhand}${shorthander.lastChar || ""}`;
        if (shorthander.capitalCase) {
          longhanded = longhanded[0].toUpperCase() + longhanded.slice(1);
        }

        let newArr = [
          ...arr.slice(0, shorthander.index),
          longhanded,
          ...arr.slice(shorthander.index + 1),
        ];
        superArr.push(newArr.join(" "));
      });

      if (shorthanders.length === 1) {
        resArr.push(...superArr);
        return;
      } else {
        superArr.forEach((s) => {
          _expandTestingShorthands(s, resArr);
        });
      }
    }
  }
};

exports.testAllSubValues = (ref, resBody, allowToBeAbsentOnRes) => {
  Object.keys(ref).forEach((k) => {
    testingUtils.testByDatatype(ref, k, resBody, allowToBeAbsentOnRes);
  });
};

exports.testByDatatype = (ref, key, resBody, allowToBeAbsentOnRes) => {
  if (allowToBeAbsentOnRes && !resBody[key]) {
    return;
  }

  expect(resBody).to.include.key(key);

  if (Array.isArray(ref[key])) {
    expect(resBody[key]).to.eql(ref[key]);
    return;
  }
  if (uUtils.isKeyValueTypeObject(ref[key])) {
    Object.keys(ref[key]).forEach((k) => {
      let v = ref[key][k];
      expect(resBody[key]).to.include.key(k);
      expect(resBody[key][k]).to.eql(v);
    });
    return;
  }

  expect(resBody[key]).to.eql(ref[key]);
};

exports.dataToOnlyAppearWhenExplicitlyExpected = [];
