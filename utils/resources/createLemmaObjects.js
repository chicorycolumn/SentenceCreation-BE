const { raw } = require("express");
const fs = require("fs");
// const { path } = require("../resources/secrets.js");
const { nouns } = require("../../../Wiktionary/POL/nouns.js");
const { goodNounsPL } = require("./goodNounsPL.js");
const uUtils = require("../universalUtils.js");

const mascKeys = ["m", "masculine", "masc", "male"];
const femKeys = ["f", "feminine", "fem", "female"];
const genderConversionRef = {
  "m-pr": "m1",
  "m-an": "m2",
  "m-in": "m3",

  "m-p": "virile",

  m: "nonvirile",
  p: "nonvirile",
  nv: "nonvirile",
  pl: "nonvirile",
  "m-in-p": "nonvirile",

  f: "f",
  n: "n",
};
const inflectionsRef = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "instrumental",
  "locative",
  "vocative",
];
const otherInflectionsRef = [
  "plural",
  "singular",
  "augmentative",
  "diminutive",
];
let moreThanOneHeadRawObj = [];

// let riks = checkRawInfKeys();
function checkRawInfKeys() {
  let koala = {
    pos: "noun",
    heads: [{ 1: "f", template_name: "pl-noun" }],
    inflection: [{ genp: "koali", template_name: "pl-decl-noun-f" }],
    sounds: [
      { ipa: "/k\u0254\u02c8a.la/" },
      { audio: "Pl-koala.ogg", text: "audio" },
    ],
    word: "koala",
    lang: "Polish",
    lang_code: "pl",
    senses: [
      {
        tags: ["feminine"],
        glosses: ["koala"],
        categories: ["Marsupials"],
        id: "koala-noun",
      },
    ],
  };

  let rawInfKeys = [];

  nouns.forEach((rawObj, rIndex) => {
    if (!goodNounsPL.includes(rawObj.word)) {
      return;
    }
    rawObj.senses.forEach((sense, sIndex) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f, fIndex) => {
        if (f.lemma) {
          throw `Error 2763`;
        }

        let traits = splitAllStrings(sense.glosses);
        traits = traits.filter(
          (t) => !["of"].includes(t) && !goodNounsPL.includes(t)
        );
        traits.forEach((tr) => rawInfKeys.push(tr));
      });
    });
  });

  rawInfKeys = rawInfKeys.filter(
    (rik) =>
      !inflectionsRef.includes(rik.toLowerCase()) &&
      !otherInflectionsRef.includes(rik.toLowerCase())
  );
  rawInfKeys = Array.from(new Set(rawInfKeys));
}

let { plObjs, unmatchedHeadWords } = makeProtoLemmaObjects(
  nouns,
  goodNounsPL,
  "POL"
);

// let a = plObjs.filter((p) => Object.keys(p.counterparts).length);
// let a = plObjs.filter((p) => Object.keys(p.related1).length);
// let aaa = plObjs.filter((p) => Object.keys(p.inflection).length);
let aaa = plObjs.filter((p) => p.id.includes("(")).map((p) => p.id);

console.log("");

function makeProtoLemmaObjects(raw, headWords, lang) {
  let plObjs = [];

  headWords.forEach((headWord) => {
    //
    //1. FIND corresponding raw data, and INITIALISE keys that will be added to resulting plObj.

    let matchingRawObjs = nouns.filter(
      (rawObj) =>
        rawObj.word === headWord &&
        rawObj.senses.some((sense) => !sense.form_of)
    );

    if (matchingRawObjs.length > 1) {
      console.log("Multiple raws --->", matchingRawObjs.length, headWord);
    }

    matchingRawObjs.forEach((raw) => {
      if (!raw.heads || raw.heads.length !== 1) {
        throw "Error 9384. Raw object has no 'heads' key.";
      }

      let tags1 = [];
      let tags2 = [];
      let trans1 = [];
      let otherShapes = {};
      let isPerson;
      let related1 = {};
      let counterparts = {};
      let inflection = {};

      if (raw.inflection) {
        raw.inflection.forEach((iObj) => {
          Object.keys(iObj).forEach((k) => {
            let v = iObj[k];
            if (k !== "template_name") {
              uUtils.addToArrayAtKey(inflection, k, v);
            }
          });
        });
      }

      //
      //2. Add GENDER.

      let gender =
        genderConversionRef[raw.heads[0]["g"]] ||
        genderConversionRef[raw.heads[0]["1"]];
      if (!gender) {
        throw `Error 5396 re raw obj gender for "${headWord}" "${raw.heads[0][1]}"`;
      } else if (gender === "nonvirile") {
        // console.log(
        //   `Setting "${headWord}" <${
        //     raw.sounds[1] && raw.sounds[1].audio
        //   }> as nonvirile. Hope that's okay!`
        // );
      } else if (gender === "virile") {
        // console.log(
        //   `>>>>>>>>>>>> Setting "${headWord}" <${
        //     raw.sounds[1] && raw.sounds[1].audio
        //   }> as virile. Hope that's okay!`
        // );
      }

      if (gender === "m1" || raw.heads.isPerson) {
        // console.log(`- - - - - - - - - - - - "${headWord}" is a person.`);
        isPerson = true;
      }

      //
      //3. Add other SHAPES, such as diminutive and augmentative. Also MGN counterparts.

      if (raw.forms) {
        raw.forms.forEach((f) => {
          f.tags.forEach((ftag) => {
            if (mascKeys.includes(ftag)) {
              uUtils.addToArrayAtKey(counterparts, "m", f.form);
            } else if (femKeys.includes(ftag)) {
              uUtils.addToArrayAtKey(counterparts, "f", f.form);
            } else {
              otherShapes[ftag] = f.form;
            }
          });
        });
      }

      mascKeys.forEach((mascKey) => {
        if (
          raw.heads[mascKey] &&
          !raw.heads[mascKey].toLowerCase().includes("wikipedia")
        ) {
          uUtils.addToArrayAtKey(counterparts, "m", raw.heads[mascKey]);
        }
      });

      femKeys.forEach((femKey) => {
        if (
          raw.heads[femKey] &&
          !raw.heads[femKey].toLowerCase().includes("wikipedia")
        ) {
          uUtils.addToArrayAtKey(counterparts, "f", raw.heads[femKey]);
        }
      });

      //
      //4. Add what will become TAGS and TRANSLATIONS. Will require sorting as inconsistent placement in raw data.

      raw.senses.forEach((sense) => {
        if (sense.tags) {
          tags1 = [...tags1, ...sense.tags];
        }
        if (sense.categories) {
          tags2 = [...tags2, ...sense.categories];
        }
        if (sense.glosses) {
          trans1 = [...trans1, ...sense.glosses];
        }
        if (sense.related) {
          sense.related.forEach((rel) => {
            let tags = rel.tags && rel.tags.length ? rel.tags : ["misc"];

            tags.forEach((tag) => {
              uUtils.addToArrayAtKey(related1, tag, rel.word);
            });
          });
        }
      });

      tags1 = tags1.filter(
        (t) =>
          !["person", "masculine", "feminine", "animate", "inanimate"].includes(
            t
          )
      );

      //
      //5. Add to res object.

      let resObj = {
        lemma: headWord,
        tags1,
        tags2,
        constituentWords: [],
        trans1,
        otherShapes,
        raw,
        gender,
        related1,
        counterparts,
        inflection,
      };

      if (isPerson) {
        resObj.isPerson = true;
      }

      plObjs.push(resObj);
    });
  });

  //
  //7. Go through raw data to find all INFLECTION objects of each plObj, and harvest from them.

  raw.forEach((rawObj, rIndex) => {
    rawObj.senses.forEach((sense, sIndex) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f, fIndex) => {
        if (f.lemma) {
          throw `Error 2763`;
        }

        let plObj = plObjs.find((plObj) => plObj.lemma === f.word);

        if (plObj) {
          let traits = splitAllStrings(sense.glosses);
          traits = traits.filter((t) => !["of", plObj.lemma].includes(t));
          traits = traits.join(" ");
          // console.log(
          //   111,
          //   `rIndex:${rIndex},sIndex:${sIndex},fIndex:${fIndex}`,
          //   plObj.lemma
          // );
          plObj.constituentWords.push({
            word: rawObj.word,
            traits,
          });
        }
      });
    });
  });

  //
  //8. Process the proto-inflection into properly structured inflections.
  //code here...

  function findInflections(wordValue, inflectionsString) {
    let res = {};

    inflectionsRef.forEach((inflectionKey) => {
      if (inflectionsString.toLowerCase().includes(inflectionKey)) {
        uUtils.addToArrayAtKey(res, inflectionKey, wordValue);
      }
    });

    return res;
  }

  //
  //10. Generate IDs.

  function reorderPlobjs(plObjs) {
    let { pop, unpop } = sortPlobjsByPopulated(plObjs);
    return [...pop, ...unpop];
  }

  plObjs = reorderPlobjs(plObjs);

  makeLemmaObjectIDs(plObjs, lang);

  //
  //9. Filter out unpopulated plObjs.

  let { pop, unpop } = sortPlobjsByPopulated(plObjs);

  if ("console") {
    console.log("* - * - * - * - * - *");
    console.log(` plObjs in total had length ${plObjs.length}`);
    console.log(`populated plObjs has length ${pop.length}`);
    console.log(`unpopulat plObjs has length ${unpop.length}`);
    let unmatchedHeadWords = headWords.filter((headWord) => {
      let plObjForHead = plObjs.find((plObj) => plObj.lemma === headWord);
      return (
        !plObjForHead.constituentWords || !plObjForHead.constituentWords.length
      );
    });
    let unmatchedHeadWordsInPop = headWords.filter((headWord) => {
      let plObjForHead = pop.find((plObj) => plObj.lemma === headWord);
      return (
        !plObjForHead.constituentWords || !plObjForHead.constituentWords.length
      );
    });
    console.log(`Headwords with no match at all ${unmatchedHeadWords.length}`);
    console.log(
      `Headwords with no match in pop ${unmatchedHeadWordsInPop.length}`
    );
    console.log("* - * - * - * - * - *");
  }

  //END. Add final plObj to array.

  return {
    plObjs: pop,
    unmatchedHeadWords,
  };
}

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

function makeLemmaObjectIDs(plObjs, lang, existingLemmaObjects) {
  function makeIds(plObj, counts, lang, wordtypeCode) {
    let idNum = uUtils.numToString(counts[wordtypeCode] + 1, 3);

    counts[wordtypeCode]++;

    return `${lang.toLowerCase()}-${wordtypeCode}-${idNum}-${plObj.lemma}`;
  }

  let counts = { nco: 0, npe: 0, ncp: 0, npp: 0 };

  Object.keys(counts).forEach((wordtypeCode) => {
    if (!existingLemmaObjects) {
      console.log(
        "No existing lemma objects given so couldn't take into account existing numbers already used when making lemma object IDs."
      );
      return;
    }

    let lObjs = existingLemmaObjects.filter(
      (l) => l.id.split("-")[1] === wordtypeCode
    );

    lObjs.sort(
      (a, b) => parseInt(b.id.split("-")[2]) - parseInt(a.id.split("-")[2])
    );

    let highestIdNumber = parseInt(lObjs[0].id.split("-")[2]);

    counts[wordtypeCode] = highestIdNumber;
  });

  plObjs.forEach((plObj) => {
    if (plObj.isPerson) {
      plObj.id = makeIds(plObj, counts, lang, "npe");
    } else {
      plObj.id = makeIds(plObj, counts, lang, "nco");
    }
  });

  let headWordsThatHaveMultiplePlobjs = [];
  let allHeadWords = plObjs.map((p) => p.lemma);
  let tempArr = [];
  allHeadWords.forEach((h) => {
    if (tempArr.includes(h) && !headWordsThatHaveMultiplePlobjs.includes(h)) {
      headWordsThatHaveMultiplePlobjs.push(h);
    }
    tempArr.push(h);
  });

  headWordsThatHaveMultiplePlobjs.forEach((h) => {
    console.log("#", h);

    plObjs.forEach((p) => {
      if (p.lemma === h) {
        p.id = `${p.id}-(${p.gender})`;
        console.log("#", p.id);
      }
    });
  });
}

function splitAllStrings(arr, separator = " ") {
  let res = [];
  arr.forEach((s) => {
    res.push(...s.split(separator));
  });
  return res;
}

function sortPlobjsByPopulated(arr) {
  let pop = arr.filter((p) => p.constituentWords.length);
  let unpop = arr.filter((p) => !p.constituentWords.length);
  return { pop, unpop };
}
