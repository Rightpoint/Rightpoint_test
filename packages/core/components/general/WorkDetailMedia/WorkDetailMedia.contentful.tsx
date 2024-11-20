import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkDetailMediaProps } from './WorkDetailMedia.component'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import { ContainerWidths } from '../../layout/RootComponent/container'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type WorkDetailMediaEntryFields = {
    internalName: EntryFields.Text
    a11yLabel: EntryFields.Text
    media: MultiMediaEntry[]
    columns: '1' | '2' | '3' | EntryFields.Text
    container: 'Container' | EntryFields.Text
    verticallyOffsetWithShadows: EntryFields.Boolean

    // not used right now.
    // the question is, how much control to give content authors.
    // variant: EntryFields.Text
}

export type WorkDetailMediaEntry = Entry<WorkDetailMediaEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const WorkDetailMediaDynamic = dynamic(() =>
    import('./WorkDetailMedia.component').then((mod) => mod.WorkDetailMedia)
)

export const workDetailMediaMapperConfig = makeConfig<
    WorkDetailMediaEntry,
    WorkDetailMediaProps
>({
    __mapperType: 'component',
    contentTypeId: 'workDetailMedia',
    component: WorkDetailMediaDynamic,
    entryToProps: async ({ entry, manager }) => {
        const {
            media,
            // variant,
            columns,
            container,
            verticallyOffsetWithShadows,
        } = entry.fields
        return {
            // variant,
            columns: parseInt(columns) || 1,
            container: container in ContainerWidths ? container : null,
            multiMediasProps: (
                await Promise.all(
                    media?.map((mediaEntry) => {
                        return manager.getProps<MultiMediaProps>(mediaEntry, {
                            restrictToContentTypes: ['multiMedia'],
                        })
                    }) ?? []
                )
            ).filter(Boolean),
            verticallyOffsetWithShadows,
        }
    },
    entryToRootProps: async ({ entry, manager }) => {
        const { container } = entry.fields
        return {
            container: !!container ? ContainerWidths.WorkText : false,
            noMargins: true,
            noPadding: !!container ? false : true,
            a11y: {
                label: entry.fields.a11yLabel || 'Work media',
            },
        }
    },
})
