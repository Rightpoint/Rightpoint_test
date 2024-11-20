import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import type { SimpleCtaProps } from './SimpleCta.component'
import type { LinkEntry } from '../../links/Link/Link.contentful'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'

/**
 * Contentful entry types
 */
export type SimpleCtaEntryFields = {
    internalTitle: EntryFields.Text
    title: EntryFields.Text
    content: Document
    link: LinkEntry | Entry<any>
}

export type SimpleCtaEntry = Entry<SimpleCtaEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const SimpleCtaDynamic = dynamic(() =>
    import('./SimpleCta.component').then((mod) => mod.SimpleCta)
)

export const simpleCtaMapperConfig = makeConfig<SimpleCtaEntry, SimpleCtaProps>(
    {
        __mapperType: 'component',
        component: SimpleCtaDynamic,
        contentTypeId: 'componentSimpleCta',
        entryToProps: async ({ entry, manager }) => {
            const { title, content, link } = entry.fields
            return {
                title,
                content: await contentfulRichTextDocumentToJsonSafe(
                    content,
                    manager
                ),
                linkProps: await manager.getLinkProps(link),
            }
        },
        entryToRootProps: async ({ entry }) => {
            return {
                container: true,
            }
        },
    }
)
