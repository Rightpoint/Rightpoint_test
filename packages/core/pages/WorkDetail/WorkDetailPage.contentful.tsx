import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    CardTagProps,
    contentfulRichTextDocumentToJsonSafe,
    contentfulRichTextToReact,
    MultiMediaEntry,
    MultiMediaProps,
} from '@rightpoint/core/components'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

import type { WorkDetailPageProps } from './WorkDetailPage.page'
import type { SeoEntry } from '../common/Seo/Seo.contentful'
import type { WorkCategoryEntry } from '../WorkCategory/WorkCategory.contentful'
import type { StandardPageEntry } from '../StandardPage/StandardPage.contentful'
import type { Document } from '@contentful/rich-text-types'
import { colors } from '../../variables'

export type WorkDetailEntryFields = {
    name: EntryFields.Text
    tagline: EntryFields.Text
    title: EntryFields.Text
    media: MultiMediaEntry
    intro: Document

    slug: EntryFields.Text
    seo: SeoEntry

    backgroundColor: string
    relatedWork: WorkDetailEntry[]

    components: Entry<any>[]

    workCategory: WorkCategoryEntry
    industry: StandardPageEntry

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
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
            industry,
            workCategory,
        } = entry.fields

        // we need to get props and the title

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
            industryLinkProps: (await manager.getUrl(industry))
                ? {
                      href: await manager.getUrl(industry),
                      text: industry?.fields?.pageTitle,
                  }
                : null,
            workCategoryLinkProps: (await manager.getUrl(workCategory))
                ? {
                      href: await manager.getUrl(workCategory),
                      text: workCategory?.fields?.title,
                  }
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
            // sensible card defaults
            title: cardTitle || title,
            body: cardBody || tagline,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            linkProps: {
                href: url || '#no-link-resolved',
                text: 'View Work',
            },
            tagsProps: [await getTagProps()],
        }
        async function getTagProps(): Promise<CardTagProps> {
            const url = await manager.getUrl(workCategory)
            return {
                text: 'Work',
                color: 'black',
                backgroundColor: colors.coral,
                linkProps: url
                    ? {
                          href: await manager.getUrl(workCategory),
                      }
                    : null,
            }
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
