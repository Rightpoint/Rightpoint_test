import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    SimpleGridComposedProps,
    SimpleGridItemProps,
} from './SimpleGrid.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { contentfulWarning } from '@rightpoint/core/utils'
import { GridItemEntry } from '../Grid/Grid.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type SimpleGridEntryFields = {
    showArrows: EntryFields.Boolean
    items: GridItemEntry[]

    // for hero
    heroTitle: EntryFields.Text
    heroSubtitle: EntryFields.Text

    a11yLabel: EntryFields.Text

    columnsXl: EntryFields.Text

    // for background
    backgroundColor: EntryFields.Text
}

export type SimpleGridEntry = Entry<SimpleGridEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const SimpleGridDynamic = dynamic(() =>
    import('./SimpleGrid.component').then((mod) => mod.SimpleGridComposed)
)

export const simpleGridMapperConfig = makeConfig<
    SimpleGridEntry,
    SimpleGridComposedProps
>({
    __mapperType: 'component',
    contentTypeId: 'simpleGrid',
    component: SimpleGridDynamic,
    entryToProps: async ({ entry, manager }) => {
        const { showArrows, items, heroTitle, heroSubtitle, columnsXl } =
            entry.fields
        return {
            showArrows,
            items: await Promise.all(
                items.map(async (item): Promise<SimpleGridItemProps> => {
                    const { title, body, bodyRichText, image, link } =
                        item.fields
                    return {
                        title,
                        body,
                        bodyRichTextDocument:
                            await contentfulRichTextDocumentToJsonSafe(
                                bodyRichText,
                                manager
                            ),
                        multiMediaProps: (await manager
                            .getComponentMapper(image)
                            .getProps()) as MultiMediaProps,
                        linkProps: (await manager
                            .getComponentMapper(link)
                            .getProps()) as any,
                    }
                })
            ),
            heroProps: {
                title: heroTitle,
                subtitle: heroSubtitle,
            },
            columnsXl,
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { backgroundColor } = entry.fields
        let backgroundColorToReturn

        if (backgroundColor && backgroundColor in BackgroundColors) {
            backgroundColorToReturn = backgroundColor
        } else {
            backgroundColor &&
                contentfulWarning(
                    `Background color ${backgroundColor} is not supported`
                )
            backgroundColorToReturn = BackgroundColors.None
        }

        return {
            container: true,

            background: {
                backgroundColor: backgroundColorToReturn,
            },

            a11y: {
                label: entry.fields.a11yLabel || entry.fields.heroTitle,
            },
        }
    },
})
