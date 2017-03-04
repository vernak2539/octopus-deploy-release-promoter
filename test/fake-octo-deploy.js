const sinon = require('sinon');
const Promise = require('bluebird');
const projectsReleases = require('./api-project-releases.json');

const requestGetStub = sinon.stub()
  .withArgs(sinon.match.object)
  .returns(Promise.resolve(projectsReleases));

const projectFindBySlugOrIdStub = sinon.stub()
  .returns(Promise.resolve(projectsReleases.Items[0].ProjectId));

module.exports = function() {
  return {
    deployment: {
      create: sinon.spy()
    },
    project: {
      findBySlugOrId: projectFindBySlugOrIdStub
    },
    request: {
      get: requestGetStub
    }
  };
};
