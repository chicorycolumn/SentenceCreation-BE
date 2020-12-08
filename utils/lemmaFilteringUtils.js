const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage
) => {
  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.
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
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
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

  //STEP ONE: Drill down through lemma object.
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

  //STEP TWO: Send word.
  return {
    errorInDrilling,
    inflections: source,
    updatedStructureChunk: structureChunk,
    lemmaObject,
  };

  function drillDownOneLevel_filterWithin(
    source,
    requirementInflectorArr,
    requirementArrIndex
  ) {
    let sourceInflectors = Object.keys(source);
    let validInflectors = [];
    let requiredInflectorCategory = requirementInflectorArr[0];
    let requiredInflectorsArr = requirementInflectorArr[1];

    if (requiredInflectorsArr.length) {
      validInflectors = sourceInflectors.filter((inflector) =>
        requiredInflectorsArr.includes(inflector)
      );
    } else {
      validInflectors = sourceInflectors;
    }

    validInflectors = validInflectors.filter((inflector_i) => {
      let copyDrillPath = [...drillPath];
      copyDrillPath.push(inflector_i);

      let putativePathsWithDrillPathSoFar = inflectionPathsInSource.filter(
        (inflectionPath_j) => {
          return copyDrillPath.every(
            (drillPathInflector, drillPathInflectorIndex) => {
              return (
                inflectionPath_j[drillPathInflectorIndex] === drillPathInflector
              );
            }
          );
        }
      );

      let putativePathsLookingAhead = putativePathsWithDrillPathSoFar.filter(
        (putativePath) => {
          return requirementArrs.every(
            (requirementArr_i, requirementArrIndex_i) => {
              let requiredInflectorCategory_i = requirementArr_i[0];
              let requiredInflectorsArr_i = requirementArr_i[1];

              return (
                !requiredInflectorsArr_i.length ||
                requiredInflectorsArr_i.includes(
                  putativePath[requirementArrIndex_i]
                )
              );
            }
          );
        }
      );

      return putativePathsLookingAhead.length;
    });

    console.log({ validInflectors });

    if (!validInflectors.length) {
      return null;
    }

    let selectedInflector = gpUtils.selectRandom(validInflectors);

    console.log(
      `                                                    Selecting inflector ${selectedInflector} as ${requiredInflectorCategory}.`
    );

    console.log(
      "::::::::::::::::::::::::::::::::::::::::::updating structureChunk in drillDownOneLevel_filterWithin fxn."
    );
    structureChunk[requiredInflectorCategory] = [selectedInflector];
    drillPath.push(selectedInflector);
    return source[selectedInflector];
  }
};

exports.updateTagsAndSelectorsOfStructureChunk = (
  outputUnit,
  currentLanguage
) => {
  console.log(
    "updateTagsAndSelectorsOfStructureChunk fxn was given these arguments:",
    { outputUnit, currentLanguage }
  );

  let { selectedLemmaObject, structureChunk } = outputUnit;

  structureChunk.tags = structureChunk.tags.filter((tag) => {
    selectedLemmaObject.tags.includes(tag);
  });

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

exports.filterOutDeficientLemmaObjects = (
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
