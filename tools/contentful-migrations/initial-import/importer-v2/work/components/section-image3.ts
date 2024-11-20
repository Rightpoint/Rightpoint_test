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

export const importImages3Section = async ({
    section,
    scraper,
    environment,
}: {
    section: ReturnType<typeof sectionParsers.images3>
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
    const multiMediaLinks = []
    for (const image of section.images) {
        const multiMediaLink = await createMultiMediaAndAsset({
            environment,
            title: `${scraper.headerData.title} - Image`,
            url: image,
            description: '',
            asLinkReference: true,
        })
        if (multiMediaLink) {
            multiMediaLinks.push(multiMediaLink)
        } else {
            console.log('No multi media link')
        }
    }
    const fields: Partial<WorkDetailMediaEntry['fields']> = {
        internalName: `Work/${scraper.headerData.title} - Images - 3`,
        // a11yLabel: '',
        container: 'Container',
        columns: '3',
        verticallyOffsetWithShadows: true,
        media: multiMediaLinks,
    }

    const id = deterministicId(
        scraper.headerData.title,
        section.images.join(',')
    )

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'workDetailMedia',
    })
}
