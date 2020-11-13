exports.selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const { selectRandom } = exports;

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

exports.filterByKey = (sourceArr, specArr, key) => {
  if (specArr.length) {
    return sourceArr.filter((item) => specArr.includes(item[key]));
  } else {
    return sourceArr;
  }
};

exports.filterWithinObjectByNestedKeys = (source, specObj, inflectionChain) => {
  let requirementArrs = inflectionChain.map((key) => specObj[key]);
  let errorInDrilling = false;

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
      return selectRandom(source);
    }
  }

  function drillDownOneLevel(source, requirementArr) {
    // console.log(">source", source);
    let sourceKeys = Object.keys(source);
    let validKeys = [];

    // console.log({ sourceKeys, validKeys });

    if (requirementArr.length) {
      validKeys = sourceKeys.filter((key) => requirementArr.includes(key));
    } else {
      validKeys = sourceKeys;
    }

    if (validKeys.length) {
      return source[selectRandom(validKeys)];
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
  inflectionChain
) => {
  //I'm giving you an array of lemmaObjects.
  //I want you to check the requirementArrays, and remove any lemmaObjects that don't have at least one successful chain.

  //For example, if requirementArrays go ["singular"] then ["nom"]
  //then please remove any lObjs that have no singular, or that have no nom in singular.

  //For another example, if reqArrs go [] then ["nom"]
  //then please remove any lObjs that have no nom in either singular or plural.

  //All lObjs that are missing sth are marked as defective.

  //eg requirementArrs
  // [[], []]                                 Majtki should be available.''
  // Note, I want to populate the above, given empty, meaning accepts all, with all keys from lObj at that levels.

  // [[], ["nom", "acc"]]                     Majtki should be available.
  // [["singular"], []]                       Majtki should be REMOVED.
  // [["singular", "plural"], []]             Majtki should be available.

  //Make list of all inflection paths in lObj.
  //Make list of all inflections paths from requirementArrs.
  //Check if any coincide. If none, return false and remove this lObj from sourceArr.

  // return sourceArr;
  let requirementArrs = inflectionChain.map((key) => specObj[key]);
  let inflectionPathsInRequirements = [];

  return sourceArr.filter((lObj) => {
    if (!lObj.defective) {
      return true;
    } else {
      let inflectionPathsInSource = exports.giveNestedRoutes(lObj)
        .routesByNesting;

      return inflectionPathsInRequirements.some((inflectionPath) =>
        inflectionPathsInSource.includes(inflectionPath)
      );
    }
  });

  // return sourceArr.filter((lObj) => {
  //   if (!lObj.defective) {
  //     return true;
  //   } else {
  //     requirementArrs.forEach((requirementArr) => {
  //       // if (){}
  //     });
  //   }
  // });

  // function drillDownOneLevel(sourceObj, requirementArr) {
  //   let sourceKeys = Object.keys(source);
  //   let validKeys = [];

  //   if (requirementArr.length) {
  //     validKeys = sourceKeys.filter((key) => requirementArr.includes(key));
  //   } else {
  //     validKeys = sourceKeys;
  //   }

  //   if (validKeys.length) {
  //     return source[selectRandom(validKeys)];
  //   } else {
  //     console.log(
  //       "filterOutDefectiveInflections fxn says Error in utils. No valid keys at some level of lemma object."
  //     );
  //     return null;
  //   }
  // }
};

exports.sentenceStringFromArray = (arr) => {
  return exports.capitaliseFirst(arr.join(" ") + ".");
};

exports.giveNestedRoutes = (source) => {
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
