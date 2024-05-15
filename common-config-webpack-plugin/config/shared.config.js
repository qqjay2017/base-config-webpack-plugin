// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const LessConfigWebpackPlugin = require("../../less-config-webpack-plugin/src/index");
const AssetConfigWebpackPlugin = require("../../asset-config-webpack-plugin/src/index");
const JsConfigWebpackPlugin = require("../../js-config-webpack-plugin/src/index");
const TsConfigWebpackPlugin = require("../../ts-config-webpack-plugin/src/index");
const RemoveLicenseFilePlugin= require("../../remove-license-file-plugin/src/index");


exports = module.exports = (options) => ({

  module: {
    rules: [],
  },
  plugins: [

    new RemoveLicenseFilePlugin(),
    new AssetConfigWebpackPlugin({...options}),
    new LessConfigWebpackPlugin({...options }),
    new TsConfigWebpackPlugin({ ...options}),
    new JsConfigWebpackPlugin({...options }),
  ],
});
