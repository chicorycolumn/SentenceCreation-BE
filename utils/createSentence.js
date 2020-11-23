const scUtils = require("./sentenceCreationUtils.js");
const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const POLUtils = require("./specificPolishUtils.js");
const ENGUtils = require("./specificEnglishUtils.js");
const refObj = require("./referenceObjects.js");

exports.createSentence = (
  currentLanguage,
  sentenceNumber,
  sentenceSymbol,
  useDummy,
  generateAnswers,
  questionResultArray
) => {
  console.log("createSentence fxn was given these args", {
    currentLanguage,
    sentenceNumber,
    sentenceSymbol,
    useDummy,
  });

  // if (currentLanguage === "ENG") {
  //   return;
  // }

  const { wordsBank } = require(`../source/${currentLanguage}/words.js`);
  const {
    dummyWordsBank,
  } = require(`../source/${currentLanguage}/dummyWords.js`);
  const {
    sentenceFormulasBank,
  } = require(`../source/${currentLanguage}/sentenceFormulas.js`);
  const {
    dummySentenceFormulasBank,
  } = require(`../source/${currentLanguage}/dummySentenceFormulas.js`);

  //STEP ZERO: Get necessary components.
  let defaultSentenceNumber = 50;
  let defaultSentenceSymbol = "";
  sentenceSymbol = sentenceSymbol || defaultSentenceSymbol;
  let errorInSentenceCreation = {};
  let resultArr = [];

  let words = useDummy
    ? gpUtils.copyAndCombineWordbanks(wordsBank, dummyWordsBank)
    : gpUtils.copyWithoutReference(wordsBank);

  let sentenceFormulas = useDummy
    ? gpUtils.copyWithoutReference(dummySentenceFormulasBank)
    : gpUtils.copyWithoutReference(sentenceFormulasBank);

  if (sentenceNumber) {
    sentenceFormula = sentenceFormulas[sentenceNumber];
    sentenceSymbol = sentenceFormula.symbol;
  } else if (sentenceSymbol) {
    let matchingSentenceFormulaData = scUtils.findObjectInNestedObject(
      sentenceFormulas,
      {
        symbol: sentenceSymbol,
      },
      true
    );

    sentenceFormula = matchingSentenceFormulaData.value;
    sentenceNumber = matchingSentenceFormulaData.key;
  } else {
    sentenceFormula = sentenceFormulas[defaultSentenceNumber];
    sentenceSymbol = sentenceFormula.symbol;
  }

  let sentenceStructure = sentenceFormula.structure;

  if (generateAnswers) {
    console.log("ENG-sentenceStructure", sentenceStructure);
    console.log("POL-questionResultArray", questionResultArray);

    questionResultArray.forEach((questionResArrItem) => {
      let answerStructureChunk = sentenceStructure.find((structureChunk) => {
        return (
          structureChunk.chunkId === questionResArrItem.structureChunk.chunkId
        );
      });

      if (!answerStructureChunk) {
        return;
      }

      let questionSelectedLemmaObject = questionResArrItem.selectedLemmaObj;
      let questionSelectedWord = questionResArrItem.selectedWord;
      let questionStructureChunk = questionResArrItem.structureChunk;

      console.log("/////////////////GO");
      console.log(answerStructureChunk.chunkId);
      console.log("questionSelectedLemmaObject", questionSelectedLemmaObject);
      console.log("So, the Polish lemma chosen was");
      console.log(questionSelectedLemmaObject.lemma);
      console.log("and its english translations are");

      let lemmasToSearch = questionSelectedLemmaObject.translations.ENG;

      console.log(lemmasToSearch);
      console.log(
        "We will search for all ENG lemma objects with that english lemma as lemma."
      );

      let source = words[gpUtils.giveSetKey(answerStructureChunk.wordtype)];

      let matchingAnswerLemmaObjects = source.filter((lObj) => {
        return lemmasToSearch.includes(lObj.lemma);
      });

      matchingAnswerLemmaObjects = matchingAnswerLemmaObjects.filter(
        (answerLemmaObject) => {
          return gpUtils.areTwoFlatArraysEqual(
            questionSelectedLemmaObject.tags,
            answerLemmaObject.tags
          );
        }
      );

      let selectedAnswerLemmaObject = gpUtils.selectRandom(
        matchingAnswerLemmaObjects
      );

      console.log("I found this match:");
      console.log(selectedAnswerLemmaObject);
      answerStructureChunk.specificLemmas = [selectedAnswerLemmaObject.lemma];
      console.log("/////////////////END");

      console.log(
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFTER THE SORT"
      );
      console.log("answerStructureChunk", answerStructureChunk);

      refObj.inflectionChainsReference[
        currentLanguage
      ].allowableIncomingTransfers[answerStructureChunk.wordtype].forEach(
        (featureKey) => {
          if (questionStructureChunk[featureKey]) {
            answerStructureChunk[featureKey] =
              questionStructureChunk[featureKey];
          }
        }
      );

      console.log(
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFTER THE FEATURE TRANSFER"
      );
      console.log("answerStructureChunk", answerStructureChunk);
    });
    // return;
    // return;
    //At this point, a Polish sentence has already been created by the app.
    //We must harvest the features from it, that match to the chunks of this english formula.
    //Then we make all the english translations possible.
    /**
     * So let's be really specific.
     * We now have an english sentence formula. It's number 101 because that's the same sentenceNumber as the polish
     * sentence that was created earlier.
     * The english formula has structureChunks.
     * Each structureChunk has features, like manTags, tense... and also a chunkId.
     *
     * For every chunkId that we can match to the same chunkId in formula 101 from the polish formulas,
     * look at the chunk's connected lemmaobj (in resultArr)
     * from that lemma object, get the EN translations,
     * eg gwø»d» will have "nail" in its EN translations.
     * You'll then get the english lemma objects nail nail and nail
     * filter so same wordtype as polish lobj, leave us with nail and nail
     * now filter by same tags (body parts vs woodwork)
     * now we just have the english lobj nail.
     *
     * 1) Take the lemma from lobj nail, and put that as specificLemmas key in english chunk that has same chunkid as polish chunk connected to gwø»d».
     *
     * 2) Then bring over particular features.
     *
     * The polish noun chunk should copy its Number onto the english noun chunk.
     *  although for tantum plurales, make Number blank (all possible) in english noun chunk.
     *
     * The polish adjective chunk should copy its Form onto the english adjective chunk.
     *
     * The polish verb chunk should copy its Form Tense Person Number all onto the english verb chunk.
     *
     * 3) Now allow createSentence to run, and the english translation of the polish sentence will be created.
     *
     * 4) Modify the recursive traverser, so that if(generateAnswers), it will not just select one happy route, but rather create sentences for all happy routes.
     */
  }

  console.log("-------------------------------------");
  console.log("sentenceStructure", sentenceStructure);

  let doneChunkIds = [];
  let headIds = [];

  sentenceStructure.forEach((chunk) => {
    if (typeof chunk === "object" && chunk.agreeWith) {
      headIds.push(chunk.agreeWith);
    }
  });
  headIds = Array.from(new Set(headIds));

  console.log({ headIds });

  //STEP ONE: Select headwords and add to result array.
  headIds.forEach((headId) => {
    let chunkId = headId;
    let headChunk = sentenceStructure.find(
      (structureChunk) =>
        typeof structureChunk === "object" && structureChunk.chunkId === chunkId
    );
    doneChunkIds.push(chunkId);

    console.log(">>STEP ONE", headChunk);
    scUtils.findMatchingWordThenAddToResultArray(
      headChunk,
      resultArr,
      words,
      refObj.inflectionChainsReference[currentLanguage],
      errorInSentenceCreation,
      currentLanguage
    );

    console.log("Finished step one.");
  });

  //STEP TWO: Select dependent words and add to result array.
  headIds.forEach((headId) => {
    let dependentChunks = sentenceStructure.filter(
      (structureChunk) =>
        typeof structureChunk === "object" &&
        structureChunk.agreeWith === headId
    );

    // console.log(">>dependentChunks", dependentChunks);

    if (dependentChunks.length) {
      dependentChunks.forEach((dependentChunk) => {
        let headChunk = sentenceStructure.find(
          (structureChunk) =>
            typeof structureChunk === "object" &&
            structureChunk.chunkId === headId
        );

        // console.log(">>The headchunk of that dependent chunk is:", headChunk);

        refObj.inflectionChainsReference[currentLanguage]["adjective"].forEach(
          (featureKey) => {
            dependentChunk[featureKey] = headChunk[featureKey];
          }
        );

        doneChunkIds.push(dependentChunk.chunkId);

        // console.log(">>STEP TWO", dependentChunk);
        scUtils.findMatchingWordThenAddToResultArray(
          dependentChunk,
          resultArr,
          words,
          refObj.inflectionChainsReference[currentLanguage],
          errorInSentenceCreation,
          currentLanguage
        );
      });
    }
  });

  //STEP THREE: Select all other words and add to result array.
  sentenceStructure.forEach((structureChunk) => {
    if (
      typeof structureChunk !== "object" ||
      !doneChunkIds.includes(structureChunk.chunkId)
    ) {
      // console.log(">>STEP THREE", structureChunk);
      scUtils.findMatchingWordThenAddToResultArray(
        structureChunk,
        resultArr,
        words,
        refObj.inflectionChainsReference[currentLanguage],
        errorInSentenceCreation,
        currentLanguage
      );
    }
  });

  return {
    resultArr,
    sentenceFormula,
    sentenceNumber,
    sentenceSymbol,
    errorInSentenceCreation,
  };
};
