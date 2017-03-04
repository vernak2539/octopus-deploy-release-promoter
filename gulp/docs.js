const Docma = require('docma');
const docmaConfig = require('./config/docs.config.json');

module.exports = (workflow) => {
  workflow.subtask('generateDocs', () => {
    return Docma.create()
      .build(docmaConfig);
  });
};
