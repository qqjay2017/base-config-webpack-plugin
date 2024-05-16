
let postcssPresetEnv = require('postcss-preset-env');

exports = module.exports = (options={}) => {
  const baseCssConfig  = [
    // compiles Less to CSS
    "style-loader",
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
  return {
    module: {
      rules: [
        {
          test: /\.(less)$/,
          use: [
            ...baseCssConfig,
            "less-loader",
          ],
        },
        {
          test: /\.(css)$/,
          use:baseCssConfig ,
        },
      ],
    },
    optimization: {
      minimizer: [],
    },
    plugins: [],
  }
}
