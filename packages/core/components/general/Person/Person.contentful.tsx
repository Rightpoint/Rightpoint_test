import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'
import type { Asset, Entry, EntryFields } from 'contentful'
import type { PersonProps } from './Person.component'

/**
 * Contentful entry types
 */
export type PersonEntryFields = {
    internalName: EntryFields.Text
    name: EntryFields.Text
    jobTitle: EntryFields.Text
    media?: MultiMediaEntry
}

export type PersonEntry = Entry<PersonEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const PersonDynamic = dynamic(() =>
    import('./Person.component').then((mod) => mod.Person)
)

export const personMapperConfig = makeConfig<PersonEntry, PersonProps>({
    __mapperType: 'component',
    component: PersonDynamic,
    contentTypeId: 'person',
    entryToProps: async ({ entry, manager }) => {
        const { name, jobTitle, media } = entry.fields
        return {
            name,
            jobTitle,
            multiMediaProps: await manager.getProps(media),
        }
    },
})
