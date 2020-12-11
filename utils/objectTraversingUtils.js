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
  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");
  // let lemmaObjectExtractions;
  // let selectedLemmaObject;
  // let selectedWord;
  let selectedFormsArray = [];
  let arrayOfAllPossibleOutputUnits = [];

  console.log(
    "findMatchingLemmaObjectThenWord fxn has been given these arguments:",
    {
      structureChunk,
      words,
      errorInSentenceCreation,
      currentLanguage,
      questionLanguage,
      kumquat,
    }
  );

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

  //STEP TWO: Filter lemmaObjects by specificIds OR specificLemmas OR tags and selectors.
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
    matches = lfUtils.filterByTag(source, structureChunk.tags);

    let selectors =
      refObj.lemmaObjectFeatures[currentLanguage].selectors[
        structureChunk.wordtype
      ];
    if (selectors) {
      selectors.forEach((selector) => {
        matches = lfUtils.filterByKey(matches, structureChunk, selector);
      });
    }
  }

  langUtils.preprocessLemmaObjects(matches, structureChunk);

  //STEP THREE: Return result array immediately if uninflected or ad hoc.

  let adhocInflectorRef = refObj.adhocInflectors[currentLanguage];

  //THREE (A): Ad-PW: Pathway for Ad hoc forms.
  if (Object.keys(adhocInflectorRef).includes(structureChunk.wordtype)) {
    Object.keys(adhocInflectorRef).forEach((adhocWordtype) => {
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

  if (selectedFormsArray && selectedFormsArray.length) {
    selectedFormsArray.forEach((selectedFormObject) => {
      let { selectedWordArr, selectedLemmaObject } = selectedFormObject;

      selectedWordArr.forEach((selectedWord) => {
        arrayOfAllPossibleOutputUnits.push(
          exports.createOutputUnit(
            errorInSentenceCreation,
            null,
            selectedWord,
            structureChunk,
            selectedLemmaObject
          )
        );
      });
    });

    return arrayOfAllPossibleOutputUnits;
  }

  //STEP FOUR: If-PW: Pathway for inflected forms, return word after selecting by drilling down through lemma object.

  matches = lfUtils.filterOutDeficientLemmaObjects(
    matches,
    structureChunk,
    currentLanguage
  );

  if (!matches.length) {
    errorInSentenceCreation.errorMessage =
      "No matching lemma objects were found.";
    return false;
  }

  console.log("##If-PW");

  if (kumquat) {
    matches.forEach((selectedLemmaObject) => {
      let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
        selectedLemmaObject,
        structureChunk,
        currentLanguage,
        kumquat
      );

      if (!subArrayOfOutputUnits || !subArrayOfOutputUnits.length) {
        errorInSentenceCreation.errorMessage =
          "The requested inflections were not found in the selected lemma objects.";
        return false;
      }

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

          arrayOfAllPossibleOutputUnits.push(outputUnit);
        });
      });
    });

    return arrayOfAllPossibleOutputUnits;
  } else {
    let selectedLemmaObject = gpUtils.selectRaandom(matches);

    let subArrayOfOutputUnits = lfUtils.filterWithinSelectedLemmaObject(
      selectedLemmaObject,
      structureChunk,
      currentLanguage,
      kumquat
    );

    if (!subArrayOfOutputUnits || !subArrayOfOutputUnits.length) {
      errorInSentenceCreation.errorMessage =
        "The requested inflections were not found in the selected lemma objects.";
      return false;
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

    arrayOfAllPossibleOutputUnits.push(outputUnit);
    return arrayOfAllPossibleOutputUnits;
  }
};

exports.createOutputUnit = (
  errorInSentenceCreation,
  errorInDrilling,
  selectedWord,
  structureChunk,
  selectedLemmaObject,
  drillPath
) => {
  // console.log("createOutputUnit fxn was given these arguments:", {
  //   errorInSentenceCreation,
  //   errorInDrilling,
  //   selectedWord,
  //   structureChunk,
  //   selectedLemmaObject,
  //   drillPath,
  // });

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

  //   if (typeof source === "string") {
  //     return {
  //       selectedWord: source,
  //       updatedStructureChunk: structureChunk,
  //       selectedLemmaObject,
  //     };
  //   } else {
  //     return {
  //       selectedWord: gpUtils.selectRaandom(source),
  //       updatedStructureChunk: structureChunk,
  //       selectedLemmaObject,
  //     };
  //   }
  // }

  // if (!lemmaObjectExtractions || !lemmaObjectExtractions.selectedWord) {
  //   errorInSentenceCreation.errorMessage =
  //     "A lemma object was indeed selected, but no word was found at the end of the give inflection chain.";
  //   return false;
  // } else {
  // let {
  //   selectedWord,
  //   updatedStructureChunk,
  //   selectedLemmaObject,
  // } = lemmaObjectExtractions;

  // outputArr.push({
  //   selectedLemmaObject,
  //   selectedWord,
  //   structureChunk: updatedStructureChunk,
  // });
  // }
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
