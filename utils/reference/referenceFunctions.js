const gpUtils = require("../generalPurposeUtils.js");
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
        gpUtils.throw(
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

exports.filterAnnotationsOnStCh = (
  structureChunk,
  languagesObj,
  answerSentenceData
) => {
  if (!structureChunk.annotations || !answerSentenceData) {
    return;
  }

  let correspondingAnswerChunks = [];
  let { chunkId } = structureChunk;
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

  Object.keys(structureChunk.annotations).forEach((annotationKey) => {
    if (typeof structureChunk.annotations[annotationKey] !== "string") {
      console.log(
        "[1;31m " +
          `ylam filterAnnotationsOnStCh: "${structureChunk.chunkId}" stCh should have had STRING for annotationKey "${annotationKey}"` +
          "[0m"
      );
      gpUtils.throw(
        `#ERR ylam filterAnnotationsOnStCh. structureChunk.annotations[annotationKey]: "${structureChunk.annotations[annotationKey]}"`
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
      "structureChunk.wordtype": structureChunk.wordtype,
    });

    let conditionsOnWhichToBlockAnnotations =
      refObj.conditionsOnWhichToBlockAnnotations[answerLanguage][
        structureChunk.wordtype
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
        console.log(
          "[1;35m " + "amnf filterAnnotationsOnStCh: Deleting it now!" + "[0m"
        );

        console.log(
          "[1;30m " +
            `vfge filterAnnotationsOnStCh "${structureChunk.chunkId}" ABZ Late stage DELETION of annotation "${annotationKey}" which is "${structureChunk.annotations[annotationKey]}"` +
            "[0m"
        );

        delete structureChunk.annotations[annotationKey];
      } else {
        console.log(
          "[1;32m " +
            `dyzx filterAnnotationsOnStCh "${structureChunk.chunkId}" ABZ Late stage PASSING of annotation "${annotationKey}" which is "${structureChunk.annotations[annotationKey]}"` +
            "[0m"
        );
      }
    }
  });
  console.log("[1;35m " + "/filterAnnotationsOnStCh" + "[0m");
};
