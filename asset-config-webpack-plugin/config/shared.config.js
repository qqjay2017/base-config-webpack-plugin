


exports = module.exports = (options) => ({
  module: {
    rules: [
      {
        test: /\.(gif|jpg|jpeg|png|svg|bmp)$/,
        type: 'asset/resource'

      },
      {
        test: /\.ico$/,
        type: 'asset/inline'
      }, {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'

      },

    ],
  },
  plugins: [

  ],
});
