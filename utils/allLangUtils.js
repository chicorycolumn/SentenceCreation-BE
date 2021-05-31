const refObj = require("../utils/reference/referenceObjects.js");
const refFxn = require("../utils/reference/referenceFunctions.js");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const allLangUtils = require("../utils/allLangUtils.js");

exports.translateAnnoTraitValyye = (
  annoTraitKeyy,
  structureChunk,
  languagesObj
) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  let annoTraitValyye = structureChunk.annotations[annoTraitKeyy];

  if (annoTraitKeyy === "gender") {
    if (structureChunk.number) {
      if (structureChunk.number.length > 1) {
        consol.throw("cshb #ERR ALL:translateAnnoTraitValyye.");
      }

      const pluralVirilityAndSingularConversionRef =
        refObj.pluralVirilityAndSingularConversionRef[questionLanguage];

      if (structureChunk.number[0] === "plural") {
        if (
          !pluralVirilityAndSingularConversionRef["plural"][annoTraitValyye]
        ) {
          consol.throw(
            "mkow #ERR ALL:translateAnnoTraitValyye. Could not convert virility of annoTraitValyye: " +
              annoTraitValyye
          );
        }

        annoTraitValyye =
          pluralVirilityAndSingularConversionRef["plural"][annoTraitValyye];
      }
    }

    let annotationToPlainspeakRef = refObj.annotationToPlainspeakRef;

    let adjustedAnnotation =
      annotationToPlainspeakRef["gender"][annoTraitValyye];

    return typeof adjustedAnnotation === "string"
      ? adjustedAnnotation
      : uUtils.selectRandom(adjustedAnnotation);
  } else {
    return annoTraitValyye;
  }
};

exports.adjustVirilityOfStructureChunk = (
  currentLanguage,
  structureChunk,
  consoleLogLaabel
) => {
  consol.log("gxow ALL adjustVirilityOfStructureChunk", consoleLogLaabel);

  if (gpUtils.getWorrdtypeStCh(structureChunk) === "noun") {
    // Because m -> plural -> virile and then trying to select Ojciec, which isn't virile, it's m, so will ERR later.
    return;
  }

  consol.log(
    "[1;35m " +
      "svpi ALL adjustVirilityOfStructureChunk " +
      structureChunk.chunkId +
      "[0m"
  );

  consol.log(
    "[1;35m " +
      "svpi ALL adjustVirilityOfStructureChunk structureChunk start as being:" +
      "[0m",
    structureChunk
  );

  let { gender, number } = structureChunk;

  if (!number || !number.includes("plural")) {
    consol.log(
      "clsq ALL adjustVirilityOfStructureChunk Aborting because Number"
    );
    return;
  }

  if (!gender || !gender.length) {
    consol.log(
      "vlca ALL adjustVirilityOfStructureChunk Aborting because Gender"
    );
    return;
  }

  if (/all.*/.test(gender)) {
    if (gender.length !== 1) {
      consol.throw(
        `#ERR vcvl ALL:adjustVirilityOfStructureChunk. Gender traitKeyys arr contained a metaGender traitKeyy, that's fine, but it contained other traitKeyys too? That's too much. "${gender.toString()}"`
      );
    }

    gender = refObj.metaTraitValyyes[currentLanguage]["gender"][gender];
  }

  let pluralVirilityAndSingularConversionRef =
    refObj.pluralVirilityAndSingularConversionRef[currentLanguage];

  let newGenderTraitKeyys = [];

  if (number.includes("singular")) {
    gender.forEach((genderTraitKeyy) => {
      newGenderTraitKeyys.push(genderTraitKeyy);
    });
  }

  if (number.includes("plural")) {
    gender.forEach((genderTraitKeyy) => {
      consol.log("ksdx ALL adjustVirilityOfStructureChunk", {
        genderTraitKeyy,
      });

      newGenderTraitKeyys = [
        ...newGenderTraitKeyys,
        ...pluralVirilityAndSingularConversionRef["plural"][genderTraitKeyy],
      ];
      // if (shouldRetainOriginals) {
      //   newGenderTraitKeyys.push(genderTraitKeyy);
      // }
    });
  }

  let newGenderTraitKeyysTrimmed = Array.from(new Set(newGenderTraitKeyys));

  structureChunk.gender = newGenderTraitKeyysTrimmed;

  consol.log(
    "[1;35m " +
      "hutf ALL adjustVirilityOfStructureChunk structureChunk ends up being:" +
      "[0m",
    structureChunk
  );
};

exports.preprocessStructureChunks = (sentenceStructure, currentLanguage) => {
  let stChTraits = refFxn.getstructureChunkTraits(currentLanguage);

  let shouldConsoleLog = false;
  if (shouldConsoleLog) {
    consol.log(
      "[1;35m " + "hqij ALL preprocessStructureChunks-------------------" + "[0m"
    );
  }

  let metaTraitValyyesRef = refObj.metaTraitValyyes[currentLanguage];

  sentenceStructure.forEach((structureChunk) => {
    if (gpUtils.getWorrdtypeStCh(structureChunk) === "fixed") {
      return;
    }

    if (
      stChTraits["number"].compatibleWordtypes.includes(
        gpUtils.getWorrdtypeStCh(structureChunk)
      ) &&
      (!structureChunk.number || !structureChunk.number.length)
    ) {
      structureChunk.number = uUtils.copyWithoutReference(
        stChTraits["number"].possibleTraitValyyes
      );
    }

    if (shouldConsoleLog) {
      consol.log(
        "zesx ALL preprocessStructureChunks At first the structureChunk is",
        structureChunk
      );
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "adjective") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["simple"];
      }
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["pronoun"];
      }
    }

    if (
      gpUtils.getWorrdtypeStCh(structureChunk) === "noun" ||
      gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun"
    ) {
      if (!structureChunk.gcase || !structureChunk.gcase.length) {
        structureChunk.gcase = ["nom"];
      }
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "pronoun") {
      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWorrdtypeAgree(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        }
      }

      if (!structureChunk.gender || !structureChunk.gender.length) {
        structureChunk.gender = [];

        if (
          structureChunk.number &&
          structureChunk.number.includes("singular")
        ) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValyyesRef["gender"]["allSingularGenders"],
          ];
        }
        if (structureChunk.number && structureChunk.number.includes("plural")) {
          structureChunk.gender = [
            ...structureChunk.gender,
            ...metaTraitValyyesRef["gender"]["allPluralGenders"],
          ];
        }
      }
    }

    if (gpUtils.getWorrdtypeStCh(structureChunk) === "verb") {
      if (!structureChunk.form || !structureChunk.form.length) {
        structureChunk.form = ["verbal"];
      }

      if (structureChunk.form && structureChunk.form.includes("verbal")) {
        if (
          !structureChunk.tenseDescription ||
          !structureChunk.tenseDescription.length
        ) {
          if (
            refFxn.skipThisStepInPreprocessStructureChunks(
              currentLanguage,
              "tenseDescription",
              structureChunk
            )
          ) {
            return;
          }

          structureChunk.tenseDescription =
            refObj.structureChunkTraits[
              currentLanguage
            ].tenseDescription.possibleTraitValyyes.slice(0);
        }
      }

      if (structureChunk.agreeWith) {
        if (
          gpUtils.getWorrdtypeAgree(structureChunk) === "noun" &&
          (!structureChunk.person || !structureChunk.person.length)
        ) {
          structureChunk.person = ["3per"];
        } else if (gpUtils.getWorrdtypeAgree(structureChunk) === "pronoun") {
          let headChunk = (structureChunk.person = sentenceStructure.find(
            (potentialHeadChunk) => {
              return potentialHeadChunk.chunkId === structureChunk.agreeWith;
            }
          ));

          if (headChunk.person && headChunk.person.length) {
            structureChunk.person = headChunk.person.slice(0);
          }
        }
      }
    }

    allLangUtils.adjustVirilityOfStructureChunk(
      currentLanguage,
      structureChunk,
      "structureChunk from ALL:preprocessStructureChunks"
    );

    if (shouldConsoleLog) {
      consol.log(
        "gsgl ALL preprocessStructureChunks Finally the structureChunk is",
        structureChunk
      );
    }
  });

  if (shouldConsoleLog) {
    consol.log("[1;35m " + "/ALL preprocessStructureChunks" + "[0m");
  }
};

exports.convertmetaTraitValyyes = (
  sourceObjectArray,
  currentLanguage,
  objType
) => {
  if (!["stCh", "lObj"].includes(objType)) {
    throw (
      "allLangUtils.convertmetaTraitValyyes was given wrong objType: " + objType
    );
  }

  let metaTraitValyyesRef = refObj.metaTraitValyyes[currentLanguage];

  sourceObjectArray.forEach((sourceObject) => {
    //sourceObject eg= a lObj or a stCh
    Object.keys(metaTraitValyyesRef).forEach((traitKeyy) => {
      //traitKeyy eg= "gender"

      let metaTraitValyyeRef = metaTraitValyyesRef[traitKeyy];

      // metaTraitValyyeRef eg= {
      //   allPersonalGenders: ["m", "f", "virile", "nonvirile"],
      //   allSingularGenders: ["m", "f", "n"],
      //   allPersonalSingularGenders: ["m", "f"],
      //   allPluralGenders: ["virile", "nonvirile"],
      //   allGenders: ["m", "n", "f", "virile", "nonvirile"],
      // }

      if (objType === "lObj") {
        Object.keys(metaTraitValyyeRef).forEach((metaTraitValyye) => {
          let regularTraitValyyes = metaTraitValyyeRef[metaTraitValyye];

          uUtils.findKeysInObjectAndExecuteCallback(
            sourceObject,
            metaTraitValyye,
            (sourceObject) => {
              uUtils.copyVaalueOfKey(
                sourceObject,
                metaTraitValyye,
                regularTraitValyyes,
                true
              );
            }
          );
        });
      } else if (objType === "stCh") {
        if (sourceObject[traitKeyy]) {
          let currentTraitValyyes = sourceObject[traitKeyy];
          let newTraitValyyes = [];

          currentTraitValyyes.forEach((traitValyye) => {
            if (metaTraitValyyeRef[traitValyye]) {
              newTraitValyyes = [
                ...newTraitValyyes,
                ...metaTraitValyyeRef[traitValyye],
              ];
            } else {
              newTraitValyyes.push(traitValyye);
            }
          });

          sourceObject[traitKeyy] = newTraitValyyes;
          consol.log("oiiw ALL convertmetaTraitValyyes", objType, {
            newTraitValyyes,
          });
        }
      }
    });
  });
};

exports.decantMGNsBeforeFetchingOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  if ("check") {
    if (
      !selectedLemmaObject.gender ||
      !gpUtils.traitValyyeIsMeta(selectedLemmaObject.gender)
    ) {
      return;
    }
    if (
      !refFxn
        .validTraitKeyysPerStructureChunkWordtype(
          currentLanguage,
          structureChunk
        )
        .includes("gender")
    ) {
      consol.throw(
        `wpoh lObj has metagender, but gender is not an appropriate traitKeyy for this stCh wordtype?`
      );
    }
  }

  consol.log(
    `jowc correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh.gender STARTS as:`,
    structureChunk.gender
  );

  structureChunk.gender = [uUtils.selectRandom(structureChunk.gender)];

  consol.log(
    `jowd correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh.gender ENDS as:`,
    structureChunk.gender
  );
};

exports.correctMGNsBeforeFetchingOutputArray = (
  structureChunk,
  selectedLemmaObject,
  currentLanguage
) => {
  //0 Only run this for MGNs, ie stChs where matching lObj is metagender.
  if ("check") {
    if (
      !selectedLemmaObject.gender ||
      !gpUtils.traitValyyeIsMeta(selectedLemmaObject.gender)
    ) {
      consol.log("neem");
      return;
    }
    if (
      !refFxn
        .validTraitKeyysPerStructureChunkWordtype(
          currentLanguage,
          structureChunk
        )
        .includes("gender")
    ) {
      consol.throw(
        `wpoh lObj has metagender, but gender is not an appropriate traitKeyy for this stCh wordtype?`
      );
    }

    consol.log(
      `wpoi correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh STARTS as:`,
      structureChunk
    );
  }

  //1 Get the lObj metagender traitKeyy.
  let lObjMetagender = selectedLemmaObject.gender;

  if (!structureChunk.number || !structureChunk.number.length) {
    consol.throw(
      "wpoj Cannot correctMetagenderByNumberInMGNs with no number traitKeyy."
    );
  }

  if (structureChunk.number.length > 1) {
    structureChunk.number = [uUtils.selectRandom(structureChunk.number)];
  }

  consol.log(
    `wpok correctMetagenderByNumberInMGNs. "${structureChunk.chunkId}" has gender "${structureChunk.gender}", while selectedLemmaObject gender is "${lObjMetagender}".`
  );

  let metagenderCorrectedByNumberRef = refObj.metaCorrectionRef[
    currentLanguage
  ]["gender"].find(
    (obj) =>
      Object.keys(obj.condition).includes("number") &&
      obj.condition.number === structureChunk.number[0]
  ).changeRef;

  consol.log(
    `wpol correctMetagenderByNumberInMGNs. "${structureChunk.number[0]}" changeRef is:`,
    metagenderCorrectedByNumberRef
  );

  //2 Adjust lObjMetagender by number from stCh.
  // eg if stCh number singular, lObjMetagender goes from "allPersonalGenders" to "allPersonalSingularGenders".
  lObjMetagender = metagenderCorrectedByNumberRef[lObjMetagender];

  //3 Now convert that. let convertedLObjMetagenderArr = ["m1", "f"]
  let convertedLObjMetagenderArr =
    refObj.metaTraitValyyes[currentLanguage]["gender"][lObjMetagender];

  //4 If stCh has gender, then filter down so only the ones present in convertedLObjMetagenderArr remain.
  //  and if it doesn't have gender, set it as that.
  if (structureChunk.gender && structureChunk.gender.length) {
    structureChunk.gender = structureChunk.gender.filter((genderTraitValyye) =>
      convertedLObjMetagenderArr.includes(genderTraitValyye)
    );
  } else {
    structureChunk.gender = convertedLObjMetagenderArr.slice(0);
  }

  consol.log(
    `wpon correctMGNsBeforeFetchingOutputArray. ${structureChunk.chunkId} ${currentLanguage}. stCh ENDS as:`,
    structureChunk
  );
};
