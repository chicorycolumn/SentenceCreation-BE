const {
  terminusObjectNormalArray,
} = require("../../../utils/generalPurposeUtils");

// Create a checker fxn that makes sure eg eng-lady doesn't have an entry here,
// because is already covered as a synonym in npe-0000-woman.

// traductions will match by lang+wordtype+number ie
// "pol-npe-015-lekarz" also covers "pol-npe-015-lekarka"

// Remove tantum as a tag from words, as it's not preserved between synonyms.

// Frequency tag is the only one different between synonyms.

// ITG_J and ITG_K not exist in ENG yet.

exports.wordsBank = {
  npe: [
    {
      key: "npe-0000-woman",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-001-woman", "eng-npe-006-lady"],
        POL: ["pol-npe-011-kobieta"],
      },
      papers: ["animate", "personTest1", "concrete"],
      topics: [],
    },
    {
      key: "npe-0001-boy",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-002-boy"],
        POL: ["pol-npe-012-chłopiec"],
      },
      papers: ["animate", "personTest1", "concrete"],
      topics: [],
    },
    {
      key: "npe-0003-father/mother",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-003-mother"],
        POL: ["pol-npe-013-matka"],
      },
      papers: ["animate", "family", "concrete"],
      topics: [],
    },
    {
      key: "npe-0004-doctor",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-005-doctor"],
        POL: ["pol-npe-015-lekarz"],
      },
      papers: ["concrete", "animate", "personTest2", "job"],
      topics: [],
    },
    {
      key: "npe-0005-king/queen",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-007-king"],
        POL: ["pol-npe-016-król"],
      },
      papers: [],
      topics: [],
    },
    {
      key: "npe-0006-brother/sister",
      traductions: {
        SPA: [],
        ENG: ["eng-npe-008-brother"],
        POL: ["pol-npe-017-brat"],
      },
      papers: [],
      topics: [],
    },
  ],
  nco: [
    {
      key: "nco-0000-bear",
      traductions: {
        SPA: ["spa-nco-002-oso"],
        ENG: ["eng-nco-001-bear"],
        POL: ["pol-nco-011-nedved"],
      },
      papers: ["allohomTesting2", "animal"],
      topics: [],
    },
    {
      key: "nco-0001-onion",
      traductions: {
        SPA: ["spa-nco-001-cebolla"],
        ENG: ["eng-nco-002-onion"],
        POL: ["pol-nco-012-cebula"],
      },
      papers: ["inanimate", "edible", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0002-tomato",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-003-tomato"],
        POL: ["pol-nco-013-pomidor"],
      },
      papers: ["inanimate", "edible0", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0003-apple",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-004-apple"],
        POL: ["pol-nco-014-jabłko"],
      },
      papers: ["inanimate", "edible", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0004-mirror",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-005-mirror"],
        POL: ["pol-nco-015-lustro", "pol-nco-004-zwierciadło"],
      },
      papers: ["inanimate", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0005-book",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-006-book"],
        POL: ["pol-nco-016-książka"],
      },
      papers: ["inanimate", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0006-door",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-007-door"],
        POL: ["pol-nco-017-drzwi"],
      },
      papers: ["inanimate", "house", "concrete"],
      topics: [],
    },
    {
      key: "nco-0007-sheep",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-008-sheep"],
        POL: ["pol-nco-018-owca"],
      },
      papers: ["concrete", "animal0", "animate", "farmyard"],
      topics: [],
    },
    {
      key: "nco-0008-dust",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-009-dust"],
        POL: ["pol-nco-019-pył"],
      },
      papers: ["tantumTest1"],
      topics: [],
    },
    {
      key: "nco-0009-underwear",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-010-underwear"],
        POL: ["pol-nco-010-majtki"],
      },
      papers: ["inanimate", "holdable", "concrete", "wearable"],
      topics: [],
    },
    {
      key: "nco-0010-rat",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-011-rat"],
        POL: ["pol-nco-001-szczur"],
      },
      papers: ["concrete", "animal", "animate", "pet"],
      topics: [],
    },
    {
      key: "nco-0011-tweezers",
      traductions: {
        SPA: [],
        ENG: ["eng-nco-012-tweezers"],
        POL: ["pol-nco-002-pinceta"],
      },
      papers: ["tantumTest1"],
      topics: [],
    },
  ],
  ver: [
    {
      key: "ver-0000-be(essence)",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-001-be"],
        POL: ["pol-ver-011-być"],
      },
      papers: ["basic", "identity"],
      topics: [],
    },
    // {
    //   key: "ver-0001-be(state)",
    //   traductions: {SPA:[], ENG: ["eng-ver-001-be"], POL: ["pol-ver-011-być"] },
    //   papers: ["basic", "identity"],
    //   topics: [],
    // },
    {
      key: "ver-0002-have",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-002-have"],
        POL: ["pol-ver-012-mieć"],
      },
      papers: ["basic", "possession"],
      topics: [],
    },
    {
      key: "ver-0003-read",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-003-read"],
        POL: ["pol-ver-013-czytać"],
      },
      papers: ["basic2"],
      topics: [],
    },
    {
      key: "ver-0004-research",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-004-research"],
        POL: ["pol-ver-014-badać"],
      },
      papers: ["science"],
      topics: [],
    },
    {
      key: "ver-0005-write",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-005-write"],
        POL: ["pol-ver-015-pisać"],
      },
      papers: ["basic3"],
      topics: [],
    },
    {
      key: "ver-0006-give",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-006-give"],
        POL: ["pol-ver-016-dać"],
      },
      papers: [],
      topics: [],
    },
    {
      key: "ver-0007-bear",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-007-bear"],
        POL: ["pol-ver-017-znieść"],
      },
      papers: ["allohomTesting2", "emotions"],
      topics: [],
    },
    {
      key: "ver-0008-see",
      traductions: {
        SPA: [],
        ENG: ["eng-ver-008-see"],
        POL: ["pol-ver-018-widzieć"],
      },
      papers: ["basic1"],
      topics: [],
    },
  ],
  adj: [
    {
      key: "adj-0000-red",
      traductions: {
        SPA: ["spa-adj-001-rojo"],
        ENG: ["eng-adj-001-red"],
        POL: ["pol-adj-011-czerwony"],
      },
      papers: ["colour"],
      topics: [],
    },
    {
      key: "adj-0001-blue",
      traductions: {
        SPA: [],
        ENG: ["eng-adj-003-blue"],
        POL: ["pol-adj-013-niebieski"],
      },
      papers: ["colour2"],
      topics: [],
    },
    {
      key: "adj-0002-small",
      traductions: {
        SPA: [],
        ENG: ["eng-adj-002-small"],
        POL: ["pol-adj-012-mały"],
      },
      papers: ["size"],
      topics: [],
    },
  ],
  pro: [
    {
      key: "pro-PERSONAL",
      traductions: {
        SPA: [],
        ENG: ["eng-pro-PERSONAL"],
        POL: ["pol-pro-PERSONAL"],
      },
      papers: [],
      topics: [],
    },
    {
      key: "pro-POSSESSIVE",
      traductions: {
        SPA: [],
        ENG: ["eng-pro-POSSESSIVE"],
        POL: ["pol-pro-POSSESSIVE"],
      },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_A",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_A"], POL: ["pol-pro-ITG_A"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_B",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_B"], POL: ["pol-pro-ITG_B"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_C",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_C"], POL: ["pol-pro-ITG_C"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_D",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_D"], POL: ["pol-pro-ITG_D"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_E",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_E"], POL: ["pol-pro-ITG_E"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_F",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_F"], POL: ["pol-pro-ITG_F"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_G",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_G"], POL: ["pol-pro-ITG_G"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_J",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_J"], POL: ["pol-pro-ITG_J"] },
      papers: [],
      topics: [],
    },
    {
      key: "pro-ITG_K",
      traductions: { SPA: [], ENG: ["eng-pro-ITG_K"], POL: ["pol-pro-ITG_K"] },
      papers: [],
      topics: [],
    },
  ],
  pre: [
    {
      key: "pre-0000-with",
      traductions: {
        SPA: [],
        ENG: ["eng-pre-001-with"],
        POL: ["pol-pre-001-z"],
      },
      papers: [],
      topics: [],
    },
  ],
  art: [
    {
      key: "art-0000-the",
      traductions: { SPA: [], ENG: ["eng-art-001-the"], POL: [] },
      papers: [],
      topics: [],
    },
  ],
};
