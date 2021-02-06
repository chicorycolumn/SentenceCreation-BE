const { head } = require("../app.js");
const gpUtils = require("./generalPurposeUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const { convertMetaFeatures } = require("./allLangUtils.js");

exports.filterWithinSelectedLemmaObject = (
  lemmaObject,
  structureChunk,
  currentLanguage,
  multipleMode,
  outputArray
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

  //STEP ZERO: Get necessary materials, ie inflectionPaths and requirementArrs.
  let PHD_type;

  refObj.postHocDependentChunkWordtypes[currentLanguage].forEach(
    (PHD_dataObj) => {
      if (
        Object.keys(PHD_dataObj.conditions).every((PHD_conditionKey) => {
          let PHD_conditionValue = PHD_dataObj.conditions[PHD_conditionKey];

          if (
            Array.isArray(PHD_conditionValue) &&
            PHD_conditionValue.every(
              (arrayItem) =>
                structureChunk[PHD_conditionKey] &&
                structureChunk[PHD_conditionKey].includes(arrayItem)
            )
          ) {
            return true;
          } else if (structureChunk[PHD_conditionKey] === PHD_conditionValue) {
            return true;
          } else {
            return false;
          }
        })
      ) {
        PHD_type = PHD_dataObj.PHD_type;
      }
    }
  );

  if (PHD_type) {
    console.log(
      "[1;35m " +
        "s11 At the START lf:filterWithin PHD section, structureChunk is:" +
        "[0m",
      structureChunk
    );

    if (
      !structureChunk.specificLemmas ||
      structureChunk.specificLemmas.length !== 1
    ) {
      gpUtils.throw(
        "#ERR ----------------------> PHD-stCh should have exactly one value in specificLemmas arr."
      );
    }

    let postHocInflectionChains = refObj.postHocDependentChunkWordtypes[
      currentLanguage
    ].find((PHD_dataObj) => PHD_dataObj.PHD_type === PHD_type).inflectionChains;

    console.log("postHocInflectionChains", postHocInflectionChains);

    let lemmaObjectCopy = gpUtils.copyWithoutReference(lemmaObject);

    langUtils.preprocessLemmaObjectsMajor(
      [lemmaObjectCopy],
      structureChunk,
      true,
      currentLanguage
    );

    let source = gpUtils.copyWithoutReference(lemmaObjectCopy.inflections);

    Object.keys(postHocInflectionChains).forEach((postHocAgreeWithKey) => {
      console.log("[1;35m " + `Running loop for ${postHocAgreeWithKey}` + "[0m");

      let postHocInflectionChain = postHocInflectionChains[postHocAgreeWithKey];

      let headOutputUnit = outputArray.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId ===
          structureChunk[postHocAgreeWithKey]
      );

      let drillPathForPHD = gpUtils.copyWithoutReference(
        headOutputUnit.drillPath
      );

      if (!drillPathForPHD) {
        gpUtils.throw(
          "#ERR There is no drillPath on the outputUnit with which I want to get features from the PHD stCh. Perhaps this outputUnit is one whose stCh did not go through If-PW?"
        );
      }

      if (structureChunk.form) {
        if (structureChunk.form.length !== 1) {
          gpUtils.throw(
            "#ERR Expected structureChunk.form to have length of 1: " +
              structureChunk.chunkId
          );
        }

        drillPathForPHD.push(["form", structureChunk.form[0]]);
      }

      if (
        gpUtils.getWordtypeOfAgreeWith(structureChunk, postHocAgreeWithKey) ===
        "noun"
      ) {
        let personArr = drillPathForPHD.find((arr) => arr[0] === "person");

        if (!personArr) {
          drillPathForPHD.push(["person", "3per"]);
        } else if (personArr && !personArr[1] === "3per") {
          personArr[1] = "3per";
        }
      }

      if (headOutputUnit.selectedLemmaObject.gender) {
        if (!drillPathForPHD.find((arr) => arr[0] === "gender")) {
          let numberArr = drillPathForPHD.find((arr) => arr[0] === "number");

          let numberValue = numberArr[1];

          let formattedFeatureValueArray = langUtils.formatFeatureValue(
            "gender",
            headOutputUnit.selectedLemmaObject.gender,
            numberValue
          );

          if (formattedFeatureValueArray.length !== 1) {
            gpUtils.throw(
              "#ERR lf:filterWithin expected formattedFeatureValueArray to have length 1"
            );
          }
          let formattedFeatureValue = formattedFeatureValueArray[0];

          drillPathForPHD.push(["gender", formattedFeatureValue]);
        } else {
          throw "I am unsure about which gender to use - either the one from lobj inherent, or the one from drillPath. I wanted to use this gender for the PHD stCh.";
        }
      }

      console.log("s13 drillPathForPHD is finally", drillPathForPHD);

      postHocInflectionChain.forEach((featureKey) => {
        let featureValue = drillPathForPHD.find(
          (arr) => arr[0] === featureKey
        )[1];

        console.log(`s14 drilling into source with ${featureValue}`);
        source = source[featureValue];

        //If this is Primary, then update stCh with these featureKeys and featureValues.
        // /.*Primary/.test(a)

        if (/.*Primary/.test(postHocAgreeWithKey)) {
          lfUtils.updateStChByInflections(
            { structureChunk, drillPath: drillPathForPHD },
            currentLanguage
          );
        }
      });
    });

    let sourceArr = [];
    let resArr = [];

    if (Array.isArray(source)) {
      sourceArr = source;
    } else if (typeof source === "string") {
      sourceArr.push(source);
    } else {
      gpUtils.throw(
        "#ERR ---------------> Expected this PHD value to be the end of a chain and thus a string or array."
      );
    }

    sourceArr.forEach((selectedWord) => {
      resArr.push({
        errorInDrilling: false,
        selectedWordArray: [selectedWord],
        drillPath: null,
      });
    });

    //Okay, so, at this point, finishing the PHD section, structureChunk is like this.

    //I want to, within this section, decant the gender feature (well, all features) into arr of ONE.

    //Now let's think - from which PHDheadchunks should we take each feature?
    //In this ecxact sitation, Gender should be taken from PHDawPrimary

    // {
    //   chunkId: 'pro-2',
    //   wordtype: 'pronoun',
    //   form: [ 'determiner' ],
    //   specificLemmas: [ 'POSSESSIVE' ],
    //   postHocAgreeWithPrimary: 'pro-1',
    //   postHocAgreeWithSecondary: 'nou-1',
    //   gcase: [ 'nom' ],
    //   gender: [
    //     'm1', 'm2', 'm3',        'f','n',         'virile', 'nonvirile', 'f',...etc
    //   ]
    // }

    console.log(
      "[1;35m " +
        "s19 At the END lf:filterWithin PHD section, structureChunk is:" +
        "[0m",
      structureChunk
    );
    console.log("[1;35m " + "and resArr is" + "[0m", resArr);

    return resArr;
  }

  let inflectionChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  let requirementArrs = [];

  inflectionChain.forEach((key) => {
    let inflectionValueArr = [];

    if (structureChunk[key]) {
      structureChunk[key].forEach((inflectionValue) => {
        let formattedFeatureValueArr = langUtils.formatFeatureValue(
          key,
          inflectionValue
        );

        console.log(
          "filterWithinSelectedLemmaObject: formattedFeatureValueArr",
          formattedFeatureValueArr
        );

        inflectionValueArr = [
          ...inflectionValueArr,
          ...formattedFeatureValueArr,
        ];
      });
    }

    requirementArrs.push([key, inflectionValueArr]);
  });

  let errorInDrilling = false;
  let outputUnitsWithDrillPaths = [];

  let source = lemmaObject.inflections;

  lfUtils.traverseAndRecordInflections(
    source,
    requirementArrs,
    outputUnitsWithDrillPaths
  );

  // gpUtils.consoleLogObjectAtTwoLevels(outputUnitsWithDrillPaths);
  // console.log(outputUnitsWithDrillPaths);
  // gpUtils.throw("Cease.");

  if (!outputUnitsWithDrillPaths || !outputUnitsWithDrillPaths.length) {
    console.log(
      "[1;31m " +
        "#ERR --------------------------------------> traverseAndRecordInflections returned FALSY for " +
        structureChunk.chunkId +
        " in " +
        currentLanguage +
        "[0m"
    );

    console.log({ outputUnitsWithDrillPaths });
    errorInDrilling = true;
    return false;
  }

  outputUnitsWithDrillPaths.forEach((selectedPath) => {
    selectedPath.errorInDrilling = errorInDrilling;
  });

  return outputUnitsWithDrillPaths;
};

exports.updateStructureChunkByAdhocOnly = (structureChunk, label, value) => {
  structureChunk[label] = [value];
};

exports.updateStructureChunk = (outputUnit, currentLanguage) => {
  let shouldConsoleLog = false;

  if (shouldConsoleLog) {
    console.log(
      "[1;33m " +
        `updateStructureChunk ${outputUnit.structureChunk.chunkId} ${outputUnit.selectedWord} ---------------------------` +
        "[0m"
    );

    console.log(
      "BEFORE UB-Inf and UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );
  }

  lfUtils.updateStChByInflections(outputUnit, currentLanguage);

  if (shouldConsoleLog) {
    console.log(
      "AFTER UB-Inf but BEFORE UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );
  }

  lfUtils.updateStChByAndTagsAndSelectors(outputUnit, currentLanguage);

  if (shouldConsoleLog) {
    console.log(
      "AFTER UB-Inf and UB-Tag-Sel, structureChunk is:",
      outputUnit.structureChunk
    );

    console.log(
      "[1;33m " + `/updateStructureChunk ${outputUnit.structureChunk.chunkId}` + "[0m"
    );
    console.log(" ");
  }
};

exports.updateStChByAndTagsAndSelectors = (outputUnit, currentLanguage) => {
  let {
    selectedLemmaObject,
    structureChunk,
    selectedWord,
    drillPath,
  } = outputUnit;

  console.log("[1;35m " + `updateStChByAndTagsAndSelectors--------------------` + "[0m");
  console.log("r10 structureChunk starts as", structureChunk);
  console.log("drillPath", drillPath);

  let doneSelectors = [];

  let lemmaObjectIsMGN = /_/.test(selectedLemmaObject.gender);

  //STEP ZERO: Decisive Decant
  //Remove gender values on stCh if drillPath doesn't include gender (ie is infinitive or a participle, say).
  //But if lObj is MGN, don't do this.
  if (
    !lemmaObjectIsMGN &&
    drillPath &&
    !drillPath.map((arr) => arr[0]).includes("gender")
  ) {
    structureChunk.gender = [];
  }

  //STEP ONE: Update stCh gender with that of lObj.
  if (selectedLemmaObject.gender) {
    if (lemmaObjectIsMGN) {
      //If lObj does have metagender, set stCh gender to converted values or filter stCh's gender by them.

      console.log(
        `v23 Clause S: lObj ${selectedLemmaObject.lemma} has metaSelector gender`
      );
      console.log(structureChunk);
      console.log("[1;33m " + `v23-S start ${structureChunk.gender}` + "[0m");

      let metaGender = selectedLemmaObject.gender.split("_")[0];

      let metaGenderConverted =
        refObj.metaFeatures[currentLanguage].gender[metaGender];

      if (structureChunk.gender && structureChunk.gender.length) {
        structureChunk.gender = structureChunk.gender.filter((genderValue) =>
          metaGenderConverted.includes(genderValue)
        );
      } else {
        structureChunk.gender = metaGenderConverted.slice(0);
      }
      doneSelectors.push("gender");
      console.log("[1;33m " + `v23-S end ${structureChunk.gender}` + "[0m");
    } else {
      //If lObj has non-meta-gender, then update stCh with lObj gender.

      console.log("v23 Clause R: lObj does not have metaSelector gender");
      structureChunk.gender = [selectedLemmaObject.gender];
      doneSelectors.push("gender");
    }
  }

  //STEP TWO: Update the stCh's andTags with the lObj's tags.
  if (structureChunk.andTags && structureChunk.andTags.length) {
    structureChunk.andTags = structureChunk.andTags.filter((andTag) =>
      selectedLemmaObject.tags.includes(andTag)
    );
  } else {
    console.log(
      "[1;31m " +
        `Just to note that this stCh has no andTags, and I am adding them from lObj. Perhaps I should no nothing here instead: ${currentLanguage} ${structureChunk.chunkId}` +
        "[0m"
    );

    structureChunk.andTags = selectedLemmaObject.tags.slice(0);
  }

  //STEP THREE: For all remaining selectors, update the stCh with values from lObj.
  let selectors =
    refObj.lemmaObjectFeatures[currentLanguage].selectors[
      structureChunk.wordtype
    ];

  console.log({ doneSelectors });

  if (selectors) {
    selectors
      .filter((selector) => !doneSelectors.includes(selector))
      .forEach((selector) => {
        if (/_/.test(selectedLemmaObject[selector])) {
          gpUtils.throw(
            `I wasn't expecting a metaFeature selector here. It shoyuld have been processed already, in step one, and then added to doneSelectors, which would have prevented it being used here. selectedLemmaObject[selector]:${selectedLemmaObject[selector]}`
          );
        }

        structureChunk[selector] = [selectedLemmaObject[selector]];
      });
  } else {
    console.log(
      "[1;31m " +
        `Just to note that refObj gave no selectors for currentLanguage ${currentLanguage} and structureChunk.wordtype ${structureChunk.wordtype}` +
        "[0m"
    );
  }

  console.log("r12 structureChunk ends as", structureChunk);
  console.log("[1;35m " + `/updateStChByAndTagsAndSelectors` + "[0m");
};

exports.updateStChByInflections = (outputUnit, currentLanguage) => {
  console.log(
    "[1;30m " +
      `f44 updateStChByInflections ${
        outputUnit.drillPath ? outputUnit.drillPath.toString() : "no drillPath"
      }` +
      "[0m"
  );

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

exports.filterOutLackingLemmaObjects = (
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

exports.filterByKey = (
  lemmaObjectArr,
  requirementArrs,
  key,
  currentLanguage
) => {
  let requirementArr = requirementArrs[key] || [];
  let metaFeatureRef = refObj.metaFeatures[currentLanguage][key];

  console.log(
    "[1;35m " + `lf.filterByKey-------------------------- for key ${key}` + "[0m"
  );
  console.log("requirementArr starts as", requirementArr);

  if (requirementArr) {
    if (metaFeatureRef) {
      requirementArr.forEach((featureValue) => {
        //If the reqArr has a metafeature, all lObj with converted feature to pass filter.
        if (/_/.test(featureValue)) {
          let metaFeatureConverted = metaFeatureRef[featureValue];

          if (!metaFeatureConverted) {
            gpUtils.throw("#ERR filterByKey need converted metafeature.");
          }

          requirementArr = [...requirementArr, ...metaFeatureConverted];
        }
        console.log("requirementArr halfway through is", requirementArr);
        //But also need do the inverse of this. If reqArr has 'f', then allow lObj to pass filter if lObj gender is 'allSingularGenders' eg.
        Object.keys(metaFeatureRef).forEach((metaFeature) => {
          let convertedMetaFeatureArr = metaFeatureRef[metaFeature];

          if (convertedMetaFeatureArr.includes(featureValue)) {
            requirementArr.push(metaFeature);
          }
        });
      });
    } else {
      console.log(
        "[1;31m " +
          `lf.filterByKey saw there was no metaFeatureRef for currentLanguage ${currentLanguage} and key ${key}` +
          "[0m"
      );
    }
  }

  console.log("requirementArr ends as", requirementArr);

  //And finally, do said filter.
  if (requirementArr.length) {
    return lemmaObjectArr.filter(
      (lObj) =>
        requirementArr.includes(lObj[key]) ||
        requirementArr.includes(lObj[key].split("_")[0])
    );
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
      matches = lfUtils.filterByKey(
        matches,
        structureChunk,
        selector,
        currentLanguage
      );
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
  // console.log(
  //   "f22 traverseAndRecordInflections-----------------------------------------------"
  // );
  // console.log("source", source);
  // console.log("reqArr", reqArr);
  // console.log("outputUnitsWithDrillPaths", outputUnitsWithDrillPaths);
  // console.log("outputUnitsWithDrillPathsMini", outputUnitsWithDrillPathsMini);
  /////////////////////////////
  let shouldConsoleLog = false;
  /////////////////////////////

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
      Array.isArray(source[chosenInflector]) ||
      (source[chosenInflector] && source[chosenInflector].isTerminus)
    ) {
      if (shouldConsoleLog) {
        console.log("traverseAndRecordInflections Clause B", {
          reqInflectorLabel,
          chosenInflector,
        });
      }

      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      outputUnitsWithDrillPaths.push({
        selectedWordArray: Array.isArray(source[chosenInflector])
          ? source[chosenInflector]
          : [source[chosenInflector]],
        drillPath: outputUnitsWithDrillPathsMini.slice(0),
      });

      outputUnitsWithDrillPathsMini.pop();

      return source[chosenInflector];
    } else if (
      gpUtils.isKeyValueTypeObject(source[chosenInflector]) &&
      !source[chosenInflector].isTerminus
    ) {
      if (shouldConsoleLog) {
        console.log("traverseAndRecordInflections Clause A", {
          reqInflectorLabel,
          chosenInflector,
        });
      }

      outputUnitsWithDrillPathsMini.push([reqInflectorLabel, chosenInflector]);

      lfUtils.traverseAndRecordInflections(
        source[chosenInflector],
        reqArr.slice(1),
        outputUnitsWithDrillPaths,
        outputUnitsWithDrillPathsMini
      );

      outputUnitsWithDrillPathsMini.pop();
    } else {
      if (shouldConsoleLog) {
        console.log("traverseAndRecordInflections Clause X", {
          reqInflectorLabel,
          chosenInflector,
        });
      }
    }
  });
};
