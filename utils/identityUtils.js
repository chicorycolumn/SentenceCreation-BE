const uUtils = require("./universalUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const refObj = require("./reference/referenceObjects.js");
const refFxn = require("./reference/referenceFunctions.js");
const { assessHypernymy } = require("./lemmaFilteringUtils.js");

exports.getLanguageFromFormulaId = (id) => {
  return id.split("-")[0];
};

exports.getLanguageFromLemmaObject = (lObj) => {
  return lObj.id.split("-")[0].toUpperCase();
};

exports.stChIsPerson = (stCh, strict) => {
  if (strict) {
    return stCh.isPerson || exports.stChIsNounPerson(stCh);
  }
  return (
    stCh.isPerson ||
    exports.stChIsNounPerson(stCh) ||
    (stCh.person &&
      stCh.person.length === 1 &&
      ["1per", "2per"].includes(stCh.person[0]))
  );
};

exports.lObjIsNounPerson = (lObj) => {
  return ["npe"].includes(this.getWordtypeLObj(lObj));
};

exports.stChIsNounPerson = (stCh) => {
  return ["npe"].includes(this.getWordtypeStCh(stCh, true));
};

exports.getWordtypeLObj = (lObj) => {
  return lObj.id.split("-")[1];
};

exports.getWordtypeStCh = (stCh) => {
  return typeof stCh.chunkId === "string"
    ? stCh.chunkId.split("-")[0]
    : stCh.chunkId.traitValue.split("-")[0];
};

exports.getWordtypeAgree = (structureChunk, agreeKey = "agreeWith") => {
  return structureChunk[agreeKey].split("-")[0];
};

exports.lObjIsMGN = (lObj) => {
  return this.traitValueIsMeta(lObj.gender);
};

exports.traitValueIsMeta = (traitValue, chunk, traitKey) => {
  if (!traitValue && !chunk && !traitKey) {
    return false;
  }

  if (!traitValue) {
    traitValue = chunk[traitKey];
  }

  if (Array.isArray(traitValue)) {
    if (traitValue.length !== 1) {
      consol.throw("kngh");
    }
    traitValue = traitValue[0];
  }

  return traitValue[0] === "_";
};

exports.isTerminusObject = (selectedWord) => {
  if (!selectedWord) {
    return false;
  }

  return uUtils.isKeyValueTypeObject(selectedWord) && selectedWord.isTerminus;
};
