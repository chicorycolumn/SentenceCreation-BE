const consol = require("./consoleLoggingUtils.js");

exports.log = (...args) => {
  if (!process.argv.includes("q")) {
    console.log(...args);
  }
};

exports.consoleLogObjectAtOneLevel = (obj, label, originLabel) => {
  if (!obj) {
    consol.log(
      "[1;33m " +
        `--Console log "${label}" at one level, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  consol.log(
    "[1;33m " + `--Console log "${label}" at one level, from "${originLabel}":` + "[0m"
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

exports.consoleLogObjectAtTwoLevels = (obj, label, originLabel) => {
  if (!obj) {
    consol.log(
      "[1;33m " +
        `--Console log "${label}" at two levels, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  consol.log(
    "[1;33m " + `--Console log "${label}" at two levels, from "${originLabel}":` + "[0m"
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

exports.consoleLogPW = (label, structureChunk, multipleMode) => {
  if (multipleMode) {
    consol.consoleLogYellowWithBorder(`##${label} ${structureChunk.chunkId}`);
  } else {
    consol.consoleLogBlueWithBorder(`##${label} ${structureChunk.chunkId}`);
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
