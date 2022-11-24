const {
  findHomographs,
  checkLemmaObjectIds,
  checkSentenceFormulaIds,
  checkWords,
} = require("../utils/secondOrder/educatorUtils.js");
const { expect } = require("chai");
const consol = require("./../utils/zerothOrder/consoleLoggingUtils.js");

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
        ["eng-nco-908", "singular", "nom"],
        ["eng-nco-908", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-908", "singular", "gen"],
        ["eng-nco-908", "plural", "gen"],
      ],
      read: [
        ["eng-ver-903", "infinitive"],
        ["eng-ver-903", "v2"],
        ["eng-ver-903", "v3"],
      ],
      researched: [
        ["eng-ver-904", "v2"],
        ["eng-ver-904", "v3"],
      ],
      had: [
        ["eng-ver-902", "v2"],
        ["eng-ver-902", "v3"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-nco-908", "singular", "nom"],
        ["eng-nco-908", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-908", "singular", "gen"],
        ["eng-nco-908", "plural", "gen"],
      ],
      read: [
        ["eng-ver-903", "infinitive"],
        ["eng-ver-903", "v2"],
        ["eng-ver-903", "v3"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-nco-908", "singular", "nom"],
        ["eng-nco-908", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-908", "singular", "gen"],
        ["eng-nco-908", "plural", "gen"],
      ],
      read: [
        ["eng-ver-903", "infinitive"],
        ["eng-ver-903", "v2"],
        ["eng-ver-903", "v3"],
      ],
      researched: [
        ["eng-ver-904", "v2"],
        ["eng-ver-904", "v3"],
      ],
      had: [
        ["eng-ver-902", "v2"],
        ["eng-ver-902", "v3"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-nco-908", "singular", "nom"],
        ["eng-nco-908", "plural", "nom"],
      ],
      "sheep's": [
        ["eng-nco-908", "singular", "gen"],
        ["eng-nco-908", "plural", "gen"],
      ],
      read: [
        ["eng-ver-903", "infinitive"],
        ["eng-ver-903", "v2"],
        ["eng-ver-903", "v3"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-adj-900", "protective"],
        ["eng-adj-901", "nonprotective"],
      ],
      nut: [
        ["eng-nco-909", "singular", "nom"],
        ["eng-nco-910", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nco-909", "singular", "gen"],
        ["eng-nco-910", "singular", "gen"],
      ],
      nuts: [
        ["eng-nco-909", "plural", "nom"],
        ["eng-nco-910", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nco-909", "plural", "gen"],
        ["eng-nco-910", "plural", "gen"],
      ],
      fast: [
        ["eng-adj-905", "simple"],
        ["eng-adj-905", "comparative"],
        ["eng-adj-905", "adverb"],
        ["eng-adj-904", "simple"],
      ],
      fastest: [
        ["eng-adj-905", "superlative"],
        ["eng-adj-904", "superlative"],
      ],
      bear: [
        ["eng-nco-901", "singular", "nom"],
        ["eng-ver-906", "infinitive"],
      ],
      bears: [
        ["eng-nco-901", "plural", "nom"],
        ["eng-ver-906", "thirdPS"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-adj-900", "protective"],
        ["eng-adj-901", "nonprotective"],
      ],
      nut: [
        ["eng-nco-909", "singular", "nom"],
        ["eng-nco-910", "singular", "nom"],
      ],
      "nut's": [
        ["eng-nco-909", "singular", "gen"],
        ["eng-nco-910", "singular", "gen"],
      ],
      nuts: [
        ["eng-nco-909", "plural", "nom"],
        ["eng-nco-910", "plural", "nom"],
      ],
      "nuts'": [
        ["eng-nco-909", "plural", "gen"],
        ["eng-nco-910", "plural", "gen"],
      ],
      fast: [
        ["eng-adj-905", "simple"],
        ["eng-adj-905", "comparative"],
        ["eng-adj-905", "adverb"],
        ["eng-adj-904", "simple"],
      ],
      fastest: [
        ["eng-adj-905", "superlative"],
        ["eng-adj-904", "superlative"],
      ],
      bear: [
        ["eng-nco-901", "singular", "nom"],
        ["eng-ver-906", "infinitive"],
      ],
      bears: [
        ["eng-nco-901", "plural", "nom"],
        ["eng-ver-906", "thirdPS"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-adj-900", "protective"],
        ["eng-adj-901", "nonprotective"],
      ],
      fast: [
        ["eng-adj-905", "simple"],
        ["eng-adj-905", "comparative"],
        ["eng-adj-905", "adverb"],
        ["eng-adj-904", "simple"],
      ],
      fastest: [
        ["eng-adj-905", "superlative"],
        ["eng-adj-904", "superlative"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-adj-900", "protective"],
        ["eng-adj-901", "nonprotective"],
      ],
      fast: [
        ["eng-adj-905", "simple"],
        ["eng-adj-905", "comparative"],
        ["eng-adj-905", "adverb"],
        ["eng-adj-904", "simple"],
      ],
      fastest: [
        ["eng-adj-905", "superlative"],
        ["eng-adj-904", "superlative"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
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
        ["eng-adj-905", "simple"],
        ["eng-adj-905", "comparative"],
        ["eng-adj-905", "adverb"],
        ["eng-adj-904", "simple"],
      ],
      fastest: [
        ["eng-adj-905", "superlative"],
        ["eng-adj-904", "superlative"],
      ],
      wob: [
        ["eng-adj-900", "protective"],
        ["eng-adj-901", "nonprotective"],
      ],
    };

    let actual = findHomographs("dev", currentLanguage, homographType, ignore);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
});

xdescribe("checkLemmaObjectIds", () => {
  it("#edu2.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkLemmaObjectIds("dev", currentLanguage);

    let expected = {
      schematic: [
        ["eng-npe-901", "woman"],
        ["eng-npe-902", "boy"],
        ["eng-nco-902", "onion"],
        ["eng-nco-902", "apple"],
        ["eng-nco-905", "mirror"],
        ["eng-nco-906", "book"],
        ["eng-nco-907", "door"],
        ["eng-nco-908", "sheep"],
        ["eng-nco-909", "nut"],
        ["eng-nco-910", "nut"],
        ["eng-nco-901", "bear"],
        ["eng-adj-901", "red"],
        ["eng-adj-905", "fast"],
        ["eng-adj-904", "fast"],
        ["eng-adj-902", "small"],
        ["eng-adj-900", "wibbly"],
        ["eng-adj-901", "wobbly"],
        ["eng-ver-906", "bear"],
        ["eng-ver-903", "read"],
        ["eng-ver-905", "write"],
        ["eng-ver-904", "research"],
        ["eng-ver-902", "have"],
        ["eng-ver-901", "be"],
      ],
      duplicateIds: ["eng-nco-902", "eng-adj-901"],
    };

    function _order(obj) {
      obj.schematic = obj.schematic.sort((x, y) => x[0].localeCompare(y[0]));
      obj.duplicateIds = obj.duplicateIds.sort((x, y) => x.localeCompare(y));
    }

    _order(actual);
    _order(expected);

    expect(actual).to.eql(expected);
  });
});

xdescribe("checkSentenceFormulaIds", () => {
  it("#edu3.1 Gives a schematic and duplicateIds. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkSentenceFormulaIds("dev", currentLanguage);

    consol.log(actual);

    const expected = {
      schematic: [
        ["ENG-90-901a", "symb1"],
        ["ENG-90-901b", "symb1"],
        ["ENG-90-902a", "102a I'll read (pf fut)"],
        ["ENG-90-902a", "102a I'll read"],
      ],
      duplicateIds: ["ENG-90-902a"],
      duplicateSymbols: ["symb1"],
    };

    expect(actual).to.eql(expected);
  });
});

xdescribe("checkWords", () => {
  it("#edu4.1 Checks words for specific traitKeys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords("dev", currentLanguage);

    let { nounsWithoutGender } = actual;

    consol.log(actual);

    expect(nounsWithoutGender).to.eql([["kobieta", "pol-npe-901"]]);
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

    let actual = findHomographs("ref", currentLanguage, homographType, ignore);
    consol.log(
      "Educator does not need to take action on this: spec result >>>>",
      actual
    );
  });
  it("#eduBat-02 Gives POL synhomograph lemma objects. (Used programmatically for Type 1 Synhoms)", () => {
    const currentLanguage = "POL";
    const homographType = "syn";
    const ignore = {
      ignoreV2V3Synhoms: true,
      ignoreClarifiedAllohoms: true, //Should have no effect as we are asking for synhoms.
    };

    let actual = findHomographs("ref", currentLanguage, homographType, ignore);
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

    let actual = findHomographs("ref", currentLanguage, homographType, ignore);
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

    let actual = findHomographs("ref", currentLanguage, homographType, ignore);
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

    let actual = checkLemmaObjectIds("ref", currentLanguage);

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

    let actual = checkLemmaObjectIds("ref", currentLanguage);

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

    let actual = checkSentenceFormulaIds("ref", currentLanguage);

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

    let actual = checkSentenceFormulaIds("ref", currentLanguage);

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
  it("#eduBat-09 Checks words for specific traitKeys that might not have been specified. ENG", () => {
    const currentLanguage = "ENG";

    let actual = checkWords("ref", currentLanguage);

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
  it("#eduBat-10 Checks words for specific traitKeys that might not have been specified. POL", () => {
    const currentLanguage = "POL";

    let actual = checkWords("ref", currentLanguage);

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
