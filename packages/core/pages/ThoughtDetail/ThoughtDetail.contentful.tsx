import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '../../next-contentful/configs/make-config'
import dynamic from 'next/dynamic'
import type {
    MultiMediaEntry,
    MultiMediaProps,
    PersonEntry,
    CardTagProps,
} from '@rightpoint/core/components'
import type { SeoEntry } from '../common/Seo/Seo.contentful'
import type { ThoughtDetailProps } from './ThoughtDetail.page'
import type { ThoughtCategoryEntry } from '../ThoughtCategory/ThoughtCategory.contentful'

export type ThoughtDetailEntryFields = {
    name: EntryFields.Text
    datePublished: EntryFields.Date
    title: EntryFields.Text
    slug: EntryFields.Text
    category: ThoughtCategoryEntry[]
    seo: SeoEntry
    media: MultiMediaEntry
    authors: PersonEntry[]
    components: Entry<any>[]
    related?: ThoughtDetailEntry[]
    originalUrl: EntryFields.Text

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
}

export type ThoughtDetailEntry = Entry<ThoughtDetailEntryFields>

export const ThoughtDetailDynamic = dynamic(() =>
    import('./ThoughtDetail.page').then((mod) => mod.ThoughtDetail)
)

export const thoughtDetailMapperConfig = makeConfig<
    ThoughtDetailEntry,
    ThoughtDetailProps
>({
    __mapperType: 'page',
    component: ThoughtDetailDynamic,
    contentTypeId: 'pageThought',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/thought-detail/',
    entryToProps: async ({ entry, manager }) => {
        const { title, media, components, related = [], authors } = entry.fields
        return {
            title,
            authorsProps: authors ? authors.map(getAuthorProps) : null,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            componentsProps: await manager.getAllComponentsProps(components),
            relatedCardsProps: await getRelatedCardsProps(),
            cardProps: await manager.getPageCardProps(entry),
        }
        async function getRelatedCardsProps() {
            const relatedCardsProps = (
                await Promise.all(
                    related.map((relatedEntry) =>
                        manager.getPageCardProps(relatedEntry)
                    )
                )
            ).filter(Boolean)
            if (relatedCardsProps.length > 0) {
                return relatedCardsProps
            }
            return null
        }
        function getAuthorProps(entry) {
            const { name, jobTitle } = entry.fields
            return {
                name,
                jobTitle,
            }
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, media, datePublished, category, cardTitle, cardBody } =
            entry.fields
        return {
            title: cardTitle || title,
            body: cardBody || '',
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'Read now',
                // this should be dynamic. It can be "watch" or "read"
            },
            tagsProps: [await getTagProps()],
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            // this date field should read: Innovation Oct. 18th, 2021
            date: [
                // getFirstCategoryName(category),
                formatDate(datePublished),
            ].join(' '),
        }
        async function getTagProps(): Promise<CardTagProps> {
            const firstCategoryUrl = await manager.getUrl(category?.[0])

            return {
                text: 'Thought',
                backgroundColor: '#004D73',
                color: 'white',

                ...(firstCategoryUrl
                    ? {
                          linkProps: {
                              href: firstCategoryUrl,
                          },
                      }
                    : {}),
            }
        }
        function formatDate(isoDate) {
            return new Date(isoDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
        }
        function getFirstCategoryName(categories: ThoughtCategoryEntry[]) {
            if (categories && categories.length > 0) {
                return categories[0]?.fields?.name || ''
            }
            return ''
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title, category } = entry.fields
        // const categories = category.map((cat) => cat.fields.name).join(', ')
        return {
            title: `${title}`,
        }
    },
})
