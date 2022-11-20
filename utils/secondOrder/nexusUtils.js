const { expect } = require("chai");
const allLangUtils = require("../allLangUtils.js");

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
            return _wb.some((lObj) => lObj.id === trad);
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
            if (
              allLangUtils.getLObjIdStem(trad) ===
              allLangUtils.getLObjIdStem(id)
            ) {
              res.push(nex.key);
            }
          });
        });
      });

      if (res.length !== 1) {
        problems.push(
          `${id} is present in nexus words bank _${res.length}_ times but should be 1.`
        );
      }

      howManyTimesIsEachLObjIdPresentInNexusWordsBank[id] = res;
    });
  });

  if (problems.length) {
    console.log(problems);
  }

  expect(problems.length).to.equal(0);
};
