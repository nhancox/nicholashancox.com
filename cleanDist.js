// This file cannot be at a lower level because `del `protects against deleting
// from higher directory levels
const del = require("del");

const DIST_PATH = "./dist/**";

(async () => {
	// `**` matches all children AND parent, so add an explicit ignore
	await del([DIST_PATH, `!${DIST_PATH.replace("/**", "")}`]);
})();
