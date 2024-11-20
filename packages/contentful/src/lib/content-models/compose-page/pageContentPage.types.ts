import { EntryFields, Entry } from 'contentful'

export type PageContentPageFields = {
    name: EntryFields.Text
    pageTitle: EntryFields.Text
    content: EntryFields.RichText
}

export type PageContentEntry = Entry<PageContentPageFields>
