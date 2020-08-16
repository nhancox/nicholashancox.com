const del = require("del");

const DIST_PATH = "./dist/**";

async function clean() {
  await del([DIST_PATH]);
}

module.exports = clean;
