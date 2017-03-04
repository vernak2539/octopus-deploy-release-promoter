module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('mocha', () => {
    return gulp.src(config.files.tests, { read: false })
      .pipe($.mocha({
        reporter: 'spec'
      }));
  });
};
