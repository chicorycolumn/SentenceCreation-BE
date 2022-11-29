const consol = require("./consoleLoggingUtils.js");

exports.log = (...args) => {
  if (
    process.argv.some((el) => el === "all") ||
    !process.argv.some((el) => /^(r[\d]?)$|^t$/.test(el))
  ) {
    console.log(...args);
  }
};

exports.logSpecial = (num, ...args) => {
  let rArg = process.argv.find((el) => /^r[\d]$/.test(el));
  if (rArg) {
    let rNum = rArg[1];
    if (num.toString() === rNum) {
      console.log(...args);
    }
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
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value) {
      Object.keys(value).forEach((key2) => {
        let value2 = value[key2];
        consol.log("[1;30m " + `${key}:${key2}` + "[0m");
        consol.log("subvalue:", value2);
      });
    } else {
      consol.log("[1;30m " + `${key}` + "[0m");
      consol.log("value:", value);
    }
  });
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

exports.logPathwayTitle = (etiquette, structureChunk, multipleMode) => {
  if (multipleMode) {
    consol.logYellowWithBorder(`##${etiquette} ${structureChunk.chunkId}`);
  } else {
    consol.logBlueWithBorder(`##${etiquette} ${structureChunk.chunkId}`);
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

exports.logBlueWithBorder = (text) => {
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
