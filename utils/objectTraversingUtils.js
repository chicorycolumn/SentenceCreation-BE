const gpUtils = require("./generalPurposeUtils.js");
const lfUtils = require("./lemmaFilteringUtils.js");
const refObj = require("./referenceObjects.js");

exports.findMatchingLemmaObjectThenWord = (
  structureChunk,
  words,
  errorInSentenceCreation,
  currentLanguage,
  questionLanguage,
  kumquat
) => {
  console.log(
    currentLanguage +
      ">>>>>>>>>>>>>>>>>>>>>>OT.findMatchingLem start > structureChunk:",
    structureChunk
  );

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  let selectedFormsArray = [];
  let arrayOfAllPossibleOutputUnits = [];

  //STEP ONE: : Fx-PW: Pathway for Fixed pieces.
  if (structureChunk.wordtype === "fixed") {
    console.log("##Fx-PW");
    return [
      {
        selectedLemmaObject: {},
        selectedWord: structureChunk.value,
        structureChunk,
      },
    ];
  }

  //STEP TWO: Filter lemmaObjects by specificIds OR specificLemmas OR andTags and selectors.
  let source = words[gpUtils.giveSetKey(structureChunk.wordtype)];
  let matches = [];

  if (structureChunk.specificIds && structureChunk.specificIds.length) {
    matches = source.filter((lObj) =>
      structureChunk.specificIds.includes(lObj.id)
    );
  } else if (
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    matches = source.filter((lObj) =>
      structureChunk.specificLemmas.includes(lObj.lemma)
    );
  } else {
    matches = lfUtils.filterByAndTagsAndOrTags(source, structureChunk);
    matches = lfUtils.filterBySelectors(
      currentLanguage,
      structureChunk,
      matches
    );
  }

  langUtils.preprocessLemmaObjects(matches, structureChunk);

  //STEP THREE: Return result array immediately if uninflected or ad hoc.

  let adhocInflectorRef = refObj.adhocInflectors[currentLanguage];

  //THREE (A): Ad-PW: Pathway for Ad hoc forms.
  if (Object.keys(adhocInflectorRef).includes(structureChunk.wordtype)) {
    Object.keys(adhocInflectorRef).forEach((adhocWordtype) => {
      //Epsilon say:
      //This seems strange, the above, to go through every wordtype,
      //when actually, surely only the wordtype that matches the current structureChunk should be focused on.
      let adhocInflectorKeys = adhocInflectorRef[adhocWordtype];

      adhocInflectorKeys.forEach((adhocInflectorKey) => {
        if (
          structureChunk[adhocInflectorKey] &&
          structureChunk[adhocInflectorKey].length
        ) {
          console.log("##Ad-PW");
          if (kumquat) {
            matches.forEach((selectedLemmaObject) => {
              let adhocArr = langUtils.generateAdhocForms(
                structureChunk,
                selectedLemmaObject,
                currentLanguage
              );

              //ALPHA: Keep a record of what adhoc or uninflected you chose, for each
              //because that will be needed to update the structureChunk.

              adhocArr.forEach((selectedWord) => {
                selectedFormsArray.push({
                  selectedWordArr: [selectedWord],
                  selectedLemmaObject,
                });
              });
            });
          } else {
            let selectedLemmaObject = gpUtils.selectRaandom(matches);

            let adhocArr = langUtils.generateAdhocForms(
              structureChunk,
              selectedLemmaObject,
              currentLanguage
            );

            let selectedWord = gpUtils.selectRaandom(adhocArr);

            selectedFormsArray.push({
              selectedWordArr: [selectedWord],
              selectedLemmaObject,
            });
          }
        }
      });
    });
  }

  //THREE (B): Un-PW: Pathway for Uninflected forms.
  if (structureChunk.form && structureChunk.form.length) {
    Object.keys(refObj.uninflectedForms[currentLanguage]).forEach(
      (wordtype) => {
        if (structureChunk.wordtype === wordtype) {
          let uninflectedValues =
            refObj.uninflectedForms[currentLanguage][wordtype];

          let requestedUninflectedForms = structureChunk.form.filter(
            (requestedForm) => {
              return uninflectedValues.includes(requestedForm);
            }
          );

          if (requestedUninflectedForms.length) {
            console.log("##Un-PW");
            if (kumquat) {
              requestedUninflectedForms.forEach((selectedUninflectedForm) => {
                let matchesByUninflectedForm = matches.filter((lObj) => {
                  return lObj.inflections[selectedUninflectedForm];
                });

                matchesByUninflectedForm.forEach((selectedLemmaObject) => {
                  let selectedWord =
                    selectedLemmaObject.inflections[selectedUninflectedForm];

                  selectedFormsArray.push({
                    selectedWordArr: [selectedWord],
                    selectedLemmaObject,
                  });
                });
              });
            } else {
              let selectedUninflectedForm = gpUtils.selectRaandom(
                requestedUninflectedForms
              );

              let matchesByUninflectedForm = matches.filter((lObj) => {
                return lObj.inflections[selectedUninflectedForm];
              });

              let selectedLemmaObject = gpUtils.selectRaandom(
                matchesByUninflectedForm
              );

              let selectedWord =
                selectedLemmaObject.inflections[selectedUninflectedForm];

              selectedFormsArray.push({
                selectedWordArr: [selectedWord],
                selectedLemmaObject,
              });
            }
          }
        }
      }
    );
  }

  if (selectedFormsArray.length) {
    selectedFormsArray.forEach((selectedFormObject) => {
      let { selectedWordArr, selectedLemmaObject } = selectedFormObject;

      selectedWordArr.forEach((selectedWord) => {
        let outputUnit = exports.createOutputUnit(
          errorInSentenceCreation,
          null,
          selectedWord,
          gpUtils.copyWithoutReference(structureChunk),
          selectedLemmaObject
        );

        arrayOfAllPossibleOutputUnits.push(outputUnit);
      });
    });

    return arrayOfAllPossibleOutputUnits;
  }

  //STEP FOUR: If-PW: Pathway for inflected forms, return word after selecting by drilling down through lemma object.

  //Epsilonman say: At this point, parse the tenseDescription, if present, to Aspect and Tense
  //Make as many copies of the structureChunk as there are tenseDescriptions.

  let structureChunks = [structureChunk];

  if (
    structureChunk.tenseDescription &&
    structureChunk.tenseDescription.length
  ) {
    let adjustedStructureChunks = langUtils.adjustTenseDescriptions(
      structureChunk
    );
    if (adjustedStructureChunks) {
      structureChunks = adjustedStructureChunks;
    }
  }

  structureChunks.forEach((structureChunk) => {
    let matchesCopy = matches.slice(0);

    matchesCopy = lfUtils.filterBySelectors(
      currentLanguage,
      structureChunk,
      matchesCopy
    );

    matchesCopy = lfUtils.filterOutDeficientLemmaObjects(
      matchesCopy,
      structureChunk,
      currentLanguage
    );

    if (!matchesCopy.length) {
      // errorInSentenceCreation.errorMessage =
      //   "No matching lemma objects were found.";
      return false;
    }

    console.log("##If-PW");

    if (kumquat) {
      matchesCopy.forEach((selectedLemmaObject) => {
        let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
          selectedLemmaObject,
          structureChunk,
          currentLanguage,
          kumquat
        );

        subArrayOfOutputUnits.forEach((unit) => {
          let { errorInDrilling, selectedWordArray, drillPath } = unit;

          selectedWordArray.forEach((selectedWord) => {
            let outputUnit = exports.createOutputUnit(
              errorInSentenceCreation,
              errorInDrilling,
              selectedWord,
              structureChunk,
              selectedLemmaObject,
              drillPath
            );

            // console.log("-------------------------------v");
            // console.log("I found this output unit:");
            // console.log(outputUnit);
            // console.log("-------------------------------^");
            arrayOfAllPossibleOutputUnits.push(outputUnit);
          });
        });
      });
    } else {
      let selectedLemmaObject = gpUtils.selectRaandom(matchesCopy);

      let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
        selectedLemmaObject,
        structureChunk,
        currentLanguage,
        kumquat
      );

      if (!subArrayOfOutputUnits || !subArrayOfOutputUnits.length) {
        return false;
      }

      if (subArrayOfOutputUnits.length !== 1) {
        throw "That's strange. This was expected to be an array of only one, here near the end of OT:findMatchingLemmaObjectThenWord";
      }

      let unit = subArrayOfOutputUnits[0];

      let { errorInDrilling, selectedWordArray, drillPath } = unit;

      if (!selectedWordArray || !selectedWordArray.length) {
        errorInSentenceCreation.errorMessage =
          "No lemma objects were found for these specifications.";
        return false;
      }

      let selectedWord = selectedWordArray[0];

      let outputUnit = exports.createOutputUnit(
        errorInSentenceCreation,
        errorInDrilling,
        selectedWord,
        structureChunk,
        selectedLemmaObject,
        drillPath
      );

      // console.log("-------------------------------v");
      // console.log("I found this output unit:");
      // console.log(outputUnit);
      // console.log("-------------------------------^");
      arrayOfAllPossibleOutputUnits.push(outputUnit);
    }
  });

  if (!arrayOfAllPossibleOutputUnits.length) {
    if (!errorInSentenceCreation.errorMessage) {
      errorInSentenceCreation.errorMessage =
        "The requested inflections were not found in the selected lemma objects.";
    }
    return false;
  }

  if (!kumquat && arrayOfAllPossibleOutputUnits.length > 1) {
    console.log(
      "At the end of OT.findMatchingLem, the arrayOfAllPossibleOutputUnits array had more than one member. This should only be because of tenseDescription parsing."
    );
    console.log("arrayOfAllPossibleOutputUnits", arrayOfAllPossibleOutputUnits);
    arrayOfAllPossibleOutputUnits = [
      gpUtils.selectRaandom(arrayOfAllPossibleOutputUnits),
    ];
  }

  console.log("ww------------------------------------");
  console.log(arrayOfAllPossibleOutputUnits.length);
  console.log(arrayOfAllPossibleOutputUnits[0].structureChunk);

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
    errorInSentenceCreation.errorMessage =
      "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
    return false;
  }

  return {
    selectedLemmaObject,
    selectedWord,
    drillPath,
    structureChunk,
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

exports.extractNestedRoutes = (source) => {
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
    if (typeof source !== "object" || Array.isArray(source)) {
      let arrCopy = arr.slice();
      arr.pop();
      return arrCopy;
    } else {
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
    }
  }
};

exports.findObjectInNestedObject = (source, identifyingData, alsoReturnKey) => {
  let res = {};
  recursivelySearch(source, identifyingData);
  return alsoReturnKey ? res : res.value;

  function recursivelySearch(source, identifyingData) {
    if (res.value) {
      return;
    }

    Object.keys(source).forEach((key) => {
      let value = source[key];
      if (gpUtils.isObject(value)) {
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
