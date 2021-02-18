const {
  terminusObjectNormalArray,
} = require("../../utils/generalPurposeUtils");

exports.wordsBank = {
  nounSet: [
    {
      //links
      translations: { ENG: ["woman", "lady"], POL: ["kobieta"] },
      tags: ["animate", "person", "personTest1", "concrete"],
      //selectors
      lemma: "woman",
      id: "eng-nou-001",
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
      translations: { ENG: ["father"], POL: ["ojciec"] },
      tags: ["animate", "person", "family", "concrete"],
      //selectors
      lemma: "father",
      id: "eng-nou-013",
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
      translations: { ENG: ["mother"], POL: ["matka"] },
      tags: ["animate", "person", "family", "concrete"],
      //selectors
      lemma: "mother",
      id: "eng-nou-014",
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
      translations: { ENG: ["boy"], POL: ["chłopiec", "chłopak"] },
      tags: ["animate", "person", "personTest1", "concrete"],
      //selectors
      lemma: "boy",
      id: "eng-nou-002",
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
      translations: { ENG: ["onion"], POL: ["cebula"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "onion",
      id: "eng-nou-003",

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
      translations: { ENG: ["apple"], POL: ["jabłko"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "apple",
      id: "eng-nou-004",

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
      translations: { ENG: ["tomato"], POL: ["pomidor"] },
      tags: ["inanimate", "edible0", "holdable", "concrete"],
      //selectors
      lemma: "tomato",
      id: "eng-nou-015",

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
      translations: { ENG: ["mirror"], POL: ["lustro", "zwierciadło"] },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "mirror",
      id: "eng-nou-005",

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
      translations: { ENG: ["book"], POL: ["książka"] },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "book",
      id: "eng-nou-006",

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
      translations: { ENG: ["door"], POL: ["drzwi"] },
      tags: ["inanimate", "house", "concrete"],
      //selectors
      lemma: "door",
      id: "eng-nou-007",

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
      translations: { ENG: ["sheep"], POL: ["owca"] },
      tags: ["animate", "animal0", "farmyard", "concrete"],
      //selectors
      lemma: "sheep",
      id: "eng-nou-008",

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
      translations: { ENG: ["rat"], POL: ["szczur"] },
      tags: ["animate", "animal", "pet", "concrete"],
      //selectors
      lemma: "rat",
      id: "eng-nou-016",

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
      translations: { ENG: ["doctor"], POL: ["lekarz", "lekarka"] },
      tags: ["concrete", "animate", "person", "personTest2", "job"],
      //selectors
      lemma: "doctor",
      id: "eng-nou-012",
      gender: "allPersonalSingularGenders_selector",
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
  ],
  adjectiveSet: [
    {
      //links
      translations: { ENG: ["red"], POL: ["czerwony"] },
      tags: ["colour"],
      //selectors
      lemma: "red",
      id: "eng-adj-001",
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
      translations: { ENG: ["small"], POL: ["mały"] },
      tags: ["size"],
      //selectors
      lemma: "small",
      id: "eng-adj-002",
      //notes

      //inflections
      inflections: {
        simple: "small",
        comparative: "smaller",
        superlative: "smallest",
        adverb: false,
      },
    },
  ],
  verbSet: [
    {
      //links
      translations: { ENG: ["give"], POL: ["dać", "dawać"] },
      tags: [],
      //selectors
      lemma: "give",
      id: "eng-ver-007",
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
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-003",
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
      translations: { ENG: ["write"], POL: ["pisać", "napisać"] },
      tags: ["basic3"],
      //selectors
      lemma: "write",
      id: "eng-ver-002",
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
      translations: { ENG: ["research"], POL: ["badać", "zbadać"] },
      tags: ["science"],
      //selectors
      lemma: "research",
      id: "eng-ver-004",
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
      translations: { ENG: ["see"], POL: ["widzieć", "zobaczyć"] },
      tags: ["basic1"],
      //selectors
      lemma: "see",
      id: "eng-ver-008",
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
    {
      //links
      translations: { ENG: ["have"], POL: ["mieć"] },
      tags: ["basic", "possession"],
      //selectors
      lemma: "have",
      id: "eng-ver-001",
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
      translations: { ENG: ["be"], POL: ["być"] },
      tags: ["basic", "identity"],
      //selectors
      lemma: "be",
      id: "eng-ver-000",
      //notes

      //inflections
      inflections: {
        infinitive: "be",
        // verbal: {
        //   past: {
        //     "1per": { singular: "was", plural: "were" },
        //     "2per": { singular: "were", plural: "were" },
        //     "3per": { singular: "was", plural: "were" },
        //   },
        //   present: {
        //     "1per": { singular: "am", plural: "are" },
        //     "2per": { singular: "are", plural: "are" },
        //     "3per": { singular: "is", plural: "are" },
        //   },
        //   future: {
        //     allPersons: { allNumbers: "will be" },
        //   },
        //   conditional: {
        //     allPersons: { allNumbers: "would be" },
        //   },
        // },
        v2: terminusObjectNormalArray(["was", "were"]),
        v3: "been",
        thirdPS: "is",
        gerund: "being",
      },
    },
  ],
  pronounSet: [
    {
      //links
      translations: { ENG: ["PERSONAL"], POL: ["PERSONAL"] },
      tags: [],
      //selectors
      lemma: "PERSONAL",
      id: "eng-pro-001",
      //notes

      //inflections
      inflections: {
        pronoun: {
          "1per": {
            singular: {
              allPersonalSingularGenders: {
                nom: "I",
                dat: "me",
                acc: "me",
              },
            },
            plural: {
              allPluralGenders: {
                nom: "we",
                dat: "us",
                acc: "us",
              },
            },
          },
          "2per": {
            singular: {
              allPersonalSingularGenders: {
                nom: "you",
                dat: "you",
                acc: "you",
              },
            },
            plural: {
              allPluralGenders: {
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
              allPersonalGenders: {
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
      translations: {
        ENG: ["POSSESSIVE"],
        POL: ["POSSESSIVE"],
      },
      tags: [],
      //selectors
      lemma: "POSSESSIVE",
      id: "eng-pro-002",
      //notes

      //inflections
      inflections: {
        determiner: {
          "1per": {
            singular: {
              allPersonalSingularGenders: "my",
            },
            plural: {
              allPluralGenders: "our",
            },
          },
          "2per": {
            singular: {
              allPersonalSingularGenders: "your",
            },
            plural: {
              allPluralGenders: "your",
            },
          },
          "3per": {
            singular: {
              m: "his",
              f: "her",
              n: "its",
            },
            plural: {
              allPluralGenders: "their",
            },
          },
        },
        pronoun: {
          "1per": {
            singular: {
              allPersonalSingularGenders: "mine",
            },
            plural: {
              allPluralGenders: "ours",
            },
          },
          "2per": {
            singular: {
              allPersonalSingularGenders: "yours",
            },
            plural: {
              allPluralGenders: "yours",
            },
          },
          "3per": {
            singular: {
              m: "his",
              f: "hers",
              n: "its",
            },
            plural: {
              allPluralGenders: "theirs",
            },
          },
        },
      },
    },
  ],
  prepositionSet: [
    {
      //links
      translations: { POL: [] },
      tags: [],
      //selectors
      lemma: "with",
      id: "eng-pre-001",
      //notes

      //inflections
      inflections: { onlyForm: "with" },
    },
  ],
  articleSet: [
    {
      //links
      translations: { POL: [] },
      tags: [],
      //selectors
      lemma: "ARTICLE",
      id: "eng-art-001",
      //notes

      //inflections
      inflections: {
        zero: "",
        definite: "the",
        indefinite: {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      },
    },
  ],
};
