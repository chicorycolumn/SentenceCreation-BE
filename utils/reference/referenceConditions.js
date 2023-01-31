exports.conditionsToBlockAnnotations = [
  {
    questionLangs: ["ENG"],
    wordtypes: ["verb"],
    annotations: ["tenseDescription"],
    stChConditions: [
      //If QUESTIONlang {{ENG}}, for {{verbs}}, block the {{tenseDesc}} anno
      //if any of these condition objects has all its conditions met by this chunk or its headChunk.
      {
        tenseDescription: ["present simple"],
        person: ["3per"],
        number: ["singular"],
      },
    ],
  },
  {
    questionLangs: [], // This means it applies to all langs.
    wordtypes: ["pronombre"],
    annotations: ["gender", "number", "person"],
    lObjConditions: [
      {
        lemma: "$ITG_G",
      },
    ],
  },
];

// exports.conditionsOnWhichToBlockAnnotationsUNUSED = {
//   POL: {
//     noun: {
//       //Here it's answerChunk {{POL}} {{nouns}}, as the nouns are what'll be clarified for their verbs.
//       gender: [
//         //If ANSWERlang {{POL}},
//         //           if wordtype {{noun}},
//         //                     please block the {{gender}} annotation...
//         //
//         //...if any of these condition objects have all their conditions met, by the headCh or depCh.
//         {
//           tenseDescription: [
//             "present im",
//             "imperative im",
//             "future pf",
//             "imperative pf",
//           ],
//         },
//         {
//           person: ["impersonal"],
//         },
//       ],
//     },
//     pronombre: {
//       gender: [
//         {
//           tenseDescription: [
//             "present im",
//             "imperative im",
//             "future pf",
//             "imperative pf",
//           ],
//         },
//         {
//           person: ["impersonal"],
//         },
//         {
//           person: ["1per", "2per"],
//           gcase: ["gen", "dat", "acc", "ins", "loc"],
//         },
//         { form: ["determiner"] },
//       ],
//     },
//   },
//   ENG: {
//     verb: {
//       tenseDescription: [
//         {
//           tenseDescription: ["present simple"],
//           person: ["3per"],
//           number: ["singular"],
//         },
//       ],
//     },
//     noun: {
//       gender: [
//         {
//           person: ["1per", "2per"],
//         },
//         {
//           person: ["3per"],
//           number: ["plural"],
//         },
//       ],
//     },
//     pronombre: {
//       form: [
//         {
//           allConditions: true,
//         },
//       ],
//       gender: [
//         {
//           person: ["1per", "2per"],
//         },
//         {
//           person: ["3per"],
//           number: ["plural"],
//         },
//       ],
//     },
//   },
// };

exports.postHocDependentChunkWordtypes = {
  POL: [
    {
      PHD_type: "POL possessive pronombre",
      conditions: {
        wordtype: ["pronombre"],
        specificIds: ["pol-pro-POSSESSIVE"],
      },
      inflectionChains: {
        postHocAgreeWithPrimary: ["person", "number", "gender"],
        postHocAgreeWithSecondary: ["number", "gender", "gcase"],
      },
    },
  ],
  SPA: [
    {
      PHD_type: "SPA possessive pronombre",
      conditions: {
        wordtype: ["pronombre"],
        specificIds: ["spa-pro-POSSESSIVE"],
      },
      inflectionChains: {
        postHocAgreeWithPrimary: ["person", "number", "gender"],
        postHocAgreeWithSecondary: ["number", "gender", "gcase"],
      },
    },
  ],
};
