import { Entry } from 'contentful'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { WorkScraperResult } from '../parse-work-page'
import { sectionParsers } from '../work-section-parsers'
import { createRichTextDocumentFromHtml } from '../../utils/create-rich-text-document'
import { deterministicId } from '../../utils/deterministic-id'
import { transformToLocale } from '../../utils/transform-to-locale'

import {
    WorkDetailMediaEntry,
    WorkDetailTextEntry,
} from '@rightpoint/core/components'
import { createOrUpdateEntry } from '../../utils/create-or-update-entry'
import {
    createMultiMediaAndAsset,
    createMultiMediaVideo,
} from '../../utils/create-multi-media-and-asset'

export const importImageSection = async ({
    section,
    scraper,
    environment,
}: {
    section: ReturnType<typeof sectionParsers.image>
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
    const fields: Partial<WorkDetailMediaEntry['fields']> = {
        internalName: `Work/${scraper.headerData.title} - Image`,
        a11yLabel: '',
        // container: 'Container',
        media: [
            await createMultiMediaAndAsset({
                environment,
                title: scraper.headerData.title + ' - Image',
                url: section.image,
                description: '',
                asLinkReference: true,
            }),
        ].filter(Boolean),
    }

    const id = deterministicId(scraper.headerData.title, section.image)

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'workDetailMedia',
    })
}
