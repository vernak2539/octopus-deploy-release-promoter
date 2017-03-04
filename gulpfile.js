const gulp     = require('gulp');
const workflow = require('gulp-workflow');

workflow
  .load(gulp)
  .task('lint', 'Run code linting', ['eslint'])
  .task('test', 'Run unit tests', ['mocha'])
  .task('lintAndTest', 'run linting and tests', [['lint', 'test']])
  .task('docs', 'Generate Docs', ['clean:docs', 'generateDocs']);
