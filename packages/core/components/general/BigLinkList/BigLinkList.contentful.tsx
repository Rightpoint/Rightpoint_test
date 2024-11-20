import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import {
    BigLinkListComposedProps,
    BigLinkListItemProps,
} from './BigLinkList.component'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type BigLinkListEntryFields = {
    showArrows: EntryFields.Boolean
    links: LinkEntry[]
    a11yLabel: EntryFields.Text
    // for hero
    heroTitle: EntryFields.Text
    heroSubtitle: EntryFields.Text

    // for background
    backgroundColor: EntryFields.Text
    backgroundColorType: EntryFields.Text
}

export type BigLinkListEntry = Entry<BigLinkListEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const BigLinkListDynamic = dynamic(() =>
    import('./BigLinkList.component').then((mod) => mod.BigLinkListComposed)
)

/**
 * @deprecated by new designs
 */
export const bigLinkListMapperConfig = makeConfig<
    BigLinkListEntry,
    BigLinkListComposedProps
>({
    __mapperType: 'component',
    contentTypeId: 'componentBigLinkList',
    component: BigLinkListDynamic,
    entryToProps: async ({ entry, manager }) => {
        return {} as any
    },
    entryToRootProps: async ({ entry }) => {
        return {
            background: {
                backgroundColor: entry.fields.backgroundColor,
            },
            a11y: {
                label:
                    entry.fields.a11yLabel ||
                    entry.fields.heroTitle ||
                    'Navigation links',
            },
        }
    },
})
