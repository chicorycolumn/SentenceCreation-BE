exports.preprocessStructureChunks = (sentenceStructure) => {
  sentenceStructure.forEach((structureChunk) => {
    if (structureChunk.wordtype === "verb") {
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
          structureChunk.person = [...headChunk.person];
        }
      }
    }
  });
};
