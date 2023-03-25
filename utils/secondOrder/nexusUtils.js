const { expect } = require("chai");
const allLangUtils = require("../allLangUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const gpUtils = require("../generalPurposeUtils.js");
const uUtils = require("../universalUtils.js");

exports.getNexusLemmaObjects = (lObj, env = "ref") => {
  let lang = gpUtils.getLanguageFromLemmaObject(lObj);

  const nexusWordsBank =
    require(`../../source/${env}/NEXUS/words.js`).wordsBank;

  const wordtype = gpUtils.getWordtypeLObj(lObj);

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
    targetlang = gpUtils.getLanguageFromLemmaObject(lObj);
  }

  let traductions =
    lObj.devHardcoded_translations ||
    exports.accumulateThisKeyFromLObjs(lObj, env, "traductions");

  if (getAllIds) {
    const { wordsBank } = require(`../../source/${env}/${targetlang}/words.js`);
    let bank = wordsBank[gpUtils.getWordtypeLObj(lObj)];

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

  const { wordsBank } = require(`../../source/${env}/${lang}/words.js`);

  console.log("\n", "[1;35m " + `${env} ${lang}` + "[0m");
  Object.keys(wordsBank).forEach((wbKey) => {
    console.log(wbKey, "has", wordsBank[wbKey].length, "lObjs.");
  });

  let howManyTimesIsEachLObjIdPresentInNexusWordsBank = {};
  let problems = [];

  Object.values(nexusWordsBank).forEach((nexusWB) => {
    nexusWB.forEach((nex) => {
      nex.traductions[lang].forEach((trad) => {
        if (
          !Object.values(wordsBank).some((_wb) => {
            return _wb.some((lObj) =>
              allLangUtils.compareLObjStems(lObj.id, trad)
            );
          })
        ) {
          problems.push(`"${trad}" present in NEXUS but absent in ${lang}.`);
        }
      });
    });
  });

  Object.keys(wordsBank).forEach((wbKey) => {
    let wb = wordsBank[wbKey];

    wb.forEach((lObj) => {
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
        problems.push(`"${id}" present in ${lang} but absent in NEXUS.`);
      }

      howManyTimesIsEachLObjIdPresentInNexusWordsBank[id] = res.length;
    });
  });

  let interestingTally = {};
  Object.keys(howManyTimesIsEachLObjIdPresentInNexusWordsBank).forEach((k) => {
    let v = howManyTimesIsEachLObjIdPresentInNexusWordsBank[k];
    if (v !== 1) {
      interestingTally[k] = v;
    }
  });

  if (Object.keys(interestingTally).length) {
    console.log(
      "These not present exactly 1 times in nexus (which is the norm):\n",
      interestingTally
    );
  }

  return expect(problems).to.eql([]);
};
