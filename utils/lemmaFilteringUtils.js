const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const lfUtils = require("./lemmaFilteringUtils.js");

exports.filterWithin_PHD = (
  lemmaObject,
  PHDstructureChunk,
  currentLanguage,
  multipleMode,
  outputArray
) => {
  consol.log("pebb", {
    lemmaObject,
    PHDstructureChunk,
    currentLanguage,
    multipleMode,
  });

  PHDstructureChunk["wordtype"] = gpUtils.getWorrdtypeStCh(PHDstructureChunk);

  let drillPath = [];
  let drillPathSecondary = [];
  let drillPathTertiary = [];

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  let PHD_type;

  refObj.postHocDependentChunkWordtypes[currentLanguage].forEach(
    (PHD_dataObj) => {
      if (
        Object.keys(PHD_dataObj.conditions).every((PHD_conditionKey) => {
          let PHD_conditionValueArr = PHD_dataObj.conditions[PHD_conditionKey];

          if (
            PHD_conditionValueArr.some((arrayItem) => {
              if (
                PHDstructureChunk[PHD_conditionKey] &&
                Array.isArray(PHDstructureChunk[PHD_conditionKey]) &&
                PHDstructureChunk[PHD_conditionKey].includes(arrayItem)
              ) {
                return true;
              } else if (PHDstructureChunk[PHD_conditionKey] === arrayItem) {
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

  delete PHDstructureChunk["wordtype"];

  if ("check") {
    if (!PHD_type) {
      consol.throw(
        "pwir filterWithin_PHD. Failed postHocDependentChunkWordtypes[currentLanguage].forEach(PHD_dataObj => passing the PHD_dataObj.conditions)"
      );
    }

    if (
      !PHDstructureChunk.specificLemmas ||
      PHDstructureChunk.specificLemmas.length !== 1
    ) {
      consol.throw(
        "#ERR ohmk lf:filterWithin_PHD. PHD-stCh should have exactly one value in specificLemmas arr."
      );
    }
  }

  let postHocInflectionChains = refObj.postHocDependentChunkWordtypes[
    currentLanguage
  ].find((PHD_dataObj) => PHD_dataObj.PHD_type === PHD_type).inflectionChains;

  let lemmaObjectCopy = uUtils.copyWithoutReference(lemmaObject);

  langUtils.preprocessLemmaObjectsMajor(
    [lemmaObjectCopy],
    PHDstructureChunk,
    true,
    currentLanguage
  );

  consol.log("terx filterWithin_PHD", {
    lemmaObjectCopy,
    PHDstructureChunk,
    currentLanguage,
    multipleMode,
    outputArray,
    PHD_type,
    postHocInflectionChains,
  });
  // consol.consoleLogObjectAtTwoLevels(
  //   outputArray,
  //   "outputArray",
  //   "filterWithin_PHD"
  // );

  let source = uUtils.copyWithoutReference(lemmaObjectCopy.inflections);

  consol.log("giuy filterWithin_PHD. source", source);

  Object.keys(postHocInflectionChains).forEach((postHocAgreeWithKey) => {
    consol.log(
      "[1;35m " +
        `nvnm lf:filterWithin_PHD Running loop for "${postHocAgreeWithKey}"` +
        "[0m"
    );
    consol.log(
      "[1;33m " + `outputArray: [${outputArray.map((x) => x.selectedWord)}]` + "[0m"
    );

    let postHocInflectionChain = postHocInflectionChains[postHocAgreeWithKey];

    let headOutputUnit = outputArray.find(
      (outputUnit) =>
        outputUnit.structureChunk.chunkId ===
        PHDstructureChunk[postHocAgreeWithKey]
    );

    let drillPathOfHead = uUtils.copyWithoutReference(headOutputUnit.drillPath);

    consol.log("nvnn lf:filterWithin_PHD");
    // consol.consoleLogObjectAtOneLevel(
    //   headOutputUnit,
    //   "headOutputUnit",
    //   "This is for a PHD"
    // );

    if (!drillPathOfHead) {
      consol.throw(
        "#ERR jzbx filterWithin_PHD. There is no drillPath on the outputUnit with which I want to get features from the PHD stCh. Perhaps this outputUnit is one whose stCh did not go through If-PW?"
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
      gpUtils.getWorrdtypeAgree(PHDstructureChunk, postHocAgreeWithKey) ===
      "noun"
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

        let numberValue = numberArr[1];

        let formattedFeatureValueArray = langUtils.formatFeatureValue(
          "gender",
          headOutputUnit.selectedLemmaObject.gender,
          numberValue
        );

        if (formattedFeatureValueArray.length !== 1) {
          consol.throw(
            "#ERR ikdr lf:filterWithin_PHD. Expected formattedFeatureValueArray to have length 1"
          );
        }
        let formattedFeatureValue = formattedFeatureValueArray[0];

        consol.log(
          `ijeg filterWithin_PHD. Updating drillPathOfHead with gender "${formattedFeatureValue}"`
        );
        drillPathOfHead.push(["gender", formattedFeatureValue]);
      } else {
        throw "I am unsure about which gender to use - either the one from lobj inherent, or the one from drillPath. I wanted to use this gender for the PHD stCh.";
      }
    }

    // consol.log(
    //   `dxxg lf:filterWithin_PHD. After "${postHocAgreeWithKey}" for "${PHDstructureChunk.chunkId}" the drillPathOfHead is finally`,
    //   drillPathOfHead
    // );
    // consol.log("ylur filterWithin_PHD. source", source);

    postHocInflectionChain.forEach((featureKey) => {
      let featureValue = drillPathOfHead.find(
        (arr) => arr[0] === featureKey
      )[1];

      if (gpUtils.featureValueIsMeta(featureValue) && !source[featureValue]) {
        featureValue = otUtils.switchMetaFeatureForAWorkableConvertedFeature(
          featureKey,
          featureValue,
          source,
          currentLanguage,
          PHDstructureChunk,
          "filterWithin_PHD -> postHocInflectionChain.forEach"
        );
      }

      source = source[featureValue];

      consol.log(
        `\nihjy lf:filterWithin_PHD "${postHocAgreeWithKey}" drilling into source with "${featureValue}" so source is now`,
        // source,
        "\n"
      );

      //Update drillPath, for both ...Pri and ...Sec

      consol.log("viko", { postHocAgreeWithKey }, drillPathOfHead);

      if (/.*Primary/.test(postHocAgreeWithKey)) {
        lfUtils.updateStChByInflections(
          { structureChunk: PHDstructureChunk, drillPath: drillPathOfHead },
          currentLanguage
        );
      } else if (/.*Secondary/.test(postHocAgreeWithKey)) {
        drillPathSecondary.push([featureKey, featureValue]);
      } else if (/.*Tertiary/.test(postHocAgreeWithKey)) {
        drillPathTertiary.push([featureKey, featureValue]);
      } else {
        consol.throw(
          `mezp filterWithin_PHD. Malformed postHocAgreeWithKey: "${postHocAgreeWithKey}".`
        );
      }

      //Update stCh with these featureKeys and featureValues, but just for postHocAgreeWithPrimary.
      // if (/.*Primary/.test(postHocAgreeWithKey)) {
      //   lfUtils.updateStChByInflections(
      //     { structureChunk: PHDstructureChunk, drillPath: drillPathOfHead },
      //     currentLanguage
      //   );

      //   drillPath.push([featureKey, featureValue]);
      // } else if (/.*Secondary/.test(postHocAgreeWithKey)) {
      //   drillPathSecondary.push([featureKey, featureValue]);
      // } else if (/.*Tertiary/.test(postHocAgreeWithKey)) {
      //   drillPathTertiary.push([featureKey, featureValue]);
      // } else {
      //   consol.throw(
      //     `mezp filterWithin_PHD. Malformed postHocAgreeWithKey: "${postHocAgreeWithKey}".`
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
    (gpUtils.isTerminusObject(source) && source.processOnlyAtEnd)
  ) {
    sourceArr.push(source);
  } else if (gpUtils.isTerminusObject(source) && !source.processOnlyAtEnd) {
    consol.throw("svqe filterWithin_PHD Natasha, take action.");
  } else {
    consol.throw(
      "#ERR dyqk filterWithin_PHD. Expected this PHD value to be the end of a chain and thus a string or array."
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
  multipleMode,
  outputArray,
  isPHD
) => {
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

  if (isPHD) {
    return lfUtils.filterWithin_PHD(
      lemmaObject,
      structureChunk,
      currentLanguage,
      multipleMode,
      outputArray
    );
  }

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.

  let inflectionChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      gpUtils.getWorrdtypeStCh(structureChunk)
    ];

  let requirementArrs = [];

  inflectionChain.forEach((key) => {
    let inflectionValueArr = [];

    if (structureChunk[key]) {
      structureChunk[key].forEach((inflectionValue) => {
        let formattedFeatureValueArr = langUtils.formatFeatureValue(
          key,
          inflectionValue
        );

        // consol.log(
        //   "afwm lf:filterWithinSelectedLemmaObject: formattedFeatureValueArr",
        //   formattedFeatureValueArr
        // );

        inflectionValueArr = [
          ...inflectionValueArr,
          ...formattedFeatureValueArr,
        ];
      });
    }

    requirementArrs.push([key, inflectionValueArr]);
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
    multipleMode,
    currentLanguage,
    "filterWithin" //deletable
  );

  if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
    consol.log(
      "\n\n\n iszn I failed when looked for values according to these requirementArrs",
      requirementArrs,
      "\n\n\n iszn when I was looking inside this source"
    );
    consol.consoleLogObjectAtTwoLevels(source);
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

exports.updateStructureChunkByAdhocOnly = (structureChunk, label, value) => {
  structureChunk[label] = [value];
};

exports.updateStructureChunk = (outputUnit, currentLanguage) => {
  let shouldConsoleLog = false;

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

  lfUtils.updateStChByAndTagsAndSelectors(outputUnit, currentLanguage);

  if (shouldConsoleLog) {
    consol.log(
      "wbxe updateStructureChunk AFTER UB-Inf and UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );

    consol.log(
      "[1;33m " +
        `wbxe /updateStructureChunk "${outputUnit.structureChunk.chunkId}"` +
        "[0m"
    );
    consol.log(" ");
  }
};

exports.updateStChByAndTagsAndSelectors = (outputUnit, currentLanguage) => {
  let { selectedLemmaObject, structureChunk, selectedWord, drillPath } =
    outputUnit;

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
  // consol.log("updateStChByAndTagsAndSelectors drillPath", drillPath);

  let doneSelectors = [];

  let lemmaObjectIsMGN = gpUtils.lObjIsMGN(selectedLemmaObject);

  let stChFeatures = refFxn.getStructureChunkFeatures(currentLanguage);

  //STEP ZERO: Decisive Decant
  //Remove gender values on stCh if drillPath doesn't include gender (ie is infinitive or a participle, say).
  //But if lObj is MGN, don't do this.
  if (
    !lemmaObjectIsMGN &&
    drillPath &&
    !drillPath.map((arr) => arr[0]).includes("gender") &&
    stChFeatures["gender"].compatibleWordtypes.includes(
      gpUtils.getWorrdtypeLObj(selectedLemmaObject)
    )
  ) {
    structureChunk.gender = [];
  }

  //STEP ONE: Update stCh gender with that of lObj.
  if (selectedLemmaObject.gender) {
    if (lemmaObjectIsMGN) {
      //If lObj does have metagender, set stCh gender to converted values or filter stCh's gender by them.

      consol.log(
        `nxej updateStChByAndTagsAndSelectors Clause S: lObj "${selectedLemmaObject.lemma}" has metaSelector gender`
      );
      consol.log("nxej updateStChByAndTagsAndSelectors", structureChunk);
      consol.log(
        "[1;33m " +
          `nxej updateStChByAndTagsAndSelectors in clause S start "${structureChunk.gender}"` +
          "[0m"
      );

      let metaGender = selectedLemmaObject.gender.split("_")[0];

      let metaGenderConverted =
        refObj.metaFeatures[currentLanguage].gender[metaGender];

      if (structureChunk.gender && structureChunk.gender.length) {
        structureChunk.gender = structureChunk.gender.filter((genderValue) =>
          metaGenderConverted.includes(genderValue)
        );
      } else {
        structureChunk.gender = metaGenderConverted.slice(0);
      }
      doneSelectors.push("gender");
      consol.log(
        "[1;33m " +
          `qdtx updateStChByAndTagsAndSelectors in clause S end "${structureChunk.gender}"` +
          "[0m"
      );
    } else {
      //If lObj has non-meta-gender, then update stCh with lObj gender.

      consol.log(
        "ijfw updateStChByAndTagsAndSelectors Clause R: lObj does not have metaSelector gender"
      );
      structureChunk.gender = [selectedLemmaObject.gender];
      doneSelectors.push("gender");
    }
  }

  //STEP TWO: Update the stCh's andTags with the lObj's tags.
  if (structureChunk.andTags && structureChunk.andTags.length) {
    structureChunk.andTags = structureChunk.andTags.filter((andTag) =>
      selectedLemmaObject.tags.includes(andTag)
    );
  } else {
    consol.log(
      "[1;31m " +
        `vwaw updateStChByAndTagsAndSelectors Just to note that this stCh has no andTags, and I am adding them from lObj. Perhaps I should no nothing here instead: "${currentLanguage}" "${structureChunk.chunkId}"` +
        "[0m"
    );

    structureChunk.andTags = selectedLemmaObject.tags.slice(0);
  }

  //STEP THREE: For all remaining selectors, update the stCh with values from lObj.
  let selectors =
    refObj.lemmaObjectFeatures[currentLanguage].selectors[
      gpUtils.getWorrdtypeStCh(structureChunk)
    ];

  consol.log("abyy updateStChByAndTagsAndSelectors", { doneSelectors });

  if (selectors) {
    selectors
      .filter((selector) => !doneSelectors.includes(selector))
      .forEach((selector) => {
        if (/_/.test(selectedLemmaObject[selector])) {
          consol.throw(
            `oppb updateStChByAndTagsAndSelectors I wasn't expecting a metaFeature selector here. It should have been processed already, in step one, and then added to doneSelectors, which would have prevented it being used here. selectedLemmaObject[selector]:"${selectedLemmaObject[selector]}"`
          );
        }

        structureChunk[selector] = [selectedLemmaObject[selector]];
      });
  } else {
    consol.log(
      "[1;31m " +
        `vbob updateStChByAndTagsAndSelectors Just to note that refObj gave no selectors for currentLanguage "${currentLanguage}" and s'tructureChunk.worrdtype "${gpUtils.getWorrdtypeStCh(
          structureChunk
        )}"` +
        "[0m"
    );
  }

  //STEP FOUR: Selectors that must be handled specially.

  if (structureChunk.specificLemmas && structureChunk.specificLemmas.length) {
    structureChunk.specificLemmas = [selectedLemmaObject.lemma];
  }

  consol.log(
    `raku updateStChByAndTagsAndSelectors "${structureChunk.chunkId}" ends as`,
    structureChunk
  );
  consol.log("[1;35m " + `/updateStChByAndTagsAndSelectors` + "[0m");
};

exports.updateStChByInflections = (outputUnit, currentLanguage) => {
  if (false) {
    consol.log(
      "[1;30m " +
        `plol updateStChByInflections "${
          outputUnit.drillPath
            ? outputUnit.drillPath.toString()
            : "no drillPath"
        }"` +
        "[0m"
    );
  }

  if (outputUnit.drillPath) {
    outputUnit.drillPath.forEach((drillPathSubArr) => {
      let requiredInflectorCategory = drillPathSubArr[0];
      let selectedInflector = drillPathSubArr[1];

      outputUnit.structureChunk[requiredInflectorCategory] = [
        selectedInflector,
      ];
    });
  }
};

exports.filterOutLackingLemmaObjects = (sourceArr, stCh, currentLanguage) => {
  let inflectionChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      gpUtils.getWorrdtypeStCh(stCh)
    ];
  let requirementArrs = inflectionChain.map((key) => stCh[key] || []);

  return sourceArr.filter((lObj) => {
    if (!lObj.lacking) {
      return true;
    } else {
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

exports.filterByAndTagsAndOrTags = (wordset, structureChunk) => {
  let lemmaObjects = Object.values(wordset);

  let { andTags, orTags } = structureChunk;

  if (andTags && andTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) =>
      andTags.every((andTag) => lemmaObject.tags.includes(andTag))
    );
  }

  if (orTags && orTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) =>
      orTags.some((orTag) => lemmaObject.tags.includes(orTag))
    );
  }

  return lemmaObjects;
};

exports.padOutRequirementArrWithMetaFeaturesIfNecessary = (
  requirementArrs,
  key,
  currentLanguage
) => {
  let requirementArr = requirementArrs[key] || [];
  let metaFeatureRef = refObj.metaFeatures[currentLanguage][key];

  consol.log(
    "[1;35m " + `opoq lf:filterByKey-------------------------- for key "${key}"` + "[0m"
  );
  consol.log("opoq lf:filterByKey requirementArr starts as", requirementArr);

  if (metaFeatureRef) {
    requirementArr.forEach((featureValue) => {
      //If the reqArr has a metafeature, all lObj with converted feature to pass filter.
      if (/_/.test(featureValue)) {
        let metaFeatureConverted = metaFeatureRef[featureValue];

        if (!metaFeatureConverted) {
          consol.throw(
            "#ERR tufx lf:filterByKey. filterByKey need converted metafeature."
          );
        }
        consol.log(
          `ndew filterByKey. Gonna push metaFeatureConverted [${metaFeatureConverted}]`
        );
        requirementArr = [...requirementArr, ...metaFeatureConverted];
      }

      //But also need do the inverse of this. If reqArr has 'f', then allow lObj to pass filter if lObj gender is 'allSingularGenders' eg.
      Object.keys(metaFeatureRef).forEach((metaFeature) => {
        let convertedMetaFeatureArr = metaFeatureRef[metaFeature];

        if (
          convertedMetaFeatureArr.includes(featureValue) &&
          !requirementArr.includes(metaFeature)
        ) {
          consol.log(
            `exnh filterByKey. Gonna push metafeature "${metaFeature}"`
          );
          requirementArr.push(metaFeature);
        }
      });

      consol.log(
        "sfrl lf:filterByKey requirementArr inside ```requirementArr.forEach((featureValue)``` is",
        requirementArr
      );
    });
  } else {
    consol.log(
      "[1;31m " +
        `jwpv lf:filterByKey saw there was no metaFeatureRef for currentLanguage "${currentLanguage}" and key "${key}"` +
        "[0m"
    );
  }

  consol.log("qyvu lf:filterByKey requirementArr ends as", requirementArr);

  return requirementArr;
};

exports.filterByKey = (
  lemmaObjectArr,
  structureChunk,
  key,
  currentLanguage
) => {
  consol.log("wdwe filterByKey START. structureChunk", structureChunk);

  let requirementArray =
    lfUtils.padOutRequirementArrWithMetaFeaturesIfNecessary(
      structureChunk,
      key,
      currentLanguage
    );

  consol.log("wdet filterByKey. requirementArray", requirementArray);

  //And finally, do said filter.
  if (requirementArray.length) {
    return lemmaObjectArr.filter((lObj) => {
      let lObjSelectorValues = [lObj[key], lObj[key].split("_")[0]];

      consol.log("wdeu . lObjSelectorValues", lObjSelectorValues);

      if (key === "gender") {
        structureChunk.number.forEach((numberValue) => {
          let extraVirilityConvertedValues =
            refObj.pluralVirilityAndSingularConversionRef[currentLanguage][
              numberValue
            ][lObj[key]];

          consol.log({
            currentLanguage,
            numberValue,
            key,
            "lObj[key]": lObj[key],
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
      }

      consol.log("wdev . lObjSelectorValues", lObjSelectorValues);

      return lObjSelectorValues.some((lObjSelectorValue) =>
        requirementArray.includes(lObjSelectorValue)
      );
    });
  } else {
    return lemmaObjectArr;
  }
};

exports.filterBySelectors = (
  currentLanguage,
  structureChunk,
  matches,
  consoleLogLabel
) => {
  let selectors =
    refObj.lemmaObjectFeatures[currentLanguage].selectors[
      gpUtils.getWorrdtypeStCh(structureChunk)
    ];

  consol.log(
    `rcwo filterBySelectors called from ${consoleLogLabel}. selectors are [${selectors}]`
  );

  if (selectors) {
    selectors.forEach((selector) => {
      consol.log(
        `bnxo filterBySelectors. Will call filterByKey for selector "${selector}"`
      );
      consol.log(`bnxo matches before filterByKey "${selector}" is:`, matches);
      matches = lfUtils.filterByKey(
        matches,
        structureChunk,
        selector,
        currentLanguage
      );
      consol.log(`bnxu matches AFTER filterByKey "${selector}" is:`, matches);
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
  multipleMode,
  currentLanguage,
  consoleLabel
) => {
  let chunkId = structureChunk ? structureChunk.chunkId : "???";

  consol.log(
    `zbbg lf.traverseAndRecordInflections starting for "${chunkId}", and source is:`,
    source
  );

  let shouldConsoleLog = true;

  if (shouldConsoleLog) {
    consol.log(
      `kyde traverseAndRecordInflections for "${chunkId}" called by "${consoleLabel}" reqArr`,
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

  let reqInflectorLabel = reqSubArr[0];
  let reqInflectorArr = reqSubArr[1];

  if (!reqInflectorArr.length) {
    consol.log(
      `xcmg lf:traverseAndRecordInflections for "${chunkId}" setting reqInflectorArr to [${Object.keys(
        source
      )}]`
    );
    reqInflectorArr = Object.keys(source);
  }

  reqInflectorArr.forEach((chosenInflector) => {
    let chosenInflectorTrue = chosenInflector;
    let chosenInflectorAdjusted = chosenInflector;

    if (
      gpUtils.featureValueIsMeta(chosenInflector) &&
      !source[chosenInflector]
    ) {
      chosenInflectorAdjusted =
        otUtils.switchMetaFeatureForAWorkableConvertedFeature(
          reqInflectorLabel,
          chosenInflector,
          source,
          currentLanguage,
          structureChunk,
          "traverseAndRecordInflections -> reqInflectorArr.forEach"
        );
    }

    if (Array.isArray(source[chosenInflectorAdjusted])) {
      consol.throw(
        `uwmf lf:traverseAndRecordInflections for "${chunkId}" Uh oh Natasha, array!`
      );
    }

    if (
      typeof source[chosenInflectorAdjusted] === "string" ||
      (gpUtils.isTerminusObject(source[chosenInflectorAdjusted]) &&
        source[chosenInflectorAdjusted].processOnlyAtEnd)
    ) {
      // consol.log("fxxb2");

      if (shouldConsoleLog) {
        consol.log(
          `xuei lf:traverseAndRecordInflections for "${chunkId}" Clause A: string or tObj to process at end`,
          {
            reqInflectorLabel,
            chosenInflectorAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectorLabel,
        chosenInflectorTrue,
      ]);

      if (shouldConsoleLog) {
        consol.log(
          `pkpb lf:traverseAndRecordInflections for "${chunkId}" pushing word "${source[chosenInflectorAdjusted]}"`
        );
      }

      outputUnitsWithDrillPaths.push({
        selectedWordArray: [source[chosenInflectorAdjusted]],
        drillPath: outputUnitsWithDrillPathsMini.slice(0),
      });

      // consol.log("fxxb3");

      outputUnitsWithDrillPathsMini.pop();

      return source[chosenInflectorAdjusted];
    } else if (
      gpUtils.isTerminusObject(source[chosenInflectorAdjusted]) &&
      !source[chosenInflectorAdjusted].processOnlyAtEnd
    ) {
      // consol.log("fxxb4");

      if (shouldConsoleLog) {
        consol.log(
          `qqyr lf:traverseAndRecordInflections for "${chunkId}" Clause B: tObj to process now`,
          {
            reqInflectorLabel,
            chosenInflectorAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectorLabel,
        chosenInflectorTrue,
      ]);

      let wordsFromTerminusObject = gpUtils.getWordsFromTerminusObject(
        source[chosenInflectorAdjusted],
        multipleMode
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

      return source[chosenInflectorAdjusted];
    } else if (
      uUtils.isKeyValueTypeObject(source[chosenInflectorAdjusted]) &&
      !source[chosenInflectorAdjusted].isTerminus
    ) {
      // consol.log("fxxb7");

      if (shouldConsoleLog) {
        consol.log(
          `mlgc lf:traverseAndRecordInflections for "${chunkId}" Clause C: object for further traversal`,
          {
            reqInflectorLabel,
            chosenInflectorAdjusted,
          }
        );
      }

      outputUnitsWithDrillPathsMini.push([
        reqInflectorLabel,
        chosenInflectorTrue,
      ]);

      lfUtils.traverseAndRecordInflections(
        source[chosenInflectorAdjusted],
        reqArr.slice(1),
        outputUnitsWithDrillPaths,
        outputUnitsWithDrillPathsMini,
        structureChunk,
        multipleMode,
        currentLanguage,
        "traverseAndRecordInflections" // deletable
      );

      // consol.log("fxxb8");

      outputUnitsWithDrillPathsMini.pop();
    } else {
      consol.log(
        "[1;33m " +
          `buwt #NB lf.traverseAndRecordInflections for "${chunkId}" found no matching values during drilling for ${reqInflectorLabel}: "${chosenInflectorAdjusted}".` +
          "[0m"
      );
    }
  });
};
