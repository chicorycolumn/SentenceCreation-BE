const { findHomographs } = require("../utils/educatorUtils.js");
const { expect } = require("chai");

// xdescribe("findHomographs", () => {
describe.only("findHomographs", () => {
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
