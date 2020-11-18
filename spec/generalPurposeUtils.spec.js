const { expect } = require("chai");
const { copyWithoutReference } = require("../utils/generalPurposeUtils.js");

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
