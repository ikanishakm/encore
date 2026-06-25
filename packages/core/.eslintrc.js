const path = require('path')

module.exports = {
  rules: {
    'no-relative-imports': [
      'warn',
      {
        aliases: [
          {name: '@encorejs/core', path: path.resolve(__dirname, './src')},
        ],
      },
    ],
  },
}
