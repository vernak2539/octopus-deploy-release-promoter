const del = require('del');

module.exports = (workflow, gulp, $, config) => {
	workflow.subtask('clean:docs', () => {
		return del([config.dirs.docs]);
	});
};
