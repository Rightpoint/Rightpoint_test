import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { HeaderProps, HeaderVariants } from './Header.component'
import { Document } from '@contentful/rich-text-types'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { backgroundTypeUtils } from '../../layout/RootComponent/background-color-type-utils'

export type HeaderEntryFields = {
    internalTitle: EntryFields.Text
    variant: EntryFields.Text
    eyebrow: EntryFields.Text
    title: EntryFields.Text
    titleRich: Document
    body: Document
    link: LinkEntry
    pageReference: Entry<any>

    isPageHeader?: EntryFields.Boolean
    subtitle: Document

    backgroundColor: EntryFields.Text
}

export type HeaderEntry = Entry<HeaderEntryFields>

export const HeaderDynamic = dynamic(() =>
    import('./Header.component').then((mod) => mod.Header)
)

export const headerMapperConfig = makeConfig<HeaderEntry, HeaderProps>({
    __mapperType: 'component',
    component: HeaderDynamic,
    contentTypeId: 'componentBasicHeader',
    entryToProps: async ({ entry, manager }) => {
        const {
            title,
            titleRich,
            variant,
            eyebrow,
            body,
            link,
            pageReference,
            isPageHeader,
            subtitle,
        } = entry.fields
        return {
            variant: getHeaderVariant(variant),
            eyebrow,
            title,
            titleDocument: await contentfulRichTextDocumentToJsonSafe(
                titleRich,
                manager
            ),
            body: await contentfulRichTextDocumentToJsonSafe(body, manager),
            linkProps: await manager.getLinkProps(pageReference || link),
            isPageHeader,
            subtitle: await contentfulRichTextDocumentToJsonSafe(
                subtitle,
                manager
            ),
        }
        function getHeaderVariant(headerVariant: string) {
            const isHeaderVariant = (
                variant: string
            ): variant is HeaderVariants =>
                HeaderVariants.includes(variant as any)
            return isHeaderVariant(headerVariant)
                ? headerVariant
                : HeaderVariants[0]
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { isPageHeader, backgroundColor } = entry.fields
        return {
            container: true,
            background: {
                backgroundColor:
                    backgroundTypeUtils.getBackgroundColor(backgroundColor),
            },
        }
    },
})
