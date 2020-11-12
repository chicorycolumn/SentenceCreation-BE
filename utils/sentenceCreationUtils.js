function capitaliseFirst(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function filterByTag(wordset, tags, mandatory) {
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
}

function selectRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function giveSetKey(word) {
  return word + "Set";
}

function filterByKey(sourceArr, specArr, key) {
  if (specArr.length) {
    return sourceArr.filter((item) => specArr.includes(item[key]));
  } else {
    return sourceArr;
  }
}

function filterWithinObjectByNestedKeys(source, specObj, inflectionChain) {
  let requirementArrs = inflectionChain.map((key) => specObj[key]);

  requirementArrs.forEach((requirementArr) => {
    source = drillDownOneLevel(source, requirementArr);
    if (!source) {
    }
  });

  if (typeof source === "string") {
    return source;
  } else {
    return selectRandom(source);
  }

  function drillDownOneLevel(source, requirementArr) {
    let objKeys = Object.keys(source);
    let validKeys = [];

    if (requirementArr.length) {
      validKeys = objKeys.filter((key) => requirementArr.includes(key));
    } else {
      validKeys = objKeys;
    }

    if (validKeys.length) {
      return source[selectRandom(validKeys)];
    } else {
      return null;
    }
  }
}

function filterOutDefectiveInflections() {
  let requirementArrs = inflectionChain.map((key) => specObj[key]);

  requirementArrs.forEach((requirementArr) => {});
}
