const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const clUtils = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.initiallyAdjustSentenceFormula = (sentenceFormula) => {
  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    allLangUtils.addWordtypeToStructureChunk(structureChunk);
  });
};

exports.addWordtypeToStructureChunk = (structureChunk) => {
  let wordtype = gpUtils.getWordtypeFromStructureChunk(structureChunk);

  if (!wordtype) {
    clUtils.throw(
      "#ERR bawe addWordtypeToStructureChunk. wordtype came back falsy",
      wordtype
    );
  }

  console.log(
    `jiro addWordtypeToStructureChunk. "${structureChunk.chunkId}" received wordtype "${wordtype}".`
  );
  structureChunk.wordtype = wordtype;
};

exports.translateAnnotationValue = (
  annotationKey,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annotationValue = structureChunk.annotations[annotationKey];

  if (annotationKey === "gender") {
    if (structureChunk.number) {
      if (structureChunk.number.length > 1) {
        clUtils.throw("cshb #ERR ALL:translateAnnotationValue.");
      }

      const pluralVirilityAndSingularConversionRef =
        refObj.pluralVirilityAndSingularConversionRef[questionLanguage];

      if (structureChunk.number[0] === "plural") {
        if (
          !pluralVirilityAndSingularConversionRef["plural"][annotationValue]
        ) {
          clUtils.throw(
            "mkow #ERR ALL:translateAnnotationValue. Could not convert virility of annotationValue: " +
              annotationValue
          );
        }

        annotationValue =
          pluralVirilityAndSingularConversionRef["plural"][annotationValue];
      }
    }

    let annotationToPlainspeakRef = refObj.annotationToPlainspeakRef;

    let adjustedAnnotation =
      annotationToPlainspeakRef["gender"][annotationValue];

    return typeof adjustedAnnotation === "string"
      ? adjustedAnnotation
      : uUtils.selectRandom(adjustedAnnotation);
  } else {
    return annotationValue;
  }
};

exports.adjustVirilityOfStructureChunk = (
  currentLanguage,
  structureChunk,
  retainOriginals,
  consoleLogLabel
) => {
  console.log("gxow ALL adjustVirilityOfStructureChunk", consoleLogLabel);

  if (structureChunk.wordtype === "noun") {
    // Because m -> plural -> virile and then trying to select Ojciec, which isn't virile, it's m, so will ERR later.
    return;
  }

  console.log(
    "[1;35m " +
      "svpi ALL adjustVirilityOfStructureChunk " +
      structureChunk.chunkId +
      "[0m"
  );

  console.log(
    "[1;35m " +
      "svpi ALL adjustVirilityOfStructureChunk structureChunk start as being:" +
      "[0m",
    structureChunk
  );

  let { gender, number } = structureChunk;

  if (!number || !number.includes("plural")) {
    console.log(
      "clsq ALL adjustVirilityOfStructureChunk Aborting because Number"
    );
    return;
  }

  if (!gender || !gender.length) {
    console.log(
      "vlca ALL adjustVirilityOfStructureChunk Aborting because Gender"
    );
    return;
  }

  if (/all.*/.test(gender)) {
    if (gender.length !== 1) {
      clUtils.throw(
        `#ERR vcvl ALL:adjustVirilityOfStructureChunk. Gender arr contained a metaGender, that's fine, but it contained other values too? That's too much. "${gender.toString()}"`
      );
    }

    gender = refObj.metaFeatures[currentLanguage]["gender"][gender];
  }

  let pluralVirilityAndSingularConversionRef =
    refObj.pluralVirilityAndSingularConversionRef[currentLanguage];

  let newGenderArray = [];

  if (number.includes("singular")) {
    gender.forEach((genderValue) => {
      newGenderArray.push(genderValue);
    });
  }

  if (number.includes("plural")) {
    gender.forEach((genderValue) => {
      console.log("ksdx ALL adjustVirilityOfStructureChunk", { genderValue });

      newGenderArray = [
        ...newGenderArray,
        ...pluralVirilityAndSingularConversionRef["plural"][genderValue],
      ];
      if (retainOriginals) {
        newGenderArray.push(genderValue);
      }
    });
  }

  let newGenderArrayTrimmed = Array.from(new Set(newGenderArray));

  structureChunk.gender = newGenderArrayTrimmed;

  console.log(
    "[1;35m " +
      "hutf ALL adjustVirilityOfStructureChunk structureChunk ends up being:" +
      "[0m",
    structureChunk
  );
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  let stChFeatures = uUtils.combineTwoKeyValueObjectsCarefully(
    refObj.structureChunkFeatures[currentLanguage],
    refObj.structureChunkFeatures["ALL"]
  );

  let shouldConsoleLog = false;
  if (shouldConsoleLog) {
    console.log(
      "[1;35m " + "hqij ALL preprocessStructureChunks-------------------" + "[0m"
    );
  }

  let metaFeaturesRef = refObj.metaFeatures[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "fixed") {
      return;
    }

    if (
      stChFeatures["number"].compatibleWordtypes.includes(
        structureChunk.wordtype
      ) &&
      (!structureChunk.number || !structureChunk.number.length)
    ) {
      structureChunk.number = uUtils.copyWithoutReference(
        stChFeatures["number"].possibleValues
      );
    }

    if (shouldConsoleLog) {
      console.log(
        "zesx ALL preprocessStructureChunks At first the structureChunk is",
        structureChunk
      );
    }

    if (structureChunk.wordtype === "adjective") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["simple"];
      }
    }

    if (structureChunk.wordtype === "pronoun") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["pronoun"];
      }
    }

    if (
      structureChunk.wordtype === "noun" ||
      structureChunk.wordtype === "pronoun"
    ) {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
      }
    }

    if (structureChunk.wordtype === "pronoun") {
      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        }
      }

      if (!structureChunk.gender || !structureChunk.gender.length) {
        structureChunk.gender = [];

        if (
          structureChunk.number &&
          structureChunk.number.includes("singular")
        ) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaFeaturesRef["gender"]["allSingularGenders"],
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaFeaturesRef["gender"]["allPluralGenders"],
          ];
        }
      }
    }

    if (structureChunk.wordtype === "verb") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["verbal"];
      }

      if (structureChunk.form && structureChunk.form.includes("verbal")) {
        if (
          !structureChunk.tenseDescription ||
          !structureChunk.tenseDescription.length
        ) {
          if (
            refFxn.skipThisStepInPreprocessStructureChunks(
              currentLanguage,
              "tenseDescription",
              structureChunk
            )
          ) {
            return;
          }

          structureChunk.tenseDescription = refObj.structureChunkFeatures[
            currentLanguage
          ].tenseDescription.possibleValues.slice(0);
        }
      }

      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "pronoun"
        ) {
          let headChunk = (structureChunk.person = sentenceStructure.find(
            (potentialHeadChunk) => {
              return potentialHeadChunk.chunkId === structureChunk.agreeWith;
            }
          ));

          if (headChunk.person && headChunk.person.length) {
            structureChunk.person = headChunk.person.slice(0);
          }
        }
      }
    }

    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk,
      true,
      "structureChunk from ALL:preprocessStructureChunks"
    );

    if (shouldConsoleLog) {
      console.log(
        "gsgl ALL preprocessStructureChunks Finally the structureChunk is",
        structureChunk
      );
    }
  });

  if (shouldConsoleLog) {
    console.log("[1;35m " + "/ALL preprocessStructureChunks" + "[0m");
  }
};

exports.convertMetaFeatures = (sourceObjectArray, currentLanguage, objType) => {
  if (!["stCh", "lObj"].includes(objType)) {
    throw (
      "allLangUtils.convertMetaFeatures was given wrong objType: " + objType
    );
  }

  let metaFeaturesRef = refObj.metaFeatures[currentLanguage];

  sourceObjectArray.forEach((sourceObject) => {
    //sourceObject eg= a lObj or a stCh
    Object.keys(metaFeaturesRef).forEach((featureKey) => {
      //featureKey eg= "gender"

      let metaFeatureRef = metaFeaturesRef[featureKey];

      // metaFeatureRef eg= {
      //   allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      //   allSingularGenders: ["m", "f", "n"],
      //   allPersonalSingularGenders: ["m", "f"],
      //   allPluralGenders: ["virile", "nonvirile"],
      //   allGenders: ["m", "n", "f", "virile", "nonvirile"],
      // }

      if (objType === "lObj") {
        Object.keys(metaFeatureRef).forEach((metaFeature) => {
          if (/_/.test(metaFeature)) {
            console.log(
              `tkga ALL convertMetaFeatures Hereby changing metaFeature "${metaFeature}" to "${
                metaFeature.split("_")[0]
              }"`
            );
            metaFeature = metaFeature.split("_")[0];
          }

          let regularFeaturesArr = metaFeatureRef[metaFeature];

          uUtils.findKeysInObjectAndExecuteCallback(
            sourceObject,
            metaFeature,
            (sourceObject) => {
              uUtils.copyValueOfKey(
                sourceObject,
                metaFeature,
                regularFeaturesArr,
                true
              );
            }
          );
        });
      } else if (objType === "stCh") {
        if (sourceObject[featureKey]) {
          let currentValueArr = sourceObject[featureKey];
          let newValueArr = [];

          currentValueArr.forEach((value) => {
            if (/_/.test(value)) {
              console.log(
                `veeo ALL convertMetaFeatures Thereby changing metaFeature "${value}" to "${
                  value.split("_")[0]
                }"`
              );
              value = value.split("_")[0];
            }

            if (metaFeatureRef[value]) {
              newValueArr = [...newValueArr, ...metaFeatureRef[value]];
            } else {
              newValueArr.push(value);
            }
          });

          sourceObject[featureKey] = newValueArr;
          console.log("oiiw ALL convertMetaFeatures", objType, { newValueArr });
        }
      }
    });
  });
};

exports.decantMGNsInOutputArray = (questionOutputArr, currentLanguage) => {
  console.log("[1;35m " + "------------decantMGNsInOutputArray" + "[0m");
  console.log(
    "qnzm decantMGNsInOutputArray At the start, questionOutputArr is:"
  );
  clUtils.consoleLogObjectAtTwoLevels(
    questionOutputArr,
    "ALL:decantMGNsInOutputArray"
  );

  questionOutputArr.forEach((outputUnit) => {
    let { structureChunk, selectedLemmaObject } = outputUnit;

    Object.keys(refObj.metaFeatures[currentLanguage]).forEach((featureKey) => {
      let metaFeatureRef = refObj.metaFeatures[currentLanguage][featureKey];

      if (structureChunk[featureKey]) {
        let featureValuesFromStChAndLObj = [...structureChunk[featureKey]];
        if (selectedLemmaObject[featureKey]) {
          featureValuesFromStChAndLObj.push(selectedLemmaObject[featureKey]);
        }

        let selectedMetaFeature;

        if (
          featureValuesFromStChAndLObj.some((featureValue) => {
            if (
              Object.keys(metaFeatureRef)
                .map((metaFeature) => `${metaFeature}_selector`)
                .includes(featureValue)
            ) {
              selectedMetaFeature = featureValue;
              return true;
            }
          })
        ) {
          let adjustedFeatureValueArr = [
            ...metaFeatureRef[selectedMetaFeature.split("_")[0]],
          ];

          console.log("mcxr decantMGNsInOutputArray", {
            adjustedFeatureValueArr,
          });

          structureChunk[featureKey] = [
            uUtils.selectRandom(adjustedFeatureValueArr),
          ];

          console.log("lukh decantMGNsInOutputArray", {
            "structureChunk[featureKey]": structureChunk[featureKey],
          });
        }
      }

      console.log(
        "eldc decantMGNsInOutputArray In the end, structureChunk is:",
        structureChunk
      );
    });
  });

  console.log("[1;35m " + "/decantMGNsInOutputArray" + "[0m");
};

exports.decantMGNsBeforeFetchingOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  console.log(`skho ${structureChunk.chunkId} ${currentLanguage}`);

  if (
    !structureChunk["gender"] &&
    refFxn
      .validFeaturesOfStructureChunkWordtype(currentLanguage, structureChunk)
      .includes("gender")
  ) {
    structureChunk["gender"] = [];
  }

  if ("console") {
    console.log("[1;35m " + "------------decantMGNsBeforeFetchingOutputArray" + "[0m");
    console.log(
      "ubkc decantMGNsBeforeFetchingOutputArray At the start, structureChunk is:",
      structureChunk
    );
    console.log(
      "ubkc decantMGNsBeforeFetchingOutputArray At the start, selectedLemmaObject is:",
      selectedLemmaObject
    );
  }

  Object.keys(refObj.metaFeatures[currentLanguage]).forEach((featureKey) => {
    let metaFeatureRef = refObj.metaFeatures[currentLanguage][featureKey];

    console.log("poyb decantMGNsBeforeFetchingOutputArray Clause 0", {
      featureKey,
      metaFeatureRef,
    });

    if (structureChunk[featureKey]) {
      console.log("eico decantMGNsBeforeFetchingOutputArray Clause 1", {
        featureKey,
      });
      let featureValuesFromStChAndLObj = [...structureChunk[featureKey]];
      if (selectedLemmaObject[featureKey]) {
        featureValuesFromStChAndLObj.push(selectedLemmaObject[featureKey]);
      }

      let selectedMetaFeature;

      if (
        featureValuesFromStChAndLObj.some((featureValue) => {
          if (
            Object.keys(metaFeatureRef)
              .map((metaFeature) => `${metaFeature}_selector`)
              .includes(featureValue)
          ) {
            selectedMetaFeature = featureValue;
            return true;
          }
        })
      ) {
        console.log("nrvz decantMGNsBeforeFetchingOutputArray Clause 2", {
          selectedMetaFeature,
        });
        let adjustedFeatureValueArr = [
          ...metaFeatureRef[selectedMetaFeature.split("_")[0]],
        ];

        console.log("ewoh decantMGNsBeforeFetchingOutputArray", {
          adjustedFeatureValueArr,
        });

        if (structureChunk[featureKey] && structureChunk[featureKey].length) {
          let featureValuesInBothStChAndAdjustedArr = structureChunk[
            featureKey
          ].filter((featureValue) =>
            adjustedFeatureValueArr.includes(featureValue)
          );

          if (!featureValuesInBothStChAndAdjustedArr.length) {
            console.log(
              "[1;31m " +
                `nzig WARNING decantMGNsBeforeFetchingOutputArray. The featureValues for "${featureKey}" on stCh ${structureChunk.chunkId} were such that none matched any value in adjusted array.` +
                "[0m"
            );
          }

          structureChunk[featureKey] = [
            uUtils.selectRandom(featureValuesInBothStChAndAdjustedArr),
          ];
        } else {
          structureChunk[featureKey] = [
            uUtils.selectRandom(adjustedFeatureValueArr),
          ];
        }

        console.log("jwgf decantMGNsBeforeFetchingOutputArray ", {
          "structureChunk[featureKey]": structureChunk[featureKey],
        });
      }
    }

    console.log(
      "nqya decantMGNsBeforeFetchingOutputArray  In the end, structureChunk is:",
      structureChunk
    );
  });

  console.log("[1;35m " + "/decantMGNsBeforeFetchingOutputArray" + "[0m");
};
