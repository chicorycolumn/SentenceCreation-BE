const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const refObj = require("../../utils/referenceObjects.js");
const allLangUtils = require("../../utils/allLangUtils.js");

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  console.log("[1;35m " + "POL preprocessStructureChunks-------------------" + "[0m");

  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "fixed") {
      return;
    }

    console.log("At first the structureChunk is", structureChunk);

    if (
      //If gender is an appropriate feature of this wordtype.
      refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
        structureChunk.wordtype
      ].includes("gender")
    ) {
      if (!structureChunk.gender || !structureChunk.gender.length) {
        //Fill out if blank.
        structureChunk.gender = [
          "m1",
          "m2",
          "m3",
          "f",
          "n",
          "virile",
          "nonvirile",
        ];
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

    console.log("Finally the structureChunk is", structureChunk);
  });

  console.log("[1;35m " + "/POL preprocessStructureChunks" + "[0m");
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
    gpUtils.getWordtypeFromLemmaObject(matches[0]) !== structureChunk.wordtype
  ) {
    throw "#ERR ----------> POL preprocessLemmaObjectsMajor fxn, the wordtypes from stCh and lObjs didn't match.";
  }

  if (["verb"].includes(structureChunk.wordtype)) {
    matches.forEach((lObj) => exports.fillVerbInflections(lObj));
  }

  if (["adjective"].includes(structureChunk.wordtype)) {
    matches.forEach((lObj) => exports.copyInflectionsFromM1toM2(lObj));
  }

  allLangUtils.convertMetaFeatures(matches, "POL", "lObj");
  // allLangUtils.preprocessLemmaObjects(matches, "POL");

  if (!adjustLemmaObjectsOnly) {
    if (["verb", "adjective"].includes(structureChunk.wordtype)) {
      allLangUtils.adjustVirilityOfStructureChunk(
        currentLanguage,
        structureChunk
      );
    }
  }
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

    let adjustedLemmaObject = gpUtils.copyWithoutReference(lObj);
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
    (structureChunk.wordtype === "verb",
    structureChunk.tenseDescription && structureChunk.tenseDescription.length)
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
    let structureChunkCopy = gpUtils.copyWithoutReference(structureChunk);

    let tenseDescArr = [tenseDesc];

    if (tenseDesc.slice(0, 4) === "cond" && /\d/.test(tenseDesc[4])) {
      //cond0, cond1, cond2, cond3
      let [key, clause] = tenseDesc.split(" ");

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

      tenseDescArr = conditionalsRef[key][clause].slice(0);
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

exports.formatFeatureValue = (featureKey, featureValue, note) => {
  const pluralVirilityAndSingularConversionRef =
    refObj.pluralVirilityAndSingularConversionRef["POL"];

  const shortHandGenderRef = {
    m: ["m1"],
    f: ["f"],
    n: ["n"],
    nonvirile: ["nonvirile"],
    virile: ["virile"],
  };

  if (featureKey === "gender") {
    if (note === "plural") {
      // console.log(
      //   "POL:formatFeatureValue returns pluralVirilityAndSingularConversionRef[note][featureValue] as ",
      //   pluralVirilityAndSingularConversionRef[note][featureValue]
      // );
      return pluralVirilityAndSingularConversionRef[note][featureValue];
    } else {
      if (note === "person") {
        // console.log(
        //   "POL:formatFeatureValue returns shortHandGenderRef[featureValue] as ",
        //   shortHandGenderRef[featureValue]
        // );
        return shortHandGenderRef[featureValue];
      }
    }
  }
  // console.log("POL:formatFeatureValue returns featureValue as ", featureValue);
  return [featureValue];
};

exports.fillVerbInflections = (lemmaObject) => {
  if (lemmaObject.complete) {
    console.log(
      "fillVerbInflections fxn will do nothing, as '" +
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
            m: [
              "będę" + " " + past["3per"].singular.m,
              "będę" + " " + infinitive,
            ],
            f: [
              "będę" + " " + past["3per"].singular.f,
              "będę" + " " + infinitive,
            ],
          },
          plural: {
            virile: [
              "będziemy" + " " + past["3per"].plural.virile,
              "będziemy" + " " + infinitive,
            ],
            nonvirile: [
              "będziemy" + " " + past["3per"].plural.nonvirile,
              "będziemy" + " " + infinitive,
            ],
          },
        },
        "2per": {
          singular: {
            m: [
              "będziesz" + " " + past["3per"].singular.m,
              "będziesz" + " " + infinitive,
            ],
            f: [
              "będziesz" + " " + past["3per"].singular.f,
              "będziesz" + " " + infinitive,
            ],
          },
          plural: {
            virile: [
              "będziecie" + " " + past["3per"].plural.virile,
              "będziecie" + " " + infinitive,
            ],
            nonvirile: [
              "będziecie" + " " + past["3per"].plural.nonvirile,
              "będziecie" + " " + infinitive,
            ],
          },
        },
        "3per": {
          singular: {
            m: [
              "będzie" + " " + past["3per"].singular.m,
              "będzie" + " " + infinitive,
            ],
            f: [
              "będzie" + " " + past["3per"].singular.f,
              "będzie" + " " + infinitive,
            ],
            n: [
              "będzie" + " " + past["3per"].singular.n,
              "będzie" + " " + infinitive,
            ],
          },
          plural: {
            virile: [
              "będą" + " " + past["3per"].plural.virile,
              "będą" + " " + infinitive,
            ],
            nonvirile: [
              "będą" + " " + past["3per"].plural.nonvirile,
              "będą" + " " + infinitive,
            ],
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
  gpUtils.findKeysInObjectAndExecuteCallback(inflections, "m", (obj) => {
    gpUtils.copyValueOfKey(obj, "m", ["m1", "m2", "m3"], true);
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
  gpUtils.findKeysInObjectAndExecuteCallback(inflections, "m1", (obj) => {
    gpUtils.copyValueOfKey(obj, "m1", ["m2"], false);
  });
};

exports.preventMasculineOverrepresentation = (
  structureChunk,
  currentLanguage
) => {
  if (
    structureChunk.gender ||
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ].includes("gender")
  ) {
    bulkUpGenderArrayToPreventMasculineOverrepresentation(
      structureChunk.gender
    );
  }

  function bulkUpGenderArrayToPreventMasculineOverrepresentation(array) {
    if (!array) {
      return;
    }

    const masculineSubgenders = ["m1", "m2", "m3"];

    if (masculineSubgenders.every((subgender) => array.includes(subgender))) {
      array.forEach((gender) => {
        if (!masculineSubgenders.includes(gender)) {
          array.push(gender);
          array.push(gender);
        }
      });
      console.log(
        "Hey! To prevent Masculinist Agenda: Overrepresentation, I adjusted the array to this:",
        array
      );
    }
  }
};
