let nco = [
  {
    //links
    devHardcoded_translations: {
      ENG: ["eng-nco-Dnut1"],
      POL: ["pol-nco-Dnut1"],
    },
    devHardcoded_tags: ["allohomTesting", "edible2"],
    allohomInfo: { singleWordtype: true, text: "food", emoji: "🥜" },

    //selectors
    dummy: true,
    lemma: "nut",
    id: "eng-nco-Dnut1",
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dnut2"],
      POL: ["pol-nco-Dnut2"],
    },
    devHardcoded_tags: ["allohomTesting", "toolbox"],
    allohomInfo: { singleWordtype: true, text: "metal", emoji: "🔩" },

    //selectors
    dummy: true,
    lemma: "nut",
    id: "eng-nco-Dnut2",
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dtie2"],
      POL: ["pol-nco-Dtie2"],
    },
    devHardcoded_tags: ["allohomTesting3", "sports"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "score",
      emoji: "⚽",
    },

    //selectors
    dummy: true,
    lemma: "tie",
    id: "eng-nco-Dtie2",
    gender: "n",
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dtie1"],
      POL: ["pol-nco-Dtie1"],
    },
    devHardcoded_tags: ["allohomTesting3", "clothes"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "clothes",
      emoji: "👔",
    },

    //selectors
    dummy: true,
    lemma: "tie",
    id: "eng-nco-Dtie1",
    gender: "n",
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    devHardcoded_tags: ["construction work"],

    //selectors
    dummy: true,
    lemma: "hole",
    id: "eng-nco-Dhole",
    gender: "n",
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    devHardcoded_tags: ["construction work"],

    //selectors
    dummy: true,
    lemma: "pit",
    id: "eng-nco-Dpit",
    gender: "n",
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
let pro = [];
let ver = [
  {
    //links
    devHardcoded_translations: { ENG: ["eng-ver-Dtie"], POL: ["pol-ver-Dtie"] },
    devHardcoded_tags: ["allohomTesting3", "crafts"],
    allohomInfo: {
      multipleWordtype: true,
      singleWordtype: true,
      text: "with string eg",
      emoji: "🧵",
    },
    //selectors
    dummy: true,
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
  ver,
  pro,
  pre,
  art,
};
