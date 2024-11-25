import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '../../next-contentful/configs/make-config'
import dynamic from 'next/dynamic'
import {
    type MultiMediaEntry,
    type MultiMediaProps,
    type PersonEntry,
    type CardTagProps,
    type ContentColors,
    type MultiMediaTypes,
    type CardProps,
    type CardEntry,
    contentfulRichTextDocumentToJsonSafe,
    backgroundTypeUtils,
} from '@rightpoint/core/components'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { ThoughtDetailProps } from './ThoughtDetail.page'
import type { ThoughtCategoryEntry } from '../ThoughtCategory/ThoughtCategory.contentful'
import { Document } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { getOpenGraphImageFromMultiMedia } from '../seo/OpenGraph/open-graph-image'
import type { LinkEntry } from '@rightpoint/core/components'
import { isNil, omitBy } from 'lodash'

export type ThoughtDetailEntryFields = {
    name: EntryFields.Text
    datePublished: EntryFields.Date

    title: EntryFields.Text
    slug: EntryFields.Text
    category: ThoughtCategoryEntry[]

    // header
    media: MultiMediaEntry
    headerTextColor: string
    headerBackgroundTreatment: EntryFields.Text
    backgroundMedia?: MultiMediaEntry
    headerCta?: LinkEntry

    introduction: Document

    // article body
    body: Document
    components: Entry<any>[]

    authors: PersonEntry[]
    related?: ThoughtDetailEntry[]
    originalUrl: EntryFields.Text

    // card overrides
    card: CardEntry
    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text

    seo: SeoEntry
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
    urlBasePath: '/thought/article/',
    // entryToUrl: async ({ entry, manager }) => {
    //     const { slug, category } = entry.fields
    //     const firstCategorySlug = category?.[0]?.fields?.slug
    //     return `/thought/article/${slug}`
    // },
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            media,
            introduction,
            body,
            components,
            related = [],
            authors,
            headerTextColor,
            headerCta,
            headerBackgroundTreatment,
            backgroundMedia,
        } = entry.fields

        return {
            title,
            headerBackgroundTreatment,
            authorsProps: authors ? authors.map(getAuthorProps) : null,
            componentsProps: await manager.getAllComponentsProps(components),
            relatedCardsProps: await getRelatedCardsProps(),
            cardProps: await manager.getPageCardProps(entry),
            headerContentColor:
                backgroundTypeUtils.getContentColor(headerTextColor),
            headerCtaLinkProps: await manager.getProps(headerCta, {
                restrictToContentTypes: ['link'],
            }),
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            backgroundMultiMediaProps: await manager.getProps<MultiMediaProps>(
                backgroundMedia,
                {
                    restrictToContentTypes: ['multiMedia'],
                }
            ),
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                body,
                manager
            ),
            introductionDocument: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),
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
        const {
            title,
            introduction,
            media,
            datePublished,
            category,
            cardTitle,
            cardBody,
            authors,
            card,
        } = entry.fields
        // TODO: should we show multiple authors? Job title?
        const firstAuthor = authors?.[0]
        const authorAndTitle = [
            firstAuthor?.fields.jobTitle,
            firstAuthor?.fields.name,
        ]
            .filter(Boolean)
            .join(' — ')

        const multiMediaProps = await manager.getProps<MultiMediaProps>(media, {
            restrictToContentTypes: ['multiMedia'],
        })

        const cardPropsOverrides = omitBy(
            await manager.getProps<CardProps>(card, {
                restrictToContentTypes: ['card'],
            }),
            isNil // only override if filled
        )

        return {
            title: cardTitle || title,
            subtitle: authorAndTitle,
            body: cardBody || documentToPlainTextString(introduction),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'Read Article',
                cursorProps: {
                    text: 'Read Article',
                },
            },
            multiMediaProps,
            date: [
                // getFirstCategoryName(category),
                formatDate(datePublished),
            ].join(' '),

            ...cardPropsOverrides,
            // tagsProps: [await getTagProps()],
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
                return categories[0]?.fields?.title || ''
            }
            return ''
        }
    },

    /**
     * Thought articles should populate as many SEO fields as possible and not require
     * the CMS "SEO" override reference field as much as possible.
     *
     * If content authors are creating an SEO entry to enter one field of information, consider adding it to the page content model.
     */
    entryToSeoProps: async ({ entry, manager }) => {
        const { title, introduction, cardTitle, cardBody, media } = entry.fields
        return {
            title: cardTitle || title,
            description:
                (cardBody || documentToPlainTextString(introduction)) ?? '',
            openGraphImage: await getOpenGraphImageFromMultiMedia(
                media,
                manager
            ),
            /**
             * noIndex: .... // NOTE: Landing Page Cards can override click behavior to external websites
             * such that there is no detail page. In this case, we should noIndex the detail page.
             * For now, Content Authors will manually set NoIndex SEO overrides.
             * Premature optimization to try to automate this before understanding usage extent.
             */
        }
    },
})
