# unconfigured-eslint-rules

[![npm version](https://img.shields.io/npm/v/unconfigured-eslint-rules.svg)](https://www.npmjs.com/package/unconfigured-eslint-rules)
[![Build Status](https://travis-ci.org/shinnn/unconfigured-eslint-rules.svg?branch=master)](https://travis-ci.org/shinnn/unconfigured-eslint-rules)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/unconfigured-eslint-rules.svg)](https://coveralls.io/github/shinnn/unconfigured-eslint-rules)

Detect unconfigured [ESLint](https://eslint.org/) rules

```javascript
/*
    ./eslintrc.js:

    module.exports = {
      rules: {
        'no-alert': 'error',
        'no-array-constructor': 'warn',
        'no-bitwise': 'off',
        'linebreak-style': ['error', "unix"],
      }
    }
*/

const unconfiguredESLintRules = require('unconfigured-eslint-rules');
const unconfigured = unconfiguredESLintRules(); //=> ['no-caller', 'no-catch-shadow', 'no-class-assign', ...]

unconfigured.includes('no-alert'); //=> false
unconfigured.includes('no-array-constructor'); //=> false
unconfigured.includes('no-bitwise'); //=> false
unconfigured.includes('linebreak-style'); //=> false
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install unconfigured-eslint-rules
```

## API

```javascript
const unconfiguredEslintRules = require('unconfigured-eslint-rules');
```

### unconfiguredEslintRules([*options*])

*options*: `Object` ([ESLint `CLIEngine`](https://eslint.org/docs/developer-guide/nodejs-api#cliengine) constructor options)  
Return: `Array<string>`

It has the same API as [configured-eslint-rules'](https://github.com/shinnn/configured-eslint-rules#api) but returns the inverse – an array of the [ESLint rule](http://eslint.org/docs/rules/) names that doesn't have any [rule configurations](http://eslint.org/docs/user-guide/configuring#configuring-rules).

```javascript
/*
    ./dir/.eslintrc.json:

    {
      "rules": {
        "semi": ["error", "always"]
      }
    }
*/

unconfiguredEslintRules().includes('semi'); //=> true

process.chdir('dir');

unconfiguredEslintRules().includes('semi'); //=> false
```

```javascript
/*
    ./eslintrc.yml:

    rules:
      eqeqeq: warn
*/

const unconfigured = unconfiguredEslintRules({
  rules: {curly: 0},
  useEslintrc: false
});

unconfigured.includes('curly'); //=> false
unconfigured.includes('eqeqeq'); //=> true
```

## License

Copyright (c) 2015 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
