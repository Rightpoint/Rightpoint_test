import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { HeaderProps } from './Header.component'

/**
 * Contentful entry types
 */
export type HeaderEntryFields = {
    internalName: EntryFields.Text
}

export type HeaderEntry = Entry<HeaderEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const HeaderDynamic = dynamic(() =>
    import('./Header.component').then((mod) => mod.Header)
)

export const headerMapperConfig = makeConfig<HeaderEntry, HeaderProps>({
    __mapperType: 'component',
    component: HeaderDynamic,
    contentTypeId: 'header',
    entryToProps: async ({ entry, manager }) => {
        const { internalName } = entry.fields
        return {} as any
    },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})
