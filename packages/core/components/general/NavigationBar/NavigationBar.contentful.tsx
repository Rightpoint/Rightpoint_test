import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { NavigationBarProps } from './NavigationBar.component'
import { LinkEntry } from '../Link/Link.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

export type NavigationBarEntryFields = {
    internalTitle: EntryFields.Text
    links: LinkEntry[]
}

export type NavigationBarEntry = Entry<NavigationBarEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const NavigationBarDynamic = dynamic(() =>
    import('./NavigationBar.component').then((mod) => mod.NavigationBar)
)

export const navigationBarMapperConfig = makeConfig<
    NavigationBarEntry,
    NavigationBarProps
>({
    __mapperType: 'component',
    contentTypeId: 'componentNavigationBar',
    component: NavigationBarDynamic,
    entryToRootProps: async ({ entry, manager }) => {
        return {
            noMargins: true,
            a11y: {
                label: 'a11y: what should this be? It already has a nav child.',
            },
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const { links } = entry.fields
        return {
            items: links.map((linkEntry) => {
                const { title } = linkEntry.fields
                return {
                    text: title,
                }
            }),
        }
    },
})
