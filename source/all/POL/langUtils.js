const lfUtils = require("../../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../../utils/objectTraversingUtils.js");
const frUtils = require("../../../utils/formattingResponseUtils.js");
const gpUtils = require("../../../utils/generalPurposeUtils.js");
const uUtils = require("../../../utils/universalUtils.js");
const consol = require("../../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../../utils/reference/referenceObjects.js");
const refFxn = require("../../../utils/reference/referenceFunctions.js");
const allLangUtils = require("../../../utils/allLangUtils.js");

const _isAvailable = (value) => {
  //If true, fill it out.
  //If false, don't fill it out.
  //If any truthy item (which isn't bool true), don't fill it out.
  //If undefined (ie not filled out), then don't fill it out.
  return value === true;
};

exports.balanceGenders = (structureChunk) => {
  if (structureChunk.gender) {
    //genderProportion
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
  if (gpUtils.getWordtypeLObj(selectedLemmaObject) === "pro") {
    // >>>
    // >>> Pronombre: post-prepositional
    // >>>
    if (
      previousOutputUnit &&
      gpUtils.getWordtypeLObj(previousOutputUnit.selectedLemmaObject) === "pre"
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
      // >>> Pronombre: stressed or unstressed
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

  if (gpUtils.getWordtypeLObj(selectedLemmaObject) === "pre") {
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
      selectedWord.protectIfSubsequentStartsWith &&
      selectedWord.protectIfSubsequentStartsWith.some((prefix) => {
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
};

exports.expandLemmaObjects = (matches, stChWordtype, currentLanguage) => {
  if (matches.length && gpUtils.getWordtypeLObj(matches[0]) !== stChWordtype) {
    consol.throw(
      "#ERR wkpu POL:expandLemmaObjects. The wordtypes from stCh and lObjs didn't match."
    );
  }

  if (["ver"].includes(stChWordtype)) {
    matches.forEach((lObj) => exports.fillVerbInflections(lObj));
  } else if (["adj"].includes(stChWordtype)) {
    matches.forEach((lObj) => exports.copyInflectionsFromM1toM2(lObj));
  }

  allLangUtils.expandLemmaObjects(matches, currentLanguage);
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
    gpUtils.getWordtypeStCh(structureChunk) === "ver" &&
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
  if (questionSelectedLemmaObject.aspect === "_imOnly") {
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
    ["imperfective", "_imOnly"].includes(aspect)
    //This is indeed nec to include the impOnly pf lObjs, as im and pf lobjs go through slightly different process here below,
    //and for these purposes, we still need to think of the pf clones of impOnly lobjs as being im, not pf.
  ) {
    if (_isAvailable(inflections.verbal.future)) {
      inflections.verbal.future = {
        impersonal: {
          singular: {
            _SingularGenders: "będzie" + " " + infinitive + " " + "się",
          },
          plural: {
            _PluralGenders: "będzie" + " " + infinitive + " " + "się",
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
    if (_isAvailable(inflections.verbal.present.impersonal.singular)) {
      inflections.verbal.present.impersonal.singular = {
        _SingularGenders:
          inflections.verbal.present["3per"].singular._SingularGenders +
          " " +
          "się",
      };
    }
    if (_isAvailable(inflections.verbal.present.impersonal.plural)) {
      inflections.verbal.present.impersonal.plural = {
        _PluralGenders:
          inflections.verbal.present["3per"].singular._SingularGenders + //Yes, this is meant to use Singular.
          " " +
          "się",
      };
    }
  } else if (aspect === "perfective") {
    if (_isAvailable(inflections.verbal.future.impersonal.singular)) {
      inflections.verbal.future.impersonal.singular = {
        _SingularGenders:
          inflections.verbal.future["3per"].singular._SingularGenders +
          " " +
          "się",
      };
    }
    if (_isAvailable(inflections.verbal.future.impersonal.plural)) {
      inflections.verbal.future.impersonal.plural = {
        _PluralGenders:
          inflections.verbal.future["3per"].singular._SingularGenders + //Yes, this is meant to use Singular.
          " " +
          "się",
      };
    }
  }

  if (typeof inflections.verbal.imperative === "string") {
    let imperativeBase = inflections.verbal.imperative;

    let presentFirstSingular = ["imperfective", "_imOnly"].includes(aspect)
      ? inflections.verbal.present["1per"].singular
          ._SingularGendersExcludingNeuter
      : inflections.verbal.future["1per"].singular
          ._SingularGendersExcludingNeuter;

    let presentThirdSingular = ["imperfective", "_imOnly"].includes(aspect)
      ? inflections.verbal.present["3per"].singular._SingularGenders
      : inflections.verbal.future["3per"].singular._SingularGenders;

    let presentThirdPlural = ["imperfective", "_imOnly"].includes(aspect)
      ? inflections.verbal.present["3per"].plural._PluralGenders
      : inflections.verbal.future["3per"].plural._PluralGenders;

    let filledOutImperatives = {
      "1per": {
        singular: {
          _SingularGendersExcludingNeuter: "niech" + " " + presentFirstSingular,
        },
        plural: {
          _PluralGenders: imperativeBase + "my",
        },
      },
      "2per": {
        singular: {
          _SingularGendersExcludingNeuter: imperativeBase,
        },
        plural: {
          _PluralGenders: imperativeBase + "cie",
        },
      },
      "3per": {
        singular: {
          _SingularGenders: "niech" + " " + presentThirdSingular,
        },
        plural: {
          _PluralGenders: "niech" + " " + presentThirdPlural,
        },
      },
    };

    inflections.verbal.imperative = filledOutImperatives;
  }

  if (_isAvailable(inflections.verbal.conditional)) {
    inflections.verbal.conditional = {
      impersonal: {
        singular: {
          _SingularGenders:
            inflections.verbal.past.impersonal.singular._SingularGenders +
            " " +
            "by",
        },
        plural: {
          _PluralGenders:
            inflections.verbal.past.impersonal.plural._PluralGenders +
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
