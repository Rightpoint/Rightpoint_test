import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ScrollingTextProps } from './ScrollingText.component'

/**
 * Contentful entry types
 */
export type ScrollingTextEntryFields = {
    internalName: EntryFields.Text
}

export type ScrollingTextEntry = Entry<ScrollingTextEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const ScrollingTextDynamic = dynamic(() =>
    import('./ScrollingText.component').then((mod) => mod.ScrollingText)
)

export const scrollingTextMapperConfig = makeConfig<
    ScrollingTextEntry,
    ScrollingTextProps
>({
    __mapperType: 'component',
    component: ScrollingTextDynamic,
    contentTypeId: 'scrollingText',
    entryToProps: async ({ entry, manager }) => {
        const { internalName } = entry.fields
        return {} as any
    },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})
