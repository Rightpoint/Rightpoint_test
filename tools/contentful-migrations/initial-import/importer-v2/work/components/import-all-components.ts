import { Entry } from 'contentful-management'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { WorkScraperResult } from '../parse-work-page'
import { SectionParserReturns } from '../work-section-parsers'
import { importContributionsSection } from './section-contributions'
import { importImageSection } from './section-image'
import { importImages3Section } from './section-image3'
import { importOutcomesSection } from './section-outcomes'
import { importOutcomesStatsSection } from './section-outcomesStats'
import { importQuoteSection } from './section-quote'
import { importTextSection } from './section-text'
import { importVideoSection } from './section-video'

export const importAllWorkComponents = async ({
    scraper,
    environment,
}: {
    scraper: WorkScraperResult
    environment: ContentfulEnvironmentAPI
}): Promise<Entry[]> => {
    console.log(' ')
    console.log('BEGIN IMPORT ALL WORK COMPONENTS')
    // for section, create an entry of the correct type
    const results = []

    const handleSection = async (section: SectionParserReturns) => {
        switch (section.type) {
            case 'text':
                return await importTextSection({
                    section,
                    scraper,
                    environment,
                })
            case 'video':
                return await importVideoSection({
                    section,
                    scraper,
                    environment,
                })
            case 'image':
                return await importImageSection({
                    section,
                    environment,
                    scraper,
                })
            case 'images3':
                return await importImages3Section({
                    section,
                    environment,
                    scraper,
                })
            case 'quote':
                return await importQuoteSection({
                    section,
                    environment,
                    scraper,
                })
            case 'outcomesStats':
                return await importOutcomesStatsSection({
                    section,
                    environment,
                    scraper,
                })
            case 'outcomes':
                return await importOutcomesSection({
                    section,
                    environment,
                    scraper,
                })
            case 'contributions':
                return await importContributionsSection({
                    section,
                    environment,
                    scraper,
                })
            default:
                return null
        }
    }
    for await (const iterator of scraper.sections) {
        if (iterator) {
            const result = await handleSection(iterator)
            if (result) {
                results.push(result)
            }
        }
    }
    console.log('COMPLETE IMPORT ALL WORK COMPONENTS')
    console.log('')
    return results
}
