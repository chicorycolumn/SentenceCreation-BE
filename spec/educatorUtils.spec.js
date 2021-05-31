const {
  findHomographs,
  checkLemmaObjectIds,
  checkSentenceFormulaIds,
  checkWords,
} = require("../utils/secondOrder/educatorUtils.js");
const { expect } = require("chai");

xdescribe("findHomographs", () => {
  it("#edu1.1 Gives all synhomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: false,
      ignoreTerminusObjects: true,
    };

    const expected = {
      sheep: [
        ["eng-nco-008", "singular", "nom"],
        ["eng-nco-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-008", "singular", "gen"],
        ["eng-nco-008", "plural", "gen"],
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
    consol.log("spec result >>>>", actual);
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
        ["eng-nco-008", "singular", "nom"],
        ["eng-nco-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-008", "singular", "gen"],
        ["eng-nco-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
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
        ["eng-nco-008", "singular", "nom"],
        ["eng-nco-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-008", "singular", "gen"],
        ["eng-nco-008", "plural", "gen"],
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
    consol.log("spec result >>>>", actual);
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
        ["eng-nco-008", "singular", "nom"],
        ["eng-nco-008", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-008", "singular", "gen"],
        ["eng-nco-008", "plural", "gen"],
      ],
      read: [
        ["eng-ver-003", "infinitive"],
        ["eng-ver-003", "v2"],
        ["eng-ver-003", "v3"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.11 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      wob: [
        ["eng-adj-100", "protective"],
        ["eng-adj-101", "nonprotective"],
      ],
      nut: [
        ["eng-nco-009", "singular", "nom"],
        ["eng-nco-010", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nco-009", "singular", "gen"],
        ["eng-nco-010", "singular", "gen"],
      ],
      nuts: [
        ["eng-nco-009", "plural", "nom"],
        ["eng-nco-010", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nco-009", "plural", "gen"],
        ["eng-nco-010", "plural", "gen"],
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
        ["eng-nco-011", "singular", "nom"],
        ["eng-ver-006", "infinitive"],
      ],
      bears: [
        ["eng-nco-011", "plural", "nom"],
        ["eng-ver-006", "thirdPS"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.12 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true, //Should have no effect as we are asking for allohoms.
      ignoreClarifiedAllohoms: false,
    };

    const expected = {
      wob: [
        ["eng-adj-100", "protective"],
        ["eng-adj-101", "nonprotective"],
      ],
      nut: [
        ["eng-nco-009", "singular", "nom"],
        ["eng-nco-010", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nco-009", "singular", "gen"],
        ["eng-nco-010", "singular", "gen"],
      ],
      nuts: [
        ["eng-nco-009", "plural", "nom"],
        ["eng-nco-010", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nco-009", "plural", "gen"],
        ["eng-nco-010", "plural", "gen"],
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
        ["eng-nco-011", "singular", "nom"],
        ["eng-ver-006", "infinitive"],
      ],
      bears: [
        ["eng-nco-011", "plural", "nom"],
        ["eng-ver-006", "thirdPS"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.13 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: false,
      ignoreClarifiedAllohoms: true,
    };

    const expected = {
      wob: [
        ["eng-adj-100", "protective"],
        ["eng-adj-101", "nonprotective"],
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
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.14 Gives all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    const expected = {
      wob: [
        ["eng-adj-100", "protective"],
        ["eng-adj-101", "nonprotective"],
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
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    expect(actual).to.eql(expected);
  });
  it("#edu1.15 Includes tObjs. Gives all allohomograph lemma objects in one language.", () => {
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
      wob: [
        ["eng-adj-100", "protective"],
        ["eng-adj-101", "nonprotective"],
      ],
    };

    let actual = findHomographs(true, currentLanguage, homographType, ignore);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
});

xdescribe("checkLemmaObjectIds", () => {
  it("#edu2.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds(true, currentLanguage);

    expect(actual).to.eql({
      schematic: [
        ["eng-npe-001", "woman"],
        ["eng-npe-002", "boy"],
        ["eng-nco-003", "onion"],
        ["eng-nco-003", "apple"],
        ["eng-nco-005", "mirror"],
        ["eng-nco-006", "book"],
        ["eng-nco-007", "door"],
        ["eng-nco-008", "sheep"],
        ["eng-nco-009", "nut"],
        ["eng-nco-010", "nut"],
        ["eng-nco-011", "bear"],
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
      duplicateIds: ["eng-nco-003"],
    });
  });
});

xdescribe("checkSentenceFormulaIds", () => {
  it("#edu3.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds(true, currentLanguage);

    consol.log(actual);

    const expected = {
      schematic: [
        ["ENG-00-101a", "symb1"],
        ["ENG-00-101b", "symb1"],
        ["ENG-00-102a", "102a I'll read (pf fut)"],
        ["ENG-00-102a", "102a I'll read"],
      ],
      duplicateIds: ["ENG-00-102a"],
      duplicateSymbols: ["symb1"],
    };

    expect(actual).to.eql(expected);
  });
});

xdescribe("checkWords", () => {
  it("#edu4.1 Checks words for specific traitKeyys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords(true, currentLanguage);

    let { nounsWithoutGender } = actual;

    consol.log(actual);

    expect(nounsWithoutGender).to.eql([["kobieta", "pol-npe-001"]]);
  });
});

xdescribe("Educator Battery", () => {
  it("#eduBat-01 Gives ENG synhomograph lemma objects. (Used programmatically for Type 1 Synhomos)", () => {
    const currentLanguage = "ENG";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    consol.log(
      "Educator does not need to take action on this: spec result >>>>",
      actual
    );
  });
  it("#eduBat-02 Gives POL synhomograph lemma objects. (Used programmatically for Type 1 Synhomos)", () => {
    const currentLanguage = "POL";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    consol.log(
      "Educator does not need to take action on this: result >>>>",
      actual
    );
  });
  it("#eduBat-03 Gives ENG allohomograph lemma objects.", () => {
    const currentLanguage = "ENG";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);

    if (Object.keys(actual).length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: YOU MUST ADD CLARIFIER INFO TO THESE ALLOHOMOGRAPHS: " +
        Object.keys(actual).join(", ")
      );
    }
    expect(Object.keys(actual).length).to.equal(0);
  });
  it("#eduBat-04 Gives POL allohomograph lemma objects.", () => {
    const currentLanguage = "POL";
    const homographType = "allo";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true,
    };

    let actual = findHomographs(false, currentLanguage, homographType, ignore);
    consol.log("spec result >>>>", actual);
    let keysActual = Object.keys(actual).filter((key) => key !== "true");

    if (keysActual.length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: YOU MUST ADD CLARIFIER INFO TO THESE ALLOHOMOGRAPHS: " +
        keysActual.join(", ")
      );
    }
    expect(keysActual.length).to.equal(0);
  });
  it("#eduBat-05 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      consol.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "Action required: DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
  });
  it("#eduBat-06 Gives a schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkLemmaObjectIds(false, currentLanguage);

    if (actual.duplicateIds.length) {
      consol.log(currentLanguage + " Lemma Objects >>>>", actual);
      throw (
        "Action required: DUPLICATE LEMMA OBJECTS IDS WERE FOUND: " +
        actual.duplicateIds.join(", ")
      );
    }
    expect(actual.duplicateIds.length).to.equal(0);
  });
  it("#eduBat-07 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    let { duplicateIds, duplicateSymbols } = actual;

    if (duplicateIds.length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        duplicateIds.join(", ")
      );
    }
    expect(duplicateIds.length).to.equal(0);

    if (duplicateSymbols.length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA SYMBOLS WERE FOUND: " +
        duplicateSymbols.join(", ")
      );
    }
    expect(duplicateSymbols.length).to.equal(0);
  });
  it("#eduBat-08 Gives a schematic and duplicateIds. POL", () => {
    const currentLanguage = "POL";

    let actual = checkSentenceFormulaIds(false, currentLanguage);

    let { duplicateIds, duplicateSymbols } = actual;

    if (duplicateIds.length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA IDS WERE FOUND: " +
        duplicateIds.join(", ")
      );
    }
    expect(duplicateIds.length).to.equal(0);

    if (duplicateSymbols.length) {
      consol.log(currentLanguage + " Sentence Formulas >>>>", actual);
      throw (
        "Action required: DUPLICATE SENTENCE FORMULA SYMBOLS WERE FOUND: " +
        duplicateSymbols.join(", ")
      );
    }
    expect(duplicateSymbols.length).to.equal(0);
  });
  it("#eduBat-09 Checks words for specific traitKeyys that might not have been specified. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkWords(false, currentLanguage);

    consol.log(actual);

    let { nounsWithoutGender } = actual;

    if (nounsWithoutGender.length) {
      throw (
        "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
        nounsWithoutGender.map((item) => item[0]).join(", ")
      );
    }
    expect(nounsWithoutGender.length).to.equal(0);
  });
  it("#eduBat-10 Checks words for specific traitKeyys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords(false, currentLanguage);

    consol.log(actual);

    let { nounsWithoutGender } = actual;

    if (nounsWithoutGender.length) {
      throw (
        "Action required: YOU MUST SPECIFY A GENDER FOR THESE NOUNS: " +
        nounsWithoutGender.map((item) => item[0]).join(", ")
      );
    }
    expect(nounsWithoutGender.length).to.equal(0);
  });
});
