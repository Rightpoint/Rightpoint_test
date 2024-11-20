import { Entry } from 'contentful'
import { ContentfulEnvironmentAPI } from 'contentful-management/dist/typings/create-environment-api'
import { WorkScraperResult } from '../parse-work-page'
import { sectionParsers } from '../work-section-parsers'
import { createRichTextDocumentFromHtml } from '../../utils/create-rich-text-document'
import { deterministicId } from '../../utils/deterministic-id'
import { transformToLocale } from '../../utils/transform-to-locale'

import { WorkDetailTextEntry } from '@rightpoint/core/components'
import { createOrUpdateEntry } from '../../utils/create-or-update-entry'

export const importContributionsSection = async ({
    section,
    scraper,
    environment,
}: {
    section: ReturnType<typeof sectionParsers.contributions>
    scraper: WorkScraperResult
    environment: ContentfulEnvironmentAPI
}) => {
    const html = section.groups.map((group) => group.bodyHtml).join('<br/>')
    const fields: WorkDetailTextEntry['fields'] = {
        internalName: `Work/${scraper.headerData.title} - Contributions - ${section.title}`,
        title: section.title,
        subtitle: '',
        // todo: might need to transform to pass validation (no h3, h4 allowed in new site)
        body: await createRichTextDocumentFromHtml(html),
        backgroundColor: 'Inherit',
    }

    const id = deterministicId(
        scraper.headerData.title,
        section.type,
        section.groups
    )

    return await createOrUpdateEntry({
        environment,
        id,
        fields,
        contentTypeId: 'componentWorkDetailText',
    })
}
