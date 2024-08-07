const apiUtils = require(".././secondOrder/apiUtils.js");
const gpUtils = require(".././generalPurposeUtils.js");
const uUtils = require(".././universalUtils.js");
const consol = require(".././zerothOrder/consoleLoggingUtils.js");
const otUtils = require(".././objectTraversingUtils.js");
const edUtils = require("./educatorUtils.js");
const frUtils = require(".././formattingResponseUtils.js");
const refObj = require(".././reference/referenceObjects.js");
const fs = require("fs");
const gdUtils = require("../grabDataUtils.js");

exports.checkOutputArrayForMissingUnits = (
  sentenceFormula,
  outputArray,
  currentLanguage,
  etiquette,
  useDummy
) => {
  if (useDummy) {
    return;
  }

  let primaryOrders = sentenceFormula.orders.primary;
  let outputChunkIds = outputArray.map((unit) => unit.structureChunk.chunkId);

  if (
    !primaryOrders.some((order) =>
      order.every((chunkId) => outputChunkIds.includes(chunkId))
    )
  ) {
    consol.log("dwke primaryOrders", primaryOrders);
    consol.log("dwke outputChunkIds", outputChunkIds);
    consol.throw(
      `dwke checkOutputArrayForMissingUnits. "${etiquette}" "${currentLanguage}" outputArray didn't have all the requisite units. See above.`
    );
  }
};

exports.getLemmaObjectsWithoutGivenSelectorKey = (
  useDummy,
  currentLanguage,
  wordtype,
  selectorKey
) => {
  let words = gdUtils.grabLObjsByWordtype(currentLanguage, wordtype, useDummy);
  return words.filter((lObj) => !lObj[selectorKey]);
};

exports.checkWords = (currentLanguage) => {
  const langUtils = require(`../../source/all/${currentLanguage}/langUtils.js`);

  let nounPersonsWithoutGender = edUtils.getLemmaObjectsWithoutGivenSelectorKey(
    useDummy,
    currentLanguage,
    "npe",
    "gender"
  );

  let nounCommonsWithoutGender = edUtils.getLemmaObjectsWithoutGivenSelectorKey(
    useDummy,
    currentLanguage,
    "nco",
    "gender"
  );

  let nounsWithoutGender = [
    ...nounPersonsWithoutGender,
    ...nounCommonsWithoutGender,
  ];

  return {
    nounsWithoutGender: nounsWithoutGender.map((lObj) => [lObj.lemma, lObj.id]),
  };
};

/**
 * Gives a list of homographs (allo or syn) to the educator, so that they may take action on these.
 * @param {string} currentLanguage
 * @param {string} homographType - "syn", "allo", or "all".
 * @param {object} ignore - What to ignore: "ignoreV2V3Synhoms", "ignoreClarifiedAllohoms"
 */
exports.findHomographs = (currentLanguage, homographType, ignore) => {
  if (currentLanguage !== "ENG") {
    ignore.ignoreV2V3Synhoms = false;
  }

  if (!["syn", "allo", "all"].includes(homographType)) {
    consol.log("tvgz findHomographs", { homographType });
    throw "findHomographs fxn: I don't know what type of homograph you want me to find. I've logged above what you gave me.";
  }

  const langUtils = require(`../../source/all/${currentLanguage}/langUtils.js`);

  let recordOfTerminalValuesAndPaths = [];

  const wordsetCallback = (
    wordsBank,
    recordOfTerminalValuesAndPaths,
    wordtype
  ) => {
    langUtils.expandLemmaObjects(wordsBank, wordtype, currentLanguage);

    wordsBank.forEach((lObj) => {
      gdUtils.addInflections(lObj);

      let terminalValuesAndPathsArr =
        otUtils.giveRoutesAndTerminalValuesFromObject(lObj);

      terminalValuesAndPathsArr.forEach((terminalValuesAndPathsUnit) => {
        terminalValuesAndPathsUnit.nestedRoute.unshift(lObj.id);
        recordOfTerminalValuesAndPaths.push(terminalValuesAndPathsUnit);
      });
    });
  };

  gdUtils.readAllLObjs(
    currentLanguage,
    false,
    recordOfTerminalValuesAndPaths,
    null,
    wordsetCallback
  );

  let severallyAppearingTerminalValuesArr = [];
  let temporaryArr = [];
  let homographs = {};

  consol.log("recordOfTerminalValuesAndPaths", recordOfTerminalValuesAndPaths);

  recordOfTerminalValuesAndPaths.forEach((unit) => {
    let { terminalValue } = unit;
    if (
      temporaryArr.includes(terminalValue) &&
      !severallyAppearingTerminalValuesArr.includes(terminalValue)
    ) {
      severallyAppearingTerminalValuesArr.push(terminalValue);
    } else {
      temporaryArr.push(terminalValue);
    }
  });

  severallyAppearingTerminalValuesArr.forEach((terminalValue) => {
    homographs[terminalValue] = recordOfTerminalValuesAndPaths
      .filter((unit) => unit.terminalValue === terminalValue)
      .map((unit) => unit.nestedRoute);
  });

  let allohomographs = {};
  let synhomographs = {};

  Object.keys(homographs).forEach((homographWord) => {
    let homographRoutes = homographs[homographWord];

    if (
      uUtils.doesArrContainDifferentItems(
        homographRoutes.map((route) => route[0])
      )
    ) {
      checkForIgnoringsAndAddToResult(
        allohomographs,
        homographWord,
        homographRoutes
      );
    } else {
      checkForIgnoringsAndAddToResult(
        synhomographs,
        homographWord,
        homographRoutes
      );
    }
  });

  if (homographType === "allo") {
    return allohomographs;
  } else if (homographType === "syn") {
    return synhomographs;
  } else if (homographType === "all") {
    return homographs;
  }

  function checkForIgnoringsAndAddToResult(
    resultObj,
    homographWord,
    homographRoutes
  ) {
    let firstStepsOfRoute = homographRoutes.map((arr) => arr[0]);
    let secondStepsOfRoute = homographRoutes.map((arr) => arr[1]);

    if (
      ignore.ignoreClarifiedAllohoms &&
      uUtils.doesArrContainDifferentItems(firstStepsOfRoute) //At least some are allohoms.
    ) {
      let isEveryAllohomAlreadyClarified = firstStepsOfRoute.every(
        (lemmaObjectId) => {
          let lemmaObject = gdUtils.grabLObjById(lemmaObjectId);

          if (!lemmaObject) {
            throw (
              "ED:checkForIgnoringsAndAddToResult - I couldn't find a lobj for this id:" +
              lemmaObjectId
            );
          }

          if (
            lemmaObject.allohomInfo &&
            lemmaObject.allohomInfo.emoji &&
            lemmaObject.allohomInfo.text
          ) {
            return true;
          }
        }
      );

      if (isEveryAllohomAlreadyClarified) {
        return;
      }
    } else if (ignore.ignoreV2V3Synhoms) {
      if (
        !uUtils.doesArrContainDifferentItems(firstStepsOfRoute) && //All are synhoms.
        uUtils.doesArrHaveOnlyTheseMembers(secondStepsOfRoute, ["v2", "v3"])
      ) {
        return;
      }
    }
    resultObj[homographWord] = homographRoutes;
  }
};

exports.checkLemmaObjectIds = (currentLanguage) => {
  let schematic = [];

  const wordsetCallback = (wordsBank, res, wordtype) => {
    res.push(...wordsBank.map((lObj) => [lObj.id, lObj.lemma]));
  };

  gdUtils.readAllLObjs(
    currentLanguage,
    false,
    schematic,
    null,
    wordsetCallback
  );

  let tempArr = [];
  let duplicateIds = [];

  schematic.forEach((item) => {
    if (tempArr.includes(item[0])) {
      duplicateIds.push(item[0]);
    } else {
      tempArr.push(item[0]);
    }
  });

  return { schematic, duplicateIds };
};

exports.checkSentenceFormulaIds = (currentLanguage) => {
  const sentenceFormulasBank = edUtils.getSentenceFormulasBank(currentLanguage);

  let schematic = sentenceFormulasBank.map((senFor) => [senFor.id]);

  function findDuplicates(index) {
    let tempArr = [];
    let duplicateIds = [];

    schematic.forEach((item) => {
      if (tempArr.includes(item[index])) {
        duplicateIds.push(item[index]);
      } else {
        tempArr.push(item[index]);
      }
    });

    return duplicateIds;
  }

  let duplicateIds = findDuplicates(0);

  return { schematic, duplicateIds };
};

exports.getSentenceFormulasBank = (currentLanguage) => {
  const envir = apiUtils.getEnvirForFormulaBank("getSentenceFormulasBank");

  const {
    sentenceFormulasBank,
  } = require(`../../source/${envir}/${currentLanguage}/sentenceFormulas.js`);
  return sentenceFormulasBank;
};

exports.reverseContractions = (lang) => {
  let rev = {};
  Object.values(refObj.contractions[lang]).forEach((contractionsSet) => {
    Object.keys(contractionsSet).forEach((v) => {
      let k = contractionsSet[v];
      k = k
        .split("")
        .filter((char) => !["ª", "¤"].includes(char))
        .join("")
        .toLowerCase();
      v = v
        .split("")
        .filter((char) => !["ª", "¤"].includes(char))
        .join("")
        .toLowerCase();
      if (!rev[k]) {
        rev[k] = [v];
      } else {
        if (!rev[k].includes(v)) {
          rev[k].push(v);
        }
      }
    });
  });

  let res = {};
  res[lang] = rev;
  console.log(res);
};

exports.markPlayerAnswer = (lang, correctArr, input) => {
  input = uUtils.purifyString(input);

  if (lang === "ENG") {
    input = input.replace(/cannot/g, "can't");
  }

  correctArr = correctArr.map((s) => uUtils.purifyString(s));

  let inputArr = gpUtils.explodeContractions(lang, input);

  let bool = inputArr.some((inputEl) => correctArr.includes(inputEl));

  if (!bool) {
    console.log("Correct answer array:");
    console.log(correctArr);
    console.log("has no intersection with player answer array:");
    console.log(inputArr);
  }

  return bool;
};

exports.splitLemmaObjectsFromBigJsonToIndividualJsons = (
  e,
  l,
  suffix = "",
  wordtypes = ["adj", "art", "nco", "npe", "pre", "pro", "ver", "adv"]
) => {
  fs.mkdirSync(`source/${e}/${l}/words`);

  wordtypes.forEach((wordtype) => {
    let inputPath = `source/${e}/${l}/raw/${wordtype}${suffix}.json`;
    let outputPath = `source/${e}/${l}/words/${wordtype}.json`;

    if (fs.existsSync(inputPath)) {
      const words = require("../../" + inputPath);
      if (!words) {
        return;
      }

      let skeletons = [];
      let meats = [];

      words.forEach((word) => {
        let meat = {
          inflections: word.inflections,
        };
        if (word.otherShapes) {
          meat.extra = { otherShapes: word.otherShapes };
        }

        if (Object.keys(word).includes("_inflectionsRoot")) {
          console.log(`SKIPPED because uses _inflectionsRoot: ${word.id}`);
          if (word.otherShapes) {
            console.log(
              "DROPPED this data. Hopefully it is present in inflections parent:"
            );
            console.log(word.otherShapes);
          }
        } else {
          meats.push([word.id, meat]);
        }

        delete word.inflections;
        delete word.otherShapes;

        skeletons.push(word);
      });

      uUtils.writeJSON(outputPath, skeletons);
      fs.mkdirSync(`source/${e}/${l}/words/${wordtype}`);
      meats.forEach((meatArr) => {
        uUtils.writeJSON(
          `source/${e}/${l}/words/${wordtype}/${meatArr[0]}.json`,
          meatArr[1],
          true
        );
      });
    }
  });
};

exports.splitLemmaObjectsAndWriteAsJsonFromJsDict = (e, l) => {
  fs.mkdirSync(`source/${e}/${l}/words`);

  const { wordsBank } = require(`../../source/${e}/${l}/words.js`);

  ["adj", "art", "nco", "npe", "pre", "pro", "ver", "adv"].forEach((wordtype) => {
    let words = wordsBank[wordtype];
    if (!words) {
      return;
    }

    let skeletons = [];
    let meats = [];

    words.forEach((word) => {
      let meat = {
        inflections: word.inflections,
      };
      if (word.otherShapes) {
        meat.extra = { otherShapes: word.otherShapes };
      }
      meats.push([word.id, meat]);

      delete word.inflections;
      delete word.otherShapes;

      skeletons.push(word);
    });

    uUtils.writeJSON(`source/${e}/${l}/words/${wordtype}.json`, skeletons);
    fs.mkdirSync(`source/${e}/${l}/words/${wordtype}`);
    meats.forEach((meatArr) => {
      uUtils.writeJSON(
        `source/${e}/${l}/words/${wordtype}/${meatArr[0]}.json`,
        meatArr[1]
      );
    });
  });
};

exports.addGuideSentenceToFormulaAndWriteAsJson = (e, l) => {
  fs.mkdirSync(`source/${e}/${l}/formulas`);

  const {
    sentenceFormulasBank,
  } = require(`../../source/${e}/${l}/sentenceFormulas.js`);

  sentenceFormulasBank.forEach((formulaObject) => {
    let guideSentence = formulaObject.sentenceStructure
      .map((chunk) => frUtils.getAestheticGuideword(chunk, formulaObject))
      .join(" ");

    if (!guideSentence || !guideSentence.length) {
      console.log(formulaObject);
    }

    guideSentence =
      guideSentence[0].toUpperCase() + guideSentence.slice(1) + ".";

    let newObj = {};

    newObj.id = formulaObject.id;
    newObj.guide = guideSentence;

    Object.keys(formulaObject).forEach((k) => {
      let v = formulaObject[k];
      if (k !== "id") {
        newObj[k] = v;
      }
    });

    uUtils.writeJSON(
      `source/${e}/${l}/formulas/${formulaObject.id}.json`,
      newObj
    );
  });
};
