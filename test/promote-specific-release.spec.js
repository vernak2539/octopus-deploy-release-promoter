const proxyquire = require('proxyquire');
const fakeOctoDeployApi = require('./fake-octo-deploy');

const OctopusReleasePromoter = proxyquire('../index', {
  'octopus-deploy': fakeOctoDeployApi
});

describe('promoting specific release', () => {
  it('should promote the designated release to designated ENV', () => {
    // Arrange
    const environmentId = 'Environment-101';
    const releaseId = 'Release-101';
    const comments = 'comments';
    const promoter = new OctopusReleasePromoter({
      host: 'https://deploy.octo.test.com',
      apiKey: 'ABCDEF-12234'
    });

    // Act
    promoter.promoteRelease({
      comments,
      environmentId,
      releaseId
    });

    // Assert
    promoter.client.deployment.create.calledWith(environmentId, releaseId, comments);
  });
});
