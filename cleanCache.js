// This file cannot be at a lower level because `del `protects against deleting
// from higher directory levels
const del = require("del");

const CACHE_PATH = "./.cache/**";

(async () => {
  // `**` matches all children AND parent, so add an explicit ignore
  await del([CACHE_PATH, `!${CACHE_PATH.replace("/**", "")}`]);
})();
