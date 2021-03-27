const { expect } = require("chai");
const {
  combineAndExplodeTwoSuperArrays,
} = require("../utils/generalPurposeUtils.js");

const {
  copyWithoutReference,
  arrayExploder,
  checkEachSequentialPairing,
  areTwoObjectsEqual,
} = require("../utils/universalUtils.js");

const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");

describe("areTwoObjectsEqual", () => {
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

describe("checkEachSequentialPairing", () => {
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

describe("arrayExploder", () => {
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

describe("combineAndExplodeTwoSuperArrays", () => {
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

describe("copyWithoutReference", () => {
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
