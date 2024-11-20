import dynamic from 'next/dynamic'
import { EntryFields, Entry } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { SeoEntry } from '../seo/Seo/Seo.contentful'
import type { StandardPageProps } from './StandardPage.page'
import type { MultiMediaEntry } from '@rightpoint/core/components'

export type StandardPageEntryFields = {
    internalName: EntryFields.Text
    pageTitle: EntryFields.Text
    slug: EntryFields.Text
    seo: SeoEntry
    components: Entry<any>[]
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
            title: entry.fields.pageTitle,
            components: componentsProps,
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const { pageTitle } = entry.fields
        return {
            title: pageTitle,
        }
    },
    entryToCardProps: async ({ entry, manager }) => {
        const { pageTitle, components } = entry.fields

        return {
            title: pageTitle,
            multiMediaProps: await findFirstMedia(),
            linkProps: {
                href: await manager.getUrl(entry),
                text: 'View Page',
            },
        }
        function isMultiMedia(entry: Entry<unknown>): entry is MultiMediaEntry {
            return entry?.sys?.contentType?.sys?.id === 'multiMedia'
        }
        async function findFirstMedia() {
            const medias = []
            components.forEach(async (component: Entry<any>) => {
                if (isMultiMedia(component.fields.media)) {
                    const multiMediaProps = manager.getProps(
                        component.fields.media,
                        {
                            restrictToContentTypes: ['multiMedia'],
                        }
                    )
                    if (multiMediaProps) {
                        medias.push(multiMediaProps)
                    }
                }
            })
            return (await Promise.all(medias))[0]
        }
    },
})
