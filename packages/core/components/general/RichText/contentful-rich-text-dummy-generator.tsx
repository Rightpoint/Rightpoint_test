import { BLOCKS, Document } from '@contentful/rich-text-types'

/**
 * Helpers to make dummy contentful rich text.
 * 
 * Usage: 
 *  contentfulRichTextDummyGenerators.generateDocument({
        contents: [
            {
                nodeType: 'paragraph',
                text: 'Experience Transformation',
            },
            {
                nodeType: 'heading-1',
                text: 'Digital Transformation',
            },
            {
                nodeType: 'paragraph',
                text: 'Product Transformation',
            },
        ],
    }),
 * 
 */
export const contentfulRichTextDummyGenerators = {
    generateDocument({
        contents,
    }: {
        contents?: {
            nodeType?:
                | string
                | 'paragraph'
                | 'heading-1'
                | 'heading-2'
                | 'heading-3'
            text: string
        }[]
    }): Document {
        return makeDocument(
            contents.map((content) => ({
                nodeType: content.nodeType || 'paragraph',
                content: [makeTextNode(content.text)],
            }))
        )
    },
}

function makeDocument(content: any[]): {
    nodeType: BLOCKS.DOCUMENT
    data: any
    content: any[]
} {
    return {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [...content],
    }
}

function makeTextNode(value) {
    return {
        nodeType: 'text',
        value,
        marks: [],
        data: {},
    }
}
