const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const apiUtils = require("../utils/secondOrder/apiUtils.js");

const { getStChsForLemma } = require("../utils/secondOrder/apiUtils.js");

describe.only("getStChsForLemma", () => {
  it("1", () => {
    const actual = getStChsForLemma("POL", "kobieta");
    console.log(actual);
    // expect(actual).to.eql(expected);
  });
});
