exports.selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.capitaliseFirst = (string) => {
  return string[0].toUpperCase() + string.slice(1);
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

exports.giveSetKey = (word) => {
  return word + "Set";
};

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

  //Move the finally chosen values all copied into the formulaChunk.
  // YES! Alphaman say do this! Edit the formulaChunk so that instead of having requirements for manTags, optTags, number, gender, case,
  // it instead has the specific features that the selected word has.
  // Alphaman say I've hooked it all up in this file and also palette.model now, so that the modified formula chunk gets
  // returned into resultArr. So all you need to do here - right now - is to make sure that all features of the finally
  // selected word get put onto formulaChunk. Don't worry, formulaChunk is already a copy without reference.
  // You can see that this task was started a while ago, just below.

  // RESOLVED Note from Alphaman: This doesn't work, because lemmaObject only has "tags", not "manTags" or "optTags",
  // and I wouldn't want to put all the tags from lobj as replacing formchunk mantags and opttags,
  // because I would only want the tags that they share.
  // Oh! Right. Okay. Just replace it with the tags that they share.
  formulaChunk.manTags = formulaChunk.manTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });
  formulaChunk.optTags = formulaChunk.optTags.filter((tag) => {
    lemmaObject.tags.includes(tag);
  });
  formulaChunk["gender"] = [lemmaObject["gender"]];
  // WRONG formulaChunk.manTags = [...lemmaObject.manTags];
  // WRONG formulaChunk.optTags = [...lemmaObject.optTags];

  let inflectionChain = inflectionChainRefObj[formulaChunk.wordtype];

  // let requirementArrs = inflectionChain.map((key) => formulaChunk[key]);
  let requirementArrs = [];
  inflectionChain.forEach((key) => {
    requirementArrs.push([key, formulaChunk[key]]);
  });

  let errorInDrilling = false;

  // console.log({ requirementArrs });

  //Look for if anything has an agreementId, if so, select that one FIRST.
  //THen the ones that are dependent on it, can get their reqs filled from that.
  //So currently, requirementArrs for an adjective lObj is [undef, undef, undef],
  //because the formulaChunk for the adjective doesn't specify a number, gender, or case.
  //We need to get the number, gender, and case from the head noun once it's selected,
  //then put those deets onto the formulaChunk for the adjective.
  //Hmm... have the formulaChunk indeed been copied without ref? Yes, now it has, for this fxn.

  // let recordOfSelectedRequirements = [];
  // recordOfSelectedRequirements.push(["gender", lemmaObject["gender"]]);

  requirementArrs.forEach((requirementKeyedArr) => {
    source = drillDownOneLevel(source, requirementKeyedArr);
    if (!source) {
      errorInDrilling = true;
      return false;
    }
  });

  // console.log({ recordOfSelectedRequirements });
  //Okay great, now if the current chunk is a head word, we need to output these selected reqs, to be used by dependent chunks.

  if (errorInDrilling) {
    return null;
  } else {
    if (typeof source === "string") {
      //Return finally selected word.
      return {
        selectedWord: source,
        // recordOfSelectedRequirements,
        modifiedFormulaChunk: formulaChunk,
      };
    } else {
      //End of inflection chain is array, so take a finally selected word at random from it.
      return {
        selectedWord: exports.selectRandom(source),
        // recordOfSelectedRequirements,
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
      let selectedFeature = exports.selectRandom(validFeatures);
      // console.log({ validFeatures });
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", [featureKey, selectedFeature]);
      formulaChunk[featureKey] = [selectedFeature];
      // recordOfSelectedRequirements.push([featureKey, feature]);
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
      let { routesByNesting, routesByLevel } = exports.extractNestedRoutes(
        lObj.inflections
      );

      let inflectionPathsInSource = routesByNesting;

      let inflectionPathsInRequirements = exports.concoctNestedRoutes(
        requirementArrs,
        routesByLevel
      );

      return inflectionPathsInRequirements.some((inflectionPathReq) =>
        inflectionPathsInSource.some((inflectionPathSou) => {
          return exports.areTwoFlatArraysEqual(
            inflectionPathReq,
            inflectionPathSou
          );
        })
      );
    }
  });
};

exports.areTwoFlatArraysEqual = (arr1, arr2) => {
  return arr1.every((item, index) => arr2[index] === item);
};

exports.concoctNestedRoutes = (routesByLevelTarget, routesByLevelSource) => {
  routesByLevelTarget.forEach((arr, index) => {
    if (!arr.length) {
      if (routesByLevelSource[index] && routesByLevelSource[index].length) {
        routesByLevelTarget[index] = routesByLevelSource[index];
      } else {
        throw "Error. The variable routesByLevelTarget contains one or more empty arrays, which means this function cannot work.";
      }
    }
  });

  let res = [];
  let arr = [];

  recursivelyBuildArrays(routesByLevelTarget, arr);
  return res;

  function recursivelyBuildArrays(source, arr) {
    if (source.length === 1) {
      let item = source[0];
      item.forEach((subitem) => {
        arr.push(subitem);
        res.push(arr.slice(0));
        arr.pop();
      });
      return;
    }

    let item = source[0];
    item.forEach((subitem) => {
      arr.push(subitem);
      recursivelyBuildArrays(source.slice(1), arr);
      arr.pop();
    });
  }
};

exports.buildSentenceFromArray = (arr) => {
  // console.log(arr);

  let selectedWords = arr.map((obj) => obj.selectedWord);
  let selectedLemmaObjs = arr.map(
    (obj) => Object.keys(obj.selectedLemmaObj).length
  );

  if (selectedLemmaObjs.some((lObj) => lObj && lObj.agreeWith)) {
    // console.log(arr);
    //I see there are agreement notes to work through.
    //Please add any agreement info from sentenceFormula chunks to the relevant lemmaObjs.
    //You will find all necessary information inside arr, in the right order.
  } else {
    //There are no agreement notes to work through.
    let producedSentence = exports.capitaliseFirst(
      selectedWords.join(" ") + "."
    );
    return producedSentence;
  }
};

exports.extractNestedRoutes = (source) => {
  let routesByNesting = [];
  let arr = [];
  recursivelyMapRoutes(arr, source);

  let routesByLevel = [];

  routesByNesting.forEach((routeArr) => {
    routeArr.forEach((item, index) => {
      if (!routesByLevel[index]) {
        routesByLevel[index] = [item];
      } else {
        if (!routesByLevel[index].includes(item)) {
          routesByLevel[index].push(item);
        }
      }
    });
  });

  return { routesByNesting, routesByLevel };

  function recursivelyMapRoutes(arr, source) {
    if (typeof source !== "object" || Array.isArray(source)) {
      let arrCopy = arr.slice();
      arr.pop();
      return arrCopy;
    } else {
      Object.keys(source).forEach((key) => {
        arr.push(key);

        let result = recursivelyMapRoutes(arr, source[key]);

        if (result) {
          routesByNesting.push(result);
        }
      });
      arr.pop();
    }
  }
};

exports.findObjectInNestedObject = (source, identifyingData) => {
  let res = null;
  recursivelySearch(source, identifyingData);
  return res;

  function recursivelySearch(source, identifyingData) {
    if (res) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (exports.isObject(value)) {
        if (exports.doKeyValuesMatch(value, identifyingData)) {
          res = value;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};

exports.doTwoFlatArraysMatchAllValues = (arr1, arr2) => {
  return (
    arr1.every((item) => arr2.includes(item)) &&
    arr2.every((item) => arr1.includes(item)) &&
    arr1.length === arr2.length
  );
};

exports.doKeyValuesMatch = (object, keyValues) => {
  return Object.keys(keyValues).every((key) => {
    if (
      typeof keyValues[key] === "number" ||
      typeof keyValues[key] === "string"
    ) {
      return object[key] === keyValues[key];
    } else if (Array.isArray(keyValues[key]) && Array.isArray(object[key])) {
      return exports.doTwoFlatArraysMatchAllValues(object[key], keyValues[key]);
    }
  });
};

exports.isObject = (item) => {
  return typeof item === "object" && !Array.isArray(item);
};
