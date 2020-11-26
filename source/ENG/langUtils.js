const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const refObj = require("../../utils/referenceObjects.js");

exports.preprocessStructureChunks = (sentenceStructure) => {};

exports.preprocessLemmaObjects = (matches, structureChunk) => {};

exports.addSpecialVerbConjugations = (lemmaObject, currentLanguage) => {
  let { infinitive, v2, v3, thirdPS, gerund } = lemmaObject.inflections;

  const participlesRef = {
    pastParticiple: v3,
    activeAdjectival: gerund,
    passiveAdjectival: v3,
    contemporaryAdverbial: gerund,
    anteriorAdverbial: "having" + " " + v3,
  };

  Object.keys(participlesRef).forEach((key) => {
    let value = participlesRef[key];
    lemmaObject.inflections[key] = value;
  });
};

exports.generateAdhocForms = (structureChunk, lObj, currentLanguage) => {
  console.log("generateAdhocForms fxn was given these arguments", {
    structureChunk,
    lObj,
    currentLanguage,
  });

  if (
    structureChunk.wordtype === "verb" &&
    structureChunk.form.includes("verb")
  ) {
    console.log(77777777777);
    let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;
    let { inflections } = lObj;
    let inflectionChain =
      refObj.lemmaObjectCharacteristics[currentLanguage].inflectionChains.verb;
    let selectedTenseDescription;

    if (
      structureChunk.tenseDescription &&
      structureChunk.tenseDescription.length
    ) {
      selectedTenseDescription = gpUtils.selectRandom(
        structureChunk.tenseDescription
      );
    } else {
      return;
    }

    // console.log(111111);
    // console.log(selectedTenseDescription);
    // console.log(111111);
    if (selectedTenseDescription === "present") {
      selectedTenseDescription = gpUtils.selectRandom([
        "present simple",
        "present continuous",
      ]);
    }
    if (selectedTenseDescription === "past") {
      selectedTenseDescription = gpUtils.selectRandom([
        "past simple",
        "past continuous",
      ]);
    }
    if (selectedTenseDescription === "future") {
      selectedTenseDescription = gpUtils.selectRandom([
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
      tenseDescription: [
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

      if (Array.isArray(structureChunk[key]) && structureChunk[key].length) {
        structureChunk[key] = gpUtils.selectRandom(structureChunk[key]);
      } else {
        structureChunk[key] = gpUtils.selectRandom(value);
      }
    });

    let { person, number } = structureChunk;

    if (selectedTenseDescription === "past simple") {
      return v2;
    }

    if (selectedTenseDescription === "past continuous") {
      return be["past"][person][number] + " " + gerund;
    }

    if (selectedTenseDescription === "past perfect") {
      return have["past"] + " " + v3;
    }

    if (selectedTenseDescription === "present simple") {
      if (person === "3per" && number === "singular") {
        return thirdPS;
      } else {
        return infinitive;
      }
    }

    if (selectedTenseDescription === "present continuous") {
      return be["present"][person][number] + " " + gerund;
    }

    if (selectedTenseDescription === "present perfect") {
      return have["present"][person][number] + " " + v3;
    }

    if (selectedTenseDescription === "future simple") {
      return "will" + " " + infinitive;
    }

    if (selectedTenseDescription === "future simple compound") {
      return (
        be["present"][person][number] + " " + "going to" + " " + infinitive
      );
    }

    if (selectedTenseDescription === "future continuous") {
      return be.future + " " + gerund;
    }

    if (selectedTenseDescription === "future continuous compound") {
      return be["present"][person][number] + " " + "going to be" + " " + gerund;
    }

    if (selectedTenseDescription === "future perfect") {
      return have.future + " " + v3;
    }

    if (
      selectedTenseDescription === "conditional" ||
      selectedTenseDescription === "conditional simple"
    ) {
      return "would" + " " + infinitive;
    }

    if (selectedTenseDescription === "conditional continuous") {
      return be.conditional + " " + gerund;
    }

    if (selectedTenseDescription === "conditional perfect") {
      return have.conditional + " " + v3;
    }

    if (selectedTenseDescription === "imperative") {
      return infinitive;
    }
  }
};
