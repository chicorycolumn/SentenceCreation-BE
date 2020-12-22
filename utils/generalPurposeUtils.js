const lfUtils = require("./lemmaFilteringUtils.js");
const otUtils = require("./objectTraversingUtils.js");

exports.selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.capitaliseFirst = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

exports.areTwoFlatArraysEqual = (arr1, arr2) => {
  return arr1.every((item, index) => arr2[index] === item);
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

exports.isKeyValueTypeObject = (item) => {
  return typeof item === "object" && item !== null && !Array.isArray(item);
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.copyAndCombineWordbanks = (wordbank1, wordbank2) => {
  let wordbank1Copy = exports.copyWithoutReference(wordbank1);
  let wordbank2Copy = exports.copyWithoutReference(wordbank2);

  Object.keys(wordbank1Copy).forEach((key) => {
    wordbank1Copy[key] = [...wordbank1Copy[key], ...wordbank2Copy[key]];
  });

  return wordbank1Copy;
};

exports.findKeysInObjectAndExecuteCallback = (obj, soughtKey, callback) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (key === soughtKey) {
        callback(obj);
      } else {
        exports.findKeysInObjectAndExecuteCallback(
          obj[key],
          soughtKey,
          callback
        );
      }
    });
  }
};

exports.copyWithoutReference = (source) => {
  if (typeof source !== "object" || source === null) {
    return source;
  }
  if (Array.isArray(source)) {
    return recursivelyCopyObject(source, []);
  } else {
    return recursivelyCopyObject(source, {});
  }

  function recursivelyCopyObject(input, targ) {
    Object.keys(input).forEach((key) => {
      let item = input[key];

      if (typeof item !== "object" || item === null) {
        targ[key] = item;
        return;
      } else if (Array.isArray(item)) {
        targ[key] = [];
        recursivelyCopyObject(item, targ[key]);
        return;
      } else {
        targ[key] = {};
        recursivelyCopyObject(item, targ[key]);
        return;
      }
    });
    return targ;
  }
};

exports.copyValueOfKey = (
  navigatedObject,
  sourceKey,
  targetKeyArr,
  shouldDeleteSourceKey
) => {
  targetKeyArr.forEach((targetKey) => {
    navigatedObject[targetKey] = exports.copyWithoutReference(
      navigatedObject[sourceKey]
    );
  });

  if (shouldDeleteSourceKey) {
    delete navigatedObject[sourceKey];
  }
};

exports.arrayExploder = (superArray) => {
  if (!superArray) {
    return [];
  }

  superArray = superArray.filter((array) => array.length);

  if (!superArray.length) {
    return [];
  }

  if (superArray.length === 1) {
    return superArray[0].map((item) => [item]);
  }

  let result = [];

  arrayExploderRecursion(superArray, result, []);

  return result;

  function arrayExploderRecursion(src, res, miniRes) {
    let arr = src[0];

    arr.forEach((item, itemIndex) => {
      miniRes.push(item);

      if (src.length > 1) {
        arrayExploderRecursion(src.slice(1), res, miniRes);
      } else {
        res.push(miniRes.slice(0));
        miniRes.pop();
      }
    });
    miniRes.pop();
  }
};

exports.explodeOutputArraysByHeadsAndDependents = (justOneOutputArray) => {
  justOneOutputArray.forEach((unit, unitIndex) => {
    if (
      unit.possibleDependentOutputArrays &&
      unit.possibleDependentOutputArrays.length
    ) {
      unit.explodedDependentOutputArrays = exports.arrayExploder(
        unit.possibleDependentOutputArrays
      );
      delete unit.possibleDependentOutputArrays;
    }
  });

  let grandArrOfAllHeadUnits = [];

  justOneOutputArray.forEach((headUnit, headUnitIndex) => {
    let headArr = [[headUnit]];
    let depArr = headUnit.explodedDependentOutputArrays;

    let headsExplodedByDeps = exports.arrayExploder([headArr, depArr]);
    delete headUnit.explodedDependentOutputArrays;

    grandArrOfAllHeadUnits.push(headsExplodedByDeps);
  });

  let explodedGrandArray = exports.arrayExploder(grandArrOfAllHeadUnits);

  explodedGrandArray = explodedGrandArray.map((superArr) => {
    let flattenedArray = [];

    superArr.forEach((arr) => {
      arr.forEach((subArr) => {
        subArr.forEach((item) => {
          flattenedArray.push(item);
        });
      });
    });

    return flattenedArray;
  });

  return explodedGrandArray;
};

exports.combineAndExplodeTwoSuperArrays = (superArr1, superArr2) => {
  let grandResult = [];

  if (!superArr1.length) {
    return superArr2;
  }

  if (!superArr2.length) {
    return superArr1;
  }

  superArr1.forEach((arr1) => {
    superArr2.forEach((arr2) => {
      let result = [...arr1, ...arr2];
      grandResult.push(result);
    });
  });

  return grandResult;
};

exports.fillOutWashburneRefObj = (
  refObj,
  sourceKey,
  targetKey,
  subSourceKey,
  subTargetKey
) => {
  // //This is one half of what a Washburne reference object looks like.
  // //You only need to type one half of it (here that's POL->ENG).

  // let egWashburneRefObj = {
  //   stuff: {
  //     "POL->ENG": [
  //       { POL: "Apple.", ENG: ["Red.", "Fruit."] },
  //       { POL: "Lemon.", ENG: ["Yellow.", "Fruit."] },
  //       { POL: "Postbox.", ENG: ["Red.", "Metal."] },
  //       { POL: "Goldmedal.", ENG: ["Yellow.", "Metal."] },
  //     ],
  //   },
  // };

  // //This fxn fills out the counterpart ENG->POL.

  // fillOutWashburneRefObj(
  //   egWashburneRefObj,
  //   "POL->ENG",
  //   "ENG->POL",
  //   "POL",
  //   "ENG"
  // );

  // //The result is this:

  // egWashburneRefObj = {
  //   stuff: {
  //     "POL->ENG": [
  //       { POL: "Apple.", ENG: ["Red.", "Fruit."] },
  //       { POL: "Lemon.", ENG: ["Yellow.", "Fruit."] },
  //       { POL: "Postbox.", ENG: ["Red.", "Metal."] },
  //       { POL: "Goldmedal.", ENG: ["Yellow.", "Metal."] },
  //     ],
  //     "ENG->POL": [
  //       { ENG: "Red.", POL: ["Apple.", "Postbox."] },
  //       { ENG: "Fruit.", POL: ["Apple.", "Lemon."] },
  //       { ENG: "Yellow.", POL: ["Lemon.", "Goldmedal."] },
  //       { ENG: "Metal.", POL: ["Postbox.", "Goldmedal."] },
  //     ],
  //   },
  // };

  let allLemmas = Object.keys(refObj);
  console.log(
    "Will fill out the counterpart in this Washburne reference object, for these words:",
    allLemmas
  );

  allLemmas.forEach((lemma) => {
    let lemmaRefObj = refObj[lemma];

    lemmaRefObj[targetKey] = [];

    lemmaRefObj[sourceKey].forEach((subObj) => {
      subObj[subTargetKey].forEach((targetValue) => {
        let existingSubObj = lemmaRefObj[targetKey].find((subObj2) => {
          return subObj2[subTargetKey] === targetValue;
        });
        if (existingSubObj) {
          existingSubObj[subSourceKey].push(subObj[subSourceKey]);
        } else {
          let newSubObj = {};
          newSubObj[subTargetKey] = targetValue;
          newSubObj[subSourceKey] = [subObj[subSourceKey]];
          lemmaRefObj[targetKey].push(newSubObj);
        }
      });
    });
  });
};

exports.consoleLogObjectAtOneLevel = (obj) => {
  Object.keys(consoleLogObjectAtOneLevel).forEach((key) => {
    let value = obj[key];
    console.log("~~~~~~~~~~~>KEY");
    console.log(key);
    console.log("~~~~~~~~~~~>VALUE");
    console.log(value);
  });
};

exports.consoleLogObjectAtTwoLevels = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.keys(value).forEach((key2) => {
      let value2 = value[key2];
      console.log("~~~~~~~~~~~>KEY");
      console.log(key2);
      console.log("~~~~~~~~~~~>VALUE");
      console.log(value2);
    });
  });
};
