const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const { assessHypernymy } = require("./lemmaFilteringUtils.js");

exports.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects = (
  nestedArrOfObjects,
  subKey
) => {
  let allTags = [];
  Object.values(nestedArrOfObjects).forEach((arrOfObjects) => {
    allTags = this.collectAllValuesFromKeyOnObjectsInArrayOfObjects(
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

    const _findMatchingSubArr = (arrayA, arrayB) => {
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
    };

    return (
      _findMatchingSubArr(array1, array2) && _findMatchingSubArr(array2, array1)
    );
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

    if (exports.getWordtypeStCh(unit.structureChunk) !== "fix") {
      let hypernymy = assessHypernymy(unit.selectedLemmaObject);
      if (hypernymy) {
        sentenceStructure[indexOfStChToChange].hypernymy = hypernymy;
      }
    }
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

exports.getLanguageFromFormulaId = (id) => {
  return id.split("-")[0];
};

exports.getLanguageFromLemmaObject = (lObj) => {
  return lObj.id.split("-")[0].toUpperCase();
};

exports.stChIsPerson = (stCh, strict) => {
  if (strict) {
    return stCh.isPerson || exports.stChIsNounPerson(stCh);
  }
  return (
    stCh.isPerson ||
    exports.stChIsNounPerson(stCh) ||
    (stCh.person &&
      stCh.person.length === 1 &&
      ["1per", "2per"].includes(stCh.person[0]))
  );
};

exports.lObjIsNounPerson = (lObj) => {
  return ["npe"].includes(this.getWordtypeLObj(lObj));
};

exports.stChIsNounPerson = (stCh) => {
  return ["npe"].includes(this.getWordtypeStCh(stCh, true));
};

exports.getWordtypeLObj = (lObj) => {
  return lObj.id.split("-")[1];
};

exports.getWordtypeStCh = (stCh) => {
  return typeof stCh.chunkId === "string"
    ? stCh.chunkId.split("-")[0]
    : stCh.chunkId.traitValue.split("-")[0];
};

exports.getWordtypeAgree = (structureChunk, agreeKey = "agreeWith") => {
  return structureChunk[agreeKey].split("-")[0];
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

exports.getWordsFromTerminusObject = (terminusObj, shouldGetAll) => {
  let allWords = [];

  let terminusKeys = ["normal", "additionalFrequent", "unstressed", "stressed"];

  if (shouldGetAll) {
    terminusKeys.push("additionalInfrequent");
  }

  terminusKeys.forEach((terminusKey) => {
    if (terminusObj[terminusKey]) {
      allWords = [...allWords, ...terminusObj[terminusKey]];
    }
  });

  return allWords;
};

exports.lObjIsMGN = (lObj) => {
  return this.traitValueIsMeta(lObj.gender);
};

exports.traitValueIsMeta = (traitValue, chunk, traitKey) => {
  if (!traitValue && !chunk && !traitKey) {
    return false;
  }

  if (!traitValue) {
    traitValue = chunk[traitKey];
  }

  if (Array.isArray(traitValue)) {
    if (traitValue.length !== 1) {
      consol.throw("kngh");
    }
    traitValue = traitValue[0];
  }

  return traitValue[0] === "_";
};

exports.checkNoDuplicateChunks = (
  label = "yggf",
  obj,
  isOutputArray,
  returnBool
) => {
  let stChs = isOutputArray ? obj.map((ou) => ou.structureChunk) : obj;
  let ids = stChs.map((stCh) => stCh.chunkId);
  if (Array.from(new Set(ids)).length !== ids.length) {
    if (returnBool) {
      return true;
    }
    consol.throw(`${label} Contains duplicates: [${ids.join(", ")}]`);
  }
};

exports.enChTraitIsEmpty = (enChTraitObject) => {
  return (
    uUtils.isEmpty(enChTraitObject) ||
    uUtils.isEmpty(enChTraitObject.traitValue)
  );
};
