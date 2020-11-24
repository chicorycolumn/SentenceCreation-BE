let nounSet = [
  {
    //links
    translations: { ENG: ["woman", "lady"], POL: ["kobieta"] },
    tags: ["animate", "person", "concrete"],
    //selectors
    lemma: "woman",
    id: "eng-nou-001",
    gender: "f",
    //notes
    deficient: false,
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
    tags: ["animate", "person", "concrete"],
    //selectors
    lemma: "boy",
    id: "eng-nou-002",
    gender: "m",
    //notes
    deficient: false,
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
    gender: "m",
    //notes
    deficient: false,
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
    gender: "n",
    //notes
    deficient: false,
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
    gender: "n",
    //notes
    deficient: false,
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
];

let adjectiveSet = [
  {
    //links
    translations: { ENG: ["red"], PL: ["czerwony"] },
    tags: ["colour"],
    //selectors
    lemma: "red",
    id: "eng-adj-001",
    //notes
    deficient: false,
    //inflections
    inflections: {
      simple: "red",
      comparative: "redder",
      superlative: "reddest",
      adverb: "redly",
    },
  },
];

let verbSet = [
  {
    //links
    translations: { ENG: ["write"], POL: ["pisać"] },
    tags: ["basic3"],
    //selectors
    lemma: "write",
    id: "eng-ver-002",
    //notes
    defective: false,
    //inflections
    inflections: {
      infinitive: "write",
      v2: "wrote",
      v3: "written",
      thirdPS: "writes",
      gerund: "writing",
      verb: true,
      participle: true,
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
    defective: false,
    //inflections
    inflections: {
      infinitive: "have",
      verb: {
        past: {
          allPersons: {
            allNumbers: "had",
          },
        },
        present: {
          "1per": {
            allNumbers: "had",
          },
          "2per": {
            allNumbers: "had",
          },
          "3per": {
            singular: "has",
            plural: "have",
          },
        },
        future: true,
        conditional: true,
      },
      participle: {
        activeAdjectival: "having",
        passiveAdjectival: "had",
        contemporaryAdverbial: "having",
        anteriorAdverbial: "having had",
      },
      verbalNoun: "having",
    },
  },
  {
    //links
    translations: { ENG: ["read"], POL: ["czytać"] },
    tags: ["basic2"],
    //selectors
    lemma: "read",
    id: "eng-ver-003",
    //notes
    defective: false,
    //inflections
    inflections: {
      infinitive: "read",
      v2: "read",
      v3: "read",
      thirdPS: "reads",
      gerund: "reading",
      verb: true,
      participle: true,
    },
  },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  verbSet,
};

// let pronounSet = [
//   {
//     translations: { ENG: ["I"] },
//     lemma: "ja",
//     id: "pol-pro-001",
//     tags: [],
//     deficient: false,
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
