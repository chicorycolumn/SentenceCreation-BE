const { expect } = require("chai");
const allLangUtils = require("../allLangUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const gpUtils = require("../generalPurposeUtils.js");

exports.getNexusLemmaObject = (lObj, env = "ref") => {
  let lang = gpUtils.getLanguageFromLemmaObject(lObj);

  const nexusWordsBank =
    require(`../../source/${env}/NEXUS/words.js`).wordsBank;

  const wordtypeShorthand = gpUtils.getWordtypeShorthandLObj(lObj);

  let resArr = nexusWordsBank[wordtypeShorthand].filter((lemmaObject) => {
    return lemmaObject.traductions[lang].some((el) =>
      allLangUtils.compareLObjStems(el, lObj.id)
    );
  });

  if (resArr.length !== 1) {
    consol.throw(
      `dlmb getNexusLemmaObject for ${lang} ${lObj.id} found ${resArr.length} not 1.`
    );
  }

  return resArr[0];
};

exports.getPapers = (lObj, env = "ref") => {
  return (
    lObj.devHardcoded_tags || exports.getNexusLemmaObject(lObj, env).papers
  );
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
    exports.getNexusLemmaObject(lObj, env).traductions;

  if (getAllIds) {
    const { wordsBank } = require(`../../source/${env}/${targetlang}/words.js`);
    let bank = wordsBank[gpUtils.getWordtypeShorthandLObj(lObj)];

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

  return targetlang ? traductions[targetlang] : traductions;
};

exports.checkAllLObjsArePresentInNexus = (env, lang) => {
  const nl = () => {
    console.log("");
  };

  const nexusWordsBank =
    require(`../../source/${env}/NEXUS/words.js`).wordsBank;

  const { wordsBank } = require(`../../source/${env}/${lang}/words.js`);

  console.log("--------------------------------------------");
  console.log("--------------------------------------------");
  console.log("-------checkAllLObjsArePresentInNexus-------");
  console.log("--------------------------------------------");
  console.log("--------------------------------------------");
  nl();
  console.log("env = ", env);
  console.log("lang =", lang);
  nl();

  Object.keys(wordsBank).forEach((wbKey) => {
    wb = wordsBank[wbKey];
    console.log(wbKey, "has", wb.length, "lObjs.");
    nl();
  });

  howManyTimesIsEachLObjIdPresentInNexusWordsBank = {};
  problems = [];

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
          problems.push(
            `${trad} is present in nexus words bank but no lObj was found.`
          );
        }
      });
    });
  });

  Object.keys(wordsBank).forEach((wbKey) => {
    wb = wordsBank[wbKey];
    howManyTimesIsEachLObjIdPresentInNexusWordsBank = {};

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

      if (res.length !== 1) {
        problems.push(
          `${id} is present in nexus bank ${res.length} times but should be 1.`
        );
      }

      howManyTimesIsEachLObjIdPresentInNexusWordsBank[id] = res;
    });
  });

  if (problems.length) {
    console.log("wdgt problems:", problems);
  }

  expect(problems).to.eql([]);
};
