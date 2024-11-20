import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SimpleListProps } from './SimpleList.component'

/**
 * Contentful entry types
 */
export type SimpleListEntryFields = {
    internalName: EntryFields.Text
}

export type SimpleListEntry = Entry<SimpleListEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const SimpleListDynamic = dynamic(() =>
    import('./SimpleList.component').then((mod) => mod.SimpleList)
)

export const simpleListMapperConfig = makeConfig<
    SimpleListEntry,
    SimpleListProps
>({
    __mapperType: 'component',
    component: SimpleListDynamic,
    contentTypeId: 'simpleList',
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
