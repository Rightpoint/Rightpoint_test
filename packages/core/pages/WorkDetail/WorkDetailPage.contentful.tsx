import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import {
    CardTagProps,
    contentfulRichTextDocumentToJsonSafe,
    contentfulRichTextToReact,
    type LinkProps,
    type MultiMediaEntry,
    type MultiMediaProps,
} from '@rightpoint/core/components'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

import type { WorkDetailPageProps } from './WorkDetailPage.page'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { WorkCategoryEntry } from '../WorkCategory/WorkCategory.contentful'
import type { StandardPageEntry } from '../StandardPage/StandardPage.contentful'
import type { Document } from '@contentful/rich-text-types'
import type { IndustryPageEntry } from '../Industry/Industry.contentful'
import type { SolutionPageEntry } from '../Solution/Solution.contentful'

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { getOpenGraphImageFromMultiMedia } from '../seo/OpenGraph/open-graph-image'

export type WorkDetailEntryFields = {
    name: EntryFields.Text
    tagline: EntryFields.Text
    title: EntryFields.Text
    media: MultiMediaEntry
    intro: Document

    relatedSolutions: SolutionPageEntry[]
    relatedIndustries: IndustryPageEntry[]

    slug: EntryFields.Text
    seo: SeoEntry

    backgroundColor: string
    relatedWork: WorkDetailEntry[]

    components: Entry<any>[]

    workCategory: WorkCategoryEntry
    industry: StandardPageEntry

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text

    originalImportUrl?: string
}

export type WorkDetailEntry = Entry<WorkDetailEntryFields>

export const WorkDetailPageDynamic = dynamic(() =>
    import('./WorkDetailPage.page').then((mod) => mod.WorkDetailPage)
)

export const workDetailPageMapperConfig = makeConfig<
    WorkDetailEntry,
    WorkDetailPageProps & {
        introDocument?: Document
    }
>({
    __mapperType: 'page',
    contentTypeId: 'pageWorkDetail' as const,
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/work-detail/',
    component: WorkDetailPageDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            media,
            tagline,
            intro,
            components,
            backgroundColor,
            relatedWork,
            relatedIndustries = [],
            relatedSolutions = [],
        } = entry.fields

        // we need to get props and the title
        const headerLinksEntries = [...relatedIndustries, ...relatedSolutions]
        return {
            title,
            tagline,
            intro: null,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            introDocument: await contentfulRichTextDocumentToJsonSafe(
                intro,
                manager
            ),
            backgroundColor,
            componentsProps: await manager.getAllComponentsProps(components),
            relatedWorksProps: relatedWork
                ? await Promise.all(
                      relatedWork.map((workEntry) =>
                          manager.getPageCardProps(workEntry)
                      )
                  )
                : null,
            headerLinksProps:
                headerLinksEntries.length > 0
                    ? await Promise.all(
                          headerLinksEntries.map(
                              async (pageEntry): Promise<LinkProps> => ({
                                  href: await manager.getUrl(pageEntry),
                                  text: pageEntry.fields.title,
                              })
                          )
                      )
                    : null,
        }
    },
    /**
     * TODO: This does not work at the page level, because it's never wrapped in
     * a Component component that does the prepareJsonUnsafeProps.
     *
     * We need to build a better way to handle json unsafe props whether its a page or component, in _app.tsx
     * so that it's guaranteed to be handled.
     */
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {
            ...props,
            intro: contentfulRichTextToReact(props.introDocument, manager),
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, tagline, media, workCategory, cardBody, cardTitle } =
            entry.fields
        const url = await manager.getUrl(entry)
        return {
            /**
             * We now have varying card styles that require slightly redundant fields
             * Card1:
             *  Work: <Category> - <Title>
             *  Thought: <Title> - <Author>
             *  News: <Title> - <Author> ? Date?
             * titlePrimary, titleSecondary
             *
             * For Card1 to support this, we need to have optional pre-title field?
             *
             * Card2:
             *  Solution:
             *      <Title>
             *      <Body>
             *  Work:
             *      <Title>
             *      <Body>
             *
             */
            /**
             * Work - Re-imagining Cadillac's User Experience
             * <Blank> - The Future of Design - Yuji Tomita
             */
            // sensible card defaults
            title: cardTitle || title,
            subtitle: tagline,
            body: cardBody,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            linkProps: {
                href: url || '#no-link-resolved',
                text: 'View Work',
            },
            // tagsProps: [await getTagProps()],
        }
        // async function getTagProps(): Promise<CardTagProps> {
        //     const url = await manager.getUrl(workCategory)
        //     return {
        //         text: 'Work',
        //         color: 'black',
        //         backgroundColor: colors.coral,
        //         linkProps: url
        //             ? {
        //                   href: await manager.getUrl(workCategory),
        //               }
        //             : null,
        //     }
        // }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title, intro, cardTitle, cardBody, media } = entry.fields
        return {
            title: cardTitle || title,
            description: (cardBody || documentToPlainTextString(intro)) ?? '',
            openGraphImage: await getOpenGraphImageFromMultiMedia(
                media,
                manager
            ),
        }
    },
})
