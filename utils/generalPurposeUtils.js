const lfUtils = require("./lemmaFilteringUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.selectRandom = (array) => {
  // console.log("eveb selectRandom from", array);
  return array[Math.floor(Math.random() * array.length)];
};

exports.keyShouldBeSpecified = (chunk, key, allowOverwrite) => {
  return (
    !chunk ||
    (!(chunk.importantFeatures && chunk.importantFeatures.includes(key)) &&
      (allowOverwrite ||
        !gpUtils.isKeyFilledOutOnChunk(chunk, key) ||
        gpUtils.feautureValueIsMeta(chunk, key)))
  );
};

exports.feautureValueIsMeta = (chunk, key, value) => {
  if (!value) {
    value = chunk[key];
  }

  if (Array.isArray(value) && value.length === 1) {
    value = value[0];
  }

  return value.slice(0, 3) === "all";
};

exports.capitaliseFirst = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

exports.areTwoFlatArraysEqualAndInSameOrder = (arr1, arr2) => {
  return arr1.every((item, index) => arr2[index] === item);
};

exports.areTwoFlatArraysEqual = (arr1, arr2) => {
  return (
    arr1.length === arr2.length && arr1.every((item) => arr2.includes(item))
  );
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
      return gpUtils.doTwoFlatArraysMatchAllValues(object[key], keyValues[key]);
    }
  });
};

exports.isKeyValueTypeObject = (item) => {
  return typeof item === "object" && item !== null && !Array.isArray(item);
};

exports.isKeyValueTypeObjectOrArray = (item) => {
  return typeof item === "object" && item !== null;
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.copyAndCombineWordbanks = (wordbank1, wordbank2) => {
  let wordbank1Copy = gpUtils.copyWithoutReference(wordbank1);
  let wordbank2Copy = gpUtils.copyWithoutReference(wordbank2);

  Object.keys(wordbank1Copy).forEach((key) => {
    console.log("[1;35m " + `vaoi gp:copyAndCombineWordbanks key: ${key}` + "[0m");

    if (!wordbank2Copy[key]) {
      console.log(
        "[1;31m " +
          `udhd gp:copyAndCombineWordbanks #NB: wordbank2 does not have key ${key} but wordbank1 does.` +
          "[0m"
      );
    }
    if (wordbank2Copy[key] && !Array.isArray(wordbank2Copy[key])) {
      gpUtils.throw(
        `cocq gp:copyAndCombineWordbanks #ERR: wordbank2 key ${key} holds non array value.`
      );
    }

    wordbank1Copy[key] = [...wordbank1Copy[key], ...(wordbank2Copy[key] || [])];
  });

  return wordbank1Copy;
};

exports.findKeysInObjectAndExecuteCallback = (obj, soughtKey, callback) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (key === soughtKey) {
        callback(obj);
      } else {
        gpUtils.findKeysInObjectAndExecuteCallback(
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
    navigatedObject[targetKey] = gpUtils.copyWithoutReference(
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
      unit.explodedDependentOutputArrays = gpUtils.arrayExploder(
        unit.possibleDependentOutputArrays
      );
      delete unit.possibleDependentOutputArrays;
    }
  });

  let grandArrOfAllHeadUnits = [];

  justOneOutputArray.forEach((headUnit, headUnitIndex) => {
    let headArr = [[headUnit]];
    let depArr = headUnit.explodedDependentOutputArrays;

    let headsExplodedByDeps = gpUtils.arrayExploder([headArr, depArr]);
    delete headUnit.explodedDependentOutputArrays;

    grandArrOfAllHeadUnits.push(headsExplodedByDeps);
  });

  let explodedGrandArray = gpUtils.arrayExploder(grandArrOfAllHeadUnits);

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

exports.consoleLogObjectAtOneLevel = (obj, label) => {
  console.log("[1;32m " + `--Console log object at one level, from ${label}:` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    console.log("[1;30m " + `${key}` + "[0m");
    console.log(value);
  });
  console.log("[1;32m " + `----------` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `--` + "[0m");
};

exports.consoleLogObjectAtTwoLevels = (obj, label) => {
  console.log("[1;32m " + `--Console log object at two levels, from ${label}:` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value) {
      Object.keys(value).forEach((key2) => {
        let value2 = value[key2];
        console.log("[1;30m " + `${key}:${key2}` + "[0m");
        console.log("subvalue:", value2);
      });
    } else {
      console.log("[1;30m " + `${key}` + "[0m");
      console.log("value:", value);
    }
  });
  console.log("[1;32m " + `----------` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `--` + "[0m");
};

exports.doesArrContainDifferentValues = (arr) => {
  if (!arr.length) {
    return false;
  }

  arr.sort((a, b) => a - b);

  return !(arr[0] === arr[arr.length - 1]);
};

exports.doesArrHaveOnlyTheseMembers = (arr1, arr2, disallowDuplicates) => {
  if (disallowDuplicates) {
    return arr1.length !== arr.length;
  } else {
    let differingValues = arr1.filter((value) => !arr2.includes(value));
    return !differingValues.length;
  }
};

exports.getWordtypeFromLemmaObject = (lObj) => {
  let wordtypeShorthand = lObj.id.split("-")[1];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    gpUtils.throw(
      `hshc #ERR -----------------> getWordtypeFromLemmaObject for requested ${wordtypeShorthand}`
    );
  }

  return wordtypeRef[wordtypeShorthand];
};

exports.getWordtypeFromStructureChunk = (stCh) => {
  let wordtypeShorthand = stCh.chunkId.split("-")[0];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    gpUtils.throw(
      `bsov #ERR -----------------> getWordtypeFromStructureChunk for requested ${wordtypeShorthand}`
    );
  }

  return wordtypeRef[wordtypeShorthand];
};

exports.getWordtypeOfAgreeWith = (
  structureChunk,
  agreeWithKey = "agreeWith"
) => {
  const wordtypeRef = {
    nou: "noun",
    ver: "verb",
    adj: "adjective",
    adv: "adverb",
    pro: "pronoun",
    art: "article",
  };

  let wordtypeShorthand = structureChunk[agreeWithKey].split("-")[0];

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    gpUtils.throw("xafb #ERR -----------------> getWordtypeFromLemmaObject");
  }

  return wordtypeRef[wordtypeShorthand];
};

exports.consoleLogAestheticBorder = (reps) => {
  let border =
    " │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║";

  for (let i = 0; i < reps; i++) {
    console.log(border.slice(i, border.length - (10 - i)));
  }
};

exports.isKeyFilledOutOnChunk = (chunk, featureKey) => {
  if (!chunk) {
    return false;
  }

  if (!chunk[featureKey]) {
    return false;
  }

  if (Array.isArray(chunk[featureKey]) && !chunk[featureKey].length) {
    return false;
  }

  if (chunk[featureKey]) {
    return true;
  }
};

exports.doesKeyContainValueOnChunk = (
  chunk,
  featureKey,
  featureValueArr,
  includeAll
) => {
  //includeAll true passes if EVERY value in featureValueArr is present.
  //includeAll false passes if ANY value from featureArr present.

  return (
    gpUtils.isKeyFilledOutOnChunk(chunk, featureKey) &&
    ((!includeAll &&
      featureValueArr.some((featureValue) =>
        chunk[featureKey].includes(featureValue)
      )) ||
      (includeAll &&
        chunk[featureKey].length === featureValueArr.length &&
        featureValueArr.every((featureValue) =>
          chunk[featureKey].includes(featureValue)
        )))
  );
};

exports.consoleLogPW = (label, structureChunk, multipleMode) => {
  if (multipleMode) {
    gpUtils.consoleLogYellow(`##${label} ${structureChunk.chunkId}`);
  } else {
    gpUtils.consoleLogBlue(`##${label} ${structureChunk.chunkId}`);
  }
};

exports.consoleLogYellow = (text) => {
  console.log(" ");
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(" ");
};

exports.consoleLogBlue = (text) => {
  console.log(" ");
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(" ");
};

exports.consoleLogPurple = (text) => {
  console.log(" ");
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(" ");
};

exports.throw = (msg = "Cease.") => {
  console.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  console.log("[1;31m " + "!   !   ! " + msg + "[0m");
  console.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  throw msg;
};

exports.isTerminusObject = (selectedWord) => {
  if (!selectedWord) {
    return false;
  }

  return gpUtils.isKeyValueTypeObject(selectedWord) && selectedWord.isTerminus;
};

exports.terminusObjectNormalArray = (normalArr) => {
  return { isTerminus: true, normal: normalArr };
};

exports.getWordsFromTerminusObject = (tObj, shouldGetAll) => {
  let allWords = [];

  let wordsKeys = shouldGetAll
    ? ["normal", "additionalFrequent", "additionalInfrequent"]
    : ["normal", "additionalFrequent"];

  wordsKeys.forEach((wordsKey) => {
    if (tObj[wordsKey]) {
      allWords = [...allWords, ...tObj[wordsKey]];
    }
  });

  return allWords;
};
