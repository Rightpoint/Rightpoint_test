import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type {
    CardsListLayoutTypes,
    CardsListProps,
} from './CardsList.component'
import type {
    StandardPageEntry,
    LandingPageEntry,
    ThoughtDetailEntry,
    WorkDetailEntry,
} from '@rightpoint/core/pages'
import { Document } from '@contentful/rich-text-types'
import { HeaderVariants } from '../../v2/Header/Header.component'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { CardVariants } from '../Card/Card.component'

/**
 * Contentful entry types
 */
export type CardsListEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    headerBody: Document
    headerEyebrow: string
    headerVariant: HeaderVariants
    layout: CardsListLayoutTypes

    cardVariant: CardVariants

    cards: (
        | WorkDetailEntry
        | ThoughtDetailEntry
        | LandingPageEntry
        | StandardPageEntry
    )[]
}

export type CardsListEntry = Entry<CardsListEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const CardsListDynamic = dynamic(() =>
    import('./CardsList.component').then((mod) => mod.CardsList)
)

export const cardsListMapperConfig = makeConfig<CardsListEntry, CardsListProps>(
    {
        __mapperType: 'component',
        component: CardsListDynamic,
        contentTypeId: 'componentCardsList',
        entryToProps: async ({ entry, manager }) => {
            const {
                title,
                headerEyebrow,
                headerVariant,
                headerBody,
                cards,
                layout,
                cardVariant,
            } = entry.fields
            return {
                layout,
                cardsProps: await getCardsProps(cards),
                cardVariant,
                headerProps: {
                    title,
                    eyebrow: headerEyebrow,
                    body: await contentfulRichTextDocumentToJsonSafe(
                        headerBody,
                        manager
                    ),
                    variant: getHeaderVariant(headerVariant),
                },
            }
            async function getCardsProps(
                pageEntries: CardsListEntryFields['cards']
            ) {
                if (!pageEntries) {
                    return null
                }
                return (
                    await Promise.all(
                        pageEntries.map((pageEntry) => {
                            return manager.getPageCardProps(pageEntry)
                        })
                    )
                ).map((cardProps) => ({
                    ...cardProps,
                    variant: cardVariant || cardProps.variant,
                }))
            }
            function getHeaderVariant(headerVariant: string) {
                const isHeaderVariant = (
                    variant: string
                ): variant is HeaderVariants =>
                    HeaderVariants.includes(variant as any)
                return isHeaderVariant(headerVariant)
                    ? headerVariant
                    : HeaderVariants[0]
            }
        },
        entryToRootProps: async ({ entry, manager }) => {
            return {
                container: true,
                background: {
                    backgroundColor: 'Black',
                },
            }
        },
    }
)
