import { Seo } from './Seo.component'
import { EntryFields, Entry, Asset } from 'contentful'
import type { SeoProps } from './Seo.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

export type SeoEntryFields = {
    name: EntryFields.Text
    title: EntryFields.Text
    description: EntryFields.Text
    keywords: EntryFields.Text
    no_index: EntryFields.Boolean
    no_follow: EntryFields.Boolean
    openGraphImage?: Asset
    canonicalUrl: EntryFields.Text
}

export type SeoEntry = Entry<SeoEntryFields>

export const seoMapperConfig = makeConfig<SeoEntry, SeoProps>({
    __mapperType: 'component',
    contentTypeId: 'seo',
    entryToProps: async ({ entry }) => {
        const {
            title,
            description,
            keywords,
            no_index,
            no_follow,
            openGraphImage,
            canonicalUrl,
        } = entry.fields
        return {
            title,
            description,
            keywords,
            openGraphImage,

            noIndex: no_index,
            noFollow: no_follow,

            canonicalUrl,
        }
    },
    component: Seo,
})
