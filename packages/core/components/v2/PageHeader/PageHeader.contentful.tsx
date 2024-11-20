import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { PageHeaderProps } from './PageHeader.component'

/**
 * Contentful entry types
 */
export type PageHeaderEntryFields = {
    internalName: EntryFields.Text
}

export type PageHeaderEntry = Entry<PageHeaderEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const PageHeaderDynamic = dynamic(() =>
    import('./PageHeader.component').then((mod) => mod.PageHeader)
)

export const pageHeaderMapperConfig = makeConfig<
    PageHeaderEntry,
    PageHeaderProps
>({
    __mapperType: 'component',
    component: PageHeaderDynamic,
    contentTypeId: 'pageHeader',
    entryToProps: async ({ entry, manager }) => {
        const {} = entry.fields
        return {
            // internalName,
        } as any // this component is not CMS placeable -- yet
    },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})
