const refObj = require("./referenceObjects.js");
const refLists = require("./referenceLists.js");
const refTranslations = require("./referenceTranslations.js");
const refConditions = require("./referenceConditions.js");

let refSets = [refLists, refTranslations, refConditions];

refSets.forEach((refSet) => {
  Object.keys(refSet).forEach((refSetKey) => {
    exports[refSetKey] = refSet[refSetKey];
  });
});
