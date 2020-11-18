const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");

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

exports.buildSentenceFromArray = (arr) => {
  let selectedWords = arr.map((obj) => obj.selectedWord);
  let selectedLemmaObjs = arr.map(
    (obj) => Object.keys(obj.selectedLemmaObj).length
  );

  if (selectedLemmaObjs.some((lObj) => lObj && lObj.agreeWith)) {
    //I see there are agreement notes to work through. But these are done now.
  } else {
    let producedSentence = gpUtils.capitaliseFirst(
      selectedWords.join(" ") + "."
    );
    return producedSentence;
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

exports.findObjectInNestedObject = (source, identifyingData) => {
  let res = null;
  recursivelySearch(source, identifyingData);
  return res;

  function recursivelySearch(source, identifyingData) {
    if (res) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (gpUtils.isObject(value)) {
        if (gpUtils.doKeyValuesMatch(value, identifyingData)) {
          res = value;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};

exports.getSelectedWordAndPutInArray = (
  formulaChunkOriginal,
  resultArr,
  wordsCopy,
  inflectionChainsByThisLanguage,
  errorInSentenceCreation
) => {
  let formulaChunk = formulaChunkOriginal;

  if (Array.isArray(formulaChunkOriginal)) {
    formulaChunk = [...formulaChunkOriginal];
  }

  if (typeof formulaChunk === "string") {
    resultArr.push({
      selectedLemmaObj: {},
      selectedWord: formulaChunk,
      formulaChunk,
    });
  } else {
    let source = wordsCopy[gpUtils.giveSetKey(formulaChunk.wordtype)];
    let matches = [];

    matches = lfUtils.filterByTag(source, formulaChunk.manTags, true);
    matches = lfUtils.filterByTag(matches, formulaChunk.optTags, false);

    // Do this for nouns because we're filtering the different noun lobjs by gender, as each noun is a diff gender.
    // Don't do this for adjs, as gender is a key inside each individual adj lobj.
    if (["noun"].includes(formulaChunk.wordtype)) {
      matches = lfUtils.filterByKey(matches, formulaChunk["gender"], "gender");

      matches = lfUtils.filterOutDefectiveInflections(
        matches,
        formulaChunk,
        inflectionChainsByThisLanguage
      );
    }

    if (matches.length) {
      let selectedLemmaObj = { ...gpUtils.selectRandom(matches) };

      let filterNestedOutput = lfUtils.filterWithinLemmaObjectByNestedKeys(
        selectedLemmaObj,
        formulaChunk,
        inflectionChainsByThisLanguage
      );

      if (!filterNestedOutput || !filterNestedOutput.selectedWord) {
        errorInSentenceCreation.errorMessage =
          "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";

        return false;
      } else {
        let {
          selectedWord,

          modifiedFormulaChunk,
        } = filterNestedOutput;

        resultArr.push({
          selectedLemmaObj,
          selectedWord,
          formulaChunk: modifiedFormulaChunk,
        });
      }
    } else {
      errorInSentenceCreation.errorMessage =
        "No matching lemma objects were found.";
      return false;
    }
  }
};
