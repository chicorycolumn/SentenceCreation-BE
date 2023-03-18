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

exports.getSentenceFormulas = (
  questionSentenceFormulaId,
  answerLanguage,
  env
) => {
  if (!env) {
    env = "ref";
  }

  let questionLanguage = questionSentenceFormulaId.split("-")[0];
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
    questionSentenceFormulaId,
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

  return res;
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

  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    resObj[wordtypeShorthand] = [];
    let wordSet = wordsBank[wordtypeShorthand];
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
        resObj[wordtypeShorthand].push({
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

exports.getBlankStChForThisWordtype = (lang, wordtypeLonghand) => {
  // console.log("hmwo", { lang, wordtypeLonghand });

  ivUtils.validateLang(lang, 11);

  let stChTraits = refFxn.getStructureChunkTraits(lang);
  Object.keys(stChTraits).forEach((traitKey) => {
    // If this traitKey is entirely invalid for this wordtype, remove it. eg tenseDescription for adjectives.
    if (
      stChTraits[traitKey].compatibleWordtypes &&
      !stChTraits[traitKey].compatibleWordtypes.includes(wordtypeLonghand)
    ) {
      delete stChTraits[traitKey];
    }
    // Add acceptable values for this traitKey per this wordtype. eg form has acceptable value "determiner" for article, but not for adjective.
    else {
      if (stChTraits[traitKey].possibleTraitValuesPerWordtype) {
        if (
          Object.keys(
            stChTraits[traitKey].possibleTraitValuesPerWordtype
          ).includes(wordtypeLonghand)
        ) {
          stChTraits[traitKey].possibleTraitValues =
            stChTraits[traitKey].possibleTraitValuesPerWordtype[
              wordtypeLonghand
            ];
        } else {
          console.log(
            "clhb",
            Object.keys(stChTraits[traitKey].possibleTraitValuesPerWordtype),
            "does not include",
            wordtypeLonghand
          );
        }
      }
      if (stChTraits[traitKey].possibleTraitValues) {
        stChTraits[traitKey].possibleTraitValues = Array.from(
          new Set(stChTraits[traitKey].possibleTraitValues)
        );
      }
    }
  });
  return stChTraits;
};

exports.getStChsForLemma = (lang, lemma) => {
  ivUtils.validateLang(lang, 12);

  let lObjs = apiUtils.getLObjsForLemma(lang, lemma);

  return lObjs.map((lObj) => {
    let wordtypeShorthand = gpUtils.getWordtypeShorthandLObj(lObj);
    let wordtypeLonghand =
      refFxn.translateWordtypeShorthandLonghand(wordtypeShorthand);

    let stCh = apiUtils.getBlankStChForThisWordtype(lang, wordtypeLonghand);
    let routes = otUtils.giveRoutesAndTerminalValuesFromObject(lObj, true);
    routes.forEach((routeObj) => {
      if (routeObj.terminalValue === lemma) {
        Object.keys(routeObj.describedRoute).forEach((traitKey) => {
          let traitValue = routeObj.describedRoute[traitKey];

          if (
            stCh[traitKey].compatibleWordtypes &&
            !stCh[traitKey].compatibleWordtypes.includes(wordtypeLonghand)
          ) {
            consol.log(
              `tbaa Error: Wordtype ${wordtypeLonghand} not compatible with ${traitKey}=${traitValue} even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (
            stCh[traitKey].possibleTraitValues &&
            !stCh[traitKey].possibleTraitValues.includes(traitValue)
          ) {
            consol.log(
              `pomi Error: traitValue ${traitValue} not compatible with ${traitKey} even though that's what I gleaned using giveRoutesAndTerminalValuesFromObject.`
            );
            return;
          }

          if (stCh[traitKey].expectedTypeOnStCh === "array") {
            stCh[traitKey].traitValue = [traitValue];
          } else if (stCh[traitKey].expectedTypeOnStCh === "string") {
            stCh[traitKey].traitValue = traitValue;
          }
        });
      }
    });

    if (stCh.gender) {
      stCh.gender.traitValue = Array.from(new Set(stCh.gender.traitValue));
    }

    Object.keys(stCh).forEach((traitKey) => {
      let traitObject = stCh[traitKey];
      if (
        traitObject.expectedTypeOnStCh === "array" &&
        !traitObject.traitValue
      ) {
        traitObject.traitValue = [];
      }
    });

    let theTags = nexusUtils.getPapers(lObj);
    if (!theTags) {
      consol.log("[1;31m " + `taof ${lObj.id} has no tags.` + "[0m");
      theTags = [];
    }
    stCh.andTags.traitValue = theTags;

    if (lObj.allohomInfo) {
      stCh.allohomInfo = lObj.allohomInfo;
    }

    stCh.wordtype = gpUtils.getWordtypeShorthandLObj(lObj);
    stCh.id = lObj.id;
    stCh.lemma = lObj.lemma;

    stCh._info = {};

    [
      "inheritableInflectionKeys",
      "allowableTransfersFromQuestionStructure",
    ].forEach((infoKey) => {
      let info =
        refObj.lemmaObjectTraitKeys[lang][infoKey][
          refFxn.translateWordtypeShorthandLonghand(stCh.wordtype)
        ];
      if (!info) {
        //devlogging
        consol.throw("stmo Error fetching auxiliary info for stCh via API.");
      }
      stCh._info[infoKey] = info;
    });

    return stCh;
  });
};

exports.getLObjsForLemma = (lang, lemma) => {
  ivUtils.validateLang(lang, 13);

  matches = [];
  let { wordsBank } = scUtils.getWordsAndFormulas(lang, true);
  Object.keys(wordsBank).forEach((wordtypeShorthand) => {
    wordSet = wordsBank[wordtypeShorthand];
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
