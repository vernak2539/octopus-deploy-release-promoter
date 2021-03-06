# Octopus Deploy Release Promoter

This module aims to make Octopus release promotion easier.

```bash
npm install --save octopus-deploy-release-promoter

# or

yarn add octopus-deploy-release-promoter
```

In Octopus Deploy, releases are created and then deployed to an environment. If your
lifecycle has multiple environments, you may see a button in the UI saying "Promote release to {environment}...".

What does this actually mean? There's nothing special to it, which confused me at first. It's just deploying the same release to a different environment.

Pretty simple eh?

## When to use this?

Let's say you have a project that has a lifecycle with different environments.
You've created a release in your "QA/Continuous" environment, but now it's time to promote
it to the "Stable/Production" environment.

You don't want to have to do the manual work of finding the latest release ID every time, inserting it, and then running a script. You
just want to deploy the latest release in your project to this new environment.

All you'll need to do is below:

```js
const OctopusReleasePromoter = require('octopus-deploy-release-promoter');

const config = {
    host: 'https://deploy.mycompany.com',
    apiKey: 'ABC-123' // This is used to authorize against the REST Api
};

const promoter = new OctopusReleasePromoter(config);

// this will find the latest release on your project
// and deploy it to the environment provided
promoter.promoteRelease({
  environmentId: 'Environment-101',
  projectId: 'project-id-or-slug'
});
```

## When not to use this?

If you have a release ID and an environment ID, and all you're looking to do is deploy that release to an new environment,
I suggest using this [octopus depoy npm package][octopus-deploy-npm].

All you'll need to do is below:

```js
const OctoDeployApi = require('octopus-deploy');

const environmentId = 'Environment-101';
const releaseId = 'Release-101';
const config = {
    host: 'https://deploy.mycompany.com',
    apiKey: 'ABC-123' // This is used to authorize against the REST Api
};

const client = new OctoDeployApi(config);

client.deployment.create(environmentId, releaseId);
```

This can be done using this module as well. It would look like below:

```js
const OctopusReleasePromoter = require('octopus-deploy-release-promoter');

const config = {
    host: 'https://deploy.mycompany.com',
    apiKey: 'ABC-123' // This is used to authorize against the REST Api
};

const promoter = new OctopusReleasePromoter(config);

promoter.promoteRelease({
  environmentId: 'Environment-101',
  releaseId: 'Release-101'
});
```

## Next Feature

At the moment, this will deploy the latest release even if it's currently on the
designated environment. I'm hoping to add a feature that will figure out if
the latest release is already on that environment or not. If it is, then we will
give a nice little message that it's already that and not trigger a deployment.

[octopus-deploy-npm]: https://www.npmjs.com/package/octopus-deploy
