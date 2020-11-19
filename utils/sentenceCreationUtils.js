const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const POLUtils = require("./specificPolishUtils.js");

exports.concoctNestedRoutes = (routesByLevelTarget, routesByLevelSource) => {
  console.log(
    "**********************************************************************************%%"
  );
  console.log("routesByLevelTarget", routesByLevelTarget);
  console.log("routesByLevelSource", routesByLevelSource);

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

exports.buildSentenceFromArray = (unorderedArr, sentenceFormula) => {
  let selectedWords = [];

  if (sentenceFormula.primaryOrders) {
    let order =
      sentenceFormula.primaryOrders.length === 1
        ? sentenceFormula.primaryOrders[0]
        : gpUtils.selectRandom(sentenceFormula.primaryOrders);

    let orderedArr = [];
    order.forEach((chunkId) => {
      orderedArr.push(
        unorderedArr.find((item) => item.structureChunk.chunkId === chunkId)
      );
    });

    selectedWords = orderedArr.map((obj) => obj.selectedWord);
  } else {
    selectedWords = unorderedArr.map((obj) => obj.selectedWord);
  }

  let producedSentence = gpUtils.capitaliseFirst(selectedWords.join(" ") + ".");
  return producedSentence;
};

exports.extractNestedRoutes = (source) => {
  // console.log("extractNestedRoutes >>source", source);

  let routesByNesting = [];
  let arr = [];
  recursivelyMapRoutes(arr, source);

  // console.log("extractNestedRoutes >>routesByNesting", routesByNesting);

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
      // console.log("recursivelyMapRoutes >>>source", source);
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
  structureChunkOriginal,
  resultArr,
  words,
  inflectionChainsByThisLanguage,
  errorInSentenceCreation
) => {
  let structureChunk = structureChunkOriginal;

  if (structureChunk.wordtype === "fixed") {
    resultArr.push({
      selectedLemmaObj: {},
      selectedWord: structureChunk.value,
      structureChunk,
    });
    return;
  }

  let source = words[gpUtils.giveSetKey(structureChunk.wordtype)];
  let matches = [];

  if (structureChunk.specificLemmas && structureChunk.specificLemmas.length) {
    matches = lfUtils.filterByLemma(source, structureChunk);
  } else {
    matches = lfUtils.filterByTag(source, structureChunk.manTags, true);
    matches = lfUtils.filterByTag(matches, structureChunk.optTags, false);

    // Do this for nouns because we're filtering the different noun lobjs by gender, as each noun is a diff gender.
    // Don't do this for adjs, as gender is a key inside each individual adj lobj.
    if (["noun"].includes(structureChunk.wordtype)) {
      matches = lfUtils.filterByKey(matches, structureChunk, "gender");
    }
  }

  if (structureChunk.wordtype === "verb") {
    matches.forEach((lObj) => POLUtils.fillVerbLemmaObject(lObj));
  }

  // console.log("have these verbs been filled out?", matches);

  matches = lfUtils.filterOutDeficientInflections(
    matches,
    structureChunk,
    inflectionChainsByThisLanguage
  );

  if (matches.length) {
    let selectedLemmaObj = gpUtils.selectRandom(matches);

    let filterNestedOutput = lfUtils.filterWithinLemmaObjectByNestedKeys(
      selectedLemmaObj,
      structureChunk,
      inflectionChainsByThisLanguage
    );

    if (!filterNestedOutput || !filterNestedOutput.selectedWord) {
      errorInSentenceCreation.errorMessage =
        "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";

      return false;
    } else {
      let {
        selectedWord,

        modifiedStructureChunk,
      } = filterNestedOutput;

      resultArr.push({
        selectedLemmaObj,
        selectedWord,
        structureChunk: modifiedStructureChunk,
      });
    }
  } else {
    errorInSentenceCreation.errorMessage =
      "No matching lemma objects were found.";
    return false;
  }
};
