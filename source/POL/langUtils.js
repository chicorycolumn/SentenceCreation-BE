const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const refObj = require("../../utils/referenceObjects.js");

exports.addSpecificClarifiers = () => {
  //
  //Type 3 Synhomographs: Add clarifier for ambiguous verb participles (Un-PW).
  //Afaics, no such ambiguity in POL verbs.
  //
  //
  //Type 2 Synhomographs: Add clarifier for ambiguous hybridSelector results (If-PW).
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

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "fixed") {
      return;
    }

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
  });
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

exports.preprocessLemmaObjects = (matches, structureChunk) => {
  if (["verb"].includes(structureChunk.wordtype)) {
    matches.forEach((lObj) => exports.fillVerbInflections(lObj));
  }

  if (["adjective"].includes(structureChunk.wordtype)) {
    matches.forEach((lObj) => exports.adjustMasculinityOfLemmaObject(lObj));
  }

  if (["verb", "adjective"].includes(structureChunk.wordtype)) {
    exports.adjustVirilityOfStructureChunk(structureChunk);
  }
};

exports.fillVerbInflections = (lemmaObject) => {
  if (lemmaObject.defective) {
    return;
  }

  if (lemmaObject.complete) {
    return;
  }

  //To imperfective verbs, add  presentimpersonal, conditional, future
  //To  perfective verbs,  add  futureimpersonal,  conditional
  //In both, fill out the activeAdj and passiveAdj if they are there.

  let { inflections, aspect } = lemmaObject;
  let { past } = inflections.verbal;
  let { infinitive } = inflections;

  //So in general, do nothing if the key is filled out already or holds value false.
  //Only fill it out if the key is present and holds value true.

  if (aspect === "imperfective" || lemmaObject["im only"]) {
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

  gpUtils.findKeysInObjectAndExecuteCallback(
    inflections,
    "allSingularGenders",
    (obj) => {
      gpUtils.copyValueOfKey(
        obj,
        "allSingularGenders",
        ["m1", "m2", "m3", "f", "n"],
        true
      );
    }
  );

  gpUtils.findKeysInObjectAndExecuteCallback(
    inflections,
    "allSingularGendersExcludingNeuter",
    (obj) => {
      gpUtils.copyValueOfKey(
        obj,
        "allSingularGendersExcludingNeuter",
        ["m1", "m2", "m3", "f"],
        true
      );
    }
  );

  gpUtils.findKeysInObjectAndExecuteCallback(
    inflections,
    "allPluralGenders",
    (obj) => {
      gpUtils.copyValueOfKey(
        obj,
        "allPluralGenders",
        ["virile", "nonvirile"],
        true
      );
    }
  );

  gpUtils.findKeysInObjectAndExecuteCallback(
    inflections,
    "allPersons",
    (obj) => {
      gpUtils.copyValueOfKey(
        obj,
        "allPersons",
        ["impersonal", "1per", "2per", "3per"],
        true
      );
    }
  );

  gpUtils.findKeysInObjectAndExecuteCallback(
    inflections,
    "allPersonsExceptImpersonal",
    (obj) => {
      gpUtils.copyValueOfKey(
        obj,
        "allPersonsExceptImpersonal",
        ["1per", "2per", "3per"],
        true
      );
    }
  );

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

exports.adjustMasculinityOfLemmaObject = (lemmaObject) => {
  let { inflections } = lemmaObject;

  //Masculinist agenda
  gpUtils.findKeysInObjectAndExecuteCallback(inflections, "m", (obj) => {
    gpUtils.copyValueOfKey(obj, "m", ["m1", "m2", "m3"], true);
  });
};

exports.adjustVirilityOfStructureChunk = (structureChunk) => {
  let { gender, number } = structureChunk;

  if (!number || !number.includes("plural")) {
    return;
  }

  if (!gender || !gender.length) {
    return;
  }

  let newGenderArray = [];
  const pluralGenderRefObj = {
    m1: "virile",
    m2: "nonvirile",
    m3: "nonvirile",
    f: "nonvirile",
    n: "nonvirile",
    virile: "virile",
    nonvirile: "nonvirile",
  };

  if (number.includes("singular")) {
    gender.forEach((genderValue) => {
      newGenderArray.push(genderValue);
    });
  }

  if (number.includes("plural")) {
    gender.forEach((genderValue) => {
      newGenderArray.push(pluralGenderRefObj[genderValue]);
    });
  }

  let result = Array.from(new Set(newGenderArray));

  structureChunk.gender = result;
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
    exports.bulkUpGenderArrayToPreventMasculineOverrepresentation(
      structureChunk.gender
    );
  }
};

exports.bulkUpGenderArrayToPreventMasculineOverrepresentation = (array) => {
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
};
