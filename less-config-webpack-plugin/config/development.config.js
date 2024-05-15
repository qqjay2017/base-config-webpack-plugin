
let postcssPresetEnv = require('postcss-preset-env');

exports = module.exports = (options={}) => ({
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
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
          "less-loader",
        ],
      },
      {
        test: /\.(css)$/,
        use: [
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
        ],
      },
    ],
  },
  optimization: {
    minimizer: [],
  },
  plugins: [],
});
