const clUtils = require("./consoleLoggingUtils.js");

exports.log = (...args) => {
  return;
  console.log(...args);
};

exports.logAlways = (...args) => {
  console.log(...args);
};

exports.consoleLogObjectAtOneLevel = (obj, label, originLabel) => {
  if (!obj) {
    clUtils.log(
      "[1;33m " +
        `--Console log "${label}" at one level, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  clUtils.log(
    "[1;33m " + `--Console log "${label}" at one level, from "${originLabel}":` + "[0m"
  );
  clUtils.log("[1;32m " + `------` + "[0m");
  clUtils.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    clUtils.log("[1;30m " + `${key}` + "[0m");
    clUtils.log(value);
  });
  clUtils.log("[1;32m " + `----------` + "[0m");
  clUtils.log("[1;32m " + `------` + "[0m");
  clUtils.log("[1;32m " + `--` + "[0m");
};

exports.consoleLogObjectAtTwoLevels = (obj, label, originLabel) => {
  if (!obj) {
    clUtils.log(
      "[1;33m " +
        `--Console log "${label}" at two levels, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  clUtils.log(
    "[1;33m " + `--Console log "${label}" at two levels, from "${originLabel}":` + "[0m"
  );
  clUtils.log("[1;32m " + `------` + "[0m");
  clUtils.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value) {
      Object.keys(value).forEach((key2) => {
        let value2 = value[key2];
        clUtils.log("[1;30m " + `${key}:${key2}` + "[0m");
        clUtils.log("subvalue:", value2);
      });
    } else {
      clUtils.log("[1;30m " + `${key}` + "[0m");
      clUtils.log("value:", value);
    }
  });
  clUtils.log("[1;32m " + `----------` + "[0m");
  clUtils.log("[1;32m " + `------` + "[0m");
  clUtils.log("[1;32m " + `--` + "[0m");
};

exports.consoleLogAestheticBorder = (reps) => {
  let border =
    " │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║";

  for (let i = 0; i < reps; i++) {
    clUtils.log(border.slice(i, border.length - (10 - i)));
  }
};

exports.consoleLogPW = (label, structureChunk, multipleMode) => {
  if (multipleMode) {
    clUtils.consoleLogYellowWithBorder(`##${label} ${structureChunk.chunkId}`);
  } else {
    clUtils.consoleLogBlueWithBorder(`##${label} ${structureChunk.chunkId}`);
  }
};

exports.consoleLogYellowWithBorder = (text) => {
  clUtils.log(" ");
  clUtils.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log("                   " + text);
  clUtils.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(" ");
};

exports.consoleLogBlueWithBorder = (text) => {
  clUtils.log(" ");
  clUtils.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log("                   " + text);
  clUtils.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  clUtils.log(" ");
};

exports.consoleLogPurpleWithBorder = (text) => {
  clUtils.log(" ");
  clUtils.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  clUtils.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  clUtils.log("                   " + text);
  clUtils.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  clUtils.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  clUtils.log(" ");
};

exports.throw = (msg = "Cease.") => {
  clUtils.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  clUtils.log("[1;31m " + "!   !   ! " + msg + "[0m");
  clUtils.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  throw msg;
};
