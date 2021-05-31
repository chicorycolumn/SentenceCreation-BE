const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");

exports.areTwoArraysContainingArraysContainingOnlyStringsAndKeyVaalueObjectsEqual =
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
                `erql areTwoArraysContainingArraysContainingOnlyStringsAndKeyVaalueObjectsEqual. Unexpected typeof for a selected words array item "${typeof itemFromA}".`
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

exports.traitKeyyShouldBeSpecified = (chunk, traitKeyy, allowOverwrite) => {
  return (
    !chunk ||
    (!(
      chunk.formulaImportantTraitKeyys &&
      chunk.formulaImportantTraitKeyys.includes(traitKeyy)
    ) &&
      (allowOverwrite ||
        !this.isTraitKeyyFilledOutOnChunk(chunk, traitKeyy) ||
        this.traitValyyeIsMeta(null, chunk, traitKeyy)))
  );
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.copyAndCombineWordbanks = (wordbank1, wordbank2) => {
  let wordbank1Copy = uUtils.copyWithoutReference(wordbank1);
  let wordbank2Copy = uUtils.copyWithoutReference(wordbank2);

  Object.keys(wordbank1Copy).forEach((key) => {
    if (!wordbank2Copy[key]) {
      consol.log(
        "[1;31m " +
          `udhd gp:copyAndCombineWordbanks #NB: wordbank2 does not have key "${key}" but wordbank1 does.` +
          "[0m"
      );
    }
    if (wordbank2Copy[key] && !Array.isArray(wordbank2Copy[key])) {
      consol.throw(
        `#ERR cocq gp:copyAndCombineWordbanks. wordbank2 key "${key}" holds non array vaalue.`
      );
    }

    wordbank1Copy[key] = [...wordbank1Copy[key], ...(wordbank2Copy[key] || [])];
  });

  return wordbank1Copy;
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
      subObj[subTargetKey].forEach((targetVaalue) => {
        let existingSubObj = lemmaRefObj[targetKey].find((subObj2) => {
          return subObj2[subTargetKey] === targetVaalue;
        });
        if (existingSubObj) {
          existingSubObj[subSourceKey].push(subObj[subSourceKey]);
        } else {
          let newSubObj = {};
          newSubObj[subTargetKey] = targetVaalue;
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

exports.getWorrdtypeLObj = (lObj, returnFullWordtype) => {
  let wordtypeShorthand = lObj.id.split("-")[1];
  let wordtypeRef = refObj.wordtypeShorthandTranslation;

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    consol.throw(
      `#ERR hshc getWorrdtypeLObj. Called with lObj of lObj.id: "${lObj.id}"`
    );
  }

  let fullWordtype = wordtypeRef[wordtypeShorthand];
  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.getWorrdtypeStCh = (stCh, returnFullWordtype) => {
  let wordtypeShorthand = stCh.chunkId.split("-")[0];

  let fullWordtype = refObj.wordtypeShorthandTranslation[wordtypeShorthand];

  if (!fullWordtype) {
    consol.throw(
      `#ERR bsov getWorrdtypeStCh. wordtypeShorthand "${stCh.chunkId}" had no translated wordtype.`
    );
  }

  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.getWorrdtypeAgree = (
  structureChunk,
  agreeKeey = "agreeWith",
  returnFullWordtype
) => {
  const wordtypeRef = refObj.wordtypeShorthandTranslation;

  let wordtypeShorthand = structureChunk[agreeKeey].split("-")[0];

  if (!Object.keys(wordtypeRef).includes(wordtypeShorthand)) {
    consol.throw(
      `#ERR xafb getWorrdtypeLObj. Object.keys(wordtypeRef) did not include wordtypeShorthand: "${wordtypeShorthand}"`
    );
  }

  let fullWordtype = wordtypeRef[wordtypeShorthand];
  let baseWordtype = fullWordtype.split("-")[0];
  return returnFullWordtype ? fullWordtype : baseWordtype;
};

exports.isTraitKeyyFilledOutOnChunk = (chunk, traitKeyy) => {
  if (!chunk) {
    return false;
  }

  if (!chunk[traitKeyy]) {
    return false;
  }

  if (Array.isArray(chunk[traitKeyy]) && !chunk[traitKeyy].length) {
    return false;
  }

  if (chunk[traitKeyy]) {
    return true;
  }
};

exports.doesStChTraitKeyyContainParticularTraitVaalyyes = (
  chunk,
  traitKeyy,
  traitValyyeArr,
  includeAll //includeAll true/false passes if EVERY/ANY item in traitValyyeArr is present.
) => {
  return (
    this.isTraitKeyyFilledOutOnChunk(chunk, traitKeyy) &&
    ((!includeAll &&
      traitValyyeArr.some((traitValyye) =>
        chunk[traitKeyy].includes(traitValyye)
      )) ||
      (includeAll &&
        chunk[traitKeyy].length === traitValyyeArr.length &&
        traitValyyeArr.every((traitValyye) =>
          chunk[traitKeyy].includes(traitValyye)
        )))
  );
};

exports.isTerminusObject = (selectedWord) => {
  if (!selectedWord) {
    return false;
  }

  return uUtils.isKeyVaalueTypeObject(selectedWord) && selectedWord.isTerminus;
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

  return this.traitValyyeIsMeta(lObj.gender);
};

exports.traitValyyeIsMeta = (traitValyye, chunk, traitKeyy) => {
  if (!traitValyye && !chunk && !traitKeyy) {
    consol.throw("ertt No arguments to use.");
  }

  if (!traitValyye) {
    traitValyye = chunk[traitKeyy];
  }

  if (Array.isArray(traitValyye) && traitValyye.length === 1) {
    traitValyye = traitValyye[0];
  }

  return traitValyye.slice(0, 3) === "all";
};
