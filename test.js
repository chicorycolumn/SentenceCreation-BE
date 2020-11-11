let nounSet = {
  44: {
    lemma: "kobieta",
    gender: "f",
    tags: ["animate", "person", "concrete"],
    inflections: {
      singular: {
        nom: "kobieta",
        gen: "kobiety",
        dat: "kobiecie",
        acc: "kobietE",
        ins: "kobietæ",
        loc: "kobiecie",
      },
      plural: {
        nom: "kobiety",
        gen: "kobiet",
        dat: "kobietom",
        acc: "kobiety",
        ins: "kobietami",
        loc: "kobietach",
      },
    },
  },
  194: {
    lemma: "chłopak",
    gender: "m1",
    tags: ["animate", "person", "concrete"],
    inflections: {
      singular: {
        nom: "chłopak",
        gen: "chłopaka",
        dat: "chłopakowi",
        acc: "chłopaka",
        ins: "chłopakiem",
        loc: "chłopaku",
      },
      plural: {
        nom: ["chłopacy", "chłopaki"],
        gen: "chłopakøw",
        dat: "chłopakom",
        acc: "chłopakøw",
        ins: "chłopakami",
        loc: "chłopakach",
      },
    },
  },
  250: {
    lemma: "cebula",
    gender: "f",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    inflections: {
      singular: {
        nom: "cebula",
        gen: "cebuli",
        dat: "cebuli",
        acc: "cebulE",
        ins: "cebulæ",
        loc: "cebuli",
      },
      plural: {
        nom: "cebule",
        gen: "cebul",
        dat: "cebulom",
        acc: "cebule",
        ins: "cebulami",
        loc: "cebulach",
      },
    },
  },
  471: {
    lemma: "jabłko",
    gender: "n",
    tags: ["inanimate", "edible", "holdable", "concrete"],
    inflections: {
      singular: {
        nom: "jabłko",
        gen: "jabłka",
        dat: "jabłku",
        acc: "jabłko",
        ins: "jabłkiem",
        loc: "jabłku",
      },
      plural: {
        nom: "jabłka",
        gen: "jabłek",
        dat: "jabłkom",
        acc: "jabłka",
        ins: "jabłkami",
        loc: "jabłkach",
      },
    },
  },
  713: {
    lemma: "lustro",
    gender: "n",
    tags: ["inanimate", "holdable", "concrete"],
    inflections: {
      singular: {
        nom: "lustro",
        gen: "lustra",
        dat: "lustru",
        acc: "lustro",
        ins: "lustrem",
        loc: "lustrze",
      },
      plural: {
        nom: "lustra",
        gen: "luster",
        dat: "lustrom",
        acc: "lustra",
        ins: "lustrami",
        loc: "lustrach",
      },
    },
  },
  786: {
    lemma: "majtki",
    gender: "f",
    tags: ["inanimate", "holdable", "concrete", "wearable"],
    inflections: {
      plural: {
        nom: "majtki",
        gen: "majtek",
        dat: "majtkom",
        acc: "majtki",
        ins: "majtkami",
        loc: "majtkach",
      },
    },
  },
};

let adjectiveSet = {};
let adverbSet = {};
let verbSet = {};

let word1 = {
  type: "noun",
  manTags: ["person"],
  optTags: [],
  gcase: ["nom"],
  number: ["singular"],
  gender: ["n"],
};
let word2 = "ma na sobie";
let word3 = {
  type: "noun",
  manTags: ["wearable"],
  optTags: [],
  gcase: ["acc"],
  number: [],
  gender: [],
};

let sentence50array = [word1, word2, word3];

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

let dict = {
  nounSet,
  adjectiveSet,
  adverbSet,
  verbSet,
};

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

function filterWithinObjectByNestedKeys(source, ...requirementArrs) {
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

//We take tags to be potentially multiple in both Source and Spec.
//We take keys to be potentially multiple in Spec, but always singular in Source.

let resultArr = [];
sentence50array.forEach((spec) => {
  if (typeof spec === "string") {
    resultArr.push(spec);
  } else {
    let source = dict[giveSetKey(spec.type)];
    let matches = [];

    matches = filterByTag(source, spec.manTags, true);
    matches = filterByTag(matches, spec.optTags, false);
    matches = filterByKey(matches, spec.gender, "gender");

    let lemmaObj = selectRandom(matches);
    // console.log(lemmaObj)

    try {
      let result = filterWithinObjectByNestedKeys(
        lemmaObj.inflections,
        spec.number,
        spec.gcase
      );
      resultArr.push(result);
    } catch {
      console.log("eerrrroorr");
    }
  }
});

console.log(capitaliseFirst(resultArr.join(" ") + "."));
