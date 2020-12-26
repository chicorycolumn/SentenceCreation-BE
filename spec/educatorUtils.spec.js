const { findTypeOneHomographs } = require("../utils/educatorUtils.js");
const { expect } = require("chai");

describe("findTypeOneHomographs", () => {
  it("#edu1.1 Gives list of all allohomograph lemma objects in one language.", () => {
    const currentLanguage = "ENG";

    let typeOneAllohomographs = findTypeOneHomographs(
      currentLanguage,
      "allo",
      false,
      false
    );

    console.log("typeOneAllohomographs", typeOneAllohomographs);
  });
});
