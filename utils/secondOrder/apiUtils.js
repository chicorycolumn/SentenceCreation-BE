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

exports.getWordsByCriteria = (currentLanguage, criteriaFromHTTP) => {
  let envir = "ref";

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

exports.getFYIP = (fyipLabel) => {
  let fyipCode = fyipLabel.split("-")[0];
  let whichLang = fyipLabel.split("-")[1];
  let questionLang = fyipLabel.split("-")[2];
  let answerLang = fyipLabel.split("-")[3];

  let lang1 = whichLang === "Q" ? questionLang : answerLang;
  let lang2 = whichLang === "A" ? questionLang : answerLang;

  let FYIPobject = uUtils.copyWithoutReference(apiUtils.FYIP[fyipCode]);
  if (!FYIPobject) {
    consol.throw(`gtsb No FYIP found for ${code}.`);
  }
  ["shortHint", "longHint"].forEach((k) => {
    FYIPobject[k] =
      FYIPobject[k][lang1] || FYIPobject[k][lang2] || FYIPobject[k]["ALL"];
  });
  return FYIPobject;
};

exports.FYIP = {
  FYIP101: {
    title: "FYIP101 Gendered hypernymy",
    shortHint: {
      ALL: "Remember, some words in this language may have a grammatical gender which doesn't match the real life gender.",
    },
    longHint: {
      ALL: `In languages where all nouns have gender, that gender can sometimes be different from the real life gender. For example the Spanish noun "padre" means "parent", and it is a masculine noun, so adjectives which agree with it must be put in masculine - "padre enfadado" not "padre enfadada", even if the actual parent we're talking about is in real life a woman.`,
      POL: `In languages where all nouns have gender, like Polish, "rodzic" meaning "parent" is a masculine noun. So in a sentence "I saw the parent and her apple." in Polish it's "jego jabłko" not "jej jabłko" even though the parent in question is a woman. Yes, in practice, Polish speakers will also sometimes use "jej jabłko" in this sentence, but the more common way to say it as well as the formal rule, is that it's "jego" to agree with the grammatical gender of "rodzic" (masculine), regardless of that parent's real life gender.`,
      SPA: `In languages where all nouns have gender, like Spanish, "padre" meaning "parent" is a masculine noun. So in a sentence "The angry parent." in Spanish it's "enfadado" not "enfadada" even if the parent in question is a woman. Yes, in practice, Spanish speakers will also sometimes use "enfadada" in this sentence, but the formal rule is that it's "enfadado" to agree with the grammatical gender of "padre" (masculine), regardless of that parent's real life gender.`,
    },
  },
};
