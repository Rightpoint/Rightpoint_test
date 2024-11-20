import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SimpleContentProps } from './SimpleContent.component'
import { MultiMediaEntry } from '../../general/MultiMedia/MultiMedia.contentful'
import { Document } from '@contentful/rich-text-types'
import { backgroundTypeUtils } from '../../layout/RootComponent/background-color-type-utils'
import { containerTypeUtils } from '../../layout/RootComponent/container-type-utils'
import { contentfulRichTextDocumentToJsonSafe } from '../../general/RichText/contentful-rich-text-to-json-safe'
import { HeaderEntry } from '../Header/Header.contentful'

/**
 * Contentful entry types
 */
export type SimpleContentEntryFields = {
    internalName: EntryFields.Text
    header: HeaderEntry
    media: MultiMediaEntry
    content: Document
    container: EntryFields.Text
    backgroundColor: EntryFields.Text
    textAlign?: EntryFields.Text

    /**
     * TODO:
     * - Need a CTA field.
     * - Way to insert buttons (in rich text?)
     * - Different styles
     */
}

export type SimpleContentEntry = Entry<SimpleContentEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const SimpleContentDynamic = dynamic(() =>
    import('./SimpleContent.component').then((mod) => mod.SimpleContent)
)

export const simpleContentMapperConfig = makeConfig<
    SimpleContentEntry,
    SimpleContentProps
>({
    __mapperType: 'component',
    component: SimpleContentDynamic,
    contentTypeId: 'componentSimpleContent',
    entryToProps: async ({ entry, manager }) => {
        const { media, content, header, textAlign } = entry.fields
        return {
            headerProps: await manager.getProps(header, {
                restrictToContentTypes: ['componentBasicHeader'],
            }),
            media,
            content: await contentfulRichTextDocumentToJsonSafe(
                content,
                manager
            ),
            textAlign: textAlign || null,
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { container, backgroundColor } = entry.fields
        return {
            container: containerTypeUtils.getContainerWidth(container),
            background: {
                backgroundColor:
                    backgroundTypeUtils.getBackgroundColor(backgroundColor),
            },
        }
    },
})
