const refObj = require("../utils/referenceObjects.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.translateAnnotationValue = (
  annotationKey,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annotationValue = structureChunk.annotations[annotationKey];

  if (annotationKey === "gender") {
    console.log("att1", annotationValue);

    if (structureChunk.number) {
      if (structureChunk.number.length > 1) {
        throw "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ah no.";
      }

      const pluralVirilityConversion = {
        m: "virile",
        m1: "virile",
        m2: "nonvirile",
        m3: "nonvirile",
        f: "nonvirile",
        n: "nonvirile",
        virile: "virile",
        nonvirile: "nonvirile",
      };

      if (structureChunk.number[0] === "plural") {
        annotationValue = pluralVirilityConversion[annotationValue];
        if (!annotationValue) {
          throw "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Mm no.";
        }
      }
    }

    const POLgenderToPlainEnglishRef = {
      m: "male",
      m1: "male",
      m2: "male",
      m3: "male",
      f: "female",
      n: "neuter",
      virile: ["mixed", "males"],
      nonvirile: "females",
    };

    let adjustedAnnotation = POLgenderToPlainEnglishRef[annotationValue];

    return typeof adjustedAnnotation === "string"
      ? adjustedAnnotation
      : gpUtils.selectRandom(adjustedAnnotation);
  } else {
    console.log("att2", annotationValue);
    return annotationValue;
  }
};

exports.adjustVirilityOfStructureChunk = (structureChunk, retainOriginals) => {
  console.log(
    "adjusting virility of structure chunk " + structureChunk.chunkId
  );
  let { gender, number } = structureChunk;

  if (!number || !number.includes("plural")) {
    return;
  }

  if (!gender || !gender.length) {
    return;
  }

  let newGenderArray = [];
  const pluralGenderRefObj = {
    m: "virile",
    m1: "virile",
    m2: "nonvirile",
    m3: "nonvirile",
    f: "nonvirile",
    n: "nonvirile",
    virile: "virile",
    nonvirile: "nonvirile",
  };

  if (number.includes("singular")) {
    gender.forEach((genderValue) => {
      newGenderArray.push(genderValue);
    });
  }

  if (number.includes("plural")) {
    gender.forEach((genderValue) => {
      newGenderArray.push(pluralGenderRefObj[genderValue]);
      if (retainOriginals) {
        newGenderArray.push(genderValue);
      }
    });
  }

  let newGenderArrayTrimmed = Array.from(new Set(newGenderArray));

  structureChunk.gender = newGenderArrayTrimmed;
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  console.log("[1;35m " + "ALL preprocessStructureChunks-------------------" + "[0m");

  let metaFeaturesRef = refObj.metaFeatures[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "fixed") {
      return;
    }

    console.log("At first the structureChunk is", structureChunk);

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
          //Epsilon: Move this to POL utils.
          if (currentLanguage === "POL") {
            if (
              structureChunk.tense &&
              structureChunk.tense.length &&
              structureChunk.aspect &&
              structureChunk.aspect.length
            ) {
              return;
            }
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
          } else {
            throw "#ERR I am surprised that we entered this clause. We should delete this. ~Epsilon";

            let allGendersInThisLang =
              refObj.allFeatureValues[currentLanguage].gender;

            console.log("j22", allGendersInThisLang);

            structureChunk.person = allGendersInThisLang.slice(0);
          }
        }
      }
    }

    allLangUtils.adjustVirilityOfStructureChunk(structureChunk, true);

    console.log("Finally the structureChunk is", structureChunk);
  });

  console.log("[1;35m " + "/ALL preprocessStructureChunks" + "[0m");
};

exports.convertMetaFeatures = (sourceObjectArray, currentLanguage, objType) => {
  if (!["stCh", "lObj"].includes(objType)) {
    throw (
      "allLangUtils.convertMetaFeatures was given wrong objType: " + objType
    );
  }

  gpUtils.consoleLogPurple("convertMetaFeatures-----------");

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

          console.log(objType, { currentValueArr });

          currentValueArr.forEach((value) => {
            if (metaFeatureRef[value]) {
              newValueArr = [...newValueArr, ...metaFeatureRef[value]];
            } else {
              newValueArr.push(value);
            }
          });

          sourceObject[featureKey] = newValueArr;
          console.log(objType, { newValueArr });
        }
      }
    });
  });
  gpUtils.consoleLogPurple("/convertMetaFeatures");
};

exports.specifyMGNs = (questionOutputArr, currentLanguage) => {
  console.log("[1;35m " + "------------specifyMGNs" + "[0m");

  questionOutputArr.forEach((outputUnit) => {
    Object.keys(refObj.metaFeatures[currentLanguage]).forEach((featureKey) => {
      console.log("p20a", featureKey);

      let metaFeatureRef = refObj.metaFeatures[currentLanguage][featureKey];
      let { structureChunk } = outputUnit;
      if (structureChunk[featureKey]) {
        console.log("[1;35m " + structureChunk.chunkId + "[0m");
        console.log("p20b", structureChunk);

        if (
          structureChunk[featureKey].some((featureValue) =>
            Object.keys(metaFeatureRef)
              .map((metaFeature) => `${metaFeature}_selector`)
              .includes(featureValue)
          )
        ) {
          console.log("p20c", { featureKey });

          let adjustedFeatureValueArr = [];

          structureChunk[featureKey].forEach((featureValue) => {
            if (
              Object.keys(metaFeatureRef)
                .map((metaFeature) => `${metaFeature}_selector`)
                .includes(featureValue)
            ) {
              adjustedFeatureValueArr = [
                ...adjustedFeatureValueArr,
                ...metaFeatureRef[featureValue.split("_")[0]],
              ];
            } else {
              adjustedFeatureValueArr.push(featureValue);
            }
          });

          structureChunk[featureKey] = adjustedFeatureValueArr;

          console.log("p20d", structureChunk[featureKey]);

          structureChunk[featureKey] = [
            gpUtils.selectRandom(structureChunk[featureKey]),
          ];

          console.log("p20e", structureChunk[featureKey]);
        }
      }

      console.log("p20f", structureChunk);
    });
  });

  console.log("[1;35m " + "/specifyMGNs" + "[0m");
};
