import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { FloatingContentProps } from './FloatingContent.component'

/**
 * Contentful entry types
 */
export type FloatingContentEntryFields = {
    internalName: EntryFields.Text
}

export type FloatingContentEntry = Entry<FloatingContentEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const FloatingContentDynamic = dynamic(() =>
    import('./FloatingContent.component').then((mod) => mod.FloatingContent)
)

export const floatingContentMapperConfig = makeConfig<
    FloatingContentEntry,
    FloatingContentProps
>({
    __mapperType: 'component',
    component: FloatingContentDynamic,
    contentTypeId: 'floatingContent',
    // entryToProps: async ({ entry }) => {
    //     const { internalName } = entry.fields
    //     return {
    //         internalName,
    //     }
    // },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})
