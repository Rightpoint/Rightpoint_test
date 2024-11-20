import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import {
    FloatingImageTextComposedProps,
    FloatingImageTextProps,
    FloatingImageVariants,
} from './FloatingImageText.component'
import { contentfulRichTextDocumentToJsonSafe } from '../../../../general/RichText/contentful-rich-text-to-json-safe'
import { Document } from '@contentful/rich-text-types'
import type { DynamicComponentEntryFields } from '../../DynamicComponent.contentful'
import type { StatProps } from './Stats'
import type { MultiMediaEntry } from '../../../../general/MultiMedia/MultiMedia.contentful'
import type { MultiMediaProps } from '../../../../general/MultiMedia/MultiMedia.component'

export interface FloatingImageTextEntryFields
    extends DynamicComponentEntryFields {
    // these field definitions should be maintained in the MDX story.
    content: Document
    references: MultiMediaEntry[]
    json: {
        heroTitle: string
        title: string
        variant: string // 'left' ,'right'
        stats?: StatProps[]
        heroVariant: string // withImage
        imageVariant?: string // rounded
        background?: {
            color?: string
            // half?
        }
    }
}

export type FloatingImageTextEntry = Entry<FloatingImageTextEntryFields>

export const FloatingImageTextDynamic = dynamic(() =>
    import('./FloatingImageText.component').then(
        (mod) => mod.FloatingImageTextComposed
    )
)

const isVariant = (variant: any): variant is FloatingImageVariants => {
    return Object.values(FloatingImageVariants).includes(variant)
}

const getValidVariant = (variant: string | undefined) => {
    if (isVariant(variant)) {
        return variant
    }
    // default
    return FloatingImageVariants.Left
}

export const floatingImageTextMapperConfig = makeConfig<
    FloatingImageTextEntry,
    FloatingImageTextComposedProps
>({
    __mapperType: 'component',
    component: FloatingImageTextDynamic,
    contentTypeId: 'floatingImageText',
    entryToMapperProps: async ({ entry, manager }) => {
        return {
            storybook: {
                path:
                    // this is brittle. there must be a better way.
                    '?path=/story/documentation-dynamic-components-floatingimagetext--page',
                label: 'CMS Documentation',
            },
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const { json, content, references } = entry.fields
        return {
            heroTitle: json.heroTitle,
            title: json.title,
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                content,
                manager
            ),
            multiMediasProps: await getMultiMediasProps(),
            variant: getValidVariant(json.variant as any),
            stats: json.stats,
            heroVariant: json.heroVariant,
            imageVariant: json.imageVariant,
            backgroundProps: json.background,
        }
        async function getMultiMediasProps() {
            return references
                ? await Promise.all(
                      references.map((multiMediaEntry) =>
                          manager.getProps<MultiMediaProps>(multiMediaEntry, {
                              restrictToContentTypes: ['multiMedia'],
                          })
                      )
                  )
                : null
        }
    },
    entryToRootProps: async ({ entry }) => {
        const { container, backgroundColor, json } = entry.fields
        return {
            container,
            background: {
                backgroundColor,
            },
        }
    },
})
