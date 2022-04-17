const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../../utils/secondOrder/educatorUtils.js");
const scUtils = require("../../utils/sentenceCreatingUtils.js");
const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const aaUtils = require("../../utils/auxiliaryAttributeUtils.js");
const ivUtils = require("../../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
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

exports.makeStChsFromLObjs = (lang, lemma) => {
  let lObjs = apiUtils.getLObjsForLemma(lang, lemma); //swde We now will take women lemma and still get woman lobj.

  lObjs.forEach((lObj) => {
    let wordtypeShorthand = gpUtils.getWordtypeShorthandLObj(lObj);
    let wordtypeLonghand =
      refFxn.translateWordtypeShorthandLonghand(wordtypeShorthand);

    let blankStCh = apiUtils.getBlankStChForThisWordtype(
      lang,
      wordtypeShorthand
    );

    let inflectionChains =
      refObj.lemmaObjectTraitKeys[lang].inflectionChains[wordtypeLonghand];

    // lfUtils.traverseAndRecordInflections()

    //Okay, so if I give you "women" I want you to return [
    //   ["number", "plural"],
    //   ["gcase", "nom"],
    // ]
  });
};

exports.getLObjsForLemma = (lang, lemma) => {
  matches = [];
  let { wordsBank } = scUtils.getWordsAndFormulas(lang, true);
  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    wordSet = wordsBank[wordtypeShorthand];
    wordSet.forEach((lObj) => {
      if (lObj.lemma === lemma) {
        matches.push(lObj);
      }
    });
  });
  return matches;
};
