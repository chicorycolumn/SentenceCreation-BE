const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const cfUtils = require("../utils/counterfaxUtils.js");

const {
  copyWithoutReference,
  arrayExploder,
  checkEachSequentialPairing,
  areTwoObjectsEqual,
} = require("../utils/universalUtils.js");

xdescribe("listCounterfaxSituations", () => {
  it("Two annotations on one, and one on the other.", () => {
    let questionOutputArray = [
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-pro-PERSONAL"],
            POL: ["pol-pro-PERSONAL"],
          },
          tags: [],
          lemma: "",
          id: "eng-pro-PERSONAL",
          inflections: {
            pronombre: {
              "1per": {
                singular: {
                  m: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                  f: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                },
                plural: {
                  virile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                  nonvirile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                },
              },
              "2per": {
                singular: {
                  m: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  f: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
                plural: {
                  virile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  nonvirile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
              },
              "3per": {
                singular: {
                  m: {
                    nom: "he",
                    dat: "him",
                    acc: "him",
                  },
                  f: {
                    nom: "she",
                    dat: "her",
                    acc: "her",
                  },
                  n: {
                    nom: "it",
                    dat: "it",
                    acc: "it",
                  },
                },
                plural: {
                  m: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  f: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  virile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  nonvirile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                },
              },
            },
          },
        },
        selectedWord: "we",
        drillPath: [
          ["form", "pronombre"],
          ["person", "1per"],
          ["number", "plural"],
          ["gender", "virile"],
          ["gcase", "nom"],
        ],
        structureChunk: {
          chunkId: "pro-1",
          specificIds: ["eng-pro-PERSONAL"],
          number: ["plural"],
          person: ["1per"],
          dontSpecifyOnThisChunk: true,
          form: ["pronombre"],
          gender: ["virile"],
          andTags: [],
          annotations: {
            gender: "virile",
            person: "1per",
          },
        },
      },
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-ver-008-see"],
            POL: ["pol-ver-018-widzieć", "pol-ver-018-zobaczyć"],
          },
          tags: ["basic1"],
          lemma: "see",
          id: "eng-ver-008-see",
          inflections: {
            infinitive: "see",
            verbal: {},
            v2: "saw",
            v3: "seen",
            thirdPS: "sees",
            gerund: "seeing",
          },
        },
        selectedWord: "saw",
        drillPath: undefined,
        structureChunk: {
          chunkId: "ver-1",
          agreeWith: "pro-1",
          specificIds: ["eng-ver-008-see"],
          tenseDescription: ["past simple"],
          dontSpecifyOnThisChunk: true,
          form: ["verbal"],
          andTags: ["basic1"],
          annotations: {},
        },
      },
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-pro-PERSONAL"],
            POL: ["pol-pro-PERSONAL"],
          },
          tags: [],
          lemma: "",
          id: "eng-pro-PERSONAL",
          inflections: {
            pronombre: {
              "1per": {
                singular: {
                  m: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                  f: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                },
                plural: {
                  virile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                  nonvirile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                },
              },
              "2per": {
                singular: {
                  m: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  f: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
                plural: {
                  virile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  nonvirile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
              },
              "3per": {
                singular: {
                  m: {
                    nom: "he",
                    dat: "him",
                    acc: "him",
                  },
                  f: {
                    nom: "she",
                    dat: "her",
                    acc: "her",
                  },
                  n: {
                    nom: "it",
                    dat: "it",
                    acc: "it",
                  },
                },
                plural: {
                  m: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  f: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  virile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  nonvirile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                },
              },
            },
          },
        },
        selectedWord: "them",
        drillPath: [
          ["form", "pronombre"],
          ["person", "3per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
          ["gcase", "acc"],
        ],
        structureChunk: {
          chunkId: "pro-2",
          specificIds: ["eng-pro-PERSONAL"],
          gcase: ["acc"],
          number: ["plural"],
          person: ["3per"],
          dontSpecifyOnThisChunk: true,
          form: ["pronombre"],
          gender: ["nonvirile"],
          andTags: [],
          annotations: {
            gender: "nonvirile",
          },
        },
      },
    ];
    let languagesObject = {
      answerLanguage: "POL",
      questionLanguage: "ENG",
    };
    let expected = {
      headsFirstSequenceChunkIds: ["pro-1", "pro-2"],
      "pro-1": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "gender",
            traitValue: "m",
          },
          {
            traitKey: "gender",
            traitValue: "f",
          },
          {
            traitKey: "gender",
            traitValue: "n",
          },
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
        person: [
          {
            traitKey: "person",
            traitValue: "1per",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
      },
      "pro-2": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "gender",
            traitValue: "m",
          },
          {
            traitKey: "gender",
            traitValue: "f",
          },
          {
            traitKey: "gender",
            traitValue: "n",
          },
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
    };
    const actual = cfUtils.listCounterfaxSituations(
      questionOutputArray,
      languagesObject
    ).counterfaxSituations;
    expect(actual).to.eql(expected);
  });
  it("Don't bother with dependents.", () => {
    let questionOutputArray = [
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-pro-PERSONAL"],
            POL: ["pol-pro-PERSONAL"],
          },
          tags: [],
          lemma: "",
          id: "eng-pro-PERSONAL",
          inflections: {
            pronombre: {
              "1per": {
                singular: {
                  m: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                  f: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                },
                plural: {
                  virile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                  nonvirile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                },
              },
              "2per": {
                singular: {
                  m: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  f: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
                plural: {
                  virile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  nonvirile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
              },
              "3per": {
                singular: {
                  m: {
                    nom: "he",
                    dat: "him",
                    acc: "him",
                  },
                  f: {
                    nom: "she",
                    dat: "her",
                    acc: "her",
                  },
                  n: {
                    nom: "it",
                    dat: "it",
                    acc: "it",
                  },
                },
                plural: {
                  m: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  f: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  virile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  nonvirile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                },
              },
            },
          },
        },
        selectedWord: "we",
        drillPath: [
          ["form", "pronombre"],
          ["person", "1per"],
          ["number", "plural"],
          ["gender", "virile"],
          ["gcase", "nom"],
        ],
        structureChunk: {
          chunkId: "pro-1",
          specificIds: ["eng-pro-PERSONAL"],
          number: ["plural"],
          person: ["1per"],
          dontSpecifyOnThisChunk: true,
          form: ["pronombre"],
          gender: ["virile"],
          andTags: [],
          annotations: {
            gender: "virile",
            person: "1per",
          },
        },
      },
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-ver-008-see"],
            POL: ["pol-ver-018-widzieć", "pol-ver-018-zobaczyć"],
          },
          tags: ["basic1"],
          lemma: "see",
          id: "eng-ver-008-see",
          inflections: {
            infinitive: "see",
            verbal: {},
            v2: "saw",
            v3: "seen",
            thirdPS: "sees",
            gerund: "seeing",
          },
        },
        selectedWord: "saw",
        drillPath: undefined,
        structureChunk: {
          chunkId: "ver-1",
          agreeWith: "pro-1",
          specificIds: ["eng-ver-008-see"],
          tenseDescription: ["past simple"],
          dontSpecifyOnThisChunk: true,
          form: ["verbal"],
          andTags: ["basic1"],
          annotations: {},
        },
      },
      {
        selectedLemmaObject: {
          translations: {
            ENG: ["eng-pro-PERSONAL"],
            POL: ["pol-pro-PERSONAL"],
          },
          tags: [],
          lemma: "",
          id: "eng-pro-PERSONAL",
          inflections: {
            pronombre: {
              "1per": {
                singular: {
                  m: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                  f: {
                    nom: "I",
                    dat: "me",
                    acc: "me",
                  },
                },
                plural: {
                  virile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                  nonvirile: {
                    nom: "we",
                    dat: "us",
                    acc: "us",
                  },
                },
              },
              "2per": {
                singular: {
                  m: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  f: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
                plural: {
                  virile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                  nonvirile: {
                    nom: "you",
                    dat: "you",
                    acc: "you",
                  },
                },
              },
              "3per": {
                singular: {
                  m: {
                    nom: "he",
                    dat: "him",
                    acc: "him",
                  },
                  f: {
                    nom: "she",
                    dat: "her",
                    acc: "her",
                  },
                  n: {
                    nom: "it",
                    dat: "it",
                    acc: "it",
                  },
                },
                plural: {
                  m: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  f: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  virile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                  nonvirile: {
                    nom: "they",
                    dat: "them",
                    acc: "them",
                  },
                },
              },
            },
          },
        },
        selectedWord: "them",
        drillPath: [
          ["form", "pronombre"],
          ["person", "3per"],
          ["number", "plural"],
          ["gender", "nonvirile"],
          ["gcase", "acc"],
        ],
        structureChunk: {
          chunkId: "pro-2",
          specificIds: ["eng-pro-PERSONAL"],
          gcase: ["acc"],
          number: ["plural"],
          person: ["3per"],
          dontSpecifyOnThisChunk: true,
          form: ["pronombre"],
          gender: ["nonvirile"],
          andTags: [],
          annotations: {
            gender: "nonvirile",
          },
        },
      },
    ];
    let languagesObject = {
      answerLanguage: "POL",
      questionLanguage: "ENG",
    };
    let expected = {
      headsFirstSequenceChunkIds: ["pro-1", "pro-2"],
      "pro-1": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "gender",
            traitValue: "m",
          },
          {
            traitKey: "gender",
            traitValue: "f",
          },
          {
            traitKey: "gender",
            traitValue: "n",
          },
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
        person: [
          {
            traitKey: "person",
            traitValue: "1per",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
      },
      "pro-2": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "gender",
            traitValue: "m",
          },
          {
            traitKey: "gender",
            traitValue: "f",
          },
          {
            traitKey: "gender",
            traitValue: "n",
          },
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
    };
    const actual = cfUtils.listCounterfaxSituations(
      questionOutputArray,
      languagesObject
    ).counterfaxSituations;
    expect(actual).to.eql(expected);
  });
});

xdescribe("explodeCounterfaxSituations", () => {
  it("Two by three by two makes twelve.", () => {
    let input = {
      headsFirstSequenceChunkIds: ["pro-1", "pro-2"],
      "pro-1": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
        person: [
          {
            traitKey: "person",
            traitValue: "1per",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
      },
      "pro-2": {
        gender: [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
    };
    let expected = [
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "1per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "1per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "1per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "1per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "2per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
        ],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": [
          {
            traitKey: "gender",
            traitValue: "nonvirile",
          },
          {
            traitKey: "person",
            traitValue: "3per",
          },
        ],
        "pro-2": [
          {
            traitKey: "gender",
            traitValue: "virile",
          },
        ],
      },
    ];
    const actual = cfUtils.explodeCounterfaxSituations(input);
    delete actual.cfLabels;
    actual.forEach((sit) => {
      delete sit.cfLabel;
    });
    expect(actual).to.eql(expected);
  });
  it("Two by two by two by two makes sixteen.", () => {
    let input = {
      headsFirstSequenceChunkIds: ["pro-1", "pro-2"],
      "pro-1": {
        gender: ["pro-1=gender=non", "pro-1=gender=vir"],
        person: ["pro-1=person=1per", "pro-1=person=2per"],
      },
      "pro-2": {
        size: ["pro-2=size=big", "pro-2=size=small"],
        color: ["pro-2=color=red", "pro-2=color=yellow"],
      },
    };
    let expected = [
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=non", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=1per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=big", "pro-2=color=yellow"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=red"],
      },
      {
        chunkIds: ["pro-1", "pro-2"],
        "pro-1": ["pro-1=gender=vir", "pro-1=person=2per"],
        "pro-2": ["pro-2=size=small", "pro-2=color=yellow"],
      },
    ];
    const actual = cfUtils.explodeCounterfaxSituations(input);
    delete actual.cfLabels;
    actual.forEach((sit) => {
      delete sit.cfLabel;
    });
    expect(actual).to.eql(expected);
  });
});
