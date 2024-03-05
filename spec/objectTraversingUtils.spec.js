const apiUtils = require("../utils/secondOrder/apiUtils");
const { expect } = require("chai");
const {
  extractNestedRoutes,
  concoctNestedRoutes,
  findObjectInNestedObject,
  giveRoutesAndTerminalValuesFromObject,
  findSynhomographs,
  findSinglePointMutationArray,
  doesThisInflectionKeyHoldUniqueInflectionValueInLObj,
} = require("../utils/objectTraversingUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");

xdescribe("doesThisInflectionKeyHoldUniqueInflectionValueInLObj", () => {
  let inputlObj1 = {
    //links
    translations: { ENG: ["PERSONAL"], POL: ["PERSONAL"] },
    tags: [],
    //selectors
    lemma: "PERSONAL",
    id: "pol-pro-901",
    //notes

    //inflections
    inflections: {
      pronombre: {
        "1per": {
          singular: {
            m1: {
              nom: "ja",
              gen: "mnie",
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["mi"],
                stressed: ["mnie"],
              },
              acc: "mnie",
              ins: "mną",
              loc: "mnie",
            },
            f: {
              nom: "ja",
              gen: "mnie",
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["mi"],
                stressed: ["mnie"],
              },
              acc: "mnie",
              ins: "mną",
              loc: "mnie",
            },
          },
          plural: {
            virile: {
              nom: "my",
              gen: "nas",
              dat: "nam",
              acc: "nas",
              ins: "nami",
              loc: "nas",
            },
            nonvirile: {
              nom: "my",
              gen: "nas",
              dat: "nam",
              acc: "nas",
              ins: "nami",
              loc: "nas",
            },
          },
        },
        "2per": {
          singular: {
            m1: {
              nom: "ty",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["cię"],
                stressed: ["ciebie"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ci"],
                stressed: ["tobie"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["cię"],
                stressed: ["ciebie"],
              },
              ins: "tobą",
              loc: "tobie",
            },
            f: {
              nom: "ty",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["cię"],
                stressed: ["ciebie"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ci"],
                stressed: ["tobie"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["cię"],
                stressed: ["ciebie"],
              },
              ins: "tobą",
              loc: "tobie",
            },
          },
          plural: {
            virile: {
              nom: "wy",
              gen: "was",
              dat: "wam",
              acc: "was",
              ins: "wami",
              loc: "was",
            },
            nonvirile: {
              nom: "wy",
              gen: "was",
              dat: "wam",
              acc: "was",
              ins: "wami",
              loc: "was",
            },
          },
        },
        "3per": {
          singular: {
            _MasculineSingularGenders: {
              nom: "on",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["go"],
                stressed: ["jego"],
                postPreposition: ["niego"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["mu"],
                stressed: ["jemu"],
                postPreposition: ["niemu"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["go"],
                stressed: ["jego"],
                postPreposition: ["niego"],
              },
              ins: "nim",
              loc: "nim",
            },
            f: {
              nom: "ona",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["jej"],
                stressed: ["jej"],
                postPreposition: ["niej"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["jej"],
                stressed: ["jej"],
                postPreposition: ["niej"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ją"],
                stressed: ["ją"],
                postPreposition: ["nią"],
              },
              ins: "nią",
              loc: "niej",
            },
            n: {
              nom: "ono",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["go"],
                stressed: ["jego"],
                postPreposition: ["niego"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["mu"],
                stressed: ["jemu"],
                postPreposition: ["niemu"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["je"],
                stressed: ["je"],
                postPreposition: ["nie"],
              },
              ins: "nim",
              loc: "nim",
            },
          },
          plural: {
            virile: {
              nom: "oni",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ich"],
                stressed: ["ich"],
                postPreposition: ["nich"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["im"],
                stressed: ["im"],
                postPreposition: ["nim"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ich"],
                stressed: ["ich"],
                postPreposition: ["nich"],
              },
              ins: "nimi",
              loc: "nich",
            },
            nonvirile: {
              nom: "one",
              gen: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["ich"],
                stressed: ["ich"],
                postPreposition: ["nich"],
              },
              dat: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["im"],
                stressed: ["im"],
                postPreposition: ["nim"],
              },
              acc: {
                isTerminus: true,
                processOnlyAtEnd: true,
                unstressed: ["je"],
                stressed: ["je"],
                postPreposition: ["nie"],
              },
              ins: "nimi",
              loc: "nich",
            },
          },
        },
      },
    },
  };

  it("Not unique, as gender inflectionKey 'f' holds 'ja', which 'm1' also does.", () => {
    let inputInflectionCategory = "gender";

    let inputDrillPath = [
      ["form", "pronombre"],
      ["person", "1per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = doesThisInflectionKeyHoldUniqueInflectionValueInLObj(
      inputlObj1,
      inputInflectionCategory,
      inputDrillPath
    );

    expect(actual).to.be.false;
  });
  it("Indeed unique, as gender inflectionKey 'f' holds 'ona', which no other inflectionKey does.", () => {
    let inputInflectionCategory = "gender";

    let inputDrillPath = [
      ["form", "pronombre"],
      ["person", "3per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = doesThisInflectionKeyHoldUniqueInflectionValueInLObj(
      inputlObj1,
      inputInflectionCategory,
      inputDrillPath
    );

    expect(actual).to.be.true;
  });
  it("Indeed unique, as gender inflectionKey 'singular' holds traitValues which 'plural' doesn't.", () => {
    let inputInflectionCategory = "number";

    let inputDrillPath = [
      ["form", "pronombre"],
      ["person", "3per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = doesThisInflectionKeyHoldUniqueInflectionValueInLObj(
      inputlObj1,
      inputInflectionCategory,
      inputDrillPath
    );

    expect(actual).to.be.true;
  });
});

xdescribe("findSynhomographs", () => {
  const testEnv = "ref";
  apiUtils.setEnvir({ body: { envir: testEnv } });

  it(`${testEnv}#otu4.1 Produces empty array when no lemmaObjects with any synhomographs are given.`, () => {
    const lobjArr = [
      {
        lemma: "bike",
        id: "pol-bike001",

        inflections: {
          singular: {
            nom: "bicyclaroo",
            gen: "bikaroo",
          },
          plural: {
            nom: "bicyclaroos",
            gen: "bikaroos",
          },
        },
      },
      {
        lemma: "trike",
        id: "pol-trike001",

        inflections: {
          singular: {
            nom: "tricyclaroo",
            gen: "trikaroo",
          },
          plural: {
            nom: "tricyclaroos",
            gen: "trikaroos",
          },
        },
      },
    ];
    const structureChunkArr = [
      { wordtype: "nco", chunkId: "nco-1" },
      { wordtype: "nco", chunkId: "nco-2" },
      { wordtype: "nco", chunkId: "nco-3" },
    ];

    const expected = [];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });

    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu4.2 Produces synhomographs when one pair present in one lemmaObject.`, () => {
    const lobjArr = [
      {
        lemma: "bike",
        id: "pol-bike001",

        inflections: {
          singular: {
            nom: "bike",
            gen: "bikeA",
            dat: "bikeB",
            acc: "bikeC",
            ins: "bikeD",
            loc: "bikeE",
          },
          plural: {
            nom: "bike",
            gen: "bikeG",
            dat: "bikeH",
            acc: "bikeF",
            ins: "bikeI",
            loc: "bikeJ",
          },
        },
      },
    ];

    const expected = [
      {
        lemmaObjectId: "pol-bike001",
        inflectionCategoryChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "bike",
            inflectionPaths: [
              ["singular", "nom"],
              ["plural", "nom"],
            ],
            inflectionCategorysWhereTheyDiffer: ["number"],
          },
        ],
      },
    ];

    const structureChunkArr = [
      { wordtype: "nco", chunkId: "nco-1" },
      { wordtype: "nco", chunkId: "nco-2" },
      { wordtype: "nco", chunkId: "nco-3" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu4.3 Produces synhomographs when multiple pairs present in one lemmaObject.`, () => {
    const lobjArr = [
      {
        lemma: "bike",
        id: "pol-bike001",

        inflections: {
          singular: {
            nom: "11",
            gen: "12",
            dat: "13",
            acc: "14",
            ins: "11",
            loc: "11",
          },
          plural: {
            nom: "15",
            gen: "16",
            dat: "14",
            acc: "16",
            ins: "17",
            loc: "18",
          },
        },
      },
    ];

    const expected = [
      {
        lemmaObjectId: "pol-bike001",
        inflectionCategoryChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "11",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "ins"],
              ["singular", "loc"],
            ],
            inflectionCategorysWhereTheyDiffer: ["gcase"],
          },
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "14",
            inflectionPaths: [
              ["singular", "acc"],
              ["plural", "dat"],
            ],
            inflectionCategorysWhereTheyDiffer: ["number", "gcase"],
          },
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "16",
            inflectionPaths: [
              ["plural", "gen"],
              ["plural", "acc"],
            ],
            inflectionCategorysWhereTheyDiffer: ["gcase"],
          },
        ],
      },
    ];
    const structureChunkArr = [
      { wordtype: "nco", chunkId: "nco-1" },
      { wordtype: "nco", chunkId: "nco-2" },
      { wordtype: "nco", chunkId: "nco-3" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu4.4 Produces synhomographs when multiple pairs present in multiple lemmaObjects.`, () => {
    const lobjArr = [
      {
        lemma: "bike",
        id: "pol-bike001",

        inflections: {
          singular: {
            nom: "11",
            gen: "12",
            dat: "13",
            acc: "14",
            ins: "11",
            loc: "11",
          },
          plural: {
            nom: "15",
            gen: "16",
            dat: "14",
            acc: "16",
            ins: "17",
            loc: "18",
          },
        },
      },
      {
        lemma: "trike",
        id: "pol-trike001",

        inflections: {
          singular: {
            nom: "tricyclaroo",
            gen: "trikaroo",
          },
          plural: {
            nom: "tricyclaroos",
            gen: "trikaroos",
          },
        },
      },
      {
        lemma: "unike",
        id: "pol-unike001",

        inflections: {
          singular: {
            nom: "unicyclaroo",
            acc: "unicyclaroo",
          },
          plural: {
            nom: "unicyclaroos",
            acc: "unicyclaroo",
          },
        },
      },
    ];

    const expected = [
      {
        lemmaObjectId: "pol-bike001",
        inflectionCategoryChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "11",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "ins"],
              ["singular", "loc"],
            ],
            inflectionCategorysWhereTheyDiffer: ["gcase"],
          },
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "14",
            inflectionPaths: [
              ["singular", "acc"],
              ["plural", "dat"],
            ],
            inflectionCategorysWhereTheyDiffer: ["number", "gcase"],
          },
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "16",
            inflectionPaths: [
              ["plural", "gen"],
              ["plural", "acc"],
            ],
            inflectionCategorysWhereTheyDiffer: ["gcase"],
          },
        ],
      },
      {
        lemmaObjectId: "pol-unike001",
        inflectionCategoryChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionCategoryChain: ["number", "gcase"],
            terminalValue: "unicyclaroo",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "acc"],
              ["plural", "acc"],
            ],
            inflectionCategorysWhereTheyDiffer: ["number", "gcase"],
          },
        ],
      },
    ];
    const structureChunkArr = [
      { wordtype: "nco", chunkId: "nco-1" },
      { wordtype: "nco", chunkId: "nco-2" },
      { wordtype: "nco", chunkId: "nco-3" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
});

xdescribe("findObjectInNestedObject", () => {
  const testEnv = "ref";
  apiUtils.setEnvir({ body: { envir: testEnv } });

  let testObj1 = {
    level01: {
      1: {
        symbol: "my labrador",
        sentenceStructure: ["my", 123, "labrador", 456],
      },
      2: {
        symbol: "my siamese",
        sentenceStructure: ["my", 123, "siamese", 456],
      },
    },
    level02: {
      1: {
        symbol: "my fish",
        sentenceStructure: ["my", 123, "fish", 456],
      },
      2: {
        symbol: "my bird",
        sentenceStructure: ["my", 123, "bird", 456],
      },
    },
    level03: {
      1: {
        symbol: "my sharona",
        sentenceStructure: ["my", 123, "sharona", 456],
      },
      2: {
        symbol: "my car",
        sentenceStructure: ["my", 123, "car", 456],
      },
    },
    level04: {
      1: {
        symbol: "my aunt",
        sentenceStructure: ["my", 1, "aunt", 1],
        id: "aunt1",
      },
      2: {
        symbol: "my aunt",
        sentenceStructure: ["my", 2, "aunt", 2],
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
          sentenceStructure: ["my", 123, "labrador", 456],
        },
        8: {
          9: "dziewiEC",
          10: {
            1: {
              symbol: "my sharona",
              sentenceStructure: ["my", 123, "sharona", 456],
            },
            2: {
              symbol: "my car",
              sentenceStructure: ["my", 123, "car", 456],
            },
          },
        },
        11: "jedenaScie",
        12: {
          symbol: "my bird",
          sentenceStructure: ["my", 123, "bird", 456],
        },
      },
      13: {
        1: {
          symbol: "my aunt",
          sentenceStructure: ["my", 1, "aunt", 1],
          id: "aunt1",
        },
        2: {
          symbol: "my aunt",
          sentenceStructure: ["my", 2, "aunt", 2],
          id: "aunt2",
        },
      },
    },
  };

  it(`${testEnv}#otu3.1 NO: Returns undefined from one level of nesting, when no matching object can be found.`, () => {
    const input1 = testObj1;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it(`${testEnv}#otu3.2a YES: Correctly return object from one level of nesting, finding by matching a string.`, () => {
    const input1 = testObj1;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      sentenceStructure: ["my", 123, "bird", 456],
    });
  });
  it(`${testEnv}#otu3.2b YES: Correctly return object from one level of nesting, finding by matching an array.`, () => {
    const input1 = testObj1;
    const input2 = { sentenceStructure: ["my", 123, "sharona", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my sharona",
      sentenceStructure: ["my", 123, "sharona", 456],
    });
  });
  it(`${testEnv}#otu3.2c YES: Correctly return object from one level of nesting, finding by matching multiple items.`, () => {
    const input1 = testObj1;
    const input2 = {
      symbol: "my aunt",
      sentenceStructure: ["my", 2, "aunt", 2],
    };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my aunt",
      sentenceStructure: ["my", 2, "aunt", 2],
      id: "aunt2",
    });
  });
  it(`${testEnv}#otu3.3 NO: Returns undefined from nested object when no matching object can be found.`, () => {
    const input1 = testObj2;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it(`${testEnv}#otu3.3a Correctly return object from multi nesting, finding by matching a string.`, () => {
    const input1 = testObj2;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      sentenceStructure: ["my", 123, "bird", 456],
    });
  });
  it(`${testEnv}#otu3.3b Correctly return object from multi nesting, finding by matching an array.`, () => {
    const input1 = testObj2;
    const input2 = { sentenceStructure: ["my", 123, "sharona", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my sharona",
      sentenceStructure: ["my", 123, "sharona", 456],
    });
  });
  it(`${testEnv}#otu3.3c Correctly return object from multi nesting, finding by matching multiple items.`, () => {
    const input1 = testObj2;
    const input2 = {
      symbol: "my aunt",
      sentenceStructure: ["my", 2, "aunt", 2],
    };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my aunt",
      sentenceStructure: ["my", 2, "aunt", 2],
      id: "aunt2",
    });
  });
});

xdescribe("concoctNestedRoutes", () => {
  const testEnv = "ref";
  apiUtils.setEnvir({ body: { envir: testEnv } });

  it(`${testEnv}#otu2.1a Throw error for empty input.`, () => {
    const input1 = [];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  it(`${testEnv}#otu2.1b Throw error for partly empty input.`, () => {
    const input1 = [["singular"], []];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  it(`${testEnv}#otu2.2a Create nested routes for simple input.`, () => {
    const input1 = [["singular"], ["nom"]];
    const input2 = [];
    const expected = [["singular", "nom"]];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu2.2b Create nested routes for slightly complex input.`, () => {
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
  it(`${testEnv}#otu2.2c Create nested routes for complex input.`, () => {
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
  it(`${testEnv}#otu2.3 Use second input to fill in empty arrays of first input.`, () => {
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

xdescribe("extractNestedRoutes/giveRoutesAndTerminalValuesFromObject", () => {
  const testEnv = "ref";
  apiUtils.setEnvir({ body: { envir: testEnv } });

  it(`${testEnv}#otu1.1a Returns empty array for empty object.`, () => {
    const input = {};
    const expected = {
      routesByNesting: [],
      routesByLevel: [],
    };
    const actual = extractNestedRoutes(input);
    expect(actual.routesByNesting).to.eql(expected.routesByNesting);
    expect(actual.routesByLevel).to.eql(expected.routesByLevel);
  });
  it(`${testEnv}#otu1.1b Returns routes for object with one traitKey at single level of nesting.`, () => {
    const input = { singular: "apple" };
    const expected = [["singular"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.1c Returns routes for object with many traitKeys at single level of nesting.`, () => {
    const input = { singular: "apple", plural: "apples" };
    const expected = [["singular"], ["plural"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.1d Returns routes for object with many traitKeys at two levels of nesting.`, () => {
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
  it(`${testEnv}#otu1.1e Returns routes for object with many traitKeys at various levels of nesting.`, () => {
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
          one: { jeden: "1" },
          two: { dwa: { a: "obaj", b: "obie" } },
          three: "3",
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
    consol.log("---------------------------------");
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.1f Returns routes when some items are arrays and should not be mapped out.`, () => {
    const input = {
      singular: { nom: "chłopak", acc: "chłopaka" },
      plural: {
        nom: { isTerminus: true, normal: ["chłopacy", "chłopaki"] },
        acc: "chłopaków",
      },
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
  it(`${testEnv}#otu1.2a get routes from kobieta, plus describedRoutes.`, () => {
    const input = {
      //links
      translations: { ENG: ["woman", "lady"] },
      tags: ["animate", "concrete"],
      //selectors
      lemma: "kobieta",
      id: "pol-npe-901",
      gender: "f",
      //notes

      //inflections
      inflections: {
        singular: {
          nom: "kobieta",
          gen: "kobiety",
          dat: "kobiecie",
          acc: "kobietę",
          ins: "kobietą",
          loc: "kobiecie",
        },
        plural: {
          nom: "kobiety",
          gen: "kobiet",
          dat: "kobietom",
          acc: "kobiety",
          ins: {
            isTerminus: true,
            normal: ["kobietami", "kobietamiamiamiami"],
          },
          loc: "kobietach",
        },
      },
    };

    let expected = [
      {
        terminalValue: "kobieta",
        nestedRoute: ["singular", "nom"],
        describedRoute: { number: "singular", gcase: "nom" },
      },
      {
        terminalValue: "kobiety",
        nestedRoute: ["singular", "gen"],
        describedRoute: { number: "singular", gcase: "gen" },
      },
      {
        terminalValue: "kobiecie",
        nestedRoute: ["singular", "dat"],
        describedRoute: { number: "singular", gcase: "dat" },
      },
      {
        terminalValue: "kobietę",
        nestedRoute: ["singular", "acc"],
        describedRoute: { number: "singular", gcase: "acc" },
      },
      {
        terminalValue: "kobietą",
        nestedRoute: ["singular", "ins"],
        describedRoute: { number: "singular", gcase: "ins" },
      },
      {
        terminalValue: "kobiecie",
        nestedRoute: ["singular", "loc"],
        describedRoute: { number: "singular", gcase: "loc" },
      },
      {
        terminalValue: "kobiety",
        nestedRoute: ["plural", "nom"],
        describedRoute: { number: "plural", gcase: "nom" },
      },
      {
        terminalValue: "kobiet",
        nestedRoute: ["plural", "gen"],
        describedRoute: { number: "plural", gcase: "gen" },
      },
      {
        terminalValue: "kobietom",
        nestedRoute: ["plural", "dat"],
        describedRoute: { number: "plural", gcase: "dat" },
      },
      {
        terminalValue: "kobiety",
        nestedRoute: ["plural", "acc"],
        describedRoute: { number: "plural", gcase: "acc" },
      },
      {
        terminalValue: undefined,
        nestedRoute: ["plural", "ins"],
        describedRoute: { number: "plural", gcase: "ins" },
      },
      {
        terminalValue: "kobietach",
        nestedRoute: ["plural", "loc"],
        describedRoute: { number: "plural", gcase: "loc" },
      },
    ];

    let actual = giveRoutesAndTerminalValuesFromObject(input, true);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.2b get routes from read.`, () => {
    const input = {
      //links
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-903",
      //notes

      //inflections
      inflections: {
        infinitive: "read",
        verbal: {},
        v2: "read",
        v3: "read",
        thirdPS: "reads",
        gerund: "reading",
      },
    };

    let expected = [
      { terminalValue: "read", nestedRoute: ["infinitive"] },
      { terminalValue: "read", nestedRoute: ["v2"] },
      { terminalValue: "read", nestedRoute: ["v3"] },
      { terminalValue: "reads", nestedRoute: ["thirdPS"] },
      { terminalValue: "reading", nestedRoute: ["gerund"] },
    ];

    let actual = giveRoutesAndTerminalValuesFromObject(input);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.2b get routes from read.`, () => {
    const input = {
      //links
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-903",
      //notes

      //inflections
      inflections: {
        infinitive: "read",
        verbal: {},
        v2: "read",
        v3: "read",
        thirdPS: "reads",
        gerund: "reading",
      },
    };

    let expected = [
      { terminalValue: "read", nestedRoute: ["infinitive"] },
      { terminalValue: "read", nestedRoute: ["v2"] },
      { terminalValue: "read", nestedRoute: ["v3"] },
      { terminalValue: "reads", nestedRoute: ["thirdPS"] },
      { terminalValue: "reading", nestedRoute: ["gerund"] },
    ];

    let actual = giveRoutesAndTerminalValuesFromObject(input);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.3a get routes from tObj.`, () => {
    const input = {
      //links
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-903",
      //notes

      //inflections
      inflections: {
        isTerminus: true,
        processOnlyAtEnd: true,
        nonprotective: ["wib"],
        protective: ["wob"],
      },
    };

    const expected = {
      routesByNesting: [["nonprotective"], ["protective"]],
      routesByLevel: [["nonprotective", "protective"]],
    };

    let actual = extractNestedRoutes(input.inflections);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu1.3b get routes from tObj.`, () => {
    const input = {
      //links
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-903",
      //notes

      //inflections
      inflections: {
        isTerminus: true,
        processOnlyAtEnd: true,
        nonprotective: ["wib"],
        protective: ["wob"],
      },
    };

    let expected = [
      { terminalValue: "wib", nestedRoute: ["nonprotective"] },
      { terminalValue: "wob", nestedRoute: ["protective"] },
    ];

    let actual = giveRoutesAndTerminalValuesFromObject(input);
    consol.log(actual);
    expect(actual).to.eql(expected);
  });
});

xdescribe("findSinglePointMutationArray", () => {
  const testEnv = "ref";
  apiUtils.setEnvir({ body: { envir: testEnv } });

  it(`${testEnv}#otu5.0 Give empty for empty`, () => {
    let input_arrayOfArrays = [];
    let input_currentArray = [];
    let input_position = 0;

    const actual = findSinglePointMutationArray(
      input_currentArray,
      input_arrayOfArrays,

      input_position
    );

    const expected = false;

    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu5.1`, () => {
    let input_arrayOfArrays = [
      ["sing", "nom"],
      ["sing", "acc"],
      ["plur", "nom"],
    ];
    let input_currentArray = ["sing", "nom"];
    let input_position = 0;

    const actual = findSinglePointMutationArray(
      input_currentArray,
      input_arrayOfArrays,

      input_position
    );
    const expected = true;

    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu5.2`, () => {
    let input_arrayOfArrays = [
      ["sing", "nom"],
      ["sing", "acc"],
      ["plur", "nom"],
    ];
    let input_currentArray = ["sing", "acc"];
    let input_position = 0;

    const actual = findSinglePointMutationArray(
      input_currentArray,
      input_arrayOfArrays,

      input_position
    );
    const expected = false;

    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu5.3`, () => {
    let input_arrayOfArrays = [
      ["sing", "nom"],
      ["sing", "acc"],
      ["plur", "nom"],
    ];
    let input_currentArray = ["sing", "acc"];
    let input_position = 1;

    const actual = findSinglePointMutationArray(
      input_currentArray,
      input_arrayOfArrays,

      input_position
    );
    const expected = true;

    expect(actual).to.eql(expected);
  });
  it(`${testEnv}#otu5.4`, () => {
    let input_arrayOfArrays = [
      ["sing", "nom", "1per"],
      ["sing", "acc", "1per"],
      ["plur", "nom", "1per"],
    ];
    let input_currentArray = ["sing", "nom", "1per"];
    let input_position = 0;

    const actual = findSinglePointMutationArray(
      input_currentArray,
      input_arrayOfArrays,

      input_position
    );
    const expected = true;

    expect(actual).to.eql(expected);
  });
});
