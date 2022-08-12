const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const scUtils = require("../utils/sentenceCreatingUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const {
  traitValueTranslation,
} = require("../utils/reference/referenceTranslations");
const { generalTranslatedSentencesRef } = testingUtils;

describe("/api", function () {
  this.timeout(7000);

  describe("/palette - Stage Ω Omega: Checks at end of all tests.", () => {
    /**Actually I think it is fine for us to be mutating lemma objects, because
     * we don't write them back into the word banks after creating sentence. And the
     * only mutation is the processing from preprocessLemmaObjectsMinor. So instead,
     * we now use this test to check that it's only those changes happening.
     */

    it("#palΩ-01 Words and Formulas banks were not mutated.", () => {
      const original = require("../spec/originalCopies.js");

      let actual = {};

      let langs = ["ENG", "POL"];

      langs.forEach((lang) => {
        const langUtils = require("../source/" + lang + "/langUtils.js");

        let words = scUtils.getWordsAndFormulas(lang);
        actual[lang] = words;

        Object.values(original[lang].wordsBank).forEach((wordset) => {
          langUtils.preprocessLemmaObjectsMinor(wordset);
        });
        Object.values(original[lang].dummyWordsBank).forEach((wordset) => {
          langUtils.preprocessLemmaObjectsMinor(wordset);
        });
      });

      expect(actual).to.eql(original);
    });
  });
});
