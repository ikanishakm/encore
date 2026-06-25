const path = require('path')

module.exports = {
  rules: {
    'no-relative-imports': [
      'warn',
      {
        aliases: [
          {name: '@encore/core', path: path.resolve(__dirname, '../core/src')},
          {
            name: '@encore/studio',
            path: path.resolve(__dirname, './src'),
          },
        ],
      },
    ],
  },
}
