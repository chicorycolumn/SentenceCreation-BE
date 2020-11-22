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
  //perfective has participles:             passive, anterior
  //imperfective has participles:   active, passive, contemporary

  //If you mark a key true, or give it a value      it will be filled out by fillVerbInflections fxn.
  //If you mark a key false, or omit it             it will not be.
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
          impersonal: {
            singular: { allSingularGenders: "czytano" },
            plural: { allPluralGenders: "czytano" },
          },
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
          impersonal: { singular: true },
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
      },
      verbalNoun: "czytanie",
    },
  },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
