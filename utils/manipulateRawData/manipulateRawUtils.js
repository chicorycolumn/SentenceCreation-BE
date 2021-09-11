const mrUtils = require("./manipulateRawUtils.js");
const uUtils = require("../universalUtils.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");
const ref = require("./reference.js");

exports.logHowManyInflectionsFilled = (protoLObjs) => {
  let howManyInflectionsFilledOut = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };
  consol.log("[1;30m " + `    ----    ` + "[0m");
  consol.log("[1;30m " + `[${protoLObjs.length}] total protoLObjs` + "[0m");

  protoLObjs.forEach((p) => {
    let numInflectionsFilled = Object.keys(ref.shorthandInflectionsRef2).filter(
      (doubleInflectionKey) => {
        let number = ref.shorthandInflectionsRef2[doubleInflectionKey][0];
        let gender = ref.shorthandInflectionsRef2[doubleInflectionKey][1];
        return (
          gender !== "voc" &&
          p.inflections[number] &&
          p.inflections[number][gender]
        );
      }
    ).length;

    howManyInflectionsFilledOut[numInflectionsFilled]++;
  });
  Object.keys(howManyInflectionsFilledOut).forEach((numInflections) => {
    let countProtoLObjs = howManyInflectionsFilledOut[numInflections];
    consol.log(
      "[1;30m " +
        `[${countProtoLObjs}] protoLObjs have filled out ${numInflections}/12 inflections.` +
        "[0m"
    );
  });
  consol.log("[1;30m " + `    ----    ` + "[0m");
};

exports.formulateInflectionsFromRaw = (protoLObj) => {
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
            "Should any from .normal go to .additionalNormal ?",
          normal: inf[k],
          additionalNormal: [],
        };
      }
    });
  });

  protoLObj.inflections = inflections;
  delete protoLObj.constituentWords;
};

exports.makeLemmaObjectIDs = (protoLObjs, lang, existingLemmaObjects) => {
  function makeIds(protoLObj, counts, lang, wordtypeCode) {
    let idNum = uUtils.numToString(counts[wordtypeCode] + 1, 3);
    let id = `${lang.toLowerCase()}-${wordtypeCode}-${idNum}-${
      protoLObj.lemma
    }`;
    counts[wordtypeCode]++;
    return id;
  }

  let counts = { nco: 0, npe: 0, ncp: 0, npp: 0 };
  if (existingLemmaObjects) {
    Object.keys(counts).forEach((wordtypeCode) => {
      let lObjs = existingLemmaObjects.filter(
        (l) => l.id.split("-")[1] === wordtypeCode
      );

      lObjs.sort(
        (a, b) => parseInt(b.id.split("-")[2]) - parseInt(a.id.split("-")[2])
      );

      let highestIdNumber = parseInt(lObjs[0].id.split("-")[2]);

      counts[wordtypeCode] = highestIdNumber;
    });
  } else {
    console.log(
      "No existing lemma objects given so couldn't take into account existing numbers already used when making lemma object IDs."
    );
  }

  protoLObjs.forEach((protoLObj) => {
    let wordtypeCode = protoLObj.isPerson ? "npe" : "nco";
    protoLObj.id = makeIds(protoLObj, counts, lang, wordtypeCode);
  });

  let headWordsThatHaveMultipleProtoLObjs = [];
  let allHeadWords = protoLObjs.map((p) => p.lemma);
  let tempArr = [];
  allHeadWords.forEach((h) => {
    if (
      tempArr.includes(h) &&
      !headWordsThatHaveMultipleProtoLObjs.includes(h)
    ) {
      headWordsThatHaveMultipleProtoLObjs.push(h);
    }
    tempArr.push(h);
  });

  headWordsThatHaveMultipleProtoLObjs.forEach((h) => {
    protoLObjs.forEach((p) => {
      if (p.lemma === h) {
        p.id = `${p.id}-(${p.gender})`;
        // console.log(`Added (gender) to this id as it's a multiple: "${p.id}"`);
      }
    });
  });
};

exports.reorderProtoLObjs = (protoLObjs) => {
  let { pop, unpop } = mrUtils.sortProtoLObjsByPopulated(protoLObjs);
  return [...pop, ...unpop];
};

exports.splitAllStrings = (arr, separator = " ") => {
  let res = [];
  arr.forEach((s) => {
    res.push(...s.split(separator));
  });
  return res;
};

exports.sortProtoLObjsByPopulated = (arr) => {
  let pop = arr.filter((p) => p.constituentWords.length);
  let unpop = arr.filter((p) => !p.constituentWords.length);
  return { pop, unpop };
};

// let data = JSON.stringify(getHeadWords(nouns));
// fs.writeFile(path, data, (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("File written successfully\n");
//   }
// });
//
// function getHeadWords(raw) {
//   let headWords = raw
//     .filter((rawObj) => rawObj.senses.some((sense) => !sense.form_of))
//     .map((rawObj) => rawObj.word);

//   return Array.from(new Set(headWords));
// }
