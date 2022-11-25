const lfUtils = require("../../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../../utils/objectTraversingUtils.js");
const frUtils = require("../../../utils/formattingResponseUtils.js");
const gpUtils = require("../../../utils/generalPurposeUtils.js");
const uUtils = require("../../../utils/universalUtils.js");
const consol = require("../../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../../utils/allLangUtils.js");

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
let inflectionRef = {
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

const _addToResArrAdhocForms = (
  resArr,
  adhocTraitKey,
  adhocValue,
  selectedWordArr,
  structureChunk,
  dataToUpdateWith
) => {
  consol.log(
    "htrt _addToResArrAdhocForms START selectedWordArr",
    selectedWordArr
  );

  let structureChunkCopy = uUtils.copyWithoutReference(structureChunk);

  lfUtils.updateStructureChunkByAdhocOnly(
    structureChunkCopy,
    adhocTraitKey,
    adhocValue
  );

  if (dataToUpdateWith) {
    Object.keys(dataToUpdateWith).forEach((traitKey) => {
      let traitValue = dataToUpdateWith[traitKey];

      lfUtils.updateStructureChunkByAdhocOnly(
        structureChunkCopy,
        traitKey,
        traitValue
      );
    });
  } else {
    //If I am given no dataToUpdateWith, then I assume you want me to select random
    //traitValues for all traitKeys on the structureChunk, in order to lock in choices.

    let allTraitKeys = [];

    let kindsOfTraitKeyOnLObj = [
      "selectors",
      "hybridSelectors",
      "inflectionChains",
    ];

    kindsOfTraitKeyOnLObj.forEach((kindOfTraitKeyOnLObj) => {
      let traitKeys =
        refObj.lemmaObjectTraitKeys[currentLanguage][kindOfTraitKeyOnLObj][
          gpUtils.getWordtypeStCh(structureChunkCopy)
        ];

      if (traitKeys) {
        allTraitKeys = [...allTraitKeys, ...traitKeys];
      }
    });

    allTraitKeys.forEach((traitKey) => {
      if (
        structureChunkCopy[traitKey] &&
        structureChunkCopy[traitKey].length > 1
      ) {
        structureChunkCopy[traitKey] = uUtils.selectRandom(
          structureChunkCopy[traitKey]
        );
      }
    });
  }

  let resObj = {
    selectedWordArr,
    structureChunkUpdated: structureChunkCopy,
  };

  resArr.push(resObj);
};

const _fetchTenseDescriptionAdhocForms = (
  resArr,
  lObj,
  dataToUpdateWith,
  structureChunk,
  tenseDescriptionTraitKeyForRefObj = dataToUpdateWith.tenseDescription
) => {
  let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;
  let { person, number, tenseDescription } = dataToUpdateWith; //These are used in engTenseDescriptionRef
  let tenseDescriptionTraitKeyForStructureChunk =
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
    "future compound": [
      be["present"][person][number] + " " + "going to" + " " + infinitive,
    ],
    "future continuous": [be.future + " " + gerund],
    "future compound continuous": [
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

  const subsequentTenseDescRef = {
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

  Object.keys(subsequentTenseDescRef).forEach((tenseDescInflectionKey) => {
    let convertedTenseDescInflectionKeys =
      subsequentTenseDescRef[tenseDescInflectionKey];

    let tenseDescInflectionValues = [];
    convertedTenseDescInflectionKeys.forEach(
      (convertedTenseDescInflectionKey) => {
        engTenseDescriptionRef[convertedTenseDescInflectionKey].forEach(
          (tenseDescInflectionValue) => {
            tenseDescInflectionValues.push(tenseDescInflectionValue);
          }
        );
      }
    );

    engTenseDescriptionRef[tenseDescInflectionKey] = tenseDescInflectionValues;
  });

  _addToResArrAdhocForms(
    resArr,
    "tenseDescription",
    tenseDescriptionTraitKeyForStructureChunk,
    engTenseDescriptionRef[tenseDescriptionTraitKeyForRefObj],
    structureChunk,
    dataToUpdateWith
  );
};

exports.balanceGenders = () => {};

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
    gpUtils.getWordtypeStCh(structureChunk) === "article" &&
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
        (annoTraitKey) => {
          let annoTraitValue =
            subsequentOutputUnit.firstStageAnnotationsObj[annoTraitKey];

          if (annoTraitValue === "singular") {
            consol.log(
              `yuox selectWordVersions. Removing "singular" annotation from subsequent outputUnit, as current output unit is ENG indefinite article.`
            );

            delete subsequentOutputUnit.firstStageAnnotationsObj[annoTraitKey];
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

exports.preprocessStructureChunks = (structureChunk) => {
  if (
    ["nounCommon", "nounPerson"].includes(
      gpUtils.getWordtypeStCh(structureChunk)
    )
  ) {
    if (structureChunk.gcase && structureChunk.gcase.length) {
      structureChunk.gcase = structureChunk.gcase.map((gcaseTraitValue) => {
        return ["nom", "gen"].includes(gcaseTraitValue)
          ? gcaseTraitValue
          : "nom";
      });
    }
  }
};

exports.expandLemmaObjects = (matches, stChWordtype, currentLanguage) => {
  //delta genericise
  allLangUtils.expandLemmaObjects(matches, currentLanguage);
};

exports.formatTraitValue = (traitKey, traitValue, note) => {
  const metagenderRef = {
    _Genders: ["m", "f", "n", "virile", "nonvirile"],
    _PersonalGenders: ["m", "f", "virile", "nonvirile"],
  };

  if (traitKey === "gender") {
    if (metagenderRef[traitValue]) {
      return metagenderRef[traitValue];
    }
  }

  return [traitValue];
};

exports.addLanguageParticularClarifiers = (
  structureChunk,
  currentLanguage,
  lemmaObject
) => {
  if (
    gpUtils.getWordtypeStCh(structureChunk) === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    //
    //Type 4 Synhomographs: Add clarifier for ambiguous participles (Ad-PW).
    //Afaics, no such ambiguity in ENG verbs.
    //

    //
    //Type 3 Synhomographs: Add clarifier for 2nd person singular vs plural. (Wasn't caught, as went through Ad-PW).
    //Doesn't need to be done. Because all verbs will be tied to nouns or pronombres, even when such are invisible.
    //

    //
    //Type 2 Synhomographs: Add clarifier for v1-v2 synhomography verbs.
    //
    if (structureChunk.tenseDescription) {
      if (structureChunk.tenseDescription.length > 1) {
        throw "ENG:addLanguageParticularClarifiers expected this verb structureChunk's tenseDescription traitKey to hold only one traitValue each, not more.";
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
          let annoTraitValue = "past";

          consol.log(
            "weaf ENG addLanguageParticularClarifiers------------------------------------------ADDED  CLARIFIER in Step 2, for Type 2 Syn",
            annoTraitValue
          );
          structureChunk.annotations.tenseDescription = annoTraitValue;
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
          let annoTraitValue = "present";

          consol.log(
            "befx ENG addLanguageParticularClarifiers------------------------------------------ADDED  CLARIFIER in Step 2, for Type 2 Syn",
            annoTraitValue
          );
          structureChunk.annotations.tenseDescription = annoTraitValue;
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

  Object.keys(participlesRef).forEach((inflectionKey) => {
    let inflectionValue = participlesRef[inflectionKey];
    lemmaObject.inflections[inflectionKey] = inflectionValue;
  });
};

exports.generateAdhocForms = (
  adhocInflectionCategory,
  structureChunk,
  lObj,
  currentLanguage
) => {
  let resArr = [];

  if (adhocInflectionCategory === "form") {
    exports.addSpecialVerbForms(lObj, currentLanguage);

    structureChunk.form.forEach((selectedForm) => {
      consol.log(
        "pqdw generateAdhocForms giving _addToResArrAdhocForms this selectedWordArr",
        [lObj.inflections[selectedForm]]
      );

      _addToResArrAdhocForms(
        resArr,
        "form",
        selectedForm,
        [lObj.inflections[selectedForm]],
        structureChunk,
        null // I am giving no dataToUpdateWith, as the choice of traitKeys specified won't affect the ENG adhoc form chosen.
        // So in _addToResArrAdhocForms it will make random selections for all the traitValues in the structureChunk, as I've given null here.
      );
    });

    return resArr;
  }

  if (
    adhocInflectionCategory === "tenseDescription" &&
    gpUtils.getWordtypeStCh(structureChunk) === "verb" &&
    structureChunk.form.includes("verbal")
  ) {
    if (
      !structureChunk.tenseDescription ||
      !structureChunk.tenseDescription.length
    ) {
      throw "This shouldn't have happened.";
    }

    Object.keys(inflectionRef).forEach((inflectionCategory) => {
      let inflectionKeys = inflectionRef[inflectionCategory].slice(0);
      if (
        !Array.isArray(structureChunk[inflectionCategory]) ||
        !structureChunk[inflectionCategory].length
      ) {
        structureChunk[inflectionCategory] = inflectionKeys;
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
            ["future continuous", "future compound continuous"].includes(
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
              "wmcp generateAdhocForms giving _addToResArrAdhocForms this selectedWordArr",
              [be[tense][person][number]]
            );

            _addToResArrAdhocForms(
              resArr,
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
              _fetchTenseDescriptionAdhocForms(
                resArr,
                lObj,
                dataToUpdateWith,
                structureChunk,
                `${tenseDescription} 3PS`
              );
            } else {
              _fetchTenseDescriptionAdhocForms(
                resArr,
                lObj,
                dataToUpdateWith,
                structureChunk
              );
            }
          }
        });
      });
    });
    return resArr;
  }
};
