const consol = require("./consoleLoggingUtils.js");

exports.log = (...args) => {
  if (
    !["r", "r1", "r2", "r3", "r4", "r5", "t"].some((flag) =>
      process.argv.includes(flag)
    )
  ) {
    console.log(...args);
  }
};

exports.logSpecial1 = (...args) => {
  if (process.argv[process.argv.length - 1].split("r").includes("1")) {
    console.log(...args);
  }
};

exports.logSpecial2 = (...args) => {
  if (process.argv[process.argv.length - 1].split("r").includes("2")) {
    console.log(...args);
  }
};

exports.logSpecial3 = (...args) => {
  if (process.argv[process.argv.length - 1].split("r").includes("3")) {
    console.log(...args);
  }
};

exports.logSpecial4 = (...args) => {
  if (process.argv[process.argv.length - 1].split("r").includes("4")) {
    console.log(...args);
  }
};

exports.logSpecial5 = (...args) => {
  if (process.argv[process.argv.length - 1].split("r").includes("5")) {
    console.log(...args);
  }
};

exports.logSpecialTestOutput = (...args) => {
  if (process.argv[process.argv.length - 1] === "t") {
    console.log(...args);
  }
};

exports.consoleLogObjectAtOneLevel = (obj, etiquette, originEtiquette) => {
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

exports.consoleLogObjectAtTwoLevels = (obj, etiquette, originEtiquette) => {
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

exports.consoleLogAestheticBorder = (reps) => {
  let border =
    " │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║";

  for (let i = 0; i < reps; i++) {
    consol.log(border.slice(i, border.length - (10 - i)));
  }
};

exports.consoleLogPW = (etiquette, structureChunk, multipleMode) => {
  if (multipleMode) {
    consol.consoleLogYellowWithBorder(
      `##${etiquette} ${structureChunk.chunkId}`
    );
  } else {
    consol.consoleLogBlueWithBorder(`##${etiquette} ${structureChunk.chunkId}`);
  }
};

exports.consoleLogYellowWithBorder = (text) => {
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

exports.consoleLogBlueWithBorder = (text) => {
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

exports.consoleLogPurpleWithBorder = (text) => {
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
