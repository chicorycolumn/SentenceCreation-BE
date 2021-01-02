const {
  findHomographs,
  checkLemmaObjectIds,
  checkSentenceFormulaIds,
  checkWords,
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
  it("REAL #edu3.1 Gives ENG synhomograph lemma objects. (Used programmatically for Type 1 Synhomos)", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    console.log(
      "Educator does not need to take action on this: spec result >>>>",
      actual
    );
  });
  it("REAL #edu3.2 Gives POL synhomograph lemma objects. (Used programmatically for Type 1 Synhomos)", () => {
    const currentLanguage = "POL";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    console.log(
      "Educator does not need to take action on this: result >>>>",
      actual
    );
  });
  it("REAL #edu4.1 Gives ENG allohomograph lemma objects.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);

    if (Object.keys(actual).length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: YOU MUST ADD CLARIFIER INFO TO THESE ALLOHOMOGRAPHS: " +
        Object.keys(actual).join(", ")
      );
    }
    expect(Object.keys(actual).length).to.equal(0);
  });
  it("REAL #edu4.2 Gives POL allohomograph lemma objects.", () => {
    const currentLanguage = "POL";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    console.log("spec result >>>>", actual);
    let keysActual = Object.keys(actual).filter((key) => key !== "true");

    if (keysActual.length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: YOU MUST ADD CLARIFIER INFO TO THESE ALLOHOMOGRAPHS: " +
        keysActual.join(", ")
      );
    }
    expect(keysActual.length).to.equal(0);
  });
});

describe("checkLemmaObjectIds", () => {
  it("#edu2.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds(true, currentLanguage);

    expect(actual).to.eql({
      schematic: [
        ["eng-nou-001", "woman"],
        ["eng-nou-002", "boy"],
        ["eng-nou-002a", "boy"],
        ["eng-nou-003", "onion"],
        ["eng-nou-003", "apple"],
        ["eng-nou-005", "mirror"],
        ["eng-nou-006", "book"],
        ["eng-nou-007", "door"],
        ["eng-nou-008", "sheep"],
        ["eng-nou-009", "nut"],
        ["eng-nou-010", "nut"],
        ["eng-nou-011", "bear"],
        ["eng-adj-001", "red"],
        ["eng-adj-005", "fast"],
        ["eng-adj-004", "fast"],
        ["eng-adj-002", "small"],
        ["eng-ver-006", "bear"],
        ["eng-ver-003", "read"],
        ["eng-ver-002", "write"],
        ["eng-ver-004", "research"],
        ["eng-ver-001", "have"],
        ["eng-ver-000", "be"],
      ],
      duplicateIds: ["eng-nou-003"],
    });
  });
  it("REAL #edu2.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "Action required: DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
  it("REAL #edu2.2 Gives a schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "Action required: DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
});

describe("checkSentenceFormulaIds", () => {
  it.only("#edu3.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds(true, currentLanguage);

    console.log(actual);

    // expect(actual.to.eql)
  });
  it("REAL #edu3.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
    // expect(actual).to.eql(expected);
  });
  it("REAL #edu3.2 Gives a schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      console.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
  });
});

describe("checkWords", () => {
  it("#edu4.1 Checks words for specific keys that might not have been specified. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkWords(true, currentLanguage);

    console.log(actual);

    let { nounsWithoutGender } = actual;

    expect(nounsWithoutGender).to.eql([
      ["boy", "eng-nou-002a"],
      ["onion", "eng-nou-003"],
      ["apple", "eng-nou-004"],
      ["mirror", "eng-nou-005"],
      ["book", "eng-nou-006"],
      ["door", "eng-nou-007"],
      ["sheep", "eng-nou-008"],
      ["nut", "eng-nou-009"],
      ["nut", "eng-nou-010"],
      ["bear", "eng-nou-011"],
    ]);

    // if (nounsWithoutGender.length) {
    //   console.log(currentLanguage + " Sentence Formulas >>>>", actual);
    //   throw (
    //     "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
    //     nounsWithoutGender
    //       .map((lObj) => `${lObj.lemma} (${lObj.id})`)
    //       .join(", ")
    //   );
    // }
    // expect(nounsWithoutGender.length).to.equal(0);
  });
  it("#edu4.2 Checks words for specific keys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords(true, currentLanguage);

    let { nounsWithoutGender } = actual;

    console.log(actual);

    expect(nounsWithoutGender).to.eql([["kobieta", "pol-nou-001"]]);

    // if (nounsWithoutGender.length) {
    //   console.log(currentLanguage + " Sentence Formulas >>>>", actual);
    //   throw (
    //     "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
    //     nounsWithoutGender
    //       .map((lObj) => `${lObj.lemma} (${lObj.id})`)
    //       .join(", ")
    //   );
    // }
    // expect(nounsWithoutGender.length).to.equal(0);
  });
  it("REAL #edu5.1 Checks words for specific keys that might not have been specified. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkWords(false, currentLanguage);

    console.log(actual);

    let { nounsWithoutGender } = actual;

    if (nounsWithoutGender.length) {
      // console.log(nounsWithoutGender);
      throw (
        "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
        nounsWithoutGender.map((item) => item[0]).join(", ")
      );
    }
    expect(nounsWithoutGender.length).to.equal(0);
  });
  it("REAL #edu5.2 Checks words for specific keys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords(false, currentLanguage);

    console.log(actual);

    let { nounsWithoutGender } = actual;

    if (nounsWithoutGender.length) {
      // console.log(nounsWithoutGender);
      throw (
        "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
        nounsWithoutGender.map((item) => item[0]).join(", ")
      );
    }
    expect(nounsWithoutGender.length).to.equal(0);
  });
});
