import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { fetchEntries } from '@rightpoint/contentful'

import {
    type LandingPageEntry,
    landingPageMapperConfig,
} from '../LandingPage/LandingPage.contentful'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { LandingPageCategoryProps } from './LandingPageCategory.page'
import type { CardProps } from '@rightpoint/core/components'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'

export type LandingPageCategoryEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    seo: SeoEntry
    bottomComponents: Entry<any>[]
    topComponents: Entry<any>[]
}

export type LandingPageCategoryEntry = Entry<LandingPageCategoryEntryFields>

export const landingPageCategoryMapperConfig = makeConfig<
    LandingPageCategoryEntry,
    LandingPageCategoryProps
>({
    __mapperType: 'page',
    contentTypeId: 'landingPageCategory',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'categorySlug',
    urlBasePath: '/landing/',
    component: () => <></>,
    entryToProps: async ({ entry, manager, nextContext }) => {
        const { title, bottomComponents, topComponents } = entry.fields

        return {
            title,
            landingPageCardsProps: await getLandingPageCards(),
            bottomComponents: await manager.getAllComponentsProps(
                bottomComponents
            ),
            topComponents: await manager.getAllComponentsProps(topComponents),
        }

        async function getLandingPageCards() {
            const entries = await fetchEntries<LandingPageEntry>({
                content_type: landingPageMapperConfig.contentTypeId,
                include: 3,
                'fields.category.sys.id[in]': entry.sys.id,
            })
            if (!entries) {
                return null
            }
            const landingPageCards = (
                await Promise.all(
                    entries.map(
                        (entry): Promise<CardProps> =>
                            manager.getPageCardProps(entry)
                    )
                )
            ).filter(Boolean)
            return landingPageCards
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
        }
    },
})
