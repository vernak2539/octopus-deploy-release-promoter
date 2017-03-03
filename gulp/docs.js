const Docma = require('docma');


module.exports = (workflow, gulp, $, config) => {
  workflow.subtask('generateDocs', () => {
    return Docma.create()
      .build({
        src: [
          './index.js',
          './README.md'
        ],
        dest: './docs'
      });
  });
};
