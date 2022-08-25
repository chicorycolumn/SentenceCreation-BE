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
  {
    //links
    translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    tags: ["construction work"],

    //selectors
    lemma: "hole",
    id: "eng-nco-Dhole",

    //notes

    //inflections
    inflections: {
      singular: {
        nom: "hole",
        gen: "hole's",
      },
      plural: {
        nom: "holes",
        gen: "holes'",
      },
    },
  },
  {
    //links
    translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    tags: ["construction work"],

    //selectors
    lemma: "pit",
    id: "eng-nco-Dpit",

    //notes

    //inflections
    inflections: {
      singular: {
        nom: "pit",
        gen: "pit's",
      },
      plural: {
        nom: "pits",
        gen: "pits'",
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
