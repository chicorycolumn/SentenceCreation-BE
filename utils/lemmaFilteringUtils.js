const { head } = require("../app.js");
const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const lfUtils = require("./lemmaFilteringUtils.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage,
  kumquat,
  outputArray
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  //Counteract Masculinist Agenda: Overrepresentation
  if (currentLanguage === "POL") {
    langUtils.preventMasculineOverrepresentation(
      structureChunk,
      currentLanguage
    );
  }

  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.
  let PHD_type;

  refObj.postHocDependentChunkWordtypes[currentLanguage].forEach(
    (PHD_dataObj) => {
      if (
        Object.keys(PHD_dataObj.conditions).every((PHD_conditionKey) => {
          let PHD_conditionValue = PHD_dataObj.conditions[PHD_conditionKey];

          if (
            Array.isArray(PHD_conditionValue) &&
            PHD_conditionValue.every(
              (arrayItem) =>
                structureChunk[PHD_conditionKey] &&
                structureChunk[PHD_conditionKey].includes(arrayItem)
            )
          ) {
            return true;
          } else if (structureChunk[PHD_conditionKey] === PHD_conditionValue) {
            return true;
          } else {
            return false;
          }
        })
      ) {
        PHD_type = PHD_dataObj.PHD_type;
      }
    }
  );

  if (PHD_type) {
    if (
      !structureChunk.specificLemmas ||
      structureChunk.specificLemmas.length !== 1
    ) {
      throw "#ERR ----------------------> PHD-stCh should have exactly one value in specificLemmas arr.";
    }

    let postHocInflectionChains = refObj.postHocDependentChunkWordtypes[
      currentLanguage
    ].find((PHD_dataObj) => PHD_dataObj.PHD_type === PHD_type).inflectionChains;

    let lemmaObjectCopy = gpUtils.copyWithoutReference(lemmaObject);

    langUtils.preprocessLemmaObjectsMajor(
      [lemmaObjectCopy],
      structureChunk,
      true,
      currentLanguage
    );

    let source = gpUtils.copyWithoutReference(lemmaObjectCopy.inflections);

    Object.keys(postHocInflectionChains).forEach((postHocAgreeWithKey) => {
      let postHocInflectionChain = postHocInflectionChains[postHocAgreeWithKey];

      let headOutputUnit = outputArray.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId ===
          structureChunk[postHocAgreeWithKey]
      );

      let headDrillPath = gpUtils.copyWithoutReference(
        headOutputUnit.drillPath
      );

      if (!headDrillPath) {
        throw "This is an issue. There is no drillPath on the outputUnit with which I want to get features from the PHD stCh. Perhaps this outputUnit is one whose stCh did not go through If-PW?";
      }

      if (structureChunk.form) {
        if (structureChunk.form.length !== 1) {
          throw (
            "Expected structureChunk.form to have length of 1: " +
            structureChunk.chunkId
          );
        }

        headDrillPath.push(["form", structureChunk.form[0]]);
      }

      if (
        gpUtils.getWordtypeOfAgreeWith(structureChunk, postHocAgreeWithKey) ===
        "noun"
      ) {
        let personArr = headDrillPath.find((arr) => arr[0] === "person");

        if (personArr && !personArr[1] === "3per") {
          personArr[1] = "3per";
        } else {
          headDrillPath.push(["person", "3per"]);
        }
      }

      if (headOutputUnit.selectedLemmaObject.gender) {
        if (!headDrillPath.find((arr) => arr[0] === "gender")) {
          let numberArr = headDrillPath.find((arr) => arr[0] === "number");
          let numberValue = numberArr[1];

          headDrillPath.push([
            "gender",
            langUtils.formatFeatureValue(
              "gender",
              headOutputUnit.selectedLemmaObject.gender,
              numberValue
            ),
          ]);
        } else {
          throw "I am unsure about which gender to use - either the one from lobj inherent, or the one from drillPath. I was thinking of using this gender for the PHD stCh.";
        }
      }

      postHocInflectionChain.forEach((featureKey) => {
        let featureValue = headDrillPath.find(
          (arr) => arr[0] === featureKey
        )[1];

        source = source[featureValue];
      });
      //Alpha - Is this need to be done?
      //Get agreewithprimary stCh AND lobj
      //Get agreewithsecondary stCh AND lobj
      //Now use the features from them to get the right inflection from PHDstCh and PHDmatches.
    });

    let sourceArr = [];
    let resArr = [];

    if (Array.isArray(source)) {
      sourceArr = source;
    } else if (typeof source === "string") {
      sourceArr.push(source);
    } else {
      throw "#ERR ---------------> Expected this PHD value to be the end of a chain and thus a string or array.";
    }

    sourceArr.forEach((selectedWord) => {
      resArr.push({
        errorInDrilling: false,
        selectedWordArray: [selectedWord],
        drillPath: null,
      });
    });

    if (!kumquat) {
      resArr = [gpUtils.selectRandom(resArr)];
    }

    return resArr;
  } else {
    let inflectionChain =
      refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
        structureChunk.wordtype
      ];

    console.log(">>> >>> inflectionChain", inflectionChain);
    console.log(">>> structureChunk", structureChunk);

    let requirementArrs = [];

    inflectionChain.forEach((key) => {
      let inflectionValueArr = [];

      if (structureChunk[key]) {
        structureChunk[key].forEach((inflectionValue) => {
          console.log(">>>", { key, inflectionValue });

          let formattedFeatureValue = langUtils.formatFeatureValue(
            key,
            inflectionValue
          );

          let formattedFeatureValueArr = [];

          if (Array.isArray(formattedFeatureValue)) {
            formattedFeatureValueArr = formattedFeatureValue;
          } else {
            formattedFeatureValueArr.push(formattedFeatureValue);
          }

          console.log("formattedFeatureValueArr", formattedFeatureValueArr);

          inflectionValueArr = [
            ...inflectionValueArr,
            ...formattedFeatureValueArr,
          ];
        });
      }

      requirementArrs.push([key, inflectionValueArr]);
    });

    let errorInDrilling = false;
    let outputUnitsWithDrillPaths = [];

    console.log("requirementArrs", requirementArrs);

    let source = lemmaObject.inflections;

    lfUtils.traverseAndRecordInflections(
      source,
      requirementArrs,
      outputUnitsWithDrillPaths
    );

    if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
      console.log(
        "#ERR --------------------------------------> traverseAndRecordInflections returned FALSY for " +
          structureChunk.chunkId +
          " in " +
          currentLanguage
      );
      console.log({ outputUnitsWithDrillPaths });
      errorInDrilling = true;
      return false;
    }

    if (kumquat) {
      outputUnitsWithDrillPaths.forEach((selectedPath) => {
        selectedPath.errorInDrilling = errorInDrilling;
      });

      return outputUnitsWithDrillPaths;
    } else {
      let selectedPath = gpUtils.selectRandom(outputUnitsWithDrillPaths);

      let { selectedWordArray, drillPath } = selectedPath;

      return [
        {
          errorInDrilling,
          selectedWordArray,
          drillPath,
        },
      ];
    }
  }
};

exports.updateStructureChunkByAdhocOnly = (structureChunk, label, value) => {
  structureChunk[label] = [value];
};

exports.updateStructureChunkByInflections = (outputUnit, currentLanguage) => {
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

exports.updateStructureChunkByAndTagsAndSelectors = (
  outputUnit,
  currentLanguage
) => {
  let { selectedLemmaObject, structureChunk } = outputUnit;

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

  //Epsilon - this had to be done for ENG, but for POL it was already done elsewhere?
  if (selectedLemmaObject.gender) {
    structureChunk.gender = [
      selectedLemmaObject.gender,
      pluralVirilityConversion[selectedLemmaObject.gender],
    ];
  }

  //Yellow option:
  /**If structureChunk has any andTags, then filter that down to only
   * the andTags that are present in the tags of the lObj.
   */
  if (structureChunk.andTags) {
    structureChunk.andTags = structureChunk.andTags.filter((andTag) =>
      selectedLemmaObject.tags.includes(andTag)
    );
  }

  //Magenta option:
  /**Even if structureChunk doesn't have any andTags, create such a key,
   * and fill it with the tags from the lobj.
   */
  // if (structureChunk.andTags) {
  //   structureChunk.andTags = structureChunk.andTags.filter((andTag) =>
  //     selectedLemmaObject.tags.includes(andTag)
  //   );
  // } else {
  //   structureChunk.andTags = selectedLemmaObject.tags.slice();
  // }

  let selectors =
    refObj.lemmaObjectFeatures[currentLanguage].selectors[
      structureChunk.wordtype
    ];

  if (selectors) {
    selectors.forEach((selector) => {
      structureChunk[selector] = [selectedLemmaObject[selector]];
    });
  }
};

exports.filterOutLackingLemmaObjects = (
  sourceArr,
  specObj,
  currentLanguage
) => {
  let inflectionChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      specObj.wordtype
    ];
  let requirementArrs = inflectionChain.map((key) => specObj[key] || []);

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
          gpUtils.areTwoFlatArraysEqual(inflectionPathReq, inflectionPathSource)
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

exports.filterByKey = (lemmaObjectArr, requirementArrs, key) => {
  let requirementArr = requirementArrs[key] || [];

  if (requirementArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};

exports.filterBySelectors = (currentLanguage, structureChunk, matches) => {
  let selectors =
    refObj.lemmaObjectFeatures[currentLanguage].selectors[
      structureChunk.wordtype
    ];

  if (selectors) {
    selectors.forEach((selector) => {
      matches = lfUtils.filterByKey(matches, structureChunk, selector);
    });
  }

  return matches;
};

exports.traverseAndRecordInflections = (
  source,
  reqArr,
  outputUnitsWithDrillPaths,
  outputUnitsWithDrillPathsMini
) => {
  if (!outputUnitsWithDrillPathsMini) {
    outputUnitsWithDrillPathsMini = [];
  }

  let reqSubArr = reqArr[0];

  let reqInflectorLabel = reqSubArr[0];
  let reqInflectorArr = reqSubArr[1];

  if (!reqInflectorArr.length) {
    reqInflectorArr = Object.keys(source);
  }

  reqInflectorArr.forEach((chosenInflector, reqInflectorArrIndex) => {
    if (
      typeof source[chosenInflector] === "string" ||
      Array.isArray(source[chosenInflector]) ||
      (source[chosenInflector] && source[chosenInflector].isTerminus)
    ) {
      console.log("traverseAndRecordInflections Clause B", {
        reqInflectorLabel,
        chosenInflector,
      });

      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      outputUnitsWithDrillPaths.push({
        selectedWordArray: Array.isArray(source[chosenInflector])
          ? source[chosenInflector]
          : [source[chosenInflector]],
        drillPath: outputUnitsWithDrillPathsMini.slice(0),
      });

      outputUnitsWithDrillPathsMini.pop();

      return source[chosenInflector];
    } else if (
      gpUtils.isKeyValueTypeObject(source[chosenInflector]) &&
      !source[chosenInflector].isTerminus
    ) {
      console.log("traverseAndRecordInflections Clause A", {
        reqInflectorLabel,
        chosenInflector,
      });

      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      lfUtils.traverseAndRecordInflections(
        source[chosenInflector],
        reqArr.slice(1),
        outputUnitsWithDrillPaths,
        outputUnitsWithDrillPathsMini
      );

      outputUnitsWithDrillPathsMini.pop();
    } else {
      console.log("traverseAndRecordInflections Clause X", {
        reqInflectorLabel,
        chosenInflector,
      });
    }
  });
};
