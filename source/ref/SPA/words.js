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
      id: "spa-npe-002-padre",
      gender: "m",
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
