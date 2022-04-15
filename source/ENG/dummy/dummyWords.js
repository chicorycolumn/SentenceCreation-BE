let nco = [
  {
    //links
    translations: { ENG: ["nut"], POL: ["orzech"] },
    tags: ["allohomTesting", "edible2"],
    allohomInfo: { singleWordtype: true, text: "food", emoji: "🥜" },

    //selectors
    lemma: "nut",
    id: "eng-nco-d01",

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
    translations: { ENG: ["nut"], POL: ["nakrętka"] },
    tags: ["allohomTesting", "toolbox"],
    allohomInfo: { singleWordtype: true, text: "metal", emoji: "🔩" },

    //selectors
    lemma: "nut",
    id: "eng-nco-d02",

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
    translations: { ENG: ["bear"], POL: ["niedźwiedź"] },
    tags: ["allohomTesting2", "animal"],
    allohomInfo: { multipleWordtype: true, text: "animal", emoji: "🐻" },

    //selectors
    lemma: "bear",
    id: "eng-nco-d03",

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
    translations: { ENG: ["tie"], POL: ["remis"] },
    tags: ["allohomTesting3", "sports"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "score",
      emoji: "⚽",
    },

    //selectors
    lemma: "tie",
    id: "eng-nco-d04",

    //notes

    //inflections
    inflections: {
      singular: {
        nom: "tie",
        gen: "tie's",
      },
      plural: {
        nom: "ties",
        gen: "ties'",
      },
    },
  },
  {
    //links
    translations: { ENG: ["tie"], POL: ["krawat"] },
    tags: ["allohomTesting3", "clothes"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "clothes",
      emoji: "👔",
    },

    //selectors
    lemma: "tie",
    id: "eng-nco-d05",

    //notes

    //inflections
    inflections: {
      singular: {
        nom: "tie",
        gen: "tie's",
      },
      plural: {
        nom: "ties",
        gen: "ties'",
      },
    },
  },
];
let npe = [];
let adj = [];
let adver = [];
let pro = [];
let ver = [
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
    id: "eng-ver-d01",
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
    translations: { ENG: ["tie"], POL: ["wiązać"] },
    tags: ["allohomTesting3", "crafts"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "with string eg",
      emoji: "🧵",
    },
    //selectors
    lemma: "tie",
    id: "eng-ver-d02",
    //notes

    //inflections
    inflections: {
      infinitive: "tie",
      verbal: {},
      v2: "tied",
      v3: "tied",
      thirdPS: "ties",
      gerund: "tying",
    },
  },
];

let pre = [];
let art = [];

exports.dummyWordsBank = {
  nco,
  npe,
  adj,
  adver,
  ver,
  pro,
  pre,
  art,
};
