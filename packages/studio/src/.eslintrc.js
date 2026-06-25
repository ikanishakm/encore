module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fcore\\u002F/]`,
        message:
          '@encore/studio may not import @encore/core/* modules except via type imports.',
      },
    ],
  },
}
