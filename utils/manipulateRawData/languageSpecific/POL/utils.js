const mrUtils = require("../../manipulateRawUtils.js");
const uUtils = require("../../../universalUtils.js");
const consol = require("../../../zerothOrder/consoleLoggingUtils.js");
const ref = require("./reference.js");

exports.formulateInflections = (protoLObj) => {
  let { constituentWords } = protoLObj;

  let inflections = {};
  let otherShapes = {};

  constituentWords.forEach((cw) => {
    let wordValue = cw.word;
    let inflectionsString = cw.traits;

    let matchFound = false;

    ref.higherInflectionsRef.forEach((higherInflectionKey) => {
      //eg "singular"

      if (inflectionsString.toLowerCase().includes(higherInflectionKey)) {
        matchFound = true;
        let matchFoundSecondLevel = false;
        ref.inflectionsRef.forEach((inflectionKey) => {
          //eg "nominative"
          if (inflectionsString.toLowerCase().includes(inflectionKey)) {
            matchFoundSecondLevel = true;
            uUtils.addToArrayAtKey(
              inflections,
              [higherInflectionKey, ref.shorthandInflectionsRef[inflectionKey]],
              wordValue
            );
          }
        });

        if (!matchFoundSecondLevel) {
          uUtils.addToArrayAtKey(
            inflections,
            [higherInflectionKey, "unsorted"],
            wordValue
          );
        }
      }
    });

    if (!matchFound) {
      ref.otherInflectionsRef.forEach((otherInflectionKey) => {
        //eg "diminutive"

        if (inflectionsString.toLowerCase().includes(otherInflectionKey)) {
          matchFound = true;
          uUtils.addToArrayAtKey(otherShapes, otherInflectionKey, wordValue);
        }
      });
    }

    if (!matchFound) {
      uUtils.addToArrayAtKey(
        otherShapes,
        ["unsorted", inflectionsString],
        wordValue
      );
    }
  });

  if (!inflections["singular"]) {
    inflections["singular"] = {};
  }
  inflections["singular"]["nom"] = [protoLObj.lemma];

  if (protoLObj.extraInflectionData) {
    Object.keys(ref.shorthandInflectionsRef2).forEach((shorthandCombined) => {
      let separatedInflectionKeys =
        ref.shorthandInflectionsRef2[shorthandCombined];

      if (
        Object.keys(protoLObj.extraInflectionData).includes(shorthandCombined)
      ) {
        let wordValue = protoLObj.extraInflectionData[shorthandCombined][0];

        if (wordValue.includes("/")) {
          wordValue = wordValue.split("/").map((w) => w.replace(/\s/g, ""));
        } else {
          wordValue = [wordValue];
        }

        if (!inflections[separatedInflectionKeys[0]]) {
          inflections[separatedInflectionKeys[0]] = {};
        }

        if (
          !inflections[separatedInflectionKeys[0]][separatedInflectionKeys[1]]
        ) {
          inflections[separatedInflectionKeys[0]][separatedInflectionKeys[1]] =
            wordValue;
        }
      }
    });

    delete protoLObj.extraInflectionData;
  }

  if (protoLObj.otherShapes && Object.keys(protoLObj.otherShapes).length) {
    Object.keys(protoLObj.otherShapes).forEach((k) => {
      let v = protoLObj.otherShapes[k];

      if (typeof v === "string") {
        uUtils.addToArrayAtKey(otherShapes, k, v);
      } else if (Array.isArray(v)) {
        if (!otherShapes[k]) {
          otherShapes[k] = [];
        }
        otherShapes[k] = [...otherShapes[k], ...v];
      }
    });
  }

  Object.keys(otherShapes).forEach((k) => {
    if (otherShapes[k].length > 1) {
      otherShapes[k] = Array.from(new Set(otherShapes[k]));
    }
  });

  protoLObj.otherShapes = otherShapes;

  if (!Object.keys(protoLObj.otherShapes).length) {
    delete protoLObj.otherShapes;
  }

  if (protoLObj.otherShapes) {
    if (!protoLObj.xtra) {
      protoLObj.xtra = {};
    }
    protoLObj.xtra.otherShapes = protoLObj.otherShapes;
    delete protoLObj.otherShapes;
  }

  ref.higherInflectionsRef.forEach((higherInflectionKey) => {
    let inf = inflections[higherInflectionKey];

    if (!inf) {
      return;
    }

    Object.keys(inf).forEach((k) => {
      if (inf[k].length === 1) {
        inf[k] = inf[k][0];
      } else {
        inf[k] = {
          isTerminus: true,
          requiresAttention:
            "Should any from .normal go to .additionalFrequent ?",
          normal: inf[k],
          additionalFrequent: [],
        };
      }
    });
  });

  protoLObj.inflections = inflections;
  delete protoLObj.constituentWords;
};
