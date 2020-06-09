const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const basePath = __dirname;
const distPath = 'dist';

const indextInput = './src/index.html';
const indexOutput = 'index.html';

function webpackConfigGenerator(env) {
  const sourcemaps = !!env.development;

  const webpackInitConfig = {
    resolve: {
      extensions: ['.js'],
    },
    entry: {
      app: [/*'@babel/polyfill', */ './src/index.js'],
    },
    output: {
      path: path.join(basePath, distPath),
      filename: '[chunkhash][name].js',
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: [
            MiniCSSExtract.loader,
            { loader: 'css-loader', options: { sourceMap: sourcemaps } },
            { loader: 'postcss-loader', options: { sourceMap: sourcemaps } },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: 'src/img',
                outputPath: 'img/',
                // bug in 0.5 version
                // https://github.com/webpack-contrib/html-loader/issues/203
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        filename: indexOutput,
        template: indextInput,
        favicon: '',
        //   favicon: "./src/favicon/favicon.ico"
      }),
      new MiniCSSExtract({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      // Copy the images folder and optimize all the images
      // new CopyWebpackPlugin([
      //   {
      //     from: 'src/img/'
      //   }
      // ]),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
      }),
    ],
  };

  return webpackInitConfig;
}

module.exports = webpackConfigGenerator;
