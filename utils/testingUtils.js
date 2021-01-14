const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/testingUtils.js");

exports.checkTranslationsOfGivenRef = (
  res,
  ref,
  questionLanguage,
  answerLanguage
) => {
  let testActivated = false;

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

  questionSentenceArr.forEach((actualQuestionSentence, index) => {
    //Zeta: Remove this and run tests.
    if (index) {
      return;
    }

    let expectedQuestionSentences = ref.map((item) => item[questionLanguage]);

    expect(expectedQuestionSentences).to.include(actualQuestionSentence);

    ref.forEach((item) => {
      if (item[questionLanguage] === actualQuestionSentence) {
        expect(item[answerLanguage]).to.have.members(answerSentenceArr);
        testActivated = true;
      }
    });
  });

  if (!testActivated) {
    throw "This test did not really pass, as no expect statement ran.";
  }
};
