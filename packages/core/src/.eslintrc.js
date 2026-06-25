module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fstudio/]`,
        message:
          '@encorejs/core may not import @encorejs/studio modules except via type imports.',
      },
    ],
  },
}
