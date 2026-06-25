module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fcore\\u002F/]`,
        message:
          '@encorejs/studio may not import @encorejs/core/* modules except via type imports.',
      },
    ],
  },
}
