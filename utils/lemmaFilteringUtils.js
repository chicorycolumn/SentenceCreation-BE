const gpUtils = require("./generalPurposeUtils.js");
const scUtils = require("./sentenceCreationUtils.js");

exports.filterByKey = (lemmaObjectArr, requirementArrs, key) => {
  let requirementArr = requirementArrs[key];

  if (requirementArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};

exports.filterWithinLemmaObjectByNestedKeys = (
  lemmaObject,
  structureChunk,
  inflectionChainRefObj
) => {
  let source = lemmaObject.inflections;
  structureChunk.manTags = structureChunk.manTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });
  structureChunk.optTags = structureChunk.optTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });

  if (structureChunk.wordtype === "adjective") {
    if (
      structureChunk.number.length === 1 &&
      structureChunk.number[0] === "plural"
    ) {
      exports.adjustVirileAndNonVirile(structureChunk);
    } else {
      console.log(
        "Error in filterWithinLemmaObjectByNestedKeys fxn regarding adjectives, expected this adjective to have exactly one specfication as NUMBER feature."
      );
    }
  }

  //Do this for nouns, because noun lobjs have a gender, which they can put onto structureChunk to show what choice we made.
  //Don't do this for adjs, because they are the reverse. We earlier put the head word's gender onto the structureChunk,
  //but the adj lobj has no gender key.
  if (["noun"].includes(structureChunk.wordtype)) {
    structureChunk["gender"] = [lemmaObject["gender"]];
  }

  let inflectionChain = inflectionChainRefObj[structureChunk.wordtype];

  let requirementArrs = [];
  inflectionChain.forEach((key) => {
    requirementArrs.push([key, structureChunk[key]]);
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
        modifiedStructureChunk: structureChunk,
      };
    } else {
      return {
        selectedWord: gpUtils.selectRandom(source),
        modifiedStructureChunk: structureChunk,
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

      structureChunk[featureKey] = [selectedFeature];

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

exports.adjustVirileAndNonVirile = (structureChunk) => {
  if (structureChunk.gender.length !== 1) {
    console.log(
      "Error in filterWithinLemmaObjectByNestedKeys fxn regarding adjectives, expected this adjective to have exactly one specfication as GENDER feature."
    );
    return;
  }

  const pluralGenderRefObj = {
    m1: "virile",
    m2: "nonvirile",
    m3: "nonvirile",
    f: "nonvirile",
    n: "nonvirile",
  };

  let pluralGender = pluralGenderRefObj[structureChunk.gender[0]];

  structureChunk.gender = [pluralGender];
};

exports.filterByLemma = (source, structureChunk) => {
  let specificLemma = gpUtils.selectRandom(structureChunk.specificLemmas);
  return source.filter((lObj) => lObj.lemma === specificLemma);
};
