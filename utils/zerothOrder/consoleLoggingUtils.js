const clUtils = require("./consoleLoggingUtils.js");

exports.consoleLogObjectAtOneLevel = (obj, label, originLabel) => {
  if (!obj) {
    console.log(
      "[1;33m " +
        `--Console log "${label}" at one level, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  console.log(
    "[1;33m " + `--Console log "${label}" at one level, from "${originLabel}":` + "[0m"
  );
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    console.log("[1;30m " + `${key}` + "[0m");
    console.log(value);
  });
  console.log("[1;32m " + `----------` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `--` + "[0m");
};

exports.consoleLogObjectAtTwoLevels = (obj, label, originLabel) => {
  if (!obj) {
    console.log(
      "[1;33m " +
        `--Console log "${label}" at two levels, from "${originLabel}" but FALSY.` +
        "[0m"
    );
    return;
  }

  console.log(
    "[1;33m " + `--Console log "${label}" at two levels, from "${originLabel}":` + "[0m"
  );
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `----------` + "[0m");
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value) {
      Object.keys(value).forEach((key2) => {
        let value2 = value[key2];
        console.log("[1;30m " + `${key}:${key2}` + "[0m");
        console.log("subvalue:", value2);
      });
    } else {
      console.log("[1;30m " + `${key}` + "[0m");
      console.log("value:", value);
    }
  });
  console.log("[1;32m " + `----------` + "[0m");
  console.log("[1;32m " + `------` + "[0m");
  console.log("[1;32m " + `--` + "[0m");
};

exports.consoleLogAestheticBorder = (reps) => {
  let border =
    " │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║ ▌ ║ ▌ █ ║ ▌ ║ █ ║ ▌ │ ▌ ║ █ ║ ▌ │ ║ ▌ │ ║";

  for (let i = 0; i < reps; i++) {
    console.log(border.slice(i, border.length - (10 - i)));
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
  console.log(" ");
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;33m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(" ");
};

exports.consoleLogBlueWithBorder = (text) => {
  console.log(" ");
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(
    "[1;36m " +
      "~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~" +
      "[0m"
  );
  console.log(" ");
};

exports.consoleLogPurpleWithBorder = (text) => {
  console.log(" ");
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log("                   " + text);
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(
    "[1;35m " +
      ": : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : : :" +
      "[0m"
  );
  console.log(" ");
};

exports.throw = (msg = "Cease.") => {
  console.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  console.log("[1;31m " + "!   !   ! " + msg + "[0m");
  console.log("[1;31m " + "!   !   !   !   !   !   !   !   !   !" + "[0m");
  throw msg;
};
