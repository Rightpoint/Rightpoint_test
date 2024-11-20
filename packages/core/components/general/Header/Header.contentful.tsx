import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import { HeaderProps } from './Header.component'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type HeaderEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    a11yLabel: EntryFields.Text

    body: Document

    typewriter: EntryFields.Text

    media: MultiMediaEntry

    backgroundColor: BackgroundColors
    backgroundPosition: 'Top' | 'Bottom' | 'Solid'
}

export type HeaderEntry = Entry<HeaderEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const HeaderDynamic = dynamic(() =>
    import('./Header.component').then((mod) => mod.Header)
)

export const componentHeaderMapperConfig = makeConfig<
    HeaderEntry,
    Partial<HeaderProps> & {
        bodyDocument?: Document
    }
>({
    __mapperType: 'component',
    contentTypeId: 'componentHeader',
    component: HeaderDynamic,
    entryToProps: async ({ entry, manager }) => {
        const { typewriter, media, body, backgroundColor, backgroundPosition } =
            entry.fields
        return {
            backgroundColor,
            backgroundPosition: backgroundPosition?.toLowerCase() as
                | 'top'
                | 'bottom'
                | 'solid',
            headerTextProps: {
                title: '',
                typewriterProps: {
                    texts: typewriter?.split('\n'),
                },
            },
            multiMediaProps: await manager.getProps<MultiMediaProps>(media, {
                restrictToContentTypes: ['multiMedia'],
            }),
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                body,
                manager
            ),
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        const { backgroundPosition, backgroundColor } = entry.fields
        return {
            noMargins: !!backgroundPosition && !!backgroundColor,
            a11y: {
                label: entry.fields.a11yLabel || entry.fields.title,
            },
        }
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {
            ...props,
            body: contentfulRichTextToReact(props.bodyDocument, manager),
        }
    },
})
