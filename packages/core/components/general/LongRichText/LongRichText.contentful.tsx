import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { LongRichTextProps } from './LongRichText.component'

import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { Document } from '@contentful/rich-text-types'
import { ContainerWidths } from '../../layout/RootComponent/container'

/**
 * Contentful entry types
 */
export type LongRichTextEntryFields = {
    internalName: EntryFields.Text
    text: Document
    container: ContainerWidths | string
}

export type LongRichTextEntry = Entry<LongRichTextEntryFields>

type LongRichTextPropsWithRichText = Partial<LongRichTextProps> & {
    // rich text document to be serialized
    richTextDocument?: Document
}

/**
 * Dynamic import chunks runtime components
 */
export const LongRichTextDynamic = dynamic(() =>
    import('./LongRichText.component').then((mod) => mod.LongRichText)
)

export const longRichTextMapperConfig = makeConfig<
    LongRichTextEntry,
    LongRichTextPropsWithRichText
>({
    __mapperType: 'component',
    contentTypeId: 'longRichText',
    component: LongRichTextDynamic,
    entryToProps: async ({ entry, manager }) => {
        const { text } = entry.fields
        return {
            richTextDocument: await contentfulRichTextDocumentToJsonSafe(
                text,
                manager
            ),
        }
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {
            text: contentfulRichTextToReact(props.richTextDocument, manager),
        }
    },
    entryToRootProps: async ({ entry }) => {
        return {
            container: Boolean(entry.fields.container),
        }
    },
})
