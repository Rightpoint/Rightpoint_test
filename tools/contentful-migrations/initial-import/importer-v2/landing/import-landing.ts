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

    const { headerData, document } = scraper

    console.log(headerData, document)

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
        components: componentEntryLinks,
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
    'http://www.rightpoint.com/landing-pages/2020-ai-discoverability-pov',
    'http://www.rightpoint.com/landing-pages/2020-digital-workplace',
    'http://www.rightpoint.com/landing-pages/2020-mhealth-app-pov',
    'http://www.rightpoint.com/landing-pages/android-app-development',
    'http://www.rightpoint.com/landing-pages/becoming-an-experience-led-company',
    'http://www.rightpoint.com/landing-pages/change-management',
    'http://www.rightpoint.com/landing-pages/connected-devices',
    'http://www.rightpoint.com/landing-pages/content-and-commerce-connections',
    'https://www.rightpoint.com/landing-pages/content-and-commerce-done-right',
    'https://www.rightpoint.com/landing-pages/covid-19-and-the-impact-to-business-report',
    'https://www.rightpoint.com/landing-pages/customer-experience-transformation',
    'https://www.rightpoint.com/landing-pages/digital-commerce-disrupting-the-manufacturing-industry',
    'https://www.rightpoint.com/landing-pages/digital-experience',
    'https://www.rightpoint.com/landing-pages/digital-workspace',
    'https://www.rightpoint.com/landing-pages/embracing-the-employee-experience',
    'https://www.rightpoint.com/landing-pages/employee-experience-future-of-work',
    'https://www.rightpoint.com/landing-pages/forecasting-customer-experience-priorities-in-the-post-pandemic-era',
    'https://www.rightpoint.com/landing-pages/future-proof-how-an-ecommerce-center-of-excellence-enables-cpg-to-thrive-in-the-dtc-era',
    'https://www.rightpoint.com/landing-pages/ios-app-development',
    'https://www.rightpoint.com/landing-pages/microsoft-teamwork-assessment',
    'https://www.rightpoint.com/landing-pages/putting-the-consumer-in-consumer-banking-first',
    'https://www.rightpoint.com/landing-pages/smart-cx-investments-for-smarter-ecommerce-experiences',
    'https://www.rightpoint.com/landing-pages/solving-real-pain-points-with-the-right-data',
    'https://www.rightpoint.com/landing-pages/spark-workspace',
    'https://www.rightpoint.com/landing-pages/spark-workspace-a-rightpoint-accelerator',
    'https://www.rightpoint.com/landing-pages/the-new-commerce-essentials',
    'https://www.rightpoint.com/landing-pages/the-role-of-employees-in-the-customer-centric-mission',
    'https://www.rightpoint.com/landing-pages/transformation-in-the-experience-economy',
    'https://www.rightpoint.com/landing-pages/winning-the-roi-battle-on-cx-investments',
]

const importAll = async () => {
    for (let index = 0; index < allLandingUrls.length; index++) {
        const url = allLandingUrls[index]
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

importAll()
