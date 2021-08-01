const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const allLangUtils = require("./allLangUtils.js");

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

  PHDstructureChunk["wordtype"] = gpUtils.getWordtypeStCh(PHDstructureChunk);

  let drillPath = [];
  let drillPathSecondary = [];
  let drillPathTertiary = [];

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

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
                PHDstructureChunk[PHD_conditionTraitKey] &&
                Array.isArray(PHDstructureChunk[PHD_conditionTraitKey]) &&
                PHDstructureChunk[PHD_conditionTraitKey].includes(arrayItem)
              ) {
                return true;
              } else if (
                PHDstructureChunk[PHD_conditionTraitKey] === arrayItem
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

  delete PHDstructureChunk["wordtype"];

  if ("check") {
    if (!PHD_type) {
      consol.throw(
        "pwir filterWithin_PHD. Failed postHocDependentChunkWordtypes[currentLanguage].forEach(PHD_dataObj => passing the PHD_dataObj.conditions)"
      );
    }

    if (
      //SLIM
      !PHDstructureChunk.specificLemmas
      // || PHDstructureChunk.specificLemmas.length !== 1
    ) {
      consol.throw(
        "#ERR ohmk lf:filterWithin_PHD. PHD-stCh should have exactly one traitValue in specificLemmas arr."
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

  Object.keys(postHocInflectionChains).forEach((postHocAgreeKey) => {
    consol.log(
      "[1;35m " +
        `nvnm lf:filterWithin_PHD Running loop for "${postHocAgreeKey}"` +
        "[0m"
    );
    consol.log(
      "[1;33m " + `outputArray: [${outputArray.map((x) => x.selectedWord)}]` + "[0m"
    );

    let postHocInflectionChain = postHocInflectionChains[postHocAgreeKey];

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
      gpUtils.getWordtypeAgree(PHDstructureChunk, postHocAgreeKey) === "noun"
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
          consol.throw(
            "#ERR ikdr lf:filterWithin_PHD. Expected formattedInflectionKeyArray to have length 1"
          );
        }
        let formattedInflectionKey = formattedInflectionKeyArray[0];

        consol.log(
          `ijeg filterWithin_PHD. Updating drillPathOfHead with gender "${formattedInflectionKey}"`
        );
        drillPathOfHead.push(["gender", formattedInflectionKey]);
      } else {
        throw "I am unsure about which gender to use - either the one from lobj inherent, or the one from drillPath. I wanted to use this gender for the PHD stCh.";
      }
    }

    postHocInflectionChain.forEach((inflectionCategory) => {
      let inflectionKey = drillPathOfHead.find(
        (arr) => arr[0] === inflectionCategory
      )[1];

      if (gpUtils.traitValueIsMeta(inflectionKey) && !source[inflectionKey]) {
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

      source = source[inflectionKey];

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
    (gpUtils.isTerminusObject(source) && source.processOnlyAtEnd)
  ) {
    sourceArr.push(source);
  } else if (gpUtils.isTerminusObject(source) && !source.processOnlyAtEnd) {
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
  multipleMode,
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
      multipleMode,
      outputArray
    );
  }

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.

  let inflectionChain =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      gpUtils.getWordtypeStCh(structureChunk)
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

        // consol.log(
        //   "afwm lf:filterWithinSelectedLemmaObject: formattedInflectionKeyArr",
        //   formattedInflectionKeyArr
        // );

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
    multipleMode,
    currentLanguage,
    "filterWithin" //deletable
  );

  if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
    consol.log(
      "\n\n\n iszn I failed when searched with these requirementArrs",
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

exports.updateStructureChunkByAdhocOnly = (
  structureChunk,
  traitKey,
  traitValue
) => {
  structureChunk[traitKey] = [traitValue];
};

exports.updateStructureChunk = (outputUnit, currentLanguage) => {
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

  lfUtils.updateStChByAndTagsAndSelectors(outputUnit, currentLanguage);

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

  //STEP ZERO: Decisive Decant
  //Remove gender traitValues on stCh if drillPath doesn't include the traitKey 'gender' (ie is infinitive or a participle, say).
  //But if lObj is MGN, don't do this.
  if (
    !lemmaObjectIsMGN &&
    drillPath &&
    !drillPath.map((arr) => arr[0]).includes("gender") &&
    refFxn.isTraitCompatibleLObj("gender", selectedLemmaObject, currentLanguage)
  ) {
    structureChunk.gender = [];
  }

  //STEP ONE: Update stCh gender with that of lObj.
  if (selectedLemmaObject.gender) {
    if (lemmaObjectIsMGN) {
      //If lObj does have metagender, set stCh gender to converted traitValues or filter stCh's gender by them.

      consol.log(
        `nxej updateStChByAndTagsAndSelectors Clause S: lObj "${selectedLemmaObject.lemma}" has metaSelector gender`
      );
      consol.log("nxej updateStChByAndTagsAndSelectors", structureChunk);
      consol.log(
        "[1;33m " +
          `nxej updateStChByAndTagsAndSelectors in clause S start "${structureChunk.gender}"` +
          "[0m"
      );

      let metaGender = selectedLemmaObject.gender;

      let metaGenderConverted =
        refObj.metaTraitValues[currentLanguage].gender[metaGender];

      if (structureChunk.gender && structureChunk.gender.length) {
        structureChunk.gender = structureChunk.gender.filter(
          (genderTraitValue) => metaGenderConverted.includes(genderTraitValue)
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

  //STEP THREE: For all remaining selectors, update the stCh with traitValues from lObj.
  let selectors =
    refObj.lemmaObjectTraitKeys[currentLanguage].selectors[
      gpUtils.getWordtypeStCh(structureChunk)
    ];

  consol.log("abyy updateStChByAndTagsAndSelectors", { doneSelectors });

  if (selectors) {
    selectors
      .filter((selector) => !doneSelectors.includes(selector))
      .forEach((selector) => {
        if (gpUtils.traitValueIsMeta(selectedLemmaObject[selector])) {
          consol.throw(
            `oppb updateStChByAndTagsAndSelectors I wasn't expecting a metaTraitValue selector here. It should have been processed already, in step one, and then added to doneSelectors, which would have prevented it being used here. selectedLemmaObject[selector]:"${selectedLemmaObject[selector]}"`
          );
        }

        structureChunk[selector] = [selectedLemmaObject[selector]];
      });
  } else {
    consol.log(
      "[1;31m " +
        `vbob updateStChByAndTagsAndSelectors Just to note that refObj gave no selectors for currentLanguage "${currentLanguage}" and s'tructureChunk.wordtype "${gpUtils.getWordtypeStCh(
          structureChunk
        )}"` +
        "[0m"
    );
  }

  //STEP FOUR: Selectors that must be handled specially.

  if (
    !structureChunk.doNotUpdateSpecificLemmasAsIsJustOneMDN &&
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    structureChunk.specificLemmas = [selectedLemmaObject.lemma]; //SLIM (specificLemma Issue re MDNs)
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
      let requiredInflectionCategory = drillPathSubArr[0];
      let selectedInflectionKey = drillPathSubArr[1];

      outputUnit.structureChunk[requiredInflectionCategory] = [
        selectedInflectionKey,
      ];
    });
  }
};

exports.filterOutLackingLemmaObjects = (sourceArr, stCh, currentLanguage) => {
  let inflectionChain =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      gpUtils.getWordtypeStCh(stCh)
    ];
  let requirementArrs = inflectionChain.map((traitKey) => stCh[traitKey] || []);

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

exports.padOutRequirementArrWithMetaTraitValuesIfNecessary = (
  requirementArrs,
  traitKey,
  currentLanguage
) => {
  let requirementArr = requirementArrs[traitKey] || [];
  let metaTraitValueRef = refObj.metaTraitValues[currentLanguage][traitKey];

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
      if (gpUtils.traitValueIsMeta(traitValue)) {
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

      //But also need do the inverse of this. If reqArr has 'f', then allow lObj to pass filter if lObj gender is 'allSingularGenders' eg.
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
  currentLanguage
) => {
  consol.log(
    "wdwe filterBySelector_inner START. structureChunk",
    structureChunk
  );

  // let requirementArray =
  //   lfUtils.padOutRequirementArrWithMetaTraitValuesIfNecessary(
  //     structureChunk,
  //     traitKey,
  //     currentLanguage
  //   );
  let requirementArray = structureChunk[traitKey] || [];

  let metaTraitValueRef = refObj.metaTraitValues[currentLanguage][traitKey];

  consol.log("wdet filterBySelector_inner. requirementArray", requirementArray);

  //And finally, do said filter.
  if (requirementArray.length) {
    return lemmaObjectArr.filter((lObj) => {
      let lObjSelectorValues = [lObj[traitKey]].slice(0);

      consol.log("wdeu lObjSelectorValues", lObjSelectorValues);

      //ADJUST VIRILITY OF LOBJ VALUES
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
      }

      //ADJUST META OF LOBJ VALUES
      //stCh could have gender "m", but that would fail to select lObj ENG doctor with gender "allPersonalGenders".
      //So add the translations of the lObj's metagender to its lObjSelectorValues arr.
      lObjSelectorValues.forEach((lObjSelectorValue) => {
        if (gpUtils.traitValueIsMeta(lObjSelectorValue)) {
          if (!metaTraitValueRef) {
            consol.throw(
              `diof I am to translate this meta value "${lObjSelectorValue}" for "${currentLanguage}" traitKey "${traitKey}" but no such translation ref?`
            );
          }

          let translatedMetaValues = metaTraitValueRef[lObjSelectorValue];

          lObjSelectorValues = [...lObjSelectorValues, ...translatedMetaValues];
        }
      });

      consol.log(
        "wdev filterBySelector_inner lObjSelectorValues after adjustments for virility if applicable, and for meta",
        lObjSelectorValues
      );

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
  consoleLogLaabel
) => {
  let selectors =
    refObj.lemmaObjectTraitKeys[currentLanguage].selectors[
      gpUtils.getWordtypeStCh(structureChunk)
    ];

  consol.log(
    `rcwo filterBySelectors called from ${consoleLogLaabel}. selectors are [${selectors}]`
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
        currentLanguage
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
  multipleMode,
  currentLanguage,
  consoleLogLaabel
) => {
  let chunkId = structureChunk ? structureChunk.chunkId : "???";

  consol.log(
    `zbbg lf.traverseAndRecordInflections starting for "${chunkId}", and source is:`,
    source
  );

  let shouldConsoleLog = true;

  if (shouldConsoleLog) {
    consol.log(
      `kyde traverseAndRecordInflections for "${chunkId}" called by "${consoleLogLaabel}" reqArr`,
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
      gpUtils.traitValueIsMeta(chosenInflectionKey) &&
      !source[chosenInflectionKey]
    ) {
      chosenInflectionKeyAdjusted =
        otUtils.switchMetaTraitValueForAWorkableConvertedTraitValue(
          reqInflectionCategory,
          chosenInflectionKey,
          source,
          currentLanguage,
          structureChunk,
          "traverseAndRecordInflections ->  reqInflectionKeys.forEach"
        );
    }

    if (Array.isArray(source[chosenInflectionKeyAdjusted])) {
      consol.throw(
        `uwmf lf:traverseAndRecordInflections for "${chunkId}" Uh oh Natasha, array!`
      );
    }

    if (
      typeof source[chosenInflectionKeyAdjusted] === "string" ||
      (gpUtils.isTerminusObject(source[chosenInflectionKeyAdjusted]) &&
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
      gpUtils.isTerminusObject(source[chosenInflectionKeyAdjusted]) &&
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
        multipleMode,
        currentLanguage,
        "traverseAndRecordInflections" // deletable
      );

      // consol.log("fxxb8");

      outputUnitsWithDrillPathsMini.pop();
    } else {
      consol.log(
        "[1;33m " +
          `buwt #NB lf.traverseAndRecordInflections for "${chunkId}" found no matching inflectionValues during drilling for ${reqInflectionCategory}: "${chosenInflectionKeyAdjusted}".` +
          "[0m"
      );
    }
  });
};
