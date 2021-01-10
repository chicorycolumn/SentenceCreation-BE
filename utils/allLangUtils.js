const refObj = require("../utils/referenceObjects.js");
const gpUtils = require("../utils/generalPurposeUtils.js");

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "fixed") {
      return;
    }

    if (structureChunk.wordtype === "adjective") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["simple"];
      }
    }

    if (structureChunk.wordtype === "pronoun") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["pronoun"];
      }
    }

    if (
      structureChunk.wordtype === "noun" ||
      structureChunk.wordtype === "pronoun"
    ) {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
      }
    }

    if (structureChunk.wordtype === "pronoun") {
      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        }
      }
    }

    if (structureChunk.wordtype === "verb") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["verbal"];
      }

      if (structureChunk.form && structureChunk.form.includes("verbal")) {
        if (
          !structureChunk.tenseDescription ||
          !structureChunk.tenseDescription.length
        ) {
          //Epsilon: Move this to POL utils.
          if (currentLanguage === "POL") {
            if (
              structureChunk.tense &&
              structureChunk.tense.length &&
              structureChunk.aspect &&
              structureChunk.aspect.length
            ) {
              return;
            }
          }

          structureChunk.tenseDescription = refObj.allFeatureValues[
            currentLanguage
          ].tenseDescription.slice(0);
        }
      }

      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (
          gpUtils.getWordtypeOfAgreeWith(structureChunk) === "pronoun"
        ) {
          let headChunk = (structureChunk.person = sentenceStructure.find(
            (potentialHeadChunk) => {
              return potentialHeadChunk.chunkId === structureChunk.agreeWith;
            }
          ));

          if (headChunk.person && headChunk.person.length) {
            structureChunk.person = headChunk.person.slice(0);
          } else {
            throw "#ERR I am surprised that we entered this clause. We should delete this. ~Epsilon";

            let allGendersInThisLang =
              refObj.allFeatureValues[currentLanguage].gender;

            console.log("j22", allGendersInThisLang);

            structureChunk.person = allGendersInThisLang.slice(0);
          }
        }
      }
    }
  });
};

exports.preprocessLemmaObjects = (lObjArr, currentLanguage) => {
  lObjArr.forEach((lObj) => {
    let featureKey = "gender";

    let metaFeaturesRef = refObj.metaFeatures[currentLanguage][featureKey];

    Object.keys(metaFeaturesRef).forEach((metaFeatureKey) => {
      let metaFeatureValues = metaFeaturesRef[metaFeatureKey];

      gpUtils.findKeysInObjectAndExecuteCallback(
        lObj,
        metaFeatureKey,
        (obj) => {
          gpUtils.copyValueOfKey(obj, metaFeatureKey, metaFeatureValues, false);
        }
      );
    });

    if (gpUtils.getWordtypeFromLemmaObject(lObj) === "pronoun") {
      gpUtils.findKeysInObjectAndExecuteCallback(
        lObj,
        "pronounAndDeterminer",
        (obj) => {
          gpUtils.copyValueOfKey(
            obj,
            "pronounAndDeterminer",
            ["pronoun", "determiner"],
            true
          );
        }
      );
    }
  });
};
