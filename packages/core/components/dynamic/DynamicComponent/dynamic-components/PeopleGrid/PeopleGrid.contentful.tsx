import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { PeopleGridProps } from './PeopleGrid.component'
import { contentfulRichTextDocumentToJsonSafe } from '../../../../general/RichText/contentful-rich-text-to-json-safe'
import { Document } from '@contentful/rich-text-types'
import type { DynamicComponentEntryFields } from '../../DynamicComponent.contentful'
import type { MultiMediaEntry } from '../../../../general/MultiMedia/MultiMedia.contentful'
import type { MultiMediaProps } from '../../../../general/MultiMedia/MultiMedia.component'
import { PersonEntry } from '../../../../general/Person/Person.contentful'
import { PersonProps } from '../../../../general/Person/Person.component'

export interface PeopleGridEntryFields extends DynamicComponentEntryFields {
    // these field definitions should be maintained in the MDX story.
    content: Document
    references: PersonEntry[]
    json: {
        heroTitle: string
        title: string
        variant: string // 'left' ,'right'
        heroVariant: string // withImage
        imageVariant?: string // rounded
        background?: {
            color?: string
            // half?
        }
    }
}

export type PeopleGridEntry = Entry<PeopleGridEntryFields>

export const PeopleGridDynamic = dynamic(() =>
    import('./PeopleGrid.component').then((mod) => mod.PeopleGrid)
)

// const isVariant = (variant: any): variant is FloatingImageVariants => {
//     return Object.values(FloatingImageVariants).includes(variant)
// }

// const getValidVariant = (variant: string | undefined) => {
//     if (isVariant(variant)) {
//         return variant
//     }
//     // default
//     return FloatingImageVariants.Left
// }

export const peopleGridMapperConfig = makeConfig<
    PeopleGridEntry,
    PeopleGridProps
>({
    __mapperType: 'component',
    component: PeopleGridDynamic,
    contentTypeId: 'peopleGrid',
    // entryToMapperProps: async ({ entry, manager }) => {
    //     return {
    //         storybook: {
    //             path:
    //                 // this is brittle. there must be a better way.
    //                 '?path=/story/documentation-dynamic-components-peoplegrid--page',
    //             label: 'CMS Documentation',
    //         },
    //     }
    // },
    entryToProps: async ({ entry, manager }) => {
        const { json = {}, content, references } = entry.fields
        return {
            // heroTitle: json.heroTitle,
            // title: json.title,
            bodyDocument: await contentfulRichTextDocumentToJsonSafe(
                content,
                manager
            ),
            personsProps: references
                ? (
                      await Promise.all(
                          references.map((personEntry) => {
                              return manager.getProps<PersonProps>(
                                  personEntry,
                                  {
                                      // person entry is not enforced from day 1
                                      restrictToContentTypes: ['person'],
                                  }
                              )
                          })
                      )
                  ).filter(Boolean)
                : [],
            // heroVariant: json.heroVariant,
            // imageVariant: json.imageVariant,
            // backgroundProps: json.background,
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
