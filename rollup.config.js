const path = require("path");
const rollup = require("rollup");
const version = require("./package.json").version;
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");

function resolve(p) {
  return path.resolve(__dirname, "./", p);
}

const banner =
  "/*!\n" +
  " * gesture v" +
  version +
  "\n" +
  " * (c) 2019-" +
  new Date().getFullYear() +
  " Plomis\n" +
  " * Released under the MIT License.\n" +
  " */";

let inputOptions = {
  input: resolve("src/index.js"),
  plugins: [
    nodeResolve(),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: "node_modules/**"
    })
  ]
};

const outputOptions = [
  {
    file: resolve("lib/gesture.js"),
    format: "umd",
    name: "Gesture",
    banner
  },
  {
    file: resolve("lib/gesture.min.js"),
    format: "umd",
    name: "Gesture",
    banner
  },
  {
    file: resolve("es/gesture.esm.js"),
    format: "es",
    name: "Gesture",
    banner
  }
];

async function build(output) {
  try {
    const isProd = /min\.js$/.test(output.file);
    if (isProd) {
      // create a bundle
      const bundle = await rollup.rollup({
        ...inputOptions,
        plugins: [
          ...inputOptions.plugins,
          uglify({
            compress: {
              pure_getters: true,
              unsafe: true,
              unsafe_comps: true,
              warnings: false
            }
          })
        ]
      });
      // or write the bundle to disk
      await bundle.write(output);
    } else {
      // create a bundle
      const bundle = await rollup.rollup(inputOptions);
      // or write the bundle to disk
      await bundle.write(output);
    }
  } catch (e) {
    console.log(e);
  }
}

outputOptions.forEach(c => build(c));
