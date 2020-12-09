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

  // console.log(">>>inflectionPathsInSource", inflectionPathsInSource);
  // console.log(">>>requirementArrs", requirementArrs);

  let pathRecord = [];

  traverseAndRecordInflections(source, requirementArrs, pathRecord);

  if (!pathRecord || !pathRecord.length) {
    errorInDrilling = true;
    return false;
  }

  if (kumquat) {
    return pathRecord.map((selectedPath) => {
      let { selectedWordOrArray, drillPath } = selectedPath;
      return {
        errorInDrilling,
        selectedWordOrArray,
        drillPath,
      };
    });
  } else {
    let selectedPath = gpUtils.selectRandom(pathRecord);

    let { selectedWordOrArray, drillPath } = selectedPath;

    return {
      errorInDrilling,
      selectedWordOrArray,
      drillPath,
    };
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
      // pathRecord.push([reqInflectorLabel, chosenInflector])

      if (
        typeof source[chosenInflector] === "string" ||
        Array.isArray(source[chosenInflector])
      ) {
        // pathRecordMini.push(`${reqInflectorLabel.slice(0, 2)}-${chosenInflector.slice(0, 3)}-${source[chosenInflector]}`)

        pathRecordMini.push([reqInflectorLabel, chosenInflector]);

        pathRecord.push({
          selectedWordOrArray: source[chosenInflector],
          drillPath: pathRecordMini.slice(0),
        });

        pathRecordMini.pop();
        return source[chosenInflector];
      } else if (typeof source[chosenInflector] === "object") {
        pathRecordMini.push([reqInflectorLabel, chosenInflector]);
        // pathRecordMini.push(`${reqInflectorLabel.slice(0, 4)}-${chosenInflector.slice(0, 3)}`)
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

exports.updateStructureChunkByTagsAndSelectors = (
  outputUnit,
  currentLanguage
) => {
  // console.log(
  //   "updateStructureChunkByTagsAndSelectors fxn was given these arguments:",
  //   { outputUnit, currentLanguage }
  // );

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
