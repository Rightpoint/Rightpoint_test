import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { ModalProps } from './Modal.component'

/**
 * Contentful entry types
 */
export type ModalEntryFields = {
    internalTitle: EntryFields.Text
}

export type ModalEntry = Entry<ModalEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const ModalDynamic = dynamic(() =>
    import('./Modal.component').then((mod) => mod.Modal)
)

export const modalMapperConfig = makeConfig<ModalEntry, ModalProps>({
    __mapperType: 'component',
    component: ModalDynamic,
    contentTypeId: 'modal',
    entryToProps: async ({ entry, manager }) => {
        const {
            // fields
        } = entry.fields
        return {
            // props
        }
    },
    // WARNING: Do not use manager in a way that calls getXProps which may cause circular dependencies.
    // entryToRootProps: async ({ entry }) => {
    //    return {}
    // },
})
