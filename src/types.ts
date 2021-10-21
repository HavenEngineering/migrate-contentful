import { MigrationFunction } from "contentful-migration";

export type MigrationContext = {
  context: {
    migrate: (migrationFunction: MigrationFunction) => Promise<void>;
  };
};

export type MigrationExecutor = (context: MigrationContext) => Promise<void>;
