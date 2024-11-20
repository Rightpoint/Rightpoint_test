import { EntryFields, Entry, Asset } from 'contentful'

export type PageDemoPageTypeFields = {
    name: EntryFields.Text
    headline: EntryFields.Text
    body: EntryFields.Text
    images: EntryFields.Array<Asset>
}

export type PageDemoPageTypeEntry = Entry<PageDemoPageTypeFields>
