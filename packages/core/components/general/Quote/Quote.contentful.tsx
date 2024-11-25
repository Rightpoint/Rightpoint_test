import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import type { QuoteProps } from './Quote.component'
import { LinkEntry } from '../../links/Link/Link.contentful'
import { ContainerWidths } from '../../layout/RootComponent/container'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import { BackgroundColors } from '../../layout/RootComponent/background-color'

/**
 * Flat multi media model in Contentful handles 99% of media
 */
export type QuoteEntryFields = {
    internalName: EntryFields.Text
    text: EntryFields.Text
    eyebrow: EntryFields.Text
    name: EntryFields.Text
    jobTitle: EntryFields.Text
    link?: LinkEntry
    backgroundColor: string
    variant: QuoteProps['variant'] | string
}

export type QuoteEntry = Entry<QuoteEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const QuoteDynamic = dynamic(() =>
    import('./Quote.component').then((mod) => mod.Quote)
)

export const quoteMapperConfig = makeConfig<QuoteEntry, QuoteProps>({
    __mapperType: 'component',
    contentTypeId: 'componentQuote',
    component: QuoteDynamic,

    entryToProps: async ({ entry, manager }) => {
        const {
            eyebrow,
            text,
            name,
            jobTitle,
            link,
            backgroundColor,
            variant,
        } = entry.fields
        return {
            text,
            eyebrow,
            name,
            jobTitle,
            backgroundColor,
            variant,
            linkProps: await manager.getLinkProps(link),
        }
    },

    entryToRootProps: async ({ entry, manager }) => {
        const { backgroundColor, name } = entry.fields
        return {
            background: {
                backgroundColor,
            },
            container: ContainerWidths.WorkText,
            a11y: {
                label: name ? `Quote by ${name}` : 'Quote',
            },
        }
    },
})
