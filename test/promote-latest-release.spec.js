const proxyquire = require('proxyquire');
const fakeOctoDeployApi = require('./fake-octo-deploy');
const projectsReleases = require('./api-project-releases.json');

const OctopusReleasePromoter = proxyquire('../index', {
  'octopus-deploy': fakeOctoDeployApi
});

describe('promoting project\'s latest release', () => {
  it('should promote the latest release to designated ENV', () => {
    // Arrange
    const environmentId = 'Environment-101';
    const comments = 'comments';
    const projectIdOrSlug = projectsReleases.Items[0].ProjectId;
    const projectLatestRelease = projectsReleases.Items[0].Id;
    const promoter = new OctopusReleasePromoter({
      host: 'https://deploy.octo.test.com',
      apiKey: 'ABCDEF-12234'
    });

    // Act
    promoter.promoteRelease({
      comments,
      environmentId,
      projectIdOrSlug
    });

    // Assert
    promoter.client.deployment.create.calledWith(environmentId, projectLatestRelease, comments);
  });
});
