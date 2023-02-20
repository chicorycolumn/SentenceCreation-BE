//If you mark a traitKey true, or give it a traitValue      it will be filled out by fillVerbInflections fxn.
//If you mark a traitKey false, or omit it                   it will not be.

exports.wordsBank = {
  npe: [
    {
      //selectors
      lemma: "madre",
      id: "spa-npe-002-madre",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "madre",
          gen: "de la madre",
        },
        plural: {
          nom: "madres",
          gen: "de las madres",
        },
      },
    },
    {
      //selectors
      lemma: "padre",
      id: "spa-npe-002-padre-€",
      gender: "m",
      semanticGender: "_VypernymGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "padre",
          gen: "del padre",
        },
        plural: {
          nom: "padres",
          gen: "de los padres",
        },
      },
    },
    {
      //selectors
      lemma: "chica",
      id: "spa-npe-003-chica",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "chica",
          gen: "de la chica",
        },
        plural: {
          nom: "chica",
          gen: "de las chicas",
        },
      },
    },
    {
      //selectors
      lemma: "chico",
      id: "spa-npe-003-chico-€",
      gender: "m",
      semanticGender: "_VypernymGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "chico",
          gen: "del chico",
        },
        plural: {
          nom: "chicos",
          gen: "de los chicos",
        },
      },
    },
    {
      //selectors
      lemma: "niña",
      id: "spa-npe-004-niña",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "niña",
          gen: "de la niña",
        },
        plural: {
          nom: "niñas",
          gen: "de las niñas",
        },
      },
    },
    {
      //selectors
      lemma: "niño",
      id: "spa-npe-004-niño-€",
      gender: "m",
      semanticGender: "_VypernymGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "niño",
          gen: "del niño",
        },
        plural: {
          nom: "niños",
          gen: "de los niños",
        },
      },
    },
    {
      //selectors
      lemma: "medico",
      id: "spa-npe-001-medico-€",
      gender: "m",
      semanticGender: "_VypernymGenders",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "medico",
          gen: "del medico",
        },
        plural: {
          nom: "medicos",
          gen: "de los medicos",
        },
      },
    },
    {
      //selectors
      lemma: "medica",
      id: "spa-npe-001-medica",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "medica",
          gen: "de la medica",
        },
        plural: {
          nom: "medicas",
          gen: "de las medicas",
        },
      },
    },
  ],
  ver: [],
  pro: [],
  pre: [],
  art: [],
  adj: [
    {
      //selectors
      lemma: "rojo",
      id: "spa-adj-001-rojo",
      //notes

      //inflections
      inflections: {
        simple: {
          singular: {
            m: "rojo",
            f: "roja",
          },
          plural: {
            virile: "rojos",
            nonvirile: "rojas",
          },
        },
        comparative: false,
        superlative: false,
        adverb: false,
      },
    },
    {
      //selectors
      lemma: "bueno",
      id: "spa-adj-002-bueno",
      //notes

      //inflections
      inflections: {
        simple: {
          singular: {
            m: "bueno", //Alpha, before nouns this is "buen" so need terminus obj here.
            f: "buena",
          },
          plural: {
            virile: "buenos",
            nonvirile: "buenas",
          },
        },
        comparative: "mejor",
        superlative: true, // alpha programmatically build this once gender is known.
        adverb: "bien",
      },
    },
  ],
  nco: [
    {
      //selectors
      lemma: "oso",
      id: "spa-nco-002-oso",
      gender: "m",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "oso",
          gen: "del oso",
        },
        plural: {
          nom: "osos",
          gen: "de los osos",
        },
      },
    },
    {
      //selectors
      lemma: "cebolla",
      id: "spa-nco-001-cebolla",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "cebolla",
          gen: "de la cebolla",
        },
        plural: {
          nom: "cebollas",
          gen: "de las cebollas",
        },
      },
    },
  ],
};
