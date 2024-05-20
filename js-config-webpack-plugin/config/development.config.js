const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { resolveRoot } = require("../../utils");
// const ESLintPlugin = require('eslint-webpack-plugin');

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
              // do not include superfluous whitespace characters and line terminators
              // https://babeljs.io/docs/en/babel-core/#options
              compact: true,
            },
          },
        ],
      },
    ].filter(Boolean),
  },
  plugins: [
    // options.eslint ? new ESLintPlugin({
    //   context: resolveRoot('src')
    // }) : null,
    // new NodePolyfillPlugin(),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),

    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ].filter(Boolean),
});
