const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const gdUtils = require("./grabDataUtils.js");
const ivUtils = require("./secondOrder/inputValidationUtils.js");
const nexusUtils = require("./secondOrder/nexusUtils.js");

exports.grabLObjById = (lObjId, envir = "ref") => {
  let split = lObjId.split("-");
  let lang = split[0].toUpperCase();
  let wordtype = split[1].toUpperCase();

  const lObjs = require(`../source/${envir}/${lang}/words/${wordtype}.json`);
  let lObj = lObjs.find((l) => l.id === lObjId);

  if (!lObj) {
    consol.throw(`ecwt No lObj found for lObjId "${lObjId}".`);
  }

  return lObj;
};

exports.grabLObjsByWordtype = (lang, wordtype, envir = "ref", useDummy) => {
  lang = lang.toUpperCase();

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

exports.readAllLObjs = (
  lang,
  env = "ref",
  useDummy,
  res,
  lObjCallback,
  wordsetCallback
) => {
  ivUtils.validateLang(lang, 13);

  const fs = require("fs");
  let filenames = fs.readdirSync(`source/${env}/${lang}/words`);
  filenames
    .filter((filename) => filename.split(".")[1] === "json")
    .forEach((filename) => {
      let wordtype = filename.split(".")[0];
      let wordsBank = gdUtils.grabLObjsByWordtype(
        lang,
        wordtype,
        env,
        useDummy
      );

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

exports.grabFormulaById = (formulaId, useDummy, lang, envir = "ref") => {
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
  env = "ref",
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
    currentLanguage,
    env
  );

  if (!sentenceFormula) {
    consol.throw(
      `#ERR quky gd:grabFormula. No sentenceFormula for this id "${sentenceFormulaId}".`
    );
  }

  return uUtils.copyWithoutReference(sentenceFormula);
};

exports.grabSkeletonFormulas = (lang, envir = "ref") => {
  lang = lang.toUpperCase();

  const fs = require("fs");
  let filenames = fs.readdirSync(`source/${envir}/${lang}/formulas`);

  let res = filenames.map((filename) => {
    filename = filename.split(".")[0];

    let formulaObject = gdUtils.grabFormulaById(filename, false, lang, envir);

    return [
      formulaObject.id,
      formulaObject.guide,
      nexusUtils.getLanguagesOfEquivalents(formulaObject.id, envir),
    ];
  });

  return res;
};

exports.grabInflections = (lObjId, envir = "ref") => {
  let data = gdUtils._grabLObjInfo(lObjId, envir);
  return data.inflections;
};

exports.addInflections = (lObj, envir = "ref") => {
  if (lObj.dummy) {
    return;
  }

  let data = gdUtils._grabLObjInfo(lObj.id, envir);
  lObj.inflections = data.inflections;
};

exports.addExtraToLObj = (lObj, envir = "ref") => {
  if (lObj.dummy) {
    return;
  }

  let data = gdUtils._grabLObjInfo(lObj.id, envir);
  lObj.extra = data.extra;
};

exports._grabLObjInfo = (lObjId, envir = "ref") => {
  let split = lObjId.split("-");
  let lang = split[0].toUpperCase();
  let wordtype = split[1];
  const data = require(`../source/${envir}/${lang}/words/${wordtype}/${lObjId}.json`);
  if (!data) {
    console.log(`rhoc Failed to find lemma object data for for ${lObjId}`);
  }
  return data;
};
