const { expect } = require("chai");
const {
  traverseAndRecordInflections,
} = require("../utils/lemmaFilteringUtils.js");

const shouldConsoleLog = false;

xdescribe("traverseAndRecordInflections", () => {
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
          plural: { virile: "czyta się", nonvirile: "czyta się" },
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
          plural: {
            virile: "będzie czytać się",
            nonvirile: "będzie czytać się",
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

  let requirementArrays = {
    "09": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["1per", "2per"]],
      ["number", ["singular", "plural"]],
      ["gender", ["m1", "m2", "m3", "f", "n"]],
    ],
    "08": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["1per"]],
      ["number", ["singular"]],
      ["gender", ["f"]],
    ],
    "07": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["f", "n"]],
    ],
    "06": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["m1", "m2"]],
    ],
    "05": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["f", "f"]],
    ],
    "04": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["f", "f", "f", "f", "f"]],
    ],
    "03": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["f", "f", "f", "f", "f", "n"]],
    ],
    "02": [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["m1", "m2", "m3", "f", "n", "f", "f", "n", "n"]],
    ],
    17: [
      ["form", ["verbal"]],
      ["tense", ["present", "past"]],
      ["person", ["2per", "3per"]],
      ["number", ["plural"]],
      ["gender", ["nonvirile"]],
    ],
    18: [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["2per", "3per"]],
      ["number", ["plural"]],
      ["gender", ["nonvirile"]],
    ],
    20: [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular"]],
      ["gender", ["f", "nonvirile"]],
    ],
    21: [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular", "plural"]],
      ["gender", ["f"]],
    ],
    19: [
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["plural"]],
      ["gender", ["nonvirile"]],
    ],
    22: [
      //breaks it!
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular", "plural"]],
      ["gender", ["nonvirile"]],
    ],
    23: [
      //breaks it!
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["plural"]],
      ["gender", ["f", "nonvirile"]],
    ],
    24: [
      //breaks it!
      ["form", ["verbal"]],
      ["tense", ["present"]],
      ["person", ["3per"]],
      ["number", ["singular", "plural"]],
      ["gender", ["f", "nonvirile"]],
    ],
  };

  function consoleLogOutputUnitsWithDrillPaths(
    number,
    outputUnitsWithDrillPaths
  ) {
    outputUnitsWithDrillPaths.forEach((outputUnitsWithDrillPathsUnit) => {
      consol.log(">>>", number);
      consol.log(
        "outputUnitsWithDrillPathsUnit selectedWordArray:",
        outputUnitsWithDrillPathsUnit.selectedWordArray
      );
      consol.log(
        "outputUnitsWithDrillPathsUnit drillPath:",
        outputUnitsWithDrillPathsUnit.drillPath
      );
      consol.log(" ");
      consol.log(" ");
    });
  }

  it("#lfu1.1a YES: Returns drills successfully (RDS) from set of single requirements.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "08";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths[0].selectedWordArray).to.eql(["czytam"]);

    expect(outputUnitsWithDrillPaths[0].drillPath).to.eql([
      ["form", "verbal"],
      ["tense", "present"],
      ["person", "1per"],
      ["number", "singular"],
      ["gender", "f"],
    ]);
  });
  it("#lfu1.1b YES: RDS when gender has two requirement traitValues.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "07";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(2);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.1c YES: RDS when gender has two requirement traitValues which are masculine subgenders.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "06";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(2);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.2a YES: RDS when gender has two identical requirement traitValues (feminine).", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "05";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(2);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.2b YES: RDS when gender has five identical requirement traitValues (feminine).", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "04";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(5);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.2c YES: RDS when gender has requirement traitValues that are five identical (feminine) and one different (neuter).", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "03";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(6);

    expect(outputUnitsWithDrillPaths).to.eql([
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
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "02";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );
    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(9);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.3a YES: RDS >>> Nonv, Plur <<<.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "19";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.3b YES: RDS >>> Fem, Plur <<< and two person choices.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "18";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(2);

    expect(outputUnitsWithDrillPaths).to.eql([
      {
        selectedWordArray: ["czytacie"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "2per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
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
  it("#lfu1.3c YES: RDS >>> Fem, Plur <<< and two person choices, and two tense choices.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "17";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(4);

    expect(outputUnitsWithDrillPaths).to.eql([
      {
        selectedWordArray: ["czytacie"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "present"],
          ["person", "2per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
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
      {
        selectedWordArray: ["czytałyście"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "past"],
          ["person", "2per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
        ],
      },
      {
        selectedWordArray: ["czytały"],
        drillPath: [
          ["form", "verbal"],
          ["tense", "past"],
          ["person", "3per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
        ],
      },
    ]);
  });
  it("#lfu1.4a YES: RDS >>> Fem+Nonv, singular <<<.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "20";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.4b YES: RDS >>> Fem, Sing+Plur <<<", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "21";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.4c YES: 22 (used to fail Drill Virile issue) RDS >>> Nonv, Sing+Plur <<<.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "22";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.4d YES: 23 (used to fail Drill Virile issue) RDS >>> Fem+Nonv, Plur <<<.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "23";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(1);

    expect(outputUnitsWithDrillPaths).to.eql([
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
  it("#lfu1.4e YES: 24 (used to fail Drill Virile issue) RDS >>> Fem+Nonv, Sing+Plur <<<.", () => {
    let outputUnitsWithDrillPaths = [];
    let reqArrNo = "24";
    traverseAndRecordInflections(
      source,
      requirementArrays[reqArrNo],
      outputUnitsWithDrillPaths
    );

    if (shouldConsoleLog) {
      consoleLogOutputUnitsWithDrillPaths(reqArrNo, outputUnitsWithDrillPaths);
    }

    expect(outputUnitsWithDrillPaths.length).to.equal(2);

    expect(outputUnitsWithDrillPaths).to.eql([
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
