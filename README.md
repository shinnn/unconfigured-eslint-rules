# unconfigured-eslint-rules

[![NPM version](https://img.shields.io/npm/v/unconfigured-eslint-rules.svg)](https://www.npmjs.com/package/unconfigured-eslint-rules)
[![Build Status](https://travis-ci.org/shinnn/unconfigured-eslint-rules.svg?branch=master)](https://travis-ci.org/shinnn/unconfigured-eslint-rules)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/unconfigured-eslint-rules.svg)](https://coveralls.io/r/shinnn/unconfigured-eslint-rules)
[![Dependency Status](https://david-dm.org/shinnn/unconfigured-eslint-rules.svg)](https://david-dm.org/shinnn/unconfigured-eslint-rules)
[![devDependency Status](https://david-dm.org/shinnn/unconfigured-eslint-rules/dev-status.svg)](https://david-dm.org/shinnn/unconfigured-eslint-rules#info=devDependencies)

Detect unconfigured [ESLint](http://eslint.org/) rules

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

[Use npm](https://docs.npmjs.com/cli/install).

```
npm install unconfigured-eslint-rules
```

## API

```javascript
const unconfiguredEslintRules = require('unconfigured-eslint-rules');
```

### unconfiguredEslintRules([*filePath*][, *options*])

*filePath*: `String` (directly passed to [configured-eslint-rules](https://github.com/shinnn/configured-eslint-rules))  
*options*: `Object` (directly passed to configured-eslint-rules)  
Return: `Array` of `String`

It has the same API as [configured-eslint-rules'](https://github.com/shinnn/configured-eslint-rules#api) but returns the inverse, an array of the [ESLint rule](http://eslint.org/docs/rules/) names that doesn't have any [rule configurations](http://eslint.org/docs/user-guide/configuring#configuring-rules).

```javascript
/*
    ./dir/.eslintrc.json:

    {
      "rules": {
        "semi": ["error", "always"]
      }
    }
*/

const unconfiguredCwd = unconfiguredEslintRules('index.js');
unconfiguredCwd.includes('semi'); //=> true

const unconfiguredDir = unconfiguredEslintRules('dir/index.js');
unconfiguredDir.includes('semi'); //=> false
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

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
