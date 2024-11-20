import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { InPageLinkListProps } from './InPageLinkList.component'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'
import { backgroundTypeUtils } from '../../layout/RootComponent/background-color-type-utils'

export type LinkListEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text

    body: Document

    linksTitle: EntryFields.Text
    links: Entry<any>[]

    ctaLink: Entry<any>

    media: MultiMediaEntry
}

type LinkListEntry = Entry<LinkListEntryFields>

export type InPageLinkListEntryFields = {
    internalTitle: EntryFields.Text
    items: LinkListEntry[]
    backgroundColor: string
}

export type InPageLinkListEntry = Entry<InPageLinkListEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const InPageLinkListDynamic = dynamic(() =>
    import('./InPageLinkList.component').then((mod) => mod.InPageLinkList)
)

export const inPageLinkListMapperConfig = makeConfig<
    InPageLinkListEntry,
    InPageLinkListProps
>({
    __mapperType: 'component',
    component: InPageLinkListDynamic,
    contentTypeId: 'componentInPageLinkList',
    entryToProps: async ({ entry, manager }) => {
        const { items } = entry.fields
        return {
            items: await Promise.all(
                items?.map(async (item) => {
                    const {
                        title,
                        body,
                        linksTitle,
                        links = [],
                        media,
                        ctaLink,
                    } = item.fields
                    return {
                        title,
                        body: await contentfulRichTextDocumentToJsonSafe(
                            body,
                            manager
                        ),
                        linksListProps: {
                            title: linksTitle,
                            linksProps: await Promise.all(
                                links?.map((link) => manager.getLinkProps(link))
                            ),
                        },
                        multiMediaProps: await manager.getProps(media),
                        ctaLinkProps: await manager.getLinkProps(ctaLink),
                    }
                })
            ),
        }
    },
    // WARNING: Do not use manager in a way that calls getXProps which may cause circular dependencies.
    entryToRootProps: async ({ entry }) => {
        const { backgroundColor } = entry.fields
        return {
            container: true,
            background: {
                backgroundColor:
                    backgroundTypeUtils.getBackgroundColor(backgroundColor),
            },
            noPadding: true,
            noOverflow: true,
        }
    },
})
