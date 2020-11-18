const gpUtils = require("./generalPurposeUtils.js");
const scUtils = require("./sentenceCreationUtils.js");

exports.filterByKey = (lemmaObjectArr, requirementArr, key) => {
  if (requirementArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};

exports.filterWithinLemmaObjectByNestedKeys = (
  lemmaObject,
  formulaChunk,
  inflectionChainRefObj
) => {
  let source = lemmaObject.inflections;
  formulaChunk.manTags = formulaChunk.manTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });
  formulaChunk.optTags = formulaChunk.optTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });

  //Do this for nouns, because noun lobjs have a gender, which they can put onto formulaChunk to show what choice we made.
  //Don't do this for adjs, because they are the reverse. We earlier put the head word's gender onto the formulaChunk,
  //but the adj lobj has no gender key.
  if (["noun"].includes(formulaChunk.wordtype)) {
    formulaChunk["gender"] = [lemmaObject["gender"]];
  }

  let inflectionChain = inflectionChainRefObj[formulaChunk.wordtype];

  let requirementArrs = [];
  inflectionChain.forEach((key) => {
    requirementArrs.push([key, formulaChunk[key]]);
  });

  let errorInDrilling = false;

  requirementArrs.forEach((requirementKeyedArr) => {
    source = drillDownOneLevel(source, requirementKeyedArr);
    if (!source) {
      errorInDrilling = true;
      return false;
    }
  });

  if (errorInDrilling) {
    return null;
  } else {
    if (typeof source === "string") {
      return {
        selectedWord: source,
        modifiedFormulaChunk: formulaChunk,
      };
    } else {
      return {
        selectedWord: gpUtils.selectRandom(source),
        modifiedFormulaChunk: formulaChunk,
      };
    }
  }

  function drillDownOneLevel(source, requirementFeatureArr) {
    let sourceFeatures = Object.keys(source);
    let validFeatures = [];

    let featureKey = requirementFeatureArr[0];
    let featureValue = requirementFeatureArr[1];

    if (featureValue.length) {
      validFeatures = sourceFeatures.filter((featureSubitem) =>
        featureValue.includes(featureSubitem)
      );
    } else {
      validFeatures = sourceFeatures;
    }

    if (validFeatures.length) {
      let selectedFeature = gpUtils.selectRandom(validFeatures);

      formulaChunk[featureKey] = [selectedFeature];

      return source[selectedFeature];
    } else {
      return null;
    }
  }
};

exports.filterOutDefectiveInflections = (
  sourceArr,
  specObj,
  inflectionChainRefObj
) => {
  let inflectionChain = inflectionChainRefObj[specObj.wordtype];
  let requirementArrs = inflectionChain.map((key) => specObj[key]);

  return sourceArr.filter((lObj) => {
    if (!lObj.defective) {
      return true;
    } else {
      let { routesByNesting, routesByLevel } = scUtils.extractNestedRoutes(
        lObj.inflections
      );

      let inflectionPathsInSource = routesByNesting;

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
