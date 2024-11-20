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

/**
 * Contentful entry types
 */
export type CardsListEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    cards: (
        | WorkDetailEntry
        | ThoughtDetailEntry
        | LandingPageEntry
        | StandardPageEntry
    )[]
    layout: CardsListLayoutTypes
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
            const { title, cards, layout } = entry.fields
            return {
                title,
                layout,
                cardsProps: await getCardsProps(cards),
            }
            async function getCardsProps(
                pageEntries: CardsListEntryFields['cards']
            ) {
                if (!pageEntries) {
                    return null
                }
                return await Promise.all(
                    pageEntries.map((pageEntry) => {
                        return manager.getPageCardProps(pageEntry)
                    })
                )
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
