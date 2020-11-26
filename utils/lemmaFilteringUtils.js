const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  console.log(
    "filterWithinSelectedLemmaObject fxn was given these arguments:",
    {
      lemmaObject,
      structureChunk,
      currentLanguage,
    }
  );

  let source = lemmaObject.inflections;

  let inflectionChain =
    refObj.lemmaObjectCharacteristics[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  let requirementArrs = [];
  inflectionChain.forEach((key) => {
    requirementArrs.push([key, structureChunk[key] || []]);
  });

  let { routesByNesting, routesByLevel } = otUtils.extractNestedRoutes(
    lemmaObject.inflections
  );

  let inflectionPathsInSource = routesByNesting;

  let errorInDrilling = false;

  let drillPath = [];

  requirementArrs.forEach((requirementKeyedArr, requirementArrIndex) => {
    if (errorInDrilling) {
      return;
    }
    if (typeof source !== "string") {
      source = drillDownOneLevel_filterWithin(
        source,
        requirementKeyedArr,
        requirementArrIndex
      );
      if (!source) {
        errorInDrilling = true;
      }
    }
  });

  return exports.sendFinalisedWord(
    errorInDrilling,
    source,
    structureChunk,
    lemmaObject
  );

  function drillDownOneLevel_filterWithin(
    source,
    requirementFeatureArr,
    requirementArrIndex
  ) {
    let sourceFeatures = Object.keys(source);
    let validFeatures = [];
    let requiredFeatureCategory = requirementFeatureArr[0];
    let requiredFeaturesArr = requirementFeatureArr[1];

    if (requiredFeaturesArr.length) {
      validFeatures = sourceFeatures.filter((feature) =>
        requiredFeaturesArr.includes(feature)
      );
    } else {
      validFeatures = sourceFeatures;
    }

    validFeatures = validFeatures.filter((feature_i) => {
      let copyDrillPath = [...drillPath];
      copyDrillPath.push(feature_i);

      let putativePathsWithDrillPathSoFar = inflectionPathsInSource.filter(
        (inflectionPath_j) => {
          return copyDrillPath.every(
            (drillPathFeature, drillPathFeatureIndex) => {
              return (
                inflectionPath_j[drillPathFeatureIndex] === drillPathFeature
              );
            }
          );
        }
      );

      let putativePathsLookingAhead = putativePathsWithDrillPathSoFar.filter(
        (putativePath) => {
          return requirementArrs.every(
            (requirementArr_i, requirementArrIndex_i) => {
              let requiredFeatureCategory_i = requirementArr_i[0];
              let requiredFeaturesArr_i = requirementArr_i[1];

              return (
                !requiredFeaturesArr_i.length ||
                requiredFeaturesArr_i.includes(
                  putativePath[requirementArrIndex_i]
                )
              );
            }
          );
        }
      );

      return putativePathsLookingAhead.length;
    });

    console.log({ validFeatures });

    if (!validFeatures.length) {
      return null;
    }

    let selectedFeature = gpUtils.selectRandom(validFeatures);

    console.log(
      `                                                    Selecting feature ${selectedFeature} as ${requiredFeatureCategory}.`
    );

    structureChunk[requiredFeatureCategory] = [selectedFeature];
    drillPath.push(selectedFeature);
    return source[selectedFeature];
  }
};

exports.updateStructureChunk = (
  lemmaObject,
  structureChunk,
  currentLanguage
) => {
  console.log("updateStructureChunk fxn was given these arguments:", {
    lemmaObject,
    structureChunk,
    currentLanguage,
  });

  structureChunk.tags = structureChunk.tags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });

  let selectors =
    refObj.lemmaObjectCharacteristics[currentLanguage].selectors[
      structureChunk.wordtype
    ];

  if (selectors) {
    selectors.forEach((selector) => {
      structureChunk[selector] = [lemmaObject[selector]];
    });
  }
};

// exports.retrieveJustParticiple = (
//   structureChunk,
//   lemmaObject,
//   specialTenseArr
// ) => {
//   let result = null;

//   specialTenseArr.forEach((specialTense) => {
//     if (!result) {
//       if (
//         structureChunk.tense.includes(specialTense) &&
//         lemmaObject.inflections.participle[specialTense]
//       ) {
//         result = lemmaObject.inflections.participle[specialTense];
//       }
//     }
//   });
//   return result;
// };

exports.sendFinalisedWord = (
  errorInDrilling,
  source,
  structureChunk,
  selectedLemmaObject
) => {
  if (errorInDrilling) {
    return null;
  } else {
    if (typeof source === "string") {
      return {
        selectedWord: source,
        updatedStructureChunk: structureChunk,
        selectedLemmaObject,
      };
    } else {
      return {
        selectedWord: gpUtils.selectRandom(source),
        updatedStructureChunk: structureChunk,
        selectedLemmaObject,
      };
    }
  }
};

exports.filterOutDeficientLemmaObjects = (
  sourceArr,
  specObj,
  currentLanguage
) => {
  let inflectionChain =
    refObj.lemmaObjectCharacteristics[currentLanguage].inflectionChains[
      specObj.wordtype
    ];
  let requirementArrs = inflectionChain.map((key) => specObj[key] || []);

  return sourceArr.filter((lObj) => {
    if (!lObj.deficient) {
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
        inflectionPathsInSource.some((inflectionPathSou) => {
          return gpUtils.areTwoFlatArraysEqual(
            inflectionPathReq,
            inflectionPathSou
          );
        })
      );
    }
  });
};

exports.filterByTag = (wordset, tags) => {
  let lemmaObjects = Object.values(wordset);

  if (tags.length) {
    return lemmaObjects.filter((lemmaObject) => {
      return tags.every((tag) => lemmaObject.tags.includes(tag));
    });
  } else {
    return lemmaObjects;
  }
};

exports.filterByKey = (lemmaObjectArr, requirementArrs, key) => {
  let requirementArr = requirementArrs[key] || [];

  if (requirementArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};
