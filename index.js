'use strict';

const allEslintRules = require('all-eslint-rules');
const {CLIEngine} = require('eslint');
const configuredESLintRules = require('configured-eslint-rules');
const difference = require('lodash/fp/difference');
const inspectWithKind = require('inspect-with-kind');
const isPlainObject = require('lodash/isPlainObject');

module.exports = function unconfiguredESLintRules(...args) {
	const argLen = args.length;
	const [options] = args;

	if (argLen === 1) {
		if (!isPlainObject(options)) {
			const error = new TypeError(`Expected a plain object to set ESLint's CLIEngine options, but got ${
				inspectWithKind(options)
			}.`);

			error.code = 'ERR_INVALID_ARG_TYPE';
			throw error;
		}
	} else if (argLen !== 0) {
		const error = new RangeError(`Expected 0 or 1 argument (<Object>), but got ${argLen} arguments.`);

		error.code = 'ERR_TOO_MANY_ARGS';
		throw error;
	}

	const cli = new CLIEngine(...args);

	// load plugins
	cli.executeOnText('');

	return difference(allEslintRules(cli), configuredESLintRules(cli));
};
