let nounSet = [
  {
    //links
    translations: { ENG: ["nut"], POL: ["orzech"] },
    tags: ["allohomTesting", "edible2"],
    allohomInfo: { singleWordtype: true, text: "food", emoji: "🥜" },

    //selectors
    lemma: "nut",
    id: "eng-nou-009",
    gender: "n",
    //notes
    deficient: false,
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
    translations: { ENG: ["nut"], POL: ["nakrętka"] },
    tags: ["allohomTesting", "toolbox"],
    allohomInfo: { singleWordtype: true, text: "metal", emoji: "🔩" },

    //selectors
    lemma: "nut",
    id: "eng-nou-010",
    gender: "n",
    //notes
    deficient: false,
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
    translations: { ENG: ["bear"], POL: ["niedźwiedź"] },
    tags: ["allohomTesting2", "animal"],
    allohomInfo: { multipleWordtype: true, text: "animal", emoji: "🐻" },

    //selectors
    lemma: "bear",
    id: "eng-nou-011",
    gender: "n",
    //notes
    deficient: false,
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
let adjectiveSet = [];
let adverbSet = [];
let verbSet = [
  {
    //links
    translations: { ENG: ["bear"], POL: ["znieść"] },
    tags: ["allohomTesting2", "emotions"],
    allohomInfo: {
      multipleWordtype: true,
      text: "emotional verb",
      emoji: "😑",
    },
    //selectors
    lemma: "bear",
    id: "eng-ver-006",
    //notes
    defective: false,
    //inflections
    inflections: {
      infinitive: "bear",
      verbal: {},
      v2: "beared",
      v3: "borne",
      thirdPS: "bears",
      gerund: "bearing",
    },
  },
];

exports.dummyWordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
