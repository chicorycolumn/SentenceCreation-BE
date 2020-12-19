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

exports.adjustStructureChunksInIfPW = (structureChunk) => {};

exports.adjustTenseDescriptions = () => {};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {};

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

    let resArr = [];
    let tenseDescriptionArrCopy = structureChunk.tenseDescription.slice(0);

    Object.keys(inflectorRef).forEach((key) => {
      let value = inflectorRef[key];
      if (!Array.isArray(structureChunk[key]) || !structureChunk[key].length) {
        structureChunk[key] = value.slice(0);
      }
    });

    let tenseDescriptionArr = [];
    tenseDescriptionArrCopy.forEach((selectedTenseDescription) => {
      if (selectedTenseDescription === "present") {
        tenseDescriptionArr.push("present simple");
        tenseDescriptionArr.push("present continuous");
        tenseDescriptionArr.push("present perfect");
      } else if (selectedTenseDescription === "past") {
        tenseDescriptionArr.push("past simple");
        tenseDescriptionArr.push("past continuous");
        tenseDescriptionArr.push("past perfect");
      } else if (selectedTenseDescription === "future") {
        tenseDescriptionArr.push("future simple");
        tenseDescriptionArr.push("future continuous");
        tenseDescriptionArr.push("future perfect");
      } else {
        tenseDescriptionArr.push(selectedTenseDescription);
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
        selectedWordArr,
        structureChunkUpdated: structureChunkCopy,
      };

      resArr.push(resObj);
    }

    function fetchTenseDescription(
      data,
      structureChunk,
      tenseDescriptionKeyForRefObj = data.selectedTenseDescription
    ) {
      let { person, number, selectedTenseDescription } = data;
      let tenseDescriptionKeyForStructureChunk = selectedTenseDescription;

      //This does have to be defined in here.
      const engTenseDescriptionRef = {
        "past simple": [v2],
        "past continuous": [be["past"][person][number] + " " + gerund],
        "past perfect": [have["past"] + " " + v3],
        "present simple 3PS": [thirdPS],
        "present simple": [infinitive],
        "present continuous": [be["present"][person][number] + " " + gerund],
        "present perfect": [have["present"][person][number] + " " + v3],
        "future simple": ["will" + " " + infinitive],
        "future goingto": [
          be["present"][person][number] + " " + "going to" + " " + infinitive,
        ],
        "future continuous": [be.future + " " + gerund],
        "future goingto continuous": [
          be["present"][person][number] + " " + "going to be" + " " + gerund,
        ],
        "future perfect": [have.future + " " + v3],
        // conditional: ["would" + " " + infinitive],
        "conditional simple": ["would" + " " + infinitive],
        "conditional continuous": [be.conditional + " " + gerund],
        "conditional perfect": [have.conditional + " " + v3],
        imperative: [infinitive],
        "negative imperative": ["don't" + " " + infinitive],
      };

      const subsequentKeysRef = {
        "cond0 condition": ["present simple"],
        "cond0 condition 3PS": ["present simple 3PS"],
        "cond0 outcome": ["present simple"],
        "cond0 outcome 3PS": ["present simple 3PS"],

        "cond1 condition": ["present simple"],
        "cond1 outcome": ["future simple"],

        "cond2 condition": ["past simple"],
        "cond2 outcome": ["conditional simple"],

        "cond3 condition": ["past perfect"],
        "cond3 outcome": ["conditional perfect"],
      };

      Object.keys(subsequentKeysRef).forEach((key) => {
        let resultKeysArray = subsequentKeysRef[key];

        let resArr = [];
        resultKeysArray.forEach((resultKey) => {
          engTenseDescriptionRef[resultKey].forEach((result) => {
            resArr.push(result);
          });
        });

        engTenseDescriptionRef[key] = resArr;
      });

      addToResArr(
        "tenseDescription",
        tenseDescriptionKeyForStructureChunk,
        engTenseDescriptionRef[tenseDescriptionKeyForRefObj],
        structureChunk
      );
    }

    structureChunk.person.forEach((person) => {
      structureChunk.number.forEach((number) => {
        tenseDescriptionArr.forEach((selectedTenseDescription) => {
          let data = {
            person,
            number,
            selectedTenseDescription,
          };

          if (
            [
              "present simple",
              "cond0 condition 3PS",
              "cond0 outcome 3PS",
            ].includes(selectedTenseDescription) &&
            person === "3per" &&
            number === "singular"
          ) {
            fetchTenseDescription(
              data,
              structureChunk,
              `${selectedTenseDescription} 3PS`
            );
          } else {
            fetchTenseDescription(data, structureChunk);
          }
        });
      });
    });
    return resArr;
  }
};
