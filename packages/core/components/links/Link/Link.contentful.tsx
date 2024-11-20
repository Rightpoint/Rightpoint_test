import { EntryFields, Entry } from 'contentful'

import { Link, LinkProps } from './Link.component'
import { get } from 'lodash'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ConfigManagerType } from '@rightpoint/core/next-contentful'

type PageEntry = Entry<any>

export type LinkEntryFields = {
    title: EntryFields.Text
    linkReference?: PageEntry
    url?: EntryFields.Text
    opensInNewTab?: EntryFields.Boolean
    noFollow?: EntryFields.Boolean
    scrollToText?: EntryFields.Text
}

export type LinkEntry = Entry<LinkEntryFields>

/**
 * Extract URL from link entry.
 */

const entryToHref = async ({
    entry,
    manager,
}: {
    entry: LinkEntry
    manager: ConfigManagerType
}): Promise<string> => {
    const { url, linkReference } = entry.fields
    const targetContentTypeId = get(linkReference, 'sys.contentType.sys.id')
    const isLinkResolved = !!targetContentTypeId
    if (isLinkResolved) {
        return await manager.getUrl(linkReference)
    }
    // otherwise, fall back to the custom url
    return url || '#no-link-and-no-url'
}

export const CONTENT_TYPE_ID = 'componentBigLinkListItem'

export const linkMapperConfig = makeConfig<LinkEntry, LinkProps>({
    __mapperType: 'component',
    contentTypeId: CONTENT_TYPE_ID,
    component: Link,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            opensInNewTab,
            noFollow,
            scrollToText = '',
        } = entry.fields
        const hash = scrollToText ? '#' + scrollToText : ''
        const href = (await entryToHref({ entry, manager })) + hash
        return {
            text: title,
            href,
            meta: {
                opensInNewTab,
                noFollow,
            },
        }
    },
})
