const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../utils/allLangUtils.js");

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

exports.selectWordVersions = (
  structureChunk,
  subsequentOutputUnit,
  selectedWord,
  selectedWordsArr,
  firstStageAnnotationsObj,
  selectedLemmaObject,
  previousOutputUnit,
  multipleMode
) => {
  // >>>
  // >>> Indefinite Article
  // >>>
  if (
    gpUtils.getWorrdtypeStCh(structureChunk) === "article" &&
    structureChunk.form.includes("indefinite")
  ) {
    if (!subsequentOutputUnit) {
      consol.throw(
        "aqrz selectWordVersions Shouldn't there be an outputUnit subsequent to this ENG indefinite article?"
      );
    }

    consol.log(
      "shnj selectWordVersions. subsequentOutputUnit.firstStageAnnotationsObj BEFORE",
      subsequentOutputUnit.firstStageAnnotationsObj
    );

    if (subsequentOutputUnit && subsequentOutputUnit.firstStageAnnotationsObj) {
      Object.keys(subsequentOutputUnit.firstStageAnnotationsObj).forEach(
        (annoKey) => {
          let annoValue =
            subsequentOutputUnit.firstStageAnnotationsObj[annoKey];

          if (annoValue === "singular") {
            consol.log(
              `yuox selectWordVersions. Removing "singular" annotation from subsequent outputUnit, as current output unit is ENG indefinite article.`
            );

            delete subsequentOutputUnit.firstStageAnnotationsObj[annoKey];
          }
        }
      );
    }

    consol.log(
      "shnj selectWordVersions. subsequentOutputUnit.firstStageAnnotationsObj AFTER",
      subsequentOutputUnit.firstStageAnnotationsObj
    );

    consol.log("nbra selectWordVersions", {
      "subsequentOutputUnit.selectedWord": subsequentOutputUnit.selectedWord,
      "subsequentOutputUnit.structureChunk":
        subsequentOutputUnit.structureChunk,
    });

    if (
      subsequentOutputUnit.structureChunk.number &&
      subsequentOutputUnit.structureChunk.number.includes("plural")
    ) {
      if (subsequentOutputUnit.structureChunk.number.length > 1) {
        consol.throw(
          "#ERR pudk selectWordVersions. subsequentOutputUnit.structureChunk.number had length over 1."
        );
      }
      consol.log(
        "fzxm selectWordVersions skipping pushSelectedWordToArray as plural noun means no indefinite article."
      );
      return true;
    }

    if (
      !subsequentOutputUnit.selectedWord.surprisinglyStartsWithConsonantSound &&
      (subsequentOutputUnit.selectedWord.surprisinglyStartsWithVowelSound ||
        (typeof subsequentOutputUnit.selectedWord === "string" &&
          /^[aeiou]/.test(subsequentOutputUnit.selectedWord[0])))
    ) {
      frUtils.pushSelectedWordToArray(
        "protective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    } else {
      frUtils.pushSelectedWordToArray(
        "nonprotective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    }
  }
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  let shouldConsoleLog = false;

  consol.log(
    "[1;35m " + "ywzr ENG preprocessStructureChunks-------------------" + "[0m"
  );

  let metagenderRef = refObj.metaFeatures[currentLanguage].gender;

  sentenceStructure.forEach((structureChunk) => {
    if (gpUtils.getWorrdtypeStCh(structureChunk) === "fixed") {
      return;
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "preposition") {
      structureChunk.form = ["onlyForm"];
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "noun") {
      if (structureChunk.gcase && structureChunk.gcase.length) {
        structureChunk.gcase = structureChunk.gcase.map((gcaseValue) => {
          return ["nom", "gen"].includes(gcaseValue) ? gcaseValue : "nom";
        });
      }
    }

    consol.log(
      "fydk ENG preprocessStructureChunks s'tructureChunk.worrdtype",
      gpUtils.getWorrdtypeStCh(structureChunk)
    );

    if (
      //If gender is an appropriate feature of this worrdtype.
      refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
        gpUtils.getWorrdtypeStCh(structureChunk)
      ].includes("gender")
    ) {
      if (!structureChunk.gender || !structureChunk.gender.length) {
        //Fill out if blank.

        if (
          structureChunk.person &&
          structureChunk.person.length &&
          !structureChunk.person.includes("3per")
        ) {
          structureChunk.gender = metagenderRef["allPersonalGenders"].slice(0);
        } else {
          structureChunk.gender = metagenderRef["allGenders"].slice(0);
        }
      }
    }
  });
  if (shouldConsoleLog) {
    consol.log("[1;35m " + "/ENG:preprocessStructureChunks" + "[0m");
  }
};

exports.preprocessLemmaObjectsMajor = (
  matches,
  structureChunk,
  adjustLemmaObjectsOnly,
  currentLanguage
) => {
  let metagenderRef = refObj.metaFeatures[currentLanguage].gender;

  matches.forEach((lObj) => {
    if (gpUtils.getWorrdtypeLObj(lObj) === "pronoun") {
      if (gpUtils.getWorrdtypeStCh(structureChunk) !== "pronoun") {
        consol.throw(
          "#ERR hcio preprocessLemmaObjectsMajor. lObj and stCh worrdtypes don't match."
        );
      }
      if (!structureChunk.gender) {
        if (
          structureChunk.person &&
          structureChunk.person.length &&
          !structureChunk.person.includes("3per")
        ) {
          structureChunk.gender = metagenderRef["allPersonalGenders"].slice(0);
        } else {
          structureChunk.gender = metagenderRef["allGenders"].slice(0);
        }
      }
    }
  });

  allLangUtils.convertMetaFeatures(matches, "ENG", "lObj");
  // allLangUtils.preprocessLemmaObjects(matches, "ENG");
};

exports.preprocessLemmaObjectsMinor = (matches) => {
  matches.forEach((lObj) => {
    if (gpUtils.getWorrdtypeLObj(lObj) === "noun") {
      if (gpUtils.getWorrdtypeLObj(lObj, true) === "noun-person") {
        //bostonX
        if (!lObj.gender) {
          consol.throw(
            "#ERR vuww preprocessLemmaObjectsMinor. The lObj '" +
              lObj.id +
              "' is a noun-person so should have a gender key."
          );
        }
      } else {
        lObj.gender = "n";
      }
    }
  });
};

exports.formatFeatureValue = (featureKey, featureValue, note) => {
  const metagenderRef = {
    allGenders: ["m", "f", "n", "virile", "nonvirile"],
    allPersonalGenders: ["m", "f", "virile", "nonvirile"],
  };

  if (featureKey === "gender") {
    if (metagenderRef[featureValue]) {
      return metagenderRef[featureValue];
    }
  }

  return [featureValue];
};

exports.addLanguageParticularClarifiers = (
  structureChunk,
  currentLanguage,
  lemmaObject
) => {
  if (
    gpUtils.getWorrdtypeStCh(structureChunk) === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    //
    //Type 4 Synhomographs: Add clarifier for ambiguous participles (Ad-PW).
    //Afaics, no such ambiguity in ENG verbs.
    //

    //
    //Type 3 Synhomographs: Add clarifier for 2nd person singular vs plural. (Wasn't caught, as went through Ad-PW).
    //Doesn't need to be done. Because all verbs will be tied to nouns or pronouns, even when such are invisible.
    //

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
          structureChunk.tenseDescription.includes("past simple") &&
          !(
            structureChunk.person &&
            structureChunk.person.length === 1 &&
            structureChunk.person[0] === "3per" &&
            structureChunk.number &&
            structureChunk.number.length === 1 &&
            structureChunk.number[0] === "singular"
          )
        ) {
          let annotationValue = "past";

          consol.log(
            "weaf ENG addLanguageParticularClarifiers------------------------------------------ADDED  CLARIFIER in Step 2, for Type 2 Syn",
            annotationValue
          );
          structureChunk.annotations.tenseDescription = annotationValue;
          structureChunk.preventAddingFurtherClarifiers = true; // We assume that no more clarifiers are needed.
        } else if (
          structureChunk.tenseDescription &&
          structureChunk.tenseDescription.includes("present simple") &&
          !(
            structureChunk.person &&
            structureChunk.person.length === 1 &&
            structureChunk.person[0] === "3per" &&
            structureChunk.number &&
            structureChunk.number.length === 1 &&
            structureChunk.number[0] === "singular"
          )
        ) {
          consol.log("befx structureChunk", structureChunk);
          consol.throw(666);
          let annotationValue = "present";

          consol.log(
            "befx ENG addLanguageParticularClarifiers------------------------------------------ADDED  CLARIFIER in Step 2, for Type 2 Syn",
            annotationValue
          );
          structureChunk.annotations.tenseDescription = annotationValue;
          structureChunk.preventAddingFurtherClarifiers = true; // We assume that no more clarifiers are needed.
        }
      }
    }
  }
};

exports.adjustTenseDescriptionsBeforeTranslating = () => {};

exports.adjustStructureChunksInIfPW = (structureChunk) => {};

exports.adjustTenseDescriptions = () => {};

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
      consol.log(
        "pqdw generateAdhocForms giving addToResArr this selectedWordArr",
        [lObj.inflections[selectedForm]]
      );

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
    gpUtils.getWorrdtypeStCh(structureChunk) === "verb" &&
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

    consol.log("xtsf structureChunk", structureChunk);

    structureChunk.tenseDescription.forEach((tenseDescription) => {
      if (["past", "present", "future"].includes(tenseDescription)) {
        ["simple", "continuous", "perfect"].forEach((tenseSuffix) => {
          tenseDescriptionArr.push(`${tenseDescription} ${tenseSuffix}`);
        });
      } else {
        tenseDescriptionArr.push(tenseDescription);
      }
    });

    consol.log("cesb tenseDescriptionArr", tenseDescriptionArr);

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

    consol.log("jpvb", {
      "structureChunk.person": structureChunk.person,
      "structureChunk.number": structureChunk.number,
      tenseDescriptionArr,
    });

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

            consol.log(
              "wmcp generateAdhocForms giving addToResArr this selectedWordArr",
              [be[tense][person][number]]
            );

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
    consol.log("htrt addToResArr START selectedWordArr", selectedWordArr);

    let structureChunkCopy = uUtils.copyWithoutReference(structureChunk);

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
            gpUtils.getWorrdtypeStCh(structureChunkCopy)
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
          structureChunkCopy[featureKey] = uUtils.selectRandom(
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
