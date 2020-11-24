let nounSet = [
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
let verbSet = [];

exports.dummyWordsBank = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
