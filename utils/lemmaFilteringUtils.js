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

  ////Zeta I think this is unused.
  let { routesByNesting, routesByLevel } = otUtils.extractNestedRoutes(
    lemmaObject.inflections
  );

  let inflectionPathsInSource = routesByNesting;
  ////

  let errorInDrilling = false;
  let pathRecord = [];

  exports.traverseAndRecordInflections2(source, requirementArrs, pathRecord);

  //Drill Virile Issue:
  //When number is plural, or perhaps when gender is virile or nonvirile,
  //then the drillPath is only [["number", "virile"]] or nonvirile.
  //But the drillpath should have all the others too.

  pathRecord.forEach((pathRecordUnit) => {
    console.log(
      "pppathRecordUnit selectedWordArray:",
      pathRecordUnit.selectedWordArray
    );
    console.log("pppathRecordUnit drillPath:", pathRecordUnit.drillPath);
    console.log(" ");
    console.log(" ");
  });
  // throw "Cease.";

  /**Masculinist Agenda: Overrepresentation issue.
   *
   * pathRecord = [ { pisałem (m1) }, { pisałem (m2) }, { pisałem (m3) }, { pisałam (f) }  ]
   *
   * So see how when non-kumquat condition does selectRandom, it will choose pisałem 3/4 of the time.
   *
   * This happens whether structureChunk gender is blank or not.
   */

  if (!pathRecord || !pathRecord.length) {
    errorInDrilling = true;
    return false;
  }

  if (kumquat) {
    //Zeta this could be tidied up. Just add errorInDrilling to the array and return that, instead of mapping it.

    return pathRecord.map((selectedPath) => {
      let { selectedWordArray, drillPath } = selectedPath;
      return {
        errorInDrilling,
        selectedWordArray,
        drillPath,
      };
    });
  } else {
    let selectedPath = gpUtils.selectRandom(pathRecord);

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

exports.updateStructureChunkByAdhocOnly = (
  structureChunk,
  currentLanguage,
  adhocLabel,
  adhocValue
) => {
  structureChunk[adhocLabel] = [adhocValue];
};

exports.updateStructureChunkByInflections = (outputUnit, currentLanguage) => {
  console.log(
    "LF:updateStructureChunkByInflections says that this drillPath should be all",
    outputUnit.drillPath
  );

  // throw "Cease.";

  if (outputUnit.drillPath) {
    outputUnit.drillPath.forEach((drillPathSubArr) => {
      let requiredInflectorCategory = drillPathSubArr[0];
      let selectedInflector = drillPathSubArr[1];

      outputUnit.structureChunk[requiredInflectorCategory] = [
        selectedInflector,
      ];
    });
  }

  console.log(
    "LF:updateStructureChunkByInflections FINISHED outputUnit:",
    outputUnit
  );
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
    structureChunk.andTags = structureChunk.andTags.filter((andTag) => {
      selectedLemmaObject.tags.includes(andTag);
    });
  }

  //Magenta option:
  /**Even if structureChunk doesn't have any andTags, create such a key,
   * and fill it with the tags from the lobj.
   */
  // if (structureChunk.andTags) {
  //   structureChunk.andTags = structureChunk.andTags.filter((andTag) => {
  //     selectedLemmaObject.tags.includes(andTag);
  //   });
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

exports.traverseAndRecordInflections2 = (
  source,
  reqArr,
  pathRecord,
  pathRecordMini
) => {
  if (!pathRecordMini) {
    pathRecordMini = [];
  }

  let reqSubArr = reqArr[0];

  let reqInflectorLabel = reqSubArr[0];
  let reqInflectorArr = reqSubArr[1];

  if (!reqInflectorArr.length) {
    reqInflectorArr = Object.keys(source);
  }

  reqInflectorArr.forEach((chosenInflector, reqInflectorArrIndex) => {
    // console.log(
    //   "#Shall I enter WHITE with chosenInflector: " + chosenInflector + "?"
    // );
    if (
      typeof source[chosenInflector] === "string" ||
      Array.isArray(source[chosenInflector])
    ) {
      // console.log(
      //   "I DID enter WHITE with chosenInflector: " + chosenInflector + "."
      // );
      // console.log("*");
      // console.log("**WHITE");
      // console.log("Okay, I am going to push these things into pathRecordMini");
      // console.log("pathRecordMini is currently:", pathRecordMini);
      // console.log("Gonna push reqInflectorLabel as:", reqInflectorLabel);
      // console.log("Gonna push chosenInflector as:", chosenInflector);

      pathRecordMini.push([reqInflectorLabel, chosenInflector]);

      // console.log("pathRecordMini is now:", pathRecordMini);
      // console.log("**");
      // console.log("*");

      // console.log("*");
      // console.log("**RED");
      // console.log("Okay, I am going to push these things into pathRecord");
      // console.log("pathRecord is currently:", pathRecord);
      // console.log("Gonna push selectedWordArray as:", source[chosenInflector]);
      // console.log("Gonna push pathRecordMini as:", pathRecordMini);

      pathRecord.push({
        selectedWordArray:
          typeof source[chosenInflector] === "string"
            ? [source[chosenInflector]]
            : source[chosenInflector],
        drillPath: pathRecordMini.slice(0),
      });

      // console.log("pathRecord is now:", pathRecord);
      // console.log("**");
      // console.log("*");

      // console.log("*");
      // console.log("**YELLOW");
      // console.log("pathRecordMini is currently:", pathRecordMini);
      // console.log("Gonna A-pop the last value.");

      pathRecordMini.pop();

      // console.log("pathRecordMini is now:", pathRecordMini);
      // console.log("**");
      // console.log("*");

      return source[chosenInflector];
    } else if (typeof source[chosenInflector] === "object") {
      // console.log("*");
      // console.log("**BLUE");
      // console.log("Okay, I am going to push these things into pathRecordMini");
      // console.log("pathRecordMini is currently:", pathRecordMini);
      // console.log("Gonna push reqInflectorLabel as:", reqInflectorLabel);
      // console.log("Gonna push chosenInflector as:", chosenInflector);

      pathRecordMini.push([reqInflectorLabel, chosenInflector]);

      // console.log("pathRecordMini is now:", pathRecordMini);
      // console.log("**");
      // console.log("*");

      exports.traverseAndRecordInflections2(
        source[chosenInflector],
        reqArr.slice(1),
        pathRecord,
        pathRecordMini
      );

      // console.log("*");
      // console.log("**GREEN");
      // console.log(
      //   `On this round of GREEN, the chosenInflector is: ${chosenInflector} at reqInflectorArrIndex ${reqInflectorArrIndex}.`
      // );
      // console.log("pathRecordMini is currently:", pathRecordMini);
      // console.log("Gonna B-pop the last value.");

      pathRecordMini.pop();

      // console.log("pathRecordMini is now:", pathRecordMini);
      // console.log("**");
      // console.log("*");
    }
  });
};
