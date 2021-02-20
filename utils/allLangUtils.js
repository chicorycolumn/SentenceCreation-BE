const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.initiallyAdjustSentenceFormula = (sentenceFormula) => {
  sentenceFormula.sentenceStructure.forEach((structureChunk) => {
    allLangUtils.addWordtypeToStructureChunk(structureChunk);
  });
};

exports.addWordtypeToStructureChunk = (structureChunk) => {
  let wordtype = gpUtils.getWordtypeFromStructureChunk(structureChunk);

  if (!wordtype) {
    gpUtils.throw(
      "#ERR bawe addWordtypeToStructureChunk. wordtype came back falsy",
      wordtype
    );
  }

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
        gpUtils.throw("cshb #ERR ALL:translateAnnotationValue.");
      }

      const pluralVirilityAndSingularConversionRef =
        refObj.pluralVirilityAndSingularConversionRef[questionLanguage];

      if (structureChunk.number[0] === "plural") {
        if (
          !pluralVirilityAndSingularConversionRef["plural"][annotationValue]
        ) {
          gpUtils.throw(
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
      : gpUtils.selectRandom(adjustedAnnotation);
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
  //Not for nouns. Because m -> plural -> virile and then trying to select Ojciec, which isn't virile, it's m, so will ERR later.
  //If stCh has number:plural, then make the genders the virilityConverted genders.
  //If stCh has numnber:singular, then make the genders the singularConverted genders.

  if (structureChunk.wordtype === "noun") {
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
      gpUtils.throw(
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
          // structureChunk.gender.push("allSingularGenders");
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaFeaturesRef["gender"]["allSingularGenders"],
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          // structureChunk.gender.push("allPluralGenders");
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

          structureChunk.tenseDescription = refObj.allFeatureValues[
            currentLanguage
          ].tenseDescription.slice(0);
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

  // gpUtils.consoleLogPurple("convertMetaFeatures-----------");

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

          gpUtils.findKeysInObjectAndExecuteCallback(
            sourceObject,
            metaFeature,
            (sourceObject) => {
              gpUtils.copyValueOfKey(
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
  // gpUtils.consoleLogPurple("/convertMetaFeatures");
};

exports.decantMGNsInOutputArray = (questionOutputArr, currentLanguage) => {
  console.log("[1;35m " + "------------decantMGNsInOutputArray" + "[0m");
  console.log(
    "qnzm decantMGNsInOutputArray At the start, questionOutputArr is:"
  );
  gpUtils.consoleLogObjectAtTwoLevels(
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
            gpUtils.selectRandom(adjustedFeatureValueArr),
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

exports.decantMGNsBeforeOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  if (
    !structureChunk["gender"] &&
    refFxn
      .validFeaturesOfStructureChunkWordtype(currentLanguage, structureChunk)
      .includes("gender")
  ) {
    structureChunk["gender"] = [];
  }

  console.log("[1;35m " + "------------decantMGNsBeforeOutputArray" + "[0m");
  console.log(
    "ubkc decantMGNsBeforeOutputArray At the start, structureChunk is:",
    structureChunk
  );
  console.log(
    "ubkc decantMGNsBeforeOutputArray At the start, selectedLemmaObject is:",
    selectedLemmaObject
  );

  Object.keys(refObj.metaFeatures[currentLanguage]).forEach((featureKey) => {
    let metaFeatureRef = refObj.metaFeatures[currentLanguage][featureKey];

    console.log("poyb decantMGNsBeforeOutputArray Clause 0", {
      featureKey,
      metaFeatureRef,
    });

    //if gender is a valid feature, add it if not there

    if (structureChunk[featureKey]) {
      console.log("eico decantMGNsBeforeOutputArray Clause 1", { featureKey });
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
        console.log("nrvz decantMGNsBeforeOutputArray Clause 2", {
          selectedMetaFeature,
        });
        let adjustedFeatureValueArr = [
          ...metaFeatureRef[selectedMetaFeature.split("_")[0]],
        ];

        console.log("ewoh decantMGNsBeforeOutputArray", {
          adjustedFeatureValueArr,
        });

        structureChunk[featureKey] = [
          gpUtils.selectRandom(adjustedFeatureValueArr),
        ];

        console.log("jwgf decantMGNsBeforeOutputArray ", {
          "structureChunk[featureKey]": structureChunk[featureKey],
        });
      }
    }

    console.log(
      "nqya decantMGNsBeforeOutputArray  In the end, structureChunk is:",
      structureChunk
    );
  });

  console.log("[1;35m " + "/decantMGNsBeforeOutputArray" + "[0m");
};
