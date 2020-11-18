const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () =>
  console.log(`listen.js says SentenceCreation is listening on ${PORT}.`)
);
