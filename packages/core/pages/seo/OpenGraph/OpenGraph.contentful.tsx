import { OpenGraph, type OpenGraphProps } from './OpenGraph.component'
import { EntryFields, Entry, Asset } from 'contentful'

import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { isNil, omitBy } from 'lodash'
import { protocolRelativeToAbsolute } from '@rightpoint/core/utils'
import type { MultiMediaEntry } from '@rightpoint/core/components'
import { getOpenGraphImageFromMultiMedia } from './open-graph-image-from-multi-media'

export type OpenGraphEntryFields = {
    title: EntryFields.Text
    description: EntryFields.Text
    media?: MultiMediaEntry
}

export type OpenGraphEntry = Entry<OpenGraphEntryFields>

export const openGraphMapperConfig = makeConfig<OpenGraphEntry, OpenGraphProps>(
    {
        __mapperType: 'component',
        contentTypeId: 'social',
        entryToProps: async ({ entry, manager }) => {
            const { title, description, media } = entry.fields
            return {
                ...omitBy(
                    {
                        title,
                        description,
                        openGraphImage: await getOpenGraphAbsoluteUrl(),
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
            async function getOpenGraphAbsoluteUrl() {
                const imageUrl = await getOpenGraphImageFromMultiMedia(
                    media,
                    manager
                )
                if (!imageUrl) {
                    return null
                }
                return protocolRelativeToAbsolute(imageUrl)
            }
        },
        component: OpenGraph,
    }
)
