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

exports.filterByKey = (lemmaObjectArr, requirementsArr, key) => {
  if (requirementsArr.length) {
    return lemmaObjectArr.filter((lObj) => requirementsArr.includes(lObj[key]));
  } else {
    return lemmaObjectArr;
  }
};

exports.filterWithinObjectByNestedKeys = (
  source,
  formulaChunk,
  inflectionChainRefObj
) => {
  // console.log({ source, formulaChunk, inflectionChainRefObj });

  let inflectionChain = inflectionChainRefObj[formulaChunk.wordtype];
  let requirementArrs = inflectionChain.map((key) => formulaChunk[key]);
  let errorInDrilling = false;

  // console.log({ requirementArrs });

  //Look for if anything has an agreementId, if so, select that one FIRST.
  //THen the ones that are dependent on it, can get their reqs filled from that.
  //So currently, requirementArrs for an adjective lObj is [undef, undef, undef],
  //because the formulaChunk for the adjective doesn't specify a number, gender, or case.
  //We need to get the number, gender, and case from the head noun once it's selected,
  //then put those deets onto the formulaChunk for the adjective.
  //Hmm... have the formulaChunk indeed been copied without ref? Yes, now it has, for this fxn.

  requirementArrs.forEach((requirementArr) => {
    source = drillDownOneLevel(source, requirementArr);
    if (!source) {
      errorInDrilling = true;
      return false;
    }
  });

  if (errorInDrilling) {
    return null;
  } else {
    if (typeof source === "string") {
      return source;
    } else {
      return exports.selectRandom(source);
    }
  }

  function drillDownOneLevel(source, requirementArr) {
    let sourceKeys = Object.keys(source);
    let validKeys = [];

    if (requirementArr.length) {
      validKeys = sourceKeys.filter((key) => requirementArr.includes(key));
    } else {
      validKeys = sourceKeys;
    }

    if (validKeys.length) {
      return source[exports.selectRandom(validKeys)];
    } else {
      console.log(
        "filterWithinObjectByNestedKeys fxn says Error in utils. No valid keys at some level of lemma object."
      );
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
