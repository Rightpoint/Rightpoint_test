import { rpMigrationWrapper } from '../utils/rp-migration-wrapper'

const migration = rpMigrationWrapper((migration, context) => {
    migration.transformEntries({
        // Start from blog post's tags field
        contentType: 'gridItem',
        from: ['title'],
        to: ['internalTitle', 'title'],
        shouldPublish: 'preserve',
        transformEntryForLocale: async (fromFields, currentLocale) => {
            if (context) {
                if (!fromFields.title) {
                    return
                }
                return {
                    title: fromFields.title[currentLocale],
                    internalTitle: fromFields.title[currentLocale],
                }
            }
            return
        },
    })
})

module.exports = migration
