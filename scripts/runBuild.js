const { buildAll } = require("../lib/build.js");

(async () => {
  await buildAll();
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
