import type { WorkDetailEntry } from '@rightpoint/core/pages'

import { getClientEnvironment } from '../utils/get-client-environment'
import { createOrUpdateEntry } from '../utils/create-or-update-entry'
import { deterministicId } from '../utils/deterministic-id'
import { entryToLink } from '../utils/entry-to-link'
import { createMultiMediaAndAsset } from '../utils/create-multi-media-and-asset'

import { scrapeWorkData } from './parse-work-page'
import { importAllWorkComponents } from './components/import-all-components'
// import { importWorkCategories } from './import-work-categories'

/**
 * 1: Scrape work data from URL
 * 2: Identified section types in parse-work.ts (quote, text, image, etc)
 * 3: Scrape section specific type (e.g. quote, text, image, etc)
 * 4: Import to contentful section specific type
 */
const slugFromUrl = (url) => {
    return url.split('/').slice(-1)[0].toLowerCase()
}

const importWorkEntry = async (url) => {
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log('######')
    console.log('BEGIN IMPORT WORK: ', url)
    const environment = await getClientEnvironment()

    if (!environment) {
        return console.log('Failed to get environment')
    }

    console.log('BEGIN SCRAPE: ', url)
    const scraper = await scrapeWorkData(url)
    console.log('COMPLETE SCRAPE: ', url)

    const { headerData } = scraper

    /**
     * Make components
     */
    const componentEntries = (
        await importAllWorkComponents({
            scraper,
            environment,
        })
    ).filter(Boolean)
    const componentEntryLinks = componentEntries.map((entry) =>
        entryToLink(entry, 'Entry')
    )
    const fields: Partial<WorkDetailEntry['fields']> = {
        name: 'Work: ' + headerData.title,
        title: headerData.title,
        tagline: headerData.subtitle,
        slug: slugFromUrl(url),
        intro: await scraper.getDocumentFromHtml(headerData.introHtml),
        components: componentEntryLinks,
        media: headerData.image
            ? await createMultiMediaAndAsset({
                  environment,
                  title: `Work: ${headerData.title} - Main Media`,
                  description: '',
                  url: headerData.image,
                  asLinkReference: true,
              })
            : null,
        originalImportUrl: url,
    }
    console.log(' ')
    console.log('BEGIN WORK ENTRY MAIN UPLOAD')
    const entry = await createOrUpdateEntry({
        environment,
        contentTypeId: 'pageWorkDetail',
        id: deterministicId(fields.slug),
        fields,
    })
    console.log('COMPLETE WORK IMPORT', url)
    return entry
}

const oldWorkUrls = [
    'https://www.rightpoint.com/work/aaa',
    'https://www.rightpoint.com/work/aon',
    'https://www.rightpoint.com/work/aon-sf',
    'https://www.rightpoint.com/work/benjamin-moore',
    'https://www.rightpoint.com/work/bh',
    'https://www.rightpoint.com/work/bloomingdales',
    'https://www.rightpoint.com/work/cadillac',
    'https://www.rightpoint.com/work/care',
    'https://www.rightpoint.com/work/chamberlain',
    'https://www.rightpoint.com/work/children-international',
    'https://www.rightpoint.com/work/degroot-logistics',
    'https://www.rightpoint.com/work/garden-of-life',
    'https://www.rightpoint.com/work/grant-thornton',
    'https://www.rightpoint.com/work/grove-collaborative',
    'https://www.rightpoint.com/work/hubspot',
    'https://www.rightpoint.com/work/industry-west',
    'https://www.rightpoint.com/work/invaluable-auctions',
    'https://www.rightpoint.com/work/johnson-controls',
    'https://www.rightpoint.com/work/knauf-insulation',
    'https://www.rightpoint.com/work/kravet-inc',
    'https://www.rightpoint.com/work/leader-in-high-quality-end-to-end-transmission-solutions',
    'https://www.rightpoint.com/work/m-health',
    'https://www.rightpoint.com/work/macys',
    'https://www.rightpoint.com/work/madico',
    'https://www.rightpoint.com/work/martor',
    'https://www.rightpoint.com/work/national-retailer',
    'https://www.rightpoint.com/work/neurometrixquell',
    'https://www.rightpoint.com/work/nima',
    'https://www.rightpoint.com/work/orlando-health',
    'https://www.rightpoint.com/work/pelotonia',
    'https://www.rightpoint.com/work/pelotonia-digital-experience',
    'https://www.rightpoint.com/work/perkins-school-for-the-blind',
    'https://www.rightpoint.com/work/pet-supplies-plus',
    'https://www.rightpoint.com/work/quicken-intuit-split',
    'https://www.rightpoint.com/work/regional-healthcare-system',
    'https://www.rightpoint.com/work/rue-la-la',
    'https://www.rightpoint.com/work/saloncentric',
    'https://www.rightpoint.com/work/sanofi',
    'https://www.rightpoint.com/work/six-flags',
    'https://www.rightpoint.com/work/toppers-pizza',
    'https://www.rightpoint.com/work/virgin-pulse',
    'https://www.rightpoint.com/work/walgreens',
]

const allWorkUrls = [
    'https://www.rightpoint.com/work/3m',
    'https://www.rightpoint.com/work/aaa',
    'https://www.rightpoint.com/work/ab-inbev',
    'https://www.rightpoint.com/work/animal-pak',
    'https://www.rightpoint.com/work/aon',
    'https://www.rightpoint.com/work/aon-sf',
    'https://www.rightpoint.com/work/benjamin-moore',
    'https://www.rightpoint.com/work/bh',
    'https://www.rightpoint.com/work/bloomingdales',
    'https://www.rightpoint.com/work/boston-dynamics',
    'https://www.rightpoint.com/work/bronson-vitamins',
    'https://www.rightpoint.com/work/cadillac',
    'https://www.rightpoint.com/work/care',
    'https://www.rightpoint.com/work/chamberlain',
    'https://www.rightpoint.com/work/chevrolet',
    'https://www.rightpoint.com/work/children-international',
    'https://www.rightpoint.com/work/degroot-logistics',
    'https://www.rightpoint.com/work/erno-laszlo',
    'https://www.rightpoint.com/work/fast-fashion-a-new-site-for-an-iconic-brand',
    'https://www.rightpoint.com/work/garden-of-life',
    'https://www.rightpoint.com/work/genpact-oasis',
    'https://www.rightpoint.com/work/global-health-network',
    'https://www.rightpoint.com/work/global-leader-in-data-insights-and-consulting',
    'https://www.rightpoint.com/work/grant-thornton',
    'https://www.rightpoint.com/work/grove-collaborative',
    'https://www.rightpoint.com/work/high-powered-telecom-venture',
    'https://www.rightpoint.com/work/hubspot',
    'https://www.rightpoint.com/work/industry-west',
    'https://www.rightpoint.com/work/invaluable-auctions',
    'https://www.rightpoint.com/work/johnson-controls',
    'https://www.rightpoint.com/work/knauf-insulation',
    'https://www.rightpoint.com/work/kravet-inc',
    'https://www.rightpoint.com/work/leader-in-high-quality-end-to-end-transmission-solutions',
    'https://www.rightpoint.com/work/leading-global-financial-services-firm',
    'https://www.rightpoint.com/work/leading-us-drugstore-chain',
    'https://www.rightpoint.com/work/lighthouse',
    'https://www.rightpoint.com/work/luxury-hair-and-body-care',
    'https://www.rightpoint.com/work/m-health',
    'https://www.rightpoint.com/work/macys',
    'https://www.rightpoint.com/work/madico',
    'https://www.rightpoint.com/work/martor',
    'https://www.rightpoint.com/work/mbta',
    'https://www.rightpoint.com/work/muji',
    'https://www.rightpoint.com/work/national-b2b-financial-services-company',
    'https://www.rightpoint.com/work/national-hardware-retailer',
    'https://www.rightpoint.com/work/national-retailer',
    'https://www.rightpoint.com/work/natural-choice',
    'https://www.rightpoint.com/work/neurometrixquell',
    'https://www.rightpoint.com/work/neurometrixquell-reduced',
    'https://www.rightpoint.com/work/neurometrixquell-work-image',
    'https://www.rightpoint.com/work/nima',
    'https://www.rightpoint.com/work/orlando-health',
    'https://www.rightpoint.com/work/pelotonia',
    'https://www.rightpoint.com/work/pelotonia-digital-experience',
    'https://www.rightpoint.com/work/perkins-school-for-the-blind',
    'https://www.rightpoint.com/work/pet-supplies-plus',
    'https://www.rightpoint.com/work/pharmaceutical-product-wholesaler',
    'https://www.rightpoint.com/work/placester',
    'https://www.rightpoint.com/work/quicken-intuit-split',
    'https://www.rightpoint.com/work/regional-healthcare-system',
    'https://www.rightpoint.com/work/rue-la-la',
    'https://www.rightpoint.com/work/runkeeper',
    'https://www.rightpoint.com/work/saloncentric',
    'https://www.rightpoint.com/work/sanofi',
    'https://www.rightpoint.com/work/schneider-electric',
    'https://www.rightpoint.com/work/seaworld',
    'https://www.rightpoint.com/work/sita',
    'https://www.rightpoint.com/work/six-flags',
    'https://www.rightpoint.com/work/solidworks-world',
    'https://www.rightpoint.com/work/step2',
    'https://www.rightpoint.com/work/toppers-pizza',
    'https://www.rightpoint.com/work/tyr-sport-inc',
    'https://www.rightpoint.com/work/university-of-chicago-ssa',
    'https://www.rightpoint.com/work/usertesting',
    'https://www.rightpoint.com/work/virgin-pulse',
    'https://www.rightpoint.com/work/walgreens',
    'https://www.rightpoint.com/work/world-market',
]

const importAll = async ({ limit = null } = {}) => {
    for (let index = 0; index < allWorkUrls.length; index++) {
        if (Number(limit)) {
            console.log('LIMITING IMPORT TO: ', limit)
            if (index >= limit) {
                console.log('LIMIT REACHED -- exiting')
                return
            }
        }
        const url = allWorkUrls[index]
        try {
            await importWorkEntry(url)
        } catch (ex) {
            console.log('!!!')
            console.log('!!!')
            console.error('ERROR IMPORTING WORK', url, ex)
            console.error('ERROR IMPORTING WORK', url, ex)
            console.error('ERROR IMPORTING WORK', url, ex)
            console.log('!!!')
            console.log('!!!')
        }
    }
}

importAll({})

// importWorkEntry('https://www.rightpoint.com/work/pelotonia-digital-experience')
// importWorkEntry('https://www.rightpoint.com/work/chevrolet')
// importWorkEntry('https://www.rightpoint.com/work/boston-dynamics')
// importWorkEntry('https://www.rightpoint.com/work/perkins-school-for-the-blind')
