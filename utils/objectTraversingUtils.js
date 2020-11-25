const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");

exports.findMatchingWordThenAddToResultArray = (
  structureChunk,
  resultArr,
  words,
  errorInSentenceCreation,
  currentLanguage
) => {
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let lemmaObjectExtractions = null;

  console.log(
    "findMatchingWordThenAddToResultArray fxn has been given these arguments:"
  );
  console.log({
    structureChunk,
    resultArr,
    words,
    errorInSentenceCreation,
    currentLanguage,
  });

  //STEP ZERO: Return result array immediately if wordtype is fixed piece.
  if (structureChunk.wordtype === "fixed") {
    resultArr.push({
      selectedLemmaObject: {},
      selectedWord: structureChunk.value,
      structureChunk,
    });
    return;
  }

  //STEP ONE: Filter lemmaObjects by specificIds OR specificLemmas OR tags and selectors.
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

  //STEP TWO: Get word and skip Step Three, if is verb and requested form is an uninflected participle, as there's no drilling to do.
  if (["verb"].includes(structureChunk.wordtype)) {
    let uninflectedVerbForms = structureChunk.form.filter((form) => {
      return refObj.uninflectedVerbForms[currentLanguage].includes(form);
    });
    if (uninflectedVerbForms.length) {
      let selectedForm = gpUtils.selectRandom(uninflectedVerbForms);
      matches = matches.filter((lObj) => {
        return lObj.inflections[selectedForm];
      });
      let selectedLemmaObject = gpUtils.selectRandom(matches);
      let selectedWord = selectedLemmaObject.inflections[selectedForm];

      lfUtils.updateStructureChunk(
        selectedLemmaObject,
        structureChunk,
        currentLanguage
      );

      lemmaObjectExtractions = lfUtils.sendFinalisedWord(
        null,
        selectedWord,
        structureChunk
      );
    }
  }

  //STEP THREE
  if (!lemmaObjectExtractions) {
    //STEP THREE (A): Filter out lObjs that will dead-end structureChunk's requirements.
    if (!(currentLanguage === "ENG" && structureChunk.wordtype === "verb")) {
      matches = lfUtils.filterOutDeficientLemmaObjects(
        matches,
        structureChunk,
        currentLanguage
      );
    }

    if (!matches.length) {
      errorInSentenceCreation.errorMessage =
        "No matching lemma objects were found.";
      return;
    }

    let selectedLemmaObject = gpUtils.selectRandom(matches);

    //STEP THREE (B): Pick out the specific word by traversing the finally selected lObj, avoiding dead ends.
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
  }

  //STEP FOUR: Return result array.
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
