const {
  findHomographs,
  checkLemmaObjectIds,
  checkSentenceFormulaIds,
} = require("../utils/educatorUtils.js");
const { expect } = require("chai");

describe("findHomographs", () => {
  it("#edu1.1 Gives all synhomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      sheep: [
        ["eng-nou-008", "singular", "nom"],
        ["eng-nou-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nou-008", "singular", "gen"],
        ["eng-nou-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
      researched: [
        ["eng-ver-004", "v2"],
        ["eng-ver-004", "v3"],
      ],
      had: [
        ["eng-ver-001", "v2"],
        ["eng-ver-001", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.2 Gives all synhomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      sheep: [
        ["eng-nou-008", "singular", "nom"],
        ["eng-nou-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nou-008", "singular", "gen"],
        ["eng-nou-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.3 Gives all synhomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    const expected = {
      sheep: [
        ["eng-nou-008", "singular", "nom"],
        ["eng-nou-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nou-008", "singular", "gen"],
        ["eng-nou-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
      researched: [
        ["eng-ver-004", "v2"],
        ["eng-ver-004", "v3"],
      ],
      had: [
        ["eng-ver-001", "v2"],
        ["eng-ver-001", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.4 Gives all synhomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    const expected = {
      sheep: [
        ["eng-nou-008", "singular", "nom"],
        ["eng-nou-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nou-008", "singular", "gen"],
        ["eng-nou-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu2.1 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      nut: [
        ["eng-nou-009", "singular", "nom"],
        ["eng-nou-010", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nou-009", "singular", "gen"],
        ["eng-nou-010", "singular", "gen"],
      ],
      nuts: [
        ["eng-nou-009", "plural", "nom"],
        ["eng-nou-010", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nou-009", "plural", "gen"],
        ["eng-nou-010", "plural", "gen"],
      ],
      fast: [
        ["eng-adj-005", "simple"],
        ["eng-adj-005", "comparative"],
        ["eng-adj-005", "adverb"],
        ["eng-adj-004", "simple"],
      ],
      fastest: [
        ["eng-adj-005", "superlative"],
        ["eng-adj-004", "superlative"],
      ],
      bear: [
        ["eng-nou-011", "singular", "nom"],
        ["eng-ver-006", "infinitive"],
      ],
      bears: [
        ["eng-nou-011", "plural", "nom"],
        ["eng-ver-006", "thirdPS"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu2.2 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true, //Should have no effect as we are asking for allohoms.
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      nut: [
        ["eng-nou-009", "singular", "nom"],
        ["eng-nou-010", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nou-009", "singular", "gen"],
        ["eng-nou-010", "singular", "gen"],
      ],
      nuts: [
        ["eng-nou-009", "plural", "nom"],
        ["eng-nou-010", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nou-009", "plural", "gen"],
        ["eng-nou-010", "plural", "gen"],
      ],
      fast: [
        ["eng-adj-005", "simple"],
        ["eng-adj-005", "comparative"],
        ["eng-adj-005", "adverb"],
        ["eng-adj-004", "simple"],
      ],
      fastest: [
        ["eng-adj-005", "superlative"],
        ["eng-adj-004", "superlative"],
      ],
      bear: [
        ["eng-nou-011", "singular", "nom"],
        ["eng-ver-006", "infinitive"],
      ],
      bears: [
        ["eng-nou-011", "plural", "nom"],
        ["eng-ver-006", "thirdPS"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu2.3 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: true,
    };

    const expected = {
      fast: [
        ["eng-adj-005", "simple"],
        ["eng-adj-005", "comparative"],
        ["eng-adj-005", "adverb"],
        ["eng-adj-004", "simple"],
      ],
      fastest: [
        ["eng-adj-005", "superlative"],
        ["eng-adj-004", "superlative"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu2.4 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    const expected = {
      fast: [
        ["eng-adj-005", "simple"],
        ["eng-adj-005", "comparative"],
        ["eng-adj-005", "adverb"],
        ["eng-adj-004", "simple"],
      ],
      fastest: [
        ["eng-adj-005", "superlative"],
        ["eng-adj-004", "superlative"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
});

describe("checkLemmaObjectIds", () => {
  it("#edu2.1 Gives schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
  it("#edu2.2 Gives schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
});

describe("checkSentenceFormulaIds", () => {
  it("#edu3.1 Gives schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
  it("#edu3.2 Gives schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
});
