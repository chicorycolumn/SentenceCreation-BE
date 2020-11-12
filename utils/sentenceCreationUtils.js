exports.selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const { selectRandom } = exports;

exports.capitaliseFirst = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

exports.filterByTag = (wordset, tags, mandatory) => {
  let lemmaObjs = Object.values(wordset);

  if (tags.length) {
    return lemmaObjs.filter((lemmaObj) => {
      if (mandatory) {
        return tags.every((tag) => lemmaObj.tags.includes(tag));
      } else {
        return tags.some((tag) => lemmaObj.tags.includes(tag));
      }
    });
  } else {
    return lemmaObjs;
  }
};

exports.giveSetKey = (word) => {
  return word + "Set";
};

exports.filterByKey = (sourceArr, specArr, key) => {
  if (specArr.length) {
    return sourceArr.filter((item) => specArr.includes(item[key]));
  } else {
    return sourceArr;
  }
};

exports.filterWithinObjectByNestedKeys = (source, specObj, inflectionChain) => {
  let requirementArrs = inflectionChain.map((key) => specObj[key]);

  requirementArrs.forEach((requirementArr) => {
    source = drillDownOneLevel(source, requirementArr);
    if (!source) {
      console.log("AAAAAAAAAAAAAAARGGGGGGGHHHHHHH");
    }
  });

  if (typeof source === "string") {
    return source;
  } else {
    return selectRandom(source);
  }

  function drillDownOneLevel(source, requirementArr) {
    // console.log(">source", source);
    let sourceKeys = Object.keys(source);
    let validKeys = [];

    // console.log({ sourceKeys, validKeys });

    if (requirementArr.length) {
      validKeys = sourceKeys.filter((key) => requirementArr.includes(key));
    } else {
      validKeys = sourceKeys;
    }

    if (validKeys.length) {
      return source[selectRandom(validKeys)];
    } else {
      console.log(
        "filterWithinObjectByNestedKeys fxn says Error in utils. No valid keys at some level of lemma object."
      );
      return null;
    }
  }
};

exports.filterOutDefectiveInflections = (
  sourceArr,
  specObj,
  inflectionChain
) => {
  let requirementArrs = inflectionChain.map((key) => specObj[key]);

  //eg requirementArrs
  // [[], []]                                 Majtki should be available.
  // [[], ["nom", "acc"]]                     Majtki should be available.
  // [["singular"], []]                       Majtki should be REMOVED.
  // [["singular", "plural"], []]             Majtki should be available.

  return sourceArr.filter((lObj) => {
    if (!lObj.defective) {
      return true;
    } else {
      requirementArrs.forEach();
    }
  });

  function drillDownOneLevel(sourceObj, requirementArr) {
    let sourceKeys = Object.keys(source);
    let validKeys = [];

    if (requirementArr.length) {
      validKeys = sourceKeys.filter((key) => requirementArr.includes(key));
    } else {
      validKeys = sourceKeys;
    }

    if (validKeys.length) {
      return source[selectRandom(validKeys)];
    } else {
      console.log(
        "filterOutDefectiveInflections fxn says Error in utils. No valid keys at some level of lemma object."
      );
      return null;
    }
  }
};

exports.sentenceStringFromArray = (arr) => {
  return exports.capitaliseFirst(arr.join(" ") + ".");
};
