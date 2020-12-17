const { expect } = require("chai");
const {
  traverseAndRecordInflections2,
} = require("../utils/lemmaFilteringUtils.js");

describe.only("traverseAndRecordInflections2", () => {
  let source = {
    infinitive: "czytać",
    verbal: {
      past: {
        impersonal: {
          singular: {
            m1: "czytano",
            m2: "czytano",
            m3: "czytano",
            f: "czytano",
            n: "czytano",
          },
          plural: { virile: "czytano", nonvirile: "czytano" },
        },
        "1per": {
          singular: {
            f: "czytałam",
            m1: "czytałem",
            m2: "czytałem",
            m3: "czytałem",
          },
          plural: { virile: "czytaliśmy", nonvirile: "czytałyśmy" },
        },
        "2per": {
          singular: {
            f: "czytałaś",
            m1: "czytałeś",
            m2: "czytałeś",
            m3: "czytałeś",
          },
          plural: { virile: "czytaliście", nonvirile: "czytałyście" },
        },
        "3per": {
          singular: {
            f: "czytała",
            n: "czytało",
            m1: "czytał",
            m2: "czytał",
            m3: "czytał",
          },
          plural: { virile: "czytali", nonvirile: "czytały" },
        },
      },
      present: {
        impersonal: {
          singular: {
            m1: "czyta się",
            m2: "czyta się",
            m3: "czyta się",
            f: "czyta się",
            n: "czyta się",
          },
        },
        "1per": {
          singular: { m1: "czytam", m2: "czytam", m3: "czytam", f: "czytam" },
          plural: { virile: "czytamy", nonvirile: "czytamy" },
        },
        "2per": {
          singular: {
            m1: "czytasz",
            m2: "czytasz",
            m3: "czytasz",
            f: "czytasz",
          },
          plural: { virile: "czytacie", nonvirile: "czytacie" },
        },
        "3per": {
          singular: {
            m1: "czyta",
            m2: "czyta",
            m3: "czyta",
            f: "czyta",
            n: "czyta",
          },
          plural: { virile: "czytają", nonvirile: "czytają" },
        },
      },
      future: {
        impersonal: {
          singular: {
            m1: "będzie czytać się",
            m2: "będzie czytać się",
            m3: "będzie czytać się",
            f: "będzie czytać się",
            n: "będzie czytać się",
          },
        },
        "1per": {
          singular: { f: [Array], m1: [Array], m2: [Array], m3: [Array] },
          plural: { virile: [Array], nonvirile: [Array] },
        },
        "2per": {
          singular: { f: [Array], m1: [Array], m2: [Array], m3: [Array] },
          plural: { virile: [Array], nonvirile: [Array] },
        },
        "3per": {
          singular: {
            f: [Array],
            n: [Array],
            m1: [Array],
            m2: [Array],
            m3: [Array],
          },
          plural: { virile: [Array], nonvirile: [Array] },
        },
      },
      conditional: {
        impersonal: {
          singular: {
            m1: "czytano by",
            m2: "czytano by",
            m3: "czytano by",
            f: "czytano by",
            n: "czytano by",
          },
          plural: { virile: "czytano by", nonvirile: "czytano by" },
        },
        "1per": {
          singular: {
            f: "czytałabym",
            m1: "czytałbym",
            m2: "czytałbym",
            m3: "czytałbym",
          },
          plural: { virile: "czytalibyśmy", nonvirile: "czytałybyśmy" },
        },
        "2per": {
          singular: {
            f: "czytałabyś",
            m1: "czytałbyś",
            m2: "czytałbyś",
            m3: "czytałbyś",
          },
          plural: { virile: "czytalibyście", nonvirile: "czytałybyście" },
        },
        "3per": {
          singular: {
            f: "czytałaby",
            n: "czytałoby",
            m1: "czytałby",
            m2: "czytałby",
            m3: "czytałby",
          },
          plural: { virile: "czytaliby", nonvirile: "czytałyby" },
        },
      },
      imperative: {
        "1per": {
          singular: {
            m1: "niech czytam",
            m2: "niech czytam",
            m3: "niech czytam",
            f: "niech czytam",
          },
          plural: { virile: "czytajmy", nonvirile: "czytajmy" },
        },
        "2per": {
          singular: { m1: "czytaj", m2: "czytaj", m3: "czytaj", f: "czytaj" },
          plural: { virile: "czytajcie", nonvirile: "czytajcie" },
        },
        "3per": {
          singular: {
            m1: "niech czyta",
            m2: "niech czyta",
            m3: "niech czyta",
            f: "niech czyta",
            n: "niech czyta",
          },
          plural: { virile: "niech czytają", nonvirile: "niech czytają" },
        },
      },
    },
    activeAdjectival: "czytający",
    passiveAdjectival: "czytany",
    contemporaryAdverbial: "czytając",
    verbalNoun: "czytanie",
  };
  let requirementArrs09 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["1per", "2per"]],
    ["number", ["singular", "plural"]],
    ["gender", ["m1", "m2", "m3", "f", "n"]],
  ];
  let requirementArrs08 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["1per"]],
    ["number", ["singular"]],
    ["gender", ["f"]],
  ];
  let requirementArrs07 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["f", "n"]],
  ];
  let requirementArrs06 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["m1", "m2"]],
  ];
  let requirementArrs05 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["f", "f"]],
  ];
  let requirementArrs04 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["f", "f", "f", "f", "f"]],
  ];
  let requirementArrs03 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["f", "f", "f", "f", "f", "n"]],
  ];
  let requirementArrs02 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular"]],
    ["gender", ["m1", "m2", "m3", "f", "n", "f", "f", "n", "n"]],
  ];

  let requirementArrs20 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["singular", "plural"]],
    ["gender", ["f", "nonvirile"]],
  ];
  let requirementArrs19 = [
    ["form", ["verbal"]],
    ["tense", ["present"]],
    ["person", ["3per"]],
    ["number", ["plural"]],
    ["gender", ["nonvirile"]],
  ];

  function consoleLogPathRecord(pathRecord) {
    pathRecord.forEach((pathRecordUnit) => {
      console.log(
        "pppathRecordUnit selectedWordArray:",
        pathRecordUnit.selectedWordArray
      );
      console.log("pppathRecordUnit drillPath:", pathRecordUnit.drillPath);
      console.log(" ");
      console.log(" ");
    });
  }

  it("#lfu1.1a YES: Returns drills successfully (RDS) from set of single requirements.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs08, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(1);

    expect(pathRecord[0].selectedWordArray).to.eql(["czytam"]);

    expect(pathRecord[0].drillPath).to.eql([
      ["form", "verbal"],
      ["tense", "present"],
      ["person", "1per"],
      ["number", "singular"],
      ["gender", "f"],
    ]);
  });
  it("#lfu1.1b YES: RDS when gender has two requirement values.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs07, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(2);

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "n"],
        ],
      },
    ]);
  });
  it("#lfu1.1c YES: RDS when gender has two requirement values which are masculine subgenders.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs06, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(2);

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "m1"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "m2"],
        ],
      },
    ]);
  });
  it("#lfu1.2a YES: RDS when gender has two identical requirement values (feminine).", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs05, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(2);

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
    ]);
  });
  it("#lfu1.2b YES: RDS when gender has five identical requirement values (feminine).", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs04, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(5);

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
    ]);
  });
  it("#lfu1.2c YES: RDS when gender has five identical requirement values (feminine) and one other value (neuter).", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs03, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(6);

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "n"],
        ],
      },
    ]);
  });
  it("#lfu1.2d YES: RDS when gender has big mix of duplicates in gender requirements.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs02, pathRecord);
    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(9);
    // return;

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "m1"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "m2"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "m3"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "n"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "n"],
        ],
      },
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "n"],
        ],
      },
    ]);
  });
  it("#lfu1.3a YES: RDS when one gender (f), and plural.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs19, pathRecord);

    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(1);
    // return;

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czytają"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
        ],
      },
    ]);
  });
  it("#lfu1.3b YES: RDS when one gender (f), but singular and plural.", () => {
    let pathRecord = [];
    traverseAndRecordInflections2(source, requirementArrs20, pathRecord);

    consoleLogPathRecord(pathRecord);

    expect(pathRecord.length).to.equal(2);
    // return;

    expect(pathRecord).to.eql([
      {
        selectedWordArray: ["czyta"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "singular"],
          ["gender", "f"],
        ],
      },
      {
        selectedWordArray: ["czytają"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "3per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
        ],
      },
    ]);
  });
});
