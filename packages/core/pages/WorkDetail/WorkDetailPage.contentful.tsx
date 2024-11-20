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
    backgroundMedia?: MultiMediaEntry
    backgroundTreatment: EntryFields.Text

    intro: Document

    relatedSolutions: SolutionPageEntry[]
    relatedIndustries: IndustryPageEntry[]

    slug: EntryFields.Text
    seo: SeoEntry

    backgroundColor: string
    relatedWork: WorkDetailEntry[]

    components: Entry<any>[]

    /**
     * @deprecated
     */
    workCategory: WorkCategoryEntry

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
    cardMedia: MultiMediaEntry

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
    urlBasePath: '/work/',
    component: WorkDetailPageDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            media,
            backgroundMedia,
            backgroundTreatment,
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
            backgroundTreatment,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            backgroundMultiMediaProps: await manager.getProps<MultiMediaProps>(
                backgroundMedia,
                {
                    restrictToContentTypes: ['multiMedia'],
                }
            ),
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
    entryToCardProps: async ({ entry, manager }) => {
        const {
            title,
            tagline,
            media,
            intro,
            cardMedia,
            cardBody,
            cardTitle,
            backgroundMedia,
        } = entry.fields
        return {
            title: cardTitle || title,
            subtitle: tagline,
            body: cardBody || documentToPlainTextString(intro),
            multiMediaProps: await manager.getProps<MultiMediaProps>(
                cardMedia || media || backgroundMedia,
                {
                    restrictToContentTypes: ['multiMedia'],
                }
            ),
            linkProps: {
                href: (await manager.getUrl(entry)) || '#no-link-resolved',
                text: 'View Work',
            },
            // tagsProps: [await getTagProps()],
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const {
            title,
            tagline,
            intro,
            cardTitle,
            cardBody,
            media,
            cardMedia,
            backgroundMedia,
        } = entry.fields
        return {
            title: cardTitle || `${title} — ${tagline}`,
            description: (cardBody || documentToPlainTextString(intro)) ?? '',
            openGraphImage: await getOpenGraphImageFromMultiMedia(
                cardMedia || media || backgroundMedia,
                manager
            ),
        }
    },
})
