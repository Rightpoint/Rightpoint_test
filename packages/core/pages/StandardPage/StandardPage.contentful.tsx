import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { StandardPageProps } from './StandardPage.page'
import type { MultiMediaEntry } from '@rightpoint/core/components'
import { Document } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { getOpenGraphImageFromMultiMedia } from '../seo/OpenGraph/open-graph-image'

export type StandardPageEntryFields = {
    internalName: EntryFields.Text
    title: EntryFields.Text
    slug: EntryFields.Text
    seo: SeoEntry
    components: Entry<any>[]

    cardTitle: EntryFields.Text
    cardBody: Document
    cardMedia: MultiMediaEntry
}

export type StandardPageEntry = Entry<StandardPageEntryFields>

export const StandardPageDynamic = dynamic(() =>
    import('./StandardPage.page').then((mod) => mod.StandardPage)
)

export const standardPageMapperConfig = makeConfig<
    StandardPageEntry,
    StandardPageProps
>({
    __mapperType: 'page',
    contentTypeId: 'standardPage',
    seoFieldName: 'seo',
    slugFieldName: 'slug',
    slugContextName: 'slug',
    urlBasePath: '/',
    component: StandardPageDynamic,
    entryToProps: async ({ entry, manager }) => {
        const componentsProps = await manager.getAllComponentsProps(
            entry.fields.components
        )
        return {
            components: componentsProps,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { title, cardMedia } = entry.fields
        return {
            title,
            openGraphImage: await getOpenGraphImageFromMultiMedia(
                cardMedia,
                manager
            ),
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { title, cardMedia, cardBody, cardTitle } = entry.fields
        return {
            title: cardTitle || title,
            multiMediaProps: await manager.getMultiMediaProps(cardMedia),
            body: documentToPlainTextString(cardBody),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'View Page',
            },
        }
        /**
         * Uncomment if we want to "find" a media as fallback. Fairly expensive though?
         */
        // function isMultiMedia(entry: Entry<unknown>): entry is MultiMediaEntry {
        //     return entry?.sys?.contentType?.sys?.id === 'multiMedia'
        // }
        // async function findFirstMedia() {
        //     const medias = []
        //     components.forEach(async (component: Entry<any>) => {
        //         if (isMultiMedia(component.fields.media)) {
        //             const multiMediaProps = manager.getProps(
        //                 component.fields.media,
        //                 {
        //                     restrictToContentTypes: ['multiMedia'],
        //                 }
        //             )
        //             if (multiMediaProps) {
        //                 medias.push(multiMediaProps)
        //             }
        //         }
        //     })
        //     return (await Promise.all(medias))[0]
        // }
    },
})
