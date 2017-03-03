const OctoDeployApi = require('octopus-deploy');

/**
 * Constructor used to initialise the octopus deploy release promoter
 * @constructor
 * @param {Object} options - configuration options
 * @param {String} options.apiKey - API key for accessing octopus deploy instance
 * @param {String} options.host - URL of ocotopus server
 * @returns {Object}
 */
const OctopusReleasePromoter = function(octopusApiOptions) {
  this.client = new OctoDeployApi(octopusApiOptions);

  this._addMissingFeaturesToOctoDeployApi();
};

/**
 * Method will add a search for releases based on a projectId
 * @private
 */
OctopusReleasePromoter.prototype._addMissingFeaturesToOctoDeployApi = function() {
  this.client.project.getReleasesById = (projectId) =>  {
    return this.client.request.get({
      uri: `/api/projects/${projectId}/releases`
    });
  };
};

/**
 * This will promote a previously created release to an environment
 * - Deploying Specific Release
 *   - Required
 *     * options.releaseId
 * - Deploying Latest release
 *   - Required
 *     * options.projectIdOrSlug
 * @param {Object} options - configuration options
 * @param {String} options.environmentId - enviornment id which will get new release (required)
 * @param {String} [options.projectIdOrSlug] - projectId or project slug
 * @param {String} [options.releaseId=latest] - releaseId to promote to new environment
 * @param {String} [options.comments] - comments for deployment
 * @returns {promise|Object}
 */
OctopusReleasePromoter.prototype.promoteRelease = function(options) {
  const comments = options.comments || '';
  const environmentId = options.environmentId;
  const releaseId = options.releaseId || 'latest';

  if(!environmentId) {
    throw new TypeError('options.environmentId argument is required');
  }

  if(releaseId.toLowerCase() !== 'latest') {
    return this._promote({
      comments,
      environmentId,
      releaseId: options.releaseId
    });
  }

  if(!options.projectIdOrSlug) {
    throw new TypeError('options.projectIdOrSlug argument is required as we will be promoting project\'s latest release');
  }

  return this._getProjectId(options.projectIdOrSlug)
    .then(this._getLatestReleaseId.bind(this))
    .then((latestReleaseId) => {
      return this._promote({
        comments,
        environmentId,
        releaseId: latestReleaseId
      });
    });
};

/**
 * Method that creates deployment for the promotion
 * Will eventually try to check if release is already in that that environment,
 * and based on that either deploy or not deploy
 * @private
 * @param {Object} options - configuration options
 * @param {String} options.environmentId - enviornment id which will get new release (required)
 * @param {String} options.releaseId - releaseId to promote to new environment
 * @param {String} options.comments - comments for deployment
 * @returns {promise|Object}
 */
OctopusReleasePromoter.prototype._promote = function(options) {
  return this.client.deployment.create(options.environmentId, options.releaseId, options.comments);
};

/**
 * Method will find project using either project slug or project id and returns
 * the project's id
 * @private
 * @param {String} projectIdOrSlug - project slug or project id
 * @returns {promise|Object}
 */
OctopusReleasePromoter.prototype._getProjectId = function(projectIdOrSlug) {
  return this.client.project.findBySlugOrId(projectIdOrSlug)
    .then(project => project.Id);
};

/**
 * Method will find project's latest release and return the release's id
 * @private
 * @param {String} projectId - project id
 * @returns {promise|Object}
 */
OctopusReleasePromoter.prototype._getLatestReleaseId = function(projectId) {
  return this.client.project.getReleasesById(projectId)
    .then(response => response.Items[0].Id);
};

module.exports = OctopusReleasePromoter;
