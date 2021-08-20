const fs = require("fs");
// const { path } = require("../resources/secrets.js");
// const { nouns } = require("../../../Wiktionary/POL/nouns.js");
// console.log(typeof nouns);
// console.log(nouns.length);

const { rejectedNounsPL } = require("./rejectedNounsPL.js");
const { goodNounsPL } = require("./goodNounsPL.js");
console.log(rejectedNounsPL.length);
console.log(goodNounsPL.length);

let filtered = rejectedNounsPL.filter((n) => !goodNounsPL.includes(n));

console.log(filtered.length);

let lore = JSON.stringify(filtered);
fs.writeFile("./banana.js", lore, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    // console.log("The written has the following contents:");
    // console.log(fs.readFileSync("books.txt", "utf8"));
  }
});
return;

function getHeadWords(raw) {
  let headWords = raw
    .filter((rawObj) => rawObj.senses.some((sense) => !sense.form_of))
    .map((rawObj) => rawObj.word);

  return Array.from(new Set(headWords));
}

function makeProtoLemmaObjects(raw) {
  let headWords = getHeadWords(raw);

  console.log(headWords);

  let plObjs = headWords.map((headWord) => {
    return { headWord, constituentWords: [] };
  });

  function splitAllStrings(arr, separator = " ") {
    let res = [];
    arr.forEach((s) => {
      res.push(...s.split(separator));
    });
    return res;
  }

  raw.forEach((rawObj) => {
    rawObj.senses.forEach((sense) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f) => {
        let plObj = plObjs.find((plObj) => plObj.headWord === f.word);

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

  return plObjs.filter((plObj) => plObj.constituentWords.length);
}

let plObjs = makeProtoLemmaObjects(nouns.slice(50));
// console.log(plObjs);

let data = JSON.stringify(getHeadWords(nouns));

fs.writeFile(path, data, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    // console.log("The written has the following contents:");
    // console.log(fs.readFileSync("books.txt", "utf8"));
  }
});
