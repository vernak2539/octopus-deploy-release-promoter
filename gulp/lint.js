module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('eslint', () => {
    return gulp.src(config.linting)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  });
};
