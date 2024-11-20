import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    VerticalTabsComposedProps,
    VerticalTabsItemProps,
} from './VerticalTabs.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { MultiMediaProps } from '../../general/MultiMedia/MultiMedia.component'
import { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'
import { HeaderEntry } from '../Header/Header.contentful'
import { backgroundTypeUtils } from '../..'

export type VerticalTabsItemFields = {
    title: EntryFields.Text
    body: Document
    media?: MultiMediaEntry
}
export type VerticalTabsItemEntry = Entry<VerticalTabsItemFields>

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type VerticalTabsEntryFields = {
    header: HeaderEntry

    items: VerticalTabsItemEntry[]

    // for background
    backgroundColor: EntryFields.Text

    a11yLabel: EntryFields.Text
}

export type VerticalTabsEntry = Entry<VerticalTabsEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const VerticalTabsDynamic = dynamic(() =>
    import('./VerticalTabs.component').then((mod) => mod.VerticalTabsComposed)
)

export const verticalTabsMapperConfig = makeConfig<
    VerticalTabsEntry,
    VerticalTabsComposedProps
>({
    __mapperType: 'component',
    contentTypeId: 'componentVerticalTabs',
    component: VerticalTabsDynamic,
    entryToProps: async ({ entry, manager }) => {
        const { items, header } = entry.fields
        return {
            headerProps: await manager.getProps(header),
            items: await Promise.all(
                items.map(async (item): Promise<VerticalTabsItemProps> => {
                    const { title, body, media } = item.fields
                    return {
                        title,
                        bodyDocument:
                            await contentfulRichTextDocumentToJsonSafe(
                                body,
                                manager
                            ),
                        multiMediaProps:
                            await manager.getProps<MultiMediaProps>(media, {
                                restrictToContentTypes: ['multiMedia'],
                            }),
                    }
                })
            ),
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { backgroundColor } = entry.fields
        return {
            container: true,

            background: {
                backgroundColor:
                    backgroundTypeUtils.getBackgroundColor(backgroundColor),
            },

            a11y: {
                label: entry.fields.a11yLabel,
            },
        }
    },
})
