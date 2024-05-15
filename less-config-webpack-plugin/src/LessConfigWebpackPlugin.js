const defaultOptions = {};

class LessConfigWebpackPlugin {
  /**
   *  options
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * @param {WebpackCompiler} compiler
   */
  apply(compiler) {
    // From https://github.com/webpack/webpack/blob/3366421f1784c449f415cda5930a8e445086f688/lib/WebpackOptionsDefaulter.js#L12-L14
    const isProductionLikeMode =
      this.options.mode !== undefined
        ? this.options.mode === "production"
        : compiler.options.mode === "production" || !compiler.options.mode;

    const config = isProductionLikeMode
      ? require("../config/production.config")(
        Object.assign({ mode: "production" }, this.options)
      )
      : require("../config/development.config")(
        Object.assign({ mode: "development" }, this.options)
      );
    // Merge config
    compiler.options.plugins.push(...config.plugins);
    compiler.hooks.afterEnvironment.tap("LessConfigWebpackPlugin", () => {
      compiler.options.module.rules.push(...config.module.rules);

      compiler.options.optimization = {
        ...compiler.options.optimization,
        minimizer: [
          ...compiler.options.optimization.minimizer,
          ...config.optimization.minimizer,
        ],
      };
    });
  }
}

exports = module.exports = LessConfigWebpackPlugin;
