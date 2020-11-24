const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const refObj = require("../../utils/referenceObjects.js");

exports.addSpecialVerbConjugations = (lemmaObject, currentLanguage) => {
  let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;

  lObj.inflections.participle = {
    pastParticiple: v3,
    activeAdjectival: gerund,
    passiveAdjectival: v3,
    contemporaryAdverbial: gerund,
    anteriorAdverbial: "having" + " " + v3,
  };
};

exports.generateAndReturnSimpleVerbConjugation = (
  structureChunk,
  lObj,
  currentLanguage
) => {
  let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;
  let { inflections } = lObj;
  let inflectionChain = refObj.inflectionChains[currentLanguage].verb;

  ////////////////////////Alpha note: This needs to be re-specified with regard to actual POL to ENG tense translations.+
  if (structureChunk.tense && structureChunk.tense.length) {
    structureChunk.tense = gpUtils.selectRandom(structureChunk.tense);
  }

  if (structureChunk.tense === "present") {
    structureChunk.tense = gpUtils.selectRandom([
      "present simple",
      "present continuous",
    ]);
  }
  if (structureChunk.tense === "past") {
    structureChunk.tense = gpUtils.selectRandom([
      "past simple",
      "past continuous",
    ]);
  }
  if (structureChunk.tense === "future") {
    structureChunk.tense = gpUtils.selectRandom([
      "future simple",
      "future continuous",
    ]);
  }
  /////////////////////////

  const be = {
    past: {
      "1per": { singular: "was", plural: "were" },
      "2per": { singular: "were", plural: "were" },
      "3per": { singular: "was", plural: "were" },
    },
    present: {
      "1per": { singular: "am", plural: "are" },
      "2per": { singular: "are", plural: "are" },
      "3per": { singular: "is", plural: "are" },
    },
    future: "will be",
    conditional: "would be",
  };
  const have = {
    past: "had",
    present: {
      "1per": { singular: "have", plural: "have" },
      "2per": { singular: "have", plural: "have" },
      "3per": { singular: "has", plural: "have" },
    },
    future: "will have",
    conditional: "would have",
  };

  let ref = {
    person: ["1per", "2per", "3per"],
    number: ["singular", "plural"],
    tense: [
      "past continuous",
      "past simple",
      "past perfect",
      "present simple",
      "present continuous",
      "present perfect",
      "future simple",
      "future continuous",
      "future perfect",
      "conditional",
      "conditional continuous",
      "conditional perfect",
      "imperative",
    ],
  };

  Object.keys(ref).forEach((key) => {
    let value = ref[key];

    if (Array.isArray(structureChunk[key])) {
      structureChunk[key] = gpUtils.selectRandom(structureChunk[key]);
    }

    if (!structureChunk[key]) {
      structureChunk[key] = gpUtils.selectRandom(value);
    }
  });

  let { tense, person, number } = structureChunk;

  if (tense === "past simple") {
    return v2;
  }

  if (tense === "past continuous") {
    return be["past"][person][number] + " " + gerund;
  }

  if (tense === "past perfect") {
    return have["past"] + " " + v3;
  }

  if (tense === "present simple") {
    if (person === "3per" && number === "singular") {
      return thirdPS;
    } else {
      return infinitive;
    }
  }

  if (tense === "present continuous") {
    return be["present"][person][number] + " " + gerund;
  }

  if (tense === "present perfect") {
    return have["present"][person][number] + " " + v3;
  }

  if (tense === "future simple") {
    return [
      "will" + " " + infinitive,
      be["present"][person][number] + " " + "going to" + " " + infinitive,
    ];
  }

  if (tense === "future continuous") {
    return [
      be.future + " " + gerund,
      be["present"][person][number] + " " + "going to be" + " " + gerund,
    ];
  }

  if (tense === "future perfect") {
    return have.future + " " + v3;
  }

  if (tense === "conditional" || tense === "conditional simple") {
    return "would" + " " + infinitive;
  }

  if (tense === "conditional continuous") {
    return be.conditional + " " + gerund;
  }

  if (tense === "conditional perfect") {
    return have.conditional + " " + v3;
  }

  if (tense === "imperative") {
    return infinitive;
  }
};
