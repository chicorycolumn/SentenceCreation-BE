const mrUtils = require("./manipulateRawUtils.js");
const uUtils = require("../universalUtils.js");
const ref = require("./reference.js");

exports.findInflections = (protoLObj) => {
  let { constituentWords } = protoLObj;

  let res = {};

  constituentWords.forEach((cw) => {
    let wordValue = cw.word;
    let inflectionsString = cw.traits;

    let matchFound = false;

    ref.otherInflectionsRef.forEach((higherInflectionKey) => {
      //eg "singular"

      if (inflectionsString.toLowerCase().includes(higherInflectionKey)) {
        matchFound = true;
        let matchFoundSecondLevel = false;
        ref.inflectionsRef.forEach((inflectionKey) => {
          //eg "nominative"
          if (inflectionsString.toLowerCase().includes(inflectionKey)) {
            matchFoundSecondLevel = true;
            uUtils.addToArrayAtKey(
              res,
              [higherInflectionKey, inflectionKey],
              wordValue
            );
          }
        });

        if (!matchFoundSecondLevel) {
          uUtils.addToArrayAtKey(res, higherInflectionKey, wordValue);
        }
      }
    });

    if (!matchFound) {
      let higherInflectionKey = "unsorted";
      ref.inflectionsRef.forEach((inflectionKey) => {
        //eg "nominative"
        if (inflectionsString.toLowerCase().includes(inflectionKey)) {
          uUtils.addToArrayAtKey(
            res,
            [higherInflectionKey, inflectionKey],
            wordValue
          );
        }
      });
    }
  });

  if (!res["singular"]) {
    res["singular"] = {};
  }

  res["singular"]["nominative"] = [protoLObj.lemma];

  return res;
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
        console.log(`Added (gender) to this id as it's a multiple: "${p.id}"`);
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
