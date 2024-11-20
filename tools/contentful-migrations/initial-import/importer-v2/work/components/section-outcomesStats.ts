import { Entry } from 'contentful'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { WorkScraperResult } from '../parse-work-page'
import { sectionParsers } from '../work-section-parsers'
import { createRichTextDocumentFromHtml } from '../../utils/create-rich-text-document'
import { deterministicId } from '../../utils/deterministic-id'
import { transformToLocale } from '../../utils/transform-to-locale'

import {
    WorkDetailImpactEntry,
    WorkDetailTextEntry,
} from '@rightpoint/core/components'
import { createOrUpdateEntry } from '../../utils/create-or-update-entry'

export const importOutcomesStatsSection = async ({
    section,
    scraper,
    environment,
}: {
    section: ReturnType<typeof sectionParsers.outcomesStats>
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
    const fields: Partial<WorkDetailImpactEntry['fields']> = {
        internalName: `Work/${scraper.headerData.title} - Outcomes Stats - ${section.title}`,
        title: 'Impact',
        impacts: section.stats
            .map((stat) => `${stat.number}:${stat.label}`)
            .join('\n'),
        backgroundColor: 'Inherit',
    }

    const id = deterministicId(
        'outcomes-stats',
        scraper.headerData.title,
        section.title
    )

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'workDetailImpact',
    })
}
