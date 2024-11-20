import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { WorkScraperResult } from '../parse-work-page'
import { sectionParsers } from '../work-section-parsers'
import { deterministicId } from '../../utils/deterministic-id'

import { QuoteEntry } from '@rightpoint/core/components'
import { createOrUpdateEntry } from '../../utils/create-or-update-entry'

export const importQuoteSection = async ({
    section,
    scraper,
    environment,
}: {
    section: ReturnType<typeof sectionParsers.quote>
    scraper: WorkScraperResult
    environment: ContentfulEnvironmentAPI
}) => {
    /**
     * Import a work text section.
     *
     * Generate a Work Detail Text component
     *
     * It has a rich text field, but there will be no assets in source.
     * Work source pages have images in unique modules.
     */
    const fields: QuoteEntry['fields'] = {
        internalName: `Work/${scraper.headerData.title}: Quote - ${section.person.name}`,
        text: section.quote,
        name: section.person.name,
        jobTitle: section.person.jobTitle,
        // variant: 'Large', // large is too big reliably
        variant: 'Default',
        backgroundColor: 'Inherit',
    }

    const id = deterministicId(scraper.headerData.title, section.quote)

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'componentQuote',
    })
}
