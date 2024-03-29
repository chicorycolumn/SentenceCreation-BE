const consol = require("./consoleLoggingUtils.js");

exports.logFull = (x) => {
  console.log(require("util").inspect(x, { showHidden: false, depth: null }));
};

exports.log = (...args) => {
  if (
    process.argv.some((el) => el === "all") ||
    !process.argv.some((el) => /^(r[\d]?)$|^t$/.test(el))
  ) {
    console.log(...args);
  }
};

exports.logSpecial = (num, ...args) => {
  let rArgs = process.argv
    .filter((el) => /^r[\d]$/.test(el))
    .map((el) => el[1]);
  if (process.argv.some((el) => el === "r")) {
    rArgs.push("r");
  }
  if (process.argv.some((el) => el === "t")) {
    rArgs.push("t");
  }
  if (
    rArgs.every((el) => !"tr0123456789".split("").includes(el)) ||
    rArgs.includes(num.toString())
  ) {
    console.log(...args);
  }
};

exports.logTestOutputSolely = (...args) => {
  if (
    process.argv.includes("t") ||
    process.argv.includes("all") ||
    !process.argv.find((el) => /^r[\d]?$/.test(el))
  ) {
    console.log(...args);
  }
};

exports.logObjectOneLevel = (obj, etiquette, originEtiquette) => {
  if (!obj) {
    consol.log(
      "[1;33m " +
        `--Console log "${etiquette}" at one level, from "${originEtiquette}" but FALSY.` +
        "[0m"
    );
    return;
  }

  consol.log(
    "[1;33m " +
      `--Console log "${etiquette}" at one level, from "${originEtiquette}":` +
      "[0m"
  );
  consol.log("[1;32m " + `------` + "[0m");
  consol.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    consol.log("[1;30m " + `${key}` + "[0m");
    consol.log(value);
  });
  consol.log("[1;32m " + `----------` + "[0m");
  consol.log("[1;32m " + `------` + "[0m");
  consol.log("[1;32m " + `--` + "[0m");
};

exports.logObjectTwoLevels = (obj, etiquette, originEtiquette) => {
  if (!obj) {
    consol.log(
      "[1;33m " +
        `--Console log "${etiquette}" at two levels, from "${originEtiquette}" but FALSY.` +
        "[0m"
    );
    return;
  }

  consol.log(
    "[1;33m " +
      `--Console log "${etiquette}" at two levels, from "${originEtiquette}":` +
      "[0m"
  );
  consol.log("[1;32m " + `------` + "[0m");
  consol.log("[1;32m " + `----------` + "[0m");
  if (typeof obj == "string") {
    consol.log(obj);
  } else {
    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      if (value) {
        if (typeof value == "string") {
          consol.log("[1;30m " + `${key}` + "[0m");
          consol.log("value:", value);
        } else {
          Object.keys(value).forEach((key2) => {
            let value2 = value[key2];
            consol.log("[1;30m " + `${key}:${key2}` + "[0m");
            consol.log("subvalue:", value2);
          });
        }
      } else {
        consol.log("[1;30m " + `${key}` + "[0m");
        consol.log("value:", value);
      }
    });
  }
  consol.log("[1;32m " + `----------` + "[0m");
  consol.log("[1;32m " + `------` + "[0m");
  consol.log("[1;32m " + `--` + "[0m");
};

exports.logAestheticBorder = (reps) => {
  let border =
    " │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║";

  for (let i = 0; i < reps; i++) {
    consol.log(border.slice(i, border.length - (10 - i)));
  }
};

exports.logPathwayTitle = (etiquette, structureChunk, maqModes) => {
  if (maqModes.multipleMode) {
    consol.logYellowWithBorder(`##${etiquette} ${structureChunk.chunkId}`);
  } else {
    consol.logCyanWithBorder(`##${etiquette} ${structureChunk.chunkId}`);
  }
};

exports.logYellowWithBorder = (text) => {
  consol.log(" ");
  consol.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log("                   " + text);
  consol.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(" ");
};

exports.logCyanWithBorder = (text) => {
  consol.log(" ");
  consol.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log("                   " + text);
  consol.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  consol.log(" ");
};

exports.logPurpleWithBorder = (text) => {
  consol.log(" ");
  consol.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  consol.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  consol.log("                   " + text);
  consol.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  consol.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  consol.log(" ");
};

exports.throw = (msg = "Cease.") => {
  consol.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  consol.log("[1;31m " + "!   !   ! " + msg + "[0m");
  consol.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  throw msg;
};

exports.logOutputUnitsWithDrillPaths = (number, outputUnitsWithDrillPaths) => {
  outputUnitsWithDrillPaths.forEach((outputUnitsWithDrillPathsUnit) => {
    consol.log(">>>", number);
    consol.log(
      "outputUnitsWithDrillPathsUnit selectedWordArray:",
      outputUnitsWithDrillPathsUnit.selectedWordArray
    );
    consol.log(
      "outputUnitsWithDrillPathsUnit drillPath:",
      outputUnitsWithDrillPathsUnit.drillPath
    );
    consol.log(" ");
    consol.log(" ");
  });
};

exports.logRedString = (s) => {
  consol.log("[1;31m " + s + "[0m");
};

exports.logGreenString = (s) => {
  consol.log("[1;32m " + s + "[0m");
};

exports.logYellowString = (s) => {
  consol.log("[1;33m " + s + "[0m");
};

exports.logBlueString = (s) => {
  consol.log("[1;34m " + s + "[0m");
};

exports.logPurpleString = (s) => {
  consol.log("[1;35m " + s + "[0m");
};

exports.logCyanString = (s) => {
  consol.log("[1;36m " + s + "[0m");
};

exports.logGreyString = (s) => {
  consol.log("[1;37m " + s + "[0m");
};

exports.logBlackString = (s) => {
  consol.log("[1;38m " + s + "[0m");
};

exports.logVeryRedString = (s) => {
  consol.log("[1;40m " + s + "[0m");
};

exports.logVeryBlackString = (s) => {
  consol.log("[1;41m " + s + "[0m");
};

exports.logVeryGreenString = (s) => {
  consol.log("[1;42m " + s + "[0m");
};

exports.logVeryYellowString = (s) => {
  consol.log("[1;43m " + s + "[0m");
};

exports.logVeryBlueString = (s) => {
  consol.log("[1;44m " + s + "[0m");
};

exports.logVeryPurpleString = (s) => {
  consol.log("[1;45m " + s + "[0m");
};

exports.logVeryCyanString = (s) => {
  consol.log("[1;46m " + s + "[0m");
};

exports.logVeryGreyString = (s) => {
  consol.log("[1;47m " + s + "[0m");
};
