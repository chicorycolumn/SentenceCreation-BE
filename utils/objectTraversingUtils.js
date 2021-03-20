const gpUtils = require("./generalPurposeUtils.js");
const clUtils = require("./zerothOrder/consoleLoggingUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
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
  pleaseDontSpecify,
  pleaseDontSpecifyPronounGender,
  isPHD
) => {
  console.log(
    "[1;33m " +
      `ligw ot:findMatchingLemmaObjectThenWord for stCh: "${structureChunk.chunkId}"` +
      "[0m"
  );

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let selectedFormsArray = [];
  let arrayOfAllPossibleOutputUnits = [];
  let temporaryMultipleMode;

  let allInflectorsForThisWordtype =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  //STEP ONE: Fx-PW: Pathway for Fixed pieces.
  if (structureChunk.wordtype === "fixed") {
    clUtils.consoleLogPW("##Fx-PW", structureChunk, multipleMode);

    return [
      {
        selectedLemmaObject: {},
        selectedWord: structureChunk.value,
        structureChunk,
      },
    ];
  }

  //STEP TWO: Filter lemmaObjects (by specificIds OR specificLemmas OR andTags and selectors).
  let source = words[gpUtils.giveSetKey(structureChunk.wordtype)];

  langUtils.preprocessLemmaObjectsMinor(source);
  let matches = [];

  if (structureChunk.specificIds && structureChunk.specificIds.length) {
    console.log(
      "obbm ot:findMatchingLemmaObjectThenWord GGGet matches by specific IDs:",
      structureChunk.specificIds
    );
    matches = source.filter((lObj) =>
      structureChunk.specificIds.includes(lObj.id)
    );
    if (!matches.length) {
      console.log(
        "[1;31m " +
          `czdi ot:findMatchingLemmaObjectThenWord No matches after Get matches by specific IDs.` +
          "[0m"
      );
    }
  } else if (
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    console.log(
      "yyeq ot:findMatchingLemmaObjectThenWord GGGet matches by specific Lemmas:",
      structureChunk.specificLemmas
    );
    console.log(
      "yyeq ot:findMatchingLemmaObjectThenWord source",
      source.map((lObj) => lObj.lemma)
    );
    matches = source.filter((lObj) =>
      structureChunk.specificLemmas.includes(lObj.lemma)
    );
    if (!matches.length) {
      console.log(
        "[1;31m " +
          `jybt ot:findMatchingLemmaObjectThenWord No matches after Get matches by specific Lemmas.` +
          "[0m"
      );
    }
  } else {
    console.log(
      "vqkx ot:findMatchingLemmaObjectThenWord GGGet matches by Tags and Selectors."
    );
    matches = lfUtils.filterByAndTagsAndOrTags(source, structureChunk);

    if (!matches.length) {
      console.log(
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
      console.log(
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
  let adhocInflectorRef = refObj.adhocInflectors[currentLanguage];
  let adhocFormRef = refObj.adhocForms[currentLanguage];

  //    THREE (A): Ad-PW: Pathway for Adhoc: both Forms and Inflections.

  //    (Ad-PW-F): Pathway for Adhoc FORMS.
  if (
    structureChunk.form &&
    structureChunk.form.length &&
    Object.keys(adhocFormRef).includes(structureChunk.wordtype) &&
    structureChunk.form.some((selectedForm) =>
      adhocFormRef[structureChunk.wordtype].includes(selectedForm)
    )
  ) {
    clUtils.consoleLogPW("##Ad-PW-F", structureChunk, multipleMode);

    if (multipleMode) {
      matches.forEach((selectedLemmaObject) => {
        let adhocArr = langUtils.generateAdhocForms(
          "form",
          gpUtils.copyWithoutReference(structureChunk),
          selectedLemmaObject,
          currentLanguage
        );

        adhocArr.forEach((adhocResultObj) => {
          let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

          otUtils.stripOutFeatures(
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
      let selectedLemmaObject = gpUtils.selectRandom(matches);

      let adhocArr = langUtils.generateAdhocForms(
        "form",
        gpUtils.copyWithoutReference(structureChunk),
        selectedLemmaObject,
        currentLanguage
      );

      if (!adhocArr || !adhocArr.length) {
        throw "No members were found in the adhocArr from OT:findMatching, path 3A-1 (ie form).";
      }

      let selectedAdhocResultObj = gpUtils.selectRandom(adhocArr);

      let { selectedWordArr, structureChunkUpdated } = selectedAdhocResultObj;

      otUtils.stripOutFeatures(
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
  if (Object.keys(adhocInflectorRef).includes(structureChunk.wordtype)) {
    let adhocInflectorKeys = adhocInflectorRef[structureChunk.wordtype];

    adhocInflectorKeys.forEach((adhocInflectorKey) => {
      if (
        structureChunk[adhocInflectorKey] &&
        structureChunk[adhocInflectorKey].length
      ) {
        clUtils.consoleLogPW("##Ad-PW-I", structureChunk, multipleMode);

        if (multipleMode) {
          matches.forEach((selectedLemmaObject) => {
            let adhocArr = langUtils.generateAdhocForms(
              adhocInflectorKey,
              gpUtils.copyWithoutReference(structureChunk),
              selectedLemmaObject,
              currentLanguage
            );

            adhocArr.forEach((adhocResultObj) => {
              let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

              otUtils.stripOutFeatures(
                currentLanguage,
                structureChunkUpdated,
                "Ad-PW-I"
              );

              selectedFormsArray.push({
                selectedWordArr,
                selectedLemmaObject,
                structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
              });
            });
          });
        } else {
          let selectedLemmaObject = gpUtils.selectRandom(matches);

          let adhocArr = langUtils.generateAdhocForms(
            adhocInflectorKey,
            gpUtils.copyWithoutReference(structureChunk),
            selectedLemmaObject,
            currentLanguage
          );

          if (!adhocArr || !adhocArr.length) {
            throw "No members were found in the adhocArr from OT:findMatching, path 3A-2 ie Ad-PW-I (ie tenseDescription).";
          }

          let selectedAdhocResultObj = gpUtils.selectRandom(adhocArr);

          let {
            selectedWordArr,
            structureChunkUpdated,
          } = selectedAdhocResultObj;

          otUtils.stripOutFeatures(
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
  //So, activeAdjectival, anteriorAdverbial, those kinds of things, that are indeed labeled with the Form key.
  //Remember, within eg a verb lobj, available Forms are infinitive, verbal, activeAdjectival, anterior...

  if (structureChunk.form && structureChunk.form.length) {
    Object.keys(refObj.uninflectedForms[currentLanguage]).forEach(
      (wordtype) => {
        if (structureChunk.wordtype === wordtype) {
          let uninflectedValues =
            refObj.uninflectedForms[currentLanguage][wordtype];

          let requestedUninflectedForms = structureChunk.form.filter(
            (requestedForm) => uninflectedValues.includes(requestedForm)
          );

          if (requestedUninflectedForms.length) {
            clUtils.consoleLogPW("##Un-PW", structureChunk, multipleMode);

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
                    clUtils.throw(
                      "bnle ot:findMatching Natasha, action required."
                    );
                  }

                  //We here update a copy of structureChunk
                  let structureChunkUpdatedByAdhocOrUninflected = gpUtils.copyWithoutReference(
                    structureChunk
                  );

                  structureChunkUpdatedByAdhocOrUninflected.form = [
                    selectedUninflectedForm,
                  ];

                  otUtils.stripOutFeatures(
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
              let selectedUninflectedForm = gpUtils.selectRandom(
                requestedUninflectedForms
              );

              let matchesByUninflectedForm = matches.filter(
                (lObj) => lObj.inflections[selectedUninflectedForm]
              );

              let selectedLemmaObject = gpUtils.selectRandom(
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
                clUtils.throw(
                  "wrha findMatching Natasha, some action required."
                );
              }

              //We here update a copy of structureChunk
              let structureChunkUpdatedByAdhocOrUninflected = gpUtils.copyWithoutReference(
                structureChunk
              );

              structureChunkUpdatedByAdhocOrUninflected.form = [
                selectedUninflectedForm,
              ];

              otUtils.stripOutFeatures(
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

  console.log(
    "ecse ot:findMatchingLemmaObjectThenWord selectedFormsArray",
    selectedFormsArray
  );

  if (selectedFormsArray.length) {
    selectedFormsArray.forEach((selectedFormObject) => {
      let {
        selectedWordArr,
        selectedLemmaObject,
        structureChunkUpdatedByAdhocOrUninflected,
      } = selectedFormObject;

      selectedWordArr.forEach((selectedWord) => {
        let outputUnit = otUtils.createOutputUnit(
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
  let structureChunksAdjusted = langUtils.adjustStructureChunksInIfPW(
    structureChunk
  );

  let structureChunks = structureChunksAdjusted || [structureChunk];

  structureChunks.forEach((structureChunk) => {
    console.log(
      "mxcm ot:findMatchingLemmaObjectThenWord structureChunk",
      structureChunk
    );

    let matchesCopy = matches.slice(0);

    if (!matchesCopy.length) {
      console.log(
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
      console.log(
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
      console.log(
        "[1;31m " +
          "#WARN yqtf ot:findMatchingLemmaObjectThenWord. It appears no matching lemma objects were found in OT:findMatching" +
          "[0m"
      );

      return false;
    }

    //    STEP FOUR-B: Getting the inflected word.

    clUtils.consoleLogPW("##If-PW", structureChunk, multipleMode);

    if (multipleMode) {
      console.log("iksf ot:findMatchingLemmaObjectThenWord");
      matchesCopy.forEach((selectedLemmaObject) => {
        console.log(
          "uzsw ot:findMatchingLemmaObjectThenWord selectedLemmaObject",
          selectedLemmaObject
        );

        if (outputArray) {
          console.log(
            "[1;33m " +
              `nvnĸ findMatching outputArray: [${outputArray.map(
                (x) => x.selectedWord
              )}]` +
              "[0m"
          );
        } else {
          console.log("[1;33m " + `nvnĸ findMatching outputArray null` + "[0m");
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
                console.log("[1;33m " + `bufw findMatching Answer IS STRING` + "[0m");
              } else if (Array.isArray(selectedWord)) {
                console.log("[1;33m " + `bufw findMatching Answer IS ARRAY` + "[0m");
                console.log(selectedWord);
                clUtils.throw("bufw findMatching should not have been array.");
              } else if (gpUtils.isTerminusObject(selectedWord)) {
                console.log("[1;33m " + `bufw findMatching Answer IS TOBJ` + "[0m");
              }
            }

            if (
              gpUtils.isTerminusObject(selectedWord) &&
              !selectedWord.processOnlyAtEnd
            ) {
              console.log(
                "zjnv ot:findMatchingLemmaObjectThenWord Natasha, action here required."
              );
            }

            if (
              typeof selectedWord === "string" ||
              (gpUtils.isTerminusObject(selectedWord) &&
                selectedWord.processOnlyAtEnd)
            ) {
              let outputUnit = otUtils.createOutputUnit(
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
                let outputUnit = otUtils.createOutputUnit(
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
      console.log("xzjc ot:findMatchingLemmaObjectThenWord");
      let selectedLemmaObject = gpUtils.selectRandom(matchesCopy);

      //nownow
      if (!pleaseDontSpecify) {
        //PDSXblue
        allLangUtils.decantMGNsBeforeOutputArray(
          structureChunk,
          selectedLemmaObject,
          currentLanguage
        );
      } else {
        console.log(
          "[1;30m " +
            `-----------------------------------------------------------------------------------------------------------------------------------PDSblue` +
            "[0m"
        );
      }

      console.log(
        "fxdn ot:findMatchingLemmaObjectThenWord If-PW selectedLemmaObject for " +
          structureChunk.chunkId
      );
      console.log(
        "fxdn ot:findMatchingLemmaObjectThenWord",
        selectedLemmaObject.inflections
      );

      console.log("- * - * - * - * - * - * - * - * - * - * - * - * -");
      if (outputArray) {
        console.log(
          "[1;33m " +
            `nvnk findMatching outputArray: [${outputArray.map(
              (x) => x.selectedWord
            )}]` +
            "[0m"
        );
      } else {
        console.log("[1;33m " + `nvnk findMatching outputArray null` + "[0m");
      }
      console.log({
        selectedLemmaObject,
        structureChunk,
        currentLanguage,
        multipleMode,
        outputArray,
      });
      console.log("- * - * - * - * - * - * -");

      let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
        selectedLemmaObject,
        structureChunk,
        currentLanguage,
        multipleMode,
        outputArray,
        isPHD
      );

      if (!subArrayOfOutputUnits || !subArrayOfOutputUnits.length) {
        console.log("uyie");
        return false;
      }

      console.log(
        "mrnp ot:findMatchingLemmaObjectThenWord subArrayOfOutputUnits",
        subArrayOfOutputUnits
      );

      //PDSXred
      // If the outputunits differ only in gender, and pleaseDontSpecifyPronounGender is true,
      // then merge the outputunits, so ENG Q "I wrote" can be POL A ["Napisałem.", "Napisałam."]
      // #pal11B-03a, #pal11B-03b
      if (
        pleaseDontSpecifyPronounGender &&
        otUtils.doDrillPathsDifferOnlyByGender(subArrayOfOutputUnits)
      ) {
        console.log(
          "[1;30m " +
            `-----------------------------------------------------------------------------------------------------------------------------------PDSred` +
            "[0m"
        );
        console.log("kpos PDSred subArrayOfOutputUnits before adjustment.");
        subArrayOfOutputUnits.forEach((x) => {
          console.log(x);
        });

        let mergedGenderOutputUnit = otUtils.createMergedGenderOutputUnit(
          subArrayOfOutputUnits,
          currentLanguage
        );

        subArrayOfOutputUnits = [mergedGenderOutputUnit];

        console.log("cxmo PDSred subArrayOfOutputUnits after adjustment.");
        subArrayOfOutputUnits.forEach((x) => {
          console.log(x);
        });
      }

      console.log(
        "sfmo ot:findMatchingLemmaObjectThenWord subArrayOfOutputUnits"
      );
      subArrayOfOutputUnits.forEach((x) => {
        console.log(x);
      });

      let unit = gpUtils.selectRandom(subArrayOfOutputUnits); //epsilon - What is this selran doing?

      let { errorInDrilling, selectedWordArray, drillPath } = unit;

      if (!selectedWordArray || !selectedWordArray.length) {
        console.log(
          "whhe ot:findMatchingLemmaObjectThenWord errorInSentenceCreation.errorMessage: No lemma objects were found for these specifications."
        );
        errorInSentenceCreation.errorMessage =
          "whhe ot:findMatchingLemmaObjectThenWord No lemma objects were found for these specifications.";
        return false;
      }

      let selectedItem = gpUtils.selectRandom(selectedWordArray);
      let selectedWord;

      if (!"natasha findMatching Question mode") {
        if (typeof selectedItem === "string") {
          console.log(
            "[1;33m " +
              `ozdj ot:findMatchingLemmaObjectThenWord findMatching Question IS STRING` +
              "[0m"
          );
        } else if (Array.isArray(selectedItem)) {
          console.log(
            "[1;33m " +
              `ozdj ot:findMatchingLemmaObjectThenWord findMatching Question IS ARRAY` +
              "[0m"
          );
          console.log("jxny ot:findMatchingLemmaObjectThenWord", selectedItem);
          clUtils.throw(
            "jxny ot:findMatchingLemmaObjectThenWord should not have been array."
          );
        } else if (gpUtils.isTerminusObject(selectedItem)) {
          console.log(
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

        selectedWord = gpUtils.selectRandom(additionalWords);
      }

      let outputUnit = otUtils.createOutputUnit(
        errorInSentenceCreation,
        errorInDrilling,
        selectedWord,
        structureChunk,
        selectedLemmaObject,
        drillPath
      );

      arrayOfAllPossibleOutputUnits.push(outputUnit);
    }
  });

  if (!arrayOfAllPossibleOutputUnits.length) {
    if (!errorInSentenceCreation.errorMessage) {
      console.log(
        "yzcq ot:findMatchingLemmaObjectThenWord errorInSentenceCreation.errorMessage: The rrrequested inflections were not found in the selected lemma objects."
      );
      console.log(
        "yzcq ot:findMatchingLemmaObjectThenWord structureChunk",
        structureChunk
      );
      errorInSentenceCreation.errorMessage =
        "yzcq The rrrequested inflections were not found in the selected lemma objects.";
    }
    return false;
  }

  if (!multipleMode && arrayOfAllPossibleOutputUnits.length > 1) {
    arrayOfAllPossibleOutputUnits = [
      gpUtils.selectRandom(arrayOfAllPossibleOutputUnits),
    ];
  }

  return arrayOfAllPossibleOutputUnits;
};

exports.createOutputUnit = (
  errorInSentenceCreation,
  errorInDrilling,
  selectedWord,
  structureChunk,
  selectedLemmaObject,
  drillPath
) => {
  if (errorInDrilling || !selectedWord) {
    console.log(
      "acsm createOutputUnit errorInSentenceCreation.errorMessage: A lemma object was indeed selected, but no word was found at the end of the give inflection chain."
    );
    errorInSentenceCreation.errorMessage =
      "acsm createOutputUnit A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
    return false;
  }

  return {
    selectedLemmaObject,
    selectedWord,
    drillPath,
    structureChunk: structureChunk,
  };
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

exports.extractNestedRoutes = (source, includeTerminusObjectKeys) => {
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
    } else if (gpUtils.isKeyValueTypeObject(source)) {
      Object.keys(source).forEach((key) => {
        if (!source[key]) {
          delete source[key];
          return;
        }

        arr.push(key);

        let result = recursivelyMapRoutes(arr, source[key]);

        if (result) {
          routesByNesting.push(result);
        }
      });
      arr.pop();
    } else {
      clUtils.throw(
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
  return alsoReturnKey ? res : res.value;

  function recursivelySearch(source, identifyingData) {
    if (res.value) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (
        (!alsoSearchArrays && gpUtils.isKeyValueTypeObject(value)) ||
        (alsoSearchArrays && gpUtils.isKeyValueTypeObjectOrArray(value))
      ) {
        if (gpUtils.doKeyValuesMatch(value, identifyingData)) {
          res.value = value;
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
  return alsoReturnKey ? res : res.value;

  function recursivelySearch(source, identifyingData) {
    if (res.value) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (typeof value === "object" && value !== null) {
        if (gpUtils.doKeyValuesMatch(value, identifyingData)) {
          res.value = value;
          res.key = key;
        } else {
          recursivelySearch(value, identifyingData);
        }
      }
    });
  }
};

exports.giveRoutesAndTerminalValuesFromObject = (obj) => {
  console.log(
    "[1;35m " +
      `xlbj ot:giveRoutesAndTerminalValuesFromObject-----------------------` +
      "[0m"
  );

  const nestedRoutes = otUtils.extractNestedRoutes(obj).routesByNesting;

  let resArr = [];

  nestedRoutes.forEach((nestedRoute) => {
    let value = otUtils.giveValueFromObjectByRoute(obj, nestedRoute);

    //Splits terminal values that are arrays, into different unit, with identical routes.

    //What is happening here exactly?

    if (!"natasha giveRoutes???") {
      if (typeof value === "string") {
        console.log("[1;33m " + `nayq giveRoutes??? IS STRING` + "[0m");
      } else if (Array.isArray(value)) {
        console.log("[1;33m " + `nayq giveRoutes??? IS ARRAY` + "[0m");
        console.log("nayq", nestedRoute, value);
        clUtils.throw("nayq giveRoutes should not have been array.");
      } else if (gpUtils.isTerminusObject(value)) {
        console.log("[1;33m " + `nayq giveRoutes??? IS TOBJ` + "[0m");
      }
    }

    if (Array.isArray(value)) {
      value.forEach((subvalue) => {
        resArr.push({ terminalValue: subvalue, nestedRoute });
      });
    } else {
      resArr.push({ terminalValue: value, nestedRoute });
    }
  });

  return resArr;
};

exports.giveValueFromObjectByRoute = (obj, route) => {
  return interiorFunction(obj, route);

  function interiorFunction(obj, route) {
    let key = route[0];
    if (!gpUtils.isKeyValueTypeObject(obj[key])) {
      return obj[key];
    } else {
      return interiorFunction(obj[key], route.slice(1));
    }
  }
};

exports.findSynhomographs = (lemmaObject, structureChunk, currentLanguage) => {
  //Gamma: How should this work re terminus objects?

  let inflectionLabelChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  let routesAndValues = otUtils.giveRoutesAndTerminalValuesFromObject(
    lemmaObject.inflections
  );

  let tempArr = [];

  routesAndValues.forEach((item) => {
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
      synhomDataUnit.inflectionLabelChain = inflectionLabelChain;

      let { inflectionPaths } = synhomDataUnit;
      let labelsWhereTheyDiffer = [];

      inflectionLabelChain.forEach((inflectionLabel, index) => {
        let allValuesForThisLabel = inflectionPaths.map((path) => path[index]);
        if (
          !allValuesForThisLabel.every(
            (value) => value === allValuesForThisLabel[0]
          )
        ) {
          labelsWhereTheyDiffer.push(inflectionLabel);
        }
      });

      synhomDataUnit.labelsWhereTheyDiffer = labelsWhereTheyDiffer;
    });

    return {
      lemmaObjectId: lemmaObject.id,
      inflectionLabelChain,
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
  console.log("ldzi findSinglePointMutationArray was given:");
  console.log("ldzi", { currentArray, positionToExamine });
  console.log("ldzi findSinglePointMutationArray arrayOfArrays", arrayOfArrays);

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
  //     -- value at position is different to currentArr
  //     -- but values at all other positions are the same as currentArr
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

exports.stripOutFeatures = (currentLanguage, structureChunk, PWlabel) => {
  let allInflectorsForThisWordtype =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  allInflectorsForThisWordtype
    .filter((inflectorKey) => !["form"].includes(inflectorKey))
    .forEach((inflectorKey) => {
      if (structureChunk["inflectorKey"]) {
        console.log(
          "[1;35m " +
            `milm stripOutFeatures Deleting "${inflectorKey}" from stCh "${structureChunk.chunkId}" because this is #${PWlabel} in ${currentLanguage}` +
            "[0m"
        );
      }

      delete structureChunk[inflectorKey];
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

exports.createMergedGenderOutputUnit = (
  subArrayOfOutputUnits,
  currentLanguage
) => {
  let mergedOutputUnit = gpUtils.copyWithoutReference(subArrayOfOutputUnits[0]);

  let newGenderArr = [
    mergedOutputUnit.drillPath.find((pathArr) => pathArr[0] === "gender")[1],
  ];

  subArrayOfOutputUnits.slice(1).forEach((outputUnit) => {
    let genderValue = outputUnit.drillPath.find(
      (pathArr) => pathArr[0] === "gender"
    )[1];

    newGenderArr.push(genderValue);
  });

  console.log(
    "dznt ot:findMatchingLemmaObjectThenWord newGenderArr",
    newGenderArr
  );

  let metaGenderRef = refObj.metaFeatures[currentLanguage]["gender"];

  let metaGenderResult;

  Object.keys(metaGenderRef).forEach((metaGenderKey) => {
    if (metaGenderResult) {
      return;
    }

    let metaGenderTranslatedArr = metaGenderRef[metaGenderKey];

    if (gpUtils.areTwoFlatArraysEqual(newGenderArr, metaGenderTranslatedArr)) {
      metaGenderResult = metaGenderKey;
    }
  });

  console.log(
    `zdxc ot:findMatchingLemmaObjectThenWord metaGenderResult: "${metaGenderResult}"`
  );

  mergedOutputUnit.drillPath.find(
    (pathArr) => pathArr[0] === "gender"
  )[1] = metaGenderResult;

  return mergedOutputUnit;
};

exports.switchMetaFeatureForAWorkableConvertedFeature = (
  inflectorLabel,
  inflectorValue,
  source,
  currentLanguage,
  consoleLogLabel
) => {
  console.log(
    "[1;33m " +
      `ivwa ` +
      consoleLogLabel +
      `. >>unkeyed metaFeature clause<<. inflectorValue is a metaFeature: "${inflectorValue}", but there is no such key on the source. So, we should check if the source has corresponding feature keys, eg allPersonalGenders -> [m, f], and if they hold all the same values, then we should let this work.` +
      "[0m"
  );

  let convertedMetaFeatures =
    refObj.metaFeatures[currentLanguage][inflectorLabel][inflectorValue];

  console.log(
    "[1;33m " + `ivwe convertedMetaFeatures [${convertedMetaFeatures}]` + "[0m"
  );

  if (!convertedMetaFeatures || !convertedMetaFeatures.length) {
    clUtils.throw(
      `ejrb #ERR traverseAndRecordInflections >>unkeyed metaFeature clause<<. Found no convertedMetaFeatures for "${inflectorValue}".`
    );
  }

  if (convertedMetaFeatures.length === 1) {
    let selectedConvertedMetaFeature = convertedMetaFeatures[0];

    console.log(
      "[1;33m " +
        `lbro traverseAndRecordInflections >>unkeyed metaFeature clause<<. Setting inflectorValue to "${selectedConvertedMetaFeature}". Will now continue with main fxn.` +
        "[0m"
    );

    return selectedConvertedMetaFeature;
  }

  let drillResultsOfConvertedMetaFeatures = [];

  convertedMetaFeatures.forEach((convertedMetaFeature) => {
    if (source[convertedMetaFeature]) {
      drillResultsOfConvertedMetaFeatures.push(source[convertedMetaFeature]);
    }
  });

  if (!drillResultsOfConvertedMetaFeatures.length) {
    clUtils.throw(
      `rlul #ERR traverseAndRecordInflections >>unkeyed metaFeature clause<<. Found no drillResultsOfConvertedMetaFeatures for convertedMetaFeatures: [${convertedMetaFeatures}].`
    );
  }

  if (
    gpUtils.checkEachSequentialPairing(
      drillResultsOfConvertedMetaFeatures,
      gpUtils.areTwoObjectsEqual,
      true
    )
  ) {
    let selectedConvertedMetaFeature = convertedMetaFeatures[0];

    console.log(
      "[1;33m " +
        `ksfc traverseAndRecordInflections >>unkeyed metaFeature clause<<. Setting inflectorValue to "${selectedConvertedMetaFeature}". Will now continue with main fxn.` +
        "[0m"
    );

    return selectedConvertedMetaFeature;
  } else {
    clUtils.throw(
      `aqsa #ERR traverseAndRecordInflections >>unkeyed metaFeature clause<<. Trying to set a metaFeature to one of its convertedFeatures. This is provided the drilled values with ultimately be the same in source, but that specifically was false.`
    );
  }
};
