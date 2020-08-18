const fs = require("fs").promises;
const path = require("path");

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const htmlnano = require("htmlnano");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const postcss = require("postcss");
const posthtml = require("posthtml");
const pug = require("pug");
const { rollup } = require("rollup");
const { terser } = require("rollup-plugin-terser");

const DIST_DIRECTORY = path.resolve("./dist");
const CSS_DIST_DIRECTORY = path.join(DIST_DIRECTORY, "/css");
const JS_DIST_DIRECTORY = path.join(DIST_DIRECTORY, "/js");

const CSS_DIRECTORY = path.resolve("./src/css");
const JS_DIRECTORY = path.resolve("./src/js");
const STATIC_DIRECTORY = path.resolve("./static");
const VIEW_DIRECTORY = path.resolve("./src/views");

const NODE_MODULE_PATH = path.resolve("./node_modules");

const VENDOR_CSS_FILES = ["normalize.css/normalize.css"].map((file) => {
  return path.join(NODE_MODULE_PATH, file);
});

const cssnanoOptions = { preset: "default" };
const postcssOptions = {};
const postcssPlugins = [autoprefixer, cssnano(cssnanoOptions)];

const posthtmlOptions = {};
const posthtmlPlugins = [htmlnano(htmlnano.presets.safe)];

const terserOptions = {
  compress: { ecma: 2017, module: true },
  ecma: 2017,
  mangle: { module: true },
  module: true,
};
const rollupInputOptions = { plugins: [nodeResolve()] };
const rollupOutputOptions = {
  format: "es",
  plugins: [terser(terserOptions)],
};

async function getCSSFiles() {
  const files = await fs.readdir(CSS_DIRECTORY);
  return files
    .filter((file) => {
      return file.endsWith(".css");
    })
    .map((file) => {
      return path.join(CSS_DIRECTORY, file);
    })
    .concat(VENDOR_CSS_FILES);
}

async function getJSFiles() {
  const files = await fs.readdir(JS_DIRECTORY);
  return files
    .filter((file) => {
      return file.endsWith(".js");
    })
    .map((file) => {
      return path.join(JS_DIRECTORY, file);
    });
}

async function getStaticFiles() {
  const files = await fs.readdir(STATIC_DIRECTORY);
  return files.map((file) => {
    return path.join(STATIC_DIRECTORY, file);
  });
}

async function getViewFiles() {
  const files = await fs.readdir(VIEW_DIRECTORY);
  return files
    .filter((file) => {
      return file.endsWith(".pug");
    })
    .map((file) => {
      return path.join(VIEW_DIRECTORY, file);
    });
}

async function processCSSFile(file) {
  const filename = path.basename(file);
  const fileContent = await fs.readFile(file, "utf8");
  const processedFile = await postcss(postcssPlugins).process(fileContent, {
    from: filename,
    ...postcssOptions,
  });
  await fs.writeFile(
    path.join(CSS_DIST_DIRECTORY, filename),
    processedFile.css
  );
}

async function processJSFile(file) {
  const filename = path.basename(file);

  const inputOptions = {
    ...rollupInputOptions,
    input: file,
  };
  const bundle = await rollup(inputOptions);

  const outputOptions = {
    ...rollupOutputOptions,
    file: path.join(JS_DIST_DIRECTORY, filename),
  };
  await bundle.write(outputOptions);
}

async function processStaticFile(file) {
  const filename = path.basename(file);
  await fs.copyFile(file, path.join(DIST_DIRECTORY, filename));
}

async function processViewFile(file) {
  const newFilename = path.basename(file).replace(/\.pug$/u, ".html");
  const renderedFile = pug.renderFile(file);
  const processedFile = await posthtml(posthtmlPlugins).process(
    renderedFile,
    posthtmlOptions
  );
  await fs.writeFile(
    path.join(DIST_DIRECTORY, newFilename),
    processedFile.html
  );
}

async function buildCSSFiles() {
  const files = await getCSSFiles();
  await fs.mkdir(CSS_DIST_DIRECTORY).catch((err) => {
    if (err.code !== "EEXIST") {
      throw err;
    }
  });
  await Promise.all(
    files.map(async (file) => {
      await processCSSFile(file);
    })
  );
}

async function buildJSFiles() {
  const files = await getJSFiles();
  await fs.mkdir(JS_DIST_DIRECTORY).catch((err) => {
    if (err.code !== "EEXIST") {
      throw err;
    }
  });
  await Promise.all(
    files.map(async (file) => {
      await processJSFile(file);
    })
  );
}

async function buildStaticFiles() {
  const files = await getStaticFiles();
  await Promise.all(
    files.map(async (file) => {
      await processStaticFile(file);
    })
  );
}

async function buildViewFiles() {
  const files = await getViewFiles();
  await Promise.all(
    files.map(async (file) => {
      await processViewFile(file);
    })
  );
}

async function buildAll() {
  await fs.mkdir(DIST_DIRECTORY).catch((err) => {
    if (err.code !== "EEXIST") {
      throw err;
    }
  });
  await Promise.all([
    buildCSSFiles(),
    buildJSFiles(),
    buildStaticFiles(),
    buildViewFiles(),
  ]);
}

module.exports = {
  buildAll,
  buildCSSFiles,
  buildJSFiles,
  buildStaticFiles,
  buildViewFiles,
};
