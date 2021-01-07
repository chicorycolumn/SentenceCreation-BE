//Copied over on 27/12/2020

let nounSet = [
  {
    //links
    translations: { ENG: ["woman", "lady"] },
    tags: ["animate", "person", "personTest1", "concrete"],
    //selectors
    lemma: "kobieta",
    id: "pol-nou-001",
    gender: "f",
    //notes

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
  {
    //links
    translations: { ENG: ["father"] },
    tags: ["animate", "person", "family", "concrete"],
    //selectors
    lemma: "ojciec",
    id: "pol-nou-016",
    gender: "m1",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "ojciec",
        gen: "ojca",
        dat: "ojcu",
        acc: "ojca",
        ins: "ojcem",
        loc: "ojcu",
      },
      plural: {
        nom: "ojcowie",
        gen: "ojców",
        dat: "ojcom",
        acc: "ojców",
        ins: "ojcami",
        loc: "ojcach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["mother"] },
    tags: ["animate", "person", "family", "concrete"],
    //selectors
    lemma: "matka",
    id: "pol-nou-017",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "matka",
        gen: "matki",
        dat: "matce",
        acc: "matkę",
        ins: "matką",
        loc: "matce",
      },
      plural: {
        nom: "matki",
        gen: "matek",
        dat: "matkom",
        acc: "matki",
        ins: "matkami",
        loc: "matkach",
      },
    },
  },

  // {
  //   //links
  //   translations: { ENG: ["boy", "boyfriend", "guy"] },
  //   tags: ["animate", "person", "personTest1", "concrete"],
  //   //selectors
  //   lemma: "chłopak",
  //   id: "pol-nou-002",
  //   gender: "m1",
  //   //notes
  //
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
    tags: ["animate", "person", "personTest1", "concrete"],
    //selectors
    lemma: "chłopiec",
    id: "pol-nou-003",
    gender: "m1",
    //notes

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
    translations: { ENG: ["book"] },
    tags: ["inanimate", "holdable", "concrete"],
    //selectors
    lemma: "książka",
    id: "pol-nou-009",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "książka",
        gen: "książki",
        dat: "książce",
        acc: "książkę",
        ins: "książką",
        loc: "książce",
      },
      plural: {
        nom: "książki",
        gen: "książek",
        dat: "książkom",
        acc: "książki",
        ins: "książkami",
        loc: "książkach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["door"] },
    tags: ["inanimate", "house", "concrete"],
    //selectors
    lemma: "drzwi",
    id: "pol-nou-010",
    gender: "nonvirile",
    //notes
    lacking: true,
    tantumPlurale: true,
    //inflections
    inflections: {
      plural: {
        nom: "drzwi",
        gen: "drzwi",
        dat: "drzwiom",
        acc: "drzwi",
        ins: "drzwiami",
        loc: "drzwiach",
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
    gender: "nonvirile",
    //notes
    lacking: true,
    tantumPlurale: true,
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
  {
    //links
    translations: { ENG: ["sheep"], POL: ["owca"] },
    tags: ["concrete", "animal", "animate", "farmyard"],
    //selectors
    lemma: "owca",
    id: "pol-nou-011",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "owca",
        gen: "owcy",
        dat: "owcy",
        acc: "owcę",
        ins: "owcą",
        loc: "owcy",
      },
      plural: {
        nom: "owce",
        gen: "owiec",
        dat: "owcom",
        acc: "owce",
        ins: "owcami",
        loc: "owcach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["doctor"], POL: ["lekarz"] },
    tags: ["concrete", "animate", "person", "personTest2", "job"],
    //selectors
    lemma: "lekarz",
    id: "pol-nou-015a",
    gender: "m1",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "lekarz",
        gen: "lekarza",
        dat: "lekarzowi",
        acc: "lekarza",
        ins: "lekarzem",
        loc: "lekarzu",
      },
      plural: {
        nom: "lekarze",
        gen: "lekarzy",
        dat: "lekarzom",
        acc: "lekarzy",
        ins: "lekarzami",
        loc: "lekarzach",
      },
    },
  },
  {
    //links
    translations: { ENG: ["doctor"], POL: ["lekarka"] },
    tags: ["concrete", "animate", "person", "personTest2", "job"],
    //selectors
    lemma: "lekarka",
    id: "pol-nou-015b",
    gender: "f",
    //notes

    //inflections
    inflections: {
      singular: {
        nom: "lekarka",
        gen: "lekarki",
        dat: "lekarce",
        acc: "lekarkę",
        ins: "lekarką",
        loc: "lekarce",
      },
      plural: {
        nom: "lekarki",
        gen: "lekarek",
        dat: "lekarkom",
        acc: "lekarki",
        ins: "lekarkami",
        loc: "lekarkach",
      },
    },
  },
];

let adjectiveSet = [
  {
    //links
    translations: { ENG: ["red"] },
    tags: ["colour"],
    //selectors
    lemma: "czerwony",
    id: "pol-adj-001",
    //notes

    //inflections
    inflections: {
      simple: {
        singular: {
          m1: {
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
  {
    //links
    translations: { ENG: ["red"] },
    tags: ["colour2"],
    //selectors
    lemma: "niebieski",
    id: "pol-adj-002",
    //notes

    //inflections
    inflections: {
      simple: {
        singular: {
          m1: {
            nom: "niebieski",
            gen: "niebieskiego",
            dat: "niebieskiemu",
            acc: "niebieskiego",
            ins: "niebieskim",
            loc: "niebieskim",
          },
          m3: {
            nom: "niebieski",
            gen: "niebieskiego",
            dat: "niebieskiemu",
            acc: "niebieski",
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
    translations: { ENG: ["small"] },
    tags: ["size"],
    //selectors
    lemma: "mały",
    id: "pol-adj-003",
    //notes

    //inflections
    inflections: {
      simple: {
        singular: {
          m1: {
            nom: "mały",
            gen: "małego",
            dat: "małemu",
            acc: "małego",
            ins: "małym",
            loc: "małym",
          },
          m3: {
            nom: "mały",
            gen: "małego",
            dat: "małemu",
            acc: "mały",
            ins: "małym",
            loc: "małym",
          },
          f: {
            nom: "mała",
            gen: "małej",
            dat: "małej",
            acc: "małą",
            ins: "małą",
            loc: "małej",
          },
          n: {
            nom: "małe",
            gen: "małego",
            dat: "małemu",
            acc: "małe",
            ins: "małym",
            loc: "małym",
          },
        },
        plural: {
          virile: {
            nom: "mali",
            gen: "małych",
            dat: "małym",
            acc: "małych",
            ins: "małymi",
            loc: "małych",
          },
          nonvirile: {
            nom: "małe",
            gen: "małych",
            dat: "małym",
            acc: "małe",
            ins: "małymi",
            loc: "małych",
          },
        },
      },
      comparative: ["mniejszy", true],
      superlative: ["najmniejszy", true],
      adverb: "mało",
    },
  },
];

//If you mark a key true, or give it a value      it will be filled out by fillVerbInflections fxn.
//If you mark a key false, or omit it             it will not be.

let pronounSet = [
  {
    //links
    translations: { ENG: ["PERSONAL"], POL: ["PERSONAL"] },
    tags: [],
    //selectors
    lemma: "PERSONAL",
    id: "pol-pro-001",
    //notes

    //inflections
    inflections: {
      "1per": {
        singular: {
          m1: {
            nom: "ja",
            gen: "mnie",
            dat: "mi",
            acc: "mnie",
            ins: "mną",
            loc: "mnie",
          },
          f: {
            nom: "ja",
            gen: "mnie",
            dat: "mi",
            acc: "mnie",
            ins: "mną",
            loc: "mnie",
          },
        },
        plural: {
          virile: {
            nom: "my",
            gen: "nas",
            dat: "nam",
            acc: "nas",
            ins: "nami",
            loc: "nas",
          },
          nonvirile: {
            nom: "my",
            gen: "nas",
            dat: "nam",
            acc: "nas",
            ins: "nami",
            loc: "nas",
          },
        },
      },
      "2per": {
        singular: {
          m1: {
            nom: "ty",
            gen: "cię",
            dat: "ci",
            acc: "cię",
            ins: "tobą",
            loc: "tobie",
          },
          f: {
            nom: "ty",
            gen: "cię",
            dat: "ci",
            acc: "cię",
            ins: "tobą",
            loc: "tobie",
          },
        },
        plural: {
          virile: {
            nom: "wy",
            gen: "was",
            dat: "wam",
            acc: "was",
            ins: "wami",
            loc: "was",
          },
          nonvirile: {
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
  },
  {
    //links
    translations: {
      ENG: ["POSSESSIVE"],
      POL: ["POSSESSIVE"],
    },
    tags: [],
    //selectors
    lemma: "POSSESSIVE",
    id: "pol-pro-002",
    //notes

    //inflections
    inflections: {
      "1per": {
        singular: {
          allPersonalSingularGenders: {
            singular: {
              m1: {
                nom: "mój",
                gen: "mojego",
                dat: "mojemu",
                acc: "mojego",
                ins: "moim",
                loc: "moim",
              },
              m2: {
                nom: "mój",
                gen: "mojego",
                dat: "mojemu",
                acc: "mojego",
                ins: "moim",
                loc: "moim",
              },
              m3: {
                nom: "mój",
                gen: "mojego",
                dat: "mojemu",
                acc: "mój",
                ins: "moim",
                loc: "moim",
              },
              n: {
                nom: "moje",
                gen: "mojego",
                dat: "mojemu",
                acc: "moje",
                ins: "moim",
                loc: "moim",
              },
              f: {
                nom: "moja",
                gen: "mojej",
                dat: "mojej",
                acc: "moją",
                ins: "moją",
                loc: "mojej",
              },
            },
            plural: {
              virile: {
                nom: "moi",
                gen: "moich",
                dat: "moim",
                acc: "moich",
                ins: "moimi",
                loc: "moich",
              },
              nonvirile: {
                nom: "moje",
                gen: "moich",
                dat: "moim",
                acc: "moje",
                ins: "moimi",
                loc: "moich",
              },
            },
          },
        },
        plural: {
          allPluralGenders: {
            singular: {
              m1: {
                nom: "nasz",
                gen: "naszego",
                dat: "naszemu",
                acc: "naszego",
                ins: "naszym",
                loc: "naszym",
              },
              m2: {
                nom: "nasz",
                gen: "naszego",
                dat: "naszemu",
                acc: "naszego",
                ins: "naszym",
                loc: "naszym",
              },
              m3: {
                nom: "nasz",
                gen: "naszego",
                dat: "naszemu",
                acc: "nasz",
                ins: "naszym",
                loc: "naszym",
              },
              n: {
                nom: "nasze",
                gen: "naszego",
                dat: "naszemu",
                acc: "nasze",
                ins: "naszym",
                loc: "naszym",
              },
              f: {
                nom: "nasza",
                gen: "naszej",
                dat: "naszej",
                acc: "naszą",
                ins: "naszą",
                loc: "naszej",
              },
            },
            plural: {
              virile: {
                nom: "nasi",
                gen: "naszych",
                dat: "naszym",
                acc: "naszych",
                ins: "naszymi",
                loc: "naszych",
              },
              nonvirile: {
                nom: "nasze",
                gen: "naszych",
                dat: "naszym",
                acc: "nasze",
                ins: "naszymi",
                loc: "naszych",
              },
            },
          },
        },
      },
      "2per": {
        singular: {
          allPersonalSingularGenders: {
            singular: {
              m1: {
                nom: "twój",
                gen: "twojego",
                dat: "twojemu",
                acc: "twojego",
                ins: "twoim",
                loc: "twoim",
              },
              m2: {
                nom: "twój",
                gen: "twojego",
                dat: "twojemu",
                acc: "twojego",
                ins: "twoim",
                loc: "twoim",
              },
              m3: {
                nom: "twój",
                gen: "twojego",
                dat: "twojemu",
                acc: "twój",
                ins: "twoim",
                loc: "twoim",
              },
              n: {
                nom: "twoje",
                gen: "twojego",
                dat: "twojemu",
                acc: "twoje",
                ins: "twoim",
                loc: "twoim",
              },
              f: {
                nom: "twoja",
                gen: "twojej",
                dat: "twojej",
                acc: "twoją",
                ins: "twoją",
                loc: "twojej",
              },
            },
            plural: {
              virile: {
                nom: "twoi",
                gen: "twoich",
                dat: "twoim",
                acc: "twoich",
                ins: "twoimi",
                loc: "twoich",
              },
              nonvirile: {
                nom: "twoje",
                gen: "twoich",
                dat: "twoim",
                acc: "twoje",
                ins: "twoimi",
                loc: "twoich",
              },
            },
          },
        },
        plural: {
          allPluralGenders: {
            singular: {
              m1: {
                nom: "wasz",
                gen: "waszego",
                dat: "waszemu",
                acc: "waszego",
                ins: "waszym",
                loc: "waszym",
              },
              m2: {
                nom: "wasz",
                gen: "waszego",
                dat: "waszemu",
                acc: "waszego",
                ins: "waszym",
                loc: "waszym",
              },
              m3: {
                nom: "wasz",
                gen: "waszego",
                dat: "waszemu",
                acc: "wasz",
                ins: "waszym",
                loc: "waszym",
              },
              n: {
                nom: "wasze",
                gen: "waszego",
                dat: "waszemu",
                acc: "wasze",
                ins: "waszym",
                loc: "waszym",
              },
              f: {
                nom: "wasza",
                gen: "waszej",
                dat: "waszej",
                acc: "waszą",
                ins: "waszą",
                loc: "waszej",
              },
            },
            plural: {
              virile: {
                nom: "wasi",
                gen: "waszych",
                dat: "waszym",
                acc: "waszych",
                ins: "waszymi",
                loc: "waszych",
              },
              nonvirile: {
                nom: "wasze",
                gen: "waszych",
                dat: "waszym",
                acc: "wasze",
                ins: "waszymi",
                loc: "waszych",
              },
            },
          },
        },
      },
    },
  },
];

let verbSet = [
  {
    //links
    translations: { ENG: ["give"] },
    tags: [],
    //selectors
    lemma: "dawać",
    id: "pol-ver-006-im-01",
    aspect: "imperfective",
    //notes

    //inflections
    inflections: {
      infinitive: "dawać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "dawano" },
            plural: { allPluralGenders: "dawano" },
          },
          "1per": {
            singular: {
              m: "dawałem",
              f: "dawałam",
            },
            plural: {
              virile: "dawaliśmy",
              nonvirile: "dawałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "dawałeś",
              f: "dawałaś",
            },
            plural: {
              virile: "dawaliście",
              nonvirile: "dawałyście",
            },
          },
          "3per": {
            singular: {
              m: "dawał",
              f: "dawała",
              n: "dawało",
            },
            plural: {
              virile: "dawali",
              nonvirile: "dawały",
            },
          },
        },
        present: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "daję",
            },
            plural: {
              allPluralGenders: "dajemy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "dajesz",
            },
            plural: {
              allPluralGenders: "dajecie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "daje",
            },
            plural: {
              allPluralGenders: "dają",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: "dawaj",
      },
      activeAdjectival: "dający",
      passiveAdjectival: "dawany",
      contemporaryAdverbial: "dając",
      anteriorAdverbial: false,
      verbalNoun: "dawanie",
    },
  },
  {
    //links
    translations: { ENG: ["give"] },
    tags: [],
    //selectors
    lemma: "dać",
    id: "pol-ver-006-pf-01",
    aspect: "perfective",
    //notes

    //inflections
    inflections: {
      infinitive: "dać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "dano" },
            plural: { allPluralGenders: "dano" },
          },
          "1per": {
            singular: {
              m: "dałem",
              f: "dałam",
            },
            plural: {
              virile: "daliśmy",
              nonvirile: "dałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "dałeś",
              f: "dałaś",
            },
            plural: {
              virile: "daliście",
              nonvirile: "dałyście",
            },
          },
          "3per": {
            singular: {
              m: "dał",
              f: "dała",
              n: "dało",
            },
            plural: {
              virile: "dali",
              nonvirile: "dały",
            },
          },
        },
        future: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "dam",
            },
            plural: {
              allPluralGenders: "damy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "dasz",
            },
            plural: {
              allPluralGenders: "dacie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "da",
            },
            plural: {
              allPluralGenders: "dadzą",
            },
          },
        },
        present: false,
        conditional: true,
        imperative: "daj",
      },
      activeAdjectival: false,
      passiveAdjectival: "dany",
      contemporaryAdverbial: false,
      anteriorAdverbial: "dawszy",
      verbalNoun: "danie",
    },
  },

  {
    //links
    translations: { ENG: ["be"], POL: ["być"] },
    tags: ["basic", "identity"],
    //selectors
    lemma: "być",
    id: "pol-ver-000-im-01",
    aspect: "imperfective",
    //notes
    lacking: true,

    complete: true,
    imperfectiveOnly_unadjusted: true,
    //inflections
    inflections: {
      infinitive: "być",
      verbal: {
        past: {
          "1per": {
            singular: {
              m1: "byłem",
              m2: "byłem",
              m3: "byłem",
              f: "byłam",
            },
            plural: {
              virile: "byliśmy",
              nonvirile: "byłyśmy",
            },
          },
          "2per": {
            singular: {
              m1: "byłeś",
              m2: "byłeś",
              m3: "byłeś",
              f: "byłaś",
            },
            plural: {
              virile: "byliście",
              nonvirile: "byłyście",
            },
          },
          "3per": {
            singular: {
              m1: "był",
              m2: "był",
              m3: "był",
              f: "była",
              n: "było",
            },
            plural: {
              virile: "byli",
              nonvirile: "były",
            },
          },
        },
        present: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              m1: "jestem",
              m2: "jestem",
              m3: "jestem",
              f: "jestem",
            },
            plural: {
              virile: "jesteśmy",
              nonvirile: "jesteśmy",
            },
          },
          "2per": {
            singular: {
              m1: "jesteś",
              m2: "jesteś",
              m3: "jesteś",
              f: "jesteś",
            },
            plural: {
              virile: "jesteście",
              nonvirile: "jesteście",
            },
          },
          "3per": {
            singular: {
              m1: "jest",
              m2: "jest",
              m3: "jest",
              f: "jest",
              n: "jest",
            },
            plural: {
              virile: "są",
              nonvirile: "są",
            },
          },
        },
        future: {
          "1per": {
            singular: {
              m1: "będę",
              m2: "będę",
              m3: "będę",
              f: "będę",
            },
            plural: {
              virile: "będziemy",
              nonvirile: "będziemy",
            },
          },
          "2per": {
            singular: {
              m1: "będziesz",
              m2: "będziesz",
              m3: "będziesz",
              f: "będziesz",
            },
            plural: {
              virile: "będziecie",
              nonvirile: "będziecie",
            },
          },
          "3per": {
            singular: {
              m1: "będzie",
              m2: "będzie",
              m3: "będzie",
              f: "będzie",
              n: "będzie",
            },
            plural: {
              virile: "będą",
              nonvirile: "będą",
            },
          },
        },
        conditional: {
          "1per": {
            singular: {
              m1: "byłbym",
              m2: "byłbym",
              m3: "byłbym",
              f: "byłabym",
            },
            plural: {
              virile: "bylibyśmy",
              nonvirile: "byłybyśmy",
            },
          },
          "2per": {
            singular: {
              m1: "byłbyś",
              m2: "byłbyś",
              m3: "byłbyś",
              f: "byłabyś",
            },
            plural: {
              virile: "bylibyście",
              nonvirile: "byłybyście",
            },
          },
          "3per": {
            singular: {
              m1: "byłby",
              m2: "byłby",
              m3: "byłby",
              f: "byłaby",
              n: "byłoby",
            },
            plural: {
              virile: "byliby",
              nonvirile: "byłyby",
            },
          },
        },
        imperative: "bądź",
      },
      activeAdjectival: "będący",
      contemporaryAdverbial: "będąc",
      anteriorAdverbial: "bywszy",
      verbalNoun: "bycie",
    },
  },
  {
    //links
    translations: { ENG: ["have"] },
    tags: ["basic", "possession"],
    //selectors
    lemma: "mieć",
    id: "pol-ver-001-im-01",
    aspect: "imperfective",
    //notes
    lacking: true,

    complete: false,
    imperfectiveOnly_unadjusted: true,
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
          impersonal: { singular: true, plural: true },
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
        imperative: "miej",
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
    translations: { ENG: ["write"] },
    tags: ["basic3"],
    //selectors
    lemma: "pisać",
    id: "pol-ver-004-im-01",
    aspect: "imperfective",
    //notes

    //inflections
    inflections: {
      infinitive: "pisać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "pisano" },
            plural: { allPluralGenders: "pisano" },
          },
          "1per": {
            singular: {
              m: "pisałem",
              f: "pisałam",
            },
            plural: {
              virile: "pisaliśmy",
              nonvirile: "pisałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "pisałeś",
              f: "pisałaś",
            },
            plural: {
              virile: "pisaliście",
              nonvirile: "pisałyście",
            },
          },
          "3per": {
            singular: {
              m: "pisał",
              f: "pisała",
              n: "pisało",
            },
            plural: {
              virile: "pisali",
              nonvirile: "pisały",
            },
          },
        },
        present: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "piszę",
            },
            plural: {
              allPluralGenders: "piszemy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "piszesz",
            },
            plural: {
              allPluralGenders: "piszecie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "pisze",
            },
            plural: {
              allPluralGenders: "piszą",
            },
          },
        },
        future: true,
        conditional: true,
        imperative: "pisz",
      },
      activeAdjectival: "piszący",
      passiveAdjectival: "pisany",
      contemporaryAdverbial: "pisząc",
      anteriorAdverbial: false,
      verbalNoun: "pisanie",
    },
  },
  {
    //links
    translations: { ENG: ["write"] },
    tags: ["basic3"],
    //selectors
    lemma: "napisać",
    id: "pol-ver-004-pf-01",
    aspect: "perfective",
    //notes

    //inflections
    inflections: {
      infinitive: "napisać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "napisano" },
            plural: { allPluralGenders: "napisano" },
          },
          "1per": {
            singular: {
              m: "napisałem",
              f: "napisałam",
            },
            plural: {
              virile: "napisaliśmy",
              nonvirile: "napisałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "napisałeś",
              f: "napisałaś",
            },
            plural: {
              virile: "napisaliście",
              nonvirile: "napisałyście",
            },
          },
          "3per": {
            singular: {
              m: "napisał",
              f: "napisała",
              n: "napisało",
            },
            plural: {
              virile: "napisali",
              nonvirile: "napisały",
            },
          },
        },
        future: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "napiszę",
            },
            plural: {
              allPluralGenders: "napiszemy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "napiszesz",
            },
            plural: {
              allPluralGenders: "napiszecie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "napisze",
            },
            plural: {
              allPluralGenders: "napiszą",
            },
          },
        },
        present: false,
        conditional: true,
        imperative: "napisz",
      },
      activeAdjectival: false,
      passiveAdjectival: "napisany",
      contemporaryAdverbial: false,
      anteriorAdverbial: "napisawszy",
      verbalNoun: "napisanie",
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
          impersonal: { singular: true, plural: true },
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
        imperative: "czytaj",
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
    translations: { ENG: ["read"] },
    tags: ["basic2"],
    //selectors
    lemma: "przeczytać",
    id: "pol-ver-002-pf-01",
    aspect: "perfective",
    //notes

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
          impersonal: { singular: true, plural: true },
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
        imperative: "przeczytaj",
      },
      activeAdjectival: false,
      passiveAdjectival: "przeczytany",
      contemporaryAdverbial: false,
      anteriorAdverbial: "przeczytawszy",
      verbalNoun: "przeczytanie",
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
          impersonal: { singular: true, plural: true },
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
        imperative: "badaj",
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
    translations: { ENG: ["research"] },
    tags: ["science"],
    //selectors
    lemma: "zbadać",
    id: "pol-ver-003-pf-01",
    aspect: "perfective",
    //notes

    //inflections
    inflections: {
      infinitive: "zbadać",
      verbal: {
        past: {
          impersonal: {
            singular: { allSingularGenders: "zbadano" },
            plural: { allPluralGenders: "zbadano" },
          },
          "1per": {
            singular: {
              m: "zbadałem",
              f: "zbadałam",
            },
            plural: {
              virile: "zbadaliśmy",
              nonvirile: "zbadałyśmy",
            },
          },
          "2per": {
            singular: {
              m: "zbadałeś",
              f: "zbadałaś",
            },
            plural: {
              virile: "zbadaliście",
              nonvirile: "zbadałyście",
            },
          },
          "3per": {
            singular: {
              m: "zbadał",
              f: "zbadała",
              n: "zbadało",
            },
            plural: {
              virile: "zbadali",
              nonvirile: "zbadały",
            },
          },
        },
        present: false,
        future: {
          impersonal: { singular: true, plural: true },
          "1per": {
            singular: {
              allSingularGendersExcludingNeuter: "zbadam",
            },
            plural: {
              allPluralGenders: "zbadamy",
            },
          },
          "2per": {
            singular: {
              allSingularGendersExcludingNeuter: "zbadasz",
            },
            plural: {
              allPluralGenders: "zbadacie",
            },
          },
          "3per": {
            singular: {
              allSingularGenders: "zbada",
            },
            plural: {
              allPluralGenders: "zbadają",
            },
          },
        },
        conditional: true,
        imperative: "zbadaj",
      },
      activeAdjectival: false,
      passiveAdjectival: "zbadany",
      contemporaryAdverbial: false,
      anteriorAdverbial: "zbadawszy",
      verbalNoun: "zbadanie",
    },
  },
];

exports.wordsBank = {
  nounSet,
  adjectiveSet,
  verbSet,
  pronounSet,
};
