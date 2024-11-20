import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import { Document } from '@contentful/rich-text-types'
import {
    ContentColors,
    contentfulRichTextDocumentToJsonSafe,
    LinkProps,
    MultiMediaEntry,
} from '@rightpoint/core/components'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export type OfficePageEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text
    // media?: MultiMediaEntry
    cardTitle?: EntryFields.Text
    cardBody?: Document
    cardMedia?: MultiMediaEntry
}

export type OfficePageEntry = Entry<OfficePageEntryFields>

// export const OfficePageDynamic = dynamic(() =>
//     import('./Office.page').then((mod) => mod.OfficePage)
// )
const OfficePageDynamic = () => null

export const officePageMapperConfig = makeConfig<
    OfficePageEntry,
    // OfficePageProps
    any
>({
    __mapperType: 'page',
    component: OfficePageDynamic,
    excludeFromSitemap: true,
    contentTypeId: 'office',
    seoFieldName: null,
    slugFieldName: null,
    slugContextName: null,
    urlBasePath: null,
    entryToUrl: async ({ entry, manager }) => {
        return '/404?no-office-detail-page'
    },
    entryToProps: async ({ entry, manager }) => {
        return {} as any // this is unused -- there is no person page
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, cardTitle, cardBody, cardMedia } = entry.fields
        return {
            title: cardTitle || title,
            bodyRichTextDocument: await contentfulRichTextDocumentToJsonSafe(
                cardBody,
                manager
            ),
            multiMediaProps: await manager.getProps(cardMedia),
            linkProps: null, // these pages are not deep linkable
        }
    },
})
