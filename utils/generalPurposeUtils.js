const lfUtils = require("./lemmaFilteringUtils.js");
const otUtils = require("./objectTraversingUtils.js");

exports.selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.selectRaandom = (array) => {
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

exports.isObject = (item) => {
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
  if (!superArray || !superArray.length) {
    return [];
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
  // console.log("GP:explodeHD was given this argument:", justOneOutputArray);

  // justOneOutputArray.forEach((unit) => {
  //   console.log(">>>", unit.possibleDependentOutputArrays);
  // });

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

  // console.log("***")
  // console.log("******")
  // console.log(explodedGrandArray)
  // console.log("******")
  // console.log("***")

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

  // console.log("*");
  // console.log("*");
  // console.log("*");
  // console.log(
  //   "explodedGrandArray",
  //   explodedGrandArray.map((x) => x.map((y) => y.selectedWord))
  // );
  // console.log("*");
  // console.log("*");
  // console.log("*");

  // return null;

  return explodedGrandArray;

  if (explodedGrandArray.length > 1) {
    throw "Strange behaviour encountered in GP:explodeOutputArraysByHeadsAndDependents";
  } else {
    return explodedGrandArray[0];
  }
};

exports.combineAndExplodeTwoSuperArrays = (superArr1, superArr2) => {
  // let a = [
  //   [ 'kobieta', 'ma', 'czerą' ],
  //   [ 'kobieta', 'ma', 'mooczerą' ],
  // ]

  // let b = [
  //   [ 'nie,', 'chyba' ],
  //   [ 'nie,', 'moochyba' ],
  // ]

  // result will be [
  //   [ 'kobieta', 'ma', 'czerą', 'nie,', 'chyba' ],
  //   [ 'kobieta', 'ma', 'czerą', 'nie,', 'moochyba' ],
  //   [ 'kobieta', 'ma', 'mooczerą', 'nie,', 'chyba' ],
  //   [ 'kobieta', 'ma', 'mooczerą', 'nie,', 'moochyba' ]
  // ]

  let grandResult = [];

  superArr1.forEach((arr1) => {
    superArr2.forEach((arr2) => {
      let result = [...arr1, ...arr2];
      grandResult.push(result);
    });
  });

  return grandResult;
};
