const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("./objectTraversingUtils.js");
const cfUtils = require("./counterfaxUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const aaUtils = require("./auxiliaryAttributeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const eaUtils = require("./extraAttributeUtils.js");

exports.evaluateFYIPs = (outputArr, questionLang, answerLang, label) => {
  return outputArr
    .map((ou) => {
      if (!ou.structureChunk.semanticGender) {
        return;
      }

      if (
        !ou.structureChunk.number ||
        ou.structureChunk.number[0] !== "singular"
      ) {
        // Don't want FYIP101 for "Osoby zobaczyły" or "Ludzie zobaczyli", but this may change.
        return;
      }

      if (
        !(
          ou.structureChunk.gender.length === 1 &&
          ou.structureChunk.gender[0] !== ou.structureChunk.semanticGender[0]
        ) &&
        !(
          ou.structureChunk.gender.length > 1 &&
          !ou.structureChunk.gender.includes(
            ou.structureChunk.semanticGender[0]
          )
        )
      ) {
        // Looking for gender and semanticGender mismatch.
        return;
      }

      if (
        answerLang === "POL" &&
        ou.structureChunk.semanticGender[0] === "m1" &&
        ou.structureChunk.gender[0] === "n"
      ) {
        // Don't need FYIP101 for "dziecko" with male semanticGender.
        return;
      }

      let headOutputUnit = otUtils.getHeadOutputUnit(
        ou.structureChunk,
        outputArr
      );
      let depUnits = outputArr.filter((o) =>
        refObj.agreementTraits
          .map((agreementTrait) => o.structureChunk[agreementTrait])
          .includes(ou.structureChunk.chunkId)
      );

      if (
        (depUnits.length &&
          depUnits.some((depUnit) =>
            ["npe", "pro"].includes(
              gpUtils.getWordtypeShorthandStCh(depUnit.structureChunk)
            )
          )) ||
        (headOutputUnit &&
          ["npe", "pro"].includes(
            gpUtils.getWordtypeShorthandStCh(headOutputUnit.structureChunk)
          ))
      ) {
        return `FYIP101-${label}-${questionLang}-${answerLang}`;
      }
    })
    .filter((x) => x);
};

exports.filterDownFYIPs = (fyipLabels) => {
  fyipLabels = Array.from(new Set(fyipLabels));
  let FYIPs = fyipLabels.map((fyipLabel) => {
    let FYIP = eaUtils.getFYIP(fyipLabel);
    FYIP.label = fyipLabel;
    return FYIP;
  });

  let filteredFYIPs = [];
  FYIPs.forEach((FYIP) => {
    if (
      FYIP.label.split("-")[1] === "Q" &&
      FYIPs.some((f) => f.label.split("-")[0] === FYIP.label.split("-")[0])
    ) {
      return;
    }
    filteredFYIPs.push(FYIP);
  });

  return filteredFYIPs;
};

exports.getFYIP = (fyipLabel) => {
  let fyipCode = fyipLabel.split("-")[0];
  let whichLang = fyipLabel.split("-")[1];
  let questionLang = fyipLabel.split("-")[2];
  let answerLang = fyipLabel.split("-")[3];

  let lang1 = whichLang === "Q" ? questionLang : answerLang;
  let lang2 = whichLang === "A" ? questionLang : answerLang;

  let FYIPobject = uUtils.copyWithoutReference(eaUtils.FYIP[fyipCode]);
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
