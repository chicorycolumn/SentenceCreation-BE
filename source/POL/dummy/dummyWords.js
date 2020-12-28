let nounSet = [
  {
    //links
    translations: { ENG: ["nut"] },
    tags: ["allohomTesting", "edible2"],
    //selectors
    lemma: "orzech",
    id: "pol-nou-012",
    gender: "m3",
    //notes
    deficient: false,
    //inflections
    inflections: {
      singular: {
        nom: "orzech",
        gen: "orzecha",
        dat: "orzechowi",
        acc: ["orzech", "orzecha"],
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
    id: "pol-nou-013",
    gender: "f",
    //notes
    deficient: false,
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
    id: "pol-nou-014",
    gender: "m2",
    //notes
    deficient: false,
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
    id: "dummy-nou-001",
    lemma: "foobar_loc_only",
    gender: "n",
    tags: ["dummy"],
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
    deficient: true,
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
let verbSet = [
  {
    //links
    translations: { ENG: ["bear"] },
    tags: ["allohomTesting2", "emotions"],
    //selectors
    lemma: "znieść",
    id: "pol-ver-005-pf-01",
    aspect: "perfective",
    //notes
    deficient: false,
    defective: false,
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
        imperative: {
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "niech zniosę",
            },
            plural: {
              allPluralGenders: "znieśmy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "znieś",
            },
            plural: {
              allPluralGenders: "znieście",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "niech zniesie",
            },
            plural: {
              allPluralGenders: "niech zniosą",
            },
          },
        },
      },
      activeAdjectival: false,
      passiveAdjectival: "zniesiony",
      contemporaryAdverbial: false,
      anteriorAdverbial: "zniósłszy",
      verbalNoun: "zniesienie",
    },
  },
];

exports.dummyWordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
