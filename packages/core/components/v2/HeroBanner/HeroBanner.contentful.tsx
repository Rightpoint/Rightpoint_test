import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { HeroBannerProps } from './HeroBanner.component'

/**
 * Contentful entry types
 */
export type HeroBannerEntryFields = {
    internalName: EntryFields.Text
}

export type HeroBannerEntry = Entry<HeroBannerEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const HeroBannerDynamic = dynamic(() =>
    import('./HeroBanner.component').then((mod) => mod.HeroBanner)
)

export const heroBannerMapperConfig = makeConfig<
    HeroBannerEntry,
    HeroBannerProps
>({
    __mapperType: 'component',
    component: HeroBannerDynamic,
    contentTypeId: 'heroBanner',
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
