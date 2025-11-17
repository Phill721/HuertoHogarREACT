module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      { pattern: 'src/**/*.+(ts|tsx)', included: true, watched: true }
    ],
    preprocessors: {
      'src/**/*.+(ts|tsx)': ['karma-typescript']
    },
    reporters: ['spec', 'karma-typescript', 'coverage'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.karma.json'
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
  });
};
