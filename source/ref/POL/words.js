//If you mark a traitKey true, or give it a traitValue      it will be filled out by fillVerbInflections fxn.
//If you mark a traitKey false, or omit it                   it will not be.

exports.wordsBank = {
  npe: [
    {
      //links
      translations: {
        ENG: ["eng-npe-001-woman"],
        POL: ["pol-npe-001-kobieta"],
      },
      tags: ["animate", "personTest1", "concrete"],
      //selectors
      lemma: "kobieta",
      id: "pol-npe-001-kobieta",
      gender: "f",
      //notes

      //inflections
      otherShapes: {
        diminutive: "kobietka",
      },
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
      translations: {
        ENG: ["eng-npe-003-father"],
        POL: ["pol-npe-003-ojciec"],
      },
      tags: ["animate", "family", "concrete"],
      //selectors
      lemma: "ojciec",
      id: "pol-npe-003-ojciec",
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
      translations: { ENG: ["eng-npe-004-mother"], POL: ["pol-npe-004-matka"] },
      tags: ["animate", "family", "concrete"],
      //selectors
      lemma: "matka",
      id: "pol-npe-004-matka",
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
    //   tags: ["animate", "personTest1", "concrete"],
    //   //selectors
    //   lemma: "chłopak",
    //   id: "pol-npe-002",
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
    //       nom: {
    // isTerminus: true,
    // normal: ["chłopacy"],
    // additionalFrequent: ["chłopaki"],
    //        },
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
      translations: { ENG: ["eng-npe-002-boy"], POL: ["pol-npe-002-chłopiec"] },
      tags: ["animate", "personTest1", "concrete"],
      //selectors
      lemma: "chłopiec",
      id: "pol-npe-002-chłopiec",
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
      translations: {
        ENG: ["eng-npe-005-doctor"],
        POL: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
      },
      tags: ["concrete", "animate", "personTest2", "job"],
      //selectors
      lemma: "lekarz",
      id: "pol-npe-005-lekarz",
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
      translations: {
        ENG: ["eng-npe-005-doctor"],
        POL: ["pol-npe-005-lekarz", "pol-npe-006-lekarka"],
      },
      tags: ["concrete", "animate", "personTest2", "job"],
      //selectors
      lemma: "lekarka",
      id: "pol-npe-006-lekarka",
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
  ],
  nco: [
    {
      //links
      translations: {
        ENG: ["eng-nco-001-bear"],
        POL: ["pol-nco-001-niedźwiedź"],
      },
      tags: ["allohomTesting2", "animal"],
      //selectors
      lemma: "niedźwiedź",
      id: "pol-nco-001-niedźwiedź",
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
      translations: { ENG: ["eng-nco-002-onion"], POL: ["pol-nco-002-cebula"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "cebula",
      id: "pol-nco-002-cebula",
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
      translations: { ENG: ["eng-nco-004-apple"], POL: ["pol-nco-004-jabłko"] },
      tags: ["inanimate", "edible", "holdable", "concrete"],
      //selectors
      lemma: "jabłko",
      id: "pol-nco-004-jabłko",
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
      translations: {
        ENG: ["eng-nco-003-tomato"],
        POL: ["pol-nco-003-pomidor"],
      },
      tags: ["inanimate", "edible0", "holdable", "concrete"],
      //selectors
      lemma: "pomidor",
      id: "pol-nco-003-pomidor",
      gender: "m2",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "pomidor",
          gen: "pomidora",
          dat: "pomidorowi",
          acc: {
            isTerminus: true,
            normal: ["pomidor"],
            additionalFrequent: ["pomidora"],
          },
          ins: "pomidorem",
          loc: "pomidorze",
        },
        plural: {
          nom: "pomidory",
          gen: "pomidorów",
          dat: "pomidorom",
          acc: "pomidory",
          ins: "pomidorami",
          loc: "pomidorach",
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-nco-009-dust"], POL: ["pol-nco-009-pył"] },
      tags: ["tantumTest1"],
      //selectors
      lemma: "pył",
      id: "pol-nco-009-pył",
      gender: "m3",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "pył",
          gen: "pyła",
          dat: "pyłowi",
          acc: "pył",
          ins: "pyłem",
          loc: "pyle",
        },
        plural: {
          nom: "pyły",
          gen: "pyłów",
          dat: "pyłom",
          acc: "pyły",
          ins: "pyłami",
          loc: "pyłach",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-005-mirror"],
        POL: ["pol-nco-005-lustro", "pol-nco-014-zwierciadło"],
      },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "lustro",
      id: "pol-nco-005-lustro",
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
      translations: {
        ENG: ["eng-nco-005-mirror"],
        POL: ["pol-nco-005-lustro", "pol-nco-014-zwierciadło"],
      },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "zwierciadło",
      id: "pol-nco-014-zwierciadło",
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
      translations: { ENG: ["eng-nco-006-book"], POL: ["pol-nco-006-książka"] },
      tags: ["inanimate", "holdable", "concrete"],
      //selectors
      lemma: "książka",
      id: "pol-nco-006-książka",
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
      translations: { ENG: ["eng-nco-007-door"], POL: ["pol-nco-007-drzwi"] },
      tags: ["inanimate", "house", "concrete"],
      //selectors
      lemma: "drzwi",
      id: "pol-nco-007-drzwi",
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
        ENG: ["eng-nco-010-underwear"],
        POL: ["pol-nco-010-majtki"],
      },
      tags: ["inanimate", "holdable", "concrete", "wearable"],
      //selectors
      lemma: "majtki",
      id: "pol-nco-010-majtki",
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
      translations: { ENG: ["eng-nco-008-sheep"], POL: ["pol-nco-008-owca"] },
      tags: ["concrete", "animal0", "animate", "farmyard"],
      //selectors
      lemma: "owca",
      id: "pol-nco-008-owca",
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
      translations: { ENG: ["eng-nco-011-rat"], POL: ["pol-nco-011-szczur"] },
      tags: ["concrete", "animal", "animate", "pet"],
      //selectors
      lemma: "szczur",
      id: "pol-nco-011-szczur",
      gender: "m2",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "szczur",
          gen: "szczura",
          dat: "szczurowi",
          acc: "szczura",
          ins: "szczurem",
          loc: "szczurze",
        },
        plural: {
          nom: "szczury",
          gen: "szczurów",
          dat: "szczurom",
          acc: "szczury",
          ins: "szczurami",
          loc: "szczurach",
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-nco-012-tweezers"],
        POL: ["pol-nco-012-pinceta"],
      },
      tags: ["tantumTest1"],
      //selectors
      lemma: "pinceta",
      id: "pol-nco-012-pinceta",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "pinceta",
          gen: "pincety",
          dat: "pincecie",
          acc: "pincetę",
          ins: "pincetą",
          loc: "pincecie",
        },
        plural: {
          nom: "pincety",
          gen: "pincet",
          dat: "pincetom",
          acc: "pincety",
          ins: "pincetami",
          loc: "pincetach",
        },
      },
    },
  ],
  ver: [
    {
      //links
      translations: {
        ENG: ["eng-ver-006-give"],
        POL: ["pol-ver-006-dać", "pol-ver-006-dawać"],
      },
      tags: [],
      //selectors
      lemma: "dawać",
      id: "pol-ver-006-dawać",
      aspect: "imperfective",
      //notes

      //inflections
      inflections: {
        infinitive: "dawać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "dawano" },
              plural: { _allPluralGenders: "dawano" },
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
                _allSingularGendersExcludingNeuter: "daję",
              },
              plural: {
                _allPluralGenders: "dajemy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "dajesz",
              },
              plural: {
                _allPluralGenders: "dajecie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "daje",
              },
              plural: {
                _allPluralGenders: "dają",
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
      translations: {
        ENG: ["eng-ver-006-give"],
        POL: ["pol-ver-006-dać", "pol-ver-006-dawać"],
      },
      tags: [],
      //selectors
      lemma: "dać",
      id: "pol-ver-006-dać",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "dać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "dano" },
              plural: { _allPluralGenders: "dano" },
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
                _allSingularGendersExcludingNeuter: "dam",
              },
              plural: {
                _allPluralGenders: "damy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "dasz",
              },
              plural: {
                _allPluralGenders: "dacie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "da",
              },
              plural: {
                _allPluralGenders: "dadzą",
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
      translations: { ENG: ["eng-ver-001-be"], POL: ["pol-ver-001-być"] },
      tags: ["basic", "identity"],
      //selectors
      lemma: "być",
      id: "pol-ver-001-być",
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
      translations: { ENG: ["eng-ver-002-have"], POL: ["pol-ver-002-mieć"] },
      tags: ["basic", "possession"],
      //selectors
      lemma: "mieć",
      id: "pol-ver-002-mieć",
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
              singular: { _allSingularGenders: "miano" },
              plural: { _allPluralGenders: "miano" },
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
                _allSingularGendersExcludingNeuter: "mam",
              },
              plural: {
                _allPluralGenders: "mamy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "masz",
              },
              plural: {
                _allPluralGenders: "macie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "ma",
              },
              plural: {
                _allPluralGenders: "mają",
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
      translations: {
        ENG: ["eng-ver-005-write"],
        POL: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
      },
      tags: ["basic3"],
      //selectors
      lemma: "pisać",
      id: "pol-ver-005-pisać",
      aspect: "imperfective",
      //notes

      //inflections
      inflections: {
        infinitive: "pisać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "pisano" },
              plural: { _allPluralGenders: "pisano" },
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
                _allSingularGendersExcludingNeuter: "piszę",
              },
              plural: {
                _allPluralGenders: "piszemy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "piszesz",
              },
              plural: {
                _allPluralGenders: "piszecie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "pisze",
              },
              plural: {
                _allPluralGenders: "piszą",
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
      translations: {
        ENG: ["eng-ver-005-write"],
        POL: ["pol-ver-005-pisać", "pol-ver-005-napisać"],
      },
      tags: ["basic3"],
      //selectors
      lemma: "napisać",
      id: "pol-ver-005-napisać",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "napisać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "napisano" },
              plural: { _allPluralGenders: "napisano" },
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
                _allSingularGendersExcludingNeuter: "napiszę",
              },
              plural: {
                _allPluralGenders: "napiszemy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "napiszesz",
              },
              plural: {
                _allPluralGenders: "napiszecie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "napisze",
              },
              plural: {
                _allPluralGenders: "napiszą",
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
      translations: {
        ENG: ["eng-ver-003-read"],
        POL: ["pol-ver-003-czytać", "pol-ver-003-przeczytać"],
      },
      tags: ["basic2"],
      //selectors
      lemma: "czytać",
      id: "pol-ver-003-czytać",
      aspect: "imperfective",
      //notes

      //inflections
      inflections: {
        infinitive: "czytać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "czytano" },
              plural: { _allPluralGenders: "czytano" },
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
                _allSingularGendersExcludingNeuter: "czytam",
              },
              plural: {
                _allPluralGenders: "czytamy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "czytasz",
              },
              plural: {
                _allPluralGenders: "czytacie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "czyta",
              },
              plural: {
                _allPluralGenders: "czytają",
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
      translations: {
        ENG: ["eng-ver-003-read"],
        POL: ["pol-ver-003-czytać", "pol-ver-003-przeczytać"],
      },
      tags: ["basic2"],
      //selectors
      lemma: "przeczytać",
      id: "pol-ver-003-przeczytać",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "przeczytać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "przeczytano" },
              plural: { _allPluralGenders: "przeczytano" },
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
                _allSingularGendersExcludingNeuter: "przeczytam",
              },
              plural: {
                _allPluralGenders: "przeczytamy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "przeczytasz",
              },
              plural: {
                _allPluralGenders: "przeczytacie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "przeczyta",
              },
              plural: {
                _allPluralGenders: "przeczytają",
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
      translations: {
        ENG: ["eng-ver-004-research"],
        POL: ["pol-ver-004-badać", "pol-ver-004-zbadać"],
      },
      tags: ["science"],
      //selectors
      lemma: "badać",
      id: "pol-ver-004-badać",
      aspect: "imperfective",
      //notes

      //inflections
      inflections: {
        infinitive: "badać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "badano" },
              plural: { _allPluralGenders: "badano" },
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
                _allSingularGendersExcludingNeuter: "badam",
              },
              plural: {
                _allPluralGenders: "badamy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "badasz",
              },
              plural: {
                _allPluralGenders: "badacie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "bada",
              },
              plural: {
                _allPluralGenders: "badają",
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
      translations: {
        ENG: ["eng-ver-004-research"],
        POL: ["pol-ver-004-badać", "pol-ver-004-zbadać"],
      },
      tags: ["science"],
      //selectors
      lemma: "zbadać",
      id: "pol-ver-004-zbadać",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "zbadać",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "zbadano" },
              plural: { _allPluralGenders: "zbadano" },
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
                _allSingularGendersExcludingNeuter: "zbadam",
              },
              plural: {
                _allPluralGenders: "zbadamy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "zbadasz",
              },
              plural: {
                _allPluralGenders: "zbadacie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "zbada",
              },
              plural: {
                _allPluralGenders: "zbadają",
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
    {
      //links
      translations: {
        ENG: ["eng-ver-008-see"],
        POL: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
      },
      tags: ["basic1"],
      //selectors
      lemma: "widzieć",
      id: "pol-ver-008-widzieć",
      aspect: "imperfective",
      //notes

      //inflections
      inflections: {
        infinitive: "widzieć",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "widziano" },
              plural: { _allPluralGenders: "widziano" },
            },
            "1per": {
              singular: {
                m: "widziałem",
                f: "widziałam",
              },
              plural: {
                virile: "widzieliśmy",
                nonvirile: "widziałyśmy",
              },
            },
            "2per": {
              singular: {
                m: "widziałeś",
                f: "widziałaś",
              },
              plural: {
                virile: "widzieliście",
                nonvirile: "widziałyście",
              },
            },
            "3per": {
              singular: {
                m: "widział",
                f: "widziała",
                n: "widziało",
              },
              plural: {
                virile: "widzieli",
                nonvirile: "widziały",
              },
            },
          },
          present: {
            impersonal: { singular: true, plural: true },
            "1per": {
              singular: {
                _allSingularGendersExcludingNeuter: "widzę",
              },
              plural: {
                _allPluralGenders: "widzimy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "widzisz",
              },
              plural: {
                _allPluralGenders: "widzicie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "widzi",
              },
              plural: {
                _allPluralGenders: "widzą",
              },
            },
          },
          future: true,
          conditional: true,
          imperative: "widź",
        },
        activeAdjectival: "	widzący",
        passiveAdjectival: "widziany",
        contemporaryAdverbial: "widząc",
        anteriorAdverbial: false,
        verbalNoun: "widzenie",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-ver-008-see"],
        POL: ["pol-ver-008-widzieć", "pol-ver-008-zobaczyć"],
      },
      tags: ["basic1"],
      //selectors
      lemma: "zobaczyć",
      id: "pol-ver-008-zobaczyć",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "zobaczyć",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "zobaczono" },
              plural: { _allPluralGenders: "zobaczono" },
            },
            "1per": {
              singular: {
                m: "zobaczyłem",
                f: "zobaczyłam",
              },
              plural: {
                virile: "zobaczyliśmy",
                nonvirile: "zobaczyłyśmy",
              },
            },
            "2per": {
              singular: {
                m: "zobaczyłeś",
                f: "zobaczyłaś",
              },
              plural: {
                virile: "zobaczyliście",
                nonvirile: "zobaczyłyście",
              },
            },
            "3per": {
              singular: {
                m: "zobaczył",
                f: "zobaczyła",
                n: "zobaczyło",
              },
              plural: {
                virile: "zobaczyli",
                nonvirile: "zobaczyły",
              },
            },
          },
          present: false,
          future: {
            impersonal: { singular: true, plural: true },
            "1per": {
              singular: {
                _allSingularGendersExcludingNeuter: "zobaczę",
              },
              plural: {
                _allPluralGenders: "zobaczymy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "zobaczysz",
              },
              plural: {
                _allPluralGenders: "zobaczycie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "zobaczy",
              },
              plural: {
                _allPluralGenders: "zobaczą",
              },
            },
          },
          conditional: true,
          imperative: "zobacz",
        },
        activeAdjectival: false,
        passiveAdjectival: "zobaczony",
        contemporaryAdverbial: false,
        anteriorAdverbial: "zobaczywszy",
        verbalNoun: "zobaczenie",
      },
    },
    {
      //links
      translations: { ENG: ["eng-ver-007-bear"], POL: ["pol-ver-007-znieść"] },
      tags: ["allohomTesting2", "emotions"],
      //selectors
      lemma: "znieść",
      id: "pol-ver-007-znieść",
      aspect: "perfective",
      //notes

      //inflections
      inflections: {
        infinitive: "znieść",
        verbal: {
          past: {
            impersonal: {
              singular: { _allSingularGenders: "zniesiono" },
              plural: { _allPluralGenders: "zniesiono" },
            },
            "1per": {
              singular: {
                m: "zniósłem",
                f: "zniosłam",
              },
              plural: {
                virile: "znieśliśmy",
                nonvirile: "zniosłyśmy",
              },
            },
            "2per": {
              singular: {
                m: "zniósłeś",
                f: "zniosłaś",
              },
              plural: {
                virile: "znieśliście",
                nonvirile: "zniosłyście",
              },
            },
            "3per": {
              singular: {
                m: "zniósł",
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
                _allSingularGendersExcludingNeuter: "zniosę",
              },
              plural: {
                _allPluralGenders: "zniesiemy",
              },
            },
            "2per": {
              singular: {
                _allSingularGendersExcludingNeuter: "zniesiesz",
              },
              plural: {
                _allPluralGenders: "zniesiecie",
              },
            },
            "3per": {
              singular: {
                _allSingularGenders: "zniesie",
              },
              plural: {
                _allPluralGenders: "zniosą",
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
  ],
  adj: [
    {
      //links
      translations: { ENG: ["eng-adj-001-red"], POL: ["pol-adj-001-czerwony"] },
      tags: ["colour"],
      //selectors
      lemma: "czerwony",
      id: "pol-adj-001-czerwony",
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
        comparative: {
          isTerminus: true,
          normal: ["czerwieńszy"],
          isRegular: true,
        },
        superlative: {
          isTerminus: true,
          normal: ["najczerwieńszy"],
          isRegular: true,
        },
        adverb: "czerwono",
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-adj-003-blue"],
        POL: ["pol-adj-003-niebieski"],
      },
      tags: ["colour2"],
      //selectors
      lemma: "niebieski",
      id: "pol-adj-003-niebieski",
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
        comparative: { isTerminus: true, normal: [""], isRegular: true },
        superlative: { isTerminus: true, normal: [""], isRegular: true },
        adverb: "niebiesko",
      },
    },
    {
      //links
      translations: { ENG: ["eng-adj-002-small"], POL: ["pol-adj-002-mały"] },
      tags: ["size"],
      //selectors
      lemma: "mały",
      id: "pol-adj-002-mały",
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
        comparative: {
          isTerminus: true,
          normal: ["mniejszy"],
          isRegular: true,
        },
        superlative: {
          isTerminus: true,
          normal: ["najmniejszy"],
          isRegular: true,
        },
        adverb: "mało",
      },
    },
  ],
  pro: [
    {
      //links
      translations: { ENG: ["eng-pro-PERSONAL"], POL: ["pol-pro-PERSONAL"] },
      tags: [],
      //selectors
      lemma: "$PERSONAL",
      id: "pol-pro-PERSONAL",
      //notes

      //inflections
      inflections: {
        pronombre: {
          "1per": {
            singular: {
              m1: {
                nom: "ja",
                gen: "mnie",
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["mi"],
                  stressed: ["mnie"], //alpha, wait what?
                },
                acc: "mnie",
                ins: "mną",
                loc: "mnie",
              },
              f: {
                nom: "ja",
                gen: "mnie",
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["mi"],
                  stressed: ["mnie"],
                },
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
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["cię"],
                  stressed: ["ciebie"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ci"],
                  stressed: ["tobie"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["cię"],
                  stressed: ["ciebie"],
                },
                ins: "tobą",
                loc: "tobie",
              },
              f: {
                nom: "ty",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["cię"],
                  stressed: ["ciebie"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ci"],
                  stressed: ["tobie"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["cię"],
                  stressed: ["ciebie"],
                },
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
          "3per": {
            singular: {
              _allMasculineSingularGenders: {
                nom: "on",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["go"],
                  stressed: ["jego"],
                  postPreposition: ["niego"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["mu"],
                  stressed: ["jemu"],
                  postPreposition: ["niemu"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["go"],
                  stressed: ["jego"],
                  postPreposition: ["niego"],
                },
                ins: "nim",
                loc: "nim",
              },
              f: {
                nom: "ona",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["jej"],
                  stressed: ["jej"],
                  postPreposition: ["niej"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["jej"],
                  stressed: ["jej"],
                  postPreposition: ["niej"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ją"],
                  stressed: ["ją"],
                  postPreposition: ["nią"],
                },
                ins: "nią",
                loc: "niej",
              },
              n: {
                nom: "ono",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["go"],
                  stressed: ["jego"],
                  postPreposition: ["niego"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["mu"],
                  stressed: ["jemu"],
                  postPreposition: ["niemu"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["je"],
                  stressed: ["je"],
                  postPreposition: ["nie"],
                },
                ins: "nim",
                loc: "nim",
              },
            },
            plural: {
              virile: {
                nom: "oni",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ich"],
                  stressed: ["ich"],
                  postPreposition: ["nich"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["im"],
                  stressed: ["im"],
                  postPreposition: ["nim"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ich"],
                  stressed: ["ich"],
                  postPreposition: ["nich"],
                },
                ins: "nimi",
                loc: "nich",
              },
              nonvirile: {
                nom: "one",
                gen: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["ich"],
                  stressed: ["ich"],
                  postPreposition: ["nich"],
                },
                dat: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["im"],
                  stressed: ["im"],
                  postPreposition: ["nim"],
                },
                acc: {
                  isTerminus: true,
                  processOnlyAtEnd: true,
                  unstressed: ["je"],
                  stressed: ["je"],
                  postPreposition: ["nie"],
                },
                ins: "nimi",
                loc: "nich",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: {
        ENG: ["eng-pro-POSSESSIVE"],
        POL: ["pol-pro-POSSESSIVE"],
      },
      tags: [],
      //selectors
      lemma: "$POSSESSIVE",
      id: "pol-pro-POSSESSIVE",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          "1per": {
            singular: {
              _allPersonalSingularGenders: {
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
              _allPluralGenders: {
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
              _allPersonalSingularGenders: {
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
              _allPluralGenders: {
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
          "3per": {
            singular: {
              _allMasculineSingularGenders: {
                singular: {
                  _allSingularGenders: {
                    nom: "jego",
                    gen: "jego",
                    dat: "jego",
                    acc: "jego",
                    ins: "jego",
                    loc: "jego",
                  },
                },
                plural: {
                  _allPluralGenders: {
                    nom: "jego",
                    gen: "jego",
                    dat: "jego",
                    acc: "jego",
                    ins: "jego",
                    loc: "jego",
                  },
                },
              },
              f: {
                singular: {
                  _allSingularGenders: {
                    nom: "jej",
                    gen: "jej",
                    dat: "jej",
                    acc: "jej",
                    ins: "jej",
                    loc: "jej",
                  },
                },
                plural: {
                  _allPluralGenders: {
                    nom: "jej",
                    gen: "jej",
                    dat: "jej",
                    acc: "jej",
                    ins: "jej",
                    loc: "jej",
                  },
                },
              },
              n: {
                singular: {
                  _allSingularGenders: {
                    nom: "jego",
                    gen: "jego",
                    dat: "jego",
                    acc: "jego",
                    ins: "jego",
                    loc: "jego",
                  },
                },
                plural: {
                  _allPluralGenders: {
                    nom: "jego",
                    gen: "jego",
                    dat: "jego",
                    acc: "jego",
                    ins: "jego",
                    loc: "jego",
                  },
                },
              },
            },
            plural: {
              _allPluralGenders: {
                singular: {
                  _allSingularGenders: {
                    nom: "ich",
                    gen: "ich",
                    dat: "ich",
                    acc: "ich",
                    ins: "ich",
                    loc: "ich",
                  },
                },
                plural: {
                  _allPluralGenders: {
                    nom: "ich",
                    gen: "ich",
                    dat: "ich",
                    acc: "ich",
                    ins: "ich",
                    loc: "ich",
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_A"], POL: ["pol-pro-ITG_A"] },
      tags: [],
      //selectors
      lemma: "$ITG_A",
      id: "pol-pro-ITG_A",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            singular: {
              _allSingularGenders: {
                nom: "co",
                gen: "czego",
                dat: "czym",
                acc: "co",
                ins: "czym",
                loc: "czym",
              },
            },
            plural: {
              _allPluralGenders: {
                nom: "co",
                gen: "czego",
                dat: "czym",
                acc: "co",
                ins: "czym",
                loc: "czym",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_B"], POL: ["pol-pro-ITG_B"] },
      tags: [],
      //selectors
      lemma: "$ITG_B",
      id: "pol-pro-ITG_B",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            singular: {
              m1: {
                nom: "który",
                gen: "którego",
                dat: "któremu",
                acc: "którego",
                ins: "którym",
                loc: "którym",
              },
              m3: {
                nom: "który",
                gen: "którego",
                dat: "któremu",
                acc: "który",
                ins: "którym",
                loc: "którym",
              },
              f: {
                nom: "która",
                gen: "której",
                dat: "której",
                acc: "którą",
                ins: "którą",
                loc: "której",
              },
              n: {
                nom: "które",
                gen: "którego",
                dat: "któremu",
                acc: "które",
                ins: "którym",
                loc: "którym",
              },
            },
            plural: {
              virile: {
                nom: "którzy",
                gen: "których",
                dat: "którym",
                acc: "których",
                ins: "którymi",
                loc: "których",
              },
              nonvirile: {
                nom: "które",
                gen: "których",
                dat: "którym",
                acc: "które",
                ins: "którymi",
                loc: "których",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_C"], POL: ["pol-pro-ITG_C"] },
      tags: [],
      //selectors
      lemma: "$ITG_C",
      id: "pol-pro-ITG_C",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                _allGcases: "kiedy",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_D"], POL: ["pol-pro-ITG_D"] },
      tags: [],
      //selectors
      lemma: "$ITG_D",
      id: "pol-pro-ITG_D",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                _allGcases: "gdzie",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_E"], POL: ["pol-pro-ITG_E"] },
      tags: [],
      //selectors
      lemma: "$ITG_E",
      id: "pol-pro-ITG_E",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                _allGcases: "jak",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_F"], POL: ["pol-pro-ITG_F"] },
      tags: [],
      //selectors
      lemma: "$ITG_F",
      id: "pol-pro-ITG_F",
      //notes

      //inflections
      inflections: {
        pronombre: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                _allGcases: "dlaczego",
              },
            },
          },
        },
        determiner: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                _allGcases: "dlatego",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_G"], POL: ["pol-pro-ITG_G"] },
      tags: [],
      //selectors
      lemma: "$ITG_G",
      id: "pol-pro-ITG_G",
      //notes

      //inflections
      inflections: {
        pronombre: {
          _allPers: {
            _allNumbers: {
              _allGenders: {
                nom: "kto",
                gen: "kogo",
                dat: "komu",
                acc: "kogo",
                ins: "kim",
                loc: "kim",
              },
            },
          },
        },
        determiner: {
          _allPers: {
            singular: {
              m1: {
                nom: "który",
                gen: "którego",
                dat: "któremu",
                acc: "którego",
                ins: "którym",
                loc: "którym",
              },
              m3: {
                nom: "który",
                gen: "którego",
                dat: "któremu",
                acc: "który",
                ins: "którym",
                loc: "którym",
              },
              f: {
                nom: "która",
                gen: "której",
                dat: "której",
                acc: "którą",
                ins: "którą",
                loc: "której",
              },
              n: {
                nom: "które",
                gen: "którego",
                dat: "któremu",
                acc: "które",
                ins: "którym",
                loc: "którym",
              },
            },
            plural: {
              virile: {
                nom: "którzy",
                gen: "których",
                dat: "którym",
                acc: "których",
                ins: "którymi",
                loc: "których",
              },
              nonvirile: {
                nom: "które",
                gen: "których",
                dat: "którym",
                acc: "które",
                ins: "którymi",
                loc: "których",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_J"], POL: ["pol-pro-ITG_J"] },
      tags: [],
      //selectors
      lemma: "$ITG_J",
      id: "pol-pro-ITG_J",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            singular: {
              m1: {
                nom: "taki",
                gen: "takiego",
                dat: "takiemu",
                acc: "takiego",
                ins: "takim",
                loc: "takim",
              },
              m3: {
                nom: "taki",
                gen: "takiego",
                dat: "takiemu",
                acc: "takiy",
                ins: "takim",
                loc: "takim",
              },
              f: {
                nom: "taka",
                gen: "takiej",
                dat: "takiej",
                acc: "taką",
                ins: "taką",
                loc: "takiej",
              },
              n: {
                nom: "takie",
                gen: "takiego",
                dat: "takiemu",
                acc: "takie",
                ins: "takim",
                loc: "takim",
              },
            },
            plural: {
              virile: {
                nom: "tacy",
                gen: "takich",
                dat: "takim",
                acc: "takich",
                ins: "takimi",
                loc: "takich",
              },
              nonvirile: {
                nom: "takie",
                gen: "takich",
                dat: "takim",
                acc: "takie",
                ins: "takimi",
                loc: "takich",
              },
            },
          },
        },
      },
    },
    {
      //links
      translations: { ENG: ["eng-pro-ITG_K"], POL: ["pol-pro-ITG_K"] },
      tags: [],
      //selectors
      lemma: "$ITG_K",
      id: "pol-pro-ITG_K",
      //notes

      //inflections
      inflections: {
        _pronombreAndDeterminer: {
          _allPers: {
            singular: {
              m1: {
                nom: "jaki",
                gen: "jakiego",
                dat: "jakiemu",
                acc: "jakiego",
                ins: "jakim",
                loc: "jakim",
              },
              m3: {
                nom: "jaki",
                gen: "jakiego",
                dat: "jakiemu",
                acc: "jakiy",
                ins: "jakim",
                loc: "jakim",
              },
              f: {
                nom: "jaka",
                gen: "jakiej",
                dat: "jakiej",
                acc: "jaką",
                ins: "jaką",
                loc: "jakiej",
              },
              n: {
                nom: "jakie",
                gen: "jakiego",
                dat: "jakiemu",
                acc: "jakie",
                ins: "jakim",
                loc: "jakim",
              },
            },
            plural: {
              virile: {
                nom: "jacy",
                gen: "jakich",
                dat: "jakim",
                acc: "jakich",
                ins: "jakimi",
                loc: "jakich",
              },
              nonvirile: {
                nom: "jakie",
                gen: "jakich",
                dat: "jakim",
                acc: "jakie",
                ins: "jakimi",
                loc: "jakich",
              },
            },
          },
        },
      },
    },
  ],
  pre: [
    {
      //links
      translations: { ENG: ["eng-pre-001-with"], POL: ["pol-pre-001-z"] },
      tags: [],
      //selectors
      lemma: "z",
      id: "pol-pre-001-z",
      //notes

      //inflections
      inflections: {
        onlyForm: {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["z"],
          protective: ["ze"],
          protectIfSubsequentStartsWith: ["mn", "szcz"],
        },
      },
    },
  ],
  art: [],
};
