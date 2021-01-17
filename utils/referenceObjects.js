const gpUtils = require("./generalPurposeUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterAnnotations = (
  structureChunk,
  languagesObj,
  correspondingAnswerChunks
) => {
  console.log(
    "[1;35m " +
      "filterAnnotations>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" +
      "[0m"
  );

  let { answerLanguage, questionLanguage } = languagesObj;

  Object.keys(structureChunk.annotations).forEach((annotationKey) => {
    if (typeof structureChunk.annotations[annotationKey] !== "string") {
      console.log(
        "[1;31m " +
          `filterAnnotations: ${structureChunk.chunkId} stCh should have had STRING for annotation ${annotationKey}` +
          "[0m"
      );
      console.log(structureChunk.annotations[annotationKey]);
      throw "#ERR";
    }

    console.log(
      "[1;33m " + "filterAnnotations q00" + " annotationKey: " + annotationKey + "[0m"
    );

    console.log("q10", {
      answerLanguage,
      "structureChunk.wordtype": structureChunk.wordtype,
    });

    let conditionsOnWhichToBlockAnnotations =
      refObj.conditionsOnWhichToBlockAnnotations[answerLanguage][
        structureChunk.wordtype
      ];

    console.log(
      "filterAnnotations: conditionsOnWhichToBlockAnnotations",
      conditionsOnWhichToBlockAnnotations
    );

    if (
      conditionsOnWhichToBlockAnnotations &&
      conditionsOnWhichToBlockAnnotations[annotationKey]
    ) {
      // console.log("[1;33m " + "filterAnnotations: q01" + "[0m");

      let conditionsOnWhichToBlockAnnotationsArr =
        conditionsOnWhichToBlockAnnotations[annotationKey];

      if (
        conditionsOnWhichToBlockAnnotationsArr.some((conditionsObj) => {
          if (conditionsObj.allConditions) {
            return true;
          }

          // console.log("[1;33m " + "filterAnnotations: q02" + "[0m");

          return Object.keys(conditionsObj).every((featureKey) => {
            let featureValues = conditionsObj[featureKey];
            // console.log("[1;33m " + "filterAnnotations: q03" + "[0m");

            //Each answerChunksObject has a headCh or depCh that fulfils this condition (at least one value from condition arr is present at condition key in headCh).
            return featureValues.some((featureValue) => {
              // console.log("[1;33m " + "filterAnnotations: q04" + "[0m");

              if (
                correspondingAnswerChunks.every((answerChunksObject) => {
                  // console.log("[1;33m " + "filterAnnotations: q05" + "[0m");

                  let headAndDepChunks = [
                    answerChunksObject.answerChunk,
                    ...answerChunksObject.dependentAnswerChunks,
                  ];

                  return headAndDepChunks.some(
                    (chunk) =>
                      chunk[featureKey] &&
                      chunk[featureKey].includes(featureValue)
                  );
                })
              ) {
                console.log(
                  "[1;35m " +
                    "filterAnnotations: On stCh " +
                    structureChunk.chunkId +
                    " I will delete the " +
                    annotationKey +
                    " annotation because one of the answer stChs includes " +
                    featureKey +
                    " of " +
                    featureValue +
                    ", which was a condition specified to block the annotation." +
                    "[0m"
                );

                return true;
              }
            });
          });
        })
      ) {
        console.log("[1;35m " + "filterAnnotations: Deleting it now!" + "[0m");
        delete structureChunk.annotations[annotationKey];
      }
    }
  });
  console.log("[1;35m " + "/filterAnnotations" + "[0m");
};

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

exports.giveAdjustedFeatureValue = (
  questionLanguage,
  answerLanguage,
  featureKey,
  featureValue
) => {
  if (
    refObj.featureValueTranslation[questionLanguage] &&
    refObj.featureValueTranslation[questionLanguage][answerLanguage]
  ) {
    let featureValueTranslationRef =
      refObj.featureValueTranslation[questionLanguage][answerLanguage][
        featureKey
      ];

    if (
      featureValueTranslationRef &&
      featureValueTranslationRef[featureValue]
    ) {
      return featureValueTranslationRef[featureValue].slice(0);
    }
  }
  return [featureValue];
};

exports.pluralVirilityAndSingularConversionRef = {
  ENG: {
    singular: {
      m: ["m"],
      f: ["f"],
      n: ["n"],
      virile: ["m"],
      nonvirile: ["f", "n"],
    },
    plural: {
      m: ["virile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
  },
  POL: {
    singular: {
      m: ["m"],
      m1: ["m1"],
      m2: ["m2"],
      m3: ["m3"],
      f: ["f"],
      n: ["n"],
      virile: ["m1"],
      nonvirile: ["m2", "m3", "f", "n"],
    },
    plural: {
      m: ["virile"],
      m1: ["virile"],
      m2: ["nonvirile"],
      m3: ["nonvirile"],
      f: ["nonvirile"],
      n: ["nonvirile"],
      virile: ["virile"],
      nonvirile: ["nonvirile"],
    },
  },
};

exports.metaFeatures = {
  ENG: {
    gender: {
      allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      allSingularGenders: ["m", "f", "n"],
      allPersonalSingularGenders: ["m", "f"],
      allPluralGenders: ["virile", "nonvirile"],
      allGenders: ["m", "n", "f", "virile", "nonvirile"],
    },
    form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
  POL: {
    gender: {
      allPersonalGenders: ["m1", "f", "virile", "nonvirile"],
      allSingularGenders: ["m1", "m2", "m3", "f", "n"],
      allSingularGendersWithPadding: [
        "m1",
        "m2",
        "m3",
        "f",
        "f",
        "f",
        "n",
        "n",
        "n",
      ],
      allPersonalSingularGenders: ["m1", "f"],
      allPluralGenders: ["virile", "nonvirile"],
      allGenders: [
        "m1",
        "m2",
        "m3",
        "n",
        "n",
        "n",
        "f",
        "f",
        "f",
        "virile",
        "virile",
        "virile",
        "nonvirile",
        "nonvirile",
        "nonvirile",
      ],
      //
      allSingularGendersExcludingNeuter: ["m1", "m2", "m3", "f"],
      allSingularGendersExcludingNeuterWithPadding: [
        "m1",
        "m2",
        "m3",
        "f",
        "f",
        "f",
      ],
      allMasculineSingularGenders: ["m1", "m2", "m3"],
    },
    form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
};

exports.featureValueTranslation = {
  POL: {
    ENG: {
      gender: {
        m1: ["m"],
        m2: ["n"],
        m3: ["n"],
        allSingularGendersExcludingNeuter: ["allPersonalSingularGenders"],
        allSingularGendersExcludingNeuterWithPadding: ["allSingularGenders"],
        allMasculineSingularGenders: ["m"],
      },
    },
  },
  ENG: {
    POL: {
      gender: {
        m: ["m1"],
      },
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

exports.lemmaObjectFeatures = {
  POL: {
    selectors: {
      noun: ["gender"],
      verb: ["aspect"],
    },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form", "number", "gender", "gcase"],
      verb: ["form", "tense", "person", "number", "gender"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
    },
    inheritableInflectorKeys: {
      noun: ["number", "gcase"],
      adjective: ["number", "gender", "gcase"],
      verb: ["tense", "person", "number", "gender"],
      pronoun: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form", "number", "gender"],
      verb: ["tenseDescription", "person", "number", "gender"],
      pronoun: ["person", "number", "gender"],
    },
    undesiredClarifiersFromWhateverTheQLangMayBe: {
      //Actually we can just use allowableTransfers as the wanted clarifiers, rather than needing to specify the unwanted clarifiers.
      // noun: [],
      // adjective: [],
      // verb: [],
    },
  },
  ENG: {
    selectors: {},
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
    },
    inheritableInflectorKeys: {
      noun: ["number", "gcase"],
      adjective: [],
      verb: ["tense", "person", "number"],
      pronoun: ["person", "number", "gender", "gcase"],
    },
    allowableTransfersFromQuestionStructure: {
      noun: ["number"],
      adjective: ["form"],
      verb: ["tenseDescription", "person", "number"],
      pronoun: ["form", "person", "number", "gender"],
    },
    undesiredClarifiersFromWhateverTheQLangMayBe: {
      //Actually we can just use allowableTransfers as the wanted clarifiers, rather than needing to specify the unwanted clarifiers.
      // noun: ["gender"],
      // adjective: ["gender"],
      // verb: ["gender"],
    },
  },
};

exports.allFeatureValues = {
  ENG: {
    tenseDescription: [
      "past simple",
      "past continuous",
      "past perfect",
      "present simple",
      "present continuous",
      "present perfect",
      "future simple",
      "future continuous",
      "future perfect",
    ],
    gender: [
      "m",
      "f",
      "n",
      "virile",
      "nonvirile",
      // "allPersonalGenders",
      // "allSingularGenders",
    ],
  },
  POL: {
    tenseDescription: [
      "past im",
      "present im",
      "future im",
      "past pf",
      "future pf",
      "imperative",
      "negative imperative",
      "cond0 condition",
      "cond0 outcome",
      "cond1 condition",
      "cond1 outcome",
      "cond2 condition",
      "cond2 outcome",
      "cond3 condition",
      "cond3 outcome",
    ],
    gender: ["m1", "m2", "m3", "f", "n", "virile", "nonvirile"],
  },
};

exports.uninflectedForms = {
  POL: {
    verb: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      // "activeAdjectival", Would need to be conjugated as an adjective.
      // "passiveAdjectival", Would need to be conjugated as an adjective.
    ],
  },
  ENG: {
    verb: [],
  },
};

exports.adhocInflectors = {
  POL: {},
  ENG: { verb: ["tenseDescription"] },
};

exports.adhocForms = {
  POL: {},
  ENG: {
    verb: [
      "contemporaryAdverbial",
      "anteriorAdverbial",
      "activeAdjectival",
      "passiveAdjectival",
      "pastParticiple",
    ],
  },
};

exports.requestedSpecifiersNew = {
  POL: {
    verb: [
      //For A stCh verbs:
      //   if they or their headCh fulfil the .condition,
      //   AND
      //   if they or their headCh don't have the featureKey from .action
      //   THEN
      //   add the featureKey and Value from action to the A stCh, and note it in headCh Specifiers.
      {
        condition: {
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
        condition: {
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
        condition: {
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
        condition: {
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
exports.whetherToAddSpecifiersForThisAnswerLang = {
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

exports.tenseDescriptionTranslation = {
  //Note, this is NOT a Washburne style reference object. And that's okay.
  ENG: {
    POL: {
      "past simple": { regular: ["past pf"] },
      // "past going to": [""], //This would need to be translated by more elaborate, so should be handled within sentenceStructre.
      "past continuous": { regular: ["past im"] },
      "past perfect": { regular: ["past pf"] },
      "present simple": { regular: ["present im"] },
      "present continuous": { regular: ["present im"] },
      "present perfect": { regular: ["past im", "past pf"] },
      "future simple": { regular: ["future pf"] },
      "future goingto": { regular: ["future pf"] },
      "future continuous": { regular: ["future im"] },
      "future goingto continuous": { regular: ["future im"] },
      "future perfect": { regular: ["future pf"] },
      imperative: { regular: ["imperative"] },
      "negative imperative": { regular: ["negative imperative"] },
      "cond0 condition": { regular: ["cond0 condition"] },
      "cond0 outcome": { regular: ["cond0 outcome"] },
      "cond1 condition": { regular: ["cond1 condition"] },
      "cond1 outcome": { regular: ["cond1 outcome"] },
      "cond2 condition": { regular: ["cond2 condition"] },
      "cond2 outcome": { regular: ["cond2 outcome"] },
      "cond3 condition": { regular: ["cond3 condition"] },
      "cond3 outcome": { regular: ["cond3 outcome"] },
    },
  },
};

exports.getTranslatedTenseDescription = (
  sourceTenseDescription,
  sourceLanguage,
  targetLanguage
) => {
  let translatedTenseDescriptionsArr = [];

  if (
    Object.keys(refObj.tenseDescriptionTranslation).includes(sourceLanguage)
  ) {
    translatedTenseDescriptionsArr =
      refObj.tenseDescriptionTranslation[sourceLanguage][targetLanguage][
        sourceTenseDescription
      ].regular;
  } else {
    let translations =
      refObj.tenseDescriptionTranslation[targetLanguage][sourceLanguage];

    Object.keys(translations).forEach((key) => {
      let value = translations[key].regular;

      if (
        value.includes(sourceTenseDescription) &&
        !translatedTenseDescriptionsArr.includes(key)
      ) {
        translatedTenseDescriptionsArr.push(key);
      }
    });
  }

  return translatedTenseDescriptionsArr;
};
