# unconfigured-eslint-rules

[![npm version](https://img.shields.io/npm/v/unconfigured-eslint-rules.svg)](https://www.npmjs.com/package/unconfigured-eslint-rules)
[![GitHub Actions](https://action-badges.now.sh/shinnn/unconfigured-eslint-rules)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/shinnn/unconfigured-eslint-rules)
[![codecov](https://codecov.io/gh/shinnn/unconfigured-eslint-rules/branch/master/graph/badge.svg)](https://codecov.io/gh/shinnn/unconfigured-eslint-rules)

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

This module is designed to help developing [sharable configs](https://eslint.org/docs/developer-guide/shareable-configs). When a developer [updates](https://docs.npmjs.com/cli/update) ESLint and the latest version introduces new rules, `unconfiguredESLintRules().length` increases and they'll notice those new rules. [`@shinnn/eslint-config`](https://github.com/shinnn/eslint-config) provides a [real world example](https://github.com/shinnn/eslint-config/blob/596a56f11034ac344120a655c368d9fd4ac09305/test/test.js#L72-L157) of this approach.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install unconfigured-eslint-rules
```

## API

```javascript
const unconfiguredEslintRules = require('unconfigured-eslint-rules');
```

### unconfiguredEslintRules([*options*])

*options*: `Object` (ESLint [`CLIEngine`](https://eslint.org/docs/developer-guide/nodejs-api#cliengine) constructor options)  
Return: `string[]`

The API is the same as [configured-eslint-rules'](https://github.com/shinnn/configured-eslint-rules#api), but returns the inverse – an `Array` of [rule](http://eslint.org/docs/rules/) names with no [rule configurations](http://eslint.org/docs/user-guide/configuring#configuring-rules).

```javascript
/*
    ./my-dir/.eslintrc.json:

    {
      "rules": {
        "semi": ["error", "always"]
      }
    }
*/

unconfiguredEslintRules().includes('semi'); //=> true

process.chdir('my-dir');

unconfiguredEslintRules().includes('semi'); //=> false
```

The argument will be directly passed to the underlying `CLIEngine` constructor and affects the result.

```javascript
/*
    ./eslintrc.yml:

    rules:
      eqeqeq: warn
*/

unconfiguredEslintRules({}).includes('curly'); //=> false
unconfiguredEslintRules({rules: {curly: 'warn'}}).includes('curly'); //=> true
```

## License

[ISC License](./LICENSE) © 2018 - 2019 Watanabe Shinnosuke
