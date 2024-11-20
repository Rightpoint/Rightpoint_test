import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { SolutionPageProps } from './Solution.page'
import { Document } from '@contentful/rich-text-types'
import {
    ContentColors,
    contentfulRichTextDocumentToJsonSafe,
    MultiMediaEntry,
} from '@rightpoint/core/components'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export type SolutionPageEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    introductionEyebrow?: EntryFields.Text
    introduction: Document
    backgroundMedia: MultiMediaEntry
    media: MultiMediaEntry
    relatedSolutions: SolutionPageEntry[]
    headerTextColor?: EntryFields.Text
    components: Entry<any>[]
    seo: SeoEntry

    cardTitle?: EntryFields.Text
    cardBody?: EntryFields.Text
    cardMedia?: MultiMediaEntry
}

export type SolutionPageEntry = Entry<SolutionPageEntryFields>

export const SolutionPageDynamic = dynamic(() =>
    import('./Solution.page').then((mod) => mod.SolutionPage)
)

export const solutionPageMapperConfig = makeConfig<
    SolutionPageEntry,
    SolutionPageProps
>({
    __mapperType: 'page',
    contentTypeId: 'pageSolution',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/solutions/',
    component: SolutionPageDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            introduction,
            introductionEyebrow,
            relatedSolutions,
            components,
            headerTextColor,
            backgroundMedia,
        } = entry.fields
        return {
            title,
            backgroundMultiMediaProps: await manager.getProps(backgroundMedia),
            introductionEyebrow,
            subtitle: documentToPlainTextString(introduction),
            headerContentColor: getHeaderContentColor(),
            relatedSolutionsCardsProps: await getRelatedCardProps(),
            components: await manager.getAllComponentsProps(components),
        }
        function getHeaderContentColor() {
            const isContentColor = (color: string): color is ContentColors => {
                return color in ContentColors
            }
            return isContentColor(headerTextColor) ? headerTextColor : null
        }
        async function getRelatedCardProps() {
            return relatedSolutions
                ? (
                      await Promise.all(
                          relatedSolutions.map((solutionEntry) =>
                              manager.getPageCardProps(solutionEntry)
                          )
                      )
                  ).filter(Boolean)
                : []
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
                text: 'View Page',
            },
        }
    },
})
