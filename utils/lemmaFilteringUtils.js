const gpUtils = require("./generalPurposeUtils.js");
const idUtils = require("./identityUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const nexusUtils = require("../utils/secondOrder/nexusUtils.js");
const allLangUtils = require("./allLangUtils.js");
const { HY } = refObj;

exports.isStative = (lObj) => {
  return lObj.id.split("-").slice(-1)[0].includes("ß");
};

exports.checkHyper = (lObj, expectedTypes) => {
  if (expectedTypes.some((str) => !Object.values(HY).includes(str))) {
    consol.throw(
      'tyoe Wrong expectedTypes: ["' + expectedTypes.join('","') + '"]'
    );
  }
  return expectedTypes.includes(lfUtils.assessHypernymy(lObj));
};

exports.assessHypernymy = (lObj) => {
  let lang = idUtils.getLanguageFromLemmaObject(lObj);
  if (lang === "DUMMY") {
    return;
  }

  function _isHypernym(lObj) {
    return lObj.id.split("-").length > 4 && lObj.id.split("-")[4].includes("£");
  }
  function _isVypernym(lObj) {
    return lObj.id.split("-").length > 4 && lObj.id.split("-")[4].includes("€");
  }
  function _isAnswerChunkOfAQuestionChunkVypernym(lObj) {
    return lObj.id.split("-").length > 4 && lObj.id.split("-")[4].includes("¢");
  }

  if (_isAnswerChunkOfAQuestionChunkVypernym(lObj)) {
    return HY.AofQVY;
  } // Higher priority, ie a lobj with id "...£" which has become "...£¢" when this very fxn was run for Question Mode,
  // should in Answer Mode be returned as this type (¢), not hypernym type (£).

  if (_isHypernym(lObj)) {
    return HY.HY;
  }
  if (_isVypernym(lObj)) {
    return HY.VY;
  }

  let traductions = nexusUtils.getTraductions(lObj, lang, true);

  if (traductions.some((id) => _isHypernym({ id }))) {
    return HY.HO;
  }
  if (traductions.some((id) => _isVypernym({ id }))) {
    return HY.VO;
  }
};

exports.getLObjAndSiblings = (
  source,
  ids,
  blockHypernyms,
  label,
  qLObj,
  stChGender
) => {
  consol.logSpecial(7, "litd", label, blockHypernyms, "Looking for", ids);

  let additionalRes = [];

  let res = source.filter((lObj) => {
    let cease;
    return ids.some((specificId) => {
      if (cease) {
        return false;
      }

      if (!allLangUtils.compareLObjStems(lObj.id, specificId)) {
        return false;
      }

      if (
        qLObj &&
        lfUtils.checkHyper(qLObj, [HY.VY]) &&
        lfUtils.checkHyper(lObj, [HY.VY, HY.HY])
      ) {
        let lObjCopy = uUtils.copyWithoutReference(lObj);
        lObjCopy.id = lObjCopy.id + "¢";
        additionalRes.push(lObjCopy);
        consol.logSpecial(7, "Adding ¢", lObjCopy.id);
        return false;
      }

      // Nixed to allow Dziecko£ to translate as Baby.
      // if (
      //   qLObj &&
      //   ![HY.VY].includes(lfUtils.assessHypernymy(lObj)) &&
      //   ![HY.VY].includes(lfUtils.assessHypernymy(qLObj)) &&
      //   [HY.HY, HY.VY].includes(lfUtils.assessHypernymy(qLObj)) !==
      //     [HY.HY, HY.VY].includes(lfUtils.assessHypernymy(lObj))
      // ) {
      //   consol.logSpecial(7,"Chuck-red ", lObj.id);
      //   return false;
      // }

      // All these clauses not currently used, as blockHypernyms only invoked as false.
      if (blockHypernyms) {
        consol.throw(
          "Ah interesting, we are now invoking with blockHypernyms so can start using clauses below."
        );
        if (
          !lfUtils.checkHyper({ id: specificId }, [HY.HY, HY.VY, HY.AofQVY]) &&
          lfUtils.checkHyper(lObj, [HY.HY, HY.VY])
        ) {
          consol.logSpecial(7, "Chuck-yellow ", lObj.id);
          return false;
        }

        if (
          lfUtils.checkHyper({ id: specificId }, [HY.HY]) &&
          !lfUtils.checkHyper(lObj, [HY.HY])
        ) {
          consol.logSpecial(
            7,
            "Chuck-green ",
            lObj.id,
            "because of",
            specificId
          );
          return false;
        }

        if (
          lfUtils.checkHyper({ id: specificId }, HY.AofQVY) &&
          lfUtils.checkHyper(lObj, [HY.HY, HY.VY])
        ) {
          consol.logSpecial(7, "Yes-black ", lObj.id, "because of", specificId);
          return true;
        }

        if (
          !lfUtils.checkHyper({ id: specificId }, [HY.VY]) &&
          lfUtils.checkHyper(lObj, [HY.VY])
        ) {
          consol.logSpecial(7, "Chuck-blue ", lObj.id);
          return false;
        }
      }

      return true;
    });
  });

  if (additionalRes.length) {
    additionalRes.forEach((additionalLObj) => {
      if (res.some((l) => l.id === additionalLObj.id)) {
        consol.throw(`akdp ${l.id} in both additionalRes and res.`);
      }
    });
    res.push(...additionalRes);
  }

  if (!res || !res.length) {
    console.log(">>", ids);
    consol.throw(
      `epma getLObjAndSiblings found no matches for ids printed >> above.`
    );
  }

  consol.logSpecial(
    7,
    label,
    blockHypernyms,
    "epmb Got",
    res.map((l) => l.id)
  );

  return res;
};

exports.adjustHypernymyProportionTraitValues = (stCh, lObj) => {
  if (stCh.number.length > 1) {
    if (
      stCh.number.length > 2 ||
      !["singular", "plural"].every((tv) => stCh.number.includes(tv))
    ) {
      consol.throw("dlvu");
    }
    if (lfUtils.checkHyper(lObj, [HY.HY])) {
      return uUtils.selectRandom([
        "singular",
        "plural",
        "plural",
        "plural",
        "plural",
      ]);
    }
    if (lfUtils.checkHyper(lObj, [HY.HO, HY.VO])) {
      return uUtils.selectRandom([
        "singular",
        "singular",
        "singular",
        "singular",
        "plural",
      ]);
    }
  }
};

exports.adjustHypernymyProportionOutputUnits = (hypernymy, outputUnits) => {
  let proportionAdjustedOutputUnits = [];

  if ([HY.HY].includes(hypernymy)) {
    outputUnits.forEach((unit) => {
      proportionAdjustedOutputUnits.push(unit);

      if (
        unit.drillPath.some(
          (drillPathUnit) =>
            drillPathUnit[0] === "number" && drillPathUnit[1] === "plural"
        )
      ) {
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
      }
    });
  } else if ([HY.HO, HY.VO].includes(hypernymy)) {
    outputUnits.forEach((unit) => {
      proportionAdjustedOutputUnits.push(unit);

      if (
        unit.drillPath.some(
          (drillPathUnit) =>
            drillPathUnit[0] === "number" && drillPathUnit[1] === "singular"
        )
      ) {
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
        proportionAdjustedOutputUnits.push(unit);
      }
    });
  }

  return proportionAdjustedOutputUnits;
};

exports.selectRandOutputUnit = (lObj, stCh, outputUnits) => {
  let hypernymy = lfUtils.assessHypernymy(lObj);

  if (
    [HY.HY, HY.HO, HY.VO].includes(hypernymy) &&
    nexusUtils
      .getNexusLemmaObjects(lObj)
      .some((nlobj) => nlobj.requiresHypernymyProportionAdjust)
  ) {
    outputUnits = lfUtils.adjustHypernymyProportionOutputUnits(
      hypernymy,
      outputUnits
    );
  }

  return uUtils.selectRandom(outputUnits);
};

exports.selectRandLObj = (lObjs, stCh, lang) => {
  const _returnLObj = (lObj, stCh, label) => {
    consol.logSpecial(
      8,
      `\nrmbb selectRandLObj (via ${label}) selected "${lObj.id}"\n`
    );
    return lObj;
  };

  if (!lObjs.length && !res) {
    consol.throw(
      `ktrl ${lang} "${stCh.chunkId}" selectRandLObj failed to find lObj as input lObj array empty.`
    );
  }

  if (
    stCh.number &&
    stCh.number.includes("singular") &&
    stCh.number.includes("plural") &&
    stCh.number.length > 2
  ) {
    consol.throw("iwba");
  }

  if (stCh.originalSitSelectedLObj) {
    let matches = lfUtils.filterByDemandedLObj(stCh, lObjs);
    let res = uUtils.selectRandom(matches);

    consol.logSpecial(
      8,
      "byeh selectRandLObj There were",
      lObjs.length,
      "lObjs to choose from:",
      lObjs.map((l) => l.id)
    );

    if (!res) {
      consol.throw(
        `ktrm ${lang} "${stCh.chunkId}" selectRandLObj failed to find lObj from arr (-->above) via --stCh.originalSitSelectedLObj-- [${stCh.originalSitSelectedLObj.id}].`
      );
    }

    return _returnLObj(res, stCh, "originalSitSelectedLObj");
  }

  return _returnLObj(uUtils.selectRandom(lObjs), stCh, "simple path");
};

exports.selectRandTraitValue = (
  lObj,
  stCh,
  traitKey,
  traitValues = stCh[traitKey]
) => {
  if (
    traitKey === "number" &&
    lfUtils.checkHyper(lObj, [HY.HY, HY.HO, HY.VO]) &&
    nexusUtils
      .getNexusLemmaObjects(lObj)
      .some((nlobj) => nlobj.requiresHypernymyProportionAdjust)
  ) {
    let numberTraitValue = lfUtils.adjustHypernymyProportionTraitValues(
      stCh,
      lObj
    );
    if (!numberTraitValue) {
      consol.throw("diwm");
    }
    stCh[traitKey] = [numberTraitValue];
    return;
  }

  stCh[traitKey] = [uUtils.selectRandom(traitValues)];
};

exports.drillCarefullyIntoPHD = (source, key) => {
  if (!source) {
    consol.throw(
      `sidn stCh's form value '${key}' not present on this level of PHD lObj's inflections as that's null.`
    );
  } else if (!Object.keys(source).includes(key)) {
    consol.log(source);
    consol.throw(
      `sido stCh's form value '${key}' not present on this level of PHD lObj's inflections which had keys [${Object.keys(
        source
      ).join(",")}] See source above.`
    );
  } else {
    return source[key];
  }
};

exports.filterWithin_PHD = (
  lemmaObject,
  PHDstructureChunk,
  currentLanguage,
  maqModes,
  outputArray
) => {
  consol.log("pebb", {
    lemmaObject,
    PHDstructureChunk,
    currentLanguage,
    maqModes,
  });

  let drillPath = [];
  let drillPathSecondary = [];
  let drillPathTertiary = [];

  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);

  let postHocInflectionChains = refObj.postHocDependentChunkWordtypes[
    currentLanguage
  ].find(
    (PHD_dataObj) => PHD_dataObj.PHD_type === PHDstructureChunk.PHD_type
  ).inflectionChains;

  let lemmaObjectCopy = uUtils.copyWithoutReference(lemmaObject);

  langUtils.expandLemmaObjects(
    [lemmaObjectCopy],
    idUtils.getWordtypeStCh(PHDstructureChunk),
    currentLanguage
  );

  consol.log("terx filterWithin_PHD", {
    lemmaObjectCopy,
    PHDstructureChunk,
    currentLanguage,
    maqModes,
    outputArray,
    PHD_type: PHDstructureChunk.PHD_type,
    postHocInflectionChains,
  });
  // consol.logObjectTwoLevels(
  //   outputArray,
  //   "outputArray",
  //   "filterWithin_PHD"
  // );

  let source = uUtils.copyWithoutReference(lemmaObjectCopy.inflections);

  consol.log("giuy filterWithin_PHD. source", source);

  if (
    !(
      Array.isArray(PHDstructureChunk.form) &&
      PHDstructureChunk.form.length === 1
    )
  ) {
    consol.throw(
      `sidm Needed 'form' to be exactly one value on PHDstructureChunk but was`,
      PHDstructureChunk.form
    );
  } else {
    source = lfUtils.drillCarefullyIntoPHD(source, PHDstructureChunk.form[0]);
  }

  Object.keys(postHocInflectionChains).forEach((postHocAgreeKey) => {
    let postHocInflectionChain = postHocInflectionChains[postHocAgreeKey];

    consol.log(
      "[1;35m " +
        `nvnm lf:filterWithin_PHD Running loop for "${postHocAgreeKey}" which has postHocInflectionChain [${postHocInflectionChain.join(
          ","
        )}]` +
        "[0m"
    );
    consol.log(
      "[1;33m " + `outputArray: [${outputArray.map((x) => x.selectedWord)}]` + "[0m"
    );

    if (!postHocInflectionChain.length) {
      return;
    }

    let headOutputUnit = outputArray.find(
      (outputUnit) =>
        outputUnit.structureChunk.chunkId === PHDstructureChunk[postHocAgreeKey]
    );

    let drillPathOfHead = uUtils.copyWithoutReference(headOutputUnit.drillPath);

    if (!drillPathOfHead) {
      consol.throw(
        "#ERR jzbx filterWithin_PHD. There is no drillPath on the outputUnit with which I want to get inflections from the PHD stCh. Perhaps this outputUnit is one whose stCh did not go through If-PW?"
      );
    }

    if (PHDstructureChunk.form) {
      if (PHDstructureChunk.form.length !== 1) {
        consol.throw(
          "#ERR cwyd filterWithin_PHD. Expected PHDstructureChunk.form to have length of 1: " +
            PHDstructureChunk.chunkId
        );
      }

      consol.log(
        `ijef filterWithin_PHD. Updating drillPathOfHead with form "${PHDstructureChunk.form[0]}"`
      );
      drillPathOfHead.push(["form", PHDstructureChunk.form[0]]);
    }

    if (
      ["nco", "npe"].includes(
        idUtils.getWordtypeAgree(PHDstructureChunk, postHocAgreeKey)
      )
    ) {
      let personArr = drillPathOfHead.find((arr) => arr[0] === "person");

      if (!personArr) {
        consol.log(
          `ijeg filterWithin_PHD. Updating drillPathOfHead with person "3per"`
        );
        drillPathOfHead.push(["person", "3per"]);
      } else if (personArr && personArr[1] !== "3per") {
        personArr[1] = "3per";
      }
    }

    // consol.log("dxxd headOutputUnit", headOutputUnit);

    if (headOutputUnit.selectedLemmaObject.gender) {
      if (!drillPathOfHead.find((arr) => arr[0] === "gender")) {
        let numberArr = drillPathOfHead.find((arr) => arr[0] === "number");

        let numberTraitValue = numberArr[1];

        let formattedInflectionKeyArray = langUtils.formatTraitValue(
          "gender",
          headOutputUnit.selectedLemmaObject.gender,
          numberTraitValue
        );

        if (formattedInflectionKeyArray.length !== 1) {
          formattedInflectionKeyArray =
            headOutputUnit.structureChunk.gender.slice();
        }

        if (formattedInflectionKeyArray.length !== 1) {
          consol.log(
            "formattedInflectionKeyArray:",
            formattedInflectionKeyArray
          );
          consol.throw(
            "#ERR ikdr lf:filterWithin_PHD. Expected formattedInflectionKeyArray to have length 1 but see above:"
          );
        }

        consol.log(
          `ijeg filterWithin_PHD. Updating drillPathOfHead with gender [${formattedInflectionKeyArray.join(
            ","
          )}]`
        );
        drillPathOfHead.push(["gender", formattedInflectionKeyArray[0]]);
      } else {
        throw "I am unsure about which gender to use - either the one from lobj inherent, or the one from drillPath. I wanted to use this gender for the PHD stCh.";
      }
    }

    postHocInflectionChain.forEach((inflectionCategory) => {
      let inflectionKey = drillPathOfHead.find(
        (arr) => arr[0] === inflectionCategory
      )[1];

      if (idUtils.traitValueIsMeta(inflectionKey) && !source[inflectionKey]) {
        consol.logCyanWithBorder(
          "igyd Surprisingly s'witchMetaTraitValueForAWorkableConvertedTraitValue() is now used, though I would have expected by this point the lObjs have been expanded, ie the meta trait values inside their inflections object have been replaced, so odd that we reach this point now."
        );
        inflectionKey =
          otUtils.switchMetaTraitValueForAWorkableConvertedTraitValue(
            inflectionCategory,
            inflectionKey,
            source,
            currentLanguage,
            PHDstructureChunk,
            "filterWithin_PHD -> postHocInflectionChain.forEach"
          );
      }

      source = lfUtils.drillCarefullyIntoPHD(source, inflectionKey);

      consol.log(
        `\nihjy lf:filterWithin_PHD "${postHocAgreeKey}" drilling into source with "${inflectionKey}" so source is now`,
        // source,
        "\n"
      );

      //Update drillPath, for both ...Pri and ...Sec

      consol.log("viko", { postHocAgreeKey }, drillPathOfHead);

      if (/.*Primary/.test(postHocAgreeKey)) {
        lfUtils.updateStChByInflections(
          { structureChunk: PHDstructureChunk, drillPath: drillPathOfHead },
          currentLanguage
        );
      } else if (/.*Secondary/.test(postHocAgreeKey)) {
        drillPathSecondary.push([inflectionCategory, inflectionKey]);
      } else if (/.*Tertiary/.test(postHocAgreeKey)) {
        drillPathTertiary.push([inflectionCategory, inflectionKey]);
      } else {
        consol.throw(
          `mezp filterWithin_PHD. Malformed postHocAgreeKey: "${postHocAgreeKey}".`
        );
      }

      //Update stCh with these inflectionCategorys and inflectionKeys, but just for postHocAgreeWithPrimary.
      // if (/.*Primary/.test(postHocAgreeKey)) {
      //   lfUtils.updateStChByInflections(
      //     { structureChunk: PHDstructureChunk, drillPath: drillPathOfHead },
      //     currentLanguage
      //   );

      //   drillPath.push([inflectionCategory, inflectionKey]);
      // } else if (/.*Secondary/.test(postHocAgreeKey)) {
      //   drillPathSecondary.push([inflectionCategory, inflectionKey]);
      // } else if (/.*Tertiary/.test(postHocAgreeKey)) {
      //   drillPathTertiary.push([inflectionCategory, inflectionKey]);
      // } else {
      //   consol.throw(
      //     `mezp filterWithin_PHD. Malformed postHocAgreeKey: "${postHocAgreeKey}".`
      //   );
      // }
    });
  });

  consol.log("-----------------------tiko");
  consol.log("drillPath", drillPath);
  consol.log("drillPathSecondary", drillPathSecondary);
  consol.log("drillPathTertiary", drillPathTertiary);
  consol.log("--------------------------");

  let sourceArr = [];
  let resArr = [];

  if (Array.isArray(source)) {
    consol.log(
      "[1;33m " +
        `apcu lf:filterWithin_PHD, the variable called source, is ARRAY` +
        "[0m",
      { source }
    );
    consol.throw("apcu lf:filterWithin_PHD Oh no Natasha, array!");
  } else if (
    typeof source === "string" ||
    (idUtils.isTerminusObject(source) && source.processOnlyAtEnd)
  ) {
    sourceArr.push(source);
  } else if (idUtils.isTerminusObject(source) && !source.processOnlyAtEnd) {
    consol.throw("svqe filterWithin_PHD Natasha, take action.");
  } else {
    consol.throw(
      "#ERR dyqk filterWithin_PHD. Expected this PHD inflectorValue to be the end of a chain and thus a string or array."
    );
  }

  sourceArr.forEach((selectedWord) => {
    consol.log(
      `rzcs filterWithin_PHD. Pushing this selectedWord "${selectedWord}" with drillPath ${drillPath}.`
    );

    let resultingOutputUnit = {
      errorInDrilling: false,
      selectedWordArray: [selectedWord],
      drillPath,
    };

    if (drillPathSecondary.length) {
      resultingOutputUnit.drillPathSecondary = drillPathSecondary;
    }

    if (drillPathTertiary.length) {
      resultingOutputUnit.drillPathTertiary = drillPathTertiary;
    }

    consol.log(
      "iqoe filterWithin_PHD. resultingOutputUnit",
      resultingOutputUnit
    );

    resArr.push(resultingOutputUnit);
  });

  consol.log(
    "[1;35m " +
      "blij lf:filterWithin_PHD At the END lf:filterWithin PHD section, PHDstructureChunk is:" +
      "[0m",
    PHDstructureChunk
  );
  consol.log("[1;35m " + "blij lf:filterWithin_PHD resArr is" + "[0m", resArr);
  return resArr;
};

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage,
  maqModes,
  outputArray,
  isPHD
) => {
  if ("console") {
    if (outputArray) {
      consol.log(
        "[1;33m " +
          `nvnl filterWithinSelectedLemmaObject outputArray: [${outputArray.map(
            (x) => x.selectedWord
          )}]` +
          "[0m"
      );
    } else {
      consol.log(
        "[1;33m " + `nvnl filterWithinSelectedLemmaObject outputArray null` + "[0m"
      );
    }
  }

  if (isPHD) {
    return lfUtils.filterWithin_PHD(
      lemmaObject,
      structureChunk,
      currentLanguage,
      maqModes,
      outputArray
    );
  }

  const langUtils = require(`../source/all/${currentLanguage}/langUtils.js`);

  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.

  let inflectionChain =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      idUtils.getWordtypeStCh(structureChunk)
    ];

  let requirementArrs = [];

  inflectionChain.forEach((inflectionCategory) => {
    let inflectionKeyArr = [];

    if (structureChunk[inflectionCategory]) {
      structureChunk[inflectionCategory].forEach((inflectionKey) => {
        let formattedInflectionKeyArr = langUtils.formatTraitValue(
          inflectionCategory,
          inflectionKey
        );
        inflectionKeyArr = [...inflectionKeyArr, ...formattedInflectionKeyArr];
      });
    }

    requirementArrs.push([inflectionCategory, inflectionKeyArr]);
  });

  if (!requirementArrs.length) {
    consol.log("zyan filterWithin structureChunk", structureChunk);
    consol.log("zyan filterWithin inflectionChain", inflectionChain);
    consol.throw(
      "zyan filterWithin requirementArrs ended with length 0, so the above fxn didn't do anything. I have console logged inflectionChain above, to help."
    );
  }

  let errorInDrilling = false;
  let outputUnitsWithDrillPaths = [];
  let source = lemmaObject.inflections;

  consol.log(
    "pazk filterWithin now entering traverseAndRecordInflections with args:"
  );
  consol.log("paz'k source", source);
  consol.log("paz'k requirementArrs", requirementArrs);

  lfUtils.traverseAndRecordInflections(
    source,
    requirementArrs,
    outputUnitsWithDrillPaths,
    null,
    structureChunk,
    maqModes,
    currentLanguage,
    "filterWithin" //deletable
  );

  if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
    consol.log(
      "\n\n\n iszn I failed when searched with these requirementArrs",
      requirementArrs,
      "\n\n\n iszn when I was looking inside this source"
    );
    consol.logObjectTwoLevels(source);
    consol.log("\n\n\n");

    consol.log(
      // consol.throw(
      //xpublish: This should not be a throw when in PROD.
      "[1;31m " +
        `#WARN/#ERR iszn lf:filterWithinSelectedLemmaObject. traverseAndRecordInflections returned FALSY for "${structureChunk.chunkId}" in "${currentLanguage}". See requirementArrs above.` +
        "[0m"
    );

    errorInDrilling = true;

    return false;
  }

  outputUnitsWithDrillPaths.forEach((selectedPath) => {
    selectedPath.errorInDrilling = errorInDrilling;
  });

  return outputUnitsWithDrillPaths;
};

exports.updateStructureChunk = (
  outputUnit,
  currentLanguage,
  isSecondRound,
  isCounterfax
) => {
  let shouldConsoleLog = true;

  if (shouldConsoleLog) {
    consol.log(
      "[1;33m " +
        `aizl updateStructureChunk "${outputUnit.structureChunk.chunkId}" "${outputUnit.selectedWord}" ---------------------------` +
        "[0m"
    );

    consol.log(
      "rcws updateStructureChunk BEFORE UB-Inf and UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );
  }

  lfUtils.updateStChByInflections(outputUnit, currentLanguage);

  if (shouldConsoleLog) {
    consol.log(
      "xppx updateStructureChunk AFTER UB-Inf but BEFORE UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );
  }

  lfUtils.updateStChByAndTagsAndSelectors(
    outputUnit,
    currentLanguage,
    isSecondRound,
    isCounterfax
  );

  //Vito2: Changes stCh.
  //If during this updateStructureChunk fxn, stCh gets gender "f" and number "plural", its gender will adjust to "nonvirile".
  allLangUtils.adjustVirilityOfStructureChunk(
    currentLanguage,
    outputUnit.structureChunk,
    false
  );

  if (shouldConsoleLog) {
    consol.log(
      "wbxe updateStructureChunk AFTER UB-Inf and UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );
    consol.log(" ");
  }
};

exports.updateStChByAndTagsAndSelectors = (
  outputUnit,
  currentLanguage,
  isSecondRound,
  isCounterfax
) => {
  let { selectedLemmaObject, structureChunk, selectedWord, drillPath } =
    outputUnit;

  consol.logSpecial(
    8,
    "[1;36m " +
      `${currentLanguage} "${
        structureChunk.chunkId
      }" updateStChByAndTagsAndSelectors ${
        isSecondRound ? "SECOND/LATER" : "FIRST"
      } round.` +
      "[0m"
  );

  consol.log(
    "[1;35m " + `rakt updateStChByAndTagsAndSelectors--------------------` + "[0m"
  );
  consol.log(
    `updateStChByAndTagsAndSelectors "${structureChunk.chunkId}" starts as`,
    structureChunk
  );
  consol.log(
    "updateStChByAndTagsAndSelectors selectedLemmaObject is",
    selectedLemmaObject
  );

  let doneSelectors = [];

  //STEP MINUS ONE
  // Specially handle stCh's where lObj has a semanticGender.
  // eg stCh gender ["f"], and lObj "rodzic" which has gender "m1" and semanticGender "_PersonalGenders"
  // but if I didn't step in here, stCh would end up with gender "m1" which is wrong.

  lfUtils.updateStChSemanticGenderAndVirilityDetail(
    selectedLemmaObject,
    structureChunk,
    currentLanguage,
    isCounterfax,
    doneSelectors,
    outputUnit,
    isSecondRound
  );

  //STEP ZERO: Decisive Decant
  //Remove gender traitValues on stCh if drillPath doesn't include the traitKey 'gender' (ie is infinitive or a participle, say).
  //But if lObj is MGN, don't do this.
  let lemmaObjectIsMGN = idUtils.traitValueIsMeta(selectedLemmaObject.gender);

  if (
    !doneSelectors.includes("gender") &&
    !lemmaObjectIsMGN &&
    drillPath &&
    !drillPath.map((arr) => arr[0]).includes("gender") &&
    refFxn.isTraitCompatibleLObj("gender", selectedLemmaObject, currentLanguage)
  ) {
    structureChunk.gender = [];
  }

  //STEP ONE: Update stCh gender with that of lObj, handling meta trait values too.
  // For all lexical traitKeys, if the lObj has a meta trait value eg {aspect: "_imOnly"} or {gender: "_PersonalGenders"}.

  const lexicalTraits = refFxn.getStructureChunkTraits(currentLanguage, true);

  Object.keys(lexicalTraits).forEach((traitKey) => {
    if (doneSelectors.includes(traitKey)) {
      return;
    }

    if (idUtils.traitValueIsMeta(selectedLemmaObject[traitKey])) {
      //If lObj does have metaTrait, set stCh trait to converted traitValues or filter stCh's trait by them.

      consol.log(
        `nxej updateStChByAndTagsAndSelectors Clause S: lObj "${selectedLemmaObject.lemma}" has metaSelector trait`
      );
      consol.log("nxej updateStChByAndTagsAndSelectors", structureChunk);
      consol.log(
        "[1;33m " +
          `nxej updateStChByAndTagsAndSelectors in clause S start "${structureChunk[traitKey]}"` +
          "[0m"
      );

      let metaTrait = selectedLemmaObject[traitKey];

      consol.logSpecial(8, `cdee`, {
        currentLanguage,
        traitKey,
        metaTrait,
      });

      let refAdjustedTraitKey =
        traitKey === "semanticGender" ? "gender" : traitKey;

      let metaTraitConverted =
        refObj.metaTraitValues[currentLanguage][refAdjustedTraitKey][metaTrait];

      if (structureChunk[traitKey] && structureChunk[traitKey].length) {
        structureChunk[traitKey] = structureChunk[traitKey].filter(
          (traitValue) => metaTraitConverted.includes(traitValue)
        );
      } else {
        structureChunk[traitKey] = metaTraitConverted.slice(0);
      }
      doneSelectors.push(traitKey);
      consol.log(
        "[1;33m " +
          `qdtx updateStChByAndTagsAndSelectors in clause S end "${structureChunk[traitKey]}"` +
          "[0m"
      );
    }
  });

  if (selectedLemmaObject.gender && !doneSelectors.includes("gender")) {
    //If lObj has non-meta-gender, then update stCh with lObj gender.
    consol.log(
      "ijfw updateStChByAndTagsAndSelectors Clause R: lObj does not have metaSelector gender"
    );
    structureChunk.gender = [selectedLemmaObject.gender];
    doneSelectors.push("gender");
  }

  let selectedLemmaObjectTags = nexusUtils.getPapers(selectedLemmaObject);

  //STEP TWO: Update the stCh's andTags with the lObj's tags.
  if (structureChunk.andTags && structureChunk.andTags.length) {
    structureChunk.andTags = structureChunk.andTags.filter((andTag) =>
      selectedLemmaObjectTags.includes(andTag)
    );
  } else {
    consol.log(
      "[1;31m " +
        `vwaw updateStChByAndTagsAndSelectors Just to note that this stCh has no andTags, and I am adding them from lObj. Perhaps I should no nothing here instead: "${currentLanguage}" "${structureChunk.chunkId}"` +
        "[0m"
    );

    structureChunk.andTags = selectedLemmaObjectTags.slice(0);
  }

  //STEP THREE: For all remaining selectors, update the stCh with traitValues from lObj.
  let selectors =
    refObj.lemmaObjectTraitKeys[currentLanguage].selectors[
      idUtils.getWordtypeStCh(structureChunk)
    ];

  consol.log("abyy updateStChByAndTagsAndSelectors", { doneSelectors });

  if (selectors) {
    selectors
      .filter((selector) => !doneSelectors.includes(selector))
      .forEach((selector) => {
        if (idUtils.traitValueIsMeta(selectedLemmaObject[selector])) {
          consol.throw(
            `oppb updateStChByAndTagsAndSelectors I wasn't expecting a metaTraitValue selector here. It should have been processed already, in step one, and then added to doneSelectors, which would have prevented it being used here. selectedLemmaObject[selector]:"${selectedLemmaObject[selector]}"`
          );
        }

        structureChunk[selector] = [selectedLemmaObject[selector]];
      });
  } else {
    consol.log(
      "[1;31m " +
        `vbob updateStChByAndTagsAndSelectors Just to note that refObj gave no selectors for currentLanguage "${currentLanguage}" and s'tructureChunk.wordtype "${idUtils.getWordtypeStCh(
          structureChunk
        )}"` +
        "[0m"
    );
  }

  //STEP FOUR: Selectors that must be handled specially.

  if (
    !structureChunk.doNotUpdateSpecificIdsAsIsJustOneMGN &&
    structureChunk.specificIds &&
    structureChunk.specificIds.length
  ) {
    structureChunk.specificIds = [selectedLemmaObject.id];
  }

  consol.log(
    `raku updateStChByAndTagsAndSelectors "${structureChunk.chunkId}" ends as`,
    structureChunk
  );
  consol.log("[1;35m " + `/updateStChByAndTagsAndSelectors` + "[0m");
};

exports.updateStChByInflections = (outputUnit, currentLanguage) => {
  if (outputUnit.drillPath) {
    outputUnit.drillPath.forEach((drillPathSubArr) => {
      let requiredInflectionCategory = drillPathSubArr[0];
      let val = drillPathSubArr[1];
      let selectedInflectionKeys;
      if (Array.isArray(val)) {
        selectedInflectionKeys = val;
      } else if (typeof val === "string") {
        selectedInflectionKeys = [val];
      } else {
        consol.throw(
          `twsi Expected arr or string for this value in drillPath but got ${typeof val}.`
        );
      }

      outputUnit.structureChunk[requiredInflectionCategory] =
        selectedInflectionKeys;
    });
  }
};

exports.filterOutLackingLemmaObjects = (sourceArr, stCh, currentLanguage) => {
  let inflectionChain =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      idUtils.getWordtypeStCh(stCh)
    ];
  let requirementArrs = inflectionChain.map((traitKey) => stCh[traitKey] || []);

  return sourceArr.filter((lObj) => {
    if (!lObj.lacking) {
      return true;
    } else {
      if (
        refObj.tantumTypes.some(
          (tantum) =>
            lObj[tantum] &&
            (!stCh.blockedLemmaObjectTypes ||
              !stCh.blockedLemmaObjectTypes.includes(tantum))
        )
      ) {
        return true;
      }

      let { routesByNesting, routesByLevel } = otUtils.extractNestedRoutes(
        lObj.inflections
      );

      let inflectionPathsInSource = routesByNesting;

      let inflectionPathsInRequirements = otUtils.concoctNestedRoutes(
        requirementArrs,
        routesByLevel
      );

      return inflectionPathsInRequirements.some((inflectionPathReq) =>
        inflectionPathsInSource.some((inflectionPathSource) =>
          uUtils.areTwoFlatArraysEqual(inflectionPathReq, inflectionPathSource)
        )
      );
    }
  });
};

exports.filterByTags = (lemmaObjects, structureChunk) => {
  lemmaObjects = lemmaObjects.slice();

  let { andTags, orTags } = structureChunk;

  if (andTags && andTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) => {
      lemmaObjectTags = nexusUtils.getPapers(lemmaObject);
      return andTags.every((andTag) => lemmaObjectTags.includes(andTag));
    });
  }

  if (orTags && orTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) => {
      lemmaObjectTags = nexusUtils.getPapers(lemmaObject);
      return orTags.some((orTag) => lemmaObjectTags.includes(orTag));
    });
  }

  return lemmaObjects;
};

exports.padOutRequirementArrWithMetaTraitValuesIfNecessary = (
  requirementArrs,
  traitKey,
  currentLanguage
) => {
  let requirementArr = requirementArrs[traitKey] || [];

  let refAdjustedTraitKey = traitKey === "semanticGender" ? "gender" : traitKey;
  let metaTraitValueRef =
    refObj.metaTraitValues[currentLanguage][refAdjustedTraitKey];

  consol.log(
    "[1;35m " +
      `opoq lf:filterBySelector_inner-------------------------- for traitKey "${traitKey}"` +
      "[0m"
  );
  consol.log(
    "opoq lf:filterBySelector_inner requirementArr starts as",
    requirementArr
  );

  if (metaTraitValueRef) {
    requirementArr.forEach((traitValue) => {
      //If the reqArr has a metaTraitValue, all lObj with converted traitValues to pass filter.
      if (idUtils.traitValueIsMeta(traitValue)) {
        let metaTraitValueConverted = metaTraitValueRef[traitValue];

        if (!metaTraitValueConverted) {
          consol.throw(
            "#ERR tufx lf:filterBySelector_inner. filterBySelector_inner need converted metaTraitValue."
          );
        }
        consol.log(
          `ndew filterBySelector_inner. Gonna push metaTraitValueConverted [${metaTraitValueConverted}]`
        );
        requirementArr = [...requirementArr, ...metaTraitValueConverted];
      }

      //But also need do the inverse of this. If reqArr has 'f', then allow lObj to pass filter if lObj gender is '_SingularGenders' eg.
      Object.keys(metaTraitValueRef).forEach((metaTraitValue) => {
        let ConvertedMetaTraitValueArr = metaTraitValueRef[metaTraitValue];

        if (
          ConvertedMetaTraitValueArr.includes(traitValue) &&
          !requirementArr.includes(metaTraitValue)
        ) {
          consol.log(
            `exnh filterBySelector_inner. Gonna push metaTraitValue "${metaTraitValue}"`
          );
          requirementArr.push(metaTraitValue);
        }
      });

      consol.log(
        "sfrl lf:filterBySelector_inner requirementArr inside ```requirementArr.forEach((traitValue)``` is",
        requirementArr
      );
    });
  } else {
    consol.log(
      "[1;31m " +
        `jwpv lf:filterBySelector_inner saw there was no metaTraitValueRef for currentLanguage "${currentLanguage}" and traitKey "${traitKey}"` +
        "[0m"
    );
  }

  consol.log(
    "qyvu lf:filterBySelector_inner requirementArr ends as",
    requirementArr
  );

  return requirementArr;
};

exports.filterBySelector_inner = (
  lemmaObjectArr,
  structureChunk,
  traitKey,
  currentLanguage,
  answerMode,
  questionOutputArr
) => {
  consol.logSpecial(
    8,
    `etpa ${currentLanguage} ${structureChunk.chunkId} ${
      answerMode ? "answerMode" : "questionMode"
    } filterBySelector_inner START. structureChunk`,
    structureChunk,
    "and possible lObjs are:",
    lemmaObjectArr.map((l) => l.id)
  );

  //
  // Get materials.
  //
  let questionChunk;
  let questionSelectedLemmaObject;
  if (answerMode) {
    let ou = questionOutputArr.find(
      (ou) => ou.structureChunk.chunkId === structureChunk.chunkId
    );
    if (ou) {
      questionChunk = ou.structureChunk;
      questionSelectedLemmaObject = ou.selectedLemmaObject;

      if (
        !questionSelectedLemmaObject &&
        idUtils.getWordtypeStCh(questionChunk) !== "fix"
      ) {
        consol.throw("bdwo answer mode but no questionSelectedLemmaObject?");
      }
    } else {
      console.log(
        "[1;31m " +
          `slmr No questionChunk for answerChunk "${structureChunk.chunkId}".` +
          "[0m"
      );
    }
  }

  //
  // Deal with hypernyms.
  //

  if (answerMode && questionChunk) {
    //
    // Return now with hypernyms and MGNs if qChunk is hypernym.
    //
    if (
      questionSelectedLemmaObject &&
      lfUtils.checkHyper(questionSelectedLemmaObject, [HY.HY])
    ) {
      let hypernymsAndMGNs = lemmaObjectArr.filter(
        (l) =>
          this.checkHyper(l, [HY.HY]) ||
          ["_Genders", "_PersonalGenders"].includes(l.gender)
        // || ["_Genders", "_PersonalGenders"].includes(l.semanticGender)
      );

      if (hypernymsAndMGNs.length) {
        consol.logSpecial(
          8,
          `\netpz ${currentLanguage} ${
            answerMode ? "answerMode" : "questionMode"
          } Big override right at the start of filterBySelector_inner for stCh "${
            structureChunk.chunkId
          }" because Q chunk is hypernym so I will return hypernyms/MGNs for A chunks.`,
          hypernymsAndMGNs.map((l) => l.id)
        );
        return hypernymsAndMGNs;
      }
    }

    //
    // Garibaldi part 3
    //

    // section A
    let checkString1 = lemmaObjectArr.map((l) => l.id).join(", ");
    if (
      answerMode &&
      questionChunk.virilityDetail &&
      ["males!", "male!"].includes(questionChunk.virilityDetail[0])
    ) {
      lemmaObjectArr = lemmaObjectArr.filter(
        (l) => !lfUtils.checkHyper(l, [HY.HY])
      );
    }

    // section B
    if (
      answerMode &&
      questionChunk.virilityDetail &&
      questionChunk.virilityDetail[0] === "mixed"
    ) {
      lemmaObjectArr = lemmaObjectArr.filter(
        (l) =>
          lfUtils.checkHyper(l, [HY.HY, HY.VY]) || //Garibaldi could be a pain point, perhaps should only be HY.HY here.
          l.gender !==
            refObj.malePersonsInThisLanguageHaveWhatGender[currentLanguage]
      );
    }

    let checkString2 = lemmaObjectArr.map((l) => l.id).join(", ");

    if (checkString1 !== checkString2) {
      consol.logSpecial(
        8,
        `sswl Adjusted lemmaObjectArr re virilityDetail "${questionChunk.virilityDetail}" so was [${checkString1}] but is now [${checkString2}].`
      );
    }
    if (!lemmaObjectArr.length) {
      console.log(
        "[1;31m " +
          `sswm ${currentLanguage} ${structureChunk.chunkId} ${
            answerMode ? "answerMode" : "questionMode"
          } No lObjs found in filterBySelector_inner` +
          "[0m"
      );
    }
  }

  //
  // Adjust in case of semanticGender.
  //
  let requirementArray = structureChunk[traitKey] || [];

  if (traitKey === "gender" && structureChunk.semanticGender) {
    if (answerMode) {
      requirementArray = [...structureChunk.semanticGender];
    } else {
      requirementArray = [
        ...requirementArray,
        ...structureChunk.semanticGender,
      ];
    }
  }

  let refAdjustedTraitKey = traitKey === "semanticGender" ? "gender" : traitKey;
  let metaTraitValueRef =
    refObj.metaTraitValues[currentLanguage][refAdjustedTraitKey];

  consol.log("wdet filterBySelector_inner. requirementArray", requirementArray);

  //
  // Finally, do the filter.
  //
  if (requirementArray.length) {
    consol.logSpecial(
      8,
      "[1;35m " +
        `\netpb ${currentLanguage} ${
          answerMode ? "answerMode" : "questionMode"
        } Right! Let's filterBySelector_inner for stCh "${
          structureChunk.chunkId
        }" with requirementArray` +
        "[0m",
      requirementArray
    );

    let filteredLemmaObjectArr = lemmaObjectArr.filter((lObj) => {
      if (
        answerMode &&
        questionSelectedLemmaObject &&
        lfUtils.checkHyper(questionSelectedLemmaObject, [HY.HO, HY.VO]) &&
        lfUtils.checkHyper(lObj, [HY.HY])
      ) {
        //Garibaldi part 2
        consol.logSpecial(8, `mbtt Kicking out "${lObj.id}"`);
        return false;
      }

      let lObjSelectorValues = [lObj[traitKey]].slice(0);

      //
      // Adjust virility of lObj values.
      //

      //Vito3: Does not change stCh.
      //Filtering lObjs by selector (eg "gender", "aspect").
      //Say lObj has gender "f", but reqArr has "nonvirile" - lObj wouldn't pass the filter, but it should.
      //So add virility values to temporary lObjSelectorValues variable that stands for selectors on the lObj.
      //Now lObj stand-in has genders "f" and "nonvirile" also, so passes filter.

      if (traitKey === "gender") {
        structureChunk.number.forEach((numberKey) => {
          let extraVirilityConvertedValues =
            refObj.virilityConversionRef[currentLanguage][numberKey][
              lObj[traitKey]
            ];

          consol.log({
            currentLanguage,
            numberKey,
            traitKey,
            "lObj[traitKey]": lObj[traitKey],
          });
          consol.log(
            "wdee . extraVirilityConvertedValues",
            extraVirilityConvertedValues
          );

          if (extraVirilityConvertedValues) {
            lObjSelectorValues = [
              ...lObjSelectorValues,
              ...extraVirilityConvertedValues,
            ];
          }
        });

        // Neon Approach to Vypernyms issue 205:
        if (lObj.semanticGender) {
          lObjSelectorValues.push(lObj.semanticGender);
        }
      }

      //ADJUST META OF LOBJ VALUES
      //stCh could have gender "m", but that would fail to select lObj ENG doctor with gender "_PersonalGenders".
      //So add the translations of the lObj's metagender to its lObjSelectorValues arr.

      consol.logSpecial(
        8,
        `etpc "${lObj.id}" lObjSelectorValues is`,
        lObjSelectorValues
      );

      if (
        // Garibaldi Condition for finishing up Neon Approach to vypernyms issue 205.
        !answerMode &&
        this.checkHyper(lObj, [HY.VY])
      ) {
        lObjSelectorValues = lObjSelectorValues.filter(
          (tv) => !idUtils.traitValueIsMeta(tv)
        );
      } else {
        let additional = [];
        lObjSelectorValues.forEach((lObjSelectorValue) => {
          if (idUtils.traitValueIsMeta(lObjSelectorValue)) {
            if (!metaTraitValueRef) {
              consol.throw(
                `diof I am to translate this meta value "${lObjSelectorValue}" for "${currentLanguage}" traitKey "${traitKey}" but no such translation ref?`
              );
            }
            let translatedMetaValues = metaTraitValueRef[lObjSelectorValue];
            additional = [...additional, ...translatedMetaValues];
          }
        });
        lObjSelectorValues = [...lObjSelectorValues, ...additional];
      }
      consol.logSpecial(
        8,
        `etpd but after unpacking/deleting meta is`,
        lObjSelectorValues
      );

      let bool = lObjSelectorValues.some((lObjSelectorValue) =>
        requirementArray.includes(lObjSelectorValue)
      );

      consol.logSpecial(
        8,
        "\netpe              ",
        lObj.lemma,
        bool ? "YES" : "NO",
        "because lObjSelectorValues (printed above) fit requirementArray (printed higher above).\n"
      );

      return bool;
    });

    // // Kurzon solution
    // if (
    //   answerMode &&
    //   questionChunk &&
    //   questionSelectedLemmaObject &&
    //   idUtils.stChIsNounPerson(questionChunk) &&
    //   requirementArray.length === 1
    // ) {
    //   if (lfUtils.checkHyper(questionSelectedLemmaObject, [HY.HY])) {
    //     let _filteredLemmaObjectArr = filteredLemmaObjectArr.filter((l) =>
    //       lfUtils.checkHyper(l, [HY.VY, HY.HY])
    //     );
    //     if (_filteredLemmaObjectArr.length) {
    //       return _filteredLemmaObjectArr;
    //     }
    //   }
    //   if (lfUtils.checkHyper(questionSelectedLemmaObject, [HY.VY])) {
    //     let _filteredLemmaObjectArr = filteredLemmaObjectArr.filter((l) =>
    //       lfUtils.checkHyper(l, [HY.VY, HY.HY])
    //     );
    //     if (_filteredLemmaObjectArr.length) {
    //       return _filteredLemmaObjectArr;
    //     }
    //   }

    //   if (!lfUtils.checkHyper(questionSelectedLemmaObject, [HY.VY])) {
    //     if (["f", "nonvirile"].includes(requirementArray[0])) {
    //       let _filteredLemmaObjectArr = filteredLemmaObjectArr.filter((l) =>
    //         ["f", "nonvirile"].includes(l.gender)
    //       );
    //       if (_filteredLemmaObjectArr.length) {
    //         return _filteredLemmaObjectArr;
    //       }
    //     }
    //     if (["m", "m1"].includes(requirementArray[0])) {
    //       let _filteredLemmaObjectArr = filteredLemmaObjectArr.filter((l) =>
    //         ["m", "m1"].includes(l.gender)
    //       );
    //       if (_filteredLemmaObjectArr.length) {
    //         return _filteredLemmaObjectArr;
    //       }
    //     }
    //   }
    // }

    return filteredLemmaObjectArr;
  } else {
    return lemmaObjectArr;
  }
};

exports.filterBySelectors = (
  currentLanguage,
  structureChunk,
  matches,
  questionOutputArr,
  consoleLogEtiquette,
  answerMode
) => {
  let selectors =
    refObj.lemmaObjectTraitKeys[currentLanguage].selectors[
      idUtils.getWordtypeStCh(structureChunk)
    ];

  consol.log(
    `rcwo filterBySelectors called from ${consoleLogEtiquette}. selectors are [${selectors}]`
  );

  if (selectors) {
    selectors.forEach((selector) => {
      consol.log(
        `bnxo matches before filterBySelector_inner "${selector}" is:`,
        matches
      );
      matches = lfUtils.filterBySelector_inner(
        matches,
        structureChunk,
        selector,
        currentLanguage,
        answerMode,
        questionOutputArr
      );
      consol.log(
        `bnxu matches AFTER filterBySelector_inner "${selector}" is:`,
        matches
      );
    });
  }

  return matches;
};

exports.traverseAndRecordInflections = (
  source,
  reqArr,
  outputUnitsWithDrillPaths,
  outputUnitsWithDrillPathsMini,
  structureChunk,
  maqModes,
  currentLanguage,
  consoleLogEtiquette
) => {
  let chunkId = structureChunk ? structureChunk.chunkId : "???";

  consol.log(
    `zbbg lf.traverseAndRecordInflections starting for "${chunkId}", and source is:`,
    source
  );

  let shouldConsoleLog = true;

  if (shouldConsoleLog) {
    consol.log(
      `kyde traverseAndRecordInflections for "${chunkId}" called by "${consoleLogEtiquette}" reqArr`,
      reqArr
    );
    consol.log(`kyde for "${chunkId}" source`, source);
    consol.log(" ");
  }

  if (!reqArr || !reqArr.length) {
    consol.throw(
      `#ERR loii traverseAndRecordInflections for "${chunkId}". reqArr bad: [${reqArr}]`
    );
  }

  if (!outputUnitsWithDrillPathsMini) {
    outputUnitsWithDrillPathsMini = [];
  }

  if (!Array.isArray(outputUnitsWithDrillPathsMini)) {
    consol.log(`mztl lf:traverseAndRecordInflections for "${chunkId}"`, {
      outputUnitsWithDrillPathsMini,
    });
    consol.throw(
      `mztl lf:traverseAndRecordInflections for "${chunkId}" found outputUnitsWithDrillPathsMini not array. See above.`
    );
  }

  let reqSubArr = reqArr[0];

  let reqInflectionCategory = reqSubArr[0];
  let reqInflectionKeys = reqSubArr[1];

  if (!reqInflectionKeys.length) {
    consol.log(
      `xcmg lf:traverseAndRecordInflections for "${chunkId}" setting  reqInflectionKeys to [${Object.keys(
        source
      )}]`
    );
    reqInflectionKeys = Object.keys(source);
  }

  reqInflectionKeys.forEach((chosenInflectionKey) => {
    let chosenInflectionKeyTrue = chosenInflectionKey;
    let chosenInflectionKeyAdjusted = chosenInflectionKey;

    if (
      idUtils.traitValueIsMeta(chosenInflectionKey) &&
      !source[chosenInflectionKey]
    ) {
      consol.logCyanWithBorder(
        "escm Surprisingly s'witchMetaTraitValueForAWorkableConvertedTraitValue() is now used, though I would have expected by this point the lObjs have been expanded, ie the meta trait values inside their inflections object have been replaced, so odd that we reach this point now."
      );
      chosenInflectionKeyAdjusted =
        otUtils.switchMetaTraitValueForAWorkableConvertedTraitValue(
          reqInflectionCategory,
          chosenInflectionKey,
          source,
          currentLanguage,
          structureChunk,
          "traverseAndRecordInflections -> reqInflectionKeys.forEach"
        );
    }

    if (Array.isArray(source[chosenInflectionKeyAdjusted])) {
      consol.throw(
        `uwmf lf:traverseAndRecordInflections for "${chunkId}" Uh oh Natasha, array!`
      );
    }

    if (
      typeof source[chosenInflectionKeyAdjusted] === "string" ||
      (idUtils.isTerminusObject(source[chosenInflectionKeyAdjusted]) &&
        source[chosenInflectionKeyAdjusted].processOnlyAtEnd)
    ) {
      // consol.log("fxxb2");

      if (shouldConsoleLog) {
        consol.log(
          `xuei lf:traverseAndRecordInflections for "${chunkId}" Clause A: string or tObj to process at end`,
          {
            reqInflectionCategory,
            chosenInflectionKeyAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectionCategory,
        chosenInflectionKeyTrue,
      ]);

      if (shouldConsoleLog) {
        consol.log(
          `pkpb lf:traverseAndRecordInflections for "${chunkId}" pushing word "${source[chosenInflectionKeyAdjusted]}"`
        );
      }

      outputUnitsWithDrillPaths.push({
        selectedWordArray: [source[chosenInflectionKeyAdjusted]],
        drillPath: outputUnitsWithDrillPathsMini.slice(0),
      });

      // consol.log("fxxb3");

      outputUnitsWithDrillPathsMini.pop();

      return source[chosenInflectionKeyAdjusted];
    } else if (
      idUtils.isTerminusObject(source[chosenInflectionKeyAdjusted]) &&
      !source[chosenInflectionKeyAdjusted].processOnlyAtEnd
    ) {
      // consol.log("fxxb4");

      if (shouldConsoleLog) {
        consol.log(
          `qqyr lf:traverseAndRecordInflections for "${chunkId}" Clause B: tObj to process now`,
          {
            reqInflectionCategory,
            chosenInflectionKeyAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectionCategory,
        chosenInflectionKeyTrue,
      ]);

      let wordsFromTerminusObject = gpUtils.getWordsFromTerminusObject(
        source[chosenInflectionKeyAdjusted],
        maqModes
      );

      // consol.log("fxxb5");

      wordsFromTerminusObject.forEach((word) => {
        if (shouldConsoleLog) {
          consol.log(
            `jqbk lf:traverseAndRecordInflections for "${chunkId}" pushing word "${word}"`
          );
        }

        outputUnitsWithDrillPaths.push({
          selectedWordArray: [word],
          drillPath: outputUnitsWithDrillPathsMini.slice(0),
        });
      });

      outputUnitsWithDrillPathsMini.pop();

      // consol.log("fxxb6");

      return source[chosenInflectionKeyAdjusted];
    } else if (
      uUtils.isKeyValueTypeObject(source[chosenInflectionKeyAdjusted]) &&
      !source[chosenInflectionKeyAdjusted].isTerminus
    ) {
      // consol.log("fxxb7");

      if (shouldConsoleLog) {
        consol.log(
          `mlgc lf:traverseAndRecordInflections for "${chunkId}" Clause C: object for further traversal`,
          {
            reqInflectionCategory,
            chosenInflectionKeyAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectionCategory,
        chosenInflectionKeyTrue,
      ]);

      lfUtils.traverseAndRecordInflections(
        source[chosenInflectionKeyAdjusted],
        reqArr.slice(1),
        outputUnitsWithDrillPaths,
        outputUnitsWithDrillPathsMini,
        structureChunk,
        maqModes,
        currentLanguage,
        "traverseAndRecordInflections" // deletable
      );

      // consol.log("fxxb8");

      outputUnitsWithDrillPathsMini.pop();
      return;
    } else {
      consol.log(
        "[1;33m " +
          `buwt ${currentLanguage} #NB lf.traverseAndRecordInflections for "${chunkId}" found no matching inflectionValues during drilling for ${reqInflectionCategory}: "${chosenInflectionKeyAdjusted}".` +
          "[0m"
      );
    }
  });
};

exports.checkMatchHyper = (stCh, lObj) => {
  Object.values(HY).forEach((h) => {
    if (lfUtils.checkHyper(lObj, [h])) {
      if (stCh.hypernymy && !stCh.hypernymy[0] === h) {
        consol.throw(`cmha lObj ${lObj.id} has "${h}" but stCh doesn't.`);
      }
    }
    if (stCh.hypernymy && stCh.hypernymy[0] === h) {
      if (!lfUtils.checkHyper(lObj, [h])) {
        consol.throw(
          `cmhb stCh "${stCh.chunkId}" has "${h}" but lObj doesn't.`
        );
      }
    }
  });
};

exports.filterByDemandedLObj = (stCh, lObjs) => {
  /**Added to resolve Mungojerry issue - that synonyms were interfering with counterfax, causing erroneous coppicing.
   *
   * ie Q sentence "The woman saw a doctor.", let's flip gender value of doctor, see if we get different A sentence
   * (and that should be YES, ie "lekarz" vs "lekarka", so anno should be kept)
   *
   * But "woman"/"lady" synonym meant sometimes Q sentence came back different "The lady saw a doctor."
   * or "The person saw a doctor." because of hypernym "person"
   * and these both trigger coppicing, ie the anno is removed, because when it was flipped the Q sentence apparently came back different.
   *
   * So to avoid this, counterfaxing must not use synonyms, ie if Q sentence used "woman" then only counterfax with "woman" not "lady".
   * BUT we do want to counterfax "woman" to "man" or "person", so we can't just say "^eng-npe-000-woman" with caret.
   *
   * So below filter, where if Q chunk is "woman" then we exclude "lady" but not other stem-siblings (lObjs of same serial number)
   * because remember, "man","woman","lady","person" are all same lObj stem.
   */

  consol.logSpecial(
    8,
    `\nahps stCh.originalSitSelectedLObj: Let's see which lObjs pass the test against (demanded) lObj id from Q chunk.`,
    stCh.originalSitSelectedLObj.id
  );

  let { originalSitSelectedLObj } = stCh;

  return lObjs.filter((l) => {
    if (allLangUtils.compareLObjStems(l.id, `^${originalSitSelectedLObj.id}`)) {
      consol.logSpecial(8, `ahps1 "${l.id}" YES because same exact id.`);
      return true;
    }

    // Gender of stem-sibling (same lObj serial number) is the same, so discard it.
    // ie if Q chunk is "woman", then discard "lady" (same gender as "woman") but not "man" or "person".
    if (originalSitSelectedLObj.gender === l.gender) {
      consol.logSpecial(
        8,
        `ahps2 "${l.id}" NO because is stem-sibling with same gender.`
      );
      return false;
    }

    /**
     * I'm surprised this condition is not needed.
     * I thought "osoba"/"ludzie" synonyms would cause Mungojerry issue too.
     * And wouldn't be filtered out by ahps2 because are not same gender ("osoba" f, "ludzie" m1).
     */
    // if (originalSitSelectedLObj.semanticGender === l.semanticGender) {
    // consol.logSpecial(
    //   8,
    //   `ahps3 "${l.id}" NO because is stem-sibling with same semanticGender.`
    // );
    //   return false;
    // }

    // If Q is not hypernym, eg "woman" then discard hypernyms, eg "person".
    if (
      !lfUtils.checkHyper(originalSitSelectedLObj, [HY.HY]) &&
      lfUtils.checkHyper(l, [HY.HY])
    ) {
      consol.logSpecial(
        8,
        `ahps4 "${l.id}" NO because one's a hypernym and the other's not.`
      );
      return false;
    }

    // If Q is hypernym, eg "person" then discard non-hypernyms, eg "woman".
    if (
      lfUtils.checkHyper(originalSitSelectedLObj, [HY.HY]) &&
      !lfUtils.checkHyper(l, [HY.HY])
    ) {
      consol.logSpecial(
        8,
        `ahps5 "${l.id}" NO as one's a hypernym and the other's not.`
      );
      return false;
    }

    // Otherwise, return all stem-siblings (same lObj serial number) of Q chunk.
    if (allLangUtils.compareLObjStems(l.id, originalSitSelectedLObj.id, true)) {
      consol.logSpecial(8, `ahps6 "${l.id}" YES because is stem-sibling.`);
      return true;
    }

    consol.logSpecial(8, `ahps7 "${l.id}" NO because no condition matched.`);
  });
};

exports.updateStChSemanticGenderAndVirilityDetail = (
  selectedLemmaObject,
  structureChunk,
  currentLanguage,
  isCounterfax,
  doneSelectors,
  outputUnit,
  isSecondRound
) => {
  if (lfUtils.checkHyper(selectedLemmaObject, [HY.VY])) {
    if (structureChunk.number.length !== 1) {
      consol.throw(`xtal`);
    }

    let vRef = {
      singular: ["male", "male!"],
      plural: ["mixed", "males", "males!"],
    };

    Object.keys(vRef).forEach((numberTraitValue) => {
      let virilityDetails = vRef[numberTraitValue];

      if (
        structureChunk.number[0] === numberTraitValue &&
        (!structureChunk.virilityDetail ||
          !structureChunk.virilityDetail.length)
      ) {
        structureChunk.virilityDetail = [uUtils.selectRandom(virilityDetails)];
        consol.logSpecial(
          8,
          `ykkt ${currentLanguage} "${structureChunk.chunkId}" Setting virilityDetail to "${structureChunk.virilityDetail}"`
        );
      }
    });
  }

  if (selectedLemmaObject.semanticGender) {
    if (isCounterfax && structureChunk.semanticGender) {
      consol.logSpecial(
        8,
        "thaa------isCounterfax so leaving stCh semanticGender as",
        structureChunk.semanticGender
      );
      doneSelectors.push("semanticGender");
    } else {
      consol.logSpecial(
        8,
        `thaa`,
        `structureChunk.semanticGender`,
        structureChunk.semanticGender,
        `structureChunk.gender`,
        structureChunk.gender,
        `htaa selectedLemmaObject.semanticGender`,
        selectedLemmaObject.semanticGender
      );

      let numberValue = outputUnit.drillPath.find(
        (drillPathUnit) => drillPathUnit[0] === "number"
      )[1];

      let numberAdjustedGenderValues = [];

      let virilityRefByNumber =
        refObj.virilityConversionRef[currentLanguage][numberValue];

      let isNounPerson = idUtils.getWordtypeStCh(structureChunk) === "npe";

      if (
        (isNounPerson && !isSecondRound) ||
        (isNounPerson && !structureChunk.semanticGender) ||
        !isNounPerson
      ) {
        numberAdjustedGenderValues = lfUtils.accumulateNumberAdjustedGender(
          structureChunk,
          "gender",
          numberAdjustedGenderValues,
          virilityRefByNumber
        );
      }

      numberAdjustedGenderValues = lfUtils.accumulateNumberAdjustedGender(
        structureChunk,
        "semanticGender",
        numberAdjustedGenderValues,
        virilityRefByNumber
      );

      consol.logSpecial(
        8,
        structureChunk.chunkId,
        `htab numberAdjustedGenderValues`,
        numberAdjustedGenderValues
      );

      if (!numberAdjustedGenderValues.length) {
        throw "nmol !numberAdjustedGenderValues.length in updateStChByAndTagsAndSelectors";
      }

      if (this.checkHyper(selectedLemmaObject, [HY.VY])) {
        //Garibaldi adjustment, Neon approach, vypernyms issue 205
        numberAdjustedGenderValues = allLangUtils.standardiseGenders(
          currentLanguage,
          numberAdjustedGenderValues,
          "_VypernymGenders"
        );
      }

      consol.logSpecial(
        8,
        `htad numberAdjustedGenderValues after nixing "f" if vypernym.`,
        numberAdjustedGenderValues
      );

      numberAdjustedGenderValues = Array.from(
        new Set(
          allLangUtils.enforceIsPerson(null, false, numberAdjustedGenderValues)
        )
      );

      consol.logSpecial(
        8,
        `htae numberAdjustedGenderValues after enforcing isPerson.`,
        numberAdjustedGenderValues
      );

      numberAdjustedGenderValues = allLangUtils.standardiseGenders(
        currentLanguage,
        numberAdjustedGenderValues
      );

      consol.logSpecial(
        8,
        `htaf numberAdjustedGenderValues after nixing "m" for Polish (should be "m1").`,
        numberAdjustedGenderValues
      );

      if (isSecondRound && numberAdjustedGenderValues.length > 1) {
        let oneValue = uUtils.selectRandom(numberAdjustedGenderValues);
        console.log(
          `htah Expected length 1 for "${
            outputUnit.selectedLemmaObject.lemma
          }" but got: ${
            numberAdjustedGenderValues.length
          } [${numberAdjustedGenderValues.join(
            ", "
          )}] so have randomly selected "${oneValue}".`
        );

        numberAdjustedGenderValues = [oneValue];
      }

      if (!numberAdjustedGenderValues.length) {
        consol.throw("apbh");
      }

      numberAdjustedGenderValues = [
        uUtils.selectRandom(numberAdjustedGenderValues),
      ];

      consol.logSpecial(
        8,
        `htai numberAdjustedGenderValues after SELECTRANDOM`,
        numberAdjustedGenderValues
      );

      if (structureChunk.semanticGender) {
        consol.logSpecial(
          8,
          "[1;36m " +
            `htaj ${currentLanguage} ${structureChunk.chunkId}, stCh.semanticGender was ${structureChunk.semanticGender} is now ${numberAdjustedGenderValues}.` +
            "[0m"
        );
      }
      structureChunk.semanticGender = numberAdjustedGenderValues; //Set semanticGender in Question.
      doneSelectors.push("semanticGender");
    }
  }
};

exports.accumulateNumberAdjustedGender = (
  stCh,
  genderTraitKey,
  numberAdjustedGenderValues,
  virilityRefByNumber
) => {
  if (!stCh[genderTraitKey] || !stCh[genderTraitKey].length) {
    consol.logSpecial(8, "hsay", genderTraitKey);
    return numberAdjustedGenderValues;
  }

  stCh[genderTraitKey].forEach((genderValue) => {
    let additionalNumberAdjustedGenderValues = virilityRefByNumber[genderValue];

    numberAdjustedGenderValues.push(...additionalNumberAdjustedGenderValues);

    if (
      numberAdjustedGenderValues.some((el) => !el) ||
      additionalNumberAdjustedGenderValues.some((el) => !el)
    ) {
      console.log({
        numberAdjustedGenderValues,
        additionalNumberAdjustedGenderValues,
      });
      consol.throw(`syep`);
    }
  });

  return numberAdjustedGenderValues;
};
