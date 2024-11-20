import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { BackgroundMediaProps } from './BackgroundMedia.component'

/**
 * Contentful entry types
 */
export type BackgroundMediaEntryFields = {
    internalName: EntryFields.Text
}

export type BackgroundMediaEntry = Entry<BackgroundMediaEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const BackgroundMediaDynamic = dynamic(() =>
    import('./BackgroundMedia.component').then((mod) => mod.BackgroundMedia)
)

export const backgroundMediaMapperConfig = makeConfig<
    BackgroundMediaEntry,
    BackgroundMediaProps
>({
    __mapperType: 'component',
    component: BackgroundMediaDynamic,
    contentTypeId: 'backgroundMedia',
    entryToProps: async ({ entry, manager }) => {
        const { internalName } = entry.fields
        return {
            internalName,
        }
    },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})
