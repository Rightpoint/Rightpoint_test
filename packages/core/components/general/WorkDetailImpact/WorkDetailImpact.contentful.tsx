import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { WorkDetailImpactProps } from './WorkDetailImpact.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { ContainerWidths } from '../../layout/RootComponent/container'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

/**
 * Contentful entry types
 */
type SpeciallyFormattedText = string

export type WorkDetailImpactEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    impacts: SpeciallyFormattedText
    backgroundColor: BackgroundColors | string
}

export type WorkDetailImpactEntry = Entry<WorkDetailImpactEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const WorkDetailImpactDynamic = dynamic(() =>
    import('./WorkDetailImpact.component').then((mod) => mod.WorkDetailImpact)
)

const decodeString = (s: SpeciallyFormattedText) => {
    return (s || '').split('\n').map((line) => {
        const splits = line.split(':')
        return {
            bigText: splits[0],
            description: splits[1],
        }
    })
}

export const workDetailImpactMapperConfig = makeConfig<
    WorkDetailImpactEntry,
    WorkDetailImpactProps
>({
    __mapperType: 'component',
    contentTypeId: 'workDetailImpact',
    component: WorkDetailImpactDynamic,
    entryToRootProps: async ({ entry, manager }) => {
        const { backgroundColor } = entry.fields
        return {
            background: {
                backgroundColor,
            },
            container: ContainerWidths.WorkText,
            a11y: {
                label: 'Impact',
            },
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const { title, impacts } = entry.fields
        return {
            title,
            impacts: decodeString(impacts),
        }
    },
})
