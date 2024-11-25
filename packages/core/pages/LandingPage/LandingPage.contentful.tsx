import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

import {
    backgroundTypeUtils,
    contentfulRichTextDocumentToJsonSafe,
    type LinkEntry,
    type MultiMediaEntry,
    type MultiMediaProps,
    type PardotEntry,
    type CardProps,
} from '@rightpoint/core/components'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { getOpenGraphImageFromMultiMedia } from '../seo/OpenGraph/open-graph-image'
import type { LandingPageCategoryEntry } from '../LandingPageCategory/LandingPageCategory.contentful'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { LandingPageProps, LandingPageTemplates } from './LandingPage.page'
import type { CardEntry } from '@rightpoint/core/components'
import type { Document } from '@contentful/rich-text-types'
import { isNil, omitBy } from 'lodash'

export type LandingPageEntryFields = {
    internalName: EntryFields.Text
    eyebrow: EntryFields.Text
    eyebrowLink: Entry<any>
    title: EntryFields.Text
    introduction: Document
    headerTextColor: EntryFields.Text
    headerBackgroundTreatment: EntryFields.Text
    slug: EntryFields.Text
    body: Document
    category: LandingPageCategoryEntry
    seo: SeoEntry
    media?: MultiMediaEntry
    components: Entry<any>[]
    bottomComponents: Entry<any>[]

    pardotForm?: PardotEntry
    layoutTemplate?: LandingPageTemplates

    card: CardEntry
    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
    cardLink: LinkEntry

    pardotEmbedUrl: EntryFields.Text
    ctaTitle: EntryFields.Text
    gatedDownloadFile: Asset

    datePublished: EntryFields.Date

    originalUrl: EntryFields.Text

    relatedContent: Entry<any>[]
}

export type LandingPageEntry = Entry<LandingPageEntryFields>

export const LandingPageDynamic = dynamic(() =>
    import('./LandingPage.page').then((mod) => mod.LandingPage)
)

export const landingPageMapperConfig = makeConfig<
    LandingPageEntry,
    LandingPageProps
>({
    __mapperType: 'page',
    contentTypeId: 'pageLandingPage' as const,
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/landing-pages/',
    component: LandingPageDynamic,
    entryToUrl: async ({ entry }) => {
        const { category } = entry.fields
        const categorySlug = category?.fields?.slug
        return categorySlug
            ? `/${categorySlug}/${entry.fields.slug}`
            : `/landing-pages/${entry.fields.slug}`
    },
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            components,
            bottomComponents,
            media,
            ctaTitle,
            layoutTemplate,
            pardotEmbedUrl,
            body,
            eyebrow,
            eyebrowLink,
            headerTextColor,
            introduction,
            headerBackgroundTreatment,
            relatedContent,
        } = entry.fields

        return {
            eyebrow,
            eyebrowLinkProps: eyebrowLink
                ? {
                      href: await manager.getUrl(eyebrowLink),
                      text: eyebrow || eyebrowLink.fields?.title,
                  }
                : null,
            title,
            ctaTitle,
            headerBackgroundTreatment,
            introductionDocument: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),
            headerContentColor:
                backgroundTypeUtils.getContentColor(headerTextColor),
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                body,
                manager
            ),
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            componentsProps: await manager.getAllComponentsProps(components),
            bottomComponentsProps: await manager.getAllComponentsProps(
                bottomComponents
            ),
            relatedCardsProps: await getRelatedCardsProps(relatedContent),
            layoutTemplate,
            cardProps: await manager.getPageCardProps(entry),
            pardotProps: pardotEmbedUrl && {
                embedUrl: pardotEmbedUrl,
                cta: ctaTitle,
            },
            __tempPardotThankYouUrl:
                (await manager.getUrl(entry)) + '/thank-you',
        }
        async function getRelatedCardsProps(relatedContent) {
            if (!relatedContent) {
                return null
            }
            const relatedCardsProps = (
                await Promise.all(
                    relatedContent.map((relatedEntry) =>
                        manager.getPageCardProps(relatedEntry)
                    )
                )
            ).filter(Boolean)
            if (relatedCardsProps.length > 0) {
                return relatedCardsProps
            }
            return null
        }
    },
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
            canonicalUrl: await manager.getUrl(entry),
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const {
            title,
            introduction,
            media,
            cardBody,
            cardTitle,
            datePublished,
            card,
        } = entry.fields

        const cardPropsOverrides = omitBy(
            await manager.getProps<CardProps>(card, {
                restrictToContentTypes: ['card'],
            }),
            isNil // only override if filled
        )

        return {
            date: datePublished,

            title: cardTitle || title,
            body: cardBody || documentToPlainTextString(introduction),
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'Read more',
                cursorProps: {
                    text: 'Read more',
                },
            },

            // override props if provided
            ...cardPropsOverrides,

            // tagsProps: [
            //     {
            //         text: category?.fields?.title,
            //         backgroundColor: '#004D73', // #TBD how to set these
            //         linkProps: {
            //             href: await manager.getUrl(category),
            //         },
            //     },
            // ],
        }
    },
})
