const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");

exports.findMatchingLemmaObjectThenWord = (
  structureChunk,
  words,
  errorInSentenceCreation,
  currentLanguage,
  questionLanguage
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let lemmaObjectExtractions;
  let selectedLemmaObject;
  let selectedWord;

  console.log(
    "findMatchingLemmaObjectThenWord fxn has been given these arguments:"
  );
  console.log({
    structureChunk,
    words,
    errorInSentenceCreation,
    currentLanguage,
  });

  //STEP ONE: Return result array immediately if wordtype is fixed piece.
  if (structureChunk.wordtype === "fixed") {
    return {
      selectedLemmaObject: {},
      selectedWord: structureChunk.value,
      structureChunk,
    };
  }

  //STEP TWO: Filter lemmaObjects by specificIds OR specificLemmas OR tags and selectors.
  let source = words[gpUtils.giveSetKey(structureChunk.wordtype)];
  let matches = [];

  if (structureChunk.specificIds && structureChunk.specificIds.length) {
    matches = source.filter((lObj) =>
      structureChunk.specificIds.includes(lObj.id)
    );
  } else if (
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    matches = source.filter((lObj) =>
      structureChunk.specificLemmas.includes(lObj.lemma)
    );
  } else {
    matches = lfUtils.filterByTag(source, structureChunk.tags);

    let selectors =
      refObj.lemmaObjectFeatures[currentLanguage].selectors[
        structureChunk.wordtype
      ];
    if (selectors) {
      selectors.forEach((selector) => {
        matches = lfUtils.filterByKey(matches, structureChunk, selector);
      });
    }
  }

  langUtils.preprocessLemmaObjects(matches, structureChunk);

  console.log("****");
  console.log("********");
  console.log(
    "************* findMatchingLemmaObjectThenWord fxn end of step two."
  );
  console.log("structureChunk", structureChunk);
  console.log("*************");
  console.log("********");
  console.log("****");

  //STEP THREE: Return result array immediately if uninflected or ad hoc.

  let adhocInflectorRef = refObj.adhocInflectors[currentLanguage];
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", { adhocInflectorRef });
  //THREE (A): A-PW: Pathway for Ad hoc forms.
  if (Object.keys(adhocInflectorRef).includes(structureChunk.wordtype)) {
    console.log(111111);
    Object.keys(adhocInflectorRef).forEach((adhocWordtype) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>", { adhocWordtype });
      let adhocInflectorKeys = adhocInflectorRef[adhocWordtype];

      adhocInflectorKeys.forEach((adhocInflectorKey) => {
        if (
          structureChunk[adhocInflectorKey] &&
          structureChunk[adhocInflectorKey].length
        ) {
          selectedLemmaObject = gpUtils.selectRandom(matches);

          let adhocArr = langUtils.generateAdhocForms(
            structureChunk,
            selectedLemmaObject,
            currentLanguage
          );

          selectedWord = questionLanguage
            ? adhocArr
            : gpUtils.selectRandom(adhocArr);

          console.log("£££££££££££££", { adhocArr });

          console.log("$$$$$$$$$$$$$$$$$$$$$", {
            selectedWord,
            structureChunk,
            selectedLemmaObject,
          });
        }
      });
    });
  }

  //THREE (B): U-PW: Pathway for Uninflected forms.
  if (structureChunk.form && structureChunk.form.length) {
    Object.keys(refObj.uninflectedForms[currentLanguage]).forEach(
      (wordtype) => {
        if (structureChunk.wordtype === wordtype) {
          let uninflectedValues =
            refObj.uninflectedForms[currentLanguage][wordtype];

          let requestedUninflectedForms = structureChunk.form.filter(
            (requestedForm) => {
              return uninflectedValues.includes(requestedForm);
            }
          );

          if (requestedUninflectedForms.length) {
            let selectedUninflectedForm = gpUtils.selectRandom(
              requestedUninflectedForms
            );

            matches = matches.filter((lObj) => {
              return lObj.inflections[selectedUninflectedForm];
            });

            selectedLemmaObject = gpUtils.selectRandom(matches);

            selectedWord =
              selectedLemmaObject.inflections[selectedUninflectedForm];
          }
        }
      }
    );
  }

  if (selectedLemmaObject) {
    return exports.createOutputUnit(
      errorInSentenceCreation,
      null,
      selectedWord,
      structureChunk,
      selectedLemmaObject
    );
  }

  //STEP FOUR: I-PW: Pathway for inflected forms, return word after selecting by drilling down through lemma object.

  matches = lfUtils.filterOutDeficientLemmaObjects(
    matches,
    structureChunk,
    currentLanguage
  );

  if (!matches.length) {
    errorInSentenceCreation.errorMessage =
      "No matching lemma objects were found.";
    return;
  }

  selectedLemmaObject = gpUtils.selectRandom(matches);

  let {
    errorInDrilling,
    selectedWordOrArray,
    updatedStructureChunk,
  } = lfUtils.filterWithinSelectedLemmaObject(
    //This updates structureChunk with choices from the chosen inflection path.
    selectedLemmaObject,
    structureChunk,
    currentLanguage
  );

  return exports.createOutputUnit(
    errorInSentenceCreation,
    errorInDrilling,
    selectedWordOrArray,
    updatedStructureChunk,
    selectedLemmaObject
  );
};

exports.createOutputUnit = (
  errorInSentenceCreation,
  errorInDrilling,
  selectedWord,
  structureChunk,
  selectedLemmaObject
) => {
  if (errorInDrilling || !selectedWord) {
    errorInSentenceCreation.errorMessage =
      "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
    return false;
  }

  if (typeof selectedWord !== "string") {
    selectedWord = gpUtils.selectRandom(selectedWord);
  }

  return {
    selectedLemmaObject,
    selectedWord,
    structureChunk,
  };

  //   if (typeof source === "string") {
  //     return {
  //       selectedWord: source,
  //       updatedStructureChunk: structureChunk,
  //       selectedLemmaObject,
  //     };
  //   } else {
  //     return {
  //       selectedWord: gpUtils.selectRandom(source),
  //       updatedStructureChunk: structureChunk,
  //       selectedLemmaObject,
  //     };
  //   }
  // }

  // if (!lemmaObjectExtractions || !lemmaObjectExtractions.selectedWord) {
  //   errorInSentenceCreation.errorMessage =
  //     "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
  //   return false;
  // } else {
  // let {
  //   selectedWord,
  //   updatedStructureChunk,
  //   selectedLemmaObject,
  // } = lemmaObjectExtractions;

  // outputArr.push({
  //   selectedLemmaObject,
  //   selectedWord,
  //   structureChunk: updatedStructureChunk,
  // });
  // }
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
        if (!source[key]) {
          delete source[key];
          return;
        }

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

exports.findObjectInNestedObject = (source, identifyingData, alsoReturnKey) => {
  let res = {};
  recursivelySearch(source, identifyingData);
  return alsoReturnKey ? res : res.value;

  function recursivelySearch(source, identifyingData) {
    if (res.value) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (gpUtils.isObject(value)) {
        if (gpUtils.doKeyValuesMatch(value, identifyingData)) {
          res.value = value;
          res.key = key;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};
