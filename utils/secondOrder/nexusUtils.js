const { expect } = require("chai");
const allLangUtils = require("../allLangUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const gpUtils = require("../generalPurposeUtils.js");
const idUtils = require("../identityUtils.js");
const uUtils = require("../universalUtils.js");
const scUtils = require("../sentenceCreatingUtils.js");

exports.getLanguagesOfEquivalents = (sentenceFormulaId, env = "ref") => {
  let lang = sentenceFormulaId.split("-")[0];
  const nexusSentenceFormulasBank =
    require(`../../source/${env}/NEXUS/sentenceFormulas.js`).sentenceFormulas;
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

exports.getEquivalents = (sentenceFormulaId, answerLanguage, env = "ref") => {
  let lang = sentenceFormulaId.split("-")[0];
  const nexusSentenceFormulasBank =
    require(`../../source/${env}/NEXUS/sentenceFormulas.js`).sentenceFormulas;
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

exports.getNexusLemmaObjects = (lObj, env = "ref") => {
  let lang = idUtils.getLanguageFromLemmaObject(lObj);

  const nexusWordsBank =
    require(`../../source/${env}/NEXUS/words.js`).wordsBank;

  const wordtype = idUtils.getWordtypeLObj(lObj);

  let resArr = nexusWordsBank[wordtype].filter((lemmaObject) =>
    lemmaObject.traductions[lang].some((el) =>
      allLangUtils.compareLObjStems(el, lObj.id)
    )
  );

  if (resArr.length > 1) {
    consol.logSpecial(
      9,
      `dlma getNexusLemmaObjects for ${lang} ${lObj.id} found ${resArr.length} nexus lObjs, usually only 1.`
    );
  }

  if (!resArr.length) {
    consol.throw(
      `dlmb getNexusLemmaObjects for ${lang} ${lObj.id} found 0 ${resArr.length} nexus lObjs.`
    );
  }

  return resArr;
};

exports.accumulateThisKeyFromLObjs = (lObj, env, key) => {
  let fetchedLObjs = exports.getNexusLemmaObjects(lObj, env);

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

exports.getPapers = (lObj, env = "ref") => {
  let papers =
    lObj.devHardcoded_tags ||
    exports.accumulateThisKeyFromLObjs(lObj, env, "papers");

  return papers;
};

exports.getTraductions = (
  lObj,
  targetlang,
  getAllIds,
  mapIdsToLObjs,
  env = "ref"
) => {
  if (mapIdsToLObjs && !getAllIds) {
    consol.throw("bcct Not possible.");
  }
  if (!targetlang) {
    targetlang = idUtils.getLanguageFromLemmaObject(lObj);
  }

  let traductions =
    lObj.devHardcoded_translations ||
    exports.accumulateThisKeyFromLObjs(lObj, env, "traductions");

  if (getAllIds) {
    let bank = scUtils.grabWordsByWordtype(
      targetlang,
      idUtils.getWordtypeLObj(lObj),
      env,
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

exports.checkAllLObjsArePresentInNexus = (env, lang) => {
  const nexusWordsBank =
    require(`../../source/${env}/NEXUS/words.js`).wordsBank;

  console.log("\n", "[1;35m " + `${env} ${lang}` + "[0m");

  scUtils.grabWordsFromAllWordtypes(
    lang,
    env,
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
        scUtils.grabWordsFromAllWordtypes(
          lang,
          env,
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

  scUtils.grabWordsFromAllWordtypes(lang, env, false, x, lObjCallback);

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
