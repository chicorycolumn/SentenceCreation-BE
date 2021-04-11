const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const clUtils = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.initiallyAdjustSentenceFormula = (sentenceFormula) => {};

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

  if (gpUtils.getWorrdtypeStCh(structureChunk) === "noun") {
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
  let stChFeatures = refFxn.getStructureChunkFeatures(currentLanguage);

  let shouldConsoleLog = false;
  if (shouldConsoleLog) {
    console.log(
      "[1;35m " + "hqij ALL preprocessStructureChunks-------------------" + "[0m"
    );
  }

  let metaFeaturesRef = refObj.metaFeatures[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (gpUtils.getWorrdtypeStCh(structureChunk) === "fixed") {
      return;
    }

    if (
      stChFeatures["number"].compatibleWordtypes.includes(
        gpUtils.getWorrdtypeStCh(structureChunk)
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

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "adjective") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["simple"];
      }
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["pronoun"];
      }
    }

    if (
      gpUtils.getWorrdtypeStCh(structureChunk) === "noun" ||
      gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun"
    ) {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
      }
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun") {
      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWorrdtypeAgree(structureChunk) === "noun" &&
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

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "verb") {
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
          gpUtils.getWorrdtypeAgree(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (gpUtils.getWorrdtypeAgree(structureChunk) === "pronoun") {
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
  //unused
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
  if ("check") {
    if (
      !selectedLemmaObject.gender ||
      selectedLemmaObject.gender.slice(0, 3) !== "all"
    ) {
      return;
    }
    if (
      !refFxn
        .validFeaturesOfStructureChunkWordtype(currentLanguage, structureChunk)
        .includes("gender")
    ) {
      clUtils.throw(
        `wpoh lObj has metagender, but gender is not an appropriate feature for this stCh wordtype?`
      );
    }
  }

  console.log(
    `jowc correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh.gender STARTS as:`,
    structureChunk.gender
  );

  structureChunk.gender = [uUtils.selectRandom(structureChunk.gender)];

  console.log(
    `jowd correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh.gender ENDS as:`,
    structureChunk.gender
  );
};

exports.correctMGNsBeforeFetchingOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  //0 Only run this for MGNs, ie stChs where matching lObj is metagender.
  if ("check") {
    if (
      !selectedLemmaObject.gender ||
      selectedLemmaObject.gender.slice(0, 3) !== "all"
    ) {
      console.log("neem");
      return;
    }
    if (
      !refFxn
        .validFeaturesOfStructureChunkWordtype(currentLanguage, structureChunk)
        .includes("gender")
    ) {
      clUtils.throw(
        `wpoh lObj has metagender, but gender is not an appropriate feature for this stCh wordtype?`
      );
    }
  }

  console.log(
    `wpoi correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh STARTS as:`,
    structureChunk
  );

  //1 Get the lObj metagender key.
  let lObjMetagender = selectedLemmaObject.gender;

  if (!structureChunk.number || !structureChunk.number.length) {
    clUtils.throw(
      "wpoj Cannot correctMetagenderByNumberInMGNs with no number key."
    );
  }

  if (structureChunk.number.length > 1) {
    structureChunk.number = [uUtils.selectRandom(structureChunk.number)];
  }

  console.log(
    `wpok correctMetagenderByNumberInMGNs. "${structureChunk.chunkId}" has gender "${structureChunk.gender}", while selectedLemmaObject gender is "${lObjMetagender}".`
  );

  let metagenderCorrectedByNumberRef = refObj.metaCorrectionRef[
    currentLanguage
  ]["gender"].find(
    (obj) =>
      Object.keys(obj.condition).includes("number") &&
      obj.condition.number === structureChunk.number[0]
  ).changeRef;

  console.log(
    `wpol correctMetagenderByNumberInMGNs. ${structureChunk.number[0]} changeRef is:`,
    metagenderCorrectedByNumberRef
  );

  //2 Adjust lObjMetagender by number from stCh.
  // eg if stCh number singular, lObjMetagender goes from "allPersonalGenders" to "allPersonalSingularGenders".
  lObjMetagender = metagenderCorrectedByNumberRef[lObjMetagender.split("_")[0]];

  //3 Now convert that. let convertedLObjMetagenderArr = ["m1", "f"]
  let convertedLObjMetagenderArr =
    refObj.metaFeatures[currentLanguage]["gender"][lObjMetagender];

  //4 If stCh has gender, then filter down so only the ones present in convertedLObjMetagenderArr remain.
  //  and if it doesn't have gender, set it as that.
  if (structureChunk.gender && structureChunk.gender.length) {
    structureChunk.gender = structureChunk.gender.filter((value) =>
      convertedLObjMetagenderArr.includes(value)
    );
  } else {
    structureChunk.gender = convertedLObjMetagenderArr.slice(0);
  }

  console.log(
    `wpon correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh ENDS as:`,
    structureChunk
  );
};
