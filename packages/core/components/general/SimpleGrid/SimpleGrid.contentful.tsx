import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    SimpleGridComposedProps,
    SimpleGridItemProps,
    SimpleGridVariants,
} from './SimpleGrid.component'
import { contentfulWarning } from '@rightpoint/core/utils'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { Document } from '@contentful/rich-text-types'
import { HeaderVariants } from '../../v2/Header/Header.component'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'

export type GridItemFields = {
    image?: MultiMediaEntry
    title: EntryFields.Text
    bodyRichText: Document
    link: LinkEntry
    pageLink: Entry<any>
}
export type GridItemEntry = Entry<GridItemFields>

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type SimpleGridEntryFields = {
    items: GridItemEntry[]
    listTitle?: EntryFields.Text
    variant?: SimpleGridVariants

    // for header
    headerEyebrow: EntryFields.Text
    headerTitle: EntryFields.Text
    headerBody: Document
    headerVariant: EntryFields.Text

    // a11y
    a11yLabel: EntryFields.Text

    // responsive
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
        const {
            variant,
            listTitle,
            headerTitle,
            headerBody,
            headerEyebrow,
            headerVariant,
            columnsXl,
            items,
        } = entry.fields
        return {
            listTitle,
            variant: getVariant(variant),
            items: await Promise.all(
                items.map(async (item): Promise<SimpleGridItemProps> => {
                    const { title, bodyRichText, image, link, pageLink } =
                        item.fields

                    return {
                        title,
                        bodyDocument:
                            await contentfulRichTextDocumentToJsonSafe(
                                bodyRichText,
                                manager
                            ),
                        multiMediaProps: (await manager
                            .getComponentMapper(image)
                            .getProps()) as MultiMediaProps,
                        linkProps: await getLinkProps(),
                    }
                    async function getLinkProps() {
                        if (link) {
                            return (await manager
                                .getComponentMapper(link)
                                .getProps()) as any
                        }
                        if (pageLink) {
                            return {
                                href: await manager.getUrl(pageLink),
                            }
                        }
                    }
                })
            ),
            headerProps: {
                eyebrow: headerEyebrow,
                title: headerTitle,
                variant: getHeaderVariant(headerVariant),
                body: await contentfulRichTextDocumentToJsonSafe(
                    headerBody,
                    manager
                ),
            },
            columnsXl,
        }
        function getVariant(variant: string) {
            const isVariant = (
                variant: string
            ): variant is SimpleGridVariants => variant in SimpleGridVariants
            return isVariant(variant) ? variant : SimpleGridVariants[0]
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
                label: entry.fields.a11yLabel || entry.fields.headerTitle,
            },
        }
    },
})
