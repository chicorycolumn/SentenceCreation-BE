const gpUtils = require("./generalPurposeUtils.js");
const scUtils = require("./sentenceCreationUtils.js");
const POLUtils = require("./specificPolishUtils.js");

exports.filterByKey = (lemmaObjectArr, requirementArrs, key) => {
  // console.log({ lemmaObjectArr, requirementArrs, key });

  let requirementArr = requirementArrs[key] || [];

  if (requirementArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  inflectionChainRefObj
) => {
  console.log(
    "filterWithinSelectedLemmaObject fxn >> structureChunk",
    structureChunk
  );

  let source = lemmaObject.inflections;

  structureChunk.manTags = structureChunk.manTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });
  structureChunk.optTags = structureChunk.optTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });

  // if (structureChunk.wordtype === "adjective") {
  //   if (
  //     structureChunk.number.length === 1 &&
  //     structureChunk.number[0] === "plural"
  //   ) {
  //     POLUtils.adjustVirility(structureChunk);
  //   } else {
  //     console.log(
  //       "Error in filterWithinSelectedLemmaObject fxn regarding adjectives, expected this adjective to have exactly one specfication as NUMBER feature."
  //     );
  //   }
  // }

  //Do this for nouns, because noun lobjs have a gender, which they can put onto structureChunk to show what choice we made.
  //Don't do this for adjs, because they are the reverse. We earlier put the head word's gender onto the structureChunk,
  //but the adj lobj has no gender key.
  if (["noun"].includes(structureChunk.wordtype)) {
    structureChunk["gender"] = [lemmaObject["gender"]];
  }

  let inflectionChain = inflectionChainRefObj[structureChunk.wordtype];

  let requirementArrs = [];
  inflectionChain.forEach((key) => {
    requirementArrs.push([key, structureChunk[key] || []]);
  });

  console.log(
    "filterWithinSelectedLemmaObject fxn >> requirementArrs",
    requirementArrs
  );

  let { routesByNesting, routesByLevel } = scUtils.extractNestedRoutes(
    lemmaObject.inflections
  );

  let inflectionPathsInSource = routesByNesting;

  let errorInDrilling = false;

  console.log("-------------------------");
  console.log(
    "inflectionPathsInSourceSLICE",
    inflectionPathsInSource.slice(0, 10)
  );
  console.log("-------------------------");

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

  function drillDownOneLevel_filterWithin(
    source,
    requirementFeatureArr,
    requirementArrIndex
  ) {
    // console.log("drillDownOneLevel_filterWithin >>source", source);
    console.log(
      "drillDownOneLevel_filterWithin >>requirementFeatureArr",
      requirementFeatureArr
    );

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

    console.log("//////////////////////////");
    console.log("//////////////////////////");
    console.log("//////////////////////////");
    validFeatures = validFeatures.filter((feature_i) => {
      let copyDrillPath = [...drillPath];
      copyDrillPath.push(feature_i);

      console.log({ copyDrillPath });
      console.log(
        "inflectionPathsInSourceSLICE",
        inflectionPathsInSource.slice(0, 20)
      );

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

      console.log(
        "putativePathsWithDrillPathSoFarSLICE",
        putativePathsWithDrillPathSoFar.slice(0, 20)
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

      console.log({ putativePathsLookingAhead });

      return putativePathsLookingAhead.length;
    });

    console.log("***");
    console.log({ validFeatures });
    console.log("***");

    if (validFeatures.length) {
      let selectedFeature = gpUtils.selectRandom(validFeatures);

      console.log(
        `                                                    Selecting feature ${selectedFeature} as ${requiredFeatureCategory}.`
      );

      structureChunk[requiredFeatureCategory] = [selectedFeature];
      drillPath.push(selectedFeature);
      console.log("Returning TRUTHY at end of drill fxn");
      return source[selectedFeature];
    } else {
      console.log("Returning NULL at end of drill fxn");
      return null;
    }
  }

  if (errorInDrilling) {
    return null;
  } else {
    if (typeof source === "string") {
      return {
        selectedWord: source,
        updatedStructureChunk: structureChunk,
      };
    } else {
      return {
        selectedWord: gpUtils.selectRandom(source),
        updatedStructureChunk: structureChunk,
      };
    }
  }
};

exports.filterOutDeficientLemmaObjects = (
  sourceArr,
  specObj,
  inflectionChainRefObj
) => {
  let inflectionChain = inflectionChainRefObj[specObj.wordtype];
  let requirementArrs = inflectionChain.map((key) => specObj[key] || []);

  return sourceArr.filter((lObj) => {
    if (!lObj.deficient) {
      return true;
    } else {
      let { routesByNesting, routesByLevel } = scUtils.extractNestedRoutes(
        lObj.inflections
      );

      let inflectionPathsInSource = routesByNesting;

      console.log(
        "***inflectionPathsInSourceSLICE",
        inflectionPathsInSourceSLICE.slice(0, 10)
      );

      let inflectionPathsInRequirements = scUtils.concoctNestedRoutes(
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

exports.filterByTag = (wordset, tags, mandatory) => {
  let lemmaObjs = Object.values(wordset);

  if (tags.length) {
    return lemmaObjs.filter((lemmaObj) => {
      if (mandatory) {
        return tags.every((tag) => lemmaObj.tags.includes(tag));
      } else {
        return tags.some((tag) => lemmaObj.tags.includes(tag));
      }
    });
  } else {
    return lemmaObjs;
  }
};

exports.filterByLemma = (source, structureChunk) => {
  let specificLemma = gpUtils.selectRandom(structureChunk.specificLemmas);
  return source.filter((lObj) => lObj.lemma === specificLemma);
};
