# Contentful migrations

# Usage

CD into this directory.

`cd ./tools/contentful-migrations`

## Login to the contentful CLI

`yarn contentful login`

## Writing a migration

Docs: https://www.contentful.com/developers/docs/tutorials/cli/scripting-migrations/

-   Write migrations in the `./migrations` folder, and follow precedence.
-   Wrap migrations with the `rpMigrationWrapper` function, which adds typing and prevents accidental changes against `master`

## Show current environments

`yarn contentful space environment list`

## Clone environment

Always clone an environment to apply migrations to. Do not apply to production.

`yarn contentful space environment create --environment-id 'migration-test' --name 'Migration Test' --source master`

## Apply a migration

`yarn ts-migrate ./migrations/01-migration.ts --environment-id <env>`

## CLI Config

https://www.contentful.com/developers/docs/tutorials/cli/config-management/

`yarn contentful config list` to see current contentful configs.

`yarn contentful config add --help` to see what options are available.

## Export content types

To export content types as `JSON` run:

`yarn contentful space export --config ./import/import-schema.config.json`

This export contains all content types and can be used to create typings locally or runtime validation of schema migrations if desired.

## Apply to master

Applying migrations to `master` is not allowed.

To bypass, set an env var:

`DANGEROUSLY_MIGRATE_TO_MASTER=true yarn ts-migrate ...`

# Step by step migration instructions (SOP) TBD

WIP

## Schema migration only

For a schema migration and no data migration, use the Contentful Merge app.

-   Clone the master contentful environment via CLI or GUI
-   Apply changes to the schema in the cloned environment
-   Install the Early Access Program (EAP) "Merge" app to the cloned environment
-   Clone contentful environment
-   Write migrations against cloned environment

1. `yarn contentful space environment create --source master --environment-id 'master-to-migrate' --name 'Master To Migrate' `

# Initial Migrations

Initial migration scripts are one off scripts to migrate existing content into the new site.

They are one off scripts/implementations and can be removed once the migration is complete.

## Running the work migration

    yarn ts-node-esm initial-import/importer-v2/landing/import-work.ts
