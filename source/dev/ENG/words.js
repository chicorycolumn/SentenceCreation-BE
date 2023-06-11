//Copied over on 27/12/2020

let npe = [
  {
    //links
    devHardcoded_translations: { ENG: ["woman", "lady"], POL: ["kobieta"] },
    devHardcoded_tags: ["animate", "personTest1", "concrete"],
    //selectors
    lemma: "woman",
    id: "eng-npe-901",
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
    devHardcoded_translations: { ENG: ["boy"], POL: ["chłopiec", "chłopak"] },
    devHardcoded_tags: ["animate", "personTest1", "concrete"],
    //selectors
    lemma: "boy",
    id: "eng-npe-902",
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
];

let nco = [
  {
    //links
    devHardcoded_translations: { ENG: ["onion"], POL: ["cebula"] },
    devHardcoded_tags: ["inanimate", "edible", "holdable", "concrete"],
    //selectors
    lemma: "onion",
    id: "eng-nco-902",
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
    devHardcoded_translations: { ENG: ["apple"], POL: ["jabłko"] },
    devHardcoded_tags: ["inanimate", "edible", "holdable", "concrete"],
    //selectors
    lemma: "apple",
    id: "eng-nco-902",
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
    devHardcoded_translations: {
      ENG: ["mirror"],
      POL: ["lustro", "zwierciadło"],
    },
    devHardcoded_tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "mirror",
    id: "eng-nco-905",
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
    devHardcoded_translations: { ENG: ["book"], POL: ["książka"] },
    devHardcoded_tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "book",
    id: "eng-nco-906",
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
    devHardcoded_translations: { ENG: ["door"], POL: ["drzwi"] },
    devHardcoded_tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "door",
    id: "eng-nco-907",
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
    devHardcoded_translations: { ENG: ["sheep"], POL: ["owca"] },
    devHardcoded_tags: ["animate", "animal", "farmyard", "concrete"],
    //selectors
    lemma: "sheep",
    id: "eng-nco-908",
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
    devHardcoded_translations: { ENG: ["nut"], POL: ["orzech"] },
    devHardcoded_tags: ["allohomTesting", "edible2"],
    allohomInfo: { singleWordtype: true, text: "food", emoji: "🥜" },

    //selectors
    lemma: "nut",
    id: "eng-nco-909",
    gender: "n",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "nut",
        gen: "nut's",
      },
      plural: {
        nom: "nuts",
        gen: "nuts'",
      },
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["nut"], POL: ["nakrętka"] },
    devHardcoded_tags: ["allohomTesting", "toolbox"],
    allohomInfo: { singleWordtype: true, text: "metal", emoji: "🔩" },

    //selectors
    lemma: "nut",
    id: "eng-nco-910",
    gender: "n",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "nut",
        gen: "nut's",
      },
      plural: {
        nom: "nuts",
        gen: "nuts'",
      },
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["bear"], POL: ["niedźwiedź"] },
    devHardcoded_tags: ["allohomTesting2", "animal"],
    allohomInfo: { multipleWordtype: true, text: "animal", emoji: "🐻" },

    //selectors
    lemma: "bear",
    id: "eng-nco-901",
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
];

let adj = [
  {
    //links
    devHardcoded_translations: { ENG: ["red"], POL: ["czerwony"] },
    devHardcoded_tags: ["colour"],
    //selectors
    lemma: "red",
    id: "eng-adj-901",
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
    devHardcoded_translations: { ENG: ["wibbly"], POL: ["łybli"] },
    devHardcoded_tags: ["wibbly"],
    //selectors
    lemma: "wibbly",
    id: "eng-adj-900",
    //notes

    //inflections
    inflections: {
      isTerminus: true,
      processOnlyAtEnd: true,
      nonprotective: ["wib"],
      protective: ["wob"],
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["wobbly"], POL: ["łobli"] },
    devHardcoded_tags: ["wobbly"],
    //selectors
    lemma: "wobbly",
    id: "eng-adj-901",
    //notes

    //inflections
    inflections: {
      isTerminus: true,
      processOnlyAtEnd: true,
      nonprotective: ["wob"],
      protective: ["wobb"],
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["fast"], POL: ["mocno"] },
    devHardcoded_tags: ["fitting"],
    //selectors
    lemma: "fast",
    id: "eng-adj-905",
    //notes

    //inflections
    inflections: {
      simple: "fast",
      comparative: "fast",
      superlative: "fastest",
      adverb: "fast",
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["fast"], POL: ["szybki"] },
    devHardcoded_tags: ["speed"],
    //selectors
    lemma: "fast",
    id: "eng-adj-904",
    //notes

    //inflections
    inflections: {
      simple: "fast",
      comparative: "faster",
      superlative: "fastest",
      adverb: "quickly",
    },
  },
  {
    //links
    devHardcoded_translations: { ENG: ["small"], POL: ["mały"] },
    devHardcoded_tags: ["size"],
    //selectors
    lemma: "small",
    id: "eng-adj-902",
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

let ver = [
  {
    //links
    devHardcoded_translations: { ENG: ["bear"], POL: ["znieść"] },
    devHardcoded_tags: ["allohomTesting2", "emotions"],
    allohomInfo: {
      multipleWordtype: true,
      text: "emotional verb",
      emoji: "😑",
    },
    //selectors
    lemma: "bear",
    id: "eng-ver-906",
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
    devHardcoded_translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
    devHardcoded_tags: ["basic2"],
    //selectors
    lemma: "read",
    id: "eng-ver-903",
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
    devHardcoded_translations: { ENG: ["write"], POL: ["pisać", "napisać"] },
    devHardcoded_tags: ["basic3"],
    //selectors
    lemma: "write",
    id: "eng-ver-905",
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
    devHardcoded_translations: { ENG: ["research"], POL: ["badać", "zbadać"] },
    devHardcoded_tags: ["science"],
    //selectors
    lemma: "research",
    id: "eng-ver-904",
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
    devHardcoded_translations: { ENG: ["have"], POL: ["mieć"] },
    devHardcoded_tags: ["basic", "possession"],
    //selectors
    lemma: "have",
    id: "eng-ver-902",
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
    devHardcoded_translations: { ENG: ["be"], POL: ["być"] },
    devHardcoded_tags: ["basic", "identity"],
    //selectors
    lemma: "be",
    id: "eng-ver-901",
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
      //     _Persons: { _Numbers: "will be" },
      //   },
      //   conditional: {
      //     _Persons: { _Numbers: "would be" },
      //   },
      // },
      v2: { isTerminus: true, normal: ["was", "were"] },
      v3: "been",
      thirdPS: "is",
      gerund: "being",
    },
  },
];

exports.wordsBank = {
  nco,
  npe,
  adj,
  ver,
};

// let pro = [
//   {
//     devHardcoded_translations:  { ENG: ["I"] },
//     lemma: "ja",
//     id: "pol-pro-901",
//     devHardcoded_tags: [],
//
//     person: "1per",
//     gender: ["m1", "f"],
//     inflections: {
//       singular: {
//         _SingularGendersExcludingNeuter: {
//           nom: "ja",
//           gen: "mnie",
//           dat: ["mi", "mnie"],
//           acc: "mnie",
//           ins: "mną",
//           loc: "mnie",
//         },
//       },
//       plural: {
//         _PluralGenders: {
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
