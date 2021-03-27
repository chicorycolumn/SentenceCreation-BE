const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const clUtils = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.keyShouldBeSpecified = (chunk, key, allowOverwrite) => {
  return (
    !chunk ||
    (!(chunk.importantFeatures && chunk.importantFeatures.includes(key)) &&
      (allowOverwrite ||
        !gpUtils.isKeyFilledOutOnChunk(chunk, key) ||
        gpUtils.featureValueIsMeta(chunk, key)))
  );
};

exports.featureValueIsMeta = (chunk, key, value) => {
  if (!value) {
    value = chunk[key];
  }

  if (Array.isArray(value) && value.length === 1) {
    value = value[0];
  }

  return value.slice(0, 3) === "all";
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.copyAndCombineWordbanks = (wordbank1, wordbank2) => {
  let wordbank1Copy = uUtils.copyWithoutReference(wordbank1);
  let wordbank2Copy = uUtils.copyWithoutReference(wordbank2);

  Object.keys(wordbank1Copy).forEach((key) => {
    if (!wordbank2Copy[key]) {
      console.log(
        "[1;31m " +
          `udhd gp:copyAndCombineWordbanks #NB: wordbank2 does not have key "${key}" but wordbank1 does.` +
          "[0m"
      );
    }
    if (wordbank2Copy[key] && !Array.isArray(wordbank2Copy[key])) {
      clUtils.throw(
        `#ERR cocq gp:copyAndCombineWordbanks. wordbank2 key "${key}" holds non array value.`
      );
    }

    wordbank1Copy[key] = [...wordbank1Copy[key], ...(wordbank2Copy[key] || [])];
  });

  return wordbank1Copy;
};

exports.explodeOutputArraysByHeadsAndDependents = (justOneOutputArray) => {
  console.log(
    "mdpu explodeOutputArraysByHeadsAndDependents START. justOneOutputArray"
  );
  // clUtils.consoleLogObjectAtTwoLevels(
  //   justOneOutputArray,
  //   "justOneOutputArray",
  //   "explodeOutputArraysByHeadsAndDependents"
  // );

  justOneOutputArray.forEach((unit, unitIndex) => {
    if (
      unit.possibleDependentOutputArrays &&
      unit.possibleDependentOutputArrays.length
    ) {
      unit.explodedDependentOutputArrays = uUtils.arrayExploder(
        unit.possibleDependentOutputArrays
      );
      delete unit.possibleDependentOutputArrays;
    }
  });

  let grandArrOfAllHeadUnits = [];

  justOneOutputArray.forEach((headUnit) => {
    let headArr = [[headUnit]];

    if (headUnit.explodedDependentOutputArrays) {
      let depArr = headUnit.explodedDependentOutputArrays;

      let headsExplodedByDeps = uUtils.arrayExploder([headArr, depArr]);
      delete headUnit.explodedDependentOutputArrays;

      grandArrOfAllHeadUnits.push(headsExplodedByDeps);
    } else {
      grandArrOfAllHeadUnits.push([headArr]);
    }
  });

  let explodedGrandArray = uUtils.arrayExploder(grandArrOfAllHeadUnits);

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

  // clUtils.consoleLogObjectAtTwoLevels(
  //   explodedGrandArray,
  //   "explodedGrandArray",
  //   "mdpy explodeOutputArraysByHeadsAndDependents END"
  // );

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

exports.getLanguageFromLemmaObject = (lObj) => {
  return lObj.id.split("-")[0].toUpperCase();
};

exports.getWordtypeFromLemmaObject = (lObj) => {
  let wordtypeShorthand = lObj.id.split("-")[1];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    clUtils.throw(
      `#ERR hshc getWordtypeFromLemmaObject. Called with lObj of lObj.id: "${lObj.id}"`
    );
  }

  return wordtypeRef[wordtypeShorthand];
};

exports.getWordtypeFromStructureChunk = (stCh) => {
  let wordtypeShorthand = stCh.chunkId.split("-")[0];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    clUtils.throw(
      `#ERR bsov getWordtypeFromStructureChunk. wordtypeShorthand "${stCh.chunkId}" had no translated wordtype.`
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
    clUtils.throw(
      `#ERR xafb getWordtypeFromLemmaObject. Object.keys(wordtypeRef) did not include wordtypeShorthand: "${wordtypeShorthand}"`
    );
  }

  return wordtypeRef[wordtypeShorthand];
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

exports.isTerminusObject = (selectedWord) => {
  if (!selectedWord) {
    return false;
  }

  return uUtils.isKeyValueTypeObject(selectedWord) && selectedWord.isTerminus;
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
