const clean = require("../lib/clean.js");

(async () => {
  await clean();
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
