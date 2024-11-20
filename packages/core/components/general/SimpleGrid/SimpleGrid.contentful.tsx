import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    SimpleGridComposedProps,
    SimpleGridItemProps,
    SimpleGridVariants,
} from './SimpleGrid.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { Document } from '@contentful/rich-text-types'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import { HeaderEntry } from '../../v2/Header/Header.contentful'
import { backgroundTypeUtils } from '../../layout/RootComponent/background-color-type-utils'
import { containerTypeUtils } from '../../layout/RootComponent/container-type-utils'

export type GridItemFields = {
    image?: MultiMediaEntry
    title: EntryFields.Text
    bodyRichText: Document
    link: LinkEntry
    pageLink: Entry<any>
}
export type GridItemEntry = Entry<GridItemFields>

export type SimpleGridEntryFields = {
    header: HeaderEntry

    items: GridItemEntry[]
    listTitle?: EntryFields.Text

    variant?: SimpleGridVariants

    // a11y
    a11yLabel: EntryFields.Text

    // for background
    backgroundColor: EntryFields.Text
    container: EntryFields.Text
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
            header,
            variant,
            listTitle,
            items = [],
            container,
        } = entry.fields
        return {
            listTitle,
            container,
            headerProps: await manager.getProps(header),
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
                        multiMediaProps: await manager.getProps(image, {
                            restrictToContentTypes: ['multiMedia'],
                        }),
                        linkProps: await manager.getLinkProps(pageLink || link),
                    }
                })
            ),
        }
        function getVariant(variant: string) {
            const isVariant = (
                variant: string
            ): variant is SimpleGridVariants => variant in SimpleGridVariants
            return isVariant(variant) ? variant : SimpleGridVariants[0]
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { backgroundColor, container } = entry.fields
        return {
            container: containerTypeUtils.getContainerWidth(container),

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
