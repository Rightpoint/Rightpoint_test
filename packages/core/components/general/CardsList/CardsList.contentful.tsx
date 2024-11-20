import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { CardsListLayouts, CardsListProps } from './CardsList.component'
import type {
    StandardPageEntry,
    LandingPageEntry,
    ThoughtDetailEntry,
    WorkDetailEntry,
} from '@rightpoint/core/pages'
import { CardVariants } from '../Card/Card.component'
import { backgroundTypeUtils } from '../../layout/RootComponent/background-color-type-utils'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { HeaderEntry } from '../../v2/Header/Header.contentful'

/**
 * Contentful entry types
 */
export type CardsListEntryFields = {
    internalName: EntryFields.Text
    header: HeaderEntry
    layout: CardsListLayouts
    cardVariant: CardVariants
    cards: (
        | WorkDetailEntry
        | ThoughtDetailEntry
        | LandingPageEntry
        | StandardPageEntry
    )[]
    backgroundColor: string

    viewMoreLink?: LinkEntry
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
            const { header, cards, layout, cardVariant, viewMoreLink } =
                entry.fields
            return {
                layout,
                cardsProps: await getCardsProps(cards),
                cardVariant,
                headerProps: await manager.getProps(header),
                linkProps: await manager.getLinkProps(viewMoreLink),
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
        },
        entryToRootProps: async ({ entry }) => {
            const { backgroundColor } = entry.fields
            return {
                container: true,
                background: {
                    backgroundColor:
                        backgroundTypeUtils.getBackgroundColor(backgroundColor),
                },
            }
        },
    }
)
