let nounSet = [
  {
    //links
    translations: { ENG: ["woman", "lady"] },
    tags: ["animate", "person", "concrete"],
    //selectors
    lemma: "kobieta",
    id: "pol-nou-001",
    gender: "f",
    //notes
    deficient: false,
    //inflections
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
  // {
  //   //links
  //   translations: { ENG: ["boy", "boyfriend", "guy"] },
  //   tags: ["animate", "person", "concrete"],
  //   //selectors
  //   lemma: "chłopak",
  //   id: "pol-nou-002",
  //   gender: "m1",
  //   //notes
  //   deficient: false,
  //   //inflections
  //   inflections: {
  //     singular: {
  //       nom: "chłopak",
  //       gen: "chłopaka",
  //       dat: "chłopakowi",
  //       acc: "chłopaka",
  //       ins: "chłopakiem",
  //       loc: "chłopaku",
  //     },
  //     plural: {
  //       nom: ["chłopacy", "chłopaki"],
  //       gen: "chłopaków",
  //       dat: "chłopakom",
  //       acc: "chłopaków",
  //       ins: "chłopakami",
  //       loc: "chłopakach",
  //     },
  //   },
  // },
  {
    //links
    translations: { ENG: ["boy", "little boy"] },
    tags: ["animate", "person", "concrete"],
    //selectors
    lemma: "chłopiec",
    id: "pol-nou-003",
    gender: "m1",
    //notes
    deficient: false,
    //inflections
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
    //links
    translations: { ENG: ["onion"] },
    tags: ["inanimate", "edible", "holdable", "concrete"],
    //selectors
    lemma: "cebula",
    id: "pol-nou-004",
    gender: "f",
    //notes
    deficient: false,
    //inflections
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
    //links
    translations: { ENG: ["apple"] },
    tags: ["inanimate", "edible", "holdable", "concrete"],
    //selectors
    lemma: "jabłko",
    id: "pol-nou-005",
    gender: "n",
    //notes
    deficient: false,
    //inflections
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
    //links
    translations: { ENG: ["mirror"] },
    tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "lustro",
    id: "pol-nou-006",
    gender: "n",
    //notes
    deficient: false,
    //inflections
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
    //links
    translations: { ENG: ["mirror"] },
    tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "zwierciadło",
    id: "pol-nou-007",
    gender: "n",
    //notes
    deficient: false,
    //inflections
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
    //links
    translations: {
      ENG: ["underwear", "pants", "underpants", "briefs", "panties"],
    },
    tags: ["inanimate", "holdable", "concrete", "wearable"],
    //selectors
    lemma: "majtki",
    id: "pol-nou-008",
    gender: "f",
    //notes
    deficient: true,
    //inflections
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
    //links
    translations: { ENG: ["red"] },
    tags: ["colour2"],
    //selectors
    lemma: "niebieski",
    id: "pol-adj-001",
    //notes
    deficient: false,
    //inflections
    inflections: {
      simple: {
        singular: {
          m: {
            nom: "niebieski",
            gen: "niebieskiego",
            dat: "niebieskiemu",
            acc: "niebieskiego",
            ins: "niebieskim",
            loc: "niebieskim",
          },
          f: {
            nom: "niebieska",
            gen: "niebieskiej",
            dat: "niebieskiej",
            acc: "niebieską",
            ins: "niebieską",
            loc: "niebieskiej",
          },
          n: {
            nom: "niebieskie",
            gen: "niebieskiego",
            dat: "niebieskiemu",
            acc: "niebieskie",
            ins: "niebieskim",
            loc: "niebieskim",
          },
        },
        plural: {
          virile: {
            nom: "niebiescy",
            gen: "niebieskich",
            dat: "niebieskim",
            acc: "niebieskich",
            ins: "niebieskimi",
            loc: "niebieskich",
          },
          nonvirile: {
            nom: "niebieskie",
            gen: "niebieskich",
            dat: "niebieskim",
            acc: "niebieskie",
            ins: "niebieskimi",
            loc: "niebieskich",
          },
        },
      },
      comparative: ["", true],
      superlative: ["", true],
      adverb: "niebiesko",
    },
  },
  {
    //links
    translations: { ENG: ["red"] },
    tags: ["colour"],
    //selectors
    lemma: "czerwony",
    id: "pol-adj-001",
    //notes
    deficient: false,
    //inflections
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

//If you mark a key true, or give it a value      it will be filled out by fillVerbInflections fxn.
//If you mark a key false, or omit it             it will not be.

let verbSet = [
  {
    //links
    translations: { ENG: ["have"] },
    tags: ["basic", "possession"],
    //selectors
    lemma: "mieć",
    id: "pol-ver-001-im-01",
    aspect: "imperfective",
    //notes
    deficient: true,
    defective: false,
    //inflections
    inflections: {
      infinitive: "mieć",
      verbal: {
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
      activeAdjectival: "mający",
      passiveAdjectival: false,
      contemporaryAdverbial: "mając",
      anteriorAdverbial: false,
      verbalNoun: false,
    },
  },
  {
    //links
    translations: { ENG: ["read"] },
    tags: ["basic2"],
    //selectors
    lemma: "czytać",
    id: "pol-ver-002-im-01",
    aspect: "imperfective",
    //notes
    deficient: false,
    defective: false,
    //inflections
    inflections: {
      infinitive: "czytać",
      verbal: {
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
      activeAdjectival: "czytający",
      passiveAdjectival: "czytany",
      contemporaryAdverbial: "czytając",
      anteriorAdverbial: false,
      verbalNoun: "czytanie",
    },
  },
  {
    //links
    translations: { ENG: ["research"] },
    tags: ["science"],
    //selectors
    lemma: "badać",
    id: "pol-ver-003-im-01",
    aspect: "imperfective",
    //notes
    deficient: false,
    defective: false,
    //inflections
    inflections: {
      infinitive: "badać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "badano" },
            plural: { allPluralGenders: "badano" },
          },
          "1per": {
            singular: {
              m: "badałem",
              f: "badałam",
            },
            plural: {
              virile: "badaliśmy",
              nonvirile: "badałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "badałeś",
              f: "badałaś",
            },
            plural: {
              virile: "badaliście",
              nonvirile: "badałyście",
            },
          },
          "3per": {
            singular: {
              m: "badał",
              f: "badała",
              n: "badało",
            },
            plural: {
              virile: "badali",
              nonvirile: "badały",
            },
          },
        },
        present: {
          impersonal: { singular: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "badam",
            },
            plural: {
              allPluralGenders: "badamy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "badasz",
            },
            plural: {
              allPluralGenders: "badacie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "bada",
            },
            plural: {
              allPluralGenders: "badają",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: {
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "niech badam",
            },
            plural: {
              allPluralGenders: "badajmy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "badaj",
            },
            plural: {
              allPluralGenders: "badajcie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "niech bada",
            },
            plural: {
              allPluralGenders: "niech badają",
            },
          },
        },
      },
      activeAdjectival: "badający",
      passiveAdjectival: "badany",
      contemporaryAdverbial: "badając",
      anteriorAdverbial: false,
      verbalNoun: "badanie",
    },
  },
  {
    //links
    translations: { ENG: ["read"] },
    tags: ["basic2"],
    //selectors
    lemma: "przeczytać",
    id: "pol-ver-002-pf-01",
    aspect: "perfective",
    //notes
    deficient: false,
    defective: false,
    //inflections
    inflections: {
      infinitive: "przeczytać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "przeczytano" },
            plural: { allPluralGenders: "przeczytano" },
          },
          "1per": {
            singular: {
              m: "przeczytałem",
              f: "przeczytałam",
            },
            plural: {
              virile: "przeczytaliśmy",
              nonvirile: "przeczytałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "przeczytałeś",
              f: "przeczytałaś",
            },
            plural: {
              virile: "przeczytaliście",
              nonvirile: "przeczytałyście",
            },
          },
          "3per": {
            singular: {
              m: "przeczytał",
              f: "przeczytała",
              n: "przeczytało",
            },
            plural: {
              virile: "przeczytali",
              nonvirile: "przeczytały",
            },
          },
        },
        future: {
          impersonal: { singular: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "przeczytam",
            },
            plural: {
              allPluralGenders: "przeczytamy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "przeczytasz",
            },
            plural: {
              allPluralGenders: "przeczytacie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "przeczyta",
            },
            plural: {
              allPluralGenders: "przeczytają",
            },
          },
        },
        present: false,
        conditional: true,
        imperative: {
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "niech przeczytam",
            },
            plural: {
              allPluralGenders: "przeczytajmy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "przeczytaj",
            },
            plural: {
              allPluralGenders: "przeczytajcie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "niech przeczyta",
            },
            plural: {
              allPluralGenders: "niech przeczytają",
            },
          },
        },
      },
      activeAdjectival: false,
      passiveAdjectival: "przeczytany",
      contemporaryAdverbial: false,
      anteriorAdverbial: "przeczytawszy",
      verbalNoun: "przeczytanie",
    },
  },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  verbSet,
};
