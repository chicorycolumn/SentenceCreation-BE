const refObj = require("../utils/referenceObjects.js");

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

    if (structureChunk.wordtype === "noun") {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
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
          //Very specific point.
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
          structureChunk.agreeWith.slice(0, 3) === "nou" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (structureChunk.agreeWith.slice(0, 3) === "pro") {
          let headChunk = (structureChunk.person = sentenceStructure.find(
            (potentialHeadChunk) => {
              return potentialHeadChunk.chunkId === structureChunk.agreeWith;
            }
          ));
          structureChunk.person = headChunk.person.slice(0);
        }
      }
    }
  });
};
