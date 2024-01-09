#!/usr/bin/env node
require("ts-node/register");
import { Umzug } from "umzug";
import { ContentfulStorage } from "umzug-contentful";
import { runMigration, MigrationFunction } from "contentful-migration";
import * as fs from "fs";
import { config } from "dotenv";
import { doesCliFlagExist, extractCliFlagValue } from "./utils/cli";
config();

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_ENVIRONMENT
) {
  // eslint-disable-next-line no-console
  console.error("Correct environment variables not set");
  process.exit(1);
}

const glob = extractCliFlagValue("--glob") ?? `${process.cwd()}/migrations/scripts/*.ts`;
const yes = doesCliFlagExist("-y");

async function migrate(migrationFunction: MigrationFunction): Promise<void> {
  await runMigration({
    migrationFunction,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environmentId: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    yes,
  });
}

const umzug = new Umzug({
  migrations: { glob },
  storage: new ContentfulStorage({
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environmentId: process.env.CONTENTFUL_ENVIRONMENT,
    contentfulManagementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    locale: process.env.CONTENTFUL_LOCALE
  }),
  context: { migrate }, // do not pass a function as context – umzug will call it
  logger: console,
  create: {
    template: filepath => [
      [filepath, fs.readFileSync(`${__dirname}/template.txt`).toString()]
    ],
    folder: `${process.cwd()}/migrations/scripts/`
  }
});

if (require.main === module) {
  void umzug.runAsCLI();
}
