const {
  terminusObjectNormalArray,
} = require("../../../utils/generalPurposeUtils");

// Create a checker fxn that makes sure eg eng-lady doesn't have an entry here,
// because is already covered as a synonym in npe-0000-woman.

// Translations will match by lang+wordtype+number ie
// "pol-npe-015-lekarz" also covers "pol-npe-015-lekarka"

// Remove tantum as a tag from words, as it's not preserved between synonyms.

// Frequency tag is the only one different between synonyms.

// ITG_J and ITG_K not exist in ENG yet.

exports.wordsBank = {
  npe: [
    {
      key: "npe-0000-woman",
      translations: {
        ENG: ["eng-npe-001-woman", "eng-npe-006-lady"],
        POL: ["pol-npe-011-kobieta"],
      },
      tags: ["animate", "personTest1", "concrete"],
      topics: [],
    },
    {
      key: "npe-0001-boy",
      translations: {
        ENG: ["eng-npe-002-boy"],
        POL: ["pol-npe-012-chłopiec"],
      },
      tags: ["animate", "personTest1", "concrete"],
      topics: [],
    },
    {
      key: "npe-0002-father",
      translations: {
        ENG: ["eng-npe-003-father"],
        POL: ["pol-npe-013-ojciec"],
      },
      tags: ["animate", "family", "concrete"],
      topics: [],
    },
    {
      key: "npe-0003-mother",
      translations: {
        ENG: ["eng-npe-004-mother"],
        POL: ["pol-npe-014-matka"],
      },
      tags: ["animate", "family", "concrete"],
      topics: [],
    },
    {
      key: "npe-0004-doctor",
      translations: {
        ENG: ["eng-npe-005-doctor"],
        POL: ["pol-npe-015-lekarz"],
      },
      tags: ["concrete", "animate", "personTest2", "job"],
      topics: [],
    },
  ],
  nco: [
    {
      key: "nco-0000-bear",
      translations: {
        ENG: ["eng-nco-001-bear"],
        POL: ["pol-nco-011-niedźwiedź"],
      },
      tags: ["allohomTesting2", "animal"],
      topics: [],
    },
    {
      key: "nco-0001-onion",
      translations: { ENG: ["eng-nco-002-onion"], POL: ["pol-nco-012-cebula"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0002-tomato",
      translations: {
        ENG: ["eng-nco-003-tomato"],
        POL: ["pol-nco-013-pomidor"],
      },
      tags: ["inanimate", "edible0", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0003-apple",
      translations: { ENG: ["eng-nco-004-apple"], POL: ["pol-nco-014-jabłko"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0004-mirror",
      translations: {
        ENG: ["eng-nco-005-mirror"],
        POL: ["pol-nco-015-lustro", "pol-nco-004-zwierciadło"],
      },
      tags: ["inanimate", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0005-book",
      translations: { ENG: ["eng-nco-006-book"], POL: ["pol-nco-016-książka"] },
      tags: ["inanimate", "holdable", "concrete"],
      topics: [],
    },
    {
      key: "nco-0006-door",
      translations: { ENG: ["eng-nco-007-door"], POL: ["pol-nco-017-drzwi"] },
      tags: ["inanimate", "house", "concrete"],
      topics: [],
    },
    {
      key: "nco-0007-sheep",
      translations: { ENG: ["eng-nco-008-sheep"], POL: ["pol-nco-018-owca"] },
      tags: ["concrete", "animal0", "animate", "farmyard"],
      topics: [],
    },
    {
      key: "nco-0008-dust",
      translations: { ENG: ["eng-nco-009-dust"], POL: ["pol-nco-019-pył"] },
      tags: ["tantumTest1"],
      topics: [],
    },
    {
      key: "nco-0009-underwear",
      translations: {
        ENG: ["eng-nco-010-underwear"],
        POL: ["pol-nco-010-majtki"],
      },
      tags: ["inanimate", "holdable", "concrete", "wearable"],
      topics: [],
    },
    {
      key: "nco-0010-rat",
      translations: { ENG: ["eng-nco-011-rat"], POL: ["pol-nco-001-szczur"] },
      tags: ["concrete", "animal", "animate", "pet"],
      topics: [],
    },
    {
      key: "nco-0011-tweezers",
      translations: {
        ENG: ["eng-nco-012-tweezers"],
        POL: ["pol-nco-002-pinceta"],
      },
      tags: ["tantumTest1"],
      topics: [],
    },
  ],
  ver: [
    {
      key: "ver-0000-be(essence)",
      translations: { ENG: ["eng-ver-001-be"], POL: ["pol-ver-011-być"] },
      tags: ["basic", "identity"],
      topics: [],
    },
    // {
    //   key: "ver-0001-be(state)",
    //   translations: { ENG: ["eng-ver-001-be"], POL: ["pol-ver-011-być"] },
    //   tags: ["basic", "identity"],
    //   topics: [],
    // },
    {
      key: "ver-0002-have",
      translations: { ENG: ["eng-ver-002-have"], POL: ["pol-ver-012-mieć"] },
      tags: ["basic", "possession"],
      topics: [],
    },
    {
      key: "ver-0003-read",
      translations: {
        ENG: ["eng-ver-003-read"],
        POL: ["pol-ver-013-czytać"],
      },
      tags: ["basic2"],
      topics: [],
    },
    {
      key: "ver-0004-research",
      translations: {
        ENG: ["eng-ver-004-research"],
        POL: ["pol-ver-014-badać"],
      },
      tags: ["science"],
      topics: [],
    },
    {
      key: "ver-0005-write",
      translations: {
        ENG: ["eng-ver-005-write"],
        POL: ["pol-ver-015-pisać"],
      },
      tags: ["basic3"],
      topics: [],
    },
    {
      key: "ver-0006-give",
      translations: {
        ENG: ["eng-ver-006-give"],
        POL: ["pol-ver-016-dać"],
      },
      tags: [],
      topics: [],
    },
    {
      key: "ver-0007-bear",
      translations: { ENG: ["eng-ver-007-bear"], POL: ["pol-ver-017-znieść"] },
      tags: ["allohomTesting2", "emotions"],
      topics: [],
    },
    {
      key: "ver-0008-see",
      translations: {
        ENG: ["eng-ver-008-see"],
        POL: ["pol-ver-018-widzieć"],
      },
      tags: ["basic1"],
      topics: [],
    },
  ],
  adj: [
    {
      key: "adj-0000-red",
      translations: { ENG: ["eng-adj-001-red"], POL: ["pol-adj-011-czerwony"] },
      tags: ["colour"],
      topics: [],
    },
    {
      key: "adj-0001-blue",
      translations: {
        ENG: ["eng-adj-003-blue"],
        POL: ["pol-adj-013-niebieski"],
      },
      tags: ["colour2"],
      topics: [],
    },
    {
      key: "adj-0002-small",
      translations: { ENG: ["eng-adj-002-small"], POL: ["pol-adj-012-mały"] },
      tags: ["size"],
      topics: [],
    },
  ],
  pro: [
    {
      key: "pro-PERSONAL",
      translations: { ENG: ["eng-pro-PERSONAL"], POL: ["pol-pro-PERSONAL"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-POSSESSIVE",
      translations: {
        ENG: ["eng-pro-POSSESSIVE"],
        POL: ["pol-pro-POSSESSIVE"],
      },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_A",
      translations: { ENG: ["eng-pro-ITG_A"], POL: ["pol-pro-ITG_A"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_B",
      translations: { ENG: ["eng-pro-ITG_B"], POL: ["pol-adj-ITG_B"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_C",
      translations: { ENG: ["eng-pro-ITG_C"], POL: ["pol-pro-ITG_C"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_D",
      translations: { ENG: ["eng-pro-ITG_D"], POL: ["pol-pro-ITG_D"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_E",
      translations: { ENG: ["eng-pro-ITG_E"], POL: ["pol-pro-ITG_E"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_F",
      translations: { ENG: ["eng-pro-ITG_F"], POL: ["pol-pro-ITG_F"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_G",
      translations: { ENG: ["eng-pro-ITG_G"], POL: ["pol-pro-ITG_G"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_J",
      translations: { ENG: ["eng-pro-ITG_J"], POL: ["pol-pro-ITG_J"] },
      tags: [],
      topics: [],
    },
    {
      key: "pro-ITG_K",
      translations: { ENG: ["eng-pro-ITG_K"], POL: ["pol-pro-ITG_K"] },
      tags: [],
      topics: [],
    },
  ],
  pre: [
    {
      key: "pre-0000-with",
      translations: { ENG: ["eng-pre-001-with"], POL: ["pol-pre-001-z"] },
      tags: [],
      topics: [],
    },
  ],
  art: [
    {
      key: "art-0000-the",
      translations: { ENG: ["eng-art-001-the"], POL: [] },
      tags: [],
      topics: [],
    },
  ],
};
