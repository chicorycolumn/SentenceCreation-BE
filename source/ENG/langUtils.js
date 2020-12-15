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

exports.adjustTenseDescriptions = () => {};

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

    //Betaman say:
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

    function addToResArr(
      adhocLabel,
      adhocValue,
      selectedWordArr,
      structureChunk
    ) {
      let structureChunkCopy = gpUtils.copyWithoutReference(structureChunk);

      lfUtils.updateStructureChunkByAdhocOnly(
        structureChunkCopy,
        currentLanguage,
        adhocLabel,
        adhocValue
      );

      let resObj = {
        selectedTenseDescription,
        selectedWordArr,
        structureChunkUpdated: structureChunkCopy,
      };

      resArr.push(resObj);
    }

    structureChunk.person.forEach((person) => {
      structureChunk.number.forEach((number) => {
        tenseDescriptionArr.forEach((selectedTenseDescription) => {
          if (selectedTenseDescription === "past simple") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [v2],
              structureChunk
            );
          }

          if (selectedTenseDescription === "past continuous") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [be["past"][person][number] + " " + gerund],
              structureChunk
            );
          }

          if (selectedTenseDescription === "past perfect") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [have["past"] + " " + v3],
              structureChunk
            );
          }

          if (selectedTenseDescription === "present simple") {
            if (person === "3per" && number === "singular") {
              addToResArr(
                "tenseDescription",
                selectedTenseDescription,
                [thirdPS],
                structureChunk
              );
            } else {
              addToResArr(
                "tenseDescription",
                selectedTenseDescription,
                [infinitive],
                structureChunk
              );
            }
          }

          if (selectedTenseDescription === "present continuous") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [be["present"][person][number] + " " + gerund],
              structureChunk
            );
          }

          if (selectedTenseDescription === "present perfect") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [have["present"][person][number] + " " + v3],
              structureChunk
            );
          }

          if (selectedTenseDescription === "future simple") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              ["will" + " " + infinitive],
              structureChunk
            );
          }

          if (selectedTenseDescription === "future simple compound") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [
                be["present"][person][number] +
                  " " +
                  "going to" +
                  " " +
                  infinitive,
              ],
              structureChunk
            );
          }

          if (selectedTenseDescription === "future continuous") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [be.future + " " + gerund],
              structureChunk
            );
          }

          if (selectedTenseDescription === "future continuous compound") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [
                be["present"][person][number] +
                  " " +
                  "going to be" +
                  " " +
                  gerund,
              ],
              structureChunk
            );
          }

          if (selectedTenseDescription === "future perfect") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [have.future + " " + v3],
              structureChunk
            );
          }

          if (
            selectedTenseDescription === "conditional" ||
            selectedTenseDescription === "conditional simple"
          ) {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              ["would" + " " + infinitive],
              structureChunk
            );
          }

          if (selectedTenseDescription === "conditional continuous") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [be.conditional + " " + gerund],
              structureChunk
            );
          }

          if (selectedTenseDescription === "conditional perfect") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [have.conditional + " " + v3],
              structureChunk
            );
          }

          if (selectedTenseDescription === "imperative") {
            addToResArr(
              "tenseDescription",
              selectedTenseDescription,
              [infinitive],
              structureChunk
            );
          }
        });
      });
    });
    return resArr;
  }
};
