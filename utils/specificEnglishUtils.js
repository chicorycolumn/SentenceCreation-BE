const lfUtils = require("./lemmaFilteringUtils.js");
const scUtils = require("./sentenceCreationUtils.js");
const gpUtils = require("./generalPurposeUtils.js");

exports.fillInVerbs = (lObj) => {
  let { infinitive, v2, v3, third, gerund } = lObj.inflections;
  let { inflections } = lObj;

  inflections.past = {
    allPersons: {
      allNumbers: v2,
    },
  };

  inflections.present = {
    "1per": { allNumbers: infinitive },
    "2per": { allNumbers: infinitive },
    "3per": { singular: third, plural: infinitive },
  };

  let simpleFuture = "will" + " " + infinitive;

  inflections.future = {
    "1per": {
      singular: ["am going to" + " " + infinitive, simpleFuture],
      plural: ["are going to" + " " + infinitive, simpleFuture],
    },
    "2per": {
      allNumbers: ["are going to" + " " + infinitive, simpleFuture],
    },
    "3per": {
      singular: ["is going to" + " " + infinitive, simpleFuture],
      plural: ["are going to" + " " + infinitive, simpleFuture],
    },
  };

  inflections.pastPerfect = {
    allPersons: { allNumbers: "had" + " " + v3 },
  };

  inflections.presentPerfect = {
    "1per": { allNumbers: "have" + " " + v3 },
    "2per": { allNumbers: "have" + " " + v3 },
    "3per": { singular: "has" + " " + v3, plural: "have" + " " + v3 },
  };

  inflections.pastPerfect = {
    allPersons: { allNumbers: "will have" + " " + v3 },
  };

  inflections.conditional = {
    allNumbers: { allPersons: "would" + " " + infinitive },
  };

  inflections.imperative = infinitive;

  inflections.participle = {
    pastParticiple: "written",
    activeAdjectival: "writing",
    passiveAdjectival: "written",
    contemporaryAdverbial: "writing",
    anteriorAdverbial: "having written",
  };
};
