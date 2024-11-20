import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { EntryFields, Entry, Asset } from 'contentful'
import type { PardotProps } from './Pardot.component'
import { Document } from '@contentful/rich-text-types'

export type PardotEntryFields = {
    internalName: EntryFields.Text
    pardotEmbedUrl: EntryFields.Text
    displayStyle: 'Button' | 'Visible' | string
    align: 'Center' | 'Left' | 'Right' | string
    cta: EntryFields.Text

    successSlug: EntryFields.Text
    successPageText: Document
    successComponents: Entry<any>[]
    files: Asset[]
}

export type PardotEntry = Entry<PardotEntryFields>

export const PardotDynamic = dynamic(() =>
    import('./Pardot.component').then((mod) => mod.PardotButton)
)

export const pardotMapperConfig = makeConfig<PardotEntry, PardotProps>({
    __mapperType: 'component',
    contentTypeId: 'pardotForm',
    component: PardotDynamic,
    entryToProps: async ({ entry, manager }) => {
        const { displayStyle, pardotEmbedUrl, align, cta } = entry.fields

        return {
            embedUrl: pardotEmbedUrl.startsWith('//')
                ? 'https:' + pardotEmbedUrl
                : pardotEmbedUrl,
            align,
            cta,
            displayStyle,
        }
    },
})
