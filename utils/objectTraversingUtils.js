const gpUtils = require("./generalPurposeUtils.js");
const uUtils = require("./universalUtils.js");
const consol = require("./zerothOrder/consoleLoggingUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const frUtils = require("./formattingResponseUtils.js");
const refObj = require("./reference/referenceObjects.js");
const otUtils = require("./objectTraversingUtils.js");
const allLangUtils = require("./allLangUtils.js");

exports.findMatchingLemmaObjectThenWord = (
  structureChunk,
  words,
  errorInSentenceCreation,
  currentLanguage,
  questionLanguage,
  multipleMode,
  outputArray,
  isPHD
) => {
  consol.log(
    "[1;33m " +
      `ligw ot:findMatchingLemmaObjectThenWord for stCh: "${structureChunk.chunkId}"` +
      "[0m"
  );

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let selectedFormsArray = [];
  let arrayOfAllPossibleOutputUnits = [];
  let temporaryMultipleMode;

  //STEP ONE: Fx-PW: Pathway for Fixed pieces.
  if (gpUtils.getWordtypeStCh(structureChunk) === "fixed") {
    consol.consoleLogPW("##Fx-PW", structureChunk, multipleMode);

    return [
      {
        selectedLemmaObject: {},
        selectedWord: structureChunk.chunkValue,
        structureChunk,
      },
    ];
  }

  //STEP TWO: Filter lemmaObjects (by specificIds OR specificLemmas OR andTags and selectors).
  let source =
    words[gpUtils.giveSetKey(gpUtils.getWordtypeStCh(structureChunk))];

  langUtils.preprocessLemmaObjectsMinor(source);
  let matches = [];

  if (structureChunk.specificIds && structureChunk.specificIds.length) {
    consol.log(
      "obbm ot:findMatchingLemmaObjectThenWord GGGet matches by specific IDs:",
      structureChunk.specificIds
    );
    matches = source.filter((lObj) =>
      structureChunk.specificIds.includes(lObj.id)
    );
    if (!matches.length) {
      consol.log(
        "[1;31m " +
          `czdi ot:findMatchingLemmaObjectThenWord No matches after Get matches by specific IDs.` +
          "[0m"
      );
    }
  } else if (
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    consol.log(
      "yyeq ot:findMatchingLemmaObjectThenWord GGGet matches by specific Lemmas:",
      structureChunk.specificLemmas
    );
    consol.log(
      "yyeq ot:findMatchingLemmaObjectThenWord source",
      source.map((lObj) => lObj.lemma)
    );
    matches = source.filter((lObj) =>
      structureChunk.specificLemmas.includes(lObj.lemma)
    );
    if (!matches.length) {
      consol.log(
        "[1;31m " +
          `jybt ot:findMatchingLemmaObjectThenWord No matches after Get matches by specific Lemmas.` +
          "[0m"
      );
    }
  } else {
    consol.log(
      "vqkx ot:findMatchingLemmaObjectThenWord GGGet matches by Tags and Selectors."
    );
    matches = lfUtils.filterByAndTagsAndOrTags(source, structureChunk);

    if (!matches.length) {
      consol.log(
        "[1;31m " +
          `wvjy ot:findMatchingLemmaObjectThenWord No matches after Get matches by Tags. Eg you may have put multiple unfulfillable andTags?` +
          "[0m"
      );
    }

    langUtils.preprocessLemmaObjectsMinor(matches);

    matches = lfUtils.filterBySelectors(
      currentLanguage,
      structureChunk,
      matches,
      "matches line 106"
    );

    if (!matches.length) {
      consol.log(
        "[1;31m " +
          `frpb ot:findMatchingLemmaObjectThenWord No matches after Get matches by Selectors.` +
          "[0m"
      );
    }
  }

  langUtils.preprocessLemmaObjectsMinor(matches); //Must be adjusted again as may not have been in such pathway above.
  langUtils.preprocessLemmaObjectsMajor(
    matches,
    structureChunk,
    false,
    currentLanguage
  );

  //STEP THREE: Return result array immediately if uninflected or ad hoc.
  let adhocInflectionRef = refObj.adhocInflectionCategorys[currentLanguage];
  let adhocFormRef = refObj.adhocForms[currentLanguage];

  //    THREE (A): Ad-PW: Pathway for Adhoc: both Forms and Inflections.

  //    (Ad-PW-F): Pathway for Adhoc FORMS.
  if (
    structureChunk.form &&
    structureChunk.form.length &&
    Object.keys(adhocFormRef).includes(
      gpUtils.getWordtypeStCh(structureChunk)
    ) &&
    structureChunk.form.some((selectedForm) =>
      adhocFormRef[gpUtils.getWordtypeStCh(structureChunk)].includes(
        selectedForm
      )
    )
  ) {
    consol.consoleLogPW("##Ad-PW-F", structureChunk, multipleMode);

    if (multipleMode) {
      matches.forEach((selectedLemmaObject) => {
        let adhocArr = langUtils.generateAdhocForms(
          "form",
          uUtils.copyWithoutReference(structureChunk),
          selectedLemmaObject,
          currentLanguage
        );

        adhocArr.forEach((adhocResultObj) => {
          let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

          otUtils.stripOutInflectionCategorys(
            currentLanguage,
            structureChunkUpdated,
            "Ad-PW-F"
          );

          selectedFormsArray.push({
            selectedWordArr,
            selectedLemmaObject,
            structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
          });
        });
      });
    } else {
      let selectedLemmaObject = uUtils.selectRandom(matches);

      let adhocArr = langUtils.generateAdhocForms(
        "form",
        uUtils.copyWithoutReference(structureChunk),
        selectedLemmaObject,
        currentLanguage
      );

      if (!adhocArr || !adhocArr.length) {
        throw "No members were found in the adhocArr from OT:findMatching, path 3A-1 (ie form).";
      }

      let selectedAdhocResultObj = uUtils.selectRandom(adhocArr);

      let { selectedWordArr, structureChunkUpdated } = selectedAdhocResultObj;

      otUtils.stripOutInflectionCategorys(
        currentLanguage,
        structureChunkUpdated,
        "Ad-PW-F"
      );

      selectedFormsArray.push({
        selectedWordArr,
        selectedLemmaObject,
        structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
      });
    }
  }

  //    (Ad-PW-I): Pathway for Adhoc INFLECTIONS.
  if (
    Object.keys(adhocInflectionRef).includes(
      gpUtils.getWordtypeStCh(structureChunk)
    )
  ) {
    let adhocInflectionCategorys =
      adhocInflectionRef[gpUtils.getWordtypeStCh(structureChunk)];

    adhocInflectionCategorys.forEach((adhocInflectionCategory) => {
      if (
        structureChunk[adhocInflectionCategory] &&
        structureChunk[adhocInflectionCategory].length
      ) {
        consol.consoleLogPW("##Ad-PW-I", structureChunk, multipleMode);

        if (multipleMode) {
          matches.forEach((selectedLemmaObject) => {
            let adhocArr = langUtils.generateAdhocForms(
              adhocInflectionCategory,
              uUtils.copyWithoutReference(structureChunk),
              selectedLemmaObject,
              currentLanguage
            );

            adhocArr.forEach((adhocResultObj) => {
              let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

              otUtils.stripOutInflectionCategorys(
                currentLanguage,
                structureChunkUpdated,
                "Ad-PW-I"
              );

              selectedFormsArray.push({
                selectedWordArr,
                selectedLemmaObject,
                structureChunkUpdatedByAdhocOrUninflected:
                  structureChunkUpdated,
              });
            });
          });
        } else {
          let selectedLemmaObject = uUtils.selectRandom(matches);

          let adhocArr = langUtils.generateAdhocForms(
            adhocInflectionCategory,
            uUtils.copyWithoutReference(structureChunk),
            selectedLemmaObject,
            currentLanguage
          );

          if (!adhocArr || !adhocArr.length) {
            throw "No members were found in the adhocArr from OT:findMatching, path 3A-2 ie Ad-PW-I (ie tenseDescription).";
          }

          let selectedAdhocResultObj = uUtils.selectRandom(adhocArr);

          let { selectedWordArr, structureChunkUpdated } =
            selectedAdhocResultObj;

          otUtils.stripOutInflectionCategorys(
            currentLanguage,
            structureChunkUpdated,
            "Ad-PW-I"
          );

          selectedFormsArray.push({
            selectedWordArr,
            selectedLemmaObject,
            structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
          });
        }
      }
    });
  }

  //    THREE (B): Un-PW: Pathway for Uninflected forms.

  //Note, this indeed is specifically uninflected FORMS.
  //So, activeAdjectival, anteriorAdverbial, those kinds of things, that are indeed laabeled with the Form traitKey.
  //Remember, within eg a verb lobj, available Forms are infinitive, verbal, activeAdjectival, anterior...

  if (structureChunk.form && structureChunk.form.length) {
    Object.keys(refObj.uninflectedForms[currentLanguage]).forEach(
      (wordtype) => {
        if (gpUtils.getWordtypeStCh(structureChunk) === wordtype) {
          let uninflectedInflectionKeys =
            refObj.uninflectedForms[currentLanguage][wordtype];

          let requestedUninflectedForms = structureChunk.form.filter(
            (requestedForm) => uninflectedInflectionKeys.includes(requestedForm)
          );

          if (requestedUninflectedForms.length) {
            consol.consoleLogPW("##Un-PW", structureChunk, multipleMode);

            if (multipleMode) {
              requestedUninflectedForms.forEach((selectedUninflectedForm) => {
                let matchesByUninflectedForm = matches.filter(
                  (lObj) => lObj.inflections[selectedUninflectedForm]
                );

                matchesByUninflectedForm.forEach((selectedLemmaObject) => {
                  let selectedWordArr =
                    selectedLemmaObject.inflections[selectedUninflectedForm];

                  if (
                    typeof selectedWordArr === "string" ||
                    (gpUtils.isTerminusObject(selectedWordArr) &&
                      selectedWordArr.processOnlyAtEnd)
                  ) {
                    selectedWordArr = [selectedWordArr];
                  }

                  if (
                    gpUtils.isTerminusObject(selectedWordArr) &&
                    !selectedWordArr.processOnlyAtEnd
                  ) {
                    consol.throw(
                      "bnle ot:findMatching Natasha, action required."
                    );
                  }

                  //We here update a copy of structureChunk
                  let structureChunkUpdatedByAdhocOrUninflected =
                    uUtils.copyWithoutReference(structureChunk);

                  structureChunkUpdatedByAdhocOrUninflected.form = [
                    selectedUninflectedForm,
                  ];

                  otUtils.stripOutInflectionCategorys(
                    currentLanguage,
                    structureChunkUpdatedByAdhocOrUninflected,
                    "Un-PW"
                  );

                  selectedFormsArray.push({
                    selectedWordArr,
                    selectedLemmaObject,
                    structureChunkUpdatedByAdhocOrUninflected,
                  });
                });
              });
            } else {
              let selectedUninflectedForm = uUtils.selectRandom(
                requestedUninflectedForms
              );

              let matchesByUninflectedForm = matches.filter(
                (lObj) => lObj.inflections[selectedUninflectedForm]
              );

              let selectedLemmaObject = uUtils.selectRandom(
                matchesByUninflectedForm
              );

              let selectedWordArr =
                selectedLemmaObject.inflections[selectedUninflectedForm];

              if (
                typeof selectedWordArr === "string" ||
                (gpUtils.isTerminusObject(selectedWordArr) &&
                  selectedWordArr.processOnlyAtEnd)
              ) {
                selectedWordArr = [selectedWordArr];
              }

              if (
                gpUtils.isTerminusObject(selectedWordArr) &&
                !selectedWordArr.processOnlyAtEnd
              ) {
                consol.throw(
                  "wrha findMatching Natasha, some action required."
                );
              }

              //We here update a copy of structureChunk
              let structureChunkUpdatedByAdhocOrUninflected =
                uUtils.copyWithoutReference(structureChunk);

              structureChunkUpdatedByAdhocOrUninflected.form = [
                selectedUninflectedForm,
              ];

              otUtils.stripOutInflectionCategorys(
                currentLanguage,
                structureChunkUpdatedByAdhocOrUninflected,
                "Un-PW"
              );

              selectedFormsArray.push({
                selectedWordArr,
                selectedLemmaObject,
                structureChunkUpdatedByAdhocOrUninflected,
              });
            }
          }
        }
      }
    );
  }

  // consol.log(
  //   "ecse ot:findMatchingLemmaObjectThenWord selectedFormsArray",
  //   selectedFormsArray
  // );

  if (selectedFormsArray.length) {
    selectedFormsArray.forEach((selectedFormObject) => {
      let {
        selectedWordArr,
        selectedLemmaObject,
        structureChunkUpdatedByAdhocOrUninflected,
      } = selectedFormObject;

      selectedWordArr.forEach((selectedWord) => {
        let outputUnit = frUtils.createOutputUnit(
          errorInSentenceCreation,
          null,
          selectedWord,
          structureChunkUpdatedByAdhocOrUninflected,
          selectedLemmaObject
        );

        arrayOfAllPossibleOutputUnits.push(outputUnit);
      });
    });

    return arrayOfAllPossibleOutputUnits;
  }

  //STEP FOUR: If-PW: Pathway for inflected forms, return word after selecting by drilling down through lemma object.

  //    STEP FOUR-A: Preparing materials

  // A new stCh array. Eg in POL, split differential conditional tense+aspect into separate copies of one stCh.
  let structureChunksAdjusted =
    langUtils.adjustStructureChunksInIfPW(structureChunk);

  let structureChunks = structureChunksAdjusted || [structureChunk];

  structureChunks.forEach((structureChunk) => {
    consol.log(
      "mxcm ot:findMatchingLemmaObjectThenWord structureChunk",
      structureChunk
    );

    let matchesCopy = matches.slice(0);

    if (!matchesCopy.length) {
      consol.log(
        "[1;31m " +
          "#WARN btfm ot:findMatchingLemmaObjectThenWord. It turns out no matching lemma objects were found in OT:findMatching" +
          "[0m"
      );

      return false;
    }

    matchesCopy = lfUtils.filterBySelectors(
      currentLanguage,
      structureChunk,
      matchesCopy,
      "matches 465"
    );

    if (!matchesCopy.length) {
      consol.log(
        "[1;31m " +
          "#NB gugm ot:findMatchingLemmaObjectThenWord. It transpires that no matching lemma objects were found in OT:findMatching" +
          "[0m",
        structureChunk
      );

      return false;
    }

    matchesCopy = lfUtils.filterOutLackingLemmaObjects(
      matchesCopy,
      structureChunk,
      currentLanguage
    );

    if (!matchesCopy.length) {
      consol.log(
        "[1;31m " +
          "#WARN yqtf ot:findMatchingLemmaObjectThenWord. It appears no matching lemma objects were found in OT:findMatching" +
          "[0m"
      );

      return false;
    }

    //    STEP FOUR-B: Getting the inflected word.

    consol.consoleLogPW("##If-PW", structureChunk, multipleMode);

    if (multipleMode) {
      consol.log("iksf ot:findMatchingLemmaObjectThenWord");
      matchesCopy.forEach((selectedLemmaObject) => {
        consol.log(
          "uzsw ot:findMatchingLemmaObjectThenWord selectedLemmaObject",
          selectedLemmaObject
        );

        if (outputArray) {
          consol.log(
            "[1;33m " +
              `nvnĸ findMatching outputArray: [${outputArray.map(
                (x) => x.selectedWord
              )}]` +
              "[0m"
          );
        } else {
          consol.log("[1;33m " + `nvnĸ findMatching outputArray null` + "[0m");
        }

        let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
          selectedLemmaObject,
          structureChunk,
          currentLanguage,
          multipleMode,
          outputArray,
          isPHD
        );

        subArrayOfOutputUnits.forEach((unit) => {
          let { errorInDrilling, selectedWordArray, drillPath } = unit;

          selectedWordArray.forEach((selectedWord) => {
            if (!"natasha findMatching Answer mode") {
              if (typeof selectedWord === "string") {
                consol.log("[1;33m " + `bufw findMatching Answer IS STRING` + "[0m");
              } else if (Array.isArray(selectedWord)) {
                consol.log("[1;33m " + `bufw findMatching Answer IS ARRAY` + "[0m");
                consol.log(selectedWord);
                consol.throw("bufw findMatching should not have been array.");
              } else if (gpUtils.isTerminusObject(selectedWord)) {
                consol.log("[1;33m " + `bufw findMatching Answer IS TOBJ` + "[0m");
              }
            }

            if (
              gpUtils.isTerminusObject(selectedWord) &&
              !selectedWord.processOnlyAtEnd
            ) {
              consol.throw(
                "zjnv ot:findMatchingLemmaObjectThenWord Natasha, action here required."
              );
            }

            if (
              typeof selectedWord === "string" ||
              (gpUtils.isTerminusObject(selectedWord) &&
                selectedWord.processOnlyAtEnd)
            ) {
              let outputUnit = frUtils.createOutputUnit(
                errorInSentenceCreation,
                errorInDrilling,
                selectedWord,
                structureChunk,
                selectedLemmaObject,
                drillPath
              );
              arrayOfAllPossibleOutputUnits.push(outputUnit);
            } else if (gpUtils.isTerminusObject(selectedWord)) {
              let allWords = gpUtils.getWordsFromTerminusObject(
                selectedWord,
                true
              );

              allWords.forEach((word) => {
                let outputUnit = frUtils.createOutputUnit(
                  errorInSentenceCreation,
                  errorInDrilling,
                  word,
                  structureChunk,
                  selectedLemmaObject,
                  drillPath
                );
                arrayOfAllPossibleOutputUnits.push(outputUnit);
              });
            }
          });
        });
      });
    } else {
      consol.log("xzjc ot:findMatchingLemmaObjectThenWord");
      let selectedLemmaObject = uUtils.selectRandom(matchesCopy);

      if (!structureChunk.dontSpecifyOnThisChunk) {
        //PDS-Beryl: Do if PDS false.
        //
        //Decant the MGNs that have PDS:false. These are Q stChs as we're in !multipleMode clause.
        //
        allLangUtils.correctMGNsBeforeFetchingOutputArray(
          structureChunk,
          selectedLemmaObject,
          currentLanguage
        );

        allLangUtils.decantMGNsBeforeFetchingOutputArray(
          structureChunk,
          selectedLemmaObject,
          currentLanguage
        );
      } else {
        consol.log(
          "[1;30m " +
            `-----------------------------------------------------------------------------------------------------------------------------------PDSblue` +
            "[0m"
        );
      }

      if ("console") {
        consol.log(
          "fxdn ot:findMatchingLemmaObjectThenWord If-PW selectedLemmaObject for " +
            structureChunk.chunkId
        );
        consol.log(
          "fxdn ot:findMatchingLemmaObjectThenWord",
          selectedLemmaObject.inflections
        );

        consol.log("- * - * - * - * - * - * - * - * - * - * - * - * -");
        if (outputArray) {
          consol.log(
            "[1;33m " +
              `nvnk findMatching outputArray: [${outputArray.map(
                (x) => x.selectedWord
              )}]` +
              "[0m"
          );
        } else {
          consol.log("[1;33m " + `nvnk findMatching outputArray null` + "[0m");
        }
        consol.log({
          selectedLemmaObject,
          structureChunk,
          currentLanguage,
          multipleMode,
          outputArray,
        });
        consol.log("- * - * - * - * - * - * -");
      }

      let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
        selectedLemmaObject,
        structureChunk,
        currentLanguage,
        multipleMode,
        outputArray,
        isPHD
      );

      if (!subArrayOfOutputUnits || !subArrayOfOutputUnits.length) {
        consol.log("uyie !subArrayOfOutputUnits/length");
        return false;
      }

      consol.log(
        "sfmo ot:findMatchingLemmaObjectThenWord subArrayOfOutputUnits"
      );
      consol.consoleLogObjectAtOneLevel(subArrayOfOutputUnits);

      if (
        structureChunk.preferredChoicesForQuestionSentence &&
        Object.keys(structureChunk.preferredChoicesForQuestionSentence).length
      ) {
        Object.keys(structureChunk.preferredChoicesForQuestionSentence).forEach(
          (traitKey) => {
            let traitValue =
              structureChunk.preferredChoicesForQuestionSentence[traitKey];

            subArrayOfOutputUnits = subArrayOfOutputUnits.filter(
              (unit) =>
                unit.drillPath &&
                unit.drillPath.find(
                  (drillPathSubArr) => drillPathSubArr[0] === traitKey
                )[1] === traitValue
            );
          }
        );
      }

      let unit = uUtils.selectRandom(subArrayOfOutputUnits);
      /**Why selran here? Because we're in Q mode.
       * So if matka and matki are possibles, then of course we must choose one for the one Q sentence,
       * so ultimately Q sentence is "Matki dały mi stół." but it could have equally been "Matka dała mi stół."
       *
       * But see above, we can take preferredChoicesForQuestionSentence from stCh into account.
       */

      //eg subArrayOfOutputUnits [{
      //   selectedWordArray: [ 'I' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'singular' ],
      //     [ 'gender', 'm' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [ 'I' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'singular' ],
      //     [ 'gender', 'f' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // }]

      //eg [{
      //   selectedWordArray: [ 'the' ],
      //   drillPath: [ [ 'form', 'definite' ] ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [
      //     {
      //       isTerminus: true,
      //       processOnlyAtEnd: true,
      //       nonprotective: [Array],
      //       protective: [Array]
      //     }
      //   ],
      //   drillPath: [ [ 'form', 'indefinite' ] ],
      //   errorInDrilling: false
      // }]

      //eg [{
      //   selectedWordArray: [ 'matka' ],
      //   drillPath: [ [ 'number', 'singular' ], [ 'gcase', 'nom' ] ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [ 'matki' ],
      //   drillPath: [ [ 'number', 'plural' ], [ 'gcase', 'nom' ] ],
      //   errorInDrilling: false
      // }]

      //eg [{
      //   selectedWordArray: [ 'I' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'singular' ],
      //     [ 'gender', 'm' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [ 'I' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'singular' ],
      //     [ 'gender', 'f' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [ 'we' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'plural' ],
      //     [ 'gender', 'virile' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // },
      // {
      //   selectedWordArray: [ 'we' ],
      //   drillPath: [
      //     [ 'form', 'pronoun' ],
      //     [ 'person', '1per' ],
      //     [ 'number', 'plural' ],
      //     [ 'gender', 'nonvirile' ],
      //     [ 'gcase', 'nom' ]
      //   ],
      //   errorInDrilling: false
      // }]

      let {
        errorInDrilling,
        selectedWordArray,
        drillPath,
        drillPathSecondary,
        drillPathTertiary,
      } = unit;

      if (!selectedWordArray || !selectedWordArray.length) {
        consol.log(
          "whhe ot:findMatchingLemmaObjectThenWord errorInSentenceCreation.errorMessage: No lemma objects were found for these specifications."
        );
        errorInSentenceCreation.errorMessage = [
          "whhe ot:findMatchingLemmaObjectThenWord No lemma objects were found for these specifications.",
        ];
        return false;
      }

      let selectedItem = uUtils.selectRandom(selectedWordArray);
      let selectedWord;

      if (!"natasha findMatching Question mode") {
        if (typeof selectedItem === "string") {
          consol.log(
            "[1;33m " +
              `ozdj ot:findMatchingLemmaObjectThenWord findMatching Question IS STRING` +
              "[0m"
          );
        } else if (Array.isArray(selectedItem)) {
          consol.log(
            "[1;33m " +
              `ozdj ot:findMatchingLemmaObjectThenWord findMatching Question IS ARRAY` +
              "[0m"
          );
          consol.log("jxny ot:findMatchingLemmaObjectThenWord", selectedItem);
          consol.throw(
            "jxny ot:findMatchingLemmaObjectThenWord should not have been array."
          );
        } else if (gpUtils.isTerminusObject(selectedItem)) {
          consol.log(
            "[1;33m " +
              `ozdj ot:findMatchingLemmaObjectThenWord findMatching Question IS TOBJ` +
              "[0m"
          );
        }
      }

      if (
        typeof selectedItem === "string" ||
        (gpUtils.isTerminusObject(selectedItem) &&
          selectedItem.processOnlyAtEnd)
      ) {
        selectedWord = selectedItem;
      } else if (
        gpUtils.isTerminusObject(selectedItem) &&
        !selectedItem.processOnlyAtEnd
      ) {
        let additionalWords = selectedItem.normal.slice(0);

        if (
          selectedItem.additionalFrequent &&
          selectedItem.additionalFrequent.length
        ) {
          additionalWords = [
            ...additionalWords,
            ...selectedItem.additionalFrequent,
            ...selectedItem.normal, //Giving more weight to normal.
          ];
        }

        selectedWord = uUtils.selectRandom(additionalWords);
      }
      let outputUnit = frUtils.createOutputUnit(
        errorInSentenceCreation,
        errorInDrilling,
        selectedWord,
        structureChunk,
        selectedLemmaObject,
        drillPath,
        drillPathSecondary,
        drillPathTertiary
      );

      arrayOfAllPossibleOutputUnits.push(outputUnit);
    }
  });

  if (!arrayOfAllPossibleOutputUnits.length) {
    if (!errorInSentenceCreation.errorMessage) {
      consol.log(
        "yzcq ot:findMatchingLemmaObjectThenWord errorInSentenceCreation.errorMessage: The rrrequested inflections were not found in the selected lemma objects."
      );
      consol.log(
        "yzcq ot:findMatchingLemmaObjectThenWord structureChunk",
        structureChunk
      );
      errorInSentenceCreation.errorMessage = [
        "yzcq The rrrequested inflections were not found in the selected lemma objects.",
      ];
    }
    return false;
  }

  if (!multipleMode && arrayOfAllPossibleOutputUnits.length > 1) {
    arrayOfAllPossibleOutputUnits = [
      uUtils.selectRandom(arrayOfAllPossibleOutputUnits),
    ];
  }

  return arrayOfAllPossibleOutputUnits;
};

exports.concoctNestedRoutes = (routesByLevelTarget, routesByLevelSource) => {
  routesByLevelTarget.forEach((arr, index) => {
    if (!arr.length) {
      if (routesByLevelSource[index] && routesByLevelSource[index].length) {
        routesByLevelTarget[index] = routesByLevelSource[index];
      } else {
        throw "Error. The variable routesByLevelTarget contains one or more empty arrays, which means this function cannot work.";
      }
    }
  });

  let res = [];
  let arr = [];

  recursivelyBuildArrays(routesByLevelTarget, arr);
  return res;

  function recursivelyBuildArrays(source, arr) {
    if (source.length === 1) {
      let item = source[0];
      item.forEach((subitem) => {
        arr.push(subitem);
        res.push(arr.slice(0));
        arr.pop();
      });
      return;
    }

    let item = source[0];
    item.forEach((subitem) => {
      arr.push(subitem);
      recursivelyBuildArrays(source.slice(1), arr);
      arr.pop();
    });
  }
};

exports.extractNestedRoutes = (source) => {
  if (source.isTerminus) {
    let routesByNesting = [];
    let routesByLevel = [[]];

    Object.keys(source).forEach((tObjKey) => {
      let tObjValue = source[tObjKey];

      if (typeof tObjValue !== "boolean") {
        routesByNesting.push([tObjKey]);
        routesByLevel[0].push(tObjKey);
      }
    });

    return { routesByNesting, routesByLevel };
  }

  let routesByNesting = [];
  let arr = [];
  recursivelyMapRoutes(arr, source);

  let routesByLevel = [];

  routesByNesting.forEach((routeArr) => {
    routeArr.forEach((item, index) => {
      if (!routesByLevel[index]) {
        routesByLevel[index] = [item];
      } else {
        if (!routesByLevel[index].includes(item)) {
          routesByLevel[index].push(item);
        }
      }
    });
  });

  return { routesByNesting, routesByLevel };

  function recursivelyMapRoutes(arr, source) {
    if (
      typeof source === "string" ||
      typeof source === "boolean" ||
      gpUtils.isTerminusObject(source)
    ) {
      let arrCopy = arr.slice();
      arr.pop();
      return arrCopy;
    } else if (uUtils.isKeyValueTypeObject(source)) {
      Object.keys(source).forEach((traitKey) => {
        if (!source[traitKey]) {
          delete source[traitKey];
          return;
        }

        arr.push(traitKey);

        let result = recursivelyMapRoutes(arr, source[traitKey]);

        if (result) {
          routesByNesting.push(result);
        }
      });
      arr.pop();
    } else {
      consol.throw(
        `kwdo ot:recursivelyMapRoutes found value with wrong data type: "${
          Array.isArray(source)
            ? "Array"
            : (typeof source)[0].toUpperCase() + (typeof source).slice(1)
        }".`
      );
    }
  }
};

exports.findObjectInNestedObject = (
  source,
  identifyingData,
  alsoReturnKey,
  alsoSearchArrays
) => {
  let res = {};
  recursivelySearch(source, identifyingData);
  return alsoReturnKey ? res : res.chunkValue;

  function recursivelySearch(source, identifyingData) {
    if (res.chunkValue) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (
        (!alsoSearchArrays && uUtils.isKeyValueTypeObject(value)) ||
        (alsoSearchArrays && uUtils.isKeyValueTypeObjectOrArray(value))
      ) {
        if (uUtils.doKeyValuesMatch(value, identifyingData)) {
          res.chunkValue = value;
          res.key = key;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};

exports.findObjectInNestedObjectsAndArrays = (
  source,
  identifyingData,
  alsoReturnKey
) => {
  let res = {};
  recursivelySearch(source, identifyingData);
  return alsoReturnKey ? res : res.chunkValue;

  function recursivelySearch(source, identifyingData) {
    if (res.chunkValue) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (typeof value === "object" && value !== null) {
        if (uUtils.doKeyValuesMatch(value, identifyingData)) {
          res.chunkValue = value;
          res.key = key;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};

exports.giveRoutesAndTerminalValuesFromObject = (obj) => {
  consol.log(
    "[1;35m " +
      `xlbj ot:giveRoutesAndTerminalValuesFromObject-----------------------` +
      "[0m"
  );

  const nestedRoutes = otUtils.extractNestedRoutes(obj).routesByNesting;
  let resArr = [];

  nestedRoutes.forEach((nestedRoute) => {
    let inflectionValue = otUtils.giveInflectionValueFromObjectByRoute(
      obj,
      nestedRoute
    );

    //Splits terminal inflectionValue that are arrays, into different unit, with identical routes.

    //What is happening here exactly?

    if (Array.isArray(inflectionValue)) {
      inflectionValue.forEach((subInflectionValue) => {
        resArr.push({ terminalValue: subInflectionValue, nestedRoute });
      });
    } else {
      resArr.push({ terminalValue: inflectionValue, nestedRoute });
    }
  });

  return resArr;
};

exports.giveInflectionValueFromObjectByRoute = (obj, route) => {
  return interiorFunction(obj, route);

  function interiorFunction(obj, route) {
    let inflectionKey = route[0];
    if (!uUtils.isKeyValueTypeObject(obj[inflectionKey])) {
      return obj[inflectionKey];
    } else {
      return interiorFunction(obj[inflectionKey], route.slice(1));
    }
  }
};

exports.findSynhomographs = (lemmaObject, structureChunk, currentLanguage) => {
  let inflectionCategoryChain =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      gpUtils.getWordtypeStCh(structureChunk)
    ];

  let routesAndTerminalValues = otUtils.giveRoutesAndTerminalValuesFromObject(
    lemmaObject.inflections
  );

  let tempArr = [];

  routesAndTerminalValues.forEach((item) => {
    let { terminalValue, nestedRoute } = item;

    let existing = tempArr.find((item) => item.terminalValue === terminalValue);

    if (existing) {
      existing.inflectionPaths.push(nestedRoute.slice(0));
    } else {
      tempArr.push({
        terminalValue,
        inflectionPaths: [nestedRoute.slice(0)],
      });
    }
  });

  let synhomographs = tempArr.filter((item) => item.inflectionPaths.length > 1);

  if (synhomographs.length) {
    synhomographs.forEach((synhomDataUnit) => {
      synhomDataUnit.inflectionCategoryChain = inflectionCategoryChain;

      let { inflectionPaths } = synhomDataUnit;
      let inflectionCategorysWhereTheyDiffer = [];

      inflectionCategoryChain.forEach((inflectionCategory, index) => {
        let allInflectionKeysForThisInflectionCategory = inflectionPaths.map(
          (path) => path[index]
        );

        if (
          !allInflectionKeysForThisInflectionCategory.every(
            (inflectionKey) =>
              inflectionKey === allInflectionKeysForThisInflectionCategory[0]
          )
        ) {
          inflectionCategorysWhereTheyDiffer.push(inflectionCategory);
        }
      });

      synhomDataUnit.inflectionCategorysWhereTheyDiffer =
        inflectionCategorysWhereTheyDiffer;
    });

    return {
      lemmaObjectId: lemmaObject.id,
      inflectionCategoryChain,
      synhomographs,
    };
  }
};

exports.findSinglePointMutationArray = (
  currentArray,
  arrayOfArrays,
  positionToExamine,
  specialComparisonCallback
) => {
  // consol.log("ldzi findSinglePointMutationArray was given:");
  // consol.log("ldzi", { currentArray, positionToExamine });
  // consol.log("ldzi findSinglePointMutationArray arrayOfArrays", arrayOfArrays);

  if (!arrayOfArrays.length) {
    return false;
  }

  if (
    !arrayOfArrays.find((arr) =>
      arr.every((item, index) => currentArray[index] === item)
    )
  ) {
    return false;
  }

  //Return true if you find an arr where:
  //     -- item at position is different to currentArr
  //     -- but items at all other positions are the same as currentArr
  return !!arrayOfArrays.find((arr) =>
    arr.every((item, index) => {
      if (index === positionToExamine) {
        return item !== currentArray[index];
      } else {
        return (
          item === currentArray[index] ||
          (specialComparisonCallback &&
            specialComparisonCallback(item, currentArray[index]))
        );
      }
    })
  );
};

exports.stripOutInflectionCategorys = (
  currentLanguage,
  structureChunk,
  PWlaabel
) => {
  let allInflectionCategorysForThisWordtype =
    refObj.lemmaObjectTraitKeys[currentLanguage].inflectionChains[
      gpUtils.getWordtypeStCh(structureChunk)
    ];

  allInflectionCategorysForThisWordtype
    .filter((inflectionCategory) => !["form"].includes(inflectionCategory))
    .forEach((inflectionCategory) => {
      if (structureChunk["inflectionCategory"]) {
        consol.log(
          "[1;35m " +
            `milm stripOutInflectionCategorys Deleting "${inflectionCategory}" from stCh "${structureChunk.chunkId}" because this is #${PWlaabel} in ${currentLanguage}` +
            "[0m"
        );
      }

      delete structureChunk[inflectionCategory];
    });
};

exports.doDrillPathsDifferOnlyByGender = (subArrayOfOutputUnits) => {
  if (!subArrayOfOutputUnits || subArrayOfOutputUnits.length < 2) {
    return false;
  }

  if (
    subArrayOfOutputUnits.some((outputUnit) => {
      return (
        outputUnit.drillPath &&
        outputUnit.drillPath.find((pathArr) => pathArr[0] === "gender")
      );
    })
  ) {
    let firstOutputUnit = subArrayOfOutputUnits[0];

    if (
      subArrayOfOutputUnits.slice(1).every((outputUnit) => {
        if (
          outputUnit.drillPath.find((pathArr) => pathArr[0] === "gender")[1] !==
            firstOutputUnit.drillPath.find(
              (pathArr) => pathArr[0] === "gender"
            )[1] &&
          outputUnit.drillPath
            .filter((pathArr) => pathArr[0] !== "gender")
            .every((pathArr) => {
              let firstDPPathArr = firstOutputUnit.drillPath.find(
                (urPathArr) => urPathArr[0] === pathArr[0]
              );

              if (firstDPPathArr && firstDPPathArr[1] === pathArr[1]) {
                return true;
              }
            })
        ) {
          return true;
        }
      })
    ) {
      return true;
    }
  }
};

exports.switchMetaTraitValueForAWorkableConvertedTraitValue = (
  inflectionCategory,
  inflectionKey,
  source,
  currentLanguage,
  structureChunk,
  consoleLogLaabel
) => {
  consol.log(
    "[1;33m " +
      `ivwa ` +
      consoleLogLaabel +
      `. >>unkeyed metaTraitValue clause<<. inflectionKey is a metaTraitValue: "${inflectionKey}", but it is not present on the source. So, we should check if the source has corresponding inflectionKeys, eg for allPersonalGenders it would be [m, f], and if they hold all the same inflectionKeys, then we should let this work.` +
      "[0m"
  );

  let convertedMetaTraitValues = refObj.metaTraitValues[currentLanguage][
    inflectionCategory
  ][inflectionKey].filter(
    (convertedMetaTraitValue) => source[convertedMetaTraitValue]
  );

  consol.log(
    "[1;33m " + `ivwe convertedMetaTraitValues [${convertedMetaTraitValues}]` + "[0m"
  );

  if (!convertedMetaTraitValues || !convertedMetaTraitValues.length) {
    consol.throw(
      `ejrb #ERR traverseAndRecordInflections >>unkeyed metaTraitValue clause<<. Found no convertedMetaTraitValues for "${inflectionKey}".`
    );
  }

  if (convertedMetaTraitValues.length === 1) {
    let selectedConvertedMetaTraitValue = convertedMetaTraitValues[0];

    consol.log(
      "[1;33m " +
        `lbro traverseAndRecordInflections >>unkeyed metaTraitValue clause<<. Setting inflectionKey to "${selectedConvertedMetaTraitValue}". Will now continue with main fxn.` +
        "[0m"
    );

    return selectedConvertedMetaTraitValue;
  }

  let drillResultsOfConvertedMetaTraitValues = convertedMetaTraitValues.map(
    (convertedMetaTraitValue) => source[convertedMetaTraitValue]
  );

  let selectedConvertedMetaTraitValue = uUtils.selectRandom(
    convertedMetaTraitValues
  );

  if (
    uUtils.checkEachSequentialPairing(
      drillResultsOfConvertedMetaTraitValues,
      uUtils.areTwoObjectsEqual,
      true
    )
  ) {
    consol.log(
      "[1;33m " +
        `ksfc traverseAndRecordInflections >>unkeyed metaTraitValue clause<<. Final Clause A. Setting inflectionKey to "${selectedConvertedMetaTraitValue}". Do not need to adjust stCh as all converted traitValues for this metaTraitValue result in the same from source, eg "allPersonalSingularGenders" = m --> "you", f --> "you". Will now continue with main fxn.` +
        "[0m"
    );

    return selectedConvertedMetaTraitValue;
  } else {
    consol.log(
      `aqsa traverseAndRecordInflections >>unkeyed metaTraitValue clause<<. 
      Final Clause B. Trying to set a metaTraitValue to one of its convertedMetaTraitValues. 
      But the drilled inflectorValues were not ultimately the same in source, therefore we cannot obey doNotSpecify. 
      For example, the stCh asks for allPersonalSingularGenders, 
      and while sometimes the results could be m --> "I", f --> "I", in which case it would have gone to Final Clause A. 
      But in this case, eg, m1 --> kupiłem, f --> kupiłam. So they are not the same. 
      So I'll pick one, and make sure to set the stCh to acknowledge this.`
    );

    structureChunk.gender = [selectedConvertedMetaTraitValue];

    return selectedConvertedMetaTraitValue;
  }
};

exports.doesThisInflectionKeyHoldUniqueInflectionValueInLObj = (
  lObj,
  chosenInflectionCategory,
  drillPath
) => {
  let inflectionChain =
    refObj.lemmaObjectTraitKeys[gpUtils.getLanguageFromLemmaObject(lObj)]
      .inflectionChains[gpUtils.getWordtypeLObj(lObj)];

  function getInflectionKeyFromDrillPath(inflectionCategory, drillPath) {
    let inflectionKey = drillPath.find(
      (arr) => arr[0] === inflectionCategory
    )[1];
    return inflectionKey;
  }

  let chosenInflectionKey = getInflectionKeyFromDrillPath(
    chosenInflectionCategory,
    drillPath
  );

  let lObjAtRelevantLevel = uUtils.copyWithoutReference(lObj.inflections);

  let stopSwitch = false;

  inflectionChain.forEach((inflectionCategory) => {
    if (inflectionCategory === chosenInflectionCategory) {
      stopSwitch = true;
    }

    if (stopSwitch) {
      return;
    }

    let inflectionKey = getInflectionKeyFromDrillPath(
      inflectionCategory,
      drillPath
    );

    if (lObjAtRelevantLevel[inflectionKey]) {
      lObjAtRelevantLevel = lObjAtRelevantLevel[inflectionKey];
    } else {
      consol.throw(
        "mlck #ERR doesThisInflectionKeyHoldUniqueInflectionValueInLObj. That inflectionKey was not on lObj at this level."
      );
    }
  });

  let allInflectionKeysAtThisLevel = Object.keys(lObjAtRelevantLevel);

  consol.log({ allInflectionKeysAtThisLevel });

  if (!allInflectionKeysAtThisLevel.includes(chosenInflectionKey)) {
    consol.throw(
      "mlcl #ERR doesThisInflectionKeyHoldUniqueInflectionValueInLObj. The chosen inflectionKey should have been in lObj at this level."
    );
  }

  let chosenInflectionValue = lObjAtRelevantLevel[chosenInflectionKey];

  let allOtherInflectionValuesAtThisLevel = allInflectionKeysAtThisLevel
    .filter((inflectionKey) => inflectionKey !== chosenInflectionKey)
    .map((inflectionKey) => lObjAtRelevantLevel[inflectionKey]);

  let itIsUnique = !uUtils.isThisObjectInThisArrayOfObjects(
    chosenInflectionValue,
    allOtherInflectionValuesAtThisLevel
  );

  return itIsUnique;
};
