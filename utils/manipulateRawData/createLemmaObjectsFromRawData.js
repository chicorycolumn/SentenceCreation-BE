const { path } = require("./secrets.js");
const { nouns } = require("../../../Wiktionary/POL/nouns.js");
const { goodNouns } = require("./rawWords/POL/nouns.js");
const uUtils = require("../universalUtils.js");
const mrUtils = require("./manipulateRawUtils.js");
const ref = require("./reference.js");
const temp = require("./tempCopyOutput.js");
const consol = require("../zerothOrder/consoleLoggingUtils.js");

// temp.pp.forEach((p) => {
//   p.constituentWords.forEach((cw) => {
//     console.log(cw.traits);
//   });
// });
// let { pp } = temp;
// pp.forEach((p) => {
//   mrUtils.formulateInflectionsFromRaw(p);
// });

console.log("");

let { protoLObjs, unmatchedHeadWords } = makeProtoLemmaObjects(
  nouns,
  goodNouns,
  "POL"
);

// let aaa = protoLObjs.filter((p) => p.id.includes("(")).map((p) => p.id);

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

// consol.log(
//   "[1;30m " +
//     protoLObjs.filter((p) => {
//       return Object.keys(ref.shorthandInflectionsRef2).every(
//         (doubleInflectionKey) => {
//           let number = ref.shorthandInflectionsRef2[doubleInflectionKey][0];
//           let gender = ref.shorthandInflectionsRef2[doubleInflectionKey][1];
//           return p.inflections[number] && p.inflections[number][gender];
//         }
//       );
//     }).length +
//     "[0m"
// );

console.log("");

function makeProtoLemmaObjects(raw, headWords, lang) {
  /**
   * grammarTags gets dropped.
   *      It's stuff like [diminutive, slang, plural-only, neuter]
   *
   * categoryTags is patchy but useful.
   *      eg [architecture] for lemma "łuk"
   *      eg [computing]    for lemma "okno"
   *      eg [berries]      for lemma "truskawka"
   *      eg [anatomy]      for lemma "pęcherz"
   *      eg [male family]  for lemma "syn"
   *
   * relatedWords is droppable but kept.
   *      Sometimes contains other word forms, (noun adj verb) of this word.
   *
   * counterparts only present on ~10% of words, but is very useful.
   *      eg "student" has {f: ["studentka"]}
   */

  let protoLObjs = [];

  headWords.forEach((headWord) => {
    //
    //A1. FIND corresponding raw data, and INITIALISE keys that will be added to resulting protoLObj.
    // console.log("## Stage A1");

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

      let categoryTags = [];
      let trans1 = [];
      let otherShapes = {};
      let isPerson;
      let relatedWords = {};
      let counterparts = {};
      let extraInflectionData = {};
      // let grammarTags = [];

      if (raw.inflection) {
        raw.inflection.forEach((iObj) => {
          Object.keys(iObj).forEach((k) => {
            let v = iObj[k];
            if (k !== "template_name") {
              uUtils.addToArrayAtKey(extraInflectionData, k, v);
            }
          });
        });
      }

      //
      //A2. Add GENDER.
      // console.log("## Stage A2");

      let gender =
        ref.genderConversionRef[raw.heads[0]["g"]] ||
        ref.genderConversionRef[raw.heads[0]["1"]];
      if (!gender) {
        throw `Error 5396 re raw obj gender for "${headWord}" "${raw.heads[0][1]}"`;
      } else if (gender === "nonvirile") {
        // console.log(`Setting "${headWord}" <${raw.sounds[1] && raw.sounds[1].audio}> as nonvirile. Hope that's okay!`);
      } else if (gender === "virile") {
        // console.log(`>>>>>>>>>>>> Setting "${headWord}" <${raw.sounds[1] && raw.sounds[1].audio}> as virile. Hope that's okay!`);
      }

      if (gender === "m1" || raw.heads.isPerson) {
        // console.log(`- - - - - - - - - - - - "${headWord}" is a person.`);
        isPerson = true;
      }

      //
      //A3. Add MGN counterparts, and other SHAPES ie diminutive and augmentative.
      // console.log("## Stage A3");

      if (raw.forms) {
        raw.forms.forEach((formObj) => {
          formObj.tags.forEach((formTag) => {
            if (ref.mascKeys.includes(formTag)) {
              uUtils.addToArrayAtKey(counterparts, "m", formObj.form);
            } else if (ref.femKeys.includes(formTag)) {
              uUtils.addToArrayAtKey(counterparts, "f", formObj.form);
            } else {
              otherShapes[formTag] = formObj.form;
            }
          });
        });
      }

      //Only seldom are counterparts yielded from this, and in those cases was covered by raw.forms anyway.
      //
      // [
      //   { type: "m", genKeys: ref.mascKeys },
      //   { type: "f", genKeys: ref.femKeys },
      // ].forEach((genderHeadRefObj) => {
      //   let { genKeys, type } = genderHeadRefObj;
      //   genKeys.forEach((genKey) => {
      //     let counterpartsSubArr = raw.heads[genKey]
      //       ? raw.heads[genKey].filter(
      //           (counterpart) =>
      //             !counterpart.toLowerCase().includes("wikipedia")
      //         )
      //       : [];
      //     if (counterpartsSubArr.length) {
      //       uUtils.addToArrayAtKey(counterparts, type, counterpartsSubArr);
      //     }
      //   });
      // });

      //
      //A4. Add what will become TAGS and TRANSLATIONS. Will require sorting as inconsistent placement in raw data.
      // console.log("## Stage A4");

      raw.senses.forEach((sense) => {
        // if (sense.tags) {
        //   grammarTags = [
        //     ...grammarTags,
        //     ...sense.tags.filter(
        //       (t) =>
        //         ![
        //           "masculine",
        //           "feminine",
        //           "animate",
        //           "inanimate",
        //           "neuter",
        //         ].includes(t)
        //     ),
        //   ];
        // }
        if (sense.categories) {
          categoryTags = [...categoryTags, ...sense.categories];
        }
        if (sense.glosses) {
          trans1 = [...trans1, ...sense.glosses];
        }
        if (sense.related) {
          sense.related.forEach((rel) => {
            let tags = rel.tags && rel.tags.length ? rel.tags : ["misc"];

            tags.forEach((tag) => {
              uUtils.addToArrayAtKey(relatedWords, tag, rel.word);
            });
          });
        }
      });

      //
      //A5. Add to res object.
      // console.log("## Stage A5");

      categoryTags = Array.from(
        new Set(categoryTags.map((t) => t.toLowerCase()))
      );

      let resObj = {
        lemma: headWord,
        tags: categoryTags,
        constituentWords: [],
        trans1,
        gender,
        extraInflectionData,
        otherShapes,
        // raw,
        // grammarTags,
      };

      if (isPerson) {
        resObj.isPerson = true;
      }

      let xtra = {};
      if (Object.keys(relatedWords).length) {
        xtra.relatedWords = relatedWords;
      }
      if (Object.keys(counterparts).length) {
        xtra.counterparts = counterparts;
      }
      if (Object.keys(xtra).length) {
        resObj.xtra = xtra;
      }

      protoLObjs.push(resObj);
    });
  });

  //
  //B1. Go through raw data to find all INFLECTION objects of each protoLObj, and harvest from them.
  console.log("## Stage B1");

  raw.forEach((rawObj, rIndex) => {
    rawObj.senses.forEach((sense, sIndex) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f, fIndex) => {
        if (f.lemma) {
          throw `Error 2763`;
        }

        let protoLObj = protoLObjs.find(
          (protoLObj) => protoLObj.lemma === f.word
        );

        if (protoLObj) {
          let traits = mrUtils.splitAllStrings(sense.glosses);
          traits = traits.filter((t) => !["of", protoLObj.lemma].includes(t));
          traits = traits.join(" ");
          // console.log(111,`rIndex:${rIndex},sIndex:${sIndex},fIndex:${fIndex}`,protoLObj.lemma);
          protoLObj.constituentWords.push({
            word: rawObj.word,
            traits,
          });
        }
      });
    });
  });

  //
  //B2. Generate IDs.
  console.log("## Stage B2");

  protoLObjs = mrUtils.reorderProtoLObjs(protoLObjs);

  mrUtils.makeLemmaObjectIDs(protoLObjs, lang);

  //
  //B3. Filter out unpopulated protoLObjs.
  console.log("## Stage B3");

  let { pop, unpop } = mrUtils.sortProtoLObjsByPopulated(protoLObjs);

  let unmatchedHeadWords = headWords.filter((headWord) => {
    let protoLObjForHead = protoLObjs.find(
      (protoLObj) => protoLObj.lemma === headWord
    );
    return (
      !protoLObjForHead.constituentWords ||
      !protoLObjForHead.constituentWords.length
    );
  });
  let unmatchedHeadWordsInPop = headWords.filter((headWord) => {
    let protoLObjForHead = pop.find(
      (protoLObj) => protoLObj.lemma === headWord
    );
    return (
      !protoLObjForHead ||
      !protoLObjForHead.constituentWords ||
      !protoLObjForHead.constituentWords.length
    );
  });

  console.log(`[${protoLObjs.length}] protoLObjs.`);
  console.log(`[${pop.length}] were populated (have inflection data).`);
  console.log(`[${unpop.length}] were unpopulated.`);
  console.log(`[${unmatchedHeadWords.length}] headwords no match at all`);
  console.log(`[${unmatchedHeadWordsInPop.length}] headwords no match in pop`);

  //
  //B4. Process the proto-inflection into properly structured inflections.
  console.log("## Stage B4");

  pop.forEach((protoLObj) => {
    mrUtils.formulateInflectionsFromRaw(protoLObj);
  });

  //
  //B5. Process the proto-translations.
  console.log("## Stage B5");

  pop.forEach((protoLObj) => {
    protoLObj.translations = { ENG: protoLObj.trans1 || "requiresAttention" };
    delete protoLObj.trans1;
  });

  //
  //B9. Add final protoLObj to array.
  console.log("## Stage B9");

  return {
    protoLObjs: pop,
    unmatchedHeadWords,
  };
}
