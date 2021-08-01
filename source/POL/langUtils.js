const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");
const refFxn = require("../../utils/reference/referenceFunctions.js");
const allLangUtils = require("../../utils/allLangUtils.js");

exports.balanceGenders = (structureChunk) => {
  if (structureChunk.gender) {
    if (
      ["m1", "m2", "m3", "f"].every((mascGen) =>
        structureChunk.gender.includes(mascGen)
      )
    ) {
      structureChunk.gender.push("f", "f");
    }
  }
};

exports.selectWordVersions = (
  structureChunk,
  subsequentOutputUnit,
  selectedWord,
  selectedWordsArr,
  firstStageAnnotationsObj,
  selectedLemmaObject,
  previousOutputUnit,
  multipleMode
) => {
  if (gpUtils.getWordtypeLObj(selectedLemmaObject) === "pronoun") {
    // >>>
    // >>> Pronoun: post-prepositional
    // >>>
    if (
      previousOutputUnit &&
      gpUtils.getWordtypeLObj(previousOutputUnit.selectedLemmaObject) ===
        "preposition"
    ) {
      frUtils.pushSelectedWordToArray(
        "postPreposition",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    } else {
      // >>>
      // >>> Pronoun: stressed or unstressed
      // >>>

      let combinedSelectedWordsArr = multipleMode
        ? [...selectedWord.unstressed, ...selectedWord.stressed]
        : [...selectedWord.unstressed];

      frUtils.pushSelectedWordToArray(
        "array",
        combinedSelectedWordsArr,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    }
  }

  if (gpUtils.getWordtypeLObj(selectedLemmaObject) === "preposition") {
    if (!subsequentOutputUnit) {
      consol.throw(
        "mcob selectWordVersions Shouldn't there be an outputUnit subsequent to this POL preposition?"
      );
    }

    consol.log(
      "pxlz selectWordVersions test subsequentOutputUnit.selectedWord for following prefixes.",
      {
        "subsequentOutputUnit.selectedWord": subsequentOutputUnit.selectedWord,
      }
    );

    if (
      selectedWord.protectIfSubsequentStartsWithTheseRegexes &&
      selectedWord.protectIfSubsequentStartsWithTheseRegexes.some((prefix) => {
        consol.log("spez selectWordVersions", { prefix });

        let prefixRegex = RegExp("^" + prefix);
        return prefixRegex.test(subsequentOutputUnit.selectedWord);
      })
    ) {
      frUtils.pushSelectedWordToArray(
        "protective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    } else {
      frUtils.pushSelectedWordToArray(
        "nonprotective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    }
  }

  frUtils.pushSelectedWordToArray(
    "normal",
    selectedWord,
    selectedWordsArr,
    firstStageAnnotationsObj,
    structureChunk
  );
};

exports.preprocessStructureChunks = (structureChunk) => {
  const currentLanguage = "POL";

  if (refFxn.isTraitCompatibleStCh("gender", structureChunk, currentLanguage)) {
    if (!structureChunk.gender || !structureChunk.gender.length) {
      //Fill out if blank.
      structureChunk.gender =
        refObj.structureChunkTraits[currentLanguage][
          "gender"
        ].possibleTraitValues.slice(0);
    } else {
      //Masculinist agenda
      let adjustedGenderArray = [];
      structureChunk.gender.forEach((gender) => {
        if (gender === "m") {
          adjustedGenderArray.push("m1", "m2", "m3");
        } else {
          adjustedGenderArray.push(gender);
        }
      });

      structureChunk.gender = Array.from(new Set(adjustedGenderArray));
    }
  }
};

exports.preprocessLemmaObjectsMajor = (
  matches,
  structureChunk,
  adjustLemmaObjectsOnly,
  currentLanguage
) => {
  if (!matches.length) {
    return;
  }

  if (
    gpUtils.getWordtypeLObj(matches[0]) !==
    gpUtils.getWordtypeStCh(structureChunk)
  ) {
    consol.throw(
      "#ERR wkpu POL:preprocessLemmaObjectsMajor. The wordtypes from stCh and lObjs didn't match."
    );
  }

  if (["verb"].includes(gpUtils.getWordtypeStCh(structureChunk))) {
    matches.forEach((lObj) => exports.fillVerbInflections(lObj));
  }

  if (["adjective"].includes(gpUtils.getWordtypeStCh(structureChunk))) {
    matches.forEach((lObj) => exports.copyInflectionsFromM1toM2(lObj));
  }

  allLangUtils.convertmetaTraitValues(matches, "POL", "lObj");
};

exports.preprocessLemmaObjectsMinor = (matches) => {
  matches.forEach((lObj) => {
    exports.adjustImperfectiveOnly(matches, lObj);
  });
};

exports.adjustImperfectiveOnly = (matches, lObj) => {
  if (lObj.imperfectiveOnly_unadjusted && lObj.aspect === "imperfective") {
    lObj.imperfectiveOnly = true;
    delete lObj.imperfectiveOnly_unadjusted;

    let adjustedLemmaObject = uUtils.copyWithoutReference(lObj);
    adjustedLemmaObject.aspect = "perfective";

    let newIdArr = lObj.id.split("-");
    newIdArr[3] = "pf";
    adjustedLemmaObject.id = newIdArr.join("-");

    matches.push(adjustedLemmaObject);
  }
};

exports.addLanguageParticularClarifiers = () => {
  //
  //Type 6 Synhomographs: Add clarifier for ambiguous verb participles (Un-PW).
  //Afaics, no such ambiguity in POL verbs.
  //
  //
  //Type 5 Synhomographs: Add clarifier for ambiguous hybridSelector results (If-PW).
  //Afaics, no such ambiguity in POL verbs,
  //ie there are no tense+aspect combinations that homographs of others.
  //
};

exports.adjustStructureChunksInIfPW = (structureChunk) => {
  if (
    gpUtils.getWordtypeStCh(structureChunk) === "verb" &&
    structureChunk.tenseDescription &&
    structureChunk.tenseDescription.length
  ) {
    return exports.adjustTenseDescriptions(structureChunk);
  }
};

exports.adjustTenseDescriptionsBeforeTranslating = (
  tenseDescriptions,
  questionSelectedLemmaObject
) => {
  if (questionSelectedLemmaObject.imperfectiveOnly) {
    const imperfectiveOnlyConversionRef = {
      "past im": "past pf",
      "past pf": "past im",

      "present im": null,

      "future im": "future pf",
      "future pf": "future im",
    };

    tenseDescriptions.forEach((tenseDesc) => {
      let convertedTenseDesc = imperfectiveOnlyConversionRef[tenseDesc];

      if (convertedTenseDesc) {
        tenseDescriptions.push(convertedTenseDesc);
      }
    });
  }

  tenseDescriptions = Array.from(new Set(tenseDescriptions));
};

exports.adjustTenseDescriptions = (structureChunk) => {
  const aspectReference = { im: "imperfective", pf: "perfective" };

  let resultArr = [];

  structureChunk.tenseDescription.forEach((tenseDesc, index) => {
    let structureChunkCopy = uUtils.copyWithoutReference(structureChunk);

    let tenseDescArr = [tenseDesc];

    if (tenseDesc.slice(0, 4) === "cond" && /\d/.test(tenseDesc[4])) {
      //cond0, cond1, cond2, cond3
      let [rank, clause] = tenseDesc.split(" ");

      const conditionalsRef = {
        cond0: {
          condition: ["future pf"],
          outcome: ["future pf"],
        },
        cond1: {
          condition: ["future im", "future pf"],
          outcome: ["future pf"],
        },
        cond2: {
          //gdyby* + past im*, cond pf/im
          condition: [],
          outcome: [],
        },
        cond3: {
          //gdyby* + past im*, cond pf/im
          condition: [],
          outcome: [],
        },
      };

      tenseDescArr = conditionalsRef[rank][clause].slice(0);
    }

    tenseDescArr.forEach((tenseDesc) => {
      let [tense, aspect] = tenseDesc.split(" ");
      structureChunkCopy.tense = [tense];
      structureChunkCopy.aspect = [aspectReference[aspect]];
      structureChunkCopy.tenseDescription = [tenseDesc];
      resultArr.push(structureChunkCopy);
    });
  });

  return resultArr;
};

exports.formatGenderTraitValueAsPerson = (genderTraitValue) => {
  return genderTraitValue === "m" ? "m1" : genderTraitValue;
  // return {
  //   m: ["m1"],
  //   f: ["f"],
  //   n: ["n"],
  //   nonvirile: ["nonvirile"],
  //   virile: ["virile"],
  // }[traitValue];
};

exports.formatTraitValue = (traitKey, traitValue, note) => {
  if (traitKey === "gender") {
    if (note === "plural") {
      return refObj.virilityConversionRef["POL"][note][traitValue];
    }

    if (note === "person") {
      return exports.formatGenderTraitValueAsPerson(traitValue);
    }
  }

  return [traitValue];
};

exports.fillVerbInflections = (lemmaObject) => {
  if (lemmaObject.complete) {
    consol.log(
      "zzfm POL fillVerbInflections fxn will do nothing, as '" +
        lemmaObject.lemma +
        "' lObj is marked as COMPLETE."
    );
    return;
  }

  //To imperfective verbs, add   presentimpersonal,  conditional,  future
  //To perfective verbs,   add   futureimpersonal,   conditional
  //In both, fill out activeAdj and passiveAdj if they are there.

  let { inflections, aspect } = lemmaObject;
  let { past } = inflections.verbal;
  let { infinitive } = inflections;

  //In general, do nothing if the key is filled out already or holds value false.
  //Only fill it out if the key is present and holds value true.

  if (
    aspect === "imperfective" ||
    lemmaObject.imperfectiveOnly
    //This is indeed nec to include the impOnly pf lObjs, as im and pf lobjs go through slightly different process here below,
    //and for these purposes, we still need to think of the pf clones of impOnly lobjs as being im, not pf.
  ) {
    if (isAvailable(inflections.verbal.future)) {
      inflections.verbal.future = {
        impersonal: {
          singular: {
            allSingularGenders: "będzie" + " " + infinitive + " " + "się",
          },
          plural: {
            allPluralGenders: "będzie" + " " + infinitive + " " + "się",
          },
        },
        "1per": {
          singular: {
            m: gpUtils.terminusObjectNormalArray([
              "będę" + " " + past["3per"].singular.m,
              "będę" + " " + infinitive,
            ]),
            f: gpUtils.terminusObjectNormalArray([
              "będę" + " " + past["3per"].singular.f,
              "będę" + " " + infinitive,
            ]),
          },
          plural: {
            virile: gpUtils.terminusObjectNormalArray([
              "będziemy" + " " + past["3per"].plural.virile,
              "będziemy" + " " + infinitive,
            ]),
            nonvirile: gpUtils.terminusObjectNormalArray([
              "będziemy" + " " + past["3per"].plural.nonvirile,
              "będziemy" + " " + infinitive,
            ]),
          },
        },
        "2per": {
          singular: {
            m: gpUtils.terminusObjectNormalArray([
              "będziesz" + " " + past["3per"].singular.m,
              "będziesz" + " " + infinitive,
            ]),
            f: gpUtils.terminusObjectNormalArray([
              "będziesz" + " " + past["3per"].singular.f,
              "będziesz" + " " + infinitive,
            ]),
          },
          plural: {
            virile: gpUtils.terminusObjectNormalArray([
              "będziecie" + " " + past["3per"].plural.virile,
              "będziecie" + " " + infinitive,
            ]),
            nonvirile: gpUtils.terminusObjectNormalArray([
              "będziecie" + " " + past["3per"].plural.nonvirile,
              "będziecie" + " " + infinitive,
            ]),
          },
        },
        "3per": {
          singular: {
            m: gpUtils.terminusObjectNormalArray([
              "będzie" + " " + past["3per"].singular.m,
              "będzie" + " " + infinitive,
            ]),
            f: gpUtils.terminusObjectNormalArray([
              "będzie" + " " + past["3per"].singular.f,
              "będzie" + " " + infinitive,
            ]),
            n: gpUtils.terminusObjectNormalArray([
              "będzie" + " " + past["3per"].singular.n,
              "będzie" + " " + infinitive,
            ]),
          },
          plural: {
            virile: gpUtils.terminusObjectNormalArray([
              "będą" + " " + past["3per"].plural.virile,
              "będą" + " " + infinitive,
            ]),
            nonvirile: gpUtils.terminusObjectNormalArray([
              "będą" + " " + past["3per"].plural.nonvirile,
              "będą" + " " + infinitive,
            ]),
          },
        },
      };
    }
    if (isAvailable(inflections.verbal.present.impersonal.singular)) {
      inflections.verbal.present.impersonal.singular = {
        allSingularGenders:
          inflections.verbal.present["3per"].singular.allSingularGenders +
          " " +
          "się",
      };
    }
    if (isAvailable(inflections.verbal.present.impersonal.plural)) {
      inflections.verbal.present.impersonal.plural = {
        allPluralGenders:
          inflections.verbal.present["3per"].singular.allSingularGenders + //Yes, this is meant to use Singular.
          " " +
          "się",
      };
    }
  } else if (aspect === "perfective") {
    if (isAvailable(inflections.verbal.future.impersonal.singular)) {
      inflections.verbal.future.impersonal.singular = {
        allSingularGenders:
          inflections.verbal.future["3per"].singular.allSingularGenders +
          " " +
          "się",
      };
    }
    if (isAvailable(inflections.verbal.future.impersonal.plural)) {
      inflections.verbal.future.impersonal.plural = {
        allPluralGenders:
          inflections.verbal.future["3per"].singular.allSingularGenders + //Yes, this is meant to use Singular.
          " " +
          "się",
      };
    }
  }

  if (typeof inflections.verbal.imperative === "string") {
    let imperativeBase = inflections.verbal.imperative;

    let presentFirstSingular =
      aspect === "imperfective" || lemmaObject.imperfectiveOnly
        ? inflections.verbal.present["1per"].singular
            .allSingularGendersExcludingNeuter
        : inflections.verbal.future["1per"].singular
            .allSingularGendersExcludingNeuter;

    let presentThirdSingular =
      aspect === "imperfective" || lemmaObject.imperfectiveOnly
        ? inflections.verbal.present["3per"].singular.allSingularGenders
        : inflections.verbal.future["3per"].singular.allSingularGenders;

    let presentThirdPlural =
      aspect === "imperfective" || lemmaObject.imperfectiveOnly
        ? inflections.verbal.present["3per"].plural.allPluralGenders
        : inflections.verbal.future["3per"].plural.allPluralGenders;

    let filledOutImperatives = {
      "1per": {
        singular: {
          allSingularGendersExcludingNeuter:
            "niech" + " " + presentFirstSingular,
        },
        plural: {
          allPluralGenders: imperativeBase + "my",
        },
      },
      "2per": {
        singular: {
          allSingularGendersExcludingNeuter: imperativeBase,
        },
        plural: {
          allPluralGenders: imperativeBase + "cie",
        },
      },
      "3per": {
        singular: {
          allSingularGenders: "niech" + " " + presentThirdSingular,
        },
        plural: {
          allPluralGenders: "niech" + " " + presentThirdPlural,
        },
      },
    };

    inflections.verbal.imperative = filledOutImperatives;
  }

  if (isAvailable(inflections.verbal.conditional)) {
    inflections.verbal.conditional = {
      impersonal: {
        singular: {
          allSingularGenders:
            inflections.verbal.past.impersonal.singular.allSingularGenders +
            " " +
            "by",
        },
        plural: {
          allPluralGenders:
            inflections.verbal.past.impersonal.plural.allPluralGenders +
            " " +
            "by",
        },
      },
      "1per": {
        singular: {
          m: past["3per"].singular.m + "bym",
          f: past["3per"].singular.f + "bym",
        },
        plural: {
          virile: past["3per"].plural.virile + "byśmy",
          nonvirile: past["3per"].plural.nonvirile + "byśmy",
        },
      },
      "2per": {
        singular: {
          m: past["3per"].singular.m + "byś",
          f: past["3per"].singular.f + "byś",
        },
        plural: {
          virile: past["3per"].plural.virile + "byście",
          nonvirile: past["3per"].plural.nonvirile + "byście",
        },
      },
      "3per": {
        singular: {
          m: past["3per"].singular.m + "by",
          f: past["3per"].singular.f + "by",
          n: past["3per"].singular.n + "by",
        },
        plural: {
          virile: past["3per"].plural.virile + "by",
          nonvirile: past["3per"].plural.nonvirile + "by",
        },
      },
    };
  }

  // Masculinist agenda
  uUtils.findKeysInObjectAndExecuteCallback(inflections, "m", (obj) => {
    uUtils.copyValueOfKey(obj, "m", ["m1", "m2", "m3"], true);
  });

  function isAvailable(value) {
    //If true, fill it out.
    //If false, don't fill it out.
    //If any truthy item (which isn't bool true), don't fill it out.
    //If undefined (ie not filled out), then don't fill it out.
    return value === true;
  }
};

exports.copyInflectionsFromM1toM2 = (lemmaObject) => {
  let { inflections } = lemmaObject;

  //Masculinist agenda
  uUtils.findKeysInObjectAndExecuteCallback(inflections, "m1", (obj) => {
    uUtils.copyValueOfKey(obj, "m1", ["m2"], false);
  });
};

exports.filterDownClarifiersSpecialComparisonCallback = (item1, item2) => {
  let specialVirilityRef = {
    virile: ["m", "m1", "f", "n"],
    nonvirile: ["m2", "m3", "f", "n"],
  };

  return (
    (Object.keys(specialVirilityRef).includes(item1) &&
      specialVirilityRef[item1].includes(item2)) ||
    (Object.keys(specialVirilityRef).includes(item2) &&
      specialVirilityRef[item2].includes(item1))
  );
};
