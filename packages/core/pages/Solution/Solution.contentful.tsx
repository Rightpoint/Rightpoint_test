import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { SolutionPageProps } from './Solution.page'
import { Document } from '@contentful/rich-text-types'
import {
    BackgroundColors,
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
    relatedSolutions: SolutionPageEntry[]

    headerTextColor?: EntryFields.Text
    headerBackgroundColor?: EntryFields.Text

    // the media is the media that goes below
    media: MultiMediaEntry

    seo: SeoEntry

    components: Entry<any>[]
    // for landing page, background components
    bottomComponents: Entry<any>[]

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
            bottomComponents,
            headerTextColor,
            headerBackgroundColor,
            backgroundMedia,
            media,
        } = entry.fields
        return {
            title,
            multiMediaProps: await manager.getProps(media),
            backgroundMultiMediaProps: await manager.getProps(backgroundMedia),
            introductionEyebrow,
            subtitle: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),
            relatedSolutionsCardsProps: await getRelatedCardProps(),
            components: await manager.getAllComponentsProps(components),
            bottomComponents: await manager.getAllComponentsProps(
                bottomComponents
            ),
            headerContentColor: getHeaderContentColor(headerTextColor),
            headerBackgroundColor: getHeaderBackgroundColor(
                headerBackgroundColor
            ),
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
        const { title, cardBody, introduction } = entry.fields
        return {
            title,
            description: cardBody || documentToPlainTextString(introduction),
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
                cursorProps: {
                    text: 'View Solution',
                },
            },
        }
    },
})
