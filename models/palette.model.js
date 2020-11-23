const createSentence = require("../utils/createSentence.js");

exports.fetchPalette = (req) => {
  let { sentenceNumber, levelNumber, sentenceSymbol, useDummy } = req.body;

  let { responseObj, sentenceStructure } = createSentence.createSentence(
    sentenceNumber,
    levelNumber,
    sentenceSymbol,
    useDummy
  );

  console.log(
    "*************************************************************************************************"
  );
  console.log(sentenceStructure);
  let finalSentence = responseObj.palette;

  //Now bring the features from sentenceStructure (POL) and add them to the matching chunkId chunks from ENG structure.

  return Promise.all([responseObj]).then((array) => {
    return array[0];
  });
};
