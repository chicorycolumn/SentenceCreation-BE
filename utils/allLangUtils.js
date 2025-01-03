const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const idUtils = require("../utils/identityUtils.js");
const uUtils = require("../utils/universalUtils.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.addHiddenNumberToTantumStChs = (lObj, stCh) => {
  let tantumsRef = {
    tantumPlurale: "plural",
    tantumSingulare: "singular",
  };

  Object.keys(tantumsRef).forEach((tantumKey) => {
    if (lObj[tantumKey]) {
      if (!stCh.number) {
        consol.throw("cipp");
      }

      let tantumCompatibleNumberValue = tantumsRef[tantumKey];

      if (!stCh.hiddenTraits) {
        stCh.hiddenTraits = {};
      }

      stCh.hiddenTraits.number = [...stCh.number];
      stCh.number = [tantumCompatibleNumberValue];
    }
  });
};

exports.expandLemmaObjects = (matches, currentLanguage) => {
  allLangUtils.convertmetaTraitValues(matches, currentLanguage, "lObj");
};

exports.tweakStructureChunks = (matches, structureChunk, currentLanguage) => {
  let metagenderRef = refObj.metaTraitValues[currentLanguage].gender;

  matches.forEach((lObj) => {
    if (idUtils.getWordtypeLObj(lObj) === "pro") {
      if (idUtils.getWordtypeStCh(structureChunk) !== "pro") {
        consol.throw(
          "#ERR hcio expandLemmaObjects. lObj and stCh wordtypes don't match."
        );
      }
      if (!structureChunk.gender) {
        if (
          structureChunk.person &&
          structureChunk.person.length &&
          !structureChunk.person.includes("3per")
        ) {
          structureChunk.gender = metagenderRef["_PersonalGenders"].slice(0);
        } else {
          structureChunk.gender = metagenderRef["_Genders"].slice(0);
        }
      }
    }
  });
};

exports.removeContinuousTenseDescFromStative = (lObj, stCh) => {
  const _isUnwantedStative = (lObj, stCh, tenseDesc) => {
    if (
      tenseDesc.includes("continuous") &&
      (stCh.stativeOverrideTrue ||
        (lfUtils.isStative(lObj) && !stCh.stativeOverrideFalse))
    ) {
      return true;
    }
  };

  if (!stCh.tenseDescription || !stCh.tenseDescription.length) {
    return;
  }

  let unwantedTenseDescArr = stCh.tenseDescription.filter((td) =>
    _isUnwantedStative(lObj, stCh, td)
  );

  if (unwantedTenseDescArr.length) {
    stCh.tenseDescription = stCh.tenseDescription.filter(
      (td) => !unwantedTenseDescArr.includes(td)
    );
  }
};

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

exports.enforceIsPerson = (stCh, strict, arrOnly, genderTraitKey) => {
  if (!genderTraitKey) {
    genderTraitKey = "gender";
  }

  const _enforceIsPerson = (arr) => {
    return arr.filter(
      (genderValue) => !["n", "m2", "m3"].includes(genderValue)
    );
  };

  if (arrOnly) {
    return _enforceIsPerson(arrOnly);
  }

  if (idUtils.stChIsPerson(stCh, strict)) {
    stCh[genderTraitKey] = _enforceIsPerson(stCh[genderTraitKey]);
  }
};

exports.removeMarkersFromLObjId = (lObjId) => {
  if (["^"].includes(lObjId[0])) {
    lObjId = lObjId.slice(1);
  }
  return lObjId;
};

exports.getLObjIdNumber = (id) => {
  id = allLangUtils.removeMarkersFromLObjId(id);
  return id.split("-")[2];
};

exports.getLObjIdStem = (id) => {
  id = allLangUtils.removeMarkersFromLObjId(id);
  return id.split("-").slice(0, 3).join("-");
};

exports.compareLObjStems = (id1, id2, ignoreSpecificity) => {
  if (ignoreSpecificity) {
    id1 = allLangUtils.removeMarkersFromLObjId(id1);
    id2 = allLangUtils.removeMarkersFromLObjId(id2);
  }

  if (id1[0] === "^" && id2[0] === "^") {
    return id1 === id2;
  }

  if (id1[0] === "^") {
    return id1.slice(1) === id2;
  }

  if (id2[0] === "^") {
    return id2.slice(1) === id1;
  }

  return allLangUtils.getLObjIdStem(id1) === allLangUtils.getLObjIdStem(id2);
};

exports.translateAnnoTraitValue = (
  annoTraitKey,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annoTraitValue = structureChunk.annotations[annoTraitKey];

  let annotationToPlainspeakRef = refFxn.getAnnotationToPlainspeakRef();

  if (Object.keys(annotationToPlainspeakRef).includes(annoTraitKey)) {
    //gender: Removed vito5 in branch step-V-virility-tidying-and-overhaul-aka-vito, as seems obviated by vito2b.
    let adjustedAnnotation = annotationToPlainspeakRef.gender[annoTraitValue];

    if (
      ["gender", "semanticGender"].includes(annoTraitKey) &&
      structureChunk.virilityDetail &&
      structureChunk.virilityDetail.length
    ) {
      let plainspeakAnno =
        structureChunk.virilityDetail[0].slice(-1) === "!"
          ? structureChunk.virilityDetail[0].slice(0, -1)
          : structureChunk.virilityDetail[0];

      consol.logSpecial(
        8,
        `pwmi "${structureChunk.chunkId}" Setting plainspeakAnno to "${plainspeakAnno}".`
      );

      return plainspeakAnno;
    }

    let plainspeakAnno =
      typeof adjustedAnnotation === "string"
        ? adjustedAnnotation
        : uUtils.selectRandom(adjustedAnnotation);

    consol.logSpecial(
      8,
      `pwmj "${structureChunk.chunkId}" Setting plainspeakAnno to "${plainspeakAnno}".`
    );

    return plainspeakAnno;
  }

  consol.logSpecial(
    8,
    `pwmk "${structureChunk.chunkId}" Setting plainspeakAnno to "${annoTraitValue}".`
  );

  return annoTraitValue;
};

exports.standardiseGenders = (lang, traitValues, metagender) => {
  if (!metagender) {
    metagender = "_Genders";
  }

  //Fix for POL issue where counterfax sits were being generated using ["m","m1","f","virile","nonvirile"]
  //The "m" is unnecessary and causes checkthrow "knmo" later down the line.
  return traitValues.filter((tv) =>
    refObj.metaTraitValues[lang].gender[metagender].includes(tv)
  );
};

exports.collapseMasculineGenders = (lang, stCh) => {
  let ref = refObj.collapsibleMasculineGenders[lang];
  let genderTraitKeys = ["gender"];

  if (ref) {
    Object.keys(ref).forEach((numberTraitValue) => {
      Object.keys(ref[numberTraitValue]).forEach((collapsedGender) => {
        let collapsibleGenders = ref[numberTraitValue][collapsedGender];
        genderTraitKeys.forEach((genderTraitKey) => {
          if (stCh.number && stCh.number.length !== 1) {
            consol.throw("nbii");
          }
          if (stCh[genderTraitKey] && stCh[genderTraitKey].length !== 1) {
            consol.throw("nbij");
          }

          if (
            stCh.number &&
            stCh.number[0] === numberTraitValue &&
            stCh.number &&
            collapsibleGenders.includes(stCh[genderTraitKey][0])
          ) {
            stCh[genderTraitKey] = [collapsedGender];
          }
        });
      });
    });
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
    if (/^_/.test(genderValue)) {
      metaTranslatedGenderArr = [
        ...metaTranslatedGenderArr,
        ...refObj.metaTraitValues[currentLanguage].gender[genderValue],
      ];
    } else {
      metaTranslatedGenderArr.push(genderValue);
    }
  });
  gender = Array.from(new Set(metaTranslatedGenderArr));

  consol.logSpecial(4, "cecc gender after translating metas", gender);

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
      consol.log("fivk virilityRef=", virilityRef);
      consol.throw(
        `fivk ${currentLanguage} There was no numberFromGender for stCh "${structureChunk.chunkId}" structureChunk.gender="${structureChunk.gender}".`
      );
    }
    structureChunk.number = [numberFromGender];
  }
};

exports.setPostHocAgreeKeys = (structureChunk, currentLanguage) => {
  if (refObj.postHocDependentChunkWordtypes[currentLanguage]) {
    structureChunk["wordtype"] = idUtils.getWordtypeStCh(structureChunk);

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
  maqModes
) => {
  if (
    !maqModes.multipleMode &&
    sentenceFormula.orders.primary &&
    sentenceFormula.orders.primary.length > 1
  ) {
    sentenceFormula.orders.primary = [
      uUtils.selectRandom(sentenceFormula.orders.primary),
    ];
  }

  let { id, sentenceStructure } = sentenceFormula;

  allLangUtils.preprocessStructureChunks(sentenceStructure, currentLanguage);

  return {
    sentenceFormulaId: id,
    sentenceStructure,
  };
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);
  const defaultTraitValuesRef = refObj.defaultTraitValues;
  const metaTraitValuesRef = refObj.metaTraitValues[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (idUtils.getWordtypeStCh(structureChunk) === "fix") {
      return;
    }

    allLangUtils.setPostHocAgreeKeys(structureChunk, currentLanguage);
    allLangUtils.setMerelyPreferredChoices(structureChunk, currentLanguage);

    if (
      refFxn.isTraitCompatibleStCh("gender", structureChunk, currentLanguage)
    ) {
      if (!structureChunk.gender || !structureChunk.gender.length) {
        //Fill out if blank.
        refFxn.assignDefaultTraitValuesOrPossibleTraitValues(
          structureChunk,
          currentLanguage,
          "gender"
        );
      }
    }

    langUtils.preprocessStructureChunks(structureChunk);

    Object.keys(defaultTraitValuesRef).forEach((wordtype) => {
      if (idUtils.getWordtypeStCh(structureChunk) === wordtype) {
        Object.keys(defaultTraitValuesRef[wordtype]).forEach((traitKey) => {
          if (!structureChunk[traitKey] || !structureChunk[traitKey].length) {
            structureChunk[traitKey] = [
              uUtils.selectRandom(defaultTraitValuesRef[wordtype][traitKey]),
            ];

            if (traitKey === "person" && wordtype === "pro") {
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

    if (idUtils.getWordtypeStCh(structureChunk) === "pro") {
      allLangUtils.enforceThirdPersonAgreeWith(structureChunk, true);

      if (!structureChunk.gender || !structureChunk.gender.length) {
        structureChunk.gender = [];

        if (
          structureChunk.number &&
          structureChunk.number.includes("singular")
        ) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValuesRef["gender"]._SingularGenders,
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValuesRef["gender"]._PluralGenders,
          ];
        }
      }

      allLangUtils.enforceIsPerson(structureChunk);
    }

    if (idUtils.getWordtypeStCh(structureChunk) === "ver") {
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
          idUtils.getWordtypeAgree(structureChunk) === "pro"
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
      //   _PersonalGenders: ["m", "f", "virile", "nonvirile"],
      //   _SingularGenders: ["m", "f", "n"],
      //   _PersonalSingularGenders: ["m", "f"],
      //   _PluralGenders: ["virile", "nonvirile"],
      //   _Genders: ["m", "n", "f", "virile", "nonvirile"],
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
      !idUtils.traitValueIsMeta(selectedLemmaObject.gender)
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
      !idUtils.traitValueIsMeta(selectedLemmaObject.gender)
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
    lfUtils.selectRandTraitValue(selectedLemmaObject, structureChunk, "number");
  }

  consol.log(
    `wpok correctMetagenderByNumberInMGNs. "${structureChunk.chunkId}" has gender "${structureChunk.gender}", while selectedLemmaObject gender is "${lObjMetagender}".`
  );

  let metagenderCorrectedByNumberRef = refObj.metaCorrectionRef[
    currentLanguage
  ].gender.find(
    (obj) =>
      Object.keys(obj.condition).includes("number") &&
      obj.condition.number === structureChunk.number[0]
  ).changeRef;

  consol.log(
    `wpol correctMetagenderByNumberInMGNs. "${structureChunk.number[0]}" changeRef is:`,
    metagenderCorrectedByNumberRef
  );

  //2 Adjust lObjMetagender by number from stCh.
  // eg if stCh number singular, lObjMetagender goes from "_PersonalGenders" to "_PersonalSingularGenders".
  lObjMetagender = metagenderCorrectedByNumberRef[lObjMetagender];

  //3 Now convert that. let convertedLObjMetagenderArr = ["m1", "f"]
  let convertedLObjMetagenderArr =
    refObj.metaTraitValues[currentLanguage]["gender"][lObjMetagender];
  consol.log("tctt convertedLObjMetagenderArr", convertedLObjMetagenderArr);

  //4 If stCh has gender, then filter down so only the ones present in convertedLObjMetagenderArr remain.
  //  and if it doesn't have gender, set it as that.
  if (structureChunk.gender && structureChunk.gender.length) {
    //First adjust virility, so arr ["m"] when number plural doesn't get filtered to [].

    consol.logSpecial(
      4,
      "wwee structureChunk.gender was",
      structureChunk.gender
    );

    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk
    );

    consol.logSpecial(
      4,
      "wwee structureChunk.gender now",
      structureChunk.gender
    );

    structureChunk.gender = structureChunk.gender.filter((genderTraitValue) =>
      convertedLObjMetagenderArr.includes(genderTraitValue)
    );

    consol.logSpecial(
      4,
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
};
