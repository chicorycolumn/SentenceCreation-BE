const gpUtils = require("../../utils/generalPurposeUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../../utils/secondOrder/educatorUtils.js");
const scUtils = require("../../utils/sentenceCreatingUtils.js");
const lfUtils = require("../../utils/lemmaFilteringUtils.js");
const aaUtils = require("../../utils/auxiliaryAttributeUtils.js");
const otUtils = require("../../utils/objectTraversingUtils.js");
const ivUtils = require("../../utils/secondOrder/inputValidationUtils.js");
const pvUtils = require("../../utils/secondOrder/processValidationUtils.js");
const frUtils = require("../../utils/formattingResponseUtils.js");
const apiUtils = require("../../utils/secondOrder/apiUtils.js");
const refObj = require("../../utils/reference/referenceObjects.js");
const nexusUtils = require("../../utils/secondOrder/nexusUtils.js");

const allLangUtils = require("../../utils/allLangUtils.js");
const refFxn = require("../reference/referenceFunctions.js");

exports.getSentenceFormulas = (questionFormulaId, answerLanguage, env) => {
  if (!env) {
    env = "ref";
  }

  let questionLanguage = gpUtils.getLanguageFromFormulaId(questionFormulaId);
  ivUtils.validateLang(questionLanguage, 14);
  ivUtils.validateLang(answerLanguage, 15);

  let questionSentenceFormulasBank = scUtils.getWordsAndFormulas(
    questionLanguage,
    false,
    true,
    env
  ).sentenceFormulasBank;

  const getFormulaById = (bank, id, label) => {
    let formulas = bank.filter((el) => el.sentenceFormulaId === id);
    if (formulas.length !== 1) {
      consol.throw(
        `ygbz ${label} found ${formulas.length} but expected 1 for id: ${id}`
      );
    }

    return formulas[0];
  };

  let questionSentenceFormula = getFormulaById(
    questionSentenceFormulasBank,
    questionFormulaId,
    "question"
  );

  let answerSentenceFormulaIds =
    questionSentenceFormula.equivalents[answerLanguage];

  let answerSentenceFormulasBank = scUtils.getWordsAndFormulas(
    answerLanguage,
    false,
    true,
    env
  ).sentenceFormulasBank;

  let answerSentenceFormulas = answerSentenceFormulaIds.map(
    (answerSentenceFormulaId) =>
      getFormulaById(
        answerSentenceFormulasBank,
        answerSentenceFormulaId,
        "answer"
      )
  );

  let res = { questionSentenceFormula, answerSentenceFormulas };

  return uUtils.copyWithoutReference(res);
};

exports.getWordsByCriteria = (currentLanguage, criteriaFromHTTP) => {
  let envir = "ref";

  ivUtils.validateLang(currentLanguage, 10);

  const {
    wordsBank,
  } = require(`../../source/${envir}/${currentLanguage}/words.js`);

  resObj = {};

  criteria = {};
  Object.keys(criteriaFromHTTP).forEach((critKey) => {
    let critValue = criteriaFromHTTP[critKey];
    critValue = critValue.split(" ");
    criteria[critKey] = critValue;
  });

  // console.log("nyfs getWordsByCriteria invoked with:", criteria);

  Object.keys(wordsBank).forEach((wordtype) => {
    resObj[wordtype] = [];
    let wordSet = wordsBank[wordtype];
    wordSet.forEach((lObj) => {
      if (
        Object.keys(criteria).every((critKey) => {
          let critValue = criteria[critKey];

          if (critKey === "andTags") {
            return uUtils.doStringsOrArraysMatch(
              nexusUtils.getPapers(lObj),
              critValue
            );
          } else if (critKey === "orTags") {
            return uUtils.doStringsOrArraysMatch(
              nexusUtils.getPapers(lObj),
              critValue,
              false
            );
          } else {
            return (
              lObj[critKey] &&
              uUtils.doStringsOrArraysMatch(lObj[critKey], critValue)
            );
          }
        })
      ) {
        resObj[wordtype].push({
          lemma: lObj.lemma,
          id: lObj.id,
          tags: nexusUtils.getPapers(lObj),
        });
      }
    });
  });

  return resObj;
};

exports.getTagsAndTopics = (currentLanguage) => {
  let envir = "ref";

  const { wordsBank } = require(`../../source/${envir}/NEXUS/words.js`);

  allTags = gpUtils.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects(
    wordsBank,
    "papers"
  );
  allTopics = gpUtils.collectAllValuesFromKeyOnObjectsInNestedArrayOfObjects(
    wordsBank,
    "topics"
  );
  return { allTags, allTopics };
};

exports.getBlankEnhancedStructureChunkForThisWordtype = (
  lang,
  wordtype,
  existingStCh
) => {
  ivUtils.validateLang(lang, 11);

  let stChTraits = refFxn.getStructureChunkTraits(lang);
  let unwantedTraitKeys = [];

  Object.keys(stChTraits).forEach((traitKey) => {
    if (
      (stChTraits[traitKey].compatibleWordtypes &&
        !stChTraits[traitKey].compatibleWordtypes.includes(wordtype)) ||
      apiUtils.backendOnlyTraits.includes(traitKey)
    ) {
      unwantedTraitKeys.push(traitKey);
      return;
    }
    // Add acceptable values for this traitKey per this wordtype. eg form has acceptable value "determiner" for article, but not for adjective.
    if (stChTraits[traitKey].possibleTraitValuesPerWordtype) {
      if (
        Object.keys(
          stChTraits[traitKey].possibleTraitValuesPerWordtype
        ).includes(wordtype)
      ) {
        stChTraits[traitKey].possibleTraitValues =
          stChTraits[traitKey].possibleTraitValuesPerWordtype[wordtype];
      } else {
        console.log(
          "clhb",
          Object.keys(stChTraits[traitKey].possibleTraitValuesPerWordtype),
          "does not include",
          wordtype
        );
      }
    }
    if (stChTraits[traitKey].possibleTraitValues) {
      stChTraits[traitKey].possibleTraitValues = Array.from(
        new Set(stChTraits[traitKey].possibleTraitValues)
      );
    }
  });

  unwantedTraitKeys.forEach((unwantedTraitKey) => {
    delete stChTraits[unwantedTraitKey];
  });

  Object.keys(stChTraits).forEach((traitKey) => {
    let traitObject = stChTraits[traitKey];
    if (traitObject.expectedTypeOnStCh === "array" && !traitObject.traitValue) {
      traitObject.traitValue = [];
    }
  });

  // Frontendify-3: Optionally load values from existing stCh
  if (existingStCh) {
    Object.keys(stChTraits).forEach((traitKey) => {
      if (existingStCh[traitKey] && existingStCh[traitKey].length) {
        stChTraits[traitKey].traitValue = existingStCh[traitKey];
      }
    });
  }

  // Frontendify-2b: Gather booleans
  apiUtils.gatherBooleanTraitsForFE(stChTraits);

  // Frontendify-4: Add _info
  stChTraits._info = {};
  if (wordtype !== "fix") {
    [
      "inheritableInflectionKeys",
      "allowableTransfersFromQuestionStructure",
    ].forEach((datumKey) => {
      let datum = refObj.lemmaObjectTraitKeys[lang][datumKey][wordtype];
      if (!datum) {
        consol.throw(
          `stmo Error fetching auxiliary info "${datumKey}" for wordtype "${wordtype}" enCh "${stChTraits.chunkId.traitValue}".`
        );
      }
      stChTraits._info[datumKey] = datum;
    });
  }

  return stChTraits;
};

exports.getFormulaItem = (lang, wordtype, stCh) => {
  ivUtils.validateLang(lang, 16);

  let enCh = apiUtils.getBlankEnhancedStructureChunkForThisWordtype(
    lang,
    wordtype,
    stCh
  );

  return {
    structureChunk: enCh,
    formulaItemId: uUtils.getRandomNumberString(10),
    guideword: apiUtils.getAestheticGuideword(enCh),
  };
};

exports.backendOnlyTraits = [
  "allohomInfo",
  "hiddenTraits",
  "PHD_type",
  "hypernymy",
  "semanticGender",
  "virilityDetail",
  "originalSitSelectedLObj",
];

exports.frontendifyFormula = (lang, formula) => {
  // Frontendify-1: Orders
  formula.orders = [];

  if (formula.primaryOrders) {
    formula.orders.push(
      ...formula.primaryOrders.map((order) => {
        return { order, isPrimary: true };
      })
    );
  }

  if (formula.additionalOrders) {
    formula.orders.push(
      ...formula.additionalOrders.map((order) => {
        return { order };
      })
    );
  }

  delete formula.primaryOrders;
  delete formula.additionalOrders;

  formula.sentenceStructure = formula.sentenceStructure.map((stCh) => {
    // Frontendify-2a: stCh to enCh
    let fItem = apiUtils.getFormulaItem(
      lang,
      gpUtils.getWordtypeStCh(stCh),
      stCh
    );

    // Frontendify-2c: Add isGhostChunk key
    if (
      !formula.orders.some((orderObj) =>
        orderObj.order.includes(fItem.structureChunk.chunkId.traitValue)
      )
    ) {
      fItem.structureChunk.isGhostChunk = true;
    }

    return fItem;
  });

  // console.log(
  //   formula.sentenceStructure.map((x) => [
  //     x.structureChunk.chunkId,
  //     x.guideword,
  //   ])
  // );
  // throw "swde";
};

exports.gatherBooleanTraitsForFE = (stCh) => {
  let booleanTraits = {
    expectedTypeOnStCh: "array",
    possibleTraitValues: [],
    traitValue: [],
  };

  Object.keys(stCh).forEach((traitKey) => {
    if (
      typeof stCh[traitKey] === "object" &&
      stCh[traitKey].expectedTypeOnStCh === "boolean"
    ) {
      booleanTraits.possibleTraitValues.push(traitKey);
      if (stCh[traitKey].traitValue) {
        booleanTraits.traitValue.push(traitKey);
      }
      delete stCh[traitKey];
    }
  });

  stCh.booleanTraits = booleanTraits;
};

exports.getEnChsForLemma = (lang, lemma) => {
  ivUtils.validateLang(lang, 12);

  let lObjs = apiUtils.getLObjsForLemma(lang, lemma);

  let enChs = lObjs.map((lObj) => {
    let wordtype = gpUtils.getWordtypeLObj(lObj);

    let enCh = apiUtils.getBlankEnhancedStructureChunkForThisWordtype(
      lang,
      wordtype
    );

    let routes = otUtils.giveRoutesAndTerminalValuesFromObject(lObj, true);

    routes.forEach((routeObj) => {
      if (routeObj.terminalValue === lemma) {
        Object.keys(routeObj.describedRoute).forEach((traitKey) => {
          let traitValue = routeObj.describedRoute[traitKey];

          if (
            enCh[traitKey].compatibleWordtypes &&
            !enCh[traitKey].compatibleWordtypes.includes(wordtype)
          ) {
            consol.log(
              `tbaa Error: Wordtype ${wordtype} not compatible with ${traitKey}=${traitValue} even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (
            enCh[traitKey].possibleTraitValues &&
            !enCh[traitKey].possibleTraitValues.includes(traitValue)
          ) {
            consol.log(
              routeObj,
              `pmio Error: For lObj "${lObj.id}" I fetched RoutesAndTerminalValuesFromObject. From routeObj printed above I found that traitValue "${traitValue}" not compatible with "${traitKey}" even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (enCh[traitKey].expectedTypeOnStCh === "array") {
            enCh[traitKey].traitValue = [traitValue];
          } else if (enCh[traitKey].expectedTypeOnStCh === "string") {
            enCh[traitKey].traitValue = traitValue;
          }
        });
      }
    });

    if (enCh.gender) {
      enCh.gender.traitValue = Array.from(new Set(enCh.gender.traitValue));
    }

    let theTags = nexusUtils.getPapers(lObj);
    if (!theTags) {
      consol.log("[1;31m " + `taof ${lObj.id} has no tags.` + "[0m");
      theTags = [];
    }
    enCh.andTags.traitValue = theTags;

    enCh.lObjId = lObj.id;

    enCh._info.allohomInfo = lObj.allohomInfo;

    if (wordtype === "pro") {
      enCh.specificIds.traitValue = [lObj.id];
    }

    return enCh;
  });

  return enChs;
};

exports.getLObjsForLemma = (lang, lemma) => {
  ivUtils.validateLang(lang, 13);

  matches = [];
  let { wordsBank } = scUtils.getWordsAndFormulas(lang, true);
  Object.keys(wordsBank).forEach((wordtype) => {
    wordSet = wordsBank[wordtype];
    wordSet.forEach((lObj) => {
      if (
        lObj.lemma === lemma ||
        uUtils.valueInObject(lObj.inflections, lemma)
      ) {
        matches.push(lObj);
      }
    });
  });
  return matches;
};

exports.getAestheticGuideword = (chunk, formulaObject) => {
  let guideword =
    typeof chunk.chunkId === "string"
      ? chunk.chunkId.split("-").slice(-1)[0]
      : chunk.chunkId.traitValue.split("-").slice(-1)[0];

  if (/^\d+$/.test(guideword) && gpUtils.getWordtypeStCh(chunk) === "fix") {
    guideword =
      typeof chunk.chunkValue === "string"
        ? chunk.chunkValue
        : chunk.chunkValue.traitValue;
  }

  let isGhostChunk; // If chunk is ghost then aesthetically modify guideword, just for display in formulaId selector on FE.

  if (formulaObject) {
    let orders = [];
    if (formulaObject.primaryOrders) {
      orders.push(...formulaObject.primaryOrders);
    }
    if (formulaObject.additionalOrders) {
      orders.push(...formulaObject.additionalOrders);
    }
    if (orders.length) {
      isGhostChunk = !orders.some((order) => order.includes(chunk.chunkId));
    }
  }

  return isGhostChunk ? `[${guideword}]` : guideword;
};
