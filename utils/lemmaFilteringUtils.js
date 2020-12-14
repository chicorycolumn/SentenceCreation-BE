const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage,
  kumquat
) => {
  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

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

  let pathRecord = [];

  traverseAndRecordInflections(source, requirementArrs, pathRecord);

  if (!pathRecord || !pathRecord.length) {
    errorInDrilling = true;
    return false;
  }

  if (kumquat) {
    return pathRecord.map((selectedPath) => {
      let { selectedWordArray, drillPath } = selectedPath;
      return {
        errorInDrilling,
        selectedWordArray,
        drillPath,
      };
    });
  } else {
    let selectedPath = gpUtils.selectRaandom(pathRecord);

    let { selectedWordArray, drillPath } = selectedPath;

    return [
      {
        errorInDrilling,
        selectedWordArray,
        drillPath,
      },
    ];
  }

  function traverseAndRecordInflections(
    source,
    reqArr,
    pathRecord,
    pathRecordMini
  ) {
    if (!pathRecordMini) {
      pathRecordMini = [];
    }

    let reqSubArr = reqArr[0];

    let reqInflectorLabel = reqSubArr[0];
    let reqInflectorArr = reqSubArr[1];

    if (!reqInflectorArr.length) {
      reqInflectorArr = Object.keys(source);
    }

    reqInflectorArr.forEach((chosenInflector) => {
      if (
        typeof source[chosenInflector] === "string" ||
        Array.isArray(source[chosenInflector])
      ) {
        pathRecordMini.push([reqInflectorLabel, chosenInflector]);

        pathRecord.push({
          selectedWordArray:
            typeof source[chosenInflector] === "string"
              ? [source[chosenInflector]]
              : source[chosenInflector],
          drillPath: pathRecordMini.slice(0),
        });

        pathRecordMini.pop();
        return source[chosenInflector];
      } else if (typeof source[chosenInflector] === "object") {
        pathRecordMini.push([reqInflectorLabel, chosenInflector]);
        traverseAndRecordInflections(
          source[chosenInflector],
          reqArr.slice(1),
          pathRecord,
          pathRecordMini
        );
      }
      pathRecordMini.pop();
    });
  }
};

exports.updateStructureChunkByInflections = (outputUnit, currentLanguages) => {
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

  structureChunk.andTags = structureChunk.andTags.filter((andTag) => {
    selectedLemmaObject.tags.includes(andTag);
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

exports.filterByAndTagsAndOrTags = (wordset, structureChunk) => {
  let lemmaObjects = Object.values(wordset);

  let { andTags, orTags } = structureChunk;

  if (andTags && andTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) => {
      return andTags.every((andTag) => lemmaObject.tags.includes(andTag));
    });
  }

  if (orTags && orTags.length) {
    lemmaObjects = lemmaObjects.filter((lemmaObject) => {
      return orTags.some((orTag) => lemmaObject.tags.includes(orTag));
    });
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
      matches = exports.filterByKey(matches, structureChunk, selector);
    });
  }

  return matches;
};
