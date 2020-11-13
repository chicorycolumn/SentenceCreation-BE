const { expect } = require("chai");
const { giveNestedRoutes } = require("../utils/sentenceCreationUtils.js");

describe("giveNestedRoutes", () => {
  it("#scu1.1 Returns empty array for empty object.", () => {
    const input = {};
    const expected = [];
    const actual = giveNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.2 Returns key routes for object with one key at single level of nesting.", () => {
    const input = { singular: "apple" };
    const expected = [["singular"]];
    const actual = giveNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#scu1.3 Returns key routes for object with many keys at single level of nesting.", () => {
    const input = { singular: "apple", plural: "apples" };
    const expected = [["singular"], ["plural"]];
    const actual = giveNestedRoutes(input).routesByNesting;
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
    const actual = giveNestedRoutes(input).routesByNesting;
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
    const actual = giveNestedRoutes(input).routesByNesting;
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
    const actual = giveNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
});
