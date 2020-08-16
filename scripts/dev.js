const browserSync = require("browser-sync");

const build = require("../lib/build.js");

(async () => {
  console.log("Running initial build");
  await build.buildAll();

  console.log("Initializing Browsersync process");
  const devProcess = browserSync.create();

  devProcess.watch("src/css/*.css").on("change", async () => {
    devProcess.notify("Rebuilding CSS");
    await build.buildCSSFiles();
    devProcess.reload("*.css");
  });

  devProcess.watch("src/js/*.js").on("change", async () => {
    devProcess.notify("Rebuilding JS");
    await build.buildJSFiles();
    devProcess.reload("*.js");
  });

  devProcess.watch("static/*").on("change", async () => {
    devProcess.notify("Rebuilding static files");
    await build.buildStaticFiles();
    devProcess.reload("*.!(css|js|html)");
  });

  devProcess.watch("src/views/**/*").on("change", async () => {
    devProcess.notify("Rebuilding HTML");
    await build.buildViewFiles();
    devProcess.reload("*.html");
  });

  devProcess.init({
    open: "local",
    server: { baseDir: "dist" },
    startPath: "/home.html",
    watch: false
  });
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
