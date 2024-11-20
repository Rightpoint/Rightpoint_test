import { EntryFields, Entry } from 'contentful'

export type PageContentTemporaryFields = {
    internalName: EntryFields.Text
    // TODO: type the content fields
    content: EntryFields.Array<Entry<any>>
}

export type PageContentTemporaryEntry = Entry<PageContentTemporaryFields>
