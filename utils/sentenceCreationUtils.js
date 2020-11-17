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
        selectedWord: exports.selectRandom(source),
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
  let selectedWords = arr.map((obj) => obj.selectedWord);
  let selectedLemmaObjs = arr.map(
    (obj) => Object.keys(obj.selectedLemmaObj).length
  );

  if (selectedLemmaObjs.some((lObj) => lObj && lObj.agreeWith)) {
    //I see there are agreement notes to work through. But these are done now.
  } else {
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
