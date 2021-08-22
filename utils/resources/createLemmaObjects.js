const fs = require("fs");
// const { path } = require("../resources/secrets.js");
const { nouns } = require("../../../Wiktionary/POL/nouns.js");
const { goodNounsPL } = require("./goodNounsPL.js");

// let lore = JSON.stringify(filtered);
// fs.writeFile("./banana.js", lore, (err) => {
//   if (err) console.log(err);
//   else {
//     console.log("File written successfully\n");
//   }
// });
// return;

let { plObjs, unmatchedHeadWords } = makeProtoLemmaObjects(nouns, goodNounsPL);

console.log("");
let tempCount = 0;

function makeProtoLemmaObjects(raw, headWords) {
  // let plObjsFilteredBySomethingToConsoleLog = headWords.filter((headWord) => {
  //   let raw = nouns.find(
  //     (rawObj) =>
  //       rawObj.word === headWord &&
  //       rawObj.senses.some((sense) => !sense.form_of)
  //   );

  //   return !raw.heads;
  // });

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

  let plObjs = headWords.map((headWord) => {
    let raw = nouns.find(
      (rawObj) =>
        rawObj.word === headWord &&
        rawObj.senses.some((sense) => !sense.form_of)
    );

    if (!raw.heads || raw.heads.length !== 1) {
      throw "Error 9384 re raw obj heads.";
    }

    let tags1 = [];
    let tags2 = [];
    let trans1 = [];
    let otherShapes = {};

    let gender1 =
      genderConversionRef[raw.heads[0]["g"]] ||
      genderConversionRef[raw.heads[0]["1"]];

    if (!gender1) {
      console.log(
        `Error 5396 re raw obj gender for "${headWord}" "${raw.heads[0][1]}"`
      );
      tempCount++;
      if (tempCount > 1000) {
        throw "Error 2039";
      }
      return {};
    }

    if (gender1 === "nonvirile") {
      console.log(
        `Setting "${headWord}" <${
          raw.sounds[1] && raw.sounds[1].audio
        }> as nonvirile. Hope that's okay!`
      );
    }
    if (gender1 === "virile") {
      console.log(
        `>>>>>>>>>>>> Setting "${headWord}" <${
          raw.sounds[1] && raw.sounds[1].audio
        }> as virile. Hope that's okay!`
      );
    }

    if (raw.forms) {
      raw.forms.forEach((f) => {
        f.tags.forEach((ftag) => {
          otherShapes[ftag] = f.form;
        });
      });
    }

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
    });

    let res = {
      lemma: headWord,
      tags1,
      tags2,
      constituentWords: [],
      trans1,
      otherShapes,
      raw,
      gender1,
    };

    return res;
  });

  console.log("1. plObjs have been initialised.");

  raw.forEach((rawObj) => {
    rawObj.senses.forEach((sense) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f) => {
        let plObj = plObjs.find((plObj) => plObj.headWord === f.lemma);

        if (plObj) {
          let traits = splitAllStrings(sense.glosses);
          traits = traits.filter((t) => !["of", plObj.headWord].includes(t));
          traits = traits.join(" ");
          plObj.constituentWords.push({
            word: rawObj.word,
            traits,
          });
        }
      });
    });
  });

  console.log("2. plObjs have been filled out with proto-inflections.");

  let plObjsPopulated = plObjs.filter((plObj) => {
    return plObj.constituentWords.length;
  });
  let unmatchedHeadWords = headWords.filter(
    (headWord) =>
      !plObjs.find((plObj) => plObj.headWord === headWord).constituentWords
        .length
  );

  return {
    plObjs: plObjsPopulated,
    unmatchedHeadWords,
  };
}

let data = JSON.stringify(getHeadWords(nouns));

fs.writeFile(path, data, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    // console.log("The written has the following contents:");
    // console.log(fs.readFileSync("books.txt", "utf8"));
  }
});

function getHeadWords(raw) {
  let headWords = raw
    .filter((rawObj) => rawObj.senses.some((sense) => !sense.form_of))
    .map((rawObj) => rawObj.word);

  return Array.from(new Set(headWords));
}

function splitAllStrings(arr, separator = " ") {
  let res = [];
  arr.forEach((s) => {
    res.push(...s.split(separator));
  });
  return res;
}
