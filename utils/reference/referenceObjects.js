const refObj = require("./referenceObjects.js");
const refLists = require("./referenceLists.js");
const refTranslations = require("./referenceTranslations.js");
const refConditions = require("./referenceConditions.js");

let refCollections = [refLists, refTranslations, refConditions];

refCollections.forEach((refCollection) => {
  Object.keys(refCollection).forEach((refCollectionKey) => {
    exports[refCollectionKey] = refCollection[refCollectionKey];
  });
});
