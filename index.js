'use strict';

const allEslintRules = require('all-eslint-rules');
const configuredESLintRules = require('configured-eslint-rules');
const difference = require('lodash/fp/difference');

module.exports = function unconfiguredESLintRules(...args) {
	return difference(allEslintRules, configuredESLintRules(...args));
};
