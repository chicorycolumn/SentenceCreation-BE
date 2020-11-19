const lfUtils = require("./lemmaFilteringUtils.js");
const scUtils = require("./sentenceCreationUtils.js");
const gpUtils = require("./generalPurposeUtils.js");

exports.fillVerbLemmaObject = (lemmaObj) => {
  if (lemmaObj.defective) {
    return;
  }

  let { past, infinitive } = lemmaObj.inflections;
  //Need to, in other files, allow m1 m2 m3 to all read as m if only m key exists and not others.

  if (lemmaObj.aspect === "imperfective") {
    lemmaObj.inflections.future = {
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

    if (!lemmaObj.inflections.present.impersonal) {
      lemmaObj.inflections.present.impersonal =
        lemmaObj.inflections.present["3per"].singular.m + " " + "się";
    }
  } else if (lemmaObj.aspect === "perfective") {
    if (!lemmaObj.inflections.future.impersonal) {
      lemmaObj.inflections.future.impersonal =
        lemmaObj.inflections.future["3per"].singular.m + " " + "się";
    }
  }

  lemmaObj.inflections.conditional = {
    impersonal: lemmaObj.inflections.past.impersonal + " " + "by",
    "1per": {
      singular: {
        m: past["3per"].singular.m + " " + "bym",
        f: past["3per"].singular.f + " " + "bym",
      },
      plural: {
        virile: past["3per"].plural.virile + " " + "byśmy",
        nonvirile: past["3per"].plural.nonvirile + " " + "byśmy",
      },
    },
    "2per": {
      singular: {
        m: past["3per"].singular.m + " " + "byś",
        f: past["3per"].singular.f + " " + "byś",
      },
      plural: {
        virile: past["3per"].plural.virile + " " + "byście",
        nonvirile: past["3per"].plural.nonvirile + " " + "byście",
      },
    },
    "3per": {
      singular: {
        m: past["3per"].singular.m + " " + "by",
        f: past["3per"].singular.f + " " + "by",
        n: past["3per"].singular.n + " " + "by",
      },
      plural: {
        virile: past["3per"].plural.virile + " " + "by",
        nonvirile: past["3per"].plural.nonvirile + " " + "by",
      },
    },
  };

  ["activeAdjectival", "passiveAdjectival"].forEach((participleKey) => {
    if (lemmaObj.inflections[participleKey]) {
      let allPersons = lemmaObj.inflections[participleKey].allPersons;

      lemmaObj.inflections[participleKey]["1per"] = allPersons;
      lemmaObj.inflections[participleKey]["2per"] = allPersons;
      lemmaObj.inflections[participleKey]["3per"] = allPersons;
    }
  });
};
