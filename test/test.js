'use strong';

const allESLintRules = require('all-eslint-rules');
const cloneDeep = require('lodash/fp/cloneDeep');
const test = require('tape');
const unconfiguredESLintRules = require('..');

test('unconfiguredESLintRules()', t => {
  t.strictEqual(unconfiguredESLintRules.name, 'unconfiguredESLintRules', 'should have a function name.');

  t.deepEqual(
    unconfiguredESLintRules('test/test.js'),
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
    allESLintRules.filter(v => v !== 'no-alert'),
    'should use additional CLIEngine options as its last argument.'
  );

  t.deepEqual(option, clonedOption, 'should not mutate passed options.');

  t.deepEqual(
    unconfiguredESLintRules('test/test.js', {useEslintrc: false}),
    allESLintRules,
    'should use both file name and CLIEngine option object.'
  );

  t.deepEqual(
    unconfiguredESLintRules('', {
      rules: allESLintRules.reduce((obj, ruleKey) => {
        obj[ruleKey] = 0;
        return obj;
      }, {})
    }),
    [],
    'should return an empty array when all the rules are configured.'
  );

  t.throws(
    () => unconfiguredESLintRules(),
    /^Error.*No ESLint configuration found\./,
    'should return an array of unconfigured ESLint rules.'
  );

  t.throws(
    () => unconfiguredESLintRules(true),
    /TypeError.*true is not a string or an object/,
    'should throw a type error when the first argument is neither a string nor an object.'
  );

  t.throws(
    () => unconfiguredESLintRules(null, {}),
    /TypeError.*null is not a string or an object/,
    'should throw a type error when the second argument is truthy but the first isn\'t.'
  );

  t.throws(
    () => unconfiguredESLintRules('index.js', 1),
    /TypeError.*1 is not an object/,
    'should throw a type error when the second argument is not an object.'
  );

  t.end();
});
