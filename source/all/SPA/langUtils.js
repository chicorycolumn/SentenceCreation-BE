const lfUtils = require("../../../utils/lemmaFilteringUtils.js");
const otUtils = require("../../../utils/objectTraversingUtils.js");
const frUtils = require("../../../utils/formattingResponseUtils.js");
const gpUtils = require("../../../utils/generalPurposeUtils.js");
const uUtils = require("../../../utils/universalUtils.js");
const consol = require("../../../utils/zerothOrder/consoleLoggingUtils.js");
const refObj = require("../../../utils/reference/referenceObjects.js");
const allLangUtils = require("../../../utils/allLangUtils.js");

exports.balanceGenders = () => {};

exports.selectWordVersions = (
  structureChunk,
  subsequentOutputUnit,
  selectedWord,
  selectedWordsArr,
  firstStageAnnotationsObj,
  selectedLemmaObject,
  previousOutputUnit,
  multipleMode
) => {
  // >>>
  // >>> Indefinite Article
  // >>>
  if (
    gpUtils.getWordtypeStCh(structureChunk) === "article" &&
    structureChunk.form.includes("indefinite")
  ) {
    if (!subsequentOutputUnit) {
      consol.throw(
        "aqrz selectWordVersions Shouldn't there be an outputUnit subsequent to this ENG indefinite article?"
      );
    }

    consol.log(
      "shnj selectWordVersions. subsequentOutputUnit.firstStageAnnotationsObj BEFORE",
      subsequentOutputUnit.firstStageAnnotationsObj
    );

    if (subsequentOutputUnit && subsequentOutputUnit.firstStageAnnotationsObj) {
      Object.keys(subsequentOutputUnit.firstStageAnnotationsObj).forEach(
        (annoTraitKey) => {
          let annoTraitValue =
            subsequentOutputUnit.firstStageAnnotationsObj[annoTraitKey];

          if (annoTraitValue === "singular") {
            consol.log(
              `yuox selectWordVersions. Removing "singular" annotation from subsequent outputUnit, as current output unit is ENG indefinite article.`
            );

            delete subsequentOutputUnit.firstStageAnnotationsObj[annoTraitKey];
          }
        }
      );
    }

    consol.log(
      "shnj selectWordVersions. subsequentOutputUnit.firstStageAnnotationsObj AFTER",
      subsequentOutputUnit.firstStageAnnotationsObj
    );

    consol.log("nbra selectWordVersions", {
      "subsequentOutputUnit.selectedWord": subsequentOutputUnit.selectedWord,
      "subsequentOutputUnit.structureChunk":
        subsequentOutputUnit.structureChunk,
    });

    if (
      !subsequentOutputUnit.selectedWord.surprisinglyStartsWithConsonantSound &&
      (subsequentOutputUnit.selectedWord.surprisinglyStartsWithVowelSound ||
        (typeof subsequentOutputUnit.selectedWord === "string" &&
          /^[aeiou]/.test(subsequentOutputUnit.selectedWord[0])))
    ) {
      frUtils.pushSelectedWordToArray(
        "protective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    } else {
      frUtils.pushSelectedWordToArray(
        "nonprotective",
        selectedWord,
        selectedWordsArr,
        firstStageAnnotationsObj,
        structureChunk
      );
      return true;
    }
  }
};

exports.preprocessStructureChunks = (structureChunk) => {
  if (
    ["nounCommon", "nounPerson"].includes(
      gpUtils.getWordtypeStCh(structureChunk)
    )
  ) {
    if (structureChunk.gcase && structureChunk.gcase.length) {
      structureChunk.gcase = structureChunk.gcase.map((gcaseTraitValue) => {
        return ["nom", "gen"].includes(gcaseTraitValue)
          ? gcaseTraitValue
          : "nom";
      });
    }
  }
};

exports.expandLemmaObjects = (matches, stChWordtype, currentLanguage) => {
  allLangUtils.expandLemmaObjects(matches, currentLanguage);
};

exports.formatTraitValue = (traitKey, traitValue, note) => {
  //delta genericise
  const metagenderRef = {
    _Genders: ["m", "f", "n", "virile", "nonvirile"],
    _PersonalGenders: ["m", "f", "virile", "nonvirile"],
  };

  if (traitKey === "gender") {
    if (metagenderRef[traitValue]) {
      return metagenderRef[traitValue];
    }
  }

  return [traitValue];
};

exports.addLanguageParticularClarifiers = () => {};

exports.adjustTenseDescriptionsBeforeTranslating = () => {};

exports.adjustStructureChunksInIfPW = (structureChunk) => {};

exports.adjustTenseDescriptions = () => {};
