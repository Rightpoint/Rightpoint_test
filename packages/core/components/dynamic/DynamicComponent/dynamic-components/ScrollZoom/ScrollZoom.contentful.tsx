import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { ScrollZoomProps } from './ScrollZoom.component'
import { DynamicComponentEntryFields } from '../../DynamicComponent.contentful'
import { Document } from '@contentful/rich-text-types'
import { MultiMediaEntry } from '../../../../general/MultiMedia/MultiMedia.contentful'
import { MultiMediaProps } from '../../../../general/MultiMedia/MultiMedia.component'

export interface ScrollZoomEntryFields extends DynamicComponentEntryFields {
    // these field definitions should be maintained in the MDX story.
    content: Document
    references: MultiMediaEntry[]
    title: string
    json: {
        typewriterTexts: string[]
        showLogo: boolean
    }
}

export type ScrollZoomEntry = Entry<ScrollZoomEntryFields>

export const ScrollZoomDynamic = dynamic(() =>
    import('./ScrollZoom.component').then((mod) => mod.ScrollZoom)
)

// const isVariant = (variant: any): variant is ScrollZoomVariants => {
//     return Object.values(ScrollZoomVariants).includes(variant)
// }

// const getValidVariant = (variant: string | undefined) => {
//     if (isVariant(variant)) {
//         return variant
//     }
//     // default
//     return ScrollZoomVariants.Left
// }

export const scrollZoomMapperConfig = makeConfig<
    ScrollZoomEntry,
    ScrollZoomProps
>({
    __mapperType: 'component',
    component: ScrollZoomDynamic,
    contentTypeId: 'scrollzoom',
    entryToMapperProps: async ({ entry, manager }) => {
        return {
            storybook: {
                path:
                    // this is brittle. there must be a better way.
                    '?path=/story/documentation-dynamic-components-scrollzoom--page',
                label: 'CMS Documentation',
            },
        }
    },
    entryToRootProps: async ({ entry }) => {
        return {
            noMargins: true,
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const {
            json = {} as ScrollZoomEntryFields['json'],
            content,
            references,
            title,
        } = entry.fields

        return {
            showLogo: json.showLogo,
            // first media
            multiMediaProps: await getMultiMediaProps(),
            textProps: {
                title,
                typewriterTexts: json.typewriterTexts,
            },
        }
        async function getMultiMediaProps() {
            if (references?.length > 0) {
                return manager.getProps<MultiMediaProps>(references[0], {
                    restrictToContentTypes: ['multiMedia'],
                })
            }
        }
    },
})
