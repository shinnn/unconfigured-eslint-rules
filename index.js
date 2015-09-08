'use strong';

const allEslintRules = require('all-eslint-rules');
const arrayDifference = require('array-difference');
const configuredESLintRules = require('configured-eslint-rules');

module.exports = function unconfiguredESLintRules(filePath, options) {
  return arrayDifference(allEslintRules, configuredESLintRules(filePath, options));
};
