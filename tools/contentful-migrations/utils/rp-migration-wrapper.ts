import { MigrationFunction } from 'contentful-migration'

export const rpMigrationWrapper = (
    fn: MigrationFunction
): MigrationFunction => {
    return (migration, context) => {
        console.log(
            'Running Rightpoint migration on env: ',
            context?.environmentId
        )
        if (
            !process.env.DANGEROUSLY_MIGRATE_TO_MASTER &&
            context?.environmentId === 'master'
        ) {
            throw new Error(
                'Do not run migration on master environment. Set DANGEROUSLY_MIGRATE_TO_MASTER=true to bypass'
            )
        }
        fn(migration, context)
    }
}
