const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const POLUtils = require("./specificPolishUtils.js");

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

exports.findMatchingWordThenAddToResultArray = (
  structureChunkOriginal,
  resultArr,
  words,
  inflectionChainsByThisLanguage,
  errorInSentenceCreation,
  currentLanguage
) => {
  console.log(
    "findMatchingWordThenAddToResultArray fxn has been given these arguments:"
  );
  console.log({
    structureChunkOriginal,
    resultArr,
    words,
    inflectionChainsByThisLanguage,
    errorInSentenceCreation,
    currentLanguage,
  });

  let structureChunk = structureChunkOriginal;

  if (structureChunk.wordtype === "fixed") {
    resultArr.push({
      selectedLemmaObj: {},
      selectedWord: structureChunk.value,
      structureChunk,
    });
    return;
  }

  //STEP ONE: Filtering lemmaObjects by features from structureChunk.
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
    // matches = lfUtils.filterByLemma(source, structureChunk);
  } else {
    matches = lfUtils.filterByTag(source, structureChunk.manTags, true);
    matches = lfUtils.filterByTag(matches, structureChunk.optTags, false);

    // Filter noun lobjs by gender (as each noun lobj is indeed a diff gender) but not for adjs/verbs, as gender is a key inside those lobjs.
    if (currentLanguage === "POL") {
      if (["noun"].includes(structureChunk.wordtype)) {
        matches = lfUtils.filterByKey(matches, structureChunk, "gender");
      }
    }
  }

  if (currentLanguage === "POL") {
    if (["verb"].includes(structureChunk.wordtype)) {
      matches.forEach((lObj) => POLUtils.fillVerbInflections(lObj));
    }

    if (["adjective"].includes(structureChunk.wordtype)) {
      matches.forEach((lObj) => POLUtils.adjustMasculinityOfLemmaObject(lObj));
    }

    if (["verb", "adjective"].includes(structureChunk.wordtype)) {
      POLUtils.adjustVirility(structureChunk);
    }
  }

  //STEP TWO: Pre-emptively recursively traversing lemmaObjects for happy paths and dead ends to filter out any lObjs that can't fulfil structureChunk's requirements.
  if (!(currentLanguage === "ENG" && structureChunk.wordtype === "verb")) {
    matches = lfUtils.filterOutDeficientLemmaObjects(
      matches,
      structureChunk,
      inflectionChainsByThisLanguage
    );

    if (!matches.length) {
      errorInSentenceCreation.errorMessage =
        "No matching lemma objects were found.";
      return;
    }
  }

  let selectedLemmaObj = gpUtils.selectRandom(matches);

  console.log(3333333333333333333);
  console.log("selectedLemmaObj", selectedLemmaObj);
  console.log(3333333333333333333);

  //STEP THREE: Traversing the finally selected lObj to pick out the specific word.
  //Ensures we don't randomly traverse to a dead end, and ensure we go a happy path, of which we already know at least one exists.
  let filterNestedOutput = lfUtils.filterWithinSelectedLemmaObject(
    selectedLemmaObj,
    structureChunk,
    inflectionChainsByThisLanguage,
    currentLanguage
  );

  if (!filterNestedOutput || !filterNestedOutput.selectedWord) {
    errorInSentenceCreation.errorMessage =
      "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";

    return false;
  } else {
    let { selectedWord, updatedStructureChunk } = filterNestedOutput;

    resultArr.push({
      selectedLemmaObj,
      selectedWord,
      structureChunk: updatedStructureChunk,
    });
  }
};
