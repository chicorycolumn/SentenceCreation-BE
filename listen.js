const app = require("./app.js");
const { PORT = 9090 } = process.env;
const consol = require("./utils/zerothOrder/consoleLoggingUtils.js");

app.listen(PORT, () =>
  consol.log(`listen.js says SentenceCreation is listening on ${PORT}.`)
);
