// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'core/libs/modernizr-custom.js',
      'core/libs/angular/angular.js',
      'core/libs/angular/angular-mocks.js',
      'application/configs/app-config.js',
      'application/bootstrap.js',
      'core/**/*.js',
      'application/**/*.js',

      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS  - cd karma-phantomjs-launcher then npm install phantomjs@1.9.1-0
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters: ['coverage','progress'],

    preprocessors: {
        'application/**/*-ctrl.js': ['coverage'],
        'application/**/*.ptl.html': ['html2js']
    },


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
