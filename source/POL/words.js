let nounSet = [
  {
    translations: { EN: ["woman", "lady"] },
    lemma: "kobieta",
    id: "pol-nou-001",
    gender: "f",
    tags: ["animate", "person", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "kobieta",
        gen: "kobiety",
        dat: "kobiecie",
        acc: "kobietę",
        ins: "kobietą",
        loc: "kobiecie",
      },
      plural: {
        nom: "kobiety",
        gen: "kobiet",
        dat: "kobietom",
        acc: "kobiety",
        ins: "kobietami",
        loc: "kobietach",
      },
    },
  },
  {
    translations: { EN: ["boy", "boyfriend", "guy"] },
    lemma: "chłopak",
    id: "pol-nou-002",
    gender: "m1",
    tags: ["animate", "person", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "chłopak",
        gen: "chłopaka",
        dat: "chłopakowi",
        acc: "chłopaka",
        ins: "chłopakiem",
        loc: "chłopaku",
      },
      plural: {
        nom: ["chłopacy", "chłopaki"],
        gen: "chłopaków",
        dat: "chłopakom",
        acc: "chłopaków",
        ins: "chłopakami",
        loc: "chłopakach",
      },
    },
  },
  {
    translations: { EN: ["boy", "little boy"] },
    lemma: "chłopiec",
    id: "pol-nou-003",
    gender: "m1",
    tags: ["animate", "person", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "chłopiec",
        gen: "chłopca",
        dat: "chłopcu",
        acc: "chłopca",
        ins: "chłopcem",
        loc: "chłopcu",
      },
      plural: {
        nom: "chłopcy",
        gen: "chłopców",
        dat: "chłopcom",
        acc: "chłopców",
        ins: "chłopcami",
        loc: "chłopcach",
      },
    },
  },
  {
    translations: { EN: ["onion"] },
    lemma: "cebula",
    id: "pol-nou-004",
    gender: "f",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "cebula",
        gen: "cebuli",
        dat: "cebuli",
        acc: "cebulę",
        ins: "cebulą",
        loc: "cebuli",
      },
      plural: {
        nom: "cebule",
        gen: "cebul",
        dat: "cebulom",
        acc: "cebule",
        ins: "cebulami",
        loc: "cebulach",
      },
    },
  },
  {
    translations: { EN: ["apple"] },
    lemma: "jabłko",
    id: "pol-nou-005",
    gender: "n",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "jabłko",
        gen: "jabłka",
        dat: "jabłku",
        acc: "jabłko",
        ins: "jabłkiem",
        loc: "jabłku",
      },
      plural: {
        nom: "jabłka",
        gen: "jabłek",
        dat: "jabłkom",
        acc: "jabłka",
        ins: "jabłkami",
        loc: "jabłkach",
      },
    },
  },
  {
    translations: { EN: ["mirror"] },
    lemma: "lustro",
    id: "pol-nou-006",
    gender: "n",
    tags: ["inanimate", "holdable", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "lustro",
        gen: "lustra",
        dat: "lustru",
        acc: "lustro",
        ins: "lustrem",
        loc: "lustrze",
      },
      plural: {
        nom: "lustra",
        gen: "luster",
        dat: "lustrom",
        acc: "lustra",
        ins: "lustrami",
        loc: "lustrach",
      },
    },
  },
  {
    translations: { EN: ["mirror"] },
    lemma: "zwierciadło",
    id: "pol-nou-007",
    gender: "n",
    tags: ["inanimate", "holdable", "concrete"],
    deficient: false,
    inflections: {
      singular: {
        nom: "zwierciadło",
        gen: "zwierciadła",
        dat: "zwierciadłu",
        acc: "zwierciadło",
        ins: "zwierciadłem",
        loc: "zwierciadle",
      },
      plural: {
        nom: "zwierciadła",
        gen: "zwierciadeł",
        dat: "zwierciadłom",
        acc: "zwierciadła",
        ins: "zwierciadłami",
        loc: "zwierciadłach",
      },
    },
  },
  {
    translations: {
      EN: ["underwear", "pants", "underpants", "briefs", "panties"],
    },
    lemma: "majtki",
    id: "pol-nou-008",
    gender: "f",
    tags: ["inanimate", "holdable", "concrete", "wearable"],
    deficient: true,
    inflections: {
      plural: {
        nom: "majtki",
        gen: "majtek",
        dat: "majtkom",
        acc: "majtki",
        ins: "majtkami",
        loc: "majtkach",
      },
    },
  },
];
let adjectiveSet = [
  {
    translations: { EN: ["red"] },
    lemma: "czerwony",
    id: "pol-adj-001",
    tags: ["colour"],
    deficient: false,
    inflections: {
      singular: {
        m1: {
          nom: "czerwony",
          gen: "czerwonego",
          dat: "czerwonemu",
          acc: "czerwonego",
          ins: "czerwonym",
          loc: "czerwonym",
        },
        m2: {
          nom: "czerwony",
          gen: "czerwonego",
          dat: "czerwonemu",
          acc: "czerwonego",
          ins: "czerwonym",
          loc: "czerwonym",
        },
        m3: {
          nom: "czerwony",
          gen: "czerwonego",
          dat: "czerwonemu",
          acc: "czerwony",
          ins: "czerwonym",
          loc: "czerwonym",
        },
        n: {
          nom: "czerwone",
          gen: "czerwonego",
          dat: "czerwonemu",
          acc: "czerwone",
          ins: "czerwonym",
          loc: "czerwonym",
        },
        f: {
          nom: "czerwona",
          gen: "czerwonej",
          dat: "czerwonej",
          acc: "czerwoną",
          ins: "czerwoną",
          loc: "czerwonej",
        },
      },
      plural: {
        virile: {
          nom: "czerwoni",
          gen: "czerwonych",
          dat: "czerwonym",
          acc: "czerwonych",
          ins: "czerwonymi",
          loc: "czerwonych",
        },
        nonvirile: {
          nom: "czerwone",
          gen: "czerwonych",
          dat: "czerwonym",
          acc: "czerwone",
          ins: "czerwonymi",
          loc: "czerwonych",
        },
      },
    },
  },
];
let adverbSet = [];
let verbSet = [
  // chain = ["form", "tense", "person", "number", "gender"]
  //perfective has participles:             passive, anterior
  //imperfective has participles:   active, passive, contemporary
  //If you mark a key true, or give it a value      it will be filled out by fillVerbLemmaObject fxn.
  //If you mark a key false, or omit it             it will not be.

  // {
  //   translations: { EN: ["have"] },
  //   lemma: "mieć",
  //   id: "pol-ver-001-imp-01",
  //   tags: ["basic1", "possession"],
  //   aspect: "imperfective",
  //   deficient: true,
  //   defective: false,
  //   inflections: {
  //     infinitive: "mieć",
  //     past: {
  //       impersonal: "miano",
  //       "1per": {
  //         singular: {
  //           m: "miałem",
  //           f: "miałam",
  //         },
  //         plural: {
  //           virile: "mieliśmy",
  //           nonvirile: "miałyśmy",
  //         },
  //       },
  //       "2per": {
  //         singular: {
  //           m: "miałeś",
  //           f: "miałaś",
  //         },
  //         plural: {
  //           virile: "mieliście",
  //           nonvirile: "miałyście",
  //         },
  //       },
  //       "3per": {
  //         singular: {
  //           m: "miał",
  //           f: "miała",
  //           n: "miało",
  //         },
  //         plural: {
  //           virile: "mieli",
  //           nonvirile: "miały",
  //         },
  //       },
  //     },
  //     present: {
  //       "1per": {
  //         singular: {
  //           m: "mam",
  //           f: "mam",
  //         },
  //         plural: {
  //           virile: "mamy",
  //           nonvirile: "mamy",
  //         },
  //       },
  //       "2per": {
  //         singular: {
  //           m: "masz",
  //           f: "masz",
  //         },
  //         plural: {
  //           virile: "macie",
  //           nonvirile: "macie",
  //         },
  //       },
  //       "3per": {
  //         singular: {
  //           m: "ma",
  //           f: "ma",
  //           n: "ma",
  //         },
  //         plural: {
  //           virile: "mają",
  //           nonvirile: "mają",
  //         },
  //       },
  //     },
  //     future: true,
  //     conditional: true,
  //     imperative: {
  //       "1per": {
  //         singular: {
  //           m: "niech mam",
  //           f: "niech mam",
  //         },
  //         plural: {
  //           virile: "miejmy",
  //           nonvirile: "miejmy",
  //         },
  //       },
  //       "2per": {
  //         singular: {
  //           m: "miej",
  //           f: "miej",
  //         },
  //         plural: {
  //           virile: "miejcie",
  //           nonvirile: "miejcie",
  //         },
  //       },
  //       "3per": {
  //         singular: {
  //           m: "niech ma",
  //           f: "niech ma",
  //           n: "niech ma",
  //         },
  //         plural: {
  //           virile: "niech mają",
  //           nonvirile: "niech mają",
  //         },
  //       },
  //     },
  //     activeAdjectival: {
  //       allPersons: {
  //         singular: {
  //           m: "mający",
  //           f: "mająca",
  //           n: "mające",
  //         },
  //         plural: {
  //           virile: "mający",
  //           nonvirile: "mające",
  //         },
  //       },
  //     },
  //     passiveAdjectival: false,
  //     contemporaryAdverbial: "mając",
  //     anteriorAdverbial: false,
  //     verbalNoun: false,
  //     falseValue: false,
  //   },
  // },
  {
    translations: { EN: ["read"] },
    lemma: "czytać",
    id: "pol-ver-002-imp-01",
    tags: ["basic2"],
    aspect: "imperfective",
    deficient: false,
    defective: false,
    inflections: {
      infinitive: "czytać",
      verb: {
        past: {
          impersonal: "czytano",
          "1per": {
            singular: {
              m: "czytałem",
              f: "czytałam",
            },
            plural: {
              virile: "czytaliśmy",
              nonvirile: "czytałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "czytałeś",
              f: "czytałaś",
            },
            plural: {
              virile: "czytaliście",
              nonvirile: "czytałyście",
            },
          },
          "3per": {
            singular: {
              m: "czytał",
              f: "czytała",
              n: "czytało",
            },
            plural: {
              virile: "czytali",
              nonvirile: "czytały",
            },
          },
        },
        present: {
          impersonal: true,
          "1per": {
            singular: {
              m: "czytam",
              f: "czytam",
            },
            plural: {
              virile: "czytamy",
              nonvirile: "czytamy",
            },
          },
          "2per": {
            singular: {
              m: "czytasz",
              f: "czytasz",
            },
            plural: {
              virile: "czytacie",
              nonvirile: "czytacie",
            },
          },
          "3per": {
            singular: {
              m: "czyta",
              f: "czyta",
              n: "czyta",
            },
            plural: {
              virile: "czytają",
              nonvirile: "czytają",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: {
          "1per": {
            singular: {
              m: "niech czytam",
              f: "niech czytam",
            },
            plural: {
              virile: "czytajmy",
              nonvirile: "czytajmy",
            },
          },
          "2per": {
            singular: {
              m: "czytaj",
              f: "czytaj",
            },
            plural: {
              virile: "czytajcie",
              nonvirile: "czytajcie",
            },
          },
          "3per": {
            singular: {
              m: "niech czyta",
              f: "niech czyta",
              n: "niech czyta",
            },
            plural: {
              virile: "niech czytają",
              nonvirile: "niech czytają",
            },
          },
        },
      },
      participle: {
        activeAdjectival: {
          allPersons: {
            singular: {
              m: "czytający",
              f: "czytająca",
              n: "czytające",
            },
            plural: {
              virile: "czytający",
              nonvirile: "czytające",
            },
          },
        },
        passiveAdjectival: {
          allPersons: {
            singular: {
              m: "czytany",
              f: "czytana",
              n: "czytane",
            },
            plural: {
              virile: "czytani",
              nonvirile: "czytane",
            },
          },
        },
        contemporaryAdverbial: "czytając",
        anteriorAdverbial: false,
        verbalNoun: "czytanie",
      },
    },
  },
  // {
  //   translations: { EN: ["read"] },
  //   lemma: "przeczytać",
  //   id: "pol-ver-002-per-01",
  //   tags: ["basic2"],
  //   aspect: "perfective",
  //   deficient: false,
  //   defective: false,
  // infinitive: "przeczytać",
  //   inflections: {
  //     verb: {
  //
  //       past: {
  //         impersonal: "przeczytano",
  //         "1per": {
  //           singular: {
  //             m: "czytałem",
  //             f: "czytałam",
  //           },
  //           plural: {
  //             virile: "czytaliśmy",
  //             nonvirile: "czytałyśmy",
  //           },
  //         },
  //         "2per": {
  //           singular: {
  //             m: "czytałeś",
  //             f: "czytałaś",
  //           },
  //           plural: {
  //             virile: "czytaliście",
  //             nonvirile: "czytałyście",
  //           },
  //         },
  //         "3per": {
  //           singular: {
  //             m: "czytał",
  //             f: "czytała",
  //             n: "czytało",
  //           },
  //           plural: {
  //             virile: "czytali",
  //             nonvirile: "czytały",
  //           },
  //         },
  //       },
  //       present: false,
  //       future: {
  //         impersonal: true,
  //         "1per": {
  //           singular: {
  //             m: "przeczytam",
  //             f: "przeczytam",
  //           },
  //           plural: {
  //             virile: "przeczytamy",
  //             nonvirile: "przeczytamy",
  //           },
  //         },
  //         "2per": {
  //           singular: {
  //             m: "przeczytasz",
  //             f: "przeczytasz",
  //           },
  //           plural: {
  //             virile: "przeczytacie",
  //             nonvirile: "przeczytacie",
  //           },
  //         },
  //         "3per": {
  //           singular: {
  //             m: "przeczyta",
  //             f: "przeczyta",
  //             n: "przeczyta",
  //           },
  //           plural: {
  //             virile: "przeczytają",
  //             nonvirile: "przeczytają",
  //           },
  //         },
  //       },
  //       conditional: true,
  //       imperative: {
  //         "1per": {
  //           singular: {
  //             m: "niech przeczytam",
  //             f: "niech przeczytam",
  //           },
  //           plural: {
  //             virile: "przeczytajmy",
  //             nonvirile: "przeczytajmy",
  //           },
  //         },
  //         "2per": {
  //           singular: {
  //             m: "przeczytaj",
  //             f: "przeczytaj",
  //           },
  //           plural: {
  //             virile: "przeczytajcie",
  //             nonvirile: "przeczytajcie",
  //           },
  //         },
  //         "3per": {
  //           singular: {
  //             m: "niech przeczyta",
  //             f: "niech przeczyta",
  //             n: "niech przeczyta",
  //           },
  //           plural: {
  //             virile: "niech przeczytają",
  //             nonvirile: "niech przeczytają",
  //           },
  //         },
  //       },
  //     },
  //     participle: {
  //       activeAdjectival: false,
  //       passiveAdjectival: {
  //         allPersons: {
  //           singular: {
  //             m: "przeczytany",
  //             f: "przeczytana",
  //             n: "przeczytane",
  //           },
  //           plural: {
  //             virile: "przeczytani",
  //             nonvirile: "przeczytane",
  //           },
  //         },
  //       },
  //       contemporaryAdverbial: false,
  //       anteriorAdverbial: "przeczytawszy",
  //       verbalNoun: false,
  //     },
  //   },
  // },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
