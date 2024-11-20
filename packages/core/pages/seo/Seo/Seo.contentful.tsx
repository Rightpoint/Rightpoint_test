import { Seo } from './Seo.component'
import { EntryFields, Entry, Asset } from 'contentful'
import type { SeoProps } from './Seo.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { isNil, omitBy } from 'lodash'
import { protocolRelativeToAbsolute } from '@rightpoint/core/utils'

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
            ...omitBy(
                {
                    title,
                    description,
                    keywords,
                    openGraphImage: getOpenGraphImage(
                        openGraphImage?.fields?.file?.url
                    ),
                    noIndex: no_index,
                    noFollow: no_follow,

                    canonicalUrl,
                },
                (value) => {
                    // remove null-ish values (but not true/false)
                    if (isNil(value)) {
                        return true
                    }
                    // remove falsy empty strings i.e. ''
                    if (typeof value === 'string' && !value) {
                        return true
                    }
                    return false
                }
            ),
        }
        function getOpenGraphImage(imageUrl) {
            if (!imageUrl) {
                return null
            }
            return protocolRelativeToAbsolute(imageUrl)
        }
    },
    component: Seo,
})
