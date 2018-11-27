// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'arrow-parens': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'no-undef': 0,
    'comma-spacing': 0,
    'no-fallthrough': 0,
    'no-unneeded-ternary': 0,
    'one-var': 0,
    'no-undef-init': 0,
    'no-unreachable': 0,
    'key-spacing': 0,
    'quotes': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-trailing-spaces': 0,
    'indent': 0,
    'eqeqeq': 0,
  }
}
