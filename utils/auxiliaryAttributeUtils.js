const gpUtils = require("./generalPurposeUtils.js");
const scUtils = require("./sentenceCreatingUtils.js");
const otUtils = require("../utils/objectTraversingUtils.js");
const refObj = require("./referenceObjects.js");
const { head } = require("../app.js");

exports.sortAnswerAndQuestionStructureChunks = (
  questionSentenceStructure,
  answerSentenceStructure
) => {
  let responseObj = {
    answerHeadChunks: null,
    answerDependentChunks: null,
    answerOtherChunks: null,
    questionHeadChunks: null,
    questionDependentChunks: null,
    questionOtherChunks: null,
  };

  if (true) {
    let {
      headChunks,
      dependentChunks,
      otherChunks,
    } = scUtils.sortStructureChunks(answerSentenceStructure);

    responseObj.answerHeadChunks = headChunks;
    responseObj.answerDependentChunks = dependentChunks;
    responseObj.answerOtherChunks = otherChunks;
  }

  if (true) {
    let {
      headChunks,
      dependentChunks,
      otherChunks,
    } = scUtils.sortStructureChunks(questionSentenceStructure);

    responseObj.questionHeadChunks = headChunks;
    responseObj.questionDependentChunks = dependentChunks;
    responseObj.questionOtherChunks = otherChunks;
  }

  return responseObj;
};

exports.specifyQuestionChunkAndChangeAnswerChunk = (
  chunksObj,
  actionKey,
  actionValueArr
) => {
  let {
    answerHeadChunk,
    answerChunk,
    questionHeadChunk,
    questionChunk,
  } = chunksObj;

  if (answerHeadChunk) {
    console.log("Point A");
    answerHeadChunk[actionKey] = actionValueArr;
  } else {
    console.log("Point B");
    answerChunk[actionKey] = actionValueArr;
  }

  //...and note Specifier in Q headCh if exists, else Q depCh.

  if (questionHeadChunk) {
    console.log("Point C");
    exports.addAnnotation(questionHeadChunk, actionKey, actionValueArr);
  } else {
    if (!questionChunk) {
      throw (
        "There was no corresponding questionChunk to add these Specifiers to: " +
        actionKey +
        " " +
        actionValueArr[0]
      );
    }
    console.log("Point D");
    exports.addAnnotation(questionChunk, actionKey, actionValueArr);
  }
};

exports.addSpecifiers = (
  answerSentenceFormula,
  questionOutputArr,
  languagesObj
) => {
  //STEP ZERO: Getting materials

  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("----addSpecifiers------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");

  let answerSentenceStructure = answerSentenceFormula.sentenceStructure;
  let questionSentenceStructure = questionOutputArr.map(
    (outputUnit) => outputUnit.structureChunk
  );

  let { answerLanguage, questionLanguage } = languagesObj;
  const answerLangUtils = require(`../source/${answerLanguage}/langUtils.js`);
  const questionLangUtils = require(`../source/${questionLanguage}/langUtils.js`);

  let {
    answerHeadChunks,
    answerDependentChunks,
    answerOtherChunks,
    questionHeadChunks,
    questionDependentChunks,
    questionOtherChunks,
  } = exports.sortAnswerAndQuestionStructureChunks(
    questionSentenceStructure,
    answerSentenceStructure
  );

  function getMaterialsToAddSpecifiers(
    answerChunk,
    answerSentenceStructure,
    questionSentenceStructure
  ) {
    console.log("uu", { answerChunk });

    let answerHeadChunk = answerSentenceStructure.find(
      (chunk) => chunk.chunkId === answerChunk.agreeWith
    );

    let questionChunk = questionSentenceStructure.find(
      (chunk) => chunk.chunkId === answerChunk.chunkId
    );

    let questionHeadChunk = questionSentenceStructure.find(
      (chunk) => chunk.chunkId === questionChunk.agreeWith
    );

    let questionLemmaObject;
    let questionHeadLemmaObject;

    if (questionHeadChunk) {
      let outputUnit = questionOutputArr.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId === questionHeadChunk.chunkId
      );
      if (outputUnit) {
        questionHeadLemmaObject = outputUnit.selectedLemmaObject;
      }
    }

    if (questionChunk) {
      let outputUnit = questionOutputArr.find(
        (outputUnit) =>
          outputUnit.structureChunk.chunkId === questionChunk.chunkId
      );
      if (outputUnit) {
        questionLemmaObject = outputUnit.selectedLemmaObject;
      }
    }

    let res = {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    };

    console.log("vv", res);

    return res;
  }

  function addRequiredSpecifiersToAnswerChunkOrHeadChunk(
    materials,
    answerLanguage
  ) {
    let {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    } = materials;

    let requestedSpecifierInstructionsArr =
      refObj.requestedSpecifiersNew[answerLanguage][answerChunk.wordtype];

    if (!requestedSpecifierInstructionsArr) {
      console.log("RETURN! No requestedSpecifierInstructionsArr.");
      return;
    }

    requestedSpecifierInstructionsArr.forEach((reqSpecInstr) => {
      console.log("Looking at reqSpecInstr: ", reqSpecInstr);
      if (
        //If EACH condition of this reqSpecInstr is fulfilled...

        Object.keys(reqSpecInstr.condition).every((reqFeatureKey) => {
          let reqFeatureValue = reqSpecInstr.condition[reqFeatureKey];
          return (
            //by the A depCh or its headCh...

            gpUtils.doesKeyContainValueOnChunk(
              answerChunk,
              reqFeatureKey,
              reqFeatureValue
            ) ||
            gpUtils.doesKeyContainValueOnChunk(
              answerHeadChunk,
              reqFeatureKey,
              reqFeatureValue
            )
          );
        })
      ) {
        console.log("Pass 1");
        //then for each action key in the reqSpecInstr...

        Object.keys(reqSpecInstr.action).forEach((actionKey) => {
          //   ( Btw, if actionKey is gender, and the A stCh we're looking at is PERSON,
          //     then abort. Gender does not need to be selected randomly here, instead
          //     it will be agreeWith-inherited from corresponding lObj after translation. )
          if (actionKey === "gender") {
            if (
              questionHeadChunk &&
              gpUtils.doesKeyContainValueOnChunk(questionHeadChunk, "andTags", [
                "person",
              ])
            ) {
              return;
            }

            if (
              questionChunk &&
              gpUtils.doesKeyContainValueOnChunk(questionChunk, "andTags", [
                "person",
              ])
            ) {
              return;
            }

            if (
              !questionHeadChunk &&
              !questionChunk &&
              answerHeadChunk &&
              gpUtils.doesKeyContainValueOnChunk(answerHeadChunk, "andTags", [
                "person",
              ])
            ) {
              return;
            }

            if (
              !questionHeadChunk &&
              !questionChunk &&
              answerChunk &&
              gpUtils.doesKeyContainValueOnChunk(answerChunk, "andTags", [
                "person",
              ])
            ) {
              return;
            }
          }

          if (
            //...if not truthy in A depCh, nor its headCh, nor corresp Q depCh, nor that one's headCh...

            !gpUtils.isKeyFilledOutOnChunk(answerChunk, actionKey) &&
            !gpUtils.isKeyFilledOutOnChunk(answerHeadChunk, actionKey) &&
            !gpUtils.isKeyFilledOutOnChunk(questionChunk, actionKey) &&
            !gpUtils.isKeyFilledOutOnChunk(questionHeadChunk, actionKey)
          ) {
            console.log("Pass 2");
            let actionValueArr = [
              gpUtils.selectRandom(reqSpecInstr.action[actionKey]),
            ];

            //...then fill the action key with action value in A headCh if exists, else A depCh...

            exports.specifyQuestionChunkAndChangeAnswerChunk(
              {
                answerHeadChunk,
                answerChunk,
                questionHeadChunk,
                questionChunk,
              },
              actionKey,
              actionValueArr
            );
          }
        });
      }
    });
  }

  //STEP ONE: For every A depCh and its headCh, check by requested Specifiers and if so, add them.
  answerDependentChunks.forEach((answerDependentChunk) => {
    console.log(
      "Checking answerDependentChunk: " + answerDependentChunk.chunkId
    );
    let materials = getMaterialsToAddSpecifiers(
      answerDependentChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    console.log("ww STEP ONE: ", materials);

    addRequiredSpecifiersToAnswerChunkOrHeadChunk(materials, answerLanguage);
  });

  //STEP TWO: Do this for the otherChunks as well.
  answerOtherChunks.forEach((answerOtherChunk) => {
    console.log("Checking answerOtherChunk: " + answerOtherChunk.chunkId);

    let materials = getMaterialsToAddSpecifiers(
      answerOtherChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    console.log("ww STEP TWO: ", materials);

    addRequiredSpecifiersToAnswerChunkOrHeadChunk(materials, answerLanguage);
  });

  //STEP THREE: Do a special thing for Multi Gender Nouns - that's lObjs with {gender: "both"}.
  answerDependentChunks.forEach((answerDependentChunk) => {
    console.log(
      "Checking answerDependentChunk: " + answerDependentChunk.chunkId
    );
    let materials = getMaterialsToAddSpecifiers(
      answerDependentChunk,
      answerSentenceStructure,
      questionSentenceStructure
    );

    let {
      answerHeadChunk,
      answerChunk,
      questionHeadChunk,
      questionChunk,
      questionHeadLemmaObject,
      questionLemmaObject,
    } = materials;

    if (questionHeadLemmaObject && questionHeadLemmaObject.gender === "both") {
      console.log("ww STEP THREE: A", materials);
      console.log(materials);

      let selectedGenderUnformatted = gpUtils.selectRandom(["m", "f"]);

      let selectedGender = answerLangUtils.formatFeatureValue(
        "gender",
        selectedGenderUnformatted,
        "person"
      );

      questionHeadLemmaObject.gender = selectedGender;
      questionHeadChunk.gender = [selectedGender];
      answerHeadChunk.gender = [selectedGender];

      exports.addAnnotation(questionHeadChunk, "gender", [selectedGender]);
    }

    if (questionLemmaObject && questionLemmaObject.gender === "both") {
      console.log("ww STEP THREE: B", materials);
      let selectedGender = gpUtils.selectRandom(["m", "f"]);

      questionLemmaObject.gender = selectedGender;
      questionChunk.gender = [selectedGender];
      answerChunk.gender = [selectedGender];

      exports.addAnnotation(questionChunk, "gender", [selectedGender]);
    }
  });

  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("----addSpecifiers------");
  console.log("---------END-----------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("-----------------------");
  console.log("questionOutputArr", questionOutputArr);
  console.log("answerSentenceFormula", answerSentenceFormula);
};

exports.addAnnotation = (chunk, key, value) => {
  if (!chunk.annotations) {
    chunk.annotations = {};
  }

  chunk.annotations[key] = value;
};

exports.addClarifiers = (arrayOfOutputUnits, languagesObj) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  if (!answerLanguage) {
    throw "OT:addClarifiers says Do you mean to call me? You don't give me an answerLanguage argument. I am only supposed to add clarifiers to the question sentence, and in order to do that I must know what the answerLanguage is going to be.";
  }

  const langUtils = require("../source/" + questionLanguage + "/langUtils.js");

  arrayOfOutputUnits.forEach((outputUnit) => {
    if (outputUnit.structureChunk.wordtype === "fixed") {
      return;
    }

    let {
      selectedLemmaObject,
      drillPath,
      structureChunk,
      selectedWord,
    } = outputUnit;

    if (!structureChunk.annotations) {
      structureChunk.annotations = {};
    }
    //
    //console.log(outputUnit)
    //
    // {
    //   selectedLemmaObject: {
    //     translations: { ENG: [Array], POL: [Array] },
    //     tags: [ 'animate', 'animal', 'farmyard', 'concrete' ],
    //     lemma: 'sheep',
    //     id: 'eng-nou-008',
    //     gender: 'n',
    //
    //     inflections: { singular: [Object], plural: [Object] }
    //   },
    //   selectedWord: 'sheep',
    //   drillPath: [ [ 'number', 'plural' ], [ 'gcase', 'nom' ] ],
    //   structureChunk: {
    //     chunkId: 'nou-1',
    //     wordtype: 'noun',
    //     andTags: [ 'farmyard' ],
    //     gcase: [ 'nom' ],
    //     number: [ 'plural' ]
    //   }
    // }

    //STEP ONE: Type 1 Allohomographs (get clarifiers from lObj)
    //
    //  Textmoji Clarifiers
    //  Wordtype Clarifiers
    //
    //          STEP 1A: singleWordtype - Textmoji clarifiers

    let { allohomInfo } = selectedLemmaObject;

    if (allohomInfo && allohomInfo.singleWordtype) {
      if (!allohomInfo.emoji || !allohomInfo.text) {
        throw (
          "Lemma object '" +
          selectedLemmaObject.id +
          "' was marked as singleWordtype but not Textmoji Clarifiers were present!"
        );
      }

      let { emoji, text } = allohomInfo;

      structureChunk.annotations.emoji = emoji;
      structureChunk.annotations.text = text;
    }

    //          STEP 1B: multipleWordtype - Wordtype clarifiers

    if (allohomInfo && allohomInfo.multipleWordtype) {
      if (structureChunk.pleaseShowMultipleWordtypeAllohomClarifiers) {
        structureChunk.annotations.wordtype = gpUtils.getWordtypeFromLemmaObject(
          selectedLemmaObject
        );
      }
    }

    //STEP TWO: Types 2-6 Synhomographs (language-specific)
    //
    //  Feature Clarifiers
    //
    //eg ENG has some verbs with v1-v2 synhomography, and 2per ambiguous re number.

    langUtils.addLanguageParticularClarifiers(
      structureChunk,
      questionLanguage,
      selectedLemmaObject
    );

    //STEP THREE: Type 1 Synhomographs (find synhoms in lobj programmatically)
    //
    //  Feature Clarifiers
    //
    //Find synhoms, add Feature Clarifiers if such clarifiers are allowed.
    let allowableClarifiers =
      refObj.lemmaObjectFeatures[answerLanguage]
        .allowableTransfersFromQuestionStructure[structureChunk.wordtype];

    console.log("The allowableClarifiers are as follows", allowableClarifiers);

    //allowableClarifiers. Any clarifiers not in here, don't bother adding them.
    //We're looking ahead to the answerLanguage, and thinking, hmmmmm, well right now the questionLanguage
    //is POL, and soon the answerLanguage will be ENG. And looking it up... ENG doesn't allow "gender" as a transfer.
    //So from that, we can surmise that ENG doesn't care about gender, and thus, won't want it as a clarifer on the POL Q sentence.

    if (!structureChunk.preventAddingClarifiers) {
      let synhomographData = otUtils.findSynhomographs(
        selectedLemmaObject,
        structureChunk,
        questionLanguage
      );

      if (synhomographData) {
        synhomographData.synhomographs.forEach((synhomDataUnit) => {
          if (selectedWord === synhomDataUnit.terminalValue) {
            //
            // console.log(synhomDataUnit);
            //
            // {
            //   terminalValue: 'sheep',
            //   inflectionPaths: [ [ 'singular', 'nom' ], [ 'plural', 'nom' ] ],
            //   labelsWhereTheyDiffer: [ 'number' ]
            // }

            let labelsWhereTheyDiffer = synhomDataUnit.labelsWhereTheyDiffer.filter(
              (label) => allowableClarifiers.includes(label)
            );

            labelsWhereTheyDiffer.forEach((label) => {
              structureChunk.annotations[label] = structureChunk[label];
            });
          }
        });
      }
    } else {
      console.log("I was told not to add any further clarifiers!");
    }
  });

  // aaUtils.attachAnnotations(arrayOfOutputUnits);

  gpUtils.consoleLogObjectAtTwoLevels(arrayOfOutputUnits);
};

exports.attachAnnotations = (arrayOfOutputUnits, languagesObj) => {
  let { answerLanguage, questionLanguage } = languagesObj;

  arrayOfOutputUnits.forEach((outputUnit) => {
    let { structureChunk, selectedLemmaObject } = outputUnit;

    if (
      structureChunk.annotations &&
      Object.keys(structureChunk.annotations).length
    ) {
      let formattedAnnotationArr = Object.keys(structureChunk.annotations).map(
        (annotationKey) => {
          let annotationValue = structureChunk.annotations[annotationKey];

          if (answerLanguage === "POL" && annotationKey === "gender") {
            const POLgenderToPlainEnglishRef = {
              m1: "male",
              m2: "male",
              m3: "male",
              f: "female",
              n: "neuter",
            };

            return POLgenderToPlainEnglishRef[annotationValue];
          } else {
            return annotationValue;
          }
        }
      );
      outputUnit.selectedWord += ` (${formattedAnnotationArr.join(", ")})`;
    }
  });
};
