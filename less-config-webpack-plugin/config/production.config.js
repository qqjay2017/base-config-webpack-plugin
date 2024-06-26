const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
let postcssPresetEnv = require('postcss-preset-env');

exports = module.exports = (options={}) => {
  const baseCssConfig = [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        url: {
          filter: (url) => !(url || "").startsWith("/"),
        },
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        postcssOptions: (loader) => {
          return {
            plugins: [
              options.tailwindcss === true ? 'tailwindcss':null,
              postcssPresetEnv({
                browsers: 'last 5 version'
              }),
              require("postcss-flexbugs-fixes"),
              require("autoprefixer")({
                // flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
                // @see https://github.com/postcss/autoprefixer#disabling
                flexbox: "no-2009",
              }),
            ].filter(Boolean),
          };
        },
      },
    },
    {
      loader: require.resolve("resolve-url-loader"),
    },
    
  ]
 return  {
    module: {
      rules: [
        {
          test: /\.(less)$/,
  
          use: [
            ...baseCssConfig,
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
  
          use: baseCssConfig,
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    })],
  }
}
