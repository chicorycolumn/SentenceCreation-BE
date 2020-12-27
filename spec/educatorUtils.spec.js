const { findHomographs } = require("../utils/educatorUtils.js");
const { expect } = require("chai");

// xdescribe("findHomographs", () => {
describe.only("findHomographs", () => {
  it("#edu1.1 Gives list of all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";

    let typeOneAllohomographs = findHomographs(
      currentLanguage,
      "syn",
      true,
      false
    );

    console.log("typeOneAllohomographs", typeOneAllohomographs);
  });
});
