import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { fetchEntries } from '@rightpoint/contentful'

import {
    type LandingPageEntry,
    landingPageMapperConfig,
} from '../LandingPage/LandingPage.contentful'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { LandingPageCategoryProps } from './LandingPageCategory.page'
import {
    CardProps,
    contentfulRichTextDocumentToJsonSafe,
    MultiMediaEntry,
} from '@rightpoint/core/components'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import { Document } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { PageNotFoundError } from '@rightpoint/core/utils'

export type LandingPageCategoryEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    headerBody: Document
    media: MultiMediaEntry
    slug: EntryFields.Text
    seo: SeoEntry
    showListPage: EntryFields.Boolean
    // bottomComponents: Entry<any>[]
    // topComponents: Entry<any>[]
    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
    cardSubtitle: EntryFields.Text
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
    urlBasePath: '/', // this is a post-proxy URL
    component: () => <></>,
    entryToProps: async ({ entry, manager, nextContext }) => {
        const { title, headerBody, showListPage } = entry.fields

        if (!showListPage) {
            throw new PageNotFoundError(
                'This category list page has been disabled.'
            )
        }
        return {
            headerProps: {
                title,
                body: await contentfulRichTextDocumentToJsonSafe(
                    headerBody,
                    manager
                ),
                variant: 'Header1' as const,
            },
            landingPageCardsProps: await getLandingPageCards(),
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
        const { title, headerBody } = entry.fields
        return {
            title: `${title}`,
            description: documentToPlainTextString(headerBody),
            canonicalUrl: await manager.getUrl(entry),
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, headerBody, media, cardBody, cardSubtitle, cardTitle } =
            entry.fields
        return {
            title: cardTitle || title,
            subtitle: cardSubtitle || documentToPlainTextString(headerBody),
            body: cardBody,
            multiMediaProps: await manager.getProps(media),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'View All',
                cursorProps: {
                    text: 'View All',
                },
            },
        }
    },
})
