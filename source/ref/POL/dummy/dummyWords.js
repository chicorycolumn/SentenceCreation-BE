let nco = [
  {
    //links
    translations: { ENG: ["eng-nco-Dnut1"], POL: ["pol-nco-Dnut1"] },
    tags: ["allohomTesting", "edible2"],
    //selectors
    lemma: "orzech",
    id: "pol-nco-Dnut1",
    gender: "m3",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "orzech",
        gen: "orzecha",
        dat: "orzechowi",
        acc: {
          isTerminus: true,
          normal: ["orzech"],
          additionalFrequent: ["orzecha"],
        },
        ins: "orzechem",
        loc: "orzechu",
      },
      plural: {
        nom: "orzechy",
        gen: "orzechów",
        dat: "orzechom",
        acc: "orzechy",
        ins: "orzechami",
        loc: "orzechach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["eng-nco-Dnut2"], POL: ["pol-nco-Dnut2"] },
    tags: ["allohomTesting", "toolbox"],
    //selectors
    lemma: "nakrętka",
    id: "pol-nco-Dnut2",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "nakrętka",
        gen: "nakrętki",
        dat: "nakrętce",
        acc: "nakrętkę",
        ins: "nakrętką",
        loc: "nakrętce",
      },
      plural: {
        nom: "nakrętki",
        gen: "nakrętek",
        dat: "nakrętkom",
        acc: "nakrętki",
        ins: "nakrętkami",
        loc: "nakrętkach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["eng-nco-Dtie2"], POL: ["pol-nco-Dtie2"] },
    tags: ["allohomTesting3", "sports"],
    //selectors
    lemma: "remis",
    id: "pol-nco-Dtie2",
    gender: "m3",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "remis",
        gen: "remisu",
        dat: "remisowi",
        acc: "remis",
        ins: "remisem",
        loc: "remisie",
      },
      plural: {
        nom: "remisy",
        gen: "remisów",
        dat: "remisom",
        acc: "remisy",
        ins: "remisami",
        loc: "remisach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["eng-nco-Dtie1"], POL: ["pol-nco-Dtie1"] },
    tags: ["allohomTesting3", "clothes"],
    //selectors
    lemma: "krawat",
    id: "pol-nco-Dtie1",
    gender: "m3",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "krawat",
        gen: {
          isTerminus: true,
          normal: ["krawata"],
          additionalInfrequent: ["krawatu"],
        },
        dat: "krawatowi",
        acc: "krawat",
        ins: "krawatem",
        loc: "krawacie",
      },
      plural: {
        nom: "krawaty",
        gen: "krawatów",
        dat: "krawatom",
        acc: "krawaty",
        ins: "krawatami",
        loc: "krawatach",
      },
    },
  },
  {
    id: "dummy-nco-001",
    lemma: "foobar_loc_only",
    gender: "n",
    tags: ["dummy"],
    lacking: true,
    inflections: {
      singular: {
        loc: "foobar_sin_loc",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  {
    id: "dummy-nco-002",
    lemma: "foobar_ins_only",
    gender: "n",
    tags: ["dummy"],
    lacking: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        ins: "foobar_plu_ins",
      },
    },
  },
  {
    id: "dummy-nco-003",
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    tags: ["dummy2"],
    lacking: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  {
    id: "dummy-nco-004",
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    tags: ["dummy3"],
    lacking: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  {
    id: "dummy-nco-005",
    lemma: "foobar_sin_loc_plu_ins_only",
    gender: "n",
    tags: ["dummy3"],
    lacking: true,
    inflections: {
      singular: {
        loc: "foobar_sin_loc",
      },
      plural: {
        ins: "foobar_plu_ins",
      },
    },
  },
  {
    id: "dummy-nco-006",
    lemma: "foobar_none",
    gender: "n",
    tags: ["dummy3"],
    lacking: true,
    inflections: {
      plural: {
        loc: "foobar_plu_loc",
        ins: "foobar_plu_ins",
      },
    },
  },
  {
    id: "dummy-nco-007",
    lemma: "foobar-A",
    gender: "n",
    tags: ["foobar-A"],
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-A",
      },
    },
  },
  {
    id: "dummy-nco-008",
    lemma: "foobar-B",
    gender: "n",
    tags: ["foobar-B"],
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-B",
      },
    },
  },
  {
    id: "dummy-nco-009",
    lemma: "foobar-C",
    gender: "n",
    tags: ["foobar-C"],
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-C",
      },
    },
  },
  {
    id: "dummy-nco-010",
    lemma: "dummy-nco-010",
    gender: "n",
    tags: ["dummy-nco-010"],
    lacking: true,
    inflections: {
      singular: {
        nom: "sing nom is present",
        acc: "sing acc is present",
      },
      plural: {
        nom: "plur nom is present",
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
    lemma: "dziura",
    id: "pol-nco-Ddziura",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "dziura",
        gen: "dziury",
        dat: "dziurze",
        acc: "dziurę",
        ins: "dziurą",
        loc: "dziurze",
      },
      plural: {
        nom: "dziury",
        gen: "dziur",
        dat: "dziurom",
        acc: "dziury",
        ins: "dziurami",
        loc: "dziurach",
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
    lemma: "otwór",
    id: "pol-nco-Dotwór",
    gender: "m3",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "otwór",
        gen: "otworu",
        dat: "otworowi",
        acc: "otwór",
        ins: "otworem",
        loc: "otworze",
      },
      plural: {
        nom: "otwory",
        gen: "otworów",
        dat: "otworom",
        acc: "otwory",
        ins: "otworami",
        loc: "otworach",
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
    //selectors
    lemma: "wiązać",
    id: "pol-ver-Dtie",
    aspect: "imperfective",
    //notes

    //inflections
    inflections: {
      infinitive: "wiązać",
      verbal: {
        past: {
          impersonal: {
            singular: { _allSingularGenders: "wiązano" },
            plural: { _allPluralGenders: "wiązano" },
          },
          "1per": {
            singular: {
              m: "wiązałem",
              f: "wiązałam",
            },
            plural: {
              virile: "wiązaliśmy",
              nonvirile: "wiązałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "wiązałeś",
              f: "wiązałaś",
            },
            plural: {
              virile: "wiązaliście",
              nonvirile: "wiązałyście",
            },
          },
          "3per": {
            singular: {
              m: "wiązał",
              f: "wiązała",
              n: "wiązało",
            },
            plural: {
              virile: "wiązali",
              nonvirile: "wiązały",
            },
          },
        },
        present: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              _allSingularGendersExcludingNeuter: "wiążę",
            },
            plural: {
              _allPluralGenders: "wiążemy",
            },
          },
          "2per": {
            singular: {
              _allSingularGendersExcludingNeuter: "wiążesz",
            },
            plural: {
              _allPluralGenders: "wiążecie",
            },
          },
          "3per": {
            singular: {
              _allSingularGenders: "wiąże",
            },
            plural: {
              _allPluralGenders: "wiążą",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: "wiąż",
      },
      activeAdjectival: "wiążący",
      passiveAdjectival: "wiązany",
      contemporaryAdverbial: "wiążąc",
      anteriorAdverbial: false,
      verbalNoun: "wiązanie",
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
