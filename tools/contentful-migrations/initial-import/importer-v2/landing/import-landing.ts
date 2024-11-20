import { getClientEnvironment } from '../utils/get-client-environment'
import { createOrUpdateEntry } from '../utils/create-or-update-entry'
import { deterministicId } from '../utils/deterministic-id'
import { entryToLink } from '../utils/entry-to-link'
import { createMultiMediaAndAsset } from '../utils/create-multi-media-and-asset'
import { scrapeLandingData } from './parse-landing-page'
import { LandingPageEntry } from '@rightpoint/core/pages'
import { metadataTags } from '../utils/import-metadata'
import { createRichTextDocumentFromHtml } from '../utils/create-rich-text-document'
import { LongRichTextEntry } from '@rightpoint/core/components'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { truncate } from '../utils/utils'

/**
 * 1: Scrape landing data from URL
 * 2: Identified section types in parse-landing.ts (quote, text, image, etc)
 * 3: Scrape section specific type (e.g. quote, text, image, etc)
 * 4: Import to contentful section specific type
 */
const slugFromUrl = (url) => {
    return url.split('/').slice(-1)[0].toLowerCase()
}

const importContent = async ({ scraper, environment }) => {
    const fields: LongRichTextEntry['fields'] = {
        internalName: `${truncate(scraper.headerData.title, 25)} - Content`,
        text: await createRichTextDocumentFromHtml(scraper.content),
    }
    const id = deterministicId(scraper.headerData.title, 'content')

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'longRichText',
    })
}

const getLandingPageCategory = async (
    environment: ContentfulEnvironmentAPI
) => {
    const entries = await environment.getEntries({
        content_type: 'landingPageCategory',
        'fields.slug': 'landing-page',
    })
    return entries.items[0]
}

const importLandingEntry = async (url) => {
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log('######')
    console.log('BEGIN IMPORT LANDING: ', url)
    const environment = await getClientEnvironment()

    if (!environment) {
        return console.log('Failed to get environment')
    }

    console.log('BEGIN SCRAPE: ', url)
    const scraper = await scrapeLandingData(url)
    console.log('COMPLETE SCRAPE: ', url)

    const { headerData } = scraper

    console.log(headerData.image)

    /**
     * Make components
     */
    const contentComponent = await importContent({ scraper, environment })
    const componentEntryLinks = [contentComponent].map((entry) =>
        entryToLink(entry, 'Entry')
    )

    const landingPageCategory = entryToLink(
        await getLandingPageCategory(environment),
        'Entry'
    )
    const fields: Partial<LandingPageEntry['fields']> = {
        internalName: 'Landing: ' + headerData.title,
        title: headerData.title,
        slug: slugFromUrl(url),
        body: scraper?.contentDocument, // try to pull in most text, then content authors can just move or delete.
        // components: componentEntryLinks,
        category: landingPageCategory,
        media: headerData.image
            ? await createMultiMediaAndAsset({
                  environment,
                  title: `Landing: ${truncate(
                      headerData.title,
                      25
                  )} - Main Media`,
                  description: '',
                  url: headerData.image,
                  asLinkReference: true,
              })
            : null,
        originalUrl: url,
    }
    console.log(' ')
    console.log('BEGIN LANDING ENTRY MAIN UPLOAD')
    const contentTypeId = 'pageLandingPage' as const
    const entry = await createOrUpdateEntry({
        environment,
        contentTypeId,
        id: deterministicId(contentTypeId, fields.slug),
        fields,
    })
    console.log('COMPLETE LANDING IMPORT', url)
    return entry
}

const allLandingUrls = [
    'https://www.rightpoint.com/landing-pages/6-omnichannel-strategies-for-home-and-bedding-companies',
    'https://www.rightpoint.com/landing-pages/22-ways-in-2022-to-boost-holiday-sales',
    'https://www.rightpoint.com/landing-pages/a-comprehensive-guide-to-replatforming-ecommerce',
    'https://www.rightpoint.com/landing-pages/banking-digital-transformation',
    'https://www.rightpoint.com/landing-pages/becoming-an-experience-led-company',
    'https://www.rightpoint.com/landing-pages/believe-the-hype-not-all-tech-trends-live-up-to-their-reputation',
    'https://www.rightpoint.com/landing-pages/change-management',
    'https://www.rightpoint.com/landing-pages/connected-devices',
    'https://www.rightpoint.com/landing-pages/consumerization-of-b2b',
    'https://www.rightpoint.com/landing-pages/a-buyers-guide-for-ecommerce-platforms-in-the-20',
    'https://www.rightpoint.com/landing-pages/approaching-the-ga4-transition-as-an-opportunity',
    'https://www.rightpoint.com/landing-pages/avoid-the-sea-of-sameness',
    'https://www.rightpoint.com/landing-pages/business-is-blooming-for-health-wellness-and-beauty-brands',
    'https://www.rightpoint.com/landing-pages/capitalizing-on-momentum',
    'https://www.rightpoint.com/landing-pages/content-and-commerce-connections',
    'https://www.rightpoint.com/landing-pages/evolving-solutions-for-digital-asset-management',
    'https://www.rightpoint.com/landing-pages/improve-patient-adoption-of-your-mhealth-app',
    'https://www.rightpoint.com/landing-pages/stages-and-solutions',
    'https://www.rightpoint.com/landing-pages/the-healthcare-revolution',
    'https://www.rightpoint.com/landing-pages/covid-19-and-the-impact-to-business-report',
    'https://www.rightpoint.com/landing-pages/customer-experience-transformation',
    'https://www.rightpoint.com/landing-pages/digital-experience',
    'https://www.rightpoint.com/landing-pages/sales-experience',
    'https://www.rightpoint.com/landing-pages/digital-workspace',
    'https://www.rightpoint.com/landing-pages/embracing-the-employee-experience',
    'https://www.rightpoint.com/landing-pages/employee-experience-future-of-work',
    'https://www.rightpoint.com/landing-pages/employee-experience-vision',
    'https://www.rightpoint.com/landing-pages/forecasting-customer-experience-priorities-in-the-post-pandemic-era',
    'https://www.rightpoint.com/landing-pages/future-proof-how-an-ecommerce-center-of-excellence-enables-cpg-to-thrive-in-the-dtc-era',
    'https://www.rightpoint.com/landing-pages/high-tech-with-a-human-touch',
    'https://www.rightpoint.com/landing-pages/mobile-app-development',
    'https://www.rightpoint.com/landing-pages/mobile-app-retention',
    'https://www.rightpoint.com/landing-pages/mobile-user-onboarding',
    'https://www.rightpoint.com/landing-pages/native-mobile-apps',
    'https://www.rightpoint.com/landing-pages/putting-the-consumer-in-consumer-banking-first',
    'https://www.rightpoint.com/landing-pages/rightpoint-named-on-the-forrester-now-tech',
    'https://www.rightpoint.com/landing-pages/smart-cx-investments-for-smarter-ecommerce-experiences',
    'https://www.rightpoint.com/landing-pages/solving-real-pain-points-with-the-right-data',
    'https://www.rightpoint.com/landing-pages/stocking-up-and-seeking-out',
    'https://www.rightpoint.com/landing-pages/the-cpg-evolution-rise-of-the-dtc-challengers-and-small-business-marketplaces',
    'https://www.rightpoint.com/landing-pages/employee-experience-services',
    'https://www.rightpoint.com/landing-pages/the-new-commerce-essentials',
    'https://www.rightpoint.com/landing-pages/the-new-essentials-beauty',
    'https://www.rightpoint.com/landing-pages/the-new-essentials-fashion-and-apparel',
    'https://www.rightpoint.com/landing-pages/the-new-essentials-health-and-wellness',
    'https://www.rightpoint.com/landing-pages/the-new-essentials-home-and-bedding',
    'https://www.rightpoint.com/landing-pages/the-role-of-employees-in-the-customer-centric-mission',
    'https://www.rightpoint.com/landing-pages/transformation-in-the-experience-economy',
    'https://www.rightpoint.com/landing-pages/winning-the-roi-battle-on-cx-investments',
    'https://www.rightpoint.com/landing-pages/product-innovation-toolkit',
    'https://www.rightpoint.com/landing-pages/optimizely-commerce',
    'https://www.rightpoint.com/landing-pages/spark-moments',
    'https://www.rightpoint.com/landing-pages/spark-workspace',
    'https://www.rightpoint.com/landing-pages/extended-reality',
    'https://www.rightpoint.com/landing-pages/virtual-reality-and-augmented-reality',
    'https://www.rightpoint.com/digital-health',
    'https://www.rightpoint.com/digital-product',
    'https://www.rightpoint.com/iot',
]

const missingImports = [
    'https://www.rightpoint.com/landing-pages/the-role-of-employees-in-creating-customer-experience-transformation',
    'https://www.rightpoint.com/landing-pages/winning-the-roi-battle-on-customer-experience-investments',
]

const importAll = async ({ limit = null, paths = [] } = {}) => {
    for (let index = 0; index < paths.length; index++) {
        if (Number(limit)) {
            console.log('LIMITING IMPORT TO: ', limit)
            if (index >= limit) {
                console.log('LIMIT REACHED -- exiting')
                return
            }
        }
        const url = paths[index]
        try {
            await importLandingEntry(url)
        } catch (ex) {
            console.log('!!!')
            console.log('!!!')
            console.error('ERROR IMPORTING LANDING', url, ex)
            console.error('ERROR IMPORTING LANDING', url, ex)
            console.error('ERROR IMPORTING LANDING', url, ex)
            console.log('!!!')
            console.log('!!!')
        }
    }
}

importAll({
    limit: null,
    paths: missingImports,
})
