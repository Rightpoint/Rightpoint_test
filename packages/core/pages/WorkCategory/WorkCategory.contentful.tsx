import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkCategoryProps } from './WorkCategory.page'
import { WorkDetailEntry } from '../WorkDetail/WorkDetailPage.contentful'
import type { QuoteEntry } from '@rightpoint/core/components'
import type { SeoEntry } from '../common/Seo/Seo.contentful'
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
        const { works, bottomComponents, topComponents, quote, title } =
            entry.fields
        const workCardsProps = works
            ? ((
                  await Promise.all(
                      works.map((workEntry) =>
                          manager.getPageCardProps(workEntry)
                      )
                  )
              ).filter(Boolean) as any)
            : null
        return {
            title,
            workCardsProps,
            bottomComponents: await manager.getAllComponentsProps(
                bottomComponents
            ),
            topComponents: await manager.getAllComponentsProps(topComponents),
            quoteProps: quote ? ((await manager.getProps(quote)) as any) : null,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
