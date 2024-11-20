import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    VerticalTabsComposedProps,
    VerticalTabsItemProps,
} from './VerticalTabs.component'
import { contentfulWarning } from '@rightpoint/core/utils'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { Document } from '@contentful/rich-text-types'
import { HeaderVariants } from '../../v2/Header/Header.component'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { MultiMediaProps } from '../../general/MultiMedia/MultiMedia.component'
import { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'

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
    items: VerticalTabsItemEntry[]

    // for header
    headerEyebrow: EntryFields.Text
    headerTitle: EntryFields.Text
    headerBody: Document
    headerVariant: EntryFields.Text

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
        const { items, headerTitle, headerBody, headerEyebrow, headerVariant } =
            entry.fields
        return {
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
                        multiMediaProps: (await manager
                            .getComponentMapper(media)
                            .getProps()) as MultiMediaProps,
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
