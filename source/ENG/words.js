//Copied over on 27/12/2020

let nounSet = [
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
    translations: { ENG: ["boy"], POL: ["boja", "pława"] },
    tags: ["inanimate", "ocean", "concrete"],
    //selectors
    lemma: "boy",
    id: "eng-nou-002a",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "buoy",
        gen: "buoy's",
      },
      plural: {
        nom: "buoys",
        gen: "buoys'",
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
    tags: ["animate", "animal", "farmyard", "concrete"],
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
    translations: { ENG: ["doctor"], POL: ["lekarz", "lekarka"] },
    tags: ["concrete", "animate", "person", "personTest2", "job"],
    //selectors
    lemma: "doctor",
    id: "eng-nou-012",
    gender: "m/f",
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
];

let adjectiveSet = [
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
];

let verbSet = [
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
      v2: ["was", "were"],
      v3: "been",
      thirdPS: "is",
      gerund: "being",
    },
  },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  verbSet,
};

let pronounSet = [
  {
    //links
    translations: { ENG: ["I"], POL: ["ja"] },
    tags: ["animate", "person", "personTest1"],
    //selectors
    lemma: "I",
    id: "eng-pro-001",
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
];

// let pronounSet = [
//   {
//     translations: { ENG: ["I"] },
//     lemma: "ja",
//     id: "pol-pro-001",
//     tags: [],
//
//     person: "1per",
//     gender: ["m1", "f"],
//     inflections: {
//       singular: {
//         allSingularGendersExcludingNeuter: {
//           nom: "ja",
//           gen: "mnie",
//           dat: ["mi", "mnie"],
//           acc: "mnie",
//           ins: "mną",
//           loc: "mnie",
//         },
//       },
//       plural: {
//         allPluralGenders: {
//           nom: "my",
//           gen: "nas",
//           dat: "nam",
//           acc: "nas",
//           ins: "nami",
//           loc: "nas",
//         },
//       },
//     },
//   },
// ];
