// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'no-extra-semi': 0,
    'semi-style': 0,
    'semi': 0,
    'eqeqeq': 0,
    'indent': 0,
    'quotes': 0,
    'no-useless-escape': 'off',
    'no-tabs': 'off',
    'comma-dangle': 'off'
  }
}
