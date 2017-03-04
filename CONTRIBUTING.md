# Contributing

All PRs are welcome!!!! I aim to provide valid feedback in a timely manner.

Just please make sure the linting passes, the .editorconfig is used, and the tests pass.

## Linting

See `.eslintrc`.

```bash
gulp lint
```

## Tests

Written in mocha. They should be placed in the `./test` folder, with a descriptive
file name with `.spec.js` at the end.

```bash
gulp test

# This will run linting as well
npm test
```
