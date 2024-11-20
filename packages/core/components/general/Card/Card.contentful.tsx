import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry } from 'contentful'
import type { CardProps } from './Card.component'
import type { LinkProps } from '../../links/Link/Link.component'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { MultiMediaEntry } from '../MultiMedia/MultiMedia.contentful'

/**
 * Contentful entry types
 */
export type CardEntryFields = {
    internalName: EntryFields.Text
    media: MultiMediaEntry
    text: EntryFields.Text
    body: EntryFields.Text
    link: LinkEntry
}

export type CardEntry = Entry<CardEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const CardDynamic = dynamic(() =>
    import('./Card.component').then((mod) => mod.Card)
)

export const cardMapperConfig = makeConfig<CardEntry, CardProps>({
    __mapperType: 'component',
    component: CardDynamic,
    contentTypeId: 'card',
    entryToProps: async ({ entry, manager }) => {
        const { text, body, link, media } = entry.fields

        return {
            multiMediaProps: await manager.getMultiMediaProps(media),
            text,
            body,
            linkProps: await manager.getLinkProps(link),
        }
    },
})
