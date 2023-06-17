const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const gdUtils = require("./grabDataUtils.js");
const ivUtils = require("./secondOrder/inputValidationUtils.js");

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
  let files = fs.readdirSync(`source/${env}/${lang}/words`);
  files
    .filter((file) => file.split(".")[1] === "json")
    .forEach((file) => {
      let wordtype = file.split(".")[0];
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

  const sentenceFormulasBank = gdUtils.grabFormulas(
    currentLanguage,
    useDummy,
    env
  );

  if (!sentenceFormulasBank) {
    consol.throw("sfft grabFormula found nothing, args were:", {
      env,
      currentLanguage,
      sentenceFormulaId,
      useDummy,
      sentenceFormulaFromEducator,
    });
  }

  let sentenceFormula = sentenceFormulasBank.find(
    (senFor) => senFor.sentenceFormulaId === sentenceFormulaId
  );

  if (!sentenceFormula) {
    consol.throw(
      `#ERR quky gd:grabFormula. No sentenceFormula for this sentenceFormulaId "${sentenceFormulaId}".`
    );
  }

  return uUtils.copyWithoutReference(sentenceFormula);
};

exports.grabFormulas = (lang, useDummy, envir = "ref") => {
  lang = lang.toUpperCase();

  if (useDummy) {
    const {
      dummySentenceFormulasBank,
    } = require(`../source/${envir}/${lang}/dummy/dummySentenceFormulas.js`);

    return dummySentenceFormulasBank;
  }

  const {
    sentenceFormulasBank,
  } = require(`../source/${envir}/${lang}/sentenceFormulas.js`);

  return sentenceFormulasBank;
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
