import { EntryFields, Entry } from 'contentful'

import { Link, LinkProps } from './Link.component'
import { get } from 'lodash'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ConfigManagerType } from '@rightpoint/core/next-contentful'
import { PardotEntry } from '../../general/Pardot/Pardot.contentful'

type PageEntry = Entry<any>

export type LinkEntryFields = {
    title: EntryFields.Text
    linkReference?: PageEntry
    url?: EntryFields.Text
    opensInNewTab?: EntryFields.Boolean
    noFollow?: EntryFields.Boolean
    scrollToText?: EntryFields.Text
    cursorText: EntryFields.Text

    pardotForm?: PardotEntry
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
    const { url, linkReference, scrollToText } = entry.fields
    const targetContentTypeId = get(linkReference, 'sys.contentType.sys.id')
    const isLinkResolved = !!targetContentTypeId
    if (isLinkResolved) {
        return await manager.getUrl(linkReference)
    }

    // if there's scroll text, it's okay to not have an href
    if (scrollToText) {
        return url || ''
    }
    // otherwise, fall back to the custom url
    return url || '#no-link-and-no-url'
}

/**
 * This is the new link model with new content type id.
 */
export const linkMapperNewConfig = makeConfig<LinkEntry, LinkProps>({
    __mapperType: 'component',
    contentTypeId: 'link',
    component: Link,
    entryToProps: async ({ entry, manager }) => {
        const { title, opensInNewTab, noFollow, cursorText, pardotForm } =
            entry.fields
        const href = await entryToHref({ entry, manager })
        const scrollTo = getScrollTo()
        return {
            text: title ?? '',
            href: href,
            meta: {
                opensInNewTab,
                noFollow,
            },
            scrollTo,
            cursor: cursorText ? { text: cursorText } : null,

            pardotProps: await manager.getProps(pardotForm),
        }
        function getScrollTo() {
            const { scrollToText } = entry.fields
            if (!scrollToText) {
                return null
            }
            return {
                text: scrollToText,
            }
        }
    },
})

/**
 * @deprecated this is the old link model with a weird content type id
 */
export const linkMapperOldConfig = makeConfig<LinkEntry, LinkProps>({
    __mapperType: 'component',
    contentTypeId: 'componentBigLinkListItem',
    component: Link,
    entryToProps: async ({ entry, manager }) => {
        const { title, opensInNewTab, noFollow, cursorText, pardotForm } =
            entry.fields
        const href = await entryToHref({ entry, manager })
        const scrollTo = getScrollTo()
        /**
         * @deprecated this is the old link model
         */
        return {
            text: title ?? '',
            href: href,
            meta: {
                opensInNewTab,
                noFollow,
            },
            scrollTo,
            cursor: cursorText ? { text: cursorText } : null,
            pardotProps: await manager.getProps(pardotForm),
        }
        /**
         * Get scrollTo props.
         *
         * Currently, this only matches text. Text match is fragile/naive, and should support further matching methods
         * in the future i.e. some ID field, or a direct reference to the element to scroll to via entry ID exposed on RootComponent
         */
        function getScrollTo() {
            const { scrollToText } = entry.fields
            if (!scrollToText) {
                return null
            }
            return {
                text: scrollToText,
            }
        }
    },
})
