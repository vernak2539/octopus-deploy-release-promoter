const gulp     = require('gulp');
const workflow = require('gulp-workflow');

workflow
  .load(gulp)
  .task('lint', 'Run code linting', ['eslint'])
  .task('docs', 'Generate Docs', ['clean:docs', 'generateDocs']);
