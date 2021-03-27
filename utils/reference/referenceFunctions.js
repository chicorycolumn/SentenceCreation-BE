const gpUtils = require("../generalPurposeUtils.js");
const clUtils = require("../zerothOrder/consoleLoggingUtils.js");
const otUtils = require("../objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const refFxn = require("./referenceFunctions.js");

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
        clUtils.throw(
          "twnl additionalValidFeatures in isValidFeatureOfStructureChunkWordtype fxn should have been array."
        );
      }

      validFeatures = [...validFeatures, ...additionalValidFeatures];
    }
  });

  return validFeatures;
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

exports.removeAnnotationsByAOCs = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr
) => {
  //AOC = Annotation-obviating connected (allDependent) word.

  //The doctor (f) and her book.    --> 'doctor' has an allDependent 'her' which obviates its gender annotation.
  //The sheep (sing.) and its grass. --> 'sheep' has an allDependent 'its' which obviates its number annotation.

  let headWordtype = "noun";
  let allDependentWordtype = "pronoun";

  if (
    !gpUtils.doesObjectExistAndNonEmpty(
      questionOutputUnit.structureChunk.annotations
    )
  ) {
    return;
  }

  if (
    gpUtils.getWordtypeFromStructureChunk(questionOutputUnit.structureChunk) ===
    headWordtype
  ) {
    let headChunkId = questionOutputUnit.structureChunk.chunkId;

    let primaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
      "agreeWith",
      "postHocAgreeWithPrimary",
    ]);

    let secondaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
      "postHocAgreeWithSeconday",
    ]);

    let tertiaryDepUnits = getDepUnits(questionOutputArr, headChunkId, [
      "postHocAgreeWithTertiary",
    ]);

    function getDepUnits(questionOutputArr, headChunkId, agreeKeys) {
      return questionOutputArr
        .filter((unit) =>
          agreeKeys.some(
            (agreeWithKey) => unit.structureChunk[agreeWithKey] === headChunkId
          )
        )
        .filter(
          (unit) =>
            gpUtils.getWordtypeFromStructureChunk(unit.structureChunk) ===
            allDependentWordtype
        );
    }

    console.log(
      "ttta questionOutputUnit.structureChunk.annotations",
      questionOutputUnit.structureChunk.annotations
    );
    console.log(
      "tttb primaryDepUnits",
      primaryDepUnits.map((unit) => unit.drillPath)
    );
    console.log(
      "tttb secondaryDepUnits",
      secondaryDepUnits.map((unit) => unit.drillPath)
    );
    console.log(
      "tttb tertiaryDepUnits",
      tertiaryDepUnits.map((unit) => unit.drillPath)
    );

    Object.keys(questionOutputUnit.structureChunk.annotations).forEach(
      (inflectionTyype) => {
        let annoValue =
          questionOutputUnit.structureChunk.annotations[inflectionTyype];

        //Imagine "Ja, moje jabłko."
        //drillPath reveals info about 'Ja'
        //drillPathSecondary reveals info about 'jabłko'
        //
        //So if we're looking at secondaryDeps, then we'll look in drillPathSecondary, and so on.
        lemon(primaryDepUnits, "drillPath");
        lemon(secondaryDepUnits, "drillPathSecondary");
        lemon(tertiaryDepUnits, "drillPathTertiary");

        function lemon(depUnits, drillPathKey) {
          depUnits.forEach((depUnit) => {
            if (
              !questionOutputUnit.structureChunk.annotations[inflectionTyype] || //ie we've now deleted it so abort loop.
              !depUnit[drillPathKey]
            ) {
              return;
            }

            console.log("meef", depUnit);

            //nownow
            /**If any dep unit holds a value at inflectionTyype that is unique in its lObj,
             * then this pronoun obviates the need for that specifier, so delete it from annotations.
             * and set featureHasBeenDeleted to true.
             */
            if (
              otUtils.isThisValueUniqueAtThisLevelInLemmaObject(
                depUnit.selectedLemmaObject,
                inflectionTyype,
                depUnit[drillPathKey]
              )
            ) {
              console.log(
                `mekw removeAnnotationsByAOCs. Removing "${inflectionTyype}" anno from ${questionOutputUnit.structureChunk.chunkId}`
              );
              delete questionOutputUnit.structureChunk.annotations[
                inflectionTyype
              ];
            }
          });
        }
      }
    );
  }

  let pronounObviatesAnnotationsConditions = {
    POL: {
      //For all nouns...
      noun: [
        {
          //...if there is a connected pronoun
          wordtypeOfConnectedWord: ["pronoun"],
          // and it is unique in its lObj re such feature (eg "his" is unique for gender but "their" is not)
          potentiallyObviatedAnnotations: ["gender", "number"],
          // ...then block that annotation.
        },
      ],
    },
  };
};

exports.filterAnnotationsOnStCh = (
  questionOutputUnit,
  languagesObj,
  answerSentenceData,
  questionOutputArr
) => {
  let questionStructureChunk = questionOutputUnit.structureChunk;

  if (!questionStructureChunk.annotations || !answerSentenceData) {
    return;
  }

  //nownow prosMGN
  //I would like to add a conditionsOnWhichToBlockAnnotation, to both languages.
  //Where if there is a connected pronoun, which will reveal the gender, so "his" "her" "its", but not "their"

  //Ideally this would go on ref conditionsOnWhichToBlockAnnotations, but it's just too fiddly.
  //
  //So what we need to do is:
  //
  //1. For this stCh, get all q output units that are Dependent/PHD of this.
  //2. Filter to just the ones with wordtype pronoun.
  //3. If the selectedWord in any of those units is unique between genders in its lemma object
  //   (eg "his" is unique as no other gender key holds this value, whereas "their" is not unique as two genders keys hold it)
  //   then delete/block the gender annotation.

  console.log("weer", {
    questionStructureChunk,
    languagesObj,
    answerSentenceData,
    questionOutputArr,
  });

  let correspondingAnswerChunks = [];
  let { chunkId } = questionStructureChunk;
  let { answerLanguage, questionLanguage } = languagesObj;

  answerSentenceData.answerOutputArrays.forEach((outputArray) => {
    outputArray.forEach((outputUnit) => {
      if (
        outputUnit.structureChunk &&
        outputUnit.structureChunk.chunkId === chunkId
      ) {
        let answerChunk = outputUnit.structureChunk;
        let dependentAnswerChunks = outputArray
          .map((outputUnit) => outputUnit.structureChunk)
          .filter(
            (structureChunk) => structureChunk.agreeWith === answerChunk.chunkId
          );

        correspondingAnswerChunks.push({
          answerChunk,
          dependentAnswerChunks,
        });
      }
    });
  });

  console.log(
    "[1;35m " +
      "lbbq filterAnnotationsOnStCh>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" +
      "[0m"
  );

  Object.keys(questionStructureChunk.annotations).forEach((annotationKey) => {
    if (typeof questionStructureChunk.annotations[annotationKey] !== "string") {
      console.log(
        "[1;31m " +
          `ylam filterAnnotationsOnStCh: "${questionStructureChunk.chunkId}" stCh should have had STRING for annotationKey "${annotationKey}"` +
          "[0m"
      );
      clUtils.throw(
        `#ERR ylam filterAnnotationsOnStCh. questionStructureChunk.annotations[annotationKey]: "${questionStructureChunk.annotations[annotationKey]}"`
      );
    }

    console.log(
      "[1;33m " +
        "pzlz filterAnnotationsOnStCh q00" +
        " annotationKey: " +
        annotationKey +
        "[0m"
    );

    console.log("zkyb filterAnnotationsOnStCh", {
      answerLanguage,
      "questionStructureChunk.wordtype": questionStructureChunk.wordtype,
    });

    let conditionsOnWhichToBlockAnnotations =
      refObj.conditionsOnWhichToBlockAnnotations[answerLanguage][
        questionStructureChunk.wordtype
      ];

    console.log(
      "duqy filterAnnotationsOnStCh: conditionsOnWhichToBlockAnnotations",
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
                    "nyjw filterAnnotationsOnStCh: On stCh " +
                    questionStructureChunk.chunkId +
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
        console.log(
          "[1;35m " + "amnf filterAnnotationsOnStCh: Deleting it now!" + "[0m"
        );

        console.log(
          "[1;30m " +
            `vfge filterAnnotationsOnStCh "${questionStructureChunk.chunkId}" ABZ Late stage DELETION of annotation "${annotationKey}" which is "${questionStructureChunk.annotations[annotationKey]}"` +
            "[0m"
        );

        delete questionStructureChunk.annotations[annotationKey];
      } else {
        console.log(
          "[1;32m " +
            `dyzx filterAnnotationsOnStCh "${questionStructureChunk.chunkId}" ABZ Late stage PASSING of annotation "${annotationKey}" which is "${questionStructureChunk.annotations[annotationKey]}"` +
            "[0m"
        );
      }
    }
  });
  console.log("[1;35m " + "/filterAnnotationsOnStCh" + "[0m");
};
