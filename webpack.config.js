//Hack for nodejs old version.
if (global.Promise == null) {
  global.Promise = require('promise-polyfill');
}

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProd = JSON.parse(process.env.BUILD_PROD || 'false');
var jsOutputFilename = isProd ? '[name]-[chunkhash].js' : '[name].js';
var cssOutputFilename = isProd ? '[name]-[chunkhash].css' : '[name].css';

var plugins = [
  new webpack.ProvidePlugin({ 'Promise': 'promise-polyfill' }),
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(!isProd), __PROD__: JSON.stringify(isProd),
    'process': { env: { NODE_ENV: JSON.stringify(isProd ? 'production' : 'dev') } }
  }),
  new ExtractTextPlugin(cssOutputFilename, { allChunks: true }),
  new HtmlWebpackPlugin({ template: './src/index.html' })
];

if(isProd) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
}

module.exports = {
  watch: !isProd,
  entry: { "app": './src/js/index.js' },
  output: { filename: jsOutputFilename },
  plugins: plugins,
  resolve: { extensions: ['', '.js', '.scss']},
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: { presets: ['react', 'es2015'] },
      exclude: /node_modules/
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style", 'css')
    },{
      test: require.resolve("react"),
      loader: "expose?React"
    },{
      test: require.resolve("lodash"),
      loader: "expose?_"
    }]
  }
};