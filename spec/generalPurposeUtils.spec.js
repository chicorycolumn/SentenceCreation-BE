const { expect } = require("chai");
const uUtils = require("../utils/universalUtils.js");

const {
  combineAndExplodeTwoSuperArrays,
  areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual,
  explodeContractions,
} = require("../utils/generalPurposeUtils.js");

const {
  copyWithoutReference,
  arrayExploder,
  checkEachSequentialPairing,
  areTwoObjectsEqual,
} = require("../utils/universalUtils.js");

xdescribe("areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual", () => {
  it("A. Two singleton arrays in same order, strings. Equal.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [["my", "name", "is", "norbs"]];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("B. Two singleton arrays in same order, strings. Unequal.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [["my", "name", "aint", "norbs"]];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("C. Two singleton arrays in different order, strings. Equal.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [["is", "norbs", "my", "name"]];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("D. Two singleton arrays in different order, strings, duplicates inside arrays. Equal.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [
      ["is", "norbs", "my", "name"],
      ["is", "norbs", "my", "name"],
    ];
    const actualA =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    const actualB =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input2,
        input1
      );
    expect(actualA).to.be.true;
    expect(actualB).to.be.true;
  });
  it("E. Two singleton arrays in different order, strings, duplicates inside subarrays. Unequal.", () => {
    const input1 = [["norbs", "my", "name", "is", "norbs"]];
    const input2 = [["is", "norbs", "my", "my", "my", "name"]];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("F. Two singleton arrays in different order, strings. Unequal.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [["aint", "norbs", "my", "name"]];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  //
  it("G. Two singleton arrays in same order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("H. Two singleton arrays in same order, strings and terminus objects, duplicates inside arrays. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("I. Two singleton arrays in same order, strings and terminus objects. Unequal re string.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("J. Two singleton arrays in same order, strings and terminus objects. Unequal re terminus object.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["the"],
          protective: ["the"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["thy"],
          protective: ["thine"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("K. Two singleton arrays in different order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("L. Two singleton arrays in different order, strings and terminus objects. Unequal re string.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("M. Two singleton arrays in different order, strings and terminus objects. Unequal re terminus object.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: false,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  //
  it("N. Two singleton arrays in same order, strings. Unequal re length.", () => {
    const input1 = [["my", "name", "is", "norbs"]];
    const input2 = [["my", "name", "is", "norbs", "truly"]];
    const actualA =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    const actualB =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input2,
        input1
      );
    expect(actualA).to.be.false;
    expect(actualB).to.be.false;
  });
  //
  it("O. Two longer arrays in same order, strings. Equal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("P. Two longer arrays in same order, strings, duplicates inside arrays. Equal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs"],
      ["my", "name", "is", "norbs"],
      ["my", "name", "is", "norbs"],
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("Q. Two longer arrays in same order, strings. Unequal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "aint", "norbs"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("R. Two longer arrays in different order, strings. Equal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["is", "norbs", "my", "name"],
      ["is", "my", "norbs", "nickname"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("S. Two longer arrays in different array order, strings. Equal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["is", "my", "norbs", "nickname"],
      ["is", "norbs", "my", "name"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("T. Two longer arrays in different order, strings. Unequal.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["aint", "norbs", "my", "name"],
      ["aint", "norbs", "nickname", "my"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  //
  it("U. Two longer arrays in same order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("V. Two longer arrays in same order, strings and terminus objects. Unequal re string.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("W. Two longer arrays in same order, strings and terminus objects. Unequal re terminus object.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["the"],
          protective: ["the"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["thy"],
          protective: ["thine"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("X. Two longer arrays in different order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("Y. Two longer arrays in different array order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
      ],
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("Z. Two longer arrays in another different array order, strings and terminus objects. Equal.", () => {
    const input1 = [
      [
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],

      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
    ];

    const input2 = [
      [
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "am",
        "I",
        "human",
      ],

      [
        "human",
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("Æ. Two longer arrays in another different array order, strings and terminus objects, duplicates inside arrays. Equal.", () => {
    const input1 = [
      [
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "human",
      ],
      [
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "I",
      ],
    ];

    const input2 = [
      [
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["my"],
          protective: ["mine"],
        },
        "am",
        "I",
        "human",
      ],
      [
        "human",
        "I",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
      [
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
        "I",
        "aint",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.true;
  });
  it("Ð. Two longer arrays in different order, strings and terminus objects. Unequal re string.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "aint",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("Ŋ. Two longer arrays in different order, strings and terminus objects. Unequal re terminus object.", () => {
    const input1 = [
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["a"],
          protective: ["an"],
        },
        "human",
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const input2 = [
      [
        "I",
        "human",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: false,
          nonprotective: ["a"],
          protective: ["an"],
        },
      ],
      [
        "I",
        "am",
        {
          isTerminus: true,
          processOnlyAtEnd: true,
          nonprotective: ["aa"],
          protective: ["aan"],
        },
        "human",
      ],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  //
  it("Ħ. Two longer arrays in same order, strings. Unequal re length.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs", "truly"],
      ["my", "nickname", "is", "norbs"],
    ];
    const actual =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    expect(actual).to.be.false;
  });
  it("Ł. Two longer arrays in same order, strings. Unequal re array length.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
      ["I", "have", "no", "match", "in", "input1"],
    ];
    const actualA =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    const actualB =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input2,
        input1
      );
    expect(actualA).to.be.false;
    expect(actualB).to.be.false;
  });
  it("µ. Two longer arrays in same order, strings, duplicates inside array. Unequal re array length.", () => {
    const input1 = [
      ["my", "name", "is", "norbs"],
      ["my", "nickname", "is", "norbs"],
    ];
    const input2 = [
      ["my", "name", "is", "norbs"],
      ["norbs", "my", "nickname", "is"],
      ["my", "name", "norbs", "is"],
      ["my", "nickname", "is", "norbs"],
      ["I", "have", "no", "match", "in", "input1"],
      ["I", "no", "have", "match", "in", "input1"],
    ];
    const actualA =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input1,
        input2
      );
    const actualB =
      areTwoArraysContainingArraysContainingOnlyStringsAndKeyValueObjectsEqual(
        input2,
        input1
      );
    expect(actualA).to.be.false;
    expect(actualB).to.be.false;
  });
});

xdescribe("areTwoObjectsEqual", () => {
  it("True with flat objects.", () => {
    const input1 = { name: "Norbert", age: 30 };
    const input2 = { name: "Norbert", age: 30 };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.true;
  });
  it("False with flat objects.", () => {
    const input1 = { name: "Norbert", age: 30 };
    const input2 = { name: "Norbert", age: 31 };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("False for unequal number of keys a.", () => {
    const input1 = { name: "Norbert", age: 30, likes: ["dogs"] };
    const input2 = { name: "Norbert", age: 31 };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("False for unequal number of keys b.", () => {
    const input1 = { name: "Norbert", age: 30 };
    const input2 = { name: "Norbert", age: 31, weight: 70 };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("True with slightly complex objects.", () => {
    const input1 = { name: "Norbert", age: 30, likes: ["dogs", "cats"] };
    const input2 = { name: "Norbert", age: 30, likes: ["dogs", "cats"] };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.true;
  });
  it("False with slightly complex objects a.", () => {
    const input1 = { name: "Norbert", age: 30, likes: ["dogs", "cats"] };
    const input2 = { name: "Norbert", age: 30, likes: ["dogs", "birds"] };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("False with slightly complex objects b.", () => {
    const input1 = { name: "Norbert", age: 30, likes: ["dogs", "cats"] };
    const input2 = {
      name: "Norbert",
      age: 30,
      likes: ["dogs", "cats", "bees"],
    };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("True with complex objects.", () => {
    const input1 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };
    const input2 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.true;
  });
  it("False with complex objects a. (Lee's age differs).", () => {
    const input1 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };
    const input2 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 21 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
  it("False with complex objects b. (Extra friend Jethro).", () => {
    const input1 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };
    const input2 = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [
            { name: "Lee", age: 22 },
            { name: "Dee", age: 32 },
            [],
            { name: "Jethro" },
          ],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };

    const actual = areTwoObjectsEqual(input1, input2);

    expect(actual).to.be.false;
  });
});

xdescribe("checkEachSequentialPairing", () => {
  it("Empty positive a. Callback is oneStepCheck", () => {
    const inputArr = [];
    const inputAllowArrayOfZeroOrOne = true;
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.oneStepCheck,
      inputAllowArrayOfZeroOrOne
    );
    expect(actual).to.be.true;
  });
  it("Empty positive b. Callback is oneStepCheck", () => {
    const inputArr = [1];
    const inputAllowArrayOfZeroOrOne = true;
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.oneStepCheck,
      inputAllowArrayOfZeroOrOne
    );
    expect(actual).to.be.true;
  });
  it("Empty negative a. Callback is oneStepCheck", () => {
    const inputArr = [];
    const inputAllowArrayOfZeroOrOne = false;
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.oneStepCheck,
      inputAllowArrayOfZeroOrOne
    );
    expect(actual).to.be.false;
  });
  it("Empty negative b. Callback is oneStepCheck", () => {
    const inputArr = [1];
    const inputAllowArrayOfZeroOrOne = false;
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.oneStepCheck,
      inputAllowArrayOfZeroOrOne
    );
    expect(actual).to.be.false;
  });
  it("Positive a. Callback is oneStepCheck", () => {
    const inputArr = [1, 2, 3, 4, 5];
    const actual = checkEachSequentialPairing(inputArr, uUtils.oneStepCheck);
    expect(actual).to.be.true;
  });
  it("Positive b. Callback is oneStepCheck", () => {
    const inputArr = [105, 106];
    const actual = checkEachSequentialPairing(inputArr, uUtils.oneStepCheck);
    expect(actual).to.be.true;
  });
  it("Negative a. Callback is oneStepCheck", () => {
    const inputArr = [1, 2, 5, 4, 5];
    const actual = checkEachSequentialPairing(inputArr, uUtils.oneStepCheck);
    expect(actual).to.be.false;
  });
  it("Negative b. Callback is oneStepCheck", () => {
    const inputArr = [1, 2, 3, 4, 6];
    const actual = checkEachSequentialPairing(inputArr, uUtils.oneStepCheck);
    expect(actual).to.be.false;
  });
  it("Positive. Callback is areTwoObjectsEqual.", () => {
    const inputArr = [
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
    ];
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.areTwoObjectsEqual
    );
    expect(actual).to.be.true;
  });
  it("Negative. Callback is areTwoObjectsEqual.", () => {
    const inputArr = [
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 21 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
      {
        name: "Norbert",
        likes: [
          null,
          undefined,
          "birds",
          {
            friends: [
              { name: "Lee", age: 22 },
              { name: "Dee", age: 32 },
              [],
              {},
            ],
          },
          14,
        ],
        greetings: ["hi", "hello", "howdy"],
        age: 30,
      },
    ];
    const actual = checkEachSequentialPairing(
      inputArr,
      uUtils.areTwoObjectsEqual
    );
    expect(actual).to.be.false;
  });
});

xdescribe("explodeContractions", () => {
  it("Explode two of the same contraction.", () => {
    let actual = explodeContractions("ENG", "He's what he's seen.");

    const expected = [
      "he is what he is seen",
      "he is what he has seen",
      "he has what he is seen",
      "he has what he has seen",
    ];

    expect(actual).to.eql(expected);
  });
  it("Explode several different contractions.", () => {
    let actual = explodeContractions(
      "ENG",
      "He's what you'd seen when they're what you'd thought he's been but isn't."
    );

    const expected = [
      "he is what you would seen when they are what you would thought he is been but is not",
      "he is what you would seen when they are what you would thought he has been but is not",
      "he is what you would seen when they are what you had thought he is been but is not",
      "he is what you would seen when they are what you had thought he has been but is not",
      "he is what you had seen when they are what you would thought he is been but is not",
      "he is what you had seen when they are what you would thought he has been but is not",
      "he is what you had seen when they are what you had thought he is been but is not",
      "he is what you had seen when they are what you had thought he has been but is not",
      "he has what you would seen when they are what you would thought he is been but is not",
      "he has what you would seen when they are what you would thought he has been but is not",
      "he has what you would seen when they are what you had thought he is been but is not",
      "he has what you would seen when they are what you had thought he has been but is not",
      "he has what you had seen when they are what you would thought he is been but is not",
      "he has what you had seen when they are what you would thought he has been but is not",
      "he has what you had seen when they are what you had thought he is been but is not",
      "he has what you had seen when they are what you had thought he has been but is not",
    ];

    expect(actual).to.eql(expected);
  });
});

xdescribe("arrayExploder", () => {
  it("Returns empty array when given empty array.", () => {
    const input = [];
    const expected = [];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Returns an empty array, when given a superarray of one empty array.", () => {
    const input = [[]];
    const expected = [];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Returns an empty array, when given a superarray of two empty arrays.", () => {
    const input = [[], []];
    const expected = [];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Returns an empty array, when given a superarray of three empty arrays.", () => {
    const input = [[], [], []];
    const expected = [];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of two arrays.", () => {
    const input = [
      [1, 2, 3],
      ["a", "b", "c"],
    ];
    const expected = [
      [1, "a"],
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "b"],
      [2, "c"],
      [3, "a"],
      [3, "b"],
      [3, "c"],
    ];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays.", () => {
    const input = [
      [1, 2, 3],
      ["a", "b", "c"],
      [true, false],
    ];
    const expected = [
      [1, "a", true],
      [1, "a", false],
      [1, "b", true],
      [1, "b", false],
      [1, "c", true],
      [1, "c", false],
      [2, "a", true],
      [2, "a", false],
      [2, "b", true],
      [2, "b", false],
      [2, "c", true],
      [2, "c", false],
      [3, "a", true],
      [3, "a", false],
      [3, "b", true],
      [3, "b", false],
      [3, "c", true],
      [3, "c", false],
    ];

    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of two arrays, where one is empty.", () => {
    const input = [[1, 2, 3], []];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays, where one is empty. (1)", () => {
    const input = [[1, 2, 3], []];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays, where one is empty. (2)", () => {
    const input = [[], [1, 2, 3]];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays, where two are empty. (1)", () => {
    const input = [[], [1, 2, 3], []];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays, where two are empty. (2)", () => {
    const input = [[], [], [1, 2, 3]];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
  it("Explodes a superarray of three arrays, where two are empty. (3)", () => {
    const input = [[1, 2, 3], [], []];
    const expected = [[1], [2], [3]];
    const actual = arrayExploder(input);
    expect(actual).to.eql(expected);
  });
});

xdescribe("combineAndExplodeTwoSuperArrays", () => {
  it("Returns empty array when given two empty arrays.", () => {
    const input1 = [];
    const input2 = [];
    const expected = [];
    const actual = combineAndExplodeTwoSuperArrays(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("Combines and explodes two superarrays.", () => {
    const input1 = [
      ["kobieta", "ma", "jabłko"],
      ["kobieta", "ma", "lustro"],
    ];

    const input2 = [
      ["nie,", "chyba"],
      ["nie,", "pewnie"],
    ];

    const expected = [
      ["kobieta", "ma", "jabłko", "nie,", "chyba"],
      ["kobieta", "ma", "jabłko", "nie,", "pewnie"],
      ["kobieta", "ma", "lustro", "nie,", "chyba"],
      ["kobieta", "ma", "lustro", "nie,", "pewnie"],
    ];

    const actual = combineAndExplodeTwoSuperArrays(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("Combines and explodes one superarray with an empty one.", () => {
    const input1 = [
      ["kobieta", "ma", "jabłko"],
      ["kobieta", "ma", "lustro"],
    ];

    const input2 = [];

    const expected = [
      ["kobieta", "ma", "jabłko"],
      ["kobieta", "ma", "lustro"],
    ];

    const actual = combineAndExplodeTwoSuperArrays(input1, input2);
    expect(actual).to.eql(expected);
  });
});

xdescribe("copyWithoutReference", () => {
  it("Returns empty object when given empty array.", () => {
    const input = {};
    const actual = copyWithoutReference(input);
    expect(actual).to.eql(input);
  });
  it("Original object will not be mutated by changes to copy", () => {
    const input = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };
    const copyInput = {
      name: "Norbert",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [{ name: "Lee", age: 22 }, { name: "Dee", age: 32 }, [], {}],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
      age: 30,
    };
    const expectedAfterChanges = {
      name: "Norbz",
      likes: [
        null,
        undefined,
        "birds",
        {
          friends: [
            { name: "Lee", age: 22 },
            { name: "Deanna", age: 32 },
            [],
            {},
          ],
        },
        14,
      ],
      greetings: ["hi", "hello", "howdy"],
    };
    const actual = copyWithoutReference(input);
    expect(actual).to.eql(input);

    actual.name = "Norbz";
    actual.likes[3].friends[1].name = "Deanna";
    delete actual.age;

    expect(input).to.eql(copyInput);
    expect(actual).to.eql(expectedAfterChanges);
  });
});
