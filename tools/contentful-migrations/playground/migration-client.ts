import { runMigration } from 'contentful-migration'

import Migration from 'contentful-migration'
console.log('Migration client')
// move to env vars
const options = {
    spaceId: '82nyha70yb5v',
    accessToken: 'CFPAT-tMvr0fC6duHbTee3S-iH0XSUfjJCvJHcC4G1MIFU-qE',
}

interface RunMigrationParams {
    migrationFunction(migration: Migration): void
}

export const runMigrationWithAuth = async ({
    migrationFunction,
}: RunMigrationParams) => {
    console.log(`Running migration`)
    await runMigration({ ...options, migrationFunction })
        .then(() => console.log('Migration Done!'))
        .catch((e) => console.error(e))
}
