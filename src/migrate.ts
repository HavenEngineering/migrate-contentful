#!/usr/bin/env node

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

const umzug = new Umzug({
  migrations: { glob: `${process.cwd()}/migrations/scripts/*.ts` },
  storage: new ContentfulStorage({
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environmentId: process.env.CONTENTFUL_ENVIRONMENT,
    contentfulManagementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
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
