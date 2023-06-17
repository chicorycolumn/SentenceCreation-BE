let nco = [
  {
    //links
    devHardcoded_translations: {
      ENG: ["eng-nco-Dnut1"],
      POL: ["pol-nco-Dnut1"],
    },
    devHardcoded_tags: ["allohomTesting", "edible2"],
    //selectors
    dummy: true,
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dnut2"],
      POL: ["pol-nco-Dnut2"],
    },
    devHardcoded_tags: ["allohomTesting", "toolbox"],
    //selectors
    dummy: true,
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dtie2"],
      POL: ["pol-nco-Dtie2"],
    },
    devHardcoded_tags: ["allohomTesting3", "sports"],
    //selectors
    dummy: true,
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dtie1"],
      POL: ["pol-nco-Dtie1"],
    },
    devHardcoded_tags: ["allohomTesting3", "clothes"],
    //selectors
    dummy: true,
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
    dummy: true,
    lemma: "foobar_loc_only",
    gender: "n",
    devHardcoded_tags: ["dummy"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar_ins_only",
    gender: "n",
    devHardcoded_tags: ["dummy"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    devHardcoded_tags: ["dummy2"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    devHardcoded_tags: ["dummy3"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar_sin_loc_plu_ins_only",
    gender: "n",
    devHardcoded_tags: ["dummy3"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar_none",
    gender: "n",
    devHardcoded_tags: ["dummy3"],
    devHardcoded_translations: {},
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
    dummy: true,
    lemma: "foobar-A",
    gender: "n",
    devHardcoded_tags: ["foobar-A"],
    devHardcoded_translations: {},
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-A",
      },
    },
  },
  {
    id: "dummy-nco-008",
    dummy: true,
    lemma: "foobar-B",
    gender: "n",
    devHardcoded_tags: ["foobar-B"],
    devHardcoded_translations: {},
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-B",
      },
    },
  },
  {
    id: "dummy-nco-009",
    dummy: true,
    lemma: "foobar-C",
    gender: "n",
    devHardcoded_tags: ["foobar-C"],
    devHardcoded_translations: {},
    lacking: true,
    inflections: {
      singular: {
        nom: "foobar-C",
      },
    },
  },
  {
    id: "dummy-nco-010",
    dummy: true,
    lemma: "dummy-nco-010",
    gender: "n",
    devHardcoded_tags: ["dummy-nco-010"],
    devHardcoded_translations: {},
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    devHardcoded_tags: ["construction work"],
    //selectors
    dummy: true,
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
    devHardcoded_translations: {
      ENG: ["eng-nco-Dhole", "eng-nco-Dpit"],
      POL: ["pol-nco-Ddziura", "pol-nco-Dotwór"],
    },
    devHardcoded_tags: ["construction work"],
    //selectors
    dummy: true,
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
let pro = [];
let ver = [
  {
    //links
    devHardcoded_translations: { ENG: ["eng-ver-Dtie"], POL: ["pol-ver-Dtie"] },
    devHardcoded_tags: ["allohomTesting3", "crafts"],
    //selectors
    dummy: true,
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
            singular: { _SingularGenders: "wiązano" },
            plural: { _PluralGenders: "wiązano" },
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
              _SingularGendersExcludingNeuter: "wiążę",
            },
            plural: {
              _PluralGenders: "wiążemy",
            },
          },
          "2per": {
            singular: {
              _SingularGendersExcludingNeuter: "wiążesz",
            },
            plural: {
              _PluralGenders: "wiążecie",
            },
          },
          "3per": {
            singular: {
              _SingularGenders: "wiąże",
            },
            plural: {
              _PluralGenders: "wiążą",
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
  ver,
  pro,
  pre,
  art,
};
