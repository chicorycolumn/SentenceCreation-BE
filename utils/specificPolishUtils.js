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

  let { past } = lemmaObj.inflections.verb;
  let { infinitive } = lemmaObj.inflections;

  //So in general, if the key is filled out already, don't do anything. And if the key holds value false, don't do anything.

  if (lemmaObj.aspect === "imperfective") {
    if (isAvailable(lemmaObj.inflections.verb.future)) {
      lemmaObj.inflections.verb.future = {
        impersonal: "będzie" + " " + infinitive + " " + "się",
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
    if (isAvailable(lemmaObj.inflections.verb.present.impersonal)) {
      lemmaObj.inflections.verb.present.impersonal =
        lemmaObj.inflections.verb.present["3per"].singular.m + " " + "się";
    }
  } else if (lemmaObj.aspect === "perfective") {
    if (isAvailable(lemmaObj.inflections.verb.future.impersonal)) {
      lemmaObj.inflections.verb.future.impersonal =
        lemmaObj.inflections.verb.future["3per"].singular.m + " " + "się";
    }
  }

  if (isAvailable(lemmaObj.inflections.verb.conditional)) {
    lemmaObj.inflections.verb.conditional = {
      impersonal: lemmaObj.inflections.verb.past.impersonal + " " + "by",
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

  ["activeAdjectival", "passiveAdjectival"].forEach((participleKey) => {
    if (lemmaObj.inflections.participle[participleKey]) {
      let allPersons =
        lemmaObj.inflections.participle[participleKey].allPersons;

      lemmaObj.inflections.participle[participleKey]["1per"] = allPersons;
      lemmaObj.inflections.participle[participleKey]["2per"] = allPersons;
      lemmaObj.inflections.participle[participleKey]["3per"] = allPersons;

      delete lemmaObj.inflections.participle[participleKey].allPersons;
    }
  });

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
