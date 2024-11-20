import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { fetchEntries } from '@rightpoint/contentful'

import {
    thoughtDetailMapperConfig,
    type ThoughtDetailEntry,
} from '../ThoughtDetail/ThoughtDetail.contentful'
import type { SeoEntry } from '../common/Seo/Seo.contentful'
import type { EntryFields, Entry } from 'contentful'
import type { ThoughtCategoryProps } from './ThoughtCategory.page'
import type { NavigationProps } from '@rightpoint/core/components'
import { ConfigManagerType } from '@rightpoint/core/next-contentful'

export type ThoughtCategoryEntryFields = {
    internalName: EntryFields.Text
    pageTitle: EntryFields.Text
    name: EntryFields.Text
    slug: EntryFields.Text
    seo: SeoEntry
    featuredThoughtHeader: ThoughtDetailEntry
    featuredThought: ThoughtDetailEntry[]
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
        const { featuredThoughtHeader, featuredThought = [] } = entry.fields
        return {
            thoughtCards: await getThoughtCards(),
            featuredThoughtCardProps: await manager.getPageCardProps(
                featuredThoughtHeader
            ),
            navigationProps: await getNavigationProps(),
            featuredThoughtsCardProps: (
                await Promise.all(
                    featuredThought.map((thoughtEntry) => {
                        return manager.getPageCardProps(thoughtEntry)
                    })
                )
            ).filter(Boolean),
        }

        /**
         * This component requires additional fetching:
         * - thought details for this category
         * - thought categories for navigation
         */
        async function getNavigationProps(): Promise<NavigationProps> {
            // get all thought categories
            const entries = await fetchEntries<ThoughtCategoryEntry>(
                {
                    content_type: thoughtCategoryMapperConfig.contentTypeId,
                    include: 1,
                    order: 'fields.name',
                }
                // todo: need to pass preview mode down to all instances of contentful.
            )
            if (!entries) {
                return null
            }

            // get convert them to navigation item props
            const getNavigationItemProps = async (
                entry: ThoughtCategoryEntry
            ): Promise<NavigationProps['items'][0]> => ({
                text: entry.fields.name,
                linkProps: {
                    href: await manager.getUrl(entry),
                    text: null, // linkProps.text is not used here so that navigation can have its own opinionated text
                },
            })
            return {
                items: await Promise.all(entries.map(getNavigationItemProps)),
            }
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
        const { name, slug } = entry.fields
        const isRoot = slug === '/'
        const title = isRoot ? `Thought` : `${name} | Thought`
        return {
            title,
        }
    },
})
