const {
  terminusObjectNormalArray,
} = require("../../../utils/generalPurposeUtils");

exports.wordsBank = {
  npe: [
    {
      //links
      translations: {
        ENG: ["eng-npe-001-woman"],
        POL: ["pol-npe-011-kobieta"],
      },
      tags: ["animate", "personTest1", "concrete"],
      //selectors
      lemma: "woman",
      id: "eng-npe-001-woman",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "woman",
          gen: "woman's",
        },
        plural: {
          nom: "women",
          gen: "women's",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-npe-002-boy"], POL: ["pol-npe-012-chłopiec"] },
      tags: ["animate", "personTest1", "concrete"],
      //selectors
      lemma: "boy",
      id: "eng-npe-002-boy",
      gender: "m",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "boy",
          gen: "boy's",
        },
        plural: {
          nom: "boys",
          gen: "boys'",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-npe-003-father"],
        POL: ["pol-npe-013-ojciec"],
      },
      tags: ["animate", "family", "concrete"],
      //selectors
      lemma: "father",
      id: "eng-npe-003-father",
      gender: "m",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "father",
          gen: "father's",
        },
        plural: {
          nom: "fathers",
          gen: "fathers'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-npe-004-mother"], POL: ["pol-npe-014-matka"] },
      tags: ["animate", "family", "concrete"],
      //selectors
      lemma: "mother",
      id: "eng-npe-004-mother",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "mother",
          gen: "mother's",
        },
        plural: {
          nom: "mothers",
          gen: "mothers'",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-npe-005-doctor"],
        POL: ["pol-npe-015-lekarz", "pol-npe-015-lekarka"],
      },
      tags: ["concrete", "animate", "personTest2", "job"],
      //selectors
      lemma: "doctor",
      id: "eng-npe-005-doctor",
      gender: "_PersonalGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "doctor",
          gen: "doctor's",
        },
        plural: {
          nom: "doctors",
          gen: "doctors'",
        },
      },
    },
    {
      //links
      tags: ["animate", "personTest1", "concrete"],
      //selectors
      lemma: "doctor",
      id: "eng-npe-006-lady",
      gender: "_PersonalGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "lady",
          gen: "lady's",
        },
        plural: {
          nom: "ladies",
          gen: "ladies'",
        },
      },
    },
  ],
  nco: [
    {
      //links
      translations: {
        ENG: ["eng-nco-001-bear"],
        POL: ["pol-nco-011-niedźwiedź"],
      },
      tags: ["allohomTesting2", "animal"],
      allohomInfo: { multipleWordtype: true, text: "animal", emoji: "🐻" },

      //selectors
      lemma: "bear",
      id: "eng-nco-001-bear",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "bear",
          gen: "bear's",
        },
        plural: {
          nom: "bears",
          gen: "bears'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-002-onion"], POL: ["pol-nco-012-cebula"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "onion",
      id: "eng-nco-002-onion",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "onion",
          gen: "onion's",
        },
        plural: {
          nom: "onions",
          gen: "onions'",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-003-tomato"],
        POL: ["pol-nco-013-pomidor"],
      },
      tags: ["inanimate", "edible0", "holdable", "concrete"],
      //selectors
      lemma: "tomato",
      id: "eng-nco-003-tomato",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "tomato",
          gen: "tomato's",
        },
        plural: {
          nom: "tomatoes",
          gen: "tomatoes'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-004-apple"], POL: ["pol-nco-014-jabłko"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "apple",
      id: "eng-nco-004-apple",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "apple",
          gen: "apple's",
        },
        plural: {
          nom: "apples",
          gen: "apples'",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-005-mirror"],
        POL: ["pol-nco-015-lustro", "pol-nco-004-zwierciadło"],
      },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "mirror",
      id: "eng-nco-005-mirror",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "mirror",
          gen: "mirror's",
        },
        plural: {
          nom: "mirrors",
          gen: "mirrors'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-006-book"], POL: ["pol-nco-016-książka"] },
      tags: ["inanimate", "holdable", "concrete"],
      topics: ["school"],
      //selectors
      lemma: "book",
      id: "eng-nco-006-book",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "book",
          gen: "book's",
        },
        plural: {
          nom: "books",
          gen: "books'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-007-door"], POL: ["pol-nco-017-drzwi"] },
      tags: ["inanimate", "house", "concrete"],
      //selectors
      lemma: "door",
      id: "eng-nco-007-door",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "door",
          gen: "door's",
        },
        plural: {
          nom: "doors",
          gen: "doors'",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-008-sheep"], POL: ["pol-nco-018-owca"] },
      tags: ["animate", "animal0", "farmyard", "concrete"],
      //selectors
      lemma: "sheep",
      id: "eng-nco-008-sheep",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "sheep",
          gen: "sheep's",
        },
        plural: {
          nom: "sheep",
          gen: "sheep's",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-009-dust"], POL: ["pol-nco-019-pył"] },
      tags: ["tantumTest1"],
      //selectors
      lemma: "dust",
      id: "eng-nco-009-dust",
      gender: "n",
      lacking: true,
      tantumSingulare: true,
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "dust",
          gen: "dust's",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-010-underwear"],
        POL: ["pol-nco-010-majtki"],
      },
      tags: ["clothes"],
      //selectors
      lemma: "underwear",
      id: "eng-nco-010-underwear",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "underwear",
          gen: "underwear's",
        },
        plural: {
          nom: "underwear",
          gen: "underwear's",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-011-rat"], POL: ["pol-nco-001-szczur"] },
      tags: ["animate", "animal", "pet", "concrete"],
      //selectors
      lemma: "rat",
      id: "eng-nco-011-rat",
      gender: "n",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "rat",
          gen: "rat's",
        },
        plural: {
          nom: "rats",
          gen: "rats'",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-012-tweezers"],
        POL: ["pol-nco-002-pinceta"],
      },
      tags: ["tantumTest1"],
      //selectors
      lemma: "tweezers",
      id: "eng-nco-012-tweezers",
      gender: "n",
      lacking: true,
      tantumPlurale: true,
      tantumCountNoun: { singular: "pair", plural: "pairs" },
      //notes

      //inflections
      inflections: {
        plural: {
          nom: "tweezers",
          gen: "tweezers'",
        },
      },
    },
  ],
  ver: [
    {
      //links
      translations: { ENG: ["eng-ver-001-be"], POL: ["pol-ver-011-być"] },
      tags: ["basic", "identity"],
      //selectors
      lemma: "be",
      id: "eng-ver-001-be",
      //notes

      //inflections
      inflections: {
        infinitive: "be",
        v2: terminusObjectNormalArray(["was", "were"]),
        v3: "been",
        thirdPS: "is",
        gerund: "being",
      },
    },
    {
      //links
      translations: { ENG: ["eng-ver-002-have"], POL: ["pol-ver-012-mieć"] },
      tags: ["basic", "possession"],
      //selectors
      lemma: "have",
      id: "eng-ver-002-have",
      //notes

      //inflections
      inflections: {
        infinitive: "have",
        verbal: {},
        v2: "had",
        v3: "had",
        thirdPS: "has",
        gerund: "having",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-003-read"],
        POL: ["pol-ver-013-czytać", "pol-ver-013-przeczytać"],
      },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-003-read",
      //notes

      //inflections
      inflections: {
        infinitive: "read",
        verbal: {},
        v2: "read",
        v3: "read",
        thirdPS: "reads",
        gerund: "reading",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-004-research"],
        POL: ["pol-ver-014-badać", "pol-ver-014-zbadać"],
      },
      tags: ["science"],
      //selectors
      lemma: "research",
      id: "eng-ver-004-research",
      //notes

      //inflections
      inflections: {
        infinitive: "research",
        verbal: {},
        v2: "researched",
        v3: "researched",
        thirdPS: "researches",
        gerund: "researching",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-005-write"],
        POL: ["pol-ver-015-pisać", "pol-ver-015-napisać"],
      },
      tags: ["basic3"],
      //selectors
      lemma: "write",
      id: "eng-ver-005-write",
      //notes

      //inflections
      inflections: {
        infinitive: "write",
        verbal: {},
        v2: "wrote",
        v3: "written",
        thirdPS: "writes",
        gerund: "writing",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-006-give"],
        POL: ["pol-ver-016-dać", "pol-ver-016-dawać"],
      },
      tags: [],
      //selectors
      lemma: "give",
      id: "eng-ver-006-give",
      //notes

      //inflections
      inflections: {
        infinitive: "give",
        verbal: {},
        v2: "gave",
        v3: "given",
        thirdPS: "gives",
        gerund: "giving",
      },
    },
    {
      //links
      translations: { ENG: ["eng-ver-007-bear"], POL: ["pol-ver-017-znieść"] },
      tags: ["allohomTesting2", "emotions"],
      allohomInfo: {
        multipleWordtype: true,
        text: "emotional verb",
        emoji: "😑",
      },
      //selectors
      lemma: "bear",
      id: "eng-ver-007-bear",
      //notes

      //inflections
      inflections: {
        infinitive: "bear",
        verbal: {},
        v2: "bore",
        v3: "borne",
        thirdPS: "bears",
        gerund: "bearing",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-008-see"],
        POL: ["pol-ver-018-widzieć", "pol-ver-018-zobaczyć"],
      },
      tags: ["basic1"],
      //selectors
      lemma: "see",
      id: "eng-ver-008-see",
      //notes

      //inflections
      inflections: {
        infinitive: "see",
        verbal: {},
        v2: "saw",
        v3: "seen",
        thirdPS: "sees",
        gerund: "seeing",
      },
    },
  ],
  adj: [
    {
      //links
      translations: { ENG: ["eng-adj-001-red"], POL: ["pol-adj-011-czerwony"] },
      tags: ["colour"],
      //selectors
      lemma: "red",
      id: "eng-adj-001-red",
      //notes

      //inflections
      inflections: {
        simple: "red",
        comparative: "redder",
        superlative: "reddest",
        adverb: "redly",
      },
    },
    {
      //links
      translations: { ENG: ["eng-adj-002-small"], POL: ["pol-adj-012-mały"] },
      tags: ["size"],
      //selectors
      lemma: "small",
      id: "eng-adj-002-small",
      //notes

      //inflections
      inflections: {
        simple: "small",
        comparative: "smaller",
        superlative: "smallest",
        adverb: false,
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-adj-003-blue"],
        POL: ["pol-adj-013-niebieski"],
      },
      tags: ["colour2"],
      //selectors
      lemma: "niebieski",
      id: "eng-adj-003-blue",
      //notes

      //inflections
      inflections: {
        simple: "blue",
        comparative: "bluer",
        superlative: "bluest",
      },
    },
  ],
  pro: [
    {
      //links
      translations: { ENG: ["eng-pro-PERSONAL"], POL: ["pol-pro-PERSONAL"] },
      tags: [],
      //selectors
      lemma: "$PERSONAL",
      id: "eng-pro-PERSONAL",
      //notes

      //inflections
      inflections: {
        pronombre: {
          "1per": {
            singular: {
              _PersonalSingularGenders: {
                nom: "I",
                dat: "me",
                acc: "me",
              },
            },
            plural: {
              _PluralGenders: {
                nom: "we",
                dat: "us",
                acc: "us",
              },
            },
          },
          "2per": {
            singular: {
              _PersonalSingularGenders: {
                nom: "you",
                dat: "you",
                acc: "you",
              },
            },
            plural: {
              _PluralGenders: {
                nom: "you",
                dat: "you",
                acc: "you",
              },
            },
          },
          "3per": {
            singular: {
              m: {
                nom: "he",
                dat: "him",
                acc: "him",
              },
              f: {
                nom: "she",
                dat: "her",
                acc: "her",
              },
              n: {
                nom: "it",
                dat: "it",
                acc: "it",
              },
            },
            plural: {
              _PersonalGenders: {
                nom: "they",
                dat: "them",
                acc: "them",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_A"], POL: ["pol-pro-ITG_A"] },
      tags: [],
      //selectors
      lemma: "$ITG_A",
      id: "eng-pro-ITG_A",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "what",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_B"], POL: ["pol-adj-ITG_B"] },
      tags: [],
      //selectors
      lemma: "$ITG_B",
      id: "eng-pro-ITG_B",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "which",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_C"], POL: ["pol-pro-ITG_C"] },
      tags: [],
      //selectors
      lemma: "$ITG_C",
      id: "eng-pro-ITG_C",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "when",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_D"], POL: ["pol-pro-ITG_D"] },
      tags: [],
      //selectors
      lemma: "$ITG_D",
      id: "eng-pro-ITG_D",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "where",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_E"], POL: ["pol-pro-ITG_E"] },
      tags: [],
      //selectors
      lemma: "$ITG_E",
      id: "eng-pro-ITG_E",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "how",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_F"], POL: ["pol-pro-ITG_F"] },
      tags: [],
      //selectors
      lemma: "$ITG_F",
      id: "eng-pro-ITG_F",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                _Gcases: "why",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_G"], POL: ["pol-pro-ITG_G"] },
      tags: [],
      //selectors
      lemma: "$ITG_G",
      id: "eng-pro-ITG_G",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _Pers: {
            _Numbers: {
              _Genders: {
                nom: "who",
                dat: {
                  isTerminus: true,
                  normal: ["who"],
                  additionalInfrequent: ["whom"],
                },
                acc: {
                  isTerminus: true,
                  normal: ["who"],
                  additionalInfrequent: ["whom"],
                },
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-pro-POSSESSIVE"],
        POL: ["pol-pro-POSSESSIVE"],
      },
      tags: [],
      //selectors
      lemma: "$POSSESSIVE",
      id: "eng-pro-POSSESSIVE",
      //notes

      //inflections
      inflections: {
        determiner: {
          "1per": {
            singular: {
              _PersonalSingularGenders: "my",
            },
            plural: {
              _PluralGenders: "our",
            },
          },
          "2per": {
            singular: {
              _PersonalSingularGenders: "your",
            },
            plural: {
              _PluralGenders: "your",
            },
          },
          "3per": {
            singular: {
              m: "his",
              f: "her",
              n: "its",
            },
            plural: {
              _PluralGenders: "their",
            },
          },
        },
        pronombre: {
          "1per": {
            singular: {
              _PersonalSingularGenders: "mine",
            },
            plural: {
              _PluralGenders: "ours",
            },
          },
          "2per": {
            singular: {
              _PersonalSingularGenders: "yours",
            },
            plural: {
              _PluralGenders: "yours",
            },
          },
          "3per": {
            singular: {
              m: "his",
              f: "hers",
              n: "its",
            },
            plural: {
              _PluralGenders: "theirs",
            },
          },
        },
      },
    },
  ],
  pre: [
    {
      //links
      translations: { ENG: ["eng-pre-001-with"], POL: ["pol-pre-001-z"] },
      tags: [],
      //selectors
      lemma: "with",
      id: "eng-pre-001-with",
      //notes

      //inflections
      inflections: { onlyForm: "with" },
    },
  ],
  art: [
    {
      //links
      translations: { ENG: ["eng-art-001-the"], POL: [] },
      tags: [],
      //selectors
      lemma: "ARTICLE",
      id: "eng-art-001-the",
      //notes

      //inflections
      inflections: {
        definite: {
          singular: "the",
          plural: "the",
        },
        indefinite: {
          singular: {
            isTerminus: true,
            processOnlyAtEnd: true,
            nonprotective: ["a"],
            protective: ["an"],
          },
          plural: "∅",
        },
      },
    },
  ],
};
