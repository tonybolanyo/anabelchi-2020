const webpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 7777,
    host: 'localhost',
  },
};

module.exports = webpackConfig;
