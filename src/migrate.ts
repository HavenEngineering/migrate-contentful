#!/usr/bin/env node
require("ts-node/register");
import { Umzug } from "umzug";
import { ContentfulStorage } from "umzug-contentful";
import { runMigration, MigrationFunction } from "contentful-migration";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_ENVIRONMENT
) {
  // eslint-disable-next-line no-console
  console.error("Correct environment variables not set");
  process.exit(1);
}

async function migrate(migrationFunction: MigrationFunction): Promise<void> {
  await runMigration({
    migrationFunction,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environmentId: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });
}

const args = process.argv.slice(2);
const globIndex = args.findIndex(arg => arg === '--glob');
const glob = globIndex !== -1 ? args[globIndex + 1] : `${process.cwd()}/migrations/scripts/*.ts`;
if (globIndex !== -1) {
  process.argv.splice(2 + globIndex, 2);
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
