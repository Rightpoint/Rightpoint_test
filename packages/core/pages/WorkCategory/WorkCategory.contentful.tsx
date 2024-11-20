import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkCategoryProps } from './WorkCategory.page'
import {
    WorkDetailEntry,
    workDetailPageMapperConfig,
} from '../WorkDetail/WorkDetailPage.contentful'
import {
    contentfulRichTextDocumentToJsonSafe,
    QuoteEntry,
} from '@rightpoint/core/components'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { fetchEntries } from '@rightpoint/contentful'
import { Document } from '@contentful/rich-text-types'

export type WorkCategoryEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    headerSubtitle: EntryFields.Text
    headerBody: Document

    seo: SeoEntry
    // quote: QuoteEntry
    // works: WorkDetailEntry[]

    bottomComponents: Entry<any>[]
    topComponents: Entry<any>[]
}

export type WorkCategoryEntry = Entry<WorkCategoryEntryFields>

export const workCategoryMapperConfig = makeConfig<
    WorkCategoryEntry,
    WorkCategoryProps
>({
    __mapperType: 'page',
    contentTypeId: 'pageWorkCategory',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/work/',
    component: () => <></>,
    entryToProps: async ({ entry, manager, nextContext }) => {
        /**
         * Work details now point to industries and solutions, the new design
         * aggregates work by these segments
         *
         * At the same time, the new site is _extremely_ manually curated;
         * the intent is for high quality work to show manually at the top.
         *
         * Therefore CMS control over work category pages (all, solutions, industries) could be manual as well;
         * i.e.
         *
         * Soluion/Industry Category;
         *
         * Items:
         *  - Industry: Healthcare
         *  - Solution: Tech
         *
         */
        const { title, headerSubtitle, headerBody } = entry.fields

        return {
            title,
            headerProps: {
                title,
                subtitle: headerSubtitle,
                body: await contentfulRichTextDocumentToJsonSafe(
                    headerBody,
                    manager
                ),
            },
            workCardsProps: await getWorkCardsProps(),
        }

        async function getWorkCardsProps() {
            const entries = await fetchEntries<WorkDetailEntry>({
                content_type: workDetailPageMapperConfig.contentTypeId,
                include: 1,
                // the nextContext slug is the current category page
                // ...(nextContext.params.slug === '/'
                //     ? // root pages return all
                //       {}
                //     : { [`fields.category.sys.id[in]`]: entry.sys.id }),
                // todo: need to pass preview mode down to all instances of contentful.
            })
            if (!entries) {
                return null
            }
            const cards = (
                await Promise.all(
                    entries.map((entry) => manager.getPageCardProps(entry))
                )
            )
                // remove any entries that fail conversion to cards
                .filter(Boolean)
            return cards
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
