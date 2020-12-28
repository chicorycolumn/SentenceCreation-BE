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
  let selectedFormsArray = [];
  let arrayOfAllPossibleOutputUnits = [];

  //STEP ONE: : Fx-PW: Pathway for Fixed pieces.
  if (structureChunk.wordtype === "fixed") {
    console.log("##Fx-PW" + " " + structureChunk.chunkId);
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
  lfUtils.adjustImOnlyLemmaObjects(source);
  let matches = [];

  if (structureChunk.specificIds && structureChunk.specificIds.length) {
    console.log("Get matches by specific IDs:", structureChunk.specificIds);
    matches = source.filter((lObj) =>
      structureChunk.specificIds.includes(lObj.id)
    );
  } else if (
    structureChunk.specificLemmas &&
    structureChunk.specificLemmas.length
  ) {
    console.log(
      "Get matches by specific Lemmas:",
      structureChunk.specificLemmas
    );
    matches = source.filter((lObj) =>
      structureChunk.specificLemmas.includes(lObj.lemma)
    );
  } else {
    console.log("Get matches by Tags and Selectors.");
    matches = lfUtils.filterByAndTagsAndOrTags(source, structureChunk);

    lfUtils.adjustImOnlyLemmaObjects(matches); //Must be adjusted before aspect (a selector) filter is applied.

    matches = lfUtils.filterBySelectors(
      currentLanguage,
      structureChunk,
      matches
    );
  }

  console.log("eee", matches);

  lfUtils.adjustImOnlyLemmaObjects(matches); //Must be adjusted again as may not have been in such pathway above.

  langUtils.preprocessLemmaObjects(matches, structureChunk);

  // console.log(
  //   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>> NNNow let's look at those preprocessed lObjs."
  // );
  // console.log(matches);
  // gpUtils.consoleLogObjectAtTwoLevels(
  //   matches.map((lObj) => lObj.inflections.verbal)
  // );

  //STEP THREE: Return result array immediately if uninflected or ad hoc.

  let adhocInflectorRef = refObj.adhocInflectors[currentLanguage];
  let adhocFormRef = refObj.adhocForms[currentLanguage];

  //THREE (A): Ad-PW: Pathway for Ad hoc Forms and Inflections.

  //(3A-1): Pathway for Ad hoc Forms.
  if (
    structureChunk.form &&
    structureChunk.form.length &&
    Object.keys(adhocFormRef).includes(structureChunk.wordtype) &&
    structureChunk.form.some((selectedForm) =>
      adhocFormRef[structureChunk.wordtype].includes(selectedForm)
    )
  ) {
    if (kumquat) {
      matches.forEach((selectedLemmaObject) => {
        let adhocArr = langUtils.generateAdhocForms(
          "form",
          gpUtils.copyWithoutReference(structureChunk),
          selectedLemmaObject,
          currentLanguage
        );

        adhocArr.forEach((adhocResultObj) => {
          let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

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

      selectedFormsArray.push({
        selectedWordArr,
        selectedLemmaObject,
        structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
      });
    }
    // });
  }

  //(3A-2): Pathway for Ad hoc Inflections.
  if (Object.keys(adhocInflectorRef).includes(structureChunk.wordtype)) {
    let adhocInflectorKeys = adhocInflectorRef[structureChunk.wordtype];

    adhocInflectorKeys.forEach((adhocInflectorKey) => {
      if (
        structureChunk[adhocInflectorKey] &&
        structureChunk[adhocInflectorKey].length
      ) {
        console.log("##Ad-PW" + " " + structureChunk.chunkId);
        if (kumquat) {
          matches.forEach((selectedLemmaObject) => {
            let adhocArr = langUtils.generateAdhocForms(
              adhocInflectorKey,
              gpUtils.copyWithoutReference(structureChunk),
              selectedLemmaObject,
              currentLanguage
            );

            adhocArr.forEach((adhocResultObj) => {
              let { selectedWordArr, structureChunkUpdated } = adhocResultObj;

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
            throw "No members were found in the adhocArr from OT:findMatching, path 3A-2 (ie tenseDescription).";
          }

          let selectedAdhocResultObj = gpUtils.selectRandom(adhocArr);

          let {
            selectedWordArr,
            structureChunkUpdated,
          } = selectedAdhocResultObj;

          selectedFormsArray.push({
            selectedWordArr,
            selectedLemmaObject,
            structureChunkUpdatedByAdhocOrUninflected: structureChunkUpdated,
          });
        }
      }
    });
  }

  //THREE (B): Un-PW: Pathway for Uninflected forms.
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
            console.log("##Un-PW" + " " + structureChunk.chunkId);
            if (kumquat) {
              requestedUninflectedForms.forEach((selectedUninflectedForm) => {
                let matchesByUninflectedForm = matches.filter(
                  (lObj) => lObj.inflections[selectedUninflectedForm]
                );

                matchesByUninflectedForm.forEach((selectedLemmaObject) => {
                  let selectedWordArr =
                    selectedLemmaObject.inflections[selectedUninflectedForm];

                  if (typeof selectedWordArr === "string") {
                    selectedWordArr = [selectedWordArr];
                  }

                  //We here update a copy of structureChunk
                  let structureChunkUpdatedByAdhocOrUninflected = gpUtils.copyWithoutReference(
                    structureChunk
                  );

                  structureChunkUpdatedByAdhocOrUninflected.form = [
                    selectedUninflectedForm,
                  ];

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

              if (typeof selectedWordArr === "string") {
                selectedWordArr = [selectedWordArr];
              }

              //We here update a copy of structureChunk
              let structureChunkUpdatedByAdhocOrUninflected = gpUtils.copyWithoutReference(
                structureChunk
              );

              structureChunkUpdatedByAdhocOrUninflected.form = [
                selectedUninflectedForm,
              ];

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

  if (selectedFormsArray.length) {
    selectedFormsArray.forEach((selectedFormObject) => {
      let {
        selectedWordArr,
        selectedLemmaObject,
        structureChunkUpdatedByAdhocOrUninflected,
      } = selectedFormObject;

      selectedWordArr.forEach((selectedWord) => {
        let outputUnit = exports.createOutputUnit(
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

  let structureChunksAdjusted = langUtils.adjustStructureChunksInIfPW(
    structureChunk
  );
  let structureChunks = structureChunksAdjusted || [structureChunk];

  structureChunks.forEach((structureChunk) => {
    let matchesCopy = matches.slice(0);

    console.log("fff", matchesCopy);

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

    console.log("ggg", matchesCopy);

    if (!matchesCopy.length) {
      // errorInSentenceCreation.errorMessage =
      //   "No matching lemma objects were found.";
      console.log("Ah bonsai.");
      return false;
    }

    console.log("##If-PW" + " " + structureChunk.chunkId);

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
            arrayOfAllPossibleOutputUnits.push(outputUnit);
          });
        });
      });
    } else {
      let selectedLemmaObject = gpUtils.selectRandom(matchesCopy);

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

      arrayOfAllPossibleOutputUnits.push(outputUnit);
    }
  });

  if (!arrayOfAllPossibleOutputUnits.length) {
    if (!errorInSentenceCreation.errorMessage) {
      errorInSentenceCreation.errorMessage =
        "The rrrequested inflections were not found in the selected lemma objects.";
    }
    return false;
  }

  if (!kumquat && arrayOfAllPossibleOutputUnits.length > 1) {
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
  const nestedRoutes = exports.extractNestedRoutes(obj).routesByNesting;

  let resArr = [];

  nestedRoutes.forEach((nestedRoute) => {
    let value = exports.giveValueFromObjectByRoute(obj, nestedRoute);

    //Splits terminal values that are arrays, into different unit, with identical routes.
    if (Array.isArray(value)) {
      value.forEach((subvalue) => {
        resArr.push({ terminalValue: subvalue, nestedRoute });
      });
    } else {
      resArr.push({ terminalValue: value, nestedRoute });
    }

    //Leaves terminal values that are arrays, as is.
    // resArr.push({ value, nestedRoute });
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
  let inflectionLabelChain =
    refObj.lemmaObjectFeatures[currentLanguage].inflectionChains[
      structureChunk.wordtype
    ];

  let routesAndValues = exports.giveRoutesAndTerminalValuesFromObject(
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

exports.addClarifiers = (
  arrayOfOutputUnits,
  currentLanguage,
  answerLanguage
) => {
  if (!answerLanguage) {
    throw "OT:addClarifiers says Did you mean to call me? You didn't give me an answerLanguage argument. I am only supposed to add clarifiers to the question sentence, and in order to do that I must know what the answerLanguage is going to be.";
  }

  const langUtils = require("../source/" + currentLanguage + "/langUtils.js");

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

    if (!structureChunk.clarifiers) {
      structureChunk.clarifiers = [];
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
    //     deficient: false,
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

    //STEP ONE: Type 1 Allohomographs (have clarifiers)
    //
    //  Textmoji Clarifiers
    //  Wordtype Clarifiers
    //
    //are both already on lobjs.

    let { allohomInfo } = selectedLemmaObject;

    if (allohomInfo && allohomInfo.singleWordtype) {
      if (!allohomInfo.emoji || !allohomInfo.text) {
        throw (
          "Lemma object '" +
          selectedLemmaObject.id +
          "' was marked as singleWordtype but not Textmoji Clarifiers were present!"
        );
      }

      structureChunk.clarifiers.push(
        allohomInfo.emoji + " " + allohomInfo.text
      );
    }

    if (allohomInfo && allohomInfo.multipleWordtype) {
      if (structureChunk.pleaseShowMultipleWordtypeAllohomClarifiers) {
        structureChunk.clarifiers.push(
          gpUtils.getWordtypeFromLemmaObject(selectedLemmaObject)
        );
      }
    }

    //STEP TWO: Types 2-6 Synhomographs (language-specific)
    //
    //  Feature Clarifiers
    //
    //eg ENG has some verbs with v1-v2 synhomography, and 2per ambiguous re number.

    langUtils.addSpecificClarifiers(
      structureChunk,
      currentLanguage,
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

    console.log("aaa allowableClarifiers", allowableClarifiers);

    //allowableClarifiers. Any clarifiers not in here, don't bother adding them.
    //We're looking ahead to the answerLanguage, and thinking, hmmmmm, well right now the currentLanguage
    //is POL, and soon the answerLanguage will be ENG. And looking it up... ENG doesn't allow "gender" as a transfer.
    //So from that, we can surmise that ENG doesn't care about gender, and thus, won't want it as a clarifer on the POL Q sentence.

    if (!structureChunk.preventAddingClarifiers) {
      let synhomographData = exports.findSynhomographs(
        selectedLemmaObject,
        structureChunk,
        currentLanguage
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
              structureChunk.clarifiers.push(structureChunk[label]);
            });
          }
        });
      }
    } else {
      console.log("I was told not to add any further clarifiers!");
    }
  });

  exports.attachClarifiers(arrayOfOutputUnits);

  gpUtils.consoleLogObjectAtTwoLevels(arrayOfOutputUnits);
};

exports.attachClarifiers = (arrayOfOutputUnits) => {
  arrayOfOutputUnits.forEach((outputUnit) => {
    let { structureChunk, selectedLemmaObject } = outputUnit;

    if (structureChunk.clarifiers && structureChunk.clarifiers.length) {
      outputUnit.selectedWord += ` (${structureChunk.clarifiers.join(", ")})`;
    }
  });
};
