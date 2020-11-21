const lfUtils = require("./lemmaFilteringUtils.js");
const scUtils = require("./sentenceCreationUtils.js");
const gpUtils = require("./generalPurposeUtils.js");

//Need to, in other files, allow m1 m2 m3 to all read as m if only m key exists and not others.
exports.fillVerbLemmaObject = (lemmaObj) => {
  if (lemmaObj.defective) {
    return;
  }

  //To imperfective verbs, add  presentimpersonal, conditional, future
  //To  perfective verbs,  add  futureimpersonal,  conditional
  //In both, fill out the activeAdj and passiveAdj if they are there.

  let { inflections, aspect } = lemmaObj;
  let { past } = inflections.verb;
  let { infinitive } = inflections;

  //So in general, if the key is filled out already, don't do anything. And if the key holds value false, don't do anything.

  if (aspect === "imperfective") {
    if (isAvailable(inflections.verb.future)) {
      inflections.verb.future = {
        impersonal: {
          singular: {
            allSingularGenders: "będzie" + " " + infinitive + " " + "się",
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
    if (isAvailable(inflections.verb.present.impersonal.singular)) {
      inflections.verb.present.impersonal.singular = {
        allSingularGenders:
          inflections.verb.present["3per"].singular.m + " " + "się",
      };
    }
  } else if (aspect === "perfective") {
    if (isAvailable(inflections.verb.future.impersonal.singular)) {
      inflections.verb.future.impersonal.singular = {
        allSingularGenders:
          inflections.verb.future["3per"].singular.m + " " + "się",
      };
    }
  }

  if (isAvailable(inflections.verb.conditional)) {
    inflections.verb.conditional = {
      impersonal: {
        singular: {
          allSingularGenders:
            inflections.verb.past.impersonal.singular.allSingularGenders +
            " " +
            "by",
        },
        plural: {
          allPluralGenders:
            inflections.verb.past.impersonal.plural.allPluralGenders +
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

  gpUtils.findKeysInObjectAndExecuteCallback(inflections, "m", (obj) => {
    gpUtils.copyValueOfKey(obj, "m", ["m1", "m2", "m3"], true);
  });

  // ["activeAdjectival", "passiveAdjectival"].forEach((participleKey) => {
  //   if (inflections.participle[participleKey]) {
  //     let allPersons = inflections.participle[participleKey].allPersons;

  //     inflections.participle[participleKey]["impersonal"] = allPersons;
  //     inflections.participle[participleKey]["1per"] = allPersons;
  //     inflections.participle[participleKey]["2per"] = allPersons;
  //     inflections.participle[participleKey]["3per"] = allPersons;

  //     delete inflections.participle[participleKey].allPersons;
  //   }
  // });

  function isAvailable(value) {
    //If true, fill it out.
    //If false, don't fill it out.
    //If any truthy item (which isn't bool true), don't fill it out.
    //If undefined (ie not filled out), then don't fill it out.

    return value === true;

    // if (value === true) {
    //   return true;
    // }
    // if (value === false) {
    //   return false;
    // }
    // if (value) {
    //   return false;
    // }
  }
};

exports.adjustVirility = (structureChunk) => {
  let { gender, number } = structureChunk;

  if (
    gender &&
    gender.length === 1 &&
    number &&
    number.length === 1 &&
    number[0] === "plural"
  ) {
    const pluralGenderRefObj = {
      m1: "virile",
      m2: "nonvirile",
      m3: "nonvirile",
      f: "nonvirile",
      n: "nonvirile",
      virile: "virile",
      nonvirile: "nonvirile",
    };

    let pluralGender = pluralGenderRefObj[structureChunk.gender[0]];

    structureChunk.gender = [pluralGender];
  }
};

exports.adjustVirilityDUPLICATE = (structureChunk) => {
  const virilityRefObj = {
    m1: "virile",
    m2: "nonvirile",
    m3: "nonvirile",
    f: "nonvirile",
    n: "nonvirile",
    virile: "virile",
    nonvirile: "nonvirile",
  };

  if (structureChunk.number[0] === "plural" && structureChunk.gender[0]) {
    structureChunk.gender = [virilityRefObj[structureChunk.gender]];
  }
};
