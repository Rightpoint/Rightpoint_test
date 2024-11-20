import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

import {
    ContentColors,
    contentfulRichTextDocumentToJsonSafe,
    MultiMediaEntry,
    MultiMediaProps,
    PardotEntry,
    PardotProps,
} from '@rightpoint/core/components'
import type { LandingPageCategoryEntry } from '../LandingPageCategory/LandingPageCategory.contentful'
import type { EntryFields, Entry } from 'contentful'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { LandingPageProps, LandingPageTemplates } from './LandingPage.page'
import { Document } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { getOpenGraphImageFromMultiMedia } from '../seo/OpenGraph/open-graph-image'

export type LandingPageEntryFields = {
    internalName: EntryFields.Text
    eyebrow: EntryFields.Text
    title: EntryFields.Text
    introduction: Document
    ctaTitle: EntryFields.Text
    headerTextColor: EntryFields.Text
    headerBackgroundTreatment: EntryFields.Text
    slug: EntryFields.Text
    body: Document
    category: LandingPageCategoryEntry
    seo: SeoEntry
    media?: MultiMediaEntry
    components: Entry<any>[]
    // bottomComponents: Entry<any>[]
    pardotForm?: PardotEntry
    layoutTemplate?: LandingPageTemplates

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text

    originalUrl: EntryFields.Text
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
    urlBasePath: '/landing-page/',
    component: LandingPageDynamic,
    // resolveUrl: ({
    //     entry
    // }) => {
    // },
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            components,
            media,
            ctaTitle,
            layoutTemplate,
            pardotForm,
            body,
            eyebrow,
            headerTextColor,
            introduction,
            headerBackgroundTreatment,
        } = entry.fields

        return {
            eyebrow,
            title,
            ctaTitle,
            headerBackgroundTreatment,
            introductionDocument: await contentfulRichTextDocumentToJsonSafe(
                introduction,
                manager
            ),
            headerContentColor: getHeaderContentColor(),
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                body,
                manager
            ),
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            componentsProps: await manager.getAllComponentsProps(components),
            // bottomComponentsProps: await manager.getAllComponentsProps(
            //     bottomComponents
            // ),
            layoutTemplate,
            pardotProps: (await manager.getProps(pardotForm, {
                restrictToContentTypes: ['pardotForm'],
            })) as PardotProps,

            __tempPardotThankYouUrl: await manager.getUrl(pardotForm),
            cardProps: await manager.getPageCardProps(entry),
        }

        function getHeaderContentColor() {
            const isContentColor = (color: string): color is ContentColors => {
                return color in ContentColors
            }
            return isContentColor(headerTextColor)
                ? headerTextColor
                : ContentColors.Light
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
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, media, category, cardBody, cardTitle } = entry.fields

        return {
            title: cardTitle || title,
            body: cardBody || '',
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'Read more',
            },
            tagsProps: [
                {
                    text: category?.fields?.title,
                    backgroundColor: '#004D73', // #TBD how to set these
                    linkProps: {
                        href: await manager.getUrl(category),
                    },
                },
            ],
        }
    },
})
