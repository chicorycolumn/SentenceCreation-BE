const { expect } = require("chai");
const {
  extractNestedRoutes,
  concoctNestedRoutes,
  findObjectInNestedObject,
} = require("../utils/objectTraversingUtils.js");

describe("findObjectInNestedObject", () => {
  let testObj1 = {
    level01: {
      1: {
        symbol: "my labrador",
        structure: ["my", 123, "labrador", 456],
      },
      2: {
        symbol: "my siamese",
        structure: ["my", 123, "siamese", 456],
      },
    },
    level02: {
      1: {
        symbol: "my fish",
        structure: ["my", 123, "fish", 456],
      },
      2: {
        symbol: "my bird",
        structure: ["my", 123, "bird", 456],
      },
    },
    level03: {
      1: {
        symbol: "my house",
        structure: ["my", 123, "house", 456],
      },
      2: {
        symbol: "my car",
        structure: ["my", 123, "car", 456],
      },
    },
    level04: {
      1: {
        symbol: "my aunt",
        structure: ["my", 1, "aunt", 1],
        id: "aunt1",
      },
      2: {
        symbol: "my aunt",
        structure: ["my", 2, "aunt", 2],
        id: "aunt2",
      },
    },
  };
  let testObj2 = {
    1: { 2: "dwa", 3: "trzy" },
    4: [4, 44, 444],
    5: {
      6: {
        7: {
          symbol: "my labrador",
          structure: ["my", 123, "labrador", 456],
        },
        8: {
          9: "dziewiEC",
          10: {
            1: {
              symbol: "my house",
              structure: ["my", 123, "house", 456],
            },
            2: {
              symbol: "my car",
              structure: ["my", 123, "car", 456],
            },
          },
        },
        11: "jedenaScie",
        12: {
          symbol: "my bird",
          structure: ["my", 123, "bird", 456],
        },
      },
      13: {
        1: {
          symbol: "my aunt",
          structure: ["my", 1, "aunt", 1],
          id: "aunt1",
        },
        2: {
          symbol: "my aunt",
          structure: ["my", 2, "aunt", 2],
          id: "aunt2",
        },
      },
    },
  };

  it("#scu3.1 NO: Returns undefined from one level of nesting, when no matching object can be found.", () => {
    const input1 = testObj1;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it("#scu3.2a YES: Correctly return object from one level of nesting, finding by matching a string.", () => {
    const input1 = testObj1;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      structure: ["my", 123, "bird", 456],
    });
  });
  it("#scu3.2b YES: Correctly return object from one level of nesting, finding by matching an array.", () => {
    const input1 = testObj1;
    const input2 = { structure: ["my", 123, "house", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my house",
      structure: ["my", 123, "house", 456],
    });
  });
  it("#scu3.2c YES: Correctly return object from one level of nesting, finding by matching multiple values.", () => {
    const input1 = testObj1;
    const input2 = {
      symbol: "my aunt",
      structure: ["my", 2, "aunt", 2],
    };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my aunt",
      structure: ["my", 2, "aunt", 2],
      id: "aunt2",
    });
  });
  it("#scu3.3 NO: Returns undefined from nested object when no matching object can be found.", () => {
    const input1 = testObj2;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it("#scu3.3a Correctly return object from multi nesting, finding by matching a string.", () => {
    const input1 = testObj2;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      structure: ["my", 123, "bird", 456],
    });
  });
  it("#scu3.3b Correctly return object from multi nesting, finding by matching an array.", () => {
    const input1 = testObj2;
    const input2 = { structure: ["my", 123, "house", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my house",
      structure: ["my", 123, "house", 456],
    });
  });
  it("#scu3.3c Correctly return object from multi nesting, finding by matching multiple values.", () => {
    const input1 = testObj2;
    const input2 = {
      symbol: "my aunt",
      structure: ["my", 2, "aunt", 2],
    };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my aunt",
      structure: ["my", 2, "aunt", 2],
      id: "aunt2",
    });
  });
});

describe("concoctNestedRoutes", () => {
  xit("#scu2.1a Throw error for empty input.", () => {
    const input1 = [];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  xit("#scu2.1b Throw error for partly empty input.", () => {
    const input1 = [["singular"], []];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  it("#scu2.2a Create nested routes for simple input.", () => {
    const input1 = [["singular"], ["nom"]];
    const input2 = [];
    const expected = [["singular", "nom"]];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("#scu2.2b Create nested routes for slightly complex input.", () => {
    const input1 = [
      ["singular", "plural"],
      ["nom", "gen", "dat"],
    ];
    const input2 = [];
    const expected = [
      ["singular", "nom"],
      ["singular", "gen"],
      ["singular", "dat"],
      ["plural", "nom"],
      ["plural", "gen"],
      ["plural", "dat"],
    ];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("#scu2.2c Create nested routes for complex input.", () => {
    const input1 = [
      ["singular", "plural"],
      ["nom", "gen", "dat", "acc"],
      ["spooky mood", "cool mood"],
    ];
    const input2 = [];
    const expected = [
      ["singular", "nom", "spooky mood"],
      ["singular", "nom", "cool mood"],
      ["singular", "gen", "spooky mood"],
      ["singular", "gen", "cool mood"],
      ["singular", "dat", "spooky mood"],
      ["singular", "dat", "cool mood"],
      ["singular", "acc", "spooky mood"],
      ["singular", "acc", "cool mood"],
      ["plural", "nom", "spooky mood"],
      ["plural", "nom", "cool mood"],
      ["plural", "gen", "spooky mood"],
      ["plural", "gen", "cool mood"],
      ["plural", "dat", "spooky mood"],
      ["plural", "dat", "cool mood"],
      ["plural", "acc", "spooky mood"],
      ["plural", "acc", "cool mood"],
    ];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("#scu2.3 Use second input to fill in empty arrays of first input.", () => {
    const input1 = [["singular", "plural"], []];
    const input2 = [["singular"], ["ins", "loc"]];
    const expected = [
      ["singular", "ins"],
      ["singular", "loc"],
      ["plural", "ins"],
      ["plural", "loc"],
    ];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
});

describe("extractNestedRoutes", () => {
  it("#scu1.1 Returns empty array for empty object.", () => {
    const input = {};
    const expected = {
      routesByNesting: [],
      routesByLevel: [],
    };
    const actual = extractNestedRoutes(input);
    expect(actual.routesByNesting).to.eql(expected.routesByNesting);
    expect(actual.routesByLevel).to.eql(expected.routesByLevel);
  });
  it("#scu1.2 Returns key routes for object with one key at single level of nesting.", () => {
    const input = { singular: "apple" };
    const expected = [["singular"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.3 Returns key routes for object with many keys at single level of nesting.", () => {
    const input = { singular: "apple", plural: "apples" };
    const expected = [["singular"], ["plural"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.4 Returns key routes for object with many keys at two levels of nesting.", () => {
    const input = {
      singular: { nom: "kobieta", loc: "kobiecie" },
      plural: { nom: "kobiety", loc: "kobietach" },
    };
    const expected = [
      ["singular", "nom"],
      ["singular", "loc"],
      ["plural", "nom"],
      ["plural", "loc"],
    ];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.5 Returns key routes for object with many keys at various levels of nesting.", () => {
    const input = {
      singular: {
        nom: "jabłko",
        gen: "jabłka",
        dat: "jabłku",
        acc: "jabłko",
        ins: "jabłkiem",
        loc: "jabłku",
      },
      plural: {
        nom: {
          one: { jeden: 1 },
          two: { dwa: { a: "obaj", b: "obie" } },
          three: 3,
        },
        gen: "jabłek",
        dat: "jabłkom",
        acc: "jabłka",
        ins: "jabłkami",
        loc: "jabłkach",
      },
    };
    const expected = [
      ["singular", "nom"],
      ["singular", "gen"],
      ["singular", "dat"],
      ["singular", "acc"],
      ["singular", "ins"],
      ["singular", "loc"],
      ["plural", "nom", "one", "jeden"],
      ["plural", "nom", "two", "dwa", "a"],
      ["plural", "nom", "two", "dwa", "b"],
      ["plural", "nom", "three"],
      ["plural", "gen"],
      ["plural", "dat"],
      ["plural", "acc"],
      ["plural", "ins"],
      ["plural", "loc"],
    ];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.6 Returns key routes when some values are arrays and should not be mapped out.", () => {
    const input = {
      singular: { nom: "chłopak", acc: "chłopaka" },
      plural: { nom: ["chłopacy", "chłopaki"], acc: "chłopakøw" },
    };
    const expected = [
      ["singular", "nom"],
      ["singular", "acc"],
      ["plural", "nom"],
      ["plural", "acc"],
    ];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
});
