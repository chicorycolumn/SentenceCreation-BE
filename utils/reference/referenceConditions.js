exports.conditionsOnWhichToBlockAnnotations = {
  POL: {
    noun: {
      //Here it's answerChunk {{POL}} {{nouns}}, as the nouns are what'll be clarified for their verbs.
      gender: [
        //If answerLang {{POL}},
        //           if wordtype {{noun}},
        //                     please block the {{gender}} annotation...
        //
        //...if any of these condition objects have all their conditions met, by the headCh or depCh.
        {
          tenseDescription: [
            "present im",
            "imperative im",
            "future pf",
            "imperative pf",
          ],
        },
        {
          person: ["impersonal"],
        },
      ],
    },
    pronoun: {
      gender: [
        {
          tenseDescription: [
            "present im",
            "imperative im",
            "future pf",
            "imperative pf",
          ],
        },
        {
          person: ["impersonal"],
        },
        {
          person: ["1per", "2per"],
          gcase: ["gen", "dat", "acc", "ins", "loc"],
        },
        { form: ["determiner"] },
      ],
    },
  },
  ENG: {
    noun: {
      gender: [
        {
          person: ["1per", "2per"],
        },
        {
          person: ["3per"],
          number: ["plural"],
        },
      ],
    },
    pronoun: {
      form: [
        {
          allConditions: true,
        },
      ],
      gender: [
        {
          person: ["1per", "2per"],
        },
        {
          person: ["3per"],
          number: ["plural"],
        },
      ],
    },
  },
};

exports.postHocDependentChunkWordtypes = {
  ENG: [],
  POL: [
    {
      PHD_type: "POL possessive pronoun",
      conditions: { wordtype: "pronoun", specificLemmas: ["POSSESSIVE"] },
      inflectionChains: {
        postHocAgreeWithPrimary: ["form", "person", "number", "gender"],
        postHocAgreeWithSecondary: ["number", "gender", "gcase"],
      },
    },
  ],
};
