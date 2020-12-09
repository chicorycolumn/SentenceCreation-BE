const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const refObj = require("../../utils/referenceObjects.js");
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
let inflectorRef = {
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
  if (
    structureChunk.wordtype === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    //Generating ad hocs forms for tenseDescription ENG.
    if (
      !structureChunk.tenseDescription ||
      !structureChunk.tenseDescription.length
    ) {
      return;
    }

    //if lObj.complete, then...
    //or maybe this should be "irregular"
    //specifically this is lObj `be` which has different 1per singular and 2per singular forms in present and past.

    let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;
    let { inflections } = lObj;
    let inflectionChain =
      refObj.lemmaObjectFeatures[currentLanguage].inflectionChains.verb;
    let selectedTenseDescription;

    let resArr = [];
    let tenseDescriptionArr = structureChunk.tenseDescription.slice(0);

    Object.keys(inflectorRef).forEach((key) => {
      let value = inflectorRef[key];

      //selectRaandom if there is NO value to an inflector key. So this only applies when ENG is question language.
      //This won't be used when ENG is answer language.
      if (!Array.isArray(structureChunk[key]) || !structureChunk[key].length) {
        structureChunk[key] = value.slice(0);
      }
    });

    tenseDescriptionArr.forEach((selectedTenseDescription) => {
      if (selectedTenseDescription === "present") {
        selectedTenseDescription = "present simple";
        tenseDescriptionArr.push("present continuous");
      }
      if (selectedTenseDescription === "past") {
        selectedTenseDescription = "past simple";
        tenseDescriptionArr.push("past continuous");
      }
      if (selectedTenseDescription === "future") {
        selectedTenseDescription = "future simple";
        tenseDescriptionArr.push("future continuous");
      }
    });

    structureChunk.person.forEach((person) => {
      structureChunk.number.forEach((number) => {
        tenseDescriptionArr.forEach((selectedTenseDescription) => {
          if (selectedTenseDescription === "past simple") {
            resArr.push(v2);
          }

          if (selectedTenseDescription === "past continuous") {
            resArr.push(be["past"][person][number] + " " + gerund);
          }

          if (selectedTenseDescription === "past perfect") {
            resArr.push(have["past"] + " " + v3);
          }

          if (selectedTenseDescription === "present simple") {
            if (person === "3per" && number === "singular") {
              resArr.push(thirdPS);
            } else {
              resArr.push(infinitive);
            }
          }

          if (selectedTenseDescription === "present continuous") {
            resArr.push(be["present"][person][number] + " " + gerund);
          }

          if (selectedTenseDescription === "present perfect") {
            resArr.push(have["present"][person][number] + " " + v3);
          }

          if (selectedTenseDescription === "future simple") {
            resArr.push("will" + " " + infinitive);
          }

          if (selectedTenseDescription === "future simple compound") {
            resArr.push(
              be["present"][person][number] +
                " " +
                "going to" +
                " " +
                infinitive
            );
          }

          if (selectedTenseDescription === "future continuous") {
            resArr.push(be.future + " " + gerund);
          }

          if (selectedTenseDescription === "future continuous compound") {
            resArr.push(
              be["present"][person][number] + " " + "going to be" + " " + gerund
            );
          }

          if (selectedTenseDescription === "future perfect") {
            resArr.push(have.future + " " + v3);
          }

          if (
            selectedTenseDescription === "conditional" ||
            selectedTenseDescription === "conditional simple"
          ) {
            resArr.push("would" + " " + infinitive);
          }

          if (selectedTenseDescription === "conditional continuous") {
            resArr.push(be.conditional + " " + gerund);
          }

          if (selectedTenseDescription === "conditional perfect") {
            resArr.push(have.conditional + " " + v3);
          }

          if (selectedTenseDescription === "imperative") {
            resArr.push(infinitive);
          }
        });
      });
    });
    return resArr;
  }
};
