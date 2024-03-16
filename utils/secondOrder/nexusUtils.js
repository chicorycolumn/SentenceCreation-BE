const apiUtils = require("../../utils/secondOrder/apiUtils.js");
const { expect } = require("chai");
const allLangUtils = require("../allLangUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const gpUtils = require("../generalPurposeUtils.js");
const idUtils = require("../identityUtils.js");
const uUtils = require("../universalUtils.js");
const gdUtils = require("../grabDataUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");

exports.getLanguagesOfEquivalents = (sentenceFormulaId) => {
  const envir = apiUtils.getEnvirForFormulaBank("getLanguagesOfEquivalents");

  let lang = sentenceFormulaId.split("-")[0];
  const nexusSentenceFormulasBank =
    require(`../../source/${envir}/NEXUS/sentenceFormulas.js`).sentenceFormulas;
  let nexusObjs = nexusSentenceFormulasBank.filter((nexusObj) =>
    nexusObj.equivalents[lang].includes(sentenceFormulaId)
  );
  let res = [];
  nexusObjs.forEach((nexusObj) => {
    res.push(
      ...Object.keys(nexusObj.equivalents)
        .filter((k) => k !== lang)
        .filter((k) => nexusObj.equivalents[k].length)
    );
  });
  res = Array.from(new Set(res));
  return res;
};

exports.getEquivalents = (sentenceFormulaId, answerLanguage) => {
  const envir = apiUtils.getEnvirForFormulaBank("getEquivalents");

  let lang = sentenceFormulaId.split("-")[0];
  const nexusSentenceFormulasBank =
    require(`../../source/${envir}/NEXUS/sentenceFormulas.js`).sentenceFormulas;
  let nexusObjs = nexusSentenceFormulasBank.filter((nexusObj) =>
    nexusObj.equivalents[lang].includes(sentenceFormulaId)
  );
  let res = [];
  nexusObjs.forEach((nexusObj) => {
    res.push(...nexusObj.equivalents[answerLanguage]);
  });
  res = Array.from(new Set(res));
  return res;
};

exports.getNexusLemmaObjects = (lObj) => {
  if (lObj._untranslated) {
    return [];
  }

  const envir = apiUtils.getEnvir("getNexusLemmaObjects");

  let lang = idUtils.getLanguageFromLemmaObject(lObj);

  const wordtype = idUtils.getWordtypeLObj(lObj).toLowerCase();

  const nexusWordsBank = require(`../../source/${envir}/NEXUS/words/${wordtype}.json`);

  let resArr = nexusWordsBank.filter((nexusObject) =>
    nexusObject.traductions[lang].some((el) =>
      allLangUtils.compareLObjStems(el, lObj.id)
    )
  );

  // if (resArr.length > 1) {consol.logSpecial(9, `dlma getNexusLemmaObjects for ${lang} ${lObj.id} found ${resArr.length} nexus lObjs, usually only 1.`);}

  if (
    // !lObj._untranslated &&
    !resArr.length
  ) {
    console.log(nexusWordsBank[0]);
    // console.log(lObj);
    consol.throw(
      `dlmb getNexusLemmaObjects for ${lang} ${lObj.id} found ${resArr.length} nexus lObjs.`
    );
  }

  return resArr;
};

exports.accumulateThisKeyFromLObjs = (lObj, key) => {
  let fetchedLObjs = exports.getNexusLemmaObjects(lObj);

  let typeOfValue = uUtils.typeof(fetchedLObjs[0][key]);

  if (typeOfValue === "array") {
    let res = [];
    fetchedLObjs.forEach((l) => {
      if (l[key]) {
        res.push(...l[key]);
      }
    });

    return Array.from(new Set(res));
  } else if (typeOfValue === "keyValueObject") {
    let res = {};
    fetchedLObjs.forEach((l) => {
      if (l[key]) {
        Object.keys(l[key]).forEach((subkey) => {
          if (!res[subkey]) {
            res[subkey] = [];
          }

          let values = l[key][subkey];

          values.forEach((value) => {
            if (!res[subkey].includes(value)) {
              res[subkey].push(value);
            }
          });
        });
      }
    });

    return res;
  } else {
    consol.throw(
      `gyae "${key}" of lObj ${
        l.key
      } is not Array or KeyValueObject, instead is ${typeof l[key]}.`
    );
  }
};

exports.getPapers = (lObj) => {
  if (lObj._untranslated) {
    return [];
  }

  let papers =
    lObj.devHardcoded_tags ||
    exports.accumulateThisKeyFromLObjs(lObj, "papers");

  return papers;
};

exports.getTraductions = (lObj, targetlang, getAllIds, mapIdsToLObjs) => {
  if (lObj._untranslated) {
    return [];
  }

  if (mapIdsToLObjs && !getAllIds) {
    consol.throw("bcct Not possible.");
  }
  if (!targetlang) {
    targetlang = idUtils.getLanguageFromLemmaObject(lObj);
  }

  let traductions =
    lObj.devHardcoded_translations ||
    exports.accumulateThisKeyFromLObjs(lObj, "traductions");

  if (getAllIds) {
    let bank = gdUtils.grabLObjsByWordtype(
      targetlang,
      idUtils.getWordtypeLObj(lObj),
      false
    );

    let resArr = [];

    traductions[targetlang].forEach((id) => {
      bank.forEach((l) => {
        if (allLangUtils.compareLObjStems(l.id, id)) {
          resArr.push(l.id);
        }
      });
    });

    let ids = Array.from(new Set(resArr));

    return mapIdsToLObjs ? ids.map((id) => bank.find((l) => l.id === id)) : ids;
  }

  return traductions[targetlang];
};

exports.checkAllLObjsArePresentInNexus = (lang) => {
  const nexusWordsBank = exports.getNexusWithAllWordtypes();

  console.log("\n", "[1;35m " + `${lang}` + "[0m");

  gdUtils.readAllLObjs(
    lang,
    false,
    null,
    null,
    (lObjsForWordtype, res, wordtype) => {
      console.log(wordtype, "has", lObjsForWordtype.length, "lObjs.");
    }
  );

  let x = {
    howManyTimesIsEachLObjIdPresentInNexusWordsBank: {},
    problems: [],
  };

  Object.values(nexusWordsBank).forEach((nexusWB) => {
    nexusWB.forEach((nex) => {
      nex.traductions[lang].forEach((trad) => {
        let boolHolder = [];
        gdUtils.readAllLObjs(
          lang,
          false,
          boolHolder,
          (lObj, boolHolder, wordtype) => {
            if (
              !boolHolder.length &&
              allLangUtils.compareLObjStems(lObj.id, trad)
            ) {
              boolHolder.push(true);
            }
          }
        );

        if (!boolHolder.length) {
          x.problems.push(`"${trad}" present in NEXUS but absent in ${lang}.`);
        }
      });
    });
  });

  const lObjCallback = (lObj, x, wordtype) => {
    id = lObj.id;
    res = [];

    Object.values(nexusWordsBank).forEach((nexusWB) => {
      nexusWB.forEach((nex) => {
        nex.traductions[lang].forEach((trad) => {
          if (allLangUtils.compareLObjStems(trad, id)) {
            res.push(nex.key);
          }
        });
      });
    });

    if (!res.length) {
      x.problems.push(`"${id}" present in ${lang} but absent in NEXUS.`);
    }

    x.howManyTimesIsEachLObjIdPresentInNexusWordsBank[id] = res.length;
  };

  gdUtils.readAllLObjs(lang, false, x, lObjCallback);

  let interestingTally = {};
  Object.keys(x.howManyTimesIsEachLObjIdPresentInNexusWordsBank).forEach(
    (k) => {
      let v = x.howManyTimesIsEachLObjIdPresentInNexusWordsBank[k];
      if (v !== 1) {
        interestingTally[k] = v;
      }
    }
  );

  if (Object.keys(interestingTally).length) {
    console.log(
      "These not present exactly 1 times in nexus (which is the norm):\n",
      interestingTally
    );
  }

  return expect(x.problems).to.eql([]);
};

exports.getNexusWithAllWordtypes = () => {
  const envir = apiUtils.getEnvir("getNexusWithAllWordtypes");

  let wordtypes = refObj.wordtypes;

  const wordsBank = {};

  Object.keys(wordtypes)
    .map((w) => w.toLowerCase())
    .forEach((wordtype) => {
      if (wordtype === "fix") {
        return;
      }
      const words = require(`../../source/${envir}/NEXUS/words/${wordtype}.json`);
      wordsBank[wordtype] = words;
    });

  return wordsBank;
};

exports.getNexusForOneWordtype = (wordtype) => {
  const envir = apiUtils.getEnvir("getNexusForOneWordtype");
  return require(`../../source/${envir}/NEXUS/words/${wordtype}.json`);
};
