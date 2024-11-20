import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

import type {
    MultiMediaEntry,
    MultiMediaProps,
    PardotEntry,
    PardotProps,
} from '@rightpoint/core/components'
import type { LandingPageCategoryEntry } from '../LandingPageCategory/LandingPageCategory.contentful'
import type { EntryFields, Entry } from 'contentful'
import type { SeoEntry } from '../common/Seo/Seo.contentful'
import type { LandingPageProps, LandingPageTemplates } from './LandingPage.page'

export type LandingPageEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    category: LandingPageCategoryEntry
    seo: SeoEntry
    media?: MultiMediaEntry
    components: Entry<any>[]
    bottomComponents: Entry<any>[]
    pardotForm?: PardotEntry
    layoutTemplate?: LandingPageTemplates

    cardTitle: EntryFields.Text
    cardBody: EntryFields.Text
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
    //     //
    // },
    entryToProps: async ({ entry, manager }) => {
        const {
            components,
            title,
            media,
            bottomComponents,
            layoutTemplate,
            pardotForm,
        } = entry.fields
        return {
            title,
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            componentsProps: await manager.getAllComponentsProps(components),
            bottomComponentsProps: await manager.getAllComponentsProps(
                bottomComponents
            ),
            layoutTemplate,
            pardotProps: (await manager.getProps(pardotForm, {
                restrictToContentTypes: ['pardotForm'],
            })) as PardotProps,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title } = entry.fields
        return {
            title: `${title}`,
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
