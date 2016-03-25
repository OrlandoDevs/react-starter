var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,

  entry: path.join(__dirname, 'src/index'),

  output: {
    path: path.resolve('./dist/'),
    filename: "[name]-[hash].js",
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new HtmlWebpackPlugin({
      title: 'React Hack Night',
      template: path.join(__dirname, 'src/index.html'),
      inject: 'body'
    }),
    // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  module: {
    loaders: [
      {
        // to transform JSX into JS
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css!' +
          'postcss!' +
          'sass?sourceMap'
        )
      },
    ],
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },

  postcss: [
    autoprefixer({
      browsers: ['ios >= 7']
    })
  ],

  devtool: process.env.NODE_ENV === 'development' && 'inline-source-map',

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  watchOptions: {
    poll: true,
    polling: 1000
  }
}
