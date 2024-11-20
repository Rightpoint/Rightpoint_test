import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { PageHeaderProps } from './PageHeader.component'
import { Document } from '@contentful/rich-text-types'
import { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'
import { LinkEntry } from '../../links/Link/Link.contentful'
import {
    BackgroundColors,
    ContentColors,
} from '../../layout/RootComponent/background-color'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { LinkProps } from '../../links/Link/Link.component'

/**
 * Contentful entry types
 */
export type PageHeaderEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text

    // introductionEyebrow: EntryFields.Text
    subtitle: EntryFields.Text
    introduction: Document

    backgroundMedia: MultiMediaEntry
    backgroundTreatment: EntryFields.Text

    textColor?: EntryFields.Text
    backgroundColor?: EntryFields.Text

    linksHeader?: string
    links?: (LinkEntry | Entry<any>)[]

    bottomMedia?: MultiMediaEntry
}

export type PageHeaderEntry = Entry<PageHeaderEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const PageHeaderDynamic = dynamic(() =>
    import('./PageHeader.component').then((mod) => mod.PageHeader)
)

export const pageHeaderMapperConfig = makeConfig<
    PageHeaderEntry,
    PageHeaderProps
>({
    __mapperType: 'component',
    component: PageHeaderDynamic,
    contentTypeId: 'componentHeader',
    entryToProps: async ({ entry, manager }) => {
        const {
            // text
            title,
            introduction,
            subtitle,

            // links
            linksHeader,
            links,

            // colors
            textColor,
            backgroundColor,

            // background
            backgroundMedia,

            // bottom
            bottomMedia,
        } = entry.fields
        return {
            // text
            title,
            subtitle,
            introductionDocument: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),

            // links
            linksHeader,
            linksProps: await getLinksProps(links),
            // colors
            contentColor: getHeaderContentColor(textColor),
            backgroundColor: getHeaderBackgroundColor(backgroundColor),

            // background
            backgroundMultiMediaProps: await manager.getProps(backgroundMedia),

            // bottom
            bottomMultiMediaProps: await manager.getProps(bottomMedia),
        }
        async function getLinksProps(links: (LinkEntry | Entry<any>)[]) {
            if (!(links?.length > 0)) {
                return null
            }
            return await Promise.all(
                links.map(async (linkOrPageEntry): Promise<LinkProps> => {
                    return await manager.getLinkProps(linkOrPageEntry)
                })
            )
        }
        function getHeaderBackgroundColor(color) {
            const isValid = (color: string): color is BackgroundColors => {
                return color in BackgroundColors
            }
            return isValid(color) ? color : null
        }

        function getHeaderContentColor(color) {
            const isValid = (color: string): color is ContentColors => {
                return color in ContentColors
            }
            return isValid(color) ? color : null
        }
    },
    entryToRootProps: async ({ entry }) => {
        return {
            noMargins: true,
        }
    },
})
