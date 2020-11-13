let nounSet = {
  44: {
    lemma: "kobieta",
    gender: "f",
    tags: ["animate", "person", "concrete"],
    defective: false,
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
  194: {
    lemma: "chłopak",
    gender: "m1",
    tags: ["animate", "person", "concrete"],
    defective: false,
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
  250: {
    lemma: "cebula",
    gender: "f",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    defective: false,
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
  471: {
    lemma: "jabłko",
    gender: "n",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    defective: false,
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
  713: {
    lemma: "lustro",
    gender: "n",
    tags: ["inanimate", "holdable", "concrete"],
    defective: false,
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
  786: {
    lemma: "majtki",
    gender: "f",
    tags: ["inanimate", "holdable", "concrete", "wearable"],
    defective: true,
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
};
let adjectiveSet = {};
let adverbSet = {};
let verbSet = {};
let dummyNoun = {
  dummy01: {
    lemma: "foobar_loc_only",
    gender: "n",
    tags: ["dummy"],
    defective: true,
    inflections: {
      singular: {
        loc: "foobar_sin_loc",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  dummy02: {
    lemma: "foobar_ins_only",
    gender: "n",
    tags: ["dummy"],
    defective: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        ins: "foobar_plu_ins",
      },
    },
  },
  dummy03: {
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    tags: ["dummy2"],
    defective: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  dummy04: {
    lemma: "foobar_sin_ins_plu_loc_only",
    gender: "n",
    tags: ["dummy3"],
    defective: true,
    inflections: {
      singular: {
        ins: "foobar_sin_ins",
      },
      plural: {
        loc: "foobar_plu_loc",
      },
    },
  },
  dummy05: {
    lemma: "foobar_sin_loc_plu_ins_only",
    gender: "n",
    tags: ["dummy3"],
    defective: true,
    inflections: {
      singular: {
        loc: "foobar_sin_loc",
      },
      plural: {
        ins: "foobar_plu_ins",
      },
    },
  },
  dummy06: {
    lemma: "foobar_none",
    gender: "n",
    tags: ["dummy3"],
    defective: true,
    inflections: {
      plural: {
        loc: "foobar_plu_loc",
        ins: "foobar_plu_ins",
      },
    },
  },
};
let dummyAdjective = {};
let dummyAdverb = {};
let dummyVerb = {};

exports.wordbank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
  dummyNoun,
  dummyAdjective,
  dummyAdverb,
  dummyVerb,
};
