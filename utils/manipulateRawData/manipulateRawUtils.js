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
