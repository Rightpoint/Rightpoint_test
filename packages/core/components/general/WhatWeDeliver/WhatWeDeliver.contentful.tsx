import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import { WhatWeDeliverProps } from './WhatWeDeliver.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type WhatWeDeliverEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text

    content: Document
}

export type WhatWeDeliverEntry = Entry<WhatWeDeliverEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const WhatWeDeliverDynamic = dynamic(() =>
    import('./WhatWeDeliver.component').then((mod) => mod.WhatWeDeliver)
)

/**
 * @deprecated
 */
export const whatWeDeliverMapperConfig = makeConfig<
    WhatWeDeliverEntry,
    WhatWeDeliverProps
>({
    __mapperType: 'component',
    component: WhatWeDeliverDynamic,
    contentTypeId: 'componentWhatWeDeliver',
    entryToProps: async ({ entry, manager }) => {
        const { title, content } = entry.fields
        return {
            title: title,
            content: await contentfulRichTextDocumentToJsonSafe(
                content,
                manager
            ),
        }
    },
})
