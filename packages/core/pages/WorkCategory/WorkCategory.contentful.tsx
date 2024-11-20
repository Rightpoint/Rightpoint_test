import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkCategoryProps } from './WorkCategory.page'
import { contentfulRichTextDocumentToJsonSafe } from '@rightpoint/core/components'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { Document } from '@contentful/rich-text-types'

export type WorkCategoryEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text

    headerSubtitle: EntryFields.Text
    headerBody: Document

    seo: SeoEntry

    navigationTabCategories: Entry<any>[]

    components: Entry<any>[]
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
    urlBasePath: '/work/browse/',
    component: () => <></>,
    entryToProps: async ({ entry, manager, nextContext }) => {
        /**
         * Work details now point to industries and solutions, the new design
         * aggregates work by these segments
         *
         * At the same time, the new site is _extremely_ manually curated;
         * the intent is for high quality work to show manually at the top.
         *
         * Therefore CMS control over work category pages (all, solutions, industries) are now manual as well.
         */
        const {
            title,
            headerSubtitle,
            headerBody,
            navigationTabCategories = [],
            components,
        } = entry.fields

        return {
            title,
            headerProps: {
                title,
                subtitle: headerSubtitle,
                body: await contentfulRichTextDocumentToJsonSafe(
                    headerBody,
                    manager
                ),
                variant: 'Header6' as const,
            },
            bottomComponents: await manager.getAllComponentsProps(components),
            tabsProps: {
                items: await Promise.all(
                    navigationTabCategories?.map(async (entry) =>
                        manager.getLinkProps(entry)
                    )
                ),
            },
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
