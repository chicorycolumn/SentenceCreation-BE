let nounSet = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];
let adjectiveSet = [];
let adverbSet = [];
let verbSet = [];

exports.dummyWords = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};
