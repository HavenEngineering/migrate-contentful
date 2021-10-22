# migrate-contentful

Tooling to simplify migrating your content model in Contentful.

## Installation

```
npm install -D @havenengineering/migrate-contentful
```

With your `.npmrc` configured to point to the Haven package repo on GitHub for the relevant scope:

```
@havenengineering:registry=https://npm.pkg.github.com
```

## Usage

### Config

The library expects the followin environment variables to be set:

env|description
---|---
`CONTENTFUL_SPACE_ID`|The ID of the Contentful space you're migrating
`CONTENTFUL_MANAGEMENT_TOKEN`|An auth token for the Contentful Management API. Available in the Contentful UI.
`CONTENTFUL_ENVIRONMENT`|The [environment](https://www.contentful.com/developers/docs/concepts/multiple-environments/) you'd like to run the migration on.

If you have a `.env` file in the root of your application, the variables will be set from there. Example `.env`:

```
CONTENTFUL_SPACE_ID=abc123
CONTENTFUL_MANAGEMENT_TOKEN=secret-token
```

It's not recommended to set the `CONTENTFUL_ENVIRONMENT` globally like this, because you likely want to specify it every time you interact with an environment.

### Available commands

This library uses [`umzug`'s CLI](https://github.com/sequelize/umzug#cli-usage) to power it's migrations. For a list of available commands, run:

```sh
npx migrate-contentful -h
```

## Publishing the package

There is a [GitHub action](https://github.com/HavenEngineering/migrate-contentful/actions/workflows/publish.yml) configured to publish the package on new version tags. To publish a new version of the package:

- Run [`npm version {type}`](https://docs.npmjs.com/cli/v7/commands/npm-version) e.g. `npm version patch` to create a new version. Be sure to observe the [semver](https://semver.org/) rules. You'll notice a new tag `vX.X.X` has been created.
- Push your code and the new tag. You can run `git push --follow-tags`.

Useful links:
- [Published versions of migrate-contentful](https://github.com/HavenEngineering/migrate-contentful/packages) 
- [Publish workflow on GitHub Actions](https://github.com/HavenEngineering/migrate-contentful/actions/workflows/publish.yml)
