const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../../utils/secondOrder/educatorUtils.js");
const scUtils = require("../../utils/sentenceCreatingUtils.js");
const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const aaUtils = require("../../utils/auxiliaryAttributeUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const ivUtils = require("../../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
const apiUtils = require("../../utils/secondOrder/apiUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../utils/allLangUtils.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.getWordsByCriteria = (currentLanguage, criteriaFromHTTP) => {
  const { wordsBank } = require(`../../source/${currentLanguage}/words.js`);

  resObj = {};

  criteria = {};
  Object.keys(criteriaFromHTTP).forEach((critKey) => {
    let critValue = criteriaFromHTTP[critKey];
    critValue = critValue.split(" ");
    criteria[critKey] = critValue;
  });

  console.log("nyfs getWordsByCriteria invoked with:", criteria);

  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    resObj[wordtypeShorthand] = [];
    let wordSet = wordsBank[wordtypeShorthand];
    wordSet.forEach((lObj) => {
      if (
        Object.keys(criteria).every((critKey) => {
          let critValue = criteria[critKey];

          if (critKey === "andTags") {
            return uUtils.doStringsOrArraysMatch(lObj["tags"], critValue);
          } else if (critKey === "orTags") {
            return uUtils.doStringsOrArraysMatch(
              lObj["tags"],
              critValue,
              false
            );
          } else {
            return (
              lObj[critKey] &&
              uUtils.doStringsOrArraysMatch(lObj[critKey], critValue)
            );
          }
        })
      ) {
        resObj[wordtypeShorthand].push({
          lemma: lObj.lemma,
          id: lObj.id,
          tags: lObj.tags,
        });
      }
    });
  });

  return resObj;
};

exports.getTagsAndTopics = (currentLanguage) => {
  const { wordsBank } = require(`../../source/${currentLanguage}/words.js`);

  allTags = gpUtils.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects(
    wordsBank,
    "tags"
  );
  allTopics = gpUtils.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects(
    wordsBank,
    "topics"
  );
  return { allTags, allTopics };
};

exports.getBlankStChForThisWordtype = (lang, wordtypeLonghand) => {
  console.log("hmwo", { lang, wordtypeLonghand });

  let stChTraits = refFxn.getStructureChunkTraits(lang);
  Object.keys(stChTraits).forEach((traitKey) => {
    // If this traitKey is entirely invalid for this wordtype, remove it. eg tenseDescription for adjectives.
    if (
      stChTraits[traitKey].compatibleWordtypes &&
      !stChTraits[traitKey].compatibleWordtypes.includes(wordtypeLonghand)
    ) {
      delete stChTraits[traitKey];
    }
    // Add acceptable values for this traitKey per this wordtype. eg form has acceptable value "determiner" for article, but not for adjective.
    else {
      if (stChTraits[traitKey].possibleTraitValuesPerWordtype) {
        if (
          Object.keys(
            stChTraits[traitKey].possibleTraitValuesPerWordtype
          ).includes(wordtypeLonghand)
        ) {
          stChTraits[traitKey].possibleTraitValues =
            stChTraits[traitKey].possibleTraitValuesPerWordtype[
              wordtypeLonghand
            ];
        } else {
          console.log(
            "clhb",
            Object.keys(stChTraits[traitKey].possibleTraitValuesPerWordtype),
            "does not include",
            wordtypeLonghand
          );
        }
      }
      if (stChTraits[traitKey].possibleTraitValues) {
        stChTraits[traitKey].possibleTraitValues = Array.from(
          new Set(stChTraits[traitKey].possibleTraitValues)
        );
      }
    }
  });
  return stChTraits;
};

exports.getStChsForLemma = (lang, lemma) => {
  let lObjs = apiUtils.getLObjsForLemma(lang, lemma);

  return lObjs.map((lObj) => {
    let wordtypeShorthand = gpUtils.getWordtypeShorthandLObj(lObj);
    let wordtypeLonghand =
      refFxn.translateWordtypeShorthandLonghand(wordtypeShorthand);

    let stCh = apiUtils.getBlankStChForThisWordtype(lang, wordtypeLonghand);
    let routes = otUtils.giveRoutesAndTerminalValuesFromObject(lObj, true);
    routes.forEach((routeObj) => {
      if (routeObj.terminalValue === lemma) {
        Object.keys(routeObj.describedRoute).forEach((traitKey) => {
          let traitValue = routeObj.describedRoute[traitKey];

          if (
            stCh[traitKey].compatibleWordtypes &&
            !stCh[traitKey].compatibleWordtypes.includes(wordtypeLonghand)
          ) {
            consol.log(
              `tbaa Error: Wordtype ${wordtypeLonghand} not compatible with ${traitKey}=${traitValue} even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (
            stCh[traitKey].possibleTraitValues &&
            !stCh[traitKey].possibleTraitValues.includes(traitValue)
          ) {
            consol.log(
              `pomi Error: traitValue ${traitValue} not compatible with ${traitKey} even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (stCh[traitKey].expectedTypeOnStCh === "array") {
            stCh[traitKey].traitValue = [traitValue];
          } else if (stCh[traitKey].expectedTypeOnStCh === "string") {
            stCh[traitKey].traitValue = traitValue;
          }
        });
      }
    });

    if (stCh.gender) {
      stCh.gender.traitValue = Array.from(new Set(stCh.gender.traitValue));
    }

    Object.keys(stCh).forEach((traitKey) => {
      let traitObject = stCh[traitKey];
      if (
        traitObject.expectedTypeOnStCh === "array" &&
        !traitObject.traitValue
      ) {
        traitObject.traitValue = [];
      }
    });

    if (lObj.tags) {
      stCh.andTags.traitValue = lObj.tags;
    }

    stCh.wordtype = gpUtils.getWordtypeShorthandLObj(lObj);
    stCh.id = lObj.id;
    stCh.lemma = lObj.lemma;

    return stCh;
  });
};

exports.getLObjsForLemma = (lang, lemma) => {
  matches = [];
  let { wordsBank } = scUtils.getWordsAndFormulas(lang, true);
  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    wordSet = wordsBank[wordtypeShorthand];
    wordSet.forEach((lObj) => {
      if (
        lObj.lemma === lemma ||
        uUtils.isThisValueInThisKeyValueObject(lObj.inflections, lemma)
      ) {
        matches.push(lObj);
      }
    });
  });
  return matches;
};
