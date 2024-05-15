const { resolveRoot } = require("../../utils.js");



class CommonConfigWebpackPlugin {
  /**
   *
   * @param {*} options
   *  mode?: 'production' | 'development'
   *  eslint? : true| false
   *  cacheDir?:string;
   *
   */
  constructor(options = {}) {
    this.options = Object.assign({
      mode: process.env.NODE_ENV,
      eslint: false
    }, options);
  }
  
  resolveCacheDirectory(){
    // 开发环境
    if(this.options.cacheDir){
      return resolveRoot( this.options.cacheDir)
    }
    return  resolveRoot( 'node_modules/.cache')
  }
  apply(compiler) {
    const config = require("../config/shared.config.js")({
      ...this.options,
      cacheDir:this.resolveCacheDirectory()
    });
    const isProduction = this.options.mode === 'production'
    compiler.options.cache = {
      type: "filesystem",
      cacheDirectory: this.resolveCacheDirectory(),
      buildDependencies: {
          defaultWebpack: [resolveRoot('./node_modules/webpack/lib/')],
      },
      ...compiler.options.cache ,
     
    }
    compiler.options.devtool = isProduction ? "source-map" : "cheap-module-source-map";

    compiler.options.output = {
      clean: true, 
      filename: isProduction ? 'static/js/[name].[contenthash:8].js': 'static/js/bundle.js',
      pathinfo:!isProduction,
      path: resolveRoot( "dist"),
      chunkFilename:isProduction?"static/js/[name].[contenthash:8].chunk.js":  'static/js/[name].chunk.js',
      assetModuleFilename: 'static/asset/[name].[hash][ext]',
      publicPath: process.env.PUBLIC_URL||'/',
      ...compiler.options.output
    }
    compiler.options.optimization = {
      minimize: isProduction,
      ...compiler.options.optimization,
    }
    compiler.options.devServer = {
      historyApiFallback: true,
      ...compiler.options.devServer 
    } 
    compiler.options.resolve = {
      alias: {
        "@": resolveRoot("src"),
      },
      extensions: [".ts", ".tsx", ".js", "json"],
      // 告诉 webpack 解析模块时应该搜索哪些目录。
      modules: [resolveRoot("src"), "node_modules"],
      ...compiler.options.resolve 
    }
    // Merge config
    config.plugins.forEach((plugin) => plugin.apply(compiler));
    compiler.hooks.afterEnvironment.tap("CommonConfigWebpackPlugin", () => {
      compiler.options.module.rules.push(...config.module.rules);
      
   

    });
  }
}

exports = module.exports = CommonConfigWebpackPlugin;
