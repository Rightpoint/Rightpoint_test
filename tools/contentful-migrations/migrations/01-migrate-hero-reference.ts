import { rpMigrationWrapper } from '../utils/rp-migration-wrapper'

/**
 * Hero component now has a distinct media reference field
 * so that content authors can upload media and arbitrary other components below.
 *
 * This migration will move the content reference to the new media field, if the content reference
 * is a MultiMedia entry.
 */
const migrateHeroContent = rpMigrationWrapper((migration, context) => {
    migration.transformEntries({
        // Start from blog post's tags field
        contentType: 'heroComponent',
        from: ['content'],
        to: ['media', 'content'],
        shouldPublish: 'preserve',
        transformEntryForLocale: async (fromFields, currentLocale) => {
            if (context) {
                if (!fromFields.content) {
                    return
                }
                const content = fromFields.content[currentLocale]
                const entryId = content.sys.id
                const entry = await context?.makeRequest({
                    method: 'GET',
                    url: `/entries/${entryId}`,
                })
                const contentTypeId = entry.sys.contentType.sys.id
                if (content && contentTypeId === 'multiMedia') {
                    return {
                        media: fromFields.content[currentLocale],
                        content: undefined,
                    }
                }
            }
            return
        },
    })
})

module.exports = migrateHeroContent
