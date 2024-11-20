import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { HorizontalCardsProps } from './HorizontalCards.component'
import { CardProps } from '../../general/Card/Card.component'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'

/**
 * Contentful entry types
 */
export type HorizontalCardsEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text
    content: Document
    cards: Entry<any>[]
    link: Entry<any>
}

export type HorizontalCardsEntry = Entry<HorizontalCardsEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const HorizontalCardsDynamic = dynamic(() =>
    import('./HorizontalCards.component').then((mod) => mod.HorizontalCards)
)

export const horizontalCardsMapperConfig = makeConfig<
    HorizontalCardsEntry,
    HorizontalCardsProps
>({
    __mapperType: 'component',
    component: HorizontalCardsDynamic,
    contentTypeId: 'componentHorizontalCards',
    entryToProps: async ({ entry, manager }) => {
        const { title, content, cards = [], link } = entry.fields
        return {
            title,
            content: await contentfulRichTextDocumentToJsonSafe(
                content,
                manager
            ),
            cardsProps: await Promise.all(
                cards?.map((entry) => manager.getPageCardProps(entry))
            ),
            linkProps: await manager.getLinkProps(link, {
                text: 'Learn More',
            }),
        }
    },
    // WARNING: Do not use manager in a way that calls getXProps which may cause circular dependencies.
    entryToRootProps: async ({ entry }) => {
        return {
            container: true,
            noMarginCollapse: false,
            noMargins: true,
        }
    },
})
