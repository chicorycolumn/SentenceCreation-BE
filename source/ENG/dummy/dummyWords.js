let nco = [
  {
    //links
    translations: { ENG: ["eng-nco-Dnut1"], POL: ["pol-nco-Dnut1"] },
    tags: ["allohomTesting", "edible2"],
    allohomInfo: { singleWordtype: true, text: "food", emoji: "🥜" },

    //selectors
    lemma: "nut",
    id: "eng-nco-Dnut1",

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
    translations: { ENG: ["eng-nco-Dnut2"], POL: ["pol-nco-Dnut2"] },
    tags: ["allohomTesting", "toolbox"],
    allohomInfo: { singleWordtype: true, text: "metal", emoji: "🔩" },

    //selectors
    lemma: "nut",
    id: "eng-nco-Dnut2",

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
    translations: { ENG: ["eng-nco-Dbear"], POL: ["pol-nco-Dbear"] },
    tags: ["allohomTesting2", "animal"],
    allohomInfo: { multipleWordtype: true, text: "animal", emoji: "🐻" },

    //selectors
    lemma: "bear",
    id: "eng-nco-Dbear",

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
    translations: { ENG: ["eng-nco-Dtie2"], POL: ["pol-nco-Dtie2"] },
    tags: ["allohomTesting3", "sports"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "score",
      emoji: "⚽",
    },

    //selectors
    lemma: "tie",
    id: "eng-nco-Dtie2",

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
    translations: { ENG: ["eng-nco-Dtie1"], POL: ["pol-nco-Dtie1"] },
    tags: ["allohomTesting3", "clothes"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "clothes",
      emoji: "👔",
    },

    //selectors
    lemma: "tie",
    id: "eng-nco-Dtie1",

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
    translations: { ENG: ["eng-ver-Dbear"], POL: ["pol-ver-Dbear"] },
    tags: ["allohomTesting2", "emotions"],
    allohomInfo: {
      multipleWordtype: true,
      text: "emotional verb",
      emoji: "😑",
    },
    //selectors
    lemma: "bear",
    id: "eng-ver-Dbear",
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
    translations: { ENG: ["eng-ver-Dtie"], POL: ["pol-ver-Dtie"] },
    tags: ["allohomTesting3", "crafts"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "with string eg",
      emoji: "🧵",
    },
    //selectors
    lemma: "tie",
    id: "eng-ver-Dtie",
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
