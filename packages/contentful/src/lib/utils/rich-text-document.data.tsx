const document = {
    nodeType: 'document',
    data: {},
    content: [
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'Hello',
                    marks: [{ type: 'bold' }],
                    data: {},
                },
                {
                    nodeType: 'text',
                    value: ' world!\n and a newline',
                    marks: [{ type: 'italic' }],
                    data: {},
                },
            ],
        },
    ],
}

export const contentfulRichTextDocumentGenerators = {
    default: () => document,
}
