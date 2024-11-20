# Initial Migrations

Initial migration scripts are one off scripts to migrate existing content into the new site.

They are one off scripts/implementations and can be removed once the migration is complete.

All uploads are tagged with a Contentful tag, so that we can easily track them & remove or otherwise continue processing them.

# Credentials, Contentful Spaces

Spaces and credentials are hard coded into the codebase for one time use.

Credentials in the repo will be invalidated at launch and switched to Vercel API authenticated credentials.

## Running the migrations

    - ENV_ID=staging-xyz yarn ts-node-esm initial-import/importer-v2/work/import-work.ts
    - ENV_ID=staging-xyz yarn ts-node-esm initial-import/importer-v2/landing/import-landing.ts
    - ENV_ID=staging-xyz yarn ts-node-esm initial-import/importer-v2/thought/import-thought.ts

## Gotchas

-   Ensure contentful access token has access to environment
