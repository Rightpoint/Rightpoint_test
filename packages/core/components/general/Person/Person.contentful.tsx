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

/**
 * @deprecated -- unused?
 */
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

/**
 * There is no Person detail page anymore, but
 * this page mapper config is used to generate card props.
 */
export const personPageMapperConfig = makeConfig<PersonEntry, any>({
    __mapperType: 'page',
    component: PersonDynamic,
    contentTypeId: 'person',
    seoFieldName: null,
    slugFieldName: null,
    slugContextName: null,
    urlBasePath: null,
    entryToUrl: async ({ entry, manager }) => {
        return '/404?no-person-detail-page'
    },
    entryToProps: async ({ entry, manager }) => {
        return {} as any // this is unused -- there is no person page
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { name, jobTitle, media } = entry.fields
        return {
            title: name,
            subtitle: jobTitle,
            multiMediaProps: await manager.getProps(media),
            linkProps: null,
        }
    },
})
