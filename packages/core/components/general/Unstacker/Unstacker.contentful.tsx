import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import { UnstackerProps } from './Unstacker.component'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import { UnstackerItemProps } from './components/UnstackerItem/UnstackerItem'
import { LinkEntry } from '../Link/Link.contentful'

import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { LinkProps } from '../Link/Link.component'
import { MapEntryTo } from '@rightpoint/core/next-contentful'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'

/**
 * Stack item
 */
export type UnstackerItemEntryFields = {
    title: EntryFields.Text
    body: EntryFields.Text
    content: Document
    media?: MultiMediaEntry
    link?: LinkEntry
}
export type UnstackerItemEntry = Entry<UnstackerItemEntryFields>

/**
 * Stack component
 */
export type UnstackerEntryFields = {
    internalName: EntryFields.Text
    heroTitle: EntryFields.Text
    items: UnstackerItemEntry[]
    a11yLabel: EntryFields.Text
}

export type UnstackerEntry = Entry<UnstackerEntryFields>

export const UnstackerDynamic = dynamic(() =>
    import('./Unstacker.component').then((mod) => mod.Unstacker)
)

const mapItemEntryToProps: MapEntryTo<
    UnstackerItemEntry,
    UnstackerItemProps
> = async ({ entry, manager }) => {
    const { title, media, link, content } = entry.fields
    return {
        title,
        content: await contentfulRichTextDocumentToJsonSafe(content, manager),
        multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
            restrictToContentTypes: ['multiMedia'],
        }),
        linkProps: await manager.getProps<LinkProps>(link, {
            restrictToContentTypes: ['componentBigLinkListItem'],
        }),
    }
}
const CONTENT_TYPE_ID = 'componentUnstacker' as const

export const unstackerMapperConfig = makeConfig<UnstackerEntry, UnstackerProps>(
    {
        __mapperType: 'component',
        contentTypeId: CONTENT_TYPE_ID,
        component: UnstackerDynamic,
        entryToProps: async ({ entry, manager }) => {
            const { internalName, heroTitle, items } = entry.fields
            return {
                heroTitle,
                items: await Promise.all(
                    items.map((item) =>
                        mapItemEntryToProps({
                            entry: item,
                            manager: manager,
                        })
                    )
                ),
            }
        },
        entryToRootProps: async ({ entry, manager }) => {
            return {
                a11y: {
                    // if it has a hero title (big text on last slide), it's the name of the whole section
                    label: entry.fields.a11yLabel || entry.fields.heroTitle,
                },
            }
        },
    }
)
