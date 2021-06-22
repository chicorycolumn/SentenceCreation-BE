const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const cfUtils = require("../utils/counterfaxUtils.js");

const {
  copyWithoutReference,
  arrayExploder,
  checkEachSequentialPairing,
  areTwoObjectsEqual,
} = require("../utils/universalUtils.js");

describe.only("explodeCounterfaxSituations", () => {
  it("Two by two by two by two makes sixteen.", () => {
    let input = {
      headsFirstSequenceChunkIds: ["pro-1", "pro-2"],
      "pro-1": {
        gender: ["pro-1=gender=non", "pro-1=gender=vir"],
        person: ["pro-1=person=1per", "pro-1=person=2per"],
      },
      "pro-2": {
        size: ["pro-2=size=big", "pro-2=size=small"],
        color: ["pro-2=color=red", "pro-2=color=yellow"],
      },
    };
    let expected = [
      [
        ["pro-1=gender=non", "pro-1=person=1per"],
        ["pro-2=size=big", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=1per"],
        ["pro-2=size=big", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=1per"],
        ["pro-2=size=small", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=1per"],
        ["pro-2=size=small", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=2per"],
        ["pro-2=size=big", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=2per"],
        ["pro-2=size=big", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=2per"],
        ["pro-2=size=small", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=non", "pro-1=person=2per"],
        ["pro-2=size=small", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=1per"],
        ["pro-2=size=big", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=1per"],
        ["pro-2=size=big", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=1per"],
        ["pro-2=size=small", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=1per"],
        ["pro-2=size=small", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=2per"],
        ["pro-2=size=big", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=2per"],
        ["pro-2=size=big", "pro-2=color=yellow"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=2per"],
        ["pro-2=size=small", "pro-2=color=red"],
      ],
      [
        ["pro-1=gender=vir", "pro-1=person=2per"],
        ["pro-2=size=small", "pro-2=color=yellow"],
      ],
    ];
    const actual = cfUtils.explodeCounterfaxSituations(input);
    expect(actual).to.eql(expected);
  });
});
