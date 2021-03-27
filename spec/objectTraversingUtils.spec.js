const { expect } = require("chai");
const {
  extractNestedRoutes,
  concoctNestedRoutes,
  findObjectInNestedObject,
  giveRoutesAndTerminalValuesFromObject,
  findSynhomographs,
  findSinglePointMutationArray,
  isThisValueUniqueAtThisLevelInLemmaObject,
} = require("../utils/objectTraversingUtils.js");

describe("isThisValueUniqueAtThisLevelInLemmaObject", () => {
  let inputlObj1 = {
    //links
    translations: { ENG: ["PERSONAL"], POL: ["PERSONAL"] },
    tags: [],
    //selectors
    lemma: "PERSONAL",
    id: "pol-pro-001",
    //notes

    //inflections
    inflections: {
      pronoun: {
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
            allMasculineSingularGenders: {
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

  it("Not unique, as gender inflectionKeyy 'f' holds 'ja', which 'm1' also does.", () => {
    let inputInflectionTyype = "gender";

    let inputDrillPath = [
      ["form", "pronoun"],
      ["person", "1per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = isThisValueUniqueAtThisLevelInLemmaObject(
      inputlObj1,
      inputInflectionTyype,
      inputDrillPath
    );

    expect(actual).to.be.false;
  });
  it("Indeed unique, as gender inflectionKeyy 'f' holds 'ona', which no other inflectionKeyy does.", () => {
    let inputInflectionTyype = "gender";

    let inputDrillPath = [
      ["form", "pronoun"],
      ["person", "3per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = isThisValueUniqueAtThisLevelInLemmaObject(
      inputlObj1,
      inputInflectionTyype,
      inputDrillPath
    );

    expect(actual).to.be.true;
  });
  it("Indeed unique, as gender inflectionKeyy 'singular' holds values which 'plural' doesn't.", () => {
    let inputInflectionTyype = "number";

    let inputDrillPath = [
      ["form", "pronoun"],
      ["person", "3per"],
      ["number", "singular"],
      ["gender", "f"],
    ];

    const actual = isThisValueUniqueAtThisLevelInLemmaObject(
      inputlObj1,
      inputInflectionTyype,
      inputDrillPath
    );

    expect(actual).to.be.true;
  });
});

describe("findSynhomographs", () => {
  it("#otu4.1 Produces empty array when no lemmaObjects with any synhomographs are given.", () => {
    const lobjArr = [
      {
        lemma: "bike",
        id: "pol-bike001",

        inflections: {
          singular: {
            nom: "bikey",
            gen: "bikaroo",
          },
          plural: {
            nom: "bikeys",
            gen: "bikaroos",
          },
        },
      },
      {
        lemma: "trike",
        id: "pol-trike001",

        inflections: {
          singular: {
            nom: "trikey",
            gen: "trikaroo",
          },
          plural: {
            nom: "trikeys",
            gen: "trikaroos",
          },
        },
      },
    ];
    const structureChunkArr = [
      { wordtype: "noun" },
      { wordtype: "noun" },
      { wordtype: "noun" },
    ];

    const expected = [];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });

    console.log(actual);
    expect(actual).to.eql(expected);
  });
  it("#otu4.2 Produces synhomographs when one pair present in one lemmaObject.", () => {
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
        inflectionLabelChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "bike",
            inflectionPaths: [
              ["singular", "nom"],
              ["plural", "nom"],
            ],
            labelsWhereTheyDiffer: ["number"],
          },
        ],
      },
    ];

    const structureChunkArr = [
      { wordtype: "noun" },
      { wordtype: "noun" },
      { wordtype: "noun" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    console.log(actual);
    expect(actual).to.eql(expected);
  });
  it("#otu4.3 Produces synhomographs when multiple pairs present in one lemmaObject.", () => {
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
        inflectionLabelChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "11",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "ins"],
              ["singular", "loc"],
            ],
            labelsWhereTheyDiffer: ["gcase"],
          },
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "14",
            inflectionPaths: [
              ["singular", "acc"],
              ["plural", "dat"],
            ],
            labelsWhereTheyDiffer: ["number", "gcase"],
          },
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "16",
            inflectionPaths: [
              ["plural", "gen"],
              ["plural", "acc"],
            ],
            labelsWhereTheyDiffer: ["gcase"],
          },
        ],
      },
    ];
    const structureChunkArr = [
      { wordtype: "noun" },
      { wordtype: "noun" },
      { wordtype: "noun" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    console.log(actual);
    expect(actual).to.eql(expected);
  });
  it("#otu4.4 Produces synhomographs when multiple pairs present in multiple lemmaObjects.", () => {
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
            nom: "trikey",
            gen: "trikaroo",
          },
          plural: {
            nom: "trikeys",
            gen: "trikaroos",
          },
        },
      },
      {
        lemma: "unike",
        id: "pol-unike001",

        inflections: {
          singular: {
            nom: "unikey",
            acc: "unikey",
          },
          plural: {
            nom: "unikeys",
            acc: "unikey",
          },
        },
      },
    ];

    const expected = [
      {
        lemmaObjectId: "pol-bike001",
        inflectionLabelChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "11",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "ins"],
              ["singular", "loc"],
            ],
            labelsWhereTheyDiffer: ["gcase"],
          },
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "14",
            inflectionPaths: [
              ["singular", "acc"],
              ["plural", "dat"],
            ],
            labelsWhereTheyDiffer: ["number", "gcase"],
          },
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "16",
            inflectionPaths: [
              ["plural", "gen"],
              ["plural", "acc"],
            ],
            labelsWhereTheyDiffer: ["gcase"],
          },
        ],
      },
      {
        lemmaObjectId: "pol-unike001",
        inflectionLabelChain: ["number", "gcase"],
        synhomographs: [
          {
            inflectionLabelChain: ["number", "gcase"],
            terminalValue: "unikey",
            inflectionPaths: [
              ["singular", "nom"],
              ["singular", "acc"],
              ["plural", "acc"],
            ],
            labelsWhereTheyDiffer: ["number", "gcase"],
          },
        ],
      },
    ];
    const structureChunkArr = [
      { wordtype: "noun" },
      { wordtype: "noun" },
      { wordtype: "noun" },
    ];
    const actual = [];

    lobjArr.forEach((lobj, index) => {
      let res = findSynhomographs(lobj, structureChunkArr[index], "POL");
      if (res) {
        actual.push(res);
      }
    });
    console.log(actual);
    expect(actual).to.eql(expected);
  });
});

describe("findObjectInNestedObject", () => {
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

  it("#otu3.1 NO: Returns undefined from one level of nesting, when no matching object can be found.", () => {
    const input1 = testObj1;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it("#otu3.2a YES: Correctly return object from one level of nesting, finding by matching a string.", () => {
    const input1 = testObj1;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      sentenceStructure: ["my", 123, "bird", 456],
    });
  });
  it("#otu3.2b YES: Correctly return object from one level of nesting, finding by matching an array.", () => {
    const input1 = testObj1;
    const input2 = { sentenceStructure: ["my", 123, "sharona", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my sharona",
      sentenceStructure: ["my", 123, "sharona", 456],
    });
  });
  it("#otu3.2c YES: Correctly return object from one level of nesting, finding by matching multiple values.", () => {
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
  it("#otu3.3 NO: Returns undefined from nested object when no matching object can be found.", () => {
    const input1 = testObj2;
    const input2 = { symbol: "nonexistent symbol" };
    expect(findObjectInNestedObject(input1, input2)).to.eql(undefined);
  });
  it("#otu3.3a Correctly return object from multi nesting, finding by matching a string.", () => {
    const input1 = testObj2;
    const input2 = { symbol: "my bird" };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my bird",
      sentenceStructure: ["my", 123, "bird", 456],
    });
  });
  it("#otu3.3b Correctly return object from multi nesting, finding by matching an array.", () => {
    const input1 = testObj2;
    const input2 = { sentenceStructure: ["my", 123, "sharona", 456] };
    expect(findObjectInNestedObject(input1, input2)).to.eql({
      symbol: "my sharona",
      sentenceStructure: ["my", 123, "sharona", 456],
    });
  });
  it("#otu3.3c Correctly return object from multi nesting, finding by matching multiple values.", () => {
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

describe("concoctNestedRoutes", () => {
  xit("#otu2.1a Throw error for empty input.", () => {
    const input1 = [];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  xit("#otu2.1b Throw error for partly empty input.", () => {
    const input1 = [["singular"], []];
    const input2 = [];
    expect(() => {
      concoctNestedRoutes(input1, input2);
    }).to.throw();
  });
  it("#otu2.2a Create nested routes for simple input.", () => {
    const input1 = [["singular"], ["nom"]];
    const input2 = [];
    const expected = [["singular", "nom"]];
    const actual = concoctNestedRoutes(input1, input2);
    expect(actual).to.eql(expected);
  });
  it("#otu2.2b Create nested routes for slightly complex input.", () => {
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
  it("#otu2.2c Create nested routes for complex input.", () => {
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
  it("#otu2.3 Use second input to fill in empty arrays of first input.", () => {
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
  it("#otu1.1a Returns empty array for empty object.", () => {
    const input = {};
    const expected = {
      routesByNesting: [],
      routesByLevel: [],
    };
    const actual = extractNestedRoutes(input);
    expect(actual.routesByNesting).to.eql(expected.routesByNesting);
    expect(actual.routesByLevel).to.eql(expected.routesByLevel);
  });
  it("#otu1.1b Returns key routes for object with one key at single level of nesting.", () => {
    const input = { singular: "apple" };
    const expected = [["singular"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#otu1.1c Returns key routes for object with many keys at single level of nesting.", () => {
    const input = { singular: "apple", plural: "apples" };
    const expected = [["singular"], ["plural"]];
    const actual = extractNestedRoutes(input).routesByNesting;
    expect(actual).to.eql(expected);
  });
  it("#otu1.1d Returns key routes for object with many keys at two levels of nesting.", () => {
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
  it("#otu1.1e Returns key routes for object with many keys at various levels of nesting.", () => {
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
    console.log("---------------------------------");
    console.log(actual);
    expect(actual).to.eql(expected);
  });
  it("#otu1.1f Returns key routes when some values are arrays and should not be mapped out.", () => {
    const input = {
      singular: { nom: "chłopak", acc: "chłopaka" },
      plural: {
        nom: { isTerminus: true, normal: ["chłopacy", "chłopaki"] },
        acc: "chłopakøw",
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
  it("#otu1.2a get routes from kobieta.", () => {
    const input = {
      //links
      translations: { ENG: ["woman", "lady"] },
      tags: ["animate", "person", "concrete"],
      //selectors
      lemma: "kobieta",
      id: "pol-nou-001",
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

    let res = giveRoutesAndTerminalValuesFromObject(input.inflections);
    console.log(res);
  });
  it("#otu1.2b get routes from read.", () => {
    const input = {
      //links
      translations: { ENG: ["read"], POL: ["czytać", "przeczytać"] },
      tags: ["basic2"],
      //selectors
      lemma: "read",
      id: "eng-ver-003",
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

    let res = giveRoutesAndTerminalValuesFromObject(input.inflections);
    console.log(res);
  });
});

describe("findSinglePointMutationArray", () => {
  it("#otu5.0 Give empty for empty", () => {
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
  it("#otu5.1", () => {
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
  it("#otu5.2", () => {
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
  it("#otu5.3", () => {
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
  it("#otu5.4", () => {
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
