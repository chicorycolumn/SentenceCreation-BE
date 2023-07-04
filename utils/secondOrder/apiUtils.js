const gpUtils = require("../../utils/generalPurposeUtils.js");
const idUtils = require("../../utils/identityUtils.js");
const uUtils = require("../../utils/universalUtils.js");
const consol = require("../../utils/zerothOrder/consoleLoggingUtils.js");
const edUtils = require("../../utils/secondOrder/educatorUtils.js");
const gdUtils = require("../../utils/grabDataUtils.js");
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
const { fetchPalette } = require("../../models/palette.model.js");

exports.getAnAvailableNexusId = (env = "ref") => {
  const existingNexusIds =
    require(`../../source/${env}/NEXUS/sentenceFormulas.js`).sentenceFormulas.map(
      (nex) => nex.key
    );

  let i = 1;
  while (i <= 99999) {
    let zeroFilled = "00000" + String(i);
    let key = `SF-${zeroFilled.slice(-5)}`;
    console.log(key);
    if (!existingNexusIds.includes(key)) {
      return key;
    }
    i++;
  }
  return "failed to find available nexus id";
};

exports.getSentenceFormulas = (
  questionFormulaId,
  answerLanguage,
  env = "ref"
) => {
  let questionLanguage = idUtils.getLanguageFromFormulaId(questionFormulaId);
  ivUtils.validateLang(questionLanguage, 14);
  ivUtils.validateLang(answerLanguage, 15);

  let questionSentenceFormula = gdUtils.grabFormulaById(
    questionFormulaId,
    false,
    questionLanguage,
    env
  );

  let answerSentenceFormulaIds = nexusUtils.getEquivalents(
    questionSentenceFormula.id,
    answerLanguage,
    env
  );

  let answerSentenceFormulas = answerSentenceFormulaIds.map(
    (answerSentenceFormulaId) =>
      gdUtils.grabFormulaById(
        answerSentenceFormulaId,
        false,
        answerLanguage,
        env
      )
  );

  let res = { questionSentenceFormula, answerSentenceFormulas };

  return uUtils.copyWithoutReference(res);
};

exports.getWordsByCriteria = (currentLanguage, criteriaFromHTTP) => {
  let envir = "ref";

  let resObj = {};

  let criteria = {};
  Object.keys(criteriaFromHTTP).forEach((critKey) => {
    let critValue = criteriaFromHTTP[critKey];
    critValue = critValue.split(" ");
    criteria[critKey] = critValue;
  });

  const lObjCallback = (lObj, resObj, wordtype) => {
    if (!resObj[wordtype]) {
      resObj[wordtype] = [];
    }

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
  };

  gdUtils.readAllLObjs(currentLanguage, envir, false, resObj, lObjCallback);

  return resObj;
};

exports.getTagsAndTopics = (currentLanguage) => {
  let envir = "ref";

  const wordsBank = nexusUtils.getNexusWithAllWordtypes(envir);

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
      if (existingStCh[traitKey] && !uUtils.isEmpty(existingStCh[traitKey])) {
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

exports.getFemulaItem = (lang, wordtype, stCh) => {
  ivUtils.validateLang(lang, 16);

  let enCh = apiUtils.getBlankEnhancedStructureChunkForThisWordtype(
    lang,
    wordtype,
    stCh
  );

  if (enCh.specificIds && enCh.specificIds.traitValue.length) {
    enCh.lObjId = allLangUtils.removeMarkersFromLObjId(
      enCh.specificIds.traitValue[0]
    );
  }

  return {
    structureChunk: enCh,
    femulaItemId: null,
    guideword: frUtils.getAestheticGuideword(enCh),
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

exports.frontendifyOrders = (orders) => {
  let newOrders = [];

  if (orders.primary) {
    newOrders.push(
      ...orders.primary.map((order) => {
        return { order, isPrimary: true };
      })
    );
  }

  if (orders.additional) {
    newOrders.push(
      ...orders.additional.map((order) => {
        return { order };
      })
    );
  }

  return newOrders;
};

exports.frontendifyFormula = (lang, formula) => {
  // Frontendify-5: Fetch lObjId and guideword.
  let guideWordsToAdd = [];
  formula.sentenceStructure.forEach((stCh) => {
    let guideword = stCh.chunkId.split("-").slice(-1)[0];

    if (!guideword || /^\d+$/.test(guideword)) {
      guideword = frUtils.getAestheticGuideword(stCh);
    }

    if (!guideword || /^\d+$/.test(guideword)) {
      let data = apiUtils.prepareGetSentencesAsQuestionOnly(
        lang,
        { sentenceStructure: [stCh] },
        true
      );

      data.body.returnDirectly = true;
      data.body.startTime = Date.now();

      let fetchedSentence = fetchPalette(data);

      let newGuideword = fetchedSentence.questionSentenceArr.length
        ? fetchedSentence.questionSentenceArr[0].selectedWord
        : null;

      let newLObjId = fetchedSentence.questionSentenceArr.length
        ? allLangUtils.removeMarkersFromLObjId(
            fetchedSentence.questionSentenceArr[0].lObjId
          )
        : null;

      if (idUtils.isTerminusObject(newGuideword)) {
        let allWords = gpUtils.getWordsFromTerminusObject(newGuideword);
        newGuideword = allWords[0];
      }

      let guideWordToAdd = {
        chunkId: stCh.chunkId,
        newLObjId,
      };

      if (!guideword || /^\d+$/.test(guideword)) {
        guideWordToAdd.newGuideword = newGuideword;
      }

      guideWordsToAdd.push(guideWordToAdd);
    }
  });

  // Frontendify-1: Orders
  formula.orders = exports.frontendifyOrders(formula.orders);

  formula.sentenceStructure = formula.sentenceStructure.map((stCh) => {
    // Frontendify-2a: stCh to enCh
    let fItem = apiUtils.getFemulaItem(
      lang,
      idUtils.getWordtypeStCh(stCh),
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

    guideWordsToAdd.forEach((guideWordToAdd) => {
      if (guideWordToAdd.chunkId === fItem.structureChunk.chunkId.traitValue) {
        if (guideWordToAdd.newGuideword) {
          fItem.guideword = guideWordToAdd.newGuideword;
        }
        if (guideWordToAdd.newLObjId) {
          fItem.structureChunk.lObjId = guideWordToAdd.newLObjId;
        }
      }
    });

    return fItem;
  });

  // Add fItem IDs
  let uniqueIdNumbers = uUtils.getUniqueNumberStrings(
    10,
    formula.sentenceStructure.length
  );
  formula.sentenceStructure.forEach((fItem, index) => {
    fItem.femulaItemId = uniqueIdNumbers[index];
  });
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

exports.getEnChsForLemma = (lang, lemma, env = "ref") => {
  ivUtils.validateLang(lang, 12);

  const langUtils = require(`../../source/all/${lang}/langUtils.js`);

  let lObjs = apiUtils.getLObjsForLemma(lang, lemma, env, true);

  let enChs = lObjs.map((lObj) => {
    let wordtype = idUtils.getWordtypeLObj(lObj);

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

    if (idUtils.getWordtypeLObj(lObj) === "ver") {
      // Gather tense and aspect into tenseDesc (POL).
      langUtils.convertTenseToTenseDescription(lang, enCh, lObj);
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
      enCh.specificIds.traitValue = [lObj.id]; // Pronombres must have specificId set, otherwise is too unrestricted when querying formula.
    }

    // Frontendify 7. Special adjustments.

    if (lang === "ENG") {
      if (wordtype === "ver") {
        if (enCh.form && enCh.form.traitValue.includes("thirdPS")) {
          enCh.form.traitValue = enCh.form.traitValue.map((x) =>
            x === "thirdPS" ? "verbal" : x
          );
          enCh.form.traitValue = Array.from(new Set(enCh.form.traitValue));

          if (
            enCh.tenseDescription &&
            !enCh.tenseDescription.traitValue.length
          ) {
            enCh.tenseDescription.traitValue = ["present"];
          }
        }
      }
    }

    // Final adjustments, removing metavalues if possible, see refObj.preferredInitialChoicesForEnChs.
    Object.keys(refObj.preferredInitialChoicesForEnChs).forEach((wordtype_) => {
      if (wordtype === wordtype_) {
        Object.keys(refObj.preferredInitialChoicesForEnChs[wordtype]).forEach(
          (traitKey) => {
            if (
              enCh[traitKey] &&
              enCh[traitKey].traitValue &&
              enCh[traitKey].traitValue.length
            ) {
              let preferredTVsRef =
                refObj.preferredInitialChoicesForEnChs[wordtype][traitKey];

              if (
                Object.keys(preferredTVsRef).some((nonpreferredTV) =>
                  enCh[traitKey].traitValue.includes(nonpreferredTV)
                )
              ) {
                let preferredTVs = enCh[traitKey].traitValue.map(
                  (tv) => preferredTVsRef[tv] || tv
                );
                enCh[traitKey].traitValue = Array.from(new Set(preferredTVs));
              } else if (Object.keys(preferredTVsRef).includes("ALL")) {
                enCh[traitKey].traitValue = [preferredTVsRef["ALL"]];
              }
            }
          }
        );
      }
    });

    return enCh;
  });

  return enChs;
};

exports.getLObjsForLemma = (lang, lemma, env = "ref", addInflections) => {
  let matches = [];

  const lObjCallback = (lObj, res) => {
    let inflections = gdUtils.grabInflections(lObj.id, env);

    if (lObj.lemma === lemma || uUtils.valueInObject(inflections, lemma)) {
      if (addInflections) {
        lObj.inflections = inflections;
      }
      res.push(lObj);
    }
  };

  gdUtils.readAllLObjs(lang, env, false, matches, lObjCallback);

  return matches;
};

exports.prepareGetSentencesAsQuestionOnly = (
  questionLanguage,
  sentenceFormula,
  requestingSingleWordOnly
) => {
  let numberString = Date.now();

  sentenceFormula = uUtils.copyWithoutReference(sentenceFormula);
  sentenceFormula.id = `${questionLanguage}-${numberString}`;
  sentenceFormula.equivalents = {};

  if (requestingSingleWordOnly) {
    sentenceFormula.sentenceStructure.forEach((stCh) =>
      refObj.agreementTraits.forEach((agreeKey) => delete stCh[agreeKey])
    );
  }

  return {
    body: {
      sentenceFormulaFromEducator: sentenceFormula,
      questionLanguage,
      forceMultipleAndQuestionOnly: true,
      requestingSingleWordOnly,
    },
  };
};

exports.prepareGetDualSentences = (
  questionLanguage,
  answerLanguage,
  questionFormula,
  answerFormula,
  requestingSingleWordOnly
) => {
  let numberString = Date.now();

  questionFormula = apiUtils._makeFormula(
    questionFormula,
    questionLanguage,
    numberString,
    requestingSingleWordOnly
  );

  answerFormula = apiUtils._makeFormula(
    answerFormula,
    answerLanguage,
    numberString,
    requestingSingleWordOnly
  );

  questionFormula.equivalentsFormulas = {};
  questionFormula.equivalentsFormulas[answerLanguage] = [answerFormula];

  return {
    body: {
      sentenceFormulaFromEducator: questionFormula,
      questionLanguage,
      answerLanguage,
      forceMultipleAndQuestionOnly: false,
      requestingSingleWordOnly,
    },
  };
};

exports._makeFormula = (
  formula,
  lang,
  numberString,
  requestingSingleWordOnly
) => {
  formula = uUtils.copyWithoutReference(formula);

  formula.id = `${lang}-${numberString}`;

  formula.equivalents = {};

  if (requestingSingleWordOnly) {
    formula.sentenceStructure.forEach((stCh) =>
      refObj.agreementTraits.forEach((agreeKey) => delete stCh[agreeKey])
    );
  }

  return formula;
};
