let nounSet = [
  {
    translations: { ENG: ["woman", "lady"] },
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
    translations: { ENG: ["boy", "boyfriend", "guy"] },
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
    translations: { ENG: ["boy", "little boy"] },
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
    translations: { ENG: ["onion"] },
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
    translations: { ENG: ["apple"] },
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
    translations: { ENG: ["mirror"] },
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
    translations: { ENG: ["mirror"] },
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
      ENG: ["underwear", "pants", "underpants", "briefs", "panties"],
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

let pronounSet = [
  {
    translations: { ENG: ["I"] },
    lemma: "ja",
    id: "pol-pro-001",
    tags: [],
    deficient: false,
    person: "1per",
    gender: ["m1", "f"],
    inflections: {
      singular: {
        allSingularGendersExcludingNeuter: {
          nom: "ja",
          gen: "mnie",
          dat: ["mi", "mnie"],
          acc: "mnie",
          ins: "mną",
          loc: "mnie",
        },
      },
      plural: {
        allPluralGenders: {
          nom: "my",
          gen: "nas",
          dat: "nam",
          acc: "nas",
          ins: "nami",
          loc: "nas",
        },
      },
    },
  },
  {
    translations: { ENG: ["you (familiar)"] },
    lemma: "ty",
    id: "pol-pro-001",
    tags: [],
    deficient: false,
    person: "2per",
    gender: ["m1", "f"],
    inflections: {
      singular: {
        allSingularGendersExcludingNeuter: {
          nom: "ty",
          gen: ["cię", "ciebie"],
          dat: ["ci", "tobie"],
          acc: ["cię", "ciebie"],
          ins: "tobą",
          loc: "ty",
        },
      },
      plural: {
        allPluralGenders: {
          nom: "wy",
          gen: "was",
          dat: "wam",
          acc: "was",
          ins: "wami",
          loc: "was",
        },
      },
    },
  },
  {
    translations: { ENG: ["he she it"] },
    lemma: "on",
    id: "pol-pro-001",
    tags: [],
    deficient: false,
    person: "3per",
    gender: ["m1", "m2", "m3", "f", "n"],
    inflections: {
      singular: {
        m: {},
        f: {},
        n: {},
      },
      plural: {
        virile: {},
        nonvirile: {},
      },
    },
  },
];

let adjectiveSet = [
  {
    translations: { ENG: ["red"] },
    lemma: "czerwony",
    id: "pol-adj-001",
    tags: ["colour"],
    deficient: false,
    inflections: {
      simple: {
        singular: {
          m: {
            nom: "czerwony",
            gen: "czerwonego",
            dat: "czerwonemu",
            acc: "czerwonego",
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
          n: {
            nom: "czerwone",
            gen: "czerwonego",
            dat: "czerwonemu",
            acc: "czerwone",
            ins: "czerwonym",
            loc: "czerwonym",
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
      comparative: ["czerwieńszy", true],
      superlative: ["najczerwieńszy", true],
      adverb: "czerwono",
    },
  },
];

//Perfective has participles:             passive, anterior
//Imperfective has participles:   active, passive, contemporary

//If you mark a key true, or give it a value      it will be filled out by fillVerbInflections fxn.
//If you mark a key false, or omit it             it will not be.
let verbSet = [
  {
    translations: { ENG: ["have"] },
    lemma: "mieć",
    id: "pol-ver-001-imp-01",
    tags: ["basic", "possession"],
    aspect: "imperfective",
    deficient: true,
    defective: false,
    inflections: {
      infinitive: "mieć",
      verb: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "miano" },
            plural: { allPluralGenders: "miano" },
          },
          "1per": {
            singular: {
              m: "miałem",
              f: "miałam",
            },
            plural: {
              virile: "mieliśmy",
              nonvirile: "miałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "miałeś",
              f: "miałaś",
            },
            plural: {
              virile: "mieliście",
              nonvirile: "miałyście",
            },
          },
          "3per": {
            singular: {
              m: "miał",
              f: "miała",
              n: "miało",
            },
            plural: {
              virile: "mieli",
              nonvirile: "miały",
            },
          },
        },
        present: {
          impersonal: { singular: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "mam",
            },
            plural: {
              allPluralGenders: "mamy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "masz",
            },
            plural: {
              allPluralGenders: "macie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "ma",
            },
            plural: {
              allPluralGenders: "mają",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: {
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "niech mam",
            },
            plural: {
              allPluralGenders: "miejmy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "miej",
            },
            plural: {
              allPluralGenders: "miejcie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "niech ma",
            },
            plural: {
              allPluralGenders: "niech mają",
            },
          },
        },
      },
      participle: {
        activeAdjectival: {
          allPersons: {
            singular: {
              m: "mający",
              f: "mająca",
              n: "mające",
            },
            plural: {
              virile: "mający",
              nonvirile: "mające",
            },
          },
        },
        passiveAdjectival: false,
        contemporaryAdverbial: "mając",
        anteriorAdverbial: false,
      },
      verbalNoun: false,
    },
  },
  {
    translations: { ENG: ["read"] },
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
              allSingularGendersExcludingNeuter: "czytam",
            },
            plural: {
              allPluralGenders: "czytamy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "czytasz",
            },
            plural: {
              allPluralGenders: "czytacie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "czyta",
            },
            plural: {
              allPluralGenders: "czytają",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: {
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "niech czytam",
            },
            plural: {
              allPluralGenders: "czytajmy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "czytaj",
            },
            plural: {
              allPluralGenders: "czytajcie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "niech czyta",
            },
            plural: {
              allPluralGenders: "niech czytają",
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
  verbSet,
};
