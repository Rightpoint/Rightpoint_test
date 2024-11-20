import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { TabsNavProps } from './TabsNav.component'

/**
 * Contentful entry types
 */
export type TabsNavEntryFields = {
    internalTitle: EntryFields.Text
}

export type TabsNavEntry = Entry<TabsNavEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const TabsNavDynamic = dynamic(() =>
    import('./TabsNav.component').then((mod) => mod.TabsNav)
)

export const tabsNavMapperConfig = makeConfig<TabsNavEntry, TabsNavProps>({
    __mapperType: 'component',
    component: TabsNavDynamic,
    contentTypeId: 'tabsNav',
    entryToProps: async ({ entry, manager }) => {
        const {
            // fields
        } = entry.fields
        return {
            // props
        }
    },
    // WARNING: Do not use manager in a way that calls getXProps which may cause circular dependencies.
    // entryToRootProps: async ({ entry }) => {
    //    return {}
    // },
})
