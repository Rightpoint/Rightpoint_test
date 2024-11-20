import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkCategoryProps } from './WorkCategory.page'
import { WorkDetailEntry } from '../WorkDetail/WorkDetailPage.contentful'
import type { QuoteEntry } from '@rightpoint/core/components'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

export type WorkCategoryEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text

    seo: SeoEntry
    quote: QuoteEntry
    works: WorkDetailEntry[]
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
    entryToProps: async ({ entry, manager }) => {
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
        const { title } = entry.fields

        return {
            title,
            // workCardsProps,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
