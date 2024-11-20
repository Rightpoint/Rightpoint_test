import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ThoughtHeaderProps } from './ThoughtHeader.component'

/**
 * Contentful entry types
 */
export type ThoughtHeaderEntryFields = {
    internalName: EntryFields.Text
}

export type ThoughtHeaderEntry = Entry<ThoughtHeaderEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const ThoughtHeaderDynamic = dynamic(() =>
    import('./ThoughtHeader.component').then((mod) => mod.ThoughtHeader)
)

export const thoughtHeaderMapperConfig = makeConfig<
    ThoughtHeaderEntry,
    ThoughtHeaderProps
>({
    __mapperType: 'component',
    component: ThoughtHeaderDynamic,
    contentTypeId: 'thoughtHeader',
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
