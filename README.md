# migrate-contentful

Tooling to simplify migrating your content model in Contentful.

## Installation

```
npm install -D @havenengineering/migrate-contentful
```

## Usage

### Config

The library expects the following environment variables to be set:

env|description
---|---
`CONTENTFUL_SPACE_ID`|The ID of the Contentful space you're migrating
`CONTENTFUL_MANAGEMENT_TOKEN`|An auth token for the Contentful Management API. Available in the Contentful UI.
`CONTENTFUL_ENVIRONMENT`|The [environment](https://www.contentful.com/developers/docs/concepts/multiple-environments/) you'd like to run the migration on.
`CONTENTFUL_LOCALE`|(Optional, default `en-US`) The [locale](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/locales/locale) you'd like to run the migration on (must be available within your space).

If you have a `.env` file in the root of your application, the variables will be set from there. Example `.env`:

```
CONTENTFUL_SPACE_ID=abc123
CONTENTFUL_MANAGEMENT_TOKEN=secret-token
```

Make sure the `.env` file is in your `.gitignore` so you don't accidentally commit your secrets.

It's not recommended to set the `CONTENTFUL_ENVIRONMENT` globally like this, because you likely want to specify it every time you interact with an environment. E.g. `CONTENTFUL_ENVIRONMENT=master migrate-contentful pending`.

### Available commands

This library uses [`umzug`'s CLI](https://github.com/sequelize/umzug#cli-usage) to power it's migrations. For a list of available commands, run:

```sh
npx migrate-contentful -h
```

## Customising migration paths

The default migrations folder is `migrations/scripts`

When creating a migration, you can use the `--folder` flag to specify a custom folder to look for migrations in.
```
npx migrate-contentful create --folder <path> --name <name>
``` 

When running a migration `npx migrate-contentful up`, one can _optionally_ pass a `--glob` flag pointing to your custom folder.
```
npx migrate-contentful up --glob my-custom-folder/*.ext
```

If this is not provided, it will default to `${cwd}/migrations/scripts/*.ts`

## Suppressing prompts

To suppress prompts when running a migration, one can _optionally_ pass a `-y` flag.

```
npx migrate-contentful up -y
```

If this exists, it will suppress prompts, if not it won't.

## Contributing

Contributions welcome!

### Publishing the package

There is a [GitHub action](https://github.com/HavenEngineering/migrate-contentful/actions/workflows/publish.yml) configured to publish the package on new version tags. To publish a new version of the package:

- Run [`npm version {type}`](https://docs.npmjs.com/cli/v7/commands/npm-version) e.g. `npm version patch` to create a new version. Be sure to observe the [semver](https://semver.org/) rules. You'll notice a new tag `vX.X.X` has been created.
- Push your code and the new tag. You can run `git push --follow-tags`.

Useful links:
- [Published versions of migrate-contentful](https://github.com/HavenEngineering/migrate-contentful/packages) 
- [Publish workflow on GitHub Actions](https://github.com/HavenEngineering/migrate-contentful/actions/workflows/publish.yml)
