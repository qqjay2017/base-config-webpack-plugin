// const  HtmlWebpackPlugin  = require( "html-webpack-plugin")
// const  CommonConfigWebpackPlugin  = require( 'base-config-webpack-plugin')


import HtmlWebpackPlugin from 'html-webpack-plugin'
import CommonConfigWebpackPlugin from 'base-config-webpack-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));


export default  () => {
  return {
    mode: "development",
    entry: "./src/index.ts",
    output: {
      path: __dirname + "/dist",
      filename: "index_bundle.js",
    },
    plugins: [ 
      new CommonConfigWebpackPlugin({
        mode:process.env.NODE_ENV
    }),
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      inject:true
    })
  ],
  };
};
