const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const POLUtils = require("../source/POL/polishUtils.js");
const ENGUtils = require("../source/ENG/englishUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterByKey = (lemmaObjectArr, requirementArrs, key) => {
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
  currentLanguage
) => {
  console.log(
    "filterWithinSelectedLemmaObject fxn was given these arguments:",
    { lemmaObject, structureChunk, currentLanguage }
  );

  let source = lemmaObject.inflections;

  //PART ONE: Move features from lobj to structurechunk.
  structureChunk.tags = structureChunk.tags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });

  //Do this for nouns, because noun lobjs have a gender, which they can put onto structureChunk to show what choice we made.
  //Don't do this for adjs, because they are the reverse. We earlier put the head word's gender onto the structureChunk, but the adj lobj has no gender key.
  if (["noun"].includes(structureChunk.wordtype)) {
    structureChunk["gender"] = [lemmaObject["gender"]];
  }

  //PART TWO: Optionally return immediately if requested word is a participle with no inflections.
  if (["verb"].includes(structureChunk.wordtype)) {
    if (
      structureChunk.form &&
      structureChunk.form.includes("participle") &&
      structureChunk.tense
    ) {
      if (currentLanguage === "POL") {
        let participle = exports.retrieveJustParticiple(
          structureChunk,
          lemmaObject,
          ["contemporaryAdverbial", "anteriorAdverbial"]
        );

        console.log("filterWithinSelectedLemmaObject fxn part two", participle);
        if (participle) {
          return exports.sendFinalisedWord(null, participle, structureChunk);
        }
      } else if (currentLanguage === "ENG") {
        ENGUtils.addSpecialVerbConjugations(lemmaObject, currentLanguage);

        let participle = exports.retrieveJustParticiple(
          structureChunk,
          lemmaObject,
          [
            "contemporaryAdverbial",
            "anteriorAdverbial",
            "passiveAdjectival",
            "activeAdjectival",
            "pastParticiple",
          ]
        );

        console.log("filterWithinSelectedLemmaObject fxn part two", participle);
        if (participle) {
          return exports.sendFinalisedWord(null, participle, structureChunk);
        }
      }
    }
  }

  //PART THREE: Optionally return immediately if 'ad hoc' lobj. So this is lobjs who we know aren't deficient, and will generate their words programmatically.
  if (currentLanguage === "ENG") {
    if (
      ["verb"].includes(structureChunk.wordtype) &&
      !["participle"].includes(structureChunk.form)
    ) {
      let result = ENGUtils.generateAndReturnSimpleVerbConjugation(
        structureChunk,
        lemmaObject,
        currentLanguage
      );

      if (result) {
        return exports.sendFinalisedWord(null, result, structureChunk);
      }
    }
  }

  //PART FOUR: Drill down through the lobj and extract final word (ensuring we don't randomly go a dead end).
  if (typeof source === "string") {
    return exports.sendFinalisedWord(null, source, structureChunk);
  }

  let inflectionChain =
    refObj.inflectionChains[currentLanguage][structureChunk.wordtype];

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

  return exports.sendFinalisedWord(errorInDrilling, source, structureChunk);

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

exports.retrieveJustParticiple = (
  structureChunk,
  lemmaObject,
  specialTenseArr
) => {
  let result = null;

  specialTenseArr.forEach((specialTense) => {
    if (!result) {
      if (
        structureChunk.tense.includes(specialTense) &&
        lemmaObject.inflections.participle[specialTense]
      ) {
        result = lemmaObject.inflections.participle[specialTense];
      }
    }
  });
  return result;
};

exports.sendFinalisedWord = (errorInDrilling, source, structureChunk) => {
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
  currentLanguage
) => {
  let inflectionChain =
    refObj.inflectionChains[currentLanguage][specObj.wordtype];
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
