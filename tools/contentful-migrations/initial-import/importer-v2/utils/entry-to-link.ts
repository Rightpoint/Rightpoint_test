import { Asset, Entry } from 'contentful-management'

/**
 * Contentful entry uploads require a link type payload, not a full entry.
 * This function converts an entry to a link type payload.
 */
type EntryToLink = (entry: Entry | Asset, type: 'Entry' | 'Asset') => any
export const entryToLink: EntryToLink = (entry, type) => {
    if (!entry) {
        return null
    }
    return {
        sys: {
            type: 'Link',
            linkType: type || 'Entry',
            id: entry.sys.id,
        },
    }
}
