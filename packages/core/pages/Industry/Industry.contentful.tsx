import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { IndustryPageProps } from './Industry.page'
import { Document } from '@contentful/rich-text-types'
import {
    ContentColors,
    contentfulRichTextDocumentToJsonSafe,
    LinkProps,
    MultiMediaEntry,
} from '@rightpoint/core/components'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export type IndustryPageEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    introductionEyebrow?: EntryFields.Text
    introduction: Document
    headerContentColor?: ContentColors
    headerLinks?: Entry<any>[]
    media: MultiMediaEntry
    backgroundMedia: MultiMediaEntry

    seo: SeoEntry
    components: Entry<any>[]

    cardTitle?: EntryFields.Text
    cardBody?: EntryFields.Text
    cardMedia?: MultiMediaEntry
}

export type IndustryPageEntry = Entry<IndustryPageEntryFields>

export const IndustryPageDynamic = dynamic(() =>
    import('./Industry.page').then((mod) => mod.IndustryPage)
)

export const industryPageMapperConfig = makeConfig<
    IndustryPageEntry,
    IndustryPageProps
>({
    __mapperType: 'page',
    contentTypeId: 'pageIndustry',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/industries/',
    component: IndustryPageDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            introduction,
            introductionEyebrow,
            components,
            media,
            backgroundMedia,
            headerContentColor,
            headerLinks,
        } = entry.fields
        return {
            title,
            multiMediaProps: await manager.getProps(media),
            backgroundMultiMediaProps: await manager.getProps(backgroundMedia),
            introductionEyebrow,
            introduction: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),
            headerLinksProps: headerLinks
                ? await Promise.all(
                      headerLinks.map(
                          async (pageEntry): Promise<LinkProps> => ({
                              href: await manager.getUrl(pageEntry),
                              text: pageEntry.fields.title,
                          })
                      )
                  )
                : null,
            components: await manager.getAllComponentsProps(components),
            headerContentColor: getHeaderContentColor(),
        }
        function getHeaderContentColor() {
            const isContentColor = (color: string): color is ContentColors => {
                return color in ContentColors
            }
            return isContentColor(headerContentColor)
                ? headerContentColor
                : null
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title,
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, cardMedia, cardTitle, cardBody, media, introduction } =
            entry.fields
        return {
            title: cardTitle || title,
            body: cardBody || documentToPlainTextString(introduction),
            multiMediaProps: await manager.getProps(cardMedia || media),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'View Industry',
            },
        }
    },
})
