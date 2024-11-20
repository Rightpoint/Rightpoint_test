import { jsonSafe } from '@rightpoint/core/utils'
import { RichTextProps } from './RichText.component'
import { contentfulRichTextToReact } from './contentful-rich-text-to-react'
import { contentfulStorybookDocumentEmbeddedLinks } from './data/contentful-document-embedded-links'
import { contentfulDocumentWithEntries } from './data/contentful-document-storybook-with-entries'
import { contentfulDocumentFullWithLinks } from './data/contentful-document-full-with-links'
import { contentfulDocumentWithHeaders } from './data/contentful-document-headers'
import { contentfulDocumentSimpleDefault } from './data/contentful-document-simple-default'

const makeGenerators = <T extends Record<string, any>>(
    obj: T
): {
    [K in keyof T]: T[K] extends (...args: infer Args) => any
        ? (...args: Args) => RichTextProps
        : never
} => obj

/**
 * This is usually passed in the contentful/next chain to prevent circular imports,
 * but can be done in storybook because we are not rendering with contentful/next
 */
const fakeMappers = {
    getUrl: async (entry) => {
        return '#fake'
    },
}

const documentToReact = (document) => {
    return contentfulRichTextToReact(jsonSafe(document), fakeMappers as any)
}

export const richTextGenerators = makeGenerators({
    default: () => ({
        body: documentToReact(contentfulDocumentSimpleDefault),
    }),
    withHeaders: () => ({
        body: documentToReact(contentfulDocumentWithHeaders),
    }),
    withLinks: () => ({
        body: documentToReact(contentfulDocumentFullWithLinks),
    }),
    withEntries: () => ({
        body: documentToReact(contentfulDocumentWithEntries),
    }),
    withLinksEmbeds: () => ({
        body: documentToReact(contentfulStorybookDocumentEmbeddedLinks),
    }),
})
