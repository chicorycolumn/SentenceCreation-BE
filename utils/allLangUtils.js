const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.translateAnnoTraitValue = (
  annoTraitKey,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annoTraitValue = structureChunk.annotations[annoTraitKey];

  if (annoTraitKey === "gender") {
    if (structureChunk.number) {
      if (structureChunk.number.length > 1) {
        consol.throw("cshb #ERR ALL:translateAnnoTraitValue.");
      }

      const virilityConversionRef =
        refObj.virilityConversionRef[questionLanguage];

      if (structureChunk.number[0] === "plural") {
        if (!virilityConversionRef["plural"][annoTraitValue]) {
          consol.throw(
            "mkow #ERR ALL:translateAnnoTraitValue. Could not convert virility of annoTraitValue: " +
              annoTraitValue
          );
        }
        consol.logSpecial1(
          `vvv5 translateAnnoTV ${annoTraitValue} to ${virilityConversionRef["plural"][annoTraitValue]}`,
          languagesObj
        );
        annoTraitValue = virilityConversionRef["plural"][annoTraitValue];
      }
    }

    let annotationToPlainspeakRef = refObj.annotationToPlainspeakRef;

    let adjustedAnnotation =
      annotationToPlainspeakRef["gender"][annoTraitValue];

    return typeof adjustedAnnotation === "string"
      ? adjustedAnnotation
      : uUtils.selectRandom(adjustedAnnotation);
  } else {
    return annoTraitValue;
  }
};

exports.adjustVirilityOfStructureChunk = (
  currentLanguage,
  structureChunk,
  consoleLogLaabel
) => {
  //Adds the virility gender values if number includes "plural".
  //So ["f"] would become ["f", "nonvirile"]

  consol.log("gxow ALL a'djustVirilityOfStructureChunk", consoleLogLaabel);

  if (gpUtils.getWordtypeStCh(structureChunk) === "noun") {
    // Because m -> plural -> virile and then trying to select Ojciec, which isn't virile, it's m, so will ERR later.
    return;
  }

  consol.log(
    "[1;35m " +
      "svpi ALL a'djustVirilityOfStructureChunk " +
      structureChunk.chunkId +
      "[0m"
  );

  consol.log(
    "[1;35m " +
      "svpi ALL a'djustVirilityOfStructureChunk structureChunk start as being:" +
      "[0m",
    structureChunk
  );

  let { gender, number } = structureChunk;

  if (!number || !number.includes("plural")) {
    consol.log(
      "clsq ALL a'djustVirilityOfStructureChunk Aborting because Number"
    );
    return;
  }

  if (!gender || !gender.length) {
    consol.log(
      "vlca ALL a'djustVirilityOfStructureChunk Aborting because Gender"
    );
    return;
  }

  if (/all.*/.test(gender)) {
    if (gender.length !== 1) {
      consol.throw(
        `#ERR vcvl ALL:a'djustVirilityOfStructureChunk. Gender traitKeys arr contained a metaGender traitKey, that's fine, but it contained other traitKeys too? That's too much. "${gender.toString()}"`
      );
    }

    gender = refObj.metaTraitValues[currentLanguage]["gender"][gender];
  }

  let virilityConversionRef = refObj.virilityConversionRef[currentLanguage];

  let newGenderTraitKeys = [];

  if (number.includes("singular")) {
    gender.forEach((genderTraitKey) => {
      newGenderTraitKeys.push(genderTraitKey);
    });
  }

  if (number.includes("plural")) {
    gender.forEach((genderTraitKey) => {
      consol.log("ksdx ALL a'djustVirilityOfStructureChunk", {
        genderTraitKey,
      });

      newGenderTraitKeys = [
        ...newGenderTraitKeys,
        ...virilityConversionRef["plural"][genderTraitKey],
      ];
      // if (shouldRetainOriginals) {
      //   newGenderTraitKeys.push(genderTraitKey);
      // }
    });
  }

  let newGenderTraitKeysTrimmed = Array.from(new Set(newGenderTraitKeys));

  structureChunk.gender = newGenderTraitKeysTrimmed;

  consol.log(
    "[1;35m " +
      "hutf ALL a'djustVirilityOfStructureChunk structureChunk ends up being:" +
      "[0m",
    structureChunk
  );
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  let stChTraits = refFxn.getstructureChunkTraits(currentLanguage);

  let shouldConsoleLog = false;
  if (shouldConsoleLog) {
    consol.log(
      "[1;35m " + "hqij ALL preprocessStructureChunks-------------------" + "[0m"
    );
  }

  let metaTraitValuesRef = refObj.metaTraitValues[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (gpUtils.getWordtypeStCh(structureChunk) === "fixed") {
      return;
    }

    if (
      stChTraits["number"].compatibleWordtypes.includes(
        gpUtils.getWordtypeStCh(structureChunk)
      ) &&
      (!structureChunk.number || !structureChunk.number.length)
    ) {
      structureChunk.number = uUtils.copyWithoutReference(
        stChTraits["number"].possibleTraitValues
      );
    }

    if (shouldConsoleLog) {
      consol.log(
        "zesx ALL preprocessStructureChunks At first the structureChunk is",
        structureChunk
      );
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "adjective") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["simple"];
      }
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "pronoun") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["pronoun"];
      }
    }

    if (
      gpUtils.getWordtypeStCh(structureChunk) === "noun" ||
      gpUtils.getWordtypeStCh(structureChunk) === "pronoun"
    ) {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
      }
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "pronoun") {
      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeAgree(structureChunk) === "noun" &&
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
            ...metaTraitValuesRef["gender"]["allSingularGenders"],
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValuesRef["gender"]["allPluralGenders"],
          ];
        }
      }
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "verb") {
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

          structureChunk.tenseDescription =
            refObj.structureChunkTraits[
              currentLanguage
            ].tenseDescription.possibleTraitValues.slice(0);
        }
      }

      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeAgree(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (gpUtils.getWordtypeAgree(structureChunk) === "pronoun") {
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
    consol.logSpecial1(
      `vvv1 ${currentLanguage} all ppStCh adjustViril`,
      structureChunk.chunkId
    );
    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk,
      "structureChunk from ALL:preprocessStructureChunks"
    );

    if (shouldConsoleLog) {
      consol.log(
        "gsgl ALL preprocessStructureChunks Finally the structureChunk is",
        structureChunk
      );
    }
  });

  if (shouldConsoleLog) {
    consol.log("[1;35m " + "/ALL preprocessStructureChunks" + "[0m");
  }
};

exports.convertmetaTraitValues = (
  sourceObjectArray,
  currentLanguage,
  objType
) => {
  if (!["stCh", "lObj"].includes(objType)) {
    throw (
      "allLangUtils.convertmetaTraitValues was given wrong objType: " + objType
    );
  }

  let metaTraitValuesRef = refObj.metaTraitValues[currentLanguage];

  sourceObjectArray.forEach((sourceObject) => {
    //sourceObject eg= a lObj or a stCh
    Object.keys(metaTraitValuesRef).forEach((traitKey) => {
      //traitKey eg= "gender"

      let metaTraitValueRef = metaTraitValuesRef[traitKey];

      // metaTraitValueRef eg= {
      //   allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      //   allSingularGenders: ["m", "f", "n"],
      //   allPersonalSingularGenders: ["m", "f"],
      //   allPluralGenders: ["virile", "nonvirile"],
      //   allGenders: ["m", "n", "f", "virile", "nonvirile"],
      // }

      if (objType === "lObj") {
        Object.keys(metaTraitValueRef).forEach((metaTraitValue) => {
          let regularTraitValues = metaTraitValueRef[metaTraitValue];

          uUtils.findKeysInObjectAndExecuteCallback(
            sourceObject,
            metaTraitValue,
            (sourceObject) => {
              uUtils.copyValueOfKey(
                sourceObject,
                metaTraitValue,
                regularTraitValues,
                true
              );
            }
          );
        });
      } else if (objType === "stCh") {
        if (sourceObject[traitKey]) {
          let currentTraitValues = sourceObject[traitKey];
          let newTraitValues = [];

          currentTraitValues.forEach((traitValue) => {
            if (metaTraitValueRef[traitValue]) {
              newTraitValues = [
                ...newTraitValues,
                ...metaTraitValueRef[traitValue],
              ];
            } else {
              newTraitValues.push(traitValue);
            }
          });

          sourceObject[traitKey] = newTraitValues;
          consol.log("oiiw ALL convertmetaTraitValues", objType, {
            newTraitValues,
          });
        }
      }
    });
  });
};

exports.decantMGNsBeforeFetchingOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  if ("check") {
    if (
      !selectedLemmaObject.gender ||
      !gpUtils.traitValueIsMeta(selectedLemmaObject.gender)
    ) {
      return;
    }
    if (
      !refFxn
        .validTraitKeysPerStructureChunkWordtype(
          currentLanguage,
          structureChunk
        )
        .includes("gender")
    ) {
      consol.throw(
        `wpoh lObj has metagender, but gender is not an appropriate traitKey for this stCh wordtype?`
      );
    }
  }

  consol.log(
    `jowc correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh.gender STARTS as:`,
    structureChunk.gender
  );

  structureChunk.gender = [uUtils.selectRandom(structureChunk.gender)];

  consol.log(
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
      !gpUtils.traitValueIsMeta(selectedLemmaObject.gender)
    ) {
      consol.log("neem");
      return;
    }
    if (
      !refFxn
        .validTraitKeysPerStructureChunkWordtype(
          currentLanguage,
          structureChunk
        )
        .includes("gender")
    ) {
      consol.throw(
        `wpoh lObj has metagender, but gender is not an appropriate traitKey for this stCh wordtype?`
      );
    }

    consol.log(
      `wpoi correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh STARTS as:`,
      structureChunk
    );
  }

  //1 Get the lObj metagender traitKey.
  let lObjMetagender = selectedLemmaObject.gender;

  if (!structureChunk.number || !structureChunk.number.length) {
    consol.throw(
      "wpoj Cannot correctMetagenderByNumberInMGNs with no number traitKey."
    );
  }

  if (structureChunk.number.length > 1) {
    structureChunk.number = [uUtils.selectRandom(structureChunk.number)];
  }

  consol.log(
    `wpok correctMetagenderByNumberInMGNs. "${structureChunk.chunkId}" has gender "${structureChunk.gender}", while selectedLemmaObject gender is "${lObjMetagender}".`
  );

  let metagenderCorrectedByNumberRef = refObj.metaCorrectionRef[
    currentLanguage
  ]["gender"].find(
    (obj) =>
      Object.keys(obj.condition).includes("number") &&
      obj.condition.number === structureChunk.number[0]
  ).changeRef;

  consol.log(
    `wpol correctMetagenderByNumberInMGNs. "${structureChunk.number[0]}" changeRef is:`,
    metagenderCorrectedByNumberRef
  );

  //2 Adjust lObjMetagender by number from stCh.
  // eg if stCh number singular, lObjMetagender goes from "allPersonalGenders" to "allPersonalSingularGenders".
  lObjMetagender = metagenderCorrectedByNumberRef[lObjMetagender];

  //3 Now convert that. let convertedLObjMetagenderArr = ["m1", "f"]
  let convertedLObjMetagenderArr =
    refObj.metaTraitValues[currentLanguage]["gender"][lObjMetagender];

  //4 If stCh has gender, then filter down so only the ones present in convertedLObjMetagenderArr remain.
  //  and if it doesn't have gender, set it as that.
  if (structureChunk.gender && structureChunk.gender.length) {
    structureChunk.gender = structureChunk.gender.filter((genderTraitValue) =>
      convertedLObjMetagenderArr.includes(genderTraitValue)
    );
  } else {
    structureChunk.gender = convertedLObjMetagenderArr.slice(0);
  }

  consol.log(
    `wpon correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh ENDS as:`,
    structureChunk
  );
};
