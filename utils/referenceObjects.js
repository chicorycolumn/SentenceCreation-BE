const gpUtils = require("./generalPurposeUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterAnnotations = (
  structureChunk,
  languagesObj,
  correspondingAnswerChunks
) => {
  console.log(
    "[1;35m " +
      "lbbq filterAnnotations>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" +
      "[0m"
  );

  let { answerLanguage, questionLanguage } = languagesObj;

  Object.keys(structureChunk.annotations).forEach((annotationKey) => {
    if (typeof structureChunk.annotations[annotationKey] !== "string") {
      console.log(
        "[1;31m " +
          `ylam filterAnnotations: ${structureChunk.chunkId} stCh should have had STRING for annotation ${annotationKey}` +
          "[0m"
      );
      console.log(
        "ylam filterAnnotations",
        structureChunk.annotations[annotationKey]
      );
      gpUtils.throw("ylam filterAnnotations #ERR");
    }

    console.log(
      "[1;33m " +
        "pzlz filterAnnotations q00" +
        " annotationKey: " +
        annotationKey +
        "[0m"
    );

    console.log("zkyb filterAnnotations", {
      answerLanguage,
      "structureChunk.wordtype": structureChunk.wordtype,
    });

    let conditionsOnWhichToBlockAnnotations =
      refObj.conditionsOnWhichToBlockAnnotations[answerLanguage][
        structureChunk.wordtype
      ];

    console.log(
      "duqy filterAnnotations: conditionsOnWhichToBlockAnnotations",
      conditionsOnWhichToBlockAnnotations
    );

    if (
      conditionsOnWhichToBlockAnnotations &&
      conditionsOnWhichToBlockAnnotations[annotationKey]
    ) {
      let conditionsOnWhichToBlockAnnotationsArr =
        conditionsOnWhichToBlockAnnotations[annotationKey];

      if (
        conditionsOnWhichToBlockAnnotationsArr.some((conditionsObj) => {
          if (conditionsObj.allConditions) {
            return true;
          }

          return Object.keys(conditionsObj).every((featureKey) => {
            let featureValues = conditionsObj[featureKey];

            //Each answerChunksObject has a headCh or depCh that fulfils this condition (at least one value from condition arr is present at condition key in headCh).
            return featureValues.some((featureValue) => {
              if (
                correspondingAnswerChunks.every((answerChunksObject) => {
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
                    "nyjw filterAnnotations: On stCh " +
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
        console.log("[1;35m " + "amnf filterAnnotations: Deleting it now!" + "[0m");

        console.log(
          "[1;30m " +
            `vfge filterAnnotations ${structureChunk.chunkId} ABZ Late stage DELETION of annotation ${annotationKey} which is ${structureChunk.annotations[annotationKey]}` +
            "[0m"
        );

        delete structureChunk.annotations[annotationKey];
      } else {
        console.log(
          "[1;32m " +
            `dyzx filterAnnotations ${structureChunk.chunkId} ABZ Late stage PASSING of annotation ${annotationKey} which is ${structureChunk.annotations[annotationKey]}` +
            "[0m"
        );
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
      // allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      // allSingularGenders: ["m", "f", "n"],
      // allPersonalSingularGenders: ["m", "f"],
      // allPluralGenders: ["virile", "nonvirile"],
      // allGenders: ["m", "n", "f", "virile", "nonvirile"],
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

exports.metaFeatures = {
  ENG: {
    gender: {
      allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      allSingularGenders: ["m", "f", "n"],
      allPersonalSingularGenders: ["m", "f"],
      allPluralGenders: ["virile", "nonvirile"],
      allGenders: ["m", "n", "f", "virile", "nonvirile"],
    },
    // form: { pronounAndDeterminer: ["pronoun", "determiner"] },
  },
  POL: {
    gender: {
      allPersonalGenders: ["m1", "f", "virile", "nonvirile"],
      allSingularGenders: ["m1", "m2", "m3", "f", "f", "f", "n", "n", "n"],
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
      allSingularGendersExcludingNeuter: ["m1", "m2", "m3", "f", "f", "f"],
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

exports.annotationToPlainspeakRef = {
  gender: {
    m: "male",
    m1: "male",
    m2: "male",
    m3: "male",
    f: "female",
    n: "neuter",
    virile: ["mixed", "males"],
    nonvirile: "females",
  },
};

exports.validFeaturesOfStructureChunkWordtype = (
  currentLanguage,
  structureChunk,
  featureTypes
) => {
  if (!featureTypes || !featureTypes.length) {
    featureTypes = ["selectors", "hybridSelectors", "inflectionChains"];
  }

  let featuresRef = refObj.lemmaObjectFeatures[currentLanguage];

  let validFeatures = [];

  featureTypes.forEach((featureType) => {
    let additionalValidFeatures =
      featuresRef[featureType][structureChunk.wordtype];

    if (additionalValidFeatures) {
      if (!Array.isArray(additionalValidFeatures)) {
        gpUtils.throw(
          "twnl additionalValidFeatures in isValidFeatureOfStructureChunkWordtype fxn should have been array."
        );
      }

      validFeatures = [...validFeatures, ...additionalValidFeatures];
    }
  });

  return validFeatures;
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
      // article: NONE
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
    allowableExtraClarifiersInSingleWordSentences: {
      noun: ["gcase"],
      adjective: [],
      verb: [],
      pronoun: [],
    },
  },
  ENG: {
    selectors: { noun: ["gender"] },
    hybridSelectors: {
      verb: ["tenseDescription"],
    },
    inflectionChains: {
      noun: ["number", "gcase"],
      adjective: ["form"],
      verb: ["form", "tense", "person", "number"],
      pronoun: ["form", "person", "number", "gender", "gcase"],
      article: ["form"],
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
    allowableExtraClarifiersInSingleWordSentences: {
      noun: [],
      adjective: [],
      verb: [],
      pronoun: [],
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
    gender: [
      "m1",
      "m2",
      "m3",
      "f",
      "f",
      "f",
      "n",
      "n",
      "n",
      "virile",
      "virile",
      "virile",
      "nonvirile",
      "nonvirile",
      "nonvirile",
    ],
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

exports.skipThisStepInPreprocessStructureChunks = (
  currentLanguage,
  key,
  structureChunk
) => {
  if (currentLanguage === "POL") {
    if (key === "tenseDescription") {
      if (
        structureChunk.tense &&
        structureChunk.tense.length &&
        structureChunk.aspect &&
        structureChunk.aspect.length
      ) {
        return true;
      }
    }
  }
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
