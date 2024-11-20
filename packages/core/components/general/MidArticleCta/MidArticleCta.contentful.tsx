import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { MidArticleCtaProps } from './MidArticleCta.component'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { LinkEntry } from '../Link/Link.contentful'

/**
 * Contentful entry types
 */
export type MidArticleCtaEntryFields = {
    internalName: EntryFields.Text
    media: MultiMediaEntry
    title: EntryFields.Text
    titleMobile: EntryFields.Text
    backgroundColor: EntryFields.Text
    body: Document
    link: LinkEntry
}

export type MidArticleCtaEntry = Entry<MidArticleCtaEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const MidArticleCtaDynamic = dynamic(() =>
    import('./MidArticleCta.component').then((mod) => mod.MidArticleCta)
)

export const midArticleCtaMapperConfig = makeConfig<
    MidArticleCtaEntry,
    MidArticleCtaProps & {
        subtitleDocument?: Document
    }
>({
    __mapperType: 'component',
    component: MidArticleCtaDynamic,
    contentTypeId: 'midArticleCta',
    entryToProps: async ({ entry, manager }) => {
        const { media, title, titleMobile, body } = entry.fields
        return {
            title,
            titleMobile,
            subtitleDocument: await contentfulRichTextDocumentToJsonSafe(
                body,
                manager
            ),
            multiMediaProps: (await manager.getProps(media)) as any,
        }
    },
    entryToRootProps: async ({ entry }) => {
        return {
            background: {
                backgroundColor: entry.fields.backgroundColor,
            },
            edgeToEdge: true,
        }
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {
            ...props,
            subtitle: contentfulRichTextToReact(
                props.subtitleDocument,
                manager
            ),
        }
    },
})
