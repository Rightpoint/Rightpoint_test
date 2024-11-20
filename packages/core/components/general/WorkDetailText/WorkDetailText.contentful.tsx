import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkDetailTextProps } from './WorkDetailText.component'
import type {
    MapEntryTo,
    TransformProps,
} from '@rightpoint/core/next-contentful'
import type { RootComponentProps } from '../../layout/RootComponent/RootComponent.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { Document } from '@contentful/rich-text-types'
import { ContainerWidths } from '../../layout/RootComponent/container'
import { contentfulRichTextDocumentToJsonSafe } from '../RichText/contentful-rich-text-to-json-safe'
import { ContentColors } from '../../layout/RootComponent/background-color'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type WorkDetailTextEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    subtitle?: EntryFields.Text
    body: Document

    backgroundColor: EntryFields.Text
}

export type WorkDetailTextEntry = Entry<WorkDetailTextEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const WorkDetailTextDynamic = dynamic(() =>
    import('./WorkDetailText.component').then((mod) => mod.WorkDetailText)
)

type WorkDetailTextJson = Partial<WorkDetailTextProps>

/**
 * Map contentful entry to component props
 */
const entryToProps: MapEntryTo<
    WorkDetailTextEntry,
    WorkDetailTextJson
> = async ({ entry, manager }) => {
    const { title, subtitle, body } = entry.fields
    return {
        title,
        subtitle,
        body: await contentfulRichTextDocumentToJsonSafe(body, manager),
        entry,
    }
}

const entryToRootProps: MapEntryTo<
    WorkDetailTextEntry,
    RootComponentProps
> = async ({ entry, manager }) => {
    return {
        container: ContainerWidths.WorkText,
        background: {
            backgroundColor: entry.fields.backgroundColor,
            contentColor: ContentColors.Dark,
        },
        a11y: {
            label: [entry.fields.title, entry.fields.subtitle]
                .filter(Boolean)
                .join(' - '),
        },
    }
}

export const workDetailTextMapperConfig = makeConfig({
    __mapperType: 'component',
    contentTypeId: 'componentWorkDetailText',
    component: WorkDetailTextDynamic,
    entryToProps: entryToProps,
    entryToRootProps: entryToRootProps,
})
