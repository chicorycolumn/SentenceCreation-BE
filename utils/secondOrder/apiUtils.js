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

exports.getBlankStChForThisWordtype = (lang, wordtypeLonghand) => {
  let stChTraits = refFxn.getStructureChunkTraits(lang);
  Object.keys(stChTraits).forEach((key) => {
    let value = stChTraits[key];
    if (
      value.compatibleWordtypes &&
      !value.compatibleWordtypes.includes(wordtypeLonghand)
    ) {
      delete stChTraits[key];
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

    stCh.gender.traitValue = Array.from(new Set(stCh.gender.traitValue));

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
