let nounSet = [
  {
    //links
    translations: { ENG: ["nut"] },
    tags: ["allohomTesting", "edible2"],
    //selectors
    lemma: "orzech",
    id: "pol-nou-d01",
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
    translations: { ENG: ["nut"] },
    tags: ["allohomTesting", "toolbox"],
    //selectors
    lemma: "nakrętka",
    id: "pol-nou-d02",
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
    translations: { ENG: ["bear"] },
    tags: ["allohomTesting2", "animal"],
    //selectors
    lemma: "niedźwiedź",
    id: "pol-nou-d03",
    gender: "m2",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "niedźwiedź",
        gen: "niedźwiedzia",
        dat: "niedźwiedziowi",
        acc: "niedźwiedzia",
        ins: "niedźwiedziem",
        loc: "niedźwiedziu",
      },
      plural: {
        nom: "niedźwiedzie",
        gen: "niedźwiedzi",
        dat: "niedźwiedziom",
        acc: "niedźwiedzie",
        ins: "niedźwiedziami",
        loc: "niedźwiedziach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["tie"] },
    tags: ["allohomTesting3", "sports"],
    //selectors
    lemma: "remis",
    id: "pol-nou-d04",
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
    translations: { ENG: ["tie"] },
    tags: ["allohomTesting3", "clothes"],
    //selectors
    lemma: "krawat",
    id: "pol-nou-d05",
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
  ////
  {
    id: "dummy-nou-001",
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
    id: "dummy-nou-002",
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
    id: "dummy-nou-003",
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
    id: "dummy-nou-004",
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
    id: "dummy-nou-005",
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
    id: "dummy-nou-006",
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
    id: "dummy-nou-007",
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
    id: "dummy-nou-008",
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
    id: "dummy-nou-009",
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
    id: "dummy-nou-010",
    lemma: "dummy-nou-010",
    gender: "n",
    tags: ["dummy-nou-010"],
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
];
let adjectiveSet = [];
let adverbSet = [];
let pronounSet = [];
let verbSet = [
  {
    //links
    translations: { ENG: ["bear"] },
    tags: ["allohomTesting2", "emotions"],
    //selectors
    lemma: "znieść",
    id: "pol-ver-d01-pf-01",
    aspect: "perfective",
    //notes

    //inflections
    inflections: {
      infinitive: "znieść",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "zniesiono" },
            plural: { allPluralGenders: "zniesiono" },
          },
          "1per": {
            singular: {
              m: "zniøsłem",
              f: "zniosłam",
            },
            plural: {
              virile: "znieśliśmy",
              nonvirile: "zniosłyśmy",
            },
          },
          "2per": {
            singular: {
              m: "zniøsłeś",
              f: "zniosłaś",
            },
            plural: {
              virile: "znieśliście",
              nonvirile: "zniosłyście",
            },
          },
          "3per": {
            singular: {
              m: "zniøsł",
              f: "zniosła",
              n: "zniosło",
            },
            plural: {
              virile: "znieśli",
              nonvirile: "zniosły",
            },
          },
        },
        present: false,
        future: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "zniosę",
            },
            plural: {
              allPluralGenders: "zniesiemy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "zniesiesz",
            },
            plural: {
              allPluralGenders: "zniesiecie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "zniesie",
            },
            plural: {
              allPluralGenders: "zniosą",
            },
          },
        },
        conditional: true,
        imperative: "znieś",
      },
      activeAdjectival: false,
      passiveAdjectival: "zniesiony",
      contemporaryAdverbial: false,
      anteriorAdverbial: "zniósłszy",
      verbalNoun: "zniesienie",
    },
  },
  {
    //links
    translations: { ENG: ["tie"] },
    tags: ["allohomTesting3", "crafts"],
    //selectors
    lemma: "wiązać",
    id: "pol-ver-d02-im-01",
    aspect: "imperfective",
    //notes

    //inflections
    inflections: {
      infinitive: "wiązać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "wiązano" },
            plural: { allPluralGenders: "wiązano" },
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
              allSingularGendersExcludingNeuter: "wiążę",
            },
            plural: {
              allPluralGenders: "wiążemy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "wiążesz",
            },
            plural: {
              allPluralGenders: "wiążecie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "wiąże",
            },
            plural: {
              allPluralGenders: "wiążą",
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

let prepositionSet = [];
let articleSet = [];

exports.dummyWordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
  pronounSet,
  prepositionSet,
  articleSet,
};
