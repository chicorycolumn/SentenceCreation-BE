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

  describe("/palette - Stage Ω: Checks at end of all tests.", () => {
    it("#palΩ-01 Words and Formulas banks were not mutated.", () => {
      const original = require("../spec/originalCopies.js");

      let actual = {};

      let langs = ["ENG", "POL"];

      langs.forEach((lang) => {
        actual[lang] = scUtils.getWordsAndFormulas(lang);
      });

      expect(actual).to.eql(original);
    });
  });
});
