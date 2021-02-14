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

exports.metaInflectorsToForceMultiple = {
  ENG: {
    article: {
      form: {
        both: ["definite", "indefinite"],
        all: ["definite", "indefinite", "zero"],
      },
    },
  },
  POL: {},
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

exports.requestedSpecifiers_not_used = {
  POL: {
    verb: [
      //For A stCh verbs:
      //   if they or their headCh fulfil the .condition,
      //   AND
      //   if they or their headCh don't have the featureKey from .action
      //   THEN
      //   add the featureKey and value from action to the A stCh, and note it in headCh Specifiers.
      {
        negativeCondition: {
          // If actionKey is gender, and the A stCh we're looking at is PERSON,
          // then abort. Gender does not need to be selected randomly here, instead
          // it will be agreeWith-inherited from corresponding lObj after translation. )
          andTags: ["person"],
        },
        positiveCondition: {
          person: ["1per", "2per"],
          number: ["singular"],
          tenseDescription: [
            "past im",
            // "present im",
            "future im",
            "past pf",
            // "future pf",
            // "imperative",
            // "negative imperative",
            // "cond0 condition",
            // "cond0 outcome",
            // "cond1 condition",
            // "cond1 outcome",
            "cond2 condition",
            "cond2 outcome",
            "cond3 condition",
            "cond3 outcome",
          ],
        },
        action: { gender: ["m1", "f"] },
      },
      {
        negativeCondition: { andTags: ["person"] },
        positiveCondition: {
          person: ["3per"],
          number: ["singular"],
          tenseDescription: [
            "past im",
            // "present im",
            "future im",
            "past pf",
            // "future pf",
            // "imperative",
            // "negative imperative",
            // "cond0 condition",
            // "cond0 outcome",
            // "cond1 condition",
            // "cond1 outcome",
            "cond2 condition",
            "cond2 outcome",
            "cond3 condition",
            "cond3 outcome",
          ],
        },
        action: { gender: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"] },
      },
      {
        negativeCondition: { andTags: ["person"] },
        positiveCondition: {
          person: ["1per"],
          number: ["plural"],
          tenseDescription: [
            "past im",
            // "present im",
            "future im",
            "past pf",
            // "future pf",
            // "imperative",
            // "negative imperative",
            // "cond0 condition",
            // "cond0 outcome",
            // "cond1 condition",
            // "cond1 outcome",
            "cond2 condition",
            "cond2 outcome",
            "cond3 condition",
            "cond3 outcome",
          ],
        },
        action: { gender: ["virile", "nonvirile"] },
      },
      {
        negativeCondition: { andTags: ["person"] },
        positiveCondition: {
          person: ["2per", "3per"],
          number: ["plural"],
          tenseDescription: [
            "past im",
            // "present im",
            "future im",
            "past pf",
            // "future pf",
            // "imperative",
            // "negative imperative",
            // "cond0 condition",
            // "cond0 outcome",
            // "cond1 condition",
            // "cond1 outcome",
            "cond2 condition",
            "cond2 outcome",
            "cond3 condition",
            "cond3 outcome",
          ],
        },
        action: { gender: ["nonvirile"] },
      },
    ],
  },
  ENG: {},
};

//For this Answer Language,
//  if the Question Sentence has not specified these features
//    please pick a random one and
//      add Specifier to Question Sentence
//        and update Answer StructureChunk
exports.whetherToAddSpecifiersForThisAnswerLang_not_used = {
  POL: {
    //For verb answerStructureChunks...
    verb: [
      {
        featureConditionsOfAnswerChunk: {
          //...if the A stCh 'tenseDesc' includes any of these...
          tenseDescription: [
            "past im",
            "future im",
            "conditional im",
            "past pf",
            "conditional pf",
          ],
        },
        featureConditionsOfAnswerChunkOrHeadChunk: {
          // ...and the A stCh/headCh 'person' includes any of these...
          person: ["3per"],
        },
        featureConditionsOfQuestionChunkOrHeadChunk: {
          // AND the Q stCh/headCh 'gender' has NO value or empty arr...
          gender: false,
        },
        //...then randomly select one of these, and set it on Question as Specifier, and on Answer as Feature.
        featureActions: {
          gender: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"],
        },
      },
      {
        featureConditionsOfSelf: {
          tenseDescription: [
            "past im",
            "future im",
            "conditional im",
            "past pf",
            "conditional pf",
          ],
        },
        featureConditionsOfHead: { person: ["1per", "2per"] },
        featureActions: { gender: ["m1", "f"] },
      },
    ],
  },
  ENG: {},
};
