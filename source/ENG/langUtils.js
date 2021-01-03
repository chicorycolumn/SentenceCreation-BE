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

exports.formatFeatureValue = (featureKey, featureValue, note) => {};

exports.addLanguageParticularClarifiers = (
  structureChunk,
  currentLanguage,
  lemmaObject
) => {
  if (
    structureChunk.wordtype === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    //
    //Type 4 Synhomographs: Add clarifier for ambiguous participles (Ad-PW).
    //Afaics, no such ambiguity in ENG verbs.
    //

    //
    //Type 3 Synhomographs: Add clarifier for 2nd person singular vs plural. (Wasn't caught, as went through Ad-PW).
    //
    if (!structureChunk.person || !structureChunk.number) {
      throw "ENG:addLanguageParticularClarifiers expected this verb structureChunk to have a Person and Number key.";
    }
    if (!structureChunk.person.length > 1 || structureChunk.number.length > 1) {
      throw "ENG:addLanguageParticularClarifiers expected this verb structureChunk's Person and Number key to have only one value each, not more.";
    }

    let person = structureChunk.person[0];
    let number = structureChunk.number[0];

    if (person === "2per") {
      structureChunk.annotations.number = number;
    }

    //
    //Type 2 Synhomographs: Add clarifier for v1-v2 synhomography verbs.
    //
    if (structureChunk.tenseDescription) {
      if (structureChunk.tenseDescription.length > 1) {
        throw "ENG:addLanguageParticularClarifiers expected this verb structureChunk's tenseDescription key to have only one value each, not more.";
      }

      if (lemmaObject.inflections.infinitive === lemmaObject.inflections.v2) {
        if (
          structureChunk.tenseDescription &&
          structureChunk.tenseDescription.includes("past simple")
        ) {
          structureChunk.annotations.tenseDescription = "past";
          structureChunk.preventAddingClarifiers = true; // We assume that no more clarifiers are needed.
        } else if (
          structureChunk.tenseDescription &&
          structureChunk.tenseDescription.includes("present simple")
        ) {
          structureChunk.annotations.tenseDescription = "present";
          structureChunk.preventAddingClarifiers = true; // We assume that no more clarifiers are needed.
        }
      }
    }
  }
};

exports.adjustTenseDescriptionsBeforeTranslating = () => {};

exports.adjustStructureChunksInIfPW = (structureChunk) => {};

exports.adjustTenseDescriptions = () => {};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  console.log("ENG:preprocessStructureChunks");
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

        if (!structureChunk.number || !structureChunk.number.length) {
          structureChunk.gender = ["m", "f", "n", "virile", "nonvirile"];
        } else {
          structureChunk.gender = [];

          if (structureChunk.number.includes("singular")) {
            ["m", "f", "n"].forEach((genderValue) =>
              structureChunk.gender.push(genderValue)
            );
          } //Yes, there is no 'else' between these two. They should have ability to run.
          if (structureChunk.number.includes("plural")) {
            ["virile", "nonvirile"].forEach((genderValue) =>
              structureChunk.gender.push(genderValue)
            );
          }
        }
      }
    }
  });
};

exports.preprocessLemmaObjectsMajor = (matches, structureChunk) => {
  matches.forEach((lObj) => {
    if (gpUtils.getWordtypeFromLemmaObject(lObj) === "pronoun") {
      if (!structureChunk.wordtype === "pronoun") {
        throw "Error------------->lObj and stCh wordtypes don't match.";
      }
      if (!structureChunk.gender) {
        throw "Error------------->I expected stCh to have a gender key.";
      }

      gpUtils.findKeysInObjectAndExecuteCallback(lObj, "allGenders", (obj) => {
        gpUtils.copyValueOfKey(
          obj,
          "allGenders",
          ["virile", "nonvirile", "m", "f"], //Alpha: This is kind of kowtowing.
          true
        );
      });

      // let genderValueArr = structureChunk.gender;

      // genderValueArr.forEach((genderValue) => {
      //   gpUtils.findKeysInObjectAndExecuteCallback(
      //     lemmaObject,
      //     "allGenders",
      //     (obj) => {
      //       obj[genderValue] = obj["allGenders"];
      //     }
      //   );
      // });
    }
  });
};

exports.preprocessLemmaObjectsMinor = (matches) => {
  matches.forEach((lObj) => {
    if (gpUtils.getWordtypeFromLemmaObject(lObj) === "noun") {
      if (lObj.tags.includes("person")) {
        if (!lObj.gender) {
          throw (
            "Error. The lObj '" +
            lObj.id +
            "' is a person so should have a gender key."
          );
        } else if (lObj.gender === "m/f" || lObj.gender === "f/m") {
          // let lObjCopy = gpUtils.copyWithoutReference(lObj);
          // lObj.gender = "f";
          // lObjCopy.gender = "m";
          // matches.push(lObjCopy);
        }
      } else {
        console.log("Minor is setting gender to 'n' for " + lObj.lemma);
        lObj.gender = "n";
      }
    }

    // if (gpUtils.getWordtypeFromLemmaObject(lObj) === "pronoun") {
    // }
  });
};

exports.addSpecialVerbForms = (lemmaObject, currentLanguage) => {
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

exports.generateAdhocForms = (
  adhocInflectorKey,
  structureChunk,
  lObj,
  currentLanguage
) => {
  let resArr = [];

  if (adhocInflectorKey === "form") {
    exports.addSpecialVerbForms(lObj, currentLanguage);

    structureChunk.form.forEach((selectedForm) => {
      addToResArr(
        "form",
        selectedForm,
        [lObj.inflections[selectedForm]],
        structureChunk,
        null // I am giving no dataToUpdateWith, as the choice of features specified won't affect the ENG adhoc form chosen.
        // So in addToResArr it will make random selections for all the features in the structureChunk, as I've given null here.
      );
    });

    return resArr;
  }

  if (
    adhocInflectorKey === "tenseDescription" &&
    structureChunk.wordtype === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    if (
      !structureChunk.tenseDescription ||
      !structureChunk.tenseDescription.length
    ) {
      throw "This shouldn't have happened.";
    }

    let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;

    Object.keys(inflectorRef).forEach((key) => {
      let value = inflectorRef[key];
      if (!Array.isArray(structureChunk[key]) || !structureChunk[key].length) {
        structureChunk[key] = value.slice(0);
      }
    });

    let tenseDescriptionArr = [];
    structureChunk.tenseDescription.forEach((tenseDescription) => {
      if (["past", "present", "future"].includes(tenseDescription)) {
        ["simple", "continuous", "perfect"].forEach((tenseSuffix) => {
          tenseDescriptionArr.push(`${tenseDescription} ${tenseSuffix}`);
        });
      } else {
        tenseDescriptionArr.push(tenseDescription);
      }
    });

    function fetchTenseDescription(
      dataToUpdateWith,
      structureChunk,
      tenseDescriptionKeyForRefObj = dataToUpdateWith.tenseDescription
    ) {
      let { person, number, tenseDescription } = dataToUpdateWith; //These are used in engTenseDescriptionRef
      let tenseDescriptionKeyForStructureChunk =
        dataToUpdateWith.tenseDescription;

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

        let valuesArr = [];
        resultKeysArray.forEach((resultKey) => {
          engTenseDescriptionRef[resultKey].forEach((result) => {
            valuesArr.push(result);
          });
        });

        engTenseDescriptionRef[key] = valuesArr;
      });

      addToResArr(
        "tenseDescription",
        tenseDescriptionKeyForStructureChunk,
        engTenseDescriptionRef[tenseDescriptionKeyForRefObj],
        structureChunk,
        dataToUpdateWith
      );
    }

    structureChunk.person.forEach((person) => {
      structureChunk.number.forEach((number) => {
        tenseDescriptionArr.forEach((tenseDescription) => {
          let dataToUpdateWith = {
            person,
            number,
            tenseDescription,
          };

          if (
            lObj.lemma === "be" &&
            ["future continuous", "future goingto continuous"].includes(
              tenseDescription
            )
          ) {
            return;
          }

          if (
            lObj.lemma === "be" &&
            ["past simple", "present simple"].includes(tenseDescription)
          ) {
            //'be' (am/are & was/were) is the only verb irregular in a way not fitting our system.
            //So just for this verb, in ENG, we need to do all this getting differently.

            let tense = tenseDescription.split(" ")[0];
            addToResArr(
              "tenseDescription",
              tenseDescription,
              [be[tense][person][number]],
              structureChunk,
              dataToUpdateWith
            );
            return;
          } else {
            if (
              ["present simple", "cond0 condition", "cond0 outcome"].includes(
                tenseDescription
              ) &&
              person === "3per" &&
              number === "singular"
            ) {
              fetchTenseDescription(
                dataToUpdateWith,
                structureChunk,
                `${tenseDescription} 3PS`
              );
            } else {
              fetchTenseDescription(dataToUpdateWith, structureChunk);
            }
          }
        });
      });
    });
    return resArr;
  }

  function addToResArr(
    adhocLabel,
    adhocValue,
    selectedWordArr,
    structureChunk,
    dataToUpdateWith
  ) {
    let structureChunkCopy = gpUtils.copyWithoutReference(structureChunk);

    lfUtils.updateStructureChunkByAdhocOnly(
      structureChunkCopy,
      adhocLabel,
      adhocValue
    );

    if (dataToUpdateWith) {
      Object.keys(dataToUpdateWith).forEach((label) => {
        let value = dataToUpdateWith[label];

        lfUtils.updateStructureChunkByAdhocOnly(
          structureChunkCopy,
          label,
          value
        );
      });
    } else {
      //If I am given no dataToUpdateWith, then I assume you want me to select random
      //for all features on the structureChunk, in order to lock in choices.

      let allFeatureKeys = [];

      let featureTypes = ["selectors", "hybridSelectors", "inflectionChains"];

      featureTypes.forEach((featureType) => {
        let featureKeys =
          refObj.lemmaObjectFeatures[currentLanguage][featureType][
            structureChunkCopy.wordtype
          ];

        if (featureKeys) {
          allFeatureKeys = [...allFeatureKeys, ...featureKeys];
        }
      });

      allFeatureKeys.forEach((featureKey) => {
        if (
          structureChunkCopy[featureKey] &&
          structureChunkCopy[featureKey].length > 1
        ) {
          structureChunkCopy[featureKey] = gpUtils.selectRandom(
            structureChunkCopy[featureKey]
          );
        }
      });
    }

    let resObj = {
      selectedWordArr,
      structureChunkUpdated: structureChunkCopy,
    };

    resArr.push(resObj);
  }
};
