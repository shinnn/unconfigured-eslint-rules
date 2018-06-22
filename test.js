'use strict';

const {join} = require('path');
const {mkdir, writeFile} = require('fs').promises;

const allESLintRules = require('all-eslint-rules');
const cloneDeep = require('lodash/fp/cloneDeep');
const rmfr = require('rmfr');
const test = require('tape');
const unconfiguredESLintRules = require('.');

const tmp = join(__dirname, 'tmp');

test('unconfiguredESLintRules()', async t => {
	await mkdir(tmp);
	await writeFile(join(tmp, '.eslintrc.yml'), `root: true
rules:
  eol-last: error
`);

	process.chdir(tmp);

	t.deepEqual(
		unconfiguredESLintRules(),
		allESLintRules.filter(v => v !== 'eol-last'),
		'should retrieve unconfigured rules for a given file.'
	);

	const option = {
		rules: {
			'no-alert': 'error'
		}
	};
	const clonedOption = cloneDeep(option);

	t.deepEqual(
		unconfiguredESLintRules(option),
		allESLintRules.filter(v => v !== 'eol-last' && v !== 'no-alert'),
		'should use additional CLIEngine options as its last argument.'
	);

	t.deepEqual(option, clonedOption, 'should not mutate passed options.');

	t.deepEqual(
		unconfiguredESLintRules({useEslintrc: false}),
		allESLintRules,
		'should use both file name and CLIEngine option object.'
	);

	await rmfr(tmp);

	t.throws(
		() => unconfiguredESLintRules(true),
		/TypeError.*Expected an ESLint's CLIEngine options object \(<Object>\), but got true \(boolean\)\./,
		'should throw a type error when the first argument is neither a string nor an object.'
	);

	t.throws(
		() => unconfiguredESLintRules({}, {}),
		/^RangeError.*Expected 0 or 1 argument \(\[<Object>]\), but got 2 arguments\./,
		'should throw a type error when the second argument is truthy but the first isn\'t.'
	);

	t.end();
});
