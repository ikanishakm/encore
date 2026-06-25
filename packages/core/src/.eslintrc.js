module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fstudio/]`,
        message:
          '@encore/core may not import @encore/studio modules except via type imports.',
      },
    ],
  },
}
