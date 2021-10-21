# Module Template

Use this template to get your new npm module started and ready to be published to the `@havenengineering` GitHub Package Registry.

## Usage

- [Create](https://github.com/HavenEngineering/module-template/generate) a new repository from this template. See the [docs](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template#creating-a-repository-from-a-template) from GitHub.
- Replace the string `REPOSITORY_NAME` with your module's name throughout the repository. Our convention is that it should be the same as the name of your repository.
- The libraries included in the `package.json` have most likely been updated since this template was created. Run [`npm outdated`](https://docs.npmjs.com/cli/v7/commands/npm-outdated) to see which ones to update. You can run [`npm update`](https://docs.npmjs.com/cli/v7/commands/npm-update) to automatically update some of them, but this won't upgrade to new major versions.
- The module is configured to notify MS Teams when the build or publish workflows on GitHub Actions fail. To get this working, you need to:
  - Follow [these steps](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) to create a new webhook URL in the channel you'd like to receive notifications. Copy the URL.
  - Create a new "Repository Secret" called `MSTEAMS_WEBHOOK` [in the GitHub settings for your repo](https://github.com/HavenEngineering/REPOSITORY_NAME/settings/secrets/actions). Paste the URL from the previous step as the value.

## Publishing the package

There is a [GitHub action](https://github.com/HavenEngineering/REPOSITORY_NAME/actions/workflows/publish.yml) configured to publish the package on new version tags. To publish a new version of the package:

- Run [`npm version {type}`](https://docs.npmjs.com/cli/v7/commands/npm-version) e.g. `npm version patch` to create a new version. Be sure to observe the [semver](https://semver.org/) rules. You'll notice a new tag `vX.X.X` has been created.
- Push your code and the new tag. You can run `git push --follow-tags`.

Useful links:
- [Published versions of REPOSITORY_NAME](https://github.com/HavenEngineering/REPOSITORY_NAME/packages) 
- [Publish workflow on GitHub Actions](https://github.com/HavenEngineering/REPOSITORY_NAME/actions/workflows/publish.yml)
