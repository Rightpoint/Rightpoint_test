import { rpMigrationWrapper } from '../utils/rp-migration-wrapper'

/**
 * Hero component now has a distinct media reference field
 * so that content authors can upload media and arbitrary other components below.
 *
 * This migration will move the content reference to the new media field, if the content reference
 * is a MultiMedia entry.
 */
const migrateHeaderRichText = rpMigrationWrapper((migration, context) => {
    migration.transformEntries({
        // Start from blog post's tags field
        contentType: 'componentHeader',
        from: ['subtitle'],
        to: ['body'],
        // shouldPublish: 'preserve',
        transformEntryForLocale: async (fromFields, currentLocale) => {
            if (context) {
                if (!fromFields.subtitle) {
                    return
                }
                const subtitle = fromFields.subtitle[currentLocale]
                const node = {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                        {
                            nodeType: 'text',
                            value: subtitle,
                            marks: [],
                            data: {},
                        },
                    ],
                }
                const richText = {
                    nodeType: 'document',
                    content: [node],
                    data: {},
                }
                return {
                    body: richText,
                }
            }
            return
        },
    })
})

module.exports = migrateHeaderRichText
