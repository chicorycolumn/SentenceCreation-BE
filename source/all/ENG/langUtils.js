const lfUtils = require("../../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../../utils/objectTraversingUtils.js");
const frUtils = require("../../../utils/formattingResponseUtils.js");
const gpUtils = require("../../../utils/generalPurposeUtils.js");
const idUtils = require("../../../utils/identityUtils.js");
const uUtils = require("../../../utils/universalUtils.js");
const consol = require("../../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../../utils/allLangUtils.js");

const _be = {
  past: {
    "1per": { singular: "ªwas", plural: "ªwere" },
    "2per": { singular: "ªwere", plural: "ªwere" },
    "3per": { singular: "ªwas", plural: "ªwere" },
  },
  present: {
    "1per": { singular: "ªam", plural: "ªare" },
    "2per": { singular: "ªare", plural: "ªare" },
    "3per": { singular: "ªis", plural: "ªare" },
  },
  future: "will ªbe",
  conditional: "would ªbe",
};
const _beNot = {
  past: {
    "1per": { singular: "ªwas not", plural: "ªwere not" },
    "2per": { singular: "ªwere not", plural: "ªwere not" },
    "3per": { singular: "ªwas not", plural: "ªwere not" },
  },
  present: {
    "1per": { singular: "ªam not", plural: "ªare not" },
    "2per": { singular: "ªare not", plural: "ªare not" },
    "3per": { singular: "ªis not", plural: "ªare not" },
  },
  future: "will not ªbe",
  conditional: "would not ªbe",
};
const _have = {
  past: "ªhad",
  present: {
    "1per": { singular: "ªhave", plural: "ªhave" },
    "2per": { singular: "ªhave", plural: "ªhave" },
    "3per": { singular: "ªhas", plural: "ªhave" },
  },
  future: "will ªhave",
  conditional: "would ªhave",
};
const _haveNot = {
  past: "ªhad not",
  present: {
    "1per": { singular: "ªhave not", plural: "ªhave not" },
    "2per": { singular: "ªhave not", plural: "ªhave not" },
    "3per": { singular: "ªhas not", plural: "ªhave not" },
  },
  future: ["will not ªhave", "will ªhave¤ not"], // Added special handling in haveNotRef given this is array.
  conditional: ["would not ªhave", "would ªhave¤ not"], // Added special handling in haveNotRef given this is array.
};
const _do = {
  past: "ªdid",
  present: { main: "ªdo", "3PS": "ªdoes" },
  future: "will ªdo",
  conditional: "would ªdo",
};
const _doNot = {
  past: "ªdid not",
  present: { main: "ªdo not", "3PS": "ªdoes not" },
  future: "will not ªdo",
  conditional: "would not ªdo",
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

  structureChunkCopy[adhocTraitKey] = [adhocValue];

  if (dataToUpdateWith) {
    Object.keys(dataToUpdateWith.array).forEach((traitKey) => {
      let traitValue = dataToUpdateWith.array[traitKey];
      if (traitValue) {
        structureChunkCopy[traitKey] = [traitValue];
      }
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
          idUtils.getWordtypeStCh(structureChunkCopy)
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
        lfUtils.selectRandTraitValue(lObj, structureChunkCopy, traitKey);
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
  tenseDescriptionTraitKeyForRefObj = dataToUpdateWith.array.tenseDescription
) => {
  let { infinitive, v2, v3, thirdPS, gerund } = lObj.inflections;
  let { person, number, tenseDescription } = dataToUpdateWith.array; //These are used in tenseDescRef
  let { negative } = dataToUpdateWith.bool; //These are used in tenseDescRef
  let tenseDescriptionTraitKeyForStructureChunk =
    dataToUpdateWith.array.tenseDescription;

  const tenseDescRefPositive = {
    "past simple": [v2],
    "past continuous": [_be["past"][person][number] + " " + gerund],
    "past perfect": [_have["past"] + " " + v3],
    "present simple 3PS": [thirdPS],
    "present simple": [infinitive],
    "present continuous": [_be["present"][person][number] + " " + gerund],
    "present perfect": [_have["present"][person][number] + " " + v3],
    "future simple": ["will" + " " + infinitive],
    "future compound": [
      _be["present"][person][number] + " " + "going to" + " " + infinitive,
    ],
    "future continuous": [_be["future"] + " " + gerund],
    "future compound continuous": [
      _be["present"][person][number] + " " + "going to be" + " " + gerund,
    ],
    "future perfect": [_have["future"] + " " + v3],
    // conditional: ["would" + " " + infinitive],
    "conditional simple": ["would" + " " + infinitive],
    "conditional continuous": [_be["conditional"] + " " + gerund],
    "conditional perfect": [_have["conditional"] + " " + v3],
    imperative: [infinitive],
  };
  const tenseDescRefNegative = {
    "past simple": [_doNot["past"] + " " + infinitive],
    "past continuous": [_beNot["past"][person][number] + " " + gerund],
    "past perfect": [_haveNot["past"] + " " + v3],
    "present simple 3PS": [_doNot["present"]["3PS"] + " " + infinitive],
    "present simple": [_doNot["present"]["main"] + " " + infinitive],
    "present continuous": [_beNot["present"][person][number] + " " + gerund],
    "present perfect": [_haveNot["present"][person][number] + " " + v3],
    "future simple": ["will not" + " " + infinitive],
    "future compound": [
      _beNot["present"][person][number] + " " + "going to" + " " + infinitive,
    ],
    "future continuous": [_beNot["future"] + " " + gerund],
    "future compound continuous": [
      _beNot["present"][person][number] + " " + "going to be" + " " + gerund,
    ],
    "future perfect": _haveNot["future"].map((x) => x + " " + v3),
    // conditional: ["would not" + " " + infinitive],
    "conditional simple": ["would not" + " " + infinitive],
    "conditional continuous": [_beNot["conditional"] + " " + gerund],
    "conditional perfect": _haveNot["conditional"].map((x) => x + " " + v3),
    imperative: ["do not " + infinitive],
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

  let tenseDescRef = negative ? tenseDescRefNegative : tenseDescRefPositive;

  Object.keys(subsequentTenseDescRef).forEach((tenseDescInflectionKey) => {
    let convertedTenseDescInflectionKeys =
      subsequentTenseDescRef[tenseDescInflectionKey];

    let tenseDescInflectionValues = [];
    convertedTenseDescInflectionKeys.forEach(
      (convertedTenseDescInflectionKey) => {
        tenseDescRef[convertedTenseDescInflectionKey].forEach(
          (tenseDescInflectionValue) => {
            tenseDescInflectionValues.push(tenseDescInflectionValue);
          }
        );
      }
    );

    tenseDescRef[tenseDescInflectionKey] = tenseDescInflectionValues;
  });

  _addToResArrAdhocForms(
    resArr,
    "tenseDescription",
    tenseDescriptionTraitKeyForStructureChunk,
    tenseDescRef[tenseDescriptionTraitKeyForRefObj],
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
  maqModes
) => {
  // >>>
  // >>> Indefinite Article
  // >>>
  if (
    idUtils.getWordtypeStCh(structureChunk) === "art" &&
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
              `yuox selectWordVersions. ⭕ Removing "singular" annotation from subsequent outputUnit, as current output unit is ENG indefinite article.`
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
  if (["nco", "npe"].includes(idUtils.getWordtypeStCh(structureChunk))) {
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
  //epsilon genericise
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
    idUtils.getWordtypeStCh(structureChunk) === "ver" &&
    structureChunk.form.includes("verbal")
  ) {
    //
    //Type 4 Synhomographs: Add clarifier for ambiguous participles (Ad-PW).
    //Afaics, no such ambiguity in ENG verbs.
    //

    //
    //Type 3 Synhomographs: Add clarifier for 2nd person singular vs plural. (Wasn't caught, as went through Ad-PW).
    //Doesn't need to be done. Because all verbs will be tied to nouns or pronombres, even when such are ghost.
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
  currentLanguage,
  label
) => {
  let resArr = [];

  if (adhocInflectionCategory === "form") {
    exports.addSpecialVerbForms(lObj, currentLanguage);

    structureChunk.form.forEach((selectedForm) => {
      consol.log(
        `pqdw generateAdhocForms${label} giving _addToResArrAdhocForms this selectedWordArr`,
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

  if (adhocInflectionCategory === "tenseDescription") {
    if (
      idUtils.getWordtypeStCh(structureChunk) !== "ver" ||
      !structureChunk.form.includes("verbal")
    ) {
      return;
    }

    if (
      !structureChunk.tenseDescription ||
      !structureChunk.tenseDescription.length
    ) {
      throw `ERR kmlg: Cannot generateAdhocForms tenseDescription for "${structureChunk.chunkId}" when it has no tenseDescription value.`;
    }

    Object.keys(inflectionRef).forEach((inflectionCategory) => {
      let inflectionKeys = inflectionRef[inflectionCategory].slice(0);
      if (
        !structureChunk[inflectionCategory] ||
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

    let mockStCh = uUtils.copyWithoutReference(structureChunk);
    mockStCh.tenseDescription = tenseDescriptionArr;
    allLangUtils.removeContinuousTenseDescFromStative(lObj, mockStCh);
    tenseDescriptionArr = mockStCh.tenseDescription;

    consol.log("cesb tenseDescriptionArr", tenseDescriptionArr);

    consol.log("jpvb", {
      "structureChunk.person": structureChunk.person,
      "structureChunk.number": structureChunk.number,
      tenseDescriptionArr,
    });

    let negative = structureChunk.negative;

    structureChunk.person.forEach((person) => {
      structureChunk.number.forEach((number) => {
        tenseDescriptionArr.forEach((tenseDescription) => {
          if (
            lObj.lemma === "be" &&
            ["future continuous", "future compound continuous"].includes(
              tenseDescription
            )
          ) {
            return;
          }

          let dataToUpdateWith = {
            array: { person, number, tenseDescription },
            bool: { negative },
          };

          if (
            lObj.lemma === "be" &&
            ["past simple", "present simple"].includes(tenseDescription)
          ) {
            //'be' (am/are & was/were) is the only verb irregular in a way not fitting our system.
            //So just for this verb, in ENG, we need to do all this getting differently.

            let tense = tenseDescription.split(" ")[0];

            let beRef = negative ? _beNot : _be;

            let wordFromRef = [
              exports.stripAuxiliaryMarker(beRef[tense][person][number]),
            ];

            consol.log(
              "wmcp generateAdhocForms giving _addToResArrAdhocForms this selectedWordArr",
              wordFromRef
            );

            _addToResArrAdhocForms(
              resArr,
              "tenseDescription",
              tenseDescription,
              wordFromRef,
              structureChunk,
              dataToUpdateWith
            );
            return;
          } else if (
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
        });
      });
    });
    let expandedResArr = [];

    resArr.forEach((resArrItem) => {
      if (resArrItem.selectedWordArr.length > 1) {
        resArrItem.selectedWordArr.forEach((selectedWord) => {
          let copyResArrItem = uUtils.copyWithoutReference(resArrItem);
          copyResArrItem.selectedWordArr = [selectedWord];
          expandedResArr.push(copyResArrItem);
        });
      } else {
        expandedResArr.push(resArrItem);
      }
    });
    return expandedResArr;
  }
};

exports.convertTenseToTenseDescription = () => {};

exports.stripAuxiliaryMarker = (str) => {
  return str
    .split("")
    .filter((x) => x !== "ª")
    .join("");
};
