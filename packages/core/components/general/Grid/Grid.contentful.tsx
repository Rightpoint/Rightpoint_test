import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { GridItemProps, GridProps } from './Grid.component'
import { GridLayouts } from './Grid.types'
import { contentfulWarning } from '@rightpoint/core/utils'
import { CardVariants } from '../Card/Card.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { GridItemEntry } from '../SimpleGrid/SimpleGrid.contentful'

/**
 * @deprecated
 * There is no longer a Grid component exposed directly via CMS.
 *
 * It is now rendered via the CardsList component.
 */
export type GridEntryFields = {
    title: EntryFields.Text
    a11yLabel: EntryFields.Text
    layout: EntryFields.Text
    heroStickyTitle: EntryFields.Boolean
    cardVariant: EntryFields.Text
    items: GridItemEntry[]
    pages: Entry<unknown>[] // todo: is there any benefit to typing this?
}

/**
 * @deprecated
 */
export type GridEntry = Entry<GridEntryFields>

/**
 * @deprecated
 */
export const GridDynamic = dynamic(() =>
    import('./Grid.component').then((mod) => mod.Grid)
)

/**
 * @deprecated
 */
export const gridMapperConfig = makeConfig<GridEntry, GridProps>({
    __mapperType: 'component',
    contentTypeId: 'grid',
    component: GridDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            layout,
            items = [],
            heroStickyTitle,
            cardVariant: cardVariantContentful,
            pages,
        } = entry.fields

        const linkEntryToGridItem = async (
            entry: GridItemEntry
        ): Promise<GridItemProps> => {
            const { title, bodyRichText, image, link } = entry.fields
            const multiMediaProps = (await manager
                .getComponentMapper(image, {
                    restrictToContentTypes: ['multiMedia'],
                })
                .getProps()) as any
            return {
                title,
                bodyRichTextDocument:
                    await contentfulRichTextDocumentToJsonSafe(
                        bodyRichText,
                        manager
                    ),
                multiMediaProps,
                linkProps: (await manager
                    .getComponentMapper(link, {
                        restrictToContentTypes: ['componentBigLinkListItem'],
                    })
                    .getProps()) as any,
            }
        }
        let gridLayout
        if (layout in GridLayouts) {
            gridLayout = layout
        } else {
            contentfulWarning(`Grid layout ${layout} is not supported`)
            gridLayout = GridLayouts.Grid1
        }

        let cardVariant
        if (cardVariantContentful in CardVariants) {
            cardVariant = cardVariantContentful
        } else {
            cardVariant = CardVariants.Default
        }

        return {
            title,
            gridLayout,
            items: await Promise.all(items.map(linkEntryToGridItem)),
            heroProps: {
                titleSticky: Boolean(heroStickyTitle),
            },
            cardsProps: pages
                ? (
                      await Promise.all(
                          pages.map((page) => {
                              return manager.getPageCardProps(page)
                          })
                      )
                  ).filter(Boolean)
                : null,
            cardVariant,
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        return {
            a11y: {
                label: entry.fields.a11yLabel || entry.fields.title,
            },
        }
    },
})
