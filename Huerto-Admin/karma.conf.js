module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      // only include test spec files to keep compilation scope small
      { pattern: 'src/tests/**/*.spec.+(ts|tsx)', included: true, watched: true },
      // keep source files available for imports but not directly included
      { pattern: 'src/**/*.+(ts|tsx)', included: false, watched: true }
    ],
    preprocessors: {
      'src/tests/**/*.spec.+(ts|tsx)': ['karma-typescript']
    },
    reporters: ['spec', 'karma-typescript', 'coverage'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      compilerOptions: {
        // force modern JSX transform and allow importing .tsx extensions
        jsx: 'react-jsx',
        allowImportingTsExtensions: true
      }
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
