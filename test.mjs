import {strict as assert} from 'assert';
import {join, parse} from 'path';
import {promises, unlinkSync} from 'fs';
import {tmpdir} from 'os';

import allEslintRules from 'all-eslint-rules';
import unconfiguredESLintRules from '.';
import test from 'testit';

const tmpDir = tmpdir();
const tmpFile = join(tmpDir, '.eslintrc.yml');

process.chdir(tmpDir);
process.on('exit', () => unlinkSync(tmpFile));

test('retrieve unconfigured ESLint rules', async () => {
	await promises.writeFile(tmpFile, `root: true
rules:
  eol-last: error
`);

	assert.deepEqual(unconfiguredESLintRules(), allEslintRules().filter(v => v !== 'eol-last'));
});

test('use a passed CLIEngine options object', () => {
	assert.deepEqual(
		unconfiguredESLintRules({
			rules: {
				'no-alert': 'error'
			}
		}),
		allEslintRules().filter(v => v !== 'eol-last' && v !== 'no-alert')
	);
});

test('should throw an error when it cannot find any configuration', () => {
	const {root} = parse(process.cwd());

	process.chdir(parse(process.cwd()).root);
	assert.throws(() => unconfiguredESLintRules(), {message: `No ESLint configuration found in ${root}.`});
});

test('throw a type error when it takes an argument neither a CLIEngine nor a plain object', () => {
	assert.throws(() => unconfiguredESLintRules(true), {
		name: 'TypeError',
		code: 'ERR_INVALID_ARG_TYPE',
		message: 'Expected a plain object to set ESLint\'s CLIEngine options, but got true (boolean).'
	});
});

test('throw an error when it takes too many arguments', () => {
	assert.throws(() => unconfiguredESLintRules({}, {}), {
		name: 'RangeError',
		code: 'ERR_TOO_MANY_ARGS',
		message: 'Expected 0 or 1 argument (<Object>), but got 2 arguments.'
	});
});
