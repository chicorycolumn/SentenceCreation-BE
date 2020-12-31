const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const langUtils = require("./referenceObjects.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage,
  kumquat
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
  let source = lemmaObject.inflections;

  let inflectionChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  let requirementArrs = [];

  inflectionChain.forEach((key) => {
    requirementArrs.push([key, structureChunk[key] || []]);
  });

  let errorInDrilling = false;
  let outputUnitsWithDrillPaths = [];

  exports.traverseAndRecordInflections(
    source,
    requirementArrs,
    outputUnitsWithDrillPaths
  );

  if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
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
  console.log("filterOutLackingLemmaObjects fxn was given:", {
    sourceArr,
    specObj,
    currentLanguage,
  });

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
      matches = exports.filterByKey(matches, structureChunk, selector);
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
      Array.isArray(source[chosenInflector])
    ) {
      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      outputUnitsWithDrillPaths.push({
        selectedWordArray:
          typeof source[chosenInflector] === "string"
            ? [source[chosenInflector]]
            : source[chosenInflector],
        drillPath: outputUnitsWithDrillPathsMini.slice(0),
      });

      outputUnitsWithDrillPathsMini.pop();

      return source[chosenInflector];
    } else if (typeof source[chosenInflector] === "object") {
      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      exports.traverseAndRecordInflections(
        source[chosenInflector],
        reqArr.slice(1),
        outputUnitsWithDrillPaths,
        outputUnitsWithDrillPathsMini
      );

      outputUnitsWithDrillPathsMini.pop();
    }
  });
};

exports.adjustImOnlyLemmaObjects = (matches) => {
  matches.forEach((lObj) => {
    if (lObj.imperfectiveOnly_unadjusted && lObj.aspect === "imperfective") {
      console.log(
        "Hey, heads up, I'm making a copy of lemma object '" +
          lObj.lemma +
          "' with perfective Aspect."
      );

      lObj.imperfectiveOnly = true;
      delete lObj.imperfectiveOnly_unadjusted;

      let adjustedLemmaObject = gpUtils.copyWithoutReference(lObj);
      adjustedLemmaObject.aspect = "perfective";

      let newIdArr = lObj.id.split("-");
      newIdArr[3] = "pf";
      adjustedLemmaObject.id = newIdArr.join("-");

      matches.push(adjustedLemmaObject);
    }
  });
};
