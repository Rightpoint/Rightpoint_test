import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { fetchEntries } from '@rightpoint/contentful'

import {
    thoughtDetailMapperConfig,
    type ThoughtDetailEntry,
} from '../ThoughtDetail/ThoughtDetail.contentful'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { EntryFields, Entry } from 'contentful'
import type { ThoughtCategoryProps } from './ThoughtCategory.page'
import type { LinkProps } from '@rightpoint/core/components'
import { Document } from '@contentful/rich-text-types'

export type ThoughtCategoryEntryFields = {
    internalName: EntryFields.Text

    title: EntryFields.Text
    headerTitle: EntryFields.Text
    headerBody: Document

    slug: EntryFields.Text
    seo: SeoEntry
}

export type ThoughtCategoryEntry = Entry<ThoughtCategoryEntryFields>

export const thoughtCategoryMapperConfig = makeConfig<
    ThoughtCategoryEntry,
    ThoughtCategoryProps
>({
    __mapperType: 'page',
    contentTypeId: 'thoughtCategory',
    component: () => <></>,
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/thought/',
    entryToProps: async ({ entry, manager, nextContext }) => {
        const { headerTitle, headerBody } = entry.fields
        return {
            thoughtCards: await getThoughtCards(),
            headerProps: {
                title: headerTitle || 'Thinking',
                body: headerBody,
            },
            linksProps: await getCategoryLinkProps(),
        }

        /**
         * This component requires additional fetching:
         * - thought details for this category
         * - thought categories for navigation
         */
        async function getCategoryLinkProps(): Promise<LinkProps[]> {
            // get all thought categories
            const entries = await fetchEntries<ThoughtCategoryEntry>(
                {
                    content_type: thoughtCategoryMapperConfig.contentTypeId,
                    include: 1,
                    order: 'fields.ordering',
                }
                // todo: need to pass preview mode down to all instances of contentful.
            )
            if (!entries) {
                return null
            }
            return await Promise.all(
                entries.map(async (entry) => {
                    return {
                        text: entry.fields.title,
                        href: await manager.getUrl(entry),
                    }
                })
            )
        }

        async function getThoughtCards() {
            const entries = await fetchEntries<ThoughtDetailEntry>({
                content_type: thoughtDetailMapperConfig.contentTypeId,
                include: 3,
                // the nextContext slug is the current thought category page
                ...(nextContext.params.slug === '/'
                    ? // root pages return all
                      {}
                    : { [`fields.category.sys.id[in]`]: entry.sys.id }),
                // todo: need to pass preview mode down to all instances of contentful.
            })
            if (!entries) {
                return null
            }
            const thoughtCards = (
                await Promise.all(
                    entries.map((entry) => manager.getPageCardProps(entry))
                )
            )
                // remove any entries that fail conversion to cards
                .filter(Boolean)
            return thoughtCards
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title: name, slug } = entry.fields
        const isRoot = slug === '/'
        const title = isRoot ? `Thought` : `${name} | Thought`
        return {
            title,
        }
    },
})
