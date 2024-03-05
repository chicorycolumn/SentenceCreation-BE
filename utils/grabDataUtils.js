const apiUtils = require("./secondOrder/apiUtils.js");
const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const gdUtils = require("./grabDataUtils.js");
const ivUtils = require("./secondOrder/inputValidationUtils.js");
const nexusUtils = require("./secondOrder/nexusUtils.js");

exports.grabLObjById = (lObjId) => {
  let split = lObjId.split("-");
  let lang = split[0].toUpperCase();
  let wordtype = split[1].toUpperCase();
  const envir = apiUtils.getEnvir("grabLObjById");

  const lObjs = require(`../source/${envir}/${lang}/words/${wordtype}.json`);
  let lObj = lObjs.find((l) => l.id === lObjId);

  if (!lObj) {
    consol.throw(`ecwt No lObj found for lObjId "${lObjId}".`);
  }

  return lObj;
};

exports.grabLObjsByWordtype = (lang, wordtype, useDummy) => {
  lang = lang.toUpperCase();
  const envir = apiUtils.getEnvir("grabLObjsByWordtype");

  const wordsBank = require(`../source/${envir}/${lang}/words/${wordtype}.json`);

  if (!wordsBank) {
    console.log(
      `rhob Failed to find lemma object data for for lang="${lang}" wordtype="${wordtype}" envir="${envir}"`
    );
  }

  if (useDummy) {
    const {
      dummyWordsBank,
    } = require(`../source/${envir}/${lang}/dummy/dummyWords.js`);
    let dummyWords = dummyWordsBank[wordtype];
    return [...wordsBank, ...dummyWords];
  }

  return wordsBank;
};

exports.readAllLObjs = (lang, useDummy, res, lObjCallback, wordsetCallback) => {
  ivUtils.validateLang(lang, 13);
  const envir = apiUtils.getEnvir("readAllLObjs");

  const fs = require("fs");
  let filenames = fs.readdirSync(`source/${envir}/${lang}/words`);
  filenames
    .filter((filename) => filename.split(".")[1] === "json")
    .forEach((filename) => {
      let wordtype = filename.split(".")[0];
      let wordsBank = gdUtils.grabLObjsByWordtype(lang, wordtype, useDummy);

      if (wordsetCallback) {
        wordsetCallback(wordsBank, res, wordtype);
      } else {
        wordsBank.forEach((lObj) => {
          lObjCallback(lObj, res, wordtype);
        });
      }
    });

  return res;
};

exports.grabFormulaById = (formulaId, useDummy, lang) => {
  const envir = apiUtils.getEnvir("grabFormulaById");

  if (useDummy) {
    const {
      dummySentenceFormulasBank,
    } = require(`../source/${envir}/${lang}/dummy/dummySentenceFormulas.js`);
    return dummySentenceFormulasBank.find((sf) => sf.id === formulaId);
  }

  let path = `../source/${envir}/${lang}/formulas/${formulaId}.json`;
  const data = require(path);

  if (!data) {
    consol.throw(
      `ftdc No formula found at path ${`../source/${envir}/${lang}/formulas/${formulaId}.json`}`
    );
  }

  return data;
};

exports.grabFormula = (
  currentLanguage,
  sentenceFormulaId,
  useDummy,
  sentenceFormulaFromEducator
) => {
  if (sentenceFormulaFromEducator) {
    return uUtils.copyWithoutReference(sentenceFormulaFromEducator);
  }

  if (!sentenceFormulaId) {
    sentenceFormulaId = `${currentLanguage}-default`;
  }

  let sentenceFormula = gdUtils.grabFormulaById(
    sentenceFormulaId,
    useDummy,
    currentLanguage
  );

  if (!sentenceFormula) {
    consol.throw(
      `#ERR quky gd:grabFormula. No sentenceFormula for this id "${sentenceFormulaId}".`
    );
  }

  return uUtils.copyWithoutReference(sentenceFormula);
};

exports.grabSkeletonFormulas = (lang) => {
  const envir = apiUtils.getEnvir("grabSkeletonFormulas");
  lang = lang.toUpperCase();

  const fs = require("fs");
  let filenames = fs.readdirSync(`source/${envir}/${lang}/formulas`);

  let res = filenames.map((filename) => {
    filename = filename.split(".")[0];

    let formulaObject = gdUtils.grabFormulaById(filename, false, lang);

    return [
      formulaObject.id,
      formulaObject.guide,
      nexusUtils.getLanguagesOfEquivalents(formulaObject.id),
    ];
  });

  return res;
};

exports.grabInflections = (lObjId) => {
  let data = gdUtils._grabLObjInfo(lObjId);
  return data.inflections;
};

exports.addInflections = (lObj) => {
  if (lObj.dummy) {
    return;
  }

  let data = gdUtils._grabLObjInfo(lObj.id);
  lObj.inflections = data.inflections;
};

exports.addExtraToLObj = (lObj) => {
  if (lObj.dummy) {
    return;
  }

  let data = gdUtils._grabLObjInfo(lObj.id);
  lObj.extra = data.extra;
};

exports._grabLObjInfo = (lObjId) => {
  const envir = apiUtils.getEnvir("_grabLObjInfo");

  let split = lObjId.split("-");
  let lang = split[0].toUpperCase();
  let wordtype = split[1];
  const data = require(`../source/${envir}/${lang}/words/${wordtype}/${lObjId}.json`);
  if (!data) {
    console.log(`rhoc Failed to find lemma object data for for ${lObjId}`);
  }
  return data;
};
