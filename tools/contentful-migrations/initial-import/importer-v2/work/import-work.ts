import type { WorkDetailEntry } from '@rightpoint/core/pages'

import { getClientEnvironment } from '../utils/get-client-environment'
import { createOrUpdateEntry } from '../utils/create-or-update-entry'
import { deterministicId } from '../utils/deterministic-id'
import { entryToLink } from '../utils/entry-to-link'
import { createMultiMediaAndAsset } from '../utils/create-multi-media-and-asset'

import { scrapeWorkData } from './parse-work-page'
import { importAllWorkComponents } from './components/import-all-components'
import { importWorkCategories } from './import-work-categories'

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

    const categories = await importWorkCategories({ scraper })

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
        // backgroundColor: '',
        // relatedWork: relatedWork.relatedHrefs.map((href) => {
        //     // need to take href and find related work reference. Can only be done later.
        //     // possibly manual step.
        // }),

        industry: entryToLink(categories.industryEntry, 'Entry'),
        workCategory: entryToLink(categories.workCategoryEntry, 'Entry'),
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

const allWorkUrls = [
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

const importAll = async () => {
    for (let index = 0; index < allWorkUrls.length; index++) {
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

importAll()

// importWorkEntry('https://www.rightpoint.com/work/pelotonia-digital-experience')
// importWorkEntry('https://www.rightpoint.com/work/chevrolet')
// importWorkEntry('https://www.rightpoint.com/work/boston-dynamics')

// importWorkEntry('https://www.rightpoint.com/work/perkins-school-for-the-blind')
