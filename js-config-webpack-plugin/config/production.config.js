const TerserPlugin = require("terser-webpack-plugin");
const { resolveRoot } = require("../../utils");
const path = require("path");
function resolveCacheDirectory({ cacheDir }) {
  if (cacheDir) {
    return path.join(cacheDir, "./babel-loader");
  }
  return resolveRoot("node_modules/.cache/babel-loader");
}
exports = module.exports = (options) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: resolveRoot("src"),
        exclude: [/[/\\\\]node_modules[/\\\\]/], // exclude node_modules folder per default
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                [
                  "@babel/plugin-proposal-private-property-in-object",
                  { loose: true },
                ],
                ["@babel/plugin-proposal-private-methods", { loose: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
              extends: options.babelConfigFile,
              // cache builds, future builds attempt to read from cache to avoid needing to run expensive babel processings
              cacheDirectory: true,
              cacheCompression: false,
              cacheLocation: resolveCacheDirectory(options.cacheDir),
              // do not include superfluous whitespace characters and line terminators
              // https://babeljs.io/docs/en/babel-core/#options
              compact: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },

        keep_classnames: true,
        keep_fnames: true,
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
    }),
    //  new NodePolyfillPlugin()
  ],
});
