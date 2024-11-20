import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { LandingPageThankYouProps } from './LandingPageThankYou.page'

import { LandingPageEntry } from '../LandingPage/LandingPage.contentful'

export const LandingPageThankYouDynamic = dynamic(() =>
    import('./LandingPageThankYou.page').then(
        (mod) => mod.LandingPageThankYouPage
    )
)

export const landingPageThankYouMapperConfig = makeConfig<
    LandingPageEntry,
    LandingPageThankYouProps
>({
    __mapperType: 'page',
    contentTypeId: 'pageLandingPage',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: null, // custom path
    component: LandingPageThankYouDynamic,
    entryToUrl: async ({ entry, manager }) => {
        return `/landing-pages/${entry.fields.slug}/thank-you`
    },
    entryToProps: async ({ entry, manager }) => {
        const { title, gatedDownloadFile, ctaTitle } = entry.fields
        return {
            title,
            file: gatedDownloadFile,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const {} = entry.fields
        return {
            title: `Thank you!`,
            noIndex: true,
            noFollow: true,
        }
    },
})
