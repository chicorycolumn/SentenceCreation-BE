const { expect } = require("chai");
const {
  filterWithinSelectedLemmaObject,
} = require("../utils/objectTraversingUtils.js");
const { wordsBank } = require("../source/POL/words.js");
const lfUtils = require("../utils/lemmaFilteringUtils.js");

xdescribe("filterWithinSelectedLemmaObject", () => {
  // describe.only("filterWithinSelectedLemmaObject", () => {
  it("#scu1.1", () => {
    let structureChunk = {
      chunkId: "nou-2",
      wordtype: "noun",
      tags: ["edible"],
      gcase: ["acc"],
    };
    let currentLanguage = "POL";
    let selectedLemmaObject = wordsBank.nounSet.find(
      (lObj) => lObj.lemma === "jabłko"
    );

    let {
      errorInDrilling,
      selectedWordOrArray,
      drillPath,
    } = lfUtils.filterWithinSelectedLemmaObject(
      //This updates structureChunk with choices from the chosen inflection path.
      selectedLemmaObject,
      structureChunk,
      currentLanguage
    );

    let expectedDrillPath = [
      { word: "jabłko", path: ["singular", "acc"] },
      { word: "jabłka", path: ["plural", "acc"] },
    ];

    expect(drillPath).to.eql(expectedDrillPath);
  });
  xit("#scu1.2", () => {
    const input1 = testObj1;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      structure: ["my", 123, "bird", 456],
    });
  });
});
