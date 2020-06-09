const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const webpackConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100',
      },
    }),
  ],
};

module.exports = webpackConfig;
