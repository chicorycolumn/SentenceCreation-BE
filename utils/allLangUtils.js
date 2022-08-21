const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.enforceThirdPersonAgreeWith = (stCh, onlyIfUnpopulated) => {
  if (
    ["agreeWith", "postHocAgreeWithPrimary"].some(
      (agreeKey) =>
        stCh[agreeKey] && ["nco", "npe"].includes(stCh[agreeKey].split("-")[0])
    ) &&
    (!onlyIfUnpopulated || uUtils.isEmpty(stCh.person))
  ) {
    stCh.person = ["3per"];
    return true;
  }
};

exports.enforceIsPerson = (stCh) => {
  if (stCh.isPerson) {
    stCh.gender = stCh.gender.filter((genderValue) => genderValue !== "n");
  }
};

exports.formatSpecificIds = (specificIds) => {
  let res = [];

  specificIds.forEach((id) => {
    res.push(id);
    if (id.includes("*")) {
      res.push(id.split("*")[0]);
    }
  });

  return res;
};

exports.translateAnnoTraitValue = (
  annoTraitKey,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annoTraitValue = structureChunk.annotations[annoTraitKey];

  if (annoTraitKey === "gender") {
    //Removed vito5 in branch step-V-virility-tidying-and-overhaul-aka-vito, as seems obviated by vito2b.

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
  isPreProcessing,
  justOneGenderValue,
  justOneNumberValue
) => {
  //Adds the virility gender values. Eg if number includes "plural", then gender ["f"] would become ["f", "nonvirile"]

  //Unless you true justOneGenderValue, in which case if number singular and gender nonvirile, it would
  //randomly choose either f or n. This is used in counterfaxing, because by that point, the list and explode of
  //counterfax situations means that all gender values and all number values have been exploded together.
  //So you don't to worry about leaving n out in the cold when f is randomly chosen to translate nonvirile for singular,
  //because there will be another sit with n.

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

  // if (
  //   !justOneGenderValue &&
  //   isPreProcessing &&
  //   ["nounCommon","nounPerson"].includes(gpUtils.getWordtypeStCh(structureChunk)) &&
  //   structureChunk.number &&
  //   structureChunk.number.includes("plural")
  // ) {
  //   // Because m -> plural -> virile and then trying to select Ojciec, which isn't virile, it's m, so will ERR later.
  //   return;
  // }

  let { gender, number } = structureChunk;

  if (!justOneGenderValue && !number) {
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

  let virilityConversionRef = refObj.virilityConversionRef[currentLanguage];

  if (justOneGenderValue) {
    let newGenderTraitValue =
      virilityConversionRef.justOneGenderValue[number[0]][gender[0]];

    gender.length = 0;
    gender.push(newGenderTraitValue);

    consol.log(
      "[1;35m " +
        "hutf ALL a'djustVirilityOfStructureChunk structureChunk ends up being:" +
        "[0m",
      structureChunk
    );

    return;
  }

  let metaTranslatedGenderArr = [];
  gender.forEach((genderValue) => {
    if (/^all/.test(genderValue)) {
      metaTranslatedGenderArr = [
        ...metaTranslatedGenderArr,
        ...refObj.metaTraitValues[currentLanguage]["gender"][genderValue],
      ];
    } else {
      metaTranslatedGenderArr.push(genderValue);
    }
  });
  gender = Array.from(new Set(metaTranslatedGenderArr));

  consol.logSpecial4("cecc gender after translating metas", gender);

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
    });
  }

  let newGenderTraitKeysTrimmed = Array.from(new Set(newGenderTraitKeys));

  structureChunk.gender = newGenderTraitKeysTrimmed;

  consol.log(
    "[1;35m " +
      "hutg ALL a'djustVirilityOfStructureChunk structureChunk ends up being:" +
      "[0m",
    structureChunk
  );

  if (justOneNumberValue) {
    let virilityRef = refObj.virilityConversionRef[currentLanguage];

    if (structureChunk.gender.length > 1) {
      return;
    }

    let numberFromGender = Object.keys(virilityRef).find(
      (numberTraitValue) =>
        virilityRef[numberTraitValue].allValues &&
        structureChunk.gender.every((genderTraitValue) =>
          virilityRef[numberTraitValue].allValues.includes(genderTraitValue)
        )
    );
    if (!numberFromGender) {
      consol.throw("fivk");
    }
    structureChunk.number = [numberFromGender];
  }
};

exports.setPostHocAgreeKeys = (structureChunk, currentLanguage) => {
  if (refObj.postHocDependentChunkWordtypes[currentLanguage]) {
    structureChunk["wordtype"] = gpUtils.getWordtypeStCh(structureChunk);

    let PHD_type;

    refObj.postHocDependentChunkWordtypes[currentLanguage].forEach(
      (PHD_dataObj) => {
        if (
          Object.keys(PHD_dataObj.conditions).every((PHD_conditionTraitKey) => {
            let PHD_conditionTraitValueArr =
              PHD_dataObj.conditions[PHD_conditionTraitKey];

            if (
              PHD_conditionTraitValueArr.some((arrayItem) => {
                if (
                  structureChunk[PHD_conditionTraitKey] &&
                  Array.isArray(structureChunk[PHD_conditionTraitKey]) &&
                  structureChunk[PHD_conditionTraitKey].includes(arrayItem)
                ) {
                  return true;
                } else if (
                  structureChunk[PHD_conditionTraitKey] === arrayItem
                ) {
                  return true;
                }
              })
            ) {
              return true;
            }
          })
        ) {
          PHD_type = PHD_dataObj.PHD_type;
        }
      }
    );

    delete structureChunk["wordtype"];

    if (PHD_type) {
      consol.log(`stCh "${structureChunk.chunkId}" is PHD_type "${PHD_type}".`);
      structureChunk.PHD_type = PHD_type;
      const ref = {
        agreeWith: "postHocAgreeWithPrimary",
        agreeWith2: "postHocAgreeWithSecondary",
      };
      Object.keys(ref).forEach((oldKey) => {
        let newKey = ref[oldKey];
        if (!structureChunk[newKey]) {
          try {
            structureChunk[newKey] = structureChunk[oldKey];
            delete structureChunk[oldKey];
          } catch (err) {
            consol.throw(
              `yhtm Wanted to replace oldKey "${oldKey}" with newKey "${newKey}" on stCh "${structureChunk.chunkId}" but oldKey probably not found.`
            );
          }
        }
      });
    } else {
      delete structureChunk.agreeWith2;
    }
  }

  if (structureChunk.PHD_type && !structureChunk.postHocAgreeWithPrimary) {
    consol.throw(
      `lwdi ${currentLanguage} "${structureChunk.chunkId}" has PHD_type "${structureChunk.PHD_type}" and yet no postHocAgreeWithPrimary.`
    );
  }
};

exports.setMerelyPreferredChoices = (structureChunk, currentLanguage) => {
  if (structureChunk.merelyPreferredChoicesForQuestionSentence) {
    let merelyPreferredChoicesForQuestionSentenceObj = {};

    structureChunk.merelyPreferredChoicesForQuestionSentence.forEach(
      (traitKey) => {
        if (structureChunk[traitKey] && structureChunk[traitKey].length) {
          merelyPreferredChoicesForQuestionSentenceObj[traitKey] =
            structureChunk[traitKey].slice();
        }
        delete structureChunk[traitKey];
      }
    );

    structureChunk.merelyPreferredChoicesForQuestionSentence =
      merelyPreferredChoicesForQuestionSentenceObj;
  }
};

exports.getAndPreprocessStructureAndFormula = (
  sentenceFormula,
  currentLanguage,
  multipleMode
) => {
  if (
    !multipleMode &&
    sentenceFormula.primaryOrders &&
    sentenceFormula.primaryOrders.length > 1
  ) {
    sentenceFormula.primaryOrders = [
      uUtils.selectRandom(sentenceFormula.primaryOrders),
    ];
  }

  let { sentenceFormulaId, sentenceFormulaSymbol, sentenceStructure } =
    sentenceFormula;

  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

  return {
    sentenceFormulaId,
    sentenceFormulaSymbol,
    sentenceStructure,
  };
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  const defaultTraitValuesRef = refObj.defaultTraitValues;
  const metaTraitValuesRef = refObj.metaTraitValues[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (gpUtils.getWordtypeStCh(structureChunk) === "fixed") {
      return;
    }

    allLangUtils.setPostHocAgreeKeys(structureChunk, currentLanguage);
    allLangUtils.setMerelyPreferredChoices(structureChunk, currentLanguage);
    langUtils.preprocessStructureChunks(structureChunk);

    Object.keys(defaultTraitValuesRef).forEach((wordtype) => {
      if (gpUtils.getWordtypeStCh(structureChunk) === wordtype) {
        Object.keys(defaultTraitValuesRef[wordtype]).forEach((traitKey) => {
          if (!structureChunk[traitKey] || !structureChunk[traitKey].length) {
            structureChunk[traitKey] = [
              uUtils.selectRandom(defaultTraitValuesRef[wordtype][traitKey]),
            ];

            if (traitKey === "person" && wordtype === "pronombre") {
              allLangUtils.enforceThirdPersonAgreeWith(structureChunk);
            }
          }
        });
      }
    });

    if (
      refFxn.isTraitCompatibleStCh("number", structureChunk, currentLanguage) &&
      (!structureChunk.number || !structureChunk.number.length)
    ) {
      refFxn.assignDefaultTraitValuesOrPossibleTraitValues(
        structureChunk,
        currentLanguage,
        "number"
      );
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "pronombre") {
      allLangUtils.enforceThirdPersonAgreeWith(structureChunk, true);

      if (!structureChunk.gender || !structureChunk.gender.length) {
        structureChunk.gender = [];

        if (
          structureChunk.number &&
          structureChunk.number.includes("singular")
        ) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValuesRef["gender"].allSingularGenders,
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValuesRef["gender"].allPluralGenders,
          ];
        }
      }

      allLangUtils.enforceIsPerson(structureChunk.gender);
    }

    if (gpUtils.getWordtypeStCh(structureChunk) === "verb") {
      if (structureChunk.form && structureChunk.form.includes("verbal")) {
        if (
          (!structureChunk.tenseDescription ||
            !structureChunk.tenseDescription.length) &&
          !refFxn.skipThisStepInPreprocessStructureChunks(
            currentLanguage,
            "tenseDescription",
            structureChunk
          )
        ) {
          refFxn.assignDefaultTraitValuesOrPossibleTraitValues(
            structureChunk,
            currentLanguage,
            "tenseDescription"
          );
        }
      }

      if (structureChunk.agreeWith) {
        let haveAdjusted = allLangUtils.enforceThirdPersonAgreeWith(
          structureChunk,
          true
        );

        if (
          !haveAdjusted &&
          gpUtils.getWordtypeAgree(structureChunk) === "pronombre"
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

    //Vito1: Changes stCh.
    //Right at the start, adjusting all stChs, eg if gender "f" and number "plural", we add "nonvirile".
    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk,
      true,
      false,
      true
    );

    langUtils.balanceGenders(structureChunk);
  });
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

  const metaTraitValuesRef = refObj.metaTraitValues[currentLanguage];

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
  consol.log("tctt convertedLObjMetagenderArr", convertedLObjMetagenderArr);

  //4 If stCh has gender, then filter down so only the ones present in convertedLObjMetagenderArr remain.
  //  and if it doesn't have gender, set it as that.
  if (structureChunk.gender && structureChunk.gender.length) {
    //First adjust virility, so arr ["m"] when number plural doesn't get filtered to [].

    consol.logSpecial4("wwee structureChunk.gender was", structureChunk.gender);

    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk
    );

    consol.logSpecial4("wwee structureChunk.gender now", structureChunk.gender);

    structureChunk.gender = structureChunk.gender.filter((genderTraitValue) =>
      convertedLObjMetagenderArr.includes(genderTraitValue)
    );

    consol.logSpecial4(
      "wwee structureChunk.gender finally",
      structureChunk.gender
    );

    if (!structureChunk.gender.length) {
      consol.throw(
        `wppo Now the gender array on stCh is empty, where it wasn't before.`
      );
    }
  } else {
    structureChunk.gender = convertedLObjMetagenderArr.slice(0);
  }

  consol.log(
    `wpon correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh ENDS as:`,
    structureChunk
  );

  // consol.throw(222);
};
