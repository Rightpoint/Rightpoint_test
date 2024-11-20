import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import { contentfulWarning } from '@rightpoint/core/utils'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

export const RichTextDynamic = dynamic(() =>
    import('./RichText.component').then((mod) => mod.RichText)
)

type RichTextProps = any

export const richTextMapperConfig = makeConfig<any, RichTextProps>({
    __mapperType: 'component',
    contentTypeId: 'richText',
    component: RichTextDynamic,
    entryToProps: async ({ entry: document, manager }) => {
        return {}
    },
    entryToRootProps: async ({ entry }) => {
        return {}
    },
})
