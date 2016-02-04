var path = require('path');

module.exports = function(config){
  config.set({
    restartOnFileChange: true,

    //logLevel: config.LOG_DEBUG,

    // TODO: we should add other browsers for CI pipeline, e.g Chrome/ChromeCanary, Firefox, Opera, Safari and IE
    browsers: ['PhantomJS'], //TODO: for dev stage we can try to use jsdom /PhantomJS for performance

    // which karma frameworks do we want integrated
    frameworks: ['mocha', 'chai'],

    // displays tests in a nice readable format
    reporters: ['spec'],

    // include some polyfills for babel and phantomjs
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      './test/**/*.js'
    ],

    //exclude: ['./src/js/**/index.js'],

    preprocessors: {
      ['./test/**/*.js']: ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname, './src/js'),
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      module: {
        noParse: [
          /node_modules\/sinon\//
        ],
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' }
        ]
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      }
    },

    webpackMiddleware: { noInfo: true },

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-safari-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ]
  });
};