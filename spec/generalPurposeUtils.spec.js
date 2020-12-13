const { expect } = require("chai");
const {
  copyWithoutReference,
  combineAndExplodeTwoSuperArrays,
  arrayExploder,
} = require("../utils/generalPurposeUtils.js");

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
    console.log("################");
    console.log(actual);
    console.log("################");
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
