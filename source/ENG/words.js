let nounSet = [
  {
    translations: { ENG: ["woman", "lady"], POL: ["kobieta"] },
    lemma: "woman",
    id: "eng-nou-001",
    gender: "f",
    tags: ["animate", "person", "concrete"],
    deficient: false,
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
    translations: { ENG: ["boy"], POL: ["chłopiec", "chłopak"] },
    lemma: "boy",
    id: "eng-nou-002",
    gender: "m",
    tags: ["animate", "person", "concrete"],
    deficient: false,
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
    translations: { ENG: ["boy"], POL: ["boja", "pława"] },
    lemma: "boy",
    id: "eng-nou-002a",
    gender: "m",
    tags: ["inanimate", "ocean", "concrete"],
    deficient: false,
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
    translations: { ENG: ["onion"], POL: ["cebula"] },
    lemma: "onion",
    id: "eng-nou-003",
    gender: "n",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    deficient: false,
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
    translations: { ENG: ["apple"], POL: ["jabłko"] },
    lemma: "apple",
    id: "eng-nou-004",
    gender: "n",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    deficient: false,
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
    translations: { ENG: ["red"], PL: ["czerwony"] },
    lemma: "red",
    id: "eng-adj-001",
    tags: ["colour"],
    deficient: false,
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
    translations: { ENG: ["write"], POL: ["pisać"] },
    lemma: "write",
    id: "eng-ver-002",
    tags: ["basic3"],
    defective: false,
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
    translations: { ENG: ["have"], POL: ["mieć"] },
    lemma: "have",
    id: "eng-ver-001",
    tags: ["basic", "possession"],
    defective: false,
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
    translations: { ENG: ["read"], POL: ["czytać"] },
    lemma: "read",
    id: "eng-ver-003",
    tags: ["basic2"],
    defective: false,
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
