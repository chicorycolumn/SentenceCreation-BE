const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");

exports.findMatchingLemmaObjectThenWord = (
  structureChunk,
  resultArr,
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
    resultArr,
    words,
    errorInSentenceCreation,
    currentLanguage,
  });

  //STEP ONE: Return result array immediately if wordtype is fixed piece.
  if (structureChunk.wordtype === "fixed") {
    resultArr.push({
      selectedLemmaObject: {},
      selectedWord: structureChunk.value,
      structureChunk,
    });
    return;
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
      refObj.lemmaObjectCharacteristics[currentLanguage].selectors[
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
  console.log("*************");
  console.log(structureChunk);
  console.log("*************");
  console.log("********");
  console.log("****");

  //STEP THREE: Return result array immediately if uninflected or ad hoc.

  let adhocFeatureRef = refObj.adhocFeatures[currentLanguage];
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", { adhocFeatureRef });
  //THREE (A): Ad hoc forms.
  if (Object.keys(adhocFeatureRef).includes(structureChunk.wordtype)) {
    console.log(111111);
    Object.keys(adhocFeatureRef).forEach((adhocWordtype) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>", { adhocWordtype });
      let adhocFeatureKeys = adhocFeatureRef[adhocWordtype];

      adhocFeatureKeys.forEach((adhocFeatureKey) => {
        if (
          structureChunk[adhocFeatureKey] &&
          structureChunk[adhocFeatureKey].length
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

  if (structureChunk.form && structureChunk.form.length) {
    //THREE (B): Uninflected forms.
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
    lfUtils.updateStructureChunk(
      selectedLemmaObject,
      structureChunk,
      currentLanguage
    );

    lemmaObjectExtractions = lfUtils.sendFinalisedWord(
      null,
      selectedWord,
      structureChunk,
      selectedLemmaObject
    );

    addToResultArray(lemmaObjectExtractions, resultArr);
    return;
  }

  //STEP FOUR: Return word after selecting by drilling down through lemma object.

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

  lfUtils.updateStructureChunk(
    selectedLemmaObject,
    structureChunk,
    currentLanguage
  );

  lemmaObjectExtractions = lfUtils.filterWithinSelectedLemmaObject(
    selectedLemmaObject,
    structureChunk,
    currentLanguage
  );

  addToResultArray(lemmaObjectExtractions, resultArr);

  function addToResultArray(lemmaObjectExtractions, resultArr) {
    if (!lemmaObjectExtractions || !lemmaObjectExtractions.selectedWord) {
      errorInSentenceCreation.errorMessage =
        "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
      return false;
    } else {
      let {
        selectedWord,
        updatedStructureChunk,
        selectedLemmaObject,
      } = lemmaObjectExtractions;

      resultArr.push({
        selectedLemmaObject,
        selectedWord,
        structureChunk: updatedStructureChunk,
      });
    }
  }
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
