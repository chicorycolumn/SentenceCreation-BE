const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects = (
  nestedArrOfObjects,
  subKey
) => {
  let allTags = [];
  Object.values(nestedArrOfObjects).forEach((arrOfObjects) => {
    allTags = gpUtils.collectAllValuesFromKeyOnObjectsInArrayOfObjects(
      arrOfObjects,
      subKey,
      allTags
    );
  });
  return allTags;
};

exports.collectAllValuesFromKeyOnObjectsInArrayOfObjects = (
  arrOfObjects,
  key,
  allTags = []
) => {
  arrOfObjects.forEach((lObj) => {
    if (lObj[key]) {
      lObj[key].forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    }
  });
  return allTags;
};

exports.areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual =
  (array1, array2) => {
    //Ignores order.
    //Ignores duplicates.

    //Eg these two arrays are EQUAL.
    //
    // const input1 = [
    //
    //   [
    //     "I",
    //     "aint",
    //     {
    //       isTerminus: true,
    //       processOnlyAtEnd: true,
    //       nonprotective: ["a"],
    //       protective: ["an"],
    //     },
    //     "human",
    //   ],
    //
    //   [
    //     "I",
    //     "am",
    //     {
    //       isTerminus: true,
    //       processOnlyAtEnd: true,
    //       nonprotective: ["my"],
    //       protective: ["mine"],
    //     },
    //     "human",
    //   ],
    //
    // ];
    //
    // const input2 = [
    //
    //   [
    //     {
    //       isTerminus: true,
    //       processOnlyAtEnd: true,
    //       nonprotective: ["my"],
    //       protective: ["mine"],
    //     },
    //     "am",
    //     "I",
    //     "human",
    //   ],
    //
    //   [
    //     "human",
    //     "I",
    //     "aint",
    //     {
    //       isTerminus: true,
    //       processOnlyAtEnd: true,
    //       nonprotective: ["a"],
    //       protective: ["an"],
    //     },
    //   ],
    //
    // ];

    return (
      findMatchingSubArr(array1, array2) && findMatchingSubArr(array2, array1)
    );

    function findMatchingSubArr(arrayA, arrayB) {
      return arrayA.every((subArrFromA) => {
        let matchingSubArrFromB = arrayB.find((subArrFromB) => {
          if (subArrFromA.length !== subArrFromB.length) {
            return false;
          }

          return subArrFromA.every((itemFromA) => {
            if (typeof itemFromA === "string") {
              return subArrFromB.includes(itemFromA);
            } else if (typeof itemFromA === "object") {
              return subArrFromB.find(
                (itemFromB) =>
                  typeof itemFromB === "object" &&
                  uUtils.areTwoObjectsEqual(itemFromA, itemFromB)
              );
            } else {
              consol.throw(
                `erql areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual. Unexpected typeof for a selected words array item "${typeof itemFromA}".`
              );
            }
          });
        });

        return matchingSubArrFromB;
      });
    }
  };

exports.updateSentenceStructureWithNewStructureChunksFromOutputUnits = (
  sentenceStructure,
  outputArr
) => {
  outputArr.forEach((unit) => {
    let indexOfStChToChange = sentenceStructure.findIndex(
      (stCh) => stCh.chunkId === unit.structureChunk.chunkId
    );

    sentenceStructure[indexOfStChToChange] = uUtils.copyWithoutReference(
      unit.structureChunk
    );
  });
};

exports.traitKeyShouldBeSpecified = (chunk, traitKey, allowOverwrite) => {
  return (
    !chunk ||
    (!(
      chunk.formulaImportantTraitKeys &&
      chunk.formulaImportantTraitKeys.includes(traitKey)
    ) &&
      (allowOverwrite ||
        !this.isTraitKeyFilledOutOnChunk(chunk, traitKey) ||
        this.traitValueIsMeta(null, chunk, traitKey)))
  );
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.combineWordbanks = (wordbank1Input, wordbank2Input, shouldCopy) => {
  let wordbank1 = shouldCopy
    ? uUtils.copyWithoutReference(wordbank1Input)
    : wordbank1Input;
  let wordbank2 = shouldCopy
    ? uUtils.copyWithoutReference(wordbank2Input)
    : wordbank2Input;

  let result = {};

  Object.keys(wordbank1).forEach((key) => {
    if (!wordbank2[key]) {
      consol.log(
        "[1;31m " +
          `udhd gp:combineWordbanks #NB: wordbank2 does not have key "${key}" but wordbank1 does.` +
          "[0m"
      );
    }
    if (!Array.isArray(wordbank2[key])) {
      consol.throw(
        `#ERR cocq gp:combineWordbanks. wordbank2 key "${key}" holds non array value.`
      );
    }

    result[key] = [...wordbank1[key], ...wordbank2[key]];
  });

  return result;
};

exports.explodeOutputArraysByHeadsAndDependents = (justOneOutputArray) => {
  consol.log(
    "mdpu explodeOutputArraysByHeadsAndDependents START. justOneOutputArray"
  );

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

exports.getWordtypeCodeLObj = (lObj) => {
  return (wordtypeShorthand = lObj.id.split("-")[1]);
};

exports.lObjIsNounPerson = (lObj) => {
  return ["noun-person", "noun-person-proper"].includes(
    this.getWordtypeLObj(lObj, true)
  );
};

exports.stChIsNounPerson = (stCh) => {
  return ["noun-person", "noun-person-proper"].includes(
    this.getWordtypeStCh(stCh, true)
  );
};

exports.getWordtypeLObj = (lObj, returnFullWordtype) => {
  let wordtypeShorthand = lObj.id.split("-")[1];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    consol.throw(
      `#ERR hshc getWordtypeLObj. Called with lObj of lObj.id: "${lObj.id}"`
    );
  }

  let fullWordtype = wordtypeRef[wordtypeShorthand];
  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.getWordtypeCodeStCh = (stCh) => {
  return stCh.chunkId.split("-")[0];
};

exports.getWordtypeStCh = (stCh, returnFullWordtype) => {
  let wordtypeShorthand = stCh.chunkId.split("-")[0];

  let fullWordtype = refObj.wordtypeShorthandTranslation[wordtypeShorthand];

  if (!fullWordtype) {
    consol.throw(
      `#ERR bsov getWordtypeStCh. wordtypeShorthand "${stCh.chunkId}" had no translated wordtype.`
    );
  }

  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.getWordtypeAgree = (
  structureChunk,
  agreeKey = "agreeWith",
  returnFullWordtype
) => {
  const wordtypeRef = refObj.wordtypeShorthandTranslation;

  let wordtypeShorthand = structureChunk[agreeKey].split("-")[0];

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    consol.throw(
      `#ERR xafb getWordtypeLObj. Object.keys(wordtypeRef) did not include wordtypeShorthand: "${wordtypeShorthand}"`
    );
  }

  let fullWordtype = wordtypeRef[wordtypeShorthand];
  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.isTraitKeyFilledOutOnChunk = (chunk, traitKey) => {
  if (!chunk) {
    return false;
  }

  if (!chunk[traitKey]) {
    return false;
  }

  if (Array.isArray(chunk[traitKey]) && !chunk[traitKey].length) {
    return false;
  }

  if (chunk[traitKey]) {
    return true;
  }
};

exports.doesStChTraitKeyContainParticularTraitVaalues = (
  chunk,
  traitKey,
  traitValueArr,
  includeAll //includeAll true/false passes if EVERY/ANY item in traitValueArr is present.
) => {
  return (
    this.isTraitKeyFilledOutOnChunk(chunk, traitKey) &&
    ((!includeAll &&
      traitValueArr.some((traitValue) =>
        chunk[traitKey].includes(traitValue)
      )) ||
      (includeAll &&
        chunk[traitKey].length === traitValueArr.length &&
        traitValueArr.every((traitValue) =>
          chunk[traitKey].includes(traitValue)
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

  let pushKeys = shouldGetAll
    ? ["normal", "additionalFrequent", "additionalInfrequent"]
    : ["normal", "additionalFrequent"];

  pushKeys.forEach((pushKey) => {
    if (tObj[pushKey]) {
      allWords = [...allWords, ...tObj[pushKey]];
    }
  });

  return allWords;
};

exports.lObjIsMGN = (lObj) => {
  if (!lObj.gender) {
    return false;
  }

  return this.traitValueIsMeta(lObj.gender);
};

exports.traitValueIsMeta = (traitValue, chunk, traitKey) => {
  if (!traitValue && !chunk && !traitKey) {
    consol.throw("ertt No arguments to use.");
  }

  if (!traitValue) {
    traitValue = chunk[traitKey];
  }

  if (Array.isArray(traitValue) && traitValue.length === 1) {
    traitValue = traitValue[0];
  }

  return traitValue.slice(0, 3) === "all";
};
